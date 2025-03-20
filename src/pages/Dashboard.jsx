import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Dashboard.css";

const Dashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [votedCandidateId, setVotedCandidateId] = useState(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user || !user.email) {
            console.warn("⚠️ No user found. Redirecting to login...");
            navigate("/login");
            return;
        }

        fetchCandidates();
        checkIfVoted();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get("http://localhost:5000/candidates");
            setCandidates(response.data);
        } catch (error) {
            console.error("❌ Error fetching candidates:", error);
        }
    };

    const checkIfVoted = async () => {
        if (!user?.email) {
            console.warn("⚠️ User email not found.");
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:5000/check-vote/${user.email}`);
            
            if (response.data.voted) {
                setVotedCandidateId(response.data.candidateId); 
            } else {
                setVotedCandidateId(null); 
            }
        } catch (error) {
            console.error("❌ Error checking vote status:", error);
            setVotedCandidateId(null); 
        }
    };
    
    
    const handleVote = async (id) => {
    if (!id || !user?.email) {
        console.error("❌ Missing required fields: Candidate ID or Email");
        return;
    }

    try {
        console.log("Submitting vote:", { email: user.email, candidateId: id });

        const response = await axios.post(
            "http://localhost:5000/vote",
            { email: user.email, candidateId: id },
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Vote successful:", response.data);

        window.alert("Your vote has been submitted successfully!");

        setVotedCandidateId(id);

    } catch (error) {
        console.error("❌ Error submitting vote:", error.response?.data || error.message);
        
        if (error.response?.data?.error === "User has already voted!") {
            
            checkIfVoted();
        }
    }
};


    return (
        <div className="dashboard">
            <h2>Welcome, {user.email}!</h2>
            <h3>Candidate List</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Party</th>
                            <th>Bio</th>
                            <th>Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate.id}>
                                <td>
                                    <img src={`http://localhost:5000${candidate.photo}`} alt={candidate.name} className="candidate-img" />
                                </td>
                                <td>{candidate.name}</td>
                                <td>{candidate.party}</td>
                                <td>{candidate.bio}</td>
                                <td className="vote-button">
    <button 
        className="vote-btn" 
        onClick={() => handleVote(candidate.id)}
        disabled={votedCandidateId !== null && votedCandidateId !== candidate.id} 
        style={{
            backgroundColor: votedCandidateId === candidate.id ? "#4CAF50" : "#007bff",
            color: "white",
            cursor: votedCandidateId === candidate.id ? "default" : "pointer",
            opacity: votedCandidateId !== null && votedCandidateId !== candidate.id ? 0.5 : 1, 
        }}
    >
        {votedCandidateId === candidate.id ? "Voted" : "Vote"}
    </button>
</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
