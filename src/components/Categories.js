import React from "react"

function Categories({ value, onChangeCategory }) {
  const categorogies = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ]

  return (
    <>
      <div className="categories">
        <ul>
          {categorogies.map((obj, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={value === i ? "active" : ""}
            >
              {obj}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Categories
