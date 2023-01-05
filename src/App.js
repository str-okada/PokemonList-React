import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card';

function App() {
  const initailURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData,setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // get all pokemon
      let res = await getAllPokemon(initailURL);

      // get details
      loadPokemon(res.results);
      // console.log(res.results);
      // console.log(res);
      setLoading(false);
    }
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemon = await Promise.all(
    data.map((pokemon) => {
      // console.log(pokemon);
      let pokemonRecord = getPokemon(pokemon.url);
      return pokemonRecord;
    })
    )
    setPokemonData(_pokemon);
  }
  console.log(pokemonData)

  return (
    <div className="App">
      {loading ? (
        <h1>Loading</h1>
      ) : (<>
        <div className='pokemonCardContainer'>
        {
          pokemonData.map((pokemon, i)=>{
            // return <div>Pokemon</div>;
            return <Card key={i} pokemon={pokemon}></Card>
          })
        }
        </div>
      </>
      )}
    </div>
  );
}

export default App;
