import React from 'react';

const stocks = [
  { id: 1, name: 'Apple Inc.', symbol: 'AAPL', price: 142.02 },
  { id: 2, name: 'Microsoft Corporation', symbol: 'MSFT', price: 277.01 },
  { id: 3, name: 'Amazon.com Inc.', symbol: 'AMZN', price: 3458.50 },
];

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stocks List</h1>
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