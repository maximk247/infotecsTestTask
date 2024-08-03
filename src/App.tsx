import React from 'react';
import UserTableContainer from './containers/UserTableContainer';
import UserModal from './components/user/modal/UserModal';
import './index.css';
const App: React.FC = () => {
  return (
    <div className="App">
      <UserTableContainer />
      <UserModal />
    </div>
  );
};

export default App;
