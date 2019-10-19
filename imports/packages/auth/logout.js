// @flow

import _ from 'lodash';

export const initAuthLogout = (path: string, app: any, apolloClient: any) => {
  app.get(path, (req, res) => {
    res.cookie('_sandbox_auth_info', '');
    req.logout();
    const url = _.get(req, 'cookies._sandbox_auth_redirect');
    res.redirect(url || '/');
  });
};
