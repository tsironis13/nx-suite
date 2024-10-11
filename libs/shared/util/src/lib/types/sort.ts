export type Sort<Z> = {
  sortBy: keyof Z;
  sortOrder: 1 | -1;
};
