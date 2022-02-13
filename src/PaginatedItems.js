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
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
    setItemOffset(newOffset);
  };

  return (
    <>
      <Coins currentItems={currentItems} />
      <ReactPaginate
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Previous"
        previousClassName="previous"
        breakLabel="..."
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;
