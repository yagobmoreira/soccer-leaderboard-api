import { IMatch } from './IMatch';
import { ICRUDModelReader, ICRUDModelUpdater } from '../ICRUDModel';

export type IMatchModel = ICRUDModelReader<IMatch> & {
  findByQuery(q: boolean): Promise<IMatch[]>
} & ICRUDModelUpdater<IMatch>;
