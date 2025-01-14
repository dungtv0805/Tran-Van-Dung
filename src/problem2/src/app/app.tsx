import { FC } from 'react';
import './app.module.scss';

export const App: FC = () => {
  return (
    <div>
      <div className="blur-circle"></div>
      <div className="container">
        <h1>Content</h1>
      </div>
    </div>
  );
};

export default App;
