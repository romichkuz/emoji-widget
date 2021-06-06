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


// получаем координаты элемента в контексте документа
function getCoords(elem) {
	let box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}

function getNonStaticParent(elem){
	let parent = elem.parentElement;

	while (parent){
		if ((parent.style.position !== "" 
			&& parent.style.position !== "static")
			|| parent.tagName === "HTML")
			break;

		parent = parent.parentElement;
	}

	return parent;
}

function getRelativeCoordsToFirstNonStaticParent(elem){
	let elCoords = getCoords(elem);
	let parent = getNonStaticParent(elem);

	let parentCoords = getCoords(parent);

	return {
		left: elCoords.left - parentCoords.left,
		top: elCoords.top - parentCoords.top
	}
}

function searchEmojies(query){
	return emojies.filter(emoji => emoji.name.indexOf(query) > -1);
}
// END Utils


// intersection api - подгрузка как в ленте в вк, поиск идет сразу в бд (не в DOM)


const categories = ["0", "1", "2"];
let emojies = [];

const CATEGORIES_VIEW = {
	"0":`<svg id="Layer_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="tab-icon">
			<g>
				<path d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm0 482c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"></path>
				<path d="m374.931 292h-237.863c-8.284 0-15 6.716-15 15v2.068c0 73.851 60.081 133.932 133.932 133.932s133.932-60.081 133.932-133.931v-2.069c-.001-8.284-6.717-15-15.001-15zm-161.296 111.964c8.297-8.953 24.456-14.964 41.838-14.964 17.668 0 34.005 6.213 42.155 15.294-12.752 5.596-26.834 8.706-41.628 8.706-15.081 0-29.419-3.233-42.365-9.036zm109.544-15.657c-13.38-17.769-39.036-29.307-67.706-29.307-28.319 0-53.795 11.193-67.31 28.739-19.009-16.414-32.032-39.581-35.294-65.738h206.262c-3.299 26.458-16.584 49.861-35.952 66.306z"></path>
				<path d="m142.959 216.886 28.292-38.478c.008-.011.016-.021.023-.031.011.013.021.028.033.044l28.512 38.506c4.929 6.657 14.324 8.058 20.981 3.129 6.658-4.93 8.059-14.324 3.129-20.981l-28.512-38.505c-5.739-7.75-14.537-12.193-24.145-12.193-.011 0-.023 0-.034 0-9.632.011-18.438 4.481-24.159 12.262l-28.292 38.478c-4.907 6.674-3.475 16.063 3.199 20.971 2.676 1.968 5.788 2.916 8.874 2.916 4.611-.003 9.16-2.12 12.099-6.118z"></path>
				<path d="m364.668 160.568c-5.739-7.75-14.537-12.193-24.145-12.193-.011 0-.023 0-.034 0-9.632.011-18.438 4.481-24.159 12.262l-28.292 38.478c-4.907 6.674-3.475 16.063 3.199 20.971 2.676 1.968 5.788 2.916 8.874 2.916 4.609 0 9.158-2.117 12.097-6.115l28.292-38.478c.008-.011.016-.021.023-.031.011.013.021.028.033.044l28.512 38.506c4.93 6.657 14.323 8.058 20.981 3.129 6.658-4.93 8.059-14.324 3.129-20.981z"></path>
			</g>
		</svg>`,
	"1": `<svg id="Layer_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="tab-icon">
			<g>
				<path d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm0 482c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"></path>
				<path d="m374.931 292h-237.863c-8.284 0-15 6.716-15 15v2.068c0 73.851 60.081 133.932 133.932 133.932s133.932-60.081 133.932-133.931v-2.069c-.001-8.284-6.717-15-15.001-15zm-161.296 111.964c8.297-8.953 24.456-14.964 41.838-14.964 17.668 0 34.005 6.213 42.155 15.294-12.752 5.596-26.834 8.706-41.628 8.706-15.081 0-29.419-3.233-42.365-9.036zm109.544-15.657c-13.38-17.769-39.036-29.307-67.706-29.307-28.319 0-53.795 11.193-67.31 28.739-19.009-16.414-32.032-39.581-35.294-65.738h206.262c-3.299 26.458-16.584 49.861-35.952 66.306z"></path>
				<path d="m142.959 216.886 28.292-38.478c.008-.011.016-.021.023-.031.011.013.021.028.033.044l28.512 38.506c4.929 6.657 14.324 8.058 20.981 3.129 6.658-4.93 8.059-14.324 3.129-20.981l-28.512-38.505c-5.739-7.75-14.537-12.193-24.145-12.193-.011 0-.023 0-.034 0-9.632.011-18.438 4.481-24.159 12.262l-28.292 38.478c-4.907 6.674-3.475 16.063 3.199 20.971 2.676 1.968 5.788 2.916 8.874 2.916 4.611-.003 9.16-2.12 12.099-6.118z"></path>
				<path d="m364.668 160.568c-5.739-7.75-14.537-12.193-24.145-12.193-.011 0-.023 0-.034 0-9.632.011-18.438 4.481-24.159 12.262l-28.292 38.478c-4.907 6.674-3.475 16.063 3.199 20.971 2.676 1.968 5.788 2.916 8.874 2.916 4.609 0 9.158-2.117 12.097-6.115l28.292-38.478c.008-.011.016-.021.023-.031.011.013.021.028.033.044l28.512 38.506c4.93 6.657 14.323 8.058 20.981 3.129 6.658-4.93 8.059-14.324 3.129-20.981z"></path>
			</g>
		</svg>`,
	"2": `<svg id="Layer_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="tab-icon">
			<g>
				<path d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm0 482c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"></path>
				<path d="m374.931 292h-237.863c-8.284 0-15 6.716-15 15v2.068c0 73.851 60.081 133.932 133.932 133.932s133.932-60.081 133.932-133.931v-2.069c-.001-8.284-6.717-15-15.001-15zm-161.296 111.964c8.297-8.953 24.456-14.964 41.838-14.964 17.668 0 34.005 6.213 42.155 15.294-12.752 5.596-26.834 8.706-41.628 8.706-15.081 0-29.419-3.233-42.365-9.036zm109.544-15.657c-13.38-17.769-39.036-29.307-67.706-29.307-28.319 0-53.795 11.193-67.31 28.739-19.009-16.414-32.032-39.581-35.294-65.738h206.262c-3.299 26.458-16.584 49.861-35.952 66.306z"></path>
				<path d="m142.959 216.886 28.292-38.478c.008-.011.016-.021.023-.031.011.013.021.028.033.044l28.512 38.506c4.929 6.657 14.324 8.058 20.981 3.129 6.658-4.93 8.059-14.324 3.129-20.981l-28.512-38.505c-5.739-7.75-14.537-12.193-24.145-12.193-.011 0-.023 0-.034 0-9.632.011-18.438 4.481-24.159 12.262l-28.292 38.478c-4.907 6.674-3.475 16.063 3.199 20.971 2.676 1.968 5.788 2.916 8.874 2.916 4.611-.003 9.16-2.12 12.099-6.118z"></path>
				<path d="m364.668 160.568c-5.739-7.75-14.537-12.193-24.145-12.193-.011 0-.023 0-.034 0-9.632.011-18.438 4.481-24.159 12.262l-28.292 38.478c-4.907 6.674-3.475 16.063 3.199 20.971 2.676 1.968 5.788 2.916 8.874 2.916 4.609 0 9.158-2.117 12.097-6.115l28.292-38.478c.008-.011.016-.021.023-.031.011.013.021.028.033.044l28.512 38.506c4.93 6.657 14.323 8.058 20.981 3.129 6.658-4.93 8.059-14.324 3.129-20.981z"></path>
			</g>
		</svg>`
}


