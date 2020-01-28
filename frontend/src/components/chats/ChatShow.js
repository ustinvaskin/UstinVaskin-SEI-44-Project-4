import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import Promise from 'bluebird'
import Auth from '../../lib/Auth'

import SideNav from '../common/SideBarNav'
class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chat: '',
      chats: {
        owner: {},
        messages: [{
          owner: {
            username: ''
          }
        }]
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeletemessages = this.handleDeletemessages.bind(this)
  }


  // When users id equals to one who created post you can
  canModify() {
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.state.chats.owner.id
  }

  // get spesific post
  componentDidMount() {
    const token = Auth.getToken()
    axios.get(`/api/chats/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => this.setState({ chats: res.data }))
  }


  // Handle delate post
  handleDelete() {
    const token = Auth.getToken()
    axios.delete(`/api/chats/${this.props.match.params.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/chats'))
  }

  // Handle Cahneg 
  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    console.log(data)
  }

  // Handle deleat
  handleDeletemessages(e) {
    const token = Auth.getToken()
    if (e.target.value === Auth.getPayload().sub) {
      axios.delete(`/api/chats/${this.props.match.params.id}/messages/${e.target.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    }
    // window.location.reload()
  }



  // Handle Comment:
  handleMessage(e) {
    e.preventDefault()
    const token = Auth.getToken()
    axios.post(`/api/chats/${this.props.match.params.id}/messages/`, this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    window.location.reload()
  }


  render() {
    console.log(this.state.chats)
    return (
      <div className="columns" data-config-id="pricing_02">
        <div className="column">
          <SideNav />
        </div>
        <div className="column">
          < div className="" >
            <div className="card-content-blog ">
              <div className="media">
                <div className="media-left">
                </div>
                <div className="media-right">
                  {this.canModify() &&
                    <div>
                      <Link to={`/chats/${this.state.chats.id}/edit`} className="button">Edit</Link>
                    </div>
                  }
                </div>
                <div>
                  {this.canModify() &&
                    <div>
                      <button className="button " onClick={this.handleDelete}>Delete</button>
                    </div>
                  }
                </div>
                <div className="media-content">
                </div>
              </div>
              <div className="card-content-blog">
                <div className="media-content">
                  <div>
                    <span className="title is-5 has-text-grey">Chat room:</span> <span className="title is-4">{this.state.chats.content}</span>
                    <br />
                    <p className="subtitle is-6 has-text-grey"> Created on: <time dateTime="2016-1-1">{this.state.chats.created_at}</time>
                    </p>
                  </div>
                </div><br />
                <i className="fas fa-envelope fa-2x	"></i>
                <span className="title is-4 has-text-weight-semibold">{this.state.chats.messages.length}</span>
              </div >
              <article className="media">
                <div className="media-content">
                  <div className="field">
                    <p className="control">
                      <textarea className="input is-content is-post" name="text" placeholder="Write your message..." onChange={this.handleChange}></textarea>
                    </p>
                  </div>
                  <nav className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <a className="button is-info has-text-white" onClick={this.handleMessage}>Send Message</a>
                      </div>
                    </div>
                  </nav>
                </div>
              </article>
              {this.state.chats.messages.map(messages =>
                <article key={messages.id} className="media">
                  <figure className="media-left">
                    <p className="image is-48x48">
                      <img className="is-rounded" src={messages.owner.profile_image} alt={messages.owner.username} />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p className="commentText strong">
                        <Link to={`/users/${messages.owner.id}`}>
                          <strong>{messages.owner.username}</strong>
                        </Link>
                        <br />
                        {messages.text}
                      </p>
                    </div>
                  </div>
                  <div className="media-right">
                    <button id={messages._id} value={messages.owner._id} className="delete" onClick={this.handleDeletemessages}></button>
                  </div>
                </article>
              )}
            </div>
          </div>
        </div >
        <div className="column">
        </div>
      </div >
    )
  }
}

export default Show