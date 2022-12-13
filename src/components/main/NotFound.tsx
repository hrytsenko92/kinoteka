import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

export const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: ${(props) => props.theme.textColorOne};;
`;
export const DetailsUk = styled.span`
`;
export const DetailsUS = styled.span`
`;
export const NotFound: React.FC = () => {
    const appLang = useAppSelector((state: RootState) => state.lang.value);

  return (
    <Container>
       {appLang === "uk" ? <DetailsUk>Щось пішло не так</DetailsUk> : <DetailsUS>Oops something went wrong</DetailsUS>}
    </Container>
  );
};