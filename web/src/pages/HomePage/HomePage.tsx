import { useAuth } from '@redwoodjs/auth';
import { MetaTags } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';
import { useEffect } from 'react';
import PlayersCell from 'src/components/PlayersCell';

const HomePage = () => {
  const auth = useAuth();

  // Notifier for render.com issue to poke the rewrite rules
  // https://community.redwoodjs.com/t/seeing-authorization-header-is-not-valid-after-deploying-to-render-com/2808
  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
      if (token.includes('<')) {
        toast.error('App error');
      }
    })();
  }, [auth]);

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
