import { Reducer } from 'redux';
import produce from 'immer';
import { CartsState, CartsTypes } from './types';

const INITIAL_STATE: CartsState = {
  data: [],
  loading: false,
  error: false,
};

const reducer: Reducer<CartsState> = (state = INITIAL_STATE, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CartsTypes.ADD_SUCCESS: {
        const product = action.payload.data;

        draft.error.valueOf();
        draft.loading.valueOf();
        draft.data.push(product);
        break;
      }
      case CartsTypes.REMOVE: {
        const productIndex = draft.data.findIndex(
          (product) => product.id === action.payload
        );

        if (productIndex >= 0) {
          draft.data.splice(productIndex, 1);
        }
        break;
      }
      case CartsTypes.UPDATE_AMOUNT_SUCCESS: {
        const productIndex = draft.data.findIndex(
          (product) => product.id === action.payload
        );

        if (productIndex >= 0) {
          draft.error.valueOf();
          draft.loading.valueOf();
          draft.data[productIndex].amount = Number(action.meta);
        }
        break;
      }
      default:
    }
  });

export default reducer;
