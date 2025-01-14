import { FC } from 'react';
import './app.module.scss';
import { FancyForm } from './fancy-form';

export const App: FC = () => {
  return (
    <div>
      <div className="blur-circle"></div>
      <div className="container">
        <FancyForm></FancyForm>
      </div>
    </div>
  );
};

export default App;
