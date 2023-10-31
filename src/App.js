import { FaSistrix } from "react-icons/fa6";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoHeartCircleSharp } from "react-icons/io5";
import { TbLetterT } from "react-icons/tb";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://us-central1-ss-devops.cloudfunctions.net/GraphQL",
  cache: new InMemoryCache(),
});

const GET_FAVORITE_BOOKS = gql`
  query FavoriteBooks {
    favoriteBooks {
      name
      author {
        id
      }
      cover
    }
  }
`;
function ContainerFavoriteBooks() {
  const { loading, error, data } = useQuery(GET_FAVORITE_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.favoriteBooks.map(({ name, cover }) => (
    <div>
      <h3>{name}</h3>
      <img alt="location-reference" src={`${cover}`} />
      <br />
    </div>
  ));
}

const GET_FAVORITE_ARTISTS = gql`
  query FavoriteArtists {
    favoriteAuthors {
      name
      picture
    }
  }
`;
function ContainerFavoriteArtists() {
  const { loading, error, data } = useQuery(GET_FAVORITE_ARTISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.favoriteAuthors.map(({ name, picture }) => (
    <div>
      <h3>{name}</h3>
      <img alt="location-reference" src={`${picture}`} />
      <br />
    </div>
  ));
}

const GET_ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      name
      author {
        id
      }
      cover
    }
  }
`;

function ContainerAllBooks() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.allBooks.map(({ name, cover }) => (
    <div>
      <h3>{name}</h3>
      <img alt="location-reference" src={`${cover}`} />
      <br />
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div class="container-fluid">
          <header className=" App-header">
            <div class="row d-flex  align-items-center justify-content-center ">
              <h1 class="col  align-items-right">
                SS<span>BOOK</span>
              </h1>
              <div
                class="col-6 d-flex justify-content-center align-items-center"
                id="searcher"
              >
                <input
                  type="text"
                  class="col txtSearcher"
                  placeholder="Busque um livro"
                />
                <button class="col-1 align-items-right">
                  <FaSistrix class="icons" />
                </button>
              </div>
              <div class="col d-flex align-items-center justify-content-center ">
                <IoAddCircleSharp class="icons" />
                <h6>Adicionar</h6>
              </div>
              <div class="col d-flex align-items-center justify-content-center ">
                <IoHeartCircleSharp class="icons" />
                <h6>Favoritos</h6>
              </div>
              <div
                class="col d-flex align-items-center justify-content-center"
                id="username"
              >
                <TbLetterT class="icons " id="photoUser" />
                <h6>Thiago</h6>
              </div>
            </div>
          </header>
        </div>
        <main>
          <nav class="nav nav-justified nav-fill">
            <div class="container-fluid">
              <div class="row d-flex align-items-center justify-content-center ">
                <ul>
                  <li class="col-1 d-flex align-items-center justify-content-center">
                    <h5>Meus Livros</h5>
                  </li>
                  <li class="col-1 d-flex align-items-center justify-content-center">
                    <h5>Emprestados</h5>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <section class="favoriteBooks">
            <h3>Livros Favoritos</h3>
            <h6>ver todos</h6>
            <ContainerFavoriteBooks />
          </section>
          <div class="favoriteArtistsAndLibrary">
            <section class="favoriteArtists">
              <h3>Artistas Favoritos</h3>
              <ContainerFavoriteArtists />
            </section>
            <section class="Library">
              <h3>Biblioteca</h3>
              <ul>
                <li>Todos</li>
                <li>Romance</li>
                <li>Aventura</li>
                <li>Comédia</li>
              </ul>

              <ContainerAllBooks />
            </section>
          </div>
        </main>
        <footer>
          <h1 class="logo">SS Book</h1>
          <div>
            <h6>Todos os direitos reservados.</h6>
            <h6>Studio Sol Books 2023</h6>
          </div>
        </footer>
      </ApolloProvider>
    </div>
  );
}

export default App;
