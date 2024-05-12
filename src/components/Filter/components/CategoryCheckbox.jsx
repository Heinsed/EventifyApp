import BouncyCheckbox from "react-native-bouncy-checkbox";
import {UIStyles} from "../../../styles/UI";
import styled from "styled-components/native";
import {useRef} from "react";



const CategoryCheckbox = ({ category, isChecked, onChange }) => {
    return (
        <FilterCheckbox>
            <BouncyCheckbox
                onPress={() => {
                    onChange(!isChecked);
                }}
                isChecked={isChecked}
                size={24}
                fillColor={UIStyles.colors.green}
                innerIconStyle={{ borderRadius: 5, borderWidth: 1, borderColor: UIStyles.colors.green }}
                iconStyle={{ borderRadius: 5 }}
            />
            <CheckboxTitle>{category}</CheckboxTitle>
        </FilterCheckbox>
    )
}

const FilterCheckbox = styled.View( () => ({
    flexDirection: 'row',
    alignItems: 'center',

}));

const CheckboxTitle = styled.Text( () => ({
    fontSize: 16,
    color: UIStyles.colors.black,
    fontFamily: 'MontserratMedium',

}));
export default CategoryCheckbox;