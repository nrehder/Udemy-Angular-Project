import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from 'src/app/shared/recipes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  recipes:Recipe[];
  recipeSub:Subscription;

  constructor(private recipesService:RecipesService, private router:Router) { }

  ngOnInit(){
    this.recipeSub = this.recipesService.recipesChanged.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    })
    this.recipes = this.recipesService.getRecipes();
  }

  newRecipe(){
    this.router.navigate(['recipes','new']);
  }

  ngOnDestroy(){
    this.recipeSub.unsubscribe();
  }

}
