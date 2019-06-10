import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from 'src/app/shared/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  @Input('recipeDesc') recipe:Recipe;

  constructor(private recipesService:RecipesService) { }

  toShoppingList(){
    this.recipesService.addToShoppingList(this.recipe.ingredients)
  }
}
