"use client"

import React, { useState, useEffect } from 'react';
import { getAllDocuments } from "@/utils/firebaseConfig.js";
import { db } from '../../firebaseConfig';

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
    // Fetch initial stocks from Firestore on component mount
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const snapshot = await getAllDocuments(db.collection('stocks'));
      const stocksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStocks(stocksData);
    } catch (error) {
      console.error('Error fetching stocks: ', error);
    }
  };

  const handleAddStock = async () => {
    if (newStockName.trim() !== '' && newStockSymbol.trim() !== '' && newStockPrice.trim() !== '') {
      try {
        const newStock = {
          name: newStockName,
          symbol: newStockSymbol,
          price: parseFloat(newStockPrice),
        };
        await db.collection('stocks').add(newStock);
        // Refresh stocks list after adding
        fetchStocks();
        setNewStockName('');
        setNewStockSymbol('');
        setNewStockPrice('');
      } catch (error) {
        console.error('Error adding stock: ', error);
      }
    }
  };

  const handleEditStock = async () => {
    if (editStockId && editStockName.trim() !== '' && editStockSymbol.trim() !== '' && editStockPrice.trim() !== '') {
      try {
        const stockRef = db.collection('stocks').doc(editStockId);
        await stockRef.update({
          name: editStockName,
          symbol: editStockSymbol,
          price: parseFloat(editStockPrice),
        });
        // Refresh stocks list after updating
        fetchStocks();
        setEditStockId(null);
        setEditStockName('');
        setEditStockSymbol('');
        setEditStockPrice('');
      } catch (error) {
        console.error('Error updating stock: ', error);
      }
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      const stockRef = db.collection('stocks').doc(id);
      await stockRef.delete();
      // Refresh stocks list after deletion
      fetchStocks();
    } catch (error) {
      console.error('Error deleting stock: ', error);
    }
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
          <li key={stock.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
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