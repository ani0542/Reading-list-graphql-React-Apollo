import React, { Component } from 'react';

import {getBooksQuery} from '../queries/Queries'
import { graphql } from 'react-apollo';
import BookDetails from './BookDetails';



class BookList extends Component {

    state={
        selected:null
    }
    
    displayBooks(){
       var data=this.props.data;
       if(data.loading){
           return(
               <div>Loading.....</div>
           )
       }
       else{
           return(
               data.books.map((value)=>{
                   return <li key={value.id} onClick={(e)=>this.setState({ selected: value.id })}> {value.name} </li>
               })
           )
       }
    }
    render(){
        // console.log(this.props);
        return(
            <div>
                <ul id="book-list">
                         <li className='list-unstyled'>{this.displayBooks()}</li>
                </ul>
                <BookDetails bookId={ this.state.selected }/>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);