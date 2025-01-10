import { useState, useEffect, useImperativeHandle } from 'react';


export default function Modal({ref, children, callbackClose}) {
	var [visible, setVisible] = useState(false);

	function open() {
		setVisible(true);
		document.querySelector("body").setAttribute("style","overflow-y:hidden");
	}

	function close(e) {
		e.preventDefault();

	    setVisible(false);
	    document.querySelector("body").setAttribute("style","overflow-y:auto");

	    callbackClose();
	}

	useImperativeHandle(ref, () => {
		return{
	    	open,
	    	close
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