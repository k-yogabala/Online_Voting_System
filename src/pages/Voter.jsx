import React, { useEffect, useState } from "react";

const VoterList = () => {
    const [voters, setVoters] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/voters")
            .then((response) => response.json())
            .then((data) => setVoters(data))
            .catch((error) => console.error("Error fetching voters:", error));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Voter List</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Voted Time</th>
                    </tr>
                </thead>
                <tbody>
                    {voters.map((voter, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border p-2">{voter.user_email}</td>
                            <td className="border p-2">{new Date(voter.vote_time).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VoterList;
