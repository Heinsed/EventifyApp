import {observer} from "mobx-react-lite";
import mainStore from "../../../stores/MainStore";
import styled from "styled-components/native";
import UIStyles from "../../../styles/UI";

const ProfileHeader = observer(({avatar, name}) => {
    const {themeStore} = mainStore;
    const currentTheme = themeStore.theme;
    return (
        <HeaderContainer currentTheme={currentTheme}>
            <WrapperAvatar currentTheme={currentTheme}>
                <AvatarImage
                    currentTheme={currentTheme}
                    source={{
                        uri: avatar,
                    }}
                />
            </WrapperAvatar>
            <TextContainer currentTheme={currentTheme}>
                <WrapperSubTitle currentTheme={currentTheme}>
                    МІЙ ПРОФІЛЬ
                </WrapperSubTitle>
                <WrapperTitle currentTheme={currentTheme}>
                    Вітаємо, {name}!
                </WrapperTitle>
            </TextContainer>
        </HeaderContainer>
    )
});

const HeaderContainer = styled.View(({currentTheme}) => ({
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomColor: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.lightGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
}));

const WrapperAvatar = styled.View(({currentTheme}) => ({
    width: 70,
    height: 70,
}));

const AvatarImage = styled.Image(({currentTheme}) => ({
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green,
}));

const TextContainer = styled.View(({currentTheme}) => ({
    gap: 8,
}));

const WrapperSubTitle = styled.Text(({currentTheme}) => ({
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'MontserratBold',
    color: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green,
}));

const WrapperTitle = styled.Text(({currentTheme}) => ({
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
}));

export default ProfileHeader;