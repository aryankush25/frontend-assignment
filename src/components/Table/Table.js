import React from "react";
import { formatCurrency } from "../../utils/currency";
import "./Table.css";

const Table = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="text-center">S.No.</th>
              <th className="text-right">Percentage funded</th>
              <th className="text-right">Amount pledged</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="text-center">
                  <div className="skeleton-cell skeleton-small"></div>
                </td>
                <td className="text-right">
                  <div className="skeleton-cell skeleton-medium"></div>
                </td>
                <td className="text-right">
                  <div className="skeleton-cell skeleton-large"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="text-center">S.No.</th>
            <th className="text-right">Percentage funded</th>
            <th className="text-right">Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {data.map((project) => (
            <tr key={project["s.no"]}>
              <td className="text-center">{project["s.no"]}</td>
              <td className="text-right">{project["percentage.funded"]}%</td>
              <td className="text-right">
                {formatCurrency(project["amt.pledged"], project.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
