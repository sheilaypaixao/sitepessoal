"use client";

import Image from "next/image";
import "../css/pagination.css";

import { useState, useCallback, useEffect } from 'react';
import { useRef, useImperativeHandle } from 'react';
import { cloneElement } from 'react';

import Pagination from "./Pagination";


export default function PaginationBlock({ref, children, lstUser, numberPages, numberItens}) {
  let [currentPage, setCurrentPage] = useState(1);
  var refPagination = useRef(null);

function lstUserTable(){

    let initial = numberItens * (currentPage-1);
    let final = parseInt(initial) + parseInt(numberItens);
    
    final = lstUser.length < final ? lstUser.length : final;
    let lst = lstUser.slice(initial, final);
	
    return lst;
  }

  function goToPage(page){
    refPagination.current.goToPage(page);
  }
  function goToLastPage(totalItens){
  	refPagination.current.goToLastPage(totalItens);
  }

  useImperativeHandle(ref, (totalItens, page) =>{
  	return{
  		goToLastPage: goToLastPage.bind(totalItens),
      goToPage: goToPage.bind(page)
  	}
  })

return(
		<>

		{cloneElement(children, {
          lstUserTable: lstUserTable(),
          lstUser: lstUser,
        })}

	        <Pagination ref={refPagination} lstUser={lstUser} numberPages={numberPages} numberItens={numberItens} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            
        </>
	);

}