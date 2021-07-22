import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ProductListScreen from '../containers/Product/ProductListContainer';
import ProductAddScreen from '../containers/Product/ProductAddContainers';
import UserScreen from '../containers/User/UserContainer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const styles = StyleSheet.create({
  bottomTab: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    textAlignVertical: 'center',
    fontSize: 16,
  },
});

function HomeTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: styles.bottomTab,
      }}>
      <Tab.Screen name="ProductList" component={ProductListScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}

class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="App" component={HomeTab} />
          <Stack.Screen
            name="ProductAdd"
            component={ProductAddScreen}
            options={{title: 'Add Product'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
