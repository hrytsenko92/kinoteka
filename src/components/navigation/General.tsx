import * as React from 'react';

type Props = {
  label: string;
  count: number; // ???
};

export const General: React.FC<Props> = props => {
  const { label, count } = props;

  return (
    <div>
    </div>
  );
};