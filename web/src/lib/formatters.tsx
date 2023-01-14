import React from 'react';
import { DateTime } from 'luxon';

import humanize from 'humanize-string';

const MAX_STRING_LENGTH = 150;

export const formatNameForUrl = (name: string): string => {
  return name.toLowerCase().replaceAll(' ', '-');
};

export const formatEnum = (values: string | string[] | null | undefined) => {
  let output = '';

  if (Array.isArray(values)) {
    const humanizedValues = values.map((value) => humanize(value));
    output = humanizedValues.join(', ');
  } else if (typeof values === 'string') {
    output = humanize(values);
  }

  return output;
};

export const formatDatetime = (isoTimeString: string | null) => {
  if (!isoTimeString) {
    return undefined;
  }

  const dateTimeLocalTruncated = DateTime.fromISO(isoTimeString)
    .toISO() // adjusts with local timezone
    .toString()
    .replace(/:\d{2}\.\d{3}.*/, '');
  return dateTimeLocalTruncated;
};

export const jsonDisplay = (obj: unknown) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};

export const truncate = (value: string | number) => {
  let output = value?.toString() ?? '';

  if (output.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...';
  }

  return output;
};

export const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2));
};

export const timeTag = (dateTime?: string) => {
  let output: string | JSX.Element = '';

  if (dateTime) {
    output = (
      <time dateTime={dateTime} title={dateTime}>
        {DateTime.fromISO(dateTime).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
      </time>
    );
  }

  return output;
};

export const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />;
};
