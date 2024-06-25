import { Component } from '@angular/core';
import { BudgetByAmountComponent } from './budget-by-amount/budget-by-amount.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BudgetByPercentageComponent } from './budget-by-percentage/budget-by-percentage.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BudgetByAmountComponent, MatButtonToggleModule, BudgetByPercentageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
