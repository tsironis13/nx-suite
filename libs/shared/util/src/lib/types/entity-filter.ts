import { Entity } from './entity';
import { Filter } from './filter';
import { Pagination } from './pagination';
import { Sort } from './sort';

export type EntityFilterData<E extends Entity, Z extends Filter> = {
  filters: Z;
  pagination: Pagination;
  sort: Sort<E>;
};
