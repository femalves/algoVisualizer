export function BFS(grid, startCell, finishCell) {
  const queue = [startCell];
  startCell.isVisited = true;
  const visitedCells = [startCell];
  const path = [];
  let currCell;
  while (currCell !== finishCell && queue.length) {
    currCell = queue.shift();
    if (currCell.isWall) continue;
    path.push(currCell);
    getNeighbors(currCell, grid).forEach((neighbor) => {
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        visitedCells.push(neighbor);
        queue.push(neighbor);
      }
    });
  }
  return { path, visitedCells };
}

function getNeighbors(cell, grid) {
  const neighbors = [];
  const { col, row } = cell;
  // Up
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // Left
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // Right
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  // Down
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);

  return neighbors;
}
