import { Sparkles, BadgeAlert, CircleCheck } from "lucide-react";
import { deposit } from "../../../store/slices/walletSlice";
import "../../../assets/style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function DepositSection() {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(deposit(Number(amount)));
    setAmount("");
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
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Enter deposit amount"
          className="deposit-input"
        />

        <button type="submit" className="submit-btn">
          Deposit
        </button>
      </form>

      <div className="alert alert--error">
        <BadgeAlert size={16} />
        <span>Please input a positive numeric contribution.</span>
      </div>

      <div className="alert alert--success">
        <CircleCheck size={16} />
        <span>Wallet funds replenished successfully!</span>
      </div>
    </div>
  );
}
