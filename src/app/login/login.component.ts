import { ShoppingCartService } from 'src/app/Services/_shopping-cart/shopping-cart.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthenticationRequest } from './../_models/';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  ValidatorFn,
} from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../Services/_auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

export function forbiddenUsername(c: AbstractControl): ValidationErrors | null {
  const users = ['admin', 'manager'];
  return users.includes(c.value) ? { invalidUsername: true } : null;
}
@Component({
  templateUrl: './access-denied.component.html',
  styleUrls: ['./login.component.scss'],
})
export class AccessDeniedComponent {
  data!: string;
  constructor(
    public matDialogRef: MatDialogRef<AccessDeniedComponent>,
    @Inject(MAT_DIALOG_DATA) data: string
  ) {
    this.data = data;
  }
}

@Component({
  selector: 'app-loginn',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  mess!: string;
  routeConfig!: string;
  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    if (activatedRoute.snapshot.routeConfig?.path === 'login/payment') {
      this.routeConfig = 'login/payment';
      if (activatedRoute.snapshot.queryParams.accessDenied === 'true') {
        this.dialog.open(AccessDeniedComponent, {
          width: '400px',
          data: 'deniedAccess',
        });
      }
    }
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          /* Custom validation  */
          forbiddenUsername,
        ],
      ],
      password: new FormControl('', [Validators.required]),
    });
  }
  login() {
    const username = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];
    const authenticationRequest: AuthenticationRequest = {
      username: username,
      password: password,
    };
    if (username && password) {
      this.authService
        .createAuthenticationToken(authenticationRequest)
        .subscribe((authenticationResponse) => {
          if (authenticationResponse) {
            if (this.routeConfig === 'login/payment') {
              this.router.navigate(['/shopping-cart']);
            } else {
              this.router.navigate(['/home']);
            }
          } else if (authenticationResponse === null) {
            this.mess = 'M???t kh???u kh??ng ????ng!';
          }
          /* if (authenticationResponse.error) {
            console.log(authenticationResponse.error)
            this.mess = authenticationResponse.error.error;
          } */
        });
    }
  }
}
