import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const CodeAnalyzer = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('BigO...');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode ON by default

  const handleAnalyze = async () => {
    if (code == '') {
      setResult("❌ Error: Please enter your java code..");
    }
    else {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:8080/api/analyze', { code });
        setResult(response.data);
      } catch (error) {
        setResult("❌ Error: " + (error.response?.data?.message || error.message));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} p-4 md:p-8`}>
      <div className="max-w-4xl mx-auto">
        <Navbar />

        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            {isDarkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Textarea */}
        <textarea
          className={`w-full h-64 md:h-96 p-4 rounded-lg border-2 focus:ring-1 font-mono text-sm resize-none ${isDarkMode
            ? 'bg-gray-800 border-gray-700 focus:border-blue-700 focus:ring-blue-700 text-gray-100'
            : 'bg-gray-100 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900'
            }`}
          placeholder="Paste your Java code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {/* Analyze Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg font-medium flex items-center transition-colors ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-800 hover:bg-blue-700 text-white'
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-bounce -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Analyze
              </>
            )}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className={`mt-6 p-4 rounded-lg border-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
            <h3 className="text-lg font-bold text-emerald-400 mb-2">Result :</h3>
            {
              isDarkMode ? <div className={`p-3 rounded font-bold text-lg ${result.includes('O(1)') ? 'text-blue-500' : result.includes('O(log n)') ? 'text-purple-500' : result.includes('O(n log n)') ? 'text-sky-500' : result.includes('O(n)') ? 'text-green-500' : result.includes('O(n^2)') ? 'text-yellow-500' :
                result.includes('O(n^3)') ? 'text-orange-500' : result.includes('Error: Please enter your java code..') ? 'text-red-500 font-normal text-md' : result.includes("O(2^n) — Exponential Recursion") ? 'text-red-500' : 'text-white'
                }`}>
                {result}
              </div> :
                <div className={`p-3 rounded font-bold text-lg ${result.includes('O(1)') ? 'text-blue-500' : result.includes('O(log n)') ? 'text-purple-500' : result.includes('O(n log n)') ? 'text-sky-500' : result.includes('O(n)') ? 'text-green-500' : result.includes('O(n^2)') ? 'text-yellow-500' :
                result.includes('O(n^3)') ? 'text-orange-500' : result.includes('Error: Please enter your java code..') ? 'text-red-500 font-normal text-md' : result.includes("O(2^n) — Exponential Recursion") ? 'text-red-500' : 'text-black'
                }`}>
                {result}
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeAnalyzer;
