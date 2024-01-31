import { IMatch, IMatchWithTeamName } from './IMatch';
import { ICRUDModelCreator, ICRUDModelUpdater } from '../ICRUDModel';
import { ID } from '..';

export type IMatchModel = {
  findAll(): Promise<IMatchWithTeamName[]>,
  findById(id: ID): Promise<IMatch | null>
} & {
  findByQuery(q: boolean): Promise<IMatch[]>
} & ICRUDModelUpdater<IMatch> & ICRUDModelCreator<IMatch>;
