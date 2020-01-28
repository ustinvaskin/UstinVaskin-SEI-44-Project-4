import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from '../posts/Card'
import SideNav from './SideBarNav'
import PostNew from '../posts/NewPost'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    axios.get('/api/posts/', { headers: { 'Authorization': '' } })
      .then(res => this.setState({ posts: res.data }))
  }

  render() {
    console.log(this.state.posts)
    return (
      <div className="columns" data-config-id="pricing_02">
        <div className="column">
          <SideNav />
        </div>
        <div className="column">
          <div className="Post-New-Main">
            <PostNew />
            <div className="all-posts">
              {this.state.posts.map(posts =>
                <div key={posts._id} className=" ">
                  <div className="card-content-blog card">
                    <Card {...posts} />
                    <div>
                      <Link className="button is-info is-rounded" to={`/posts/${posts.id}`}>Discuss </Link>
                    </div>
                    <br />
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="NewsFeed">
            <iframe src="https://feed.mikle.com/widget/v2/122779/?preloader-text=Loading" height="652px" width="100%" class="fw-iframe" scrolling="no" frameborder="0"></iframe>
          </div>
        </div>
      </div >
    )
  }
}

export default Main
