import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() displayChange = new EventEmitter<string>()
  collapsed=true;

  constructor() { }

  onSelect(val:string){
    this.displayChange.emit(val);
  }

}
