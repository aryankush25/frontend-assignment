import React, { useState, useEffect } from "react";
import Table from "./components/Table/Table";
import Pagination from "./components/Pagination/Pagination";
import Error from "./components/Error/Error";
import { fetchKickstarterData } from "./utils/api";
import "./styles/common.css";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const recordsPerPage = 5;

  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonData = await fetchKickstarterData();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Kickstarter Projects</h1>
        <Table data={currentRecords} loading={loading} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={data.length}
          onPageChange={setCurrentPage}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
