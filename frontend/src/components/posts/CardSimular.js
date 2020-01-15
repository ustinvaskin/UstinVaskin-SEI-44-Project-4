import React from 'react'

const CardSimular = ({ image, name, author }) => {
  return (
    <div className="cardSimular" >
      <div className="cardSimular">
        <figure id="imgSimular">
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-7">{name}</p>
            <p className="subtitle is-7">{author}</p>
          </div>
        </div>
      </div >
    </div >
  )
}

export default CardSimular


