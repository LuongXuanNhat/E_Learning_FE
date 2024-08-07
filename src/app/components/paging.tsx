"use client";
import React, { useState, useEffect } from "react";
import { Button, Select, Option, Typography } from "@material-tailwind/react";

interface PaginationProps<T> {
  data: T[];
  itemsPerPageOptions?: number[];
  onPageChange: (items: T[]) => void;
}

function Pagination<T>({
  data,
  itemsPerPageOptions = [1, 2, 5, 10, 20, 50],
  onPageChange,
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[2]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    if (Array.isArray(data) && data.length > 0) {
      const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
      onPageChange(currentItems);
    } else {
      onPageChange([]);
    }
  }, [currentPage, itemsPerPage, data]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value: any) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const showEllipsis = totalPages > 5;

    if (showEllipsis) {
      buttons.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "filled" : "text"}
          color="blue-gray"
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>
      );

      if (currentPage > 3) {
        buttons.push(<span key="ellipsis1">...</span>);
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        buttons.push(
          <Button
            key={i}
            variant={currentPage === i ? "filled" : "text"}
            color="blue-gray"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(<span key="ellipsis2">...</span>);
      }

      buttons.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "filled" : "text"}
          color="blue-gray"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    } else {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            variant={currentPage === i ? "filled" : "text"}
            color="blue-gray"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center my-2">
        <Button
          variant="text"
          color="blue-gray"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </Button>
        {renderPaginationButtons()}
        <Button
          variant="text"
          color="blue-gray"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau
        </Button>
      </div>
      <div className="flex justify-end items-center my-2">
        <Typography className="w-36">Tổng {data.length} dòng</Typography>
        <Select
          value={itemsPerPage.toString()}
          onChange={handleItemsPerPageChange}
          label="Số mục mỗi trang"
        >
          {itemsPerPageOptions.map((option) => (
            <Option key={option} value={option.toString()}>
              {option}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default Pagination;
