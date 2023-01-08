import EditReservationCell from 'src/components/Reservation/EditReservationCell';

type ReservationPageProps = {
  id: string;
};

const EditReservationPage = ({ id }: ReservationPageProps) => {
  return <EditReservationCell id={id} />;
};

export default EditReservationPage;
