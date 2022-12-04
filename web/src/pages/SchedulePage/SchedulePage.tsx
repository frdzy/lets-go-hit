import {
  FieldError,
  Form,
  Label,
  Submit,
  TextField,
  useForm,
} from "@redwoodjs/forms";
import { MetaTags, useMutation } from "@redwoodjs/web";
import { toast, Toaster } from "@redwoodjs/web/toast";
import ScheduleCell from "src/components/ScheduleCell";
import { SignUpMutation, SignUpMutationVariables } from "types/graphql";

const SIGN_UP = gql`
  mutation SignUpMutation($input: ConfirmWithEmailInput!) {
    confirmWithEmail(input: $input) {
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
      toast.success("Signed up");
    },
  });

  const handleSubmit = (data: { email: string; name: string }) => {
    signUp({ variables: { input: { scheduleId: id, ...data } } });
  };

  return (
    <>
      <MetaTags title="Schedule" description="Schedule page" />
      <h1>Sign Up</h1>
      <Toaster />
      <ScheduleCell id={id}>
        <Form onSubmit={handleSubmit} formMethods={formMethods}>
          <Label name="name" errorClassName="error">
            Name
          </Label>
          <TextField
            name="name"
            validation={{ required: true }}
            errorClassName="error"
          />
          <FieldError className="error" name="name" />
          <Label name="email" errorClassName="error">
            Email
          </Label>
          <TextField
            name="email"
            validation={{
              required: true,
              pattern: {
                value: /^[^@]+@[^.]+\..+$/,
                message: "Please enter a valid email address",
              },
            }}
            errorClassName="error"
          />
          <FieldError className="error" name="email" />
          <Submit disabled={loading}>Submit</Submit>
        </Form>
      </ScheduleCell>
    </>
  );
};

export default SchedulePage;
