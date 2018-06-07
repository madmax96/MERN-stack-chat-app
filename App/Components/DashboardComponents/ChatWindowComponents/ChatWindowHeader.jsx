import React from 'react';
import UserPreview from './../UserPreview';

export default class ChatWindowHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="chatWindowHeader">
        <p className="chatWindowHeader__title"> Title title title </p>
        <div className="row row-start row-fluid-1/7">
          <UserPreview admin /><UserPreview /><UserPreview /><UserPreview />
        </div>
      </div>
    );
  }
}
