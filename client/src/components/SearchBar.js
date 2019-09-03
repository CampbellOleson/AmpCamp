import React from 'react'
import { Query } from "react-apollo";
import Queries from '../graphql/queries'
import Autosuggest from 'react-autosuggest'
import './SearchBar.css'
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
            suggestions: [],

        }

        this.renderSuggestions = this.renderSuggestions.bind(this)
    }

    onTextChanged = (e) => {

        const value = e.target.value; // current value of search bar
        let suggestions = [];
        let val;

        if (value.length > 0) { // if there are letters in search bar...
            const regex = new RegExp(`^${value}`, 'i'); // ?

            suggestions = this.items.sort().filter(v => regex.test(v));

        }
        this.setState(() => ({ suggestions }));
    }

    renderSuggestions(queryResults) {
        const { suggestions } = queryResults;
        if (suggestions.length === 0) {
            return null
        }
        console.log(suggestions)
        return (
            <ul className='search-completer'>
                {suggestions.map((item) => <li>{item}</li>)}
            </ul>
        )
    }

    render() {
        let queryResult
        return (
            <Query query={FETCH_ALBUMS}>
                {({ loading, errors, data }) => {


                    return (
                        queryResult = { data }
                        console.log(queryResult)
                        < div >
                        <div className="search-container">
                            <input
                                onChange={this.onTextChanged}
                                type="text"
                                className="search-bar"
                                placeholder="find sick music!" />
                            {this.renderSuggestions(queryResult)}
                        </div>
                        </div>
            )
        }}
            </Query>
        )
    }

}

export default SearchBar