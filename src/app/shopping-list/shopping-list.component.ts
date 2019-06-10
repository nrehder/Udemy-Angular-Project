import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shared/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private shopService:ShoppingService) { }

  ngOnInit(){
    this.ingredients = this.shopService.getIngredients();
    this.shopService.ingChanged.subscribe((ing:Ingredient[]) => {
      this.ingredients = ing;
    })
  }

}
