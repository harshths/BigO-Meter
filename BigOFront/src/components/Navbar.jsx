import React from 'react'

const Navbar = () => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg >
          BigO - Meter
        </h2>

        <details style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <summary style={{ fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>
          About This App
        </summary>
        <div style={{ marginTop: "10px" }}>
          <p>
            This app analyzes Java code and estimates its Time Complexity.
            It checks loops, nested loops, and recursion for Big-O notation (Worst Case Complexity).
          </p>
          <br />
          <h4 className='font-bold'>How to Use:</h4>
          <ul>
            <li>Paste your Java code below.</li>
            <li>Click "Analyze" to calculate complexity.</li>
            <li>Result will be shown instantly.</li>
          </ul>
        </div>
      </details>
    </div>
  )
}

export default Navbar
