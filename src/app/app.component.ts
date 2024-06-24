import { Component, OnInit, signal } from '@angular/core';
import { NgxCurrencyDirective } from 'ngx-currency';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemDto } from './models/item.dto';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxCurrencyDirective, MatButtonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
    item.percentage = (parseFloat(money) / this.baseAmount()) * 100;
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
