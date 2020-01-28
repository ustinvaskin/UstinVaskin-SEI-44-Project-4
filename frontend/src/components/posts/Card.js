import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ owner, created_at, comments, content, id }) => {
  return (
    <div className="card-content-blog">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img className="is-rounded" src={owner.profile_image} alt={owner.username} />
          </figure>
        </div>
        <div className="media-content">
          <Link to={`/users/${owner.id}`}>
            <strong>{owner.username}</strong>
          </Link>
          <p className="subtitle is-6"> Created on: <time dateTime="2016-1-1">{created_at}</time>
          </p>
        </div>
      </div>
      <div className="column is-four-fifths has-text-justified ">
        <p className="subtitile is-4">{content}</p>
        <div>
          <i className="far fa-comments"></i>
          <span className="subtitile is-5 has-text-weight-semibold	">{comments.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card



