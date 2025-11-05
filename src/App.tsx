import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { DashboardPage } from "./pages/DashboardPage";
import WalletModal from "./components/Modals/WalletModal"; 
import { WalletProvider, useWallet } from "./context/WalletContext"; 

const AppContent: React.FC = () => {
  const [favorites, setFavorites] = useState(["1", "4"]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { account } = useWallet();

  const handleConnectWallet = () => {
    setModalOpen(true);
  };

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <>
      <Navbar onConnectWallet={handleConnectWallet} walletConnected={!!account} />

      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          } 
        />
        <Route 
          path="/listings" 
          element={
            <ListingsPage 
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          } 
        />
        <Route 
          path="/property/:id" 
          element={<PropertyDetailPage onToggleFavorite={handleToggleFavorite} />} 
        />
        <Route 
          path="/favorites" 
          element={
            <FavoritesPage 
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <DashboardPage
              walletConnected={!!account}
              onConnectWallet={handleConnectWallet}
            />
          }
        />
      </Routes>

      <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

function App() {
  return (
    <WalletProvider>
      <Router>
        <AppContent />
      </Router>
    </WalletProvider>
  );
}

export default App;
