const getters = {
  username: state => state.login.username,
  role: state => state.login.role,
  newrouter: state => state.login.newrouter,
  route: state => state.login.route
};
export default getters
