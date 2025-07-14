# Cash Flow Minimizer

Cash Flow Minimizer is a React-based application that helps a group of friends or participants efficiently settle debts with each other. Given a set of transactions, the app uses a graph-based greedy algorithm (optimized with heaps) to minimize the number of cash flow exchanges required to settle all debts, making it highly useful for managing group expenses, investment settlements, or shared payments.

## 🧩 How It Works

- Enter the number of participants and the amount each person owes to others in the interactive table.
- The algorithm computes the minimum number of transactions needed to settle all debts, showing who should pay whom and how much.
- The core logic uses Graph and Greedy algorithms, further optimized with min heap and max heap to achieve a time complexity of `O(n log n)`.

## 🚀 Features

- Easy-to-use UI for entering group transactions
- Optimized debt minimization algorithm
- Clear output showing minimal set of payments
- Built with React for a fast, responsive experience

## 🛠️ Tech Stack

- React JS
- JavaScript
- CSS

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yash-geek/Cash-Flow-Minimizer.git
   cd Cash-Flow-Minimizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

4. **Open the app**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Project Structure

- `/src` - React components and logic
- `/public` - Static assets

## 📦 Building for Production

```bash
npm run build
```
or
```bash
yarn build
```

## 🤝 Contributing

Pull requests and suggestions are welcome! Please feel free to open an issue or submit a PR.



---

Made by yash-geek