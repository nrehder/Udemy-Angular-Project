import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingService{

    ingChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>()

    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
    ];
      
    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    onAddIngredient(newIng:Ingredient){
        this.ingredients.push(newIng);
        this.ingChanged.next(this.ingredients.slice());
    }

    addIngredients(ing:Ingredient[]){
        this.ingredients.push(...ing);
        this.ingChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number, newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingChanged.next(this.ingredients.slice());
    }
}