"use client";

import {useEffect, useState} from "react";
import {api} from "@/lib/api";
import { Transaction } from "@/types/transaction";
import Link from "next/link";

export default function transactionsPage() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await api.post("/transactions", {
        amount: parseFloat(amount),
        category,
        summary,
        transaction_type: transactionType,
        transaction_date: transactionDate,
      });

      alert("Transaction Added Successfully!");

      setAmount(""); setCategory(""); setSummary(""); setTransactionDate(""); setTransactionType("")
      {
        transactions.map((t) => (
          <div key={t.id} className="border p-4 mb-4 rounded">
            <p>{t.id}</p>
            <p>{t.amount}</p>
            <p>{t.category}</p>
            <p>{t.transaction_date}</p>
          </div>
        ))
      }
    } catch (error) {console.error(error); alert("Failed to add transaction!");}
  }

  useEffect(() => {
    api.get("/transactions").then((response) => {setTransactions(response.data);}).catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      <h3>Add a Transaction</h3>
      <p>To view existing transactions, <Link href="/transactions"><button className="bg-blue-600 text-white px-4 py-2 rounded">Click Here!</button></Link></p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="border rounded p-3" required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-3" required />
        <input type="text" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} className="border rounded p-3" required />

        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} className="border rounded p-3">
          <option>Expense</option>
          <option value="income">Income</option>
        </select>

        <input type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} className="border rounded p-3" required />

        <button type="submit" className="bg-blue-600 text-white rounded p-3">
          Add Transaction
        </button>
      </form>
    </div>
  )
}