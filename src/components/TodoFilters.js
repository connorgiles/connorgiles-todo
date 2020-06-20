import React from 'react';

import { statuses } from '../constants';

import Badge from './Badge';

export default function TodoFilters({ filters, setFilters, tags }) {
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
    <div
      className="py-3 fixed-bottom bg-secondary text-white"
      style={{ backgroundColor: '#dae4ed' }}>
      <div className="my-3 text-center">
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
      <div className="my-3 text-center">
        Tags:{' '}
        <Badge
          className="mr-2"
          color={!filters.tag ? 'dark' : 'light'}
          status={'All'}
          onClick={() => filterTags(undefined)}
        />
        {tags.map(({ value }) => (
          <Badge
            className="mr-2"
            status={value}
            color={filters.tag && isSelected('tag', value) ? 'dark' : 'light'}
            onClick={() => filterTags(value)}
          />
        ))}
      </div>
    </div>
  );
}
