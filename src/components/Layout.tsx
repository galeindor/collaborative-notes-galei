import { Link } from "react-router-dom";

import { ReactNode } from "react";

const Layout = ( { children }: { children: ReactNode } ) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/notes">Notes</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}

export default Layout;