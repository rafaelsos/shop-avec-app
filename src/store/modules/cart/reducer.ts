import { Reducer } from 'redux';
import produce from 'immer';
import { CartsState, CartsTypes } from './types';

const INITIAL_STATE: CartsState = {
  data: [],
  loading: false,
  error: false,
};

const reducer: Reducer<CartsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartsTypes.ADD_SUCCESS:
      return produce(state, (draft) => {
        const product = action.payload.data;

        draft.error.valueOf();
        draft.loading.valueOf();
        draft.data.push(product);
      });
    case CartsTypes.REMOVE:
      return produce(state, (draft) => {
        const productIndex = draft.data.findIndex(
          (product) => product.id === action.payload
        );

        if (productIndex >= 0) {
          draft.data.splice(productIndex, 1);
        }
      });
    case CartsTypes.UPDATE_AMOUNT_SUCCESS:
      return produce(state, (draft) => {
        const productIndex = draft.data.findIndex(
          (product) => product.id === action.payload
        );

        console.tron.error(productIndex);
        console.tron.error(action.meta);

        if (productIndex >= 0) {
          draft.error.valueOf();
          draft.loading.valueOf();
          draft.data[productIndex].amount = Number(action.meta);
        }
      });
    default:
      return state;
  }
};

export default reducer;
