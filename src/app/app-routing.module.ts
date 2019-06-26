import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-book/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { NgModule } from '@angular/core';
import { RecipesResolverService } from './recipe-book/recipes-resolver.service';
import { AuthComponent } from './Auth/auth.component';
import { AuthGuard } from './Auth/auth.guard';

const appRoutes:Routes = [
  { path:"", redirectTo:"/recipes", pathMatch:'full' },  
  { path:"shopping-list", component:ShoppingListComponent },
  { path:"recipes", component:RecipeBookComponent,resolve:[RecipesResolverService], canActivate:[AuthGuard], children:[
    { path:"", component:RecipeStartComponent },
    { path:"new", component:RecipeEditComponent },
    { path:":id", component:RecipeDetailComponent },
    { path:":id/edit", component:RecipeEditComponent }
  ] },
  { path:"login", component:AuthComponent }
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}