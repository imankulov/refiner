"use client";

import { useState } from "react";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { compareStrings } from "./utils";

const textAtom = atomWithStorage("text", "");

const Home = () => {
  const [text, setText] = useAtom(textAtom);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JSX.Element[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetch("api/v1/polish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const polished = (await result.json())["polished"];
    setResult(compareStrings(text, polished));
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-2/3 p-6 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none h-80 focus:outline-none focus:shadow-outline"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Text"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {loading ? "Polishing in progress..." : "Polish"}
            </button>
          </div>
        </form>
        <div className="pt-4 whitespace-pre-wrap">{result}</div>
      </div>
    </div>
  );
};

export default Home;
