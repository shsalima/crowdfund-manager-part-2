import { Wallet as WalletIcon, Zap } from "lucide-react";
import "../../../assets/style.css";

export default function BalanceCard() {
  return (
    <div className="balance-card">
      <div className="balance-card__blur"></div>

      <div className="balance-card__header">
        <div>
          <span className="balance-card__label">AVAILABLE LIQUID FUNDS</span>

          <span className="balance-card__amount">$100,000</span>
        </div>

        <div className="balance-card__icon-wrapper">
          <WalletIcon size={24} />
        </div>
      </div>

      <div className="balance-card__info">
        <Zap size={16} className="balance-card__zap" />

        <span>
          Simulated Sandbox Ledger. Operations occur instantly via Redux.
        </span>
      </div>
    </div>
  );
}
