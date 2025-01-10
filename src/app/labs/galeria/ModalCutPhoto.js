import Modal from "./Modal";

import { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

export default function ModalCutPhoto({ref}) {
	var refModal = useRef();
	var refZoneDrag = useRef();
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
					console.log(this.height);
					 resolve("ajust-w");
				}else{
					console.log(this.width);
					//ajustar pela largura
					resolve("ajust-h");
				}
			};
		});

		
	}

	function dragStart(e){
		let coordDrag = e.target.getBoundingClientRect();

		window.dif = e.clientY - coordDrag.y;
		console.log(dif, "start");
	}

	function drag(e){
		let coord = getPositions(e.target, e);
		//console.log(coord);

		setPosition({
          x: coord.x,
          y: coord.y
        });
	}

	function dragEnd(e){
		//console.log("tesete");
		
		let coord = getPositions(e.target, e);

		setPosition({
          x: coord.x,
          y: coord.y
        });
	}

	function dropHandler(e){
		console.log("drop");
		e.dataTransfer.dropEffect = "none";
	}

	function getPositions(drag, e){
		let zoneDrag = refZoneDrag.current;
		let coordDrag = drag.getBoundingClientRect();
		var coordZone = zoneDrag.getBoundingClientRect();
		let coordFinal = {};

		//console.log(zoneDrag);
		
		if(e.clientY - dif < coordZone.top){
			coordFinal.y= coordZone.top;
			console.log("topo", coordFinal.y);
		}else if((e.clientY - dif) + coordDrag.height > coordZone.bottom){
			coordFinal.y= coordZone.bottom - coordDrag.height;
		}else{
			coordFinal.y= e.clientY - window.dif;
		}
		if(e.clientX < coordZone.left){
			coordFinal.x = coordZone.left;
		}else if(e.clientX + coordDrag.width > coordZone.right ){
			coordFinal.x = coordZone.right - coordDrag.width;
		}else{
			coordFinal.x = e.clientX;
		}
		console.log("final", coordFinal);
		return coordFinal;
	}

	function isVisible(){
		return false;
	}

	useImperativeHandle(ref, (file) => { return {
	    	open: open,
	    	addPhotoToCut: addPhotoToCut.bind(file)
	};}, []);

	return(
		<>
		<Modal ref={refModal} callbackClose={callbackClose}>
			<h3>Corte a Foto</h3>
          	<div ref={refZoneDrag} className="modal-cut">
          		<img src={imgCurrent.url} className={imgCurrent.classN} />
          	</div>
        </Modal>
        {visible && createPortal(<div onDrop={dropHandler} style={{transform: `translate(${position.x}px, ${position.y}px)` }} draggable="true" className="frame-cut" onDrag={drag} onDragStart={dragStart} onDragEnd={dragEnd}></div>, document.body)}
        </>

	);
}