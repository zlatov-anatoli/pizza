import React from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/index";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination, { pageRangeDisplayed } from "../components/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setSortType,setCurrentPage } from "../redux/slices/filterSlice";
import axios from "axios";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // })
  const { searchValue } = React.useContext(SearchContext);
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const sortType = useSelector((state) => state.filter.sort);
  const onChangeSort = (id) => {
    dispatch(setSortType(id));
  };

    const onChangePage = (number) => {
      dispatch(setCurrentPage(number))
    }
  React.useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";
    setIsLoading(true);

    axios
      .get(
        `https://641aef3b1f5d999a4456be63.mockapi.io/items?page=${currentPage}&limit=${pageRangeDisplayed}&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} onChangeSort={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(pageRangeDisplayed)].map((_, index) => (
              <Skeleton key={index} />
            ))
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
