import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalSpent: number;
  orders: number;
  status: "active" | "inactive";
}

const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    joinDate: "2024-03-15",
    totalSpent: 1250.99,
    orders: 8,
    status: "active",
  },
  {
    id: "CUST-002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    joinDate: "2024-01-22",
    totalSpent: 899.5,
    orders: 5,
    status: "active",
  },
  {
    id: "CUST-003",
    name: "Emma Rodriguez",
    email: "emma.r@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Chicago, IL 60601",
    joinDate: "2023-11-08",
    totalSpent: 2100.0,
    orders: 12,
    status: "active",
  },
  {
    id: "CUST-004",
    name: "James Wilson",
    email: "j.wilson@email.com",
    phone: "+1 (555) 321-0987",
    address: "321 Elm St, Houston, TX 77001",
    joinDate: "2024-02-14",
    totalSpent: 567.25,
    orders: 3,
    status: "inactive",
  },
];

// Simulate async API call
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (searchTerm: string) => {
    return new Promise<Customer[]>((resolve) => {
      setTimeout(() => {
        const filtered = mockCustomers.filter(
          (c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        resolve(filtered);
      }, 500);
    });
  }
);

interface CustomersState {
  data: Customer[];
  isLoading: boolean;
  searchTerm: string;
}

const initialState: CustomersState = {
  data: [],
  isLoading: false,
  searchTerm: "",
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCustomers.rejected, (state) => {
      state.isLoading = false;
      state.data = [];
    });
  },
});

export const { setSearchTerm } = customersSlice.actions;
export default customersSlice.reducer;
