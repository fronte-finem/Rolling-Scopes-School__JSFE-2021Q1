/*! For license information please see main.2ee6a80b8d79970845ac.js.LICENSE.txt */
(()=>{var e={741:(e,t,n)=>{e.exports=n(241)},188:(e,t,n)=>{"use strict";var r=n(577),a=n(483),o=n(893),l=n(24),i=n(19),s=n(355),u=n(863),c=n(493);e.exports=function(e){return new Promise((function(t,n){var f=e.data,d=e.headers;r.isFormData(f)&&delete d["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";d.Authorization="Basic "+btoa(h+":"+m)}var g=i(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),l(g,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?s(p.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:r,config:e,request:p};a(t,n,o),p=null}},p.onabort=function(){p&&(n(c("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){n(c("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(c(t,e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var v=(e.withCredentials||u(g))&&e.xsrfCookieName?o.read(e.xsrfCookieName):void 0;v&&(d[e.xsrfHeaderName]=v)}if("setRequestHeader"in p&&r.forEach(d,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),n(e),p=null)})),f||(f=null),p.send(f)}))}},241:(e,t,n)=>{"use strict";var r=n(577),a=n(579),o=n(814),l=n(721);function i(e){var t=new o(e),n=a(o.prototype.request,t);return r.extend(n,o.prototype,t),r.extend(n,t),n}var s=i(n(658));s.Axios=o,s.create=function(e){return i(l(s.defaults,e))},s.Cancel=n(899),s.CancelToken=n(770),s.isCancel=n(282),s.all=function(e){return Promise.all(e)},s.spread=n(497),s.isAxiosError=n(185),e.exports=s,e.exports.default=s},899:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},770:(e,t,n)=>{"use strict";var r=n(899);function a(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}a.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},a.source=function(){var e;return{token:new a((function(t){e=t})),cancel:e}},e.exports=a},282:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},814:(e,t,n)=>{"use strict";var r=n(577),a=n(24),o=n(315),l=n(110),i=n(721);function s(e){this.defaults=e,this.interceptors={request:new o,response:new o}}s.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=i(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[l,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},s.prototype.getUri=function(e){return e=i(this.defaults,e),a(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){s.prototype[e]=function(t,n){return this.request(i(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){s.prototype[e]=function(t,n,r){return this.request(i(r||{},{method:e,url:t,data:n}))}})),e.exports=s},315:(e,t,n)=>{"use strict";var r=n(577);function a(){this.handlers=[]}a.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},a.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},a.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=a},19:(e,t,n)=>{"use strict";var r=n(145),a=n(366);e.exports=function(e,t){return e&&!r(t)?a(e,t):t}},493:(e,t,n)=>{"use strict";var r=n(957);e.exports=function(e,t,n,a,o){var l=new Error(e);return r(l,t,n,a,o)}},110:(e,t,n)=>{"use strict";var r=n(577),a=n(980),o=n(282),l=n(658);function i(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return i(e),e.headers=e.headers||{},e.data=a(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||l.adapter)(e).then((function(t){return i(e),t.data=a(t.data,t.headers,e.transformResponse),t}),(function(t){return o(t)||(i(e),t&&t.response&&(t.response.data=a(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},957:e=>{"use strict";e.exports=function(e,t,n,r,a){return e.config=t,n&&(e.code=n),e.request=r,e.response=a,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},721:(e,t,n)=>{"use strict";var r=n(577);e.exports=function(e,t){t=t||{};var n={},a=["url","method","data"],o=["headers","auth","proxy","params"],l=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],i=["validateStatus"];function s(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(a){r.isUndefined(t[a])?r.isUndefined(e[a])||(n[a]=s(void 0,e[a])):n[a]=s(e[a],t[a])}r.forEach(a,(function(e){r.isUndefined(t[e])||(n[e]=s(void 0,t[e]))})),r.forEach(o,u),r.forEach(l,(function(a){r.isUndefined(t[a])?r.isUndefined(e[a])||(n[a]=s(void 0,e[a])):n[a]=s(void 0,t[a])})),r.forEach(i,(function(r){r in t?n[r]=s(e[r],t[r]):r in e&&(n[r]=s(void 0,e[r]))}));var c=a.concat(o).concat(l).concat(i),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===c.indexOf(e)}));return r.forEach(f,u),n}},483:(e,t,n)=>{"use strict";var r=n(493);e.exports=function(e,t,n){var a=n.config.validateStatus;n.status&&a&&!a(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},980:(e,t,n)=>{"use strict";var r=n(577);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},658:(e,t,n)=>{"use strict";var r=n(577),a=n(2),o={"Content-Type":"application/x-www-form-urlencoded"};function l(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var i,s={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(i=n(188)),i),transformRequest:[function(e,t){return a(t,"Accept"),a(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(l(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(l(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){s.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){s.headers[e]=r.merge(o)})),e.exports=s},579:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},24:(e,t,n)=>{"use strict";var r=n(577);function a(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var o;if(n)o=n(t);else if(r.isURLSearchParams(t))o=t.toString();else{var l=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),l.push(a(t)+"="+a(e))})))})),o=l.join("&")}if(o){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},366:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},893:(e,t,n)=>{"use strict";var r=n(577);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,a,o,l){var i=[];i.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),r.isString(a)&&i.push("path="+a),r.isString(o)&&i.push("domain="+o),!0===l&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},145:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},185:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},863:(e,t,n)=>{"use strict";var r=n(577);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function a(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=a(window.location.href),function(t){var n=r.isString(t)?a(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},2:(e,t,n)=>{"use strict";var r=n(577);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},355:(e,t,n)=>{"use strict";var r=n(577),a=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,o,l={};return e?(r.forEach(e.split("\n"),(function(e){if(o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t){if(l[t]&&a.indexOf(t)>=0)return;l[t]="set-cookie"===t?(l[t]?l[t]:[]).concat([n]):l[t]?l[t]+", "+n:n}})),l):l}},497:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},577:(e,t,n)=>{"use strict";var r=n(579),a=Object.prototype.toString;function o(e){return"[object Array]"===a.call(e)}function l(e){return void 0===e}function i(e){return null!==e&&"object"==typeof e}function s(e){if("[object Object]"!==a.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===a.call(e)}function c(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),o(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(null,e[a],a,e)}e.exports={isArray:o,isArrayBuffer:function(e){return"[object ArrayBuffer]"===a.call(e)},isBuffer:function(e){return null!==e&&!l(e)&&null!==e.constructor&&!l(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:i,isPlainObject:s,isUndefined:l,isDate:function(e){return"[object Date]"===a.call(e)},isFile:function(e){return"[object File]"===a.call(e)},isBlob:function(e){return"[object Blob]"===a.call(e)},isFunction:u,isStream:function(e){return i(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function e(){var t={};function n(n,r){s(t[r])&&s(n)?t[r]=e(t[r],n):s(n)?t[r]=e({},n):o(n)?t[r]=n.slice():t[r]=n}for(var r=0,a=arguments.length;r<a;r++)c(arguments[r],n);return t},extend:function(e,t,n){return c(t,(function(t,a){e[a]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},535:(e,t,n)=>{"use strict";var r=n(237),a={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},l={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},i={};function s(e){return r.isMemo(e)?l:i[e.$$typeof]||a}i[r.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},i[r.Memo]=l;var u=Object.defineProperty,c=Object.getOwnPropertyNames,f=Object.getOwnPropertySymbols,d=Object.getOwnPropertyDescriptor,p=Object.getPrototypeOf,h=Object.prototype;e.exports=function e(t,n,r){if("string"!=typeof n){if(h){var a=p(n);a&&a!==h&&e(t,a,r)}var l=c(n);f&&(l=l.concat(f(n)));for(var i=s(t),m=s(n),g=0;g<l.length;++g){var v=l[g];if(!(o[v]||r&&r[v]||m&&m[v]||i&&i[v])){var y=d(n,v);try{u(t,v,y)}catch(e){}}}}return t}},901:e=>{e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},767:e=>{"use strict";var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function a(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,o){for(var l,i,s=a(e),u=1;u<arguments.length;u++){for(var c in l=Object(arguments[u]))n.call(l,c)&&(s[c]=l[c]);if(t){i=t(l);for(var f=0;f<i.length;f++)r.call(l,i[f])&&(s[i[f]]=l[i[f]])}}return s}},720:(e,t,n)=>{var r=n(901);e.exports=function e(t,n,a){return r(n)||(a=n||a,n=[]),a=a||{},t instanceof RegExp?function(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return c(e,t)}(t,n):r(t)?function(t,n,r){for(var a=[],o=0;o<t.length;o++)a.push(e(t[o],n,r).source);return c(new RegExp("(?:"+a.join("|")+")",f(r)),n)}(t,n,a):function(e,t,n){return d(o(e,n),t,n)}(t,n,a)},e.exports.parse=o,e.exports.compile=function(e,t){return i(o(e,t),t)},e.exports.tokensToFunction=i,e.exports.tokensToRegExp=d;var a=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function o(e,t){for(var n,r=[],o=0,l=0,i="",c=t&&t.delimiter||"/";null!=(n=a.exec(e));){var f=n[0],d=n[1],p=n.index;if(i+=e.slice(l,p),l=p+f.length,d)i+=d[1];else{var h=e[l],m=n[2],g=n[3],v=n[4],y=n[5],b=n[6],w=n[7];i&&(r.push(i),i="");var E=null!=m&&null!=h&&h!==m,x="+"===b||"*"===b,k="?"===b||"*"===b,S=n[2]||c,C=v||y;r.push({name:g||o++,prefix:m||"",delimiter:S,optional:k,repeat:x,partial:E,asterisk:!!w,pattern:C?u(C):w?".*":"[^"+s(S)+"]+?"})}}return l<e.length&&(i+=e.substr(l)),i&&r.push(i),r}function l(e){return encodeURI(e).replace(/[\/?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}))}function i(e,t){for(var n=new Array(e.length),a=0;a<e.length;a++)"object"==typeof e[a]&&(n[a]=new RegExp("^(?:"+e[a].pattern+")$",f(t)));return function(t,a){for(var o="",i=t||{},s=(a||{}).pretty?l:encodeURIComponent,u=0;u<e.length;u++){var c=e[u];if("string"!=typeof c){var f,d=i[c.name];if(null==d){if(c.optional){c.partial&&(o+=c.prefix);continue}throw new TypeError('Expected "'+c.name+'" to be defined')}if(r(d)){if(!c.repeat)throw new TypeError('Expected "'+c.name+'" to not repeat, but received `'+JSON.stringify(d)+"`");if(0===d.length){if(c.optional)continue;throw new TypeError('Expected "'+c.name+'" to not be empty')}for(var p=0;p<d.length;p++){if(f=s(d[p]),!n[u].test(f))throw new TypeError('Expected all "'+c.name+'" to match "'+c.pattern+'", but received `'+JSON.stringify(f)+"`");o+=(0===p?c.prefix:c.delimiter)+f}}else{if(f=c.asterisk?encodeURI(d).replace(/[?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})):s(d),!n[u].test(f))throw new TypeError('Expected "'+c.name+'" to match "'+c.pattern+'", but received "'+f+'"');o+=c.prefix+f}}else o+=c}return o}}function s(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function c(e,t){return e.keys=t,e}function f(e){return e&&e.sensitive?"":"i"}function d(e,t,n){r(t)||(n=t||n,t=[]);for(var a=(n=n||{}).strict,o=!1!==n.end,l="",i=0;i<e.length;i++){var u=e[i];if("string"==typeof u)l+=s(u);else{var d=s(u.prefix),p="(?:"+u.pattern+")";t.push(u),u.repeat&&(p+="(?:"+d+p+")*"),l+=p=u.optional?u.partial?d+"("+p+")?":"(?:"+d+"("+p+"))?":d+"("+p+")"}}var h=s(n.delimiter||"/"),m=l.slice(-h.length)===h;return a||(l=(m?l.slice(0,-h.length):l)+"(?:"+h+"(?=$))?"),l+=o?"$":a&&m?"":"(?="+h+"|$)",c(new RegExp("^"+l,f(n)),t)}},132:(e,t,n)=>{"use strict";var r=n(134);function a(){}function o(){}o.resetWarningCache=a,e.exports=function(){function e(e,t,n,a,o,l){if(l!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:a};return n.PropTypes=n,n}},36:(e,t,n)=>{e.exports=n(132)()},134:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},439:(e,t,n)=>{"use strict";var r=n(496),a=n(767),o=n(51);function l(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!r)throw Error(l(227));var i=new Set,s={};function u(e,t){c(e,t),c(e+"Capture",t)}function c(e,t){for(s[e]=t,e=0;e<t.length;e++)i.add(t[e])}var f=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),d=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p=Object.prototype.hasOwnProperty,h={},m={};function g(e,t,n,r,a,o,l){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=l}var v={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){v[e]=new g(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];v[t]=new g(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){v[e]=new g(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){v[e]=new g(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){v[e]=new g(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){v[e]=new g(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){v[e]=new g(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){v[e]=new g(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){v[e]=new g(e,5,!1,e.toLowerCase(),null,!1,!1)}));var y=/[\-:]([a-z])/g;function b(e){return e[1].toUpperCase()}function w(e,t,n,r){var a=v.hasOwnProperty(t)?v[t]:null;(null!==a?0===a.type:!r&&2<t.length&&("o"===t[0]||"O"===t[0])&&("n"===t[1]||"N"===t[1]))||(function(e,t,n,r){if(null==t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,a,r)&&(n=null),r||null===a?function(e){return!!p.call(m,e)||!p.call(h,e)&&(d.test(e)?m[e]=!0:(h[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=null===n?3!==a.type&&"":n:(t=a.attributeName,r=a.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(a=a.type)||4===a&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){v[e]=new g(e,1,!1,e.toLowerCase(),null,!1,!1)})),v.xlinkHref=new g("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){v[e]=new g(e,1,!1,e.toLowerCase(),null,!0,!0)}));var E=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,x=60103,k=60106,S=60107,C=60108,_=60114,T=60109,N=60110,O=60112,P=60113,R=60120,A=60115,L=60116,I=60121,M=60128,z=60129,D=60130,$=60131;if("function"==typeof Symbol&&Symbol.for){var j=Symbol.for;x=j("react.element"),k=j("react.portal"),S=j("react.fragment"),C=j("react.strict_mode"),_=j("react.profiler"),T=j("react.provider"),N=j("react.context"),O=j("react.forward_ref"),P=j("react.suspense"),R=j("react.suspense_list"),A=j("react.memo"),L=j("react.lazy"),I=j("react.block"),j("react.scope"),M=j("react.opaque.id"),z=j("react.debug_trace_mode"),D=j("react.offscreen"),$=j("react.legacy_hidden")}var F,U="function"==typeof Symbol&&Symbol.iterator;function W(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=U&&e[U]||e["@@iterator"])?e:null}function B(e){if(void 0===F)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);F=t&&t[1]||""}return"\n"+F+e}var H=!1;function V(e,t){if(!e||H)return"";H=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(e){var r=e}Reflect.construct(e,[],t)}else{try{t.call()}catch(e){r=e}e.call(t.prototype)}else{try{throw Error()}catch(e){r=e}e()}}catch(e){if(e&&r&&"string"==typeof e.stack){for(var a=e.stack.split("\n"),o=r.stack.split("\n"),l=a.length-1,i=o.length-1;1<=l&&0<=i&&a[l]!==o[i];)i--;for(;1<=l&&0<=i;l--,i--)if(a[l]!==o[i]){if(1!==l||1!==i)do{if(l--,0>--i||a[l]!==o[i])return"\n"+a[l].replace(" at new "," at ")}while(1<=l&&0<=i);break}}}finally{H=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?B(e):""}function q(e){switch(e.tag){case 5:return B(e.type);case 16:return B("Lazy");case 13:return B("Suspense");case 19:return B("SuspenseList");case 0:case 2:case 15:return V(e.type,!1);case 11:return V(e.type.render,!1);case 22:return V(e.type._render,!1);case 1:return V(e.type,!0);default:return""}}function Y(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case S:return"Fragment";case k:return"Portal";case _:return"Profiler";case C:return"StrictMode";case P:return"Suspense";case R:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case N:return(e.displayName||"Context")+".Consumer";case T:return(e._context.displayName||"Context")+".Provider";case O:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(""!==t?"ForwardRef("+t+")":"ForwardRef");case A:return Y(e.type);case I:return Y(e._render);case L:t=e._payload,e=e._init;try{return Y(e(t))}catch(e){}}return null}function G(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}function Q(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function K(e){e._valueTracker||(e._valueTracker=function(e){var t=Q(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function X(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Q(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function Z(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function J(e,t){var n=t.checked;return a({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function ee(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=G(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function te(e,t){null!=(t=t.checked)&&w(e,"checked",t,!1)}function ne(e,t){te(e,t);var n=G(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ae(e,t.type,n):t.hasOwnProperty("defaultValue")&&ae(e,t.type,G(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function re(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ae(e,t,n){"number"===t&&Z(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}function oe(e,t){return e=a({children:void 0},t),(t=function(e){var t="";return r.Children.forEach(e,(function(e){null!=e&&(t+=e)})),t}(t.children))&&(e.children=t),e}function le(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+G(n),t=null,a=0;a<e.length;a++){if(e[a].value===n)return e[a].selected=!0,void(r&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function ie(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(l(91));return a({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function se(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(l(92));if(Array.isArray(n)){if(!(1>=n.length))throw Error(l(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:G(n)}}function ue(e,t){var n=G(t.value),r=G(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function ce(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}var fe="http://www.w3.org/1999/xhtml";function de(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function pe(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?de(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var he,me,ge=(me=function(e,t){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=t;else{for((he=he||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=he.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return me(e,t)}))}:me);function ve(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var ye={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},be=["Webkit","ms","Moz","O"];function we(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||ye.hasOwnProperty(e)&&ye[e]?(""+t).trim():t+"px"}function Ee(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),a=we(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}Object.keys(ye).forEach((function(e){be.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ye[t]=ye[e]}))}));var xe=a({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ke(e,t){if(t){if(xe[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(l(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(l(60));if("object"!=typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(l(61))}if(null!=t.style&&"object"!=typeof t.style)throw Error(l(62))}}function Se(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function Ce(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var _e=null,Te=null,Ne=null;function Oe(e){if(e=Jr(e)){if("function"!=typeof _e)throw Error(l(280));var t=e.stateNode;t&&(t=ta(t),_e(e.stateNode,e.type,t))}}function Pe(e){Te?Ne?Ne.push(e):Ne=[e]:Te=e}function Re(){if(Te){var e=Te,t=Ne;if(Ne=Te=null,Oe(e),t)for(e=0;e<t.length;e++)Oe(t[e])}}function Ae(e,t){return e(t)}function Le(e,t,n,r,a){return e(t,n,r,a)}function Ie(){}var Me=Ae,ze=!1,De=!1;function $e(){null===Te&&null===Ne||(Ie(),Re())}function je(e,t){var n=e.stateNode;if(null===n)return null;var r=ta(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!=typeof n)throw Error(l(231,t,typeof n));return n}var Fe=!1;if(f)try{var Ue={};Object.defineProperty(Ue,"passive",{get:function(){Fe=!0}}),window.addEventListener("test",Ue,Ue),window.removeEventListener("test",Ue,Ue)}catch(me){Fe=!1}function We(e,t,n,r,a,o,l,i,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(e){this.onError(e)}}var Be=!1,He=null,Ve=!1,qe=null,Ye={onError:function(e){Be=!0,He=e}};function Ge(e,t,n,r,a,o,l,i,s){Be=!1,He=null,We.apply(Ye,arguments)}function Qe(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!=(1026&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function Ke(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&null!==(e=e.alternate)&&(t=e.memoizedState),null!==t)return t.dehydrated}return null}function Xe(e){if(Qe(e)!==e)throw Error(l(188))}function Ze(e){if(!(e=function(e){var t=e.alternate;if(!t){if(null===(t=Qe(e)))throw Error(l(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(null===a)break;var o=a.alternate;if(null===o){if(null!==(r=a.return)){n=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return Xe(a),e;if(o===r)return Xe(a),t;o=o.sibling}throw Error(l(188))}if(n.return!==r.return)n=a,r=o;else{for(var i=!1,s=a.child;s;){if(s===n){i=!0,n=a,r=o;break}if(s===r){i=!0,r=a,n=o;break}s=s.sibling}if(!i){for(s=o.child;s;){if(s===n){i=!0,n=o,r=a;break}if(s===r){i=!0,r=o,n=a;break}s=s.sibling}if(!i)throw Error(l(189))}}if(n.alternate!==r)throw Error(l(190))}if(3!==n.tag)throw Error(l(188));return n.stateNode.current===n?e:t}(e)))return null;for(var t=e;;){if(5===t.tag||6===t.tag)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}function Je(e,t){for(var n=e.alternate;null!==t;){if(t===e||t===n)return!0;t=t.return}return!1}var et,tt,nt,rt,at=!1,ot=[],lt=null,it=null,st=null,ut=new Map,ct=new Map,ft=[],dt="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function pt(e,t,n,r,a){return{blockedOn:e,domEventName:t,eventSystemFlags:16|n,nativeEvent:a,targetContainers:[r]}}function ht(e,t){switch(e){case"focusin":case"focusout":lt=null;break;case"dragenter":case"dragleave":it=null;break;case"mouseover":case"mouseout":st=null;break;case"pointerover":case"pointerout":ut.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ct.delete(t.pointerId)}}function mt(e,t,n,r,a,o){return null===e||e.nativeEvent!==o?(e=pt(t,n,r,a,o),null!==t&&null!==(t=Jr(t))&&tt(t),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==a&&-1===t.indexOf(a)&&t.push(a),e)}function gt(e){var t=Zr(e.target);if(null!==t){var n=Qe(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=Ke(n)))return e.blockedOn=t,void rt(e.lanePriority,(function(){o.unstable_runWithPriority(e.priority,(function(){nt(n)}))}))}else if(3===t&&n.stateNode.hydrate)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function vt(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Zt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=Jr(n))&&tt(t),e.blockedOn=n,!1;t.shift()}return!0}function yt(e,t,n){vt(e)&&n.delete(t)}function bt(){for(at=!1;0<ot.length;){var e=ot[0];if(null!==e.blockedOn){null!==(e=Jr(e.blockedOn))&&et(e);break}for(var t=e.targetContainers;0<t.length;){var n=Zt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n){e.blockedOn=n;break}t.shift()}null===e.blockedOn&&ot.shift()}null!==lt&&vt(lt)&&(lt=null),null!==it&&vt(it)&&(it=null),null!==st&&vt(st)&&(st=null),ut.forEach(yt),ct.forEach(yt)}function wt(e,t){e.blockedOn===t&&(e.blockedOn=null,at||(at=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,bt)))}function Et(e){function t(t){return wt(t,e)}if(0<ot.length){wt(ot[0],e);for(var n=1;n<ot.length;n++){var r=ot[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==lt&&wt(lt,e),null!==it&&wt(it,e),null!==st&&wt(st,e),ut.forEach(t),ct.forEach(t),n=0;n<ft.length;n++)(r=ft[n]).blockedOn===e&&(r.blockedOn=null);for(;0<ft.length&&null===(n=ft[0]).blockedOn;)gt(n),null===n.blockedOn&&ft.shift()}function xt(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var kt={animationend:xt("Animation","AnimationEnd"),animationiteration:xt("Animation","AnimationIteration"),animationstart:xt("Animation","AnimationStart"),transitionend:xt("Transition","TransitionEnd")},St={},Ct={};function _t(e){if(St[e])return St[e];if(!kt[e])return e;var t,n=kt[e];for(t in n)if(n.hasOwnProperty(t)&&t in Ct)return St[e]=n[t];return e}f&&(Ct=document.createElement("div").style,"AnimationEvent"in window||(delete kt.animationend.animation,delete kt.animationiteration.animation,delete kt.animationstart.animation),"TransitionEvent"in window||delete kt.transitionend.transition);var Tt=_t("animationend"),Nt=_t("animationiteration"),Ot=_t("animationstart"),Pt=_t("transitionend"),Rt=new Map,At=new Map,Lt=["abort","abort",Tt,"animationEnd",Nt,"animationIteration",Ot,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Pt,"transitionEnd","waiting","waiting"];function It(e,t){for(var n=0;n<e.length;n+=2){var r=e[n],a=e[n+1];a="on"+(a[0].toUpperCase()+a.slice(1)),At.set(r,t),Rt.set(r,a),u(a,[r])}}(0,o.unstable_now)();var Mt=8;function zt(e){if(0!=(1&e))return Mt=15,1;if(0!=(2&e))return Mt=14,2;if(0!=(4&e))return Mt=13,4;var t=24&e;return 0!==t?(Mt=12,t):0!=(32&e)?(Mt=11,32):0!=(t=192&e)?(Mt=10,t):0!=(256&e)?(Mt=9,256):0!=(t=3584&e)?(Mt=8,t):0!=(4096&e)?(Mt=7,4096):0!=(t=4186112&e)?(Mt=6,t):0!=(t=62914560&e)?(Mt=5,t):67108864&e?(Mt=4,67108864):0!=(134217728&e)?(Mt=3,134217728):0!=(t=805306368&e)?(Mt=2,t):0!=(1073741824&e)?(Mt=1,1073741824):(Mt=8,e)}function Dt(e,t){var n=e.pendingLanes;if(0===n)return Mt=0;var r=0,a=0,o=e.expiredLanes,l=e.suspendedLanes,i=e.pingedLanes;if(0!==o)r=o,a=Mt=15;else if(0!=(o=134217727&n)){var s=o&~l;0!==s?(r=zt(s),a=Mt):0!=(i&=o)&&(r=zt(i),a=Mt)}else 0!=(o=n&~l)?(r=zt(o),a=Mt):0!==i&&(r=zt(i),a=Mt);if(0===r)return 0;if(r=n&((0>(r=31-Bt(r))?0:1<<r)<<1)-1,0!==t&&t!==r&&0==(t&l)){if(zt(t),a<=Mt)return t;Mt=a}if(0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)a=1<<(n=31-Bt(t)),r|=e[n],t&=~a;return r}function $t(e){return 0!=(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function jt(e,t){switch(e){case 15:return 1;case 14:return 2;case 12:return 0===(e=Ft(24&~t))?jt(10,t):e;case 10:return 0===(e=Ft(192&~t))?jt(8,t):e;case 8:return 0===(e=Ft(3584&~t))&&0===(e=Ft(4186112&~t))&&(e=512),e;case 2:return 0===(t=Ft(805306368&~t))&&(t=268435456),t}throw Error(l(358,e))}function Ft(e){return e&-e}function Ut(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Wt(e,t,n){e.pendingLanes|=t;var r=t-1;e.suspendedLanes&=r,e.pingedLanes&=r,(e=e.eventTimes)[t=31-Bt(t)]=n}var Bt=Math.clz32?Math.clz32:function(e){return 0===e?32:31-(Ht(e)/Vt|0)|0},Ht=Math.log,Vt=Math.LN2,qt=o.unstable_UserBlockingPriority,Yt=o.unstable_runWithPriority,Gt=!0;function Qt(e,t,n,r){ze||Ie();var a=Xt,o=ze;ze=!0;try{Le(a,e,t,n,r)}finally{(ze=o)||$e()}}function Kt(e,t,n,r){Yt(qt,Xt.bind(null,e,t,n,r))}function Xt(e,t,n,r){var a;if(Gt)if((a=0==(4&t))&&0<ot.length&&-1<dt.indexOf(e))e=pt(null,e,t,n,r),ot.push(e);else{var o=Zt(e,t,n,r);if(null===o)a&&ht(e,r);else{if(a){if(-1<dt.indexOf(e))return e=pt(o,e,t,n,r),void ot.push(e);if(function(e,t,n,r,a){switch(t){case"focusin":return lt=mt(lt,e,t,n,r,a),!0;case"dragenter":return it=mt(it,e,t,n,r,a),!0;case"mouseover":return st=mt(st,e,t,n,r,a),!0;case"pointerover":var o=a.pointerId;return ut.set(o,mt(ut.get(o)||null,e,t,n,r,a)),!0;case"gotpointercapture":return o=a.pointerId,ct.set(o,mt(ct.get(o)||null,e,t,n,r,a)),!0}return!1}(o,e,t,n,r))return;ht(e,r)}Rr(e,t,r,null,n)}}}function Zt(e,t,n,r){var a=Ce(r);if(null!==(a=Zr(a))){var o=Qe(a);if(null===o)a=null;else{var l=o.tag;if(13===l){if(null!==(a=Ke(o)))return a;a=null}else if(3===l){if(o.stateNode.hydrate)return 3===o.tag?o.stateNode.containerInfo:null;a=null}else o!==a&&(a=null)}}return Rr(e,t,r,a,n),null}var Jt=null,en=null,tn=null;function nn(){if(tn)return tn;var e,t,n=en,r=n.length,a="value"in Jt?Jt.value:Jt.textContent,o=a.length;for(e=0;e<r&&n[e]===a[e];e++);var l=r-e;for(t=1;t<=l&&n[r-t]===a[o-t];t++);return tn=a.slice(e,1<t?1-t:void 0)}function rn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function an(){return!0}function on(){return!1}function ln(e){function t(t,n,r,a,o){for(var l in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=a,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(l)&&(t=e[l],this[l]=t?t(a):a[l]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?an:on,this.isPropagationStopped=on,this}return a(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=an)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=an)},persist:function(){},isPersistent:an}),t}var sn,un,cn,fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dn=ln(fn),pn=a({},fn,{view:0,detail:0}),hn=ln(pn),mn=a({},pn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_n,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==cn&&(cn&&"mousemove"===e.type?(sn=e.screenX-cn.screenX,un=e.screenY-cn.screenY):un=sn=0,cn=e),sn)},movementY:function(e){return"movementY"in e?e.movementY:un}}),gn=ln(mn),vn=ln(a({},mn,{dataTransfer:0})),yn=ln(a({},pn,{relatedTarget:0})),bn=ln(a({},fn,{animationName:0,elapsedTime:0,pseudoElement:0})),wn=ln(a({},fn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),En=ln(a({},fn,{data:0})),xn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},kn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Sn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=Sn[e])&&!!t[e]}function _n(){return Cn}var Tn=ln(a({},pn,{key:function(e){if(e.key){var t=xn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=rn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?kn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_n,charCode:function(e){return"keypress"===e.type?rn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?rn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),Nn=ln(a({},mn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),On=ln(a({},pn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_n})),Pn=ln(a({},fn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Rn=ln(a({},mn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),An=[9,13,27,32],Ln=f&&"CompositionEvent"in window,In=null;f&&"documentMode"in document&&(In=document.documentMode);var Mn=f&&"TextEvent"in window&&!In,zn=f&&(!Ln||In&&8<In&&11>=In),Dn=String.fromCharCode(32),$n=!1;function jn(e,t){switch(e){case"keyup":return-1!==An.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Fn(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var Un=!1,Wn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Wn[e.type]:"textarea"===t}function Hn(e,t,n,r){Pe(r),0<(t=Lr(t,"onChange")).length&&(n=new dn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Vn=null,qn=null;function Yn(e){Cr(e,0)}function Gn(e){if(X(ea(e)))return e}function Qn(e,t){if("change"===e)return t}var Kn=!1;if(f){var Xn;if(f){var Zn="oninput"in document;if(!Zn){var Jn=document.createElement("div");Jn.setAttribute("oninput","return;"),Zn="function"==typeof Jn.oninput}Xn=Zn}else Xn=!1;Kn=Xn&&(!document.documentMode||9<document.documentMode)}function er(){Vn&&(Vn.detachEvent("onpropertychange",tr),qn=Vn=null)}function tr(e){if("value"===e.propertyName&&Gn(qn)){var t=[];if(Hn(t,qn,e,Ce(e)),e=Yn,ze)e(t);else{ze=!0;try{Ae(e,t)}finally{ze=!1,$e()}}}}function nr(e,t,n){"focusin"===e?(er(),qn=n,(Vn=t).attachEvent("onpropertychange",tr)):"focusout"===e&&er()}function rr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Gn(qn)}function ar(e,t){if("click"===e)return Gn(t)}function or(e,t){if("input"===e||"change"===e)return Gn(t)}var lr="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},ir=Object.prototype.hasOwnProperty;function sr(e,t){if(lr(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++)if(!ir.call(t,n[r])||!lr(e[n[r]],t[n[r]]))return!1;return!0}function ur(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function cr(e,t){var n,r=ur(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=ur(r)}}function fr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?fr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function dr(){for(var e=window,t=Z();t instanceof e.HTMLIFrameElement;){try{var n="string"==typeof t.contentWindow.location.href}catch(e){n=!1}if(!n)break;t=Z((e=t.contentWindow).document)}return t}function pr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var hr=f&&"documentMode"in document&&11>=document.documentMode,mr=null,gr=null,vr=null,yr=!1;function br(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;yr||null==mr||mr!==Z(r)||(r="selectionStart"in(r=mr)&&pr(r)?{start:r.selectionStart,end:r.selectionEnd}:{anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},vr&&sr(vr,r)||(vr=r,0<(r=Lr(gr,"onSelect")).length&&(t=new dn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=mr)))}It("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0),It("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1),It(Lt,2);for(var wr="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),Er=0;Er<wr.length;Er++)At.set(wr[Er],0);c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var xr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kr=new Set("cancel close invalid load scroll toggle".split(" ").concat(xr));function Sr(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,a,o,i,s,u){if(Ge.apply(this,arguments),Be){if(!Be)throw Error(l(198));var c=He;Be=!1,He=null,Ve||(Ve=!0,qe=c)}}(r,t,void 0,e),e.currentTarget=null}function Cr(e,t){t=0!=(4&t);for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var l=r.length-1;0<=l;l--){var i=r[l],s=i.instance,u=i.currentTarget;if(i=i.listener,s!==o&&a.isPropagationStopped())break e;Sr(a,i,u),o=s}else for(l=0;l<r.length;l++){if(s=(i=r[l]).instance,u=i.currentTarget,i=i.listener,s!==o&&a.isPropagationStopped())break e;Sr(a,i,u),o=s}}}if(Ve)throw e=qe,Ve=!1,qe=null,e}function _r(e,t){var n=na(t),r=e+"__bubble";n.has(r)||(Pr(t,e,2,!1),n.add(r))}var Tr="_reactListening"+Math.random().toString(36).slice(2);function Nr(e){e[Tr]||(e[Tr]=!0,i.forEach((function(t){kr.has(t)||Or(t,!1,e,null),Or(t,!0,e,null)})))}function Or(e,t,n,r){var a=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,o=n;if("selectionchange"===e&&9!==n.nodeType&&(o=n.ownerDocument),null!==r&&!t&&kr.has(e)){if("scroll"!==e)return;a|=2,o=r}var l=na(o),i=e+"__"+(t?"capture":"bubble");l.has(i)||(t&&(a|=4),Pr(o,e,a,t),l.add(i))}function Pr(e,t,n,r){var a=At.get(t);switch(void 0===a?2:a){case 0:a=Qt;break;case 1:a=Kt;break;default:a=Xt}n=a.bind(null,t,n,e),a=void 0,!Fe||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(a=!0),r?void 0!==a?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):void 0!==a?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Rr(e,t,n,r,a){var o=r;if(0==(1&t)&&0==(2&t)&&null!==r)e:for(;;){if(null===r)return;var l=r.tag;if(3===l||4===l){var i=r.stateNode.containerInfo;if(i===a||8===i.nodeType&&i.parentNode===a)break;if(4===l)for(l=r.return;null!==l;){var s=l.tag;if((3===s||4===s)&&((s=l.stateNode.containerInfo)===a||8===s.nodeType&&s.parentNode===a))return;l=l.return}for(;null!==i;){if(null===(l=Zr(i)))return;if(5===(s=l.tag)||6===s){r=o=l;continue e}i=i.parentNode}}r=r.return}!function(e,t,n){if(De)return e();De=!0;try{Me(e,t,n)}finally{De=!1,$e()}}((function(){var r=o,a=Ce(n),l=[];e:{var i=Rt.get(e);if(void 0!==i){var s=dn,u=e;switch(e){case"keypress":if(0===rn(n))break e;case"keydown":case"keyup":s=Tn;break;case"focusin":u="focus",s=yn;break;case"focusout":u="blur",s=yn;break;case"beforeblur":case"afterblur":s=yn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":s=gn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":s=vn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":s=On;break;case Tt:case Nt:case Ot:s=bn;break;case Pt:s=Pn;break;case"scroll":s=hn;break;case"wheel":s=Rn;break;case"copy":case"cut":case"paste":s=wn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":s=Nn}var c=0!=(4&t),f=!c&&"scroll"===e,d=c?null!==i?i+"Capture":null:i;c=[];for(var p,h=r;null!==h;){var m=(p=h).stateNode;if(5===p.tag&&null!==m&&(p=m,null!==d&&null!=(m=je(h,d))&&c.push(Ar(h,m,p))),f)break;h=h.return}0<c.length&&(i=new s(i,u,null,n,a),l.push({event:i,listeners:c}))}}if(0==(7&t)){if(s="mouseout"===e||"pointerout"===e,(!(i="mouseover"===e||"pointerover"===e)||0!=(16&t)||!(u=n.relatedTarget||n.fromElement)||!Zr(u)&&!u[Kr])&&(s||i)&&(i=a.window===a?a:(i=a.ownerDocument)?i.defaultView||i.parentWindow:window,s?(s=r,null!==(u=(u=n.relatedTarget||n.toElement)?Zr(u):null)&&(u!==(f=Qe(u))||5!==u.tag&&6!==u.tag)&&(u=null)):(s=null,u=r),s!==u)){if(c=gn,m="onMouseLeave",d="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(c=Nn,m="onPointerLeave",d="onPointerEnter",h="pointer"),f=null==s?i:ea(s),p=null==u?i:ea(u),(i=new c(m,h+"leave",s,n,a)).target=f,i.relatedTarget=p,m=null,Zr(a)===r&&((c=new c(d,h+"enter",u,n,a)).target=p,c.relatedTarget=f,m=c),f=m,s&&u)e:{for(d=u,h=0,p=c=s;p;p=Ir(p))h++;for(p=0,m=d;m;m=Ir(m))p++;for(;0<h-p;)c=Ir(c),h--;for(;0<p-h;)d=Ir(d),p--;for(;h--;){if(c===d||null!==d&&c===d.alternate)break e;c=Ir(c),d=Ir(d)}c=null}else c=null;null!==s&&Mr(l,i,s,c,!1),null!==u&&null!==f&&Mr(l,f,u,c,!0)}if("select"===(s=(i=r?ea(r):window).nodeName&&i.nodeName.toLowerCase())||"input"===s&&"file"===i.type)var g=Qn;else if(Bn(i))if(Kn)g=or;else{g=rr;var v=nr}else(s=i.nodeName)&&"input"===s.toLowerCase()&&("checkbox"===i.type||"radio"===i.type)&&(g=ar);switch(g&&(g=g(e,r))?Hn(l,g,n,a):(v&&v(e,i,r),"focusout"===e&&(v=i._wrapperState)&&v.controlled&&"number"===i.type&&ae(i,"number",i.value)),v=r?ea(r):window,e){case"focusin":(Bn(v)||"true"===v.contentEditable)&&(mr=v,gr=r,vr=null);break;case"focusout":vr=gr=mr=null;break;case"mousedown":yr=!0;break;case"contextmenu":case"mouseup":case"dragend":yr=!1,br(l,n,a);break;case"selectionchange":if(hr)break;case"keydown":case"keyup":br(l,n,a)}var y;if(Ln)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else Un?jn(e,n)&&(b="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(b="onCompositionStart");b&&(zn&&"ko"!==n.locale&&(Un||"onCompositionStart"!==b?"onCompositionEnd"===b&&Un&&(y=nn()):(en="value"in(Jt=a)?Jt.value:Jt.textContent,Un=!0)),0<(v=Lr(r,b)).length&&(b=new En(b,e,null,n,a),l.push({event:b,listeners:v}),(y||null!==(y=Fn(n)))&&(b.data=y))),(y=Mn?function(e,t){switch(e){case"compositionend":return Fn(t);case"keypress":return 32!==t.which?null:($n=!0,Dn);case"textInput":return(e=t.data)===Dn&&$n?null:e;default:return null}}(e,n):function(e,t){if(Un)return"compositionend"===e||!Ln&&jn(e,t)?(e=nn(),tn=en=Jt=null,Un=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return zn&&"ko"!==t.locale?null:t.data;default:return null}}(e,n))&&0<(r=Lr(r,"onBeforeInput")).length&&(a=new En("onBeforeInput","beforeinput",null,n,a),l.push({event:a,listeners:r}),a.data=y)}Cr(l,t)}))}function Ar(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Lr(e,t){for(var n=t+"Capture",r=[];null!==e;){var a=e,o=a.stateNode;5===a.tag&&null!==o&&(a=o,null!=(o=je(e,n))&&r.unshift(Ar(e,o,a)),null!=(o=je(e,t))&&r.push(Ar(e,o,a))),e=e.return}return r}function Ir(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Mr(e,t,n,r,a){for(var o=t._reactName,l=[];null!==n&&n!==r;){var i=n,s=i.alternate,u=i.stateNode;if(null!==s&&s===r)break;5===i.tag&&null!==u&&(i=u,a?null!=(s=je(n,o))&&l.unshift(Ar(n,s,i)):a||null!=(s=je(n,o))&&l.push(Ar(n,s,i))),n=n.return}0!==l.length&&e.push({event:t,listeners:l})}function zr(){}var Dr=null,$r=null;function jr(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}function Fr(e,t){return"textarea"===e||"option"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var Ur="function"==typeof setTimeout?setTimeout:void 0,Wr="function"==typeof clearTimeout?clearTimeout:void 0;function Br(e){(1===e.nodeType||9===e.nodeType&&null!=(e=e.body))&&(e.textContent="")}function Hr(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break}return e}function Vr(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var qr=0,Yr=Math.random().toString(36).slice(2),Gr="__reactFiber$"+Yr,Qr="__reactProps$"+Yr,Kr="__reactContainer$"+Yr,Xr="__reactEvents$"+Yr;function Zr(e){var t=e[Gr];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Kr]||n[Gr]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=Vr(e);null!==e;){if(n=e[Gr])return n;e=Vr(e)}return t}n=(e=n).parentNode}return null}function Jr(e){return!(e=e[Gr]||e[Kr])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function ea(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(l(33))}function ta(e){return e[Qr]||null}function na(e){var t=e[Xr];return void 0===t&&(t=e[Xr]=new Set),t}var ra=[],aa=-1;function oa(e){return{current:e}}function la(e){0>aa||(e.current=ra[aa],ra[aa]=null,aa--)}function ia(e,t){aa++,ra[aa]=e.current,e.current=t}var sa={},ua=oa(sa),ca=oa(!1),fa=sa;function da(e,t){var n=e.type.contextTypes;if(!n)return sa;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a,o={};for(a in n)o[a]=t[a];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function pa(e){return null!=e.childContextTypes}function ha(){la(ca),la(ua)}function ma(e,t,n){if(ua.current!==sa)throw Error(l(168));ia(ua,t),ia(ca,n)}function ga(e,t,n){var r=e.stateNode;if(e=t.childContextTypes,"function"!=typeof r.getChildContext)return n;for(var o in r=r.getChildContext())if(!(o in e))throw Error(l(108,Y(t)||"Unknown",o));return a({},n,r)}function va(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||sa,fa=ua.current,ia(ua,e),ia(ca,ca.current),!0}function ya(e,t,n){var r=e.stateNode;if(!r)throw Error(l(169));n?(e=ga(e,t,fa),r.__reactInternalMemoizedMergedChildContext=e,la(ca),la(ua),ia(ua,e)):la(ca),ia(ca,n)}var ba=null,wa=null,Ea=o.unstable_runWithPriority,xa=o.unstable_scheduleCallback,ka=o.unstable_cancelCallback,Sa=o.unstable_shouldYield,Ca=o.unstable_requestPaint,_a=o.unstable_now,Ta=o.unstable_getCurrentPriorityLevel,Na=o.unstable_ImmediatePriority,Oa=o.unstable_UserBlockingPriority,Pa=o.unstable_NormalPriority,Ra=o.unstable_LowPriority,Aa=o.unstable_IdlePriority,La={},Ia=void 0!==Ca?Ca:function(){},Ma=null,za=null,Da=!1,$a=_a(),ja=1e4>$a?_a:function(){return _a()-$a};function Fa(){switch(Ta()){case Na:return 99;case Oa:return 98;case Pa:return 97;case Ra:return 96;case Aa:return 95;default:throw Error(l(332))}}function Ua(e){switch(e){case 99:return Na;case 98:return Oa;case 97:return Pa;case 96:return Ra;case 95:return Aa;default:throw Error(l(332))}}function Wa(e,t){return e=Ua(e),Ea(e,t)}function Ba(e,t,n){return e=Ua(e),xa(e,t,n)}function Ha(){if(null!==za){var e=za;za=null,ka(e)}Va()}function Va(){if(!Da&&null!==Ma){Da=!0;var e=0;try{var t=Ma;Wa(99,(function(){for(;e<t.length;e++){var n=t[e];do{n=n(!0)}while(null!==n)}})),Ma=null}catch(t){throw null!==Ma&&(Ma=Ma.slice(e+1)),xa(Na,Ha),t}finally{Da=!1}}}var qa=E.ReactCurrentBatchConfig;function Ya(e,t){if(e&&e.defaultProps){for(var n in t=a({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}var Ga=oa(null),Qa=null,Ka=null,Xa=null;function Za(){Xa=Ka=Qa=null}function Ja(e){var t=Ga.current;la(Ga),e.type._context._currentValue=t}function eo(e,t){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)===t){if(null===n||(n.childLanes&t)===t)break;n.childLanes|=t}else e.childLanes|=t,null!==n&&(n.childLanes|=t);e=e.return}}function to(e,t){Qa=e,Xa=Ka=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!=(e.lanes&t)&&(Ll=!0),e.firstContext=null)}function no(e,t){if(Xa!==e&&!1!==t&&0!==t)if("number"==typeof t&&1073741823!==t||(Xa=e,t=1073741823),t={context:e,observedBits:t,next:null},null===Ka){if(null===Qa)throw Error(l(308));Ka=t,Qa.dependencies={lanes:0,firstContext:t,responders:null}}else Ka=Ka.next=t;return e._currentValue}var ro=!1;function ao(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}function oo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function lo(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function io(e,t){if(null!==(e=e.updateQueue)){var n=(e=e.shared).pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}}function so(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var a=null,o=null;if(null!==(n=n.firstBaseUpdate)){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===o?a=o=l:o=o.next=l,n=n.next}while(null!==n);null===o?a=o=t:o=o.next=t}else a=o=t;return n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function uo(e,t,n,r){var o=e.updateQueue;ro=!1;var l=o.firstBaseUpdate,i=o.lastBaseUpdate,s=o.shared.pending;if(null!==s){o.shared.pending=null;var u=s,c=u.next;u.next=null,null===i?l=c:i.next=c,i=u;var f=e.alternate;if(null!==f){var d=(f=f.updateQueue).lastBaseUpdate;d!==i&&(null===d?f.firstBaseUpdate=c:d.next=c,f.lastBaseUpdate=u)}}if(null!==l){for(d=o.baseState,i=0,f=c=u=null;;){s=l.lane;var p=l.eventTime;if((r&s)===s){null!==f&&(f=f.next={eventTime:p,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var h=e,m=l;switch(s=t,p=n,m.tag){case 1:if("function"==typeof(h=m.payload)){d=h.call(p,d,s);break e}d=h;break e;case 3:h.flags=-4097&h.flags|64;case 0:if(null==(s="function"==typeof(h=m.payload)?h.call(p,d,s):h))break e;d=a({},d,s);break e;case 2:ro=!0}}null!==l.callback&&(e.flags|=32,null===(s=o.effects)?o.effects=[l]:s.push(l))}else p={eventTime:p,lane:s,tag:l.tag,payload:l.payload,callback:l.callback,next:null},null===f?(c=f=p,u=d):f=f.next=p,i|=s;if(null===(l=l.next)){if(null===(s=o.shared.pending))break;l=s.next,s.next=null,o.lastBaseUpdate=s,o.shared.pending=null}}null===f&&(u=d),o.baseState=u,o.firstBaseUpdate=c,o.lastBaseUpdate=f,Mi|=i,e.lanes=i,e.memoizedState=d}}function co(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(null!==a){if(r.callback=null,r=n,"function"!=typeof a)throw Error(l(191,a));a.call(r)}}}var fo=(new r.Component).refs;function po(e,t,n,r){n=null==(n=n(r,t=e.memoizedState))?t:a({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var ho={isMounted:function(e){return!!(e=e._reactInternals)&&Qe(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ls(),a=is(e),o=lo(r,a);o.payload=t,null!=n&&(o.callback=n),io(e,o),ss(e,a,r)},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ls(),a=is(e),o=lo(r,a);o.tag=1,o.payload=t,null!=n&&(o.callback=n),io(e,o),ss(e,a,r)},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ls(),r=is(e),a=lo(n,r);a.tag=2,null!=t&&(a.callback=t),io(e,a),ss(e,r,n)}};function mo(e,t,n,r,a,o,l){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,l):!(t.prototype&&t.prototype.isPureReactComponent&&sr(n,r)&&sr(a,o))}function go(e,t,n){var r=!1,a=sa,o=t.contextType;return"object"==typeof o&&null!==o?o=no(o):(a=pa(t)?fa:ua.current,o=(r=null!=(r=t.contextTypes))?da(e,a):sa),t=new t(n,o),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=ho,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),t}function vo(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ho.enqueueReplaceState(t,t.state,null)}function yo(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs=fo,ao(e);var o=t.contextType;"object"==typeof o&&null!==o?a.context=no(o):(o=pa(t)?fa:ua.current,a.context=da(e,o)),uo(e,n,a,r),a.state=e.memoizedState,"function"==typeof(o=t.getDerivedStateFromProps)&&(po(e,t,o,n),a.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof a.getSnapshotBeforeUpdate||"function"!=typeof a.UNSAFE_componentWillMount&&"function"!=typeof a.componentWillMount||(t=a.state,"function"==typeof a.componentWillMount&&a.componentWillMount(),"function"==typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount(),t!==a.state&&ho.enqueueReplaceState(a,a.state,null),uo(e,n,a,r),a.state=e.memoizedState),"function"==typeof a.componentDidMount&&(e.flags|=4)}var bo=Array.isArray;function wo(e,t,n){if(null!==(e=n.ref)&&"function"!=typeof e&&"object"!=typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(l(309));var r=n.stateNode}if(!r)throw Error(l(147,e));var a=""+e;return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===a?t.ref:((t=function(e){var t=r.refs;t===fo&&(t=r.refs={}),null===e?delete t[a]:t[a]=e})._stringRef=a,t)}if("string"!=typeof e)throw Error(l(284));if(!n._owner)throw Error(l(290,e))}return e}function Eo(e,t){if("textarea"!==e.type)throw Error(l(31,"[object Object]"===Object.prototype.toString.call(t)?"object with keys {"+Object.keys(t).join(", ")+"}":t))}function xo(e){function t(t,n){if(e){var r=t.lastEffect;null!==r?(r.nextEffect=n,t.lastEffect=n):t.firstEffect=t.lastEffect=n,n.nextEffect=null,n.flags=8}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function a(e,t){return(e=Fs(e,t)).index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags=2,n):r:(t.flags=2,n):n}function i(t){return e&&null===t.alternate&&(t.flags=2),t}function s(e,t,n,r){return null===t||6!==t.tag?((t=Hs(n,e.mode,r)).return=e,t):((t=a(t,n)).return=e,t)}function u(e,t,n,r){return null!==t&&t.elementType===n.type?((r=a(t,n.props)).ref=wo(e,t,n),r.return=e,r):((r=Us(n.type,n.key,n.props,null,e.mode,r)).ref=wo(e,t,n),r.return=e,r)}function c(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Vs(n,e.mode,r)).return=e,t):((t=a(t,n.children||[])).return=e,t)}function f(e,t,n,r,o){return null===t||7!==t.tag?((t=Ws(n,e.mode,r,o)).return=e,t):((t=a(t,n)).return=e,t)}function d(e,t,n){if("string"==typeof t||"number"==typeof t)return(t=Hs(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case x:return(n=Us(t.type,t.key,t.props,null,e.mode,n)).ref=wo(e,null,t),n.return=e,n;case k:return(t=Vs(t,e.mode,n)).return=e,t}if(bo(t)||W(t))return(t=Ws(t,e.mode,n,null)).return=e,t;Eo(e,t)}return null}function p(e,t,n,r){var a=null!==t?t.key:null;if("string"==typeof n||"number"==typeof n)return null!==a?null:s(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case x:return n.key===a?n.type===S?f(e,t,n.props.children,r,a):u(e,t,n,r):null;case k:return n.key===a?c(e,t,n,r):null}if(bo(n)||W(n))return null!==a?null:f(e,t,n,r,null);Eo(e,n)}return null}function h(e,t,n,r,a){if("string"==typeof r||"number"==typeof r)return s(t,e=e.get(n)||null,""+r,a);if("object"==typeof r&&null!==r){switch(r.$$typeof){case x:return e=e.get(null===r.key?n:r.key)||null,r.type===S?f(t,e,r.props.children,a,r.key):u(t,e,r,a);case k:return c(t,e=e.get(null===r.key?n:r.key)||null,r,a)}if(bo(r)||W(r))return f(t,e=e.get(n)||null,r,a,null);Eo(t,r)}return null}function m(a,l,i,s){for(var u=null,c=null,f=l,m=l=0,g=null;null!==f&&m<i.length;m++){f.index>m?(g=f,f=null):g=f.sibling;var v=p(a,f,i[m],s);if(null===v){null===f&&(f=g);break}e&&f&&null===v.alternate&&t(a,f),l=o(v,l,m),null===c?u=v:c.sibling=v,c=v,f=g}if(m===i.length)return n(a,f),u;if(null===f){for(;m<i.length;m++)null!==(f=d(a,i[m],s))&&(l=o(f,l,m),null===c?u=f:c.sibling=f,c=f);return u}for(f=r(a,f);m<i.length;m++)null!==(g=h(f,a,m,i[m],s))&&(e&&null!==g.alternate&&f.delete(null===g.key?m:g.key),l=o(g,l,m),null===c?u=g:c.sibling=g,c=g);return e&&f.forEach((function(e){return t(a,e)})),u}function g(a,i,s,u){var c=W(s);if("function"!=typeof c)throw Error(l(150));if(null==(s=c.call(s)))throw Error(l(151));for(var f=c=null,m=i,g=i=0,v=null,y=s.next();null!==m&&!y.done;g++,y=s.next()){m.index>g?(v=m,m=null):v=m.sibling;var b=p(a,m,y.value,u);if(null===b){null===m&&(m=v);break}e&&m&&null===b.alternate&&t(a,m),i=o(b,i,g),null===f?c=b:f.sibling=b,f=b,m=v}if(y.done)return n(a,m),c;if(null===m){for(;!y.done;g++,y=s.next())null!==(y=d(a,y.value,u))&&(i=o(y,i,g),null===f?c=y:f.sibling=y,f=y);return c}for(m=r(a,m);!y.done;g++,y=s.next())null!==(y=h(m,a,g,y.value,u))&&(e&&null!==y.alternate&&m.delete(null===y.key?g:y.key),i=o(y,i,g),null===f?c=y:f.sibling=y,f=y);return e&&m.forEach((function(e){return t(a,e)})),c}return function(e,r,o,s){var u="object"==typeof o&&null!==o&&o.type===S&&null===o.key;u&&(o=o.props.children);var c="object"==typeof o&&null!==o;if(c)switch(o.$$typeof){case x:e:{for(c=o.key,u=r;null!==u;){if(u.key===c){switch(u.tag){case 7:if(o.type===S){n(e,u.sibling),(r=a(u,o.props.children)).return=e,e=r;break e}break;default:if(u.elementType===o.type){n(e,u.sibling),(r=a(u,o.props)).ref=wo(e,u,o),r.return=e,e=r;break e}}n(e,u);break}t(e,u),u=u.sibling}o.type===S?((r=Ws(o.props.children,e.mode,s,o.key)).return=e,e=r):((s=Us(o.type,o.key,o.props,null,e.mode,s)).ref=wo(e,r,o),s.return=e,e=s)}return i(e);case k:e:{for(u=o.key;null!==r;){if(r.key===u){if(4===r.tag&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),(r=a(r,o.children||[])).return=e,e=r;break e}n(e,r);break}t(e,r),r=r.sibling}(r=Vs(o,e.mode,s)).return=e,e=r}return i(e)}if("string"==typeof o||"number"==typeof o)return o=""+o,null!==r&&6===r.tag?(n(e,r.sibling),(r=a(r,o)).return=e,e=r):(n(e,r),(r=Hs(o,e.mode,s)).return=e,e=r),i(e);if(bo(o))return m(e,r,o,s);if(W(o))return g(e,r,o,s);if(c&&Eo(e,o),void 0===o&&!u)switch(e.tag){case 1:case 22:case 0:case 11:case 15:throw Error(l(152,Y(e.type)||"Component"))}return n(e,r)}}var ko=xo(!0),So=xo(!1),Co={},_o=oa(Co),To=oa(Co),No=oa(Co);function Oo(e){if(e===Co)throw Error(l(174));return e}function Po(e,t){switch(ia(No,t),ia(To,e),ia(_o,Co),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:pe(null,"");break;default:t=pe(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}la(_o),ia(_o,t)}function Ro(){la(_o),la(To),la(No)}function Ao(e){Oo(No.current);var t=Oo(_o.current),n=pe(t,e.type);t!==n&&(ia(To,e),ia(_o,n))}function Lo(e){To.current===e&&(la(_o),la(To))}var Io=oa(0);function Mo(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!=(64&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var zo=null,Do=null,$o=!1;function jo(e,t){var n=$s(5,null,null,0);n.elementType="DELETED",n.type="DELETED",n.stateNode=t,n.return=e,n.flags=8,null!==e.lastEffect?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}function Fo(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,!0);case 13:default:return!1}}function Uo(e){if($o){var t=Do;if(t){var n=t;if(!Fo(e,t)){if(!(t=Hr(n.nextSibling))||!Fo(e,t))return e.flags=-1025&e.flags|2,$o=!1,void(zo=e);jo(zo,n)}zo=e,Do=Hr(t.firstChild)}else e.flags=-1025&e.flags|2,$o=!1,zo=e}}function Wo(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;zo=e}function Bo(e){if(e!==zo)return!1;if(!$o)return Wo(e),$o=!0,!1;var t=e.type;if(5!==e.tag||"head"!==t&&"body"!==t&&!Fr(t,e.memoizedProps))for(t=Do;t;)jo(e,t),t=Hr(t.nextSibling);if(Wo(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(l(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){Do=Hr(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}Do=null}}else Do=zo?Hr(e.stateNode.nextSibling):null;return!0}function Ho(){Do=zo=null,$o=!1}var Vo=[];function qo(){for(var e=0;e<Vo.length;e++)Vo[e]._workInProgressVersionPrimary=null;Vo.length=0}var Yo=E.ReactCurrentDispatcher,Go=E.ReactCurrentBatchConfig,Qo=0,Ko=null,Xo=null,Zo=null,Jo=!1,el=!1;function tl(){throw Error(l(321))}function nl(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!lr(e[n],t[n]))return!1;return!0}function rl(e,t,n,r,a,o){if(Qo=o,Ko=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Yo.current=null===e||null===e.memoizedState?Ol:Pl,e=n(r,a),el){o=0;do{if(el=!1,!(25>o))throw Error(l(301));o+=1,Zo=Xo=null,t.updateQueue=null,Yo.current=Rl,e=n(r,a)}while(el)}if(Yo.current=Nl,t=null!==Xo&&null!==Xo.next,Qo=0,Zo=Xo=Ko=null,Jo=!1,t)throw Error(l(300));return e}function al(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Zo?Ko.memoizedState=Zo=e:Zo=Zo.next=e,Zo}function ol(){if(null===Xo){var e=Ko.alternate;e=null!==e?e.memoizedState:null}else e=Xo.next;var t=null===Zo?Ko.memoizedState:Zo.next;if(null!==t)Zo=t,Xo=e;else{if(null===e)throw Error(l(310));e={memoizedState:(Xo=e).memoizedState,baseState:Xo.baseState,baseQueue:Xo.baseQueue,queue:Xo.queue,next:null},null===Zo?Ko.memoizedState=Zo=e:Zo=Zo.next=e}return Zo}function ll(e,t){return"function"==typeof t?t(e):t}function il(e){var t=ol(),n=t.queue;if(null===n)throw Error(l(311));n.lastRenderedReducer=e;var r=Xo,a=r.baseQueue,o=n.pending;if(null!==o){if(null!==a){var i=a.next;a.next=o.next,o.next=i}r.baseQueue=a=o,n.pending=null}if(null!==a){a=a.next,r=r.baseState;var s=i=o=null,u=a;do{var c=u.lane;if((Qo&c)===c)null!==s&&(s=s.next={lane:0,action:u.action,eagerReducer:u.eagerReducer,eagerState:u.eagerState,next:null}),r=u.eagerReducer===e?u.eagerState:e(r,u.action);else{var f={lane:c,action:u.action,eagerReducer:u.eagerReducer,eagerState:u.eagerState,next:null};null===s?(i=s=f,o=r):s=s.next=f,Ko.lanes|=c,Mi|=c}u=u.next}while(null!==u&&u!==a);null===s?o=r:s.next=i,lr(r,t.memoizedState)||(Ll=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=s,n.lastRenderedState=r}return[t.memoizedState,n.dispatch]}function sl(e){var t=ol(),n=t.queue;if(null===n)throw Error(l(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(null!==a){n.pending=null;var i=a=a.next;do{o=e(o,i.action),i=i.next}while(i!==a);lr(o,t.memoizedState)||(Ll=!0),t.memoizedState=o,null===t.baseQueue&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ul(e,t,n){var r=t._getVersion;r=r(t._source);var a=t._workInProgressVersionPrimary;if(null!==a?e=a===r:(e=e.mutableReadLanes,(e=(Qo&e)===e)&&(t._workInProgressVersionPrimary=r,Vo.push(t))),e)return n(t._source);throw Vo.push(t),Error(l(350))}function cl(e,t,n,r){var a=Ti;if(null===a)throw Error(l(349));var o=t._getVersion,i=o(t._source),s=Yo.current,u=s.useState((function(){return ul(a,t,n)})),c=u[1],f=u[0];u=Zo;var d=e.memoizedState,p=d.refs,h=p.getSnapshot,m=d.source;d=d.subscribe;var g=Ko;return e.memoizedState={refs:p,source:t,subscribe:r},s.useEffect((function(){p.getSnapshot=n,p.setSnapshot=c;var e=o(t._source);if(!lr(i,e)){e=n(t._source),lr(f,e)||(c(e),e=is(g),a.mutableReadLanes|=e&a.pendingLanes),e=a.mutableReadLanes,a.entangledLanes|=e;for(var r=a.entanglements,l=e;0<l;){var s=31-Bt(l),u=1<<s;r[s]|=e,l&=~u}}}),[n,t,r]),s.useEffect((function(){return r(t._source,(function(){var e=p.getSnapshot,n=p.setSnapshot;try{n(e(t._source));var r=is(g);a.mutableReadLanes|=r&a.pendingLanes}catch(e){n((function(){throw e}))}}))}),[t,r]),lr(h,n)&&lr(m,t)&&lr(d,r)||((e={pending:null,dispatch:null,lastRenderedReducer:ll,lastRenderedState:f}).dispatch=c=Tl.bind(null,Ko,e),u.queue=e,u.baseQueue=null,f=ul(a,t,n),u.memoizedState=u.baseState=f),f}function fl(e,t,n){return cl(ol(),e,t,n)}function dl(e){var t=al();return"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e,e=(e=t.queue={pending:null,dispatch:null,lastRenderedReducer:ll,lastRenderedState:e}).dispatch=Tl.bind(null,Ko,e),[t.memoizedState,e]}function pl(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=Ko.updateQueue)?(t={lastEffect:null},Ko.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function hl(e){return e={current:e},al().memoizedState=e}function ml(){return ol().memoizedState}function gl(e,t,n,r){var a=al();Ko.flags|=e,a.memoizedState=pl(1|t,n,void 0,void 0===r?null:r)}function vl(e,t,n,r){var a=ol();r=void 0===r?null:r;var o=void 0;if(null!==Xo){var l=Xo.memoizedState;if(o=l.destroy,null!==r&&nl(r,l.deps))return void pl(t,n,o,r)}Ko.flags|=e,a.memoizedState=pl(1|t,n,o,r)}function yl(e,t){return gl(516,4,e,t)}function bl(e,t){return vl(516,4,e,t)}function wl(e,t){return vl(4,2,e,t)}function El(e,t){return"function"==typeof t?(e=e(),t(e),function(){t(null)}):null!=t?(e=e(),t.current=e,function(){t.current=null}):void 0}function xl(e,t,n){return n=null!=n?n.concat([e]):null,vl(4,2,El.bind(null,t,e),n)}function kl(){}function Sl(e,t){var n=ol();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&nl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Cl(e,t){var n=ol();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&nl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function _l(e,t){var n=Fa();Wa(98>n?98:n,(function(){e(!0)})),Wa(97<n?97:n,(function(){var n=Go.transition;Go.transition=1;try{e(!1),t()}finally{Go.transition=n}}))}function Tl(e,t,n){var r=ls(),a=is(e),o={lane:a,action:n,eagerReducer:null,eagerState:null,next:null},l=t.pending;if(null===l?o.next=o:(o.next=l.next,l.next=o),t.pending=o,l=e.alternate,e===Ko||null!==l&&l===Ko)el=Jo=!0;else{if(0===e.lanes&&(null===l||0===l.lanes)&&null!==(l=t.lastRenderedReducer))try{var i=t.lastRenderedState,s=l(i,n);if(o.eagerReducer=l,o.eagerState=s,lr(s,i))return}catch(e){}ss(e,a,r)}}var Nl={readContext:no,useCallback:tl,useContext:tl,useEffect:tl,useImperativeHandle:tl,useLayoutEffect:tl,useMemo:tl,useReducer:tl,useRef:tl,useState:tl,useDebugValue:tl,useDeferredValue:tl,useTransition:tl,useMutableSource:tl,useOpaqueIdentifier:tl,unstable_isNewReconciler:!1},Ol={readContext:no,useCallback:function(e,t){return al().memoizedState=[e,void 0===t?null:t],e},useContext:no,useEffect:yl,useImperativeHandle:function(e,t,n){return n=null!=n?n.concat([e]):null,gl(4,2,El.bind(null,t,e),n)},useLayoutEffect:function(e,t){return gl(4,2,e,t)},useMemo:function(e,t){var n=al();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=al();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e=(e=r.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t}).dispatch=Tl.bind(null,Ko,e),[r.memoizedState,e]},useRef:hl,useState:dl,useDebugValue:kl,useDeferredValue:function(e){var t=dl(e),n=t[0],r=t[1];return yl((function(){var t=Go.transition;Go.transition=1;try{r(e)}finally{Go.transition=t}}),[e]),n},useTransition:function(){var e=dl(!1),t=e[0];return hl(e=_l.bind(null,e[1])),[e,t]},useMutableSource:function(e,t,n){var r=al();return r.memoizedState={refs:{getSnapshot:t,setSnapshot:null},source:e,subscribe:n},cl(r,e,t,n)},useOpaqueIdentifier:function(){if($o){var e=!1,t=function(e){return{$$typeof:M,toString:e,valueOf:e}}((function(){throw e||(e=!0,n("r:"+(qr++).toString(36))),Error(l(355))})),n=dl(t)[1];return 0==(2&Ko.mode)&&(Ko.flags|=516,pl(5,(function(){n("r:"+(qr++).toString(36))}),void 0,null)),t}return dl(t="r:"+(qr++).toString(36)),t},unstable_isNewReconciler:!1},Pl={readContext:no,useCallback:Sl,useContext:no,useEffect:bl,useImperativeHandle:xl,useLayoutEffect:wl,useMemo:Cl,useReducer:il,useRef:ml,useState:function(){return il(ll)},useDebugValue:kl,useDeferredValue:function(e){var t=il(ll),n=t[0],r=t[1];return bl((function(){var t=Go.transition;Go.transition=1;try{r(e)}finally{Go.transition=t}}),[e]),n},useTransition:function(){var e=il(ll)[0];return[ml().current,e]},useMutableSource:fl,useOpaqueIdentifier:function(){return il(ll)[0]},unstable_isNewReconciler:!1},Rl={readContext:no,useCallback:Sl,useContext:no,useEffect:bl,useImperativeHandle:xl,useLayoutEffect:wl,useMemo:Cl,useReducer:sl,useRef:ml,useState:function(){return sl(ll)},useDebugValue:kl,useDeferredValue:function(e){var t=sl(ll),n=t[0],r=t[1];return bl((function(){var t=Go.transition;Go.transition=1;try{r(e)}finally{Go.transition=t}}),[e]),n},useTransition:function(){var e=sl(ll)[0];return[ml().current,e]},useMutableSource:fl,useOpaqueIdentifier:function(){return sl(ll)[0]},unstable_isNewReconciler:!1},Al=E.ReactCurrentOwner,Ll=!1;function Il(e,t,n,r){t.child=null===e?So(t,null,n,r):ko(t,e.child,n,r)}function Ml(e,t,n,r,a){n=n.render;var o=t.ref;return to(t,a),r=rl(e,t,n,r,o,a),null===e||Ll?(t.flags|=1,Il(e,t,r,a),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~a,Jl(e,t,a))}function zl(e,t,n,r,a,o){if(null===e){var l=n.type;return"function"!=typeof l||js(l)||void 0!==l.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Us(n.type,null,r,t,t.mode,o)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=l,Dl(e,t,l,r,a,o))}return l=e.child,0==(a&o)&&(a=l.memoizedProps,(n=null!==(n=n.compare)?n:sr)(a,r)&&e.ref===t.ref)?Jl(e,t,o):(t.flags|=1,(e=Fs(l,r)).ref=t.ref,e.return=t,t.child=e)}function Dl(e,t,n,r,a,o){if(null!==e&&sr(e.memoizedProps,r)&&e.ref===t.ref){if(Ll=!1,0==(o&a))return t.lanes=e.lanes,Jl(e,t,o);0!=(16384&e.flags)&&(Ll=!0)}return Fl(e,t,n,r,o)}function $l(e,t,n){var r=t.pendingProps,a=r.children,o=null!==e?e.memoizedState:null;if("hidden"===r.mode||"unstable-defer-without-hiding"===r.mode)if(0==(4&t.mode))t.memoizedState={baseLanes:0},gs(0,n);else{if(0==(1073741824&n))return e=null!==o?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e},gs(0,e),null;t.memoizedState={baseLanes:0},gs(0,null!==o?o.baseLanes:n)}else null!==o?(r=o.baseLanes|n,t.memoizedState=null):r=n,gs(0,r);return Il(e,t,a,n),t.child}function jl(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=128)}function Fl(e,t,n,r,a){var o=pa(n)?fa:ua.current;return o=da(t,o),to(t,a),n=rl(e,t,n,r,o,a),null===e||Ll?(t.flags|=1,Il(e,t,n,a),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~a,Jl(e,t,a))}function Ul(e,t,n,r,a){if(pa(n)){var o=!0;va(t)}else o=!1;if(to(t,a),null===t.stateNode)null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),go(t,n,r),yo(t,n,r,a),r=!0;else if(null===e){var l=t.stateNode,i=t.memoizedProps;l.props=i;var s=l.context,u=n.contextType;u="object"==typeof u&&null!==u?no(u):da(t,u=pa(n)?fa:ua.current);var c=n.getDerivedStateFromProps,f="function"==typeof c||"function"==typeof l.getSnapshotBeforeUpdate;f||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(i!==r||s!==u)&&vo(t,l,r,u),ro=!1;var d=t.memoizedState;l.state=d,uo(t,r,l,a),s=t.memoizedState,i!==r||d!==s||ca.current||ro?("function"==typeof c&&(po(t,n,c,r),s=t.memoizedState),(i=ro||mo(t,n,i,r,d,s,u))?(f||"function"!=typeof l.UNSAFE_componentWillMount&&"function"!=typeof l.componentWillMount||("function"==typeof l.componentWillMount&&l.componentWillMount(),"function"==typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount()),"function"==typeof l.componentDidMount&&(t.flags|=4)):("function"==typeof l.componentDidMount&&(t.flags|=4),t.memoizedProps=r,t.memoizedState=s),l.props=r,l.state=s,l.context=u,r=i):("function"==typeof l.componentDidMount&&(t.flags|=4),r=!1)}else{l=t.stateNode,oo(e,t),i=t.memoizedProps,u=t.type===t.elementType?i:Ya(t.type,i),l.props=u,f=t.pendingProps,d=l.context,s="object"==typeof(s=n.contextType)&&null!==s?no(s):da(t,s=pa(n)?fa:ua.current);var p=n.getDerivedStateFromProps;(c="function"==typeof p||"function"==typeof l.getSnapshotBeforeUpdate)||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(i!==f||d!==s)&&vo(t,l,r,s),ro=!1,d=t.memoizedState,l.state=d,uo(t,r,l,a);var h=t.memoizedState;i!==f||d!==h||ca.current||ro?("function"==typeof p&&(po(t,n,p,r),h=t.memoizedState),(u=ro||mo(t,n,u,r,d,h,s))?(c||"function"!=typeof l.UNSAFE_componentWillUpdate&&"function"!=typeof l.componentWillUpdate||("function"==typeof l.componentWillUpdate&&l.componentWillUpdate(r,h,s),"function"==typeof l.UNSAFE_componentWillUpdate&&l.UNSAFE_componentWillUpdate(r,h,s)),"function"==typeof l.componentDidUpdate&&(t.flags|=4),"function"==typeof l.getSnapshotBeforeUpdate&&(t.flags|=256)):("function"!=typeof l.componentDidUpdate||i===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),"function"!=typeof l.getSnapshotBeforeUpdate||i===e.memoizedProps&&d===e.memoizedState||(t.flags|=256),t.memoizedProps=r,t.memoizedState=h),l.props=r,l.state=h,l.context=s,r=u):("function"!=typeof l.componentDidUpdate||i===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),"function"!=typeof l.getSnapshotBeforeUpdate||i===e.memoizedProps&&d===e.memoizedState||(t.flags|=256),r=!1)}return Wl(e,t,n,r,o,a)}function Wl(e,t,n,r,a,o){jl(e,t);var l=0!=(64&t.flags);if(!r&&!l)return a&&ya(t,n,!1),Jl(e,t,o);r=t.stateNode,Al.current=t;var i=l&&"function"!=typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&l?(t.child=ko(t,e.child,null,o),t.child=ko(t,null,i,o)):Il(e,t,i,o),t.memoizedState=r.state,a&&ya(t,n,!0),t.child}function Bl(e){var t=e.stateNode;t.pendingContext?ma(0,t.pendingContext,t.pendingContext!==t.context):t.context&&ma(0,t.context,!1),Po(e,t.containerInfo)}var Hl,Vl,ql,Yl={dehydrated:null,retryLane:0};function Gl(e,t,n){var r,a=t.pendingProps,o=Io.current,l=!1;return(r=0!=(64&t.flags))||(r=(null===e||null!==e.memoizedState)&&0!=(2&o)),r?(l=!0,t.flags&=-65):null!==e&&null===e.memoizedState||void 0===a.fallback||!0===a.unstable_avoidThisFallback||(o|=1),ia(Io,1&o),null===e?(void 0!==a.fallback&&Uo(t),e=a.children,o=a.fallback,l?(e=Ql(t,e,o,n),t.child.memoizedState={baseLanes:n},t.memoizedState=Yl,e):"number"==typeof a.unstable_expectedLoadTime?(e=Ql(t,e,o,n),t.child.memoizedState={baseLanes:n},t.memoizedState=Yl,t.lanes=33554432,e):((n=Bs({mode:"visible",children:e},t.mode,n,null)).return=t,t.child=n)):(e.memoizedState,l?(a=function(e,t,n,r,a){var o=t.mode,l=e.child;e=l.sibling;var i={mode:"hidden",children:n};return 0==(2&o)&&t.child!==l?((n=t.child).childLanes=0,n.pendingProps=i,null!==(l=n.lastEffect)?(t.firstEffect=n.firstEffect,t.lastEffect=l,l.nextEffect=null):t.firstEffect=t.lastEffect=null):n=Fs(l,i),null!==e?r=Fs(e,r):(r=Ws(r,o,a,null)).flags|=2,r.return=t,n.return=t,n.sibling=r,t.child=n,r}(e,t,a.children,a.fallback,n),l=t.child,o=e.child.memoizedState,l.memoizedState=null===o?{baseLanes:n}:{baseLanes:o.baseLanes|n},l.childLanes=e.childLanes&~n,t.memoizedState=Yl,a):(n=function(e,t,n,r){var a=e.child;return e=a.sibling,n=Fs(a,{mode:"visible",children:n}),0==(2&t.mode)&&(n.lanes=r),n.return=t,n.sibling=null,null!==e&&(e.nextEffect=null,e.flags=8,t.firstEffect=t.lastEffect=e),t.child=n}(e,t,a.children,n),t.memoizedState=null,n))}function Ql(e,t,n,r){var a=e.mode,o=e.child;return t={mode:"hidden",children:t},0==(2&a)&&null!==o?(o.childLanes=0,o.pendingProps=t):o=Bs(t,a,0,null),n=Ws(n,a,r,null),o.return=e,n.return=e,o.sibling=n,e.child=o,n}function Kl(e,t){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),eo(e.return,t)}function Xl(e,t,n,r,a,o){var l=e.memoizedState;null===l?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a,lastEffect:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=a,l.lastEffect=o)}function Zl(e,t,n){var r=t.pendingProps,a=r.revealOrder,o=r.tail;if(Il(e,t,r.children,n),0!=(2&(r=Io.current)))r=1&r|2,t.flags|=64;else{if(null!==e&&0!=(64&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Kl(e,n);else if(19===e.tag)Kl(e,n);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ia(Io,r),0==(2&t.mode))t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;null!==n;)null!==(e=n.alternate)&&null===Mo(e)&&(a=n),n=n.sibling;null===(n=a)?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Xl(t,!1,a,n,o,t.lastEffect);break;case"backwards":for(n=null,a=t.child,t.child=null;null!==a;){if(null!==(e=a.alternate)&&null===Mo(e)){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Xl(t,!0,n,null,o,t.lastEffect);break;case"together":Xl(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null}return t.child}function Jl(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Mi|=t.lanes,0!=(n&t.childLanes)){if(null!==e&&t.child!==e.child)throw Error(l(153));if(null!==t.child){for(n=Fs(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Fs(e,e.pendingProps)).return=t;n.sibling=null}return t.child}return null}function ei(e,t){if(!$o)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ti(e,t,n){var r=t.pendingProps;switch(t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return pa(t.type)&&ha(),null;case 3:return Ro(),la(ca),la(ua),qo(),(r=t.stateNode).pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(Bo(t)?t.flags|=4:r.hydrate||(t.flags|=256)),null;case 5:Lo(t);var o=Oo(No.current);if(n=t.type,null!==e&&null!=t.stateNode)Vl(e,t,n,r),e.ref!==t.ref&&(t.flags|=128);else{if(!r){if(null===t.stateNode)throw Error(l(166));return null}if(e=Oo(_o.current),Bo(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Gr]=t,r[Qr]=i,n){case"dialog":_r("cancel",r),_r("close",r);break;case"iframe":case"object":case"embed":_r("load",r);break;case"video":case"audio":for(e=0;e<xr.length;e++)_r(xr[e],r);break;case"source":_r("error",r);break;case"img":case"image":case"link":_r("error",r),_r("load",r);break;case"details":_r("toggle",r);break;case"input":ee(r,i),_r("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},_r("invalid",r);break;case"textarea":se(r,i),_r("invalid",r)}for(var u in ke(n,i),e=null,i)i.hasOwnProperty(u)&&(o=i[u],"children"===u?"string"==typeof o?r.textContent!==o&&(e=["children",o]):"number"==typeof o&&r.textContent!==""+o&&(e=["children",""+o]):s.hasOwnProperty(u)&&null!=o&&"onScroll"===u&&_r("scroll",r));switch(n){case"input":K(r),re(r,i,!0);break;case"textarea":K(r),ce(r);break;case"select":case"option":break;default:"function"==typeof i.onClick&&(r.onclick=zr)}r=e,t.updateQueue=r,null!==r&&(t.flags|=4)}else{switch(u=9===o.nodeType?o:o.ownerDocument,e===fe&&(e=de(n)),e===fe?"script"===n?((e=u.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"==typeof r.is?e=u.createElement(n,{is:r.is}):(e=u.createElement(n),"select"===n&&(u=e,r.multiple?u.multiple=!0:r.size&&(u.size=r.size))):e=u.createElementNS(e,n),e[Gr]=t,e[Qr]=r,Hl(e,t),t.stateNode=e,u=Se(n,r),n){case"dialog":_r("cancel",e),_r("close",e),o=r;break;case"iframe":case"object":case"embed":_r("load",e),o=r;break;case"video":case"audio":for(o=0;o<xr.length;o++)_r(xr[o],e);o=r;break;case"source":_r("error",e),o=r;break;case"img":case"image":case"link":_r("error",e),_r("load",e),o=r;break;case"details":_r("toggle",e),o=r;break;case"input":ee(e,r),o=J(e,r),_r("invalid",e);break;case"option":o=oe(e,r);break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=a({},r,{value:void 0}),_r("invalid",e);break;case"textarea":se(e,r),o=ie(e,r),_r("invalid",e);break;default:o=r}ke(n,o);var c=o;for(i in c)if(c.hasOwnProperty(i)){var f=c[i];"style"===i?Ee(e,f):"dangerouslySetInnerHTML"===i?null!=(f=f?f.__html:void 0)&&ge(e,f):"children"===i?"string"==typeof f?("textarea"!==n||""!==f)&&ve(e,f):"number"==typeof f&&ve(e,""+f):"suppressContentEditableWarning"!==i&&"suppressHydrationWarning"!==i&&"autoFocus"!==i&&(s.hasOwnProperty(i)?null!=f&&"onScroll"===i&&_r("scroll",e):null!=f&&w(e,i,f,u))}switch(n){case"input":K(e),re(e,r,!1);break;case"textarea":K(e),ce(e);break;case"option":null!=r.value&&e.setAttribute("value",""+G(r.value));break;case"select":e.multiple=!!r.multiple,null!=(i=r.value)?le(e,!!r.multiple,i,!1):null!=r.defaultValue&&le(e,!!r.multiple,r.defaultValue,!0);break;default:"function"==typeof o.onClick&&(e.onclick=zr)}jr(n,r)&&(t.flags|=4)}null!==t.ref&&(t.flags|=128)}return null;case 6:if(e&&null!=t.stateNode)ql(0,t,e.memoizedProps,r);else{if("string"!=typeof r&&null===t.stateNode)throw Error(l(166));n=Oo(No.current),Oo(_o.current),Bo(t)?(r=t.stateNode,n=t.memoizedProps,r[Gr]=t,r.nodeValue!==n&&(t.flags|=4)):((r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[Gr]=t,t.stateNode=r)}return null;case 13:return la(Io),r=t.memoizedState,0!=(64&t.flags)?(t.lanes=n,t):(r=null!==r,n=!1,null===e?void 0!==t.memoizedProps.fallback&&Bo(t):n=null!==e.memoizedState,r&&!n&&0!=(2&t.mode)&&(null===e&&!0!==t.memoizedProps.unstable_avoidThisFallback||0!=(1&Io.current)?0===Ai&&(Ai=3):(0!==Ai&&3!==Ai||(Ai=4),null===Ti||0==(134217727&Mi)&&0==(134217727&zi)||ds(Ti,Oi))),(r||n)&&(t.flags|=4),null);case 4:return Ro(),null===e&&Nr(t.stateNode.containerInfo),null;case 10:return Ja(t),null;case 17:return pa(t.type)&&ha(),null;case 19:if(la(Io),null===(r=t.memoizedState))return null;if(i=0!=(64&t.flags),null===(u=r.rendering))if(i)ei(r,!1);else{if(0!==Ai||null!==e&&0!=(64&e.flags))for(e=t.child;null!==e;){if(null!==(u=Mo(e))){for(t.flags|=64,ei(r,!1),null!==(i=u.updateQueue)&&(t.updateQueue=i,t.flags|=4),null===r.lastEffect&&(t.firstEffect=null),t.lastEffect=r.lastEffect,r=n,n=t.child;null!==n;)e=r,(i=n).flags&=2,i.nextEffect=null,i.firstEffect=null,i.lastEffect=null,null===(u=i.alternate)?(i.childLanes=0,i.lanes=e,i.child=null,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=u.childLanes,i.lanes=u.lanes,i.child=u.child,i.memoizedProps=u.memoizedProps,i.memoizedState=u.memoizedState,i.updateQueue=u.updateQueue,i.type=u.type,e=u.dependencies,i.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ia(Io,1&Io.current|2),t.child}e=e.sibling}null!==r.tail&&ja()>Fi&&(t.flags|=64,i=!0,ei(r,!1),t.lanes=33554432)}else{if(!i)if(null!==(e=Mo(u))){if(t.flags|=64,i=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),ei(r,!0),null===r.tail&&"hidden"===r.tailMode&&!u.alternate&&!$o)return null!==(t=t.lastEffect=r.lastEffect)&&(t.nextEffect=null),null}else 2*ja()-r.renderingStartTime>Fi&&1073741824!==n&&(t.flags|=64,i=!0,ei(r,!1),t.lanes=33554432);r.isBackwards?(u.sibling=t.child,t.child=u):(null!==(n=r.last)?n.sibling=u:t.child=u,r.last=u)}return null!==r.tail?(n=r.tail,r.rendering=n,r.tail=n.sibling,r.lastEffect=t.lastEffect,r.renderingStartTime=ja(),n.sibling=null,t=Io.current,ia(Io,i?1&t|2:1&t),n):null;case 23:case 24:return vs(),null!==e&&null!==e.memoizedState!=(null!==t.memoizedState)&&"unstable-defer-without-hiding"!==r.mode&&(t.flags|=4),null}throw Error(l(156,t.tag))}function ni(e){switch(e.tag){case 1:pa(e.type)&&ha();var t=e.flags;return 4096&t?(e.flags=-4097&t|64,e):null;case 3:if(Ro(),la(ca),la(ua),qo(),0!=(64&(t=e.flags)))throw Error(l(285));return e.flags=-4097&t|64,e;case 5:return Lo(e),null;case 13:return la(Io),4096&(t=e.flags)?(e.flags=-4097&t|64,e):null;case 19:return la(Io),null;case 4:return Ro(),null;case 10:return Ja(e),null;case 23:case 24:return vs(),null;default:return null}}function ri(e,t){try{var n="",r=t;do{n+=q(r),r=r.return}while(r);var a=n}catch(e){a="\nError generating stack: "+e.message+"\n"+e.stack}return{value:e,source:t,stack:a}}function ai(e,t){try{console.error(t.value)}catch(e){setTimeout((function(){throw e}))}}Hl=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Vl=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Oo(_o.current);var l,i=null;switch(n){case"input":o=J(e,o),r=J(e,r),i=[];break;case"option":o=oe(e,o),r=oe(e,r),i=[];break;case"select":o=a({},o,{value:void 0}),r=a({},r,{value:void 0}),i=[];break;case"textarea":o=ie(e,o),r=ie(e,r),i=[];break;default:"function"!=typeof o.onClick&&"function"==typeof r.onClick&&(e.onclick=zr)}for(f in ke(n,r),n=null,o)if(!r.hasOwnProperty(f)&&o.hasOwnProperty(f)&&null!=o[f])if("style"===f){var u=o[f];for(l in u)u.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else"dangerouslySetInnerHTML"!==f&&"children"!==f&&"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(s.hasOwnProperty(f)?i||(i=[]):(i=i||[]).push(f,null));for(f in r){var c=r[f];if(u=null!=o?o[f]:void 0,r.hasOwnProperty(f)&&c!==u&&(null!=c||null!=u))if("style"===f)if(u){for(l in u)!u.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in c)c.hasOwnProperty(l)&&u[l]!==c[l]&&(n||(n={}),n[l]=c[l])}else n||(i||(i=[]),i.push(f,n)),n=c;else"dangerouslySetInnerHTML"===f?(c=c?c.__html:void 0,u=u?u.__html:void 0,null!=c&&u!==c&&(i=i||[]).push(f,c)):"children"===f?"string"!=typeof c&&"number"!=typeof c||(i=i||[]).push(f,""+c):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&(s.hasOwnProperty(f)?(null!=c&&"onScroll"===f&&_r("scroll",e),i||u===c||(i=[])):"object"==typeof c&&null!==c&&c.$$typeof===M?c.toString():(i=i||[]).push(f,c))}n&&(i=i||[]).push("style",n);var f=i;(t.updateQueue=f)&&(t.flags|=4)}},ql=function(e,t,n,r){n!==r&&(t.flags|=4)};var oi="function"==typeof WeakMap?WeakMap:Map;function li(e,t,n){(n=lo(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Hi||(Hi=!0,Vi=r),ai(0,t)},n}function ii(e,t,n){(n=lo(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"==typeof r){var a=t.value;n.payload=function(){return ai(0,t),r(a)}}var o=e.stateNode;return null!==o&&"function"==typeof o.componentDidCatch&&(n.callback=function(){"function"!=typeof r&&(null===qi?qi=new Set([this]):qi.add(this),ai(0,t));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}var si="function"==typeof WeakSet?WeakSet:Set;function ui(e){var t=e.ref;if(null!==t)if("function"==typeof t)try{t(null)}catch(t){Is(e,t)}else t.current=null}function ci(e,t){switch(t.tag){case 0:case 11:case 15:case 22:return;case 1:if(256&t.flags&&null!==e){var n=e.memoizedProps,r=e.memoizedState;t=(e=t.stateNode).getSnapshotBeforeUpdate(t.elementType===t.type?n:Ya(t.type,n),r),e.__reactInternalSnapshotBeforeUpdate=t}return;case 3:return void(256&t.flags&&Br(t.stateNode.containerInfo));case 5:case 6:case 4:case 17:return}throw Error(l(163))}function fi(e,t,n){switch(n.tag){case 0:case 11:case 15:case 22:if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{if(3==(3&e.tag)){var r=e.create;e.destroy=r()}e=e.next}while(e!==t)}if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{var a=e;r=a.next,0!=(4&(a=a.tag))&&0!=(1&a)&&(Rs(n,e),Ps(n,e)),e=r}while(e!==t)}return;case 1:return e=n.stateNode,4&n.flags&&(null===t?e.componentDidMount():(r=n.elementType===n.type?t.memoizedProps:Ya(n.type,t.memoizedProps),e.componentDidUpdate(r,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate))),void(null!==(t=n.updateQueue)&&co(n,t,e));case 3:if(null!==(t=n.updateQueue)){if(e=null,null!==n.child)switch(n.child.tag){case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}co(n,t,e)}return;case 5:return e=n.stateNode,void(null===t&&4&n.flags&&jr(n.type,n.memoizedProps)&&e.focus());case 6:case 4:case 12:return;case 13:return void(null===n.memoizedState&&(n=n.alternate,null!==n&&(n=n.memoizedState,null!==n&&(n=n.dehydrated,null!==n&&Et(n)))));case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(l(163))}function di(e,t){for(var n=e;;){if(5===n.tag){var r=n.stateNode;if(t)"function"==typeof(r=r.style).setProperty?r.setProperty("display","none","important"):r.display="none";else{r=n.stateNode;var a=n.memoizedProps.style;a=null!=a&&a.hasOwnProperty("display")?a.display:null,r.style.display=we("display",a)}}else if(6===n.tag)n.stateNode.nodeValue=t?"":n.memoizedProps;else if((23!==n.tag&&24!==n.tag||null===n.memoizedState||n===e)&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===e)break;for(;null===n.sibling;){if(null===n.return||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}}function pi(e,t){if(wa&&"function"==typeof wa.onCommitFiberUnmount)try{wa.onCommitFiberUnmount(ba,t)}catch(e){}switch(t.tag){case 0:case 11:case 14:case 15:case 22:if(null!==(e=t.updateQueue)&&null!==(e=e.lastEffect)){var n=e=e.next;do{var r=n,a=r.destroy;if(r=r.tag,void 0!==a)if(0!=(4&r))Rs(t,n);else{r=t;try{a()}catch(e){Is(r,e)}}n=n.next}while(n!==e)}break;case 1:if(ui(t),"function"==typeof(e=t.stateNode).componentWillUnmount)try{e.props=t.memoizedProps,e.state=t.memoizedState,e.componentWillUnmount()}catch(e){Is(t,e)}break;case 5:ui(t);break;case 4:bi(e,t)}}function hi(e){e.alternate=null,e.child=null,e.dependencies=null,e.firstEffect=null,e.lastEffect=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.return=null,e.updateQueue=null}function mi(e){return 5===e.tag||3===e.tag||4===e.tag}function gi(e){e:{for(var t=e.return;null!==t;){if(mi(t))break e;t=t.return}throw Error(l(160))}var n=t;switch(t=n.stateNode,n.tag){case 5:var r=!1;break;case 3:case 4:t=t.containerInfo,r=!0;break;default:throw Error(l(161))}16&n.flags&&(ve(t,""),n.flags&=-17);e:t:for(n=e;;){for(;null===n.sibling;){if(null===n.return||mi(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&18!==n.tag;){if(2&n.flags)continue t;if(null===n.child||4===n.tag)continue t;n.child.return=n,n=n.child}if(!(2&n.flags)){n=n.stateNode;break e}}r?vi(e,n,t):yi(e,n,t)}function vi(e,t,n){var r=e.tag,a=5===r||6===r;if(a)e=a?e.stateNode:e.stateNode.instance,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!=(n=n._reactRootContainer)||null!==t.onclick||(t.onclick=zr));else if(4!==r&&null!==(e=e.child))for(vi(e,t,n),e=e.sibling;null!==e;)vi(e,t,n),e=e.sibling}function yi(e,t,n){var r=e.tag,a=5===r||6===r;if(a)e=a?e.stateNode:e.stateNode.instance,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(yi(e,t,n),e=e.sibling;null!==e;)yi(e,t,n),e=e.sibling}function bi(e,t){for(var n,r,a=t,o=!1;;){if(!o){o=a.return;e:for(;;){if(null===o)throw Error(l(160));switch(n=o.stateNode,o.tag){case 5:r=!1;break e;case 3:case 4:n=n.containerInfo,r=!0;break e}o=o.return}o=!0}if(5===a.tag||6===a.tag){e:for(var i=e,s=a,u=s;;)if(pi(i,u),null!==u.child&&4!==u.tag)u.child.return=u,u=u.child;else{if(u===s)break e;for(;null===u.sibling;){if(null===u.return||u.return===s)break e;u=u.return}u.sibling.return=u.return,u=u.sibling}r?(i=n,s=a.stateNode,8===i.nodeType?i.parentNode.removeChild(s):i.removeChild(s)):n.removeChild(a.stateNode)}else if(4===a.tag){if(null!==a.child){n=a.stateNode.containerInfo,r=!0,a.child.return=a,a=a.child;continue}}else if(pi(e,a),null!==a.child){a.child.return=a,a=a.child;continue}if(a===t)break;for(;null===a.sibling;){if(null===a.return||a.return===t)return;4===(a=a.return).tag&&(o=!1)}a.sibling.return=a.return,a=a.sibling}}function wi(e,t){switch(t.tag){case 0:case 11:case 14:case 15:case 22:var n=t.updateQueue;if(null!==(n=null!==n?n.lastEffect:null)){var r=n=n.next;do{3==(3&r.tag)&&(e=r.destroy,r.destroy=void 0,void 0!==e&&e()),r=r.next}while(r!==n)}return;case 1:return;case 5:if(null!=(n=t.stateNode)){r=t.memoizedProps;var a=null!==e?e.memoizedProps:r;e=t.type;var o=t.updateQueue;if(t.updateQueue=null,null!==o){for(n[Qr]=r,"input"===e&&"radio"===r.type&&null!=r.name&&te(n,r),Se(e,a),t=Se(e,r),a=0;a<o.length;a+=2){var i=o[a],s=o[a+1];"style"===i?Ee(n,s):"dangerouslySetInnerHTML"===i?ge(n,s):"children"===i?ve(n,s):w(n,i,s,t)}switch(e){case"input":ne(n,r);break;case"textarea":ue(n,r);break;case"select":e=n._wrapperState.wasMultiple,n._wrapperState.wasMultiple=!!r.multiple,null!=(o=r.value)?le(n,!!r.multiple,o,!1):e!==!!r.multiple&&(null!=r.defaultValue?le(n,!!r.multiple,r.defaultValue,!0):le(n,!!r.multiple,r.multiple?[]:"",!1))}}}return;case 6:if(null===t.stateNode)throw Error(l(162));return void(t.stateNode.nodeValue=t.memoizedProps);case 3:return void((n=t.stateNode).hydrate&&(n.hydrate=!1,Et(n.containerInfo)));case 12:return;case 13:return null!==t.memoizedState&&(ji=ja(),di(t.child,!0)),void Ei(t);case 19:return void Ei(t);case 17:return;case 23:case 24:return void di(t,null!==t.memoizedState)}throw Error(l(163))}function Ei(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new si),t.forEach((function(t){var r=zs.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function xi(e,t){return null!==e&&(null===(e=e.memoizedState)||null!==e.dehydrated)&&null!==(t=t.memoizedState)&&null===t.dehydrated}var ki=Math.ceil,Si=E.ReactCurrentDispatcher,Ci=E.ReactCurrentOwner,_i=0,Ti=null,Ni=null,Oi=0,Pi=0,Ri=oa(0),Ai=0,Li=null,Ii=0,Mi=0,zi=0,Di=0,$i=null,ji=0,Fi=1/0;function Ui(){Fi=ja()+500}var Wi,Bi=null,Hi=!1,Vi=null,qi=null,Yi=!1,Gi=null,Qi=90,Ki=[],Xi=[],Zi=null,Ji=0,es=null,ts=-1,ns=0,rs=0,as=null,os=!1;function ls(){return 0!=(48&_i)?ja():-1!==ts?ts:ts=ja()}function is(e){if(0==(2&(e=e.mode)))return 1;if(0==(4&e))return 99===Fa()?1:2;if(0===ns&&(ns=Ii),0!==qa.transition){0!==rs&&(rs=null!==$i?$i.pendingLanes:0),e=ns;var t=4186112&~rs;return 0==(t&=-t)&&0==(t=(e=4186112&~e)&-e)&&(t=8192),t}return e=Fa(),e=jt(0!=(4&_i)&&98===e?12:e=function(e){switch(e){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}(e),ns)}function ss(e,t,n){if(50<Ji)throw Ji=0,es=null,Error(l(185));if(null===(e=us(e,t)))return null;Wt(e,t,n),e===Ti&&(zi|=t,4===Ai&&ds(e,Oi));var r=Fa();1===t?0!=(8&_i)&&0==(48&_i)?ps(e):(cs(e,n),0===_i&&(Ui(),Ha())):(0==(4&_i)||98!==r&&99!==r||(null===Zi?Zi=new Set([e]):Zi.add(e)),cs(e,n)),$i=e}function us(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}function cs(e,t){for(var n=e.callbackNode,r=e.suspendedLanes,a=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var s=31-Bt(i),u=1<<s,c=o[s];if(-1===c){if(0==(u&r)||0!=(u&a)){c=t,zt(u);var f=Mt;o[s]=10<=f?c+250:6<=f?c+5e3:-1}}else c<=t&&(e.expiredLanes|=u);i&=~u}if(r=Dt(e,e===Ti?Oi:0),t=Mt,0===r)null!==n&&(n!==La&&ka(n),e.callbackNode=null,e.callbackPriority=0);else{if(null!==n){if(e.callbackPriority===t)return;n!==La&&ka(n)}15===t?(n=ps.bind(null,e),null===Ma?(Ma=[n],za=xa(Na,Va)):Ma.push(n),n=La):n=14===t?Ba(99,ps.bind(null,e)):Ba(n=function(e){switch(e){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(l(358,e))}}(t),fs.bind(null,e)),e.callbackPriority=t,e.callbackNode=n}}function fs(e){if(ts=-1,rs=ns=0,0!=(48&_i))throw Error(l(327));var t=e.callbackNode;if(Os()&&e.callbackNode!==t)return null;var n=Dt(e,e===Ti?Oi:0);if(0===n)return null;var r=n,a=_i;_i|=16;var o=ws();for(Ti===e&&Oi===r||(Ui(),ys(e,r));;)try{ks();break}catch(t){bs(e,t)}if(Za(),Si.current=o,_i=a,null!==Ni?r=0:(Ti=null,Oi=0,r=Ai),0!=(Ii&zi))ys(e,0);else if(0!==r){if(2===r&&(_i|=64,e.hydrate&&(e.hydrate=!1,Br(e.containerInfo)),0!==(n=$t(e))&&(r=Es(e,n))),1===r)throw t=Li,ys(e,0),ds(e,n),cs(e,ja()),t;switch(e.finishedWork=e.current.alternate,e.finishedLanes=n,r){case 0:case 1:throw Error(l(345));case 2:_s(e);break;case 3:if(ds(e,n),(62914560&n)===n&&10<(r=ji+500-ja())){if(0!==Dt(e,0))break;if(((a=e.suspendedLanes)&n)!==n){ls(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Ur(_s.bind(null,e),r);break}_s(e);break;case 4:if(ds(e,n),(4186112&n)===n)break;for(r=e.eventTimes,a=-1;0<n;){var i=31-Bt(n);o=1<<i,(i=r[i])>a&&(a=i),n&=~o}if(n=a,10<(n=(120>(n=ja()-n)?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*ki(n/1960))-n)){e.timeoutHandle=Ur(_s.bind(null,e),n);break}_s(e);break;case 5:_s(e);break;default:throw Error(l(329))}}return cs(e,ja()),e.callbackNode===t?fs.bind(null,e):null}function ds(e,t){for(t&=~Di,t&=~zi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Bt(t),r=1<<n;e[n]=-1,t&=~r}}function ps(e){if(0!=(48&_i))throw Error(l(327));if(Os(),e===Ti&&0!=(e.expiredLanes&Oi)){var t=Oi,n=Es(e,t);0!=(Ii&zi)&&(n=Es(e,t=Dt(e,t)))}else n=Es(e,t=Dt(e,0));if(0!==e.tag&&2===n&&(_i|=64,e.hydrate&&(e.hydrate=!1,Br(e.containerInfo)),0!==(t=$t(e))&&(n=Es(e,t))),1===n)throw n=Li,ys(e,0),ds(e,t),cs(e,ja()),n;return e.finishedWork=e.current.alternate,e.finishedLanes=t,_s(e),cs(e,ja()),null}function hs(e,t){var n=_i;_i|=1;try{return e(t)}finally{0===(_i=n)&&(Ui(),Ha())}}function ms(e,t){var n=_i;_i&=-2,_i|=8;try{return e(t)}finally{0===(_i=n)&&(Ui(),Ha())}}function gs(e,t){ia(Ri,Pi),Pi|=t,Ii|=t}function vs(){Pi=Ri.current,la(Ri)}function ys(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,Wr(n)),null!==Ni)for(n=Ni.return;null!==n;){var r=n;switch(r.tag){case 1:null!=(r=r.type.childContextTypes)&&ha();break;case 3:Ro(),la(ca),la(ua),qo();break;case 5:Lo(r);break;case 4:Ro();break;case 13:case 19:la(Io);break;case 10:Ja(r);break;case 23:case 24:vs()}n=n.return}Ti=e,Ni=Fs(e.current,null),Oi=Pi=Ii=t,Ai=0,Li=null,Di=zi=Mi=0}function bs(e,t){for(;;){var n=Ni;try{if(Za(),Yo.current=Nl,Jo){for(var r=Ko.memoizedState;null!==r;){var a=r.queue;null!==a&&(a.pending=null),r=r.next}Jo=!1}if(Qo=0,Zo=Xo=Ko=null,el=!1,Ci.current=null,null===n||null===n.return){Ai=1,Li=t,Ni=null;break}e:{var o=e,l=n.return,i=n,s=t;if(t=Oi,i.flags|=2048,i.firstEffect=i.lastEffect=null,null!==s&&"object"==typeof s&&"function"==typeof s.then){var u=s;if(0==(2&i.mode)){var c=i.alternate;c?(i.updateQueue=c.updateQueue,i.memoizedState=c.memoizedState,i.lanes=c.lanes):(i.updateQueue=null,i.memoizedState=null)}var f=0!=(1&Io.current),d=l;do{var p;if(p=13===d.tag){var h=d.memoizedState;if(null!==h)p=null!==h.dehydrated;else{var m=d.memoizedProps;p=void 0!==m.fallback&&(!0!==m.unstable_avoidThisFallback||!f)}}if(p){var g=d.updateQueue;if(null===g){var v=new Set;v.add(u),d.updateQueue=v}else g.add(u);if(0==(2&d.mode)){if(d.flags|=64,i.flags|=16384,i.flags&=-2981,1===i.tag)if(null===i.alternate)i.tag=17;else{var y=lo(-1,1);y.tag=2,io(i,y)}i.lanes|=1;break e}s=void 0,i=t;var b=o.pingCache;if(null===b?(b=o.pingCache=new oi,s=new Set,b.set(u,s)):void 0===(s=b.get(u))&&(s=new Set,b.set(u,s)),!s.has(i)){s.add(i);var w=Ms.bind(null,o,u,i);u.then(w,w)}d.flags|=4096,d.lanes=t;break e}d=d.return}while(null!==d);s=Error((Y(i.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==Ai&&(Ai=2),s=ri(s,i),d=l;do{switch(d.tag){case 3:o=s,d.flags|=4096,t&=-t,d.lanes|=t,so(d,li(0,o,t));break e;case 1:o=s;var E=d.type,x=d.stateNode;if(0==(64&d.flags)&&("function"==typeof E.getDerivedStateFromError||null!==x&&"function"==typeof x.componentDidCatch&&(null===qi||!qi.has(x)))){d.flags|=4096,t&=-t,d.lanes|=t,so(d,ii(d,o,t));break e}}d=d.return}while(null!==d)}Cs(n)}catch(e){t=e,Ni===n&&null!==n&&(Ni=n=n.return);continue}break}}function ws(){var e=Si.current;return Si.current=Nl,null===e?Nl:e}function Es(e,t){var n=_i;_i|=16;var r=ws();for(Ti===e&&Oi===t||ys(e,t);;)try{xs();break}catch(t){bs(e,t)}if(Za(),_i=n,Si.current=r,null!==Ni)throw Error(l(261));return Ti=null,Oi=0,Ai}function xs(){for(;null!==Ni;)Ss(Ni)}function ks(){for(;null!==Ni&&!Sa();)Ss(Ni)}function Ss(e){var t=Wi(e.alternate,e,Pi);e.memoizedProps=e.pendingProps,null===t?Cs(e):Ni=t,Ci.current=null}function Cs(e){var t=e;do{var n=t.alternate;if(e=t.return,0==(2048&t.flags)){if(null!==(n=ti(n,t,Pi)))return void(Ni=n);if(24!==(n=t).tag&&23!==n.tag||null===n.memoizedState||0!=(1073741824&Pi)||0==(4&n.mode)){for(var r=0,a=n.child;null!==a;)r|=a.lanes|a.childLanes,a=a.sibling;n.childLanes=r}null!==e&&0==(2048&e.flags)&&(null===e.firstEffect&&(e.firstEffect=t.firstEffect),null!==t.lastEffect&&(null!==e.lastEffect&&(e.lastEffect.nextEffect=t.firstEffect),e.lastEffect=t.lastEffect),1<t.flags&&(null!==e.lastEffect?e.lastEffect.nextEffect=t:e.firstEffect=t,e.lastEffect=t))}else{if(null!==(n=ni(t)))return n.flags&=2047,void(Ni=n);null!==e&&(e.firstEffect=e.lastEffect=null,e.flags|=2048)}if(null!==(t=t.sibling))return void(Ni=t);Ni=t=e}while(null!==t);0===Ai&&(Ai=5)}function _s(e){var t=Fa();return Wa(99,Ts.bind(null,e,t)),null}function Ts(e,t){do{Os()}while(null!==Gi);if(0!=(48&_i))throw Error(l(327));var n=e.finishedWork;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(l(177));e.callbackNode=null;var r=n.lanes|n.childLanes,a=r,o=e.pendingLanes&~a;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=a,e.mutableReadLanes&=a,e.entangledLanes&=a,a=e.entanglements;for(var i=e.eventTimes,s=e.expirationTimes;0<o;){var u=31-Bt(o),c=1<<u;a[u]=0,i[u]=-1,s[u]=-1,o&=~c}if(null!==Zi&&0==(24&r)&&Zi.has(e)&&Zi.delete(e),e===Ti&&(Ni=Ti=null,Oi=0),1<n.flags?null!==n.lastEffect?(n.lastEffect.nextEffect=n,r=n.firstEffect):r=n:r=n.firstEffect,null!==r){if(a=_i,_i|=32,Ci.current=null,Dr=Gt,pr(i=dr())){if("selectionStart"in i)s={start:i.selectionStart,end:i.selectionEnd};else e:if(s=(s=i.ownerDocument)&&s.defaultView||window,(c=s.getSelection&&s.getSelection())&&0!==c.rangeCount){s=c.anchorNode,o=c.anchorOffset,u=c.focusNode,c=c.focusOffset;try{s.nodeType,u.nodeType}catch(e){s=null;break e}var f=0,d=-1,p=-1,h=0,m=0,g=i,v=null;t:for(;;){for(var y;g!==s||0!==o&&3!==g.nodeType||(d=f+o),g!==u||0!==c&&3!==g.nodeType||(p=f+c),3===g.nodeType&&(f+=g.nodeValue.length),null!==(y=g.firstChild);)v=g,g=y;for(;;){if(g===i)break t;if(v===s&&++h===o&&(d=f),v===u&&++m===c&&(p=f),null!==(y=g.nextSibling))break;v=(g=v).parentNode}g=y}s=-1===d||-1===p?null:{start:d,end:p}}else s=null;s=s||{start:0,end:0}}else s=null;$r={focusedElem:i,selectionRange:s},Gt=!1,as=null,os=!1,Bi=r;do{try{Ns()}catch(e){if(null===Bi)throw Error(l(330));Is(Bi,e),Bi=Bi.nextEffect}}while(null!==Bi);as=null,Bi=r;do{try{for(i=e;null!==Bi;){var b=Bi.flags;if(16&b&&ve(Bi.stateNode,""),128&b){var w=Bi.alternate;if(null!==w){var E=w.ref;null!==E&&("function"==typeof E?E(null):E.current=null)}}switch(1038&b){case 2:gi(Bi),Bi.flags&=-3;break;case 6:gi(Bi),Bi.flags&=-3,wi(Bi.alternate,Bi);break;case 1024:Bi.flags&=-1025;break;case 1028:Bi.flags&=-1025,wi(Bi.alternate,Bi);break;case 4:wi(Bi.alternate,Bi);break;case 8:bi(i,s=Bi);var x=s.alternate;hi(s),null!==x&&hi(x)}Bi=Bi.nextEffect}}catch(e){if(null===Bi)throw Error(l(330));Is(Bi,e),Bi=Bi.nextEffect}}while(null!==Bi);if(E=$r,w=dr(),b=E.focusedElem,i=E.selectionRange,w!==b&&b&&b.ownerDocument&&fr(b.ownerDocument.documentElement,b)){null!==i&&pr(b)&&(w=i.start,void 0===(E=i.end)&&(E=w),"selectionStart"in b?(b.selectionStart=w,b.selectionEnd=Math.min(E,b.value.length)):(E=(w=b.ownerDocument||document)&&w.defaultView||window).getSelection&&(E=E.getSelection(),s=b.textContent.length,x=Math.min(i.start,s),i=void 0===i.end?x:Math.min(i.end,s),!E.extend&&x>i&&(s=i,i=x,x=s),s=cr(b,x),o=cr(b,i),s&&o&&(1!==E.rangeCount||E.anchorNode!==s.node||E.anchorOffset!==s.offset||E.focusNode!==o.node||E.focusOffset!==o.offset)&&((w=w.createRange()).setStart(s.node,s.offset),E.removeAllRanges(),x>i?(E.addRange(w),E.extend(o.node,o.offset)):(w.setEnd(o.node,o.offset),E.addRange(w))))),w=[];for(E=b;E=E.parentNode;)1===E.nodeType&&w.push({element:E,left:E.scrollLeft,top:E.scrollTop});for("function"==typeof b.focus&&b.focus(),b=0;b<w.length;b++)(E=w[b]).element.scrollLeft=E.left,E.element.scrollTop=E.top}Gt=!!Dr,$r=Dr=null,e.current=n,Bi=r;do{try{for(b=e;null!==Bi;){var k=Bi.flags;if(36&k&&fi(b,Bi.alternate,Bi),128&k){w=void 0;var S=Bi.ref;if(null!==S){var C=Bi.stateNode;switch(Bi.tag){case 5:w=C;break;default:w=C}"function"==typeof S?S(w):S.current=w}}Bi=Bi.nextEffect}}catch(e){if(null===Bi)throw Error(l(330));Is(Bi,e),Bi=Bi.nextEffect}}while(null!==Bi);Bi=null,Ia(),_i=a}else e.current=n;if(Yi)Yi=!1,Gi=e,Qi=t;else for(Bi=r;null!==Bi;)t=Bi.nextEffect,Bi.nextEffect=null,8&Bi.flags&&((k=Bi).sibling=null,k.stateNode=null),Bi=t;if(0===(r=e.pendingLanes)&&(qi=null),1===r?e===es?Ji++:(Ji=0,es=e):Ji=0,n=n.stateNode,wa&&"function"==typeof wa.onCommitFiberRoot)try{wa.onCommitFiberRoot(ba,n,void 0,64==(64&n.current.flags))}catch(e){}if(cs(e,ja()),Hi)throw Hi=!1,e=Vi,Vi=null,e;return 0!=(8&_i)||Ha(),null}function Ns(){for(;null!==Bi;){var e=Bi.alternate;os||null===as||(0!=(8&Bi.flags)?Je(Bi,as)&&(os=!0):13===Bi.tag&&xi(e,Bi)&&Je(Bi,as)&&(os=!0));var t=Bi.flags;0!=(256&t)&&ci(e,Bi),0==(512&t)||Yi||(Yi=!0,Ba(97,(function(){return Os(),null}))),Bi=Bi.nextEffect}}function Os(){if(90!==Qi){var e=97<Qi?97:Qi;return Qi=90,Wa(e,As)}return!1}function Ps(e,t){Ki.push(t,e),Yi||(Yi=!0,Ba(97,(function(){return Os(),null})))}function Rs(e,t){Xi.push(t,e),Yi||(Yi=!0,Ba(97,(function(){return Os(),null})))}function As(){if(null===Gi)return!1;var e=Gi;if(Gi=null,0!=(48&_i))throw Error(l(331));var t=_i;_i|=32;var n=Xi;Xi=[];for(var r=0;r<n.length;r+=2){var a=n[r],o=n[r+1],i=a.destroy;if(a.destroy=void 0,"function"==typeof i)try{i()}catch(e){if(null===o)throw Error(l(330));Is(o,e)}}for(n=Ki,Ki=[],r=0;r<n.length;r+=2){a=n[r],o=n[r+1];try{var s=a.create;a.destroy=s()}catch(e){if(null===o)throw Error(l(330));Is(o,e)}}for(s=e.current.firstEffect;null!==s;)e=s.nextEffect,s.nextEffect=null,8&s.flags&&(s.sibling=null,s.stateNode=null),s=e;return _i=t,Ha(),!0}function Ls(e,t,n){io(e,t=li(0,t=ri(n,t),1)),t=ls(),null!==(e=us(e,1))&&(Wt(e,1,t),cs(e,t))}function Is(e,t){if(3===e.tag)Ls(e,e,t);else for(var n=e.return;null!==n;){if(3===n.tag){Ls(n,e,t);break}if(1===n.tag){var r=n.stateNode;if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===qi||!qi.has(r))){var a=ii(n,e=ri(t,e),1);if(io(n,a),a=ls(),null!==(n=us(n,1)))Wt(n,1,a),cs(n,a);else if("function"==typeof r.componentDidCatch&&(null===qi||!qi.has(r)))try{r.componentDidCatch(t,e)}catch(e){}break}}n=n.return}}function Ms(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=ls(),e.pingedLanes|=e.suspendedLanes&n,Ti===e&&(Oi&n)===n&&(4===Ai||3===Ai&&(62914560&Oi)===Oi&&500>ja()-ji?ys(e,0):Di|=n),cs(e,t)}function zs(e,t){var n=e.stateNode;null!==n&&n.delete(t),0==(t=0)&&(0==(2&(t=e.mode))?t=1:0==(4&t)?t=99===Fa()?1:2:(0===ns&&(ns=Ii),0===(t=Ft(62914560&~ns))&&(t=4194304))),n=ls(),null!==(e=us(e,t))&&(Wt(e,t,n),cs(e,n))}function Ds(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.flags=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childLanes=this.lanes=0,this.alternate=null}function $s(e,t,n,r){return new Ds(e,t,n,r)}function js(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Fs(e,t){var n=e.alternate;return null===n?((n=$s(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.nextEffect=null,n.firstEffect=null,n.lastEffect=null),n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Us(e,t,n,r,a,o){var i=2;if(r=e,"function"==typeof e)js(e)&&(i=1);else if("string"==typeof e)i=5;else e:switch(e){case S:return Ws(n.children,a,o,t);case z:i=8,a|=16;break;case C:i=8,a|=1;break;case _:return(e=$s(12,n,t,8|a)).elementType=_,e.type=_,e.lanes=o,e;case P:return(e=$s(13,n,t,a)).type=P,e.elementType=P,e.lanes=o,e;case R:return(e=$s(19,n,t,a)).elementType=R,e.lanes=o,e;case D:return Bs(n,a,o,t);case $:return(e=$s(24,n,t,a)).elementType=$,e.lanes=o,e;default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case T:i=10;break e;case N:i=9;break e;case O:i=11;break e;case A:i=14;break e;case L:i=16,r=null;break e;case I:i=22;break e}throw Error(l(130,null==e?e:typeof e,""))}return(t=$s(i,n,t,a)).elementType=e,t.type=r,t.lanes=o,t}function Ws(e,t,n,r){return(e=$s(7,e,r,t)).lanes=n,e}function Bs(e,t,n,r){return(e=$s(23,e,r,t)).elementType=D,e.lanes=n,e}function Hs(e,t,n){return(e=$s(6,e,null,t)).lanes=n,e}function Vs(e,t,n){return(t=$s(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function qs(e,t,n){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.pendingContext=this.context=null,this.hydrate=n,this.callbackNode=null,this.callbackPriority=0,this.eventTimes=Ut(0),this.expirationTimes=Ut(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ut(0),this.mutableSourceEagerHydrationData=null}function Ys(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:k,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}function Gs(e,t,n,r){var a=t.current,o=ls(),i=is(a);e:if(n){t:{if(Qe(n=n._reactInternals)!==n||1!==n.tag)throw Error(l(170));var s=n;do{switch(s.tag){case 3:s=s.stateNode.context;break t;case 1:if(pa(s.type)){s=s.stateNode.__reactInternalMemoizedMergedChildContext;break t}}s=s.return}while(null!==s);throw Error(l(171))}if(1===n.tag){var u=n.type;if(pa(u)){n=ga(n,u,s);break e}}n=s}else n=sa;return null===t.context?t.context=n:t.pendingContext=n,(t=lo(o,i)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),io(a,t),ss(a,i,o),i}function Qs(e){if(!(e=e.current).child)return null;switch(e.child.tag){case 5:default:return e.child.stateNode}}function Ks(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function Xs(e,t){Ks(e,t),(e=e.alternate)&&Ks(e,t)}function Zs(e,t,n){var r=null!=n&&null!=n.hydrationOptions&&n.hydrationOptions.mutableSources||null;if(n=new qs(e,t,null!=n&&!0===n.hydrate),t=$s(3,null,null,2===t?7:1===t?3:0),n.current=t,t.stateNode=n,ao(t),e[Kr]=n.current,Nr(8===e.nodeType?e.parentNode:e),r)for(e=0;e<r.length;e++){var a=(t=r[e])._getVersion;a=a(t._source),null==n.mutableSourceEagerHydrationData?n.mutableSourceEagerHydrationData=[t,a]:n.mutableSourceEagerHydrationData.push(t,a)}this._internalRoot=n}function Js(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function eu(e,t,n,r,a){var o=n._reactRootContainer;if(o){var l=o._internalRoot;if("function"==typeof a){var i=a;a=function(){var e=Qs(l);i.call(e)}}Gs(t,l,e,a)}else{if(o=n._reactRootContainer=function(e,t){if(t||(t=!(!(t=e?9===e.nodeType?e.documentElement:e.firstChild:null)||1!==t.nodeType||!t.hasAttribute("data-reactroot"))),!t)for(var n;n=e.lastChild;)e.removeChild(n);return new Zs(e,0,t?{hydrate:!0}:void 0)}(n,r),l=o._internalRoot,"function"==typeof a){var s=a;a=function(){var e=Qs(l);s.call(e)}}ms((function(){Gs(t,l,e,a)}))}return Qs(l)}function tu(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Js(t))throw Error(l(200));return Ys(e,t,null,n)}Wi=function(e,t,n){var r=t.lanes;if(null!==e)if(e.memoizedProps!==t.pendingProps||ca.current)Ll=!0;else{if(0==(n&r)){switch(Ll=!1,t.tag){case 3:Bl(t),Ho();break;case 5:Ao(t);break;case 1:pa(t.type)&&va(t);break;case 4:Po(t,t.stateNode.containerInfo);break;case 10:r=t.memoizedProps.value;var a=t.type._context;ia(Ga,a._currentValue),a._currentValue=r;break;case 13:if(null!==t.memoizedState)return 0!=(n&t.child.childLanes)?Gl(e,t,n):(ia(Io,1&Io.current),null!==(t=Jl(e,t,n))?t.sibling:null);ia(Io,1&Io.current);break;case 19:if(r=0!=(n&t.childLanes),0!=(64&e.flags)){if(r)return Zl(e,t,n);t.flags|=64}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),ia(Io,Io.current),r)break;return null;case 23:case 24:return t.lanes=0,$l(e,t,n)}return Jl(e,t,n)}Ll=0!=(16384&e.flags)}else Ll=!1;switch(t.lanes=0,t.tag){case 2:if(r=t.type,null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,a=da(t,ua.current),to(t,n),a=rl(null,t,r,e,a,n),t.flags|=1,"object"==typeof a&&null!==a&&"function"==typeof a.render&&void 0===a.$$typeof){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,pa(r)){var o=!0;va(t)}else o=!1;t.memoizedState=null!==a.state&&void 0!==a.state?a.state:null,ao(t);var i=r.getDerivedStateFromProps;"function"==typeof i&&po(t,r,i,e),a.updater=ho,t.stateNode=a,a._reactInternals=t,yo(t,r,e,n),t=Wl(null,t,r,!0,o,n)}else t.tag=0,Il(null,t,a,n),t=t.child;return t;case 16:a=t.elementType;e:{switch(null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,a=(o=a._init)(a._payload),t.type=a,o=t.tag=function(e){if("function"==typeof e)return js(e)?1:0;if(null!=e){if((e=e.$$typeof)===O)return 11;if(e===A)return 14}return 2}(a),e=Ya(a,e),o){case 0:t=Fl(null,t,a,e,n);break e;case 1:t=Ul(null,t,a,e,n);break e;case 11:t=Ml(null,t,a,e,n);break e;case 14:t=zl(null,t,a,Ya(a.type,e),r,n);break e}throw Error(l(306,a,""))}return t;case 0:return r=t.type,a=t.pendingProps,Fl(e,t,r,a=t.elementType===r?a:Ya(r,a),n);case 1:return r=t.type,a=t.pendingProps,Ul(e,t,r,a=t.elementType===r?a:Ya(r,a),n);case 3:if(Bl(t),r=t.updateQueue,null===e||null===r)throw Error(l(282));if(r=t.pendingProps,a=null!==(a=t.memoizedState)?a.element:null,oo(e,t),uo(t,r,null,n),(r=t.memoizedState.element)===a)Ho(),t=Jl(e,t,n);else{if((o=(a=t.stateNode).hydrate)&&(Do=Hr(t.stateNode.containerInfo.firstChild),zo=t,o=$o=!0),o){if(null!=(e=a.mutableSourceEagerHydrationData))for(a=0;a<e.length;a+=2)(o=e[a])._workInProgressVersionPrimary=e[a+1],Vo.push(o);for(n=So(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|1024,n=n.sibling}else Il(e,t,r,n),Ho();t=t.child}return t;case 5:return Ao(t),null===e&&Uo(t),r=t.type,a=t.pendingProps,o=null!==e?e.memoizedProps:null,i=a.children,Fr(r,a)?i=null:null!==o&&Fr(r,o)&&(t.flags|=16),jl(e,t),Il(e,t,i,n),t.child;case 6:return null===e&&Uo(t),null;case 13:return Gl(e,t,n);case 4:return Po(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=ko(t,null,r,n):Il(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,Ml(e,t,r,a=t.elementType===r?a:Ya(r,a),n);case 7:return Il(e,t,t.pendingProps,n),t.child;case 8:case 12:return Il(e,t,t.pendingProps.children,n),t.child;case 10:e:{r=t.type._context,a=t.pendingProps,i=t.memoizedProps,o=a.value;var s=t.type._context;if(ia(Ga,s._currentValue),s._currentValue=o,null!==i)if(s=i.value,0==(o=lr(s,o)?0:0|("function"==typeof r._calculateChangedBits?r._calculateChangedBits(s,o):1073741823))){if(i.children===a.children&&!ca.current){t=Jl(e,t,n);break e}}else for(null!==(s=t.child)&&(s.return=t);null!==s;){var u=s.dependencies;if(null!==u){i=s.child;for(var c=u.firstContext;null!==c;){if(c.context===r&&0!=(c.observedBits&o)){1===s.tag&&((c=lo(-1,n&-n)).tag=2,io(s,c)),s.lanes|=n,null!==(c=s.alternate)&&(c.lanes|=n),eo(s.return,n),u.lanes|=n;break}c=c.next}}else i=10===s.tag&&s.type===t.type?null:s.child;if(null!==i)i.return=s;else for(i=s;null!==i;){if(i===t){i=null;break}if(null!==(s=i.sibling)){s.return=i.return,i=s;break}i=i.return}s=i}Il(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=(o=t.pendingProps).children,to(t,n),r=r(a=no(a,o.unstable_observedBits)),t.flags|=1,Il(e,t,r,n),t.child;case 14:return o=Ya(a=t.type,t.pendingProps),zl(e,t,a,o=Ya(a.type,o),r,n);case 15:return Dl(e,t,t.type,t.pendingProps,r,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Ya(r,a),null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),t.tag=1,pa(r)?(e=!0,va(t)):e=!1,to(t,n),go(t,r,a),yo(t,r,a,n),Wl(null,t,r,!0,e,n);case 19:return Zl(e,t,n);case 23:case 24:return $l(e,t,n)}throw Error(l(156,t.tag))},Zs.prototype.render=function(e){Gs(e,this._internalRoot,null,null)},Zs.prototype.unmount=function(){var e=this._internalRoot,t=e.containerInfo;Gs(null,e,null,(function(){t[Kr]=null}))},et=function(e){13===e.tag&&(ss(e,4,ls()),Xs(e,4))},tt=function(e){13===e.tag&&(ss(e,67108864,ls()),Xs(e,67108864))},nt=function(e){if(13===e.tag){var t=ls(),n=is(e);ss(e,n,t),Xs(e,n)}},rt=function(e,t){return t()},_e=function(e,t,n){switch(t){case"input":if(ne(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=ta(r);if(!a)throw Error(l(90));X(r),ne(r,a)}}}break;case"textarea":ue(e,n);break;case"select":null!=(t=n.value)&&le(e,!!n.multiple,t,!1)}},Ae=hs,Le=function(e,t,n,r,a){var o=_i;_i|=4;try{return Wa(98,e.bind(null,t,n,r,a))}finally{0===(_i=o)&&(Ui(),Ha())}},Ie=function(){0==(49&_i)&&(function(){if(null!==Zi){var e=Zi;Zi=null,e.forEach((function(e){e.expiredLanes|=24&e.pendingLanes,cs(e,ja())}))}Ha()}(),Os())},Me=function(e,t){var n=_i;_i|=2;try{return e(t)}finally{0===(_i=n)&&(Ui(),Ha())}};var nu={Events:[Jr,ea,ta,Pe,Re,Os,{current:!1}]},ru={findFiberByHostInstance:Zr,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"},au={bundleType:ru.bundleType,version:ru.version,rendererPackageName:ru.rendererPackageName,rendererConfig:ru.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:E.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Ze(e))?null:e.stateNode},findFiberByHostInstance:ru.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var ou=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ou.isDisabled&&ou.supportsFiber)try{ba=ou.inject(au),wa=ou}catch(me){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nu,t.createPortal=tu,t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"==typeof e.render)throw Error(l(188));throw Error(l(268,Object.keys(e)))}return null===(e=Ze(t))?null:e.stateNode},t.flushSync=function(e,t){var n=_i;if(0!=(48&n))return e(t);_i|=1;try{if(e)return Wa(99,e.bind(null,t))}finally{_i=n,Ha()}},t.hydrate=function(e,t,n){if(!Js(t))throw Error(l(200));return eu(null,e,t,!0,n)},t.render=function(e,t,n){if(!Js(t))throw Error(l(200));return eu(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!Js(e))throw Error(l(40));return!!e._reactRootContainer&&(ms((function(){eu(null,null,e,!1,(function(){e._reactRootContainer=null,e[Kr]=null}))})),!0)},t.unstable_batchedUpdates=hs,t.unstable_createPortal=function(e,t){return tu(e,t,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)},t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Js(n))throw Error(l(200));if(null==e||void 0===e._reactInternals)throw Error(l(38));return eu(e,t,n,!1,r)},t.version="17.0.2"},995:(e,t,n)=>{"use strict";!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=n(439)},198:(e,t)=>{"use strict";var n="function"==typeof Symbol&&Symbol.for,r=n?Symbol.for("react.element"):60103,a=n?Symbol.for("react.portal"):60106,o=n?Symbol.for("react.fragment"):60107,l=n?Symbol.for("react.strict_mode"):60108,i=n?Symbol.for("react.profiler"):60114,s=n?Symbol.for("react.provider"):60109,u=n?Symbol.for("react.context"):60110,c=n?Symbol.for("react.async_mode"):60111,f=n?Symbol.for("react.concurrent_mode"):60111,d=n?Symbol.for("react.forward_ref"):60112,p=n?Symbol.for("react.suspense"):60113,h=n?Symbol.for("react.suspense_list"):60120,m=n?Symbol.for("react.memo"):60115,g=n?Symbol.for("react.lazy"):60116,v=n?Symbol.for("react.block"):60121,y=n?Symbol.for("react.fundamental"):60117,b=n?Symbol.for("react.responder"):60118,w=n?Symbol.for("react.scope"):60119;function E(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case c:case f:case o:case i:case l:case p:return e;default:switch(e=e&&e.$$typeof){case u:case d:case g:case m:case s:return e;default:return t}}case a:return t}}}function x(e){return E(e)===f}t.AsyncMode=c,t.ConcurrentMode=f,t.ContextConsumer=u,t.ContextProvider=s,t.Element=r,t.ForwardRef=d,t.Fragment=o,t.Lazy=g,t.Memo=m,t.Portal=a,t.Profiler=i,t.StrictMode=l,t.Suspense=p,t.isAsyncMode=function(e){return x(e)||E(e)===c},t.isConcurrentMode=x,t.isContextConsumer=function(e){return E(e)===u},t.isContextProvider=function(e){return E(e)===s},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r},t.isForwardRef=function(e){return E(e)===d},t.isFragment=function(e){return E(e)===o},t.isLazy=function(e){return E(e)===g},t.isMemo=function(e){return E(e)===m},t.isPortal=function(e){return E(e)===a},t.isProfiler=function(e){return E(e)===i},t.isStrictMode=function(e){return E(e)===l},t.isSuspense=function(e){return E(e)===p},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===o||e===f||e===i||e===l||e===p||e===h||"object"==typeof e&&null!==e&&(e.$$typeof===g||e.$$typeof===m||e.$$typeof===s||e.$$typeof===u||e.$$typeof===d||e.$$typeof===y||e.$$typeof===b||e.$$typeof===w||e.$$typeof===v)},t.typeOf=E},237:(e,t,n)=>{"use strict";e.exports=n(198)},841:(e,t)=>{"use strict";var n=60103,r=60106,a=60107,o=60108,l=60114,i=60109,s=60110,u=60112,c=60113,f=60120,d=60115,p=60116,h=60121,m=60122,g=60117,v=60129,y=60131;if("function"==typeof Symbol&&Symbol.for){var b=Symbol.for;n=b("react.element"),r=b("react.portal"),a=b("react.fragment"),o=b("react.strict_mode"),l=b("react.profiler"),i=b("react.provider"),s=b("react.context"),u=b("react.forward_ref"),c=b("react.suspense"),f=b("react.suspense_list"),d=b("react.memo"),p=b("react.lazy"),h=b("react.block"),m=b("react.server.block"),g=b("react.fundamental"),v=b("react.debug_trace_mode"),y=b("react.legacy_hidden")}t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===a||e===l||e===v||e===o||e===c||e===f||e===y||"object"==typeof e&&null!==e&&(e.$$typeof===p||e.$$typeof===d||e.$$typeof===i||e.$$typeof===s||e.$$typeof===u||e.$$typeof===g||e.$$typeof===h||e[0]===m)},t.typeOf=function(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case a:case l:case o:case c:case f:return e;default:switch(e=e&&e.$$typeof){case s:case u:case p:case d:case i:return e;default:return t}}case r:return t}}}},679:(e,t,n)=>{"use strict";e.exports=n(841)},288:(e,t,n)=>{"use strict";var r=n(767),a=60103,o=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var l=60109,i=60110,s=60112;t.Suspense=60113;var u=60115,c=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;a=f("react.element"),o=f("react.portal"),t.Fragment=f("react.fragment"),t.StrictMode=f("react.strict_mode"),t.Profiler=f("react.profiler"),l=f("react.provider"),i=f("react.context"),s=f("react.forward_ref"),t.Suspense=f("react.suspense"),u=f("react.memo"),c=f("react.lazy")}var d="function"==typeof Symbol&&Symbol.iterator;function p(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function g(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||h}function v(){}function y(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||h}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(p(85));this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=g.prototype;var b=y.prototype=new v;b.constructor=y,r(b,g.prototype),b.isPureReactComponent=!0;var w={current:null},E=Object.prototype.hasOwnProperty,x={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,n){var r,o={},l=null,i=null;if(null!=t)for(r in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(l=""+t.key),t)E.call(t,r)&&!x.hasOwnProperty(r)&&(o[r]=t[r]);var s=arguments.length-2;if(1===s)o.children=n;else if(1<s){for(var u=Array(s),c=0;c<s;c++)u[c]=arguments[c+2];o.children=u}if(e&&e.defaultProps)for(r in s=e.defaultProps)void 0===o[r]&&(o[r]=s[r]);return{$$typeof:a,type:e,key:l,ref:i,props:o,_owner:w.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var C=/\/+/g;function _(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function T(e,t,n,r,l){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var s=!1;if(null===e)s=!0;else switch(i){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case a:case o:s=!0}}if(s)return l=l(s=e),e=""===r?"."+_(s,0):r,Array.isArray(l)?(n="",null!=e&&(n=e.replace(C,"$&/")+"/"),T(l,t,n,"",(function(e){return e}))):null!=l&&(S(l)&&(l=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(l,n+(!l.key||s&&s.key===l.key?"":(""+l.key).replace(C,"$&/")+"/")+e)),t.push(l)),1;if(s=0,r=""===r?".":r+":",Array.isArray(e))for(var u=0;u<e.length;u++){var c=r+_(i=e[u],u);s+=T(i,t,n,c,l)}else if("function"==typeof(c=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e)))for(e=c.call(e),u=0;!(i=e.next()).done;)s+=T(i=i.value,t,n,c=r+_(i,u++),l);else if("object"===i)throw t=""+e,Error(p(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return s}function N(e,t,n){if(null==e)return e;var r=[],a=0;return T(e,r,"","",(function(e){return t.call(n,e,a++)})),r}function O(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var P={current:null};function R(){var e=P.current;if(null===e)throw Error(p(321));return e}var A={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:w,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:N,forEach:function(e,t,n){N(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return N(e,(function(){t++})),t},toArray:function(e){return N(e,(function(e){return e}))||[]},only:function(e){if(!S(e))throw Error(p(143));return e}},t.Component=g,t.PureComponent=y,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=A,t.cloneElement=function(e,t,n){if(null==e)throw Error(p(267,e));var o=r({},e.props),l=e.key,i=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,s=w.current),void 0!==t.key&&(l=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(c in t)E.call(t,c)&&!x.hasOwnProperty(c)&&(o[c]=void 0===t[c]&&void 0!==u?u[c]:t[c])}var c=arguments.length-2;if(1===c)o.children=n;else if(1<c){u=Array(c);for(var f=0;f<c;f++)u[f]=arguments[f+2];o.children=u}return{$$typeof:a,type:e.type,key:l,ref:i,props:o,_owner:s}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:i,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:l,_context:e},e.Consumer=e},t.createElement=k,t.createFactory=function(e){var t=k.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:s,render:e}},t.isValidElement=S,t.lazy=function(e){return{$$typeof:c,_payload:{_status:-1,_result:e},_init:O}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return R().useCallback(e,t)},t.useContext=function(e,t){return R().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return R().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return R().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return R().useLayoutEffect(e,t)},t.useMemo=function(e,t){return R().useMemo(e,t)},t.useReducer=function(e,t,n){return R().useReducer(e,t,n)},t.useRef=function(e){return R().useRef(e)},t.useState=function(e){return R().useState(e)},t.version="17.0.2"},496:(e,t,n)=>{"use strict";e.exports=n(288)},787:(e,t)=>{"use strict";var n,r,a,o;if("object"==typeof performance&&"function"==typeof performance.now){var l=performance;t.unstable_now=function(){return l.now()}}else{var i=Date,s=i.now();t.unstable_now=function(){return i.now()-s}}if("undefined"==typeof window||"function"!=typeof MessageChannel){var u=null,c=null,f=function(){if(null!==u)try{var e=t.unstable_now();u(!0,e),u=null}catch(e){throw setTimeout(f,0),e}};n=function(e){null!==u?setTimeout(n,0,e):(u=e,setTimeout(f,0))},r=function(e,t){c=setTimeout(e,t)},a=function(){clearTimeout(c)},t.unstable_shouldYield=function(){return!1},o=t.unstable_forceFrameRate=function(){}}else{var d=window.setTimeout,p=window.clearTimeout;if("undefined"!=typeof console){var h=window.cancelAnimationFrame;"function"!=typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),"function"!=typeof h&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var m=!1,g=null,v=-1,y=5,b=0;t.unstable_shouldYield=function(){return t.unstable_now()>=b},o=function(){},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<e?Math.floor(1e3/e):5};var w=new MessageChannel,E=w.port2;w.port1.onmessage=function(){if(null!==g){var e=t.unstable_now();b=e+y;try{g(!0,e)?E.postMessage(null):(m=!1,g=null)}catch(e){throw E.postMessage(null),e}}else m=!1},n=function(e){g=e,m||(m=!0,E.postMessage(null))},r=function(e,n){v=d((function(){e(t.unstable_now())}),n)},a=function(){p(v),v=-1}}function x(e,t){var n=e.length;e.push(t);e:for(;;){var r=n-1>>>1,a=e[r];if(!(void 0!==a&&0<C(a,t)))break e;e[r]=t,e[n]=a,n=r}}function k(e){return void 0===(e=e[0])?null:e}function S(e){var t=e[0];if(void 0!==t){var n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length;r<a;){var o=2*(r+1)-1,l=e[o],i=o+1,s=e[i];if(void 0!==l&&0>C(l,n))void 0!==s&&0>C(s,l)?(e[r]=s,e[i]=n,r=i):(e[r]=l,e[o]=n,r=o);else{if(!(void 0!==s&&0>C(s,n)))break e;e[r]=s,e[i]=n,r=i}}}return t}return null}function C(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}var _=[],T=[],N=1,O=null,P=3,R=!1,A=!1,L=!1;function I(e){for(var t=k(T);null!==t;){if(null===t.callback)S(T);else{if(!(t.startTime<=e))break;S(T),t.sortIndex=t.expirationTime,x(_,t)}t=k(T)}}function M(e){if(L=!1,I(e),!A)if(null!==k(_))A=!0,n(z);else{var t=k(T);null!==t&&r(M,t.startTime-e)}}function z(e,n){A=!1,L&&(L=!1,a()),R=!0;var o=P;try{for(I(n),O=k(_);null!==O&&(!(O.expirationTime>n)||e&&!t.unstable_shouldYield());){var l=O.callback;if("function"==typeof l){O.callback=null,P=O.priorityLevel;var i=l(O.expirationTime<=n);n=t.unstable_now(),"function"==typeof i?O.callback=i:O===k(_)&&S(_),I(n)}else S(_);O=k(_)}if(null!==O)var s=!0;else{var u=k(T);null!==u&&r(M,u.startTime-n),s=!1}return s}finally{O=null,P=o,R=!1}}var D=o;t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){A||R||(A=!0,n(z))},t.unstable_getCurrentPriorityLevel=function(){return P},t.unstable_getFirstCallbackNode=function(){return k(_)},t.unstable_next=function(e){switch(P){case 1:case 2:case 3:var t=3;break;default:t=P}var n=P;P=t;try{return e()}finally{P=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=D,t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=P;P=e;try{return t()}finally{P=n}},t.unstable_scheduleCallback=function(e,o,l){var i=t.unstable_now();switch(l="object"==typeof l&&null!==l&&"number"==typeof(l=l.delay)&&0<l?i+l:i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:N++,callback:o,priorityLevel:e,startTime:l,expirationTime:s=l+s,sortIndex:-1},l>i?(e.sortIndex=l,x(T,e),null===k(_)&&e===k(T)&&(L?a():L=!0,r(M,l-i))):(e.sortIndex=s,x(_,e),A||R||(A=!0,n(z))),e},t.unstable_wrapCallback=function(e){var t=P;return function(){var n=P;P=t;try{return e.apply(this,arguments)}finally{P=n}}}},51:(e,t,n)=>{"use strict";e.exports=n(787)},631:e=>{e.exports=function(e,t,n,r){var a=n?n.call(r,e,t):void 0;if(void 0!==a)return!!a;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var o=Object.keys(e),l=Object.keys(t);if(o.length!==l.length)return!1;for(var i=Object.prototype.hasOwnProperty.bind(t),s=0;s<o.length;s++){var u=o[s];if(!i(u))return!1;var c=e[u],f=t[u];if(!1===(a=n?n.call(r,c,f,u):void 0)||void 0===a&&c!==f)return!1}return!0}}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(496),t=n(995);function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,r(e,t)}var o=n(36),l=n.n(o);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function s(e){return"/"===e.charAt(0)}function u(e,t){for(var n=t,r=n+1,a=e.length;r<a;n+=1,r+=1)e[n]=e[r];e.pop()}function c(e){return e.valueOf?e.valueOf():Object.prototype.valueOf.call(e)}const f=function e(t,n){if(t===n)return!0;if(null==t||null==n)return!1;if(Array.isArray(t))return Array.isArray(n)&&t.length===n.length&&t.every((function(t,r){return e(t,n[r])}));if("object"==typeof t||"object"==typeof n){var r=c(t),a=c(n);return r!==t||a!==n?e(r,a):Object.keys(Object.assign({},t,n)).every((function(r){return e(t[r],n[r])}))}return!1};const d=function(e,t){if(!e)throw new Error("Invariant failed")};function p(e){return"/"===e.charAt(0)?e:"/"+e}function h(e){return"/"===e.charAt(0)?e.substr(1):e}function m(e,t){return function(e,t){return 0===e.toLowerCase().indexOf(t.toLowerCase())&&-1!=="/?#".indexOf(e.charAt(t.length))}(e,t)?e.substr(t.length):e}function g(e){return"/"===e.charAt(e.length-1)?e.slice(0,-1):e}function v(e){var t=e.pathname,n=e.search,r=e.hash,a=t||"/";return n&&"?"!==n&&(a+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(a+="#"===r.charAt(0)?r:"#"+r),a}function y(e,t,n,r){var a;"string"==typeof e?(a=function(e){var t=e||"/",n="",r="",a=t.indexOf("#");-1!==a&&(r=t.substr(a),t=t.substr(0,a));var o=t.indexOf("?");return-1!==o&&(n=t.substr(o),t=t.substr(0,o)),{pathname:t,search:"?"===n?"":n,hash:"#"===r?"":r}}(e)).state=t:(void 0===(a=i({},e)).pathname&&(a.pathname=""),a.search?"?"!==a.search.charAt(0)&&(a.search="?"+a.search):a.search="",a.hash?"#"!==a.hash.charAt(0)&&(a.hash="#"+a.hash):a.hash="",void 0!==t&&void 0===a.state&&(a.state=t));try{a.pathname=decodeURI(a.pathname)}catch(e){throw e instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):e}return n&&(a.key=n),r?a.pathname?"/"!==a.pathname.charAt(0)&&(a.pathname=function(e,t){void 0===t&&(t="");var n,r=e&&e.split("/")||[],a=t&&t.split("/")||[],o=e&&s(e),l=t&&s(t),i=o||l;if(e&&s(e)?a=r:r.length&&(a.pop(),a=a.concat(r)),!a.length)return"/";if(a.length){var c=a[a.length-1];n="."===c||".."===c||""===c}else n=!1;for(var f=0,d=a.length;d>=0;d--){var p=a[d];"."===p?u(a,d):".."===p?(u(a,d),f++):f&&(u(a,d),f--)}if(!i)for(;f--;f)a.unshift("..");!i||""===a[0]||a[0]&&s(a[0])||a.unshift("");var h=a.join("/");return n&&"/"!==h.substr(-1)&&(h+="/"),h}(a.pathname,r.pathname)):a.pathname=r.pathname:a.pathname||(a.pathname="/"),a}function b(){var e=null,t=[];return{setPrompt:function(t){return e=t,function(){e===t&&(e=null)}},confirmTransitionTo:function(t,n,r,a){if(null!=e){var o="function"==typeof e?e(t,n):e;"string"==typeof o?"function"==typeof r?r(o,a):a(!0):a(!1!==o)}else a(!0)},appendListener:function(e){var n=!0;function r(){n&&e.apply(void 0,arguments)}return t.push(r),function(){n=!1,t=t.filter((function(e){return e!==r}))}},notifyListeners:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];t.forEach((function(e){return e.apply(void 0,n)}))}}}var w=!("undefined"==typeof window||!window.document||!window.document.createElement);function E(e,t){t(window.confirm(e))}var x="hashchange",k={hashbang:{encodePath:function(e){return"!"===e.charAt(0)?e:"!/"+h(e)},decodePath:function(e){return"!"===e.charAt(0)?e.substr(1):e}},noslash:{encodePath:h,decodePath:p},slash:{encodePath:p,decodePath:p}};function S(e){var t=e.indexOf("#");return-1===t?e:e.slice(0,t)}function C(){var e=window.location.href,t=e.indexOf("#");return-1===t?"":e.substring(t+1)}function _(e){window.location.replace(S(window.location.href)+"#"+e)}function T(e){void 0===e&&(e={}),w||d(!1);var t=window.history,n=(window.navigator.userAgent.indexOf("Firefox"),e),r=n.getUserConfirmation,a=void 0===r?E:r,o=n.hashType,l=void 0===o?"slash":o,s=e.basename?g(p(e.basename)):"",u=k[l],c=u.encodePath,f=u.decodePath;function h(){var e=f(C());return s&&(e=m(e,s)),y(e)}var T=b();function N(e){i(F,e),F.length=t.length,T.notifyListeners(F.location,F.action)}var O=!1,P=null;function R(){var e=C(),t=c(e);if(e!==t)_(t);else{var n=h(),r=F.location;if(!O&&function(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash}(r,n))return;if(P===v(n))return;P=null,function(e){if(O)O=!1,N();else{T.confirmTransitionTo(e,"POP",a,(function(t){t?N({action:"POP",location:e}):function(e){var t=F.location,n=M.lastIndexOf(v(t));-1===n&&(n=0);var r=M.lastIndexOf(v(e));-1===r&&(r=0);var a=n-r;a&&(O=!0,z(a))}(e)}))}}(n)}}var A=C(),L=c(A);A!==L&&_(L);var I=h(),M=[v(I)];function z(e){t.go(e)}var D=0;function $(e){1===(D+=e)&&1===e?window.addEventListener(x,R):0===D&&window.removeEventListener(x,R)}var j=!1,F={length:t.length,action:"POP",location:I,createHref:function(e){var t=document.querySelector("base"),n="";return t&&t.getAttribute("href")&&(n=S(window.location.href)),n+"#"+c(s+v(e))},push:function(e,t){var n="PUSH",r=y(e,void 0,void 0,F.location);T.confirmTransitionTo(r,n,a,(function(e){if(e){var t=v(r),a=c(s+t);if(C()!==a){P=t,function(e){window.location.hash=e}(a);var o=M.lastIndexOf(v(F.location)),l=M.slice(0,o+1);l.push(t),M=l,N({action:n,location:r})}else N()}}))},replace:function(e,t){var n="REPLACE",r=y(e,void 0,void 0,F.location);T.confirmTransitionTo(r,n,a,(function(e){if(e){var t=v(r),a=c(s+t);C()!==a&&(P=t,_(a));var o=M.indexOf(v(F.location));-1!==o&&(M[o]=t),N({action:n,location:r})}}))},go:z,goBack:function(){z(-1)},goForward:function(){z(1)},block:function(e){void 0===e&&(e=!1);var t=T.setPrompt(e);return j||($(1),j=!0),function(){return j&&(j=!1,$(-1)),t()}},listen:function(e){var t=T.appendListener(e);return $(1),function(){$(-1),t()}}};return F}var N=1073741823,O="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==n.g?n.g:{};function P(e){var t=[];return{on:function(e){t.push(e)},off:function(e){t=t.filter((function(t){return t!==e}))},get:function(){return e},set:function(n,r){e=n,t.forEach((function(t){return t(e,r)}))}}}const R=e.createContext||function(t,n){var r,o,i,s="__create-react-context-"+((O[i="__global_unique_id__"]=(O[i]||0)+1)+"__"),u=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).emitter=P(t.props.value),t}a(t,e);var r=t.prototype;return r.getChildContext=function(){var e;return(e={})[s]=this.emitter,e},r.componentWillReceiveProps=function(e){if(this.props.value!==e.value){var t,r=this.props.value,a=e.value;!function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}(r,a)?(t="function"==typeof n?n(r,a):N,0!=(t|=0)&&this.emitter.set(e.value,t)):t=0}},r.render=function(){return this.props.children},t}(e.Component);u.childContextTypes=((r={})[s]=l().object.isRequired,r);var c=function(e){function n(){var t;return(t=e.apply(this,arguments)||this).state={value:t.getValue()},t.onUpdate=function(e,n){0!=((0|t.observedBits)&n)&&t.setState({value:t.getValue()})},t}a(n,e);var r=n.prototype;return r.componentWillReceiveProps=function(e){var t=e.observedBits;this.observedBits=null==t?N:t},r.componentDidMount=function(){this.context[s]&&this.context[s].on(this.onUpdate);var e=this.props.observedBits;this.observedBits=null==e?N:e},r.componentWillUnmount=function(){this.context[s]&&this.context[s].off(this.onUpdate)},r.getValue=function(){return this.context[s]?this.context[s].get():t},r.render=function(){return(e=this.props.children,Array.isArray(e)?e[0]:e)(this.state.value);var e},n}(e.Component);return c.contextTypes=((o={})[s]=l().object,o),{Provider:u,Consumer:c}};var A=n(720),L=n.n(A);function I(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}n(237);var M=n(535),z=n.n(M),D=function(e){var t=R();return t.displayName="Router-History",t}(),$=function(e){var t=R();return t.displayName="Router",t}(),j=function(t){function n(e){var n;return(n=t.call(this,e)||this).state={location:e.history.location},n._isMounted=!1,n._pendingLocation=null,e.staticContext||(n.unlisten=e.history.listen((function(e){n._isMounted?n.setState({location:e}):n._pendingLocation=e}))),n}a(n,t),n.computeRootMatch=function(e){return{path:"/",url:"/",params:{},isExact:"/"===e}};var r=n.prototype;return r.componentDidMount=function(){this._isMounted=!0,this._pendingLocation&&this.setState({location:this._pendingLocation})},r.componentWillUnmount=function(){this.unlisten&&this.unlisten()},r.render=function(){return e.createElement($.Provider,{value:{history:this.props.history,location:this.state.location,match:n.computeRootMatch(this.state.location.pathname),staticContext:this.props.staticContext}},e.createElement(D.Provider,{children:this.props.children||null,value:this.props.history}))},n}(e.Component);e.Component;var F=function(e){function t(){return e.apply(this,arguments)||this}a(t,e);var n=t.prototype;return n.componentDidMount=function(){this.props.onMount&&this.props.onMount.call(this,this)},n.componentDidUpdate=function(e){this.props.onUpdate&&this.props.onUpdate.call(this,this,e)},n.componentWillUnmount=function(){this.props.onUnmount&&this.props.onUnmount.call(this,this)},n.render=function(){return null},t}(e.Component),U={},W=0;function B(e,t){return void 0===e&&(e="/"),void 0===t&&(t={}),"/"===e?e:function(e){if(U[e])return U[e];var t=L().compile(e);return W<1e4&&(U[e]=t,W++),t}(e)(t,{pretty:!0})}function H(t){var n=t.computedMatch,r=t.to,a=t.push,o=void 0!==a&&a;return e.createElement($.Consumer,null,(function(t){t||d(!1);var a=t.history,l=t.staticContext,s=o?a.push:a.replace,u=y(n?"string"==typeof r?B(r,n.params):i({},r,{pathname:B(r.pathname,n.params)}):r);return l?(s(u),null):e.createElement(F,{onMount:function(){s(u)},onUpdate:function(e,t){var n=y(t.to);(function(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&f(e.state,t.state)})(n,i({},u,{key:n.key}))||s(u)},to:r})}))}var V={},q=0;function Y(e,t){void 0===t&&(t={}),("string"==typeof t||Array.isArray(t))&&(t={path:t});var n=t,r=n.path,a=n.exact,o=void 0!==a&&a,l=n.strict,i=void 0!==l&&l,s=n.sensitive,u=void 0!==s&&s;return[].concat(r).reduce((function(t,n){if(!n&&""!==n)return null;if(t)return t;var r=function(e,t){var n=""+t.end+t.strict+t.sensitive,r=V[n]||(V[n]={});if(r[e])return r[e];var a=[],o={regexp:L()(e,a,t),keys:a};return q<1e4&&(r[e]=o,q++),o}(n,{end:o,strict:i,sensitive:u}),a=r.regexp,l=r.keys,s=a.exec(e);if(!s)return null;var c=s[0],f=s.slice(1),d=e===c;return o&&!d?null:{path:n,url:"/"===n&&""===c?"/":c,isExact:d,params:l.reduce((function(e,t,n){return e[t.name]=f[n],e}),{})}}),null)}var G=function(t){function n(){return t.apply(this,arguments)||this}return a(n,t),n.prototype.render=function(){var t=this;return e.createElement($.Consumer,null,(function(n){n||d(!1);var r=t.props.location||n.location,a=i({},n,{location:r,match:t.props.computedMatch?t.props.computedMatch:t.props.path?Y(r.pathname,t.props):n.match}),o=t.props,l=o.children,s=o.component,u=o.render;return Array.isArray(l)&&0===l.length&&(l=null),e.createElement($.Provider,{value:a},a.match?l?"function"==typeof l?l(a):l:s?e.createElement(s,a):u?u(a):null:"function"==typeof l?l(a):null)}))},n}(e.Component);e.Component;var Q=function(t){function n(){return t.apply(this,arguments)||this}return a(n,t),n.prototype.render=function(){var t=this;return e.createElement($.Consumer,null,(function(n){n||d(!1);var r,a,o=t.props.location||n.location;return e.Children.forEach(t.props.children,(function(t){if(null==a&&e.isValidElement(t)){r=t;var l=t.props.path||t.props.from;a=l?Y(o.pathname,i({},t.props,{path:l})):n.match}})),a?e.cloneElement(r,{location:o,computedMatch:a}):null}))},n}(e.Component),K=e.useContext;function X(){return K(D)}function Z(){var e=K($).match;return e?e.params:{}}e.Component;var J=function(t){function n(){for(var e,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(e=t.call.apply(t,[this].concat(r))||this).history=T(e.props),e}return a(n,t),n.prototype.render=function(){return e.createElement(j,{history:this.history,children:this.props.children})},n}(e.Component),ee=function(e,t){return"function"==typeof e?e(t):e},te=function(e,t){return"string"==typeof e?y(e,null,null,t):e},ne=function(e){return e},re=e.forwardRef;void 0===re&&(re=ne);var ae=re((function(t,n){var r=t.innerRef,a=t.navigate,o=t.onClick,l=I(t,["innerRef","navigate","onClick"]),s=l.target,u=i({},l,{onClick:function(e){try{o&&o(e)}catch(t){throw e.preventDefault(),t}e.defaultPrevented||0!==e.button||s&&"_self"!==s||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)||(e.preventDefault(),a())}});return u.ref=ne!==re&&n||r,e.createElement("a",u)})),oe=re((function(t,n){var r=t.component,a=void 0===r?ae:r,o=t.replace,l=t.to,s=t.innerRef,u=I(t,["component","replace","to","innerRef"]);return e.createElement($.Consumer,null,(function(t){t||d(!1);var r=t.history,c=te(ee(l,t.location),t.location),f=c?r.createHref(c):"",p=i({},u,{href:f,navigate:function(){var e=ee(l,t.location);(o?r.replace:r.push)(e)}});return ne!==re?p.ref=n||s:p.innerRef=s,e.createElement(a,p)}))})),le=function(e){return e},ie=e.forwardRef;void 0===ie&&(ie=le);var se=ie((function(t,n){var r=t["aria-current"],a=void 0===r?"page":r,o=t.activeClassName,l=void 0===o?"active":o,s=t.activeStyle,u=t.className,c=t.exact,f=t.isActive,p=t.location,h=t.sensitive,m=t.strict,g=t.style,v=t.to,y=t.innerRef,b=I(t,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return e.createElement($.Consumer,null,(function(t){t||d(!1);var r=p||t.location,o=te(ee(v,r),r),w=o.pathname,E=w&&w.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),x=E?Y(r.pathname,{path:E,exact:c,sensitive:h,strict:m}):null,k=!!(f?f(x,r):x),S=k?function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}(u,l):u,C=k?i({},g,{},s):g,_=i({"aria-current":k&&a||null,className:S,style:C,to:o},b);return le!==ie?_.ref=n||y:_.innerRef=y,e.createElement(oe,_)}))})),ue=function(e,t){return(ue=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},ce=function(){return(ce=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},fe="Pixel",de="Percent",pe={unit:de,value:.8};function he(e){return"number"==typeof e?{unit:de,value:100*e}:"string"==typeof e?e.match(/^(\d*(\.\d+)?)px$/)?{unit:fe,value:parseFloat(e)}:e.match(/^(\d*(\.\d+)?)%$/)?{unit:de,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),pe):(console.warn("scrollThreshold should be string or number"),pe)}const me=function(t){function n(e){var n=t.call(this,e)||this;return n.lastScrollTop=0,n.actionTriggered=!1,n.startY=0,n.currentY=0,n.dragging=!1,n.maxPullDownDistance=0,n.getScrollableTarget=function(){return n.props.scrollableTarget instanceof HTMLElement?n.props.scrollableTarget:"string"==typeof n.props.scrollableTarget?document.getElementById(n.props.scrollableTarget):(null===n.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)},n.onStart=function(e){n.lastScrollTop||(n.dragging=!0,e instanceof MouseEvent?n.startY=e.pageY:e instanceof TouchEvent&&(n.startY=e.touches[0].pageY),n.currentY=n.startY,n._infScroll&&(n._infScroll.style.willChange="transform",n._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},n.onMove=function(e){n.dragging&&(e instanceof MouseEvent?n.currentY=e.pageY:e instanceof TouchEvent&&(n.currentY=e.touches[0].pageY),n.currentY<n.startY||(n.currentY-n.startY>=Number(n.props.pullDownToRefreshThreshold)&&n.setState({pullToRefreshThresholdBreached:!0}),n.currentY-n.startY>1.5*n.maxPullDownDistance||n._infScroll&&(n._infScroll.style.overflow="visible",n._infScroll.style.transform="translate3d(0px, "+(n.currentY-n.startY)+"px, 0px)")))},n.onEnd=function(){n.startY=0,n.currentY=0,n.dragging=!1,n.state.pullToRefreshThresholdBreached&&(n.props.refreshFunction&&n.props.refreshFunction(),n.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame((function(){n._infScroll&&(n._infScroll.style.overflow="auto",n._infScroll.style.transform="none",n._infScroll.style.willChange="unset")}))},n.onScrollListener=function(e){"function"==typeof n.props.onScroll&&setTimeout((function(){return n.props.onScroll&&n.props.onScroll(e)}),0);var t=n.props.height||n._scrollableNode?e.target:document.documentElement.scrollTop?document.documentElement:document.body;n.actionTriggered||((n.props.inverse?n.isElementAtTop(t,n.props.scrollThreshold):n.isElementAtBottom(t,n.props.scrollThreshold))&&n.props.hasMore&&(n.actionTriggered=!0,n.setState({showLoader:!0}),n.props.next&&n.props.next()),n.lastScrollTop=t.scrollTop)},n.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:e.dataLength},n.throttledOnScrollListener=function(e,t,n,r){var a,o=!1,l=0;function i(){a&&clearTimeout(a)}function s(){var s=this,u=Date.now()-l,c=arguments;function f(){l=Date.now(),n.apply(s,c)}function d(){a=void 0}o||(r&&!a&&f(),i(),void 0===r&&u>e?f():!0!==t&&(a=setTimeout(r?d:f,void 0===r?e-u:e)))}return"boolean"!=typeof t&&(r=n,n=t,t=void 0),s.cancel=function(){i(),o=!0},s}(150,n.onScrollListener).bind(n),n.onStart=n.onStart.bind(n),n.onMove=n.onMove.bind(n),n.onEnd=n.onEnd.bind(n),n}return function(e,t){function n(){this.constructor=e}ue(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(n,t),n.prototype.componentDidMount=function(){if(void 0===this.props.dataLength)throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"==typeof this.props.initialScrollY&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),"function"!=typeof this.props.refreshFunction))throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')},n.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},n.prototype.componentDidUpdate=function(e){this.props.dataLength!==e.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},n.getDerivedStateFromProps=function(e,t){return e.dataLength!==t.prevDataLength?ce(ce({},t),{prevDataLength:e.dataLength}):null},n.prototype.isElementAtTop=function(e,t){void 0===t&&(t=.8);var n=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=he(t);return r.unit===fe?e.scrollTop<=r.value+n-e.scrollHeight+1:e.scrollTop<=r.value/100+n-e.scrollHeight+1},n.prototype.isElementAtBottom=function(e,t){void 0===t&&(t=.8);var n=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=he(t);return r.unit===fe?e.scrollTop+n>=e.scrollHeight-r.value:e.scrollTop+n>=r.value/100*e.scrollHeight},n.prototype.render=function(){var t=this,n=ce({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),r=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),a=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return e.createElement("div",{style:a,className:"infinite-scroll-component__outerdiv"},e.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(e){return t._infScroll=e},style:n},this.props.pullDownToRefresh&&e.createElement("div",{style:{position:"relative"},ref:function(e){return t._pullDown=e}},e.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!r&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},n}(e.Component);var ge=n(679),ve=n(631),ye=n.n(ve);const be=function(e){function t(e,r,s,u,d){for(var p,h,m,g,w,x=0,k=0,S=0,C=0,_=0,A=0,I=m=p=0,z=0,D=0,$=0,j=0,F=s.length,U=F-1,W="",B="",H="",V="";z<F;){if(h=s.charCodeAt(z),z===U&&0!==k+C+S+x&&(0!==k&&(h=47===k?10:47),C=S=x=0,F++,U++),0===k+C+S+x){if(z===U&&(0<D&&(W=W.replace(f,"")),0<W.trim().length)){switch(h){case 32:case 9:case 59:case 13:case 10:break;default:W+=s.charAt(z)}h=59}switch(h){case 123:for(p=(W=W.trim()).charCodeAt(0),m=1,j=++z;z<F;){switch(h=s.charCodeAt(z)){case 123:m++;break;case 125:m--;break;case 47:switch(h=s.charCodeAt(z+1)){case 42:case 47:e:{for(I=z+1;I<U;++I)switch(s.charCodeAt(I)){case 47:if(42===h&&42===s.charCodeAt(I-1)&&z+2!==I){z=I+1;break e}break;case 10:if(47===h){z=I+1;break e}}z=I}}break;case 91:h++;case 40:h++;case 34:case 39:for(;z++<U&&s.charCodeAt(z)!==h;);}if(0===m)break;z++}switch(m=s.substring(j,z),0===p&&(p=(W=W.replace(c,"").trim()).charCodeAt(0)),p){case 64:switch(0<D&&(W=W.replace(f,"")),h=W.charCodeAt(1)){case 100:case 109:case 115:case 45:D=r;break;default:D=R}if(j=(m=t(r,D,m,h,d+1)).length,0<L&&(w=i(3,m,D=n(R,W,$),r,N,T,j,h,d,u),W=D.join(""),void 0!==w&&0===(j=(m=w.trim()).length)&&(h=0,m="")),0<j)switch(h){case 115:W=W.replace(E,l);case 100:case 109:case 45:m=W+"{"+m+"}";break;case 107:m=(W=W.replace(v,"$1 $2"))+"{"+m+"}",m=1===P||2===P&&o("@"+m,3)?"@-webkit-"+m+"@"+m:"@"+m;break;default:m=W+m,112===u&&(B+=m,m="")}else m="";break;default:m=t(r,n(r,W,$),m,u,d+1)}H+=m,m=$=D=I=p=0,W="",h=s.charCodeAt(++z);break;case 125:case 59:if(1<(j=(W=(0<D?W.replace(f,""):W).trim()).length))switch(0===I&&(p=W.charCodeAt(0),45===p||96<p&&123>p)&&(j=(W=W.replace(" ",":")).length),0<L&&void 0!==(w=i(1,W,r,e,N,T,B.length,u,d,u))&&0===(j=(W=w.trim()).length)&&(W="\0\0"),p=W.charCodeAt(0),h=W.charCodeAt(1),p){case 0:break;case 64:if(105===h||99===h){V+=W+s.charAt(z);break}default:58!==W.charCodeAt(j-1)&&(B+=a(W,p,h,W.charCodeAt(2)))}$=D=I=p=0,W="",h=s.charCodeAt(++z)}}switch(h){case 13:case 10:47===k?k=0:0===1+p&&107!==u&&0<W.length&&(D=1,W+="\0"),0<L*M&&i(0,W,r,e,N,T,B.length,u,d,u),T=1,N++;break;case 59:case 125:if(0===k+C+S+x){T++;break}default:switch(T++,g=s.charAt(z),h){case 9:case 32:if(0===C+x+k)switch(_){case 44:case 58:case 9:case 32:g="";break;default:32!==h&&(g=" ")}break;case 0:g="\\0";break;case 12:g="\\f";break;case 11:g="\\v";break;case 38:0===C+k+x&&(D=$=1,g="\f"+g);break;case 108:if(0===C+k+x+O&&0<I)switch(z-I){case 2:112===_&&58===s.charCodeAt(z-3)&&(O=_);case 8:111===A&&(O=A)}break;case 58:0===C+k+x&&(I=z);break;case 44:0===k+S+C+x&&(D=1,g+="\r");break;case 34:case 39:0===k&&(C=C===h?0:0===C?h:C);break;case 91:0===C+k+S&&x++;break;case 93:0===C+k+S&&x--;break;case 41:0===C+k+x&&S--;break;case 40:if(0===C+k+x){if(0===p)switch(2*_+3*A){case 533:break;default:p=1}S++}break;case 64:0===k+S+C+x+I+m&&(m=1);break;case 42:case 47:if(!(0<C+x+S))switch(k){case 0:switch(2*h+3*s.charCodeAt(z+1)){case 235:k=47;break;case 220:j=z,k=42}break;case 42:47===h&&42===_&&j+2!==z&&(33===s.charCodeAt(j+2)&&(B+=s.substring(j,z+1)),g="",k=0)}}0===k&&(W+=g)}A=_,_=h,z++}if(0<(j=B.length)){if(D=r,0<L&&void 0!==(w=i(2,B,D,e,N,T,j,u,d,u))&&0===(B=w).length)return V+B+H;if(B=D.join(",")+"{"+B+"}",0!=P*O){switch(2!==P||o(B,2)||(O=0),O){case 111:B=B.replace(b,":-moz-$1")+B;break;case 112:B=B.replace(y,"::-webkit-input-$1")+B.replace(y,"::-moz-$1")+B.replace(y,":-ms-input-$1")+B}O=0}}return V+B+H}function n(e,t,n){var a=t.trim().split(m);t=a;var o=a.length,l=e.length;switch(l){case 0:case 1:var i=0;for(e=0===l?"":e[0]+" ";i<o;++i)t[i]=r(e,t[i],n).trim();break;default:var s=i=0;for(t=[];i<o;++i)for(var u=0;u<l;++u)t[s++]=r(e[u]+" ",a[i],n).trim()}return t}function r(e,t,n){var r=t.charCodeAt(0);switch(33>r&&(r=(t=t.trim()).charCodeAt(0)),r){case 38:return t.replace(g,"$1"+e.trim());case 58:return e.trim()+t.replace(g,"$1"+e.trim());default:if(0<1*n&&0<t.indexOf("\f"))return t.replace(g,(58===e.charCodeAt(0)?"":"$1")+e.trim())}return e+t}function a(e,t,n,r){var l=e+";",i=2*t+3*n+4*r;if(944===i){e=l.indexOf(":",9)+1;var s=l.substring(e,l.length-1).trim();return s=l.substring(0,e).trim()+s+";",1===P||2===P&&o(s,1)?"-webkit-"+s+s:s}if(0===P||2===P&&!o(l,1))return l;switch(i){case 1015:return 97===l.charCodeAt(10)?"-webkit-"+l+l:l;case 951:return 116===l.charCodeAt(3)?"-webkit-"+l+l:l;case 963:return 110===l.charCodeAt(5)?"-webkit-"+l+l:l;case 1009:if(100!==l.charCodeAt(4))break;case 969:case 942:return"-webkit-"+l+l;case 978:return"-webkit-"+l+"-moz-"+l+l;case 1019:case 983:return"-webkit-"+l+"-moz-"+l+"-ms-"+l+l;case 883:if(45===l.charCodeAt(8))return"-webkit-"+l+l;if(0<l.indexOf("image-set(",11))return l.replace(_,"$1-webkit-$2")+l;break;case 932:if(45===l.charCodeAt(4))switch(l.charCodeAt(5)){case 103:return"-webkit-box-"+l.replace("-grow","")+"-webkit-"+l+"-ms-"+l.replace("grow","positive")+l;case 115:return"-webkit-"+l+"-ms-"+l.replace("shrink","negative")+l;case 98:return"-webkit-"+l+"-ms-"+l.replace("basis","preferred-size")+l}return"-webkit-"+l+"-ms-"+l+l;case 964:return"-webkit-"+l+"-ms-flex-"+l+l;case 1023:if(99!==l.charCodeAt(8))break;return"-webkit-box-pack"+(s=l.substring(l.indexOf(":",15)).replace("flex-","").replace("space-between","justify"))+"-webkit-"+l+"-ms-flex-pack"+s+l;case 1005:return p.test(l)?l.replace(d,":-webkit-")+l.replace(d,":-moz-")+l:l;case 1e3:switch(t=(s=l.substring(13).trim()).indexOf("-")+1,s.charCodeAt(0)+s.charCodeAt(t)){case 226:s=l.replace(w,"tb");break;case 232:s=l.replace(w,"tb-rl");break;case 220:s=l.replace(w,"lr");break;default:return l}return"-webkit-"+l+"-ms-"+s+l;case 1017:if(-1===l.indexOf("sticky",9))break;case 975:switch(t=(l=e).length-10,i=(s=(33===l.charCodeAt(t)?l.substring(0,t):l).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|s.charCodeAt(7))){case 203:if(111>s.charCodeAt(8))break;case 115:l=l.replace(s,"-webkit-"+s)+";"+l;break;case 207:case 102:l=l.replace(s,"-webkit-"+(102<i?"inline-":"")+"box")+";"+l.replace(s,"-webkit-"+s)+";"+l.replace(s,"-ms-"+s+"box")+";"+l}return l+";";case 938:if(45===l.charCodeAt(5))switch(l.charCodeAt(6)){case 105:return s=l.replace("-items",""),"-webkit-"+l+"-webkit-box-"+s+"-ms-flex-"+s+l;case 115:return"-webkit-"+l+"-ms-flex-item-"+l.replace(k,"")+l;default:return"-webkit-"+l+"-ms-flex-line-pack"+l.replace("align-content","").replace(k,"")+l}break;case 973:case 989:if(45!==l.charCodeAt(3)||122===l.charCodeAt(4))break;case 931:case 953:if(!0===C.test(e))return 115===(s=e.substring(e.indexOf(":")+1)).charCodeAt(0)?a(e.replace("stretch","fill-available"),t,n,r).replace(":fill-available",":stretch"):l.replace(s,"-webkit-"+s)+l.replace(s,"-moz-"+s.replace("fill-",""))+l;break;case 962:if(l="-webkit-"+l+(102===l.charCodeAt(5)?"-ms-"+l:"")+l,211===n+r&&105===l.charCodeAt(13)&&0<l.indexOf("transform",10))return l.substring(0,l.indexOf(";",27)+1).replace(h,"$1-webkit-$2")+l}return l}function o(e,t){var n=e.indexOf(1===t?":":"{"),r=e.substring(0,3!==t?n:10);return n=e.substring(n+1,e.length-1),I(2!==t?r:r.replace(S,"$1"),n,t)}function l(e,t){var n=a(t,t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2));return n!==t+";"?n.replace(x," or ($1)").substring(4):"("+t+")"}function i(e,t,n,r,a,o,l,i,s,c){for(var f,d=0,p=t;d<L;++d)switch(f=A[d].call(u,e,p,n,r,a,o,l,i,s,c)){case void 0:case!1:case!0:case null:break;default:p=f}if(p!==t)return p}function s(e){return void 0!==(e=e.prefix)&&(I=null,e?"function"!=typeof e?P=1:(P=2,I=e):P=0),s}function u(e,n){var r=e;if(33>r.charCodeAt(0)&&(r=r.trim()),r=[r],0<L){var a=i(-1,n,r,r,N,T,0,0,0,0);void 0!==a&&"string"==typeof a&&(n=a)}var o=t(R,r,n,0,0);return 0<L&&void 0!==(a=i(-2,o,r,r,N,T,o.length,0,0,0))&&(o=a),O=0,T=N=1,o}var c=/^\0+/g,f=/[\0\r\f]/g,d=/: */g,p=/zoo|gra/,h=/([,: ])(transform)/g,m=/,\r+?/g,g=/([\t\r\n ])*\f?&/g,v=/@(k\w+)\s*(\S*)\s*/,y=/::(place)/g,b=/:(read-only)/g,w=/[svh]\w+-[tblr]{2}/,E=/\(\s*(.*)\s*\)/g,x=/([\s\S]*?);/g,k=/-self|flex-/g,S=/[^]*?(:[rp][el]a[\w-]+)[^]*/,C=/stretch|:\s*\w+\-(?:conte|avail)/,_=/([^-])(image-set\()/,T=1,N=1,O=0,P=1,R=[],A=[],L=0,I=null,M=0;return u.use=function e(t){switch(t){case void 0:case null:L=A.length=0;break;default:if("function"==typeof t)A[L++]=t;else if("object"==typeof t)for(var n=0,r=t.length;n<r;++n)e(t[n]);else M=0|!!t}return e},u.set=s,void 0!==e&&s(e),u},we={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var Ee=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;const xe=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=(n=e,Ee.test(n)||111===n.charCodeAt(0)&&110===n.charCodeAt(1)&&n.charCodeAt(2)<91)),t[e];var n}}();function ke(){return(ke=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var Se=function(e,t){for(var n=[e[0]],r=0,a=t.length;r<a;r+=1)n.push(t[r],e[r+1]);return n},Ce=function(e){return null!==e&&"object"==typeof e&&"[object Object]"===(e.toString?e.toString():Object.prototype.toString.call(e))&&!(0,ge.typeOf)(e)},_e=Object.freeze([]),Te=Object.freeze({});function Ne(e){return"function"==typeof e}function Oe(e){return e.displayName||e.name||"Component"}function Pe(e){return e&&"string"==typeof e.styledComponentId}var Re="undefined"!=typeof process&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",Ae="undefined"!=typeof window&&"HTMLElement"in window,Le=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY&&"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY);function Ie(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):""))}var Me=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,a=r;e>=a;)(a<<=1)<0&&Ie(16,""+e);this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var o=r;o<a;o++)this.groupSizes[o]=0}for(var l=this.indexOfGroup(e+1),i=0,s=t.length;i<s;i++)this.tag.insertRule(l,t[i])&&(this.groupSizes[e]++,l++)},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var a=n;a<r;a++)this.tag.deleteRule(n)}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),a=r+n,o=r;o<a;o++)t+=this.tag.getRule(o)+"/*!sc*/\n";return t},e}(),ze=new Map,De=new Map,$e=1,je=function(e){if(ze.has(e))return ze.get(e);for(;De.has($e);)$e++;var t=$e++;return ze.set(e,t),De.set(t,e),t},Fe=function(e){return De.get(e)},Ue=function(e,t){ze.set(e,t),De.set(t,e)},We="style["+Re+'][data-styled-version="5.3.0"]',Be=new RegExp("^"+Re+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),He=function(e,t,n){for(var r,a=n.split(","),o=0,l=a.length;o<l;o++)(r=a[o])&&e.registerName(t,r)},Ve=function(e,t){for(var n=t.innerHTML.split("/*!sc*/\n"),r=[],a=0,o=n.length;a<o;a++){var l=n[a].trim();if(l){var i=l.match(Be);if(i){var s=0|parseInt(i[1],10),u=i[2];0!==s&&(Ue(u,s),He(e,u,i[3]),e.getTag().insertRules(s,r)),r.length=0}else r.push(l)}}},qe=function(){return"undefined"!=typeof window&&void 0!==window.__webpack_nonce__?window.__webpack_nonce__:null},Ye=function(e){var t=document.head,n=e||t,r=document.createElement("style"),a=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(Re))return r}}(n),o=void 0!==a?a.nextSibling:null;r.setAttribute(Re,"active"),r.setAttribute("data-styled-version","5.3.0");var l=qe();return l&&r.setAttribute("nonce",l),n.insertBefore(r,o),r},Ge=function(){function e(e){var t=this.element=Ye(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var a=t[n];if(a.ownerNode===e)return a}Ie(17)}(t),this.length=0}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),Qe=function(){function e(e){var t=this.element=Ye(e);this.nodes=t.childNodes,this.length=0}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return!1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Ke=function(){function e(e){this.rules=[],this.length=0}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Xe=Ae,Ze={isServer:!Ae,useCSSOMInjection:!Le},Je=function(){function e(e,t,n){void 0===e&&(e=Te),void 0===t&&(t={}),this.options=ke({},Ze,{},e),this.gs=t,this.names=new Map(n),!this.options.isServer&&Ae&&Xe&&(Xe=!1,function(e){for(var t=document.querySelectorAll(We),n=0,r=t.length;n<r;n++){var a=t[n];a&&"active"!==a.getAttribute(Re)&&(Ve(e,a),a.parentNode&&a.parentNode.removeChild(a))}}(this))}e.registerId=function(e){return je(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(ke({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,a=t.target,e=n?new Ke(a):r?new Ge(a):new Qe(a),new Me(e)));var e,t,n,r,a},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(je(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(je(e),n)},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},t.clearRules=function(e){this.getTag().clearGroup(je(e)),this.clearNames(e)},t.clearTag=function(){this.tag=void 0},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",a=0;a<n;a++){var o=Fe(a);if(void 0!==o){var l=e.names.get(o),i=t.getGroup(a);if(void 0!==l&&0!==i.length){var s=Re+".g"+a+'[id="'+o+'"]',u="";void 0!==l&&l.forEach((function(e){e.length>0&&(u+=e+",")})),r+=""+i+s+'{content:"'+u+'"}/*!sc*/\n'}}}return r}(this)},e}(),et=/(a)(d)/gi,tt=function(e){return String.fromCharCode(e+(e>25?39:97))};function nt(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=tt(t%52)+n;return(tt(t%52)+n).replace(et,"$1-$2")}var rt=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},at=function(e){return rt(5381,e)};function ot(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ne(n)&&!Pe(n))return!1}return!0}var lt=at("5.3.0"),it=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&ot(e),this.componentId=t,this.baseHash=rt(lt,t),this.baseStyle=n,Je.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,a=[];if(this.baseStyle&&a.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))a.push(this.staticRulesId);else{var o=St(this.rules,e,t,n).join(""),l=nt(rt(this.baseHash,o.length)>>>0);if(!t.hasNameForId(r,l)){var i=n(o,"."+l,void 0,r);t.insertRules(r,l,i)}a.push(l),this.staticRulesId=l}else{for(var s=this.rules.length,u=rt(this.baseHash,n.hash),c="",f=0;f<s;f++){var d=this.rules[f];if("string"==typeof d)c+=d;else if(d){var p=St(d,e,t,n),h=Array.isArray(p)?p.join(""):p;u=rt(u,h+f),c+=h}}if(c){var m=nt(u>>>0);if(!t.hasNameForId(r,m)){var g=n(c,"."+m,void 0,r);t.insertRules(r,m,g)}a.push(m)}}return a.join(" ")},e}(),st=/^\s*\/\/.*$/gm,ut=[":","[",".","#"];function ct(e){var t,n,r,a,o=void 0===e?Te:e,l=o.options,i=void 0===l?Te:l,s=o.plugins,u=void 0===s?_e:s,c=new be(i),f=[],d=function(e){function t(t){if(t)try{e(t+"}")}catch(e){}}return function(n,r,a,o,l,i,s,u,c,f){switch(n){case 1:if(0===c&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===u)return r+"/*|*/";break;case 3:switch(u){case 102:case 112:return e(a[0]+r),"";default:return r+(0===f?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(t)}}}((function(e){f.push(e)})),p=function(e,r,o){return 0===r&&-1!==ut.indexOf(o[n.length])||o.match(a)?e:"."+t};function h(e,o,l,i){void 0===i&&(i="&");var s=e.replace(st,""),u=o&&l?l+" "+o+" { "+s+" }":s;return t=i,n=o,r=new RegExp("\\"+n+"\\b","g"),a=new RegExp("(\\"+n+"\\b){2,}"),c(l||!o?"":o,u)}return c.use([].concat(u,[function(e,t,a){2===e&&a.length&&a[0].lastIndexOf(n)>0&&(a[0]=a[0].replace(r,p))},d,function(e){if(-2===e){var t=f;return f=[],t}}])),h.hash=u.length?u.reduce((function(e,t){return t.name||Ie(15),rt(e,t.name)}),5381).toString():"",h}var ft=e.createContext(),dt=(ft.Consumer,e.createContext()),pt=(dt.Consumer,new Je),ht=ct();function mt(){return(0,e.useContext)(ft)||pt}function gt(t){var n=(0,e.useState)(t.stylisPlugins),r=n[0],a=n[1],o=mt(),l=(0,e.useMemo)((function(){var e=o;return t.sheet?e=t.sheet:t.target&&(e=e.reconstructWithOptions({target:t.target},!1)),t.disableCSSOMInjection&&(e=e.reconstructWithOptions({useCSSOMInjection:!1})),e}),[t.disableCSSOMInjection,t.sheet,t.target]),i=(0,e.useMemo)((function(){return ct({options:{prefix:!t.disableVendorPrefixes},plugins:r})}),[t.disableVendorPrefixes,r]);return(0,e.useEffect)((function(){ye()(r,t.stylisPlugins)||a(t.stylisPlugins)}),[t.stylisPlugins]),e.createElement(ft.Provider,{value:l},e.createElement(dt.Provider,{value:i},t.children))}var vt=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=ht);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.toString=function(){return Ie(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return e.prototype.getName=function(e){return void 0===e&&(e=ht),this.name+e.hash},e}(),yt=/([A-Z])/,bt=/([A-Z])/g,wt=/^ms-/,Et=function(e){return"-"+e.toLowerCase()};function xt(e){return yt.test(e)?e.replace(bt,Et).replace(wt,"-ms-"):e}var kt=function(e){return null==e||!1===e||""===e};function St(e,t,n,r){if(Array.isArray(e)){for(var a,o=[],l=0,i=e.length;l<i;l+=1)""!==(a=St(e[l],t,n,r))&&(Array.isArray(a)?o.push.apply(o,a):o.push(a));return o}return kt(e)?"":Pe(e)?"."+e.styledComponentId:Ne(e)?"function"!=typeof(s=e)||s.prototype&&s.prototype.isReactComponent||!t?e:St(e(t),t,n,r):e instanceof vt?n?(e.inject(n,r),e.getName(r)):e:Ce(e)?function e(t,n){var r,a,o=[];for(var l in t)t.hasOwnProperty(l)&&!kt(t[l])&&(Ce(t[l])?o.push.apply(o,e(t[l],l)):Ne(t[l])?o.push(xt(l)+":",t[l],";"):o.push(xt(l)+": "+(r=l,(null==(a=t[l])||"boolean"==typeof a||""===a?"":"number"!=typeof a||0===a||r in we?String(a).trim():a+"px")+";")));return n?[n+" {"].concat(o,["}"]):o}(e):e.toString();var s}function Ct(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return Ne(e)||Ce(e)?St(Se(_e,[e].concat(n))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:St(Se(e,n))}new Set;var _t=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Tt=/(^-|-$)/g;function Nt(e){return e.replace(_t,"-").replace(Tt,"")}var Ot=function(e){return nt(at(e)>>>0)};function Pt(e){return"string"==typeof e&&!0}var Rt=function(e){return"function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},At=function(e){return"__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function Lt(e,t,n){var r=e[n];Rt(t)&&Rt(r)?It(r,t):e[n]=t}function It(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var a=0,o=n;a<o.length;a++){var l=o[a];if(Rt(l))for(var i in l)At(i)&&Lt(e,l[i],i)}return e}var Mt=e.createContext();Mt.Consumer;var zt={};function Dt(t,n,r){var a=Pe(t),o=!Pt(t),l=n.attrs,i=void 0===l?_e:l,s=n.componentId,u=void 0===s?function(e,t){var n="string"!=typeof e?"sc":Nt(e);zt[n]=(zt[n]||0)+1;var r=n+"-"+Ot("5.3.0"+n+zt[n]);return t?t+"-"+r:r}(n.displayName,n.parentComponentId):s,c=n.displayName,f=void 0===c?function(e){return Pt(e)?"styled."+e:"Styled("+Oe(e)+")"}(t):c,d=n.displayName&&n.componentId?Nt(n.displayName)+"-"+n.componentId:n.componentId||u,p=a&&t.attrs?Array.prototype.concat(t.attrs,i).filter(Boolean):i,h=n.shouldForwardProp;a&&t.shouldForwardProp&&(h=n.shouldForwardProp?function(e,r,a){return t.shouldForwardProp(e,r,a)&&n.shouldForwardProp(e,r,a)}:t.shouldForwardProp);var m,g=new it(r,d,a?t.componentStyle:void 0),v=g.isStatic&&0===i.length,y=function(t,n){return function(t,n,r,a){var o=t.attrs,l=t.componentStyle,i=t.defaultProps,s=t.foldedComponentIds,u=t.shouldForwardProp,c=t.styledComponentId,f=t.target,d=function(e,t,n){void 0===e&&(e=Te);var r=ke({},t,{theme:e}),a={};return n.forEach((function(e){var t,n,o,l=e;for(t in Ne(l)&&(l=l(r)),l)r[t]=a[t]="className"===t?(n=a[t],o=l[t],n&&o?n+" "+o:n||o):l[t]})),[r,a]}(function(e,t,n){return void 0===n&&(n=Te),e.theme!==n.theme&&e.theme||t||n.theme}(n,(0,e.useContext)(Mt),i)||Te,n,o),p=d[0],h=d[1],m=function(t,n,r,a){var o=mt(),l=(0,e.useContext)(dt)||ht;return n?t.generateAndInjectStyles(Te,o,l):t.generateAndInjectStyles(r,o,l)}(l,a,p),g=r,v=h.$as||n.$as||h.as||n.as||f,y=Pt(v),b=h!==n?ke({},n,{},h):n,w={};for(var E in b)"$"!==E[0]&&"as"!==E&&("forwardedAs"===E?w.as=b[E]:(u?u(E,xe,v):!y||xe(E))&&(w[E]=b[E]));return n.style&&h.style!==n.style&&(w.style=ke({},n.style,{},h.style)),w.className=Array.prototype.concat(s,c,m!==c?m:null,n.className,h.className).filter(Boolean).join(" "),w.ref=g,(0,e.createElement)(v,w)}(m,t,n,v)};return y.displayName=f,(m=e.forwardRef(y)).attrs=p,m.componentStyle=g,m.displayName=f,m.shouldForwardProp=h,m.foldedComponentIds=a?Array.prototype.concat(t.foldedComponentIds,t.styledComponentId):_e,m.styledComponentId=d,m.target=a?t.target:t,m.withComponent=function(e){var t=n.componentId,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(n,["componentId"]),o=t&&t+"-"+(Pt(e)?e:Nt(Oe(e)));return Dt(e,ke({},a,{attrs:p,componentId:o}),r)},Object.defineProperty(m,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?It({},t.defaultProps,e):e}}),m.toString=function(){return"."+m.styledComponentId},o&&z()(m,t,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),m}var $t,jt=function(e){return function e(t,n,r){if(void 0===r&&(r=Te),!(0,ge.isValidElementType)(n))return Ie(1,String(n));var a=function(){return t(n,r,Ct.apply(void 0,arguments))};return a.withConfig=function(a){return e(t,n,ke({},r,{},a))},a.attrs=function(a){return e(t,n,ke({},r,{attrs:Array.prototype.concat(r.attrs,a).filter(Boolean)}))},a}(Dt,e)};function Ft(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=Ct.apply(void 0,[e].concat(n)).join(""),o=Ot(a);return new vt(o,a)}["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(e){jt[e]=jt(e)})),($t=function(e,t){this.rules=e,this.componentId=t,this.isStatic=ot(e),Je.registerId(this.componentId+1)}.prototype).createStyles=function(e,t,n,r){var a=r(St(this.rules,t,n,r).join(""),""),o=this.componentId+e;n.insertRules(o,o,a)},$t.removeStyles=function(e,t){t.clearRules(this.componentId+e)},$t.renderStyles=function(e,t,n,r){e>2&&Je.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},function(){var t=function(){var t=this;this._emitSheetCSS=function(){var e=t.instance.toString(),n=qe();return"<style "+[n&&'nonce="'+n+'"',Re+'="true"','data-styled-version="5.3.0"'].filter(Boolean).join(" ")+">"+e+"</style>"},this.getStyleTags=function(){return t.sealed?Ie(2):t._emitSheetCSS()},this.getStyleElement=function(){var n;if(t.sealed)return Ie(2);var r=((n={})[Re]="",n["data-styled-version"]="5.3.0",n.dangerouslySetInnerHTML={__html:t.instance.toString()},n),a=qe();return a&&(r.nonce=a),[e.createElement("style",ke({},r,{key:"sc-0-0"}))]},this.seal=function(){t.sealed=!0},this.instance=new Je({isServer:!0}),this.sealed=!1}.prototype;t.collectStyles=function(t){return this.sealed?Ie(2):e.createElement(gt,{sheet:this.instance},t)},t.interleaveWithNodeStream=function(e){return Ie(3)}}();const Ut=jt,Wt=Ft`
  0% {
    filter: hue-rotate(0);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`,Bt=Ut.div`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: repeating-linear-gradient(90deg, #fff 0 10px, #eee 10px 30px, #fff 30px 40px);
  background-size: 40px 40px;
  background-position: center;
`,Ht=Ut.div`
  --c1: hsla(0, 100%, 50%, 0.8);
  --c2: hsla(120, 100%, 50%, 0.8);
  --c3: hsla(240, 100%, 50%, 0.8);

  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(217deg, var(--c1), #fff0 70.71%),
    linear-gradient(127deg, var(--c2), #fff0 70.71%),
    linear-gradient(336deg, var(--c3), #fff0 70.71%);
  animation: ${Wt} 30s linear infinite;
`,Vt=Ut.div`
  position: relative;
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
`,qt=Ut.main`
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
`,Yt=Ut.svg`
  display: block;
  width: 100%;
  height: 100%;
`,Gt=Ut.button`
  --color: ${({primary:e})=>e?"#fff":"#000"};
  --size: ${({primary:e})=>e?"120px":"40px"};
  --border: ${({primary:e})=>e?"2px solid var(--color)":"none"};

  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: var(--border);
  background: none;
  fill: var(--color);
  transition: all 200ms;

  &:hover {
    --color: ${({primary:e})=>e?"#99f":"#f08"};
    transform: rotate(90deg) scale(1.1);
  }
  &:active {
    --color: ${({primary:e})=>e?"#ccf":"#f0f"};
    transform: rotate(180deg) scale(0.9);
  }
`,Qt=Ct`
  --fg: #fff;
  --bg: #0008;
  --fg-hover: #fff;
  --bg-hover: #000a;
  --fg-active: #fff;
  --bg-active: #000d;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;

  text-transform: capitalize;
  text-decoration: none;
  text-align: center;
  font-family: monospace;

  background: var(--bg);
  color: var(--fg);
  transition: all 200ms;

  &:hover {
    background: var(--bg-hover);
    color: var(--fg-hover);
  }
  &:active {
    background: var(--bg-active);
    color: var(--fg-active);
  }
`,Kt=Ut.div`
  position: relative;
  width: 300px;
  height: ${({big:e})=>e?"400px":"300px"};
  border: 1px solid #0008;
  border-radius: 20px;
  background: #0004;
  backdrop-filter: blur(5px);
  overflow: hidden;
`,Xt=Ft`
  0% {
    background-position: 0 0;
  }
  0% {
    background-position: 40px 40px;
  }
`,Zt=Ut.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: ${({isLoading:e})=>e?"none":"unset"};
  opacity: ${({isLoading:e})=>e?"0.5":"1"};

  &::after {
    --a: 1s ${Xt} infinite linear;

    pointer-events: ${({isLoading:e})=>e?"unset":"none"};
    opacity: ${({isLoading:e})=>e?"1":"0"};
    animation: ${({isLoading:e})=>e?"var(--a)":"unset"};

    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: repeating-linear-gradient(90deg, #fff8 0% 50%, #0008 50% 100%);
    background-position: 0 0;
    background-size: 40px 40px;
  }
`,Jt=Ut.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  width: 100%;
  padding: 0 20px;
`,en=Ut.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  padding: 0 20px;
`,tn=Ut.h2`
  text-align: center;
`,nn=Ut.div`
  z-index: -1;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  aspect-ratio: 1 / 1;
`,rn=Ut.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  mask: linear-gradient(#fff0, #fff 20% 80%, #fff0);
`,an=Ut.dl`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  padding: 0 10px;
`,on=Ct`
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
  background: #0002;
  backdrop-filter: blur(2px);
`,ln=Ut.div`
  ${on};
`,sn=Ut.div`
  ${on};
  cursor: pointer;
  background: #8088;
  transition: all 200ms;
  &:hover {
    background: #c0c8;
  }
  &:active {
    background: #f0f8;
  }
`,un=Ct`
  --x: 1px var(--с);
  text-shadow: -1px -1px var(--x), 1px -1px var(--x), -1px 1px var(--x), 1px 1px var(--x);
`,cn=Ut.dt`
  --с: #fff4;
  ${un};
  font-size: 24px;
  font-weight: bold;
  color: #111;
  font-family: monospace;
  user-select: none;
`,fn=Ut.dd`
  --с: #0008;
  ${un};
  text-align: center;
  font-size: 30px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
`,dn=Ut.div`
  position: absolute;
  top: 5px;
  right: 5px;
`,pn=Ut.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  background: linear-gradient(#fff0, #0008);
`,hn=Ut.form`
  position: relative;
  width: 100%;
  height: 100%;
`,mn=Ut.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  padding: 0 10px;
`,gn=Ut.div`
  width: 100%;
`,vn=Ut.label`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  font-size: 20px;
  font-family: monospace;
`,yn=Ut.input`
  width: 100%;
  font-size: 20px;
  font-family: sans-serif;
`,bn=Ct`
  ${Qt};
  --fg: #fff;
  --fg-hover: #fff;
  --fg-active: #111;
  width: 120px;
  height: 30px;
`,wn=Ut.button`
  ${bn};
  --bg: #f80;
  --bg-hover: #fa0;
  --bg-active: #ff0;
`,En=Ut.button`
  ${bn};
  --bg: #08f;
  --bg-hover: #0af;
  --bg-active: #0ff;
`,xn=Ut.button`
  ${bn};
  --bg: #f44;
  --bg-hover: #f66;
  --bg-active: #f88;
`,kn=(Ut.button`
  ${bn};
  --bg: #084;
  --bg-hover: #0a4;
  --bg-active: #0f4;
`,(t,n)=>({onClick:r})=>e.createElement(Gt,{onClick:r,primary:n},e.createElement(Yt,null,e.createElement("use",{href:t})))),Sn=kn("./svg/sprite.svg#icon-close"),Cn=kn("./svg/sprite.svg#icon-plus",!0),_n=({title:t,onAdd:n})=>e.createElement(Zt,{isLoading:!1},e.createElement(Jt,null,e.createElement("h2",null,t),e.createElement(Cn,{onClick:n}))),Tn=({label:t,reset:n,onInput:r,initialValue:a=""})=>{const[o,l]=e.useState(a),i=e.useRef(null);return(0,e.useEffect)((()=>{n&&l(a)}),[n]),e.createElement(gn,null,e.createElement(vn,null,t,":",e.createElement(yn,{type:"text",value:o,onInput:e=>{var t;l(e.currentTarget.value),r(e.currentTarget.value),null===(t=i.current)||void 0===t||t.reportValidity()},required:!0,ref:i})))},Nn=({initialName:t,onCancel:n,onSubmit:r})=>{const a=e.useRef(null),[o,l]=e.useState(!1),[i,s]=e.useState(t);return e.createElement(hn,{onSubmit:async e=>{if(i!==t&&a.current&&a.current.reportValidity()){l(!0);try{await r(i)}finally{l(!1)}}else e.preventDefault()},ref:a},e.createElement(Zt,{isLoading:o},e.createElement(mn,null,e.createElement(Tn,{label:"Category Name",onInput:e=>s(e),reset:!1})),e.createElement(pn,null,e.createElement(xn,{type:"button",onClick:n},"Cancel"),e.createElement(wn,{type:"submit"},t?"Update":"Create"))))};var On=n(741),Pn=n.n(On);const Rn="https://fronte-finem--english-for-kids.herokuapp.com";function An(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const Ln="fronte-finem--efk--auth-token",In=`${Rn}/api/auth`,Mn=new class{constructor(){An(this,"login",(async e=>{const t=await Pn().post(`${In}/login`,e);return t.data.accessToken&&localStorage.setItem(Ln,t.data.accessToken),t.data})),An(this,"logout",(async()=>{await Pn().get(`${In}/logout`,{headers:zn()}),localStorage.removeItem(Ln)})),An(this,"checkToken",(async()=>{try{return await Pn().get(`${In}/check-token`,{headers:zn()}),!0}catch(e){return console.log(e),localStorage.removeItem(Ln),!1}})),An(this,"getCurrentToken",(()=>localStorage.getItem(Ln)))}};function zn(){const e=Mn.getCurrentToken();return e?{"x-access-token":e}:{}}function Dn(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const $n=`${Rn}/api/category`,jn=new class{constructor(){Dn(this,"getAllCancelable",(()=>{const e=Pn().CancelToken.source();return{cancel:()=>e.cancel("get categories canceled"),getCategories:()=>Pn().get($n,{cancelToken:e.token})}})),Dn(this,"getAll",(()=>Pn().get($n))),Dn(this,"getOne",(e=>{const t=`${$n}/${e}`;return Pn().get(t)})),Dn(this,"create",(e=>{const t=zn();return Pn().post($n,e,{headers:t})})),Dn(this,"update",(e=>{const t=`${$n}/${e._id}`,n=zn();return Pn().put(t,e,{headers:n})})),Dn(this,"remove",(e=>{const t=`${$n}/${e._id}`,n=zn();return Pn().delete(t,{headers:n})}))}},Fn=({onCreate:t})=>{const[n,r]=e.useState(!1);return e.createElement(Kt,null,n?e.createElement(Nn,{initialName:"",onCancel:()=>r(!1),onSubmit:async e=>{try{const{data:n}=await jn.create({name:e});console.log(n),r(!1),t(n)}catch(e){console.log(e)}finally{console.log("end of category create request")}}}):e.createElement(_n,{title:"Add new Category",onAdd:()=>r(!0)}))};function Un(e){if(!e)return;const t=new Audio;t.src=e,t.play()}const Wn=({term:t,value:n})=>e.createElement(ln,null,e.createElement(cn,null,t,":"),e.createElement(fn,null,n)),Bn=({url:t})=>e.createElement(sn,{role:"button",tabIndex:0,onClick:()=>Un(t),onKeyDown:()=>{}},e.createElement(cn,null,"Audio 🔉:"),e.createElement(fn,null,t.replace(/.*\//,""))),Hn=({data:{category:t,words:n},onAddWord:r,onDelete:a,onUpdate:o})=>e.createElement(Zt,{isLoading:!1},e.createElement(dn,null,e.createElement(Sn,{onClick:a})),e.createElement(en,null,e.createElement(tn,null,t.name),e.createElement(an,null,e.createElement(Wn,{term:"Words",value:n.toString()}))),e.createElement(pn,null,e.createElement(wn,{type:"button",onClick:o},"Edit"),e.createElement(En,{type:"submit",onClick:r},"Edit words"))),Vn=({data:t,onUpdate:n,onDelete:r,onGoToWords:a})=>{const[o,l]=e.useState(!1),i=()=>l(!1);return e.createElement(Kt,null,o?e.createElement(Nn,{initialName:t.category.name,onCancel:i,onSubmit:async e=>{try{const r=await jn.update({...t.category,name:e});console.log(r),i();const{category:a,words:o}=t;n({words:o,category:{...a,...r.data}})}catch(e){console.log(e)}finally{console.log("end of category update request")}}}):e.createElement(Hn,{data:t,onDelete:async()=>{try{const e=await jn.remove(t.category);console.log(e),r(t.category)}catch(e){console.log(e)}finally{console.log("end of category delete request")}},onUpdate:()=>l(!0),onAddWord:()=>a(t.category)}))},qn=Ut.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-end;
    row-gap: 5px;
  }
`,Yn=Ut.div`
  position: absolute;
  right: 0;
  top: 20px;

  @media (max-width: 800px) {
    right: 50%;
    transform: translateX(50%);
    top: 90px;
  }
`,Gn=Ut.button`
  ${Qt};
  padding: 10px 30px;

  @media (max-width: 800px) {
    padding: 5px 20px;
  }
`,Qn=Ut.div`
  flex: 0 0 3px;
  width: 3px;
  height: 20px;
  background: #0004;

  @media (max-width: 600px) {
    display: none;
  }
`,Kn=Ut(se)`
  text-decoration: none;
  color: #22f;
  transition: all 200ms;

  &:hover {
    color: #fff;
  }
  &:active {
    color: #000;
  }
`,Xn=({category:t,words:n})=>{const r=X(),a=t?e.createElement(Kn,{to:"/admin"},"Categories"):e.createElement("div",null,"Categories"),o=t?e.createElement("div",null,"Words (",n||0,")"):null,l=t&&e.createElement(Qn,null);return e.createElement(qn,null,a,l,t,l,o,e.createElement(Yn,null,e.createElement(Gn,{type:"button",onClick:async()=>{await Mn.logout(),r.push("/")}},"Logout")))};let Zn;!function(e){e.INITIAL="initial",e.READY="ready",e.START="start",e.VOCALIZE="vocalize",e.MATCHING="matching",e.HIT="hit",e.MISS="miss",e.SHOW_RESULT="show result",e.END="end"}(Zn||(Zn={}));const Jn=()=>({status:Zn.INITIAL,activeRoutePath:"",activeWord:null,words:[],mistakes:0,asyncOperation:null,cancelAsyncOperation:null}),er=({status:e})=>e!==Zn.INITIAL,tr=({status:e})=>e===Zn.READY,nr=({status:e})=>e===Zn.MATCHING,rr=e=>er(e)&&!tr(e),ar=e=>rr(e)&&0===e.words.length,or=e=>ar(e)&&0===e.mistakes,lr=(e,t)=>rr(e)&&e.words.every((e=>e._id!==t));function ir(e){return e[Math.floor(Math.random()*e.length)]}let sr;!function(e){e.ENABLE="enable",e.DISABLE="disable",e.START="start",e.TO_NEXT_WORD="to next word",e.VOCALIZE="vocalize",e.TO_MATCHING="to matching",e.MATCH_WORD="match word",e.TO_RESULT_PAGE="to result page",e.TO_MAIN_PAGE="to main page",e.RESET="reset"}(sr||(sr={}));const ur=(e,t)=>{switch(t.type){case sr.ENABLE:return{...Jn(),status:Zn.READY};case sr.DISABLE:return function(e){var t;return null===(t=e.cancelAsyncOperation)||void 0===t||t.call(e),Jn()}(e);case sr.START:return function({words:e,routePath:t}){return{...Jn(),status:Zn.START,activeRoutePath:t,words:[...e]}}(t.payload);case sr.TO_NEXT_WORD:return{...e,status:Zn.VOCALIZE,activeWord:ir(e.words)};case sr.VOCALIZE:return{...e,status:Zn.VOCALIZE};case sr.TO_MATCHING:return function(e){return er(e)?{...e,status:Zn.MATCHING}:e}(e);case sr.MATCH_WORD:return function(e,{word:t}){const{activeWord:n,mistakes:r}=e,a=t._id===(null==n?void 0:n._id),o=a?e.words.filter((e=>e._id!==t._id)):e.words;return{...e,status:a?Zn.HIT:Zn.MISS,mistakes:a?r:r+1,words:o}}(e,t.payload);case sr.TO_RESULT_PAGE:return function(e,{promise:t,cancel:n}){return{...e,status:Zn.SHOW_RESULT,asyncOperation:t,cancelAsyncOperation:n}}(e,t.payload);case sr.TO_MAIN_PAGE:return function(e){return er(e)?{...e,status:Zn.END}:e}(e);case sr.RESET:return{...e,status:Zn.READY};default:return e}};function cr(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const fr=`${Rn}/api`,dr=`${fr}/category`,pr=`${fr}/words`,hr=new class{constructor(){cr(this,"getAllCancelable",(e=>{const t=Pn().CancelToken.source();return{cancel:()=>t.cancel("get words canceled"),getWords:()=>{const n=`${fr}/${e}/word`;return Pn().get(n,{cancelToken:t.token})}}})),cr(this,"getAll",(e=>{const t=e?`${dr}/${e}/word`:pr;return Pn().get(t)})),cr(this,"getOne",(e=>{const t=`${dr}/${e}/word/one`;return Pn().get(t)})),cr(this,"create",((e,t)=>{const n=`${dr}/${e}/word`,r=zn();return Pn().post(n,t,{headers:r})})),cr(this,"update",((e,t,n)=>{const r=`${dr}/${e}/word/${t}`,a=zn();return Pn().put(r,n,{headers:a})})),cr(this,"remove",((e,t)=>{const n=`${dr}/${e}/word/${t}`,r=zn();return Pn().delete(n,{headers:r})}))}},mr=()=>{const{categoryId:t}=Z(),[n,r]=(0,e.useState)(null),[a,o]=(0,e.useState)([]);return(0,e.useEffect)((()=>{(async()=>{if(t)try{const e=await jn.getOne(t),n=await hr.getAll(t);console.log("categoryApiService.getOne",e.data),r(e.data),console.log("wordApiService.getAll",n.data),o(n.data)}catch(e){console.error(e)}})()}),[t]),{category:n,words:a,setWords:o}},gr=e.createContext(void 0),vr=({children:t})=>{const{categoriesData:n,setCategoriesData:r,updateData:a}=(()=>{const[t,n]=(0,e.useState)([]),[r,a]=(0,e.useState)(0);return(0,e.useEffect)((()=>{(async()=>{try{const e=await jn.getAll();n(e.data),console.log(e.data)}catch(e){console.log(e)}})()}),[r]),{categoriesData:t,setCategoriesData:n,updateData:()=>{a((e=>e+1))}}})(),{allWords:o,setAllWords:l}=(()=>{const[t,n]=(0,e.useState)([]);return(0,e.useEffect)((()=>{(async()=>{try{const e=await hr.getAll();n(e.data)}catch(e){console.log(e)}})()}),[]),{allWords:t,setAllWords:n}})();return e.createElement(gr.Provider,{value:{categoriesData:n,setCategoriesData:r,allWords:o,setAllWords:l,updateData:a,getWords:e=>o.filter((t=>t.category===e))}},t)},yr=()=>{const t=e.useContext(gr);if(void 0===t)throw Error("DataContext must be used inside of a DataContextProvider");return t},br=(e="")=>[e,0,0,0,0],wr=([e,t,n,r,a])=>[e,t+1,n,r,a],Er=([e,t,n,r,a])=>[e,t,n+1,r,a],xr=([e,t,n,r,a])=>[e,t,n,r+1,a],kr=([e,t,n,r,a])=>[e,t,n,r+1,a+1],Sr=(e,t,n)=>{const r=t.find((([t])=>t===e))||br(e),a=t.filter((([t])=>t!==e));return a.push(n(r)),a},Cr=(e,t)=>Sr(e,t,wr),_r=(e,t)=>Sr(e,t,Er),Tr=(e,t)=>Sr(e,t,xr),Nr=(e,t)=>Sr(e,t,kr);let Or;!function(e){e.NONE="none",e.ASC="asc",e.DESC="desc"}(Or||(Or={}));const Pr=new Map([[Or.NONE,Or.ASC],[Or.ASC,Or.DESC],[Or.DESC,Or.NONE]]);let Rr;!function(e){e[e.CATEGORY=0]="CATEGORY",e[e.WORD=1]="WORD",e[e.TRANSLATION=2]="TRANSLATION",e[e.TRAIN=3]="TRAIN",e[e.ASK_COUNT=4]="ASK_COUNT",e[e.ASK_PERCENT=5]="ASK_PERCENT",e[e.FLIP_COUNT=6]="FLIP_COUNT",e[e.FLIP_PERCENT=7]="FLIP_PERCENT",e[e.GAME=8]="GAME",e[e.MATCH_COUNT=9]="MATCH_COUNT",e[e.MATCH_PERCENT=10]="MATCH_PERCENT",e[e.ERROR_COUNT=11]="ERROR_COUNT",e[e.ERROR_PERCENT=12]="ERROR_PERCENT"}(Rr||(Rr={}));const Ar=(e,t)=>Math.round(t/e*100)||0,Lr=(e,t,n)=>e.map((e=>{const r=t.find((({_id:t})=>t===e.category));if(!r)return null;const a=n.find((([t])=>t===e._id));return a?function(e,t,n){const[,r,a,o,l]=n,i=r+a,s=o-l;return{id:t._id,data:{[Rr.CATEGORY]:e,[Rr.WORD]:t.word,[Rr.TRANSLATION]:t.translation,[Rr.TRAIN]:i,[Rr.ASK_COUNT]:r,[Rr.ASK_PERCENT]:Ar(i,r),[Rr.FLIP_COUNT]:a,[Rr.FLIP_PERCENT]:Ar(i,a),[Rr.GAME]:o,[Rr.MATCH_COUNT]:l,[Rr.MATCH_PERCENT]:Ar(o,l),[Rr.ERROR_COUNT]:s,[Rr.ERROR_PERCENT]:Ar(o,s)}}}(r.name,e,a):null})).filter((e=>null!==e)),Ir=(e,t,n)=>n===Or.NONE?[...e].sort(((e,t)=>e.id.localeCompare(t.id))):[...e].sort(function(e,t){return function(n,r){if(e===Or.NONE)return 0;const[a,o]=[n.data[t],r.data[t]];return"string"==typeof a&&"string"==typeof o?e===Or.ASC?a.localeCompare(o):o.localeCompare(a):"number"==typeof a&&"number"==typeof o?e===Or.ASC?a-o:o-a:0}}(n,t)),Mr=(e,t,n)=>r=>{const a=t(r,e);n(a)},zr=e.createContext(void 0),Dr=({children:t})=>{const{categoriesData:n,allWords:r}=yr(),a=n.map((({category:e})=>e)),o=r.map((e=>br(e._id))),[l,i]=function(t,n){const[r,a]=e.useState((()=>{try{const e=window.localStorage.getItem(t);return e?JSON.parse(e):n}catch(e){return console.log(`LocalStorage: Error getting key “${t}”:`,e),n}}));return[r,e=>{try{const n=e instanceof Function?e(r):e;window.localStorage.setItem(t,JSON.stringify(n)),a(n)}catch(e){console.log(`LocalStorage: Error setting key “${t}”:`,e)}}]}("fronte-finem--efk--words-stats",o),[s,u]=e.useState(Lr(r,a,l));let c=jr(s,r);e.useEffect((()=>{const e=Lr(r,a,l);u(e),c=jr(e,r)}),[r,n,l]),0===l.length&&o.length>0&&i(o);const f={categoriesData:a,wordsData:r,wordsStats:l,extendedWordsStats:s,setExtendedWordsStats:u,askClick:Mr(l,Cr,i),flipClick:Mr(l,_r,i),gameClick:Mr(l,Tr,i),matchClick:Mr(l,Nr,i),resetStats:()=>i(l.map((([e])=>br(e)))),getDifficultWords:c};return e.createElement(zr.Provider,{value:f},t)},$r=()=>{const t=e.useContext(zr);if(void 0===t)throw Error("ExtendedWordsStatsContext must be used inside of a ExtendedWordsStatsContextProvider");return t};function jr(e,t){return(n=8)=>Ir(e,Rr.ERROR_PERCENT,Or.DESC).slice(0,n).filter((e=>e.data[Rr.ERROR_PERCENT]>0)).map((({id:e})=>t.find((t=>t._id===e))))}function Fr(){const{gameClick:t,matchClick:n}=$r(),[r,a]=e.useReducer(ur,Jn());return e.useEffect((()=>{(async()=>{switch(r.status){case Zn.START:a({type:sr.TO_NEXT_WORD});break;case Zn.VOCALIZE:!function(e,t){var n;Un((null===(n=e.activeWord)||void 0===n?void 0:n.audio)||null),t({type:sr.TO_MATCHING})}(r,a);break;case Zn.HIT:r.activeWord&&n(r.activeWord._id),function(e,t){if(ar(e)){const n=or(e)?"./sfx/win.mp3":"./sfx/fail.mp3",[r,a]=function(e){let t=()=>{};if(!e)return[Promise.resolve(),t];let n=null;return[new Promise((r=>{t=(e=>()=>{var t;n&&(n.onended=null),null===(t=n)||void 0===t||t.pause(),n=null,e()})(r),n=new Audio,n.src=e,n.onended=()=>r(),n.play()})),t]}(n);t({type:sr.TO_RESULT_PAGE,payload:{promise:r,cancel:a}})}else Un("./sfx/yes.mp3"),t({type:sr.TO_NEXT_WORD})}(r,a);break;case Zn.MISS:r.activeWord&&t(r.activeWord._id),function(e){Un("./sfx/no.mp3"),e({type:sr.TO_MATCHING})}(a);break;case Zn.SHOW_RESULT:await async function({asyncOperation:e},t){await e,t({type:sr.TO_MAIN_PAGE})}(r,a)}})()}),[r]),[r,a]}const Ur=e.createContext(void 0),Wr=({children:t})=>{const[n,r]=Fr();return e.createElement(Ur.Provider,{value:{gameState:n,dispatch:r}},t)},Br=()=>{const t=e.useContext(Ur);if(void 0===t)throw Error("GameContext must be used inside of a GameContextProvider");return t},Hr=Ut.button`
  --size: 30px;
  --pos: 5%;
  --left: -110%;
  --right: 10%;

  position: relative;
  width: 150px;
  height: 50px;
  border: 5px solid #222;
  border-radius: var(--size);
  background: transparent;
  overflow: hidden;

  &.second {
    --pos: calc(95% - var(--size));
    --left: 10%;
    --right: -110%;
  }
`,Vr=Ut.div`
  position: absolute;
  top: calc(50% - var(--size) / 2);
  left: var(--pos);
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: #222;
  transition: 300ms;
`,qr=Ut.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 24px;
  transition: 300ms;
`,Yr=Ut(qr)`
  right: var(--right);
`,Gr=Ut(qr)`
  left: var(--left);
`,Qr=()=>{const{gameState:t,dispatch:n}=Br(),r=er(t),a=r?"second":"";return e.createElement(Hr,{className:a,onClick:()=>{n({type:r?sr.DISABLE:sr.ENABLE})}},e.createElement(Yr,null,"train"),e.createElement(Gr,null,"play"),e.createElement(Vr,null))},Kr=Ut.button`
  --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --color-background: ${({isPrimary:e})=>e?"#fc8":"#8cf"};
  --color-foreground: #111;
  --icon-rotate: 0deg;
  --btn-width: ${({isPrimary:e})=>e?"220px":"240px"};

  --time: 300ms;

  display: block;
  width: auto;
  border-radius: 10px;
  border: 3px solid var(--color-foreground);
  background: var(--color-background);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all var(--time);

  &:hover {
    --color-background: ${({isPrimary:e})=>e?"#f80":"#08f"};
    --color-foreground: #000;
    --icon-rotate: 180deg;
  }
  &:active {
    --color-background: ${({isPrimary:e})=>e?"#ff0":"#0ff"};
    --color-foreground: #444;
    --icon-rotate: 360deg;
  }
`,Xr=Ut.div`
  width: var(--btn-width);
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
  grid-template-rows: 30px;
  align-items: center;
  column-gap: 5px;
  color: var(--color-foreground);
  transition: all var(--time);
`,Zr=Ut.div`
  display: block;
  &:first-child {
    justify-self: flex-end;
  }
  &:last-child {
    justify-self: flex-start;
    transform: scale(-1, 1);
  }
`,Jr=Ut.div`
  position: relative;
  display: block;
  width: 50px;
  height: 50px;
  overflow: hidden;
`,ea=Ut.svg`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid var(--color-foreground);
  color: var(--color-foreground);
  fill: var(--color-background);
  transition: all var(--time), transform var(--time);
  transition-timing-function: linear, var(--ease-out-back);
  transform: rotate(var(--icon-rotate));
`,ta=({onClick:t,isStart:n=!1})=>{const r=n?"START":"REPEAT",a=n?"./svg/sprite.svg#icon-start":"./svg/sprite.svg#icon-repeat";return e.createElement(Kr,{onClick:t,isPrimary:n},e.createElement(Xr,null,e.createElement(Zr,null,r),e.createElement(Jr,null,e.createElement(ea,null,e.createElement("use",{href:a}))),e.createElement(Zr,null,r)))},na=Ut.header`
  height: 100px;
  border-bottom: 3px solid #111;
  background: #fff8;
  backdrop-filter: invert(1);
`,ra=Ut.div`
  --ofsset: 100px;
  position: relative;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 10px var(--ofsset);

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  transform-style: preserve-3d;
  perspective: 300px;

  @media (max-width: 800px) {
    --ofsset: 50px;
  }
  @media (max-width: 400px) {
    --ofsset: 20px;
  }
`,aa=Ut(oe)`
  text-decoration: none;
  font-weight: bold;
  color: #111;
  transition: all 300ms;

  &:hover {
    color: #00f;
  }
  &:active {
    color: #08f;
  }
`,oa=Ut.h1`
  flex: 1 0 100%;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 800px) {
    display: none;
  }
`,la=Ut.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms;
  transform: ${({isHidden:e})=>e?"translate(-50%, 50%) rotateX(100deg)":"translate(-50%, 50%) rotateX(0deg)"};
  // opacity: ${({isHidden:e})=>e?"0":"1"};
  pointer-events: ${({isHidden:e})=>e?"none":"all"};
`,ia=Ut.div`
  position: absolute;
  right: 20px;
  top: 20px;
`,sa=({children:t,className:n,isAdmin:r=!1,showBtnStartRepeat:a=!1,onStartRepeat:o=(()=>{})})=>{const{gameState:l}=Br();return e.createElement(na,{className:n},e.createElement(ra,null,r?t:e.createElement(e.Fragment,null,e.createElement(oa,null,e.createElement(aa,{to:"/"},"English for kids")),t,e.createElement(la,{isHidden:!a},e.createElement(ta,{onClick:o,isStart:!rr(l)})),e.createElement(ia,null,e.createElement(Qr,null)))))},ua="500ms",ca=Ut.div`
  --opacity: ${({show:e})=>e?"1":"0"};
  --pointer-events: ${({show:e})=>e?"all":"none"};

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: #000a;
  backdrop-filter: blur(10px);
  opacity: var(--opacity);
  pointer-events: var(--pointer-events);

  transition: all ${ua} linear;
`,fa=Ut.section`
  --pos: ${({show:e})=>e?"50%":"-50%"};
  --c1: #08f;
  --c2: #024;

  position: fixed;
  top: var(--pos);
  left: 50%;
  min-width: 300px;
  width: min(calc(100% - 40px), 500px);
  transform: translate(-50%, -50%);
  z-index: 11;
  background: var(--c1);
  color: var(--c2);
  clip-path: inset(0% 0% 0% 0% round 20px);

  transition: all ${ua};
`,da=Ut.header`
  position: relative;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--c2);
  color: var(--c1);
`,pa=Ut.div`
  height: 300px;
  padding: 20px 20px;
`,ha=Ut.footer`
  height: 50px;
  background: var(--c2);
  color: var(--c1);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`,ma=Ut.div`
  position: absolute;
  top: 5px;
  right: 5px;
`,ga=e.createContext(void 0),va=({children:t})=>{const[n,r]=e.useState(!1),[a,o]=e.useState(""),l=e.useRef(null),i={modalShow:n,setModalShow:r,setModalContent:o};return e.useEffect((()=>{document.body.classList.toggle("modal",n)}),[n]),e.createElement(ga.Provider,{value:i},t,e.createElement(ca,{show:n,onClick:e=>{l.current&&l.current.contains(e.target)||r(!1)}}),e.createElement(fa,{show:n,ref:l},a))},ya=()=>{const t=e.useContext(ga);if(void 0===t)throw Error("ModalContext must be used inside of a ModalContextProvider");return t},ba=({title:t,children:n,footer:r})=>{const{setModalShow:a}=ya();return e.createElement(e.Fragment,null,e.createElement(da,null,e.createElement("h3",null,t),e.createElement(ma,null,e.createElement(Sn,{onClick:()=>a(!1)}))),e.createElement(pa,null,n),e.createElement(ha,null,r))},wa=Ut.form`
  width: 100%;
  height: 100%;
`,Ea=Ut.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, auto) 1fr;
  row-gap: 20px;
  width: 100%;
  height: 100%;
`,xa=Ut.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, auto);
  column-gap: 10px;
  row-gap: 10px;
`,ka=Ut.label`
  display: block;
`,Sa=Ut.input`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 0;
  outline: 0;
  font-size: 30px;

  background: ${({isError:e})=>e?"#f84":"#fff"};
  box-shadow: 0 0 0 5px ${({isError:e})=>e?"#0004":"#fff1"};

  &::placeholder {
    color: #0004;
  }
`,Ca=Ut.div`
  align-self: flex-end;
`,_a=Ut.div`
  color: #f00;
`,Ta=Ct`
  ${Qt};
  --fg: #fff;
  --fg-hover: #fff;
  --fg-active: #111;
  width: 120px;
  height: 30px;
`,Na=Ut.button`
  ${Ta};
  --bg: #f44;
  --bg-hover: #f66;
  --bg-active: #f88;
`,Oa=Ut.button`
  ${Ta};
  --bg: #084;
  --bg-hover: #0a4;
  --bg-active: #0f4;
`,Pa=()=>{const{setModalShow:t}=ya(),[n,r]=(0,e.useState)(!1),[a,o]=(0,e.useState)(!1),[l,i]=(0,e.useState)(""),[s,u]=(0,e.useState)(""),[c,f]=(0,e.useState)(""),[d,p]=(0,e.useState)(!1),h=e.useRef(null),m=e.useRef(null),g=e.useRef(null),v=X(),y="username",b="password",w="login-form",E=e.createElement(e.Fragment,null,e.createElement(Na,{type:"button",disabled:d,onClick:()=>{u(""),f(""),i(""),r(!1),o(!1)}},"Cancel"),e.createElement(Oa,{type:"submit",disabled:d,form:w,onClick:e=>{var t,n,a;null!==(t=g.current)&&void 0!==t&&t.reportValidity()||(e.preventDefault(),r(!(null!==(n=h.current)&&void 0!==n&&n.reportValidity())),o(!(null!==(a=m.current)&&void 0!==a&&a.reportValidity())))}},"Login"));return e.createElement(ba,{title:"Login",footer:E},e.createElement(wa,{id:w,onSubmit:async e=>{if(e.preventDefault(),s&&c){p(!0);try{const e=await Mn.login({username:s,password:c});i(""),console.log(e),t(!1),v.push("/admin")}catch(e){i(function(e){return"string"==typeof e?e:e instanceof Error?e.message:String(e)}(e)),console.error(e)}finally{p(!1)}}},ref:g},e.createElement(Ea,null,e.createElement(xa,null,e.createElement(ka,{htmlFor:y},"username"),e.createElement(Sa,{onInput:e=>{var t;u(e.currentTarget.value),r(!(null!==(t=h.current)&&void 0!==t&&t.reportValidity()))},type:"text",value:s,placeholder:"admin",required:!0,id:y,isError:n,ref:h})),e.createElement(xa,null,e.createElement(ka,{htmlFor:b},"password"),e.createElement(Sa,{onInput:e=>{var t;f(e.currentTarget.value),o(!(null!==(t=m.current)&&void 0!==t&&t.reportValidity()))},type:"password",value:c,placeholder:"admin",required:!0,id:b,isError:a,ref:m})),e.createElement(Ca,null,l?e.createElement(_a,null,l):null))))},Ra="placeholder",Aa=e=>t=>t===Ra?e:t,La=Aa("./placeholder/image.svg"),Ia=Aa("./placeholder/audio.mp3"),Ma=({path:t,className:n,onClick:r,children:a})=>e.createElement(se,{className:n,to:`/category/${t}`,onClick:r,draggable:!1},a),za=Ut.nav`
  --w: 300px;
  --ofsset: 20px;

  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--w);
  transition: all 500ms;
  background: linear-gradient(#777, #999, #777);

  display: flex;
  flex-direction: column;
  row-gap: 40px;

  @supports (backdrop-filter: none) {
    background: #0008;
    backdrop-filter: blur(10px);
  }

  &.close {
    left: -300px;
    --ofsset: -100px;
  }
`,Da=Ut.div`
  position: absolute;
  left: 20px;
  top: 20px;
`,$a=Ut.button`
  ${Qt};
  --fg: #fff;
  --bg: #f80;
  --fg-hover: #fff;
  --bg-hover: #fa0;
  --fg-active: #111;
  --bg-active: #ff0;
  padding: 10px 30px;
`,ja=Ut.div`
  position: absolute;
  right: var(--ofsset);
  top: 20px;
  transition: all 500ms;
`,Fa=Ut.div`
  display: flex;
  flex-direction: column;
  padding: 100px 0 0;
  row-gap: 20px;
`,Ua=Ut.h3`
  color: #fff;
  text-align: center;
  text-transform: uppercase;
`,Wa=Ut.ul`
  padding: 0 0 20px;
  height: 300px;
  overflow: auto;
`,Ba=Ut.li`
  position: relative;
  display: block;
  user-select: none;
`,Ha=Ct`
  display: block;
  padding: 10px 20px;
  background: #fff;
  color: #000;
  text-decoration: none;
  transition: all 300ms;

  &:hover {
    background: #00f;
    color: #fff;
  }
  &:active {
    background: #08f;
  }
  &.active {
    background: #000;
    color: #fff;
    pointer-events: none;
  }
`,Va=Ut(se).attrs({draggable:!1})`
  ${Ha};
`,qa=Ut(Ma)`
  ${Ha};
  position: relative;
  background: linear-gradient(90deg, #fff 20%, #fff0 80%);
  font-size: 30px;
  overflow: hidden;

  &:hover {
    background: #00f8;
  }
  &:active {
    background: #08f8;
  }
  &.active {
    background: #0008;
  }
`,Ya=Ut.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  pointer-events: none;
  mask-image: linear-gradient(90deg, #fff0, #000);
`,Ga=({categoryId:t,text:n,words:r,onClick:a})=>{const o=r.length?La(r[0].image):La(Ra);return e.createElement(qa,{path:t,onClick:a},n,o&&e.createElement(Ya,{src:o,alt:n}))},Qa=e=>new Promise((t=>{setTimeout(t,e)})),Ka=Ut.button`
  --scale-x: scaleX(1.5);
  --stripe-s: 5px;
  --stripe-w: calc(50% + var(--stripe-s));
  --stripe-h: calc(2 * var(--stripe-s));
  --stripe-c: #111;
  --time: 300ms;

  position: relative;
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  background: transparent;

  &.close {
    --middle: scaleX(0);
    --clockwise: rotate(45deg) scaleX(1.4142);
    --counter-clockwise: rotate(-45deg) scaleX(1.4142);
    --scale-x: scaleX(1);
    --stripe-c: #eee;
  }
`,Xa=Ut.span`
  position: absolute;
  top: 0;
  left: -50%;
  width: 100%;
  height: 100%;
  transition: all var(--time) ease-in-out;
  transform: translateX(50%) var(--scale-x);
`,Za=Ut.span`
  display: block;
  position: absolute;
  width: var(--stripe-w);
  height: var(--stripe-h);
  background: var(--stripe-c);
  border-radius: var(--stripe-s);
  transition: all var(--time) ease-in-out;
`,Ja=Ut(Za)`
  top: calc(50% - var(--stripe-s));
  width: 100%;
  transform-origin: center;
  transform: var(--middle);
`,eo=Ct`
  left: 0;
  transform-origin: var(--stripe-s) var(--stripe-s);
`,to=Ct`
  right: 0;
  transform-origin: calc(100% - var(--stripe-s)) var(--stripe-s);
`,no=Ct`
  top: 0;
`,ro=Ct`
  bottom: 0;
`,ao=Ut(Za)`
  ${no}
  ${eo}
  transform: var(--clockwise);
`,oo=Ut(Za)`
  ${no}
  ${to}
  transform: var(--counter-clockwise);
`,lo=Ut(Za)`
  ${ro}
  ${eo}
  transform: var(--counter-clockwise);
`,io=Ut(Za)`
  ${ro}
  ${to}
  transform: var(--clockwise);
`,so=({className:t,isClosed:n,onToggle:r})=>{const a=`${t||""} ${n?"":"close"}`;return e.createElement(Ka,{className:a,onClick:r},e.createElement(Xa,null,e.createElement(ao,null),e.createElement(oo,null),e.createElement(Ja,null),e.createElement(lo,null),e.createElement(io,null)))},uo=({className:t})=>{const n=Mn.getCurrentToken(),r=X(),{setModalShow:a,setModalContent:o}=ya(),{ref:l,isClosed:i,setClose:s}=function(){const t=e.createRef(),[n,r]=(0,e.useState)(!0),a=e=>{var a;n||null!==(a=t.current)&&void 0!==a&&a.contains(e.target)||r(!0)},o=e=>{"Escape"===e.code&&r(!0)};return(0,e.useEffect)((()=>(document.documentElement.addEventListener("keydown",o),document.documentElement.addEventListener("click",a),()=>{document.documentElement.removeEventListener("keydown",o),document.documentElement.removeEventListener("click",a)})),[t]),{ref:t,isClosed:n,setClose:r}}(),{categoriesData:u,getWords:c}=yr(),[f,d]=(0,e.useState)(u.slice(0,6)),p=`${t||""} ${i?"close":""}`,h=()=>s(!0),m=async()=>{if(f.length>=u.length)return;await Qa(500);const{length:e}=f;d(u.slice(0,e+6))};return(0,e.useEffect)((()=>{(async()=>{await m()})()}),[u]),e.createElement(za,{className:p,ref:l},e.createElement(Da,null,n?e.createElement($a,{type:"button",onClick:async()=>{await Mn.logout(),r.push("/")}},"Logout"):e.createElement($a,{type:"button",onClick:()=>{o(e.createElement(Pa,null)),a(!0)}},"Login")),e.createElement(ja,null,e.createElement(so,{isClosed:i,onToggle:()=>s(!i)})),e.createElement(Fa,null,n&&e.createElement(Ua,null,"Hello, admin! 🙃"),n&&e.createElement(Va,{to:"/admin",onClick:h},"Admin page"),e.createElement(Va,{exact:!0,to:"/",onClick:h},"Home"),e.createElement(Va,{exact:!0,to:"/statistic",onClick:h},"Statistic")),e.createElement(Ua,null,"Categories:"),e.createElement(Wa,{id:"scrollable-list"},e.createElement(me,{next:m,dataLength:f.length,hasMore:f.length<u.length,loader:e.createElement("h4",null,"Loading..."),scrollableTarget:"scrollable-list",style:{display:"flex",flexDirection:"column",rowGap:"10px"}},f.map((({category:t})=>e.createElement(Ba,{key:t._id},e.createElement(Ga,{categoryId:t._id,text:t.name,words:c(t._id),onClick:h})))))))};function co(e,t,n){const r=n(t),a=e.findIndex(r);return a<0?e:[...e.slice(0,a),t,...e.slice(a+1)]}const fo=Ut.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 40px;

  height: 700px;
  overflow: auto;

  //display: flex;
  //flex-wrap: wrap;
  //gap: 20px;
  //justify-content: center;

  @media (max-width: 800px) {
    padding: 40px 25px;
  }
  @media (max-width: 600px) {
    padding: 40px 15px;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
  }
`,po=()=>{const{categoriesData:t,setCategoriesData:n,updateData:r}=yr(),[a,o]=(0,e.useState)(t.slice(0,8)),l=X(),i=Mn.getCurrentToken();(0,e.useEffect)((()=>{r()}),[]);const s=e=>{n(co(t,e,(e=>t=>e.category._id===t.category._id)))},u=e=>{n(t.filter((({category:t})=>t._id!==e._id)))},c=e=>{l.push(`/admin/category/${e._id}`)},f=async()=>{if(a.length>=t.length)return;await Qa(500);const{length:e}=a;o(t.slice(0,e+8))};(0,e.useEffect)((()=>{(async()=>{await f()})()}),[t]);const d=[...a.map((t=>e.createElement(Vn,{key:t.category.name,data:t,onUpdate:s,onDelete:u,onGoToWords:c}))),e.createElement(Fn,{key:"creator",onCreate:e=>{n([...t,{category:e,words:0}])}})],p=e.createElement(e.Fragment,null,e.createElement(uo,null),e.createElement(sa,{isAdmin:!0},e.createElement(Xn,null)),e.createElement(qt,null,e.createElement(fo,{id:"scrollable-categories-list"},e.createElement(me,{next:f,dataLength:a.length,hasMore:a.length<t.length,loader:e.createElement("h4",null,"Loading..."),scrollableTarget:"scrollable-categories-list",style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gridGap:"20px"}},d))));return i?p:e.createElement(H,{to:"/"})},ho=({label:t,accept:n,onInput:r,reset:a,required:o=!0})=>{const[l,i]=e.useState(null),s=e.useRef(null);return(0,e.useEffect)((()=>{a&&(i(null),s.current&&(s.current.value=""))}),[a]),e.createElement(gn,null,e.createElement(vn,null,t,": ",null==l?void 0:l.name,e.createElement(yn,{type:"file",accept:n,onInput:()=>{var e;const t=null===(e=s.current)||void 0===e?void 0:e.files;t&&(i(t[0]),r(t[0]))},required:o,ref:s})))},mo=({initialWord:t,onSubmit:n,onCancel:r,isFilesRequired:a=!1})=>{const o=e.useRef(null),[l,i]=e.useState(!1),[s,u]=e.useState(!1),[c,f]=e.useState({word:(null==t?void 0:t.word)||"",translation:(null==t?void 0:t.translation)||""}),[d,p]=e.useState({image:null,audio:null}),h=e=>t=>{i(!1),f({...c,[e]:t})},m=e=>t=>{i(!1),p({...d,[e]:t})};return e.createElement(hn,{onSubmit:async e=>{if(o.current&&o.current.reportValidity()){u(!0);try{await n({...c,...d})}finally{u(!1)}}else e.preventDefault()},ref:o},e.createElement(Zt,{isLoading:s},e.createElement(mn,null,e.createElement(Tn,{label:"word",onInput:h("word"),reset:l,initialValue:c.word}),e.createElement(Tn,{label:"translation",onInput:h("translation"),reset:l,initialValue:c.translation}),e.createElement(ho,{label:"audio",accept:"audio/*",onInput:m("audio"),reset:l,required:a}),e.createElement(ho,{label:"image",accept:"image/*",onInput:m("image"),reset:l,required:a})),e.createElement(pn,null,e.createElement(xn,{type:"button",onClick:()=>{i(!0),r()}},"Cancel"),e.createElement(wn,{type:"submit"},t?"Update":"Create"))))},go=`${Rn}/api/media/upload`;async function vo(e){const t=zn(),n=new FormData;n.append("media",e,e.name);const r=await Pn().post(go,n,{headers:t});return console.log(r),r}const yo=({onCreate:t})=>{const{categoryId:n}=Z(),[r,a]=e.useState(!1);return e.createElement(Kt,{big:!0},r?e.createElement(mo,{onSubmit:async({image:e,audio:r,...o})=>{try{const l=e?(await vo(e)).data:Ra,i=r?(await vo(r)).data:Ra,{data:s}=await hr.create(n,{...o,image:l,audio:i});console.log(s),a(!1),t(s)}catch(e){console.log(e)}finally{console.log("end of word create request")}},onCancel:()=>a(!1)}):e.createElement(_n,{title:"Add new Word",onAdd:()=>a(!0)}))},bo=({initialWord:t,onEdit:n,onDelete:r})=>e.createElement(Zt,{isLoading:!1},e.createElement(nn,null,e.createElement(rn,{src:La(t.image),alt:t.word})),e.createElement(dn,null,e.createElement(Sn,{onClick:r})),e.createElement(an,null,e.createElement(Wn,{term:"Word",value:t.word}),e.createElement(Wn,{term:"Translation",value:t.translation}),e.createElement(Bn,{url:Ia(t.audio)})),e.createElement(pn,null,e.createElement(wn,{type:"button",onClick:n},"Edit"))),wo=({initialWord:t,onUpdate:n,onDelete:r})=>{const a=t._id,{categoryId:o}=Z(),[l,i]=e.useState(!1);return e.createElement(Kt,{big:!0},l?e.createElement(mo,{initialWord:t,onSubmit:async({image:e,audio:r,...l})=>{try{const s=e&&await vo(e),u=r&&await vo(r),{data:c}=await hr.update(o,a,{...l,image:(null==s?void 0:s.data)||t.image,audio:(null==u?void 0:u.data)||t.audio});console.log(c),i(!1),n(c)}catch(e){console.log(e)}finally{console.log("end of word update request")}},onCancel:()=>i(!1)}):e.createElement(bo,{initialWord:t,onEdit:()=>i(!0),onDelete:async()=>{try{const e=await hr.remove(o,a);console.log(e),r(a)}catch(e){console.log(e)}finally{console.log("end of word delete request")}}}))},Eo=()=>{const t=Mn.getCurrentToken(),{category:n,words:r,setWords:a}=mr(),[o,l]=(0,e.useState)(r.slice(0,8)),i=e=>{a(r.filter((t=>t._id!==e)))},s=e=>{a(co(r,e,(e=>t=>e._id===t._id)))},u=async()=>{if(o.length>=r.length)return;await Qa(500);const{length:e}=o;l(r.slice(0,e+8))};(0,e.useEffect)((()=>{(async()=>{await u()})()}),[r]);const c=[...o.map((t=>e.createElement(wo,{key:t.word,initialWord:t,onUpdate:s,onDelete:i}))),e.createElement(yo,{key:"add new word",onCreate:e=>{a([...r,e])}})],f=e.createElement(e.Fragment,null,e.createElement(uo,null),e.createElement(sa,{isAdmin:!0},e.createElement(Xn,{category:null==n?void 0:n.name,words:r.length})),e.createElement(qt,null,e.createElement(fo,{id:"scrollable-words-list"},e.createElement(me,{next:u,dataLength:o.length,hasMore:o.length<r.length,loader:e.createElement("h4",null,"Loading..."),scrollableTarget:"scrollable-words-list",style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gridGap:"20px"}},c))));return t?f:e.createElement(H,{to:"/"})},xo=Ut.footer`
  --c1: hsl(30deg, 100%, 50%);
  --c2: hsl(240deg, 100%, 75%);
  --c3: #111;
  --text-color: var(--c1);
  --icon-color: var(--c2);
  --time: 300ms;

  background-image: repeating-linear-gradient(180deg, var(--c3) 0px 3px, #fff0 3px 10px);
  background-size: 10px 10px;
  background-position: center;
`,ko=Ut.div`
  --h: 80px;
  --ofsset: 100px;
  position: relative;
  max-width: 1400px;
  width: 100%;
  height: var(--h);
  margin: 0 auto;
  padding: 0 var(--ofsset);

  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;

  @media (max-width: 1000px) {
    --h: 140px;
    --ofsset: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 500px) {
    --ofsset: 20px;
  }
`,So=Ut.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
`,Co=Ut.a`
  display: grid;
  grid-template-columns: auto 1fr;
  background-color: var(--c3);
  color: var(--text-color);
  text-decoration: none;
  transition: all var(--time);
  white-space: nowrap;

  &:hover {
    --text-color: var(--c2);
  }

  &.rss {
    width: 200px;
    height: 100%;
    overflow: hidden;
    align-items: center;
    position: relative;
    margin-right: auto;
    padding: 5px 60px 5px 30px;
    &:hover {
      letter-spacing: 2px;
    }

    @media (max-width: 1000px) {
      margin-right: 0;
    }
  }

  &.github {
    height: 40px;
    align-items: center;
    column-gap: 10px;
    padding: 0 20px 0 0;
    border-radius: 20px;
  }
`,_o=Ut.svg`
  order: -1;
  fill: var(--text-color);
  transition: all var(--time);

  &.rss {
    height: 40px;
    width: 108px;
  }

  &.github {
    width: 40px;
    height: 40px;
  }
`,To=Ut.div`
  display: block;

  &.rss {
    position: absolute;
    left: 138px;
    top: 43%;
    font-size: 27px;
    font-weight: 900;
  }

  &.github {
    font-weight: 300;
  }

  .spoiler {
    @media (max-width: 600px) {
      display: none;
    }
  }
`,No="./svg/sprite.svg#icon-github",Oo=({className:t})=>e.createElement(xo,{className:t},e.createElement(ko,null,e.createElement(Co,{className:"rss",href:"https://rs.school/js/"},e.createElement(_o,{className:"rss"},e.createElement("use",{href:"./svg/sprite.svg#icon-rs-school-js"})),e.createElement(To,{className:"rss"},"'21")),e.createElement(So,null,e.createElement(Co,{className:"github",href:"https://github.com/dimonwhite"},e.createElement(_o,{className:"github"},e.createElement("use",{href:No})),e.createElement(To,{className:"github"},"mentor",e.createElement("span",{className:"spoiler"},": ","dimonwhite"))),e.createElement(Co,{className:"github",href:"https://github.com/fronte-finem"},e.createElement(_o,{className:"github"},e.createElement("use",{href:No})),e.createElement(To,{className:"github"},"student",e.createElement("span",{className:"spoiler"},": ","fronte-finem")))))),Po=Ft`
  0% {
    transform: rotate3d(0,0,0,0deg);
    transform-origin: center;
  }
  25% {
    transform: rotate3d(0,1,0,10deg);
    transform-origin: left;
  }
  50% {
    transform-origin: center;
  }
  75% {
    transform: rotate3d(0,1,0,-10deg);
    transform-origin: right;
  }
  100% {
    transform: rotate3d(0,0,0,0deg);
    transform-origin: center;
  }
`,Ro=Ut.div.attrs((e=>({delay:e.delay||Math.random()})))`
  --delay: ${e=>e.delay}s;
  position: relative;
  width: 100%;
  height: 100%;
`,Ao=Ut(Ma)`
  --aspect-ratio: 1 / 1;
  --path: inset(0% 0% 0% 0% round 50%);
  --name-bg: #fff0;
  --font-bg: #0004;
  --name-sz: 70px;
  --name-radius: 50%;
  --play-scale: 0;
  --play-bg: #0008;

  &:hover {
    --path: inset(0% 0% 0% 0% round 25%);
    --name-bg: #fff2;
    --font-bg: #0008;
    --name-sz: 100px;
    --name-radius: 50px;
    --play-bg: #000a;
  }

  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  user-select: none;
  aspect-ratio: var(--aspect-ratio);
  transition: 300ms;
  transform-style: preserve-3d;

  &.game {
    --play-scale: 1;
    animation: 2s ${Po} var(--delay) linear infinite;
  }

  &::after {
    content: 'play';
    position: absolute;
    display: block;
    bottom: 0;
    left: 50%;
    padding: 10px 20px;
    transform: translateX(-50%) translateZ(30px) scale(var(--play-scale));
    background: var(--play-bg);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: 100%;
    transition: 300ms;
  }
`,Lo=Ut.img.attrs({draggable:!1})`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: var(--path);
  transition: 300ms;
`,Io=Ut.div`
  --h: 70px;
  position: absolute;
  top: calc(50% - var(--name-sz) / 2);
  width: 100%;
  height: var(--name-sz);
  background-color: var(--font-bg);
  border-radius: var(--name-radius);
  overflow: hidden;
  border: 5px solid #0008;
  //clip-path: var(--path);
  //transform: translateZ(50px) scale(0.95);
  transition: 300ms;
`,Mo=Ut.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: #fff8;
  background-image: linear-gradient(90deg, #fff1, #fff, #fff1);
  color: #000;
  mix-blend-mode: screen;
  //backdrop-filter: blur(2px);
  font-size: calc(var(--h) / 2);
  font-weight: bold;
  transition: 300ms;
`,zo=({className:t,isGameMode:n,data:r,words:a})=>{const{category:o}=r,l=a.length?La(a[0].image):La(Ra);return e.createElement(Ro,{className:t},e.createElement(Ao,{className:n?"game":"",path:o._id},e.createElement(Lo,{src:l,alt:o.name}),e.createElement(Io,null,e.createElement(Mo,null,o.name),e.createElement("div",null,"Words: ",r.words))))},Do=Ut.ul`
  padding: 50px 20px;
  //overflow: hidden;
  height: 700px;
  overflow: auto;
`,$o=Ut.li`
  display: block;
  flex: 0 0 ${300}px;
  perspective: ${900}px;
`,jo=({className:t})=>{const{categoriesData:n,getWords:r}=yr(),[a,o]=(0,e.useState)(n.slice(0,8)),{gameState:l}=Br(),i=async()=>{if(a.length>=n.length)return;await Qa(500);const{length:e}=a;o(n.slice(0,e+8))};return(0,e.useEffect)((()=>{(async()=>{await i()})()}),[n]),e.createElement(e.Fragment,null,e.createElement(uo,null),e.createElement(sa,null),e.createElement(qt,null,e.createElement("nav",{className:t},e.createElement(Do,{id:"scrollable-categories-list"},e.createElement(me,{next:i,dataLength:a.length,hasMore:a.length<n.length,loader:e.createElement("h4",null,"Loading..."),scrollableTarget:"scrollable-categories-list",style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gridGap:"20px"}},a.map((t=>e.createElement($o,{key:t.category._id},e.createElement(zo,{data:t,isGameMode:er(l),words:r(t.category._id)})))))))))},Fo=Ct`
  &::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    padding: 2px;
  }

  &::-webkit-scrollbar-track {
    background-color: #0002;
  }

  &::-webkit-scrollbar-thumb {
    background: #0004;
    box-shadow: inset 0 0 5px #0008;
    &:hover {
      background: #0006;
    }
    &:active {
      background: #0008;
    }
  }
  &::-webkit-scrollbar-corner {
    background: #fff0;
  }
`,Uo=Ct`
  ${Qt};
  width: 300px;
  height: 50px;
`,Wo=Ut.button`
  ${Uo};
`,Bo=Ut(oe)`
  ${Uo};
`,Ho=Ut.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  width: 100%;
  padding: 20px 0;

  @media (max-width: 800px) {
    flex-direction: column;
    row-gap: 20px;
  }
`,Vo=Ut.div`
  max-width: 1400px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 50px;

  @media (max-width: 800px) {
    padding: 50px 25px;
  }
  @media (max-width: 600px) {
    padding: 50px 15px;
  }
  @media (max-width: 400px) {
    padding: 50px 5px;
  }
`,qo=Ut.div`
  overflow-x: auto;
  height: 70vh;
  ${Fo};
`,Yo=Ct`
  --c-1-a-hue: 240;
  --c-1-b-hue: 280;
  --c-1-c-hue: 320;

  --c-2-a-hue: 80;
  --c-2-b-hue: 40;
  --c-2-c-hue: 0;

  --c-bg-a-sl: 70%, 30%;
  --c-bg-b-sl: 80%, 70%;
  --c-bg-c-sl: 90%, 80%;

  --c-fg-a-sl: 70%, 90%;
  --c-fg-b-sl: 80%, 10%;
  --c-fg-c-sl: 90%, 20%;

  --bg-o: 1;

  --c-bg-train-all: hsla(var(--c-1-a-hue), var(--c-bg-a-sl), var(--bg-o));
  --c-bg-train-ask-a: hsla(var(--c-1-b-hue), var(--c-bg-b-sl), var(--bg-o));
  --c-bg-train-ask-b: hsla(var(--c-1-b-hue), var(--c-bg-c-sl), var(--bg-o));
  --c-bg-train-flip-a: hsla(var(--c-1-c-hue), var(--c-bg-b-sl), var(--bg-o));
  --c-bg-train-flip-b: hsla(var(--c-1-c-hue), var(--c-bg-c-sl), var(--bg-o));

  --c-fg-train-all: hsl(var(--c-1-a-hue), var(--c-fg-a-sl));
  --c-fg-train-ask-a: hsl(var(--c-1-b-hue), var(--c-fg-b-sl));
  --c-fg-train-ask-b: hsl(var(--c-1-b-hue), var(--c-fg-c-sl));
  --c-fg-train-flip-a: hsl(var(--c-1-c-hue), var(--c-fg-b-sl));
  --c-fg-train-flip-b: hsl(var(--c-1-c-hue), var(--c-fg-c-sl));

  --c-bg-game-all: hsla(var(--c-2-a-hue), var(--c-bg-a-sl), var(--bg-o));
  --c-bg-game-match-a: hsla(var(--c-2-b-hue), var(--c-bg-b-sl), var(--bg-o));
  --c-bg-game-match-b: hsla(var(--c-2-b-hue), var(--c-bg-c-sl), var(--bg-o));
  --c-bg-game-error-a: hsla(var(--c-2-c-hue), var(--c-bg-b-sl), var(--bg-o));
  --c-bg-game-error-b: hsla(var(--c-2-c-hue), var(--c-bg-c-sl), var(--bg-o));

  --c-fg-game-all: hsl(var(--c-2-a-hue), var(--c-fg-a-sl));
  --c-fg-game-match-a: hsl(var(--c-2-b-hue), var(--c-fg-b-sl));
  --c-fg-game-match-b: hsl(var(--c-2-b-hue), var(--c-fg-c-sl));
  --c-fg-game-error-a: hsl(var(--c-2-c-hue), var(--c-fg-b-sl));
  --c-fg-game-error-b: hsl(var(--c-2-c-hue), var(--c-fg-c-sl));
`,Go=Ut.td`
  ${Yo};

  &.train {
    background: var(--c-bg-train-all);
    color: var(--c-fg-train-all);
  }
  &.train-ask-a {
    background: var(--c-bg-train-ask-a);
    color: var(--c-fg-train-ask-a);
  }
  &.train-ask-b {
    background: var(--c-bg-train-ask-b);
    color: var(--c-fg-train-ask-b);
  }
  &.train-flip-a {
    background: var(--c-bg-train-flip-a);
    color: var(--c-fg-train-flip-a);
  }
  &.train-flip-b {
    background: var(--c-bg-train-flip-b);
    color: var(--c-fg-train-flip-b);
  }
  &.game {
    background: var(--c-bg-game-all);
    color: var(--c-fg-game-all);
  }
  &.game-match-a {
    background: var(--c-bg-game-match-a);
    color: var(--c-fg-game-match-a);
  }
  &.game-match-b {
    background: var(--c-bg-game-match-b);
    color: var(--c-fg-game-match-b);
  }
  &.game-error-a {
    background: var(--c-bg-game-error-a);
    color: var(--c-fg-game-error-a);
  }
  &.game-error-b {
    background: var(--c-bg-game-error-b);
    color: var(--c-fg-game-error-b);
  }
`,Qo=Ut(Go)`
  padding: 10px;
  font-size: 16px;
  font-weight: lighter;
  letter-spacing: 2px;
  text-align: center;
  text-transform: uppercase;

  &.num {
    background: #000;
    color: #fff;
  }
  &.category {
    background: #222;
    color: #999;
  }
  &.word {
    background: #444;
    color: #bbb;
  }
  &.translation {
    background: #666;
    color: #ddd;
  }
`,Ko=Ut(Go)`
  padding: 3px 6px;

  &.num {
    background: #0008;
    color: #fff;
    text-align: center;
    font-family: monospace;
  }
  &.category {
    background: #0006;
    color: #111;
  }
  &.word {
    background: #0004;
    color: #111;
  }
  &.translation {
    background: #0002;
    color: #111;
  }
  &.stats {
    --bg-o: 0.75;
    width: 50px;
    font-family: monospace;
  }
  &.all {
    width: 75px;
    color: #fff;
    text-align: center;
  }
`,Xo=Ut(Qo)`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  user-select: none;

  &:hover {
    &::before,
    &::after {
      height: 82%;
      opacity: 1;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    height: 80%;
    aspect-ratio: 1 / 1;
    border-radius: 0 10px 0 10px;
    background-image: linear-gradient(-45deg, #fffa 30%, #fff0 60%);
    opacity: 0.5;
    transition: all 200ms;
  }
  &::before {
    bottom: -75%;
    transform: translateX(-50%) rotate(-135deg);
  }
  &::after {
    top: -75%;
    transform: translateX(-50%) rotate(45deg);
  }

  &.asc {
    &::before {
      bottom: -50%;
    }
    &::after {
      top: -100%;
    }
  }
  &.desc {
    &::before {
      bottom: -100%;
    }
    &::after {
      top: -50%;
    }
  }
`,Zo=({text:t,className:n,rowSpan:r,colSpan:a})=>e.createElement(Qo,{className:n,rowSpan:r,colSpan:a},t),Jo=({order:t,onOrderChange:n,text:r,className:a,rowSpan:o,colSpan:l})=>{const i=`${a||""} ${t}`;return e.createElement(Xo,{className:i,onClick:n,rowSpan:o,colSpan:l},r)},el=Ut.table`
  position: relative;
  width: 100%;
  min-width: 1200px;
  box-shadow: 0 0 20px #0004, 0 10px 20px #0002, 0 20px 20px #0002, 0 30px 20px #0002;
`,tl=Ut.thead`
  position: sticky;
  top: 0;
  z-index: 2;
`,nl=Ut.tbody`
  tr {
    transition: all 100ms;
  }

  &:hover tr {
    opacity: 0.8;
  }

  &:hover tr:hover {
    opacity: 1;
    box-shadow: 0 0 5px 1px #0004, 0 0 0 1px #0008;
  }

  tr:nth-child(2n) {
    background: #0002;
  }
`,rl=()=>({[Rr.CATEGORY]:Or.NONE,[Rr.WORD]:Or.NONE,[Rr.TRANSLATION]:Or.NONE,[Rr.TRAIN]:Or.NONE,[Rr.ASK_COUNT]:Or.NONE,[Rr.ASK_PERCENT]:Or.NONE,[Rr.FLIP_COUNT]:Or.NONE,[Rr.FLIP_PERCENT]:Or.NONE,[Rr.GAME]:Or.NONE,[Rr.MATCH_COUNT]:Or.NONE,[Rr.MATCH_PERCENT]:Or.NONE,[Rr.ERROR_COUNT]:Or.NONE,[Rr.ERROR_PERCENT]:Or.NONE}),al=({onOrderChange:t})=>{const[n,r]=e.useState(rl()),a=e=>()=>{const a=n[e],o=Pr.get(a)||Or.NONE;r({...rl(),[e]:o}),t(e,o)},o=(e,t,r,o)=>({text:e,className:t,order:n[r],onOrderChange:a(r),rowSpan:o});return e.createElement(tl,null,e.createElement("tr",null,e.createElement(Zo,{rowSpan:3,className:"num",text:"№"}),e.createElement(Jo,o("category","category",Rr.CATEGORY,3)),e.createElement(Jo,o("word","word",Rr.WORD,3)),e.createElement(Jo,o("translation","translation",Rr.TRANSLATION,3)),e.createElement(Zo,{colSpan:5,className:"train",text:"train"}),e.createElement(Zo,{colSpan:5,className:"game",text:"game"})),e.createElement("tr",null,e.createElement(Jo,o("all","train",Rr.TRAIN,2)),e.createElement(Zo,{colSpan:2,className:"train-ask-a",text:"ask"}),e.createElement(Zo,{colSpan:2,className:"train-flip-a",text:"flip"}),e.createElement(Jo,o("all","game",Rr.GAME,2)),e.createElement(Zo,{colSpan:2,className:"game-match-a",text:"match"}),e.createElement(Zo,{colSpan:2,className:"game-error-a",text:"error"})),e.createElement("tr",null,e.createElement(Jo,o("sum","train-ask-a",Rr.ASK_COUNT)),e.createElement(Jo,o("%","train-ask-b",Rr.ASK_PERCENT)),e.createElement(Jo,o("sum","train-flip-a",Rr.FLIP_COUNT)),e.createElement(Jo,o("%","train-flip-b",Rr.FLIP_PERCENT)),e.createElement(Jo,o("sum","game-match-a",Rr.MATCH_COUNT)),e.createElement(Jo,o("%","game-match-b",Rr.MATCH_PERCENT)),e.createElement(Jo,o("sum","game-error-a",Rr.ERROR_COUNT)),e.createElement(Jo,o("%","game-error-b",Rr.ERROR_PERCENT))))},ol=({index:t,data:n})=>e.createElement("tr",null,e.createElement(Ko,{className:"num"},t),e.createElement(Ko,{className:"category"},n[Rr.CATEGORY]),e.createElement(Ko,{className:"word"},n[Rr.WORD]),e.createElement(Ko,{className:"translation"},n[Rr.TRANSLATION]),e.createElement(Ko,{className:"stats train all"},n[Rr.TRAIN]),e.createElement(Ko,{className:"stats train-ask-a"},n[Rr.ASK_COUNT]),e.createElement(Ko,{className:"stats train-ask-b"},n[Rr.ASK_PERCENT]),e.createElement(Ko,{className:"stats train-flip-a"},n[Rr.FLIP_COUNT]),e.createElement(Ko,{className:"stats train-flip-b"},n[Rr.FLIP_PERCENT]),e.createElement(Ko,{className:"stats game all"},n[Rr.GAME]),e.createElement(Ko,{className:"stats game-match-a"},n[Rr.MATCH_COUNT]),e.createElement(Ko,{className:"stats game-match-b"},n[Rr.MATCH_PERCENT]),e.createElement(Ko,{className:"stats game-error-a"},n[Rr.ERROR_COUNT]),e.createElement(Ko,{className:"stats game-error-b"},n[Rr.ERROR_PERCENT])),ll=()=>{const{extendedWordsStats:t}=$r(),[n,r]=e.useState(t);return e.useEffect((()=>r(t)),[t]),e.createElement(el,null,e.createElement(al,{onOrderChange:(e,t)=>{r(Ir(n,e,t))}}),e.createElement(nl,null,n.map((({id:t,data:n},r)=>e.createElement(ol,{key:t,id:t,index:r+1,data:n})))))},il=()=>{const{resetStats:t}=$r();return e.createElement(e.Fragment,null,e.createElement(uo,null),e.createElement(sa,null),e.createElement(qt,null,e.createElement(Vo,null,e.createElement(Ho,null,e.createElement(Wo,{onClick:t},"reset statistic data"),e.createElement(Bo,{to:"/difficult"},"repeat difficult words")),e.createElement(qo,null,e.createElement(ll,null)))))},sl=Ut.svg`
  display: block;
  width: 100%;
  height: 100%;
`,ul=["happy-cute","happy","in-love","cute","happy-smile"],cl=["very-sad","confused","arrogant","sad","bored"],fl=({name:t,className:n})=>e.createElement(sl,{className:n},e.createElement("use",{href:`./svg/emoji.svg#${t}`})),dl=Ft`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`,pl=Ut.ul.attrs((e=>{var t;return{amount:e.amount||0,tangent:(null===(t=e.tangent)||void 0===t?void 0:t.toFixed(3))||0}}))`
  --amount: ${e=>e.amount};
  --tangent: ${e=>e.tangent};
  --emoji-size: min(20vh, 20vw);
  --space: 1;
  --radius: min(20vh, 20vw);
  --container-size: calc(2 * var(--radius) + var(--emoji-size));
  --animation: 12s ${dl} linear infinite;

  position: relative;
  display: block;
  width: var(--container-size);
  height: var(--container-size);
  animation: var(--animation);

  .emoji-animate {
    animation: var(--animation) reverse;
  }
`,hl=Ut.li.attrs((e=>({index:e.index||0})))`
  --index: ${e=>e.index};
  --angle: calc(var(--index) * 1turn / var(--amount));
  --position: calc(50% - var(--emoji-size) / 2);

  position: absolute;
  top: var(--position);
  left: var(--position);
  display: block;
  width: var(--emoji-size);
  height: var(--emoji-size);
  transform: rotate(var(--angle)) translate(var(--radius)) rotate(calc(-1 * var(--angle)));
`,ml=({className:t,emojiNames:n})=>{const r=n.length,a=Math.tan(Math.PI/r);return e.createElement(pl,{className:t,amount:r,tangent:a},n.map(((t,n)=>e.createElement(hl,{key:t,index:n+1},e.createElement(fl,{name:t,className:"emoji-animate"})))))},gl=Ut.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  overflow: hidden;
`,vl=Ut.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,yl=Ut.h2`
  padding: 20px 40px;
  text-align: center;
  font-size: 40px;
`,bl=({className:t,children:n})=>e.createElement(gl,{className:t},n),wl=({className:t})=>e.createElement(e.Fragment,null,e.createElement(uo,null),e.createElement(sa,null),e.createElement(qt,null,e.createElement(bl,{className:t},e.createElement(ml,{emojiNames:ul})))),El=({className:t})=>{const{gameState:n}=Br();return e.createElement(e.Fragment,null,e.createElement(uo,null),e.createElement(sa,null),e.createElement(qt,null,e.createElement(bl,{className:t},e.createElement(vl,null,e.createElement(yl,null,n.mistakes," mistakes"),e.createElement(ml,{emojiNames:cl})))))},xl=Ut.ul`
  width: 100%;
  height: 50px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 10px;
  padding: 0 5px;

  background: #0004;
  border-radius: 25px;
  opacity: ${({show:e})=>e?"1":"0"};
  pointer-events: none;
`,kl=Ut.li`
  --size: 40px;
  flex: 0 0 var(--size);
  width: var(--size);
  height: var(--size);
`,Sl=({emojiName:t})=>e.createElement(kl,null,e.createElement(fl,{name:t})),Cl=({marks:t,show:n})=>e.createElement(xl,{show:n},t.map(((t,n)=>{const r=`${n} ${t}`;return e.createElement(Sl,{key:r,emojiName:t})}))),_l=Ut.button`
  --time: 500ms;
  --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: transparent;
  box-shadow: 0 0 5px 2px #0004;
  transition: all var(--time), transform var(--time);
  transition-timing-function: linear, var(--ease-out-back);

  &:hover {
    transform: rotate(180deg);
    box-shadow: 0 0 5px 4px #0004;
  }

  &:active {
    transform: rotate(360deg);
    box-shadow: 0 0 1px 2px #0004;
  }
`,Tl=Ut.svg`
  width: 100%;
  height: 100%;
  fill: #fff;
`,Nl=e.forwardRef((({className:t="",onFlip:n},r)=>e.createElement(_l,{className:t,onClick:n,ref:r},e.createElement(Tl,null,e.createElement("use",{href:"./svg/sprite.svg#icon-rotate"}))))),Ol=Ut.div`
  --aspect-ratio: 1 / 1;
  aspect-ratio: var(--aspect-ratio);
  position: relative;
  user-select: none;

  @supports not (aspect-ratio: 1 / 1) {
    &::before {
      content: '';
      float: left;
      padding-top: calc(100% / (var(--aspect-ratio)));
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
`,Pl=Ut.ul`
  position: absolute;
  bottom: 10px;
  left: 5%;
  width: 90%;
  pointer-events: none;
`,Rl=Ut.div`
  --time: 500ms;
  --ease-out-back: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --flip: 0deg;
  --pointer-events: all;
  --word-pos: 0%;
  --word-h: 70px;
  --cursor: pointer;

  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  border-radius: 30px 0;
  box-shadow: 0 0 3px 0 #0008;
  transform: rotate3d(-1, 1, 0, var(--flip));
  cursor: var(--cursor);
  pointer-events: var(--pointer-events);
  transition: box-shadow 200ms, all 500ms, transform 1s;
  transition-timing-function: linear, linear, var(--ease-out-back);

  &.train {
    &:hover {
      box-shadow: 0 0 10px 5px #0004;
    }
  }
  &.flip {
    --flip: 180deg;
    --pointer-events: none;
    --cursor: default;
  }
  &.flip-not {
  }
  &.game {
    --word-pos: calc(-1 * var(--word-h));
  }
  &.game-ready {
    --cursor: default;
  }
  &.game-play {
    --cursor: pointer;
    transition: all 200ms;
    &:hover {
      box-shadow: 0 0 10px 5px #0004;
      transform: translateZ(10px);
    }
    &:active {
      box-shadow: 0 0 5px 5px #0004;
      transform: translateZ(0px);
    }
  }
  &.solved {
    --cursor: default;
    opacity: 0.2;
  }
`,Al=Ut(Nl)`
  position: absolute;
  right: 5%;
`,Ll=Ut.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  backface-visibility: hidden;
`,Il=Ut(Ll)``,Ml=Ut(Ll)`
  --mirror: scaleX(-1);
  transform: rotateY(180deg) rotateZ(-90deg);
`,zl=Ut.img.attrs({draggable:!1})`
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: var(--mirror);
`,Dl=Ut.div`
  position: absolute;
  left: 0;
  bottom: var(--word-pos);
  width: 100%;
  height: var(--word-h);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0008;
  backdrop-filter: blur(2px);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: bold;
  font-size: 25px;
  transition: 300ms;
`,$l=({image:t,word:n,children:r})=>e.createElement(e.Fragment,null,e.createElement(zl,{src:t,alt:n}),e.createElement(Dl,null,n,r)),jl=({image:t,word:n,children:r})=>e.createElement(Il,null,e.createElement($l,{image:t,word:n},r)),Fl=({image:t,word:n})=>e.createElement(Ml,null,e.createElement($l,{image:t,word:n})),Ul=t=>{const{className:n,data:r,isGameMode:a,isGameReady:o,isGamePlay:l,isSolved:i,matchWord:s}=t,{word:u,translation:c,image:f,audio:d}=r,p=e.useRef(null),[h,m]=e.useState(!1),[g,v]=e.useState([]),{askClick:y,flipClick:b}=$r(),w=((e,{isGameMode:t,isGameReady:n,isGamePlay:r,isSolved:a})=>{let o=t?"game":"train";return t||(o+=e?" flip":" flip-not"),n&&(o+=" game-ready"),r&&!a&&(o+=" game-play"),t&&a&&(o+=" solved"),o})(h,t);return e.createElement(Ol,{className:n,onMouseLeave:()=>m((()=>!1))},e.createElement(Rl,{className:w,onClick:e=>{var t;if(!o&&!i)if(l){const e=ir(s(r)?ul:cl);v([...g.slice(-6),e])}else null!==(t=p.current)&&void 0!==t&&t.contains(e.target)||(Un(Ia(d)),y(r._id))}},e.createElement(jl,{word:u,image:La(f)},e.createElement(Al,{onFlip:()=>{m((()=>!0)),b(r._id)},ref:p})),e.createElement(Fl,{word:c,image:La(f)})),e.createElement(Pl,null,e.createElement(Cl,{marks:g,show:a})))},Wl=Ut.ul`
  //display: flex;
  //flex-wrap: wrap;
  //justify-content: center;
  //gap: 20px;
  padding: 50px 20px;
  height: 700px;
  overflow: auto;
`,Bl=Ut.li`
  flex: 0 0 ${300}px;
  perspective: ${900}px;
`,Hl=({className:t,isDifficultWords:n=!1})=>{const{category:r,words:a}=mr(),{getDifficultWords:o}=$r(),{gameState:l,dispatch:i}=Br(),s=n?e.useRef(o()).current:a,[u,c]=(0,e.useState)(s.slice(0,8)),f=e=>{return!!nr(l)&&(!!lr(l,e._id)||(i({type:sr.MATCH_WORD,payload:{word:e}}),t=l,n=e._id,rr(t)&&n===(null===(r=t.activeWord)||void 0===r?void 0:r._id)));var t,n,r},[d,p,h]=[er,tr,nr].map((e=>e(l))),m=d&&s.length>0,g=async()=>{if(u.length>=s.length)return;await Qa(500);const{length:e}=u;c(s.slice(0,e+8))};(0,e.useEffect)((()=>{(async()=>{await g()})()}),[s]);const v=u.map((t=>e.createElement(Bl,{key:t.word},e.createElement(Ul,{data:t,matchWord:f,isGameMode:d,isGameReady:p,isGamePlay:h,isSolved:lr(l,t._id)}))));return e.createElement(e.Fragment,null,e.createElement(uo,null),e.createElement(sa,{showBtnStartRepeat:m,onStartRepeat:()=>{tr(l)?i({type:sr.START,payload:{routePath:(null==r?void 0:r._id)||"",words:s}}):i({type:sr.VOCALIZE})}}),e.createElement(qt,null,e.createElement("div",{className:t},e.createElement(Wl,{id:"scrollable-words-list"},0===u.length?e.createElement("h2",null,n?"No difficult words":`Category "${(null==r?void 0:r.name)||""}" have 0 words`):e.createElement(me,{next:g,dataLength:u.length,hasMore:u.length<a.length,loader:e.createElement("h4",null,"Loading..."),scrollableTarget:"scrollable-words-list",style:{display:"flex",flexWrap:"wrap",justifyContent:"center",gridGap:"20px"}},v)))))},Vl=({state:t,isDifficultWords:n})=>(({status:e})=>e===Zn.END)(t)?e.createElement(H,{to:"/"}):or(t)?e.createElement(wl,null):(e=>ar(e)&&e.mistakes>0)(t)?e.createElement(El,null):e.createElement(Hl,{isDifficultWords:n}),ql=()=>{const{route:t}=Z();return e.createElement(e.Fragment,null,e.createElement(uo,null),e.createElement(sa,null),e.createElement(qt,null,e.createElement("h2",null,'Not found: "',t,'"'),";"))},Yl=()=>e.createElement(e.Fragment,null,e.createElement(uo,null),e.createElement(sa,null),e.createElement(qt,null,e.createElement("div",null,e.createElement(ta,{onClick:()=>{},isStart:!0}),e.createElement(ta,{onClick:()=>{}})))),Gl=new Map([["win",e.createElement(wl,null)],["fail",e.createElement(El,null)],["test",e.createElement(Yl,null)]]),Ql=({component:t})=>e.createElement(e.Fragment,null,e.createElement(uo,null),e.createElement(sa,null),e.createElement(qt,null,e.createElement("h2",null,'No test for "',t,'"'),";")),Kl=()=>{const{component:t}=Z();return Gl.get(t)||e.createElement(Ql,{component:t})},Xl=()=>{const{pathname:t}=K($).location,{gameState:n,dispatch:r}=Br();return e.useEffect((()=>{(async()=>{await Mn.checkToken()})()}),[]),e.useEffect((()=>{var e,a;rr(n)&&(a=t,(e=n).activeRoutePath&&e.activeRoutePath!==a)&&r({type:sr.RESET})}),[t]),e.createElement(Vt,null,e.createElement(Bt,null,e.createElement(Ht,null)),e.createElement(Q,null,e.createElement(G,{exact:!0,path:"/"},e.createElement(jo,null)),e.createElement(G,{path:"/category/:categoryId"},e.createElement(Vl,{state:n})),e.createElement(G,{path:"/difficult"},e.createElement(Vl,{state:n,isDifficultWords:!0})),e.createElement(G,{path:"/statistic"},e.createElement(il,null)),e.createElement(G,{path:"/admin/category/:categoryId"},e.createElement(Eo,null)),e.createElement(G,{path:"/admin"},e.createElement(po,null)),e.createElement(G,{path:"/test/:component"},e.createElement(Kl,null)),e.createElement(G,{path:"/:route"},e.createElement(ql,null))),e.createElement(Oo,null))};t.render(e.createElement(e.StrictMode,null,e.createElement(J,null,e.createElement(va,null,e.createElement(vr,null,e.createElement(Dr,null,e.createElement(Wr,null,e.createElement(Xl,null))))))),document.getElementById("root"))})()})();