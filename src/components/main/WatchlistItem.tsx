import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { remove } from "../../redux/playlistSlice";
import { RootState } from "../../redux/store";
import removeSVG from "../../assets/svg/remove.svg";
import { MovieDetail } from "./MovieDetails";

type ID = {
    movieID: number
}
export const MovieTitle = styled.div``;
export const Remove = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
`
export const RemoveIMG = styled(removeSVG)` // change color
  width: 30px;
  height: 30px;
  fill: #171616;
  &:hover {
    transition: 50ms;
    transform: scale(1.2);
    }
`;

export const WatchlistItem: React.FC<ID> = ({movieID}) => {
    const appLang = useAppSelector((state: RootState) => state.lang.value);
    const [moviedata, setMoviedata] = useState<MovieDetail | null>(null);
    useEffect(() => {
        const request: string = `https://api.themoviedb.org/3/movie/${movieID}?api_key=f7d6f68390c266c1854cab96343c8550&language=${appLang}`
        async function getMovie () {
          try {
            const { data, status } = await axios.get<MovieDetail>(request, {
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
        getMovie();
      }, []);
  return (
<div>{moviedata?.title}</div>
  );
};
// onClick={handleRemove}
// {playlist.map((item)=> (
//   <ul style={{
//     margin: "500px 0"
//   }}>
//     <li>{item}</li>
//   </ul>
// ))}
