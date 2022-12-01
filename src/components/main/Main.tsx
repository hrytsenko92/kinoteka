import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { ItemList } from "./ItemList";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hook";
import { Watchlist } from "./Watchlist";

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
export const Main: React.FC = (props) => {
  const appLang = useAppSelector((state: RootState) => state.lang.value);
  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={<ItemList itemLabel={loadSection[0]} language={appLang} />}
        />
        <Route
          path="/popular"
          element={<ItemList itemLabel={loadSection[1]} language={appLang} />}
        />
        <Route
          path="/top_rated"
          element={<ItemList itemLabel={loadSection[2]} language={appLang} />}
        />
        <Route
          path="/upcoming"
          element={<ItemList itemLabel={loadSection[3]} language={appLang} />}
        />
        <Route
          path="/discover"
          element={<ItemList itemLabel={loadSection[5]} language={appLang} />}
        />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Container>
  );
};
