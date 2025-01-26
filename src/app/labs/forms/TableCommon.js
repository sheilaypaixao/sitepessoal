"use client";
import { useRef } from 'react';
import { useState } from 'react';

export default function TableCommon({lstUserTable, lstUser, setLstUser, setEdit, setRadio, setIsEdit}) {

  function handleEdit(user){
    //console.log(user);
    setIsEdit(true);
    setEdit(user);
    setRadio({gender: user.gender});
  }

  function handleDelete(user){
    setLstUser(lstUser.filter(u =>
              u.id !== user.id
            ));
  }

  function lstUserRender(){
    let users = [];

    lstUserTable.map((user, index) => {
      users.push(<tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.admin? "Sim" : "Não"}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button type="button" onClick={() => {
                      handleEdit(user);
                    }} className="btn">Editar</button>
                    <button type="button" onClick={() => {
                      handleDelete(user);
                    }} className="btn">Excluir</button>
                  </td>
                </tr>);
    });

    return users;
  }

  return (
    <>
  	<h3>Lista de Usuários</h3>
      <table>
        <thead>
          <tr>
            <th className="col-name">Nome</th>
            <th className="col-email">E-mail</th>
            <th className="col-admin">Admin</th>
            <th className="col-register">Gênero</th>
            <th className="col-action">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lstUserRender()}
        </tbody>
      </table>
    </>
  );
}