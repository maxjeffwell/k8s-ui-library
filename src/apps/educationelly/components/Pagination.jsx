import React, { memo } from 'react';
import styled from 'styled-components';
import { Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1.5rem 0;
  gap: 0.75rem;
`;

const PageInfo = styled.div`
  color: ${props => props.theme.blue};
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
`;

function generatePageNumbers(currentPage, totalPages) {
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }
  return pages;
}

const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  loading = false,
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const pages = generatePageNumbers(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <PaginationWrapper>
      <PageInfo>
        Showing {startItem}-{endItem} of {totalItems} students
      </PageInfo>
      <Menu pagination>
        <Menu.Item
          disabled={currentPage === 1 || loading}
          onClick={() => onPageChange(1)}
        >
          <Icon name="angle double left" />
        </Menu.Item>
        <Menu.Item
          disabled={currentPage === 1 || loading}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Icon name="angle left" />
        </Menu.Item>
        {pages.map((page, idx) =>
          page === '...' ? (
            <Menu.Item key={`ellipsis-${idx}`} disabled>...</Menu.Item>
          ) : (
            <Menu.Item
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
              disabled={loading}
              style={page === currentPage ? { fontWeight: 'bold' } : {}}
            >
              {page}
            </Menu.Item>
          )
        )}
        <Menu.Item
          disabled={currentPage === totalPages || loading}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <Icon name="angle right" />
        </Menu.Item>
        <Menu.Item
          disabled={currentPage === totalPages || loading}
          onClick={() => onPageChange(totalPages)}
        >
          <Icon name="angle double right" />
        </Menu.Item>
      </Menu>
    </PaginationWrapper>
  );
});

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Pagination;
