import React, { Component } from "react";
import "./Visualizer.scss";
import Cell from "./Cell/Cell";
import NavBar from "./NavBar/NavBar";
export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }
  render() {
    const { grid } = this.state;
    return (
      <div>
        <NavBar />
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col } = node;
                  return <Cell key={nodeIndex} col={col} row={row}></Cell>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createCell(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createCell = (row, col) => {
  return {
    row,
    col,
  };
};
