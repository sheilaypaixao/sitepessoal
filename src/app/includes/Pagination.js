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

	function getList(){
		return {list: false};
	}

	useImperativeHandle(ref, (page) => {
	    return {
	    	getList:getList,
	    	goToPage: goToPage.bind(page),
	      	goToLastPage(totalItens){
				goToPage(getTotalPages(totalItens));
			}
		};
	}, [totalPages, lstUser]);

	function lstPages(){
		let halfNumberPages = parseInt(numberPages/2);
		let initial = currentPage - halfNumberPages;
		initial = ( initial < 1 ) ? 1 : initial;
		let final = initial + parseInt(numberPages) - 1;

		if(final > totalPages){
			final = totalPages;
			//console.log("initital", initial);
			let newInitial = final - numberPages + 1;
			initial = (initial == 1 || newInitial < 1)? 1 : newInitial;
		}

		
		let pages = [];

		if(currentPage != 1){
			pages.push(<li key="-1"><a key="-1" href="#" onClick={(e) => {handleClickPag(parseInt(currentPage) - 1 , e)}}> anterior </a></li>);
		}

		for (let i = initial; final >= i; i++){
			pages.push(<li key={i}><a href="#" onClick={(e) => {
                      handleClickPag(i, e)
                  }} className={(i == currentPage)?"current":""}> {i} </a></li>);
		}

		if(currentPage != totalPages){
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