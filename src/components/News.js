import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Process from './Process';
import PropTypes from 'prop-types'

export class News extends Component {
    articles=[
    ]
    static defaultProps={
      country:"in",
      pageSize:8,
      category:"general"
    }
    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category: PropTypes.string
    }
        constructor(){
            super();
            console.log("Hello i am a constructor from news component");
            this.state={
               articles:this.articles,
               loading:false,
               page:1
            }
        }

        async componentDidMount(){
         console.log("cdm");
         let url=`https://newsapi.org/v2/top-headlines?sources&country=${this.props.country}&category=${this.props.category}&apiKey=14721ee006f24a238acf60b2cdf25048&page=1&pageSize=${this.props.pageSize}`;
         this.setState({loading:true});
         let data=await fetch(url);
         let parsedData=await data.json()
         console.log(parsedData);
         this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})


        }
        handleprevious= async ()=>{
          console.log("previous");
          let url=`https://newsapi.org/v2/top-headlines?sources&country=${this.props.country}&category=${this.props.category}&apiKey=14721ee006f24a238acf60b2cdf25048&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
          this.setState({loading:true})
          let data=await fetch(url);
          let parsedData=await data.json()
          console.log(parsedData);
          
           this.setState({
            page:this.state.page-1,
            articles:parsedData.articles,
            loading:false
           })
          
        }
        handlnext= async ()=>{
          if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {console.log("i am if")
          }else{
          console.log("next");
          let url=`https://newsapi.org/v2/top-headlines?sources&country=${this.props.country}&category=${this.props.category}&apiKey=14721ee006f24a238acf60b2cdf25048&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
          this.setState({loading:true})
          let data=await fetch(url);
          let parsedData=await data.json()
          console.log(parsedData);
          
           this.setState({
            page:this.state.page+1,
            articles:parsedData.articles,
            loading:false
           })
        }}

  render() {
    return (
      <div className='container my-1'>
        <h2 className='text-center my-4'>NewsDungeon-Top Headlines</h2>
        {this.state.loading && <Process className="text-center"/>}
       <div className='row my-4 mx-2' >
         {!this.state.loading && this.state.articles.map((Element)=>{
            return  <div className='col-md-4' key={Element.url}>
             <NewsItem title={Element.title} description={Element.description} url={Element.url} imgUrl={Element.urlToImage} author={Element.author} date={Element.publishedAt} source={Element.source.name}/>
            
        
         </div>
             })}
      </div>
      <div className="container d-flex justify-content-between">
      <button type="button" disabled={this.state.page<=1} class="btn btn-dark" onClick={this.handleprevious}>&larr; Previous</button>
      <div><b>Page={this.state.page}</b></div>
      <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} class="btn btn-dark" onClick={this.handlnext}>Next &rarr;</button>
      </div>

      </div>
      
    )
  }
}

export default News
