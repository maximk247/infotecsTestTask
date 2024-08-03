import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../reducers/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

interface AllTheProvidersProps {
  children: ReactNode;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AllTheProviders;
