import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import TabItem from "./components/TabItem";
import styled from "styled-components/native";


const Tabs = ({ state, descriptors, navigation }) => {
    return (
        <TabsNavigation>
            <NavigationWrapper>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
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

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <Pressable
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={route.key}
                    >
                        <TabItem title={label} isFocused={isFocused} iconType={icon} />
                    </Pressable>
                );
            })}
            </NavigationWrapper>
        </TabsNavigation>
    );
}

const TabsNavigation = styled.SafeAreaView( () => ({
    width: '100%',
    background: 'white',

}));

const NavigationWrapper = styled.View( () => ({
    marginTop: 15,
    marginBottom: 10,
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

