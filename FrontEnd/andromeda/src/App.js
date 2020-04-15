import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './containers/Layout/Layout';
import Landing from './components/Landing/Landing';

function App() {
  return (
    <div className="App">
      <Layout>
        <Landing />
      </Layout>
    </div>
  );
}

export default App;
