import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSageMiddleware from 'redux-saga';
import {logger} from 'redux-logger';

import reducer from '../reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSageMiddleware();
const middleware = [sagaMiddleware];


if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

const store = createStore(
    reducer,
    compose(applyMiddleware(...middleware), autoRehydrate())
);

sagaMiddleware.run(rootSaga);

persistStore(store, {
    storage: AsyncStorage,
    blacklist: ['network'],
});

export default store;