import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  className = "",
}: SelectProps) {
  return (
    <div
      className={`border border-gray-300 rounded-md pr-3 text-sm flex justify-between items-center gap-2 ${className}`}
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border-gray-300 focus:outline-0 appearance-none bg-transparent flex-1"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 text-gray-500 pointer-events-none" />
    </div>
  );
}
