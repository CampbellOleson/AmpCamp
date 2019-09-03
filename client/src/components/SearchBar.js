import React from 'react'

import { Query } from "react-apollo";
import Queries from '../graphql/queries'

const { FETCH_SONGS } = Queries

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
                <Query query={FETCH_SONGS}>
                    {({ loading, errors, data }) => {
                        console.log(data)

                        return (

                            <input type="text"
                                className="nav-search"
                                placeholder="HELLO THERE" />

                        )
                    }
                    }
                </Query>
            </div>
        )
    }
}

export default SearchBar