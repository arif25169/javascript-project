import moment from 'moment';
import { InputData } from '@/types';
import CommissionEnum from '@/config/commissionenum';

import { roundValue } from './roundvalue';

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

const calculatationCashIn = (amount: number) => {
  const commission = roundValue(amount * CommissionEnum.CASH_IN);
  return commission > 5 ? 5 : commission;
};

const calculatationJuridicalCashOut = (amount: number) => {
  if (amount < 0.5) {
    return 0;
  }
  return roundValue(amount * CommissionEnum.CASH_OUT);
};

const calculationNaturalCashOut = (
  datalist: InputData[],
  user_id: number,
  date: string,
  amount: number,
) => {
  const result = datalist.filter(
    (item) =>
      item.user_id === user_id &&
      item.date <= date &&
      moment(item.date).week() === moment(date).week(),
  );
  const weeklyTransactionAmount = result.reduce((acc, cur) => acc + cur.operation.amount, 0);

  if (weeklyTransactionAmount <= 1000) {
    return 0;
  }
  if (amount > 1000) {
    return roundValue((amount - 1000) * CommissionEnum.CASH_OUT);
  }
  return roundValue(amount * CommissionEnum.CASH_OUT);
};

export { calculatationCashIn, calculatationJuridicalCashOut, calculationNaturalCashOut };
