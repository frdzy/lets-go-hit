import { useAuth } from '@redwoodjs/auth';
import { MetaTags } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';
import { useEffect } from 'react';
import PlayersCell from 'src/components/PlayersCell';

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h2 className="rw-heading rw-heading-primary my-2">Home</h2>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <PlayersCell />
    </>
  );
};

export default HomePage;
