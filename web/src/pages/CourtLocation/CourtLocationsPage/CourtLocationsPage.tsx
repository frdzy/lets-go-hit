import { MetaTags } from '@redwoodjs/web';

import CourtLocationsCell from 'src/components/CourtLocation/CourtLocationsCell';

const CourtLocationsPage = () => {
  return (
    <>
      <MetaTags title="Courts" description="Courts page" />
      <CourtLocationsCell />
    </>
  );
};

export default CourtLocationsPage;
