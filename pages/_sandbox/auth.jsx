// @flow

import React, { useContext, useEffect } from 'react';

import Cookies from 'js-cookie';

import { useTheme, Typography, Button } from '@material-ui/core';
import { Picture } from '../../imports/packages/picture';
import { wrapPage } from '../../imports/wrap-page';
import _ from 'lodash';
import Link from 'next/link';
import { useAuth } from '../../imports/packages/auth/react';

export default wrapPage(() => {
  const { _sandbox_auth_info } = useAuth();
  return (
    <>
      <div>
        <pre>
        _sandbox_auth_info: {JSON.stringify(_sandbox_auth_info, null, 2)}
        </pre>
        <hr/>
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
        <hr/>
        <div>
          <Link href="/api/auth/logout"><a>/api/auth/logout</a></Link>
        </div>
      </div>
    </>
  );
});
