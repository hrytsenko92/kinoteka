import * as React from 'react';
import styled from "styled-components"
import { Routes, Route } from 'react-router-dom';
import {ItemList} from "./ItemList"

export const Container = styled.div`
  background-color: gray;
  
`

// type Props = {
//   label: string;
//   count: number; // ???
// };

export const Main: React.FC = props => { // <Props>
//   const { label, count } = props;

  return (
    <div>
        main
        <Routes>
      <Route path="/" element={<ItemList itemLabel='Home page'/>} />
      <Route path="/discover" element={<ItemList itemLabel='Discover page' />} />
      <Route path="/playlist" element={<ItemList itemLabel='Playlist page'/>} />
      <Route path="/recent" element={<ItemList itemLabel='Recent page' />} />
</Routes>
    </div>
  );
};