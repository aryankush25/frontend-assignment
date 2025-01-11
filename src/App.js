import React, { useState, useEffect } from "react";
import Table from "./components/Table/Table";
import Pagination from "./components/Pagination/Pagination";
import Error from "./components/Error/Error";
import { fetchKickstarterData } from "./utils/api";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./styles/common.css";

function AppContent() {
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

  const { isDarkMode, toggleTheme } = useTheme();

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="App" data-theme={isDarkMode ? "dark" : "light"}>
      <div className="container">
        <div className="header">
          <h1>Kickstarter Project</h1>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>
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

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
