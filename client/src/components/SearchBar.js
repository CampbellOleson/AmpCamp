import React from 'react'
import { Query } from "react-apollo";
import Queries from '../graphql/queries'
import './SearchBar.css'
import { Link } from 'react-router-dom'
const { FETCH_ALBUMS } = Queries

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.items = [
            'Eat ass volume 1',
            'album 2',
            'album 3',
            'album 4',
            'album 5',
            'Zebra adventures of Sally Paste',
            'Back to the thunk',
            'action creator, shmaction greator'
        ]
        this.state = {
            suggestions: null,
            test: false
        }

        this.renderSuggestions = this.renderSuggestions.bind(this)
    }

    onTextChanged = (e, data) => { // add data 
        const { albums } = data
        if (albums) {
            const value = e.target.value; // current value of search bar
            let sugs = [];
            if (value.length > 0) { // if there are letters in search bar...
                const regex = new RegExp(`${value}`, 'i'); // ?
                sugs = albums.filter(v => {
                    return regex.test(v.title)
                }).sort()
            }
            this.setState({ suggestions: sugs })
            this.setState({ test: !this.state.test })

            // set local state to trigger rerender
        }
    }



    renderSuggestions() {

        if (!this.state.suggestions || this.state.suggestions.length === 0) {
            return null
        }

        return ( // can i map over this.state.suggestions
            <ul className='search-completer'>

                <div className="autofill-item-container">
                    {this.state.suggestions.map((item) => {
                        return (
                            <Link to={`/artists/${item.by}`}>
                                <div className="autofill-item">
                                    <img src={item.coverPhotoUrl} />
                                    <div className="autofill-artist-info">
                                        <li>{item.title}</li>
                                        <li>{item.by}</li>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    }
                </div>
            </ul>
        )
    }

    render() {
        return (
            <div>
                <Query query={FETCH_ALBUMS}>
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

