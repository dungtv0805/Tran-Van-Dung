import { InputNumber } from 'antd';
import { FC } from 'react';
import './fancy-form.scss';

interface Props {
  value?: { inputPrice?: string; currentPrice?: string };
  onChange?: (v: { inputPrice?: string; currentPrice?: string }) => void;
  disableInput?: boolean;
}

export const PriceCurreny: FC<Props> = ({ value, onChange, disableInput }) => {
  return (
    <span className={'price-currency'}>
      <div>
        {disableInput ? (
          <span>{value?.inputPrice || 0}</span>
        ) : (
          <InputNumber
            style={{ width: '100%' }}
            variant="borderless"
            value={value?.inputPrice}
            onChange={(e) => {
              onChange?.({
                inputPrice: e || '',
                currentPrice: value?.currentPrice,
              });
            }}
          />
        )}
      </div>
      <div className="tooltip-container">
        <span className="text-ellipsis">{`Current price: ${
          value?.currentPrice || ''
        } USD`}</span>
        <span className="tooltip-text">{`Current price: ${
          value?.currentPrice || ''
        } USD`}</span>
      </div>
    </span>
  );
};
