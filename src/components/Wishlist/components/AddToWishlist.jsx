import styled from "styled-components/native";
import CustomPressable from "../../CustomPressable";
import UIStyles from "../../../styles/UI";
import Icon from "../../Icon";


const AddToWishlist = ({itemID}) => {


    return (
        <AddToWishlistButton targetFunction={() => console.log(itemID)}>
            <Icon iconType={'wishlist'} color={UIStyles.colors.green} size={24} />
        </AddToWishlistButton>
    )
}

const AddToWishlistButton = styled(CustomPressable)( () => ({

}));

export default AddToWishlist;