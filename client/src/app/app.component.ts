import { CommonModule , NgFor} from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { NgxSpinner, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavComponent , NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  
  private accountService = inject(AccountService);


  ngOnInit(): void {
    this.setCurrentUser();

  }
  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return ;
    const  user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }



}
