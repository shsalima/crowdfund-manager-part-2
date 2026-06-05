import { ArrowDownLeft } from "lucide-react";
import "../../../assets/style.css";

export default function TransactionItem() {
  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <p className="transaction-description">
          Initial wallet deposit
        </p>

        <p className="transaction-date">
          Jun 5, 2026, 10:30 AM
        </p>
      </div>

      <span className="transaction-amount deposit">
        <ArrowDownLeft size={14} />
        $5,000
      </span>
    </div>
  );
}