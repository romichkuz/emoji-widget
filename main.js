// Utils
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

// END Utils



// Categories
CATEGORIES_VIEW = {
	1: `<svg id="Layer_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="tab-icon">
			<g>
				<path d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm0 482c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"></path>
				<path d="m374.931 292h-237.863c-8.284 0-15 6.716-15 15v2.068c0 73.851 60.081 133.932 133.932 133.932s133.932-60.081 133.932-133.931v-2.069c-.001-8.284-6.717-15-15.001-15zm-161.296 111.964c8.297-8.953 24.456-14.964 41.838-14.964 17.668 0 34.005 6.213 42.155 15.294-12.752 5.596-26.834 8.706-41.628 8.706-15.081 0-29.419-3.233-42.365-9.036zm109.544-15.657c-13.38-17.769-39.036-29.307-67.706-29.307-28.319 0-53.795 11.193-67.31 28.739-19.009-16.414-32.032-39.581-35.294-65.738h206.262c-3.299 26.458-16.584 49.861-35.952 66.306z"></path>
				<path d="m142.959 216.886 28.292-38.478c.008-.011.016-.021.023-.031.011.013.021.028.033.044l28.512 38.506c4.929 6.657 14.324 8.058 20.981 3.129 6.658-4.93 8.059-14.324 3.129-20.981l-28.512-38.505c-5.739-7.75-14.537-12.193-24.145-12.193-.011 0-.023 0-.034 0-9.632.011-18.438 4.481-24.159 12.262l-28.292 38.478c-4.907 6.674-3.475 16.063 3.199 20.971 2.676 1.968 5.788 2.916 8.874 2.916 4.611-.003 9.16-2.12 12.099-6.118z"></path>
				<path d="m364.668 160.568c-5.739-7.75-14.537-12.193-24.145-12.193-.011 0-.023 0-.034 0-9.632.011-18.438 4.481-24.159 12.262l-28.292 38.478c-4.907 6.674-3.475 16.063 3.199 20.971 2.676 1.968 5.788 2.916 8.874 2.916 4.609 0 9.158-2.117 12.097-6.115l28.292-38.478c.008-.011.016-.021.023-.031.011.013.021.028.033.044l28.512 38.506c4.93 6.657 14.323 8.058 20.981 3.129 6.658-4.93 8.059-14.324 3.129-20.981z"></path>
			</g>
		</svg>`
}

function getRenderedCategory(category){
	let categorySmile = htmlToDOM(CATEGORIES_VIEW[category]);
	let btn = document.createElement("button");
	btn.setAttribute("data-category", category);
	btn.classList.add("emoji-widget__category");
	btn.append(categorySmile);

	return btn;
}

function addCategoryToWidget(category, widget){
	let categoryDOM = getRenderedCategory(category);

	widget.querySelector(".emoji-widget__categories").append(categoryDOM);
}

// END Categories




// TODO Rename methods according to input
function getRelativeCoordsToFirstNonStaticParent(elem){
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


// AppearBtn
function initAppearBtnPosition(input, appearBtn){
	let inputPosLeft = getRelativeCoordsToFirstNonStaticParent(input).left;
	let inputWidth = input.getBoundingClientRect().width;
	let appearBtnWidth = appearBtn.getBoundingClientRect().width;

	appearBtn.style.position = "absolute";
	appearBtn.style.left = (inputWidth + inputPosLeft) - appearBtnWidth + "px";
}

function renderAppearBtn(){
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

// END AppearBtn

// Show/Hide widget
HIDDEN_WIDGET_CLASS = "emoji-widget--hidden";

function isWidgetHidden(widget){
	return widget.classList.contains(HIDDEN_WIDGET_CLASS);
}

function hideWidget(widget){
	widget.classList.add(HIDDEN_WIDGET_CLASS);
}

function showWidget(widget){
	widget.classList.remove(HIDDEN_WIDGET_CLASS);
}

function onAppearBtnClicked(e){
	let id = e.target.parentElement.getAttribute("data-id");
	let currWidget = document.getElementById(id);

	if (isWidgetHidden(currWidget))
		showWidget(currWidget);
	else
		hideWidget(currWidget);
}


// END Show/Hide widget


// Emojies 

function renderEmoji(emoji){
	return htmlToDOM(`
		<li class="emoji-widget__result" 
			data-name="${emoji["name"]}"
			data-category="${emoji["category"]}"
			data-description="${emoji["description"]}">
			<button>
				${emoji["html"]}
			</button>
		</li>`);
}

function addEmojiToWidget(emoji, widget){
	let emojiesList = widget.querySelector(".emoji-widget__results");
	let emojiDOM = renderEmoji(emoji);

	emojiesList.append(emojiDOM);

	return emojiDOM;
}

// END Emojies


// Showing current emoji
function setEmojiAsCurrent(widget, emojiDOM){
	let emojiName = emojiDOM.getAttribute("data-name");
	let emojiSmile = emojiDOM.querySelector("button").innerText;

	widget.querySelector(".emoji-widget__current-smile").innerHTML = emojiSmile;
	widget.querySelector(".emoji-widget__current-smile-name").innerHTML = emojiName;
}
// END Showing current emoji

// Widget
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
				<div class="emoji-widget__categories">
				</div>
				<ul class="emoji-widget__results">
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
	let appearBtn = renderAppearBtn();
	const categories = [1];
	const emojies = [
		{
			"emoji": "😂", 
			"name": "face with tears of joy", 
			"html": "&#128514;", 
			"category": 1, 
			"description": "face-smiling"
		},
    	{
    		"emoji": "❤️", 
    		"name": "red heart", 
    		"html": "&#10084;", 
    		"category": 1, 
    		"description": "emotion"
    	},
    ];

	for (const cat of categories){
		addCategoryToWidget(cat, widget);
	}

	for (const emoji of emojies){
		let emojiDOM = addEmojiToWidget(emoji, widget);
		emojiDOM.addEventListener("mouseover", function(e){
			setEmojiAsCurrent(widget, emojiDOM);
		});
	}

	appearBtn.setAttribute("data-id", uniqueID);
	appearBtn.addEventListener("click", onAppearBtnClicked);
	inputDOM.setAttribute("data-id", uniqueID);
	widget.setAttribute("id", uniqueID);
	inputDOM.after(widget);
	inputDOM.after(appearBtn);
	hideWidget(widget);

	initAppearBtnPosition(inputDOM, appearBtn);
}


// END Widget

let a = document.querySelector('.test-input');
createWidget(a);