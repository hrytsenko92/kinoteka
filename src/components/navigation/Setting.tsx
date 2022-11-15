import React, {useState} from "react";
import {useAppDispatch} from "../../redux/hook"
import { togleUS, togleUKR } from "../../redux/langSlice";
// import {RootState} from "../../redux/store"


export const Setting: React.FC = props => {
  const dispatch = useAppDispatch()
    const handleus = () => {dispatch(togleUS("en-US")) }
    const handleukr = () => {dispatch(togleUKR("uk")) }
  return (
    <div>
      setting
      <button onClick={handleus}>us-lang</button>
      <button onClick={handleukr}>ukr-lang</button>
    </div>
  );
};