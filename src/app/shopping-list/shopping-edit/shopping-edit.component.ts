import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shared/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput',{static:false}) nameInputRef: ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputRef: ElementRef;

  constructor(private shopService:ShoppingService) { }

  onAddItem(){
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value);
    this.shopService.onAddIngredient(newIngredient);
  }
}
