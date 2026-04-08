require("dotenv").config({ quiet: true });
const axios = require("axios")

const TMDB_API_KEY = process.env.TMDB_API_KEY;
// console.log(process.argv);

const args = process.argv.slice(2);
// console.log(args)

// const type = args[1]
// console.log(type)
const hyphenTypeIndex = args.indexOf("--type")
const type = args[hyphenTypeIndex+1]

const allowedTypes = {
    playing: "now_playing",
    popular: "popular",
    top: "top_rated",
    upcoming:"upcoming"
}

//https://www.geeksforgeeks.org/javascript/how-to-check-a-key-exists-in-javascript-object/
if (type in allowedTypes) {
    //https://www.browserstack.com/guide/axios-get-request
    axios.get(`https://api.themoviedb.org/3/movie/${allowedTypes[type]}`, {
        headers:{
            Authorization: `Bearer ${TMDB_API_KEY}`,
            accept:"application/json"
        }
    }).then(response=>{
        // console.log(response.data.results[0])
        const movies = response.data.results.slice(0,5);
        movies.forEach((movie,i) => {
            console.log(`${i + 1}. ${movie.title} (${movie.release_date}) ; Vote Average: ${movie.vote_average}`)
        })
    }).catch(error=>{
        console.error("Error fetching data:", error.message)
    })
} else {
    console.log("please run command again with valid request (playing, popular, top, upcming)")
}