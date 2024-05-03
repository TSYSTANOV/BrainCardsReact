import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Categories } from "./Categories";
import { Edit } from "./Edit";
import { Cards } from "./Cards";
function App() {
  const [title, setTitle] = useState("Категории");
  return (
    <BrowserRouter>
      <main id="app">
        <Routes>
          <Route
            path="/"
            element={<Categories title={title} setTitle={setTitle} />}
          ></Route>
          <Route path="/:cardId" element={<Cards />}></Route>
          <Route path="edit" element={<Edit />}></Route>
          <Route path="edit/:categoryID" element={<Edit />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
