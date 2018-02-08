import React from 'react';
import { Link } from 'react-router-dom';


export const NotFoundPage = (props) => (
  <div>
    <p>404 Page</p>
    <Link to="/">Go back</Link>
  </div>
);


//export default connect(undefined, mapDispatchToProps)(LoginRegisterPage);
