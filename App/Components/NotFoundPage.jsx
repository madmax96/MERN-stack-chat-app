import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <p>404 Page</p>
    <Link to="/" >Go back</Link>
  </div>
);

export default NotFoundPage;
