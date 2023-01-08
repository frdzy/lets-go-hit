import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  Submit,
} from '@redwoodjs/forms';

import type {
  EditReservationById,
  UpdateReservationInput,
} from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '');
  }
};

type FormReservation = NonNullable<EditReservationById['reservation']>;

interface ReservationFormProps {
  reservation?: EditReservationById['reservation'];
  onSave: (data: UpdateReservationInput, id?: FormReservation['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const ReservationForm = (props: ReservationFormProps) => {
  const onSubmit = (data: FormReservation) => {
    props.onSave(data, props?.reservation?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormReservation> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={formatDatetime(props.reservation?.beginTimestamp)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="beginTimestamp" className="rw-field-error" />

        <Label
          name="endTimestamp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End timestamp
        </Label>

        <DatetimeLocalField
          name="endTimestamp"
          defaultValue={formatDatetime(props.reservation?.endTimestamp)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endTimestamp" className="rw-field-error" />

        <Label
          name="courtLocationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Court location id
        </Label>

        <TextField
          name="courtLocationId"
          defaultValue={props.reservation?.courtLocationId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="courtLocationId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ReservationForm;
