
import React, { Component } from 'react';

import { graphql } from 'react-apollo';

import {flowRight as compose} from 'lodash';

import {getAuthorsQuery,addBookMutation,getBooksQuery} from '../queries/Queries'


class AddBook extends Component {
    state={
        name:'',
        genre:'',
        authorId:''
    }
    displayAuthors(){
       
        var data = this.props.getAuthorsQuery;
        // console.log(this.props);
        if(data.loading){
            return( <option disabled>Loading authors....</option> );
        } else {
            return data.authors.map(author => {
                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
  }
    handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(this.state)


        
        // use the addBookMutation
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    render(){
    //    console.log(this.props)
      
        return(
            <div>
                     <form id="add-book" onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label>Book name:</label>
                                <input type="text" name='name' onChange={this.handleChange} value={this.state.name} />
                            </div>
                            <div className="field">
                                <label>Genre:</label>
                                <input type="text" name='genre' onChange={this.handleChange} value={this.state.genre}/>
                            </div>
                            <div className="field">
                                <label>Author:</label>
                                <select name='authorId' onChange={this.handleChange} value={this.state.authorId}>
                                    <option style={{cursor:"pointer"}}>Select author</option>
                                     {this.displayAuthors()}
                                </select>
                            </div>
                             <button>+</button>

            </form>
            </div>
        );
    }
}



export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);




























