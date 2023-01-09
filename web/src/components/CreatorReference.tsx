import { Reference } from 'src/components/Reference';

type Props = {
  referenceTarget: { id: string; name?: string };
};
export const CreatorReference = (props: Props) => {
  return (
    <Reference referenceTarget={props.referenceTarget} isImmutable={true} />
  );
};
