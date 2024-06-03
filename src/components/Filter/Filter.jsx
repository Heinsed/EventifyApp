import {Modal, Text, View, Pressable, ScrollView, CheckBox} from "react-native";
import {useState, useEffect, useRef} from "react";
import styled from "styled-components/native";
import {SafeAreaView} from "react-native-safe-area-context";
import Container from "../Container";
import Icon from "../Icon";
import UIStyles from "../../styles/UI";
import CustomPressable from "../CustomPressable";
import CategoryCheckbox from "./components/CategoryCheckbox";
import {getCategories} from "../../utils/getCategories";
import mainStore from "../../stores/MainStore";
import {observer} from "mobx-react-lite";





const FilterEvents = observer(({onFilterChange}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesCheckboxes, setCategoriesCheckboxes] = useState(categories.map(() => false));
    const [selectedCategories, setSelectedCategories] = useState([]);
    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();

                setCategories(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchCategories();
    }, []);




    const handleCategoryChange = (category, isChecked) => {
        if (isChecked) {
            setSelectedCategories([...selectedCategories, category.id]);
        } else {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category.id));
        }
    };

    const resetCategoriesCheckboxes = () => {
        setSelectedCategories([]);
        setCategoriesCheckboxes(categories.map(() => false));

    };


    const submitFilter = () => {
        onFilterChange(selectedCategories);
        setModalVisible(!modalVisible);
    }


    const clearFilter = () => {
        resetCategoriesCheckboxes();
    }

    return(

        <FilterContainer>

            <FilterButton targetFunction={() => setModalVisible(true)} currentTheme={currentTheme}>
                <Icon iconType={"filter"} size={28} color={currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.white}/>
                <FilterButtonTitle currentTheme={currentTheme}>Фільтр ({selectedCategories !== '' ? selectedCategories.length : null})</FilterButtonTitle>
            </FilterButton>

            <FilterModal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}

            >
                <FilterModalContainer currentTheme={currentTheme}>
                    <HeaderContainer currentTheme={currentTheme}>
                        <FilterCloseButton targetFunction={() => setModalVisible(false)}>
                            <Icon iconType={"close"} size={28} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green}/>
                        </FilterCloseButton>
                        <FilterHeaderTitle currentTheme={currentTheme}>Фільтр ({selectedCategories !== '' ? selectedCategories.length : null})</FilterHeaderTitle>
                        <FilterClearButton currentTheme={currentTheme} targetFunction={() => clearFilter()}>
                            <FilterClearButtonTitle>Очистити</FilterClearButtonTitle>
                        </FilterClearButton>
                    </HeaderContainer>
                    <Container>
                        <FilterSections>
                            <FilterSection>
                                <FilterSectionHeader>
                                    <FilterSectionTitle currentTheme={currentTheme}>Категорія</FilterSectionTitle>
                                </FilterSectionHeader>
                                <FilterSectionContainer>
                                    {categories.map((category, index) => (
                                        <CategoryCheckbox
                                            category={category.id}
                                            categoryTitle={category.title}
                                            key={index}
                                            isChecked={categoriesCheckboxes[index] && selectedCategories.includes(category.id)}
                                            onChange={(isChecked) => {
                                                const newCategoriesCheckboxes = [...categoriesCheckboxes];
                                                newCategoriesCheckboxes[index] = isChecked;
                                                setCategoriesCheckboxes(newCategoriesCheckboxes);
                                                handleCategoryChange(category, isChecked);
                                            }}
                                        />
                                    ))}
                                </FilterSectionContainer>
                            </FilterSection>
                        </FilterSections>
                    </Container>
                </FilterModalContainer>
                <FilterSubmitWrapper currentTheme={currentTheme}>
                    <FilterSubmitArea>
                        <SubmitButton currentTheme={currentTheme} targetFunction={() => {submitFilter()}}>
                            <SubmitButtonTitle currentTheme={currentTheme}>
                                Застосувати
                            </SubmitButtonTitle>
                        </SubmitButton>
                    </FilterSubmitArea>
                </FilterSubmitWrapper>
            </FilterModal>

        </FilterContainer>

    )
});

const FilterContainer = styled.View( () => ({
    minWidth: '100%',
    marginTop: 10,
    paddingBottom: 0,
    paddingLeft: 24,
    paddingRight: 24,
    overflow: 'hidden',
}));

const FilterButton = styled(CustomPressable)(({currentTheme}) => ({
    backgroundColor: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 8,
    justifyContent: 'center',
}));

const FilterButtonTitle = styled.Text( ({currentTheme}) => ({
    fontSize: 16,
    fontFamily: 'MontserratMedium',
    color: currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.white,
}));

const FilterModal = styled.Modal( () => ({
    flex: 1,
    height: '100%',

}));

const FilterModalContainer = styled.SafeAreaView( ({currentTheme}) => ({
    flex: 1,
    height: '100%',
    background: currentTheme === 'dark' ? UIStyles.dark.white : UIStyles.light.white,
}));

const HeaderContainer = styled.View( ({currentTheme}) => ({
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomColor: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.lightGrey,

}));

const FilterCloseButton = styled(CustomPressable)( () => ({
    flex: 1,
}));


const FilterHeaderTitle = styled.Text( ({currentTheme}) => ({
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
    textAlign: 'center',
    flex: 1
}));

const FilterClearButton = styled(CustomPressable)( () => ({
    flex: 1,

}));

const FilterClearButtonTitle = styled.Text( ({currentTheme}) => ({
    fontSize: 14,
    fontFamily: 'MontserratBold',
    color: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green,
    textAlign: 'right',
    top: 2,
}));

const FilterSections = styled.ScrollView( () => ({
    marginBottom: 60,
}));

const FilterSection = styled.View( () => ({
    marginBottom: 24,
}));

const FilterSectionHeader = styled.View( () => ({
    paddingTop: 10,

    paddingBottom: 10,
}));

const FilterSectionTitle = styled.Text( ({currentTheme}) => ({
    fontSize: 24,
    fontFamily: 'MontserratSemiBold',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,


}));

const FilterSectionContainer = styled.View( () => ({
    marginTop: 10,
    gap: 14,
}));



const FilterSubmitWrapper = styled.View( ({currentTheme}) => ({
    margin: 'auto 0',
    marginBottom: 0,
    width: '100%',
    background: currentTheme === 'dark' ? UIStyles.dark.white : UIStyles.light.white,
    borderTopWidth: 1,
    borderTopColor: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.lightGrey,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 18,
    paddingBottom: 18,



}));

const FilterSubmitArea = styled.SafeAreaView( () => ({


}));

const SubmitButton = styled(CustomPressable)( ({currentTheme}) => ({
    background: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green,
    paddingTop: 21,
    paddingBottom: 21,
    borderRadius: 12,
}));

const SubmitButtonTitle = styled.Text( ({currentTheme}) => ({
    fontSize: 16,
    color: currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.white,
    fontFamily: 'MontserratSemiBold',
    textAlign: 'center',
}));

export default FilterEvents;