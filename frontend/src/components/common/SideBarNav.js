import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'


class SideNav extends React.Component {
  constructor() {
    super()
    this.state = {
      active: false
    }
    this.logout = this.logout.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }
  toggleActive() {
    this.setState({ active: !this.state.active })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ active: false })
    }
  }
  render() {
    return (

      <div className="sidenav">
        <Link to="/main" className="navbar-item"><i className="fas fa-rss"></i>Feed</Link>
        <br />
        <br />
        {Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().sub}`} className="navbar-item"><i className="fas fa-user-alt"></i>Profile</Link>}
        {Auth.isAuthenticated() && <Link to="/chats/" className="navbar-item"><i className="fas fa-comments"></i>Chats</Link>}
        <br />
        <br />
        {Auth.isAuthenticated() && <Link to="#" className="navbar-item"><i className="fas fa-users"></i>Friends<p className="subtitle is-6 has-text-centered">Coming Soon</p></Link>}
        {Auth.isAuthenticated() && <Link to="#" className="navbar-item"><i className="fas fa-bookmark"></i>Bookmarks<p className="subtitle is-6 has-text-centered">Coming Soon</p></Link>}
        <br />
        <br />
        <Link to="/" className="navbar-item"><i className="fas fa-home"></i>Home</Link>
        <br />
        <br />
        <div>
        </div>
        {!Auth.isAuthenticated() && <Link to="/register" className=" button is-bright is-rounded "><i className="fas fa-registered"></i>Register</Link>}
        <br />
        {Auth.isAuthenticated() && <a className="button is-bright is-rounded has-text-centered" onClick={this.logout}><i className="fas fa-sign-out-alt"></i>Logout</a>}
        <br />
        {!Auth.isAuthenticated() && <Link to="/login" className="button is-bright is-rounded "><i className="fas fa-sign-in-alt"></i>Login</Link>}
        <br />
        <Link to="/" className="title is-3 has-text-centered has-text-danger" data-config-id="header"><i className="fab fa-quinscape"></i>GEN</Link>
      </div >
    )
  }
}

export default withRouter(SideNav)
