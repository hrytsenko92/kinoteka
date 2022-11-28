import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BtnLang } from "./BtnLang";
import { BtnTheme } from "./BtnTheme";
import MyLogo from "../../assets/svg/logoImg.svg";
import Now from "../../assets/svg/now.svg";
import Popular from "../../assets/svg/popular.svg";
import Rated from "../../assets/svg/rated.svg";
import Upcoming from "../../assets/svg/upcoming.svg";
import Discover from "../../assets/svg/discover.svg";
import Watchlist from "../../assets/svg/watchlist.svg";
import Recent from "../../assets/svg/recent.svg";
type Props = {
  language?: string;
};
let boxShadowCheck: string = "none";
const svgW: string = "25px";
const svgH: string = "25px";

export const Container = styled.div`
  background-color: ${(props) => props.theme.headerTop};
  width: 95%;
  height: 70px;
  border-radius: 15px;
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
`;
export const LogoWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`;
export const LogoItem = styled.div`
  width: 60%;
  height: auto;
`;
export const MenuWrapper = styled.ul`
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
`;
export const MenuItem = styled.li`
  list-style: none;
  margin: 0 10px;
  font-size: 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
  column-gap: 5px;
`;
export const LinkItem = styled(Link)`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme.baseBTN};
  font-size: 18px;
  font-weight: 700;
  &:hover {
    color: ${(props) => props.theme.hoverBTN};
  }
`;
export const NowSvg = styled(Now)`
  width: ${svgW};
  height: ${svgH};
  fill: ${(props) => props.theme.cc};
`;
export const RatedSvg = styled(Rated)`
  width: ${svgW};
  height: ${svgH};
  fill: ${(props) => props.theme.cc};
`;
export const PopularSvg = styled(Popular)`
  width: ${svgW};
  height: ${svgH};
  fill: ${(props) => props.theme.cc};
`;
export const UpcomingSvg = styled(Upcoming)`
  width: ${svgW};
  height: ${svgH};
  fill: ${(props) => props.theme.cc};
`;
export const DiscoverSvg = styled(Discover)`
  width: ${svgW};
  height: ${svgH};
  fill: ${(props) => props.theme.cc};
`;
export const WatchlistSvg = styled(Watchlist)`
  width: ${svgW};
  height: ${svgH};
  fill: ${(props) => props.theme.cc};
`;
export const RecentSvg = styled(Recent)`
  width: ${svgW};
  height: ${svgH};
  fill: ${(props) => props.theme.cc};
`;
export const SettingWrapper = styled.div`
  grid-column: 3/4;
  grid-row: 1/2;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-right: 20px;
  font-size: 10px;
`;

export const Navbar: React.FC<Props> = ({ language }) => {
  const [offset, setOffset] = useState(0);
  console.log(language);
  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
      window.pageYOffset === 0
        ? (boxShadowCheck = "none")
        : (boxShadowCheck = "rgba(0,0,0,0.35) 0px 5px 15px");
    };
  }, [offset]);
  return (
    <Container
      style={{
        boxShadow: `${boxShadowCheck}`,
      }}
    >
      <LogoWrapper>
        <LogoItem>
          <MyLogo />
        </LogoItem>
      </LogoWrapper>
      <MenuWrapper>
        <MenuItem>
          <NowSvg viewBox="0 0 128 128" />
          {language === "en-US" ? (
            <LinkItem to="/">Playing</LinkItem>
          ) : (
            <LinkItem to="/">Дивляться</LinkItem>
          )}
        </MenuItem>
        <MenuItem>
          <PopularSvg viewBox="0 0 92.35 122.88" />
          {language === "en-US" ? (
            <LinkItem to="/popular">Popular</LinkItem>
          ) : (
            <LinkItem to="/popular">Популярне</LinkItem>
          )}
        </MenuItem>
        <MenuItem>
          <RatedSvg viewBox="0 0 365 511.41" />
          {language === "en-US" ? (
            <LinkItem to="/top_rated">Top rated</LinkItem>
          ) : (
            <LinkItem to="/top_rated">Найкраще</LinkItem>
          )}
        </MenuItem>
        <MenuItem>
          <UpcomingSvg viewBox="0 0 512 512" />
          {language === "en-US" ? (
            <LinkItem to="/upcoming">Upcoming</LinkItem>
          ) : (
            <LinkItem to="/upcoming">Незабаром</LinkItem>
          )}
        </MenuItem>
        <MenuItem>
          <DiscoverSvg viewBox="0 0 121.76 122.88" />
          {language === "en-US" ? (
            <LinkItem to="/discover">Discover</LinkItem>
          ) : (
            <LinkItem to="/discover">Огляд</LinkItem>
          )}
        </MenuItem>
        <MenuItem>
          <WatchlistSvg viewBox="0 0 122.88 107.3" />
          {language === "en-US" ? (
            <LinkItem to="/watchlist">Watchlist</LinkItem>
          ) : (
            <LinkItem to="/watchlist">Збережене</LinkItem>
          )}
        </MenuItem>
        <MenuItem>
          <RecentSvg viewBox="0 0 122.88 108.12" />
          {language === "en-US" ? (
            <LinkItem to="/recent">Recent</LinkItem>
          ) : (
            <LinkItem to="/recent">Переглянуте</LinkItem>
          )}
        </MenuItem>
      </MenuWrapper>
      <SettingWrapper>
        <BtnLang />
        <BtnTheme />
      </SettingWrapper>
    </Container>
  );
};
