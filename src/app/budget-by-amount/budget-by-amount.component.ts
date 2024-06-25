import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ItemDto } from '../models/item.dto';
import { MatButtonModule } from '@angular/material/button';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-budget-by-amount',
  standalone: true,
  imports: [NgxCurrencyDirective, MatButtonModule, ReactiveFormsModule],
  templateUrl: './budget-by-amount.component.html',
  styleUrl: './budget-by-amount.component.css'
})
export class BudgetByAmountComponent {
  calculatorForm!: FormGroup;
  detailsForm!: FormGroup;

  baseAmount = signal<number>(0);
  items = signal<ItemDto[]>([]);

  constructor() {
    this.calculatorForm = new FormGroup({
      baseAmount: new FormControl('', [Validators.required]),
      itemTitle: new FormControl('', [Validators.required]),
    });
    this.detailsForm = new FormGroup({});
  }
  ngOnInit(): void {}

  onBaseAmountChange(event: any) {
    let money = this.retrieveAmount(event.target.value as string);
    this.baseAmount.update((b) => (b = parseFloat(money)));
  }

  addExpenseItem() {
    const title = this.calculatorForm.get('itemTitle')?.value;
    this.detailsForm.addControl(title, new FormControl(''));
    const item: ItemDto = {
      name: title,
      amount: 0,
      percentage: 0,
    };
    this.items.update((i) => [...i, item]);
  }

  calculatePercentage(event: any, item: ItemDto) {
    let money = this.retrieveAmount(event.target.value as string);
    this.items().map((i) =>
      i.name === item.name
        ? (i.percentage = (parseFloat(money) / this.baseAmount()) * 100)
        : i
    );
  }

  retrieveAmount(money: string): string {
    return money.replaceAll(',', '').replace('₦', '');
  }
}
