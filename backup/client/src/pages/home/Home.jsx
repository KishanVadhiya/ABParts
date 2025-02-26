import React, { useState, useEffect } from "react";
import { Header } from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import "./Home.css";

const Home = () => {
  const [step, setStep] = useState(1);
  const [partType, setPartType] = useState("");
  const [subPartType, setSubPartType] = useState("");
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (subPartType) {
      fetchColumns();
      fetchParts();
      console.log("\n\n\n\n\n");
      console.log("fetching columns and parts");
      console.log("partType:", partType);
      console.log("subPartType:", subPartType);
      console.log("columns:", columns);
      console.log("data: the adfsadfsad", data);
    }
  }, [subPartType]);

  const fetchColumns = async () => {
    const response = await fetch(
      `http://localhost:3000/v1/api/get-columns?division=${partType}&parttype=${subPartType}`
    );
    const columns = await response.json();
    setColumns(columns.data);
  };

  const fetchParts = async () => {
    const response = await fetch(
      `http://localhost:3000/v1/api/${subPartType}-${partType}/parts`
    );
    const data = await response.json();
    console.log(data);
    setData(data.data);
  };

  const handlePartTypeClick = (type) => {
    setPartType(type);
    setStep(2);
  };

  const handleSubPartTypeClick = (type) => {
    setSubPartType(type);

    setStep(3);
  };

  return (
    <div >
      <Header />
      <div className="main_div">
        <Sidebar />
        <div className="main-content">
          {step === 1 && (
            <div className="button_container">
              <button onClick={() => handlePartTypeClick("active")}>
                Active Parts
              </button>
              <button onClick={() => handlePartTypeClick("spare")}>
                Spare Parts
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="button_container">
              <button onClick={() => handleSubPartTypeClick("control-valve")}>
                Control Valve
              </button>
              <button onClick={() => handleSubPartTypeClick("flow-meter")}>
                Flow Meter
              </button>
            </div>
          )}
          {step === 3 && (
            <Table columns={columns} data={data} />
            // <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
