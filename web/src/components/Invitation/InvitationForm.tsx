import { EmailField, Form, Label, Submit, TextField } from '@redwoodjs/forms';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { PopoverDialog } from 'src/components/PopoverDialog';

const CREATE_INVITATION_MUTATION = gql`
  mutation CreateInvitationMutation(
    $scheduleId: ID!
    $invitedUserEmail: String!
    $invitedUserName: String!
  ) {
    createInvitation(
      input: {
        scheduleId: $scheduleId
        invitedUserEmail: $invitedUserEmail
        invitedUserName: $invitedUserName
      }
    ) {
      id
      schedule {
        id
        confirmations {
          id
          player {
            id
            name
            email
          }
          invitation {
            email
          }
          status
        }
      }
    }
  }
`;

type InvitationFormFields = {
  invitedUserEmail: string;
  invitedUserName: string;
};

interface Props {
  scheduleId: string;
  handleClose: () => void;
}

export const InvitationForm = ({ scheduleId, handleClose }: Props) => {
  const [createInvitation] = useMutation(CREATE_INVITATION_MUTATION, {
    onCompleted: () => {
      toast.success('Invitation created');
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSendInvite = ({
    invitedUserEmail,
    invitedUserName,
  }: InvitationFormFields) => {
    createInvitation({
      variables: {
        scheduleId: scheduleId,
        invitedUserEmail,
        invitedUserName,
      },
    });
  };

  return (
    <PopoverDialog title="Send Invitation" onClose={handleClose}>
      <div className="rw-form-wrapper">
        <Form<InvitationFormFields> onSubmit={onSendInvite}>
          <Label name="invitedUserName" className="rw-label">
            Name
          </Label>
          <TextField className="rw-input" name="invitedUserName" />

          <Label name="invitedUserEmail" className="rw-label">
            Email
          </Label>
          <EmailField className="rw-input" name="invitedUserEmail" />
          <div className="rw-button-group">
            <Submit className="rw-button rw-button-green">Invite</Submit>
          </div>
        </Form>
      </div>
    </PopoverDialog>
  );
};
