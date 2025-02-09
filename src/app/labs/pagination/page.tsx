"use client";

import { useState, useCallback, useEffect } from 'react';
import { useRef } from 'react';

import TableCommon from "../forms/TableCommon";
import Pagination from "../../includes/Pagination";
import PaginationBlock from "../../includes/PaginationBlock";


export default function Home() {
	const keepLstUser = [{id: 1, name:"Adriana da Silva", email: "eee@email.com", admin: true, gender: "F"},
                {id: 2,name:"Andreia Souza", email: "eee@email.com", admin: true, gender: "F"},
                {id: 3,name:"Marcelo Silva", email: "eee@email.com", admin: true, gender: "F"},
                {id: 4,name:"Douglas Fernando", email: "eee@email.com", admin: true, gender: "F"},
                {id: 5,name:"Sara Silva", email: "eee@email.com", admin: true, gender: "F"},
                {id: 6,name:"Brian Barbosa", email: "eee@email.com", admin: true, gender: "F"},
                {id: 7,name:"Ellen Barbosa", email: "eee@email.com", admin: true, gender: "F"},
                {id: 8,name:"Cecília Souza", email: "eee@email.com", admin: true, gender: "F"},
                {id: 9,name:"Cirilo Silva", email: "eee@email.com", admin: true, gender: "F"},
                {id: 10,name:"Moacir Moura", email: "eee@email.com", admin: true, gender: "F"},
                {id: 11,name:"Wagner Borges", email: "eee@email.com", admin: true, gender: "F"},
                {id: 12,name:"André Machado", email: "eee@email.com", admin: true, gender: "F"},
                {id: 13,name:"Rodrigo Dias", email: "eee@email.com", admin: true, gender: "F"},
                {id: 14,name:"Marcelo Almeida", email: "eee@email.com", admin: true, gender: "F"},
                {id: 15,name:"Cristiano Ronaldo", email: "eee@email.com", admin: true, gender: "F"},
                {id: 16,name:"Eduardo Souza", email: "eee@email.com", admin: true, gender: "F"},
                {id: 17,name:"Maurício Silva", email: "eee@email.com", admin: true, gender: "F"},
                {id: 18,name:"Cristiane Moura", email: "eee@email.com", admin: true, gender: "F"},
                {id: 19,name:"Daniele da Silva", email: "eee@email.com", admin: true, gender: "F"},
                {id: 20,name:"Silvia Peixoto", email: "eee@email.com", admin: true, gender: "F"},
                {id: 11,name:"Carlos Eduardo", email: "eee@email.com", admin: true, gender: "F"},
                {id: 22,name:"Carla Peixoto", email: "eee@email.com", admin: true, gender: "F"},
                {id: 23,name:"Bárbara Souza", email: "eee@email.com", admin: true, gender: "F"},
                {id: 24,name:"Milena Peixoto", email: "eee@email.com", admin: true, gender: "F"},
                {id: 25,name:"Gustavo Correa", email: "eee@email.com", admin: true, gender: "F"},
                {id: 26,name:"Sheila Paixão", email: "eee@email.com", admin: true, gender: "F"},
                {id: 27,name:"Marcelo Lima", email: "eee@email.com", admin: true, gender: "F"},
                {id: 28,name:"Naomi Lima", email: "eee@email.com", admin: true, gender: "F"},
                {id: 29,name:"Everaldo Paixão", email: "eee@email.com", admin: true, gender: "F"},
                {id: 30,name:"Marcio Souza", email: "eee@email.com", admin: true, gender: "F"},
                {id: 31,name:"Marcia Silva", email: "eee@email.com", admin: true, gender: "F"},
                {id: 32,name:"Danilo Pereira", email: "eee@email.com", admin: true, gender: "F"},
                {id: 33,name:"Daniel da Silva", email: "eee@email.com", admin: true, gender: "F"},
                {id: 34,name:"Adriano Ronaldo", email: "eee@email.com", admin: true, gender: "F"},
                {id: 35,name:"Heloísa Correa", email: "eee@email.com", admin: true, gender: "F"},
                {id: 36,name:"Leonardo Correa", email: "eee@email.com", admin: true, gender: "F"},
                {id: 37,name:"Letícia Correa", email: "eee@email.com", admin: true, gender: "F"}];
  	var [lstUser, setLstUser] = useState(keepLstUser);
  	var refPagBlock = useRef<any>(null);
  	var [numberItens, setNumberItens] = useState("5");
  	var [numberPages, setNumberPages] = useState("5");

  	function changeNumberItens(e){
  		let val = e.target.value;
  		setNumberItens(val);
        refPagBlock.current!.goToPage(1);
  	}

  	function changeNumberPages(e){
  		let val = e.target.value;
  		setNumberPages(val);
        refPagBlock.current!.goToPage(1);
  	}

    function doSearch(e){
        let query = e.target.value;

        setLstUser(keepLstUser.filter((el) => el.name.toLowerCase().includes(query.toLowerCase())));
        refPagBlock.current!.goToPage(1);
    }

	return(
		<>
	<div className="container">
        <div className="content">

        <div className="col-fluid">
            <div className="box">

            <fieldset className="text">
                <label htmlFor="name">Pesquise um nome:</label>
                <input type="text" id="search" name="search" onChange={doSearch} />
            </fieldset>
            
      
			<PaginationBlock ref={refPagBlock} lstUser={lstUser} numberPages={numberPages} numberItens={numberItens}>
              
        	<TableCommon />
              
        	</PaginationBlock>
			
			</div>
        </div>

        <div className="box col-fix">
        	<fieldset className="text"> 
  		  		<label htmlFor="name">Número de Items por página:</label>
        		<input type="text" placeholder={numberItens} required id="n-itens" name="n-itens" onChange={changeNumberItens} />
      		</fieldset>
      		<fieldset className="text"> 
  		  		<label htmlFor="name">Número de Items na paginação:</label>
        		<input type="text" placeholder={numberPages} required id="n-page" name="n-page" onChange={changeNumberPages} />
      		</fieldset>
      
        </div>

        </div>

      </div>
		</>
	);
}