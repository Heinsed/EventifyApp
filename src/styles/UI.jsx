import {Appearance} from "react-native";




const getUIStyles = () => {
    const colorScheme = Appearance.getColorScheme();

    let styles;
    if(colorScheme === 'light'){
        styles = {
            colors: {
                white: '#fff',
                green: '#95C11F',
                black: '#000',
                grey: '#F2F2F2',
                dark: '#a1a1a1',
                lightGrey: '#d6d6d6',
                darkWhite: '#eeeeee',
                darkGreen: '#8CB51D',
            }
        }
    }else{
        styles = {
            colors: {
                white: '#000',
                green: '#95C11F',
                black: '#000',
                grey: '#F2F2F2',
                dark: '#a1a1a1',
                lightGrey: '#d6d6d6',
                darkWhite: '#eeeeee',
                darkGreen: '#8CB51D',
            }
        }
    }
    return styles;
}

const UIStyles = getUIStyles();



export default UIStyles;