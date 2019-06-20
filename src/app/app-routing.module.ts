import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-book/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { NgModule } from '@angular/core';

const appRoutes:Routes = [
    { path:"shopping-list", component:ShoppingListComponent },
    { path:"recipes", component:RecipeBookComponent, children:[
      { path:"", component:RecipeStartComponent },
      { path:"new", component:RecipeEditComponent },
      { path:":id", component:RecipeDetailComponent },
      { path:":id/edit", component:RecipeEditComponent }
    ] },
    { path:"", redirectTo:"/recipes", pathMatch:'full' }
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}