"use client";

import Image from "next/image";
import "./page.css";

import { useState, useCallback, useEffect } from 'react';
import { useRef } from 'react';

import FormCommon from "./FormCommon";
import TableCommon from "./TableCommon";
import Pagination from "../../includes/Pagination";
import PaginationBlock from "../../includes/PaginationBlock";


export default function Home() {
  var [lstUser, setLstUser] = useState([{id: 1, name:"Name teste", email: "eee@email.com", admin: true, gender: "F"},
                {id: 2,name:"Name teste 1", email: "eee@email.com", admin: true, gender: "F"},
                {id: 3,name:"Name teste 1", email: "eee@email.com", admin: true, gender: "F"},
                {id: 4,name:"Name teste 1", email: "eee@email.com", admin: true, gender: "F"},
                {id: 5,name:"Name teste 1", email: "eee@email.com", admin: true, gender: "F"},
                {id: 6,name:"Name teste 2", email: "eee@email.com", admin: true, gender: "F"},
                {id: 7,name:"Name teste 2", email: "eee@email.com", admin: true, gender: "F"},
                {id: 8,name:"Name teste 2", email: "eee@email.com", admin: true, gender: "F"},
                {id: 9,name:"Name teste 2", email: "eee@email.com", admin: true, gender: "F"},
                {id: 10,name:"Name teste 2", email: "eee@email.com", admin: true, gender: "F"},
                {id: 11,name:"Name teste 3", email: "eee@email.com", admin: true, gender: "F"},
                {id: 12,name:"Name teste 3", email: "eee@email.com", admin: true, gender: "F"},
                {id: 13,name:"Name teste 3", email: "eee@email.com", admin: true, gender: "F"},
                {id: 14,name:"Name teste 3", email: "eee@email.com", admin: true, gender: "F"},
                {id: 15,name:"Name teste 3", email: "eee@email.com", admin: true, gender: "F"},
                {id: 16,name:"Name teste 4", email: "eee@email.com", admin: true, gender: "F"},
                {id: 17,name:"Name teste 4", email: "eee@email.com", admin: true, gender: "F"},
                {id: 18,name:"Name teste 4", email: "eee@email.com", admin: true, gender: "F"},
                {id: 19,name:"Name teste 4", email: "eee@email.com", admin: true, gender: "F"},
                {id: 20,name:"Name teste 4", email: "eee@email.com", admin: true, gender: "F"},
                {id: 11,name:"Name teste 5", email: "eee@email.com", admin: true, gender: "F"},
                {id: 22,name:"Name teste 5", email: "eee@email.com", admin: true, gender: "F"},
                {id: 23,name:"Name teste 5", email: "eee@email.com", admin: true, gender: "F"},
                {id: 24,name:"Name teste 5", email: "eee@email.com", admin: true, gender: "F"},
                {id: 25,name:"Name teste 5", email: "eee@email.com", admin: true, gender: "F"},
                {id: 26,name:"Name teste 6", email: "eee@email.com", admin: true, gender: "F"},
                {id: 27,name:"Name teste 6", email: "eee@email.com", admin: true, gender: "F"},
                {id: 28,name:"Name teste 6", email: "eee@email.com", admin: true, gender: "F"},
                {id: 29,name:"Name teste 6", email: "eee@email.com", admin: true, gender: "F"},
                {id: 30,name:"Name teste 6", email: "eee@email.com", admin: true, gender: "F"},
                {id: 31,name:"Name teste 7", email: "eee@email.com", admin: true, gender: "F"},
                {id: 32,name:"Name teste 7", email: "eee@email.com", admin: true, gender: "F"},
                {id: 33,name:"Name teste 7", email: "eee@email.com", admin: true, gender: "F"},
                {id: 34,name:"Name teste 7", email: "eee@email.com", admin: true, gender: "F"},
                {id: 35,name:"Name teste 7", email: "eee@email.com", admin: true, gender: "F"},
                {id: 36,name:"Name teste 8", email: "eee@email.com", admin: true, gender: "F"},
                {id: 37,name:"Name teste 8", email: "eee@email.com", admin: true, gender: "F"}]);
  let [edit, setEdit] = useState({name:"", email:"", admin: false});
  let [radio, setRadio] = useState({gender:""});
  let [isEdit, setIsEdit] = useState(false);
  //let [currentPage, setCurrentPage] = useState(1);
  var refPagBlock = useRef<any>(null);
  //var numberPages = 5;

  useEffect(() => {
    //console.log("effect", isEdit);

    if(!isEdit){
      //callbackSubmit();
    }
  }, []);

  const callbackSubmit = useCallback(() => {
    refPagBlock.current!.goToLastPage(lstUser.length + 1);
  }, [{lstUser}]);

  return (
    <>

      <div className="container">
        <div className="content">

          <div className="col-fluid">
            <div className="box">
            <PaginationBlock ref={refPagBlock} lstUser={lstUser} numberPages="5" numberItens="5">
              
              <TableCommon />
              
            </PaginationBlock>

            </div>
          </div>

          <div className="box col-fix">
            <h3>Insira um novo Usuário:</h3>
            <FormCommon callbackSubmit={callbackSubmit} setLstUser={setLstUser} lstUser={lstUser} edit={edit} setEdit={setEdit} radio={radio} setRadio={setRadio} isEdit={isEdit} setIsEdit={setIsEdit} />
          </div>

        </div>

      </div>
    </>
  );
}
