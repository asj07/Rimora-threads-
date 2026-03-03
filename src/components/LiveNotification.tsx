import { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  product: string;
  time: string;
}

const mockNotifications = [
  { name: 'Alejandro (Paris)', product: 'Pearled Lace And Tulle Halter Neck Wedding Gown', time: '23 hours ago' },
  { name: 'Sarah (London)', product: 'A-Line Satin Long Sleeve Wedding Dress', time: '45 minutes ago' },
  { name: 'Michael (New York)', product: 'Black Embroidered Indo-Western Sherwani', time: '12 minutes ago' },
  { name: 'Emma (Sydney)', product: 'Mermaid Beach Sweetheart Wedding Dress', time: '2 hours ago' },
  { name: 'James (Toronto)', product: 'Ice Blue Jacquard Silk Sherwani', time: '36 minutes ago' },
];

export default function LiveNotification() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 5000);

    return () => clearTimeout(initialTimeout);
  }, []);

  const showRandomNotification = () => {
    const randomIndex = Math.floor(Math.random() * mockNotifications.length);
    const notification = {
      id: Date.now(),
      ...mockNotifications[randomIndex],
    };
    setCurrentNotification(notification);
    setIsVisible(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
      // Show next notification after random delay (10-20 seconds)
      const nextDelay = 10000 + Math.random() * 10000;
      setTimeout(showRandomNotification, nextDelay);
    }, 5000);
  };

  if (!currentNotification) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-[200] transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm flex items-start gap-3">
        <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#111827]">
            <span className="font-medium">{currentNotification.name}</span> purchased
          </p>
          <p className="text-sm text-[#6B7280] truncate">{currentNotification.product}</p>
          <p className="text-xs text-[#9CA3AF] mt-1">{currentNotification.time} • Verified</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#9CA3AF] hover:text-[#111827] transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
