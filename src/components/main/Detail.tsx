import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import styled from "styled-components";
import { MovieDetail } from "../types/MovieDetails";
import { Video } from "../types/Video";
import { Result } from "../types/APITypes";
import { Cast, CastElement } from "../types/Cast";
import { ItemCard } from "./ItemCard";

type Props = {
  language?: string;
};

const CardContainer = styled.div`
  position: relative;
  left: 0;
  top: 20px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
const BackgroundWrapper = styled.div`
  position: relative;
  width: 94%;
  height: 600px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  overflow: hidden;

  &:hover {
    transition: 100ms;
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
  }
`;
const BackgroundIMG = styled.div`
  z-index: 20;
  filter: blur(5px);
`;
const MovieWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 25;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
`;

const PosterWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
const PosterIMG = styled.img`
  width: 100%;
  height: auto;
  object-position: center;
  margin: 50px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  overflow: hidden;
`;

const DetailInfo = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
`;
const TitleWrapper = styled.div``;
const MovieTitle = styled.div``;
const MovieSlogan = styled.div``;

const YearRateAndTimeWrapper = styled.div``;
const Year = styled.div``;
const Rate = styled.div``;
const Time = styled.div``;

const Overview = styled.div``;

const CastWrapper = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
grid-template-rows: 1fr;
justify-content: space-around;
align-items: center;
`;

const ActorCard = styled.div`
position: relative;
`;
const ActorPhoto = styled.img`
width: 110px;
`;
const ActorName = styled.div`
position: absolute;
left: 0;
bottom: 0;
width: 100px;
height: 40px;
padding: 0px 5px;
color: black;
text-align: center;
`;

const Other = styled.div`
  margin-top: 50px;
`;
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

export const Detail: React.FC<Props> = ({}) => {
  const appLang = useAppSelector((state: RootState) => state.lang.value);
  const location = useLocation();
  const movieNumber: number = location.state.movieNumber;
  const [moviedata, setMoviedata] = useState<MovieDetail>();
  const [cast, setCast] = useState<CastElement[]>();
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
  const getBackdropPath = (backdrop: string | undefined) => {
    return `https://image.tmdb.org/t/p/original${backdrop}`;
  };
  const getPhoto = (profile_path: string | null) => {
    return `https://image.tmdb.org/t/p/w200${profile_path}`;
  };
  const voteFix = () => {
    return moviedata?.vote_average.toFixed(1);
  };
  const toHoursAndMinutes = () => {
    if (moviedata?.runtime !== undefined) {
      const hours = Math.floor(moviedata?.runtime / 60);
      const minutes = moviedata?.runtime % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    }
  };

  useEffect(() => {
    // винести з компонента
    let request: string = `https://api.themoviedb.org/3/movie/${movieNumber}?api_key=f7d6f68390c266c1854cab96343c8550&language=${appLang}`;
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
  }, [appLang]);

  useEffect(() => {
    let request: string = `https://api.themoviedb.org/3/movie/${movieNumber}/credits?api_key=f7d6f68390c266c1854cab96343c8550&language=${appLang}`;
    async function getCast() {
      try {
        const { data } = await axios.get<Cast>(request, {
          headers: { Accept: "application/json" },
        });
        setCast(data.cast.slice(0, 10));
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
    getCast();
  }, [appLang]);

  useEffect(() => {
    // винести з компонента
    let request: string = `https://api.themoviedb.org/3/movie/${movieNumber}/videos?api_key=f7d6f68390c266c1854cab96343c8550&language=${appLang}`;
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
  }, [appLang]);

  useEffect(() => {
    // винести з компонента
    let request: string = `https://api.themoviedb.org/3/movie/${movieNumber}/similar?api_key=f7d6f68390c266c1854cab96343c8550&language=${appLang}&page=1`;
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
  }, [appLang]);
console.log(cast)
  return (
    <CardContainer>
      <BackgroundWrapper>
        <BackgroundIMG
          style={{
            backgroundImage: `url(${getBackdropPath(
              moviedata?.backdrop_path
            )})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left top",
            height: "100%",
            opacity: 0.9,
          }}
        />
        <MovieWrapper>
          <PosterWrapper>
            <PosterIMG src={getPoster(moviedata?.poster_path)} />
          </PosterWrapper>
          <DetailInfo>
            <TitleWrapper>
              <MovieTitle>{moviedata?.title}</MovieTitle>
              <MovieSlogan>{moviedata?.tagline}</MovieSlogan>
            </TitleWrapper>
            <YearRateAndTimeWrapper>
              <Year>{moviedata?.release_date}</Year>
              <Rate>{voteFix()}</Rate>
              <Time>{toHoursAndMinutes()}</Time>
            </YearRateAndTimeWrapper>
            <Overview>{moviedata?.overview}</Overview>
            <CastWrapper>
              <ActorCard>
                <ActorPhoto src={getPhoto(cast !== undefined ? cast[0].profile_path: null)}/>
                <ActorName>{cast !== undefined ? cast[0].name: null}</ActorName>
              </ActorCard>
              <ActorCard>
                <ActorPhoto src={getPhoto(cast !== undefined ? cast[1].profile_path: null)}/>
                <ActorName>{cast !== undefined ? cast[1].name: null}</ActorName>
              </ActorCard>
              <ActorCard>
                <ActorPhoto src={getPhoto(cast !== undefined ? cast[2].profile_path: null)}/>
                <ActorName>{cast !== undefined ? cast[2].name: null}</ActorName>
              </ActorCard>
              <ActorCard>
                <ActorPhoto src={getPhoto(cast !== undefined ? cast[3].profile_path: null)}/>
                <ActorName>{cast !== undefined ? cast[3].name: null}</ActorName>
              </ActorCard>
              <ActorCard>
                <ActorPhoto src={getPhoto(cast !== undefined ? cast[4].profile_path: null)}/>
                <ActorName>{cast !== undefined ? cast[4].name: null}</ActorName>
              </ActorCard>

            </CastWrapper>
          </DetailInfo>
        </MovieWrapper>
      </BackgroundWrapper>

      <Other>
        {appLang == "uk" ? (
          <ToggleCheck onClick={toggleCheck}> змінити компонент</ToggleCheck>
        ) : (
          <ToggleCheck onClick={toggleCheck}> change</ToggleCheck>
        )}
        {otherBTN ? (
          <SimilarMovieWrapper>
            {similar.map((item) => (
              <ItemCard key={item.id} isWatchlist={false} completeData={item} />
            ))}
          </SimilarMovieWrapper>
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
