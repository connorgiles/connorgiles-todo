import React from 'react';
import { Input } from 'reactstrap';

import { statuses } from '../constants';

import Badge from './Badge';

export default function TodoFilters({ filters, setFilters, tags }) {
  const filterSearch = (query) =>
    setFilters({
      ...filters,
      query,
    });

  const filterStatus = (status) =>
    setFilters({
      ...filters,
      status,
    });

  const filterTags = (tag) => {
    setFilters({
      ...filters,
      tag,
    });
  };

  const isSelected = (type, val) => !filters[type] || filters[type] === val;

  return (
    <div>
      <div className="my-3">
        Status:{' '}
        <Badge
          className="mr-2"
          color="light"
          status={'All'}
          onClick={() => filterStatus(undefined)}
        />
        {statuses.map((s) => (
          <Badge
            className="mr-2"
            status={s}
            color={isSelected('status', s) ? undefined : 'light'}
            onClick={() => filterStatus(s)}
          />
        ))}
      </div>
      <div className="my-3">
        Tags:{' '}
        <Badge
          className="mr-2"
          color={!filters.tag ? 'secondary' : 'light'}
          status={'All'}
          onClick={() => filterTags(undefined)}
        />
        {tags.map(({ value }) => (
          <Badge
            className="mr-2"
            status={value}
            color={
              filters.tag && isSelected('tag', value) ? 'primary' : 'light'
            }
            onClick={() => filterTags(value)}
          />
        ))}
      </div>
      <div className="my-3">
        <Input
          id="search-bar"
          onChange={(e) => filterSearch(e.target.value)}
          value={filters?.query}
          placeholder="Search tasks"
          required
        />
      </div>
    </div>
  );
}
