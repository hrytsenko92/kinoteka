import React from "react";
import styled from "styled-components";
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
  release_date?: Date;
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
// download no photo example

export const Container = styled.div`
  margin: 20px;
  background-color: #b1f893;
  aspect-ratio: 1/1.5;
  width: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr auto;
`;
export const Poster = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
`;
export const DetailWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 55px 80px;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.h3`
  text-align: center;
  padding: 10px 5px;
`;
export const Overview = styled.p`
  text-align: center;
  padding: 5px 10px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
`;
export const RateWrap = styled.div`
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  left: 5px;
  top: -15%;
  font-size: 13px;
`;
export const RateGreen = styled.div`
border: 1px solid #7dde72;
`;
export const RateOrange = styled.div`
border: 1px solid #de7272;
`;
export const Rate = styled.p`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`
export const ItemCard: React.FC<ItemInfo> = ({ res }) => {
  const getPoster = (postpath: string | undefined) => {
    return `https://image.tmdb.org/t/p/w500/${postpath}`;
  };
  return (
    <Container>
      <Poster src={getPoster(res.poster_path)} alt=""></Poster>
      <DetailWrapper>
        <Title>{res.title}</Title>
        <Overview >{res.overview}</Overview>
      </DetailWrapper>
    </Container>
  );
};
