import jwtDecode from 'jwt-decode';

export const saveToken = (token: string) => {
  console.log('token', token);
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const decodeToken = (token: string) => {
  return jwtDecode(token);
};
