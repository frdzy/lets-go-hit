import {
  FieldError,
  Form,
  Label,
  Submit,
  TextField,
  useForm,
} from '@redwoodjs/forms';
import { MetaTags, useMutation } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';
import ScheduleCell from 'src/components/ScheduleCell';
import { SignUpMutation, SignUpMutationVariables } from 'types/graphql';

const SIGN_UP = gql`
  mutation CreateConfirmationMutation($input: CreateConfirmationInput!) {
    createConfirmation(input: $input) {
      id
      schedule {
        id
        confirmations {
          player {
            name
          }
          status
        }
      }
    }
  }
`;

const SchedulePage = ({ id }) => {
  const formMethods = useForm();

  const [signUp, { loading }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP, {
    onCompleted: () => {
      formMethods.reset();
      toast.success('Signed up');
    },
  });

  const handleSubmit = () => {
    signUp({ variables: { input: { scheduleId: id } } });
  };

  return (
    <>
      <MetaTags title="Schedule" description="Schedule page" />
      <h1>Sign Up</h1>
      <Toaster />
      <ScheduleCell id={id}>
        <Form onSubmit={handleSubmit} formMethods={formMethods}>
          <Submit disabled={loading}>Submit</Submit>
        </Form>
      </ScheduleCell>
    </>
  );
};

export default SchedulePage;
