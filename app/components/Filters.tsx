import { FilterState, Language, Intensity, Duration, District } from '../types'

interface FiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  const resetFilters = () => {
    setFilters({
      languages: [],
      intensity: null,
      duration: null,
      district: null,
      minPrice: null,
    });
  };

  return (
    <div className="w-64">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      {/* Language Filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Language</h3>
        {(['german', 'english', 'italian'] as Language[]).map((lang) => (
          <label key={lang} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.languages.includes(lang)}
              onChange={(e) => {
                const newLanguages = e.target.checked
                  ? [...filters.languages, lang]
                  : filters.languages.filter((l: Language) => l !== lang);
                setFilters({ ...filters, languages: newLanguages });
              }}
              className="mr-2"
            />
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </label>
        ))}
      </div>

      {/* Intensity Filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Intensity</h3>
        {(['relaxed', 'sporty'] as Intensity[]).map((intensity) => (
          <label key={intensity} className="flex items-center mb-2">
            <input
              type="radio"
              name="intensity"
              checked={filters.intensity === intensity}
              onChange={() => setFilters({ ...filters, intensity })}
              className="mr-2"
            />
            {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
          </label>
        ))}
      </div>

      {/* Duration Filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Duration (hours)</h3>
        {([1, 2, 3] as Duration[]).map((duration) => (
          <label key={duration} className="flex items-center mb-2">
            <input
              type="radio"
              name="duration"
              checked={filters.duration === duration}
              onChange={() => setFilters({ ...filters, duration })}
              className="mr-2"
            />
            {duration === 3 ? '3+ hours' : `${duration} hour${duration > 1 ? 's' : ''}`}
          </label>
        ))}
      </div>

      {/* District Filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">District</h3>
        <select
          value={filters.district || ''}
          onChange={(e) => setFilters({ ...filters, district: Number(e.target.value) as District || null })}
          className="w-full p-2 border rounded"
        >
          <option value="">All Districts</option>
          {Array.from({ length: 23 }, (_, i) => i + 1).map((district) => (
            <option key={district} value={district}>
              District {district}
            </option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Minimum Price</h3>
        {[10, 20, 30].map((price) => (
          <label key={price} className="flex items-center mb-2">
            <input
              type="radio"
              name="price"
              checked={filters.minPrice === price}
              onChange={() => setFilters({ ...filters, minPrice: price })}
              className="mr-2"
            />
            {`< ${price}€`}
          </label>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}
