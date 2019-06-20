import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shared/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) shopForm:NgForm;
  subscription:Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private shopService:ShoppingService) { }

  ngOnInit(){
    this.subscription=this.shopService.startedEditing.subscribe((index:number)=>{
      this.editMode = true;
      this.editedItemIndex=index;
      this.editedItem = this.shopService.getIngredient(index);
      this.shopForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    });
  }

  onSubmit(){
    const newIngredient = new Ingredient(this.shopForm.value.name,this.shopForm.value.amount);
    if(this.editMode){
      this.shopService.updateIngredient(this.editedItemIndex,newIngredient);
    } else {
      this.shopService.onAddIngredient(newIngredient);
    }
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClear(){
    this.shopForm.reset();
    this.editMode=false;
  }

  onDelete(){
    if(this.editMode){
      this.shopService.deleteIngredient(this.editedItemIndex);
    }
    this.onClear();
  }
}
