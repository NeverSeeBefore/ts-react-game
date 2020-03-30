import React from "react";
import { GameStatus } from "../../types/enums";
import './index.css';

interface IProps {
  status: GameStatus
}

export function GameStatusComp(props: IProps) {
  let title: string = '';
  if (props.status === GameStatus.gaming) {
    title = '游戏中'
  } else if (props.status === GameStatus.blackWin) {
    title = '黑方胜'
  } else if (props.status === GameStatus.redWin) {
    title = '红方胜'
  } else if (props.status === GameStatus.equal) {
    title = '平局'
  } else {
    title = '游戏异常'
  }
  return (
    <div className="title">
      {title}
    </div>
  )
}