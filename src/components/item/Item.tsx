import { useEffect, useState } from "react";
import "./Item.css";

interface ComponentProps {
  name: string;
  url: any;
}

interface CopmPropsData {
  img: {
    sprites: {
      back_default: string;
    };
  };
  species: {
    name: string;
  };
  stats: {
    length: number;
  };
  types: {
    0: {
      slot: number;
    };
  };
  weight: number;
  moves: {
    length: number;
  };
  sprites: {
    front_default: string;
  };
}

function Item({ name, url }: ComponentProps) {
  const [fillData, setFillData] = useState<CopmPropsData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFillData(data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, [name]);

  return (
    <div className="item">
      <h2>{name}</h2>
      <img src={fillData?.sprites.front_default} />
      {!loading ? (
        <h4>Loading...</h4>
      ) : (
        <>
          <p>Species: {fillData?.species.name}</p>
          <p>Stats: {fillData?.stats.length}</p>
          <p>Types: {fillData?.types[0].slot}</p>
          <p>Weight: {fillData?.weight}</p>
          <p>Moves: {fillData?.moves.length}</p>
        </>
      )}
    </div>
  );
}

export default Item;
