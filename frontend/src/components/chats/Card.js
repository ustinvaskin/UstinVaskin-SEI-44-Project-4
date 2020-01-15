import React from 'react'

import { Link } from 'react-router-dom'

// import Likes from '../common/Likes'

const Card = ({ owner, created_at, messages, content, id }) => {
  return (
    <div className="card-content-blog">
      {/* <div className="media"> */}
      {/* <div className="media-left"> */}
      {/* <figure className="image is-48x48">
            <img className="is-rounded" src={owner.profile_image} alt={owner.username} />
          </figure> */}

      <div className="media-content">
        <div>
          <span className="title is-5 has-text-grey">Chat room:</span> <span className="title is-4">{content}</span>
          <span className="subtitle is-6 has-text-grey"> Created on: <time dateTime="2016-1-1">{created_at}</time>
          </span>
        </div>

      </div><br />
      <i class="fas fa-envelope fa-2x	"></i>
      <span className="title is-4 has-text-weight-semibold	">     {messages.length}</span>

    </div >

  )
}

export default Card



