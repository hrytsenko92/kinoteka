import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { remove } from "../../redux/playlistSlice";
import { RootState } from "../../redux/store";
import removeSVG from "../../assets/svg/remove.svg";
import { WatchlistItem } from "./WatchlistItem";


export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
  background-color: aqua;
`;
export const CardWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  width: 100%;
  height: 100%;
`;
export const ListWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  width: 100%;
  height: 100%;
`;
export const ListContainer = styled.ul``;
export const ListItem = styled.li`
  width: 400px;
  height: 50px;
  background-color: burlywood;
`;

export const Watchlist: React.FC = (props) => {
  const playlist = useAppSelector((state: RootState) => state.playlist.value);
  return (
    <Container>
      <ListWrapper>
        <ListContainer>
          {playlist.map((item)=> (
            <ListItem>
              {<WatchlistItem movieID={item}/>}
            </ListItem>
          ))}
        </ListContainer>
      </ListWrapper>
      <CardWrapper></CardWrapper>
    </Container>
  );
};
