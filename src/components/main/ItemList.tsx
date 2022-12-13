import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { devices } from "../../assets/Theme.styled";
import axios from "axios";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { ItemCard } from "./ItemCard";
import { Welcome, Result } from "../types/APITypes";

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
export const Select = styled.select``;
export const Option = styled.option``;
export const MovieWrapper = styled.div`
  display: grid;
  @media ${devices.mobile} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media ${devices.laptop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media ${devices.laptopL} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media ${devices.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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
export const ItemList: React.FC<Props> = ({ itemLabel }) => {
  const [moviedata, setMoviedata] = useState<Result[]>([]);
  const appLang = useAppSelector((state: RootState) => state.lang.value);
  const [page, setPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [label, setLabel] = useState<string>(itemLabel);
  const [lang, setLang] = useState<string>(appLang);

  useEffect(() => {
    let request: string = `${options.loadSectionURL}${itemLabel}?${options.ApiKey}&${options.lang}${appLang}&${options.pagestr}${page}`
    async function getUsers() {
      try {
        const { data } = await axios.get<Welcome>(request, {
          headers: { Accept: "application/json" },
        });
        data.results !== undefined
          ? setMoviedata((moviedata) => [...moviedata, ...data.results])
          : null;
        setPage((prev) => prev + 1);
        setLabel(itemLabel);
        setLang(appLang);
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
    if (lang !== appLang) {
      setMoviedata([]), setPage(0), getUsers();
    }
  }, [fetching, itemLabel, appLang]);
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