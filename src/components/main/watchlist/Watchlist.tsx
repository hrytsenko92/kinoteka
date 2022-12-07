import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { remove } from "../../../redux/playlistSlice";
import { RootState } from "../../../redux/store";
import { WatchlistCard } from "../itemCard/WatchlistCard";

type Props = {
  language?: string;
};
type Playlist = {
  value: number[];
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

export const Watchlist: React.FC<Props> = ({ language }) => {
  const playlist = useAppSelector((state: RootState) => state.playlist.value);
  const [moviesList, setMovieList] = useState<number[]>();
  const dispatch = useAppDispatch();
  const handleRemove = (id: number) => {
    dispatch(remove(id));
  };
  useEffect(() => {
    const updateList = () => {
      setMovieList(playlist);
    };
    updateList();
  }, [playlist]);
  console.log(moviesList);
  return (
    <Container>
      {moviesList !== undefined ? (
        <ListWrapper>
          {moviesList?.map((item) => (
            <WatchlistCard
              key={item}
              movieID={item}
              language={language}
              handleRemove={handleRemove}
            />
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
