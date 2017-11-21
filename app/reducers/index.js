import { combineReducers } from 'redux';
import currencies from './currencies';
import theme from './themes';
import network from './network';

export default combineReducers({
    currencies,
    theme,
    network
});