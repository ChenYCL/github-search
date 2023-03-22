import React, { useState } from 'react';
import Button from 'components/button';
import Pager from './Pager';
import './index.scss';

interface PaginationProps {
  total: number;
  defaultCurrent: number;
  defaultPageSize: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { total, defaultCurrent, defaultPageSize, onChange } = props;
  const [current, setPage] = useState(defaultCurrent); // initPageNumber
  const totalPage = Math.ceil(total / defaultPageSize);


  return (
    <div className="m-pagination flex justify-center">
      <Button
        className="btn-prev"
        onClick={() => {
          if (current < 2) return;
          setPage(current - 1);
          onChange(current - 1);
        }}
      >
        &lt;
      </Button>
      <Pager
        totalPage={totalPage}
        defaultCurrent={current}
        onChange={(current) => {
          setPage(current);
          onChange(current);
        }}
      ></Pager>
      <Button
        className="btn-next"
        onClick={() => {
          if (current >= totalPage) return;
          setPage(current + 1);
          onChange(current + 1);
        }}
      >
        &gt;
      </Button>
    </div>
  );
};

export default Pagination;
