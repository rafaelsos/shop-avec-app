import { action } from 'typesafe-actions';
import { CartsTypes, CartsData } from './types';

export const addToCartRequest = (id: number) =>
  action(CartsTypes.ADD_REQUEST, id);

export const addToCartSuccess = (data: CartsData[]) =>
  action(CartsTypes.ADD_SUCCESS, { data });

export const removeFromCart = (id: number) => action(CartsTypes.REMOVE, id);

export const updateAmountRequest = (id: number, amount: number) =>
  action(CartsTypes.UPDATE_AMOUNT_REQUEST, id, amount);

export const updateAmountSuccess = (id: number, amount: number) =>
  action(CartsTypes.UPDATE_AMOUNT_SUCCESS, id, amount);
