import React from 'react'
import { Link } from 'react-router-dom';
import { App } from '../App';

function Home(): JSX.Element  {
  return (
    <div>
      <nav>
        <Link to="/about"></Link>
      </nav>
      <App/>
    </div>
  )
}

export default Home;