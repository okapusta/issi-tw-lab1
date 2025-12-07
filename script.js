function Movie(title, year, actors) {
  var id = Math.random();

  return {
    id,
    title,
    year,
    actors
  }
}

function Movies() {
  var list = [];

  function addMovie(movie) {
    list.push(movie);
  }

  function removeMovie(movieId) {
    var toBeRemoved = list.findIndex(function (el) {
      return el.id === movieId;
    });
    list.splice(toBeRemoved, 1);
  }

  return {
    list,
    addMovie,
    removeMovie,
  }
}

var movies = new Movies()

// Convenience methods
function getInputValue(target, name) {
  return target.querySelectorAll(`input[name='${name}']`)[0].value;
}

// Event listeners
function onAddMovie(event) {
  event.preventDefault();
  var title = getInputValue(event.target, 'title');
  var year = getInputValue(event.target, 'year');
  var actors = getInputValue(event.target, 'actors');

  var movie = new Movie(title, year, actors);
  movies.addMovie(movie);
  renderMovies();
}

function onDeleteMovies() {
  var moviesToDelete = document.querySelectorAll("input[type='checkbox']:checked");
  moviesToDelete.forEach(function(movie) {
    movies.removeMovie(movie.id);
  });
  renderMovies();
}

// Bindings
var form = document.getElementById("add-movie-form");
if (form) {
  form.addEventListener("submit", onAddMovie);
} else {
  console.error("Failed to bind submit event");
}

// Initialize movies
var matrix = new Movie("The Matrix", "1999", "Keanu Reeves, Laurence Fishbourne")
var indiana = new Movie("Indiana Jones", "1989", "Harrison Ford, Sean Connery")
var casino = new Movie("Casino Royale", "2006", "Daniel Craig, Eva Green")

movies.addMovie(matrix);
movies.addMovie(indiana);
movies.addMovie(casino);


// Render movie list
var movieContainer = document.getElementById('movie-list');

function renderMovies() {
    // Clean container
    movieContainer.innerHTML = '';
    // Add movies
    movies.list.forEach(function(movie) {
    var li = document.createElement("li");
    li.innerHTML = `<input type='checkbox' data-id='${movie.id}'> ${movie.title}, ${movie.year}, ${movie.actors}`;
    movieContainer.appendChild(li);
  });
}

renderMovies();
