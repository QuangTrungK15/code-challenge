import { useState, useEffect } from "react";
import DropDown from "@/components/DropDown";
import Input from "@/components/Input";
import { computeOutputAmount } from "@/utils/common";
import { useFetchPrices } from "@/hooks/useFetchPrices";
import { SWAP_LOADING_DURATION_MS, MAXIMUM_VALUE } from "@/constant";

function App() {
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);
  const [selectedInputIndex, setSelectedInputIndex] = useState(0);
  const [selectedOutputIndex, setSelectedOutputIndex] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { dataSet } = useFetchPrices();

  const priceFrom = dataSet[selectedInputIndex]?.price ?? 0;
  const priceTo = dataSet[selectedOutputIndex]?.price ?? 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // Simulate swap API / confirmation delay
      await new Promise((resolve) =>
        setTimeout(resolve, SWAP_LOADING_DURATION_MS),
      );
      // Swap complete – in a real app you might clear amounts or show success
    } finally {
      setIsSubmitting(false);
      setInputAmount(0);
      setOutputAmount(0);
    }
  };

  const handleInputSelected = (index: number) => {
    setSelectedInputIndex(index);
  };

  const handleOutputSelected = (index: number) => {
    setSelectedOutputIndex(index);
  };

  useEffect(() => {
    if (!inputAmount || inputAmount > MAXIMUM_VALUE) return;
    setOutputAmount(computeOutputAmount(inputAmount, priceFrom, priceTo));
  }, [
    inputAmount,
    selectedInputIndex,
    selectedOutputIndex,
    priceFrom,
    priceTo,
  ]);

  const handleSwap = () => {
    setSelectedInputIndex(selectedOutputIndex);
    setSelectedOutputIndex(selectedInputIndex);
    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
  };

  return (
    <div className="w-screen h-screen bg-surface-tint flex justify-center overflow-auto">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col p-10 max-w-md w-full min-w-148 h-fit bg-white rounded-4xl mt-10 transition-opacity ${isSubmitting ? "pointer-events-none opacity-70 select-none" : ""}`}
      >
        <h5 className="text-3xl font-bold mb-4 text-text m-auto">Swap</h5>
        <div className="flex flex-row gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-text">From</label>
            <DropDown
              dataSet={dataSet}
              selectOption={handleInputSelected}
              value={selectedInputIndex}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-medium text-text">Amount</label>
            <Input
              id="input-amount"
              value={inputAmount}
              onChange={setInputAmount}
            />
          </div>
        </div>
        <div className="flex my-4">
          <span
            onClick={handleSwap}
            className="w-12 h-12 rounded-full bg-surface-tint flex items-center justify-center border border-border cursor-pointer hover:opacity-80"
            style={{
              backgroundImage: "var(--bg-swap-icon)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="flex flex-row gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-text">To</label>
            <DropDown
              dataSet={dataSet}
              selectOption={handleOutputSelected}
              value={selectedOutputIndex}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-medium text-text">Amount</label>
            <Input
              id="output-amount"
              value={outputAmount}
              disabled
              onChange={setOutputAmount}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            !inputAmount ||
            selectedInputIndex === selectedOutputIndex
          }
          className="rounded-2xl h-18 px-6 py-3 bg-main text-white border-none text-base font-semibold cursor-pointer mt-8 hover:bg-main-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                aria-hidden
              />
              Swapping…
            </>
          ) : (
            "CONFIRM SWAP"
          )}
        </button>
      </form>
    </div>
  );
}

export default App;
