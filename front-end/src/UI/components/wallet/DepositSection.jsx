import { Sparkles, BadgeAlert, CircleCheck } from "lucide-react";
import { deposit } from "../../../store/slices/walletSlice";
import { fetchUserBalance } from "../../../store/slices/balanceSlice";
import "../../../assets/style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../../store/slices/transactionSlice";

export default function DepositSection() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const handelSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!amount || Number(amount) <= 0) {
      setError("Please input a positive numeric contribution.");
      return;
    }
    try {
      console.log("Submitting deposit amount (client):", Number(amount));
      await dispatch(deposit(Number(amount))).unwrap();
      dispatch(fetchUserBalance());
      dispatch(addTransaction({ amount: Number(amount) }));
      setAmount("");
      setSuccess("Wallet funds replenished successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error || "Deposit failed. Please try again.");
      setTimeout(() => setError(""), 5000);
      console.error("Deposit failed:", error);
    }
  };

  return (
    <div className="deposit-section">
      <h3 className="deposit-section__title">
        <Sparkles size={20} />
        Instant Recharge Actions
      </h3>

      <div className="deposit-section__actions">
        <button
          onClick={() => setAmount(5000)}
          className="deposit-btn"
          value={5000}
        >
          + 5,000 DH
        </button>
        <button
          onClick={() => setAmount(10000)}
          className="deposit-btn"
          value={10000}
        >
          + 10,000 DH
        </button>
        <button
          onClick={() => setAmount(25000)}
          className="deposit-btn"
          value={25000}
        >
          + 25,000 DH
        </button>
        <button
          onClick={() => setAmount(50000)}
          className="deposit-btn"
          value={50000}
        >
          + 50,000 DH
        </button>
      </div>

      <form className="deposit-form" onSubmit={handelSubmit}>
        <input
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
          type="number"
          placeholder="Enter deposit amount"
          className="deposit-input"
        />

        <button type="submit" className="submit-btn">
          Deposit
        </button>
      </form>
      {error && (
        <div className="alert alert--error">
          <BadgeAlert size={16} />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="alert alert--success">
          <CircleCheck size={16} />
          <span>{success}</span>
        </div>
      )}
    </div>
  );
}
