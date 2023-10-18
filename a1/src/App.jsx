import React from "react";
import AddNew from "./components/AddNew";
import Table from "./components/Table";
//import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="m-2">
      <AddNew />
      <Table />
    </div>
  );
};

export default App;
