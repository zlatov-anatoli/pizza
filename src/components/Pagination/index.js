import React from "react"
import styles from "./Pagination.module.scss"
import ReactPaginate from "react-paginate"
export const pageRangeDisplayed = 4
function Pagination({value,  onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={3}
      forcePage={value - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
