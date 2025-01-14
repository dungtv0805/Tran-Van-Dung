import { FC } from 'react';
import { environment } from '../env/environment';

export const App: FC = () => {
  return <div>{environment.iconTokenPrefixUrl}</div>;
};

export default App;
