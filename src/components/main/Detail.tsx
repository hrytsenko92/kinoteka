import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import styled from "styled-components";
import { devices} from "../../assets/Theme.styled";
import { MovieDetail } from "../types/MovieDetails";
import { Video, Result as VideoResult } from "../types/Video";
import { Result } from "../types/APITypes";
import { Cast, CastElement } from "../types/Cast";
import { ItemCard } from "./ItemCard";
import timeSVG from "../../assets/svg/time.svg";
import medal from "../../assets/svg/medal.svg";
import transfer from "../../assets/svg/transfer.svg"
import toVideo from "../../assets/svg/toVideo.svg"
import toList from "../../assets/svg/toList.svg"

const DetailContainer = styled.div`
  position: relative;
  left: 0;
  top: 15px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  color: white;
`;
const BigCardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  &:hover {
    transition: 100ms;
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
  }
`;
const BigCardIMG = styled.div`
  z-index: 20;
  filter: brightness(40%);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left top;
  height: 100%;
`;
const MovieContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 25;
  width: 100%;
`;
const MovieWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 3fr;
  grid-template-rows: 1fr;
  margin: 50px;
  gap: 50px;
  
`;
const PosterIMG = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);
  height: 500px;
  width: auto;
  aspect-ratio: 1/1.5;
  border-radius: 15px;
  overflow: hidden;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const DetailInfo = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto;
`;
const TitleWrapper = styled.div`
  grid-column: 1/5;
  grid-row: 1/2;
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
`;
const MovieTitle = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  font-size: 40px;
  font-weight: 700;
`;
const MovieSlogan = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
  font-size: 20px;
  font-weight: 500;
`;
const RateAndTimeWrapper = styled.div`
  grid-column: 1/5;
  grid-row: 2/3;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
`;
const Year = styled.div`
  font-size: 25px;
  font-weight: 400;
  color: #FAB62D;
`;
const Rate = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const RateIMG = styled(medal)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
const Time = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const TimeIMG = styled(timeSVG)`
  width: 20px;
  height: 20px;
  fill: #FAB62D;
  margin-right: 5px;
`;
const Overview = styled.div`
  grid-column: 1/5;
  grid-row: 3/4;
  max-height: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 21px;
  line-height: 30px;
`;
const CastWrapper = styled.div`
  grid-column: 1/5;
  grid-row: 4/5;
  margin-top: 15px;
  align-self: flex-end;
  display: grid;
  @media ${devices.mobile} {
    grid-template-columns: 1fr 1fr 1fr; // 3
  }
  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr 1fr 1fr; // 4
  }
  @media ${devices.laptop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; // 7
  }
  @media ${devices.laptopL} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; // 8
  }
  @media ${devices.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; // 9
  }
  grid-template-rows: 1fr;
  justify-content: space-around;
  align-items: center;
`;
const ActorCard1 = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;
const ActorCard2 = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;
const ActorCard3 = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;
const ActorCard4 = styled.div`
   position: relative;
  border-radius: 5px;
  overflow: hidden;
  display: none;
  @media (${devices.tablet}) {
    display: block;
  }
`;
const ActorCard5 = styled.div`
   position: relative;
  border-radius: 5px;
  overflow: hidden;
  display: none;
  @media (${devices.laptop}) {
    display: block;
  }
`;
const ActorCard6 = styled.div`
   position: relative;
  border-radius: 5px;
  overflow: hidden;
  display: none;
  @media (${devices.laptop}) {
    display: block;
  }
`;
const ActorCard7 = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  display: none;
  @media (${devices.laptop}) {
    display: block;
  }
`;
const ActorCard8 = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  display: none;
  @media (${devices.laptopL}) {
    display: block;
  }
`;
const ActorCard9 = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  display: none;
  @media (${devices.desktop}) {
    display: block;
  }
`;
const ActorPhoto = styled.img`
  width: 110px;
  border-radius: 5px;
  overflow: hidden;
`;
const ActorNameBackground = styled.div` ///   fs, fw
  background-color: white;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 30px;
  margin: 0 5px 5px;
  border-radius: 5px;
  opacity: 0.6;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
