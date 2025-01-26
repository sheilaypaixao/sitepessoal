"use client";
import { useRef, useImperativeHandle } from 'react';
import { useState } from 'react';

function Pagination({ref, lstUser, numberPages, numberItens, currentPage, setCurrentPage}) {
	var totalPages = getTotalPages();
	//console.log(lstUser.length, "itens", totalPages);

	function goToPage(current){
		//console.log(current, "current", totalPages);
		current = (current < 1) ? 1 : current;
		setCurrentPage(current);
	}

	function getTotalPages(totalItens){
		totalItens = (totalItens==undefined)?lstUser.length:totalItens;
		var nPagesTotal =  parseInt(totalItens/numberItens);
		return (totalItens%numberItens==0)? nPagesTotal : nPagesTotal + 1;
	}

	function handleClickPag(pag, e){
		e.preventDefault();

		goToPage(pag);
	}

	useImperativeHandle(ref, () => {
	    return {
	      	goToLastPage(totalItens){
	      		//console.log("npaginas",totalPages, lstUser.length%numberItens==0, lstUser.length);
	      		//getTotalPages(lstUser.length + 1);
				goToPage(getTotalPages(totalItens));
			}
		};
	}, [totalPages, lstUser]);

	function lstPages(){
		let halfNumberPages = parseInt(numberPages/2);
		let initial = (currentPage - halfNumberPages < 1 ) ? 1 : currentPage - halfNumberPages;
		let final = initial + parseInt(numberPages) - 1;
		final = (final > totalPages) ? totalPages : final;
		
		let pages = [];

		if(currentPage != 1){
			pages.push(<li key="-1"><a key="-1" href="#" onClick={(e) => {handleClickPag(parseInt(currentPage) - 1 , e)}}> anterior </a></li>);
		}

		for (let i = initial; final >= i; i++){
			pages.push(<li key={i}><a href="#" onClick={(e) => {
                      handleClickPag(i, e)
                  }} className={(i == currentPage)?"current":""}> {i} </a></li>);
		}

		if(currentPage != final){
			pages.push(<li key={final+1}><a href="#" onClick={(e) => {handleClickPag(parseInt(currentPage) + 1 , e)}}> proximo </a></li>);
		}
		return pages;
	}

	  return (
	  	<div className="pagination">
            <ul>
      	      {lstPages()}
            </ul>
        </div>
	  )
}

export default Pagination;