import MoviesListItem from "../pages/movies/components/MoviesListItem/MoviesListItem";
import { render } from "@testing-library/react";

describe("MoviesListItem", () => {
  const moviesListItemProps = {
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
  };

  it("renders the title and overview of the movie", () => {
    const { getByText } = render(<MoviesListItem {...moviesListItemProps} />);

    expect(getByText(moviesListItemProps.title)).toBeInTheDocument();
    expect(getByText(moviesListItemProps.overview)).toBeInTheDocument();
  });

  it("renders the movie poster", () => {
    const { getByAltText } = render(
      <MoviesListItem {...moviesListItemProps} />
    );

    expect(getByAltText(moviesListItemProps.title)).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${moviesListItemProps.poster_path}`
    );
  });
});
