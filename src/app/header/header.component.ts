import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../Auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../Auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub:Subscription;

  constructor(private dataStorage:DataStorageService, private authService:AuthService){}
  
  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    });
  }

  onSaveData(){
    this.dataStorage.storeRecipes();
  }

  onLoadData(){
    this.dataStorage.loadRecipes().subscribe();
  }
  
  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
