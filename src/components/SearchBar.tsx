import { useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '../data/categories';

export default function SearchBar({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedQuery = query.toLowerCase().trim();
  const matches = normalizedQuery.length > 1
    ? CATEGORIES.filter(c => 
        c.label.toLowerCase().includes(normalizedQuery) || 
        c.slug.includes(normalizedQuery) ||
        (c.synonyms && c.synonyms.some(s => s.toLowerCase().includes(normalizedQuery)))
      ).slice(0, 6)
    : [];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-marine-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Rechercher une pièce..."
          className="w-full pl-9 pr-3 py-2 bg-marine-900/50 border border-marine-700/50 text-white placeholder-marine-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-marine-800 transition-colors text-sm font-medium"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-marine-300 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        )}
      </div>

      {isOpen && matches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-charcoal-100 overflow-hidden z-50 animate-fade-in">
          <ul className="py-1">
            {matches.map((match) => (
              <li key={match.slug}>
                <a
                  href={`/catalogue/${match.slug}`}
                  className="flex items-start gap-3 px-4 py-2.5 hover:bg-sky-50 text-marine-900 text-sm transition-colors group"
                >
                  <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-marine-100 text-marine-800 shrink-0 group-hover:bg-sky-200 group-hover:text-sky-800 transition-colors">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                  <div>
                    <span className="block font-semibold group-hover:text-sky-700">{match.label}</span>
                    <span className="block text-xs text-charcoal-500 line-clamp-1">{match.desc}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && normalizedQuery.length > 1 && matches.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-charcoal-100 p-5 z-50 animate-fade-in text-center">
          <svg className="h-8 w-8 text-charcoal-300 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          <p className="text-sm text-charcoal-600 font-medium">Aucun résultat pour "{query}"</p>
          <p className="text-xs text-charcoal-400 mt-1">Essayez un autre terme ou contactez-nous.</p>
        </div>
      )}
    </div>
  );
}
