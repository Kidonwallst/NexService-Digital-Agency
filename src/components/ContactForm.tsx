import { useState, FormEvent, ChangeEvent } from "react";
import { BookingFormValues, FormErrors } from "../types";

interface ContactFormProps {
  serviceName: string;
  servicePrice: number;
  onSuccessCallback?: () => void;
}

export default function ContactForm({ serviceName, servicePrice, onSuccessCallback }: ContactFormProps) {
  const [formValues, setFormValues] = useState<BookingFormValues>({
    name: "",
    email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formValues.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formValues.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formValues.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formValues.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formValues.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form values
    const isValid = validate();
    if (!isValid) return;

    // Simulate API request submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
      if (onSuccessCallback) {
        // Can delay or fire callback immediately if parent wants to do anything
      }
    }, 1500);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear the specific error once the user modifies the input to enhance UX
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (isSubmitSuccess) {
    return (
      <div 
        id="booking-success-message" 
        className="text-center py-8 px-4 flex flex-col items-center justify-center animate-fade-in"
        role="alert"
      >
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 border border-green-200">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinelinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Booking request sent!</h3>
        <p className="text-gray-600 max-w-sm">
          We'll contact you soon at <span className="font-semibold text-gray-800">{formValues.email}</span> with further details regarding <span className="font-semibold text-gray-800">{serviceName}</span>.
        </p>
      </div>
    );
  }

  return (
    <form id="booking-contact-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Read-Only Service Block */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label htmlFor="disabled-service-name" className="block text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          Selected Service
        </label>
        <input
          id="disabled-service-name"
          type="text"
          value={`${serviceName} — $${servicePrice}`}
          disabled
          readOnly
          className="w-full bg-transparent border-none p-0 text-sm font-bold text-blue-900 outline-none cursor-not-allowed select-none"
        />
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5 flex justify-between">
          <span>Full Name <span className="text-red-500">*</span></span>
          {errors.name && <span className="text-xs text-red-500 font-medium">{errors.name}</span>}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formValues.name}
          onChange={handleInputChange}
          placeholder="John Doe"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
            errors.name 
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" 
              : "border-gray-300 focus:border-blue-500"
          }`}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 flex justify-between">
          <span>Email Address <span className="text-red-500">*</span></span>
          {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email}</span>}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
          placeholder="john@example.com"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
            errors.email 
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" 
              : "border-gray-300 focus:border-blue-500"
          }`}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5 flex justify-between">
          <span>Message / Requirements <span className="text-red-500">*</span></span>
          {errors.message && <span className="text-xs text-red-500 font-medium">{errors.message}</span>}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formValues.message}
          onChange={handleInputChange}
          placeholder="Please describe your specific project requirements or custom configurations..."
          className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
            errors.message 
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" 
              : "border-gray-300 focus:border-blue-500"
          }`}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
        />
        <div className="flex justify-between mt-1.5 text-xs text-gray-400">
          <span>Min. 10 characters</span>
          <span>{formValues.message.length} chars</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2">
        <button
          id="submit-booking-button"
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center font-medium py-3 px-4 rounded-lg text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isSubmitting 
              ? "bg-blue-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            "Complete Booking Request"
          )}
        </button>
      </div>
    </form>
  );
}
