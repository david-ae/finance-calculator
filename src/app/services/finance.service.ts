import { Injectable, signal } from '@angular/core';
import { IndexDbService } from './index-db.service';
import { ExpenseDto } from '../models/expense.dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private synchronized$ = new BehaviorSubject(false);

  constructor(private indexDbService: IndexDbService) {}

  addExpense(expense: ExpenseDto) {
    this.indexDbService.addExpense(expense);
  }

  getExpense(): Promise<ExpenseDto> {
    return this.indexDbService.getExpense();
  }
}
