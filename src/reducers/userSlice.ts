import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../components/user/interfaces/user.interface';
import { UserState } from '../interfaces/user-state.interface';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    return data.users;
  }
);

export const fetchFilteredUsers = createAsyncThunk<
  User[],
  { key: string; value: string }
>('users/fetchFilteredUsers', async ({ key, value }) => {
  const response = await fetch(
    `https://dummyjson.com/users/filter?key=${key}&value=${encodeURIComponent(value)}`
  );
  const data = await response.json();
  return data.users;
});

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  searchTerm: '',
  searchKey: 'firstName',
  sortConfig: { key: '', direction: '' },
  currentPage: 1,
  itemsPerPage: 10,
  selectedUser: null,
};

const getValueByPath = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const sortUsers = (
  users: User[],
  sortConfig: { key: string; direction: string }
) => {
  return [...users].sort((a, b) => {
    const aValue = getValueByPath(a, sortConfig.key);
    const bValue = getValueByPath(b, sortConfig.key);
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    if (aValue < bValue) return -1 * direction;
    if (aValue > bValue) return 1 * direction;
    return 0;
  });
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSearchKey(state, action: PayloadAction<string>) {
      state.searchKey = action.payload;
    },
    setSortConfig(
      state,
      action: PayloadAction<{ key: string; direction: string }>
    ) {
      state.sortConfig = action.payload;
      state.users = sortUsers(state.users, action.payload);
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = sortUsers(action.payload, state.sortConfig);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchFilteredUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = sortUsers(action.payload, state.sortConfig);
      })
      .addCase(fetchFilteredUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch filtered users';
      });
  },
});

export const {
  setSearchTerm,
  setSearchKey,
  setSortConfig,
  setPage,
  setSelectedUser,
} = userSlice.actions;

export default userSlice.reducer;
