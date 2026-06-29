"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function EditTransactionPage() {
    const params = useParams();
    const router = useRouter();

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [summary, setSummary] = useState("");
    const [transactionType, setTransactionType] =
        useState("expense");
    const [transactionDate, setTransactionDate] =
        useState("");

    useEffect(() => {
        api.get(`/transactions/${params.id}`)
            .then((response) => {
                const t = response.data;

                setAmount(t.amount.toString());
                setCategory(t.category);
                setSummary(t.summary);
                setTransactionType(t.transaction_type);
                setTransactionDate(t.transaction_date);
            })
            .catch(console.error);
    }, [params.id]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        try {
            await api.put(`/transactions/${params.id}`, {
                amount: parseFloat(amount),
                category,
                summary,
                transaction_type: transactionType,
                transaction_date: transactionDate,
            });

            alert("Transaction updated!");
            router.push("/transactions");
        } catch (error) {
            console.error(error);
            alert("Failed to update transaction!");
        }
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-6">
                Edit Transaction
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-3 rounded" />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-3 rounded" />
                <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} className="border p-3 rounded" />

                <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} className="border p-3 rounded">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                <input type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} className="border p-3 rounded" />
                <button className="bg-green-600 text-white p-3 rounded">Save Changes</button>
            </form>
        </div>
    );
}