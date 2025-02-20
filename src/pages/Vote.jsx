import React, { useState } from "react";
import axios from "axios";

const candidates = [
  { id: 1, name: "Candidate A", party: "Party X" },
  { id: 2, name: "Candidate B", party: "Party Y" },
  { id: 3, name: "Candidate C", party: "Party Z" },
];

const Vote = () => {
  const [voted, setVoted] = useState(localStorage.getItem("hasVoted") === "true");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleVote = async (candidate) => {
    if (voted) {
      alert("You have already voted!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/vote", {
        email: user.email,
        candidate: candidate.name,
      });

      localStorage.setItem("hasVoted", "true");
      setVoted(true);
      alert(`Vote casted for ${candidate.name}. Confirmation email sent.`);
    } catch (error) {
      alert("Error casting vote. Try again.");
    }
  };

  return (
    <div className="main">
      <h2>Vote for Your Candidate</h2>
      {voted ? (
        <p>You have already voted.</p>
      ) : (
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              {candidate.name} - {candidate.party} 
              <button onClick={() => handleVote(candidate)}>Vote</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Vote;
