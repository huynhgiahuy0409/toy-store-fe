import { Component, OnInit } from '@angular/core';
import { User } from './core/models/user/user.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from './core/store/app.state';
import { environment } from './../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  user: User | null = null;
  ngOnInit(): void {
    console.log(environment.production);
  }

  constructor(private store: Store<AppState>, private router: Router) {}
}
