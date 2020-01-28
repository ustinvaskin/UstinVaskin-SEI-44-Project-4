import React from 'react'
import { withRouter } from 'react-router-dom'

const Form = ({ handleChange, handleSubmit, data }) => {
  return (
    <div className="container has-text-centered">
      <div className="columns is-centered ">
        <div className="card-content is-wider">
          <h1 className='title is-4'>Name of your chat room</h1>
          <div className="media-content">
            <form onSubmit={handleSubmit}>
              {/* ******************* */}
              <div className="field">
                <div className="control">
                  <input
                    className="input is-content is-post"
                    name="content"
                    placeholder="Chat room??"
                    onChange={handleChange}
                    value={data.content}
                  />
                </div>
              </div>
              <button className="button is-info is-rounded">Create Chat Room</button>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default withRouter(Form)
