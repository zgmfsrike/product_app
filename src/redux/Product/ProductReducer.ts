import {ADD_PRODUCT, ProductState, ProductActionTypes} from './ProductTypes';

//**reducer will do only update or get state
//**logic will be in feature containers

const initialState: ProductState = {
  product: [],
};

export const productReducer = (
  state = initialState,
  action: ProductActionTypes,
): ProductState => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {...state, product: [...state.product, action.payload]};

    default:
      return state;
  }
};
