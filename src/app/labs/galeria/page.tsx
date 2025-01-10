"use client";

import Image from "next/image";
import "./page.css";

import Gallery from "./Gallery";
import ModalCutPhoto from "./ModalCutPhoto";

import { useState, useCallback, useEffect, useRef } from 'react';

export default function Home() {
  var [select, setSelect] = useState("fadein2");
  var refGallery = useRef(null);
  var refModalCut = useRef(null);

  function changeAnimation(e){
    setSelect(e.target.value);
  }

  function changeFile(e){
    let file = e.target;
    //console.log(file);

    if (refModalCut.current !== null) {
      refModalCut.current.addPhotoToCut(file);
      refModalCut.current.open();
    }
  }

  function submitGallery(e){
    e.preventDefault();

    let file = e.target.querySelector("#fieldFile");
    
    if (refGallery.current !== null) {
      refGallery.current.addPhoto(file);
    }
  }

  function clickOpenModal(){
    if (refModalCut.current !== null) {
      refModalCut.current.open();
    }
  }

  return (
    <>

      <div className="container">
        <div className="content">

          <div className="col-fluid2">
            <div className="col-fluid-inner">
              <h2>Insira uma imagem na Galeria</h2>
            
              <form id="form-gallery" onSubmit={submitGallery}>
                <fieldset className="form-group">
                  <label htmlFor="fieldFile">Foto</label>
                  <input type="file" id="fieldFile" name="photo" onChange={changeFile} />
                </fieldset>
                <button type="submit">Adicionar</button>
              </form>

              <select name="animation" onChange={changeAnimation}>
                <option value="fadein2">Fade in</option>
                <option value="slide-lr1">Slide Left-Right 1</option>
                <option value="slide-lr2">Slide Left-Right 2</option>
                <option value="slide-rl1">Slide Right-Left 1</option>
                <option value="slide-rl2">Slide Right-Left 2</option>
                <option value="slide-tb1">Slide Top-Bottom 1</option>
                <option value="slide-tb2">Slide Top-Bottom 2</option>
                <option value="slide-bt1">Slide Bottom-Top 1</option>
                <option value="slide-bt2">Slide Bottom-Top 2</option>
              </select>

              <button type="click" onClick={clickOpenModal} >Modal</button>

              <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>
        <p>teste</p>

            </div>
          </div>

          <Gallery ref={refGallery} animation={select} />

        </div>
      </div>

      <ModalCutPhoto ref={refModalCut}/>
        
    </>
  );
}
