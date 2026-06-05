import BalanceCard from "../components/wallet/BalanceCard";
import DepositSection from "../components/wallet/DepositSection";
import Header from "../components/wallet/Header";
import TransactionHistory from "../components/wallet/TransactionHistory";

function WalletPage() {
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
