import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);

  cancelRegister = output<boolean>();

  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response: any) => {
        console.log(response);
        this.cancel();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

}
