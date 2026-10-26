import styled from "styled-components/native";

const Overlay = styled.View`
    flex: 1;
    justify-content: flex-end;
`

const Container = styled.View`
    height: 40%;
    background-color: white;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 64px;
    gap: 24px; 
`

const IconCircle = styled.View`
    width: 72px;
    height: 72px;
    border-radius: 72px;
    background-color: ${props => props.$type == "success" ? "green" : "red"};

    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.Text`
    font-size: 32px;
`

const Description = styled.Text`
    font-size: 16px;
`

const CloseBtn = styled.TouchableOpacity`
    position: absolute;
    top: 24px;
    right: 24px;
`

export { CloseBtn, Container, Description, IconCircle, Title, Overlay }