import { useSelector, useDispatch } from "react-redux";

import { Bell, Clock, DollarSign, User, X } from "lucide-react";
import type { AppDispatch, RootState } from "../store/store";
import {
  dismissNotification,
  markAllAsRead,
  markAsRead,
  type Notification,
} from "../store/notificationsSlice";

export default function Notifications() {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector(
    (state: RootState) => state.notifications.list
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "approval_request":
        return <DollarSign className="w-5 h-5 text-blue-600" />;
      case "high_value":
        return <DollarSign className="w-5 h-5 text-yellow-600" />;
      case "new_customer":
        return <User className="w-5 h-5 text-emerald-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      default:
        return "border-l-blue-500";
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="w-6 h-6 text-blue-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({unreadCount} unread)
              </span>
            )}
          </h2>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={() => dispatch(markAllAsRead())}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors text-left"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="divide-y divide-gray-200">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(
                notification.priority
              )} ${!notification.isRead ? "bg-blue-50" : "bg-white"}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          !notification.isRead
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>

                      {notification.amount && (
                        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ${notification.amount.toFixed(2)}
                        </div>
                      )}

                      <div className="mt-2 flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{notification.timestamp}</span>
                        </div>

                        {!notification.isRead && (
                          <button
                            onClick={() =>
                              dispatch(markAsRead(notification.id))
                            }
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        dispatch(dismissNotification(notification.id))
                      }
                      className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
