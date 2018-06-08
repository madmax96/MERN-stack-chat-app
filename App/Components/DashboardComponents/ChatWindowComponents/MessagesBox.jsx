import React from 'react';
import Message from './Message';

export default class MessagesBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="MessagesBox">
        <h3 className="text-center margin-top-medium">Wednesday</h3>

        <Message
          user={{ name: 'madmax' }}
          message="sicing elit. Repudiandae, quidem iste. Ea provident ipsum voluptatibus, qui nostrum accusantium
                  dolorum, officia cumque sit nisi aspernatur? Suscipit a veniam illo placeat eveniet?"
          self
          date="14.7.1996"
        />
        <Message
          message="sicing elit. Repudiandae, quidem iste. Ea provident ipsum voluptatibus, qui nostrum accusantium
                  dolorum, officia cumque sit nisi aspernatur? Suscipit a veniam illo placeat eveniet?"
          self
          date="14.7.1996"
        />
        <Message
          user={{ name: 'asaaa' }}
          message="sicing elit. Repudiandae, quidem iste. Ea provident ipsum voluptatibus, qui nostrum accusantium
                  dolorum, officia cumque sit nisi aspernatur? Suscipit a veniam illo placeat eveniet?"

          date="15.7.1996"
        />
      </div>
    );
  }
}
