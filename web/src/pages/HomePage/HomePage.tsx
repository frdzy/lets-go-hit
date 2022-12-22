import { MetaTags } from '@redwoodjs/web';
import PlayersCell from 'src/components/PlayersCell';

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h2 className="rw-heading rw-heading-primary my-2">Home</h2>
      <PlayersCell />
    </>
  );
};

export default HomePage;
