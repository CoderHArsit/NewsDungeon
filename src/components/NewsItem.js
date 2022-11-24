import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imgUrl,url,author,date,source}=this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
     
  <img src={imgUrl?imgUrl:"https://media.gettyimages.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=gi&k=20&c=G5uPfn2VTF3aXCr76pn1T7oWE-aHVQ0rAYMl_MK2OvM="} className="card-img-top" alt="..."/>
  <div className="card-body">

    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toLocaleTimeString()}</small></p>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
    <a href={url} target="_blank" className="btn btn-primary">read more </a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
