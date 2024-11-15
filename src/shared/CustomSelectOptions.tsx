import { dropDownIcon } from "@/image";
import Image from "next/image";
import React, { useState } from "react";
// Define the types for the options and props
interface Option {
  value: string;
  label: string;
  description?: string;
}

interface CustomSelectProps {
  options: Option[];
  name: string;
  onChange: (value: string) => void;
  value: string | null | undefined | number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
  isSearchable?: boolean;
  noOptionsMessage?: string;
}

export default function CustomSelect({
  options,
  name,
  onChange,
  value,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  label,
  required = false,
  isSearchable = false,
  noOptionsMessage = "No options available",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const filteredOptions = isSearchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={name} className="block  text-[1.35rem] pb-[.5rem]">
          {label} {required && "*"}
        </label>
      )}
      <button
        type="button"
        name={name}
        disabled={disabled}
        className={`w-full px-[2rem] py-[1.5rem] text-left bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-[1.5rem]">
          {" "}
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
        </p>
        <Image src={dropDownIcon} alt="" width={24} height={24} />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-[2rem]">
          {isSearchable && (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-[1.5rem] border-b border-gray-300"
            />
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="p-[1.5rem]  cursor-pointer hover:bg-astraGreyBg mb-[1rem] bg-astraOffWhite rounded-[1rem]"
                onClick={() => handleOptionClick(option.value)}
              >
                <p className="text-[1.4rem]">{option.label}</p>
                <p className="text-[1.2rem] text-astraLightBlack">
                  {option.description}
                </p>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">{noOptionsMessage}</div>
          )}
        </div>
      )}
    </div>
  );
}
