import type {
  DeleteScheduleMutationVariables,
  FindScheduleById,
} from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { useState } from 'react';

import { useAuth } from 'src/auth';
import { CreatorReference } from 'src/components/CreatorReference';
import { Reference } from 'src/components/Reference';
import { getReferenceFromReservation, timeTag } from 'src/lib/formatters';
import { InvitationForm } from 'src/components/Invitation/InvitationForm';

const DELETE_SCHEDULE_MUTATION = gql`
  mutation DeleteScheduleMutation($id: ID!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`;

interface Props {
  schedule: NonNullable<FindScheduleById['schedule']>;
}

const Schedule = ({ schedule }: Props) => {
  const { currentUser } = useAuth();

  const [deleteSchedule] = useMutation(DELETE_SCHEDULE_MUTATION, {
    onCompleted: () => {
      toast.success('Schedule deleted');
      navigate(routes.home());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [showInvitationForm, setShowInvitationForm] = useState(false);

  const onInviteClick = () => {
    setShowInvitationForm(true);
  };
  const handleCloseInviteForm = () => {
    setShowInvitationForm(false);
  };

  const onDeleteClick = (id: DeleteScheduleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete schedule ' + id + '?')) {
      deleteSchedule({ variables: { id } });
    }
  };

  return (
    <>
      {schedule.createdByUser.id === currentUser.id &&
        (showInvitationForm ? (
          <InvitationForm
            scheduleId={schedule.id}
            handleClose={handleCloseInviteForm}
          />
        ) : null)}
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Schedule {schedule.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{schedule.id}</td>
            </tr>
            <tr>
              <th>Begin timestamp</th>
              <td>{timeTag(schedule.beginTimestamp)}</td>
            </tr>
            <tr>
              <th>Reservation</th>
              <td>
                <Reference
                  referenceTarget={getReferenceFromReservation(
                    schedule.reservation,
                  )}
                  routeToCreate={routes.newReservation}
                  routeToDetails={(id) => routes.reservation({ id: id })}
                />
              </td>
            </tr>
            <tr>
              <th>
                <div>Confirmations</div>
                <div className="rw-button" onClick={onInviteClick}>
                  Invite
                </div>
              </th>
              <td>
                {schedule.confirmations.map((confirmation) => {
                  const displayName =
                    (confirmation.player
                      ? confirmation.player.name === ''
                        ? confirmation.player.email
                        : confirmation.player.name
                      : confirmation.invitation?.email) +
                    (confirmation.player?.id === currentUser.id
                      ? ' (you)'
                      : '');
                  return (
                    <div key={confirmation.id}>
                      <span>{displayName}</span>{' '}
                      <span>({confirmation.status ?? 'invited'})</span>
                    </div>
                  );
                })}
                {schedule.confirmations.some(
                  (c) =>
                    c.player?.id === currentUser.id && c.status === 'invited',
                ) && <div className="rw-button">Confirm</div>}
              </td>
            </tr>
            <tr>
              <th>Created by user</th>
              <td>
                <CreatorReference referenceTarget={schedule.createdByUser} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSchedule({ id: schedule.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(schedule.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default Schedule;
