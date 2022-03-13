import React, { Component, useEffect} from 'react'
import { Link, Navigate} from 'react-router-dom'
import NavigationPrompt from "react-router-navigation-prompt";

class SessionPage extends Component {
  constructor(props) { // the constructor is required to add state to the component
    super(props)
    this.state = {
      movies: [],
      seen: [],
      userID: '',
      session: '',
      show: {},
      matches: [],
      picking: true,
      yesDict: [],
      viewingMatches: true,
      matchesReached: false,
      stoppedPicking: false,
      returnHome: false
    }
    this.intervalID = 0
    this.fetchMovies = this.fetchMovies.bind(this)
    this.nextMovie = this.nextMovie.bind(this)
    this.updateMatches = this.updateMatches.bind(this)
    this.swapView = this.swapView.bind(this)
    this.swapResultsView = this.swapResultsView.bind(this)
    this.fetchResults = this.fetchResults.bind(this)
    this.callAnUpdate = this.callAnUpdate.bind(this)
    this.stopPicking = this.stopPicking.bind(this)
    this.closeSession = this.closeSession.bind(this)
    this.shuffleMovieList = this.shuffleMovieList.bind(this)
  }

  componentDidMount() {
    if(typeof this.props.location.data !== 'undefined') {
      // this page loads and we grab the userID (a string) and the session (the {} with all the info about the session)
      const { userID } = this.props.location.data
      const { session } = this.props.location.data

      // we set the state so that this.state.userID is the userID string and this.state.session is the {} with all the info about the session

      this.setState({
        userID: userID,
        session: session
      })

      // then we run fetchMovies

      this.fetchMovies()
    }

  }

