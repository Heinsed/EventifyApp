import {Pressable} from "react-native";
import styled from "styled-components/native";
const CustomPressable = ({children, targetFunction, ...rest}) => {

    return(
        <Pressable
            android_ripple={{
            color: 'rgba(255,255,255,0.5)',
            radius: 300,
            borderless: false,
            foreground: false,
        }}
            onPress={targetFunction}
            style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
                ...rest.style,
            })}

        >
            {children}
        </Pressable>
    )
}







export default CustomPressable;