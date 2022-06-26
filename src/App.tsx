import React from 'react';
import './App.css';
import ServiceList from './components/ServiceList/ServiceList';
import ServiceAdd from './components/ServiceAdd/ServiceAdd';
import FilterField from './components/FilterField/FilterField';

function App() {

  return (
    <div className="container">
      <div className="container-services">
        <ServiceAdd />
        <div className="container-item">
          <ServiceList />
        </div>
      </div>
      <div className="container-actions">
        <FilterField />
      </div>
    </div>
  );
}

export default App;
