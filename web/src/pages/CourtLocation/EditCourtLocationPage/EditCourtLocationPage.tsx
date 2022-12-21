import EditCourtLocationCell from 'src/components/CourtLocation/EditCourtLocationCell';

type CourtLocationPageProps = {
  id: string;
};

const EditCourtLocationPage = ({ id }: CourtLocationPageProps) => {
  return <EditCourtLocationCell id={id} />;
};

export default EditCourtLocationPage;
