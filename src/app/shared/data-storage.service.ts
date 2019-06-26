import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from './recipes.service';
import { Recipe } from '../recipe-book/recipe.model';
import { map, tap } from 'rxjs/operators'
import { AuthService } from '../Auth/auth.service';

@Injectable({ providedIn:'root' })
export class DataStorageService {
    constructor(private http:HttpClient, private recipesService:RecipesService, private authService:AuthService){}

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://udemy-angular-project-60e63.firebaseio.com/recipes.json',recipes)
        .subscribe(response=>{
            console.log(response);
        });
    }

    loadRecipes(){
        return this.http.get<Recipe[]>('https://udemy-angular-project-60e63.firebaseio.com/recipes.json')
        .pipe(
            map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe, ingredients:recipe.ingredients ? recipe.ingredients : []}
            })
        }),
        tap(recipes=>{
            this.recipesService.setRecipes(recipes);
        })
        )
    }
}