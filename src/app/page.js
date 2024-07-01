"use client"
import { useState, useEffect } from 'react';
import { addDocument, getAllDocuments } from '../app/utils/firebaseUtils';
import { db } from 'firebase.config';


export default function Home() {

  const [stocks, setStocks] = useState([]);;

  const loadStocks = async () => {
    const docs = await getAllDocuments(db, "stocks");
    console.log(docs);
    setStocks(docs);
  }

  useEffect(() => {

    loadStocks();

  }, [])


  return (
    <div className="container mx-auto p-4">

      <ul className="space-y-2">
        {stocks.map((stock) => (
          <li key={stock.id} className="bg-blue-400 p-2 rounded-md">
            <p className="font-semibold">{stock.name} ({stock.symbol})</p>
            <p>Price: ${stock.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}