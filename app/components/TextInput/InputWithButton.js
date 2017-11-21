import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, TextInput, Animated } from 'react-native';
import styles from './styles';
import color from 'color';

class InputWithButton extends Component {

    constructor(props){
        super(props);

        this.backgroundColor = new Animated.Value(0);
    }

    componentDidUpdate(){
        if (parseFloat(this.props.value)){
            Animated.sequence([
                Animated.timing(this.backgroundColor, {
                    toValue: 1,
                }),
                Animated.timing(this.backgroundColor, {
                    toValue: 0,
                }),
            ]).start();
        }
    };

    render() {
        const {onPress, buttonText, editable=true, textColor} = this.props;

        const containerStyles = [styles.container];

        const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
            styles.$buttonBackgroundColorModifier
        );

        if (editable === false) {
            //containerStyles.push(styles.containerDisabled);
            containerStyles.push({
                backgroundColor: this.backgroundColor.interpolate({
                    inputRange:[0,1],
                    outputRange: [styles.$inputBackgroundBase, styles.$inputBackgroundAlt],
                })
            })
        }

        const buttonTextStyles = [
            styles.buttonText,
            {color: textColor}
        ];

        return (
            <Animated.View style={containerStyles}>
                <TouchableHighlight underlayColor={underlayColor} style={styles.buttonContainer} onPress={onPress}>
                    <Text style={buttonTextStyles}>{buttonText}</Text>
                </TouchableHighlight>
                <View style={styles.border}/>
                <TextInput style={styles.input} underlineColorAndroid="transparent" {...this.props}/>
            </Animated.View>
        );
    }
}

InputWithButton.propTypes = {
    onPress: PropTypes.func,
    buttonText: PropTypes.string,
    editable: PropTypes.bool,
    textColor: PropTypes.string,
    value: PropTypes.string
};


export default InputWithButton;