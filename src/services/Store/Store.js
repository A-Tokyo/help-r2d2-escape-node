/* @flow */
import { solvableLongGrid } from './testGrids';

/**
 * A simple mutatable store used accross the app.
 */
class Store {
  previousStates: StatesHistoryHashMap = {};
  visualizationStatesInOrder: Array<State> = [];
  visualize: boolean = true;

  gridBasicEnv: {
    MIN_GRID_ROWS: number,
    MIN_GRID_COLS: number,
    MAX_GRID_ROWS: number,
    MAX_GRID_COLS: number,
    MAX_ROCKS_PADS_TOGETHER: number,
    MAX_OBSTACLES: number,
  } = {
    MIN_GRID_ROWS: 3,
    MIN_GRID_COLS: 3,
    MAX_GRID_ROWS: 3,
    MAX_GRID_COLS: 3,
    MAX_ROCKS_PADS_TOGETHER: 2,
    MAX_OBSTACLES: 1,
  };

  searchTypes: Array<string> = [
    'BF',
    'DF',
    'UC',
    'ID',
    'GR1',
    'GR2',
    'AS1',
    'AS2',
  ];

  problemTypes: Array<string> = ['Solvable Long Grid', 'Random Grid'];

  gameGrids: {
    [string]: { grid: Array<Array<any>>, config: GridConfigObject },
  } = {
    solvableLongGrid,
  };

  reset = (key?: string) => {
    switch (key) {
      case 'previousStates':
        this.previousStates = {};
        break;
      case 'visualizationStatesInOrder':
        this.visualizationStatesInOrder = [];
        break;
      case 'visualize':
        this.visualize = true;
        break;
      default:
        this.previousStates = {};
        this.visualizationStatesInOrder = [];
        this.visualize = true;
    }
  };

  /**
   * get a value from the store
   *
   * $FlowFixme
   */
  get = (key: string): any => {
    switch (key) {
      case 'previousStates':
        return this.previousStates;
      case 'visualizationStatesInOrder':
        return this.visualizationStatesInOrder;
      case 'visualize':
        return this.visualize;
      case 'gridBasicEnv':
        return this.gridBasicEnv;
      case 'searchTypes':
        return this.searchTypes;
      case 'problemTypes':
        return this.problemTypes;
      case 'gameGrids':
        return this.gameGrids;
      default:
        return undefined;
    }
  };

  setGridBasicEnv = (newGirdEnvItems: {
    MIN_GRID_ROWS?: number,
    MIN_GRID_COLS?: number,
    MAX_GRID_ROWS?: number,
    MAX_GRID_COLS?: number,
    MAX_ROCKS_PADS_TOGETHER?: number,
    MAX_OBSTACLES?: number,
  }) => {
    this.gridBasicEnv = { ...this.gridBasicEnv, ...newGirdEnvItems };
  };
}

export default new Store();
