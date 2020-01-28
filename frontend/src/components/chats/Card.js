import React from 'react'

const Card = ({ created_at, messages, content }) => {
  return (
    <div className="card-content-blog">
      <div className="media-content">
        <div>
          <span className="title is-5 has-text-grey">Chat room:</span> <span className="title is-4">{content}</span>
          <span className="subtitle is-6 has-text-grey"> Created on: <time dateTime="2016-1-1">{created_at}</time>
          </span>
        </div>
      </div><br />
      <i className="fas fa-envelope fa-2x	"></i>
      <span className="title is-4 has-text-weight-semibold	">{messages.length}</span>
    </div >
  )
}

export default Card



