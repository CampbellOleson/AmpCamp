import React from 'react'
import './HomePageFeature.css'
import FeaturedArtists from './FeaturedArtists'


class HomePageFeature extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                
                <div className="featured-master-container">
                    <div className="featured-container">
                        <div className="featured-photo">
                            <img id="test" src="./metallica.jpg" />
                        </div>
                        <div className="featured-stack">
                            <div><img id="test" src="./metallica.jpg" /></div>
                            <div><img id="test" src="./metallica.jpg" /></div>
                            <div><img id="test" src="./metallica.jpg" /></div>
                        </div>
                        
                    </div>
                </div>
                <FeaturedArtists/>
            </div>
        )
    }

}

export default HomePageFeature
