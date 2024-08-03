import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reducers';
import { setSelectedUser } from '../../../reducers/userSlice';

const UserModal: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );

  if (!selectedUser) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => dispatch(setSelectedUser(null))}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={() => dispatch(setSelectedUser(null))}>
          &times;
        </span>
        <h2>{`${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
        <p>Возраст: {selectedUser.age}</p>
        <p>Пол: {selectedUser.gender}</p>
        <p>Телефон: {selectedUser.phone}</p>
        <p>
          Адрес:{' '}
          {`${selectedUser.address.city}, ${selectedUser.address.address}`}
        </p>
        <p>Рост: {selectedUser.height}</p>
        <p>Вес: {selectedUser.weight}</p>
        <p>Email: {selectedUser.email}</p>
      </div>
    </div>
  );
};

export default UserModal;
