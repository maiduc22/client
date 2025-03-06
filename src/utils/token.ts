export const saveToken = (token: string) => {
  console.log('token', token);
  localStorage.setItem('token', token);
};
