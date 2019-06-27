import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes:Routes = [
  {
    path:"",
    redirectTo:"/recipes",
    pathMatch:'full'
  },
  {
    path:'recipes', loadChildren: './recipe-book/recipes.module#RecipesModule'
  },
  {
    path:'login', loadChildren: './Auth/auth.module#AuthModule'
  },
  {
    path:'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
  }
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules})],
    exports:[RouterModule]
})

export class AppRoutingModule{}