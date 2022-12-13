import React from "react";
import styled from "styled-components";
import { devices} from "../../assets/Theme.styled";
import { useLocation } from "react-router-dom";
import { ItemCard }from "./ItemCard"
type Props = {
  playlistID: number[];
};
export const Container = styled.div`
  position: relative;
  left: 0;
  top: 15px;
  width: 100%;
  height: 100vh;
`;
export const ListWrapper = styled.div`
    display: grid;

  @media ${devices.mobile} {
    grid-template-columns: 1fr 1fr ;
  }
  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr 1fr ;
  }
  @media ${devices.laptop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media ${devices.laptopL} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media ${devices.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr ;
  }
  grid-template-rows: auto;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  gap: 40px;
  margin-top: 15px;
`;
export const Oops = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  min-width: 100%;
  height: 100vh;
`;
export const OopsMessage = styled.h1`
  margin-left: 200px;
  font-size: 50px;
`;
export const Watchlist: React.FC<Props> = ({ playlistID}) => {
  let location = useLocation()
  return (
    <Container>
      {playlistID !== undefined ? (
        <ListWrapper>
        {playlistID.map((item) => (
            <ItemCard filmId={item} isWatchlist={location.state.active} key={item} />
          ))}
        </ListWrapper>
      ) : (
        <Oops>
          <OopsMessage>Oops something went wrong</OopsMessage>
        </Oops>
      )}
    </Container>
  );
};