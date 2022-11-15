import * as React from 'react';
import styled from "styled-components"
import { Routes, Route } from 'react-router-dom';
import {ItemList} from "./ItemList"
// import {RootState} from "../../redux/store"
// import {useAppSelector} from "../../redux/hook"
// const lang: string = "language=";
// const appLang = useAppSelector((state: RootState) => state.lang.value)

export const Container = styled.div`
  background-color: gray;
  
`
const loadSection: string[] = ["movie/now_playing","movie/popular","movie/top_rated","movie/upcoming","movie/latest","discover/movie"];

export const Main: React.FC = props => {
  return (
    <div>
        main
        <Routes>
      <Route path="/" element={<ItemList itemLabel={loadSection[0]} lang="uk"/>} />
      <Route path="/popular" element={<ItemList itemLabel={loadSection[1]} />} />
      <Route path="/top_rated" element={<ItemList itemLabel={loadSection[2]} />} />
      <Route path="/upcoming" element={<ItemList itemLabel={loadSection[3]} />} />
      <Route path="/latest" element={<ItemList itemLabel={loadSection[4]} />} />
      <Route path="/discover" element={<ItemList itemLabel={loadSection[5]} />} />
      <Route path="/watchlist" element={<ItemList itemLabel='watchlist'/>} />
      <Route path="/recent" element={<ItemList itemLabel='Recent page' />} />
</Routes>
    </div>
  );
};