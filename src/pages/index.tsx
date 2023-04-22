import React from 'react';
import { Routes, Route } from "react-router-dom";

import CharacterPage from 'pages/CharacterPage';
import DetailCharacterPage from 'pages/DetailCharacterPage';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<CharacterPage />} />
      <Route path="/:id" element={<DetailCharacterPage />} />
    </Routes>
  );
};