import React from 'react'
import { Query } from "react-apollo";
import Queries from '../graphql/queries'
import './SearchBar.css'
import { Link } from 'react-router-dom'
const { FETCH_ALBUMS_AND_ARTISTS } = Queries

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestions: null
        }

        this.renderSuggestions = this.renderSuggestions.bind(this)
        this.closeSuggestions = this.closeSuggestions.bind(this)
    }
    onTextChanged = (e, data) => { // add data 
        document.addEventListener('click', () => {
            this.setState({ suggestions: '' })
        })

        const { albums, users } = data
        const value = e.target.value; // current value of search bar
        let sugs = [];
        const regex = new RegExp(`${value}`, 'i'); // creates the pattern to search the text input for, 'i' specified that it ignore casing


        if (albums) {

            if (value.length > 0) { // if we have letters in the search bar
                sugs = albums.filter(v => {
                    return regex.test(v.title)
                }).sort()

            }
            this.setState({ suggestions: sugs })

        }
        if (sugs.length === 0 && users) {
            if (value.length > 0) { // if we have letters in the search bar
                sugs = users.filter(v => {

                    return regex.test(v.username)
                }).sort()
            }
            this.setState({ suggestions: sugs })
        }
    }

    closeSuggestions() {
        this.setState({ suggestions: '' })
    }

    renderSuggestions() {
        if (!this.state.suggestions || this.state.suggestions.length === 0) {
            return null
        }

        return ( 
            <ul className='search-completer'>
                <div className="autofill-item-container">
                    {this.state.suggestions.map((item) => {
                        console.log(item)
                        if (item.title) {
                            return (
                                <Link to={`/artist/${item.artist._id}`} onClick={this.closeSuggestions}>
                                    <div className="autofill-item">
                                        <img src={item.coverPhotoUrl} />
                                        <div className="autofill-artist-info">
                                            <li>{item.title}</li>
                                            <li>{item.by}</li>
                                        </div>
                                    </div>
                                </Link>
                            )
                        } else {

                            return (
                                <Link to={`/artist/${item._id}`} onClick={this.closeSuggestions}>
                                    <div className="autofill-item">
                                        <li id="artist-first-letter">{item.username[0].toUpperCase()}</li>
                                        <div className="autofill-artist-info">
                                            <li>{item.username}</li>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    })
                    }
                </div>
            </ul>
        )
    }

    render() {
        return (
            <div>
                <Query query={FETCH_ALBUMS_AND_ARTISTS}>
                    {({ loading, errors, data }) => {
                        if (data) {
                            return (
                                <div>
                                    <div className="search-container">
                                        <input
                                            onChange={(e) => { this.onTextChanged(e, data) }} // how to take in e and data 
                                            type="text"
                                            className="search-bar"
                                            placeholder="Search and Discover Music" />
                                    </div>
                                    {this.renderSuggestions()}
                                </div>
                            )
                        }
                    }}
                </Query>
            </div>
        )
    }

}

export default SearchBar


            // 1) query not fetching data. 
            // 2) passing in additional argument to onTextChanged of data

