import styled from "styled-components/native";
import {UIStyles} from "../styles/UI";


const Container = ({children}) => {
    return(
        <ContainerBox>
            {children}
        </ContainerBox>
    )
}
const ContainerBox = styled.View( () => ({
    paddingTop: 15,
    paddingLeft: 24,
    paddingRight: 24,


}));
export default Container;