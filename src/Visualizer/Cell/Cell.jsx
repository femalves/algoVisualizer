import React, { Component } from "react";
import "./Cell.scss";

export default class Cell extends Component {
  render() {
    const {
      col,
      row,
      isStart,
      isFinish,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;

    const extraClassName = isFinish
      ? "cell-finish"
      : isStart
      ? "cell-start"
      : isWall
      ? "cell-wall"
      : "";

    return (
      <div
        id={`cell-${row}-${col}`}
        className={`cell ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
