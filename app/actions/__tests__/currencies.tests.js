import { getInitialConversion, GET_INITIAL_CONVERSION, changeCurrencyAmount, CHANGE_CURRENCY_AMOUNT } from '../currencies';

//it('creates a GET_INITIAL_CONVERSION action', () => {
//    const expected = {
//        type: GET_INITIAL_CONVERSION
//    };
//    const actual = getInitialConversion();
//    expect(actual).toEqual(expected);
//});
//
//it('creates a CHANGE_CURRENCY_AMOUNT action', () => {
//    const expected = {
//        type: CHANGE_CURRENCY_AMOUNT,
//        amount: 1000,
//    };
//
//    const actual = changeCurrencyAmount(1000);
//    expect(actual).toEqual(expected);
//});

it('creates a GET_INITIAL_CONVERSION action', () => {
    expect(getInitialConversion()).toMatchSnapshot();
});

it('creates a CHANGE_CURRENCY_AMOUNT action', () => {
    expect(changeCurrencyAmount(1000)).toMatchSnapshot();
});