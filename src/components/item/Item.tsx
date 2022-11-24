import { useEffect, useState } from 'react'
import "./Item.css";

interface ComponentProps {
    item: any;
} 

interface CopmPropsData {
    img: {
        sprites: {
            back_default: string
        }
    }
    species: {
        name: string
    };
    stats: {
        length: number
    };
    types: {
        0: {
            slot: number
        }
    };
    weight: number;
    moves: {
        length: number
    };
    sprites: {
        front_default: string;
    };
}

function Item({item}: ComponentProps) {
    const [fillData, setFillData] = useState<CopmPropsData>()
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        fetch(item?.url)
        .then(res => res.json())
        .then(data => {
            setFillData(data)
            setLoading(true)
        })
        .catch(err => console.log(err))
      },[])
      
  return (
    <div className='item'>
        <h2>{item.name}</h2>
        <img src={fillData?.sprites.front_default}/>
        {!loading ? 
        <h4>Loading...</h4>
        :
        <>
            <p>Species: {fillData?.species.name}</p>
            <p>Stats: {fillData?.stats.length}</p>
            <p>Types: {fillData?.types[0].slot}</p>
            <p>Weight: {fillData?.weight}</p>
            <p>Moves: {fillData?.moves.length}</p>
        </>
        }
    </div>
  )
}

export default Item