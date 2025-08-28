import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TransitionChild,
} from "@headlessui/react";
import {
  X,
  Bell,
  ChevronDown,
  Settings,
  MenuIcon,
  DollarSign,
  Users,
  Home,
} from "lucide-react";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Link, useLocation } from "react-router-dom";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation: NavigationItem[] = [
  { name: "User Management", href: "/dashboard/admin", icon: Home },
];

const merchantNavigation: NavigationItem[] = [
  { name: "Purchase Approvals", href: "/dashboard/merchant", icon: DollarSign },
  {
    name: "Customer Lookup",
    href: "/dashboard/merchant/customer",
    icon: Users,
  },
  {
    name: "Contribution Rate",
    href: "/dashboard/merchant/contribution-rate",
    icon: Settings,
  },
  {
    name: "Notifications",
    href: "/dashboard/merchant/notifications",
    icon: Bell,
  },
];

const memberNavigation: NavigationItem[] = [
  { name: "Points Summary", href: "/dashboard/member", icon: Home },
];

const userNavigation = [{ name: "Sign out", href: "#" }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const getNavItems = () => {
    if (user?.role === "admin") return navigation;
    if (user?.role === "merchant") return merchantNavigation;
    if (user?.role === "member") return memberNavigation;
    return [];
  };

  const navItems = getNavItems();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 flex-col bg-white">
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <X size={24} />
                </button>
              </div>
            </TransitionChild>

            {/* Sidebar content */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <img alt="Logo" src="/logo_fb.png" className="h-8 w-auto" />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={classNames(
                                isActive
                                  ? "bg-gray-50 text-[#025add]"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-[#025add]",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  isActive
                                    ? "text-[#025add]"
                                    : "text-gray-400 group-hover:text-[#025add]",
                                  "h-5 w-5 shrink-0"
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="hidden fixed z-50 inset-0 lg:flex lg:flex-col lg:w-72 lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="flex h-16 shrink-0 items-center px-6">
          <img alt="Logo" src="/logo_fb.png" className="h-8 w-auto" />
        </div>
        <nav className="flex-1 px-6 py-4">
          <ul role="list" className="space-y-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={classNames(
                      isActive
                        ? "bg-gray-50 text-[#025add]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#025add]",
                      "flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-x-4 border-b border-gray-200 bg-white px-4 lg:px-6">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon size={24} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-x-4">
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <ChevronDown size={16} />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    {({ active }) => (
                      <button
                        className={`block px-3 py-2 w-full cursor-pointer text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                        onClick={() => dispatch(logout())}
                      >
                        {item.name}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </header>

        <main className="flex-1  bg-gray-100 max-w-dvw lg:pl-72">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
