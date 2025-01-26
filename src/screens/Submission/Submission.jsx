import React, { useEffect, useState } from "react";
import axios from "axios";

const Submission = () => {
  const [loanData, setLoanData] = useState(null);
  const [guarantors, setGuarantors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  const guarantorsPerPage = 2;

  useEffect(() => {
    // Get loan data and guarantors from localStorage
    const storedLoanData = JSON.parse(localStorage.getItem("loanData")) || {};
    const storedGuarantors =
      JSON.parse(localStorage.getItem("guarantors")) || [];

    if (storedLoanData) {
      setLoanData(storedLoanData);
    }
    if (storedGuarantors) {
      setGuarantors(storedGuarantors);
    }
  }, []);

  const handleSubmit = async () => {
    if (!loanData || guarantors.length === 0) {
      setError("Loan data and guarantors are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/v1/loans", {
        category: loanData.category,
        subcategory: loanData.subcategory,
        amount: loanData.amount,
        loanPeriod: loanData.loanPeriod,
        guarantors: guarantors,
      });

      if (response.status === 201) {
        setSuccessMessage("Loan and guarantors data submitted successfully!");
      } else {
        setError(response.data?.message || "Failed to submit data.");
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("An error occurred while submitting the data.");
      setLoading(false);
    }
  };

  // Pagination logic for guarantors
  const indexOfLastGuarantor = currentPage * guarantorsPerPage;
  const indexOfFirstGuarantor = indexOfLastGuarantor - guarantorsPerPage;
  const currentGuarantors = guarantors.slice(
    indexOfFirstGuarantor,
    indexOfLastGuarantor
  );

  const totalPages = Math.ceil(guarantors.length / guarantorsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Submit Loan & Guarantor
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        {loading ? (
          <p className="text-center text-blue-500">Submitting...</p>
        ) : (
          <div>
            {/* Loan Data Table */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Loan Data
            </h3>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Field
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {loanData && (
                  <>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Amount
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {loanData.amount}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Category
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {loanData.category}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Loan Period
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {loanData.loanPeriod}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Subcategory
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {loanData.subcategory}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>

            {/* Guarantors List */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
              Guarantors
            </h3>
            {currentGuarantors.length === 0 ? (
              <p className="text-gray-600">No guarantors available.</p>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">CNIC</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGuarantors.map((guarantor, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {guarantor.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {guarantor.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {guarantor.cnic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {guarantors.length > guarantorsPerPage && (
              <div className="flex justify-center items-center mt-4">
                <button
                  className="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 mt-6 rounded-lg ${
                loading ? "bg-gray-400" : "bg-blue-600"
              } text-white hover:bg-blue-700`}
            >
              Submit Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submission;
