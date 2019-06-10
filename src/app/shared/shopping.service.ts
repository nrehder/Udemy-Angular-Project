import { Ingredient } from './ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingService{

    ingChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
    ];
      
    getIngredients(){
        return this.ingredients.slice();
    }

    onAddIngredient(newIng:Ingredient){
        this.ingredients.push(newIng);
        this.ingChanged.emit(this.ingredients.slice());
    }

    addIngredients(ing:Ingredient[]){
        this.ingredients.push(...ing);
        this.ingChanged.emit(this.ingredients.slice());
    }
}