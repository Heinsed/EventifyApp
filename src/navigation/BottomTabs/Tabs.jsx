import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import TabItem from "./components/TabItem";
import styled from "styled-components/native";
import UIStyles from "../../styles/UI";
import CustomPressable from "../../components/CustomPressable";


const Tabs = ({ state, descriptors, navigation }) => {
    return (
        <TabsNavigation>
            <NavigationWrapper>
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
}

const TabsNavigation = styled.SafeAreaView( () => ({
    width: '100%',
    background: 'white',
    borderTopWidth: 1,
    borderTopColor: UIStyles.colors.lightGrey,
    marginTop: 0
}));

const NavigationWrapper = styled.View( () => ({
    paddingTop: 15,
    paddingBottom: 10,
    width: '100%',
    background: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-around',
    alignItems: 'flex-end'
}));

 export default Tabs;

