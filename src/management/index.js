import React, { useState } from 'react';

let initialStocks = [
  { id: 1, name: 'Apple Inc.', symbol: 'AAPL', price: 142.02 },
  { id: 2, name: 'Microsoft Corporation', symbol: 'MSFT', price: 277.01 },
  { id: 3, name: 'Amazon.com Inc.', symbol: 'AMZN', price: 3458.50 },
];

export default function Management() {
  const [stocks, setStocks] = useState(initialStocks);
  const [newStockName, setNewStockName] = useState('');
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [newStockPrice, setNewStockPrice] = useState('');

  const handleAddStock = () => {
    if (newStockName.trim() !== '' && newStockSymbol.trim() !== '' && newStockPrice.trim() !== '') {
      const newStock = {
        id: stocks.length + 1,
        name: newStockName,
        symbol: newStockSymbol,
        price: parseFloat(newStockPrice),
      };
      setStocks([...stocks, newStock]);
      setNewStockName('');
      setNewStockSymbol('');
      setNewStockPrice('');
    }
  };

  const handleDeleteStock = (id) => {
    const updatedStocks = stocks.filter((stock) => stock.id !== id);
    setStocks(updatedStocks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Stocks</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newStockName}
          onChange={(e) => setNewStockName(e.target.value)}
          placeholder="Enter stock name"
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="text"
          value={newStockSymbol}
          onChange={(e) => setNewStockSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="number"
          value={newStockPrice}
          onChange={(e) => setNewStockPrice(e.target.value)}
          placeholder="Enter stock price"
          className="border rounded-md p-2 mr-2"
        />
        <button onClick={handleAddStock} className="bg-blue-500 text-white px-4 py-2 rounded-md">
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
            <button onClick={() => handleDeleteStock(stock.id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}