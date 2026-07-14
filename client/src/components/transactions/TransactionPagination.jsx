const TransactionPagination = ({
  pagination,
  onPageChange,
}) => {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        onClick={() =>
          onPageChange(pagination.page - 1)
        }
        disabled={pagination.page === 1}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <p>
        Page {pagination.page} of{" "}
        {pagination.totalPages}
      </p>

      <button
        onClick={() =>
          onPageChange(pagination.page + 1)
        }
        disabled={
          pagination.page ===
          pagination.totalPages
        }
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default TransactionPagination;