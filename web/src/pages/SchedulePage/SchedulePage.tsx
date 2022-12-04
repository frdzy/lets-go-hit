import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

import OpenSchedulesCell from "src/components/OpenSchedulesCell";

const SchedulePage = () => {
  return (
    <>
      <MetaTags title="Schedule" description="Schedule page" />

      <h1>SchedulePage</h1>
      <p>
        Find me in <code>./web/src/pages/SchedulePage/SchedulePage.tsx</code>
      </p>
      <p>
        My default route is named <code>schedule</code>, link to me with `
        <Link to={routes.schedule()}>Schedule</Link>`
      </p>
      <OpenSchedulesCell />
    </>
  );
};

export default SchedulePage;
