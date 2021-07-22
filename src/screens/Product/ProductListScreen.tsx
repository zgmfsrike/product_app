import React, {Component} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';

class ProductListScreen extends Component<any> {
  constructor(props: any) {
    super(props);
  }
  //**navigate to add product screen
  onPressButton() {
    this.props.navigation.navigate('ProductAdd');
  }
  //**config conmponent style in FlatList
  _renderItem({item}: any) {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>Price : {item.price}</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.buttonContainer}>
          <Button title="Add Product" onPress={() => this.onPressButton()} />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={this.props.productList}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    margin: 10,
  },
  itemContainer: {
    margin: 10,
    padding: 10,
    borderColor: '#00adcc',
    borderWidth: 2,
    borderRadius: 20,
  },
});
export default ProductListScreen;
