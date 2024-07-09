"use client";

import { Movie } from "@/typings";
import MovieCard from "./MovieCard";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
};

function MoviesCarousel({ title, movies, isVertical }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        top: isVertical ? 300 : 0,
        left: isVertical ? 0 : 300,
        behavior: "smooth",
      });
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        top: isVertical ? -300 : 0,
        left: isVertical ? 0 : -300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative z-50">
      <h2 className="text-xl font-bold px-10 py-2">{title}</h2>

      <div className="relative">
        <div
          ref={carouselRef}
          className={cn(
            "flex space-x-4 overflow-scroll scrollbar-hide",
            isVertical ? "flex-col space-x-0 space-y-12" : "px-16 py-5"
          )}
        >
          {isVertical ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className={cn(
                  isVertical &&
                    "flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5"
                )}
              >
                <MovieCard movie={movie} />
                <div className="max-w-2xl">
                  <p className="font-bold">
                    {movie.title} ({movie.release_date?.split("-")[0]})
                  </p>
                  <hr className="mb-3" />
                  <p>{movie.overview}</p>
                </div>
              </div>
            ))
          ) : (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>

        {!isVertical && (
          <>
            <button
              className="absolute top-5 left-2 bottom-5 bg-black bg-opacity-0 text-white p-2 w-14 flex items-center justify-center"
              onClick={prevSlide}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute top-5 right-2 bottom-5 bg-black bg-opacity-0 text-white p-2 w-16 flex items-center justify-center"
              onClick={nextSlide}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MoviesCarousel;