import { MetaTags } from "@redwoodjs/web";

import OpenSchedulesCell from "src/components/OpenSchedulesCell";

const SchedulePage = () => {
  return (
    <>
      <MetaTags title="Schedule" description="Schedule page" />
      <h1>Schedule</h1>
      <OpenSchedulesCell />
    </>
  );
};

export default SchedulePage;
