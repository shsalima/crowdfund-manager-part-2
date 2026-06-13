import { useDispatch } from "react-redux";
import BalanceCard from "../components/wallet/BalanceCard";
import DepositSection from "../components/wallet/DepositSection";
import Header from "../components/wallet/Header";
import TransactionHistory from "../components/wallet/TransactionHistory";
import { useEffect } from "react";
import { fetchUserBalance } from "../../store/slices/balanceSlice";

function WalletPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserBalance());
  }, [dispatch]);
  return (
    <div className="page-container">
      <Header />
      <div className="flex gap-5 max-md:flex-col">
        <div className="md:w-[70%]">
          <BalanceCard />
          <DepositSection />
        </div>
        <TransactionHistory />
      </div>
    </div>
  );
}

export default WalletPage;
