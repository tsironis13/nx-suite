export type Sort<Z> = {
  sortBy: keyof Z;
  sortOrder: 'asc' | 'desc';
};
