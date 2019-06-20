import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shared/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Ingredient[];
  private igChangeSub:Subscription;

  constructor(private shopService:ShoppingService) { }

  ngOnInit(){
    this.ingredients = this.shopService.getIngredients();
    this.igChangeSub=this.shopService.ingChanged.subscribe((ing:Ingredient[]) => {
      this.ingredients = ing;
    })
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index:number){
    this.shopService.startedEditing.next(index);
  }

}
