type Props = {
  params: {
    id: string
  }
  searchParams: {
    genre: string
  }
}

function GenrePage({params: {id}, searchParams: {genre}}: Props) {
  return (
    <div>
      Welcome to the genre with id: {id} and name: {genre}
    </div>
  )

  //localhost:3000/genre/80?genre=action
}

export default GenrePage
