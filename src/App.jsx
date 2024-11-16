import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AddTTSV from './Form/AddTTSV';
import EditTTSV from './Form/EditTTSV';
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import HeaderRoute from './components/HeaderRoute';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
              <Route path='/' element={<HeaderRoute />}>
              <Route index element={<Navigate to="add-ttsv" />} />
              <Route path='add-ttsv' element={<AddTTSV />} />
              <Route path='edit-ttsv/:maSv' element={<EditTTSV />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
