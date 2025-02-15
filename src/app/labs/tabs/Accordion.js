
import {useState, useImperativeHandle, useRef} from 'react';

function ItemAccordion({data}){
	var [isVisible, setIsVisible] = useState(false);

	function handleToggleVisible(e){
		e.preventDefault();
		
		setIsVisible(!isVisible);
	}

	function isActiveClass(){
		return isVisible? "active" : "";
	}
	function createMarkup(html) {
		return {__html: html};
	}

	return(
		<section className={"accordion-section " + isActiveClass()}>
			<h3><a href="#" onClick={handleToggleVisible}>{data.label}</a></h3>
			{ isVisible && 
				<div className="accordion-content"  dangerouslySetInnerHTML={createMarkup(data.content)} />
			}
		</section>
	);
}

export default function Accordion({ref, data}){

	return(
		<div className="accordion">

			{ data.map((item, key)=>(
				<ItemAccordion key={key} data={item} />
			)) }
		
		</div>
	);
}

Accordion.defaultProps={
	data:[]
}