import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { CartsTypes, CartsState, CartsData } from './types';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';

import {
  addToCartRequest,
  addToCartSuccess,
  updateAmountRequest,
  updateAmountSuccess,
  updateFailure,
} from './actions';

export interface ApplicationState {
  cart: CartsState;
}

function* addToCart({ payload }: ReturnType<typeof addToCartRequest>) {
  try {
    const productExists: CartsData = yield select((state: ApplicationState) =>
      state.cart.data.find((product) => product.id === payload)
    );

    const stock = yield call(api.get, `/products/${payload}`);

    const stockAmount = stock.data.quantity;
    const currentAmount = productExists || 0;

    const amount = currentAmount.amount + 1;

    if (amount > stockAmount) {
      toast.error('Quantidade solicitada fora de estoque');
      return;
    }

    if (productExists) {
      yield put(updateAmountSuccess(payload, amount));
    } else {
      const response = yield call(api.get, `/products/${payload}`);

      const data = {
        ...response.data,
        amount: 1,
        priceFormatted: formatPrice(response.data.price),
      };

      yield put(addToCartSuccess(data));

      history.push('/cart');
    }
  } catch (error) {
    toast.error('Erro ao adicionar produto no carrinho de compras!');

    yield put(updateFailure());
  }
}

function* updateAmount({
  payload: id,
  meta: amount,
}: ReturnType<typeof updateAmountRequest>) {
  try {
    if (amount <= 0) return;

    const stock = yield call(api.get, `products/${id}`);
    const stockAmount = stock.data.quantity;

    if (amount > stockAmount) {
      toast.error('Quantidade solicitada fora de estoque');
      return;
    }

    yield put(updateAmountSuccess(id, amount));
  } catch (error) {
    toast.error(
      'Erro ao atualizar quantidades do produto no carrinho de compras!!!'
    );

    yield put(updateFailure());
  }
}

export default all([
  takeLatest(CartsTypes.ADD_REQUEST, addToCart),
  takeLatest(CartsTypes.UPDATE_AMOUNT_REQUEST, updateAmount),
]);
