import type {
  EditCourtLocationById,
  UpdateCourtLocationInput,
} from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

type FormCourtLocation = NonNullable<EditCourtLocationById['courtLocation']>;

interface CourtLocationFormProps {
  courtLocation?: EditCourtLocationById['courtLocation'];
  onSave: (
    data: UpdateCourtLocationInput,
    id?: FormCourtLocation['id'],
  ) => void;
  error: RWGqlError;
  loading: boolean;
}

const CourtLocationForm = (props: CourtLocationFormProps) => {
  const onSubmit = (data: FormCourtLocation) => {
    props.onSave(data, props?.courtLocation?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormCourtLocation> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.courtLocation?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>

        <TextField
          name="address"
          defaultValue={props.courtLocation?.address}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="address" className="rw-field-error" />

        <Label
          name="notes"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Notes
        </Label>

        <TextField
          name="notes"
          defaultValue={props.courtLocation?.notes}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="notes" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default CourtLocationForm;
