import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import PropertyForm from './pages/PropertyForm';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/properties/new" element={<PropertyForm />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/properties/:id/edit" element={<PropertyForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}
