import { Component, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ItemDto } from '../models/item.dto';
import { MatButtonModule } from '@angular/material/button';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-budget-by-percentage',
  standalone: true,
  imports: [NgxCurrencyDirective, MatButtonModule, ReactiveFormsModule],
  templateUrl: './budget-by-percentage.component.html',
  styleUrl: './budget-by-percentage.component.css',
})
export class BudgetByPercentageComponent {
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
    this.detailsForm.addControl(`${title}-percentage`, new FormControl(''));
    const item: ItemDto = {
      name: title,
      amount: 0,
      percentage: 0,
    };
    this.items.update((i) => [...i, item]);
  }

  calculateAmount(event: any, item: ItemDto) {
    let percentage = event.target.value as string;
    this.items().map((i) =>
      i.name === item.name
        ? (i.amount = (parseFloat(percentage) / 100) * this.baseAmount())
        : i
    );
  }

  retrieveAmount(money: string): string {
    return money.replaceAll(',', '').replace('₦', '');
  }
}
