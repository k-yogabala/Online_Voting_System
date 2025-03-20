import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/AdminDashboard.css";

const AdminDashboard = () => {
    const [candidateId, setCandidateId] = useState("");
    const [candidateName, setCandidateName] = useState("");
    const [candidateParty, setCandidateParty] = useState("");
    const [candidateBio, setCandidateBio] = useState("");
    const [candidatePhoto, setCandidatePhoto] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editCandidateId, setEditCandidateId] = useState(null);
    const [voteResults, setVoteResults] = useState([]);

    // Fetch candidates
    useEffect(() => {
        fetchCandidates();
        fetchVoteResults();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get("http://localhost:5000/candidates");
            setCandidates(response.data);
        } catch (error) {
            console.error("❌ Error fetching candidates:", error);
        }
    };
    const fetchVoteResults = async () => {
        try {
            const response = await axios.get("http://localhost:5000/vote-results");
            setVoteResults(response.data);
        } catch (error) {
            console.error("❌ Error fetching vote results:", error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", candidateId);
        formData.append("name", candidateName);
        formData.append("party", candidateParty);
        formData.append("bio", candidateBio);
        formData.append("photo", candidatePhoto);

        try {
            if (editMode) {
                await axios.put(`http://localhost:5000/update-candidate/${editCandidateId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log("Candidate updated.");
            } else {
                await axios.post("http://localhost:5000/add-candidate", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log("Candidate added.");
            }

            fetchCandidates();
            resetForm();
        } catch (error) {
            console.error("❌ Error adding/updating candidate:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this candidate?")) {
            try {
                await axios.delete(`http://localhost:5000/delete-candidate/${id}`);
                fetchCandidates();
            } catch (error) {
                console.error("❌ Error deleting candidate:", error);
            }
        }
    };

    const handleEdit = (candidate) => {
        setEditMode(true);
        setEditCandidateId(candidate.id);
        setCandidateId(candidate.id);
        setCandidateName(candidate.name);
        setCandidateParty(candidate.party);
        setCandidateBio(candidate.bio);
        setCandidatePhoto(null); 
    };

    const resetForm = () => {
        setCandidateId("");
        setCandidateName("");
        setCandidateParty("");
        setCandidateBio("");
        setCandidatePhoto(null);
        setEditMode(false);
        setEditCandidateId(null);
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder="Candidate ID" value={candidateId} onChange={(e) => setCandidateId(e.target.value)} required />
                <input type="text" placeholder="Candidate Name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} required />
                <input type="text" placeholder="Party Name" value={candidateParty} onChange={(e) => setCandidateParty(e.target.value)} required />
                <textarea placeholder="Candidate Bio" value={candidateBio} onChange={(e) => setCandidateBio(e.target.value)} required />
                <input type="file" onChange={(e) => setCandidatePhoto(e.target.files[0])} required={!editMode} />
                <button type="submit">{editMode ? "Update Candidate" : "Add Candidate"}</button>
                {editMode && <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>}
            </form>

            <h3>Candidate List</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Party</th>
                            <th>Bio</th>
                            <th>Actions</th>
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
                                <td className="action-buttons">
                                    <button className="edit-btn" onClick={() => handleEdit(candidate)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(candidate.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h3>🗳️ Vote Results</h3>
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
        </tr>
    </thead>
    <tbody>
        {voteResults.map((candidate) => (
            <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.party}</td>
                <td>{candidate.vote_count}</td>
            </tr>
        ))}
    </tbody>
</table>

        </div>
    );
};

export default AdminDashboard;
