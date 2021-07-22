import {connect} from 'react-redux';

import ProductListScreen from '../../screens/Product/ProductListScreen';

//**map dispatch function to props

const mapStateToProps = (state: any) => ({
  productList: state.productReducer.product,
});

export default connect(mapStateToProps)(ProductListScreen);