// Вынести значения в константы, например дефолтная категория
// Сделать статическую переменную с эмоджи

class Widget {
	constructor(){
		this.input = null;
		this.widget = null;
		this.id = null;
		this.appearBtn = null;
		this.recentlyUsedEmojies = [];
		this.currentCategory = "0";
		this.showingResults = false;
	}

	render(){
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
				<div class="emoji-widget__current-smile"></div>
				<div class="emoji-widget__current-smile-name"></div>
			</div>
		</div>`);
	}

	renderCategory(category){
		return htmlToDOM(
				`<button class="emoji-widget__category" data-category="${category}">
				${CATEGORIES_VIEW[category]}
				</button>`);
	}

	addCategory(category){
		let categoryDOM = this.renderCategory(category);

		this.widget.querySelector(".emoji-widget__categories").append(categoryDOM);

		return categoryDOM;
	}

	setActiveCategory(category){
		let cats = this.widget.querySelectorAll(".emoji-widget__category");
		let cat = this.widget.querySelector(`button[data-category="${category}"]`);
		this.currentCategory = category.toString();

		for (const cat of cats){
			cat.classList.remove("emoji-widget__category--active");
		}

		cat.classList.add("emoji-widget__category--active");
	}

	renderAppearBtn(){
		return htmlToDOM(`
			<button 
				class="emoji-widget__toggler"
				style="padding: 0;
						background: transparent;
						outline: none;
						width: 30px;
						height: 30px;
						border: 0;
						position: absolute;
						cursor: pointer;">
							<svg id="Layer_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
								<path d="m256 512c-68.38 0-132.667-26.629-181.02-74.98-48.351-48.353-74.98-112.64-74.98-181.02s26.629-132.667 74.98-181.02c48.353-48.351 112.64-74.98 181.02-74.98s132.667 26.629 181.02 74.98c48.351 48.353 74.98 112.64 74.98 181.02s-26.629 132.667-74.98 181.02c-48.353 48.351-112.64 74.98-181.02 74.98zm0-472c-119.103 0-216 96.897-216 216s96.897 216 216 216 216-96.897 216-216-96.897-216-216-216zm93.737 260.188c-9.319-5.931-21.681-3.184-27.61 6.136-.247.387-25.137 38.737-67.127 38.737s-66.88-38.35-67.127-38.737c-5.93-9.319-18.291-12.066-27.61-6.136s-12.066 18.292-6.136 27.61c1.488 2.338 37.172 57.263 100.873 57.263s99.385-54.924 100.873-57.263c5.93-9.319 3.183-21.68-6.136-27.61zm-181.737-135.188c13.807 0 25 11.193 25 25s-11.193 25-25 25-25-11.193-25-25 11.193-25 25-25zm150 25c0 13.807 11.193 25 25 25s25-11.193 25-25-11.193-25-25-25-25 11.193-25 25z"/>
							</svg>
			</button>`);
	}

	renderEmoji(emoji){
		return htmlToDOM(`
			<li class="emoji-widget__result" 
				data-name="${emoji["name"]}"
				data-category="${emoji["category"]}"
				data-description="${emoji["description"]}">
				<button>
					${emoji["emoji"]}
				</button>
			</li>`);
	}


	addEmojiToWidget(emoji){
		let emojiesList = this.widget.querySelector(".emoji-widget__results");
		let emojiDOM = this.renderEmoji(emoji);

		emojiesList.append(emojiDOM);

		return emojiDOM;
	}

	addEmojiToText(emoji){
		let content = this.input.value;
		let posToInsert = this.input.selectionStart;
		let startStr = content.substring(0, posToInsert);
		let endStr = content.substring(posToInsert);

		this.input.value = startStr + emoji["emoji"] + endStr;
		this.input.selectionStart = posToInsert + emoji["emoji"].length;
		this.input.selectionEnd = posToInsert + emoji["emoji"].length;
		this.input.focus();
	}

	addEmojiToRecentlyUsed(emoji){
		if (!this.recentlyUsedEmojies.includes(emoji))
			this.recentlyUsedEmojies.unshift(emoji);
	}

	setEmojiAsCurrent(emoji){
		this.widget.querySelector(".emoji-widget__current-smile").innerHTML = emoji["emoji"];
		this.widget.querySelector(".emoji-widget__current-smile-name").innerHTML = emoji["name"];
	}

	renderEmojies(emojiesList){
		this.widget.querySelector(".emoji-widget__results").innerHTML = "";

		for (const emoji of emojiesList){
			let emojiDOM = this.addEmojiToWidget(emoji);

			emojiDOM.addEventListener("mouseover", (e) => {
				this.setEmojiAsCurrent(emoji);
			});

			emojiDOM.addEventListener("click", (e) => {
				this.addEmojiToText(emoji);
				this.addEmojiToRecentlyUsed(emoji);
			});
		}
	}

	addEmojiesToWidget(emojiesList){
		for (const emoji of emojiesList){
			let emojiDOM = this.addEmojiToWidget(emoji);

			emojiDOM.addEventListener("mouseover", (e) => {
				this.setEmojiAsCurrent(emoji);
			});

			emojiDOM.addEventListener("click", (e) => {
				this.addEmojiToText(emoji);
				this.addEmojiToRecentlyUsed(emoji);
			});
		}
	}

	isHidden(){
		return this.widget.classList.contains("emoji-widget--hidden");
	}

	hide(){
		this.widget.classList.add("emoji-widget--hidden");
	}

	show(){
		this.widget.classList.remove("emoji-widget--hidden");
	}

	createAppearBtn(){
		let appearBtn = this.renderAppearBtn();
		
		appearBtn.setAttribute("data-id", this.id);
		appearBtn.addEventListener("click", (e) => {
			if (this.isHidden())
				this.show();
			else
				this.hide();
		});

		return appearBtn;
	}

	initAppearBtn(){
		let inputPos = getRelativeCoordsToFirstNonStaticParent(this.input);
		let inputRect = this.input.getBoundingClientRect();
		let appearBtnWidth = this.appearBtn.getBoundingClientRect().width;
		const defaultAppearBtnSize = 30;

		if (inputRect.height < defaultAppearBtnSize){
			this.appearBtn.style.width = inputRect.height - 2 + "px";
			this.appearBtn.style.height = inputRect.height - 2 + "px";
		}

		let appearBtnRect = this.appearBtn.getBoundingClientRect();

		this.appearBtn.style.left = 
			(inputRect.width + inputPos.left) - appearBtnRect.width  + "px";
		this.appearBtn.style.top = 
			(inputRect.height + inputPos.top) - appearBtnRect.height + "px";
	}

	initPositionAndSize(){
		let inputPos = getRelativeCoordsToFirstNonStaticParent(this.input);
		let inputRect = this.input.getBoundingClientRect();
		let widgetRect = this.widget.getBoundingClientRect();
		let isMobile = widgetRect.right > document.documentElement.clientWidth;
		let isAttachedToLeftSide 
			= (inputPos.left + inputRect.width) - widgetRect.width < 0;
		let leftPos = isAttachedToLeftSide 
			? inputPos.left 
			: (inputPos.left + inputRect.width) - widgetRect.width;
		let topPos = inputPos.top + inputRect.height + 5;

		if (isMobile) {
			let parentRect = getNonStaticParent(this.widget).getBoundingClientRect();
			const padding = 15;

			if (parentRect.left < padding) {
				leftPos = padding - parentRect.left;
			} else {
				leftPos = -(parentRect.left - padding);
			}

			this.widget.style.width = `calc(100% - ${padding * 2}px)`;
		}
		console.log(leftPos);
		this.widget.style.left = leftPos + "px";
		this.widget.style.top = topPos + "px";
	}

	renderSearchedEmojies(query){
		fetch("http://localhost:3000/get_emojies?q=" + query)
			.then(response => response.json())
			.then(emojies => this.renderEmojies(emojies));
	}

	initSearchArea(){
		let input = document.querySelector(".emoji-widget__search-input");
		let searchBtn = document.querySelector(".emoji-widget__search-btn");

		input.addEventListener("input", (e) => {
			if (input.value !== "") {
				this.showingResults = true;
				this.renderSearchedEmojies(input.value);
			}
			else {
				let emojiesToShow = this.recentlyUsedEmojies;
				this.showingResults = false;
				if (this.currentCategory !== "0") {
					emojiesToShow = emojies
						.filter(emoji => emoji["category"].toString() === this.currentCategory);
				}

				this.renderEmojies(emojiesToShow);
			}
		});

		searchBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (input.value !== "") {
				this.renderSearchedEmojies(input.value);
				this.showingResults = true;
			}
			else {
				this.showingResults = false;
			}
		});
	}

	getEmojiesByCategory(category, limit, offset) {
		return fetch(`http://localhost:3000/get_emojies?
						category=${category}&
						limit=${limit}&
						offset=${offset}`)
				.then(response => response.json());
	}

	initLoadingResults() {
		let results = this.widget.querySelector(".emoji-widget__results");

		results.addEventListener("scroll", e => {
			if (this.currentCategory === "0" || this.showingResults)
				return;

			let emojiesCount = emojies
				.filter(emoji => emoji.category.toString() === this.currentCategory)
				.length;	
			let isEnd = results.offsetHeight + results.scrollTop >= results.scrollHeight - 1;

			if (isEnd){
				this.getEmojiesByCategory(this.currentCategory, 36, emojiesCount)
					.then(resEmojies => {
						emojies = emojies.concat(resEmojies);
						this.addEmojiesToWidget(resEmojies);
					});
			}			
		});
	}


	create(input) {
		this.input = input;
		this.widget = this.render();
		this.id = getUniqueID();
		this.appearBtn = this.createAppearBtn();

		// Init categories
		for (const cat of categories){
			let category = this.addCategory(cat);

			// TODO: Create widget after loading emojies
			this.getEmojiesByCategory(cat, 36, 0)
				.then(function(resEmojies) {
					emojies = emojies.concat(resEmojies);
				});

			if (cat === "0"){                              
				category.addEventListener("click", (e) =>{
					this.setActiveCategory(cat);
					this.renderEmojies(this.recentlyUsedEmojies);
				});
			} else {
				category.addEventListener("click", (e) => {
					this.setActiveCategory(cat);
					this.renderEmojies(
						emojies.filter(emoji => emoji["category"].toString() === cat));
				});
			}
		}

		this.initLoadingResults();
		this.setActiveCategory(this.currentCategory);
		this.input.setAttribute("data-id", this.id);
		this.widget.setAttribute("id", this.id);
		this.input.after(this.widget);
		this.input.after(this.appearBtn);
		this.initPositionAndSize();
		this.hide();
		this.initSearchArea();
		this.initAppearBtn();
	}
}


let a = document.querySelector('.test-input');
let w = new Widget();
w.create(a);