import React, { useState } from 'react';
import { Collapse, Button } from 'reactstrap';

import { statuses } from '../constants';

import Badge from './Badge';

const FiltersPreview = ({ filters }) => {
  if (!filters || Object.keys(filters).length === 0) return <></>;
  return (
    <div className="d-inline-block ml-3 vertical-align-center">
      {filters.status && (
        <span>
          Status: <Badge className="mr-2" status={filters.status} />
        </span>
      )}
      {filters.tag && (
        <span>
          Tag: <Badge className="mr-2" status={filters.tag} />
        </span>
      )}
    </div>
  );
};

export default function TodoFilters({ filters, setFilters, tags }) {
  const [showFilters, setShowFilters] = useState(false);

  const toggle = () => setShowFilters(!showFilters);

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
    <div className="fixed-bottom">
      <div style={{ marginBottom: '1rem', marginLeft: '1rem' }}>
        <Button
          color="secondary"
          onClick={toggle}
          style={{
            borderRadius: '100px',
          }}>
          {showFilters ? 'Hide' : 'Show'} Filters
        </Button>{' '}
        <FiltersPreview filters={filters} />
      </div>
      <Collapse
        isOpen={showFilters}
        className="py-3 bg-secondary text-white"
        style={{ opacity: 0.9 }}>
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
              key={s}
              className="mr-2"
              status={s}
              color={isSelected('status', s) ? undefined : 'light'}
              onClick={() => filterStatus(s)}
            />
          ))}
          <Badge
            className="mr-2"
            status={'Not Completed'}
            color={isSelected('status', 'Not Completed') ? 'info' : 'light'}
            onClick={() => filterStatus('Not Completed')}
          />
        </div>
        {tags && tags.length > 0 && (
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
                key={value}
                className="mr-2"
                status={value}
                color={
                  filters.tag && isSelected('tag', value) ? 'dark' : 'light'
                }
                onClick={() => filterTags(value)}
              />
            ))}
          </div>
        )}
      </Collapse>
    </div>
  );
}
