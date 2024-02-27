import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState();

    useEffect(() => {
        async function FetchPizaa() {
            try {
                const { data } = await axios.get('https://65cb7a20efec34d9ed879c10.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('не пришел ответ с бэка');
                console.log('Error', error);
            }
        }

        FetchPizaa();
    }, [])

    if(!pizza){
        return 'загрузка...';   
    }

  return (
    <div className='container'>
        <img src={pizza.imageUrl} />
        <h3>{pizza.title}</h3>
        <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
