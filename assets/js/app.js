const cl = console.log
const showModalBtn = document.getElementById('showModalBtn');
const backdrop = document.getElementById('backdrop');
const movieModal = document.getElementById('movieModal');
const closeModal = [...document.querySelectorAll('.closeModal')];
const movieForm = document.getElementById('movieForm');
const movieTitleControl = document.getElementById('movieTitle');
const imgUrlControl = document.getElementById('imgUrl');
const OverViewControl = document.getElementById('overView');
const ratingControl = document.getElementById('rating');
const movieContainer = document.getElementById('movieContainer');


let moviesArr = [
    {
        movieTitle: 'Love Story',
        imgUrl: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
        rating: '5',
        OverView: 'A Christian Zumba instructor falls in love with a starry-eyed upper caste Hindu girl. In their quest for happiness, however, they must first overcome a massive caste divide',
        movieId: '"82ba8f7b-0fb7-407a-0408-9608dd323c58"'
    }

]

const templatingOffMovieCrds = (arr) => {
    let result = '';
    arr.forEach(movie => {
        result += `
 <div class="col-md-3">
    <div class="card">
     <figure class="movieCrd">
          <img src="${movie.imgUrl}" alt=${movie.movieTitle}>
         <figcaption>
           <div class="titleInfo">
             <div class="row">
                 <div class="col-10">
                     <h4>${movie.movieTitle}</h4>
                 </div>
                 <div class="col-2">
                     <span class="${setClassRating( movie.rating)}">${movie.rating}</span>
                 </div>
             </div>
           </div>
           <div class="overView">
              <h5>Movie Modal Test</h5>
              <p>="${movie.OverView}"</p>
           </div>
         </figcaption>
     </figure>
 </div>
</div>
        `
        cl(movie)
    });
    movieContainer.innerHTML = result;
}
templatingOffMovieCrds(moviesArr)


const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0 * 3) | 0 * 8;
        return value.toString(16);
    });
}

function setClassRating(rating) {
    if (rating <= 2) {
      return "bg-danger";
    } else if (rating > 3 && rating < 4) {
      return "bg-warning";
    } else {
      return "bg-success";
    }
  }
  
const movieModalHandler = () => {
    backdrop.classList.toggle('active')
    movieModal.classList.toggle('active')
}

const onMovieAdd = (eve) => {
    eve.preventDefault();
    //we get a new Movie Object
    let newMovieObj = {
        movieTitle: movieTitleControl.value,
        imgUrl: imgUrlControl.value,
        overView: OverViewControl.value,
        rating: ratingControl.value,
        movieId: generateUuid()

    }
    cl(newMovieObj);

    //send movie to DB
    moviesArr.push(newMovieObj)

    //form reset
    movieForm.reset()
    //we will show in UI
    templatingOffMovieCrds(moviesArr)

    movieModalHandler();
}
showModalBtn.addEventListener('click', movieModalHandler);

closeModal.forEach(ele => {
    ele.addEventListener('click', movieModalHandler)
});

movieForm.addEventListener("submit", onMovieAdd)





//show functionality
// const showModalHandler = () => {
//     backdrop.classList.add('active')
//     movieModal.classList.add('active')
// }
// const hideModalHandler = () => {
//     backdrop.classList.remove('active')
//     movieModal.classList.remove('active')
// }
