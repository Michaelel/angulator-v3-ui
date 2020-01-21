import {GameTypeEnum} from '../enums/game-type.enum';

export interface GameStartRequestInterface {
  email: string;
  gameType: GameTypeEnum;
  source: string;
}
