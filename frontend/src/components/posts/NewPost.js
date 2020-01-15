import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Form from './Form'
import Auth from '../../lib/Auth'

import SideNav from '../common/SideBarNav'


class NewPost extends React.Component {


  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      articles: []
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

    const token = Auth.getToken()

    axios.post('/api/posts/', this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => console.log(token))
      .then(() => window.location.reload())
    // .catch(err => this.setState({ errors: err.response.data.errors }))

  }

  render() {
    console.log(this.state)
    return (
      <div className="columns" data-config-id="pricing_02">
        <div className="column">
          <SideNav />
        </div>
        <div className="column">

          <div className="container">

            <div className="">
              <Form
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                data={this.state.data}
                errors={this.state.errors}
              />
            </div>

          </div>
        </div>
        <div className="column">
        </div>
      </div>
    )
  }
}

export default withRouter(NewPost)