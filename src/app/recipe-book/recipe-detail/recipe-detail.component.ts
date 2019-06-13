import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from 'src/app/shared/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id:number;
  recipe:Recipe;

  constructor(private recipesService:RecipesService, private route:ActivatedRoute, private router:Router) { }

  toShoppingList(){
    this.recipesService.addToShoppingList(this.recipe.ingredients)
  }

  ngOnInit(){
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo:this.route});
  }
}
