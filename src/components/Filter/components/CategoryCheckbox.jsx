import BouncyCheckbox from "react-native-bouncy-checkbox";
import UIStyles from "../../../styles/UI";
import styled from "styled-components/native";
import { observer } from "mobx-react-lite";
import mainStore from "../../../stores/MainStore";

const CategoryCheckbox = observer(({ categoryTitle, isChecked, onChange }) => {
    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;
    return (
        <FilterCheckbox>
            <BouncyCheckbox
                onPress={() => {
                    onChange(!isChecked);
                }}
                isChecked={isChecked}
                size={24}
                fillColor={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green}
                innerIconStyle={{ borderRadius: 5, borderWidth: 1, borderColor: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green }}
                iconStyle={{ borderRadius: 5 }}
            />
            <CheckboxTitle currentTheme={currentTheme}>{categoryTitle}</CheckboxTitle>
        </FilterCheckbox>
    )
});

const FilterCheckbox = styled.View(() => ({
    flexDirection: 'row',
    alignItems: 'center',
}));

const CheckboxTitle = styled.Text(({currentTheme}) => ({
    fontSize: 16,
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
    fontFamily: 'MontserratMedium',
}));

export default CategoryCheckbox;
