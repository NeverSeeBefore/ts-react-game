import React from "react";
import { ChessType } from "../../types/enums";
import "./index.css";

interface IProps {
  type: ChessType,
  onClick?: () => void
}

export const ChessComp: React.FC<IProps> = function (props) {
  let chess = null;
  if (props.type === ChessType.red) {
    chess = <div className="chess-item red"></div>
  } else if (props.type === ChessType.black) {
    chess = <div className="chess-item black"></div>
  }
  return (
    <div className="chess" onClick={() => {
      if(props.type === ChessType.none && props.onClick){
        props.onClick();
      } 
    }}>
      {chess}
    </div>
  )
}