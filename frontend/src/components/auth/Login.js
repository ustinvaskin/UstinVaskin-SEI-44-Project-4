import React from 'react'
import axios from 'axios'
import { Animated } from 'react-animated-css'
import Flash from '../../lib/Flash'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

import Navbar from '../common/Navbar'

class Login extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      error: ''
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

    axios.post('/api/login/', this.state.data, { headers: { 'Authorization': '' } })
      .then(res => {
        Auth.setToken(res.data.token)
        Flash.setMessage('success', res.data.message)
        this.props.history.push('/main')
      })
      .catch(() => this.setState({ error: 'Invalid credentials' }))
  }

  render() {
    console.log(this.state)
    return (


      <div className=" has-text-centered" id="content-login">
        <div className="columns is-centered is-login">

          <div className="card-content">
            <form>
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
                  {this.state.error && <div className="help is-danger">{this.state.error}</div>}
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <div className="control is-expanded">
                    <button className="button is-info is-fullwidth" data-config-id="primary-action" onClick={this.handleSubmit}>Sign up!</button>
                  </div>
                </div>

              </div>
              <p className='has-text-white'>Don't have an account?</p>
              <button className="button is-bright is-fullwidth" data-config-id="secondary-action">{<Link to="/register" >Register</Link>}</button>
            </form>
          </div>
        </div>


        <Navbar />
      </div >



    )
  }
}

export default Login
