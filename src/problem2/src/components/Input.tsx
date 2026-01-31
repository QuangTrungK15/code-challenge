import { FC, useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import {  MAXIMUM_VALUE } from "@/constant";

const Input: FC<InputProps> = ({
  id,
  value,
  onChange,
  className = "",
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (inputValue !== value) setInputValue(value);
  }, [value]);

  const debouncedOnChange = useCallback(
    debounce((newValue: number) => {
      onChange(newValue);
    }, 200),
    [onChange],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(parseFloat(e.target.value).toFixed(2)) || null;
    setInputValue(newValue as number);
    debouncedOnChange(newValue as number);
  };

  return (
    <input
      type="number"
      id={id}
      value={inputValue}
      disabled={disabled}
      min={0}
      max={MAXIMUM_VALUE}
      placeholder="Enter amount"
      onChange={handleChange}
      className={`bg-surface-tint border-border w-full h-18 px-6 py-5 border text-base text-text placeholder:text-placeholder focus:transparent focus:outline-0 rounded-2xl ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    />
  );
};

export default Input;
