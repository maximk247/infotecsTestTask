import React, { useState } from 'react';
import UserTable from './components/user/userTable/UserTable';
import UserModal from './components/user/UserModal';
import { User } from './components/user/interfaces/user.interface';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="App">
      <UserTable onRowClick={handleRowClick} />
      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
