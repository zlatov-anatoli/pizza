import React from "react"
import styles from "./Search.module.scss"
import { SearchContext } from "../../App"
import debounce from "lodash.debounce"

function Search() {
  const [inputValue, setInputValue] = React.useState("")
  const { setSearchValue } = React.useContext(SearchContext)
  const inputRef = React.useRef()
  const onClickClear = () => {
    setInputValue("")
    inputRef.current.focus()
  }

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str)
    }, 300),
    []
  )

  const onCHnageInput = (e) => {
    setInputValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <form className={styles.root}>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={onCHnageInput}
        className={styles.search}
        placeholder="Введите название пиццы"
      />
      {inputValue && (
        <svg
          onClick={onClickClear}
          className={styles.closeIcon}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </form>
  )
}

export default Search
