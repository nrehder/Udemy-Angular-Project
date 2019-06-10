import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  recipes:Recipe[] = [
    new Recipe("R1Name","R1Desc","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg"),
    new Recipe("R2Name","R2Desc","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg"),
    new Recipe("R3Name","R3Desc","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg")
  ];
  @Output() recipeOutput = new EventEmitter<Recipe>();

  onRecipeOutput(recipe:Recipe){
    this.recipeOutput.emit(recipe);
  }
  constructor() { }

}
