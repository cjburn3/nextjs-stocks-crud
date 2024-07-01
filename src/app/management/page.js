"use client"

import React, { useState, useEffect } from 'react';
import { db } from 'firebase.config';
import { getAllDocuments, addDocument } from '../utils/firebaseUtils';

export default function Management() {
  const [stocks, setStocks] = useState([]);
  const [newStockName, setNewStockName] = useState('');
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [newStockPrice, setNewStockPrice] = useState('');
  const [editStockId, setEditStockId] = useState(null);
  const [editStockName, setEditStockName] = useState('');
  const [editStockSymbol, setEditStockSymbol] = useState('');
  const [editStockPrice, setEditStockPrice] = useState('');

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    const querySnapshot = await getAllDocuments(db , "stocks");
    setStocks(querySnapshot);
  };

  const handleAddStock = async () => {
    if (newStockName.trim() !== '' && newStockSymbol.trim() !== '' && newStockPrice.trim() !== '') {
      const newStock = {
        name: newStockName,
        symbol: newStockSymbol,
        price: parseFloat(newStockPrice),
      };
      await addDoc(collection(db, "stocks"), newStock);
      fetchStocks();
      setNewStockName('');
      setNewStockSymbol('');
      setNewStockPrice('');
    }
  };

  const handleEditStock = async () => {
    if (editStockId !== null && editStockName.trim() !== '' && editStockSymbol.trim() !== '' && editStockPrice.trim() !== '') {
      const stockRef = doc(db, "stocks", editStockId);
      await updateDoc(stockRef, {
        name: editStockName,
        symbol: editStockSymbol,
        price: parseFloat(editStockPrice),
      });
      fetchStocks();
      setEditStockId(null);
      setEditStockName('');
      setEditStockSymbol('');
      setEditStockPrice('');
    }
  };

  const handleDeleteStock = async (id) => {
    const stockRef = doc(db, "stocks", id);
    await deleteDoc(stockRef);
    fetchStocks();
  };

  const handleSetEditStock = (stock) => {
    setEditStockId(stock.id);
    setEditStockName(stock.name);
    setEditStockSymbol(stock.symbol);
    setEditStockPrice(stock.price.toString());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Stocks</h1>
      <div className="mb-4">
        <input
          type="text"
          value={editStockName}
          onChange={(e) => setEditStockName(e.target.value)}
          placeholder="Enter stock name"
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="text"
          value={editStockSymbol}
          onChange={(e) => setEditStockSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="number"
          value={editStockPrice}
          onChange={(e) => setEditStockPrice(e.target.value)}
          placeholder="Enter stock price"
          className="border rounded-md p-2 mr-2"
        />
        <button onClick={handleEditStock} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Stock
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={newStockName}
          onChange={(e) => setNewStockName(e.target.value)}
          placeholder="Enter new stock name"
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="text"
          value={newStockSymbol}
          onChange={(e) => setNewStockSymbol(e.target.value)}
          placeholder="Enter new stock symbol"
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="number"
          value={newStockPrice}
          onChange={(e) => setNewStockPrice(e.target.value)}
          placeholder="Enter new stock price"
          className="border rounded-md p-2 mr-2"
        />
        <button onClick={handleAddStock} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Add Stock
        </button>
      </div>
      <ul className="space-y-2">
        {stocks.map((stock) => (
          <li key={stock.id} className="flex justify-between items-center bg-blue-300 p-2 rounded-md">
            <div>
              <p className="font-semibold">{stock.name} ({stock.symbol})</p>
              <p>Price: ${stock.price}</p>
            </div>
            <div>
              <button onClick={() => handleSetEditStock(stock)} className="text-blue-500 mr-2">
                Edit
              </button>
              <button onClick={() => handleDeleteStock(stock.id)} className="text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}