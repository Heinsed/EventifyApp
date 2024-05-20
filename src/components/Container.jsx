import styled from "styled-components/native";
import UIStyles from "../styles/UI";


const Container = ({children}) => {
    return(
        <ContainerBox>
            {children}
        </ContainerBox>
    )
}
const ContainerBox = styled.View( () => ({
    paddingTop: 15,
    marginLeft: 24,
    marginRight: 24,
    flex: 1,
}));
export default Container;