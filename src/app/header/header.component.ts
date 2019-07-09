import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipe-book/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub:Subscription;
  collapsed:boolean;

  constructor(private store:Store<fromApp.AppState>){}
  
  ngOnInit(){
    this.userSub = this.store.select('auth')
    .pipe(map(authState=>authState.user))
    .subscribe(user=>{
      this.isAuthenticated = !!user;
    });
  }

  onSaveData(){
    this.store.dispatch(new RecipeActions.SaveRecipes());
  }

  onLoadData(){
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
  
  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
