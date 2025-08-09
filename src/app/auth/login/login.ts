import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router) { // Inject FormBuilder to create the form
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  }
  
  onSubmit(){


    if(this.loginForm.valid){
      const formData = this.loginForm.value; // form data will be converted to json object
      console.log("Form is Submitted", formData); // to check if its working 
      this.http.post<any>('https://my-dotnet-backend-123.azurewebsites.net/api/auth/login', formData)// still didn't implment the auth endpoint 
  .subscribe({ // Observable to handle the response
    next: (response) => {
      console.log('Login successful:', response);
      localStorage.setItem('token', response.token);
      console.log("Log in done token = " + localStorage.getItem("token"))
      this.router.navigate(["/books"]); // I will make the auth endpoint return a token
    },
    error: (err) => {
      console.error('Login failed:', err.error);
    }
  });
    }


    }
    goToRegister(): void {
  this.router.navigate(['/register']);
}
goToBooks() {
  this.router.navigate(['/books']);
}
    
  }




