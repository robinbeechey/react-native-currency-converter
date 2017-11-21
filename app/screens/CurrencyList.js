import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, FlatList, View, StatusBar} from 'react-native';
import { ListItem, Separator } from '../components/List';
import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';


const mapStateToProps = (state) => {
    return {
        baseCurrency: state.currencies.baseCurrency,
        quoteCurrency: state.currencies.quoteCurrency,
        primaryColor: state.theme.primaryColor,
    }
};

class CurrencyList extends Component {

    static propTypes = {
        navigator: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        primaryColor: PropTypes.string
    };

    handlePress = (currency) => {
        const {type} = this.props;
        if (type === 'base') {
            this.props.dispatch(changeBaseCurrency(currency))
        } else if (type === 'quote') {
            this.props.dispatch(changeQuoteCurrency(currency))
        }

        this.props.navigator.popToRoot({
            animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        });
    };

    render() {
        const {type} = this.props;

        let comparisonCurrency = this.props.baseCurrency;

        if (type === 'quote') {
            comparisonCurrency = this.props.quoteCurrency;
        }

        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="default" translucent={false}/>
                <FlatList
                    data={currencies}
                    renderItem={({item}) =>(
                        <ListItem
                            text={item}
                            onPress={() => this.handlePress(item)}
                            selected={item === comparisonCurrency}
                            iconBackground={this.props.primaryColor}
                        />
                        )
                    }
                    keyExtractor={(item) => item}
                    ItemSeparatorComponent={Separator}
                />
            </View>
        );
    }

}


export default connect(mapStateToProps)(CurrencyList);