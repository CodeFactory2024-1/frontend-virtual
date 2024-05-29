import { useEffect, useState } from 'react';

export function useFetch(url){

    const [dataVuelos, setDataVuelos] = useState(null);
    useEffect(()=>{
       fetch(url,{mode:'cors'})
        .then(response =>response.json()).then((dataVuelos)=>setDataVuelos(dataVuelos));
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      
    return {dataVuelos};
}
export function useFetch1(url){

    const [dataAeropuertos, setDataAer] = useState(null);
    useEffect(()=>{
       fetch(url,{mode:'cors'})
        .then(response =>response.json()).then((dataAeropuertos)=>setDataAer(dataAeropuertos));
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      
    return {dataAeropuertos};
}