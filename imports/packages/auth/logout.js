export const initAuthLogout = (path, app, apolloClient) => {
  app.get(path, (req, res) => {
    res.cookie('_sandbox_auth_info', '');
    req.logout();
    const url = _.get(req, 'cookies._sandbox_auth_redirect');
    res.redirect(url || '/');
  });
};
