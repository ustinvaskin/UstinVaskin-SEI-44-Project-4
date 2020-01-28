import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Edit extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const token = Auth.getToken()
    axios.get(`/api/profile-all/${this.props.match.params.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    const token = Auth.getToken()
    axios.put(`/api/profile-all/${this.props.match.params.id}/`, this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push(`/users/${this.state.data.id}/`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    return (
      <div className="" id="content-login">
        <div className="columns is-centered is-login">
          <div className="card-content">
            <div>
              <h1 className="title is-3 has-text-white has-text-centered">Settings</h1>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label has-text-white ">Username</label>
                <div className="control">
                  <input
                    className="input"
                    name="username"
                    placeholder={this.state.data.username}
                    onChange={this.handleChange}
                    value={this.state.data.username || ''}
                  />
                </div>
                {this.state.errors.username && <div className="help is-danger">{this.state.errors.username}</div>}
              </div>
              <div className="field">
                <label className="label has-text-white ">Image</label>
                <div className="control">
                  <input
                    className="input"
                    name="profile_image"
                    placeholder="eg: some img"
                    onChange={this.handleChange}
                    value={this.state.data.profile_image || ''}
                  />
                </div>
                {this.state.errors.profile_image && <div className="help is-danger">{this.state.errors.profile_image}</div>}
              </div>
              <div className="field">
                <label className="label has-text-white ">Email</label>
                <div className="control">
                  <input
                    className="input"
                    name="email"
                    placeholder="eg: bookhead93@v-mail.com"
                    onChange={this.handleChange}
                    value={this.state.data.email || ''}
                  />
                </div>
                {this.state.errors.email && <div className="help is-danger">{this.state.errors.email}</div>}
              </div>
              <label className="label has-text-white ">Bio</label>
              <div className="control">
                <input
                  className="textarea"
                  name="bio"
                  placeholder="eg: booklhead93"
                  onChange={this.handleChange}
                  value={this.state.data.bio || ''}
                />
              </div>
              {this.state.errors.bio && <div className="help is-danger">{this.state.errors.bio}</div>}
              <div className="field">
                <label className="label has-text-white ">Password</label>
                <div className="control">
                  <input
                    className="input"
                    name="password"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password && <div className="help is-danger">{this.state.errors.password}</div>}
              </div>
              <div className="field">
                <label className="label has-text-white ">Password</label>
                <div className="control">
                  <input
                    className="input"
                    name="password_confirmation"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password_confirmation && <div className="help is-danger">{this.state.errors.password_confirmation}</div>}
              </div>
              <button type="submit" className="button is-black">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Edit
