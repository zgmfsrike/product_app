import {connect} from 'react-redux';

import {ADD_PRODUCT, Product} from '../../redux/Product/ProductTypes';
import ProductAddScreen from '../../screens/Product/ProductAddScreen';

//**map dispatch function to props

const mapDispatchToProps = (dispatch: any) => ({
  addProduct: (data: Product) => dispatch({type: ADD_PRODUCT, payload: data}),
});

export default connect(null, mapDispatchToProps)(ProductAddScreen);
