import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Coins from "./Coins";

function PaginatedItems({ itemsPerPage, coinList }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(coinList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(coinList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, coinList]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % coinList.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      <Coins currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        activeClassName="active"
        breakClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
      />
    </>
  );
}

export default PaginatedItems;
