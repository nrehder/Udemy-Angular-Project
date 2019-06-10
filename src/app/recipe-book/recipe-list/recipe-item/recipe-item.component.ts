import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from 'src/app/shared/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input() recipe:Recipe;

  constructor(private recipesService:RecipesService) { }

  chooseRecipe(){
    this.recipesService.chosenRecipe.emit(this.recipe);
  }

}
