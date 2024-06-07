import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import ClassPage from './Components/ClassPage';
import FunctionPage from './Components/FunctionPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <div>
    <Header />
    <div className="row text-white">
      <div className="col-6">
        <span className="h1 text-warning text-center">Class Component</span>
        <ClassPage />
      </div>
      <div className="col-6">
        <span className="h1 text-warning text-center">Function Component</span>
        <FunctionPage />
      </div>
    </div>
    <Footer />
  </div>
);

// componentDidMount method was being called multiple times. hence replaced React.StrictMode with div
