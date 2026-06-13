import { Service } from "../types";

interface ServiceCardProps {
  key?: number;
  service: Service;
  onBook: (service: Service) => void;
}

export default function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <article 
      id={`service-card-${service.id}`}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-200 group animate-fade-in"
    >
      {/* Image container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-150">
        <img
          src={service.image}
          alt={service.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback to high contrast visual placeholder if URL fails or loads offline
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/400x300/2563eb/ffffff?text=${encodeURIComponent(service.title)}`;
          }}
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          Recommended
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 id={`service-title-${service.id}`} className="text-lg font-bold text-slate-900 mb-1.5 leading-tight group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-2 leading-relaxed">
          {service.description}
        </p>
        
        <div className="mt-auto pt-2 border-t border-slate-100">
          {/* Price */}
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Starting at</span>
            <span id={`service-price-${service.id}`} className="text-xl font-bold text-blue-600">
              ${service.price.toLocaleString()}
            </span>
          </div>

          {/* Book Now Button */}
          <button
            id={`book-btn-${service.id}`}
            type="button"
            onClick={() => onBook(service)}
            aria-label={`Book ${service.title} for $${service.price}`}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.99]"
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}
