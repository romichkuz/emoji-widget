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
	return htmlToDOM(`<div class="emoji-widget">
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



function createWidget(inputDOM){
	let widget = createDOMWidget();
	let uniqueID = getUniqueID();
	inputDOM.setAttribute("data-id", uniqueID);
	widget.setAttribute("id", uniqueID);
	inputDOM.after(widget);
}

let a = document.querySelector('.test-input');
createWidget(a);