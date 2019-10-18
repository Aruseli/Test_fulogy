import React, { useContext, useEffect } from 'react';

import Cookies from 'js-cookie';

import { useTheme, Typography, Button } from '@material-ui/core';
import { Picture } from '../../imports/packages/picture';
import { wrapPage } from '../../imports/wrap-page';
import _ from 'lodash';
import Link from 'next/link';

export default wrapPage(() => {
  useEffect(() => {
    Cookies.set('_sandbox_auth_redirect', '/_sandbox/auth');
  }, []);

  return (
    <>
      <div>
        <div>
          <Link href="/api/auth/google"><a>/api/auth/google</a></Link>
        </div>
        <div>
          <Link href="/api/auth/yandex"><a>/api/auth/yandex</a></Link>
        </div>
        <div>
          <Link href="/api/auth/vk"><a>/api/auth/vk</a></Link>
        </div>
        <div>
          <Link href="/api/auth/ok"><a>/api/auth/ok</a></Link>
        </div>
      </div>
    </>
  );
});
