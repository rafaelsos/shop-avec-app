/**
 * Action types
 */
export enum CartsTypes {
  ADD_REQUEST = '@cart/ADD_REQUEST',
  ADD_SUCCESS = '@cart/ADD_SUCCESS',
  REMOVE = '@cart/REMOVE',
  UPDATE_AMOUNT_REQUEST = '@cart/UPDATE_AMOUNT_REQUEST',
  UPDATE_AMOUNT_SUCCESS = '@cart/UPDATE_AMOUNT_SUCCESS',
  UPDATE_FAILURE = '@cart/UPDATE_FAILURE',
}

/**
 * Data types
 */
export interface CartsData {
  id: number;
  title: string;
  price: number;
  picture: string;
  description: string;
  memory: string;
  brand: string;
  chipType: string;
  priceFormatted: string;
  amount: number;
}

/**
 * State type
 */
export interface CartsState {
  readonly data: CartsData[];
  readonly loading: boolean;
  readonly error: boolean;
}
