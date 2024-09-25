import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ClaimFormComponent: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const baseUrl = process.env.REACT_APP_BASE_API_URL!;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: 0,
    dateOfIncident: "",
    description: "",
    claimType: "Medical", // Default value
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseFloat(value) : value, // Parse amount as float
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/test/addForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Navigate to the success page on successful form submission
        navigate("/success");
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Claimant Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Claimant Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Claim Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Date of Incident:</label>
        <input
          type="date"
          name="dateOfIncident"
          value={formData.dateOfIncident}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Claim Type:</label>
        <select
          name="claimType"
          value={formData.claimType}
          onChange={handleChange}
        >
          <option value="Medical">Medical</option>
          <option value="Accident">Accident</option>
          <option value="Theft">Theft</option>
          <option value="Property Damage">Property Damage</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ClaimFormComponent;
