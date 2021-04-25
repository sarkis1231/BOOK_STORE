import {useEffect,useState} from 'react';
import usePrevious from "./usePrevious";

const usePagination = (itemsPerPage, data, startFrom, remove = false) => {
    const perPage = itemsPerPage || 10;
    const pages = Math.ceil(data.length / perPage);
    const pagination = [];
    const [currentPage, setCurrentPage] = useState(() => startFrom <= pages ? startFrom : 1);
    const [slicedData, setSlicedData] = useState(() => data);
    const prevDataLength = usePrevious(data.length)
    useEffect(() => {
        if(!data.length) {
            return;
        }
        if(data?.length !== prevDataLength?.length) {
            setSlicedData(() => [...data].slice((currentPage - 1) * perPage, currentPage * perPage));
        }

    }, [data.length, prevDataLength?.length, currentPage, perPage, data]);
    let ellipsisLeft = false;
    let ellipsisRight = false;

    for (let i = 1; i <= pages; i += 1) {
        if (i === currentPage) {
            pagination.push({ id: i, current: true, ellipsis: false });
        } else if (i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1) {
            pagination.push({ id: i, current: false, ellipsis: false });
        } else if (i > 1 && i < currentPage && !ellipsisLeft) {
            pagination.push({ id: i, current: false, ellipsis: true });
            ellipsisLeft = true;
        } else if (i < pages && i > currentPage && !ellipsisRight) {
            pagination.push({ id: i, current: false, ellipsis: true });
            ellipsisRight = true;
        }
    }

    const changePage = (page, e) => {
        e.preventDefault();
        if (page !== currentPage) {
            setCurrentPage(page);
            setSlicedData([...data].slice((page - 1) * perPage, page * perPage));
            // setIndex(prev => prev - ((currentPage - page) * itemsPerPage))
        }
    };

    const goToPrevPage = e => {
        e.preventDefault();
        setCurrentPage(prevVal => (prevVal - 1 === 0 ? prevVal : prevVal - 1));
        if (currentPage !== 1) {
            setSlicedData([...data].slice((currentPage - 2) * perPage, (currentPage - 1) * perPage));
            // setIndex((prev) => prev - itemsPerPage)
        }
    };

    const goToNextPage = e => {
        e.preventDefault();
        setCurrentPage(prevVal => (prevVal === pages ? prevVal : prevVal + 1));
        if (currentPage !== pages) {
            setSlicedData([...data].slice(currentPage * perPage, (currentPage + 1) * perPage));
            // setIndex((prev) => prev + itemsPerPage)
        }
    };

    useEffect(() => {
        if (remove) {
            if ([...data].slice((currentPage - 1) * perPage, currentPage * perPage).length < 1) {
                setSlicedData([...data].slice((currentPage - 2) * perPage, (currentPage - 1) * perPage));
                setCurrentPage(prev => prev - 1);
            }
        }
    }, [data, remove, currentPage, perPage]);

    return {
        slicedData,
        pagination,
        prevPage: goToPrevPage,
        nextPage: goToNextPage,
        changePage,
        currentPage,
    };
};
export default usePagination;