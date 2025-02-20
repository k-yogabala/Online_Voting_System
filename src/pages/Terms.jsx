import React from "react";

const TermsConditions = () => {
  return (
    <div className="main terms-container">
      <div className="header">
        <h1>📜 Terms & Conditions</h1>
        <p>Welcome to Vote Karo! Please read our terms carefully before using our platform.</p>
      </div>

      <div className="terms-content">
        <h2>1. Eligibility</h2>
        <p>✅ You must be a registered voter to participate in the election process.</p>
        <p>✅ You agree to provide accurate and valid information during registration.</p>

        <h2>2. Voting Rules</h2>
        <ul>
          <li>🗳️ Each voter is allowed to cast only one vote per election.</li>
          <li>🔐 Voter authentication will be required before casting a vote.</li>
          <li>📵 Any attempt to manipulate or tamper with the voting system is strictly prohibited.</li>
        </ul>

        <h2>3. Data Privacy</h2>
        <p>🔒 We prioritize the security and privacy of your personal information.</p>
        <p>⚠️ Your data will not be shared with third parties without consent.</p>

        <h2>4. Platform Usage</h2>
        <ul>
          <li>📌 Users must not engage in fraudulent activities.</li>
          <li>🚫 Any misuse of the platform will result in immediate account suspension.</li>
        </ul>

        <h2>5. Contact Us</h2>
        <p>If you have any questions regarding these terms, reach out to us:</p>
        <p>Email: <a href="mailto:support@votekaro.com">support@votekaro.com</a></p>
        <p>Phone: +91 98765 43210</p>
      </div>
    </div>
  );
};

export default TermsConditions;
