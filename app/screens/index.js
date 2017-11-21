import { Navigation } from 'react-native-navigation';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import CurrencyList from './CurrencyList';
import Options from './Options';
import Themes from './Themes';
import codePush from 'react-native-code-push';
import { View, StatusBar } from 'react-native';
import { AlertProvider, connectAlert } from '../components/Alert';

function wrap(WrappedComponent) {
    const ConnectedComponent = connectAlert(WrappedComponent);

    class PP extends Component {
        static navigatorStyle = {
            //navBarHidden: true,
            backgroundColor: 'red',
        };

        render() {

            return (
                <AlertProvider>
                    <ConnectedComponent {...this.props}/>
                </AlertProvider>
            );
        }
    }

    return PP;
}


export function registerScreens(store, Provider) {
    Navigation.registerComponent('Home', () => wrap(Home), store, Provider);
    Navigation.registerComponent('Options', () => Options, store, Provider);
    Navigation.registerComponent('CurrencyList', () => CurrencyList, store, Provider);
    Navigation.registerComponent('Themes', () => Themes, store, Provider);
}

