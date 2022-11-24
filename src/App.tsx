import { useEffect, useState } from 'react';
import './App.css';
import Item from './components/item/Item';

interface CompProps {
  name: string;
  url: any;
}

function App() {
  const [data, setData] = useState<CompProps[]>([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('');
  const[searchData, setSearchData] = useState<CompProps[]>([]);
  const [page, setPage] = useState(0)

  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=16&offset=${page}`)
    .then(res => res.json())
    .then(data => {
      setData(data.results)
      setLoading(true)
    })
    .catch(err => console.log(err))
  }, [page])

  const handleChange = (e: any) => {
    setSearchValue(e.target.value)
  }
  
  useEffect(() => {
    if(searchValue.length > 3) {
      setSearchData(data.filter(x=> x.name.includes(searchValue)))
    }
  }, [searchValue])
  
  const handleChangePage = (num: number) => {
    if(page >= 0) {
      setPage(prev=> prev + num)
    } 
  } 

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
            <Item name={item.name} url={item.url} key={idx}/>
          )
        }
      </div>

      <div className='pagination'>
        <button disabled={page===0} onClick={()=>handleChangePage(-1)}>prev</button>
        <span>{page}</span>
        <button disabled={data.length < 16} onClick={()=>handleChangePage(1)}>next</button>
      </div>
    </div>
  );
}

export default App;
