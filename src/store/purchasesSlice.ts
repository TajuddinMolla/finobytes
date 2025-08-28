import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface Purchase {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  product: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

interface PurchasesState {
  purchases: Purchase[];
  loadingId: string | null;
}

const initialState: PurchasesState = {
  purchases: [
    {
      id: "PUR-001",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.j@email.com",
      amount: 299.99,
      product: "Premium Subscription",
      date: "2025-01-20",
      status: "pending",
    },
    {
      id: "PUR-002",
      customerName: "Michael Chen",
      customerEmail: "michael.chen@email.com",
      amount: 89.5,
      product: "Digital Course",
      date: "2025-01-20",
      status: "pending",
    },
    {
      id: "PUR-003",
      customerName: "Emma Rodriguez",
      customerEmail: "emma.r@email.com",
      amount: 159.0,
      product: "Consultation Package",
      date: "2025-01-19",
      status: "pending",
    },
    {
      id: "PUR-004",
      customerName: "James Wilson",
      customerEmail: "j.wilson@email.com",
      amount: 45.99,
      product: "Monthly Plan",
      date: "2025-01-19",
      status: "approved",
    },
  ],
  loadingId: null,
};

export const approveOrRejectPurchase = createAsyncThunk(
  "purchases/approveOrReject",
  async ({ id, action }: { id: string; action: "approved" | "rejected" }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id, action };
  }
);

const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(approveOrRejectPurchase.pending, (state, action) => {
        state.loadingId = action.meta.arg.id;
      })
      .addCase(
        approveOrRejectPurchase.fulfilled,
        (
          state,
          action: PayloadAction<{ id: string; action: "approved" | "rejected" }>
        ) => {
          state.purchases = state.purchases.map((p) =>
            p.id === action.payload.id
              ? { ...p, status: action.payload.action }
              : p
          );
          state.loadingId = null;
        }
      );
  },
});

export default purchasesSlice.reducer;
