import { FC, useEffect, useState, useRef } from "react";
import Option from "@/components/Option";
import TokenIcon from "@/components/TokenIcon";

const DropDown: FC<DropDownProps> = ({ dataSet, selectOption, value }) => {
  const [open, setOpen] = useState(false);
  const optionsSelected = dataSet[value] ?? {};
  const dropdownRef = useRef<HTMLDivElement>(null);

  const data = dataSet ? dataSet : [];
  const valueSelected = value;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelected = (index: number) => {
    selectOption(index);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative w-40 h-18 min-h-8 flex items-center gap-2 pl-3 rounded-2xl border border-border bg-surface-tint text-text"
      >
        <TokenIcon currency={optionsSelected.currency} className="w-6 h-6" />
        <span className={`font-normal text-[16px] leading-[100%]  text-text`}>
          {optionsSelected.currency}
        </span>
        <span
          className={`absolute top-1/2 right-4 -translate-y-1/2 bg-(image:--bg-dropdown-icon) w-3.5 h-8 bg-no-repeat bg-center ${open ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
        />
      </button>

      {open && (
        <div className="absolute z-50 left-0 top-full overflow-hidden border border-placeholder rounded-2xl shadow-lg bg-white mt-1 w-40">
          <ul
            id="dropdown"
            className="max-h-52 mt-0.5 w-full bg-surface-tint overflow-y-auto duration-200"
          >
            {data &&
              data.length > 0 &&
              data.map((option, index) => {
                if (index === 0 && option.price === "") return null;
                return (
                  <Option
                    option={option}
                    otpId={index}
                    selectOption={handleSelected}
                    key={index}
                    selected={valueSelected === index}
                  />
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
