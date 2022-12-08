import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import age from "../../assets/svg/age.svg";
import medal from "../../assets/svg/medal.svg";
import addSVG from "../../assets/svg/add.svg";
import removeSVG from "../../assets/svg/remove.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { add, remove } from "../../redux/playlistSlice";
import { RootState } from "../../redux/store";
import { Result } from "../types/APITypes";
import { MovieDetail } from "../types/MovieDetails";

type ItemInfo = {
  completeData?: Result | undefined;
  filmId?: number;
  isWatchlist?: boolean;
};
export const Container = styled.div`
  position: relative;
`;
export const CardWrapper = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 450px 40px 40px;
  max-width: 300px;
  margin: 25px 25px;
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
    color: black
  }
`;
export const PosterWrapper = styled.div`
  position: relative;
  grid-column: 1/5;
  grid-row: 1/2;
`;
export const Poster = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  /* object-fit: contain; */
  object-position: center;
  z-index: 10;
`;
export const PosterBlur = styled.div`
  // change color
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  opacity: 0.7;
  background: linear-gradient(to top, black 5%, transparent 20%);
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
  grid-template-columns: 3fr 1fr 2fr;
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;
  padding: 0 10px 10px;
`;
export const ReleaseDate = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
`;
export const Vote = styled.div`
  grid-column: 2/3;
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
  /* width: 100%; */
  position: absolute;
  bottom: 30px;
  right: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
export const Add = styled.button`
  //
  outline: none;
  background-color: transparent;
  border: none;
`;
export const AddIMG = styled(addSVG)`
  //
  // change color
  width: 30px;
  height: 30px;
  fill: red;
  &:hover {
    transition: 50ms;
    transform: scale(1.1);
  }
`;
export const Remove = styled.button`
  //
  outline: none;
  background-color: transparent;
  border: none;
`;
export const RemoveIMG = styled(removeSVG)`
  //
  // change color
  width: 30px;
  height: 30px;
  fill: #171616;
  &:hover {
    transition: 50ms;
    transform: scale(1.1);
  }
`;
export const ItemCard: React.FC<ItemInfo> = ({
  completeData,
  filmId,
  isWatchlist,
}) => {
  const [moviedata, setMoviedata] = useState<MovieDetail | Result>();
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
    isWatchlist !== true ? setMoviedata(completeData) : getUsers();
  }, []);
  // console.log(moviedata);
  return (
    <Container>
      <CardWrapper to={`/details/${moviedata?.id}`} state={{ movieNumber: moviedata?.id }}>
        <PosterWrapper>
          <Poster src={getPoster(moviedata?.poster_path)} alt=""></Poster>
          <PosterBlur />
        </PosterWrapper>
        <Title>{moviedata?.title}</Title>
        <DetailWrapper>
          <ReleaseDate>{moviedata?.release_date}</ReleaseDate>
          <Vote>
            <VoteScore>{voteFix()}</VoteScore>
            <Medal viewBox="0 0 71.693 122.881" />
          </Vote>
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

{
  /* <OpenMovie
          to={`/details/${moviedata?.id}`}
          state={{ movieNumber: moviedata?.id }}
        >
          Open
        </OpenMovie> */
}
