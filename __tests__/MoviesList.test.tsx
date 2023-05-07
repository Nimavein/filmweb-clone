import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import MoviesList from "../pages/movies/components/MoviesList";

describe("MoviesList", () => {
  const movies = [
    {
      id: 1,
      original_language: "English",
      original_title: "Movie 1",
      overview: "Movie 1 Description",
      popularity: 7.8,
      poster_path: "/movie1-poster.jpg",
      release_date: "2021-09-01",
      title: "Movie 1",
      video: "https://www.youtube.com/watch?v=123456",
      vote_average: 8.5,
      vote_count: 1000,
    },
    {
      id: 2,
      original_language: "Spanish",
      original_title: "Movie 2",
      overview: "Movie 2 Description",
      popularity: 6.9,
      poster_path: "/movie2-poster.jpg",
      release_date: "2021-09-02",
      title: "Movie 2",
      video: false,
      vote_average: 7.4,
      vote_count: 500,
    },
    {
      id: 3,
      original_language: "French",
      original_title: "Movie 3",
      overview: "Movie 3 Description",
      popularity: 8.2,
      poster_path: "/movie3-poster.jpg",
      release_date: "2021-09-03",
      title: "Movie 3",
      video: "https://www.youtube.com/watch?v=654321",
      vote_average: 9.0,
      vote_count: 1500,
    },
  ];

  it("renders without crashing", () => {
    render(<MoviesList movies={movies} />);
  });

  it("renders a list of movies", () => {
    const { getAllByRole } = render(<MoviesList movies={movies} />);
    const moviesList = getAllByRole("listitem");
    expect(moviesList.length).toEqual(3);
  });

  it("renders each movie with correct props", () => {
    const { getByText } = render(<MoviesList movies={movies} />);
    movies.forEach((movie) => {
      expect(getByText(movie.title)).toBeInTheDocument();
      expect(getByText(movie.overview)).toBeInTheDocument();
    });
  });
});
