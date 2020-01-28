import React from 'react'
import axios from 'axios'
// import Flash from '../../lib/Flash'
// import Auth from '../../lib/Auth'
// import { Animated } from 'react-animated-css'
import { Link } from 'react-router-dom'
import Navbar from '../common/Navbar'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {},
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register/', this.state.data, { headers: { 'Authorization': '' } })
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    console.log(this.state)
    return (
      <div className=" has-text-centered" id="content-login">
        <div className="columns is-centered is-login">
          <div className="card-content">
            <form>
              <div className="field">
                <label className="label has-text-white">Username</label>
                <div className="control">
                  <input
                    className="input"
                    name="username"
                    placeholder="eg: blog25"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-white">Email</label>
                <div className="control">
                  <input
                    className="input"
                    name="email"
                    placeholder="eg: blog@blog.com"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.email && <div className="help is-danger">{this.state.errors.email}</div>}
              </div>
              <div className="field">
                <label className="label has-text-white">Password</label>
                <div className="control">
                  <input
                    className="input"
                    name="password"
                    type="password"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password && <div className="help is-danger">{this.state.errors.password}</div>}
              </div>
              <div className="field">
                <label className="label has-text-white">Password Confirmation</label>
                <div className="control">
                  <input
                    className="input"
                    name="password_confirmation"
                    type="password"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password_confirmation && <div className="help is-danger">{this.state.errors.password_confirmation}</div>}
              </div>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <button className="button is-info is-fullwidth " data-config-id="primary-action" onClick={this.handleSubmit}>Sign up!</button>
                </div>
                <div className="control is-expanded">
                  <button className="button is-bright is-outlined is-fullwidth" data-config-id="secondary-action"><Link to="/login" >Login</Link></button>
                </div>
              </div>
              <p className='has-text-white' data-config-id="terms">By signing in you agree with the <a className='has-text-grey' href="">Terms and Conditions</a> and <a className='has-text-grey' href="">Privacy Policy</a>.</p>
              {/* <button className="button is-dark" onClick={this.handleSubmit}>Submit</button> */}
            </form>
          </div>
        </div>
        <Navbar />
      </div>
    )
  }
}

export default Register
