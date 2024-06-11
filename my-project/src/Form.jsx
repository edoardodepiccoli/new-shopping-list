import { useState } from "react";

export function Form({ addItem }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;
    addItem(input);
    setInput("");
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        action="POST"
        className="flex flex-col w-11/12"
      >
        <input
          className="p-4 bg-slate-200 w-full rounded-xl"
          type="text"
          name="name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="pizze surgelate"
        />
        <button className="bg-green-200 text-green-600 font-bold p-4 mt-2 rounded-xl">
          Aggiungi alla lista📃
        </button>
      </form>
    </div>
  );
}
