import React from 'react'
import { withRouter } from 'react-router-dom'

const Form = ({ handleChange, handleSubmit, data }) => {
  return (
    <div className="container has-text-centered">
      <div className="columns is-centered ">
        <div className="card-content is-wider">
          <h1 className='title is-4'>Whats's on your mind?</h1>
          <div className="media-content">
            <form onSubmit={handleSubmit}>
              {/* ******************* */}
              <div className="field">
                <div className="control">
                  <textarea
                    className="input is-content is-post"
                    name="content"
                    placeholder="What's on your mind?"
                    onChange={handleChange}
                    value={data.content}
                  />
                </div>
              </div>
              <div className="media is-right">
                <button className="button is-info is-rounded">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}


export default withRouter(Form)
