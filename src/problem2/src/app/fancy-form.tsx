import { SwapOutlined } from '@ant-design/icons';
import { Image, Select } from 'antd';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { IToken, tokenService } from './services/token.service';
import { environment } from './env/environment';

export const FancyForm: FC = () => {
  const [tokens, setListToken] = useState<IToken[]>();

  const fetchData = useCallback(async () => {
    const dataTokens = await tokenService.getListToken();
    setListToken(dataTokens);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, location.pathname]);

  const options = useMemo(() => {
    return (
      tokens?.map((item) => {
        return {
          label: (
            <div>
              <Image
                width={30}
                src={`${environment.iconTokenPrefixUrl}/${item.currency}.svg`}
                preview={false}
              />
              <span>{item.currency}</span>
            </div>
          ),
          value: item.currency,
        };
      }) || []
    );
  }, [tokens]); 

  return (
    <div>
      <Select style={{ width: 200 }} options={options} />
      <SwapOutlined />
      <Select style={{ width: 200 }} options={options} />
    </div>
  );
};
