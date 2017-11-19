/* @flow */
/* eslint no-undef: 1 */

/** Jest testing agent */
declare var jest;
declare var it;
declare var test;
declare var describe;
/** End Jest testing agent */

export type GameElementType =
  | 'player'
  | 'teleportal'
  | 'rock'
  | 'pressurepad'
  | 'obstacle';

export type GameElement = {
  type: GameElementType,
  name?: string,
};

export type Operator = 'move_north' | 'move_south' | 'move_east' | 'move_west';

export type GridItemPos = { row: number, col: number };

export type StatesHistoryHashMap = { [string]: boolean };

export type State = {
  cell: GridItemPos,
  unPushedPads: number,
  rocksPositions: Array<GridItemPos>,
};

export type Node = {
  state: State,
  parent: Node | null,
  operator: Operator | null,
  depth: number,
  pathCost: number,
  heuristicCostA: number,
  heuristicCostB: number,
};

export type GoalTestFunc = State => boolean;

export type StateConfig = {
  state: State,
  operator: Operator,
};

export type heuristicCostFunc = (State, Array<Operator>, State) => number;

export type Problem = {
  operators: Array<Operator>,
  initialState: State,
  stateSpace: (State, Array<Operator>) => Array<StateConfig>,
  goalTest: GoalTestFunc,
  pathCost: (State, Array<Operator>) => number,
  heuristicCostA: heuristicCostFunc,
  heuristicCostB: heuristicCostFunc,
};

export type MakeNodeFucntion = State => Array<Node>;

export type QueuingFunction = (Array<Node>, Array<Node>) => Array<Node>;

export type GridConfigObject = {
  rows: number,
  cols: number,
  availableCellsCount: number,
  playerPosition: GridItemPos | null,
  teleportalPosition: GridItemPos,
  obstaclesPositions: Array<GridItemPos>,
  pressurePadsPositions: Array<GridItemPos>,
  rocksPositions: Array<GridItemPos>,
  obstaclesCount: number,
  pressurePadsCount: number,
  rocksCount: number,
};

export type SearchStrategy =
  | 'BF'
  | 'DF'
  | 'ID'
  | 'UC'
  | 'GR1'
  | 'GR2'
  | 'AS1'
  | 'AS2';
