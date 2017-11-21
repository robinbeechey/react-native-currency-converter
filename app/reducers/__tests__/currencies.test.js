import reducer from '../currencies';
import { getInitialConversion, GET_INITIAL_CONVERSION } from '../../actions/currencies';

it('sets initial state', () => {
    const expected = {
        baseCurrency: 'USD',
        quoteCurrency: 'GBP',
        amount: 100,
        conversions: {},
        error: null,
    };
    const actual = reducer(undefined, {});
    expect(actual).toEqual(expected);

});

it('sets nested data on initial fetch', () => {
    const expected = {
        baseCurrency: 'USD',
        quoteCurrency: 'GBP',
        amount: 100,
        conversions: {
            USD: {
                isFetching: true,
                date: '',
                rates: {},
            }
        },
        error: null,
    };
    const actual = reducer(undefined, getInitialConversion());
    expect(actual).toEqual(expected);
});


it('sets inital state', () => {
  expect(reducer(undefined, {})).toMatchSnapshot();
});

it('sets nested data on initial fetch', () => {
  expect(reducer(undefined, getInitialConversion())).toMatchSnapshot();
});