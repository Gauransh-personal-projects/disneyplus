import { notFound } from 'next/navigation'

type Props = {  
    params: {
        term: string
    }
}

function Searchpage({params: {term}}: Props ) {

    if (!term) notFound();

    const termToUSe = decodeURI(term);

    // API call to get the searched movies

    // API call to get the popular movies

    return (
        <div>
        Welcome to the search page: {termToUSe}
        </div>
    )
}

export default Searchpage;
