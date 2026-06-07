import { History, Info } from "lucide-react";
import TransactionItem from "./TransactionItem";
import "../../../assets/style.css";
import { useSelector } from "react-redux";

export default function TransactionHistory() {
const operations = useSelector((state) => state.transactions.items);

  return (
    <div className="transaction-history-container">
      <div className="history-header">
        <History className="header-icon" />
        <h3 className="header-title">HISTORY OF ALL OPERATIONS</h3>
      </div>

      <div className="history-list-card">
        {operations.map((operation) => (
          <TransactionItem key={operation.id} operation={operation} />
        ))}

        {operations.length === 0 && (
          <div className="empty-state">
            <Info className="empty-icon" />
            <p className="empty-text">No recorded ledger statements.</p>
          </div>
        )}
      </div>
    </div>
  );
}
