import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'
import SideNav from '../common/SideBarNav'
// import qs from 'query-string'
// import genres from '../../lib/genres'
import ChatNew from './NewChat'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      chats: []
    }
  }
  componentDidMount() {
    axios.get('/api/chats/', { headers: { 'Authorization': '' } })
      .then(res => this.setState({ chats: res.data }))
  }

  render() {
    console.log(this.state.chats)
    return (
      <div className="columns" data-config-id="pricing_02">
        <div className="column">
          <SideNav />
        </div>
        <div className="column">
          <div className="Post-New-Main">
            <ChatNew />
            <div className="all-posts">
              <div className="columns">
              </div>
              {
                this.state.chats.map(chats =>
                  <div key={chats._id} className=" ">
                    <div className="columns">
                      <div className=" card is-chat column">
                        <Card {...chats} />
                      </div>
                      <div className="column is-down">
                        <Link className="button is-light is-rounded" to={`/chats/${chats.id}`}>Message </Link>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div >
        <div className="column">
        </div>
      </div >
    )
  }
}

export default Main
