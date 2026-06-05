import { History, Info } from "lucide-react";
import TransactionItem from "./TransactionItem";
import "../../../assets/style.css";

export default function TransactionHistory() {
  const operations = [
    {
      id: 1,
      type: "deposit",
      amount: 5000,
      description: "Initial wallet deposit",
      date: "2026-06-05T10:30:00",
    },
    {
      id: 2,
      type: "withdraw",
      amount: 1200,
      description: "Investment contribution",
      date: "2026-06-05T11:15:00",
    },
    {
      id: 3,
      type: "deposit",
      amount: 25000,
      description: "Quick recharge",
      date: "2026-06-05T12:45:00",
    },
    {
      id: 4,
      type: "withdraw",
      amount: 3000,
      description: "Project funding",
      date: "2026-06-05T14:10:00",
    },
    {
      id: 5,
      type: "deposit",
      amount: 10000,
      description: "Manual deposit",
      date: "2026-06-05T16:20:00",
    },
  ];
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
