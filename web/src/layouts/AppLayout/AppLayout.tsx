import { useAuth } from '@redwoodjs/auth';
import { NavLink, routes } from '@redwoodjs/router';

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
      to: routes.schedules(),
      label: 'Schedules',
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

  return (
    <>
      <header className="sm:flex">
        <h1 className="font-xl my-auto px-4 pt-2 text-xl">
          Let's Go Play Tennis
        </h1>
        <div className="grow" />
        <div className="mx-2 my-auto max-w-xs rounded-xl bg-slate-50 p-2">
          {isAuthenticated && currentUser ? (
            <>
              <span>Logged in as {currentUser.email}</span>{' '}
              <button type="button" onClick={logOut}>
                Logout
              </button>
            </>
          ) : (
            <NavLink activeClassName="activeLink" to={routes.login()}>
              Login
            </NavLink>
          )}
        </div>
      </header>
      <nav className="mx-3 my-2 flex sm:justify-center">
        {navItems.map((o) => (
          <NavLink
            key={o.label}
            className="mx-3"
            activeClassName="activeLink"
            to={o.to}
          >
            {o.label}
          </NavLink>
        ))}
      </nav>
      <main className="rw-main my-2 px-2 sm:px-8">{children}</main>
    </>
  );
};

export default AppLayout;
