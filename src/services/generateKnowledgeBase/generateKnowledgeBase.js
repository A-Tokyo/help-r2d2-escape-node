/* @flow */
import fs from 'fs';
import path from 'path';
import { generateGrid } from '../';

const generatePredicates = (): string => {
  let fileText: string = ``;
  const { config } = generateGrid();
  const {
    playerPosition,
    teleportalPosition,
    obstaclesPositions,
    rocksPositions,
    pressurePadsPositions,
  } = config;
  /** Append agent predicate */
  fileText += `agent(${playerPosition.col}, ${playerPosition.row}, s)\n`;
  /** Append teleportal predicate */
  fileText += `teleportal(${teleportalPosition.col}, ${
    teleportalPosition.row
  }, s)\n`;
  /** Append obstacles predicates */
  fileText += obstaclesPositions.reduce(
    (predicates, position) =>
      `${predicates}obstacle(${position.col}, ${position.col}, s)\n`,
    ''
  );
  /** Append rocks predicates */
  fileText += rocksPositions.reduce(
    (predicates, position) =>
      `${predicates}rock(${position.col}, ${position.col}, s)\n`,
    ''
  );
  /** Append presurepads predicates */
  fileText += pressurePadsPositions.reduce(
    (predicates, position) =>
      `${predicates}pressurepad(${position.col}, ${position.col}, s)\n`,
    ''
  );
  return fileText;
};

export default () => {
  const generatedPredicates = generatePredicates();
  fs.writeFileSync(
    path.join(
      __dirname,
      `../../../generatedData/predicates${new Date().toISOString()}.txt`
    ),
    generatedPredicates
  );
};
