import * as fs from 'fs';
import { InputData  } from './types';
import { calculatationCashIn, calculatationJuridicalCashOut, calculationNaturalCashOut } from './lib/calculation';




const calculateCommission = async () => {
  const [filePath] = process.argv.splice(2);
  const res: number[] = [];
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const transactions = JSON.parse(data) as Array<InputData >;
    transactions.forEach(({ operation: { amount }, type, user_type, user_id, date }: InputData ) => {
      if (type === 'cash_in') {
        res.push(calculatationCashIn(amount));
      } else if (type === 'cash_out') {
        if (user_type === 'juridical') {
          res.push(calculatationJuridicalCashOut(amount));
        } else if (user_type === 'natural') {
          res.push(calculationNaturalCashOut(transactions, user_id, date, amount));
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
  //Using toFixed to match the output result which returns string instead of number.
  let result = res.map(item=>item.toFixed(2));
  console.log(result.join('\n'));
  return res;
};

calculateCommission();
