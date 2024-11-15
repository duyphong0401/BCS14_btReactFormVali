import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTTSV from './Form/AddTTSV';
import EditTTSV from './Form/EditTTSV';
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import HeaderRoute from './components/HeaderRoute';

const App = () => {
  return (
    <div>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true, // Bật cờ xử lý splat route
        }}
      >
        <Provider store={store}>
          <Routes>
            <Route path='' element={<HeaderRoute />}>
              <Route path='add-ttsv' element={<AddTTSV />}></Route>
              <Route path='edit-ttsv' element={<EditTTSV />}></Route>
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
