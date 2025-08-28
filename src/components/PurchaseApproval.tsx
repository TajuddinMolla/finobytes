import { useSelector, useDispatch } from "react-redux";
import { Check, X, Clock, Users } from "lucide-react";
import type { AppDispatch, RootState } from "../store/store";
import {
  approveOrRejectPurchase,
  type Purchase,
} from "../store/purchasesSlice";

export default function PurchaseApproval() {
  const dispatch = useDispatch<AppDispatch>();
  const purchases = useSelector(
    (state: RootState) => state.purchases.purchases
  );
  const loading = useSelector((state: RootState) => state.purchases.loadingId);

  const handleApproval = (id: string, action: "approved" | "rejected") => {
    dispatch(approveOrRejectPurchase({ id, action }));
  };

  const getStatusIcon = (status: Purchase["status"]) => {
    switch (status) {
      case "approved":
        return <Check className="w-4 h-4 text-emerald-600" />;
      case "rejected":
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: Purchase["status"]) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">
              Purchase Approvals
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Review and approve pending purchases from customers. Click the
              "Approve" button to confirm.
            </p>
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Product
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        <div className="text-sm font-medium text-gray-900">
                          {purchase.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {purchase.customerEmail}
                        </div>
                      </td>

                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {purchase.product}
                      </td>

                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        ${purchase.amount}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {purchase.date}
                      </td>
                      <td className="relative py-4 pr-4 pl-3 text-left text-sm font-medium whitespace-nowrap sm:pr-0">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
                            purchase.status
                          )}`}
                        >
                          {getStatusIcon(purchase.status)}
                          <span className="capitalize">{purchase.status}</span>
                        </span>
                      </td>
                      <td className="relative py-4 pr-4 pl-3 text-left text-sm font-medium whitespace-nowrap sm:pr-0">
                        {purchase.status === "pending" ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleApproval(purchase.id, "approved")
                              }
                              disabled={loading === purchase.id}
                              className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleApproval(purchase.id, "rejected")
                              }
                              disabled={loading === purchase.id}
                              className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        ) : null}
                        {loading === purchase.id && (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-gray-500">
                              Processing...
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {purchases.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No users found
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
