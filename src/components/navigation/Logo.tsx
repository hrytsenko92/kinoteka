import * as React from 'react';
import logoImg from "../../assets/logoImg.svg"

type Props = {
  label: string;
  count: number; // ???
};

export const Logo: React.FC<Props> = props => {
  const { label, count } = props;

  return (
    <div>
    </div>
  );
};