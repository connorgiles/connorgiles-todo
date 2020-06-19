import React from 'react';

import { statuses } from '../constants';

import StatusBadge from './StatusBadge';

export default function TodoFilters({ filters, setFilters }) {
  const filterStatus = (status) =>
    setFilters({
      ...filters,
      status,
    });

  const filteringStatus = filters.status !== undefined;
  return (
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
          color={filteringStatus && filters.status !== s ? 'light' : undefined}
          onClick={() => filterStatus(s)}
        />
      ))}
    </div>
  );
}
