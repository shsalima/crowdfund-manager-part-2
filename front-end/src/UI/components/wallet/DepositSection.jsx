import { Sparkles, BadgeAlert, CircleCheck } from "lucide-react";

import "../../../assets/style.css";

export default function DepositSection() {
  return (
    <div className="deposit-section">
      <h3 className="deposit-section__title">
        <Sparkles size={20} />
        Instant Recharge Actions
      </h3>

      <div className="deposit-section__actions">
        <button className="deposit-btn">+$5,000</button>
        <button className="deposit-btn">+$10,000</button>
        <button className="deposit-btn">+$25,000</button>
        <button className="deposit-btn">+$50,000</button>
      </div>

      <form className="deposit-form">
        <input
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
