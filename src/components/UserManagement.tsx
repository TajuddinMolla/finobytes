import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { Users, Shield, ShieldCheck } from "lucide-react";
import type { AppDispatch, RootState } from "../store/store";
import {
  deleteUser,
  setRoleFilter,
  setSearchTerm,
  setStatusFilter,
  setUsers,
  updateStatus,
  type User,
  type userRole,
  type userStatus,
} from "../store/userSlice";
import CustomSelect from "./CustomSelect";

const mockUsers: User[] = [
  {
    id: "USR-001",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    role: "member",
    status: "active",
    joinDate: "2024-03-15",
    lastActive: "2025-01-20",
    totalPoints: 2847,
    location: "New York, NY",
  },
  {
    id: "USR-002",
    name: "TechStore Pro",
    email: "admin@techstore.com",
    role: "merchant",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2025-01-20",
    totalSales: 45600,
    location: "San Francisco, CA",
  },
  {
    id: "USR-003",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    role: "member",
    status: "active",
    joinDate: "2024-02-22",
    lastActive: "2025-01-19",
    totalPoints: 1523,
    location: "Los Angeles, CA",
  },
  {
    id: "USR-004",
    name: "Fashion Hub",
    email: "contact@fashionhub.com",
    role: "merchant",
    status: "active",
    joinDate: "2023-11-05",
    lastActive: "2025-01-18",
    totalSales: 78900,
    location: "Miami, FL",
  },
  {
    id: "USR-005",
    name: "Emma Rodriguez",
    email: "emma.r@email.com",
    role: "member",
    status: "suspended",
    joinDate: "2024-04-12",
    lastActive: "2025-01-15",
    totalPoints: 892,
    location: "Chicago, IL",
  },
  {
    id: "USR-006",
    name: "James Wilson",
    email: "j.wilson@email.com",
    role: "admin",
    status: "active",
    joinDate: "2023-08-20",
    lastActive: "2025-01-20",
    location: "Seattle, WA",
  },
  {
    id: "USR-007",
    name: "Coffee Corner",
    email: "hello@coffeecorner.com",
    role: "merchant",
    status: "inactive",
    joinDate: "2024-05-30",
    lastActive: "2024-12-15",
    totalSales: 12400,
    location: "Portland, OR",
  },
  {
    id: "USR-008",
    name: "Alex Thompson",
    email: "alex.t@email.com",
    role: "member",
    status: "active",
    joinDate: "2024-06-18",
    lastActive: "2025-01-19",
    totalPoints: 3456,
    location: "Austin, TX",
  },
];

const userStatusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Suspended", value: "suspended" },
];

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Suspended", value: "suspended" },
];

const roles = [
  { label: "All Roles", value: "all" },
  { label: "Members", value: "member" },
  { label: "Merchants", value: "merchant" },
  { label: "Admins", value: "admin" },
];

export default function UserManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, searchTerm, roleFilter, statusFilter } = useSelector(
    (state: RootState) => state.userManagement
  );

  useEffect(() => {
    dispatch(setUsers(mockUsers));
  }, [dispatch]);

  const getRoleIcon = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return <ShieldCheck className="w-[14px] h-[14px] text-red-600" />;
      case "merchant":
        return <Shield className="w-[14px] h-[14px] text-blue-600" />;
      default:
        return <Users className="w-[14px] h-[14px] text-gray-600" />;
    }
  };

  const getRoleColor = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "merchant":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    members: users.filter((u) => u.role === "member").length,
    merchants: users.filter((u) => u.role === "merchant").length,
    admins: users.filter((u) => u.role === "admin").length,
    active: users.filter((u) => u.status === "active").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.members}
              </p>
            </div>
            <Users className="w-8 h-8 text-gray-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Merchants</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.merchants}
              </p>
            </div>
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Admins</p>
              <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">
              User Management
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              View, filter, and manage all users in the system. Update their
              status, assign roles, or remove accounts when necessary.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className=" flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="sm:max-w-[400px] w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="w-full text-sm px-4 py-2 border border-[#d1d5dc] rounded-lg outline-none"
                placeholder="Search here..."
              />
            </div>
            <div className=" flex md:items-center flex-col sm:flex-row gap-5">
              <CustomSelect
                value={roleFilter}
                onChange={(val) => dispatch(setRoleFilter(val as userRole))}
                options={roles}
              />
              <CustomSelect
                value={statusFilter}
                onChange={(val) => dispatch(setStatusFilter(val as userStatus))}
                options={statusOptions}
              />
            </div>
          </div>

          <div className="block min-w-full py-5 ">
            <div className="hidden md:block align-middle overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
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
                      Performance
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Last Active
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
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          {user.location && (
                            <div className="text-xs text-gray-400">
                              {user.location}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </span>
                      </td>

                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            user.status
                          )}`}
                        >
                          <span className="capitalize">{user.status}</span>
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <div className="text-sm text-gray-900">
                          {user.totalPoints !== undefined && (
                            <div>
                              <span className="font-medium">
                                {user.totalPoints.toLocaleString()}
                              </span>
                              <span className="text-gray-500 ml-1">points</span>
                            </div>
                          )}
                          {user.totalSales !== undefined && (
                            <div>
                              <span className="font-medium">
                                ${user.totalSales.toLocaleString()}
                              </span>
                              <span className="text-gray-500 ml-1">sales</span>
                            </div>
                          )}
                          {user.role === "admin" && (
                            <span className="text-gray-500">System Admin</span>
                          )}
                        </div>
                      </td>
                      <td className="relative py-4 pr-4 pl-3 text-left text-sm font-medium whitespace-nowrap sm:pr-0">
                        <div className="text-sm text-gray-900">
                          {new Date(user.lastActive).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="relative py-4 pr-4 pl-3 text-left text-sm font-medium whitespace-nowrap sm:pr-0">
                        <div className="flex items-center space-x-2">
                          <CustomSelect
                            value={user.status}
                            onChange={(val) =>
                              dispatch(
                                updateStatus({
                                  userId: user.id,
                                  newStatus: val as any,
                                })
                              )
                            }
                            options={userStatusOptions}
                          />

                          <button
                            onClick={() => dispatch(deleteUser(user.id))}
                            className="rounded-md bg-red-600 px-3.5 py-2 text-sm font-semibold text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="block md:hidden space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400">{user.location}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs">{user.role}</span>
                    <span className="text-xs">{user.status}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <CustomSelect
                      value={user.status}
                      onChange={(val) =>
                        dispatch(
                          updateStatus({
                            userId: user.id,
                            newStatus: val as any,
                          })
                        )
                      }
                      options={userStatusOptions}
                    />
                    <button
                      onClick={() => dispatch(deleteUser(user.id))}
                      className="rounded-md bg-red-600 px-3.5 py-2 text-sm font-semibold text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredUsers.length === 0 && (
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
    </div>
  );
}
