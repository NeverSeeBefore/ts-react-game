import React from 'react';
import { ChessType } from "../../types/enums";
import { ChessComp } from '../ChessComp';
import "./index.css";

interface IProps {
  chesses: ChessType[],
  isGameOver?: boolean,
  onClick?: (index: number) => void
}



export function BoardComp(props: IProps) {
  const list = props.chesses.map((type, i) => <ChessComp type={type} key={i} onClick={() => { if (props.onClick && !props.isGameOver) { props.onClick(i) } }}></ChessComp>)
  return (
    <div className="board">
      {list}
    </div>
  );
}