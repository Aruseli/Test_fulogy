export const initAuthLogout = (path, app, apolloClient) => {
  app.get(path, (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
