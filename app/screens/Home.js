import React, {Component} from 'react';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView, NetInfo, Alert } from 'react-native';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Button';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { connectAlert, AlertProvider } from '../components/Alert';
import { AnimateIn } from '../components/Animations';
import { swapCurrency, changeCurrencyAmount, getInitialConversion} from '../actions/currencies';
import { changeNetworkStatus } from '../actions/network';


const mapStateToProps = (state) => {
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;
    const conversionSelector = state.currencies.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};

    return {
        baseCurrency,
        quoteCurrency,
        amount: state.currencies.amount,
        conversionRate: rates[quoteCurrency] || 0,
        isFetching: conversionSelector.isFetching,
        lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
        primaryColor: state.theme.primaryColor,
        currencyError: state.currencies.error,
        isConnected: state.network.connected
    };
};

class Home extends Component {

    static propTypes = {
        navigator: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        amount: PropTypes.number,
        conversionRate: PropTypes.number,
        isFetching: PropTypes.bool,
        lastConvertedDate: PropTypes.object,
        alertWithType: PropTypes.func,
        currencyError: PropTypes.string,
        isConnected: PropTypes.bool,

    };

    static navigatorStyle = {
        //navBarHidden: true,
        backgroundColor: 'red',
    };

    componentWillMount() {
        this.props.dispatch(getInitialConversion());
        NetInfo.addEventListener('change', this.handleNetworkChange);
    }

    componentDidMount(){
        SplashScreen.hide();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
            this.props.alertWithType('error', 'Error', nextProps.currencyError);
        };

    };

    componentWillUnmount() {
        NetInfo.removeEventListener('change', this.handleNetworkChange);
    }

    handleNetworkChange = (info) => {
        console.log("Network info:", info, this.props.isConnected);
        this.props.dispatch(changeNetworkStatus(info));
    };

    handleDisconnectedPress = () => {
        this.props.alertWithType(
            'warn',
            'Not Connected to the internet',
            "Just a heads up that you're not connected to the internet - some features may not work."
        );
    };

    handleTextChange = (text) => {
        this.props.dispatch(changeCurrencyAmount(text));
    };

    handlePressBaseCurrency = () => {
        this.props.navigator.push({
            screen: 'CurrencyList',
            title: 'Base Currency',
            passProps: {
                type: 'base'
            },
            animated: true,
            animationType: 'fade',
        });
    };

    handlePressQuoteCurrency = () => {
        this.props.navigator.push({
            screen: 'CurrencyList',
            title: 'Quote Currency',
            passProps: {
                type: 'quote'
            },
            animated: true,
            animationType: 'fade',
        });
    };

    handleSwapCurrency = () => {
        this.props.dispatch(swapCurrency());
    };

    handleOptionsPress = () => {
        this.props.navigator.push({
            screen: 'Options',
            title: 'Options',
            animated: true,
            animationType: 'slide-horizontal'
        });
    };

    render() {
        let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);

        if (this.props.isFetching) {
            quotePrice = '...';
        }

        return (
            <Container backgroundColor={this.props.primaryColor}>
                <StatusBar translucent={false} barStyle="light-content"/>
                <Header
                    onPress={this.handleOptionsPress}
                    isConnected={this.props.isConnected}
                    onWarningPress={this.handleDisconnectedPress}
                />
                <KeyboardAvoidingView behavior="padding">
                    <AnimateIn delay={300} duration={700}  type="fromBottom">
                        <Logo tintColor={this.props.primaryColor}/>
                    </AnimateIn>
                    <AnimateIn delay={300} duration={800} type="fromBottom">
                        <InputWithButton
                            buttonText={this.props.baseCurrency}
                            onPress={this.handlePressBaseCurrency}
                            defaultValue={this.props.amount.toString()}
                            keyboardType="numeric"
                            onChangeText={this.handleTextChange}
                            textColor={this.props.primaryColor}
                        />
                        <InputWithButton
                            buttonText={this.props.quoteCurrency}
                            onPress={this.handlePressQuoteCurrency}
                            value={quotePrice}
                            editable={false}
                            textColor={this.props.primaryColor}
                        />
                    </AnimateIn>
                    <AnimateIn delay={300} duration={900} type="fromBottom">
                        <LastConverted
                            base={this.props.baseCurrency}
                            quote={this.props.quoteCurrency}
                            conversionRate={this.props.conversionRate}
                            date={this.props.lastConvertedDate}
                        />
                    </AnimateIn>
                    <AnimateIn delay={300} duration={1000} type="fromBottom">
                        <ClearButton
                            text="Reverse currencies"
                            onPress={this.handleSwapCurrency}
                        />
                    </AnimateIn>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}


export default connect(mapStateToProps)(Home);