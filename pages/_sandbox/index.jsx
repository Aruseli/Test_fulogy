import Link from 'next/link';
import 'normalize.css';

export default () => (
  <div>
    <Link href="/_sandbox/picture">
      <a>
        <div>picture</div>
      </a>
    </Link>
    <Link href="/_sandbox/use-query">
      <a>
        <div>use-query</div>
      </a>
    </Link>
    <Link href="/_sandbox/ssr-theme">
      <a>
        <div>ssr-theme</div>
      </a>
    </Link>
    <Link href="/_sandbox/mui-ssr">
      <a>
        <div>mui-ssr</div>
      </a>
    </Link>
  </div>
);
