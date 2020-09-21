export function DFS(grid, startCell, finishCell) {
  let explored = [];
  let stack = [[startCell]];
  let path;
  while (stack.length) {
    path = stack.pop();
    let currCell = path[path.length - 1];
    if (currCell.isWall) continue;
    if (!explored.includes(currCell)) {
      let neighbors = getNeighbors(currCell, grid);
      for (let neighbor of neighbors) {
        let new_path = [...path, neighbor];
        stack.push(new_path);
        if (neighbor === finishCell) {
          return [new_path, explored];
        }
        explored.push(currCell);
      }
    }
  }

  return [[], []];
}

function getNeighbors(cell, grid) {
  const neighbors = [];

  const { col, row } = cell;

  if (row > 0) neighbors.push(grid[row - 1][col]);

  if (col > 0) neighbors.push(grid[row][col - 1]);

  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);

  return neighbors;
}
