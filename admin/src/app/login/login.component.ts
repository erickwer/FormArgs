import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../router.animations';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  onLoggedin() {
    if (this.form.valid) {
      const data = this.form.value;
      this.authService.signin(data).then(result => {
        if (!result.error) {
          if (result.data) {
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('user', JSON.stringify(result.data));
            this.router.navigateByUrl('/');
          }
        } else {
          Swal.fire({
            icon: 'error',
            text: 'E-mail ou senha inválida.',
            confirmButtonText: 'Ok'
          })
        }
      }).catch(err => {
        console.error(err);
      });
    }
  }
}
