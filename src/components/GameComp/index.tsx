import React from "react";
import { ChessType, GameStatus } from "../../types/enums";
import { BoardComp } from "../BoardComp";
import { GameStatusComp } from "../GameStatus";

interface IState {
  chesses: ChessType[],
  gameStatus: GameStatus,
  nextChess: ChessType.red | ChessType.black
}


export class GameComp extends React.Component<{}, IState>{

  state: IState = {
    chesses: [],
    gameStatus: GameStatus.gaming,
    nextChess: ChessType.black
  }
  componentDidMount() {
    this.init();
  }
  /**
   * 初始化
   */
  init() {
    const arr: ChessType[] = [];
    for (let i = 0; i < 9; i++) {
      arr.push(ChessType.none);
    }
    this.setState({
      chesses: arr,
      gameStatus: GameStatus.gaming,
      nextChess: ChessType.black
    })
  }
  handleClick(index: number) {
    console.log(index);
    const chesses = [...this.state.chesses]
    chesses[index] = this.state.nextChess;
    this.setState({
      chesses,
      nextChess: this.state.nextChess === ChessType.red ? ChessType.black : ChessType.red,
      gameStatus: this.getStatus(chesses, index)
    })
  }

  getStatus(chesses: ChessType[], index: number): GameStatus {
    // 1. 判断是否有一方获得胜利
    const horMin = Math.floor(index / 3) * 3;
    const verMin = index % 3;
    if (
      (chesses[horMin] === chesses[horMin + 1] && chesses[horMin] === chesses[horMin + 2])  // 横向
      || (chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6])    // 纵向
    ) {  // 横向全部相等  , 有一方胜利
      if (chesses[horMin] === ChessType.red) {
        console.log("红胜")
        return GameStatus.redWin
      } else if (chesses[horMin] === ChessType.black) {
        console.log("黑胜")
        return GameStatus.blackWin
      } else {
        return GameStatus.gaming;
      }
    } else if (
      (chesses[0] === chesses[4] && chesses[0] === chesses[8])                                // 斜向
      || (chesses[2] === chesses[4] && chesses[2] === chesses[6])                                // 斜向
    ) {
      if (chesses[4] === ChessType.red) {
        console.log("红胜")
        return GameStatus.redWin
      } else if (chesses[4] === ChessType.black) {
        console.log("黑胜")
        return GameStatus.blackWin
      } else {
        return GameStatus.gaming;
      }
    } else if (chesses.includes(ChessType.none)) {
      // 2. 游戏正在进行中
      console.log("进行中")
      return GameStatus.gaming
      // 3. 判断是否平局
    } else {
      console.log("平局")
      return GameStatus.equal
    }
  }

  render() {
    return (
      <div className="game">
        <GameStatusComp status={this.state.gameStatus}></GameStatusComp>
        <BoardComp chesses={this.state.chesses} isGameOver={this.state.gameStatus !== GameStatus.gaming} onClick={this.handleClick.bind(this)}></BoardComp>
      </div>
    )
  }
}