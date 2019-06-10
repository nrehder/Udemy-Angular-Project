import { Ingredient } from '../shared/ingredient.model';

export class Recipe{
    constructor(name:string, desc:string, imgPath:string, ingArray:Ingredient[]){
        this.name=name;
        this.description=desc;
        this.imagePath=imgPath;
        this.ingredients = ingArray;
    }

    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredient[];
}