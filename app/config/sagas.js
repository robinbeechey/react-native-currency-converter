import { takeEvery, select, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {CONVERSION_ERROR, CONVERSION_RESULT} from '../actions/currencies';
import { SWAP_CURRENCY, CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION} from '../actions/currencies';

export const getLatestRate = currency => fetch(`https://api.fixer.io/latest?base=${currency}`);

const fetchLatestConversionRates = function * (action) {

    const { connected, hasCheckedStatus } = yield select(state => state.network);

    if(!connected && hasCheckedStatus ){
        yield put({
            type: CONVERSION_ERROR,
            error: 'Not connected to the internet. Conversion rate may be outdate or unavailable.'
        });
        return;
    }

    try {
        let currency = action.currency;
        if (currency === undefined) {
            currency = yield select(state => state.currencies.baseCurrency)
        }
        const response = yield call(getLatestRate, currency);
        const result = yield response.json();

        if (result.error) {
            yield put({type: CONVERSION_ERROR, error: result.error})
        } else {
            yield put({type: CONVERSION_RESULT, result})
        }
    } catch (e) {
        yield put({type: CONVERSION_ERROR, error: e.message})
    }
};

const clearConversionError = function * () {
    const DELAY_SECONDS = 4;
    const error = yield select(state => state.currencies.error);
    if (error) {
        yield delay(DELAY_SECONDS * 1000);
        yield put({ type: CONVERSION_ERROR, error: null })
    }
};

const root = function * rootSaga() {
    yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
    yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
    yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
    yield takeEvery(CONVERSION_ERROR, clearConversionError)
};

export default root;