import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
// import SecureRoute from './components/common/SecureRoute'
import FlashMessages from './components/common/FlashMessages'

import Home from './components/common/Home'
// import Navbar from './components/common/Navbar'
import Team from './components/common/Team'
import Main from './components/common/Main'
import PostShow from './components/posts/Show'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserShow from './components/users/Show'
import PostEdit from './components/posts/Edit'
import MainChat from './components/chats/MainChat'
import ChatShow from './components/chats/ChatShow'
import UserEdit from './components/users/Edit'

import 'bulma'
import './style.scss'

class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <HashRouter>
        <FlashMessages />
        <Switch>
          <Route path="/login" component={Login} />

          <Route path="/register" component={Register} />
          <Route path="/main" component={Main} />
          <Route path="/chats/:id" component={ChatShow} />
          <Route path="/chats" component={MainChat} />
          <Route path="/users/:id/edit" component={UserEdit} />
          <Route path="/users/:id" component={UserShow} />
          <Route path="/posts/:id" component={PostShow} />
          <Route path="/posts/:id/edit" component={PostEdit} />
          <Route path="/team" component={Team} />
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)



