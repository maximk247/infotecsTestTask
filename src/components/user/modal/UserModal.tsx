import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reducers';
import { setSelectedUser } from '../../../reducers/userSlice';
import styles from './UserModal.module.scss';

import ageIcon from '../../../assets/age-range.png';
import genderIcon from '../../../assets/gender-fluid.png';
import phoneIcon from '../../../assets/telephone-call.png';
import addressIcon from '../../../assets/address.png';
import heightIcon from '../../../assets/height.png';
import weightIcon from '../../../assets/human.png';
import emailIcon from '../../../assets/email.png';

const UserModal: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );

  if (!selectedUser) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => dispatch(setSelectedUser(null))}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span
          className={styles.close}
          onClick={() => dispatch(setSelectedUser(null))}
        >
          &times;
        </span>
        <h2>{`${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
        <div className={styles.modalElement}>
          <img src={ageIcon} alt="Age" className={styles.icon} /> Возраст:{' '}
          {selectedUser.age}
        </div>
        <div className={styles.modalElement}>
          <img src={genderIcon} alt="Gender" className={styles.icon} /> Пол:{' '}
          {selectedUser.gender}
        </div>
        <div className={styles.modalElement}>
          <img src={phoneIcon} alt="Phone" className={styles.icon} /> Телефон:{' '}
          {selectedUser.phone}
        </div>
        <div className={styles.modalElement}>
          <img src={addressIcon} alt="Address" className={styles.icon} /> Адрес:{' '}
          {`${selectedUser.address.city}, ${selectedUser.address.address}`}
        </div>
        <div className={styles.modalElement}>
          <img src={heightIcon} alt="Height" className={styles.icon} /> Рост:{' '}
          {selectedUser.height}
        </div>
        <div className={styles.modalElement}>
          <img src={weightIcon} alt="Weight" className={styles.icon} /> Вес:{' '}
          {selectedUser.weight}
        </div>
        <div className={styles.modalElement}>
          <img src={emailIcon} alt="Email" className={styles.icon} /> Email:{' '}
          {selectedUser.email}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
