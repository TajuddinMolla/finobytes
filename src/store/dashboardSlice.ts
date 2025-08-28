import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Member = {
  id: number;
  name: string;
  email: string;
  points: number;
  contributionRate: number;
  status: "active" | "inactive"; // optional if you want
};

export type Merchant = {
  id: number;
  storeName: string;
  email: string;
  status: "active" | "inactive";
};

export type Purchase = {
  id: number;
  customerName: string;
  amount: number;
  status: "pending" | "approved";
};

export type Notification = {
  id: number;
  message: string;
};

interface DashboardState {
  members: Member[];
  merchants: Merchant[];
  purchases: Purchase[];
  notifications: Notification[];
}

const initialState: DashboardState = {
  members: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      points: 120,
      contributionRate: 5,
      status: "active",
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      points: 200,
      contributionRate: 10,
      status: "active",
    },
  ],

  merchants: [
    {
      id: 1,
      storeName: "SuperMart",
      email: "super@mart.com",
      status: "active",
    },
    {
      id: 2,
      storeName: "QuickShop",
      email: "quick@shop.com",
      status: "inactive",
    },
  ],

  purchases: [
    { id: 1, customerName: "John Doe", amount: 50, status: "pending" },
    { id: 2, customerName: "Alice Smith", amount: 120, status: "pending" },
  ],

  notifications: [
    { id: 1, message: "Approval Request: Purchase #1" },
    { id: 2, message: "Approval Request: Purchase #2" },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    approvePurchase: (state, action: PayloadAction<number>) => {
      const purchase = state.purchases.find((p) => p.id === action.payload);
      if (purchase) purchase.status = "approved";
      state.notifications = state.notifications.filter(
        (n) => !n.message.includes(`#${action.payload}`)
      );
    },
    setContributionRate: (
      state,
      action: PayloadAction<{ memberId: number; rate: number }>
    ) => {
      const member = state.members.find(
        (m) => m.id === action.payload.memberId
      );
      if (member) member.contributionRate = action.payload.rate;
    },
    deleteMember: (state, action: PayloadAction<number>) => {
      state.members = state.members.filter((m) => m.id !== action.payload);
    },
    deleteMerchant: (state, action: PayloadAction<number>) => {
      state.merchants = state.merchants.filter((m) => m.id !== action.payload);
    },
    toggleMemberStatus: (state, action: PayloadAction<number>) => {
      const member = state.members.find((m) => m.id === action.payload);
      if (member)
        member.status = member.status === "active" ? "inactive" : "active";
    },
    toggleMerchantStatus: (state, action: PayloadAction<number>) => {
      const merchant = state.merchants.find((m) => m.id === action.payload);
      if (merchant)
        merchant.status = merchant.status === "active" ? "inactive" : "active";
    },
  },
});

export const {
  approvePurchase,
  setContributionRate,
  deleteMember,
  deleteMerchant,
  toggleMemberStatus,
  toggleMerchantStatus,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
