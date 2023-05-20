import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'top-movies-client-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  auth=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })

  constructor(private router: Router,private userService: UserService) {}

  login() {
    this.userService.loginUser().subscribe({
      next: () => {
        localStorage.setItem('isLoggedIn', 'true')
        this.router.navigate(['/list']);
      },
      error: () => {
        console.log('error');
      }
    })
  }

}
