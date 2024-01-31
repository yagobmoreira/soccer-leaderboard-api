import { IMatch } from './IMatch';
import { ICRUDModelReader } from '../ICRUDModel';

export type IMatchModel = ICRUDModelReader<IMatch> & {
  findByQuery(q: boolean): Promise<IMatch[]>
};
