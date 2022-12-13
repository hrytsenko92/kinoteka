import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { SearchApi, Result as ResultSearch } from "../types/SearchApi";
import { devices } from "../../assets/Theme.styled";
import { ItemCard } from "./ItemCard";

const Container = styled.div`
  position: relative;
  left: 0;
  top: 15px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
const SearchBarWrapper = styled.div`
  margin-top: 50px;
  width: 450px;
  height: 70px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
`;
const SearchBar = styled.form``;
const SearchInput = styled.input`
  width: 250px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #fff9;
  padding: 0px 10px;
  font-size: 17px;
  background-color: #f0f4f2;
`;
const SearchBtn = styled.button`
  margin: 20px;
  width: 130px;
  height: 40px;
  color: #fff;
  border: none;
  color: #000;
  border-radius: 5px;
  padding: 10px 25px;
  font-weight: 500;
  background: transparent;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  &:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    direction: rtl;
    z-index: 50;
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
    transition: all 0.3s ease;
  }
  &:hover {
    color: #000;
  }
  &:hover:after {
    left: auto;
    right: 0;
    width: 100%;
  }
  &:active {
    top: 2px;
  }
`;
const ListWrapper = styled.div`
  margin-top: 30px;
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
const ListMessage = styled.div`
  margin-top: 30px;
  font-size: 30px;
`;
export const Search: React.FC = () => {
  let searchLocation = useLocation();
  const appLang = useAppSelector((state: RootState) => state.lang.value);
  const [moviedata, setMoviedata] = useState<ResultSearch[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lang, setLang] = useState<string>(appLang);
  const [tempTerm, setTempTerm] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let request: string = `https://api.themoviedb.org/3/search/movie?api_key=f7d6f68390c266c1854cab96343c8550&language=${appLang}&query=${message}&page=${page}&include_adult=false`;
    async function getUsers() {
      try {
        const { data } = await axios.get<SearchApi>(request, {
          headers: { Accept: "application/json" },
        });
        data.results !== undefined
          ? setMoviedata((moviedata) => [...moviedata, ...data.results])
          : null;
        setPage((prev) => prev + 1);
        setLang(appLang);
        setTempTerm("");
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
    if (lang !== appLang) {
      setMoviedata([]), setPage(1), getUsers();
    }
  }, [appLang, fetching]);
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
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMoviedata([]), setPage(1);
    setMessage(tempTerm);
    tempTerm.length > 3 ? setFetching(true) : null;
  };
  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar onSubmit={submitForm}>
          <SearchInput
            value={tempTerm}
            onChange={(e) => setTempTerm(e.target.value)}
            type="text"
            placeholder={appLang === "uk" ? "Знайти фільм" : "Find movie"}
          />
          <SearchBtn type="submit">OK</SearchBtn>
        </SearchBar>
      </SearchBarWrapper>
      {moviedata.length === 0 ? (
        <ListMessage>List is empty</ListMessage>
      ) : (
        <ListWrapper>
          {moviedata.map((item) => (
            <ItemCard
              key={item.id}
              isSearch={searchLocation.state.active}
              completeSearchData={item}
            />
          ))}
        </ListWrapper>
      )}
    </Container>
  );
};