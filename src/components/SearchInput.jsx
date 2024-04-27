import styled from "styled-components/native";
import {UIStyles} from "../styles/UI";
import Icon from "./Icon";
import {Keyboard} from "react-native";


const SearchInput = () => {
    return(
        <SearchInputContainer>
            <SearchTextInput placeholder={"Пошук"}/>
            <IconWrapper>
                <Icon iconType={'search'} color={UIStyles.colors.white} size={28} />
            </IconWrapper>

        </SearchInputContainer>
    )
}

const SearchInputContainer = styled.View( () => ({
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 42
}));

const SearchTextInput = styled.TextInput( () => ({
    flex: 1,
    background: UIStyles.colors.darkWhite,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 12,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    fontSize: 15,
    fontFamily: 'MontserratRegular',
}));

const IconWrapper = styled.View( () => ({
    background: UIStyles.colors.green,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    height: '100%',
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    fontSize: 15,

}));



export default SearchInput;