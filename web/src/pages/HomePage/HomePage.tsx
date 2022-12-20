import { MetaTags } from "@redwoodjs/web";
import PlayersCell from "src/components/PlayersCell";

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      Home
      <PlayersCell />
    </>
  );
};

export default HomePage;
