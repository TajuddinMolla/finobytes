import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "member" | "merchant" | "admin";
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastActive: string;
  totalPoints?: number;
  totalSales?: number;
  location?: string;
}

export type userStatus = "all" | "active" | "inactive" | "suspended";
export type userRole = "all" | "member" | "merchant" | "admin";

interface UserState {
  users: User[];
  searchTerm: string;
  roleFilter: userRole;
  statusFilter: userStatus;
}

const initialState: UserState = {
  users: [],
  searchTerm: "",
  roleFilter: "all",
  statusFilter: "all",
};

const userSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<userRole>) => {
      state.roleFilter = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<userStatus>) => {
      state.statusFilter = action.payload;
    },
    updateStatus: (
      state,
      action: PayloadAction<{ userId: string; newStatus: User["status"] }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) user.status = action.payload.newStatus;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const {
  setUsers,
  setSearchTerm,
  setRoleFilter,
  setStatusFilter,
  updateStatus,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
