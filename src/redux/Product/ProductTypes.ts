export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const ADD_PRODUCT = 'ADD_PRODUCT';

//**define product interface, init state and action
export interface Product {
  name: string;
  description: string;
  price: string;
}

export interface ProductState {
  product: Product[];
}

interface AddProductActionType {
  type: typeof ADD_PRODUCT;
  payload: Product;
}

export type ProductActionTypes = AddProductActionType;
