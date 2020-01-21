import {GameTypeEnum} from '../enums/game-type.enum';

export interface StatInterface {
  id: number;
  isWin: boolean;
  date: string;
  gameType: GameTypeEnum;
  gameSource: string;
  answerTitle: string;
  answerSource: string;
}
