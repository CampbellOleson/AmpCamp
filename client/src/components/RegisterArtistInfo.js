
import React from 'react'
import './RegisterArtistInfo.css'

const RegisterArtistInfo = (props) => {

    return (
        <div>
            {/* <div className="register-artist-banner">

            <div className='register-info-container'>
<p>AmpCamp for Artists
Fans have paid artists $412 million USD using Bandcamp, and $7.5 million in the last 30 days alone.

Why, dear musician friend, are you not yet yourself twirling with arms spread beneath this gentle shower of silver and gold? Read on and be further convinced, or simply…
                </p>
            </div>
     

            <img className="register-banner-image" src="crowd1.jpg"/>
            <button>Sign Up Now</button>

        
                <img id="blackground" src="black.jpg" />
                <div className="register-button-container"></div>
            </div> */}


            <div className="info-banner">
                <div className="info-banner__cta__container">
                    <div className="info-banner__cta">
                        <h1 className="info-banner__cta__heading">AmpCamp for Artists</h1>
                        <p className="info-banner__cta__paragraph">Fans have paid artists $412 million USD using AmpCamp, and $7.5 million in the last 30 days alone.</p>
                        <p className="info-banner__cta__paragraph">Why, dear musician friend, are you not yet yourself twirling with arms spread beneath this gentle shower of silver and gold? Read on and be further convinced, or simply…</p>
                        <button onClick={e => { e.preventDefault(); props.history.push('/register') }} className="info-banner__cta__button">Sign Up Now</button>
                    </div>
                </div>
            </div>


            <div className="register-artist-container">

                <div className="register-artist--item">
                    <img src="ampcamp1.png" />


                    <h3>The Best Fan Experience</h3>
                    <p>
                        Fans want to support the artists they love,
                        you just have to give them direct and
                        compelling ways to do so.
                         On AmpCamp, fans can listen to your music, decide if they like it, and if so,
                         pay you directly for it. They then get unlimited streaming access via the
                         free AmpCamp app for Android, iOS and Sonos, plus an optional high-quality download.
                     </p>
                </div>



                <div className="register-artist--item">

                    <h3>Dead-Simple Pre-orders</h3>
                    <p>
                        Setting up pre-orders on AmpCamp couldn’t be easier.
                        You can give fans one or more tracks immediately when they pre-order,
                         and then when you release your record, the full album appears instantly
                         in their collection in the AmpCamp app (we also notify your fans via email,
                           and provide a link to the high-quality download). And yep,
                           we automatically report your pre-sales to the respective music charts, too.
                       </p>
                    <br />
                    <br />
                    <h3>Search Engine Optimized</h3>
                    <p>
                        When fans Google your AmpCname, track titles or lyrics,
                         they should find you, not lyriczzzbay.com or iMyFace.
                          Why should some other site get first crack at engaging,
                           and ultimately, profiting from, your fans? We grease
                            up your SEO slicker than pomade-dipped velour, so you
                             may claim your rightful place at the top of Google results.
                         </p>
                    <br />
                    <br />


                </div>

                <div className="register-artist--item">
                    <img src="ampcamp5.png" />
                    <h3>Real-time Statistics</h3>
                    <p>
                        AmpCamp’s rich, up-to-the-instant stats system reveals who’s linking to you,
                             where your music is embedded, which tracks are most and least popular,
                              what’s being purchased and when, which search terms and blogs are sending
                               fans your way, and what you ate for breakfast on January 4th, 1993
                               (Lucky Charms? That's a lot of sugar!). Use the data for the pure,
                                ego-stroking thrill of it all, or to jump in the conversation
                                and stoke the fires of your fandom.
                        </p>
                </div>

                <div className="register-artist--item">
                    <p>
                        <h3> Total Artist Control, Total Flexibility</h3>
                        Charge whatever price for your music you choose, and change it
                         whenever you like. Sell for a fixed price, specify a
                          minimum and let fans pay more if they want (and yes, they do pay more,
                            a whopping 50% of the time), or give your music away in exchange
                            for an email address. You retain complete control over your customer
                            information, just as you damn well should.
                        </p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <img src="ampcamp3.png" />
                </div>


                <div className="register-artist--item">
                    <img src="ampcamp6.png" />
                    <h3> Physical and Digital, Side-by-Side</h3>
                    <p>
                        Bundle your digital music with your vinyl, posters, tickets,
                            t-shirts… you name it. For example, you can create an LP +
                             digital package and your fans get your music instantly --
                              no code redemption awkwardness, and no having to wait for the
                               physical record to arrive. Or sell tickets to your next show
                                with the digital of your latest album included (we’ll even
                                   automatically generate your door list).
                           </p>
                </div>




                <div className="register-artist--item">
                    <h3>Please the Audiophiles</h3>
                    <p>
                        While many are content to stream your music, a vocal minority of
                            hardcore fans still demand high-quality download formats like FLAC
                            and Apple Lossless. We make it easy to keep them happy: you upload a
                             single lossless file (WAV, AIFF or FLAC) and we lovingly convert it
                              to every conceivable format under the sun.
                      </p>

                    <br />
                    <br />

                    <p>
                        <h3>Reporting to music charts</h3>
                        We submit sales reports to SoundScan (North America), ARIA Charts
                             (Australia), OfficialCharts (UK), and The Official
                             New Zealand Music Charts each and every week, so go
                             ahead and set your sights on The Hot 100. American Idol
                              Redux, Season 47: The Album, watch out!
                      </p>

                    <br />
                    <br />


                    <h3> Sell in (Just About) Any Currency</h3>
                    <p>
                        Price your goods in U.S. Dollars, Pounds Sterling,
                         Canadian Dollars, Euros, Australian Dollars, Israeli New Sheqels,
                          or any of 12 other currencies.
                      </p>
                </div>


                <div className="register-artist--item">
                    <h3>AmpCamp Pro</h3>
                    <p>
                        Our Pro service offers several great additional features,
                        including batch upload for queueing up an entire album’s
                         worth of material at a time, private streaming for giving
                         the press exclusive access to unreleased tracks and albums,
                         ad-free video hosting for presenting your videos in brilliant
                          quality side-by-side with your music and merchandise, custom
                          domains for a touch of added professionalism, and deeper stats
                          including Google Analytics integration and the location of
                           paying fans down to the city.
                    </p>


                    <br />
                    <b />
                    <br />
                    <h3>Breeze Through Order Fulfillment</h3>
                    <p>
                        If you’re selling merchandise through AmpCamp,
                            we provide a streamlined fulfillment interface
                            from which you can see all your orders at a glance,
                             print shipping labels and packing slips, mark orders
                              as shipped and automatically notify the recipient,
                               or filter by package type, date, or shipped status.
                                You can even invite other members of your team to
                                 use the fulfillment backend without granting them
                                 access to the rest of your site (put those interns to work!).
                         </p>
                </div>





                <div className="register-artist--item">
                    <img src="ampcamp4.png" />

                    <h3>Gorgeous, Clean Players</h3>
                    <p>
                        AmpCamp gives you, your fans and the press a bevy of sharp,
                        customizable music players to embed across the web.
                         Showcase your cover art, photos of your merch, and if you're Pro,
                         even your videos. They’re simple, effective, and completely
                          focused on driving sales
                      </p>
                </div>




                <div className="register-artist--item">
                    <h3>Discount Codes</h3>
                    <p>
                        Discounts codes let you... wait for it... offer your loyal fans
                        direct discounts on their purchases!

                        As an AmpCamp artist, you have the ability to generate discount codes on any
                       of your selected products, distribute them however you
                         like (email, Twitter, word-of-mouth), and then fans enter the code
                          during checkout to apply the discount.
                       </p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    
                    <img src="ampcamp2.png" />
                </div>
            </div>
        </div>
    )
}

export default RegisterArtistInfo