const ActorName = styled.div`
  text-align: center;
  word-wrap: break-word;
  color: black;
  font-size: 13px;
`;
const OtherWrapper = styled.div`
  width: 100%;
`;
const ToggleCheckWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 25px;
`
const ToggleCheck= styled.button`
  margin: 20px;
  width: 100px;
  height: 50px;
  color: #fff;
  border: none;
  color: #000;
  border-radius: 5px;
  padding: 10px 25px;
  font-weight: 500;
  background: transparent;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
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
const ToggleToVideo = styled(toVideo)`
  width: 35px;
  height: 35px;
  fill: ${(props) => props.theme.iconColor};
`;
const ToggleToList = styled(toList)`
  width: 35px;
  height: 35px;
  fill: ${(props) => props.theme.iconColor};
`;
const SimilarMovieWrapper = styled.div`
    display: grid;
  @media ${devices.mobile} {
    grid-template-columns: 1fr 1fr ;
  }
  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr 1fr ;
  }
  @media ${devices.laptop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media ${devices.laptopL} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media ${devices.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr ;
  }
  
  grid-template-rows: auto;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  gap: 40px;
`;
const YouTube = styled.div`
display: flex;
flex-flow: row nowrap;
justify-content: center;
align-items: center;
`;
const YoutubeItem = styled.iframe`
  width: 800px;
  height: 480px;
`;
export const Detail: React.FC = () => {
  const appLang = useAppSelector((state: RootState) => state.lang.value);
  const location = useLocation();
  const movieNumber: number = location.state.movieNumber;
  const [moviedata, setMoviedata] = useState<MovieDetail>();
  const [cast, setCast] = useState<CastElement[]>();
  const [video, setVideo] = useState<VideoResult>();
  const [similar, setSimilar] = useState<Result[]>([]);
  const [otherBTN, setOtherBTN] = useState<boolean>(true);
  const toggleCheck = () => {
    setOtherBTN((current) => !current);
  };
  const getPoster = (poster: string | undefined) => {
    return `https://image.tmdb.org/t/p/w500${poster}`;
  };
  const getBackdropPath = (backdrop: string | undefined) => {
    return `https://image.tmdb.org/t/p/original${backdrop}`;
  };
  const getPhoto = (profile_path: string | null) => {
    return `https://image.tmdb.org/t/p/w200${profile_path}`;
  };
  const getDate = () => {
    return moviedata?.release_date !== undefined
      ? moviedata.release_date.slice(0, 4)
      : null;
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
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [appLang, movieNumber]);
  useEffect(() => {
    let request: string = `https://api.themoviedb.org/3/movie/${movieNumber}/credits?api_key=f7d6f68390c266c1854cab96343c8550&language=${appLang}`;
    async function getCast() {
      try {
        const { data } = await axios.get<Cast>(request, {
          headers: { Accept: "application/json" },
        });
        setCast(data.cast.slice(0, 20));
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
  }, [appLang, movieNumber]);
  useEffect(() => {
    let request: string = `https://api.themoviedb.org/3/movie/${movieNumber}/videos?api_key=f7d6f68390c266c1854cab96343c8550&language=${appLang}`;
    async function getVideo() {
      try {
        const { data } = await axios.get<Video>(request, {
          headers: { Accept: "application/json" },
        });
        setVideo(data.results[0]);
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
  }, [appLang, movieNumber]);
  useEffect(() => {
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
  }, [appLang, movieNumber, moviedata]);
  return (
    <DetailContainer>
      <BigCardWrapper>
        <BigCardIMG style={{ backgroundImage: `url(${getBackdropPath( moviedata?.backdrop_path )})`, }}/>
        <MovieContainer>
          <MovieWrapper>
            <PosterIMG style={{ backgroundImage: `url(${getPoster(moviedata?.poster_path)})`,}} />
            <DetailInfo>
              <TitleWrapper>
                <MovieTitle>{moviedata?.title}</MovieTitle>
                <MovieSlogan>{moviedata?.tagline}</MovieSlogan>
              </TitleWrapper>
              <RateAndTimeWrapper>
              <Year>{getDate()}</Year>
                <Time>
                  <TimeIMG viewBox="0 0 465.2 465.2" /> {toHoursAndMinutes()}
                </Time>
                <Rate>
                  <RateIMG /> {voteFix()}
                </Rate>
              </RateAndTimeWrapper>
              <Overview>{moviedata?.overview}</Overview>
              <CastWrapper>
                <ActorCard1>
                  <ActorPhoto
                    src={getPhoto(
                      cast !== undefined ? cast[0].profile_path : null
                    )}
                  />
                  <ActorNameBackground>
                    <ActorName>
                      {cast !== undefined ? cast[0].name : null}
                    </ActorName>
                  </ActorNameBackground>
                </ActorCard1>
                <ActorCard2>
                  <ActorPhoto
                    src={getPhoto(
                      cast !== undefined ? cast[1].profile_path : null
                    )}
                  />
                  <ActorNameBackground>
                    <ActorName>
                      {cast !== undefined ? cast[1].name : null}
                    </ActorName>
                  </ActorNameBackground>
                </ActorCard2>
                <ActorCard3>
                  <ActorPhoto
                    src={getPhoto(
                      cast !== undefined ? cast[2].profile_path : null
                    )}
                  />
                  <ActorNameBackground>
                    <ActorName>
                      {cast !== undefined ? cast[2].name : null}
                    </ActorName>
                  </ActorNameBackground>
                </ActorCard3>
                <ActorCard4>
                  <ActorPhoto
                    src={getPhoto(
                      cast !== undefined ? cast[3].profile_path : null
                    )}
                  />
                  <ActorNameBackground>
                    <ActorName>
                      {cast !== undefined ? cast[3].name : null}
                    </ActorName>
                  </ActorNameBackground>
                </ActorCard4>
                <ActorCard5>
                  <ActorPhoto
                    src={getPhoto(
                      cast !== undefined ? cast[4].profile_path : null
                    )}
                  />
                  <ActorNameBackground>
                    <ActorName>
                      {cast !== undefined ? cast[4].name : null}
                    </ActorName>
                  </ActorNameBackground>
                </ActorCard5>
                <ActorCard6>
                  <ActorPhoto
                    src={getPhoto(
                      cast !== undefined ? cast[5].profile_path : null
                    )}
                  />
                  <ActorNameBackground>
                    <ActorName>
                      {cast !== undefined ? cast[5].name : null}
                    </ActorName>
                  </ActorNameBackground>
                </ActorCard6>
                <ActorCard7>
                  <ActorPhoto
                    src={getPhoto(
                      cast !== undefined ? cast[6].profile_path : null
                    )}
                  />
                  <ActorNameBackground>
                    <ActorName>
                      {cast !== undefined ? cast[6].name : null}
                    </ActorName>
                  </ActorNameBackground>
                </ActorCard7>
                <ActorCard8>
                  <ActorPhoto
                    src={getPhoto(
                      cast !== undefined ? cast[7].profile_path : null
                    )}
                  />
                  <ActorNameBackground>
                    <ActorName>
                      {cast !== undefined ? cast[7].name : null}
                    </ActorName>
                  </ActorNameBackground>
                </ActorCard8>
                <ActorCard9>
                  <ActorPhoto
                    src={getPhoto(
                      cast !== undefined ? cast[8].profile_path : null
                    )}
                  />
                  <ActorNameBackground>
                    <ActorName>
                      {cast !== undefined ? cast[8].name : null}
                    </ActorName>
                  </ActorNameBackground>
                </ActorCard9>
              </CastWrapper>
            </DetailInfo>
          </MovieWrapper>
        </MovieContainer>
      </BigCardWrapper>
      <OtherWrapper>
        <ToggleCheckWrapper>
        <ToggleCheck onClick={toggleCheck}>{otherBTN ?  <ToggleToVideo viewBox="0 0 104 92" /> :  <ToggleToList viewBox="0 0 19 16" />}</ToggleCheck>
        </ToggleCheckWrapper>
        {otherBTN ? (
          <SimilarMovieWrapper>
            {similar.map((item) => (
              <ItemCard key={item.id} isWatchlist={false} completeData={item} />
            ))}
          </SimilarMovieWrapper>
        ) : (
          <YouTube>
            <YoutubeItem
              src={`https://www.youtube.com/embed/${video?.key}`}
              title="YouTube video player"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </YouTube>
        )}
      </OtherWrapper>
    </DetailContainer>
  );
};