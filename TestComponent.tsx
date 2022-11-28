import React, {useState} from "react";
import {useAppSelector, useAppDispatch} from "./src/redux/hook"
import { add, remove } from "./src/redux/playlistSlice";
import {RootState} from "./src/redux/store"
// import m from "./src/assets/svg/svg"

export const TestComponent: React.FC = ({}) => {
    const playlist = useAppSelector((state: RootState) => state.playlist.value)
    const dispatch = useAppDispatch()
    const [playlistInput, setPlaylistInput] = useState<number>(0)
    const handleAdd = () => {dispatch(add(playlistInput)) }
    // const handleRemove = () => {dispatch(remove())}

  return (
      <div>
         Hello, this is testCopmonent
         {playlist}
         <input value={playlistInput} onChange={(e)=> setPlaylistInput(Number(e.target.value))} />
         <button onClick={handleAdd}>add</button>
         {/* <button onClick={handleRemove}>remove</button> */}
      </div>
  )
}
