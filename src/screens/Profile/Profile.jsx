import React, { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    Linking,
    Platform, ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import ProfileHeader from "./components/ProfileHeader";
import { getCurrentUser } from "../../utils/User/getUser";
import {observer} from "mobx-react-lite";
import mainStore from "../../stores/MainStore";
import UIStyles from "../../styles/UI";




const ProfileScreen = observer(() => {
    const [user, setUser] = useState([]);
    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;


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


    const handleSystemThemeSwitch = (value) => {
        themeStore.setUseSystemTheme(value);
    };

    const handleCustomThemeSwitch = (value) => {
        if (!themeStore.useSystemTheme) {
            themeStore.setTheme(value ? 'dark' : 'light');

        }
    };



    return (
        <ProfileSafeArea currentTheme={currentTheme}>
            <StatusBar
                barStyle={currentTheme === 'dark' ? "light-content" : "dark-content"}
            />
            <ProfileWrapper currentTheme={currentTheme}>
                <ProfileHeader name={user.name} avatar={user.avatar}/>
                <SettingsWrapper currentTheme={currentTheme}>
                    <SectionTitle currentTheme={currentTheme}>
                        ТЕМА
                    </SectionTitle>
                    <SettingsSection currentTheme={currentTheme}>
                        <SettingsRow currentTheme={currentTheme}>
                            <RowTitle currentTheme={currentTheme}>
                                Автоматично
                            </RowTitle>
                            <Switch
                                value={themeStore.useSystemTheme}
                                onValueChange={handleSystemThemeSwitch}
                                trackColor={{ false: currentTheme === 'dark' ? UIStyles.dark.white : UIStyles.light.lightGrey, true: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green }}
                                thumbColor={currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.white}
                            />

                        </SettingsRow>
                        <HorizontalLine currentTheme={currentTheme}/>
                        <SettingsRow currentTheme={currentTheme}>
                            <RowTitle currentTheme={currentTheme}>
                                Світла / темна тема
                            </RowTitle>
                            <Switch
                                value={themeStore.theme === 'dark'}
                                onValueChange={handleCustomThemeSwitch}
                                disabled={themeStore.useSystemTheme}
                                trackColor={{ false: currentTheme === 'dark' ? UIStyles.dark.grey : UIStyles.light.grey, true: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green }}
                                thumbColor={currentTheme === 'dark' ? UIStyles.dark.thumb : UIStyles.light.thumb}
                            />

                        </SettingsRow>
                    </SettingsSection>
                </SettingsWrapper>
            </ProfileWrapper>
        </ProfileSafeArea>
    );
});

const ProfileSafeArea = styled(SafeAreaView)(({currentTheme}) => ({
    background: currentTheme === 'dark' ? UIStyles.dark.white : UIStyles.light.white,
    flex: 1,
}));

const ProfileWrapper = styled(ScrollView)(({currentTheme}) => ({

}));

const SettingsWrapper = styled.View(({currentTheme}) => ({

}));

const SectionTitle = styled.Text(({currentTheme}) => ({
    marginTop: 24,
    fontSize: 14,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 8,
    fontFamily: 'MontserratSemiBold',
    color: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.dark,
}));

const SettingsSection = styled.View(({currentTheme}) => ({
    padding: 8,
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: 16,
    gap: 12,
    marginRight: 16,
    borderRadius: 16,
    background: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.grey,
}));

const HorizontalLine = styled.View(({currentTheme}) => ({
    width: '100%',
    height: 0.2,
    background: currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.lightGrey,
}));


const SettingsRow = styled.View(({currentTheme}) => ({
    marginLeft: 8,
    borderBottomWidth:0 ,
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

}));

const RowTitle = styled.Text(({currentTheme}) => ({
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
}));

export default ProfileScreen;
