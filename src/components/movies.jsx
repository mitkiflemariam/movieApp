import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black p-3 rounded-full cursor-pointer z-50 opacity-80 hover:opacity-100"
    onClick={onClick}
  >
    <FaChevronLeft className="text-white text-2xl" />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black p-3 rounded-full cursor-pointer z-50 opacity-80 hover:opacity-100"
    onClick={onClick}
  >
    <FaChevronRight className="text-white text-2xl" />
  </div>
);

function Movies() {
  const apiKey = "fd3311ecfd2af752b2fea9aad18cbd0b";
  const apiUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");

    if (storedMovies) {
      setData(JSON.parse(storedMovies));
    } else {
      fetchMovies();
    }
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const json = await response.json();
      setData(json.results);
      localStorage.setItem("movies", JSON.stringify(json.results));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = (id) => {
    const updatedMovies = data.filter((movie) => movie.id !== id);
    setData(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full m-auto bg-white">
      <div className="mt-20 px-4">
        <h1 className="text-2xl font-bold text-center mb-6">Movie List</h1>
        {data.length > 0 ? (
          <Slider {...settings}>
            {data.map((d) => (
              <div
                key={d.id}
                className="bg-white h-[590px] text-black shadow-lg"
              >
                <div className="bg-white h-[500px] text-black shadow-lg rounded-xl">
                  <div className="flex justify-center items-center rounded-t-xl">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
                      alt={d.title || d.original_name}
                      className="w-full h-[400px] object-cover rounded-t-xl"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4 p-4 bg-gray-200">
                    <p className="text-xl font-semibold">
                      {d.title || d.original_name}
                    </p>
                    <p className="text-center text-sm text-gray-700">
                      {d.overview.length > 100
                        ? d.overview.substring(0, 100) + "..."
                        : d.overview}
                    </p>
                    <div className="flex flex-row items-center justify-center gap-4 mt-2">
                      <button className="bg-yellow-600 text-white text-lg px-6 py-2 rounded-xl shadow-md hover:bg-yellow-700 transition">
                        Order
                      </button>
                      <button
                        className="bg-red-600 text-white text-lg px-6 py-2 rounded-xl shadow-md hover:bg-red-700 transition"
                        onClick={() => deleteMovie(d.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-lg font-semibold text-gray-700">
            No movies available.
            <button
              className="bg-red-600 text-white text-lg px-6 py-2 rounded-xl shadow-md hover:bg-red-700 transition"
              onClick={() => fetchMovies()}
            >
              Movies
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Movies;
