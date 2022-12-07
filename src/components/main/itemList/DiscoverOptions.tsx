import React from "react";
import styled from "styled-components";

type Props = {
  onChangeSort: React.ChangeEventHandler<HTMLSelectElement>;
  onChangeGenre: React.ChangeEventHandler<HTMLSelectElement>;
};

export const Container = styled.div``;
export const Select = styled.select``;
export const Option = styled.option``;

export const DiscoverOptions: React.FC<Props> = ({
  onChangeSort,
  onChangeGenre,
}) => {
  return (
    <Container>
      <Select name="sort" onChange={onChangeSort} required>
        <Option value="popularity.asc">Popularity ↑</Option>
        <Option value="popularity.desc">Popularity ↓</Option>
        <Option value="revenue.asc">Revenue ↑</Option>
        <Option value="revenue.desc">Revenue ↓</Option>
        <Option value="release_date.asc">Release ↑</Option>
        <Option value="release_date.desc">Release ↓</Option>
      </Select>
      <Select name="genre" onChange={onChangeGenre} required>
        <Option value="28">Action</Option>
        <Option value="12">Adventure</Option>
        <Option value="16">Animation</Option>
        <Option value="35">Comedy</Option>
        <Option value="80">Crime</Option>
        <Option value="99">Documentary</Option>
        <Option value="18">Drama</Option>
        <Option value="10751">Family</Option>
        <Option value="14">Fantasy</Option>
        <Option value="36">History</Option>
        <Option value="27">Horror</Option>
        <Option value="10402">Music</Option>
        <Option value="9648">Mystery</Option>
        <Option value="10749">Romance</Option>
        <Option value="878">Science Fiction</Option>
        <Option value="10770">TV Movie</Option>
        <Option value="53">Thriller</Option>
        <Option value="10752">War</Option>
        <Option value="37">Western</Option>
      </Select>
    </Container>
  );
};