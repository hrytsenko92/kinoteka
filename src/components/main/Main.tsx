import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { ItemList } from "./ItemList";
import { Watchlist } from "./Watchlist";
import { Detail } from "./Detail";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

export const Container = styled.div`
  position: relative;
  left: 0;
  top: 20px;
`;
const loadSection: string[] = [
  "movie/now_playing",
  "movie/popular",
  "movie/top_rated",
  "movie/upcoming",
  "movie/latest",
  "discover/movie",
];
export const Main: React.FC = () => {
  const playlist = useAppSelector((state: RootState) => state.playlist.value);
  return (
    <Container>
      <Routes>
        <Route path="/" element={<ItemList itemLabel={loadSection[0]} />} />
        <Route
          path="/popular"
          element={<ItemList itemLabel={loadSection[1]} />}
        />
        <Route
          path="/top_rated"
          element={<ItemList itemLabel={loadSection[2]} />}
        />
        <Route
          path="/upcoming"
          element={<ItemList itemLabel={loadSection[3]} />}
        />
        <Route
          path="/discover"
          element={<ItemList itemLabel={loadSection[5]} />}
        />
        <Route path="/watchlist" element={<Watchlist playlistID={playlist} />} />
        <Route path="/details/:id" element={<Detail />} />
      </Routes>
    </Container>
  );
};
