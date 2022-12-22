import { useAuth } from '@redwoodjs/auth';
import { Link, routes } from '@redwoodjs/router';

type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth();
  return (
    <>
      <header className="rw-header">
        <h1>Let's Go Play Tennis</h1>
        {isAuthenticated && currentUser ? (
          <div>
            <span>Logged in as {currentUser.email}</span>{' '}
            <button type="button" onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <Link to={routes.login()}>Login</Link>
        )}
      </header>
      <nav>
        <ul>
          <li>
            <Link to={routes.home()}>Home</Link>
          </li>
          <li>
            <Link to={routes.schedules()}>Schedules</Link>
          </li>
          <li>
            <Link to={routes.courtLocations()}>Courts</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
