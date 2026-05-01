import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios"; // adjust import to your axios instance

const PublicDonorScan = () => {
  const { qrId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const load = async () => {
    try {
      const res = await axios.get(`/api/v1/donors/public/${qrId}/`);
      setData(res.data);
    } catch (e) {
      setError("Donor not found or not available");
    } finally {
      setLoading(false);
    }
  };

  load();
}, [qrId]);

  if (loading) return <div>Loading donor info...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "1rem" }}>
      <h2>Donor Information</h2>
      <p><strong>Name:</strong> {data.fullName || "N/A"}</p>
      <p><strong>Blood Group:</strong> {data.blood_group || "N/A"}</p>
      {data.profile_image && (
        <img src={data.profile_image} alt="Donor" style={{ width: 120, borderRadius: 8 }} />
      )}
    </div>
  );
};

export default PublicDonorScan;