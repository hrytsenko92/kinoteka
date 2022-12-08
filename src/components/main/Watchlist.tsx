import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { add, remove } from "../../redux/playlistSlice";
import { RootState } from "../../redux/store";
import { ItemCard }from "./ItemCard"

type Props = {
  playlistID: number[];
};

export const Container = styled.div`
  position: relative;
  left: 0;
  top: 20px;
  width: 100%;
`;
export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
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
  // console.log(location.state.active)
  // console.log(typeof location)
  // const appLang = useAppSelector((state: RootState) => state.lang.value);
  // const playlist = useAppSelector((state: RootState) => state.playlist.value);
  // const [idList, setIdList] = useState<number[]>();
  // const dispatch = useAppDispatch();
  // const handleRemove = (id: number) => {
  //   dispatch(remove(id));
  // };

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
