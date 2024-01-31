import { IMatch } from './IMatch';
import { ICRUDModelCreator, ICRUDModelReader, ICRUDModelUpdater } from '../ICRUDModel';

export type IMatchModel = ICRUDModelReader<IMatch> & {
  findByQuery(q: boolean): Promise<IMatch[]>
} & ICRUDModelUpdater<IMatch> & ICRUDModelCreator<IMatch>;
