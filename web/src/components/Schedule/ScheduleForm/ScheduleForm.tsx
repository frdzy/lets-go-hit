import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms';

import type { EditScheduleById, UpdateScheduleInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';
import { formatDatetime } from 'src/lib/formatters';

import ScheduleSelectReservationFieldCell from 'src/components/Schedule/ScheduleSelectReservationFieldCell';
import { useAuth } from 'src/auth';

type FormSchedule = NonNullable<EditScheduleById['schedule']>;

interface ScheduleFormProps {
  schedule?: EditScheduleById['schedule'];
  onSave: (data: UpdateScheduleInput, id?: FormSchedule['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const ScheduleForm = (props: ScheduleFormProps) => {
  const { currentUser } = useAuth();
  const onSubmit = (data: FormSchedule) => {
    props.onSave(data, props?.schedule?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormSchedule> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="beginTimestamp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Begin timestamp
        </Label>

        <DatetimeLocalField
          name="beginTimestamp"
          defaultValue={formatDatetime(props.schedule?.beginTimestamp)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="beginTimestamp" className="rw-field-error" />

        <Label
          name="reservationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Reservation
        </Label>

        <ScheduleSelectReservationFieldCell
          name="reservationId"
          fromScheduleSearch={props.schedule?.id}
          defaultValue={props.schedule?.reservation?.id}
        />

        <FieldError name="reservationId" className="rw-field-error" />

        <Label
          name="confirmations"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Confirmations
        </Label>

        <div className="rw-input">
          {props.schedule.confirmations.map((confirmation) => (
            <div key={confirmation.id}>
              <span>
                {(confirmation.player.name ?? 'Unnamed') +
                  (confirmation.player.id === currentUser.id ? ' (you)' : '')}
              </span>{' '}
              <span>({confirmation.status ?? 'invited'})</span>
            </div>
          ))}
          {props.schedule.createdByUser.id === currentUser.id && (
            <div className="rw-button">Invite</div>
          )}
          {props.schedule.confirmations.some(
            (c) => c.player.id === currentUser.id && c.status === 'invited'
          ) && <div className="rw-button">Confirm</div>}
        </div>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ScheduleForm;
