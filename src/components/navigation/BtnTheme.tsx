import React, { useState } from "react";
import styled from "styled-components";
import Switch from "react-switch";
import { useAppDispatch } from "../../redux/hook";
import { togleLight, togleDark } from "../../redux/themeSlice";
export const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
  margin: 5px;
  white-space: nowrap;
`;
export const Details = styled.span`
  margin: 0 5px;
`;
export const BtnTheme: React.FC = (props) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const handleChangeLang = (nextChecked: any) => {
    setChecked(nextChecked);
    checked === true
      ? dispatch(togleLight("lightTheme"))
      : dispatch(togleDark("darkTheme"));
  };
  return (
    <Container>
      {checked === true ? (
        <Details>Dark mode</Details>
      ) : (
        <Details>Light mode</Details>
      )}
      <Switch
        checked={checked}
        onChange={handleChangeLang}
        onColor="#ffffff"
        onHandleColor="#757373"
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