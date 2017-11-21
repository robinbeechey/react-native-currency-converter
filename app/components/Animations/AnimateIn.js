import React, {Component} from 'react';
import Proptypes from 'prop-types';
import { Animated, Dimensions } from 'react-native';

const WINDOW_DIMENSIONS = Dimensions.get('window');
const SHOULD_ANIMATE = process.env.NODE_ENV !== 'development';

class AnimateIn extends Component {
    static propTypes = {
        children: Proptypes.any,
        type: Proptypes.oneOf(['fromBottom', 'fromTop', 'fadeIn']),
        delay: Proptypes.number,
        duration: Proptypes.number,
    };

    constructor(props) {
        super(props);

        this.animatedValue = new Animated.Value(0);
    };

    componentDidMount() {
        if (SHOULD_ANIMATE) {
            Animated.timing(this.animatedValue, {
                toValue: 1,
                delay: this.props.delay || 0,
                duration: this.props.duration || 500
            }).start();
        } else {
            this.animatedValue.setValue(1);
        }
    }

    render() {
        let styles = {};
        const { type } = this.props;

        if (type === 'fromTop') {
            styles = {
                opacity: this.animatedValue,
                transform: [
                    {
                        translateY: this.animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-WINDOW_DIMENSIONS.height, 0]
                        })
                    }
                ]
            };
        } else if (type === 'fadeIn') {
            styles = {
                opacity: this.animatedValue,
                transform: [
                    {
                        scale: this.animatedValue,

                    }
                ]
            };
        } else if (type === 'fromBottom') {
            styles = {
                opacity: this.animatedValue,
                transform: [
                    {
                        translateY: this.animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [WINDOW_DIMENSIONS.height, 0]
                        })
                    }
                ]
            };
        }


        return (
            <Animated.View style={styles}>
                {this.props.children}
            </Animated.View>
        );
    }
}

export default AnimateIn;