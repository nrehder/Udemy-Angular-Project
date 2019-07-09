import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  recipes:Recipe[];
  recipeSub:Subscription;

  constructor(private router:Router, private store:Store<fromApp.AppState>) { }

  ngOnInit(){
    this.recipeSub = this.store.select('recipes')
    .pipe(map(recipesState=>recipesState.recipes))
    .subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    })
  }

  newRecipe(){
    this.router.navigate(['recipes','new']);
  }

  ngOnDestroy(){
    this.recipeSub.unsubscribe();
  }

}
