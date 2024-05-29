import React, { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    Linking,
    Platform,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import CustomPressable from "../../components/CustomPressable";
import { getCurrentUser } from "../../utils/User/getUser";
import { useTheme } from "../../providers/ThemeProvider";

const Profile = () => {
    const [user, setUser] = useState([]);
    const { theme, isAutoTheme, toggleAutoTheme, toggleManualTheme } = useTheme();

    global.currentTheme = theme;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUser();
    }, []);

    const alertModal = useCallback(() => {
        Alert.alert(
            'Це тестовий алерт',
            'тест мсг',
            [
                {
                    text: 'Test Accept',
                    onPress: () => Alert.alert('Accept Pressed'),
                    style: 'default',
                },
                {
                    text: 'Dismiss',
                    style: 'cancel',
                    cancelable: true,
                },
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                        'Андроід би сприйняв тап за межами алерту',
                    ),
            },
        );
    }, []);

    const handlePress = useCallback(async (url) => {
        await Linking.openURL(url);
    }, []);

    const ButtonContact = ({ url, children }) => {
        return (
            <CustomPressable targetFunction={() => handlePress(url)}>
                {children}
            </CustomPressable>
        );
    };

    return (
        <View>
            <CustomPressable targetFunction={alertModal}>
                <Text>Press to alert!</Text>
            </CustomPressable>
            <ButtonContact url={"tel:+380677432894"}>
                <Text>Phone</Text>
            </ButtonContact>
            <ButtonContact url={"mailto:vkinev6@gmail.com"}>
                <Text>E-mail</Text>
            </ButtonContact>
            <ButtonContact url={"sms:+380677432894"}>
                <Text>SMS</Text>
            </ButtonContact>
            <ButtonContact
                url={
                    "https://reactnative.dev/docs/linking?language=javascript"
                }
            >
                <Text>WEB</Text>
            </ButtonContact>
            <Text>Profile, {user.name}</Text>
            <Switch value={isAutoTheme} onValueChange={toggleAutoTheme} />
            <Switch
                value={!isAutoTheme && theme === "dark"}
                onValueChange={toggleManualTheme}
                disabled={isAutoTheme}
            />
            <Title>Text</Title>
        </View>
    );
};

const Title = styled(Text)(({}) => ({
    color: currentTheme === "light" ? "black" : "red",
}));

export default Profile;
