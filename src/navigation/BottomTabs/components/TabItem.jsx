import {View, Text} from "react-native";
import styled from "styled-components/native";
import UIStyles from "../../../styles/UI";
import Icon from "../../../components/Icon";
import mainStore from "../../../stores/MainStore";
import {observer} from "mobx-react-lite";


const TabItem = observer(({isFocused, iconType}) => {
    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;
    return(
        <IconWrapper isFocused={isFocused}>
            {
                isFocused ?
                    <FocusedDot currentTheme={currentTheme}/>
                    :
                    null
            }
            <Icon iconType={iconType} color={isFocused ? (currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green) : (currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black)} size="24"/>
        </IconWrapper>
    );
});

const IconWrapper = styled.View( () => ({
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
}));

const FocusedDot = styled.View(({currentTheme}) => ({
    width: 5,
    height: 5,
    background: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green,
    top: -5,
    position: 'absolute',
    borderRadius: 5,
}));

export default TabItem;