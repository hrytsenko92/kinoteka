import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import age from "../../../assets/svg/age.svg";
import medal from "../../../assets/svg/medal.svg";
import addSVG from "../../../assets/svg/add.svg";
import removeSVG from "../../../assets/svg/remove.svg";
import {useAppDispatch, useAppSelector} from "../../../redux/hook"
import { add, remove } from "../../../redux/playlistSlice";
import {RootState} from "../../../redux/store"
import { Result } from "../../types/APITypes"

type ItemInfo = {
  res: Result,
  movieID?: number | undefined
};
export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 30px 20px 50px 40px;
  /* width: 100%; */
  max-width: 300px;
  margin: 25px 25px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  overflow: hidden;
  &:hover {
    transition: 100ms;
    transform: scale(1.03);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
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
export const Title = styled.h3`   // change width
  grid-column: 1/5;
  grid-row: 2/3;
  width: 285px;
  text-align: start;
  white-space: nowrap;
  overflow-x: scroll;
  padding: 10px 10px;
`;
export const DetailWrapper = styled.div`
  grid-column: 1/5;
  grid-row: 3/4;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding: 5px 10px;
`;
export const ReleaseDate = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
`;
export const Adult = styled(age)`
  grid-column: 2/3;
  grid-row: 1/2;
  width: 25px;
  height: 25px;
`;
export const Vote = styled.div`
  grid-column: 3/4;
  grid-row: 1/2;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
export const DescriptionWrap = styled.div`
  grid-column: 1/5;
  grid-row: 4/5;
  width: 100%;
  height: 50px;
  padding: 5px 10px;
  text-align: center;
`;
export const Description = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.3em;
  height: 3.9em;
  font-size: 12px;
`;
export const Medal = styled(medal)`
  width: 15px;
  height: 15px;
`;
export const OptionWrapper = styled.div`
  grid-column: 1/5;
  grid-row: 5/6;
  width: 100%;
  position: relative;
  padding: 5px 17px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
`;
export const OpenMovie = styled(Link)`   // change color
  width: 150px;
  height: 30px;
  font-size: 15px;
  font-weight: 900;
  border-radius: 5px;
  outline: none;
  border: 1.5px solid red;
  color: red;
`;
export const Add = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
`
export const AddIMG = styled(addSVG)`   // change color
  width: 30px;
  height: 30px;
  fill: red;
  &:hover {
    transition: 50ms;
    transform: scale(1.2);
    }
`;
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
export const ItemCardS: React.FC<ItemInfo> = ({ res, movieID }) => {
  // const playlist = useAppSelector((state: RootState) => state.playlist.value)
  const dispatch = useAppDispatch()
  // const handleAdd = () => {movieID !== undefined? dispatch(add(movieID)) : null}
  const handleAdd = () => {res.id !== undefined? dispatch(add(res.id)) : null}
  // const handleRemove = () => {movieID !== undefined? dispatch(remove(movieID)): null }
  const getPoster = (postpath: string | undefined) => {
    return `https://image.tmdb.org/t/p/w500/${postpath}`;
  };
  const voteFix = (vote_average?: number | undefined) => {
    return vote_average?.toFixed()
  }
  return (
    <Container>
      <PosterWrapper>
        <Poster src={getPoster(res.poster_path)} alt=""></Poster>
        <PosterBlur />
      </PosterWrapper>
      <Title>{res.title}</Title>
      <DetailWrapper>
        <ReleaseDate>{voteFix()}</ReleaseDate>
        {res.adult === true ? <Adult viewBox="0 0 512 512" /> : null}
        <Vote>
          {`${res.vote_average}`}
          <Medal viewBox="0 0 71.693 122.881" />
        </Vote>
      </DetailWrapper>
      <DescriptionWrap>
        <Description>{res.overview}</Description>
      </DescriptionWrap>
      <OptionWrapper>
        <OpenMovie to="/detail" state={{ movieID: res.id }}>Open</OpenMovie>
<Add onClick={handleAdd}><AddIMG viewBox="0 0 91.5 122.88"/></Add>
{/* <Remove onClick={handleRemove}><RemoveIMG viewBox="0 0 91.5 122.88"/></Remove> */}
      </OptionWrapper>
    </Container>
  );
};
// add/remove порівнює значання з res та watchlater slice
