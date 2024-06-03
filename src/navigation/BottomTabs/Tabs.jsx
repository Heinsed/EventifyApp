import { observer } from "mobx-react-lite";
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import TabItem from "./components/TabItem";
import styled from "styled-components/native";
import UIStyles from "../../styles/UI";
import CustomPressable from "../../components/CustomPressable";
import mainStore from "../../stores/MainStore";



const Tabs = observer(({ state, descriptors, navigation }) => {
    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;
    return (
        <TabsNavigation currentTheme={currentTheme}>
            <NavigationWrapper currentTheme={currentTheme}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];

                    const icon = options.icon;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    return (
                        <CustomPressable
                            targetFunction={onPress}
                            key={route.key}
                        >
                            <TabItem isFocused={isFocused} iconType={icon} />
                        </CustomPressable>
                    );
                })}
            </NavigationWrapper>
        </TabsNavigation>
    );
});

const TabsNavigation = styled.SafeAreaView(({currentTheme}) => ({
    width: '100%',
    borderTopWidth: 1,
    background: currentTheme === 'dark' ? UIStyles.dark.white : UIStyles.light.white,
    borderTopColor: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.lightGrey,
    marginTop: 0
}));

const NavigationWrapper = styled.View(({currentTheme}) => ({
    paddingTop: 15,
    paddingBottom: 10,
    width: '100%',
    background: currentTheme === 'dark' ? UIStyles.dark.white : UIStyles.light.white,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-around',
    alignItems: 'flex-end'
}));

export default Tabs;
