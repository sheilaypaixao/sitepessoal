import { useState, useEffect, useImperativeHandle } from 'react';


export default function Modal({ref, children, callbackClose}) {
	var [visible, setVisible] = useState(false);

	useEffect(()=>{
		let body = document.querySelector("html");
		let h = body.getBoundingClientRect().height;
		let bg = document.querySelector(".modal-bg");

		body.scrollTop = 0;
		if(bg) bg.setAttribute("style","height:"+h+"px");

		//console.log(bg, h);

	}, [visible]);

	function open() {
		
		document.querySelector("body").setAttribute("style","overflow-y:hidden");

		setVisible(true);
	}

	function close(e) {
		e.preventDefault();

	    setVisible(false);
	    document.querySelector("body").setAttribute("style","overflow-y:auto");

	    callbackClose();
	}

	useImperativeHandle(ref, (e) => {
		return{
	    	open: open,
	    	close: close.bind(e)
	};
	}, [visible]);

	return(
		<>
			{visible && <div className="modal">

	          {children}

	          <a className="modal-close" href="#" onClick={close}> X </a>
	        </div>}

	        {visible && <div className="modal-bg"></div>}
        </>
	);
}