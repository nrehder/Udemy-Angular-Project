import { Recipe } from '../recipe-book/recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { ShoppingService } from './shopping.service';

@Injectable()

export class RecipesService{
    constructor(private shopService:ShoppingService){}
    
    private recipes:Recipe[] = [
        new Recipe(
            "Hamburger",
            "Nice, juicy hamburger!",
            "https://cdn.pixabay.com/photo/2017/12/09/23/04/bread-3008950_960_720.jpg",
            [
                new Ingredient('Ground Beef', 1),
                new Ingredient('Buns', 1),
                new Ingredient('Onion', 1),
                new Ingredient('Lettuce', 1),
                new Ingredient('Pickles', 1)
            ]),
        new Recipe(
            "Penne Alla Vodka",
            "Al dente penne pasta with creamy vodka sauce.",
            "https://upload.wikimedia.org/wikipedia/commons/8/82/PenneAllaVodka.jpg",
            [
                new Ingredient('Penne Pasta', 1),
                new Ingredient('Crushed Tomatoes', 3),
                new Ingredient('Pureed Tomatoes', 3),
                new Ingredient('Heavy Cream', 1),
                new Ingredient('Vodka', 1)
            ])
    ];

    getRecipes(){
        return this.recipes.slice();
    }

    chosenRecipe = new EventEmitter<Recipe>();

    addToShoppingList(ing:Ingredient[]){
        this.shopService.addIngredients(ing);
    }
}