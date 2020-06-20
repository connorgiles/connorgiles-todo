import React from 'react';
import { Input } from 'reactstrap';

export default function TodoSearch({ filters, setFilters, tags }) {
  const filterSearch = (query) =>
    setFilters({
      ...filters,
      query,
    });

  return (
    <div className="my-3">
      <Input
        id="search-bar"
        onChange={(e) => filterSearch(e.target.value)}
        value={filters?.query}
        placeholder="Search tasks"
        required
      />
    </div>
  );
}
