import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import medal from "../../assets/svg/medal.svg";
import addSVG from "../../assets/svg/add.svg";
import removeSVG from "../../assets/svg/remove.svg";
import jpgLost from "../../assets/svg/jpgLost.svg"
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { add, remove } from "../../redux/playlistSlice";
import { RootState } from "../../redux/store";
import { Result } from "../types/APITypes";
import { Result as ResultSearch } from "../types/SearchApi";
import { MovieDetail } from "../types/MovieDetails";

type ItemInfo = {
  completeData?: Result | undefined;
  filmId?: number;
  isWatchlist?: boolean;
  isSearch?: boolean;
  completeSearchData?: ResultSearch | undefined;
};
export const Container = styled.div`
  position: relative;
`;
export const CardWrapper = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 10fr 1fr 1fr;
  max-width: 360px;
  min-width: 280px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  overflow: hidden;
  text-decoration: none;
  &:hover {
    transition: 100ms;
    transform: scale(1.03);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.05);
    
  }
  &:hover, &:link, &:visited, &:active {
    color: ${(props) => props.theme.textColorOne};
  }
`;
export const PosterWrapper = styled.div`
  position: relative;
  grid-column: 1/5;
  grid-row: 1/2;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
export const Poster = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1.5;
  position: relative;
  object-fit: cover;
  object-position: center;
  z-index: 10;
`;
export const PosterLost = styled(jpgLost)`
  grid-column: 2/3;
  grid-row: 1/2;
  width: 100%;
  height: auto;
`;
export const PosterBlur = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  opacity: 0.7;
  background: linear-gradient(to top, ${(props) => props.theme.blurColorOne} 1%, transparent 20%);
`;
export const Title = styled.h3`
  grid-column: 1/5;
  grid-row: 2/3;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  padding: 10px 10px;
`;
export const DetailWrapper = styled.div`
  grid-column: 1/5;
  grid-row: 3/4;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;
  padding: 0 10px 10px 15px;
`;
export const ReleaseDate = styled.div`
  justify-self: center;
  grid-column: 2/3;
  grid-row: 1/2;
`;
export const Vote = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
`;
export const VoteScore = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
`;
export const Medal = styled(medal)`
  grid-column: 2/3;
  grid-row: 1/2;
  width: 25px;
  height: 25px;
`;
export const OptionWrapper = styled.div`
  position: absolute;
  bottom: 15px;
  right: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
export const Add = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
`;
export const AddIMG = styled(addSVG)`
  width: 30px;
  height: 30px;
  fill: ${(props) => props.theme.iconColor};
  &:hover {
    transition: 50ms;
    transform: scale(1.1);
  }
`;
export const Remove = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
`;
export const RemoveIMG = styled(removeSVG)`
  width: 30px;
  height: 30px;
  fill: ${(props) => props.theme.iconColor};
  &:hover {
    transition: 50ms;
    transform: scale(1.1);
  }
`;
export const ItemCard: React.FC<ItemInfo> = ({
  completeData,
  filmId,
  isWatchlist,
  isSearch,
  completeSearchData
}) => {
  const [moviedata, setMoviedata] = useState<MovieDetail | Result | ResultSearch>();
  const appLang = useAppSelector((state: RootState) => state.lang.value);
  const dispatch = useAppDispatch();
  const handleRemove = () => {
    moviedata?.id !== undefined ? dispatch(remove(moviedata.id)) : null;
  };
  const handleAdd = () => {
    moviedata?.id !== undefined ? dispatch(add(moviedata.id)) : null;
  };
  const getPoster = (postpath: string | undefined) => {
    return `https://image.tmdb.org/t/p/w500/${postpath}`;
  };
  const voteFix = () => {
    return moviedata?.vote_average.toFixed(1);
  };
  const getDate = () => {
    return moviedata?.release_date !== undefined ? moviedata.release_date.slice(0,4): null;
  };
  useEffect(() => {
    let request: string = `https://api.themoviedb.org/3/movie/${filmId}?api_key=f7d6f68390c266c1854cab96343c8550&language=${appLang}`;
    async function getUsers() {
      try {
        const { data } = await axios.get<MovieDetail>(request, {
          headers: { Accept: "application/json" },
        });
        setMoviedata(data);
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
    isWatchlist == true ? getUsers(): isSearch === true ? setMoviedata(completeSearchData): setMoviedata(completeData) ; 
  }, [appLang]);
  return (
    <Container>
      <CardWrapper to={`/id/${moviedata?.id}`} state={{ movieNumber: moviedata?.id }}>
        <PosterWrapper>
          {moviedata?.poster_path !== null ? <Poster src={getPoster(moviedata?.poster_path)} alt=""></Poster> : <PosterLost viewBox="0 0 56 56"/> }
          <PosterBlur />
        </PosterWrapper>
        <Title>{moviedata?.title}</Title>
        <DetailWrapper>
          <Vote>
            <VoteScore>{voteFix()}</VoteScore>
            <Medal viewBox="0 0 71.693 122.881" />
          </Vote>
          <ReleaseDate>{getDate()}</ReleaseDate>
        </DetailWrapper>
      </CardWrapper>
      <OptionWrapper>
        {isWatchlist !== true ? (
          <Add onClick={handleAdd}>
            <AddIMG viewBox="0 0 91.5 122.88" />
          </Add>
        ) : (
          <Remove onClick={handleRemove}>
            <RemoveIMG viewBox="0 0 91.5 122.88" />
          </Remove>
        )}
      </OptionWrapper>
    </Container>
  );
};