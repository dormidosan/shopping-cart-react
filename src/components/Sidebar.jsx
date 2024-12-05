import React from "react";

const Sidebar = ({ filters, selectedFilters, onFilterChange }) => {
  return (
    <div className="space-y-8 ml-4 bg-green-200">
      {filters.map((section) => (
        <div key={section.title}>
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          <div className="space-y-2">
            {section.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`${section.title.toLowerCase()}-${option.id}`}
                  checked={selectedFilters[
                    section.title.toLowerCase()
                  ].includes(option.id)}
                  onChange={() =>
                    onFilterChange(option.id, section.title.toLowerCase())
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={option.id} className="text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
