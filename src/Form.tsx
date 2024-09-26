import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"; // Import Yup
import "./cs.css"; // Import your CSS file

const ClaimFormComponent: React.FC = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_API_URL!;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: 0,
    dateOfIncident: "",
    description: "",
    claimType: "Medical", // Default value
  });

  // Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Claimant name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    amount: Yup.number()
      .positive("Claim amount must be positive")
      .required("Claim amount is required"),
    dateOfIncident: Yup.string().required("Date of incident is required"),
    description: Yup.string().required("Description is required"),
    claimType: Yup.string().required("Claim type is required"),
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data against the schema
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await fetch(`${baseUrl}/test/addForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/success");
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        alert(error.errors.join(", ")); // Show validation errors
      } else {
        console.error("Error:", error);
        alert("An error occurred while submitting the form");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Claim Form</h2>
      <form onSubmit={handleSubmit} className="claim-form">
        <div className="form-group">
          <label>Claimant Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Claimant Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Claim Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Date of Incident:</label>
          <input
            type="date"
            name="dateOfIncident"
            value={formData.dateOfIncident}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>Claim Type:</label>
          <select
            name="claimType"
            value={formData.claimType}
            onChange={handleChange}
            className="form-input"
          >
            <option value="Medical">Medical</option>
            <option value="Accident">Accident</option>
            <option value="Theft">Theft</option>
            <option value="Property Damage">Property Damage</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClaimFormComponent;
