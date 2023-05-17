import React from "react"
import styles from "./NotFoundBlock.module.scss"

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>Ничего не наёдено</h1>
      <span>
        к сожалению данная страница отсутствует в нашем интернет-магазине
      </span>
    </div>
  )
}

export default NotFoundBlock
