import Modal from "./Modal";

import { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

export default function ModalCutPhoto({ref}) {
	var refModal = useRef();
	var [imgCurrent, setImgCurrent] = useState({url:"photo_padrao.gif"});
	var [visible, setVisible] = useState(false);
	
	let zoneDrag = document.querySelector("#modal-cut");
	//var coordZone = zoneDrag.getBoundingClientRect();
	var [position, setPosition] = useState({x:0,y:0});

	useEffect(()=>{
		setCoord();
	}, [visible]);

	function setCoord(){
		var zoneDrag = document.querySelector("#modal-cut")
		var coordZone = zoneDrag && zoneDrag.getBoundingClientRect();

		console.log(zoneDrag, document.querySelector("#modal-cut"));

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
		//console.log("tesete", e.clientY, e.clientX, e);

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
		let coordDrag = drag.getBoundingClientRect();
		var coordZone = zoneDrag.getBoundingClientRect();
		let coordFinal = {};

		//console.log(zoneDrag);
		
		if(e.clientY < coordZone.top){
			coordFinal.y= coordZone.top;
		}else if(e.clientY + coordDrag.height > coordZone.bottom){
			coordFinal.y= coordZone.bottom - coordDrag.height;
		}else{
			coordFinal.y= e.clientY;
		}
		if(e.clientX < coordZone.left){
			coordFinal.x = coordZone.left;
		}else if(e.clientX + coordDrag.width > coordZone.right ){
			coordFinal.x = coordZone.right - coordDrag.width;
		}else{
			coordFinal.x = e.clientX;
		}

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
		<div>
			
		</div>
	);
}