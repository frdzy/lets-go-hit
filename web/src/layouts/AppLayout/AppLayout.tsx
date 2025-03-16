import { NavLink, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth();
  const navItems = [
    {
      to: routes.home(),
      label: 'Home',
    },
    {
      to: routes.reservations(),
      label: 'Reservations',
    },
    {
      to: routes.courtLocations(),
      label: 'Courts',
    },
  ];

  const loginStyle = 'mx-2 my-auto max-w-xs rounded-xl bg-slate-50 p-2';
  return (
    <>
      <header className="justify-between sm:flex">
        <h1 className="font-xl mx-2 my-2 text-xl">Let{"'"}s Go Play 🎾</h1>
        {isAuthenticated && currentUser ? (
          <div className="flex-column flex">
            <div className="mx-2 my-2">{currentUser.email}</div>
            <button className={loginStyle} type="button" onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            className={loginStyle}
            activeClassName="activeLink"
            to={routes.login()}
          >
            Login
          </NavLink>
        )}
      </header>
      <nav className="mx-3 my-2 flex sm:justify-center">
        {navItems.map((o) => (
          <NavLink
            key={o.label}
            className="mx-3"
            activeClassName="mx-3 activeLink"
            to={o.to}
          >
            {o.label}
          </NavLink>
        ))}
      </nav>
      <main className="rw-main my-2 mx-2 sm:px-8">{children}</main>
    </>
  );
};

export default AppLayout;
