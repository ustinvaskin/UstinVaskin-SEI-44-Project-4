import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import Promise from 'bluebird'

import Auth from '../../lib/Auth'
import Loading from '../common/Loading'
import Card from '../posts/Card'

import SideNav from '../common/SideBarNav'
class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        post: []
      }
    }

    this.handleDelete = this.handleDelete.bind(this)
  }


  canModify() {
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.state.user.id
  }

  // get spesific post
  componentDidMount() {
    const token = Auth.getToken()
    axios.get(`/api/profile-all/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => this.setState({ user: res.data }))
  }




  // Handle delate user
  handleDelete() {
    const token = Auth.getToken()
    axios.delete(`/api/profile-all/${this.props.match.params.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => Auth.removeToken())
      .then(() => this.props.history.push('/home'))
  }




  // Handle Cahneg 
  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    console.log(data)
  }

  render() {
    console.log(this.state.user)
    return (
      <div className="columns" data-config-id="pricing_02">
        <div className="column">
          <SideNav />
        </div>
        <div className="column">
          <div className="card-content-blog card">
            <div className="card-content-blog">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img className="is-rounded" src={this.state.user.profile_image} alt={this.state.user.username} />
                  </figure>
                </div>
                <div className="media-right">
                  {!this.canModify() &&
                    <div>
                      <Link to={`/users/$${this.props.match.params.id}/edit`} className="button">Add to Friends</Link>
                    </div>
                  }
                </div>
                <div className="media-right">
                  {this.canModify() &&
                    <div>
                      <Link to={`/users/${this.props.match.params.id}/edit/`} className="button">Edit</Link>
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
              </div>
              <div className="media-content">
                <p className="title is-4">{this.state.user.username}</p>


                <p className="subtitle is-6">{this.state.user.email}</p>
              </div>

              <br />
              <div className="column is-four-fifths has-text-justified">
                <p className="title is-6">{this.state.user.bio}</p>
                <br />
              </div>
            </div>
          </div >
          <h1 className="title is-3">{this.state.user.username}'s Posts:</h1>
          <div className="all-posts is-users-posts">
            {
              this.state.user.post.map(post =>
                <div key={post._id} className=" ">
                  <div className="card-content-blog card ">
                    <div>
                      <Card {...post} />
                    </div>

                    <div>
                      <Link className="button is-info is-rounded" to={`/posts/${post.id}`}>Discuss </Link>
                    </div>
                    <br />
                  </div>
                </div>
              )}
          </div>
        </div >

        <div className="column">
        </div>
      </div >





    )
  }
}
export default Show