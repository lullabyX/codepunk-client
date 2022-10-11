export type CellType = 'javascript' | 'text';

export type Cell = {
  id: string,
  content: string,
  type: CellType
}

export type CellMoveDirection = 'up' | 'down'