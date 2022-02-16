import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Coins from "./Coins";
import "./PaginatedItems.css";

function PaginatedItems({ itemsPerPage, coinList }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [browserWidth, setBrowserWidth] = useState();

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

  const handleResize = () => {
    setBrowserWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return (
    <>
      <Coins currentItems={currentItems} />
      <ReactPaginate
        nextLabel={browserWidth <= 400 ? ">" : "> Next"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={browserWidth <= 400 ? 1 : 3}
        marginPagesDisplayed={browserWidth <= 400 ? 1 : 2}
        pageCount={pageCount}
        previousLabel={browserWidth <= 400 ? "<" : "< Prev"}
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
