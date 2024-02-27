import React, { useContext } from "react";
import qs from 'qs';
import axios from "axios";
import Categories from '../components/Categories';
import { useNavigate, Link } from "react-router-dom";
import Sort, { List } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useEffect, useState } from 'react';
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

import { setCategoryId, setCurrentPage, setFilters } from "../redux/Slices/filterSlice";
import { useDispatch, useSelector } from 'react-redux';
import pizzaSlice, { setItems, fetchPizzas } from "../redux/Slices/pizzaSlice";



const Home = () => {

    const navigate = useNavigate();
    const categoryId = useSelector((state) => state.filter.categoryId);
    const dispatch = useDispatch();
    const sortId = useSelector((state) => state.filter.sort.sortProperty);
    const currentPage = useSelector((state) => state.filter.currentPage);

    // const {sortId, currentPage, categoryId } = useSelector((state) => state.filter);
    // const { items, status } = useSelector((state) => state.pizza);
    
    const [items, setItems] = useState([]); // локальный state лоокальное сохранение
    const { searchValue } = useContext(SearchContext);
    const [isLoading, setIsLoading] = useState(true);

    // const [currentPage, setCurrentPage] = useState(1); сделан через редакс 
    // const [categoryId, setCategoryId] = useState(0);
    // const [sortId, setSortId] = useState({
    //     name: 'популярности',
    //     sortProperty: 'rating',
    // });

    const onClickategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
        setCurrentPage(number)
    }

    // console.log(currentPage);    

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = List.find((obj) => obj.sortProperty === params.sortProperty);
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
        }
    }, [])

    useEffect(() => {

        // setIsLoading(true);

        // const sortBy = sortId.replace('-', '');
        // const order = sortId.includes('-') ? 'asc' : 'desc';
        // const category = categoryId > 0 ? `category=${categoryId}` : '';
        // const search = searchValue ? `&search=${searchValue}` : ''; // эсли хотим использовать поиск через фетч
        getPizzas();
        
        // fetch(`https://65cb7a20efec34d9ed879c10.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}`,)
        //     .then((response) => response.json())
        //     .then((arr) => {
        //         setItems(arr);
        //         setIsLoading(false);
        //     });

        // axios.get(`https://65cb7a20efec34d9ed879c10.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
        // .then((response) => {
        //     setItems(response.data);
        //     setIsLoading(false);
        // })
        // window.scrollTo(0, 0); // чтобы при рендеринге нас опрокидоваль вверх страницу

    }, [categoryId, sortId, searchValue, currentPage]);

    const getPizzas = async () => {
        setIsLoading(true);  

        const sortBy = sortId.replace('-', '');
        const order = sortId.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : ''; // эсли хотим использовать поиск через фетч

        axios.get(`https://65cb7a20efec34d9ed879c10.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then((response) => {
            setItems(response.data);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
        }); //для then этот метод подходить  а если будет js коды то тогда через try catch

        // внизу сокращения этого кода более удобен и мы избавилис от thenа потому что результат мы храним здесь в response

        // try {
        //     const { data } = await axios.get(`https://65cb7a20efec34d9ed879c10.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`);
            
        //     dispatch(items(data));

        //     setItems(response.data);

        //     dispatch(
        //         getPizzas({
        //             sortBy,
        //             order,
        //             category,
        //             search,
        //             currentPage,
        //     }));

        // } catch (err) {
        //     console.log("ERROR Async", err);
        //     alert('ошибка при получении пицц');
        // } 
        // finally {
        //     setIsLoading(false);
        // }

        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sortId,
            categoryId,
            currentPage,
        });
        // console.log(queryString);
        navigate(`?${queryString}`);
    }, [categoryId, sortId, currentPage]);

    // const pizzass = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    // const skeletons = [... new Array(4)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickategory={onClickategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {isLoading  ? [... new Array(4)].map((_, index) => <Skeleton key={index} />)
                    : items.filter(obj => {
                        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                            return true;
                        }
                        return false
                    }).map((obj) => ( <Link key={obj.id} to={`/pizza/${obj.id}`}>  <PizzaBlock  {...obj} /></Link> ))
                }


                {/* filter(obj => {
                        if(obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                            return true;
                        }
                        return false; это для статичной поисковик применяется перед мапом в isLoading сделан через фильтр 
                */}
                {/* {items.map((obj) => (<Skeleton key={obj.id}  {...obj}/>))} */}

                {/* title={obj.title} 
                price={obj.price} 
                imageUrl={obj.imageUrl} 
                sizes={obj.sizes}
                types={obj.types} это сокращение- pizzas уменшение кода 
                берет все из объекта и за делает этот код тип прайс и так д  */}

                {/* <PizzaBlock title="Кыргызская" price={600} />
              <PizzaBlock title="Мексиканская" price={350} /> */}

            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;