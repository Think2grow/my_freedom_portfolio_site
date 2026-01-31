import { useState } from 'react';

interface Props {
  storageKey: string;
}

export default function TestNotificationButton({ storageKey }: Props) {
  const [message, setMessage] = useState('');

  const handleTest = () => {
    console.log('TestButton - Modifying storage for:', storageKey);
    const currentData = localStorage.getItem(storageKey);
    
    if (currentData) {
      // Modify the stored data slightly to simulate a change
      const modifiedData = currentData + '_modified';
      localStorage.setItem(storageKey, modifiedData);
      console.log('TestButton - Data modified to trigger change detection');
      setMessage('Data modified! Refresh the page to see the notification.');
    } else {
      console.log('TestButton - No data stored yet, visit the page first');
      setMessage('No data stored yet. The page needs to load first.');
    }
    
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleTest}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors shadow-lg"
      >
        Test Notification
      </button>
      {message && (
        <div className="mt-2 bg-green-100 text-green-800 px-3 py-2 rounded text-xs max-w-xs">
          {message}
        </div>
      )}
    </div>
  );
}
