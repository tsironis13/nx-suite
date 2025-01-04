export interface LibGeneratorSchema {
  name: string;
  scope: string;
  type:
    | 'ui'
    | 'data-access'
    | 'feat'
    | 'util'
    | 'type'
    | 'state'
    | 'guard'
    | 'const';
}
