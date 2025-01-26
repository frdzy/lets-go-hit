import { classnames, spacing, typography } from 'tailwindcss-classnames';

import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import SchedulesCell from 'src/components/Schedule/SchedulesCell';

type Props = {
  type?: 'myUpcoming' | 'myPast';
  children: React.ReactNode;
};

function ScheduleFilterOption(
  props: Props & { myType: Required<Props['type']> },
) {
  return (
    <Link to={routes.home({ type: props.myType })}>
      <span
        className={classnames(
          spacing('mx-4'),
          typography({
            underline: props.myType === props.type,
          }),
        )}
      >
        {props.children}
      </span>
    </Link>
  );
}

function ScheduleFilterSelector(props: Props) {
  return (
    <span>
      <ScheduleFilterOption {...props} myType="myUpcoming">
        My Upcoming
      </ScheduleFilterOption>
      <ScheduleFilterOption {...props} myType="myPast">
        My Past
      </ScheduleFilterOption>
    </span>
  );
}

const HomePage = (props: Props) => {
  const { type: filter = 'myUpcoming' } = props;
  const { isAuthenticated } = useAuth();

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {isAuthenticated ? (
        <>
          <ScheduleFilterSelector {...props} />
          <SchedulesCell filter={filter} />
        </>
      ) : (
        <p>Welcome! Create an account to get started.</p>
      )}
    </>
  );
};

export default HomePage;
