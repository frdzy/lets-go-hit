import { useAuth } from '@redwoodjs/auth';
import { NavLink, routes } from '@redwoodjs/router';

type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth();
  return (
    <>
      <header className="md:flex">
        <h1 className="font-xl my-auto px-4 pt-2 text-xl">
          Let's Go Play Tennis
        </h1>
        <div className="mx-2 my-4 max-w-xs rounded-xl bg-slate-50 p-2">
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
      <nav className="my-2 px-4">
        <ul>
          <li>
            <NavLink activeClassName="activeLink" to={routes.home()}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="activeLink" to={routes.schedules()}>
              Schedules
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="activeLink" to={routes.reservations()}>
              Reservations
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="activeLink" to={routes.courtLocations()}>
              Courts
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="rw-main my-2 px-2">{children}</main>
    </>
  );
};

export default AppLayout;
