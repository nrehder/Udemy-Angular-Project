import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display:string="recipes";

  changeDisplay(val:string){
    this.display=val;
    console.log(val);
  }
}
