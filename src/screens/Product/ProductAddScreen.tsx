import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  Text,
  Button,
} from 'react-native';
import {Product} from '../../redux/Product/ProductTypes';

class ProductAddScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      product: {
        name: '',
        description: '',
        price: '',
      },
      flashMessage: false,
    };
  }

  //**close flash message when done
  closeFlashMessage() {
    this.setState({
      flashMessage: false,
    });
  }
  //**when submit it will display flash message
  //**then pass data into props dispatch
  //**after that it will clear input and close flash massge
  onPressSubmit() {
    this.setState({flashMessage: true}, () => {
      setTimeout(() => {
        this.closeFlashMessage();
      }, 1000);
    });
    const data: Product = this.state.product;
    this.props.addProduct(data);
    this.setState({
      product: {
        name: '',
        description: '',
        price: '',
      },
    });
  }
  //**disable button if user leave name or description empty
  onDisbleButton() {
    return (
      this.state.product.name.length < 1 ||
      this.state.product.description.length < 1
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.background}>
        <View>
          <TextInput
            style={styles.textInput}
            value={this.state.product.name}
            onChangeText={(data: any) =>
              this.setState({product: {...this.state.product, name: data}})
            }
            placeholder="Product Name"
            placeholderTextColor={placeHolderTextColor}
          />
          <TextInput
            style={styles.textInput}
            value={this.state.product.description}
            onChangeText={(data: any) =>
              this.setState({
                product: {...this.state.product, description: data},
              })
            }
            placeholder="Product Description"
            placeholderTextColor={placeHolderTextColor}
          />
          <TextInput
            style={styles.textInput}
            value={this.state.product.price}
            onChangeText={(data: any) =>
              this.setState({product: {...this.state.product, price: data}})
            }
            keyboardType="numeric"
            placeholder="Product Price"
            placeholderTextColor={placeHolderTextColor}
          />
        </View>
        {this.state.flashMessage == true ? (
          <View style={styles.flashMessage}>
            <Text style={{color: 'white'}}>Product has been added!</Text>
          </View>
        ) : null}
        <Button
          title="Add Product"
          disabled={this.onDisbleButton()}
          onPress={() => this.onPressSubmit()}
        />
      </SafeAreaView>
    );
  }
}
const placeHolderTextColor = 'black';
const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    color: 'black',
  },
  flashMessage: {
    position: 'absolute',
    backgroundColor: 'green',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    bottom: 0,
  },
});
export default ProductAddScreen;
