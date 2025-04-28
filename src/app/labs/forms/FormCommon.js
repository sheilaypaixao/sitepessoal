"use client";
import { useRef, useEffect } from 'react';
import { useState } from 'react';

export default function FormCommon({callbackSubmit, lstUser, setLstUser, edit, setEdit, radio, setRadio, isEdit, setIsEdit}) {
  
  //console.log(edit);

  useEffect(() => {
    //console.log("effect form");
    if(!isEdit){
      //callbackSubmit();
    }
  },[{isEdit}]);

  function handleSubmit(e){
    e.preventDefault();

    let form = e.target;

    if(isEdit){
       const nextCounters = lstUser.map((user, i) => {
        if (user.id === edit.id) {
          return getValues(form, user.id);
        } else {
          return user;
        }
      });
      setLstUser(nextCounters);
      setIsEdit(false);
    }else{
      setLstUser([...lstUser, getValues(form)]);
      //console.log(lstUser.length, "logo depois");
      
      callbackSubmit();
    }
    
    handleCancel(e);
  }

  function getValues(form, id){
    let gender = "";

    if(form.querySelector("#genderM").checked){
      gender = "M";
    }else if(form.querySelector("#genderF").checked){
      gender = "F";
    }

    return {id: id ? id : getLastId() + 1,
                name: form.querySelector("#name").value,
                email: form.querySelector("#email").value,
                gender: gender,
                admin: form.querySelector("#admin").checked};
  }

  function getLastId(){
    return lstUser.length == 0 ? 0 : lstUser[lstUser.length - 1].id;
  }

  function handleCancel(e){
    setEdit({name:"", email:"", admin: false});
    setRadio({gender:""});
    setIsEdit(false);

    //console.log(edit, radio);
  }

  return (
  	<form className="form-user" onSubmit={handleSubmit}>
      <fieldset className="text"> 
  		  <label htmlFor="name">Nome</label>
        <input type="text" required id="name" placeholder="Digite o nome do usuário" name="name" value={edit.name} onChange={e => setEdit(prevState => ({...prevState, name:e.target.value}))}/>
      </fieldset>
      <fieldset className="radio">
        <h4>Gênero</h4>
        <input type="radio" required id="genderM" name="gender" value="M" checked={radio.gender === "M"} onChange={e => setRadio({gender:e.target.value})} />
        <label htmlFor="genderM">Masculino</label>
        <br/><input type="radio" required id="genderF" name="gender" value="F" checked={radio.gender === "F"} onChange={e => setRadio({gender:e.target.value})} />
        <label htmlFor="genderF">Feminino</label>
      </fieldset>
      <fieldset className="text">
        <label htmlFor="email">Email</label>
        <input type="email" required id="email" placeholder="Digite o email do usuário" name="email" value={edit.email} onChange={e => setEdit(prevState => ({...prevState, email:e.target.value}))}/>
      </fieldset>
      <fieldset>
          <input type="checkbox" id="admin" name="admin" checked={edit.admin} onChange={e => setEdit(prevState => ({...prevState, admin:e.target.value}))}/>
          <label htmlFor="admin"> Administrador</label>
      </fieldset>

      <button type="submit" className="btn btn-success">Salvar</button>
      {isEdit && <button onClick={handleCancel} type="reset" className="btn">Cancelar</button>}
  	</form>
  );
}