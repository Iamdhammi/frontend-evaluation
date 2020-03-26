
const setAuthUser = user => {
  if(user) {
    localStorage.setItem(`evaluation_user`, JSON.stringify(user));
  }else {
    localStorage.removeItem(`evaluation_user`);
  }
}
  
export default setAuthUser;