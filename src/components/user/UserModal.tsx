import React from 'react';
import { UserModalProps } from './interfaces/user-modal.interface';

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{`${user.firstName} ${user.lastName}`}</h2>
        <p>Возраст: {user.age}</p>
        <p>Пол: {user.gender}</p>
        <p>Телефон: {user.phone}</p>
        <p>Адрес: {`${user.address.city}, ${user.address.address}`}</p>
        <p>Рост: {user.height}</p>
        <p>Вес: {user.weight}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default UserModal;
