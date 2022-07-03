import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  onPage: (page: number) => void,
  currentPage: number,
}

const Pagination: React.FC<PaginationProps> = ({ onPage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onPage(event.selected + 1)}
      pageRangeDisplayed={4}
      forcePage={currentPage - 1}
      pageCount={3}
      previousLabel="<"
    />
  );
};

export default Pagination;
