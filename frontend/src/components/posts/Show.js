import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import Promise from 'bluebird'
import Card from './CardSimular'
import Auth from '../../lib/Auth'
import Loading from '../common/Loading'


import SideNav from '../common/SideBarNav'
class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: '',
      posts: {
        owner: {},
        comments: [{
          owner: {
            username: ''
          }
        }]
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleComment = this.handleComment.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteComments = this.handleDeleteComments.bind(this)
  }


  // When users id equals to one who created post you can
  canModify() {
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.state.posts.owner.id
  }

  // get spesific post
  componentDidMount() {
    const token = Auth.getToken()
    axios.get(`/api/posts/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => this.setState({ posts: res.data }))
  }


  // Handle delate post
  handleDelete() {
    const token = Auth.getToken()
    axios.delete(`/api/posts/${this.props.match.params.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/main'))
  }


  // Handle Cahneg 
  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    console.log(data)
  }

  // Handle deleat
  handleDeleteComments(e) {
    const token = Auth.getToken()
    if (e.target.value === Auth.getPayload().sub) {
      axios.delete(`/api/posts/${this.props.match.params.id}/comments/${e.target.id}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    }
    window.location.reload()
  }



  // Handle Comment:
  handleComment(e) {
    e.preventDefault()
    const token = Auth.getToken()
    axios.post(`/api/posts/${this.props.match.params.id}/comments/`, this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    window.location.reload()
  }


  render() {
    console.log(this.state.posts)
    return (
      <div className="columns" data-config-id="pricing_02">
        <div className="column">
          <SideNav />
        </div>
        <div className="column">
          < div className="card" >
            <div className="card-content-blog">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img className="is-rounded" src={this.state.posts.owner.profile_image} alt={this.state.posts.owner.username} />
                  </figure>
                </div>
                <div>
                  {Auth.isAuthenticated() &&
                    <Link to={{
                      pathname: `/users/${Auth.getPayload().sub}`,
                      state: { article: this.state.post }
                    }}>
                      <button className="button is-grey"> <i className="fas fa-bookmark"></i> <small>Add to bookmark</small></button>
                    </Link>
                  }
                </div>
                <div className="media-right">
                  {this.canModify() &&
                    <div>
                      <Link to={`/posts/${this.state.posts.id}/edit`} className="button">Edit</Link>
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
              <div className="content">
                <Link to={`/users/${this.state.posts.owner.id}`}>
                  <p className="title is-4">{this.state.posts.owner.username}</p>
                </Link>
                Created on: <time dateTime="2016-1-1">{this.state.posts.created_at}</time>
                <br />
                <br />
                <p className="subtitle is-5">  {this.state.posts.content}</p>
                <div>
                  <i className="far fa-comments"></i>
                  <span className="subtitle is-5"> {this.state.posts.comments.length}</span>
                </div>

              </div>
              <article className="media">
                <div className="media-content">
                  <div className="field">
                    <p className="control">
                      <textarea className="input is-content is-post" name="text" placeholder="Add a comment..." onChange={this.handleChange}></textarea>
                    </p>
                  </div>
                  <nav className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <a className="button is-info has-text-white" onClick={this.handleComment}>Post Comment</a>
                      </div>
                    </div>
                  </nav>
                </div>
              </article>
              {this.state.posts.comments.map(comments =>
                <article key={comments._id} className="media">
                  <figure className="media-left">
                    <p className="image is-48x48">
                      <img className="is-rounded" src={comments.owner.profile_image} alt={comments.owner.username} />

                    </p>
                  </figure>

                  <div className="media-content">
                    <div className="content">
                      <p className="commentText strong">
                        <Link to={`/users/${comments.owner.id}`}>
                          <strong>{comments.owner.username}</strong>
                        </Link>
                        <br />
                        {comments.text}
                      </p>
                    </div>
                    <nav className="level is-mobile">
                      <div className="level-left">
                        <a className="level-item">
                          <span className="icon is-small"><i className="fas fa-reply"></i></span>
                        </a>
                        <a className="level-item">
                          <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                        </a>
                        <a className="level-item">
                          <span className="icon is-small"><i className="fas fa-heart"></i></span>
                        </a>
                      </div>
                    </nav>
                  </div>
                  <div className="media-right">
                    <button id={comments._id} value={comments.owner._id} className="delete" onClick={this.handleDeleteComments}></button>
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