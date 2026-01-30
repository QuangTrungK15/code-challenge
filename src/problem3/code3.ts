interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

// should use extends instead of interface
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

// create a constant here and prevent duplicate code
const BLOCKCHAIN_PRIORITY: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 100,
  Zilliqa: 100,
  Neo: 100,
};

// this function doesn't depend on the props or state, so it can be moved outside the component
function getPriority(blockchain: string): number {
  return BLOCKCHAIN_PRIORITY[blockchain] ?? -99;
}

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();


  //Remove prices in useMemo because we don't need them here
  const formattedBalances = useMemo(() => {
    return balances
      .filter((balance): balance is WalletBalance => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0;
      })
      .sort((lhs, rhs) => {
        // this will keeps the sort stable and logic clear
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      })
      .map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [balances]);

  const rows = formattedBalances.map((balance) => {
    // avoids undefined * number -> NaN
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;

    // Index keys are unstable when the list is filtered or sorted, should use a unique key instead
    return (
      <WalletRow
        className={classes.row}
        key={`${balance.blockchain}-${balance.currency}`}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
