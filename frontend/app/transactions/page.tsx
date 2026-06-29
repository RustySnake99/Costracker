"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Transaction } from "@/types/transaction";
import Link from "next/link";
import { error } from "console";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    async function deleteTransaction(id: number) {
        try {
            await api.delete(`/transactions/${id}`);
            setTransactions(transactions.filter((t) => t.id !== id));
            alert("This transaction has been successfully deleted!");
        } catch (error) {
            console.log(error);
            alert("Attempt to delete this transaction failed....");
        }
    }

    useEffect(() => {
        api.get("/transactions")
            .then((response) => {
                setTransactions(response.data);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="p-8">
            <Link href="/"><button className="bg-blue-600 text-white px-4 py-2 rounded">Home</button></Link>
            <h1 className="text-3xl font-bold mb-6">
                Existing Transactions
            </h1>

            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                transactions.map((t) => (
                    <div key={t.id} className="border rounded p-4 mb-4">
                        <button style={{margin: 2.5 + 'px'}} className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => deleteTransaction(t.id)}>Delete</button>
                        <Link style={{margin: 2.5 + 'px'}} href={`/transactions/${t.id}`} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</Link>
                        <h3 className="font-bold">{t.summary}</h3>

                        <p>Amount: ₹{t.amount}</p>
                        <p>Category: {t.category}</p>
                        <p>Type: {t.transaction_type}</p>
                        <p>Date: {t.transaction_date}</p>
                    </div>
                ))
            )}
        </div>
    );
}