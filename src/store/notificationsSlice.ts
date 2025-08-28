import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  type: "approval_request" | "high_value" | "new_customer";
  title: string;
  message: string;
  timestamp: string;
  amount?: number;
  customerName?: string;
  isRead: boolean;
  priority: "low" | "medium" | "high";
}

interface NotificationsState {
  list: Notification[];
}

const initialState: NotificationsState = {
  list: [
    {
      id: "NOT-001",
      type: "approval_request",
      title: "Purchase Approval Required",
      message:
        "Sarah Johnson has requested approval for a Premium Subscription purchase.",
      timestamp: "2 minutes ago",
      amount: 299.99,
      customerName: "Sarah Johnson",
      isRead: false,
      priority: "high",
    },
    {
      id: "NOT-002",
      type: "high_value",
      title: "High Value Transaction Alert",
      message: "Michael Chen has made a purchase exceeding $500 threshold.",
      timestamp: "15 minutes ago",
      amount: 589.5,
      customerName: "Michael Chen",
      isRead: false,
      priority: "medium",
    },
    {
      id: "NOT-003",
      type: "approval_request",
      title: "Purchase Approval Required",
      message: "Emma Rodriguez needs approval for a Consultation Package.",
      timestamp: "1 hour ago",
      amount: 159.0,
      customerName: "Emma Rodriguez",
      isRead: true,
      priority: "high",
    },
    {
      id: "NOT-004",
      type: "new_customer",
      title: "New Customer Registration",
      message: "A new customer has joined your platform.",
      timestamp: "2 hours ago",
      customerName: "Alex Thompson",
      isRead: true,
      priority: "low",
    },
    {
      id: "NOT-005",
      type: "approval_request",
      title: "Purchase Approval Required",
      message: "James Wilson requires approval for Monthly Plan upgrade.",
      timestamp: "3 hours ago",
      amount: 45.99,
      customerName: "James Wilson",
      isRead: true,
      priority: "medium",
    },
  ],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.list.find((n) => n.id === action.payload);
      if (notif) notif.isRead = true;
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((n) => n.id !== action.payload);
    },
    markAllAsRead: (state) => {
      state.list.forEach((n) => (n.isRead = true));
    },
  },
});

export const { markAsRead, dismissNotification, markAllAsRead } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
