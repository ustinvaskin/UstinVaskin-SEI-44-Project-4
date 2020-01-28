import React from 'react'
import axios from 'axios'
import Form from './FormEdit'
import Auth from '../../lib/Auth'
import SideNav from '../common/SideBarNav'

class Edit extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const token = Auth.getToken()

    axios.get(`/api/posts/${this.props.match.params.id}/`, { headers: { 'Authorization': `Bearer ${token}` } })
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
    axios.put(`/api/posts/${this.props.match.params.id}/`, this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    return (
      <div className="columns" data-config-id="pricing_02">
        <div className="column">
          <SideNav />
        </div>
        <div className="column">
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            data={this.state.data}
            errors={this.state.errors}
          />
        </div>
        <div className="column">
        </div>
      </div >
    )
  }
}

export default Edit
