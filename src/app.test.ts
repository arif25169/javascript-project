import { strict as assert } from 'assert';
import {
  calculatationCashIn,
  calculatationJuridicalCashOut,
  calculationNaturalCashOut,
} from './lib/calculation';
import transactions from './input.json';
import { InputData } from './types';

describe('cash in', () => {
  it('it will return 0.3% of amount if commission is less than 5', () => {
    assert.strictEqual(calculatationCashIn(200.0), 0.06);
  });

  it('it will return 5 when commission is 5 or higher ', () => {
    assert.strictEqual(calculatationCashIn(100000.0), 5);
  });
});

describe('cash out', () => {
  describe('juridical', () => {
    it('it will return 0 if commission is less than 0.5', () => {
      assert.strictEqual(calculatationJuridicalCashOut(0.4), 0);
    });

    it('it will return 0.3% of amount if commission is higher than 0.5', () => {
      assert.strictEqual(calculatationJuridicalCashOut(200), 0.6);
    });
  });

  describe('natural', () => {
    it('it will return 0 if weekly transaction is less than 1000', () => {
      assert.strictEqual(
        calculationNaturalCashOut(transactions as InputData[], 1, '2016-01-07', 1000),
        3,
      );
    });

    it('it will return amount-1000*0.003 if amount is higher than 1000', () => {
      assert.strictEqual(
        calculationNaturalCashOut(transactions as InputData[], 1, '2016-01-06', 30_000),
        87,
      );
    });

    it('it will return 0.3% of amount by default ', () => {
      assert.strictEqual(
        calculationNaturalCashOut(transactions as InputData[], 1, '2016-01-06', 30_000),
        87,
      );
    });
  });
});
