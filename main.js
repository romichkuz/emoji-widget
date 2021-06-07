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

// END Utils


const categories = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];


const CATEGORIES_DATA = {
	 "0": {
	    "name": "favorite",
	    "title": "Недавно использованные"
	  },
	  "1": {
	    "name": "smiles",
	    "title": "Смайлики & Люди"
	  },
	  "2": {
	    "name": "animals",
	    "title": "Животные & Природа"
	  },
	  "3": {
	    "name": "food",
	    "title": "Еда & Напитки"
	  },
	  "4": {
	    "name": "activity",
	    "title": "Виды деятельности"
	  },
	  "5": {
	    "name": "travel",
	    "title": "Путешествия & Места"
	  },
	  "6": {
	    "name": "objects",
	    "title": "Объекты"
	  },
	  "7": {
	    "name": "symbols",
	    "title": "Символы"
	  },
	  "8": {
	    "name": "flags",
	    "title": "Флаги"
	  }
}

const CATEGORIES_VIEW = {
	"0":`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="24 / time / time">
				<path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM17 11H13V6H11V13H17V11Z" fill="black"/>
			</g>
		</svg>
		`,
	"1": `<svg id="Layer_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="tab-icon">
			<g>
				<path d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm0 482c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"></path>
				<path d="m374.931 292h-237.863c-8.284 0-15 6.716-15 15v2.068c0 73.851 60.081 133.932 133.932 133.932s133.932-60.081 133.932-133.931v-2.069c-.001-8.284-6.717-15-15.001-15zm-161.296 111.964c8.297-8.953 24.456-14.964 41.838-14.964 17.668 0 34.005 6.213 42.155 15.294-12.752 5.596-26.834 8.706-41.628 8.706-15.081 0-29.419-3.233-42.365-9.036zm109.544-15.657c-13.38-17.769-39.036-29.307-67.706-29.307-28.319 0-53.795 11.193-67.31 28.739-19.009-16.414-32.032-39.581-35.294-65.738h206.262c-3.299 26.458-16.584 49.861-35.952 66.306z"></path>
				<path d="m142.959 216.886 28.292-38.478c.008-.011.016-.021.023-.031.011.013.021.028.033.044l28.512 38.506c4.929 6.657 14.324 8.058 20.981 3.129 6.658-4.93 8.059-14.324 3.129-20.981l-28.512-38.505c-5.739-7.75-14.537-12.193-24.145-12.193-.011 0-.023 0-.034 0-9.632.011-18.438 4.481-24.159 12.262l-28.292 38.478c-4.907 6.674-3.475 16.063 3.199 20.971 2.676 1.968 5.788 2.916 8.874 2.916 4.611-.003 9.16-2.12 12.099-6.118z"></path>
				<path d="m364.668 160.568c-5.739-7.75-14.537-12.193-24.145-12.193-.011 0-.023 0-.034 0-9.632.011-18.438 4.481-24.159 12.262l-28.292 38.478c-4.907 6.674-3.475 16.063 3.199 20.971 2.676 1.968 5.788 2.916 8.874 2.916 4.609 0 9.158-2.117 12.097-6.115l28.292-38.478c.008-.011.016-.021.023-.031.011.013.021.028.033.044l28.512 38.506c4.93 6.657 14.323 8.058 20.981 3.129 6.658-4.93 8.059-14.324 3.129-20.981z"></path>
			</g>
		</svg>`,
	"2": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="24 / software / cloud">
				<path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M18 19C20.7614 19 23 16.7614 23 14C23 11.485 21.1431 9.40363 18.7254 9.05224C17.875 6.10562 15.1586 4 12 4C9.65343 4 7.50902 5.16507 6.21989 7.05027C3.26703 7.43346 1 9.95877 1 13C1 16.3137 3.68629 19 7 19H18ZM21 14C21 15.6569 19.6569 17 18 17H7C4.79086 17 3 15.2091 3 13C3 10.8504 4.69934 9.08715 6.83965 9.00314L7.39066 8.98151L7.66642 8.50398C8.5543 6.96643 10.1924 6 12 6C14.4511 6 16.5303 7.77626 16.9309 10.1662L17.0738 11.0182L17.9375 11.0006C17.9531 11.0004 17.9608 11.0002 17.9686 11.0002C17.9765 11.0001 17.9843 11.0001 18 11C19.6569 11 21 12.3431 21 14Z" fill="black"/>
			</g>
		</svg>`,
	"3": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g id="24 / food / icecream">
				<path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M11 23V19H6.81818C5.81403 19 5 18.1046 5 17V8C5 4.13401 8.13401 1 12 1C15.866 1 19 4.13401 19 8V17C19 18.1046 18.186 19 17.1818 19H13V23H11ZM16.651 13.3368C16.629 13.3512 16.5703 13.3917 16.5035 13.4378L16.5035 13.4378C16.4109 13.5016 16.3028 13.5761 16.2549 13.6071C15.8572 13.8641 15.4792 14 15 14C14.3921 14 14.0072 13.8537 13.0821 13.3965C12.7643 13.2394 12.6096 13.1677 12.4456 13.1054C12.2536 13.0326 12.1084 13 12 13C11.8145 13 11.5692 13.0856 11.1037 13.3176C11.0299 13.3545 11.0298 13.3545 10.9534 13.393L10.9532 13.3931C10.0661 13.8399 9.63902 14 9 14C8.3617 14 7.92806 13.8384 7.0416 13.3939L7 13.3731V17H17V13.1514C16.8778 13.2006 16.7652 13.2621 16.651 13.3368ZM12 3C14.7614 3 17 5.23858 17 8V11.0825C16.4469 11.1838 15.9922 11.3779 15.5561 11.6632C15.5061 11.6959 15.4031 11.7669 15.3151 11.8276C15.2471 11.8745 15.188 11.9152 15.1692 11.9274C15.0694 11.9919 15.0469 12 15 12C14.825 12 14.5888 11.9102 13.9682 11.6035C13.5939 11.4185 13.3986 11.328 13.1555 11.2357C12.7549 11.0835 12.3822 11 12 11C11.4111 11 10.9414 11.1639 10.2117 11.5275C10.1708 11.548 10.1507 11.558 10.1307 11.5681C10.1112 11.5778 10.0918 11.5876 10.0536 11.6069C9.45484 11.9084 9.21056 12 9 12C8.78796 12 8.53759 11.9067 7.93798 11.6061C7.53332 11.4032 7.25278 11.2711 7 11.1811V8C7 5.23858 9.23858 3 12 3Z" fill="black"/>
				</g>
			</svg>`,
	"4": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="24 / symbols / dribbble">
				<path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM20.9364 13.0754C20.9784 12.7228 21 12.3639 21 12C21 11.0282 20.846 10.0924 20.561 9.21559C20.3666 9.75288 20.13 10.3056 19.8474 10.8603C20.3014 11.5703 20.6748 12.3106 20.9364 13.0754ZM18.6892 18.0213L18.6389 17.9916C19.4255 16.6591 19.5172 15.3376 19.1384 14.0221C19.0216 13.6165 18.859 13.209 18.6551 12.8014C18.0594 13.6154 17.3492 14.3989 16.5115 15.1066C15.9145 15.6109 15.2573 16.0728 14.5368 16.4782C14.6841 16.7334 14.8199 16.9893 14.9428 17.2453C15.3993 18.1967 15.7003 19.2015 15.7104 20.202C16.8498 19.6857 17.8626 18.939 18.6892 18.0213ZM13.6479 20.8495C13.8117 20.0933 13.6538 19.182 13.1396 18.1106C13.0155 17.8519 12.8731 17.5894 12.7141 17.324C10.6966 18.078 8.28355 18.4237 5.42951 18.1505C7.07174 19.9042 9.4079 21 12 21C12.5629 21 13.1137 20.9483 13.6479 20.8495ZM19.1951 6.59257C17.5528 4.41079 14.9411 3 12 3C11.5471 3 11.102 3.03345 10.6671 3.09802C13.1565 4.44013 15.9677 6.36181 18.0743 8.61043C18.2117 8.75705 18.3466 8.90564 18.4786 9.05612C18.8441 8.17353 19.076 7.32549 19.1951 6.59257ZM7.92989 3.97074C10.6137 5.1827 14.1745 7.37312 16.6147 9.97781C16.925 10.3089 17.2137 10.6432 17.4784 10.9796C16.8918 11.9005 16.1468 12.7965 15.2209 13.5787C14.6866 14.03 14.0869 14.448 13.4151 14.8126C12.9218 14.1676 12.3728 13.5351 11.7932 12.9247C9.55516 10.5677 6.74087 8.41579 4.51906 6.99475C5.3754 5.71738 6.55023 4.67149 7.92989 3.97074ZM3 12C3 13.4055 3.32217 14.7357 3.8967 15.9209C6.99312 16.4773 9.49645 16.2737 11.5096 15.6255C11.1526 15.1851 10.7614 14.7426 10.3428 14.3018C8.28291 12.1324 5.67519 10.1246 3.59402 8.77771C3.21028 9.77815 3 10.8645 3 12Z" fill="black"/>
			</g>
		</svg>`,
	"5": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="24 / shopping / delivery">
				<path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M16.382 7L18.2243 10.6847L21 12.5352V16H19.8293C19.4175 14.8348 18.3062 14 17 14C15.6938 14 14.5825 14.8348 14.1707 16H9.82929C9.41746 14.8348 8.30622 14 7 14C5.69378 14 4.58254 14.8348 4.17071 16H3V7H16.382ZM21 18H19.8293C19.4175 19.1652 18.3062 20 17 20C15.6938 20 14.5825 19.1652 14.1707 18H9.82929C9.41746 19.1652 8.30622 20 7 20C5.69378 20 4.58254 19.1652 4.17071 18H3C1.89543 18 1 17.1046 1 16V7C1 5.89543 1.89543 5 3 5H16.382C17.1395 5 17.832 5.428 18.1708 6.10557L19.7757 9.31526L23 11.4648V16C23 17.1046 22.1046 18 21 18ZM8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17ZM18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="black"/>
			</g>
		</svg>`,
	"6": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="24 / security / key">
				<path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M8 9C8 5.13401 11.134 2 15 2C18.866 2 22 5.13401 22 9C22 12.866 18.866 16 15 16H13V18H11V20H9V22H2V16.5858L8.14801 10.4378C8.04995 9.96847 8 9.48731 8 9ZM11 16V14H15C17.7614 14 20 11.7614 20 9C20 6.23858 17.7614 4 15 4C12.2386 4 10 6.23858 10 9C10 9.49863 10.0727 9.98638 10.2141 10.4529L10.3879 11.0263L4 17.4142V20H7V18H9V16H11ZM13 9C13 10.1046 13.8954 11 15 11C16.1046 11 17 10.1046 17 9C17 7.89543 16.1046 7 15 7C13.8954 7 13 7.89543 13 9Z" fill="black"/>
			</g>
		</svg>`,
	"7": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="24 / basic / heart">
				<path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M16.5532 2.00002C15.1056 2 14.1724 2.17246 13.1027 2.69607C12.7066 2.88993 12.335 3.12339 11.99 3.39576C11.6582 3.13866 11.3015 2.91592 10.9218 2.72813C9.83132 2.18878 8.85028 2 7.45455 2C3.71644 2 1 5.09727 1 9.11988C1 12.1578 2.69383 15.0923 5.84884 17.9299C7.50489 19.4193 9.61932 20.8933 11.1336 21.6775L12 22.1261L12.8664 21.6775C14.3807 20.8933 16.4951 19.4193 18.1512 17.9299C21.3062 15.0923 23 12.1578 23 9.11988C23 5.13984 20.2579 2.01536 16.5532 2.00002ZM21 9.11988C21 11.4999 19.5862 13.9493 16.8137 16.4429C15.3022 17.8023 13.359 19.1609 12 19.8737C10.641 19.1609 8.69782 17.8023 7.18628 16.4429C4.41382 13.9493 3 11.4999 3 9.11988C3 6.14772 4.88364 4 7.45455 4C8.56428 4 9.24813 4.13159 10.0351 4.52084C10.5 4.75077 10.9109 5.05437 11.2665 5.43377L12.0023 6.2187L12.7315 5.42755C13.0951 5.03295 13.512 4.72244 13.9819 4.49243C14.7459 4.11849 15.387 4 16.5491 4.00001C19.0882 4.01053 21 6.18896 21 9.11988Z" fill="black"/>
			</g>
		</svg>`,
	"8": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="24 / basic / flag">
				<path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M7 23H5H4V21H5V12V4V1H7V2H21.1247L18.126 7.99991L21.126 14H7V21H8V23H7ZM7 12V4H17.8893L15.89 8.00009L17.89 12H7Z" fill="black"/>
			</g>
		</svg>`
}


// Вынести значения в константы, например дефолтная категория
// Сделать статическую переменную с эмоджи

class Widget {
	static emojies = []
	static recentlyUsedEmojies = []

	constructor(){
		this.input = null;
		this.widget = null;
		this.id = null;
		this.appearBtn = null;
		this.currentCategory = "0";
		this.showingResults = false;
		this.isDarkTheme = true;
		this.url = "http://185.244.219.96/emojis/";
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
				<div class="emoji-widget__current">
					<div class="emoji-widget__current-smile"></div>
					<div class="emoji-widget__current-smile-name"></div>
				</div>
				<label class="emoji-widget__theme">
					<input type="checkbox">
					Светлая тема
				</label>
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
		if (!Widget.recentlyUsedEmojies.includes(emoji))
			Widget.recentlyUsedEmojies.unshift(emoji);
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

	renderCurrentCategory(){
		let emojiesToShow = Widget.recentlyUsedEmojies;
		if (this.currentCategory !== "0") {
			emojiesToShow = Widget.emojies
				.filter(emoji => emoji["category"].toString() === this.currentCategory);
		}

		this.renderEmojies(emojiesToShow);
	}

	createAppearBtn(){
		let appearBtn = this.renderAppearBtn();
		
		appearBtn.setAttribute("data-id", this.id);
		appearBtn.addEventListener("click", (e) => {
			if (this.isHidden()) {
				this.show();
				this.renderCurrentCategory();
			}
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

			this.widget.style.width = `calc(100vw - ${padding * 2}px)`;
		}
		this.widget.style.left = leftPos + "px";
		this.widget.style.top = topPos + "px";
	}

	renderSearchedEmojies(query){
		fetch(this.url + "/get_emojies?q=" + query)
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
				this.showingResults = false;
				this.renderCurrentCategory();
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
		return fetch(`${this.url}/get_emojies?
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

			let emojiesCount = Widget.emojies
				.filter(emoji => emoji.category.toString() === this.currentCategory)
				.length;	
			let isEnd = results.offsetHeight + results.scrollTop >= results.scrollHeight - 1;

			if (isEnd){
				this.getEmojiesByCategory(this.currentCategory, 36, emojiesCount)
					.then(resEmojies => {
						Widget.emojies = Widget.emojies.concat(resEmojies);
						this.addEmojiesToWidget(resEmojies);
					});
			}			
		});
	}

	initThemeSwitcher(){
		let switcher = this.widget.querySelector(".emoji-widget__theme input");

		switcher.addEventListener("click", (e) => {
			if (switcher.checked)
				this.widget.classList.add("emoji-widget--light-theme");
			else 
				this.widget.classList.remove("emoji-widget--light-theme");
		});
	}

	initStyles(callback){
		let link = document.createElement("link");
		link.rel  = "stylesheet";
	    link.type = "text/css";
	    link.href = "http://185.244.219.96/emoji-widget/style.css";

	    link.addEventListener("load", callback);
	    document.head.append(link);
	}

	create(input) {
		this.input = input;
		this.widget = this.render();
		this.id = getUniqueID();
		this.appearBtn = this.createAppearBtn();

		// Init categories
		for (const cat of categories){
			let category = this.addCategory(cat);
			category.setAttribute("title", CATEGORIES_DATA[cat].title);

			// TODO: Create widget after loading emojies
			this.getEmojiesByCategory(cat, 36, 0)
				.then(function(resEmojies) {
					Widget.emojies = Widget.emojies.concat(resEmojies);
				});

			if (cat === "0"){                              
				category.addEventListener("click", (e) =>{
					this.setActiveCategory(cat);
					this.renderEmojies(Widget.recentlyUsedEmojies);
				});
			} else {
				category.addEventListener("click", (e) => {
					this.setActiveCategory(cat);
					this.renderEmojies(
						Widget.emojies.filter(emoji => emoji["category"].toString() === cat));
				});
			}
		}

		this.initStyles((e) => {
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
			this.initThemeSwitcher();
		});
	}
}

