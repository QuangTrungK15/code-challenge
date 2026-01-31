
interface DropDownProps {
  dataSet: any[];
  value: number;
  selectOption: (index: number) => void;
}

interface OptionProps {
  option: any;
  otpId: number;
  selectOption: (index: number) => void;
  selected?: boolean;
}

interface InputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

interface TokenIconProps {
  currency: string;
  className?: string;
}