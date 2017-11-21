import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import buildStyles from './config/styles';
import { AlertProvider } from './components/Alert';
import store from './config/store';
import { Navigation } from 'react-native-navigation';
import codePush from 'react-native-code-push';

import {registerScreens} from './screens';

buildStyles();

registerScreens(store, Provider);


//const AppWithNavigation = connect(mapStateToProps)(App);

//export default () => (

//<Provider store={store}>
//    <AlertProvider>
//        <AppWithNavigation />
//    </AlertProvider>
//</Provider>
//);

const navigatorStyle = {
    statusBarColor: 'black',
    statusBarTextColorScheme: 'light',
    navigationBarColor: 'black',
    navBarBackgroundColor: '#0a0a0a',
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
    tabBarButtonColor: 'red',
    tabBarSelectedButtonColor: 'red',
    tabBarBackgroundColor: 'clear'
};


const App = () => {

    Navigation.startSingleScreenApp({
        screen: {
            screen: 'Home',
            title: 'Home',
            //navBarHidden: true
        },
        //navBarHidden: true
    });

};

//export default codePush(App);
export default App;