  componentDidUpdate() {
    window.onbeforeunload = () => true
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID)
    window.onbeforeunload = null
  }

  swapView() {
    const changePicking = !this.state.picking
    this.setState({
      picking: changePicking,
      viewingMatches: true
    })
  }

  stopPicking() {
    this.setState({
      stoppedPicking: true
    })
  }

  swapResultsView() {
    console.log("swapping results view")
    const changeDetailView = !this.state.viewingMatches
    if(changeDetailView == false) {
      console.log("should be in detail view")
      this.fetchResults()
    }
    else {
      console.log("should be in match view")
    }
    this.setState({
      viewingMatches: changeDetailView
    })
  }

  shuffleMovieList(array) { // Fisher-Yates algorithm
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  async updateMatches(yes, yesID) {
  //  if(!this.state.picking) {
      console.log("updating matches")
      const { session } = this.props.location.data
      // get session using the {} that is in session prop
      // await API.graphql({ query: getSession, variables: {id: session.id}}).then(response => {
      //   var yesDict = response.data.getSession.yesDict
      //   var i;
      //   var newMatches = this.state.matches
      //   var newMatch = false
      //   var alreadyIn = false
      //   var thisMovieCount = 0
      //   if(yes && response.data.getSession.joinedUsers.length == 1) { // if there is only one user, it will always be a match
      //     newMatches.push(yesID)
      //     newMatch = true
      //     console.log("newMatch")
      //   }
      //   else if(yes && yesDict.length == 0) { // if there is more than one user and no one has said yes to anything yet
      //     newMatch = false
      //     //return
      //   }
      //   else { // if there is more than one user and there has been a yes already
      //     for(i = 0; i < yesDict.length; i++) { // loop through the yes'
      //       if(yes && yesDict[i]['movieID'] == yesID && yesDict[i]['count']+1 == response.data.getSession.joinedUsers.length) { // if they clicked "yes" and someone else has said yes and the count of tht movie (plus this user saying yes) is the joined users length, its a match
      //         newMatches.push(yesID)
      //         newMatch = true
      //         console.log("new match")
      //       }
      //       else if(!yes && !(this.state.matches.includes(yesDict[i]['movieID'])) && yesDict[i]['count'] == response.data.getSession.joinedUsers.length) {
      //         newMatches.push(yesDict[i]['movieID'])
      //         newMatch = true
      //         console.log("new match from no")
      //       }
      //     }
      //   }
      //   if(newMatch) {
      //     this.setState({
      //       matches: newMatches
      //     })
      //   }

      //   if(newMatches.length === response.data.getSession.maxMatches) {
      //     this.setState({
      //       matchesReached: true
      //     })
      //   }

      // })

  //  }
    //this.intervalID = setTimeout(this.updateMatches.bind(this), 2000)
  }

  fetchResults() {
    console.log("hello0000")
    const { session } = this.props.location.data
    // get session using the {} that is in session prop
    // API.graphql({ query: getSession, variables: {id: session.id}}).then(response => {
    //   const updatedYesDict = response.data.getSession.yesDict
    //   this.setState({
    //     yesDict: updatedYesDict
    //   })
    // })
  }

  fetchMovies() {
    //try {
      // when this runs, state does not seen to be set yet, so we grab the session again (the {})
      // we also grab the platform from the session info
      const { session } = this.props.location.data
      var i;
      var movieList = []
      console.log(session.platforms)
      // for(i = 0; i < session.platforms.length; i++) {
      //   API.graphql({ query: listMovies, variables: {filter: {platform: {eq: session.platforms[i]}}}}).then(response => {
      //     if(i > 0) // to help with efficiency. No real need to shuffle unless there are multiple platforms. Can change later on
      //       movieList = this.shuffleMovieList(movieList.concat(response.data.listMovies.items))
      //     else
      //       movieList = movieList.concat(response.data.listMovies.items)

      //     this.setState({
      //       movies: movieList,
      //       show: movieList[0],
      //       seen: [movieList[0]]
      //     })
      //   })
      // }

      // const platform1 = session.platforms[0]
      // API.graphql({ query: listMovies, variables: {filter: {platform: {eq: platform1}}}}).then(response => {
      //   var movieList = response.data.listMovies.items
      //   var i;
      //   for(i = 1; i < session.platforms.length; i++) {
      //     API.graphql({ query: listMovies, variables: {filter: {platform: {eq: session.platforms[i]}}}}).then(response2 => {
      //       console.log(response2)
      //       movieList = movieList.concat(response2.data.listMovies.items) // concat returns a new array, does not change the existing one
      //     })
      //     if(i === session.platforms.length - 1) {
      //       this.setState({
      //         movies: movieList,
      //         show: movieList[0],
      //         seen: [movieList[0]]
      //       })
      //       console.log(movieList)
      //     }
      //   }
      //
      // })
      // we then get a list of movies that are on that platform
      // we then set the state so that this.state.movies is that list of movies, this.state.show is the {} of the current movie, and this.state.seen includes this movie
      // API.graphql({ query: listMovies, variables: {filter: {platform: {eq: platform1}}}}).then(response => {
      //   const movieList = response.data.listMovies.items
      //   this.setState({
      //     movies: movieList,
      //     show: movieList[0],
      //     seen: [movieList[0]]
      //   })
      // })
    //} catch (err) { console.log('error fetching movies') }
  }

  async nextMovie(x) {
    // this runs when they click yes or no
    // we again grab the session and userID bc the state was not set apparently
    // matched is set to false as an initial value
    const { session } = this.props.location.data
    const { userID } = this.props.location.data
    var matched = false
    var i = 0
    // if they say yes, we get the user, and add the current movie in show to their movie list
    // if(x === 1) {
    //   await API.graphql({ query: updateUser, variables: {input: {id: userID, currentYes: this.state.show.id}}}).then(response => {
    //     console.log("Updated user")
    //   })
    //   this.updateMatches(true, this.state.show.id)
    // }
    // else {
    //   console.log("no")
    //   this.updateMatches(false, "")
    // }

   try {
    for(var j = 1; j < this.state.movies.length; j++)
    {
      if ( !(this.state.seen.indexOf(this.state.movies[j]) >= 0) ) // if the user has not already seen this movie
      {
        this.setState({
          show: this.state.movies[j],
          seen: this.state.seen.concat(this.state.movies[j])
        })
        //setSeen([...seen, movies[i]])
        return
      }
    }
    this.setState({
      show: { name: "No more movies to show"}
    })
    this.callAnUpdate() // if and when a user reached the end of the movie list, every 8 seconds we will check for any new matches that were created
    //this.swapView()
    } catch (err) { console.log('error displaying a movie') }
  }

  callAnUpdate() { // edge case where someone reaches end of list
    if(this.state.picking) {
      this.updateMatches(false, "")
      this.intervalID = setTimeout(this.callAnUpdate.bind(this), 5000)
    }
  }

  closeSession() {
    if(window.confirm("Click OK to close this session. You will not be able to return to this screen.")) {
      console.log("closing session...")
      this.setState({
        returnHome: true
      })
    }
  }

  render() {
    //const { userID } = this.props.location.data
    //const { sessionID } = this.props.location.data
    const { host } = this.props.location.data
    console.log(host)
    if(typeof this.props.location.data === 'undefined' || this.state.returnHome) {
      return (
        <Navigate to= '/' />
      )
    }

    if(!this.state.picking) { // viewing matches/results
      if(!this.state.viewingMatches) { // viewing detailed results
        const yesDictList = this.state.yesDict
        return (
          <div style = {styles.container}>
            <NavigationPrompt when = {true} message = {(location) => location.pathname === '/session'} />
            <h1>Movie Picker</h1>
            <button style = {styles.button} onClick = {() => this.swapResultsView()}>Back to Matches</button>
            <button style = {styles.button} onClick = {() => this.fetchResults()}>Refresh</button>
            <h2>Detailed Results</h2>
            {yesDictList.map(pair => <div><p style={styles.todoName}>{pair.movieID}</p><p stlye={styles.todoDescription}>{pair.count} votes</p></div>)}

            {/*{ this.state.viewDetailedResults ? null : null }*/}
            {(this.state.matchesReached || this.state.stoppedPicking && host)  ? <button style = {styles.button} onClick = {() => {this.closeSession()}}>Close Session</button> : null}

          </div>
        )

      //}
      //<button style = {styles.button} onClick = {this.swapResultsView()}>Matches</button>

      }
      else { // viewing matches
        const listMatches = this.state.matches.map((m) => <div key={m}>{m}</div>)
        console.log(listMatches)
        return (
          <div style = {styles.container}>
            <NavigationPrompt when = {true} message = {(location) => location.pathname === '/session'} />
            <h1>Movie Picker</h1>
            {(this.state.matchesReached || this.state.stoppedPicking) ? <button style = {styles.button} onClick = {() => this.swapResultsView()}>See Detailed Results</button> : null}
            <button style = {styles.button} onClick = {() => this.updateMatches(false, "")}>Refresh</button>
            <h2>Matches</h2>
            <div>{listMatches}</div>
            {/*{ this.state.viewDetailedResults ? null : null }*/}
            {(this.state.matchesReached || this.state.stoppedPicking) ? <button style = {styles.button} onClick = {() => {this.closeSession()}}>Close Session</button> : <button style = {styles.button} onClick = {() => {this.swapView()}}>Back to Picking</button>}
            {host ? <button style = {styles.button} onClick = {() => {this.stopPicking()}}>Stop the Picking</button> : null}
          </div>
        )
      }
    }
    else { // viewing picking screen
      if(this.state.matchesReached || this.state.stoppedPicking) { // viewing picking screen when max matches reached
        return (
          <div style = {styles.container}>
            <NavigationPrompt when = {true} message = {(location) => location.pathname === '/session'} />
            <h1>Movie Picker</h1>
            <button style = {styles.button} onClick = {() => {this.swapView()}}>View Matches</button>
            {this.state.matchesReached ? <p>Max number of matches reached!</p> : <p>The Host has stopped the picking.</p>}
            <p>Click on the button above to continue.</p>
          </div>
        )
      }
      else { // viewing picking screen and (max matches not reached or not stopped picking by host)
        return (
          <div style = {styles.container}>
            <NavigationPrompt when = {true} message = {(location) => location.pathname === '/session'} />
            <h1>Movie Picker</h1>
            {/*}<h3>{this.state.numOfMatches} / {this.state.session.maxMatches}</h3>*/}
            <button style = {styles.button} onClick = {() => {this.swapView()}}>{this.state.matches.length}/{this.state.session.maxMatches}</button>
            <p>{this.state.show.name}</p>
            <p>{this.state.show.platform}</p>
            <p>{this.state.show.year}</p>
            <button style = {styles.button} onClick = {() => {this.nextMovie(1)}}>Yes</button>
            <button style = {styles.button} onClick = {() => {this.nextMovie(0)}}>No</button>
          </div>
        )
      }
    }
  }
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { outline: 'none', fontSize: 18, padding: '12px 0px', marginBottom: 10  }
}

