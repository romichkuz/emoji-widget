function getID(length){
	let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
		result.push(characters.charAt(Math.floor(Math.random() * 
	charactersLength)));
	}

   return result.join('');
}

function getUniqueID(){
	let id = getID(10);
	while (document.getElementById(id)){
		id = getID(10);
	}
	return id;
}

function htmlToDOM(html){
	let div = document.createElement('div');
	div.innerHTML = html.trim();

	return div.firstChild;
}

function createDOMWidget(){
	return htmlToDOM(`
		<div class="emoji-widget">
			<form class="emoji-widget__header">
				<label class="emoji-widget__search-bar">
					<input type="text" class="emoji-widget__search-input" placeholder="Найдите крутой эмодзи">
					<button class="emoji-widget__search-btn">
						<svg 
							width="20" 
							height="20" 
							viewBox="0 0 20 20" 
							fill="none" 
							xmlns="http://www.w3.org/2000/svg"
							class="emoji-widget__search-input-icon">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929L18.2929 19.7071L12.9056 14.3199C11.551 15.3729 9.84871 16 8 16ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" fill="#DAD8D8">
							</path>
						</svg>
					</button>
				</label>
			</form>
			<div class="emoji-widget__content">
				<div class="emoji-widget__tabs">
					<div class="emoji-widget__tab"></div>
					<div class="emoji-widget__tab"></div>
					<div class="emoji-widget__tab"></div>
				</div>
				<ul class="emoji-widget__results">
					<li class="emoji-widget__result" data-name=":tiger:">
						&#129313;
					</li>
					<li class="emoji-widget__result" data-name=":tiger:">
						&#128521
					</li>
					<li class="emoji-widget__result" data-name=":tiger:">
						&#128521
					</li>
				</ul>
			</div>
			<div class="emoji-widget__footer">
				<div class="emoji-widget__current-smile">&#129313;</div>
				<div class="emoji-widget__current-smile-name">:name::anothername</div>
			</div>
		</div>`);
}

function createWidgetStyles(){
	return htmlToDOM(`<style>`);
}

function createAppearBtn(){
	return htmlToDOM(`
		<button 
			style="padding: 0;
					background: transparent;
					outline: none;
					border: 0;
					height: 32px;
					width: 32px;
					cursor: pointer;">
						<svg id="Layer_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
							<path d="m256 512c-68.38 0-132.667-26.629-181.02-74.98-48.351-48.353-74.98-112.64-74.98-181.02s26.629-132.667 74.98-181.02c48.353-48.351 112.64-74.98 181.02-74.98s132.667 26.629 181.02 74.98c48.351 48.353 74.98 112.64 74.98 181.02s-26.629 132.667-74.98 181.02c-48.353 48.351-112.64 74.98-181.02 74.98zm0-472c-119.103 0-216 96.897-216 216s96.897 216 216 216 216-96.897 216-216-96.897-216-216-216zm93.737 260.188c-9.319-5.931-21.681-3.184-27.61 6.136-.247.387-25.137 38.737-67.127 38.737s-66.88-38.35-67.127-38.737c-5.93-9.319-18.291-12.066-27.61-6.136s-12.066 18.292-6.136 27.61c1.488 2.338 37.172 57.263 100.873 57.263s99.385-54.924 100.873-57.263c5.93-9.319 3.183-21.68-6.136-27.61zm-181.737-135.188c13.807 0 25 11.193 25 25s-11.193 25-25 25-25-11.193-25-25 11.193-25 25-25zm150 25c0 13.807 11.193 25 25 25s25-11.193 25-25-11.193-25-25-25-25 11.193-25 25z"/>
						</svg>
		</button>`);
}


function getRelativeCoords(elem){
	let elCoords = elem.getBoundingClientRect();
	let parent = elem.parentElement;

	while (parent){
		if ((parent.style.position !== "" 
			&& parent.style.position !== "static")
			|| parent.tagName === "HTML")
			break;

		parent = parent.parentElement;
	}

	let parentCoords = parent.getBoundingClientRect();
	return {
		left: elCoords.left - parentCoords.left
	}
}

function initAppearBtnPosition(input, appearBtn){
	let inputPosLeft = getRelativeCoords(input).left;
	let inputWidth = input.getBoundingClientRect().width;
	let appearBtnWidth = appearBtn.getBoundingClientRect().width;

	appearBtn.style.position = "absolute";
	appearBtn.style.left = (inputWidth + inputPosLeft) - appearBtnWidth + "px";
}

function createWidget(inputDOM){
	let widget = createDOMWidget();
	let uniqueID = getUniqueID();
	let appearBtn = createAppearBtn();

	appearBtn.setAttribute("data-id", uniqueID);
	inputDOM.setAttribute("data-id", uniqueID);
	widget.setAttribute("id", uniqueID);
	inputDOM.after(widget);
	inputDOM.after(appearBtn);

	initAppearBtnPosition(inputDOM, appearBtn);
}

let a = document.querySelector('.test-input');
createWidget(a);