import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, Keyboard, Animated, Platform } from 'react-native';
import styles from './styles';


const ANIMATION_DURATION = 100;

const mapStateToProps = (state) => {
    return {
        tintColor: state.theme.primaryColor,
    };
};

class Logo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            containerImageWidth: new Animated.Value(styles.$largeContainerSize),
            imageWidth: new Animated.Value(styles.$largeImageSize),
        }

    }

    componentDidMount() {
        let showListener = 'keyboardWillShow';
        let hideListener = 'keyboardWillHide';
        if (Platform.OS === 'android') {
            showListener = 'keyboardDidShow';
            hideListener = 'keyboardDidHide';
        }
        this.keyboardShowListener = Keyboard.addListener(showListener, this.keyboardShow);
        this.keyboardHideListener = Keyboard.addListener(hideListener, this.keyboardHide);
    }

    componentWillUnmount() {
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }

    keyboardShow = () => {
        Animated.parallel([
            Animated.timing(this.state.containerImageWidth, {
                toValue: styles.$smallContainerSize,
                duration: ANIMATION_DURATION,
            }),
            Animated.timing(this.state.imageWidth, {
                toValue: styles.$smallImageSize,
                duration: ANIMATION_DURATION,
            })
        ]).start();
    };


    keyboardHide = () => {
        Animated.parallel([
            Animated.timing(this.state.containerImageWidth, {
                toValue: styles.$largeContainerSize,
                duration: ANIMATION_DURATION,
            }),
            Animated.timing(this.state.imageWidth, {
                toValue: styles.$largeImageSize,
                duration: ANIMATION_DURATION,
            })
        ]).start();
    };

    render() {
        const containerImageStyles = [
            styles.containerImage,
            {
                width: this.state.containerImageWidth,
                height: this.state.containerImageWidth
            },
        ];

        const imageStyles = [
            styles.logo,
            {width: this.state.imageWidth},
            this.props.tintColor ? { tintColor: this.props.tintColor } : null,
        ];


        return (
            <View style={styles.container}>
                <Animated.Image
                    resizeMode="contain"
                    style={containerImageStyles}
                    source={require('./images/background.png')}>
                    <Animated.Image
                        resizeMode="contain"
                        style={imageStyles}
                        source={require('./images/logo.png')}/>
                </Animated.Image>
                <Text style={styles.text}>Currency Converter</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps)(Logo);