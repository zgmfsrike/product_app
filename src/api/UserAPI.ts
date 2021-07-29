import axios from 'axios';

const BASE_URL = 'https://dummyapi.io';
const APP_ID = '61021547647d30100dc23bff';

export async function getUserService(page: number | 1) {
  return axios
    .get(`${BASE_URL}/data/api/user?limit=10&page=${page}`, {
      headers: {'app-id': APP_ID},
    })
    .then(({data}) => {
      try {
        return data;
      } catch (error) {
        console.log(error);
      }
    });
}
