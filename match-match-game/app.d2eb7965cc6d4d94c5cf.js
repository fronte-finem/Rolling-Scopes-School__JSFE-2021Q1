(()=>{"use strict";const t={btns:{signUp:{text:"register new player"},start:{text:"start game"},stop:{text:"stop game"}}};function e(t){const e=t;for(let t=e.length-1;t>0;t-=1){const s=Math.floor((t+1)*Math.random());[e[s],e[t]]=[e[t],e[s]]}return e}const s="./images.json";var a;!function(t){t.cats="🐱 Cats 🐈🐈‍⬛",t.dogs="🐶 Dogs 🐕🐩🐕‍🦺"}(a||(a={}));class i{constructor(t,e){this.storageKey=t,this.initialSettings=e}loadSettings(){return new Promise((t=>{const e=window.localStorage.getItem(this.storageKey);t(null===e?this.initialSettings:JSON.parse(e))}))}saveSettings(t){return new Promise((e=>{window.localStorage.setItem(this.storageKey,JSON.stringify(t)),e()}))}}function r(t){return`${t[0].toUpperCase()}${t.slice(1).toLowerCase()}`}function n(t){return t.split(" ").map(r).join(" ")}const o=()=>new Error("⚠️ Database not opened, created, linked ⚠️");class c{constructor(t,e=1){this.dbName=t,this.dbVersion=e}open(t=1){this.dbVersion=t;const e=window.indexedDB.open(this.dbName,this.dbVersion);return new Promise(((t,s)=>{e.onupgradeneeded=()=>this.onOpen(e.result,t,!0),e.onsuccess=()=>this.onOpen(e.result,t,!1),e.onerror=()=>s(new Error("⚠️ Can't open DB. Probably browser user didn't allow this web app to use IndexedDB? ⚠️"))}))}onOpen(t,e,s=!1){this.db=t,e({db:t,upgradeMode:s})}openTransaction(t,e){if(!this.db)throw o();return this.db.transaction(t,e)}openStore(t,e){if(!this.db)throw o();return this.db.transaction(t,e).objectStore(t)}static asyncRequest(t){return new Promise(((e,s)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>s(t.error)}))}operate(t,e,s,a){const i=e(this.openStore(t,a));return new Promise(((t,e)=>{i.onsuccess=()=>t(i.result),i.onerror=()=>e(this.errorGenerator(s))}))}create(t,e,s){return this.operate(t,(t=>t.add(e,s)),{operation:"Create",key:s,storeName:t},"readwrite")}read(t,e){return this.operate(t,(t=>t.get(e)),{operation:"Read",key:e,storeName:t},"readonly")}update(t,e,s){return this.operate(t,(t=>t.put(e,s)),{operation:"Update",key:s,storeName:t},"readwrite")}delete(t,e){return this.operate(t,(t=>t.delete(e)),{operation:"Delete",key:e,storeName:t},"readwrite")}errorGenerator({operation:t,storeName:e,key:s}){return new Error(`⚠️DB::${this.dbName}.${this.dbVersion}: <${t}> on store "${e}" failed for key "${String(s)}" ⚠️`)}}const l="users";class h{constructor(){this.dbService=new c("fronte-finem",1)}get currentUser(){return this.user}async init(t=!1){const{db:e,upgradeMode:s}=await this.dbService.open();if(s){const t=h.createStore(e);await h.addTestUsers(t)}t&&(this.user=h.createTestUser(Math.floor(100*window.Math.random())))}static createStore(t){const e=t.createObjectStore(l);return e.createIndex("firstName","firstName",{unique:!1}),e.createIndex("lastName","lastName",{unique:!1}),e.createIndex("email","email",{unique:!1}),e.createIndex("score","score",{unique:!1}),e.createIndex("fullId",["firstName","lastName","email"],{unique:!0}),e}static async addTestUsers(t,e=100){const s=Array.from({length:e}).map(((e,s)=>{const a=h.createTestUser(s),i=h.userHashCode(a),r=t.add(a,i);return c.asyncRequest(r)}));await Promise.all(s)}static createTestUser(t){return{firstName:"Test",lastName:`User${t}`,email:`test.user${t}@${t}resu.tset`,score:t/10,time:Math.abs(5e3-40*t)}}async save(t){const e=h.userHashCode(t),s=await this.dbService.read(l,e);if(s)return this.user=s,s;try{await this.dbService.create(l,t,e)}catch(t){return void console.log(t)}return this.user=t,t}static userHashCode({firstName:t,lastName:e,email:s}){return function(t){let e=0;for(let s=0;s<t.length;s+=1)e=Math.imul(31,e)+t.charCodeAt(s);return 0|e}(JSON.stringify({firstName:t,lastName:e,email:s}))}async updateUserAchievement(t,e){if(!this.user)return!1;if(t<this.user.score)return!1;this.user.score=t,this.user.time=e;const s=h.userHashCode(this.user);try{await this.dbService.update(l,this.user,s)}catch(t){return console.log(t),!1}return!0}async getFirstByScore(t=5){let e=0;const s=[],a=this.dbService.openTransaction(l,"readonly");return a.objectStore(l).index("score").openCursor(null,"prev").onsuccess=a=>{const i=a.target.result;i&&e<t&&(s.push(i.value),e+=1,i.continue())},new Promise((t=>{a.oncomplete=()=>t(s)}))}async logAll(){const t=this.dbService.openTransaction(l,"readonly");return t.objectStore(l).openCursor().onsuccess=t=>{const e=t.target.result;console.log(e?.value),e?.continue()},new Promise((e=>{t.oncomplete=()=>e(!0)}))}}const d={12:{cardField:[4,3],initialShowTime:3,scoreCoefficient:1},16:{cardField:[4,4],initialShowTime:4,scoreCoefficient:1.1},20:{cardField:[5,4],initialShowTime:5,scoreCoefficient:1.2},24:{cardField:[6,4],initialShowTime:6,scoreCoefficient:1.4},30:{cardField:[6,5],initialShowTime:8,scoreCoefficient:1.7},36:{cardField:[6,6],initialShowTime:10,scoreCoefficient:2},42:{cardField:[7,6],initialShowTime:12,scoreCoefficient:2.5},48:{cardField:[8,6],initialShowTime:15,scoreCoefficient:3},56:{cardField:[8,7],initialShowTime:20,scoreCoefficient:3.5},64:{cardField:[8,8],initialShowTime:25,scoreCoefficient:4}},u=new class{init(t){this.requestListener=t}requestStateChange(t){return this.requestListener(t)}},m=new h,p=new class{constructor(){this.jsonUrl=s}async fetch(){if(!this.cache){const t=await fetch(s),e=await t.json();this.cache=e.reduce(((t,e)=>t.set(e.category,e.images)),new Map)}return this.cache}async generateUrls(t){const e=(await this.fetch()).get(t);if(e)return{front:Array.from({length:e.last-e.first},((s,a)=>`${t}/${String(a+e.first).padStart(e.leftPad,e.leftPadChar)}.${e.extension}`)),back:e.cardCover}}async getUrls(t,s){const a=await this.generateUrls(t);if(!a)return;let{front:i}=a;return i=e(i).slice(0,s/2),i=e(i.concat(i)),{front:i,back:a.back}}},g=new class{constructor(t){this.initialSettings=t,this.localStorage=new i("fronte-finem__match-match-game___game-settings",t)}loadSettings(){return this.localStorage.loadSettings()}saveSettings(t){return this.localStorage.saveSettings(t)}}({cardImagesCategory:"dogs",cardsAmount:20}),v="http://www.w3.org/2000/svg";function w(t,e){const s=document.createElementNS(v,"svg"),a=document.createElementNS(v,"use");return a.setAttribute("href",t),s.append(a),s.classList.add("svg-icon"),Array.isArray(e)&&s.classList.add(...e),s}class S{constructor(t){if("string"==typeof t)this.element=function(t){const e=document.createElement("template");return e.innerHTML=t,e.content.firstElementChild}(t);else{const{childs:e,hookElement:s,...a}=t;this.element=function({tag:t="div",classNames:e,text:s}){const a=document.createElement(t);return Array.isArray(e)&&a.classList.add(...e),s&&(a.textContent=s),a}(a),e&&this.render(e),s&&s(this.element)}}static getElemet(t){return t instanceof S?t.element:t}getText(){return this.element.textContent}setText(t){this.element.textContent=t}clear(){return this.element.innerHTML="",this}render(t){return this.clear(),Array.isArray(t)?this.element.append(...t.map((t=>t.element))):this.element.append(t.element),this}setCssState(t,e=!0){this.element.classList.toggle(t,e)}setCssStateAsync(t,e=!0){return this.element.classList.toggle(t,e),new Promise((t=>{this.element.addEventListener("transitionend",(()=>t()),{once:!0})}))}setCssStyle(t,e){this.element.style[t]=e}getCssVar(t){return function(t,e){return getComputedStyle(t).getPropertyValue(e)}(this.element,t)}setCssVar(t,e){!function(t,e,s){t.style.setProperty(e,s)}(this.element,t,e)}onClick(t,e){this.element.addEventListener("click",t,e)}}class f extends S{constructor({classNames:t,...e}){super({...e,tag:"button",classNames:["btn"].concat(t||[])})}active(t=!0){this.setCssState("btn--active",t)}}class b extends S{constructor({url:t,classNames:e,...s}){super({...s,tag:"a",classNames:["link"].concat(e||[])}),this.element.href=t}active(t=!0){this.setCssState("link--active",t)}}class C extends S{constructor({url:t,alt:e="image",classNames:s,...a}){super({...a,tag:"img",classNames:["img"].concat(s||[])}),this.element.src=t,this.element.alt=e,this.element.setAttribute("crossOrigin","anonymous")}static create(t){return new Promise((e=>{const s=new C(t);s.element.addEventListener("load",(()=>e(s)))}))}}class y{static view({tag:t,build:e,hookView:s,...a}){let i;switch(t){case"a":i=new b(a);break;case"img":i=new C(a);break;case"button":i=new f(a);break;default:i=new S({tag:t,...a})}if(s&&s(i),e)if(Array.isArray(e)){const t=e.map((t=>y.view(t)));i.render(t)}else i.render(y.view(e));return i}}class N{constructor({classNames:t=[],...e}){this.view=y.view({classNames:["page--1AFmu1ZbC",...t],...e})}}class A extends N{constructor(){super({classNames:["page-about"]})}init(){this.view.render(new S({tag:"h1",text:A.name}))}stop(){this.view.clear()}}const x="card__side--1YnFocLsV",_=(t,e)=>t.setCssStyle("backgroundImage",(t=>`url("./images/${t}")`)(e));class I extends S{constructor(t){super({classNames:["card-container--i0yIuD8uN"]});const e=new S({classNames:[x,"card__side--back--1vG-3cHdj"]}),s=new S({classNames:[x,"card__side--front--1toEdlg30"]});_(e,t.backImage),_(s,t.frontImage),this.render(new S({classNames:["card--19lZCi7QM"],childs:[e,s]}))}async flip(t=!0){await this.setCssStateAsync("flipped--2EZsq6Spb",t)}error(t=!0){this.setCssState("error--3HGSMKD5U",t)}match(t=!0){this.setCssState("match--1yCHxpwpW",t)}}class k{constructor(t){this.model=t,this.view=new I(t),this.model.onStateChange((t=>this.updateView(t)))}onClick(t){this.view.onClick((()=>t(this)))}async updateView(t){this.view.error(t.isError),this.view.match(t.isMatch),await this.view.flip(t.isFrontSide)}}const U="--cards-columns",T="--cards-rows";class L{constructor(){this.view=new S({classNames:["cards-field--1SU6hNcue"]})}render(t,e){this.view.clear();const[s,a]=d[e].cardField;this.columns=s,this.rows=a,this.view.render(t.map((t=>t.view)))}get columns(){return Number(this.view.getCssVar(U))}set columns(t){this.view.setCssVar(U,String(t))}get rows(){return Number(this.view.getCssVar(T))}set rows(t){this.view.setCssVar(T,String(t))}}class P{constructor(){this.listenersMap=new Map}subscribe(t,e){this.listenersMap.has(t)||this.listenersMap.set(t,new Set),this.listenersMap.get(t)?.add(e)}unsubscribe(t,e){this.listenersMap.get(t)?.delete(e)}notify(t,e){this.listenersMap.get(t)?.forEach((t=>t(e)))}}class M{constructor(t){this.observer=new P,this.state=this.proxify(t)}getState(){return{...this.state}}onStateChange(t){this.observer.subscribe("state-change",t)}proxify(t){return new Proxy(t,{set:(t,e,s)=>(t[e]=s,this.observer.notify("state-change",this.getState()),this.observer.notify(e,s),!0)})}static logChangeState(t,e,s){return`Changin ${String(t)} property ${e} from ${String(t[e])} to ${String(s)}`}}class E extends M{constructor(t){super({isError:!1,isStopped:!0,isSolved:!1,gameActiveCard:void 0,matchedCards:new Set}),this.cards=t,this.gameObserver=new P,this.cards=t}flipAll(t){this.cards.forEach((e=>e.flip(t)))}onSolved(t){this.gameObserver.subscribe("game-solved",t)}showAllCards(){this.flipAll(!0)}start(){this.flipAll(!1),this.state.isStopped=!1}stop(){this.state.isStopped=!0}get activeCard(){return this.state.gameActiveCard}async cardClickHandler(t){return!(this.state.isStopped||this.state.isError||this.state.matchedCards.has(t)||t===this.state.gameActiveCard||(t.click(),this.state.gameActiveCard?(this.match(t)||await this.error(t),0):(this.state.gameActiveCard=t,0)))}match(t){return t.frontImage===this.state.gameActiveCard?.frontImage&&(this.state.gameActiveCard.match(!0),t.match(!0),this.state.matchedCards.add(this.state.gameActiveCard),this.state.matchedCards.add(t),this.state.gameActiveCard=void 0,this.state.matchedCards.size===this.cards.length&&(this.state.isSolved=!0,this.stop(),this.gameObserver.notify("game-solved",this.state)),!0)}async error(t){this.state.isError=!0,await Promise.all([this.state.gameActiveCard?.error(),t.error()]),this.state.isError=!1,this.state.gameActiveCard=void 0}get clicks(){const[t,e]=this.cards.reduce((([t,e],s)=>{const{clickedCount:a,errorCount:i}=s.getState();return[t+a,e+i]}),[0,0]);return{all:t,error:e}}getMatches(){const{all:t,error:e}=this.clicks;return[t/2,e/2]}}class $ extends M{constructor(t,e,s){super({isError:!1,isMatch:!1,isFrontSide:!1,clickedCount:0,errorCount:0}),this.id=t,this.frontImage=e,this.backImage=s}flip(t){this.state.isMatch||this.state.isError||(this.state.isFrontSide=t)}match(t){this.state.isMatch=t}async error(){this.state.isMatch||(this.state.errorCount+=1,this.state.isError=!0,await(2e3,new Promise((t=>setTimeout(t,2e3)))),this.state.isError=!1,this.flip(!1))}click(){this.state.isMatch||this.state.isError||this.state.isFrontSide||(this.flip(!0),this.state.clickedCount+=1)}}function V(t){const e=t%60;return[e,(t-e)/60]}function B(t){const[e,s]=V(Math.floor(t)),[a,i]=V(s);return{hours:i,min:a,sec:e,diff:t}}function O(t){const{hours:e,min:s,sec:a}=B(t);return{hours:String(e).padStart(2,"0"),min:String(s).padStart(2,"0"),sec:String(a).padStart(2,"0"),diff:t}}class F extends M{constructor(){super({startTime:0,currentTime:0})}reset(t=0){window.clearInterval(this.timerId),this.state.startTime=0,this.state.currentTime=t}stop(){return window.clearInterval(this.timerId),this.diff}start(t=0){this.reset(t),this.timerId=window.setInterval((()=>this.increment()),1e3)}async countdown(t=10){return new Promise((e=>{this.reset(t),this.timerId=window.setInterval((()=>{this.decrement(),this.state.currentTime>0||(this.reset(),e())}),1e3)}))}increment(){this.state.currentTime+=1}decrement(){this.state.currentTime-=1}get diff(){return this.state.currentTime-this.state.startTime}}const R="timer__output--2TxoOB91B";class q extends S{constructor(t=":"){super({classNames:["timer--3hmDgpm1E"]}),this.output={seconds:new S({classNames:[R,"timer__output--seconds--m2fBlsDJB"]}),minutes:new S({classNames:[R,"timer__output--minutes--1dMtRHovH"]}),hours:new S({classNames:[R,"timer__output--hours--11f_qoGHw"]})},this.render(new S({classNames:["timer__box--22sYiA39u"],childs:[this.output.hours,q.createSplitter(t),this.output.minutes,q.createSplitter(t),this.output.seconds]}))}show(t){this.output.seconds.element.textContent=t.sec,this.output.minutes.element.textContent=t.min,t.hours&&(this.output.hours.element.textContent=t.hours)}static createSplitter(t=":"){return new S({classNames:[R,"timer__output--splitter--3RPQD9d0b"],text:t})}stop(t=!0){this.setCssState("timer--stop--3hJx4Xln3",t)}countdown(t=!0){this.setCssState("timer--countdown--1I-_ImbQN",t)}reset(){this.stop(!1),this.countdown(!1)}}class H{constructor(){this.view=new q,this.model=new F,this.updateView(this.model.getState()),this.model.onStateChange((t=>this.updateView(t)))}updateView(t){this.view.show(O(t.currentTime-t.startTime))}start(){this.view.reset(),this.model.start()}stop(){this.model.stop(),this.view.stop()}reset(){this.model.reset(),this.view.reset()}async countdown(t=10){this.view.countdown(),await this.model.countdown(t)}}const D="game--solved--2M0U5Nryc";class Z extends N{constructor(t,e,s,a){super({classNames:["game--3_WFWXfxo"]}),this.appStateService=t,this.gameSettingsService=e,this.cardImagesService=s,this.userService=a,this.timer=new H,this.cardsField=new L,this.cards=[],this.view.render([this.timer.view,this.cardsField.view])}init(){this.newGame().then(null,null)}stop(){this.stopGame()}stopGame(){this.timer.reset(),this.model?.stop(),this.model=void 0,this.cards=[],this.cardsField.view.clear(),this.view.setCssState(D,!1)}async newGame(){this.stopGame();const t=await this.gameSettingsService.loadSettings(),e=await this.cardImagesService.getUrls(t.cardImagesCategory,t.cardsAmount);if(!e)return;const s=e.front.map(((t,s)=>new $(s,t,e.back)));this.cards=s.map((t=>new k(t))),this.cards.forEach((t=>t.onClick((()=>this.cardClickHandler(t))))),this.cardsField.render(this.cards,t.cardsAmount),this.model=new E(s),this.model.showAllCards(),await this.timer.countdown(d[t.cardsAmount].initialShowTime),this.model.start(),this.timer.start(),this.model.onSolved((()=>{if(this.timer.stop(),this.view.setCssState(D,!0),!this.model)return;const t=function([t,e],s){const a=100*(t-e-e)-10*s;return a<0?0:a}(this.model.getMatches(),this.timer.model.diff);this.userService.updateUserAchievement(t,this.timer.model.diff).then(null,null),this.appStateService.requestStateChange({from:"game",to:"solved"}).then(null,null)}))}async cardClickHandler(t){return!!this.model&&this.model.cardClickHandler(t.model)}}const j={"select-container":"select-container--2qMqk-kXI",selectContainer:"select-container--2qMqk-kXI","select-label":"select-label--3OgUUngdK",selectLabel:"select-label--3OgUUngdK",selector:"selector--2mb9FNFi6",option:"option--3JZjhnarx"};class W extends S{constructor({heading:t,placeholder:e,classNames:s,...a}){super({...a,classNames:[j.selectContainer].concat(s||[])}),this.label=new S({tag:"label",classNames:[j.selectLabel]}),this.select=new S({tag:"select",classNames:[j.selector]}),this.placeholder=W.createOption({value:"placeholder",text:"placeholder",selected:!0,disabled:!0}),this.render([this.label,this.select]),this.label.setText(t),this.placeholder.setText(e),this.select.render(this.placeholder)}addOptions(t){return this.select.render([this.placeholder,...t.map((t=>W.createOption(t)))]),this}static createOption({value:t,text:e,selected:s,disabled:a,title:i}){const r=new S({tag:"option",classNames:[j.option]});return r.element.setAttribute("value",t),r.setText(e),s&&(r.element.selected=!0),a&&(r.element.disabled=!0),i&&(r.element.title=i),r}onSelect(t,e){const s=this.select.element;s.addEventListener("input",(()=>t(s.value)),e)}}class G extends M{constructor(t){super({...t})}setSetting(t,e){this.state[t]=e}}const X="settings__select--BAwgzNiED";class K extends N{constructor(t){super({classNames:["settings--C-VaPZFRX"]}),this.gameSettingsService=t,this.selectGameCards=new W({heading:"game cards",placeholder:"select game cards type",classNames:[X]}),this.selectDifficulty=new W({heading:"difficulty",placeholder:"🎴 cards  |  ⏱ start |  🏆 score",classNames:[X]})}stop(){this.view.clear()}async init(){this.view.render(new S({classNames:["settings-wrapper--2pEsVn9hO"],childs:[this.selectDifficulty,this.selectGameCards]}));const t=await this.gameSettingsService.loadSettings();this.model=new G(t),this.model.onStateChange((t=>this.gameSettingsService.saveSettings(t))),this.initSelectsors(this.model.getState())}initSelectsors(t){this.selectGameCards.addOptions(K.prepareCategoryOptions(t)),this.selectDifficulty.addOptions(K.prepareDifficultyOptions(t)),this.selectGameCards.onSelect((t=>this.model?.setSetting("cardImagesCategory",t))),this.selectDifficulty.onSelect((t=>this.model?.setSetting("cardsAmount",t)))}static prepareCategoryOptions(t){return Object.entries(a).map((e=>({value:e[0],text:String(e[1]),selected:t.cardImagesCategory===e[0]})))}static prepareDifficultyOptions(t){return Object.entries(d).map((e=>{const s=`${e[1].cardField[0]} × ${e[1].cardField[1]}`,a=String(e[1].initialShowTime).padStart(2," "),i=Math.floor(100*e[1].scoreCoefficient);return{value:e[0],text:`🎴 ${s}  |  ⏱  ${a}s  |  🏆 × ${i}%`,selected:t.cardsAmount.toString()===e[0],title:`cards ${s}  |  start time ${a}s  |  score × ${i}%`}}))}}function Y(t,e,s,a){t.avatar?e.render(new C({url:t.avatar,classNames:a})):e.element.append(w("./svg/sprite.svg#icon-avatar",s))}const z={wrapper:"wrapper--2TqqwZwyd",row:"row--1sSguwB__",title:"title--2Ff5fFSCV",title__users:"title__users--2e1rOItHh",titleUsers:"title__users--2e1rOItHh",title__score:"title__score--YqqzK2y1d",titleScore:"title__score--YqqzK2y1d",title__time:"title__time--5cLi7Su3F",titleTime:"title__time--5cLi7Su3F",users:"users--3iyj5LTJa",item:"item--2hhu0vVki","item--current-user":"item--current-user--3eXm2nhYt",itemCurrentUser:"item--current-user--3eXm2nhYt",user:"user--2fIx2m1ZH",user__name:"user__name--3ohc71kjU",userName:"user__name--3ohc71kjU",user__mail:"user__mail--3mSBrZ5F3",userMail:"user__mail--3mSBrZ5F3",score:"score--3OVRyhCla",time:"time--38mP2BWDO",avatar:"avatar--hI32UCRJX","avatar--hidden":"avatar--hidden--2VS4YhqBl",avatarHidden:"avatar--hidden--2VS4YhqBl",avatar__img:"avatar__img--2oblGDaSZ",avatarImg:"avatar__img--2oblGDaSZ","svg-icon":"svg-icon--1d1Msgc8S",svgIcon:"svg-icon--1d1Msgc8S"},J="Best players",Q="Score",tt="Time";class et extends N{constructor(t){super({classNames:[z.wrapper]}),this.userService=t,this.records=new S({tag:"ul",classNames:[z.users]})}stop(){this.view.clear()}async init(){const t=await this.userService.getFirstByScore(10),{currentUser:e}=this.userService;let s;if(e){const t=h.userHashCode(e);s=e=>t===h.userHashCode(e)}else s=()=>!1;const a=t.map((t=>et.createRecord(t,s)));this.view.render([et.initTitle(),this.records.render(a)])}static initTitle(){return new S({classNames:[z.title,z.row],childs:[[J,[z.cell1,z.titleUsers]],[Q,[z.cell2,z.titleScore]],[tt,[z.cell3,z.titleTime]]].map((t=>et.createTitle(...t)))})}static createTitle(t,e){return new S({tag:"h2",classNames:[z.titlePart,...e],text:t})}static createRecord(t,e){const s=[z.item,z.row];e(t)&&s.push(z.itemCurrentUser);const a=new S({tag:"li",classNames:s}),i=new S({classNames:[z.avatar]});Y(t,i,[z.svgIcon,z.avatarImg],[z.avatarImg]);const r=new S({classNames:[z.userName],text:`${t.firstName} ${t.lastName}`}),n=new S({classNames:[z.userMail],text:`${t.email}`}),o=new S({classNames:[z.cell1,z.user]}),c=new S({classNames:[z.cell2,z.score],text:`${t.score}`}),l=O(t.time),h=new S({classNames:[z.cell3,z.time],text:`${l.hours}:${l.min}:${l.sec}`});return a.render([i,o.render([r,n]),c,h]),a}}class st extends N{constructor(){super({classNames:["page-error"]})}init(){this.view.render(new S({tag:"h1",text:st.name}))}stop(){this.view.clear()}}const at={route:{url:"#/about-game",title:"about game",pageCreator:()=>new A},navSvgIcon:"./svg/sprite.svg#icon-question-mark"},it={required:!0,errorMessage:"The name shouldn't contain only numbers and can't contain symbols: ~ ! @ # $ % * () _ — + = | : ; \" ' ` < > , . ? / ^",pattern:/^(?!\d+$)[^~!@#$%*()_—+=|:;"'`<>,.?/^]{1,30}$/,minLength:1,maxLength:30},rt={title:"🦸‍♀️ Registr new Player 🦸",btns:{addUser:{text:"add user"},cancel:{text:"cancel"}},inputs:{firstnName:{title:"first name",type:"text",placeholder:"Jessie",validation:it},lastName:{title:"last name",type:"text",placeholder:"Doe",validation:it},email:{title:"e-mail",type:"email",placeholder:"Jessie.Doe@gmail.com",validation:{required:!0,errorMessage:"Email not valid 🙁",pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,minLength:3,maxLength:30}}}},nt={confirm:{text:"OK"}},ot={initialRoute:at.route,header:t,pages:{about:at,score:{route:{url:"#/best-score",title:"best score",pageCreator:()=>new et(m)},navSvgIcon:"./svg/sprite.svg#icon-star"},settings:{route:{url:"#/game-settings",title:"game settings",pageCreator:()=>new K(g)},navSvgIcon:"./svg/sprite.svg#icon-gear"},game:{route:{url:"#/game",title:"about game",pageCreator:()=>new Z(u,g,p,m)}}},popups:{signUp:rt}};class ct{constructor(){this.listeners=new Set}subscribe(t){this.listeners.add(t)}unsubscribe(t){this.listeners.delete(t)}notify(t){this.listeners.forEach((e=>e(t)))}}const lt={url:"#/⛔",title:"Page Not Found!",pageCreator:()=>new st};class ht{constructor(){this.observer=new ct,this.routes=new Map,this.errorPageRoute=lt,this.currentUrl="",window.addEventListener("hashchange",(()=>this.observer.notify(this.updateCurrentRoute())))}onChange(t){this.observer.subscribe(t)}addRoute(t){return this.routes.set(t.url,t),this}getPageRoute(t){return this.routes.get(t)||this.errorPageRoute}updateCurrentRoute(){const t=this.currentUrl,e=ht.getCurrentUrl();if(t!==e){const t=this.getPageRoute(e);n(t.title),this.currentPage?.stop(),this.currentPage=t.pageCreator(),this.currentPage.init(),this.currentUrl=e}return{oldUrl:t,newUrl:e,newPage:this.currentPage}}static getCurrentUrl(){return window.location.hash||""}static activateRoute(t){window.location.hash=t}}const dt={header:"header--1NncKmEQQ",wrapper:"wrapper--3rfyi-BeM",logo:"logo--3qnSiQFY3","btn-state-switch":"btn-state-switch--1kI9X1ZWl",btnStateSwitch:"btn-state-switch--1kI9X1ZWl","btn--hidden":"btn--hidden--1cPXNsYdt",btnHidden:"btn--hidden--1cPXNsYdt",avatar:"avatar--1ZdwmxlvE","avatar--hidden":"avatar--hidden--16fndReds",avatarHidden:"avatar--hidden--16fndReds",avatar__img:"avatar__img--3hk5gpfiG",avatarImg:"avatar__img--3hk5gpfiG","svg-icon":"svg-icon--3aPTFVWrY",svgIcon:"svg-icon--3aPTFVWrY"};class ut extends class{constructor(t,e){this.name=t,this.next=e}apply(t){throw new Error(`⚠️ Method not implemented. This state: ${String(this.name)}. This context: ${String(t)} ⚠️`)}}{constructor(t,e,s,a){super(t,e),this.name=t,this.next=e,this.btnText=s,this.hideAvatar=a}apply(t){t.setBtnText(this.btnText),t.hideAvatar(this.hideAvatar)}}class mt extends S{constructor(){super({tag:"nav",classNames:["nav-menu--oq7N5R5oz"]}),this.navList=new S({tag:"ul",classNames:["nav-items--ClElNpQa4"]}),this.render(this.navList)}addNavLinks(t){this.navLinks=t.filter((t=>void 0!==t.navSvgIcon)).reduce(((t,e)=>t.set(e.route.url,mt.createNavLink(e))),new Map),this.navList.render(mt.createNavItems([...this.navLinks.values()]))}setActiveNavLink(t){this.activeNavLink?.active(!1),this.activeNavLink=this.navLinks?.get(t),this.activeNavLink?.active()}static createNavItems(t){return t.map((t=>new S({tag:"li",classNames:["nav-item--tNzLKtmzy"],childs:[t]})))}static createNavLink({route:t,navSvgIcon:e}){return new b({url:t.url,classNames:["nav-link--3vlnkh93B"],text:t.title,hookElement:t=>(e&&t.append(w(e,["svg-icon--2ZlcA-p-O"])),t)})}}class pt{constructor(t){this.initialState=t,this.statesMap=new Map,this.currentState=t,this.addState(t)}addState(t){return this.statesMap.set(t.name,t),this}getCurrentState(){return this.currentState}applyCurrentState(t){this.currentState.apply(t)}nextState(t,e=!0){const s=this.currentState,a=this.statesMap.get(s.next)||this.initialState;this.currentState=a,this.applyCurrentState(t),e&&t.observer.notify(s.name,[s.name,a.name])}}class gt extends S{constructor(e,s){super({tag:"header",classNames:[dt.header]}),this.appStateService=e,this.userService=s,this.observer=new P,this.stateMashine=new pt(new ut("initial","ready",t.btns.signUp.text,!0)).addState(new ut("ready","game",t.btns.start.text,!1)).addState(new ut("game","ready",t.btns.stop.text,!1)),this.logo=new b({url:ot.initialRoute.url,classNames:[dt.logo]}),this.menu=new mt,this.avatar=new S({classNames:[dt.avatar]}),this.btnStateSwitch=new f({classNames:[dt.btn,dt.btnStateSwitch]}),this.render(new S({classNames:[dt.wrapper],childs:[this.logo,this.menu,this.btnStateSwitch,this.avatar]})),this.stateMashine.applyCurrentState(this),this.btnStateSwitch.onClick((()=>{const t=this.getCurrentState();e.requestStateChange({from:t.name,to:t.next}).then((t=>{t&&this.stateMashine.nextState(this)}),null)}))}getCurrentState(){return this.stateMashine.getCurrentState()}nextState(){this.stateMashine.nextState(this,!1)}hideAvatar(t=!0){if(this.avatar.setCssState(dt.avatarHidden,t),!t&&""===this.avatar.element.innerHTML){const t=this.userService.currentUser;if(!t)return;Y(t,this.avatar,[dt.svgIcon,dt.avatarImg],[dt.avatarImg])}}setBtnText(t){this.btnStateSwitch.setText(t)}}const vt="hidden--3NyI22jWd",wt="root--modal-mode--24Uf6g9cD";class St extends S{constructor(){super({classNames:["modal-cover--2OW8-d3HV",vt]})}async show(){await this.setCssStateAsync(vt,!1),document.body.classList.add(wt)}async hide(){await this.setCssStateAsync(vt,!0),document.body.classList.remove(wt)}}const ft={"user-form":"user-form--PhptjbZyg",userForm:"user-form--PhptjbZyg","inputs-wrapper":"inputs-wrapper--372nhcpJe",inputsWrapper:"inputs-wrapper--372nhcpJe",avatar:"avatar--1YI9qA5PV",avatar__output:"avatar__output--fuOywBXJU",avatarOutput:"avatar__output--fuOywBXJU","btn-add-avatar-wrapper":"btn-add-avatar-wrapper--1XEfQ5sPK",btnAddAvatarWrapper:"btn-add-avatar-wrapper--1XEfQ5sPK","btn-add-avatar":"btn-add-avatar--3hR4Bk1aY",btnAddAvatar:"btn-add-avatar--3hR4Bk1aY","svg-icon":"svg-icon--17PWVtxbn",svgIcon:"svg-icon--17PWVtxbn","svg-icon--avatar-output":"svg-icon--avatar-output--3TBi_Xvh-",svgIconAvatarOutput:"svg-icon--avatar-output--3TBi_Xvh-","svg-icon--btn-add-avatar":"svg-icon--btn-add-avatar--1KvTQKuIJ",svgIconBtnAddAvatar:"svg-icon--btn-add-avatar--1KvTQKuIJ"},bt="hidden--2yEgepIqC",Ct="pop-up__side--25PtkCbPW";class yt extends S{constructor(t){super({tag:"section",classNames:["pop-up--YriWNg8R0",bt]}),this.header=new S({tag:"header",classNames:[Ct,"pop-up__header--30ffs2ZuF"]}),this.footer=new S({tag:"footer",classNames:[Ct,"pop-up__footer--l6g4pGxFS"]}),this.body=new S({classNames:["pop-up__body--2XaS7WQjB"]}),this.render([this.header,this.body,this.footer]),this.header.render(new S({tag:"h3",classNames:["pop-up__title--2k_Gkp0dd"],text:t})),this.onClick((t=>{t.cancelBubble=!0}))}addContent(t){this.body.render(t)}addButtons(t){this.footer.render(t)}async show(){await this.setCssStateAsync(bt,!1)}async hide(){await this.setCssStateAsync(bt,!0)}}const Nt="error--xI8ai97nB";class At extends S{constructor({title:t,type:e="text",placeholder:s="",validation:a,classNames:i=[],...r}){super({...r,classNames:["input-wrapper--MSRjq87Pw",...i]}),this.label=new S({tag:"label",classNames:["title--2k4UySCei"]}),this.input=new S({tag:"input",classNames:["input--1DPWoXDUZ"]});const{required:o,pattern:c,minLength:l,maxLength:h,errorMessage:d}=a;this.title=n(t),this.label.setText(this.title),this.errorMessage=d,this.input.element.type=e,this.input.element.placeholder=s,this.input.element.required=o,this.input.element.pattern=c.source,this.input.element.minLength=l,this.input.element.maxLength=h,this.render([this.label,this.input]),this.onInput((()=>this.validate())),this.onInvalid((t=>this.setError(t)))}validate(){return this.resetError(),this.input.element.reportValidity()}reset(){this.resetError(),this.input.element.value=""}resetError(){this.input.element.setCustomValidity(""),this.setCssStateAsync(Nt,!1).then(null,null)}setError(t){t.valueMissing?this.input.element.setCustomValidity(`${this.title} required`):t.patternMismatch?this.input.element.setCustomValidity(this.errorMessage):t.tooShort?this.input.element.setCustomValidity(`${this.title} should be at least ${this.input.element.minLength} characters; you entered ${this.input.element.value.length}.`):t.tooLong&&this.input.element.setCustomValidity(`${this.title} should be less than ${this.input.element.maxLength} characters; you entered ${this.input.element.value.length}.`),this.setCssStateAsync(Nt,!0).then(null,null)}onInput(t,e){this.input.element.addEventListener("input",(()=>t(this.input.element.value)),e)}onInvalid(t,e){this.input.element.addEventListener("invalid",(()=>t(this.input.element.validity)),e)}}const xt=t=>new At(rt.inputs[t]),_t=(t,...e)=>new f({...rt.btns[t],classNames:e});class It extends yt{constructor(t){super(rt.title),this.userService=t,this.form=new S({tag:"form"}),this.inputFirstName=xt("firstnName"),this.inputLastName=xt("lastName"),this.inputEmail=xt("email"),this.btnAddUser=_t("addUser"),this.btnCancel=_t("cancel","btn--invert"),this.btnAddAvatar=new S({tag:"input",classNames:[ft.btnAddAvatar]}),this.avatarOutput=new S({classNames:[ft.avatarOutput]}),this.addContent(new S({classNames:[ft.userForm]}).render([this.initInputs(),this.initAvatar()])),this.addButtons([this.btnAddUser,this.btnCancel])}initInputs(){return new S({classNames:[ft.formWrapper]}).render(this.form.render(new S({classNames:[ft.inputsWrapper]}).render(this.inputs)))}initAvatar(){return this.avatarOutput.element.append(w("./svg/sprite.svg#icon-avatar",[ft.svgIcon,ft.svgIconAvatarOutput])),new S({classNames:[ft.avatar]}).render([this.avatarOutput,this.initBtnAddAvatar()])}initBtnAddAvatar(){this.btnAddAvatar.element.type="file";const t=new S({classNames:[ft.btnAddAvatarWrapper]}).render(this.btnAddAvatar);return t.element.append(w("./svg/sprite.svg#icon-cross",[ft.svgIcon,ft.svgIconBtnAddAvatar])),this.btnAddAvatar.element.addEventListener("input",(()=>{this.handleAddAvatar().then(null,null)})),t}async handleAddAvatar(){const t=this.btnAddAvatar.element.files;if(!t)return;const e=t[0];let s=await C.create({url:window.URL.createObjectURL(e)});const a=function(t,e){const s=document.createElement("canvas"),a=s.getContext("2d");if(!a)return"";const i=Math.min(t.width,t.height),r=(t.width-i)/2,n=(t.height-i)/2;return a.canvas.width=e,a.canvas.height=e,a.drawImage(t,r,n,i,i,0,0,e,e),s.toDataURL()}(s.element,200);a&&(this.userAvatarBase64=a,s=await C.create({url:a}),this.avatarOutput.render(s))}get inputs(){return[this.inputFirstName,this.inputLastName,this.inputEmail]}async task(){return new Promise((t=>{this.btnAddUser.onClick((()=>{this.onAddUser(t).then(null,null)})),this.btnCancel.onClick((()=>{this.resetInputs(),t(!1)}))}))}async onAddUser(t){if(this.isUserValid()){const e=this.getUser();t(void 0!==await this.userService.save(e))}return!1}isUserValid(){return this.inputs.every((t=>t.validate()))}resetInputs(){this.inputs.map((t=>t.reset()))}getUser(){return{firstName:this.inputFirstName.input.element.value,lastName:this.inputLastName.input.element.value,email:this.inputEmail.input.element.value,score:0,time:0,avatar:this.userAvatarBase64}}}class kt extends yt{constructor(t,e=NaN){super("🏆 Victory! 🏆"),this.userService=t,this.btnConfirn=new f({...nt.confirm,classNames:[]}),this.init(e,this.userService.currentUser)}init(t,e){e&&(this.addContent((t=>{const{hours:e,min:s,sec:a}=B(t.time);let i=[`${e} hours`,`${s} minutes`,`${a} seconds`];return i=t.time>3600?i:i.slice(1),i=t.time>60?i:i.slice(1),new S(`<div class="output--PLzdIITwP">Congratulations,\n    <span class="highlight--18WQ-Hrv7">${t.firstName} ${t.lastName}</span>!\n    <br>You successfully found all matches in time\n    <span class="highlight--18WQ-Hrv7">${i.join(" ")}</span>\n    <br>with score <span class="highlight--18WQ-Hrv7">${t.score}</span>.</div>`)})(e)),this.addButtons(this.btnConfirn))}task(){return new Promise((t=>{this.btnConfirn.onClick((()=>t(!0)))}))}}class Ut{constructor(t){this.headerView=new gt(u,m),this.modalView=new St,this.router=new ht,this.gameStoppedByButton=!1,u.init((t=>this.handleAppStateChangeRequest(t))),Object.values(ot.pages).reduce(((t,e)=>t.addRoute(e.route)),this.router),this.router.onChange((t=>this.applayRouteChange(t))),this.initHeader(),this.pageContainer=new S({classNames:["page-container--2BzkQwOZo"]}),this.view=new S({tag:"main",classNames:["app--2_KmwgIsG"]}),this.view.render([this.headerView,this.pageContainer,this.modalView]),t.append(this.view.element)}async start(){ht.activateRoute(ot.initialRoute.url),this.headerView.menu.setActiveNavLink(ot.initialRoute.url),await m.init()}applayRouteChange({oldUrl:t,newUrl:e,newPage:s}){t!==ot.pages.game.route.url||this.gameStoppedByButton||this.headerView.nextState(),s&&this.pageContainer.render(s.view),this.headerView.menu.setActiveNavLink(e)}initHeader(){this.headerView.menu.addNavLinks(Object.values(ot.pages))}async handleAppStateChangeRequest(t){switch(await new Promise((t=>t(!0))),t.from){case"initial":return await this.processPopUp(new It(m));case"ready":return this.gameStoppedByButton=!1,ht.activateRoute(ot.pages.game.route.url),!0;case"game":return"ready"===t.to?ht.getCurrentUrl()===ot.pages.game.route.url&&(this.gameStoppedByButton=!0,ht.activateRoute(ot.initialRoute.url)):"solved"===t.to&&(await this.processPopUp(new kt(m)),ht.activateRoute(ot.pages.score.route.url)),!0;case"solved":return!0;default:return!1}}async processPopUp(t){await this.showPopup(t);const e=await t.task();return await this.hidePopup(t),e}async showPopup(t){this.modalView.render(t),this.modalView.onClick((()=>{this.hidePopup(t).then(null,null)})),await this.modalView.show(),await t.show()}async hidePopup(t){await Promise.all([t.hide(),this.modalView.hide()])}}window.addEventListener("load",(()=>{document.body.classList.add("root"),new Ut(document.body).start().then(null,(t=>console.log(t)))}))})();