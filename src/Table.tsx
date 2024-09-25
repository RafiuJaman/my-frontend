import React, { useEffect, useState } from "react";

interface Form {
  id: number;
  name: string;
  email: string;
  amount: number;
  dateOfIncident: string;
  description: string;
  claimType: string;
  status: string; // New field added
}

const FormsTable: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API_URL}/test/getForms`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch forms");
        }
        const data: Form[] = await response.json();
        setForms(data);
      } catch (err) {
        setError("didn't work");
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const statusInALLCaps = (status: string) => status.toUpperCase();

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_BASE_API_URL
        }/test/updateForm/${id}/${statusInALLCaps(newStatus)}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update the local state to reflect the change
      setForms((prevForms) =>
        prevForms.map((form) =>
          form.id === id ? { ...form, status: newStatus } : form
        )
      );
    } catch (error) {
      setError("Error updating status");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Date of Incident</th>
          <th>Description</th>
          <th>Claim Type</th>
          <th>Status</th> {/* New column for status */}
          <th>Actions</th> {/* New column for actions */}
        </tr>
      </thead>
      <tbody>
        {forms.map((form) => (
          <tr key={form.id}>
            <td>{form.id}</td>
            <td>{form.name}</td>
            <td>{form.email}</td>
            <td>{form.amount}</td>
            <td>{form.dateOfIncident}</td>
            <td>{form.description}</td>
            <td>{form.claimType}</td>
            <td>
              <select
                value={form.status}
                onChange={(e) => updateStatus(form.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                {/* Add more status options as needed */}
              </select>
            </td>
            <td>
              <button onClick={() => updateStatus(form.id, form.status)}>
                Update Status
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FormsTable;
