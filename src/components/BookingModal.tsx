import { useEffect, MouseEvent } from "react";
import { Service } from "../types";
import ContactForm from "./ContactForm";

interface BookingModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ service, isOpen, onClose }: BookingModalProps) {
  // Return if the modal is not open or service is not defined
  if (!isOpen || !service) return null;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    // Preserve current overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    
    // Listen for Escape key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle overlay background click (only close if clicked exactly the overlay)
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in transition-all duration-300"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        id="booking-modal-container"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col scale-100 transition-transform duration-300"
      >
        {/* Modal Header */}
        <div className="relative px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900 leading-none">
            Book {service.title}
          </h2>
          
          <button
            id="close-modal-btn"
            type="button"
            onClick={onClose}
            aria-label="Close booking modal"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          <ContactForm 
            serviceName={service.title} 
            servicePrice={service.price} 
            onSuccessCallback={onClose}
          />
        </div>
      </div>
    </div>
  );
}
