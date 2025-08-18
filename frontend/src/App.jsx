import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-aliceblue via-blue-50 to-aliceblue">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;