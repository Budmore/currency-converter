import { InputHTMLAttributes } from "react";
import "./CurrencyInput.css";

interface CurrencyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export function CurrencyInput({
  name,
  value,
  onChange,
  ...rest
}: CurrencyInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="number"
      name={name}
      className="currency-input"
      value={value}
      onChange={handleChange}
      placeholder="0.00"
      {...rest}
    />
  );
}
