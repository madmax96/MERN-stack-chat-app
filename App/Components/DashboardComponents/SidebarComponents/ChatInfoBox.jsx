import React from 'react';

export default props => (
  <div className="row row-space_around" onClick={() => props.onClick('testing')}>
    <div className="col-5/9">Chat Name</div>
    <div className="col-1/3">Date NUmber</div>
  </div>
);
