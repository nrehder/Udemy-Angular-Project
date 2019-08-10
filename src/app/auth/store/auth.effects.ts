import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localid:string;
    registered?:boolean;
}

const handleAuthentication = (email:string,userid:string,token:string,expiresIn:number) =>{
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

    const user = new User(email,userid,token,expirationDate);
    localStorage.setItem('userData',JSON.stringify(user));

    return new AuthActions.AuthenticateSuccess({email:email, userID:userid,token:token,expirationDate:expirationDate, redirect:true});
}

const handleError = (errorRes) =>{
    let errorMessage = "An unknown error occured!";
    if(!errorRes.error || !errorRes.error.error){
        return of(new AuthActions.AuthenticateFail(errorMessage))
    }
    switch(errorRes.error.error.message){
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'User not found!';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'Invalid password!';
            break;
        case 'USER_DISABLED':
            errorMessage = 'User account has been disabled!';
            break;
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already!';
            break;
        case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Password sign-in is disabled!';
            break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'Too many attempts.  Try again later.';
            break;
    }
    
    return of(new AuthActions.AuthenticateFail(errorMessage))
}

@Injectable()
export class AuthEffects {

    constructor(
        private actions$:Actions,
        private http:HttpClient,
        private router:Router,
        private authService:AuthService) {}

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction:AuthActions.SignupStart)=>{
            return this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA3IrvzSxAiL1MkI6Q4EFCUp6UUmxwpwaY',{
            email:signupAction.payload.email,
            password:signupAction.payload.password,
            returnSecureToken:true
            })
            .pipe(
                tap(resData=>{
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData =>{
                    return handleAuthentication(resData.email,resData.localid,resData.idToken,+resData.expiresIn)
                }),
                catchError(errorRes=>{
                    return handleError(errorRes)
                })
            )
        })
    )


    @Effect()
    authLogin = this.actions$
    .pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData:AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA3IrvzSxAiL1MkI6Q4EFCUp6UUmxwpwaY',
            {
                email:authData.payload.email,
                password:authData.payload.password,
                returnSecureToken:true
            })
            .pipe(
                tap(resData=>{
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData =>{
                    return handleAuthentication(resData.email,resData.localid,resData.idToken,+resData.expiresIn)
                }),
                catchError(errorRes=>{
                    return handleError(errorRes)
                })
            )
        })
        
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=>{
            //Get the user data stored in the local storage of the browser, if there is any
            const userData:{email:string,id:string,_token:string,_tokenExpiration:string} = JSON.parse(localStorage.getItem('userData'));
            //If no data existed, userData will be null and this if statement will be truthy, so we return nothing and do not auto log in
            if(!userData){
                return {type:'DUMMY'};
            }

            //store the userData from the storage in a new User object with a Date object instead of an expiration string
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpiration)
                );

            //Calls the token method in the User type to check and see if the current time is beyond the token expiration before saving the user data to store
            const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();

            if(loadedUser.token){
                this.authService.setLogoutTimer(expirationDuration)
                return new AuthActions.AuthenticateSuccess({
                    email: loadedUser.email,
                    userID: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpiration),
                    redirect:false
                });
            }
            return {type:'DUMMY'};
        })
    )

    @Effect({dispatch:false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(()=>{
            localStorage.removeItem('userData');
            this.router.navigate(['/login']);
            this.authService.clearLogoutTimer();
        })
    )

    @Effect({dispatch:false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction:AuthActions.AuthenticateSuccess) => {
            if(authSuccessAction.payload.redirect) {
                this.router.navigate(['/']);
            }
        })
    );
}
