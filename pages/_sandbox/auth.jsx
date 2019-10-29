// @flow

import React, { useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { useTheme, Typography, Button } from '@material-ui/core';
import { Picture } from '../../imports/packages/picture';
import { wrapPage } from '../../imports/wrap-page';
import _ from 'lodash';
import Link from 'next/link';
import { useAuth } from '../../imports/packages/auth/react';

export default wrapPage(() => {
  const { auth_token, node_id, localLogin, logout, loading } = useAuth();

  const [ajaxR, setAjaxR] = useState<any>();

  return (
    <>
      <div>
        <div>_sandbox_auth_token: {auth_token}</div>
        <div>_sandbox_auth_node_id: {node_id}</div>
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
          <Link href="/api/auth/ok?username=abc&password=def"><a>/api/auth/local abc def</a></Link>
        </div>
        <div>
          <Link href="/api/auth/ok?username=abc&password=abc"><a>/api/auth/local abc abc</a></Link>
        </div>
        <hr/>
        <div>
          <Link href="/api/auth/logout"><a>/api/auth/logout</a></Link>
        </div>
        <hr/>
        <div>
          <a href="#" onClick={async () => setAjaxR(await localLogin('abc','def'))}>ajax /api/auth/local abc def</a>
        </div>
        <div>
          <a href="#" onClick={async () => setAjaxR(await localLogin('abc','abc'))}>ajax /api/auth/local abc abc</a>
        </div>
        <hr/>
        <div>
          <a href="#" onClick={async () => setAjaxR(await logout())}>ajax /api/auth/logout</a>
        </div>
        <hr/>
        <div>
          loading: {loading ? 'true' : 'false'}
        </div>
        <pre>
          {JSON.stringify(ajaxR, null, 2)}
        </pre>
      </div>
    </>
  );
});
