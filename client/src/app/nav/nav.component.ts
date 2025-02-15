import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toaster = inject(ToastrService);

  model: any = {};
  titlecase: string | undefined;

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        // Set titlecase directly after login
        this.titlecase = this.accountService.currentUser() ? this.accountService.currentUser()?.username : 'Guest'; 
        this.router.navigateByUrl('/members');
      },
      error: (error) => this.toaster.error(error.error)
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
