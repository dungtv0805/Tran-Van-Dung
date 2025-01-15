import { SwapOutlined } from '@ant-design/icons';
import Form, { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { IToken, tokenService } from '../services/token.service';
import { CurrencySelect } from './currency-select';
import './fancy-form.scss';

export const FancyForm: FC = () => {
  const [tokens, setListToken] = useState<IToken[]>();
  const [form] = useForm();

  const tokenMap = useMemo(() => {
    return tokens?.reduce<Record<string, IToken>>(
      (a, v, idx) => ({ ...a, [`${v.currency}_${idx}`]: v }),
      {}
    );
  }, [tokens]);

  const fetchData = useCallback(async () => {
    const dataTokens = await tokenService.getListToken();
    setListToken(dataTokens);
    form.setFieldValue('fromCurrency', `${dataTokens[0].currency}_0`);
    form.setFieldValue('priceFromCurrency', `1`);
    form.setFieldValue('toCurrency', `${dataTokens[0].currency}_0`);
    form.setFieldValue('priceToCurrency', `1`);
  }, [form]);

  const onChangeFrom = useCallback(
    (v: string) => {
      form.setFieldValue('priceFromCurrency', tokenMap?.[v].price);
    },
    [form, tokenMap]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Form form={form}>
      <div className="fancy-form-wrapper">
        <FormItem name={'fromCurrency'} noStyle>
          <CurrencySelect
            tokens={tokens}
            tokenMap={tokenMap}
            onChange={onChangeFrom}
            namePrice={'priceFromCurrency'}
            labelRender={(option) => (
              <span>{tokenMap?.[option.value].currency}</span>
            )}
          />
        </FormItem>
        <SwapOutlined />
        <FormItem name={'toCurrency'} noStyle>
          <CurrencySelect
            tokens={tokens}
            tokenMap={tokenMap}
            namePrice={'priceToCurrency'}
            labelRender={(option) => (
              <span>{tokenMap?.[option.value].currency}</span>
            )}
          />
        </FormItem>
      </div>
    </Form>
  );
};
