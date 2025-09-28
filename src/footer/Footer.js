import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      {/* Facts Section */}
      <div className="facts">
        <h2>📢 Did You Know?</h2>
        <ul>
          <li>
            Every year, thousands of women die in dowry-related cases in India.
          </li>
          <li>
            Dowry has been illegal in India since 1961 under the Dowry
            Prohibition Act.
          </li>
          <li>
            Despite the law, dowry is still practiced in many communities.
          </li>
          <li>
            UNICEF and UN Women highlight dowry as a driver of child marriage
            and violence.
          </li>
          <li>
            Educating girls and financial independence reduce dowry-related
            crimes.
          </li>
        </ul>
      </div>

      {/* Resources Section */}
      <div className="resources">
        <h2>📚 Resources</h2>
        <ul>
          <li>
            <a href="https://www.ncw.gov.in/dowry-prohibition-act-1961/" target="_blank" rel="noreferrer">
              National Commission for Women - Dowry Prohibition Act
            </a>
          </li>
          <li>
            <a
              href="https://www.unicef.org/india/"
              target="_blank"
              rel="noreferrer"
            >
              UNICEF India - Ending Child Marriage
            </a>
          </li>
          <li>
            <a href="https://www.unwomen.org/" target="_blank" rel="noreferrer">
              UN Women - Ending Violence Against Women
            </a>
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">
        ⚠️ Important Disclaimer: This calculator is for educational and
        satirical purposes only. Dowry is illegal and harmful. Support
        organizations working to end this practice.
      </div>
    </div>
  );
}
