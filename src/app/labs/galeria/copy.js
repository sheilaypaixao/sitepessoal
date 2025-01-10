<>
		<Modal ref={refModal} callbackClose={callbackClose}>
			<h3>Corte a Foto</h3>
          	<div id="modal-cut" className="modal-cut">
          		<img src={imgCurrent.url} className={imgCurrent.classN} />
          	</div>
        </Modal>
        {visible && createPortal(<div onDrop={dropHandler} style={{transform: `translate(${position.x}px, ${position.y}px)` }} draggable="true" className="frame-cut" onDrag={dragStart} onDragEnd={dragEnd}></div>, document.body)}
        </>


<Modal ref={refModal} callbackClose={callbackClose}>
			<h3>Corte a Foto</h3>
          	<div id="modal-cut" className="modal-cut">
          		<img src={imgCurrent.url} className={imgCurrent.classN} />
          	</div>
        </Modal>

{visible && createPortal(<div onDrop={dropHandler} style={{transform: `translate(${position.x}px, ${position.y}px)` }} draggable="true" className="frame-cut" onDrag={dragStart} onDragEnd={dragEnd}></div>, document.body)}
        

 <>
			{visible && <div className="modal">

	          {children}

	          <a className="modal-close" href="#" onClick={close}> X </a>
	        </div>}

	        {visible && <div className="modal-bg"></div>}
        </>