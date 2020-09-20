import React, { Component } from "react";
import "./Visualizer.scss";
import Cell from "./Cell/Cell";
import NavBar from "./NavBar/NavBar";
import { BFS } from "./Algorithms/BFS/BFS";
import { DFS } from "./Algorithms/DFS/DFS";

const START_CELL_ROW = 10;
const START_CELL_COL = 10;
const FINISH_CELL_ROW = 17;
const FINISH_CELL_COL = 26;

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getUpdatedGrid(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getUpdatedGrid(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  visualizeBFS() {
    const { grid } = this.state;
    const startCell = grid[START_CELL_ROW][START_CELL_COL];
    const endCell = grid[FINISH_CELL_ROW][FINISH_CELL_COL];
    const [path, visitedCells] = BFS(grid, startCell, endCell);

    this.animateGrid(path, visitedCells);
  }

  visualizeDFS() {
    const { grid } = this.state;
    const startCell = grid[START_CELL_ROW][START_CELL_COL];
    const endCell = grid[FINISH_CELL_ROW][FINISH_CELL_COL];
    const [path, visitedCells] = DFS(grid, startCell, endCell);

    this.animateGrid(path, visitedCells);
  }

  animateGrid(cellsInPath, visitedCells) {
    for (let i = 0; i <= visitedCells.length; i++) {
      if (i === visitedCells.length) {
        setTimeout(() => {
          this.animatePath(cellsInPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const cell = visitedCells[i];
        document.getElementById(`cell-${cell.row}-${cell.col}`).className =
          "cell cell-visited";
      }, 10 * i);
    }
  }

  animatePath(cellsInPath) {
    for (let i = 0; i < cellsInPath.length; i++) {
      setTimeout(() => {
        const cell = cellsInPath[i];
        document.getElementById(`cell-${cell.row}-${cell.col}`).className =
          "cell cell-path";
      }, 50 * i);
    }
  }

  clearPath() {
    this.setState({ grid: [] });
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div>
        <NavBar
          onVisualizePressed={() => this.visualizeDFS()}
          onClearPathPressed={() => this.clearPath()}
        />
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  const { row, col, isStart, isFinish, isWall } = cell;
                  return (
                    <Cell
                      key={cellIndex}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Cell>
                  );
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
      let newCell = createCell(row, col);

      currentRow.push(newCell);
    }
    grid.push(currentRow);
  }
  return grid;
};

const createCell = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_CELL_ROW && col === START_CELL_COL,
    isFinish: row === FINISH_CELL_ROW && col === FINISH_CELL_COL,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getUpdatedGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
