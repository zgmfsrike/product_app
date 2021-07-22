import {connect} from 'react-redux';
// import AsyncStorage from '@react-native-community/async-storage';
import {UPDATE_USER_INFO, ADD_USER, User} from '../../redux/๊User/UserType';
import UserScreen from '../../screens/User/UserScreen';

//**map dispatch function to props

// const userStorage = async () => {
//   //   AsyncStorage.setItem('USER_INFO', 'test');
// //   AsyncStorage.removeItem('USER_INFO');
//   return await AsyncStorage.getItem('USER_INFO');
// };

const addActiveStatus = (data: User[]) => {
  return data.map(info => ({...info, isActive: true}));
};

const updateUserInfo = (data: User[]) => {
  //   userStorage().then(res => {
  //     console.log(res);
  //   });
  //   if (userStorage() !== null) {
  //     console.log('not_ null');
  //   } else {
  //     console.log('null');
  //   }
  //   console.log(userStorage());
  const updateData = addActiveStatus(data);
  return {type: UPDATE_USER_INFO, payload: updateData};
};

const updateUserStatus = (data: User[], index: number, status: boolean) => {
  data[index] = {...data[index], isActive: status};
  const updateData = data;
  return {type: UPDATE_USER_INFO, payload: updateData};
};

const addUser = (data: User[], newData: User[]) => {
  newData = addActiveStatus(newData);
  const updateData = [...data, ...newData];
  return {type: UPDATE_USER_INFO, payload: updateData};
};

const mapStateToProps = (state: any) => ({
  userList: state.userReducer.user,
});
const mapDispatchToProps = (dispatch: any) => ({
  addUser: (data: User[], newData: User[]) => dispatch(addUser(data, newData)),
  updateUserInfo: (data: User[]) => dispatch(updateUserInfo(data)),
  updateUserStatus: (data: User[], index: number, status: boolean) =>
    dispatch(updateUserStatus(data, index, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
