import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.action';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  
  id:number;
  editMode = false;
  recipeForm:FormGroup;
  private storeSub:Subscription;
  
  get ingredientsControls(){
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }
  
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private store:Store<fromApp.AppState>) { }
    
    ngOnInit() {
      this.route.params.subscribe((params:Params)=>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      })
    }
    
    private initForm(){
      let recipeName = '';
      let imgPath = '';
      let description = '';
      let ingredients = new FormArray([]);
      
      if(this.editMode){
        this.storeSub = this.store.select('recipes').pipe(
          map(recipeState=>{
            return recipeState.recipes.find((recipe,index)=>{
              return index === this.id;
            });
          })
          ).subscribe(recipe=>{
            recipeName=recipe.name;
            imgPath=recipe.imagePath;
            description=recipe.description;
            if(recipe['ingredients']){
              for(let ingredient of recipe.ingredients){
                ingredients.push(
                  new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
              );
            }
          }
        })
      }
      
      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(imgPath, Validators.required),
        'description': new FormControl(description, Validators.required),
        'ingredients': ingredients
      });
    }
    
    onAddIngredient(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
        )
      }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  
  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);
      if(this.editMode){
        this.store.dispatch(new RecipesActions.UpdateRecipe({
          index:this.id,
          newRecipe:newRecipe
        }))
      } else {
        this.store.dispatch(new RecipesActions.AddRecipe(newRecipe));
      }
      this.onCancel();
    }
    
    onCancel(){
      this.editMode=false;
      this.router.navigate(['../'],{relativeTo:this.route});
    }

    ngOnDestroy() {
      if(this.storeSub){
        this.storeSub.unsubscribe();
      }
    }
    
}
