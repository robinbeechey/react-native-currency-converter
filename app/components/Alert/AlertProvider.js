import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import {Provider} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

class AlertProvider extends Component {
    static childContextTypes = {
        alertWithType: PropTypes.func,
        alert: PropTypes.func,
    };

    static navigatorStyle = {
        //navBarHidden: true,
        backgroundColor: 'red',
    };

    static propTypes = {
        children: PropTypes.any,
    };

    getChildContext() {
        return {
            alert: (...args) => this.dropdown.alert(...args),
            alertWithType: (...args) => this.dropdown.alertWithType(...args),
        };
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
                {React.Children.only(this.props.children)}
                <DropdownAlert
                    translucent={true}
                    ref={(ref) => {
                            this.dropdown = ref;
                          }}
                />
            </View>
        );
    }
}

export default AlertProvider;