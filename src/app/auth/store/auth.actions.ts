import { Action } from '@ngrx/store';

export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignupStart | ClearError | AutoLogin;

export const LOGIN_START = '[Auth] Login Start';
export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email:string, password:string }){}
}

export const SIGNUP_START = '[Auth] Signup Start';
export class SignupStart implements Action{
    readonly type = SIGNUP_START;
    constructor(public payload:{email:string, password:string}){}
}

export const AUTO_LOGIN = '[Auth] Auto Login'
export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload:{
        email:string,
        userID:string,
        token:string,
        expirationDate:Date,
        redirect:boolean
    }){}
}

export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export class AuthenticateFail implements Action{
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload:string){}
}

export const CLEAR_ERROR = '[Auth] Clear Error';
export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export const LOGOUT = '[Auth] Logout';
export class Logout implements Action {
    readonly type = LOGOUT;
}
