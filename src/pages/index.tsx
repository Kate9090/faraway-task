import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import CharacterPage from 'pages/CharacterPage';
import DetailCharacterPage from 'pages/DetailCharacterPage';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharacterPage />} />
        <Route path="/:id" element={<DetailCharacterPage />} />
      </Routes>
     </BrowserRouter>
  );
};