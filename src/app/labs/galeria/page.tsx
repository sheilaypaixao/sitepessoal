"use client";

import Image from "next/image";
import "./page.css";

import Gallery from "./Gallery";
import ModalCutPhoto from "./ModalCutPhoto";

import { useState, useCallback, useEffect, useRef } from 'react';

export default function Home() {
  var [select, setSelect] = useState("fadein2");
  var refGallery = useRef<any>(null);
  var refModalCut = useRef<any>(null);

  function changeAnimation(e){
    setSelect(e.target.value);
  }

  function changeFile(e){
    let file = e.target;
    //console.log(file);
    
    refModalCut.current!.addPhotoToCut(file);
    refModalCut.current!.open();
  }

  function submitGallery(e){
    e.preventDefault();

    let file = e.target.querySelector("#fieldFile");
    file.value = "";
    
    let imgConfig = refModalCut.current!.getDimensionsCut();

    //console.log(imgConfig);

    refGallery.current!.addPhoto(imgConfig);
  }

  function clickOpenModal(){
    refModalCut.current!.open();
  }

  return (
    <>

      <div className="container">
        <div className="content">

          <Gallery ref={refGallery} animation={select} />

          <div className="col-fluid2">
            <div className="col-fluid-inner">

              <h2>Mudar a animação da galeria</h2>

              <fieldset>
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
              </fieldset>

              <h2>Insira uma imagem na Galeria</h2>
            
              <form id="form-gallery" onSubmit={submitGallery}>
                <fieldset className="file">
                  <label htmlFor="fieldFile">Foto</label>
                  <input type="file" required id="fieldFile" name="photo" onChange={changeFile} />
                </fieldset>
                <button type="submit">Adicionar</button>
              </form>

            </div>
          </div>

        </div>
      </div>

      <ModalCutPhoto ref={refModalCut}/>
        
    </>
  );
}
