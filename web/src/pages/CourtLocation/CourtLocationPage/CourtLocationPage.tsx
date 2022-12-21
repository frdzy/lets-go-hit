import CourtLocationCell from 'src/components/CourtLocation/CourtLocationCell';

type CourtLocationPageProps = {
  id: string;
};

const CourtLocationPage = ({ id }: CourtLocationPageProps) => {
  return <CourtLocationCell id={id} />;
};

export default CourtLocationPage;
