import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'


class Navbar extends React.Component {
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
      <nav className="navbar is-fixed-bottom">
        <div className="navbar-brand">
          <Link to="/" >
            {/* <img className="logo" src="https://i.imgur.com/cCvPghk.png" /> */}
          </Link>
          <a role="button" className={`navbar-burger${this.state.active ? ' is-active' : ''}`}
            onClick={this.toggleActive}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div>
        </div>
        <div className={`navbar-menu${this.state.active ? ' is-active' : ''}`}>
          <div className="navbar-start">
            <Link to="/" className="navbar-item"><i className="fas fa-home"></i>Home</Link>
            <Link to="/main" className="navbar-item"><i className="fas fa-rss"></i>Feed</Link>
            {Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().sub}`} className="navbar-item"><i className="fas fa-user-alt"></i>Profile</Link>}

            {/* <Link to="/stories" className="navbar-item">Story collection</Link>
            
            {Auth.isAuthenticated() && <Link to="/books/new" className="navbar-item">Add a new book</Link>} */}
            {Auth.isAuthenticated() && <Link to="/chats/" className="navbar-item"><i className="fas fa-comments"></i>Chats</Link>}


            {Auth.isAuthenticated() && <Link to="#" className="navbar-item"><i class="fas fa-grip-lines-vertical"></i><i class="fas fa-grip-lines-vertical"></i><i class="fas fa-grip-lines-vertical"></i>Coming Soon:</Link>}

            {Auth.isAuthenticated() && <Link to="#" className="navbar-item"><i className="fas fa-users"></i>Friends</Link>}

            {Auth.isAuthenticated() && <Link to="#" className="navbar-item"><i className="fas fa-bookmark"></i>Bookmarks</Link>}
          </div>
          <div className="navbar-end">
            {/* {Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().sub}`} className="navbar-item"><i className="fas fa-user-alt"></i>Profile</Link>} */}
            {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item"><i className="fas fa-registered"></i>Register</Link>}
            {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item"><i className="fas fa-sign-out-alt"></i>Login</Link>}
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}><i className="fas fa-sign-out-alt"></i>Logout</a>}
          </div>
        </div>
      </nav >
    )
  }
}

export default withRouter(Navbar)
