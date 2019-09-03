import React from 'react'

import { Query } from "react-apollo";
import Queries from '../graphql/queries'
import Autosuggest from 'react-autosuggest'
const { FETCH_ALBUMS } = Queries

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.filterResults = this.filterResults.bind(this)
    }

    componentDidMount() {

    }

    filterResults() {

    }

    render() {

        return (
            <div>

                <Query query={FETCH_ALBUMS}>
                    {({ loading, errors, data }) => {
                        console.log(data)

                        return (
                            <div className="search-completer">
                                <input type="text" className="nav-search" placeholder="find some killer music YO"></input>
                                <ul>
                                    <li>Test Album by Tony Smith Mcfishumz</li>
                                    <li>Test Album by Tony Smith Mcfishumz</li>
                                    <li>Test Album by Tony Smith Mcfishumz</li>
                                </ul>
                            </div>

                        )


                    }
                    }

                </Query>

            </div>
        )
    }
}

export default SearchBar