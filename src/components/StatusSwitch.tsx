import { Switch } from "@headlessui/react";
import { useDispatch } from "react-redux";
import {
  toggleMemberStatus,
  toggleMerchantStatus,
} from "../store/dashboardSlice";
import { useState } from "react";

export const StatusSwitch = ({
  role,
  id,
  status,
}: {
  role: string;
  id: number;
  status: string;
}) => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(status === "active");

  const handleChange = (value: boolean) => {
    setEnabled(value);
    if (role === "member") {
      dispatch(toggleMemberStatus(id));
    } else if (role === "merchant") {
      dispatch(toggleMerchantStatus(id));
    }
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={classNames(
        enabled ? "bg-[#025add]" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#025add] focus:ring-offset-2"
      )}
    >
      <span className="sr-only">Toggle status</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </Switch>
  );
};
