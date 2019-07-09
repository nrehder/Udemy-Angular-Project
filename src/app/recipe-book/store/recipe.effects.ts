import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from './recipe.action';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
    constructor(private actions$:Actions, private http:HttpClient, private store:Store<fromApp.AppState>){}

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(fetchAction=>{
            return this.http.get<Recipe[]>('https://udemy-angular-project-60e63.firebaseio.com/recipes.json')
        }),
        map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe, ingredients:recipe.ingredients ? recipe.ingredients : []}
            })
        }),
        map(recipes=>{
            return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({dispatch:false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.SAVE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action,recipesState])=>{
            return this.http.put('https://udemy-angular-project-60e63.firebaseio.com/recipes.json',recipesState.recipes)
        })
    )
}