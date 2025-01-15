/* eslint-disable jsx-a11y/alt-text */
import { Select, SelectProps } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { FC, useMemo } from 'react';
import { environment } from '../env/environment';
import { IToken } from '../services/token.service';
import './fancy-form.scss';
import { PriceCurreny } from './price-currency';

type Props = Omit<SelectProps, 'options'> & {
  tokens?: IToken[];
  tokenMap?: Record<string, IToken>;
  value?: string;
  onChange?: (v: string) => void;
  namePrice: string;
  onPriceInputChange?: (v?: string) => void;
  priceInputDisable?: boolean;
};

export const CurrencySelect: FC<Props> = (props) => {
  const { tokens, namePrice, tokenMap, onPriceInputChange, priceInputDisable } =
    props;
  const selectProps = {
    ...props,
    tokens: undefined,
    namePrice: undefined,
    onPriceInputChange: undefined,
    priceInputDisable: undefined,
  };

  const options = useMemo<SelectProps['options']>(() => {
    return tokens?.map((item, idx) => {
      return {
        value: `${item.currency}_${idx}`,
        label: (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={`${environment.iconTokenPrefixUrl}/${item.currency}.svg`}
            />
            <div style={{ marginLeft: 10 }}>
              <p>{item.currency}</p>
              <p>{`Last update: ${new Date(item.date).toLocaleString()}`}</p>
            </div>
          </span>
        ),
      };
    });
  }, [tokens]);

  return (
    <div className="currency-select-wrapper">
      <img
        style={{ marginLeft: 5 }}
        src={`${environment.iconTokenPrefixUrl}/${
          tokenMap?.[props.value]?.currency
        }.svg`}
      />
      <Select
        {...selectProps}
        options={options}
        variant={'borderless'}
        dropdownStyle={{ width: '320px' }}
      />
      <FormItem name={namePrice} noStyle>
        <PriceCurreny
          onChange={(v) => onPriceInputChange?.(v.inputPrice)}
          disableInput={priceInputDisable}
        />
      </FormItem>
    </div>
  );
};
