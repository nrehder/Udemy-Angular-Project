import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports:[
        FormsModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forChild([
            {
                path:"", component:AuthComponent
            }
        ])
    ]
})
export class AuthModule{}