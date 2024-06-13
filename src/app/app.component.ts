import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxCurrencyDirective, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
