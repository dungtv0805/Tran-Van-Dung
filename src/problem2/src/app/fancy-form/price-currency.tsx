import { InputNumber } from 'antd';
import { FC } from 'react';
import './fancy-form.scss';

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}

export const PriceCurreny: FC<Props> = ({ value, onChange }) => {
  return (
    <InputNumber
      variant="borderless"
      value={value}
      className={'price-currency'}
      onChange={(e) => onChange?.(e || '')}
    />
  );
};
