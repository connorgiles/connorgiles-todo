import React from 'react';

import { statuses } from '../constants';

import StatusBadge from './StatusBadge';

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
    <div>
      <div className="my-3">
        Status:{' '}
        <StatusBadge
          className="mr-2"
          color="light"
          status={'All'}
          onClick={() => filterStatus(undefined)}
        />
        {statuses.map((s) => (
          <StatusBadge
            className="mr-2"
            status={s}
            color={isSelected('status', s) ? undefined : 'light'}
            onClick={() => filterStatus(s)}
          />
        ))}
      </div>
      <div className="my-3">
        Tags:{' '}
        <StatusBadge
          className="mr-2"
          color="light"
          status={'All'}
          onClick={() => filterTags(undefined)}
        />
        {tags.map(({ value }) => (
          <StatusBadge
            className="mr-2"
            status={value}
            color={isSelected('tag', value) ? undefined : 'light'}
            onClick={() => filterTags(value)}
          />
        ))}
      </div>
    </div>
  );
}
