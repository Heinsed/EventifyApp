import MaskInput from "react-native-mask-input";
import styled from "styled-components/native";
import UIStyles from "../styles/UI";
import {useState} from "react";
import mainStore from "../stores/MainStore";


const FormInput = ({...rest}) => {
    const [isFocused, setFocused] = useState(false);
    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;
    return(
        <TextField
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            isFocused={isFocused}
            {...rest}
            currentTheme={currentTheme}
        />
    )
}



const TextField = styled(MaskInput)(({isFocused, currentTheme}) => ({
    padding: 16,
    marginTop: 20,
    borderBottomColor: isFocused ? (currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green) : (currentTheme === 'dark' ? UIStyles.light.lightGrey : UIStyles.light.lightGrey),
    borderBottomWidth: 0.2,
    fontSize: 14,
    color: currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.black,
    fontFamily: 'MontserratRegular',
}));



export default FormInput;