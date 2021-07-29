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
import {getUserService} from '../../api/UserAPI';
import {User} from '../../redux/๊User/UserType';

class UserScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: [],
      userStatus: [],
      isRefreshing: false,
      isLoading: false,
      limit: 10,
      page: 1,
    };
  }

  fetchUser(page: number) {
    return getUserService(page);
  }

  getUserState(data: User[]) {
    this.props.updateUserInfo(data, this.state.userStatus);
    this.onLoading();
  }

  updateUserState(currentData: User[], newData: User[], page: number) {
    this.setState({isLoading: true});
    this.props.loadMoreUser(currentData, newData, this.state.userStatus);
    setTimeout(() => {
      this.setState({
        user: this.props.userList,
        page: page,
      });
      this.setState({isLoading: false});
    }, 1000);
  }

  async componentDidMount() {
    const {data} = await this.fetchUser(this.state.page);
    this.getUserState(data);
  }

  loadDataPerPage(numberPage: number) {
    const data = this.props.userList;
    this.setState({user: data, page: numberPage});
  }

  onRefresh() {
    this.setState({isRefreshing: true}, () => {
      setTimeout(async () => {
        const page = 1;
        const {data} = await this.fetchUser(page);
        const userStatus = this.state.user.map((item: User) => {
          return {id: item.id, isActive: item.isActive};
        });
        this.setState({isRefreshing: false, page, userStatus});
        this.getUserState(data);
      }, 1000);
    });
  }

  onLoading() {
    this.setState({isLoading: true}, () => {
      setTimeout(() => {
        this.setState({user: this.props.userList});
        this.setState({isLoading: false});
      }, 1000);
    });
  }

  async _handleLoadMore() {
    if (!this.state.isLoading) {
      const nextPage = this.state.page + 1;
      const {data} = await this.fetchUser(nextPage);
      this.updateUserState(this.state.user, data, nextPage);
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
              uri: item.picture,
            }}
          />
        </View>
        <View style={styles.userInfoContainer}>
          <Text>{item.firstName + ' ' + item.lastName} </Text>
          <Text>{item.email}</Text>
          <Text>Status : {item.isActive ? 'Active' : 'InActive '}</Text>
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