export default SessionPage


          // if(!(this.state.matches.includes(yesDict[i]['movieID'])) && yesDict[i]['count'] == response.data.getSession.joinedUsers.length) {
          //   newMatches.push(yesDict[i]['movieID'])
          //   newMatch = true
          //   console.log("new match!")
          // }

// OLD IF X == 1
// await API.graphql({ query: getUser, variables: {id: userID}}).then(response => {
//   var newMovies = []
//   console.log(this.state.show)
//   if(!response.data.getUser.movies)
//     newMovies = [this.state.show.id]
//   else
//     newMovies = response.data.getUser.movies.concat(this.state.show.id)
//   API.graphql({ query: updateUser, variables: {input: {id: userID, movies: newMovies}}})
// })
// // then, we go through each user in the session that is not them, and if any of their movie lists do not include the current movie, set matched to false and exit the loop
// while(i < session.joinedUsers.length) {
//   if(session.joinedUsers[i] != userID) {
//     matched = true
//     await API.graphql({ query: getUser, variables: {id: session.joinedUsers[i]}}).then(response => {
//       //console.log(response.data.getUser.movies)
//       if(response.data.getUser.movies.length === 0 || !(response.data.getUser.movies.includes(this.state.show.id))) {
//         matched = false
//         i = session.joinedUsers.length
//       }
//     })
//   }
//   i++
// }
// if(matched) {
//   // CURRENTLY CANNOT UPDATE SESSION WITH A LIST OF MATCHES UNLESS THEY ARE STRINGS (i.e. just the id)
//   // MAYBE WE CAN HAVE THE LIST OF MOVIES IN A JSON FILE IN S3 THEN LOAD THE DATABASE WITH THAT
//   // BUT THEN HOW DO WE UPDATE THE DB WHEN NEW MOVIES COME??
//
//   // if there is a match, add the id of this match to the session's matches list
//   var newMatches = []
//   if(session.matches.length !== 0) {
//     if(!session.matches.includes(this.state.show))
//       newMatches = session.matches.concat(this.state.show)
//   }
//   else
//     newMatches = [this.state.show]
//   await API.graphql({ query: updateSession, variables: {input: {id: session.id, matches: newMatches}}})
//   console.log("this is a match")
// }
// else {
//   console.log("this is not a match")
// }



// function displayAMovie() {
//   try {
//     for(var i = 0; i < movies.length; i++)
//     {
//       if ( !(seen.indexOf(movies[i]) >= 0) ) // if the user has not already seen this movie
//       {
//         setShow(movies[i])
//         setSeen([...seen, movies[i]])
//         return
//       }
//     }
//     setShow({ name: "No more movies to show"})
//   } catch (err) { console.log('error displaying a movie') }
// }
