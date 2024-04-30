import {Modal, Text, View, Pressable, ScrollView, CheckBox} from "react-native";
import {useState} from "react";
import styled from "styled-components/native";
import {SafeAreaView} from "react-native-safe-area-context";
import Container from "./Container";
import Icon from "./Icon";
import {UIStyles} from "../styles/UI";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const FilterEvents = () =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    return(

        <FilterContainer>
            <FilterButton onPress={() => setModalVisible(true)}>
                <Text>123</Text>
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
                        <FilterCloseButton onPress={() => setModalVisible(false)}>
                            <Icon iconType={"close"} size={28} color={UIStyles.colors.green}/>
                        </FilterCloseButton>
                        <FilterHeaderTitle>Фільтр</FilterHeaderTitle>
                        <FilterClearButton onPress={() => console.log('filter is cleared')}>
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
                                    <FilterCheckbox>
                                        <BouncyCheckbox
                                            onPress={(isChecked: false) => {}}
                                            size={24}
                                            fillColor={UIStyles.colors.green}
                                            innerIconStyle={{ borderRadius: 5, borderWidth: 1, borderColor: UIStyles.colors.green }}
                                            iconStyle={{ borderRadius: 5 }}
                                        />
                                        <CheckboxTitle>Концерт</CheckboxTitle>
                                    </FilterCheckbox>


                                </FilterSectionContainer>
                            </FilterSection>

                        </FilterSections>

                    </Container>

                </FilterModalContainer>
                <FilterSubmitWrapper>
                    <FilterSubmitArea>
                        <SubmitButton onPress={() => {console.warn('submited filter')}}>
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
    width: '100%',

}));

const FilterButton = styled.Pressable( () => ({
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

const FilterCloseButton = styled.Pressable( () => ({
    flex: 1,
}));


const FilterHeaderTitle = styled.Text( () => ({
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: UIStyles.colors.black,
    textAlign: 'center',
    flex: 1
}));

const FilterClearButton = styled.Pressable( () => ({
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



const FilterCheckbox = styled.View( () => ({
    flexDirection: 'row',
    alignItems: 'center',

}));

const CheckboxTitle = styled.Text( () => ({
    fontSize: 16,
    color: UIStyles.colors.black,
    fontFamily: 'MontserratMedium',

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

const SubmitButton = styled.Pressable( () => ({
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