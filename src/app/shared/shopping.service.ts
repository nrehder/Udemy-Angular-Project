import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingService{

    ingChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
    ];
      
    getIngredients(){
        return this.ingredients.slice();
    }

    onAddIngredient(newIng:Ingredient){
        this.ingredients.push(newIng);
        this.ingChanged.next(this.ingredients.slice());
    }

    addIngredients(ing:Ingredient[]){
        this.ingredients.push(...ing);
        this.ingChanged.next(this.ingredients.slice());
    }
}