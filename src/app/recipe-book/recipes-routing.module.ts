import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Auth/auth.guard';

import { RecipeBookComponent } from './recipe-book.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes:Routes = [
    {
        path:"",
        component:RecipeBookComponent,
        resolve:[RecipesResolverService],
        canActivate:[AuthGuard],
        children:[
        {
          path:"",
          component:RecipeStartComponent
        },
        {
          path:"new",
          component:RecipeEditComponent
        },
        {
          path:":id",
          component:RecipeDetailComponent
        },
        {
          path:":id/edit",
          component:RecipeEditComponent
        }
    ] }
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipesRoutingModule{}