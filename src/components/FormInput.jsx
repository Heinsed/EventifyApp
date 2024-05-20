import MaskInput from "react-native-mask-input";
import styled from "styled-components/native";
import UIStyles from "../styles/UI";
import {useState} from "react";

const FormInput = ({...rest}) => {
    const [isFocused, setFocused] = useState(false);
    return(
        <TextField
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            isFocused={isFocused}
            {...rest}
        />
    )
}



const TextField = styled(MaskInput)(({isFocused}) => ({
    padding: 16,
    marginTop: 20,
    borderBottomColor: isFocused ? UIStyles.colors.green : UIStyles.colors.dark,
    borderBottomWidth: 0.2,
    fontSize: 14,
    fontFamily: 'MontserratRegular',
}));



export default FormInput;