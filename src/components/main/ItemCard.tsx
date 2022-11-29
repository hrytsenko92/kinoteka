import React from "react";
import styled from "styled-components";
import age from "../../assets/svg/age.svg" 
import medal from "../../assets/svg/medal.svg"
type ItemInfo = {
  res: Result;
};
type Result = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: OriginalLanguage;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};
enum OriginalLanguage {
  De = "de",
  En = "en",
  Es = "es",
  Ja = "ja",
}

export const Container = styled.div`
  margin: 25px 25px;
  background-color: #b1f893;
  box-shadow: 0px 6px 18px rgba(0,0,0,.3);
  border-radius: 10px;
  overflow: hidden;
  /* aspect-ratio: 1/1.5; */
  width: 270px;
`;
export const PosterWrapper = styled.div`
  position: relative;
`;
export const Poster = styled.img`
  width: 270px;
  height: 100%;
  position: relative;
  object-fit: contain;
  object-position: center;
  z-index: 10;
`;
export const PosterBlur = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  opacity: 0.7;
  background: linear-gradient(to top, white 3%, transparent 20%);
`;

export const Title = styled.h3`
  text-align: center;
  padding: 10px 5px;
`;

export const DetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr;
`;
export const ReleaseDate = styled.div`
grid-column: 1/2;
grid-row: 1/2;
`
export const Adult = styled(age)`
grid-column: 2/3;
grid-row: 1/2;
width: 25px;
height: 25px;`
export const Vote = styled.div`
grid-column: 3/4;
grid-row: 1/2;
display: flex;
flex-flow: row nowrap;
justify-content: center;
align-items: center;
`
export const Medal = styled(medal)`width: 25px;height: 25px;`
export const OptionWrapper = styled.div`
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
align-items: center;
`
export const OpenMovie = styled.div`
width: 100px;
height: 30px;
background-color: blue;
`
export const Later = styled.div`
width: 35px;
height: 35px;
background-color: red;
`

export const ItemCard: React.FC<ItemInfo> = ({ res }) => {
  const getPoster = (postpath: string | undefined) => {
    return `https://image.tmdb.org/t/p/w500/${postpath}`;
  };
  return (
    <Container>
      <PosterWrapper>
        <Poster src={getPoster(res.poster_path)} alt=""></Poster>
        <PosterBlur />
      </PosterWrapper>
      <Title>{res.title}</Title>
      <DetailWrapper>
        <ReleaseDate>{res.release_date}</ReleaseDate>
        {res.adult === true ? <Adult viewBox="0 0 512 512"/>: null }
        <Vote>{`${res.vote_average}`}<Medal viewBox="0 0 71.693 122.881"/></Vote>
      </DetailWrapper>
      <OptionWrapper>
        <OpenMovie/>
        <Later/>
      </OptionWrapper>
    </Container>
  );
};
