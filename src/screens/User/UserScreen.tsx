import React, {Component} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  Switch,
  ActivityIndicator,
} from 'react-native';

class UserScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: [],
      isRefreshing: false,
      isLoading: false,
      page: 1,
    };
  }
  componentDidMount() {
    const data = [
      {
        firstName: 'Kritsanah',
        lastName: 'Supphasri',
        email: 'kritsanah@mail.com',
        image: 'image',
      },
      {
        firstName: 'TESTF',
        lastName: 'TESTL',
        email: 'testL@mail.com',
        image: 'image',
      },
      {
        firstName: 'Kritsanah',
        lastName: 'Supphasri',
        email: 'kritsanah@mail.com',
        image: 'image',
      },
      {
        firstName: 'TESTF',
        lastName: 'TESTL',
        email: 'testL@mail.com',
        image: 'image',
      },
      {
        firstName: 'Kritsanah',
        lastName: 'Supphasri',
        email: 'kritsanah@mail.com',
        image: 'image',
      },
      {
        firstName: 'TESTF',
        lastName: 'TESTL',
        email: 'testL@mail.com',
        image: 'image',
      },
      {
        firstName: 'Kritsanah',
        lastName: 'Supphasri',
        email: 'kritsanah@mail.com',
        image: 'image',
      },
      {
        firstName: 'TESTF',
        lastName: 'TESTL',
        email: 'testL@mail.com',
        image: 'image',
      },
      {
        firstName: 'Kritsanah',
        lastName: 'Supphasri',
        email: 'kritsanah@mail.com',
        image: 'image',
      },
      {
        firstName: 'TESTF',
        lastName: 'TESTL',
        email: 'testL@mail.com',
        image: 'image',
      },
      {
        firstName: 'Kritsanah',
        lastName: 'Supphasri',
        email: 'kritsanah@mail.com',
        image: 'image',
      },
      {
        firstName: 'TESTF',
        lastName: 'TESTL',
        email: 'testL@mail.com',
        image: 'image',
      },
    ];
    this.props.updateUserInfo(data);
    this.onLoading();
    setTimeout(() => {
      this.loadDataPerPage(this.state.page);
      // console.log(data);
    }, 1000);
  }

  loadDataPerPage(numberPage: number) {
    const data = this.props.userList.slice(0, numberPage * 10);
    this.setState({user: data, page: numberPage});
  }

  onRefresh() {
    this.setState({isRefreshing: true}, () => {
      setTimeout(() => {
        const page = 1;
        this.loadDataPerPage(page);
        this.setState({isRefreshing: false});
      }, 1000);
    });
  }

  onLoading() {
    this.setState({isLoading: true}, () => {
      setTimeout(() => {
        this.setState({isLoading: false});
      }, 1000);
    });
  }

  _handleLoadMore() {
    if (!this.state.isLoading) {
      // console.log('api load more', this.state.isLoading);
      this.onLoading();
      const nextPage = this.state.page + 1;
      this.loadDataPerPage(nextPage);

      //**solution backend
      // let data2 = [
      //   {
      //     firstName: 'Kritsanah',
      //     lastName: 'Supphasri',
      //     email: 'kritsanah@mail.com',
      //     image: 'image',
      //   },
      //   {
      //     firstName: 'TESTF',
      //     lastName: 'TESTL',
      //     email: 'testL@mail.com',
      //     image: 'image',
      //   },
      //   {
      //     firstName: 'Kritsanah',
      //     lastName: 'Supphasri',
      //     email: 'kritsanah@mail.com',
      //     image: 'image',
      //   },
      //   {
      //     firstName: 'TESTF',
      //     lastName: 'TESTL',
      //     email: 'testL@mail.com',
      //     image: 'image',
      //   },
      //   {
      //     firstName: 'Kritsanah',
      //     lastName: 'Supphasri',
      //     email: 'kritsanah@mail.com',
      //     image: 'image',
      //   },
      //   {
      //     firstName: 'TESTF',
      //     lastName: 'TESTL',
      //     email: 'testL@mail.com',
      //     image: 'image',
      //   },
      //   {
      //     firstName: 'Kritsanah',
      //     lastName: 'Supphasri',
      //     email: 'kritsanah@mail.com',
      //     image: 'image',
      //   },
      //   {
      //     firstName: 'TESTF',
      //     lastName: 'TESTL',
      //     email: 'testL@mail.com',
      //     image: 'image',
      //   },
      // ];
      // this.props.addUser(this.props.userList, data2);
    }
  }

  _refreshComponent() {
    return (
      <RefreshControl
        colors={['#09cde3', '#09cde3']}
        refreshing={this.state.isRefreshing}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
  _loadingComponent() {
    if (!this.state.isLoading) {
      return null;
    }
    return <ActivityIndicator size="large" color="#09cde3" />;
  }

  _renderItem({item, index}: any) {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>
        <View style={styles.userInfoContainer}>
          <Text>{item.firstName + ' ' + item.lastName} </Text>
          <Text>{item.email}</Text>
          <Text>
            Status {index + 1}: {item.isActive ? 'Active' : 'InActive '}
          </Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            value={item.isActive}
            trackColor={{false: 'red', true: 'green'}}
            thumbColor={'white'}
            onValueChange={event => {
              this.props.updateUserStatus(this.props.userList, index, event);
              this.loadDataPerPage(this.state.page);
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.background}>
        <View style={{flex: 1}}>
          <FlatList
            initialNumToRender={10}
            data={this.state.user}
            renderItem={this._renderItem.bind(this)}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
            refreshControl={this._refreshComponent()}
            ListFooterComponent={this._loadingComponent.bind(this)}
            onEndReachedThreshold={0.3}
            onEndReached={this._handleLoadMore.bind(this)}
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
  itemContainer: {
    margin: 10,
    padding: 10,
    borderColor: '#00adcc',
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#ededed',
  },
  imageContainer: {
    width: '20%',
  },
  image: {
    width: 50,
    height: 50,
  },
  userInfoContainer: {
    flex: 4,
  },
  switchContainer: {
    marginTop: 10,
    flex: 1,
  },
});

export default UserScreen;
