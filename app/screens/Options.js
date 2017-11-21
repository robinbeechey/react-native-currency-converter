import React, { Component } from 'react';
import { ScrollView, StatusBar, Platform, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { ListItem, Separator } from '../components/List';
import { connectAlert } from '../components/Alert';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;


class Options extends Component {

    static propTypes = {
        navigator: PropTypes.object,
        alertWithType: PropTypes.func
    };

    static navigatorStyle = {
        screenBackgroundColor: 'white',
    };

    handleThemesPress = () => {
        this.props.navigator.push({
            screen: 'Themes',
            title: 'Themes',
            animated: true,
            animationType: 'slide-horizontal'
        });
    };

    handleSitePress = () => {
        Linking.openURL('http://fixer.io').catch(()=> this.props.alertWithType('error', 'Sorry!', "Fixer.io can't be opened right now"));
    };


    render() {
        return (
            <ScrollView>
                <StatusBar translucent={false} barStyle="default"/>
                <ListItem
                    text="Themes"
                    onPress={this.handleThemesPress}
                    customIcon={
                    <Ionicons name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE}/>
                    }
                />
                <Separator />

                <ListItem
                    text="Fixer.io"
                    onPress={this.handleSitePress}
                    customIcon={
                    <Ionicons name={`${ICON_PREFIX}-link`} color={ICON_COLOR} size={ICON_SIZE}/>
                    }
                />
                <Separator />
            </ScrollView>
        )
    }
}

export default Options;