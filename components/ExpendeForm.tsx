import { useState } from "react";
import api from "../utils/api";

export default function ExpenseForm({ onAdded }: { onAdded: () => void }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    await api.post("/expenses", {
      amount: parseFloat(amount),
      description,
      date,
      category_id: parseInt(categoryId),
    }, { headers: { Authorization: `Bearer ${token}` } });
    onAdded();
  };

  return (
    <div className="bg-surface p-6 rounded-xl shadow-lg border border-border max-w-md mx-auto mt-8 flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Add New Expense</h2>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-textMuted">Amount</label>
        <input 
          className="p-3 rounded-lg w-full transition-all"
          type="number"
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          placeholder="0.00" 
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-textMuted">Description</label>
        <input 
          className="p-3 rounded-lg w-full transition-all"
          type="text"
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="Groceries, Rent, etc." 
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm text-textMuted">Date</label>
          <input 
            className="p-3 rounded-lg w-full transition-all"
            type="date" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
          />
        </div>
        
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm text-textMuted">Category ID</label>
          <input 
            className="p-3 rounded-lg w-full transition-all"
            type="number"
            value={categoryId} 
            onChange={e => setCategoryId(e.target.value)} 
            placeholder="1" 
          />
        </div>
      </div>

      <button 
        className="mt-4 bg-primary hover:bg-primaryHover text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        onClick={handleSubmit}
      >
        Add Expense
      </button>
    </div>
  );
}
