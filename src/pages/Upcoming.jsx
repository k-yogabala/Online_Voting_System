import React from "react";
import "../components/UpcomingElections.css"; 

const elections = [
  {
    title: "2025 India General Election",
    description:
      "General elections will be held in India from 19 Feb 2025 to 1 March 2025 to elect the 543 members of the 18th Lok Sabha. The elections will be held in seven phases and the results will be announced on 1 march 2025.",
  },
  {
    title: "2025 India General Election",
    description:
      "General elections will be held in India from 19 Feb 2025 to 1 March 2025 to elect the 543 members of the 18th Lok Sabha. The elections will be held in seven phases and the results will be announced on 1 march 2025.",
  },
  {
    title: "2025 India General Election",
    description:
      "General elections will be held in India from 19 Feb 2025 to 1 March 2025 to elect the 543 members of the 18th Lok Sabha. The elections will be held in seven phases and the results will be announced on 1 march 2025.",
  },
  {
    title: "2025 India General Election",
    description:
      "General elections will be held in India from 19 Feb 2025 to 1 March 2025 to elect the 543 members of the 18th Lok Sabha. The elections will be held in seven phases and the results will be announced on 1 march 2025.",
  },
  {
    title: "2025 India General Election",
    description:
      "General elections will be held in India from 19 Feb 2025 to 1 March 2025 to elect the 543 members of the 18th Lok Sabha. The elections will be held in seven phases and the results will be announced on 1 march 2025.",
  },
  {
    title: "2025 India General Election",
    description:
      "General elections will be held in India from 19 Feb 2025 to 1 March 2025 to elect the 543 members of the 18th Lok Sabha. The elections will be held in seven phases and the results will be announced on 1 march 2025.",
  },
];

const UpcomingElections = () => {
  return (
    <div className="upcoming-elections">
      <h2 className="title">Upcoming Elections</h2>
      <div className="elections-container">
        {elections.map((election, index) => (
          <div key={index} className="election-card">
            <h3 className="election-title">{election.title}</h3>
            <p className="election-description">{election.description}</p>
            <button className="vote-button" onClick={() => alert("Please Login first")}>Participate/Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingElections;
