import React, { useRef, useState, useCallback } from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const searchDebounce = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 400),
    []
  );

  function onClickClear() {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus()
  }

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    searchDebounce(e.target.value);
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Search pizza..."
      />
      <div className={styles.closeBlock}>
        {value && (
          <img
            onClick={onClickClear}
            className={styles.close}
            src="/assets/img/close_icon.svg"
            alt="close icon"
          />
        )}
      </div>
    </div>
  );
};

export default Search;
