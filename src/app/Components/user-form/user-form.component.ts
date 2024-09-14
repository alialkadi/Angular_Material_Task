import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { Store } from '@ngxs/store';
import { UserAction } from '../../actions/user.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, 
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule, 
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private store: Store, private FormBuilder: FormBuilder,private router: Router) {
    this.userForm = this.FormBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const { userName, email, dob } = this.userForm.value;
      this.store.dispatch(new UserAction.UserInfo({ userName, email, dob })).subscribe(() => {
        console.log("uuuuuser",userName, email, dob )
      console.log("from nav",UserAction.UserInfo)
        this.router.navigate(['/dash']);
      });
      
      console.log("uuuuuser",userName, email, dob )
      console.log("from nav",UserAction.UserInfo)
    }
  }
  onReset() {
    this.userForm.reset();
  }
}
