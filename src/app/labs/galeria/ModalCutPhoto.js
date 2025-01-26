import Modal from "./Modal";

import { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

export default function ModalCutPhoto({ref}) {
	var refModal = useRef();
	var refZoneDrag = useRef();
	var refDrag = useRef();
	var [imgCurrent, setImgCurrent] = useState({url:"photo_padrao.gif"});
	var [visible, setVisible] = useState(false);
	var [position, setPosition] = useState({x:0,y:0});

	useEffect(()=>{
		setCoord();
	}, [visible]);

	function setCoord(){
		var zoneDrag = refZoneDrag.current;
		var coordZone = zoneDrag && zoneDrag.getBoundingClientRect();

		if(coordZone){
			setPosition({
          		x: coordZone.left,
          		y: coordZone.top
        	});
		}

	}

	function open() {
		refModal.current.open();
		setVisible(true);
	}

	function callbackClose(){
		setVisible(false);
	}

	function addPhotoToCut(file) {

		if(file && file.type && file.type == "file"){
			const reader = new FileReader();
			reader.addEventListener("load", () => {

				let dim = getDimensions(reader.result);

				dim.then((classN) => {
					setImgCurrent(prevState => ({...prevState, url: reader.result, classN: classN}));
				})
			}, false);
		
			if (file.files[0]) {
				reader.readAsDataURL(file.files[0]);
			}
		}
	}

	function getDimensions(url){
		var w = 454;
		var h = 308;
		let img = new Image();
		img.src = url;

		//console.log(img);
		return new Promise((resolve) => {
			img.onload = function(e){
				if(w/h > this.width/this.height){
					//ajustar pela altura
					 resolve("ajust-w");
				}else{
					//ajustar pela largura
					resolve("ajust-h");
				}
			};
		});

		
	}

	function dragStart(e){
		let coordDrag = e.target.getBoundingClientRect();

		window.difY = e.clientY - coordDrag.y;
		window.difX = e.clientX - coordDrag.x;
	}

	function drag(e){
		let coord = getPositions(e.target, e);
		
		setPosition({
          x: coord.x,
          y: coord.y
        });
	}

	function dragEnd(e){
		let coord = getPositions(e.target, e);

		setPosition({
          x: coord.x,
          y: coord.y
        });

		setDimensionsCut();
	}

	function dropHandler(e){
		e.dataTransfer.dropEffect = "move";
	}

	function setDimensionsCut(){
		let coordDrag = refDrag.current.getBoundingClientRect();
		var coordZone = refZoneDrag.current.getBoundingClientRect();

		window.imgCut = {...imgCurrent, top: coordZone.top - coordDrag.top, left: coordZone.left - coordDrag.left};
	}

	function getDimensionsCut(){
		return window.imgCut;
	}

	function getPositions(drag, e){
		let zoneDrag = refZoneDrag.current;
		let coordDrag = drag.getBoundingClientRect();
		var coordZone = zoneDrag.getBoundingClientRect();
		let coordFinal = {};

		//console.log(zoneDrag);
		
		if(e.clientY - difY < coordZone.top){
			coordFinal.y= coordZone.top;
		}else if((e.clientY - difY) + coordDrag.height > coordZone.bottom){
			coordFinal.y= coordZone.bottom - coordDrag.height;
		}else{
			coordFinal.y= e.clientY - window.difY;
		}

		if(e.clientX - difX < coordZone.left){
			coordFinal.x = coordZone.left;
		}else if((e.clientX - difX) + coordDrag.width > coordZone.right ){
			coordFinal.x = coordZone.right - coordDrag.width;
		}else{
			coordFinal.x = e.clientX - window.difX;
		}

		return coordFinal;
	}

	function isVisible(){
		return false;
	}

	function onClickCut(e){
		setDimensionsCut();
		refModal.current.close(e);
	}

	useImperativeHandle(ref, (file) => { return {
	    	open: open,
	    	addPhotoToCut: addPhotoToCut.bind(file),
	    	getDimensionsCut: getDimensionsCut
	};}, []);

	return(
		<>
		<Modal ref={refModal} callbackClose={callbackClose}>
			<h3>Corte a Foto</h3>
          	<div ref={refZoneDrag} className="modal-cut">
          		<img src={imgCurrent.url} className={imgCurrent.classN} />
          	</div>
          	<button type="button" onClick={onClickCut}>Cortar</button>
        </Modal>
        {visible && createPortal(<div ref={refDrag} onDrop={dropHandler} style={{transform: `translate(${position.x}px, ${position.y}px)` }} draggable="true" className="frame-cut" onDrag={drag} onDragStart={dragStart} onDragEnd={dragEnd}></div>, document.body)}
        </>

	);
}