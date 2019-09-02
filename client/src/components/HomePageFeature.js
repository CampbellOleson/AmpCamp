import React from 'react'
import './HomePageFeature.css'

const HomePageFeature = () => {

    return (
        <div className="featured-master-container">

            <div className="featured-container">

                <div className="featured-photo">
                    <img id="test" src="./metallica.jpg" />
                </div>


                <div className="featured-stack">
                    <ul>
                        <li> <img id="test" src="./metallica.jpg" /></li>
                        <li>  <img id="test" src="./metallica.jpg" /></li>
                        <li>  <img id="test" src="./metallica.jpg" /></li>


                    </ul>
                </div>
            </div>
        </div>

    )
}

export default HomePageFeature