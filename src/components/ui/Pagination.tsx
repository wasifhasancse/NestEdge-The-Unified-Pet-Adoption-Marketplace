"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current page from URL, default to 1
  const currentPage = Number(searchParams.get("page")) || 1;
  const [goToValue, setGoToValue] = useState<string>("");

  const createPageUrl = (pageNumber: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(createPageUrl(page));
    }
  };

  const handleGoToSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const targetPage = parseInt(goToValue, 10);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
      handlePageChange(targetPage);
      setGoToValue("");
    }
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 1) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Show first few pages
      for (let i = 1; i <= Math.min(5, totalPages - 1); i++) {
        pages.push(i);
      }
      // Add ellipsis if needed
      if (totalPages > 6) {
        pages.push("...");
      }
      // Add last page
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span key={`ellipsis-${index}`} className="text-muted-foreground px-1">
            ...
          </span>
        );
      }

      const isSelected = currentPage === page;

      return (
        <button
          key={page}
          onClick={() => handlePageChange(page as number)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all font-medium text-sm cursor-pointer ${
            isSelected
              ? "bg-primary text-primary-foreground shadow-md scale-110"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center my-10">
      <div className="flex items-center gap-2 bg-card border border-border px-6 py-3 rounded-full shadow-sm max-w-max">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-2">
          {renderPageNumbers()}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Go To Page Input */}
        <form onSubmit={handleGoToSubmit} className="flex items-center gap-2 ml-4 border-l pl-4 border-border text-sm text-muted-foreground">
          <span>Go to</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={goToValue}
            onChange={(e) => setGoToValue(e.target.value)}
            className="w-14 h-8 bg-primary/20 text-primary font-semibold text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span>Page</span>
        </form>
      </div>
    </div>
  );
};

export default Pagination;
