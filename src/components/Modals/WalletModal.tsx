import React from "react";
import { Wallet, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useWallet } from "../../context/WalletContext";

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ open, onClose }) => {
  const { account, connectWallet } = useWallet();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 w-[380px] p-6 relative animate-fadeIn"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <Wallet className="w-10 h-10 text-blue-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900">Connect Wallet</h2>
          <p className="text-sm text-gray-500">
            Choose your preferred wallet to connect.
          </p>
        </div>

        {!account ? (
          <div className="space-y-3">
            <button
              onClick={connectWallet}
              className="w-full flex items-center justify-between bg-white/70 hover:bg-white text-gray-800 border border-gray-200/60 rounded-xl py-3 px-4 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZaVpfhv3kgZA46GoqfVNIFhR6pXIdX4_Rg&s"
                  alt="MetaMask"
                  className="w-8 h-8"
                />
                <span className="font-medium text-gray-900">MetaMask</span>
              </div>
              <Wallet className="w-5 h-5 text-orange-500" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mt-2">
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />
              <span>
                Don’t have MetaMask?{" "}
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue underline hover:text-blue-600"
                >
                  Install it here
                </a>
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-emerald-700 font-semibold">Wallet Connected</h3>
            <p className="font-mono text-sm text-gray-700 mt-2 break-all">
              {account}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletModal;
