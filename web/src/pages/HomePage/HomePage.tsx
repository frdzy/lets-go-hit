import { useAuth } from '@redwoodjs/auth';
import { MetaTags } from '@redwoodjs/web';
import SchedulesCell from 'src/components/Schedule/SchedulesCell';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h2 className="rw-heading rw-heading-primary my-2">Home</h2>
      {isAuthenticated ? (
        <SchedulesCell />
      ) : (
        <p>Welcome! Create an account to get started.</p>
      )}
    </>
  );
};

export default HomePage;
