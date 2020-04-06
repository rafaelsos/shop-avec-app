import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { CartsTypes, CartsState, CartsData } from './types';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';

import {
  addToCartRequest,
  addToCartSuccess,
  updateAmountRequest,
  updateAmountSuccess,
} from './actions';

export interface ApplicationState {
  cart: CartsState;
}

function* addToCart({ payload }: ReturnType<typeof addToCartRequest>) {
  const productExists: CartsData = yield select((state: ApplicationState) =>
    state.cart.data.find((product) => product.id === payload)
  );

  const stock = yield call(api.get, `/products/${payload}`);

  const stockAmount = stock.data.quantity;
  const currentAmount = productExists || 0;

  const amount = currentAmount.amount + 1;

  if (amount > stockAmount) {
    alert('Quantidade solicitada fora de estoque');
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
}

function* updateAmount({
  payload: id,
  meta: amount,
}: ReturnType<typeof updateAmountRequest>) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `products/${id}`);
  const stockAmount = stock.data.quantity;

  if (amount > stockAmount) {
    alert('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest(CartsTypes.ADD_REQUEST, addToCart),
  takeLatest(CartsTypes.UPDATE_AMOUNT_REQUEST, updateAmount),
]);
