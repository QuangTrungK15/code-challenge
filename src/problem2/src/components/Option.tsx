import { FC } from 'react';
import TokenIcon from '@/components/TokenIcon';

const Option: FC<OptionProps> = ({ option, selectOption, otpId, selected }) => {
  const className = `cursor-pointer p-2 text-[16px] flex items-center gap-2 ${selected ? 'text-main' : 'text-text'} hover:bg-main-muted active:text-main`;

  const handleSelected = (index: number) => {
    selectOption(index);
  };

  return (
    <li
      className={className}
      onClick={() => {
        handleSelected(otpId);
      }}
    >
      <TokenIcon currency={option.currency} className="w-5 h-5" />
      {option.currency}
    </li>
  );
};

export default Option;
