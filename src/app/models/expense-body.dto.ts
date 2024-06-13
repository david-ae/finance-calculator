import { ItemDto } from './item.dto';

export interface ExpenseBodyDto {
  baseAmount: number;
  items: ItemDto[];
}
