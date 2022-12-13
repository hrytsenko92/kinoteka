import React, { useState } from "react";
import styled from "styled-components";
import Switch from "react-switch";
import { useAppDispatch } from "../../redux/hook";
import { togleUS, togleUKR } from "../../redux/langSlice";
export const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  margin: 5px;
  white-space: nowrap;
`;
export const Details = styled.span`
  margin: 0 5px;
  color: ${(props) => props.theme.textColorOne};
`;
export const BtnLang: React.FC = (props) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();

  const handleChangeLang = (nextChecked: any) => {
    setChecked(nextChecked);
    checked === true ? dispatch(togleUS("en-US")) : dispatch(togleUKR("uk"));
  };
  return (
    <Container>
      {checked === false ? (
        <Details>Ukrainian</Details>
      ) : (
        <Details>English</Details>
      )}
      <Switch
        checked={checked}
        onChange={handleChangeLang}
        onColor="#FFDD00"
        onHandleColor="#0057B7"
        handleDiameter={13}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 6px rgba(0, 0, 0, 0.2)"
        height={10}
        width={25}
      />
    </Container>
  );
};