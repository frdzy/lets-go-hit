import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  Submit,
} from '@redwoodjs/forms';

import type { EditScheduleById, UpdateScheduleInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';
import { formatDatetime } from 'src/lib/formatters';

type FormSchedule = NonNullable<EditScheduleById['schedule']>;

interface ScheduleFormProps {
  schedule?: EditScheduleById['schedule'];
  onSave: (data: UpdateScheduleInput, id?: FormSchedule['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const ScheduleForm = (props: ScheduleFormProps) => {
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
          Reservation id
        </Label>

        <TextField
          name="reservationId"
          defaultValue={props.schedule?.reservation?.id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="reservationId" className="rw-field-error" />

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
