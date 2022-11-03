import * as React from 'react';

type Props = {
  label: string;
  count: number; // ???
};

export const ItemList: React.FC<Props> = props => {
  const { label, count } = props;

  return (
    <div>
    </div>
  );
};