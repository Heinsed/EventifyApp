import {Modal, Text, View, Pressable, ScrollView, CheckBox} from "react-native";
import {useState, useEffect, useRef} from "react";
import styled from "styled-components/native";
import {SafeAreaView} from "react-native-safe-area-context";
import Container from "../Container";
import Icon from "../Icon";
import {UIStyles} from "../../styles/UI";
import {fetchEventData} from "../../api/getEvents";
import CustomPressable from "../CustomPressable";
import CategoryCheckbox from "./components/CategoryCheckbox";


const FilterEvents = ({onFilterChange}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesCheckboxes, setCategoriesCheckboxes] = useState(categories.map(() => false));
    const [selectedCategories, setSelectedCategories] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEventData();
                const uniqueCategories = [...new Set(data.map(event => event.Category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);


    const handleCategoryChange = (category, isChecked) => {
        if (isChecked) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
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

            <FilterButton targetFunction={() => setModalVisible(true)}>
                <Icon iconType={"filter"} size={28} color={UIStyles.colors.white}/>
                <FilterButtonTitle>Фільтр ({selectedCategories !== '' ? selectedCategories.length : null})</FilterButtonTitle>
            </FilterButton>

            <FilterModal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <FilterModalContainer>
                    <HeaderContainer>
                        <FilterCloseButton targetFunction={() => setModalVisible(false)}>
                            <Icon iconType={"close"} size={28} color={UIStyles.colors.green}/>
                        </FilterCloseButton>
                        <FilterHeaderTitle>Фільтр ({selectedCategories !== '' ? selectedCategories.length : null})</FilterHeaderTitle>
                        <FilterClearButton targetFunction={() => clearFilter()}>
                            <FilterClearButtonTitle>Очистити</FilterClearButtonTitle>
                        </FilterClearButton>
                    </HeaderContainer>
                    <Container>
                        <FilterSections>
                            <FilterSection>
                                <FilterSectionHeader>
                                    <FilterSectionTitle>Категорія</FilterSectionTitle>
                                </FilterSectionHeader>
                                <FilterSectionContainer>
                                    {categories.map((category, index) => (
                                        <CategoryCheckbox
                                            category={category}
                                            key={index}
                                            isChecked={categoriesCheckboxes[index] && selectedCategories.includes(category)}
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
                <FilterSubmitWrapper>
                    <FilterSubmitArea>
                        <SubmitButton targetFunction={() => {submitFilter()}}>
                            <SubmitButtonTitle>
                                Застосувати
                            </SubmitButtonTitle>
                        </SubmitButton>
                    </FilterSubmitArea>
                </FilterSubmitWrapper>
            </FilterModal>

        </FilterContainer>

    )
}

const FilterContainer = styled.View( () => ({
    minWidth: '100%',
    marginTop: 10,
    paddingBottom: 0,
    paddingLeft: 24,
    paddingRight: 24,
}));

const FilterButton = styled(CustomPressable)(() => ({
    backgroundColor: UIStyles.colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 8,
    justifyContent: 'center',
}));

const FilterButtonTitle = styled.Text( () => ({
    fontSize: 16,
    fontFamily: 'MontserratMedium',
    color: UIStyles.colors.white
}));

const FilterModal = styled.Modal( () => ({
    flex: 1,
    height: '100%',
}));

const FilterModalContainer = styled.SafeAreaView( () => ({
    flex: 1,
    height: '100%'
}));

const HeaderContainer = styled.View( () => ({
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomColor: UIStyles.colors.lightGrey,

}));

const FilterCloseButton = styled(CustomPressable)( () => ({
    flex: 1,
}));


const FilterHeaderTitle = styled.Text( () => ({
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: UIStyles.colors.black,
    textAlign: 'center',
    flex: 1
}));

const FilterClearButton = styled(CustomPressable)( () => ({
    flex: 1,

}));

const FilterClearButtonTitle = styled.Text( () => ({
    fontSize: 14,
    fontFamily: 'MontserratBold',
    color: UIStyles.colors.green,
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

const FilterSectionTitle = styled.Text( () => ({
    fontSize: 24,
    fontFamily: 'MontserratSemiBold',
    color: UIStyles.colors.black,


}));

const FilterSectionContainer = styled.View( () => ({
    marginTop: 10,
    gap: 14,
}));



const FilterSubmitWrapper = styled.View( () => ({
    margin: 'auto 0',
    marginBottom: 0,
    width: '100%',
    background: 'white',
    borderTopWidth: 1,
    borderTopColor: UIStyles.colors.lightGrey,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 18,
    paddingBottom: 18,



}));

const FilterSubmitArea = styled.SafeAreaView( () => ({


}));

const SubmitButton = styled(CustomPressable)( () => ({
    background: UIStyles.colors.green,
    paddingTop: 21,
    paddingBottom: 21,
    borderRadius: 12,
}));

const SubmitButtonTitle = styled.Text( () => ({
    fontSize: 16,
    color: UIStyles.colors.white,
    fontFamily: 'MontserratSemiBold',
    textAlign: 'center',
}));

export default FilterEvents;