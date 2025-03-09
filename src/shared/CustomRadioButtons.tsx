"use client";

interface CustomRadioButtonGroupProps {
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
}

export default function CustomRadioButtonGroup({
  options,
  selectedOption,
  onChange,
}: CustomRadioButtonGroupProps) {
  return (
    <div className="flex flex-col mb-[1.5rem]">
      {options.map((option, index) => (
        <label
          key={index}
          className="custom-radio flex items-center mb-[1.8rem]"
        >
          <input
            type="radio"
            name="customRadio"
            value={option}
            checked={selectedOption === option}
            onChange={() => onChange(option)}
            className="hidden"
          />
          <span className="icon">
            {selectedOption === option ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                  fill="black"
                />
              </svg>
            )}
          </span>
          <span className="ml-[1.5rem] text-[1.5rem]">{option}</span>
        </label>
      ))}
    </div>
  );
}
