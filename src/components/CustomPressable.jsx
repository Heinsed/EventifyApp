import {Pressable} from "react-native";
import styled from "styled-components/native";
import mainStore from "../stores/MainStore";

const CustomPressable = ({children, targetFunction, ...rest}) => {
    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;
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
            currentTheme={currentTheme}
        >
            {children}
        </Pressable>
    )
}







export default CustomPressable;