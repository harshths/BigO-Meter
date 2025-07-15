# BigO-Meter 🚀
Analyze Java Code & Estimate Time Complexity (Big-O)

📌 What is BigO-Meter?
BigO-Meter is a tool that helps you analyze Java code and determine its time complexity.
It detects:
✔ Loops (for, while, nested loops)
✔ Recursion (linear, exponential)
✔ Combined complexity (loops + recursion)

The result is displayed in Big-O notation like:
O(1), O(n), O(n²), O(log n), O(2^n) etc.

🔥 Why Use This?
Understand the performance of your Java code.

Great for students learning DSA and time complexity analysis.

Quick and easy: Paste → Analyze → Get Complexity.

✅ How It Works
Paste your Java code into the editor.

Click Analyze.

Instantly see the estimated time complexity with color-coded results.

✨ Features
✔ Detects loop depth and calculates complexity (O(n), O(n²), etc.)
✔ Identifies recursion type (linear, exponential, multiple calls)
✔ Supports nested loops
✔ Dark / Light Mode toggle
✔ Responsive & Clean UI
✔ Instant analysis with color-coded Big-O results

🎯 Example
Input Java Code:

java
Copy code
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.println(i + j);
    }
}
Result:
O(n²) — Quadratic Time

🛠 Tech Stack
Frontend: React + Tailwind CSS

Backend: Spring Boot + JavaParser

Communication: REST API

❤️ Who is it for?
Students → Learning DSA & Algorithms

Developers → Quickly analyze complexity

Educators → Demonstrate Big-O visually
