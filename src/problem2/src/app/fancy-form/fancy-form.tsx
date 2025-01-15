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
    form.setFieldValue('priceFromCurrency', {
      inputPrice: `1`,
      currentPrice: dataTokens[0].price,
    });
    form.setFieldValue('toCurrency', `${dataTokens[0].currency}_0`);
    form.setFieldValue('priceToCurrency', {
      inputPrice: `1`,
      currentPrice: `${dataTokens[0].price}`,
    });
  }, [form]);

  const onChangeFrom = useCallback(
    (v: string) => {
      const priceFromCurrency = {
        inputPrice: '1',
        currentPrice: tokenMap?.[v].price,
      };
      const priceToCurrency = form.getFieldValue('priceToCurrency');
      form.setFieldValue('priceFromCurrency', priceFromCurrency);
      form.setFieldValue('priceToCurrency', {
        ...priceToCurrency,
        inputPrice: 1 / priceToCurrency.currentPrice,
      });
    },
    [form, tokenMap]
  );

  const onChangeTo = useCallback(
    (v: string) => {
      const priceToCurrency: any = {
        currentPrice: tokenMap?.[v].price,
      };
      const priceFromCurrency = form.getFieldValue('priceFromCurrency');
      priceToCurrency['inputPrice'] =
        (priceFromCurrency.currentPrice / priceToCurrency.currentPrice) *
        priceFromCurrency.inputPrice;
      form.setFieldValue('priceToCurrency', priceToCurrency);
    },
    [form, tokenMap]
  );

  const onPriceInputChange = useCallback(
    (v?: string) => {
      const priceFromCurrency = form.getFieldValue('priceFromCurrency');
      const priceToCurrency = form.getFieldValue('priceToCurrency');
      const priceInputToCurrency =
        (priceFromCurrency?.currentPrice / priceToCurrency?.currentPrice) *
        Number(v);
      form.setFieldValue('priceToCurrency', {
        ...priceToCurrency,
        inputPrice: priceInputToCurrency,
      });
    },
    [form]
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
            onPriceInputChange={onPriceInputChange}
            namePrice={'priceFromCurrency'}
            labelRender={(option) => (
              <span>{tokenMap?.[option.value].currency}</span>
            )}
          />
        </FormItem>
        <SwapOutlined style={{ marginRight: 5, marginLeft: 5 }} />
        <FormItem name={'toCurrency'} noStyle>
          <CurrencySelect
            onChange={onChangeTo}
            tokens={tokens}
            tokenMap={tokenMap}
            namePrice={'priceToCurrency'}
            priceInputDisable
            labelRender={(option) => (
              <span>{tokenMap?.[option.value].currency}</span>
            )}
          />
        </FormItem>
      </div>
    </Form>
  );
};
