import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { fetchCustomers, setSearchTerm } from "../store/customersSlice";
import type { AppDispatch, RootState } from "../store/store";

export default function CustomerLookup() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: customers,
    isLoading,
    searchTerm,
  } = useSelector((state: RootState) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg max-w-6xl mx-auto">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">
              Customer Lookup
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Search for customers by name, email, or ID. View their contact
              details, order history, and total spending.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="w-full text-sm px-4 py-2 border border-[#d1d5dc] rounded-lg outline-none"
              placeholder="Search here..."
            />
          </div>
          <div>
            {isLoading && (
              <div className="mt-6 flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-500">
                  Searching customers...
                </span>
              </div>
            )}

            {!isLoading && customers.length > 0 && (
              <div className="mt-6 space-y-4">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {customer.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            customer.status === "active"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{customer.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Joined{" "}
                            {new Date(customer.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 md:text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${customer.totalSpent.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customer.orders} orders
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        ID: {customer.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && searchTerm && customers.length === 0 && (
              <div className="mt-6 text-center py-8">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No customers found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try searching with a different term or customer ID.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
