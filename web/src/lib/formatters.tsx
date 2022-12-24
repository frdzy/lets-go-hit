import React from 'react';

import humanize from 'humanize-string';

const MAX_STRING_LENGTH = 150;
const MS_IN_ONE_MINUTE = 60 * 1000;

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

  const date = new Date(isoTimeString);
  const dateLocalTruncatedString = new Date(
    +date - date.getTimezoneOffset() * MS_IN_ONE_MINUTE
  )
    .toISOString()
    .replace(/:\d{2}\.\d{3}\w/, '');

  return dateLocalTruncatedString;
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
        {new Date(dateTime).toUTCString()}
      </time>
    );
  }

  return output;
};

export const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />;
};
