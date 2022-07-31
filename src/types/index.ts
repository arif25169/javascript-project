export interface Operation {
  amount: number;
  currency: string;
}

export interface InputData  {
  date: string;
  user_id: number;
  user_type: 'natural' | 'juridical';
  type: 'cash_in' | 'cash_out';
  operation: Operation;
}
