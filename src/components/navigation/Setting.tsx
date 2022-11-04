import * as React from 'react';

type Props = {
  label: string;
  count: number; // ???
};

export const Setting: React.FC<Props> = props => {
  const { label, count } = props;

  return (
    <div>
    </div>
  );
};