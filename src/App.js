import { FaSistrix } from "react-icons/fa6";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoHeartCircleSharp } from "react-icons/io5";
import { TbLetterT } from "react-icons/tb";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://us-central1-ss-devops.cloudfunctions.net/GraphQL',
  cache: new InMemoryCache()
})

const GET_FAVORITE_BOOKS = gql`
  query MinhaQuery{
    favoriteBooks{
      name
      author {
        id
      }
      cover

    }
  }
`
const ContainerFavoriteBooks = ({children}) => (
  <div class="favoriteBooks">{children}</div>
)





function App() {
  const {loading, data} = useQuery(GET_FAVORITE_BOOKS)
  
  if(loading) return <ContainerFavoriteBooks>Carregando...</ContainerFavoriteBooks>
  
  

  return (
    <div className="App">
      <ApolloProvider client={client}>

      
      <header className="App-header">
       <h1 class="logo">SS Book</h1>
        <div class="searcher">
            <input type="text" class="txtSearcher" placeholder="Busque um livro"/>
            <button><FaSistrix/></button>
        </div>
        <div class="add">
          <IoAddCircleSharp/>
          <h6>Adicionar</h6>
        </div>
        <div class="favorite">
          <IoHeartCircleSharp/>
          <h6>Favoritos</h6>
        </div>
        <div class="profile">
          <TbLetterT/>
          <h6>Thiago</h6>
        </div>
      </header>
      <main>
        <section class="tabs">
          <ul>
            <li>
              <h5>Meus Livros</h5>    
            </li>
            <li>
              <h5>Emprestados</h5>
            </li>
          </ul>
        </section>
        <section class="favoriteBooks">
          <h3>Livros Favoritos</h3>
          <h6>ver todos</h6>
          <ContainerFavoriteBooks>
            {data.favoriteBooks.map((item, index) => (
              <div class="coverFavoriteBooks">
                <img src="item.cover"></img>
                <div class="nameFavoriteBooks">
                  <h5>item.name</h5>
                </div>
                <div class="authorFavoriteBooks">
                  <h5>item.author.id</h5>
                </div>
              </div>
              
            )
              
            )}
          </ContainerFavoriteBooks>
          {/* Desenvolver lista com a API*/}
        </section>
        <div class="favoriteArtistsAndLibrary">
          <section class="favoriteArtists">
            <h3>Artistas Favoritos</h3>
            {/* Desenvolver lista com a API*/}
          </section>
          <section class="Library">
            <h3>Biblioteca</h3>
            <ul>
              <li>Todos</li>
              <li>Romance</li>
              <li>Aventura</li>
              <li>Comédia</li>
            </ul>
            {/*Desenvolver lista com a API*/}
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
