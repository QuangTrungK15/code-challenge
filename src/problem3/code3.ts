interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; //add missing blockchain property
}

//extend from WalletBalance because it has some properties which FormattedWalletBalance needs
interface FormattedWalletBalance extends WalletBalance{
  formatted: string;
}

interface Props extends BoxProps {
  children: React.ReactNode;
}


//We should fix set of blockchain priority values that are known for reusing and prevent writing the same in other places
const BlockchainPriority: Record<string,number> =  {
    'Osmosis' : 100,
    'Ethereum' : 50,
    'Arbitrum' : 100,
    'Zilliqa' : 100,
    'Neo' : 100,
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();
  
  
  const getPriority = (blockchain: string): number => {
    return BlockchainPriority[blockchain] ?? -99;
}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (balancePriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);



  
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const formattedAmount =  balance.amount.toFixed();
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}