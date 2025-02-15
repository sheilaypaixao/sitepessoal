
import {useState, useImperativeHandle, useRef} from 'react';

function ItemAccordion({data}){
	var [isVisible, setIsVisible] = useState(false);

	function handleToggleVisible(e){
		e.preventDefault();
		setIsVisible(!isVisible);
	}

	function isActive(){
		return isVisible?"active":"";
	}
	function createMarkup(html) {
		return {__html: html};
	}

	return(
		<section className={"accordion-section " + isActive()}>
			<h3><a href="#" onClick={handleToggleVisible}>{data.label}</a></h3>
			{ isVisible && 
				<div className="accordion-content"  dangerouslySetInnerHTML={createMarkup(data.content)} />
			}
		</section>
	);
}

export default function Accordion({ref, data}){

	function createMarkup(html) {
	  return {__html: html};
	}

	function lstAccordion(){
		let render = [];
		console.log(data);

		data.map((item, index) => {
			render.push(<section key={index} className="accordion-section">
				<h3><a href="#">{item.label}</a></h3>
				<div className="accordion-content"  dangerouslySetInnerHTML={createMarkup(item.content)} />
				</section>);
		});

		return render;
	}

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