import { useState } from "react";
import axios from "axios";

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
  if (!prompt.trim()) {
    alert("Please enter a task.");
    return;
  }

  try {
    setLoading(true);

    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/ai/create-task`,
      {
        prompt,
        userId: user.id,
      }
    );

    alert("Task Created Successfully!");

    console.log(res.data);

    setPrompt("");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-6">
         AI Task Assistant
      </h1>

      <textarea
        rows={8}
        className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Example:
Finish React dashboard by Friday.
Create login page.
Buy groceries tomorrow evening."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Task"}
      </button>

    </div>
  );
};

export default AIAssistant;