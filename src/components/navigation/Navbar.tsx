import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Setting } from "./Setting";

export const Container = styled.div`
  background-color: gray;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 150px auto 200px;
  padding: 20px;
`;
export const LogoWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`;
export const MenuWrapper = styled.ul`
  grid-column: 1/2;
  grid-row: 2/3;
`;
export const MenuItem = styled.li``;
export const SettingWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 3/4;
`;

export const Navbar: React.FC = (props) => {
  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <MenuWrapper>
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/popular">Popular</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/top_rated">Top rated</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/upcoming">Upcoming</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/latest">Latest</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/discover">Discover</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/watchlist">Watchlist</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/recent">Recent</Link>
        </MenuItem>
      </MenuWrapper>
      <SettingWrapper>
        <Setting />
      </SettingWrapper>
    </Container>
  );
};
