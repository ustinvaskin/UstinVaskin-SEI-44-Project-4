import React from 'react'
import axios from 'axios'
import Flash from '../../lib/Flash'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

class Home extends React.Component {
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

    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        Flash.setMessage('success', res.data.message)
        this.props.history.push('/')
      })
      .catch(() => this.setState({ error: 'Invalid credentials' }))
  }

  render() {
    console.log(this.state)
    return (
      <section data-section-id="1" data-component-id="15a7_4_03_awz" data-category="content" className="section-home">
        <div className="columns is-vcentered">
          <div className="column is-home-image">
            <div className="columns is-centered">
              <div className="column is-carusel">
                <div className="container-is">
                  <div className="cube">
                    <div className='front'>  <h1 className="title is-2 has-text-white is-massive">CREATE</h1></div>
                    <div className='back'><h1 className="title is-2 has-text-white is-massive">TALK DISCUSS</h1></div>
                    <div className='left'><h1 className="title is-2 has-text-white is-massive">COMMUNICATE YOU</h1></div>
                    <div className='right'><h1 className="title is-2 has-text-white is-massive">SHARE NEWS</h1></div>
                    <div className='top'><h1 className="title is-2 has-text-white is-massive">LIVE NEWS</h1></div>
                    <div className='bottom'><h1 className="title is-2 has-text-white is-massive">LOVE CHAT</h1></div>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" data-interval="2000">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="level-item">
                        <div className=""><i className="fas fa-pen-square fa-3x" style={{ color: 'white' }} style={{ color: 'white' }}></i></div>
                        <h4 className="title is-4 has-text-white">Create</h4>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="level-item">
                        <div className=""><i className="fas fa-users fa-3x" style={{ color: 'white' }}></i></div>
                        <h4 className="title is-4 has-text-white">Collaborate</h4>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="level-item">
                        <div className=""><i className="fas fa-comments fa-3x" style={{ color: 'white' }}></i></div>
                        <h4 className="title is-4 has-text-white">Communicate</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="level" data-config-id="steps">
            </div>
          </div>
          <div className="column is-home-choice">
            <h2 className="title has-text-centered has-text-left" data-config-id="header">Welcome to:</h2>
            <h2 className="title is-big has-text-centered has-text-danger" data-config-id="header"><i className="fab fa-quinscape"></i>GEN</h2>
            <br />
            <h2 className="title is-spaced " data-config-id="subheader">Say Hello!</h2>
            <p className="subtitle" data-config-id="description">See what’s happening in the world right now
            </p>
            <br />
            <div className="columns is-centered">
              <a className="button is-info is-rounded" data-config-id="info-action">{<Link to="/login">Login</Link>}</a>
              <a className="button is-bright is-rounded" data-config-id="info-action">{<Link to="/register">Register</Link>}</a>
            </div>
          </div>
        </div>
        <Navbar />
      </section >
    )
  }
}

export default Home
