import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../../lib/Auth'


class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book: '',
      books: '',
      errors: '',
      data: '',
      comments: []
    }
    this.handleComment = this.handleComment.bind(this)
    this.handleDeleteComments = this.handleDeleteComments.bind(this)
  }

  componentDidMount() {
    Promise.all([
      fetch(`/api/books/${this.props.match.params.id}`),
      fetch('/api/books/')
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
        book: data1,
        books: data2
      }))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.componentDidMount()
    }
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    console.log(data)
  }

  handleComment(e) {
    e.preventDefault()
    const token = Auth.getToken()
    axios.post(`/api/posts/${this.props.match.params.id}/comments`, this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    window.location.reload()
  }
  handleDeleteComments(e) {
    const token = Auth.getToken()
    if (e.target.value === Auth.getPayload().sub) {
      axios.delete(`/api/posts/${this.props.match.params.id}/comments/${e.target.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    }
    window.location.reload()
  }


  render() {
    return (
      <div className="show-content-comments subheading-show" >
        Comments
        < article className="media" >
          <figure className="media-left">
            <p className="image is-64x64">
              {/* <img src="https://profile.actionsprout.com/default.jpeg" /> */}
            </p>
          </figure>
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea className="textarea" name="content" placeholder="Add a comment..." onChange={this.handleChange}></textarea>
              </p>
            </div>
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <a className="button is-dark" onClick={this.handleComment}>Post Comment</a>
                </div>
              </div>
            </nav>
          </div>
        </article>
        {this.state.book.comments.map(comment =>
          <article key={comment._id} className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <Link to={`/users/${comment.user.id}`}>
                  {comment.user.username}
                </Link>
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p className="commentText">
                  <strong>{comment.user.username}</strong> <small>{comment.createdAt.substring(0, comment.createdAt.length - 5).replace(/T/g, ' ')}</small>
                  <br />
                  {comment.content}
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
              <button id={comment._id} value={comment.user._id} className="delete" onClick={this.handleDeleteComments}></button>
            </div>
          </article>
        )
        }
      </div >
    )
  }
}

export default Feed
