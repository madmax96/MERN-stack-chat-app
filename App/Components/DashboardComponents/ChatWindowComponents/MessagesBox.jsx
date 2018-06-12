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
      <div className="messagesBox">
        <h3 className="text-center day margin-bottom-small">Wednesday</h3>
        <div className="row row-end" >
          <div className="col-4/7">
            <Message
              user={{ name: 'madmax' }}
              message="sicing elit. Repudiandae, quidem iste. Ea provident ipsum voluptatibus, qui nostrum accusantium
                  dolorum, officia cumque sit nisi aspernatur? Suscipit a veniam illo placeat eveniet?"

              date="14.7.1996"
            />
          </div>
        </div>

        <div className="row row-end" >
          <div className="col-4/7">
            <Message
              message="sicing elit. Repudiandae, quidem iste. Ea provident ipsum voluptatibus, qui nostrum accusantium
                  dolorum, officia cumque sit nisi aspernatur? Suscipit a veniam illo placeat eveniet?"
              date="14.7.1996"
            />
          </div>
        </div>
        <div className="row row-start" >
          <div className="col-4/7">
            <Message
              user={{ name: 'user 1' }}
              message="sicing elit. Repudiandae, quidem iste. Ea provident ipsum voluptatibus, qui nostrum accusantium
                  dolorum, officia cumque sit nisi aspernatur? Suscipit a veniam illo placeat eveniet?"
              date="14.7.1996"
            />
          </div>
        </div>
        <div className="row row-end" >
          <div className="col-4/7">
            <Message
              user={{ name: 'madmax' }}
              message="sicing elit. Repudiandae, quidem iste. Ea provident ipsum voluptatibus, qui nostrum accusantium
                  dolorum, officia cumque sit nisi aspernatur? Suscipit a veniam illo placeat eveniet?"

              date="14.7.1996"
            />
          </div>
        </div>

        <div className="row row-end" >
          <div className="col-4/7">
            <Message
              message="sicing elit. Repudiandae, quidem iste. Ea provident ipsum voluptatibus, qui nostrum accusantium
                  dolorum, officia cumque sit nisi aspernatur? Suscipit a veniam illo placeat eveniet?"
              date="14.7.1996"
            />
          </div>
        </div>
        <div className="row row-start" >
          <div className="col-4/7">
            <Message
              user={{ name: 'user 1' }}
              message="sicing elit. Repudiandae, quidem iste. Ea provident ipsum voluptatibus, qui nostrum accusantium
                  dolorum, officia cumque sit nisi aspernatur? Suscipit a veniam illo placeat eveniet?"
              date="14.7.1996"
            />
          </div>
        </div>
      </div>
    );
  }
}
