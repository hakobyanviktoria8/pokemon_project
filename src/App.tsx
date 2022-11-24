import { useEffect, useState } from 'react';
import './App.css';
import Item from './components/item/Item';
import Pagination from './components/Pagination';

interface CompProps {
  name: string;
}

function App() {
  const [data, setData] = useState<CompProps[]>([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('');
  const[searchData, setSearchData] = useState<CompProps[]>([]);

  useEffect(()=>{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
    .then(res => res.json())
    .then(data => {
      setData(data.results)
      setLoading(true)
    })
    .catch(err => console.log(err))
  },[])

  const handleChange = (e: any) => {
    setSearchValue(e.target.value)
  }

  
  useEffect(() => {
    if(searchValue.length > 3) {
      setSearchData(data.filter(x=> x.name.includes(searchValue)))
    }
  }, [searchValue])
  
  return (
    <div className="App">
      <h1>List All Pokemons</h1>
      <div className='searchWrapper'>
        <input 
          type="search" 
          value={searchValue}
          placeholder="Search item..." 
          onChange={handleChange}
        />
      </div>

      {!loading && <h2>Loading data...</h2>}

      <div className='itemWrapper'>
        {
          (searchValue.length > 3 ? searchData : data)?.map((item, idx) => 
            <Item item={item} key={idx}/>
          )
        }
      </div>

      <Pagination />
    </div>
  );
}

export default App;
