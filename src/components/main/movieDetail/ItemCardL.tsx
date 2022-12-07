import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { MovieDetail } from "../../types/MovieDetails";
import { Video } from "../../types/Video";
// import { Similar } from "../../types/Similar";
import {Result } from "../../types/APITypes"
import { ItemCardS } from "../itemCard/ItemCardS";

type Props = {
  language?: string;
};

const CardContainer = styled.div`
  position: relative;
  left: 0;
  top: 20px;
  width: 100%;`;
const MovieWrapper = styled.div``;
const Other = styled.div``;
const ToggleCheck = styled.button``;
const SimilarMovieWrapper = styled.div`
display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
`;
const YouTube = styled.div`
display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 25px;
`;
const YoutubeItem = styled.iframe`
  width: 600px;
  height: 400px;
`;

export const ItemCardL: React.FC<Props> = ({ language }) => {
  const location = useLocation();
  const movieID: number = location.state?.movieID;
  const [moviedata, setMoviedata] = useState<MovieDetail>();
  const [video, setVideo] = useState<Video>();
  const [similar, setSimilar] = useState<Result[]>([]);
  const [otherBTN, setOtherBTN] = useState<boolean>(true);

  const toggleCheck = () => {
    setOtherBTN((current) => !current);
  };
  const getPoster = (poster: string | undefined) => {
    // винести в віддільний компонент
    return `https://image.tmdb.org/t/p/w500${poster}`;
  };

  useEffect(() => {
    // винести з компонента
    let request: string = `https://api.themoviedb.org/3/movie/${movieID}?api_key=f7d6f68390c266c1854cab96343c8550&language=${language}`;
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
    getUsers();
  }, []);

  useEffect(() => {
    // винести з компонента
    let request: string = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=f7d6f68390c266c1854cab96343c8550&language=${language}`;
    async function getVideo() {
      try {
        const { data } = await axios.get<Video>(request, {
          headers: { Accept: "application/json" },
        });
        setVideo(data);
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
    getVideo();
  }, []);

  useEffect(() => {
    // винести з компонента
    let request: string = `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=f7d6f68390c266c1854cab96343c8550&language=${language}&page=1`;
    async function getSimilar() {
      try {
        const { data } = await axios.get<any>(request, {
          headers: { Accept: "application/json" },
        });
        setSimilar(data.results);
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
    getSimilar();
  }, []);

  console.log(similar);

  return (
    <CardContainer>
      <MovieWrapper></MovieWrapper>
      <Other>
        
        {language == "uk" ? <ToggleCheck onClick={toggleCheck}> змінити компонент</ToggleCheck>: <ToggleCheck onClick={toggleCheck}> change</ToggleCheck>}
        {otherBTN ? (
          <SimilarMovieWrapper>{similar.map((item) => (
            <ItemCardS key={item.id} res={item}  />
          ))}</SimilarMovieWrapper>
        ) : (
          <YouTube>
            {video?.results.map((item) => (
              <YoutubeItem
                key={item.id}
                src={`https://www.youtube.com/embed/${item.key}`}
                title="YouTube video player"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ))}
          </YouTube>
        )}
      </Other>
    </CardContainer>
  );
};
