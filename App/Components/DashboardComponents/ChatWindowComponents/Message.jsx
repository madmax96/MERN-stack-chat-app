import React from 'react';

export default (props) => {
  let messageClass = 'row row-start';
  let messageTextClass = '';
  let userPreview;
  if (props.userPreview) {
    messageTextClass = 'col-3/4';
    userPreview = (
      <div className="message__user col-1/4">
        <img src="#" alt="#" className="message__user__image" />
        <h5 className="message_user__name">{props.userName}</h5>
      </div>
    );
  }
  if (props.self) {
    messageClass = 'row row-end';
  }

  return (
    <div className={`${messageClass} messageRow`}>
      <div className="col-7/12 message">
        <div className="row">
          {userPreview}
          <div className={`${messageTextClass} message__text`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptates nulla qui eum illo ex? Impedit iusto aliquid aut,
            corrupti deleniti sequi repellat.
            Distinctio voluptas maxime vero nobis dolor dolorum neque?
          </div>
        </div>
        <div className="row row-end">
          <span className="message__date col-1/7">14.7.1996</span>
        </div>
      </div>
    </div>
  );
};

