import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExpenseBodyDto } from './models/expense-body.dto';
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

  expenseCalculator = signal<ExpenseBodyDto>({ baseAmount: 0, items: [] });

  constructor() {
    this.calculatorForm = new FormGroup({
      baseAmount: new FormControl('', [Validators.required]),
      itemTitle: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {}

  onChange(event: any) {
    console.log(event.target);
  }

  addExpenseItem() {
    const title = this.calculatorForm.get('itemTitle')?.value;
    const item: ItemDto = {
      name: title,
      amount: 0,
    };
    // this.expenseCalculator.update((c) => [...c.items, item]);
  }
}
