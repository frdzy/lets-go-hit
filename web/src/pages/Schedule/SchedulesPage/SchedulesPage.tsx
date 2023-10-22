import { MetaTags } from '@redwoodjs/web';
import { Link, routes } from '@redwoodjs/router';
import SchedulesCell from 'src/components/Schedule/SchedulesCell';
import { classnames, spacing, typography } from 'tailwindcss-classnames';

type Props = {
  type?: 'myUpcoming' | 'myPast';
  children: React.ReactNode;
};

function ScheduleFilterOption(
  props: Props & { myType: Required<Props['type']> }
) {
  return (
    <Link to={routes.schedules({ type: props.myType })}>
      <span
        className={classnames(
          spacing('mx-4'),
          typography({
            underline: props.myType === props.type,
          })
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

const SchedulesPage = (props: Props) => {
  const { type: filter = 'myUpcoming' } = props;
  return (
    <>
      <MetaTags title="Schedules" description="Schedules page" />
      <ScheduleFilterSelector {...props} />
      <SchedulesCell filter={filter} />
    </>
  );
};

export default SchedulesPage;
