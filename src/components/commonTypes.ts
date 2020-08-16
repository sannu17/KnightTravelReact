export interface IFluxAction {
  type: string;
  payload?: any;
  meta?: any;
}

export type Optional<T> = { [P in keyof T]?: T[P] };
