import MoviesCarousel from '@/components/MoviesCarousel';
import { getPopularMovies, getSearchedMovies } from '@/lib/getMovies';
import { notFound } from 'next/navigation'

type Props = {  
    params: {
        term: string
    }
}

async function Searchpage({params: {term}}: Props ) {

    if (!term) notFound();

    const termToUSe = decodeURI(term);

    // API call to get the searched movies
    const movies = await getSearchedMovies(termToUSe);

    // API call to get the popular movies
    const popularMovies = await getPopularMovies();

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex flex-col space-y-4 mt-32 xl:mt-42'>
                <h1 className='text-6xl font-bold px-10'>Results for {termToUSe}</h1>

                {/* AI Suggestion */}

                <MoviesCarousel movies={movies} title="Movies" isVertical />
                <MoviesCarousel movies={popularMovies} title="You may also like" />
            </div>
        </div>
    )
}

export default Searchpage;
