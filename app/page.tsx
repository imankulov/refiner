'use client';


import { useState } from 'react';
import {diff_match_patch, DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL} from 'diff-match-patch';



const compareStrings = (s1: string, s2: string) => {
  let dmp = new diff_match_patch();
  let diff = dmp.diff_main(s1, s2);
  dmp.diff_cleanupSemantic(diff);

  let result: JSX.Element[] = [];
  diff.forEach((part: [number, string], index: number) => {
    if (part[0] === DIFF_INSERT) {
      result.push(<span key={index} className='bg-emerald-100 font-semibold  whitespace-pre-wrap'>{part[1]}</span>);
    } else if (part[0] === DIFF_DELETE) {
      result.push(<span key={index} className='bg-red-100 whitespace-pre-wrap'>{part[1]}</span>);
    } else if (part[0] === DIFF_EQUAL) {
      result.push(<span className='whitespace-pre-wrap'>{part[1]}</span>);
    }
  });
  return result;
};


const Home = () => {
  const [string1, setString1] = useState('');
  const [string2, setString2] = useState('');
  const [result, setResult] = useState<JSX.Element[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(compareStrings(string1, string2));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      <div className="p-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3">
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea className="h-80 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={string1} onChange={(e) => setString1(e.target.value)} placeholder="First string" />
          </div>
          <div className="mb-6">
            <textarea className="h-80 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={string2} onChange={(e) => setString2(e.target.value)} placeholder="Second string" />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Compare</button>
          </div>
        </form>
        <div className="pt-4 whitespace-pre-wrap">{result}</div>
      </div>
    </div>
  );
};

export default Home;
