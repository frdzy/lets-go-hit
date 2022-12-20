import { useMemo } from 'react';

type DateLabelProps = {
  isoTimestamp: string;
};

export const DateLabel = ({ isoTimestamp }: DateLabelProps) => {
  const date = useMemo<Date>(() => new Date(isoTimestamp), [isoTimestamp]);
  return (
    <span>
      {date.toLocaleDateString()} @ {date.toLocaleTimeString()}
    </span>
  );
};
