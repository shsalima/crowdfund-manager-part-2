import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import "../../../assets/style.css";

export default function TransactionItem({ operation }) {
  const { type, amount, description, date } = operation || {};
  const isDeposit = type === "deposit";

  const formattedAmount = (amount ?? 0).toLocaleString();
  const formattedDate = date ? new Date(date).toLocaleString() : "";

  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <p className="transaction-description">
          {description || (isDeposit ? "Deposit" : "Withdraw")}
        </p>
        <p className="transaction-date">{formattedDate}</p>
      </div>

      <span
        className={`transaction-amount ${isDeposit ? "deposit" : "withdraw"}`}
      >
        {isDeposit ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
        {formattedAmount} DH
      </span>
    </div>
  );
}
