import { Component } from '@angular/core';
import { BudgetByAmountComponent } from './budget-by-amount/budget-by-amount.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BudgetByPercentageComponent } from './budget-by-percentage/budget-by-percentage.component';
enum Type {
  Amount = 'amount',
  Percentage = 'percentage',
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BudgetByAmountComponent,
    MatButtonToggleModule,
    BudgetByPercentageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  toggle: boolean = false;
  calculateByAmount = true;
  calculateByPercentage = false;

  toggleCalculator(type: string) {
    if (type == Type.Amount) {
      this.calculateByAmount = true;
      this.calculateByPercentage = false;
    } else {
      this.calculateByAmount = false;
      this.calculateByPercentage = true;
    }
  }
}
