import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  data: any[];
  storageKey: string;
}

export default function DataChangeNotification({ data, storageKey }: Props) {
  const [showNotification, setShowNotification] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Create a hash of the current data
    const currentHash = JSON.stringify(data);
    
    // Get stored hash from localStorage
    const storedHash = localStorage.getItem(storageKey);
    
    if (!storedHash) {
      // First visit - store the data
      localStorage.setItem(storageKey, currentHash);
      setIsFirstVisit(true);
    } else if (storedHash !== currentHash) {
      // Data has changed!
      setShowNotification(true);
      // Update stored hash
      localStorage.setItem(storageKey, currentHash);
    }

    // Expose trigger function to console for testing
    (window as any).triggerDataChangeAlert = () => {
      setShowNotification(true);
    };

    // Log instructions to console
    console.log('%c💡 Developer Tip:', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
    console.log('%cTo manually trigger the data change alert, run:', 'color: #1e3a5f; font-size: 12px;');
    console.log('%ctriggerDataChangeAlert()', 'color: #22c55e; font-weight: bold; font-size: 12px; background: #000; padding: 4px 8px; border-radius: 4px;');
  }, [data, storageKey]);

  const handleDismiss = () => {
    setShowNotification(false);
  };

  return (
    <AnimatePresence>
      {showNotification && (
        <>
          {/* Overlay - matching site colors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50"
            onClick={handleDismiss}
          />
          
          {/* Modal - styled to match site design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-8 mx-4">
              <div className="text-center">
                {/* Icon - using site's orange color scheme */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
                  <svg
                    className="h-8 w-8 text-[#f59e0b]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                
                {/* Title - matching site typography */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Data Updated!
                </h3>
                
                {/* Message - matching site text colors */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The data on this page has changed since your last visit. We've compared the stored snapshot with the current data and detected updates.
                </p>
                
                {/* Button - matching site's primary button style */}
                <button
                  onClick={handleDismiss}
                  className="w-full bg-[#f59e0b] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#d97706] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:ring-offset-2"
                >
                  Got it!
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
      
      {isFirstVisit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-xs text-gray-500 mt-2"
        >
          Data snapshot saved. We'll notify you on your next visit if anything changes.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
