import {View, Text} from "react-native";
import styled from "styled-components/native";
import UIStyles from "../../../styles/UI";
import Icon from "../../../components/Icon";

const TabItem = ({isFocused, iconType}) => {
    return(
        <IconWrapper isFocused={isFocused}>
            {
                isFocused ?
                    <FocusedDot/>
                    :
                    null
            }
            <Icon iconType={iconType} color={isFocused ? UIStyles.colors.green : UIStyles.colors.black} size="24"/>
        </IconWrapper>
    );
}

const IconWrapper = styled.View(props => ({
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    justifySelf: props.type === 'map' ? 'center' : null,
}));

const FocusedDot = styled.View(props => ({
    width: 5,
    height: 5,
    background: UIStyles.colors.green,
    top: -5,
    position: 'absolute',
    borderRadius: 5,
}));

export default TabItem;