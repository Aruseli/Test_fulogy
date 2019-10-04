import './style.css';

import React, { useEffect, useState } from 'react';

let _ReactJson;
if (process.browser) {
  _ReactJson = require('react-json-view').default;
}

export const ReactJson = (props) => {
  return _ReactJson ? <_ReactJson {...props}/> : <></>;
};