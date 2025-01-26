"use client";
import { useRef } from 'react';
import { useState, useEffect, useImperativeHandle } from 'react';

export default function Gallery({ref, animation}) {
	var [lstPhotos, setLstPhotos] = useState([{url:"/img/galeria1.jpg", classN: "ajust-h", top:0, left:0},{url:"/img/galeria2.png", classN: "ajust-h", top:0, left:0},{url:"/img/galeria3.jpg", classN: "ajust-h", top:0, left:0},{url:"/img/galeria4.jpg", classN: "ajust-h", top:0, left:0}]);
	var [currentPhoto, setCurrentPhoto] = useState(0);
	var [dir, setDir] = useState("init");
	const refLast = useRef(0);
	const refCurrent = useRef(0);

	useEffect(()=>{
		doAnimate();
	}, [currentPhoto]);

	function doAnimate(){
		let img = (animation.indexOf("1")!=-1) ? refCurrent.current : refLast.current;

		if(img){
			img.setAttribute("class", img.className + " is-animate");
		}
		setTimeout(function(){
			if(img) img.setAttribute("class", img.className.replace(" is-animate", ""));
		}, 1000);
	}

	useImperativeHandle(ref, () => {
	    return {
	    	goToLastPhoto: goToLastPhoto,
	    	addPhoto: addPhoto,
			addPhoto2(file){
				if(file && file.type && file.type == "file"){
					const reader = new FileReader();
					reader.addEventListener("load", () => {

						let dim = getDimensions(reader.result);

						dim.then((classN) => {
							setLstPhotos([...lstPhotos, {url: reader.result, classN: classN}]);
						})
					}, false);
				
					if (file.files[0]) {
						reader.readAsDataURL(file.files[0]);
					}
				}
			}
		};
	}, [{}]);

	function goToLastPhoto(){
		
	}

	function addPhoto(imgConfig){
		setLstPhotos([...lstPhotos, imgConfig]);
		setCurrentPhoto(lstPhotos.length);
	}

	function getDimensions(url){
		var w = 454;
		var h = 312;
		let img = new Image();
		img.src = url;

		//console.log(img);
		return new Promise((resolve) => {
			img.onload = function(e){
				if(w/h > this.width/this.height){
					//ajustar pela altura
					//console.log(this.height);
					 resolve("ajust-w");
				}else{
					//console.log(this.width);
					//ajustar pela largura
					resolve("ajust-h");
				}
			};
		});

		
	}

	function nextPhoto(e){
		e.preventDefault();

		setCurrentPhoto(currentPhoto+1);
		setDir("next");

		//doAnimate();
	}

	function prevPhoto(e){
		e.preventDefault();

		setCurrentPhoto(currentPhoto-1);
		setDir("prev");
	}

	function getImgLast(){
		let photo = (dir=="next")? currentPhoto-1:currentPhoto+1;

		return <div ref={refLast} className="photo-overflow last-img"><img style={{top: `${lstPhotos[photo].top}px`, left: `${lstPhotos[photo].left}px` }} className={lstPhotos[photo].classN} src={lstPhotos[photo].url} /></div>;
	}

	return(
		<div className={"photo-molde-wrap " + animation}>
        	{currentPhoto!=0 && <a href="#" title="Prev" className="btn-prev" onClick={prevPhoto}> Prev </a>}
        	<div className="photo-molde"></div>
        	<div ref={refCurrent} className="photo-overflow current"><img style={{top: `${lstPhotos[currentPhoto].top}px`, left: `${lstPhotos[currentPhoto].left}px` }} className={lstPhotos[currentPhoto].classN} src={lstPhotos[currentPhoto].url} /></div>
        	{dir!="init" && getImgLast()}
        	{(lstPhotos.length-1)!=currentPhoto && <a href="#" title="Next" className="btn-next" onClick={nextPhoto}> Next </a>}
      	</div>
	);
}