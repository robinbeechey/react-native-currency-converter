import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container: {
        alignItems: 'center',
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 19,
        marginRight: 9,
    },
    text: {
        color: '$white',
        fontSize: 14,
        fontWeight: '300',
        paddingVertical: 20,
    }
})