import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ItemCardS } from "./ItemCardS";
import { Welcome } from "./APITypes"

type Props = {
  itemLabel: string;
  language?: string;
};
interface optionsType {
  loadSectionURL: string,
  ApiKey: string,
  lang: string,
  sortBystr: string,
  pagestr: string,
  genresstr: string,
}
const options: optionsType = {
  loadSectionURL: "https://api.themoviedb.org/3/",
  ApiKey: "api_key=f7d6f68390c266c1854cab96343c8550",
  lang: "language=",
  sortBystr: "sort_by=",
  pagestr: "page=",
  genresstr: "with_genres=",
}

export const Container = styled.div`
`
export const SelectWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`
export const MovieWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  justify-content: center;
  justify-items: center;
`
export const Oops = styled.div`
display: flex;
flex-flow: row nowrap;
justify-content: flex-start;
align-items: center;
min-width: 100%;
height: 100vh;
`
export const OopsMessage = styled.h1`
margin-left: 200px;
  font-size: 50px;
`
export const ItemList: React.FC<Props> = ({ itemLabel, language }: Props) => {
  const [sortBy, setSortBy] = useState<string>("popularity.asc");
  const [page, setPage] = useState<number>(1);
  const [genres, setGenres] = useState<number>(80);
  const [moviedata, setMoviedata] = useState<Welcome | null>(null);
  console.log(moviedata?.results);   // delete
  const onChangeSort = (event: any) => {
    const value = event.target.value;
    setSortBy(value);
  };
  const onChangeGenre = (event: any) => {
    const value = event.target.value;
    setGenres(value);
  };
  useEffect(() => {
    let request: string;
    itemLabel === "discover/movie"
      ? (request = `${options.loadSectionURL}${itemLabel}?${options.ApiKey}&${options.lang}${language}&${options.sortBystr}${sortBy}&${options.pagestr}${page}&${options.genresstr}${genres}`)
      : (request = `${options.loadSectionURL}${itemLabel}?${options.ApiKey}&${options.lang}${language}&${options.pagestr}${page}`);
    async function getUsers() {
      try {
        const { data, status } = await axios.get<Welcome>(request, {
          headers: { Accept: "application/json" },
        });
        setMoviedata(data);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    }
    getUsers();
  }, [language, itemLabel, sortBy, genres]);
  return (
    <Container>
      {itemLabel === "discover/movie" ?<SelectWrapper>
      <select name="sort" onChange={onChangeSort} required>
          <option value="popularity.asc">Popularity ↑</option>
          <option value="popularity.desc">Popularity ↓</option>
          <option value="revenue.asc">Revenue ↑</option>
          <option value="revenue.desc">Revenue ↓</option>
          <option value="release_date.asc">Release ↑</option>
          <option value="release_date.desc">Release ↓</option>
        </select>
      <select name="genre" onChange={onChangeGenre} required>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>       
        </select>
      </SelectWrapper>: null }
      {moviedata?.results !== undefined ? <MovieWrapper>
        {moviedata?.results?.map((item) => (
            <ItemCardS res={item} movieID={item.id} key={item.id}/>
        ))}
      </MovieWrapper>: <Oops>
        <OopsMessage>Oops something went wrong</OopsMessage>
        </Oops>}
    </Container>
  );
};
