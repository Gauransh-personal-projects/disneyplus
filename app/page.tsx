import MoviesCarousel from "@/components/MoviesCarousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/lib/getMovies";
import CarouselBannerWrapper from "@/components/ui/CarouselBannerWrapper";

export default async function Home() {
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main>

      <CarouselBannerWrapper /> 

      <div className="flex flex-col space-y-2 xl:-mt-48">
        <MoviesCarousel movies={upcomingMovies} title="Upcoming" />
        <MoviesCarousel movies={topRatedMovies} title="Top Rated" />
        <MoviesCarousel movies={popularMovies} title="Popular Movies" />
      </div>
    </main>
  );
}
