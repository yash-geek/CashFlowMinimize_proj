import React from 'react';
import DataTableVariable from './array';
import './home.css';

const Home = () => {
  return (
    <div className='body'>
      <h1>Cash flow minimiser</h1>
      <h3>Given a number of friends who have to give or take some amount of money from one another.
        An algorithm by which the total cash flow among all the friends is minimized. </h3>
      <DataTableVariable/>
    </div>
  );
};

export default Home;