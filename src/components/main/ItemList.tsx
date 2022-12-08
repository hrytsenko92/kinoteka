import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { ItemCard } from "./ItemCard";
import { Welcome, Result } from "../types/APITypes";
import { DiscoverOptions } from "./DiscoverOptions";

type Props = {
  itemLabel: string;

};
interface optionsType {
  loadSectionURL: string;
  ApiKey: string;
  lang: string;
  sortBystr: string;
  pagestr: string;
  genresstr: string;
}
const options: optionsType = {
  loadSectionURL: "https://api.themoviedb.org/3/",
  ApiKey: "api_key=f7d6f68390c266c1854cab96343c8550",
  lang: "language=",
  sortBystr: "sort_by=",
  pagestr: "page=",
  genresstr: "with_genres=",
};
export const Container = styled.div``;
export const SelectWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;
export const MovieWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  justify-content: center;
  justify-items: center;
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
export const ItemList: React.FC<Props> = ({ itemLabel }) => {
  const language = useAppSelector((state: RootState) => state.lang.value);
  const [sortBy, setSortBy] = useState<string>("popularity.asc");
  const [genres, setGenres] = useState<number>(80);
  const [moviedata, setMoviedata] = useState<Result[]>([]);
  const [page, setPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [label, setLabel] = useState<string>(itemLabel);
  const [lang, setLang] = useState<string>(language);

  const onChangeSort: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.currentTarget.value;
    setSortBy(value);
  };
  const onChangeGenre: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.currentTarget.value;
    setGenres(Number(e.currentTarget.value));
  };
  useEffect(() => {
    let request: string;
    itemLabel === "discover/movie"
      ? (request = `${options.loadSectionURL}${itemLabel}?${options.ApiKey}&${options.lang}${language}&${options.sortBystr}${sortBy}&${options.pagestr}${page}&${options.genresstr}${genres}`)
      : (request = `${options.loadSectionURL}${itemLabel}?${options.ApiKey}&${options.lang}${language}&${options.pagestr}${page}`);
    async function getUsers() {
      try {
        const { data } = await axios.get<Welcome>(request, {
          headers: { Accept: "application/json" },
        });
        console.log(data.results);
        data.results !== undefined
          ? setMoviedata((moviedata) => [...moviedata, ...data.results])
          : null;
        setPage((prev) => prev + 1);
        setLabel(itemLabel);
        setLang(language);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      } finally {
        setFetching(false);
      }
    }
    fetching ? getUsers() : null;
    if (label !== itemLabel) {
      setMoviedata([]), setPage(0), getUsers();
    }
    if (lang !== language) {
      setMoviedata([]), setPage(0), getUsers();
    }
  }, [fetching, itemLabel, language]);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      200
    ) {
      setFetching(true);
    }
  };
  return (
    <Container>
      {itemLabel === "discover/movie" ? (
        <SelectWrapper>
          <DiscoverOptions
            onChangeSort={onChangeSort}
            onChangeGenre={onChangeGenre}
          />
        </SelectWrapper>
      ) : null}
      {moviedata !== undefined ? (
        <MovieWrapper>
          {moviedata.map((item) => (
            <ItemCard completeData={item} key={item.id} />
          ))}
        </MovieWrapper>
      ) : (
        <Oops>
          <OopsMessage>Oops something went wrong</OopsMessage>
        </Oops>
      )}
    </Container>
  );
};
