# [AmpCamp](https://ampcamp.herokuapp.com/#/)

AmpCamp is a heavy-metal themed music-sharing site where users can stream, and download music. Users primarily sign up as "listeners", but they can also sign up as "artists" if they intend to upload music of their own. 

AmpCamp is built with **ExpressJS, MongoDB, and Apollo GraphQL/React on the frontend.** Photos and audio files are stored on **Amazon Web Services (AWS).**

![Artist Show](./screenshots/artist.png)

## Features

   **Album Upload**
   
- Users that sign up as "artists" have the ability to upload songs/albums to AmpCamp
- On the album-upload page, users can create an album with a cover photo, a name, and a description. Users can alias the artist name on the album (it defaults to their username), and they can attach as many audio files (songs) as they would like. 
- Album upload page features a live preview of the album, displaying the cover photo, name, description, and list of songs. This updates in real time with user input. 
- Upon uploading the album, AmpCamp awaits the AWS file uploads (displaying a loading bar in the mean time), and then redirects to the current user's artist-show page so that they can view their newly-uploaded album. All of this makes for a seamless and intuitive UX/UI.

    **Album Upload Code -- custom upload async loop function**

      const uploadLoop = async () => {
        await asyncForEach(Object.values(this.state.tracks), async track => {
          const res = await this.uploadTrack(track);
          await this.props.newSong({
            variables: {
              title: track.title,
              audioUrl: res.data.audioUrl,
              album: newAlbum.data.newAlbum._id,
              artist: cUserId
            }
          });
        });
      };
      await uploadLoop();
      }

![Album upload](./screenshots/upload.png)

   **Search**

- AmpCamp uses a backend regex search to allow users to search for albums and artists. 
- Search suggestions are displayed in a dynamic drop-down consisting of links to respective artist and albums.

**Search Code**

The following code illustrates the use of RegExp to auto fill a search bar with search suggestions for albums or artists based on each key entered into the search bar, with a limit of 8 search results shown at a given time.

        const { albums, users } = data
     
        const value = e.target.value; 
        let sugs = [];
        const regex = new RegExp(`${value}`, 'i'); 


        if (albums) {
            if (value.length > 0) { 
                sugs = albums.filter(v => {
                    return regex.test(v.title)
                }).sort()
            }
            this.setState({ suggestions: sugs })

        }
        if (sugs.length === 0 && users) {
            if (value.length > 0) { 
                sugs = users.filter(v => {
                    return regex.test(v.username)
                }).sort()
            }

        }
        if (sugs.length > 8) {
            sugs = sugs.slice(0, 8)
        }

        this.setState({ suggestions: sugs })
    }

![Search](./screenshots/search.png)

   **Audio Player**
   
- AmpCamp features an audio player component in a fixed bottom nav so users can listen to music from anywhere in the app.
- Audio player moves as you scroll so it's easy to play/pause songs

    **React Audio Player Bottom Play Bar**

          const PlaybarNav = props => (
        <div className="audio-player-element">
          <div className="currently-playing-info-container">
            <img
            alt='albumcover'
              src={
                props.album
                  ? props.album.coverPhotoUrl
                  : props.song.album.coverPhotoUrl
              }
              className="mini-cover-photo"
            />
            <div className="currently-playing-artist-title">
              <span className="currently-playing-title">
                <p>{props.song.title}</p>
              </span>
              <span className="currently-playing-artist">
                {props.album ? props.album.by : props.song.album.by}
              </span>
            </div>
          </div>
          <div className="player-wrapper">
            <ReactAudioPlayer
              className="audio-player"
              src={props.song.audioUrl}
              style={playerStyle}
              controls
              autoPlay
              volume={0.03}
            />
          </div>
        </div>
      );

![Album show](./screenshots/album.png)
