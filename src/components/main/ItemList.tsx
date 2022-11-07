import * as React from 'react';

type Props = {
  itemLabel: string;
};

export const ItemList: React.FC<Props> = ({itemLabel}:Props) => { 
  // const { label, count } = props;

  return (
    <div>
      {itemLabel}
    </div>
  );
};