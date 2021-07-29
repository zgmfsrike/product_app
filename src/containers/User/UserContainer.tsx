import {connect} from 'react-redux';
// import AsyncStorage from '@react-native-community/async-storage';
import {UPDATE_USER_INFO, User, UserStatus} from '../../redux/๊User/UserType';
import UserScreen from '../../screens/User/UserScreen';

//**map dispatch function to props

// const userStorage = async () => {
//   //   AsyncStorage.setItem('USER_INFO', 'test');
// //   AsyncStorage.removeItem('USER_INFO');
//   return await AsyncStorage.getItem('USER_INFO');
// };

const addActiveStatus = (data: User[], userStatus: UserStatus[]) => {
  return data.map(info => {
    if (userStatus && userStatus.length > 0) {
      const oldStatus = userStatus.find(item => item.id === info.id);
      info.isActive = oldStatus?.isActive;
    } else {
      info.isActive = true;
    }
    return info;
  });
};

const updateUserInfo = (data: User[], userStatus: UserStatus[]) => {
  const updateData = addActiveStatus(data, userStatus);
  return {type: UPDATE_USER_INFO, payload: updateData};
};

const updateUserStatus = (data: User[], index: number, status: boolean) => {
  data[index] = {...data[index], isActive: status};
  const updateData = data;
  return {type: UPDATE_USER_INFO, payload: updateData};
};

const loadMoreUser = (
  data: User[],
  newData: User[],
  userStatus: UserStatus[],
) => {
  newData = addActiveStatus(newData, userStatus);
  const updateData = [...data, ...newData];
  return {type: UPDATE_USER_INFO, payload: updateData};
};

const mapStateToProps = (state: any) => ({
  userList: state.userReducer.user,
});
const mapDispatchToProps = (dispatch: any) => ({
  loadMoreUser: (data: User[], newData: User[], userStatus: UserStatus[]) =>
    dispatch(loadMoreUser(data, newData, userStatus)),
  updateUserInfo: (data: User[], userStatus: UserStatus[]) =>
    dispatch(updateUserInfo(data, userStatus)),
  updateUserStatus: (data: User[], index: number, status: boolean) =>
    dispatch(updateUserStatus(data, index, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
