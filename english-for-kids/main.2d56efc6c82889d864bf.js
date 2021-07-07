/*! For license information please see main.2d56efc6c82889d864bf.js.LICENSE.txt */
(()=>{var e={535:(e,t,n)=>{"use strict";var r=n(237),a={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},l={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},i={};function u(e){return r.isMemo(e)?l:i[e.$$typeof]||a}i[r.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},i[r.Memo]=l;var s=Object.defineProperty,c=Object.getOwnPropertyNames,f=Object.getOwnPropertySymbols,d=Object.getOwnPropertyDescriptor,p=Object.getPrototypeOf,h=Object.prototype;e.exports=function e(t,n,r){if("string"!=typeof n){if(h){var a=p(n);a&&a!==h&&e(t,a,r)}var l=c(n);f&&(l=l.concat(f(n)));for(var i=u(t),m=u(n),g=0;g<l.length;++g){var v=l[g];if(!(o[v]||r&&r[v]||m&&m[v]||i&&i[v])){var y=d(n,v);try{s(t,v,y)}catch(e){}}}}return t}},901:e=>{e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},767:e=>{"use strict";var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function a(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,o){for(var l,i,u=a(e),s=1;s<arguments.length;s++){for(var c in l=Object(arguments[s]))n.call(l,c)&&(u[c]=l[c]);if(t){i=t(l);for(var f=0;f<i.length;f++)r.call(l,i[f])&&(u[i[f]]=l[i[f]])}}return u}},720:(e,t,n)=>{var r=n(901);e.exports=function e(t,n,a){return r(n)||(a=n||a,n=[]),a=a||{},t instanceof RegExp?function(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return c(e,t)}(t,n):r(t)?function(t,n,r){for(var a=[],o=0;o<t.length;o++)a.push(e(t[o],n,r).source);return c(new RegExp("(?:"+a.join("|")+")",f(r)),n)}(t,n,a):function(e,t,n){return d(o(e,n),t,n)}(t,n,a)},e.exports.parse=o,e.exports.compile=function(e,t){return i(o(e,t),t)},e.exports.tokensToFunction=i,e.exports.tokensToRegExp=d;var a=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function o(e,t){for(var n,r=[],o=0,l=0,i="",c=t&&t.delimiter||"/";null!=(n=a.exec(e));){var f=n[0],d=n[1],p=n.index;if(i+=e.slice(l,p),l=p+f.length,d)i+=d[1];else{var h=e[l],m=n[2],g=n[3],v=n[4],y=n[5],b=n[6],w=n[7];i&&(r.push(i),i="");var k=null!=m&&null!=h&&h!==m,E="+"===b||"*"===b,x="?"===b||"*"===b,S=n[2]||c,C=v||y;r.push({name:g||o++,prefix:m||"",delimiter:S,optional:x,repeat:E,partial:k,asterisk:!!w,pattern:C?s(C):w?".*":"[^"+u(S)+"]+?"})}}return l<e.length&&(i+=e.substr(l)),i&&r.push(i),r}function l(e){return encodeURI(e).replace(/[\/?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}))}function i(e,t){for(var n=new Array(e.length),a=0;a<e.length;a++)"object"==typeof e[a]&&(n[a]=new RegExp("^(?:"+e[a].pattern+")$",f(t)));return function(t,a){for(var o="",i=t||{},u=(a||{}).pretty?l:encodeURIComponent,s=0;s<e.length;s++){var c=e[s];if("string"!=typeof c){var f,d=i[c.name];if(null==d){if(c.optional){c.partial&&(o+=c.prefix);continue}throw new TypeError('Expected "'+c.name+'" to be defined')}if(r(d)){if(!c.repeat)throw new TypeError('Expected "'+c.name+'" to not repeat, but received `'+JSON.stringify(d)+"`");if(0===d.length){if(c.optional)continue;throw new TypeError('Expected "'+c.name+'" to not be empty')}for(var p=0;p<d.length;p++){if(f=u(d[p]),!n[s].test(f))throw new TypeError('Expected all "'+c.name+'" to match "'+c.pattern+'", but received `'+JSON.stringify(f)+"`");o+=(0===p?c.prefix:c.delimiter)+f}}else{if(f=c.asterisk?encodeURI(d).replace(/[?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})):u(d),!n[s].test(f))throw new TypeError('Expected "'+c.name+'" to match "'+c.pattern+'", but received "'+f+'"');o+=c.prefix+f}}else o+=c}return o}}function u(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function s(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function c(e,t){return e.keys=t,e}function f(e){return e&&e.sensitive?"":"i"}function d(e,t,n){r(t)||(n=t||n,t=[]);for(var a=(n=n||{}).strict,o=!1!==n.end,l="",i=0;i<e.length;i++){var s=e[i];if("string"==typeof s)l+=u(s);else{var d=u(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+d+p+")*"),l+=p=s.optional?s.partial?d+"("+p+")?":"(?:"+d+"("+p+"))?":d+"("+p+")"}}var h=u(n.delimiter||"/"),m=l.slice(-h.length)===h;return a||(l=(m?l.slice(0,-h.length):l)+"(?:"+h+"(?=$))?"),l+=o?"$":a&&m?"":"(?="+h+"|$)",c(new RegExp("^"+l,f(n)),t)}},132:(e,t,n)=>{"use strict";var r=n(134);function a(){}function o(){}o.resetWarningCache=a,e.exports=function(){function e(e,t,n,a,o,l){if(l!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:a};return n.PropTypes=n,n}},36:(e,t,n)=>{e.exports=n(132)()},134:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},439:(e,t,n)=>{"use strict";var r=n(496),a=n(767),o=n(51);function l(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!r)throw Error(l(227));var i=new Set,u={};function s(e,t){c(e,t),c(e+"Capture",t)}function c(e,t){for(u[e]=t,e=0;e<t.length;e++)i.add(t[e])}var f=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),d=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p=Object.prototype.hasOwnProperty,h={},m={};function g(e,t,n,r,a,o,l){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=l}var v={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){v[e]=new g(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];v[t]=new g(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){v[e]=new g(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){v[e]=new g(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){v[e]=new g(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){v[e]=new g(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){v[e]=new g(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){v[e]=new g(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){v[e]=new g(e,5,!1,e.toLowerCase(),null,!1,!1)}));var y=/[\-:]([a-z])/g;function b(e){return e[1].toUpperCase()}function w(e,t,n,r){var a=v.hasOwnProperty(t)?v[t]:null;(null!==a?0===a.type:!r&&2<t.length&&("o"===t[0]||"O"===t[0])&&("n"===t[1]||"N"===t[1]))||(function(e,t,n,r){if(null==t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,a,r)&&(n=null),r||null===a?function(e){return!!p.call(m,e)||!p.call(h,e)&&(d.test(e)?m[e]=!0:(h[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=null===n?3!==a.type&&"":n:(t=a.attributeName,r=a.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(a=a.type)||4===a&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){v[e]=new g(e,1,!1,e.toLowerCase(),null,!1,!1)})),v.xlinkHref=new g("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){v[e]=new g(e,1,!1,e.toLowerCase(),null,!0,!0)}));var k=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,E=60103,x=60106,S=60107,C=60108,N=60114,_=60109,T=60110,O=60112,P=60113,R=60120,A=60115,I=60116,L=60121,z=60128,M=60129,D=60130,j=60131;if("function"==typeof Symbol&&Symbol.for){var $=Symbol.for;E=$("react.element"),x=$("react.portal"),S=$("react.fragment"),C=$("react.strict_mode"),N=$("react.profiler"),_=$("react.provider"),T=$("react.context"),O=$("react.forward_ref"),P=$("react.suspense"),R=$("react.suspense_list"),A=$("react.memo"),I=$("react.lazy"),L=$("react.block"),$("react.scope"),z=$("react.opaque.id"),M=$("react.debug_trace_mode"),D=$("react.offscreen"),j=$("react.legacy_hidden")}var U,F="function"==typeof Symbol&&Symbol.iterator;function W(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=F&&e[F]||e["@@iterator"])?e:null}function H(e){if(void 0===U)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);U=t&&t[1]||""}return"\n"+U+e}var B=!1;function V(e,t){if(!e||B)return"";B=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(e){var r=e}Reflect.construct(e,[],t)}else{try{t.call()}catch(e){r=e}e.call(t.prototype)}else{try{throw Error()}catch(e){r=e}e()}}catch(e){if(e&&r&&"string"==typeof e.stack){for(var a=e.stack.split("\n"),o=r.stack.split("\n"),l=a.length-1,i=o.length-1;1<=l&&0<=i&&a[l]!==o[i];)i--;for(;1<=l&&0<=i;l--,i--)if(a[l]!==o[i]){if(1!==l||1!==i)do{if(l--,0>--i||a[l]!==o[i])return"\n"+a[l].replace(" at new "," at ")}while(1<=l&&0<=i);break}}}finally{B=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?H(e):""}function G(e){switch(e.tag){case 5:return H(e.type);case 16:return H("Lazy");case 13:return H("Suspense");case 19:return H("SuspenseList");case 0:case 2:case 15:return V(e.type,!1);case 11:return V(e.type.render,!1);case 22:return V(e.type._render,!1);case 1:return V(e.type,!0);default:return""}}function Q(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case S:return"Fragment";case x:return"Portal";case N:return"Profiler";case C:return"StrictMode";case P:return"Suspense";case R:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case T:return(e.displayName||"Context")+".Consumer";case _:return(e._context.displayName||"Context")+".Provider";case O:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(""!==t?"ForwardRef("+t+")":"ForwardRef");case A:return Q(e.type);case L:return Q(e._render);case I:t=e._payload,e=e._init;try{return Q(e(t))}catch(e){}}return null}function q(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}function Y(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function K(e){e._valueTracker||(e._valueTracker=function(e){var t=Y(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function X(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Y(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function Z(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function J(e,t){var n=t.checked;return a({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function ee(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=q(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function te(e,t){null!=(t=t.checked)&&w(e,"checked",t,!1)}function ne(e,t){te(e,t);var n=q(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ae(e,t.type,n):t.hasOwnProperty("defaultValue")&&ae(e,t.type,q(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function re(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ae(e,t,n){"number"===t&&Z(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}function oe(e,t){return e=a({children:void 0},t),(t=function(e){var t="";return r.Children.forEach(e,(function(e){null!=e&&(t+=e)})),t}(t.children))&&(e.children=t),e}function le(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+q(n),t=null,a=0;a<e.length;a++){if(e[a].value===n)return e[a].selected=!0,void(r&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function ie(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(l(91));return a({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ue(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(l(92));if(Array.isArray(n)){if(!(1>=n.length))throw Error(l(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:q(n)}}function se(e,t){var n=q(t.value),r=q(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function ce(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}var fe="http://www.w3.org/1999/xhtml";function de(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function pe(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?de(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var he,me,ge=(me=function(e,t){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=t;else{for((he=he||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=he.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return me(e,t)}))}:me);function ve(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var ye={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},be=["Webkit","ms","Moz","O"];function we(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||ye.hasOwnProperty(e)&&ye[e]?(""+t).trim():t+"px"}function ke(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),a=we(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}Object.keys(ye).forEach((function(e){be.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ye[t]=ye[e]}))}));var Ee=a({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function xe(e,t){if(t){if(Ee[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(l(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(l(60));if("object"!=typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(l(61))}if(null!=t.style&&"object"!=typeof t.style)throw Error(l(62))}}function Se(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function Ce(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Ne=null,_e=null,Te=null;function Oe(e){if(e=Jr(e)){if("function"!=typeof Ne)throw Error(l(280));var t=e.stateNode;t&&(t=ta(t),Ne(e.stateNode,e.type,t))}}function Pe(e){_e?Te?Te.push(e):Te=[e]:_e=e}function Re(){if(_e){var e=_e,t=Te;if(Te=_e=null,Oe(e),t)for(e=0;e<t.length;e++)Oe(t[e])}}function Ae(e,t){return e(t)}function Ie(e,t,n,r,a){return e(t,n,r,a)}function Le(){}var ze=Ae,Me=!1,De=!1;function je(){null===_e&&null===Te||(Le(),Re())}function $e(e,t){var n=e.stateNode;if(null===n)return null;var r=ta(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!=typeof n)throw Error(l(231,t,typeof n));return n}var Ue=!1;if(f)try{var Fe={};Object.defineProperty(Fe,"passive",{get:function(){Ue=!0}}),window.addEventListener("test",Fe,Fe),window.removeEventListener("test",Fe,Fe)}catch(me){Ue=!1}function We(e,t,n,r,a,o,l,i,u){var s=Array.prototype.slice.call(arguments,3);try{t.apply(n,s)}catch(e){this.onError(e)}}var He=!1,Be=null,Ve=!1,Ge=null,Qe={onError:function(e){He=!0,Be=e}};function qe(e,t,n,r,a,o,l,i,u){He=!1,Be=null,We.apply(Qe,arguments)}function Ye(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!=(1026&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function Ke(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&null!==(e=e.alternate)&&(t=e.memoizedState),null!==t)return t.dehydrated}return null}function Xe(e){if(Ye(e)!==e)throw Error(l(188))}function Ze(e){if(!(e=function(e){var t=e.alternate;if(!t){if(null===(t=Ye(e)))throw Error(l(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(null===a)break;var o=a.alternate;if(null===o){if(null!==(r=a.return)){n=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return Xe(a),e;if(o===r)return Xe(a),t;o=o.sibling}throw Error(l(188))}if(n.return!==r.return)n=a,r=o;else{for(var i=!1,u=a.child;u;){if(u===n){i=!0,n=a,r=o;break}if(u===r){i=!0,r=a,n=o;break}u=u.sibling}if(!i){for(u=o.child;u;){if(u===n){i=!0,n=o,r=a;break}if(u===r){i=!0,r=o,n=a;break}u=u.sibling}if(!i)throw Error(l(189))}}if(n.alternate!==r)throw Error(l(190))}if(3!==n.tag)throw Error(l(188));return n.stateNode.current===n?e:t}(e)))return null;for(var t=e;;){if(5===t.tag||6===t.tag)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}function Je(e,t){for(var n=e.alternate;null!==t;){if(t===e||t===n)return!0;t=t.return}return!1}var et,tt,nt,rt,at=!1,ot=[],lt=null,it=null,ut=null,st=new Map,ct=new Map,ft=[],dt="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function pt(e,t,n,r,a){return{blockedOn:e,domEventName:t,eventSystemFlags:16|n,nativeEvent:a,targetContainers:[r]}}function ht(e,t){switch(e){case"focusin":case"focusout":lt=null;break;case"dragenter":case"dragleave":it=null;break;case"mouseover":case"mouseout":ut=null;break;case"pointerover":case"pointerout":st.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ct.delete(t.pointerId)}}function mt(e,t,n,r,a,o){return null===e||e.nativeEvent!==o?(e=pt(t,n,r,a,o),null!==t&&null!==(t=Jr(t))&&tt(t),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==a&&-1===t.indexOf(a)&&t.push(a),e)}function gt(e){var t=Zr(e.target);if(null!==t){var n=Ye(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=Ke(n)))return e.blockedOn=t,void rt(e.lanePriority,(function(){o.unstable_runWithPriority(e.priority,(function(){nt(n)}))}))}else if(3===t&&n.stateNode.hydrate)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function vt(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Zt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=Jr(n))&&tt(t),e.blockedOn=n,!1;t.shift()}return!0}function yt(e,t,n){vt(e)&&n.delete(t)}function bt(){for(at=!1;0<ot.length;){var e=ot[0];if(null!==e.blockedOn){null!==(e=Jr(e.blockedOn))&&et(e);break}for(var t=e.targetContainers;0<t.length;){var n=Zt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n){e.blockedOn=n;break}t.shift()}null===e.blockedOn&&ot.shift()}null!==lt&&vt(lt)&&(lt=null),null!==it&&vt(it)&&(it=null),null!==ut&&vt(ut)&&(ut=null),st.forEach(yt),ct.forEach(yt)}function wt(e,t){e.blockedOn===t&&(e.blockedOn=null,at||(at=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,bt)))}function kt(e){function t(t){return wt(t,e)}if(0<ot.length){wt(ot[0],e);for(var n=1;n<ot.length;n++){var r=ot[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==lt&&wt(lt,e),null!==it&&wt(it,e),null!==ut&&wt(ut,e),st.forEach(t),ct.forEach(t),n=0;n<ft.length;n++)(r=ft[n]).blockedOn===e&&(r.blockedOn=null);for(;0<ft.length&&null===(n=ft[0]).blockedOn;)gt(n),null===n.blockedOn&&ft.shift()}function Et(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var xt={animationend:Et("Animation","AnimationEnd"),animationiteration:Et("Animation","AnimationIteration"),animationstart:Et("Animation","AnimationStart"),transitionend:Et("Transition","TransitionEnd")},St={},Ct={};function Nt(e){if(St[e])return St[e];if(!xt[e])return e;var t,n=xt[e];for(t in n)if(n.hasOwnProperty(t)&&t in Ct)return St[e]=n[t];return e}f&&(Ct=document.createElement("div").style,"AnimationEvent"in window||(delete xt.animationend.animation,delete xt.animationiteration.animation,delete xt.animationstart.animation),"TransitionEvent"in window||delete xt.transitionend.transition);var _t=Nt("animationend"),Tt=Nt("animationiteration"),Ot=Nt("animationstart"),Pt=Nt("transitionend"),Rt=new Map,At=new Map,It=["abort","abort",_t,"animationEnd",Tt,"animationIteration",Ot,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Pt,"transitionEnd","waiting","waiting"];function Lt(e,t){for(var n=0;n<e.length;n+=2){var r=e[n],a=e[n+1];a="on"+(a[0].toUpperCase()+a.slice(1)),At.set(r,t),Rt.set(r,a),s(a,[r])}}(0,o.unstable_now)();var zt=8;function Mt(e){if(0!=(1&e))return zt=15,1;if(0!=(2&e))return zt=14,2;if(0!=(4&e))return zt=13,4;var t=24&e;return 0!==t?(zt=12,t):0!=(32&e)?(zt=11,32):0!=(t=192&e)?(zt=10,t):0!=(256&e)?(zt=9,256):0!=(t=3584&e)?(zt=8,t):0!=(4096&e)?(zt=7,4096):0!=(t=4186112&e)?(zt=6,t):0!=(t=62914560&e)?(zt=5,t):67108864&e?(zt=4,67108864):0!=(134217728&e)?(zt=3,134217728):0!=(t=805306368&e)?(zt=2,t):0!=(1073741824&e)?(zt=1,1073741824):(zt=8,e)}function Dt(e,t){var n=e.pendingLanes;if(0===n)return zt=0;var r=0,a=0,o=e.expiredLanes,l=e.suspendedLanes,i=e.pingedLanes;if(0!==o)r=o,a=zt=15;else if(0!=(o=134217727&n)){var u=o&~l;0!==u?(r=Mt(u),a=zt):0!=(i&=o)&&(r=Mt(i),a=zt)}else 0!=(o=n&~l)?(r=Mt(o),a=zt):0!==i&&(r=Mt(i),a=zt);if(0===r)return 0;if(r=n&((0>(r=31-Ht(r))?0:1<<r)<<1)-1,0!==t&&t!==r&&0==(t&l)){if(Mt(t),a<=zt)return t;zt=a}if(0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)a=1<<(n=31-Ht(t)),r|=e[n],t&=~a;return r}function jt(e){return 0!=(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function $t(e,t){switch(e){case 15:return 1;case 14:return 2;case 12:return 0===(e=Ut(24&~t))?$t(10,t):e;case 10:return 0===(e=Ut(192&~t))?$t(8,t):e;case 8:return 0===(e=Ut(3584&~t))&&0===(e=Ut(4186112&~t))&&(e=512),e;case 2:return 0===(t=Ut(805306368&~t))&&(t=268435456),t}throw Error(l(358,e))}function Ut(e){return e&-e}function Ft(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Wt(e,t,n){e.pendingLanes|=t;var r=t-1;e.suspendedLanes&=r,e.pingedLanes&=r,(e=e.eventTimes)[t=31-Ht(t)]=n}var Ht=Math.clz32?Math.clz32:function(e){return 0===e?32:31-(Bt(e)/Vt|0)|0},Bt=Math.log,Vt=Math.LN2,Gt=o.unstable_UserBlockingPriority,Qt=o.unstable_runWithPriority,qt=!0;function Yt(e,t,n,r){Me||Le();var a=Xt,o=Me;Me=!0;try{Ie(a,e,t,n,r)}finally{(Me=o)||je()}}function Kt(e,t,n,r){Qt(Gt,Xt.bind(null,e,t,n,r))}function Xt(e,t,n,r){var a;if(qt)if((a=0==(4&t))&&0<ot.length&&-1<dt.indexOf(e))e=pt(null,e,t,n,r),ot.push(e);else{var o=Zt(e,t,n,r);if(null===o)a&&ht(e,r);else{if(a){if(-1<dt.indexOf(e))return e=pt(o,e,t,n,r),void ot.push(e);if(function(e,t,n,r,a){switch(t){case"focusin":return lt=mt(lt,e,t,n,r,a),!0;case"dragenter":return it=mt(it,e,t,n,r,a),!0;case"mouseover":return ut=mt(ut,e,t,n,r,a),!0;case"pointerover":var o=a.pointerId;return st.set(o,mt(st.get(o)||null,e,t,n,r,a)),!0;case"gotpointercapture":return o=a.pointerId,ct.set(o,mt(ct.get(o)||null,e,t,n,r,a)),!0}return!1}(o,e,t,n,r))return;ht(e,r)}Rr(e,t,r,null,n)}}}function Zt(e,t,n,r){var a=Ce(r);if(null!==(a=Zr(a))){var o=Ye(a);if(null===o)a=null;else{var l=o.tag;if(13===l){if(null!==(a=Ke(o)))return a;a=null}else if(3===l){if(o.stateNode.hydrate)return 3===o.tag?o.stateNode.containerInfo:null;a=null}else o!==a&&(a=null)}}return Rr(e,t,r,a,n),null}var Jt=null,en=null,tn=null;function nn(){if(tn)return tn;var e,t,n=en,r=n.length,a="value"in Jt?Jt.value:Jt.textContent,o=a.length;for(e=0;e<r&&n[e]===a[e];e++);var l=r-e;for(t=1;t<=l&&n[r-t]===a[o-t];t++);return tn=a.slice(e,1<t?1-t:void 0)}function rn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function an(){return!0}function on(){return!1}function ln(e){function t(t,n,r,a,o){for(var l in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=a,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(l)&&(t=e[l],this[l]=t?t(a):a[l]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?an:on,this.isPropagationStopped=on,this}return a(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=an)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=an)},persist:function(){},isPersistent:an}),t}var un,sn,cn,fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dn=ln(fn),pn=a({},fn,{view:0,detail:0}),hn=ln(pn),mn=a({},pn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==cn&&(cn&&"mousemove"===e.type?(un=e.screenX-cn.screenX,sn=e.screenY-cn.screenY):sn=un=0,cn=e),un)},movementY:function(e){return"movementY"in e?e.movementY:sn}}),gn=ln(mn),vn=ln(a({},mn,{dataTransfer:0})),yn=ln(a({},pn,{relatedTarget:0})),bn=ln(a({},fn,{animationName:0,elapsedTime:0,pseudoElement:0})),wn=ln(a({},fn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),kn=ln(a({},fn,{data:0})),En={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},xn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Sn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=Sn[e])&&!!t[e]}function Nn(){return Cn}var _n=ln(a({},pn,{key:function(e){if(e.key){var t=En[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=rn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?xn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nn,charCode:function(e){return"keypress"===e.type?rn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?rn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),Tn=ln(a({},mn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),On=ln(a({},pn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nn})),Pn=ln(a({},fn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Rn=ln(a({},mn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),An=[9,13,27,32],In=f&&"CompositionEvent"in window,Ln=null;f&&"documentMode"in document&&(Ln=document.documentMode);var zn=f&&"TextEvent"in window&&!Ln,Mn=f&&(!In||Ln&&8<Ln&&11>=Ln),Dn=String.fromCharCode(32),jn=!1;function $n(e,t){switch(e){case"keyup":return-1!==An.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Un(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var Fn=!1,Wn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Wn[e.type]:"textarea"===t}function Bn(e,t,n,r){Pe(r),0<(t=Ir(t,"onChange")).length&&(n=new dn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Vn=null,Gn=null;function Qn(e){Cr(e,0)}function qn(e){if(X(ea(e)))return e}function Yn(e,t){if("change"===e)return t}var Kn=!1;if(f){var Xn;if(f){var Zn="oninput"in document;if(!Zn){var Jn=document.createElement("div");Jn.setAttribute("oninput","return;"),Zn="function"==typeof Jn.oninput}Xn=Zn}else Xn=!1;Kn=Xn&&(!document.documentMode||9<document.documentMode)}function er(){Vn&&(Vn.detachEvent("onpropertychange",tr),Gn=Vn=null)}function tr(e){if("value"===e.propertyName&&qn(Gn)){var t=[];if(Bn(t,Gn,e,Ce(e)),e=Qn,Me)e(t);else{Me=!0;try{Ae(e,t)}finally{Me=!1,je()}}}}function nr(e,t,n){"focusin"===e?(er(),Gn=n,(Vn=t).attachEvent("onpropertychange",tr)):"focusout"===e&&er()}function rr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return qn(Gn)}function ar(e,t){if("click"===e)return qn(t)}function or(e,t){if("input"===e||"change"===e)return qn(t)}var lr="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},ir=Object.prototype.hasOwnProperty;function ur(e,t){if(lr(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++)if(!ir.call(t,n[r])||!lr(e[n[r]],t[n[r]]))return!1;return!0}function sr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function cr(e,t){var n,r=sr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=sr(r)}}function fr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?fr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function dr(){for(var e=window,t=Z();t instanceof e.HTMLIFrameElement;){try{var n="string"==typeof t.contentWindow.location.href}catch(e){n=!1}if(!n)break;t=Z((e=t.contentWindow).document)}return t}function pr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var hr=f&&"documentMode"in document&&11>=document.documentMode,mr=null,gr=null,vr=null,yr=!1;function br(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;yr||null==mr||mr!==Z(r)||(r="selectionStart"in(r=mr)&&pr(r)?{start:r.selectionStart,end:r.selectionEnd}:{anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},vr&&ur(vr,r)||(vr=r,0<(r=Ir(gr,"onSelect")).length&&(t=new dn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=mr)))}Lt("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0),Lt("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1),Lt(It,2);for(var wr="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),kr=0;kr<wr.length;kr++)At.set(wr[kr],0);c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),s("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),s("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),s("onBeforeInput",["compositionend","keypress","textInput","paste"]),s("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),s("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),s("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),xr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Er));function Sr(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,a,o,i,u,s){if(qe.apply(this,arguments),He){if(!He)throw Error(l(198));var c=Be;He=!1,Be=null,Ve||(Ve=!0,Ge=c)}}(r,t,void 0,e),e.currentTarget=null}function Cr(e,t){t=0!=(4&t);for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var l=r.length-1;0<=l;l--){var i=r[l],u=i.instance,s=i.currentTarget;if(i=i.listener,u!==o&&a.isPropagationStopped())break e;Sr(a,i,s),o=u}else for(l=0;l<r.length;l++){if(u=(i=r[l]).instance,s=i.currentTarget,i=i.listener,u!==o&&a.isPropagationStopped())break e;Sr(a,i,s),o=u}}}if(Ve)throw e=Ge,Ve=!1,Ge=null,e}function Nr(e,t){var n=na(t),r=e+"__bubble";n.has(r)||(Pr(t,e,2,!1),n.add(r))}var _r="_reactListening"+Math.random().toString(36).slice(2);function Tr(e){e[_r]||(e[_r]=!0,i.forEach((function(t){xr.has(t)||Or(t,!1,e,null),Or(t,!0,e,null)})))}function Or(e,t,n,r){var a=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,o=n;if("selectionchange"===e&&9!==n.nodeType&&(o=n.ownerDocument),null!==r&&!t&&xr.has(e)){if("scroll"!==e)return;a|=2,o=r}var l=na(o),i=e+"__"+(t?"capture":"bubble");l.has(i)||(t&&(a|=4),Pr(o,e,a,t),l.add(i))}function Pr(e,t,n,r){var a=At.get(t);switch(void 0===a?2:a){case 0:a=Yt;break;case 1:a=Kt;break;default:a=Xt}n=a.bind(null,t,n,e),a=void 0,!Ue||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(a=!0),r?void 0!==a?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):void 0!==a?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Rr(e,t,n,r,a){var o=r;if(0==(1&t)&&0==(2&t)&&null!==r)e:for(;;){if(null===r)return;var l=r.tag;if(3===l||4===l){var i=r.stateNode.containerInfo;if(i===a||8===i.nodeType&&i.parentNode===a)break;if(4===l)for(l=r.return;null!==l;){var u=l.tag;if((3===u||4===u)&&((u=l.stateNode.containerInfo)===a||8===u.nodeType&&u.parentNode===a))return;l=l.return}for(;null!==i;){if(null===(l=Zr(i)))return;if(5===(u=l.tag)||6===u){r=o=l;continue e}i=i.parentNode}}r=r.return}!function(e,t,n){if(De)return e();De=!0;try{ze(e,t,n)}finally{De=!1,je()}}((function(){var r=o,a=Ce(n),l=[];e:{var i=Rt.get(e);if(void 0!==i){var u=dn,s=e;switch(e){case"keypress":if(0===rn(n))break e;case"keydown":case"keyup":u=_n;break;case"focusin":s="focus",u=yn;break;case"focusout":s="blur",u=yn;break;case"beforeblur":case"afterblur":u=yn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":u=gn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":u=vn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":u=On;break;case _t:case Tt:case Ot:u=bn;break;case Pt:u=Pn;break;case"scroll":u=hn;break;case"wheel":u=Rn;break;case"copy":case"cut":case"paste":u=wn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":u=Tn}var c=0!=(4&t),f=!c&&"scroll"===e,d=c?null!==i?i+"Capture":null:i;c=[];for(var p,h=r;null!==h;){var m=(p=h).stateNode;if(5===p.tag&&null!==m&&(p=m,null!==d&&null!=(m=$e(h,d))&&c.push(Ar(h,m,p))),f)break;h=h.return}0<c.length&&(i=new u(i,s,null,n,a),l.push({event:i,listeners:c}))}}if(0==(7&t)){if(u="mouseout"===e||"pointerout"===e,(!(i="mouseover"===e||"pointerover"===e)||0!=(16&t)||!(s=n.relatedTarget||n.fromElement)||!Zr(s)&&!s[Kr])&&(u||i)&&(i=a.window===a?a:(i=a.ownerDocument)?i.defaultView||i.parentWindow:window,u?(u=r,null!==(s=(s=n.relatedTarget||n.toElement)?Zr(s):null)&&(s!==(f=Ye(s))||5!==s.tag&&6!==s.tag)&&(s=null)):(u=null,s=r),u!==s)){if(c=gn,m="onMouseLeave",d="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(c=Tn,m="onPointerLeave",d="onPointerEnter",h="pointer"),f=null==u?i:ea(u),p=null==s?i:ea(s),(i=new c(m,h+"leave",u,n,a)).target=f,i.relatedTarget=p,m=null,Zr(a)===r&&((c=new c(d,h+"enter",s,n,a)).target=p,c.relatedTarget=f,m=c),f=m,u&&s)e:{for(d=s,h=0,p=c=u;p;p=Lr(p))h++;for(p=0,m=d;m;m=Lr(m))p++;for(;0<h-p;)c=Lr(c),h--;for(;0<p-h;)d=Lr(d),p--;for(;h--;){if(c===d||null!==d&&c===d.alternate)break e;c=Lr(c),d=Lr(d)}c=null}else c=null;null!==u&&zr(l,i,u,c,!1),null!==s&&null!==f&&zr(l,f,s,c,!0)}if("select"===(u=(i=r?ea(r):window).nodeName&&i.nodeName.toLowerCase())||"input"===u&&"file"===i.type)var g=Yn;else if(Hn(i))if(Kn)g=or;else{g=rr;var v=nr}else(u=i.nodeName)&&"input"===u.toLowerCase()&&("checkbox"===i.type||"radio"===i.type)&&(g=ar);switch(g&&(g=g(e,r))?Bn(l,g,n,a):(v&&v(e,i,r),"focusout"===e&&(v=i._wrapperState)&&v.controlled&&"number"===i.type&&ae(i,"number",i.value)),v=r?ea(r):window,e){case"focusin":(Hn(v)||"true"===v.contentEditable)&&(mr=v,gr=r,vr=null);break;case"focusout":vr=gr=mr=null;break;case"mousedown":yr=!0;break;case"contextmenu":case"mouseup":case"dragend":yr=!1,br(l,n,a);break;case"selectionchange":if(hr)break;case"keydown":case"keyup":br(l,n,a)}var y;if(In)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else Fn?$n(e,n)&&(b="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(b="onCompositionStart");b&&(Mn&&"ko"!==n.locale&&(Fn||"onCompositionStart"!==b?"onCompositionEnd"===b&&Fn&&(y=nn()):(en="value"in(Jt=a)?Jt.value:Jt.textContent,Fn=!0)),0<(v=Ir(r,b)).length&&(b=new kn(b,e,null,n,a),l.push({event:b,listeners:v}),(y||null!==(y=Un(n)))&&(b.data=y))),(y=zn?function(e,t){switch(e){case"compositionend":return Un(t);case"keypress":return 32!==t.which?null:(jn=!0,Dn);case"textInput":return(e=t.data)===Dn&&jn?null:e;default:return null}}(e,n):function(e,t){if(Fn)return"compositionend"===e||!In&&$n(e,t)?(e=nn(),tn=en=Jt=null,Fn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Mn&&"ko"!==t.locale?null:t.data;default:return null}}(e,n))&&0<(r=Ir(r,"onBeforeInput")).length&&(a=new kn("onBeforeInput","beforeinput",null,n,a),l.push({event:a,listeners:r}),a.data=y)}Cr(l,t)}))}function Ar(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ir(e,t){for(var n=t+"Capture",r=[];null!==e;){var a=e,o=a.stateNode;5===a.tag&&null!==o&&(a=o,null!=(o=$e(e,n))&&r.unshift(Ar(e,o,a)),null!=(o=$e(e,t))&&r.push(Ar(e,o,a))),e=e.return}return r}function Lr(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function zr(e,t,n,r,a){for(var o=t._reactName,l=[];null!==n&&n!==r;){var i=n,u=i.alternate,s=i.stateNode;if(null!==u&&u===r)break;5===i.tag&&null!==s&&(i=s,a?null!=(u=$e(n,o))&&l.unshift(Ar(n,u,i)):a||null!=(u=$e(n,o))&&l.push(Ar(n,u,i))),n=n.return}0!==l.length&&e.push({event:t,listeners:l})}function Mr(){}var Dr=null,jr=null;function $r(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}function Ur(e,t){return"textarea"===e||"option"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var Fr="function"==typeof setTimeout?setTimeout:void 0,Wr="function"==typeof clearTimeout?clearTimeout:void 0;function Hr(e){(1===e.nodeType||9===e.nodeType&&null!=(e=e.body))&&(e.textContent="")}function Br(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break}return e}function Vr(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var Gr=0,Qr=Math.random().toString(36).slice(2),qr="__reactFiber$"+Qr,Yr="__reactProps$"+Qr,Kr="__reactContainer$"+Qr,Xr="__reactEvents$"+Qr;function Zr(e){var t=e[qr];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Kr]||n[qr]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=Vr(e);null!==e;){if(n=e[qr])return n;e=Vr(e)}return t}n=(e=n).parentNode}return null}function Jr(e){return!(e=e[qr]||e[Kr])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function ea(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(l(33))}function ta(e){return e[Yr]||null}function na(e){var t=e[Xr];return void 0===t&&(t=e[Xr]=new Set),t}var ra=[],aa=-1;function oa(e){return{current:e}}function la(e){0>aa||(e.current=ra[aa],ra[aa]=null,aa--)}function ia(e,t){aa++,ra[aa]=e.current,e.current=t}var ua={},sa=oa(ua),ca=oa(!1),fa=ua;function da(e,t){var n=e.type.contextTypes;if(!n)return ua;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a,o={};for(a in n)o[a]=t[a];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function pa(e){return null!=e.childContextTypes}function ha(){la(ca),la(sa)}function ma(e,t,n){if(sa.current!==ua)throw Error(l(168));ia(sa,t),ia(ca,n)}function ga(e,t,n){var r=e.stateNode;if(e=t.childContextTypes,"function"!=typeof r.getChildContext)return n;for(var o in r=r.getChildContext())if(!(o in e))throw Error(l(108,Q(t)||"Unknown",o));return a({},n,r)}function va(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||ua,fa=sa.current,ia(sa,e),ia(ca,ca.current),!0}function ya(e,t,n){var r=e.stateNode;if(!r)throw Error(l(169));n?(e=ga(e,t,fa),r.__reactInternalMemoizedMergedChildContext=e,la(ca),la(sa),ia(sa,e)):la(ca),ia(ca,n)}var ba=null,wa=null,ka=o.unstable_runWithPriority,Ea=o.unstable_scheduleCallback,xa=o.unstable_cancelCallback,Sa=o.unstable_shouldYield,Ca=o.unstable_requestPaint,Na=o.unstable_now,_a=o.unstable_getCurrentPriorityLevel,Ta=o.unstable_ImmediatePriority,Oa=o.unstable_UserBlockingPriority,Pa=o.unstable_NormalPriority,Ra=o.unstable_LowPriority,Aa=o.unstable_IdlePriority,Ia={},La=void 0!==Ca?Ca:function(){},za=null,Ma=null,Da=!1,ja=Na(),$a=1e4>ja?Na:function(){return Na()-ja};function Ua(){switch(_a()){case Ta:return 99;case Oa:return 98;case Pa:return 97;case Ra:return 96;case Aa:return 95;default:throw Error(l(332))}}function Fa(e){switch(e){case 99:return Ta;case 98:return Oa;case 97:return Pa;case 96:return Ra;case 95:return Aa;default:throw Error(l(332))}}function Wa(e,t){return e=Fa(e),ka(e,t)}function Ha(e,t,n){return e=Fa(e),Ea(e,t,n)}function Ba(){if(null!==Ma){var e=Ma;Ma=null,xa(e)}Va()}function Va(){if(!Da&&null!==za){Da=!0;var e=0;try{var t=za;Wa(99,(function(){for(;e<t.length;e++){var n=t[e];do{n=n(!0)}while(null!==n)}})),za=null}catch(t){throw null!==za&&(za=za.slice(e+1)),Ea(Ta,Ba),t}finally{Da=!1}}}var Ga=k.ReactCurrentBatchConfig;function Qa(e,t){if(e&&e.defaultProps){for(var n in t=a({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}var qa=oa(null),Ya=null,Ka=null,Xa=null;function Za(){Xa=Ka=Ya=null}function Ja(e){var t=qa.current;la(qa),e.type._context._currentValue=t}function eo(e,t){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)===t){if(null===n||(n.childLanes&t)===t)break;n.childLanes|=t}else e.childLanes|=t,null!==n&&(n.childLanes|=t);e=e.return}}function to(e,t){Ya=e,Xa=Ka=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!=(e.lanes&t)&&(Il=!0),e.firstContext=null)}function no(e,t){if(Xa!==e&&!1!==t&&0!==t)if("number"==typeof t&&1073741823!==t||(Xa=e,t=1073741823),t={context:e,observedBits:t,next:null},null===Ka){if(null===Ya)throw Error(l(308));Ka=t,Ya.dependencies={lanes:0,firstContext:t,responders:null}}else Ka=Ka.next=t;return e._currentValue}var ro=!1;function ao(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}function oo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function lo(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function io(e,t){if(null!==(e=e.updateQueue)){var n=(e=e.shared).pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}}function uo(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var a=null,o=null;if(null!==(n=n.firstBaseUpdate)){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===o?a=o=l:o=o.next=l,n=n.next}while(null!==n);null===o?a=o=t:o=o.next=t}else a=o=t;return n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function so(e,t,n,r){var o=e.updateQueue;ro=!1;var l=o.firstBaseUpdate,i=o.lastBaseUpdate,u=o.shared.pending;if(null!==u){o.shared.pending=null;var s=u,c=s.next;s.next=null,null===i?l=c:i.next=c,i=s;var f=e.alternate;if(null!==f){var d=(f=f.updateQueue).lastBaseUpdate;d!==i&&(null===d?f.firstBaseUpdate=c:d.next=c,f.lastBaseUpdate=s)}}if(null!==l){for(d=o.baseState,i=0,f=c=s=null;;){u=l.lane;var p=l.eventTime;if((r&u)===u){null!==f&&(f=f.next={eventTime:p,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var h=e,m=l;switch(u=t,p=n,m.tag){case 1:if("function"==typeof(h=m.payload)){d=h.call(p,d,u);break e}d=h;break e;case 3:h.flags=-4097&h.flags|64;case 0:if(null==(u="function"==typeof(h=m.payload)?h.call(p,d,u):h))break e;d=a({},d,u);break e;case 2:ro=!0}}null!==l.callback&&(e.flags|=32,null===(u=o.effects)?o.effects=[l]:u.push(l))}else p={eventTime:p,lane:u,tag:l.tag,payload:l.payload,callback:l.callback,next:null},null===f?(c=f=p,s=d):f=f.next=p,i|=u;if(null===(l=l.next)){if(null===(u=o.shared.pending))break;l=u.next,u.next=null,o.lastBaseUpdate=u,o.shared.pending=null}}null===f&&(s=d),o.baseState=s,o.firstBaseUpdate=c,o.lastBaseUpdate=f,zi|=i,e.lanes=i,e.memoizedState=d}}function co(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(null!==a){if(r.callback=null,r=n,"function"!=typeof a)throw Error(l(191,a));a.call(r)}}}var fo=(new r.Component).refs;function po(e,t,n,r){n=null==(n=n(r,t=e.memoizedState))?t:a({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var ho={isMounted:function(e){return!!(e=e._reactInternals)&&Ye(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=lu(),a=iu(e),o=lo(r,a);o.payload=t,null!=n&&(o.callback=n),io(e,o),uu(e,a,r)},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=lu(),a=iu(e),o=lo(r,a);o.tag=1,o.payload=t,null!=n&&(o.callback=n),io(e,o),uu(e,a,r)},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=lu(),r=iu(e),a=lo(n,r);a.tag=2,null!=t&&(a.callback=t),io(e,a),uu(e,r,n)}};function mo(e,t,n,r,a,o,l){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,l):!(t.prototype&&t.prototype.isPureReactComponent&&ur(n,r)&&ur(a,o))}function go(e,t,n){var r=!1,a=ua,o=t.contextType;return"object"==typeof o&&null!==o?o=no(o):(a=pa(t)?fa:sa.current,o=(r=null!=(r=t.contextTypes))?da(e,a):ua),t=new t(n,o),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=ho,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),t}function vo(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ho.enqueueReplaceState(t,t.state,null)}function yo(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs=fo,ao(e);var o=t.contextType;"object"==typeof o&&null!==o?a.context=no(o):(o=pa(t)?fa:sa.current,a.context=da(e,o)),so(e,n,a,r),a.state=e.memoizedState,"function"==typeof(o=t.getDerivedStateFromProps)&&(po(e,t,o,n),a.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof a.getSnapshotBeforeUpdate||"function"!=typeof a.UNSAFE_componentWillMount&&"function"!=typeof a.componentWillMount||(t=a.state,"function"==typeof a.componentWillMount&&a.componentWillMount(),"function"==typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount(),t!==a.state&&ho.enqueueReplaceState(a,a.state,null),so(e,n,a,r),a.state=e.memoizedState),"function"==typeof a.componentDidMount&&(e.flags|=4)}var bo=Array.isArray;function wo(e,t,n){if(null!==(e=n.ref)&&"function"!=typeof e&&"object"!=typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(l(309));var r=n.stateNode}if(!r)throw Error(l(147,e));var a=""+e;return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===a?t.ref:((t=function(e){var t=r.refs;t===fo&&(t=r.refs={}),null===e?delete t[a]:t[a]=e})._stringRef=a,t)}if("string"!=typeof e)throw Error(l(284));if(!n._owner)throw Error(l(290,e))}return e}function ko(e,t){if("textarea"!==e.type)throw Error(l(31,"[object Object]"===Object.prototype.toString.call(t)?"object with keys {"+Object.keys(t).join(", ")+"}":t))}function Eo(e){function t(t,n){if(e){var r=t.lastEffect;null!==r?(r.nextEffect=n,t.lastEffect=n):t.firstEffect=t.lastEffect=n,n.nextEffect=null,n.flags=8}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function a(e,t){return(e=Uu(e,t)).index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags=2,n):r:(t.flags=2,n):n}function i(t){return e&&null===t.alternate&&(t.flags=2),t}function u(e,t,n,r){return null===t||6!==t.tag?((t=Bu(n,e.mode,r)).return=e,t):((t=a(t,n)).return=e,t)}function s(e,t,n,r){return null!==t&&t.elementType===n.type?((r=a(t,n.props)).ref=wo(e,t,n),r.return=e,r):((r=Fu(n.type,n.key,n.props,null,e.mode,r)).ref=wo(e,t,n),r.return=e,r)}function c(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Vu(n,e.mode,r)).return=e,t):((t=a(t,n.children||[])).return=e,t)}function f(e,t,n,r,o){return null===t||7!==t.tag?((t=Wu(n,e.mode,r,o)).return=e,t):((t=a(t,n)).return=e,t)}function d(e,t,n){if("string"==typeof t||"number"==typeof t)return(t=Bu(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case E:return(n=Fu(t.type,t.key,t.props,null,e.mode,n)).ref=wo(e,null,t),n.return=e,n;case x:return(t=Vu(t,e.mode,n)).return=e,t}if(bo(t)||W(t))return(t=Wu(t,e.mode,n,null)).return=e,t;ko(e,t)}return null}function p(e,t,n,r){var a=null!==t?t.key:null;if("string"==typeof n||"number"==typeof n)return null!==a?null:u(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case E:return n.key===a?n.type===S?f(e,t,n.props.children,r,a):s(e,t,n,r):null;case x:return n.key===a?c(e,t,n,r):null}if(bo(n)||W(n))return null!==a?null:f(e,t,n,r,null);ko(e,n)}return null}function h(e,t,n,r,a){if("string"==typeof r||"number"==typeof r)return u(t,e=e.get(n)||null,""+r,a);if("object"==typeof r&&null!==r){switch(r.$$typeof){case E:return e=e.get(null===r.key?n:r.key)||null,r.type===S?f(t,e,r.props.children,a,r.key):s(t,e,r,a);case x:return c(t,e=e.get(null===r.key?n:r.key)||null,r,a)}if(bo(r)||W(r))return f(t,e=e.get(n)||null,r,a,null);ko(t,r)}return null}function m(a,l,i,u){for(var s=null,c=null,f=l,m=l=0,g=null;null!==f&&m<i.length;m++){f.index>m?(g=f,f=null):g=f.sibling;var v=p(a,f,i[m],u);if(null===v){null===f&&(f=g);break}e&&f&&null===v.alternate&&t(a,f),l=o(v,l,m),null===c?s=v:c.sibling=v,c=v,f=g}if(m===i.length)return n(a,f),s;if(null===f){for(;m<i.length;m++)null!==(f=d(a,i[m],u))&&(l=o(f,l,m),null===c?s=f:c.sibling=f,c=f);return s}for(f=r(a,f);m<i.length;m++)null!==(g=h(f,a,m,i[m],u))&&(e&&null!==g.alternate&&f.delete(null===g.key?m:g.key),l=o(g,l,m),null===c?s=g:c.sibling=g,c=g);return e&&f.forEach((function(e){return t(a,e)})),s}function g(a,i,u,s){var c=W(u);if("function"!=typeof c)throw Error(l(150));if(null==(u=c.call(u)))throw Error(l(151));for(var f=c=null,m=i,g=i=0,v=null,y=u.next();null!==m&&!y.done;g++,y=u.next()){m.index>g?(v=m,m=null):v=m.sibling;var b=p(a,m,y.value,s);if(null===b){null===m&&(m=v);break}e&&m&&null===b.alternate&&t(a,m),i=o(b,i,g),null===f?c=b:f.sibling=b,f=b,m=v}if(y.done)return n(a,m),c;if(null===m){for(;!y.done;g++,y=u.next())null!==(y=d(a,y.value,s))&&(i=o(y,i,g),null===f?c=y:f.sibling=y,f=y);return c}for(m=r(a,m);!y.done;g++,y=u.next())null!==(y=h(m,a,g,y.value,s))&&(e&&null!==y.alternate&&m.delete(null===y.key?g:y.key),i=o(y,i,g),null===f?c=y:f.sibling=y,f=y);return e&&m.forEach((function(e){return t(a,e)})),c}return function(e,r,o,u){var s="object"==typeof o&&null!==o&&o.type===S&&null===o.key;s&&(o=o.props.children);var c="object"==typeof o&&null!==o;if(c)switch(o.$$typeof){case E:e:{for(c=o.key,s=r;null!==s;){if(s.key===c){switch(s.tag){case 7:if(o.type===S){n(e,s.sibling),(r=a(s,o.props.children)).return=e,e=r;break e}break;default:if(s.elementType===o.type){n(e,s.sibling),(r=a(s,o.props)).ref=wo(e,s,o),r.return=e,e=r;break e}}n(e,s);break}t(e,s),s=s.sibling}o.type===S?((r=Wu(o.props.children,e.mode,u,o.key)).return=e,e=r):((u=Fu(o.type,o.key,o.props,null,e.mode,u)).ref=wo(e,r,o),u.return=e,e=u)}return i(e);case x:e:{for(s=o.key;null!==r;){if(r.key===s){if(4===r.tag&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),(r=a(r,o.children||[])).return=e,e=r;break e}n(e,r);break}t(e,r),r=r.sibling}(r=Vu(o,e.mode,u)).return=e,e=r}return i(e)}if("string"==typeof o||"number"==typeof o)return o=""+o,null!==r&&6===r.tag?(n(e,r.sibling),(r=a(r,o)).return=e,e=r):(n(e,r),(r=Bu(o,e.mode,u)).return=e,e=r),i(e);if(bo(o))return m(e,r,o,u);if(W(o))return g(e,r,o,u);if(c&&ko(e,o),void 0===o&&!s)switch(e.tag){case 1:case 22:case 0:case 11:case 15:throw Error(l(152,Q(e.type)||"Component"))}return n(e,r)}}var xo=Eo(!0),So=Eo(!1),Co={},No=oa(Co),_o=oa(Co),To=oa(Co);function Oo(e){if(e===Co)throw Error(l(174));return e}function Po(e,t){switch(ia(To,t),ia(_o,e),ia(No,Co),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:pe(null,"");break;default:t=pe(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}la(No),ia(No,t)}function Ro(){la(No),la(_o),la(To)}function Ao(e){Oo(To.current);var t=Oo(No.current),n=pe(t,e.type);t!==n&&(ia(_o,e),ia(No,n))}function Io(e){_o.current===e&&(la(No),la(_o))}var Lo=oa(0);function zo(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!=(64&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Mo=null,Do=null,jo=!1;function $o(e,t){var n=ju(5,null,null,0);n.elementType="DELETED",n.type="DELETED",n.stateNode=t,n.return=e,n.flags=8,null!==e.lastEffect?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}function Uo(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,!0);case 13:default:return!1}}function Fo(e){if(jo){var t=Do;if(t){var n=t;if(!Uo(e,t)){if(!(t=Br(n.nextSibling))||!Uo(e,t))return e.flags=-1025&e.flags|2,jo=!1,void(Mo=e);$o(Mo,n)}Mo=e,Do=Br(t.firstChild)}else e.flags=-1025&e.flags|2,jo=!1,Mo=e}}function Wo(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;Mo=e}function Ho(e){if(e!==Mo)return!1;if(!jo)return Wo(e),jo=!0,!1;var t=e.type;if(5!==e.tag||"head"!==t&&"body"!==t&&!Ur(t,e.memoizedProps))for(t=Do;t;)$o(e,t),t=Br(t.nextSibling);if(Wo(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(l(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){Do=Br(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}Do=null}}else Do=Mo?Br(e.stateNode.nextSibling):null;return!0}function Bo(){Do=Mo=null,jo=!1}var Vo=[];function Go(){for(var e=0;e<Vo.length;e++)Vo[e]._workInProgressVersionPrimary=null;Vo.length=0}var Qo=k.ReactCurrentDispatcher,qo=k.ReactCurrentBatchConfig,Yo=0,Ko=null,Xo=null,Zo=null,Jo=!1,el=!1;function tl(){throw Error(l(321))}function nl(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!lr(e[n],t[n]))return!1;return!0}function rl(e,t,n,r,a,o){if(Yo=o,Ko=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Qo.current=null===e||null===e.memoizedState?Ol:Pl,e=n(r,a),el){o=0;do{if(el=!1,!(25>o))throw Error(l(301));o+=1,Zo=Xo=null,t.updateQueue=null,Qo.current=Rl,e=n(r,a)}while(el)}if(Qo.current=Tl,t=null!==Xo&&null!==Xo.next,Yo=0,Zo=Xo=Ko=null,Jo=!1,t)throw Error(l(300));return e}function al(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Zo?Ko.memoizedState=Zo=e:Zo=Zo.next=e,Zo}function ol(){if(null===Xo){var e=Ko.alternate;e=null!==e?e.memoizedState:null}else e=Xo.next;var t=null===Zo?Ko.memoizedState:Zo.next;if(null!==t)Zo=t,Xo=e;else{if(null===e)throw Error(l(310));e={memoizedState:(Xo=e).memoizedState,baseState:Xo.baseState,baseQueue:Xo.baseQueue,queue:Xo.queue,next:null},null===Zo?Ko.memoizedState=Zo=e:Zo=Zo.next=e}return Zo}function ll(e,t){return"function"==typeof t?t(e):t}function il(e){var t=ol(),n=t.queue;if(null===n)throw Error(l(311));n.lastRenderedReducer=e;var r=Xo,a=r.baseQueue,o=n.pending;if(null!==o){if(null!==a){var i=a.next;a.next=o.next,o.next=i}r.baseQueue=a=o,n.pending=null}if(null!==a){a=a.next,r=r.baseState;var u=i=o=null,s=a;do{var c=s.lane;if((Yo&c)===c)null!==u&&(u=u.next={lane:0,action:s.action,eagerReducer:s.eagerReducer,eagerState:s.eagerState,next:null}),r=s.eagerReducer===e?s.eagerState:e(r,s.action);else{var f={lane:c,action:s.action,eagerReducer:s.eagerReducer,eagerState:s.eagerState,next:null};null===u?(i=u=f,o=r):u=u.next=f,Ko.lanes|=c,zi|=c}s=s.next}while(null!==s&&s!==a);null===u?o=r:u.next=i,lr(r,t.memoizedState)||(Il=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=u,n.lastRenderedState=r}return[t.memoizedState,n.dispatch]}function ul(e){var t=ol(),n=t.queue;if(null===n)throw Error(l(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(null!==a){n.pending=null;var i=a=a.next;do{o=e(o,i.action),i=i.next}while(i!==a);lr(o,t.memoizedState)||(Il=!0),t.memoizedState=o,null===t.baseQueue&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function sl(e,t,n){var r=t._getVersion;r=r(t._source);var a=t._workInProgressVersionPrimary;if(null!==a?e=a===r:(e=e.mutableReadLanes,(e=(Yo&e)===e)&&(t._workInProgressVersionPrimary=r,Vo.push(t))),e)return n(t._source);throw Vo.push(t),Error(l(350))}function cl(e,t,n,r){var a=_i;if(null===a)throw Error(l(349));var o=t._getVersion,i=o(t._source),u=Qo.current,s=u.useState((function(){return sl(a,t,n)})),c=s[1],f=s[0];s=Zo;var d=e.memoizedState,p=d.refs,h=p.getSnapshot,m=d.source;d=d.subscribe;var g=Ko;return e.memoizedState={refs:p,source:t,subscribe:r},u.useEffect((function(){p.getSnapshot=n,p.setSnapshot=c;var e=o(t._source);if(!lr(i,e)){e=n(t._source),lr(f,e)||(c(e),e=iu(g),a.mutableReadLanes|=e&a.pendingLanes),e=a.mutableReadLanes,a.entangledLanes|=e;for(var r=a.entanglements,l=e;0<l;){var u=31-Ht(l),s=1<<u;r[u]|=e,l&=~s}}}),[n,t,r]),u.useEffect((function(){return r(t._source,(function(){var e=p.getSnapshot,n=p.setSnapshot;try{n(e(t._source));var r=iu(g);a.mutableReadLanes|=r&a.pendingLanes}catch(e){n((function(){throw e}))}}))}),[t,r]),lr(h,n)&&lr(m,t)&&lr(d,r)||((e={pending:null,dispatch:null,lastRenderedReducer:ll,lastRenderedState:f}).dispatch=c=_l.bind(null,Ko,e),s.queue=e,s.baseQueue=null,f=sl(a,t,n),s.memoizedState=s.baseState=f),f}function fl(e,t,n){return cl(ol(),e,t,n)}function dl(e){var t=al();return"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e,e=(e=t.queue={pending:null,dispatch:null,lastRenderedReducer:ll,lastRenderedState:e}).dispatch=_l.bind(null,Ko,e),[t.memoizedState,e]}function pl(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=Ko.updateQueue)?(t={lastEffect:null},Ko.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function hl(e){return e={current:e},al().memoizedState=e}function ml(){return ol().memoizedState}function gl(e,t,n,r){var a=al();Ko.flags|=e,a.memoizedState=pl(1|t,n,void 0,void 0===r?null:r)}function vl(e,t,n,r){var a=ol();r=void 0===r?null:r;var o=void 0;if(null!==Xo){var l=Xo.memoizedState;if(o=l.destroy,null!==r&&nl(r,l.deps))return void pl(t,n,o,r)}Ko.flags|=e,a.memoizedState=pl(1|t,n,o,r)}function yl(e,t){return gl(516,4,e,t)}function bl(e,t){return vl(516,4,e,t)}function wl(e,t){return vl(4,2,e,t)}function kl(e,t){return"function"==typeof t?(e=e(),t(e),function(){t(null)}):null!=t?(e=e(),t.current=e,function(){t.current=null}):void 0}function El(e,t,n){return n=null!=n?n.concat([e]):null,vl(4,2,kl.bind(null,t,e),n)}function xl(){}function Sl(e,t){var n=ol();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&nl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Cl(e,t){var n=ol();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&nl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Nl(e,t){var n=Ua();Wa(98>n?98:n,(function(){e(!0)})),Wa(97<n?97:n,(function(){var n=qo.transition;qo.transition=1;try{e(!1),t()}finally{qo.transition=n}}))}function _l(e,t,n){var r=lu(),a=iu(e),o={lane:a,action:n,eagerReducer:null,eagerState:null,next:null},l=t.pending;if(null===l?o.next=o:(o.next=l.next,l.next=o),t.pending=o,l=e.alternate,e===Ko||null!==l&&l===Ko)el=Jo=!0;else{if(0===e.lanes&&(null===l||0===l.lanes)&&null!==(l=t.lastRenderedReducer))try{var i=t.lastRenderedState,u=l(i,n);if(o.eagerReducer=l,o.eagerState=u,lr(u,i))return}catch(e){}uu(e,a,r)}}var Tl={readContext:no,useCallback:tl,useContext:tl,useEffect:tl,useImperativeHandle:tl,useLayoutEffect:tl,useMemo:tl,useReducer:tl,useRef:tl,useState:tl,useDebugValue:tl,useDeferredValue:tl,useTransition:tl,useMutableSource:tl,useOpaqueIdentifier:tl,unstable_isNewReconciler:!1},Ol={readContext:no,useCallback:function(e,t){return al().memoizedState=[e,void 0===t?null:t],e},useContext:no,useEffect:yl,useImperativeHandle:function(e,t,n){return n=null!=n?n.concat([e]):null,gl(4,2,kl.bind(null,t,e),n)},useLayoutEffect:function(e,t){return gl(4,2,e,t)},useMemo:function(e,t){var n=al();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=al();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e=(e=r.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t}).dispatch=_l.bind(null,Ko,e),[r.memoizedState,e]},useRef:hl,useState:dl,useDebugValue:xl,useDeferredValue:function(e){var t=dl(e),n=t[0],r=t[1];return yl((function(){var t=qo.transition;qo.transition=1;try{r(e)}finally{qo.transition=t}}),[e]),n},useTransition:function(){var e=dl(!1),t=e[0];return hl(e=Nl.bind(null,e[1])),[e,t]},useMutableSource:function(e,t,n){var r=al();return r.memoizedState={refs:{getSnapshot:t,setSnapshot:null},source:e,subscribe:n},cl(r,e,t,n)},useOpaqueIdentifier:function(){if(jo){var e=!1,t=function(e){return{$$typeof:z,toString:e,valueOf:e}}((function(){throw e||(e=!0,n("r:"+(Gr++).toString(36))),Error(l(355))})),n=dl(t)[1];return 0==(2&Ko.mode)&&(Ko.flags|=516,pl(5,(function(){n("r:"+(Gr++).toString(36))}),void 0,null)),t}return dl(t="r:"+(Gr++).toString(36)),t},unstable_isNewReconciler:!1},Pl={readContext:no,useCallback:Sl,useContext:no,useEffect:bl,useImperativeHandle:El,useLayoutEffect:wl,useMemo:Cl,useReducer:il,useRef:ml,useState:function(){return il(ll)},useDebugValue:xl,useDeferredValue:function(e){var t=il(ll),n=t[0],r=t[1];return bl((function(){var t=qo.transition;qo.transition=1;try{r(e)}finally{qo.transition=t}}),[e]),n},useTransition:function(){var e=il(ll)[0];return[ml().current,e]},useMutableSource:fl,useOpaqueIdentifier:function(){return il(ll)[0]},unstable_isNewReconciler:!1},Rl={readContext:no,useCallback:Sl,useContext:no,useEffect:bl,useImperativeHandle:El,useLayoutEffect:wl,useMemo:Cl,useReducer:ul,useRef:ml,useState:function(){return ul(ll)},useDebugValue:xl,useDeferredValue:function(e){var t=ul(ll),n=t[0],r=t[1];return bl((function(){var t=qo.transition;qo.transition=1;try{r(e)}finally{qo.transition=t}}),[e]),n},useTransition:function(){var e=ul(ll)[0];return[ml().current,e]},useMutableSource:fl,useOpaqueIdentifier:function(){return ul(ll)[0]},unstable_isNewReconciler:!1},Al=k.ReactCurrentOwner,Il=!1;function Ll(e,t,n,r){t.child=null===e?So(t,null,n,r):xo(t,e.child,n,r)}function zl(e,t,n,r,a){n=n.render;var o=t.ref;return to(t,a),r=rl(e,t,n,r,o,a),null===e||Il?(t.flags|=1,Ll(e,t,r,a),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~a,Jl(e,t,a))}function Ml(e,t,n,r,a,o){if(null===e){var l=n.type;return"function"!=typeof l||$u(l)||void 0!==l.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Fu(n.type,null,r,t,t.mode,o)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=l,Dl(e,t,l,r,a,o))}return l=e.child,0==(a&o)&&(a=l.memoizedProps,(n=null!==(n=n.compare)?n:ur)(a,r)&&e.ref===t.ref)?Jl(e,t,o):(t.flags|=1,(e=Uu(l,r)).ref=t.ref,e.return=t,t.child=e)}function Dl(e,t,n,r,a,o){if(null!==e&&ur(e.memoizedProps,r)&&e.ref===t.ref){if(Il=!1,0==(o&a))return t.lanes=e.lanes,Jl(e,t,o);0!=(16384&e.flags)&&(Il=!0)}return Ul(e,t,n,r,o)}function jl(e,t,n){var r=t.pendingProps,a=r.children,o=null!==e?e.memoizedState:null;if("hidden"===r.mode||"unstable-defer-without-hiding"===r.mode)if(0==(4&t.mode))t.memoizedState={baseLanes:0},gu(0,n);else{if(0==(1073741824&n))return e=null!==o?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e},gu(0,e),null;t.memoizedState={baseLanes:0},gu(0,null!==o?o.baseLanes:n)}else null!==o?(r=o.baseLanes|n,t.memoizedState=null):r=n,gu(0,r);return Ll(e,t,a,n),t.child}function $l(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=128)}function Ul(e,t,n,r,a){var o=pa(n)?fa:sa.current;return o=da(t,o),to(t,a),n=rl(e,t,n,r,o,a),null===e||Il?(t.flags|=1,Ll(e,t,n,a),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~a,Jl(e,t,a))}function Fl(e,t,n,r,a){if(pa(n)){var o=!0;va(t)}else o=!1;if(to(t,a),null===t.stateNode)null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),go(t,n,r),yo(t,n,r,a),r=!0;else if(null===e){var l=t.stateNode,i=t.memoizedProps;l.props=i;var u=l.context,s=n.contextType;s="object"==typeof s&&null!==s?no(s):da(t,s=pa(n)?fa:sa.current);var c=n.getDerivedStateFromProps,f="function"==typeof c||"function"==typeof l.getSnapshotBeforeUpdate;f||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(i!==r||u!==s)&&vo(t,l,r,s),ro=!1;var d=t.memoizedState;l.state=d,so(t,r,l,a),u=t.memoizedState,i!==r||d!==u||ca.current||ro?("function"==typeof c&&(po(t,n,c,r),u=t.memoizedState),(i=ro||mo(t,n,i,r,d,u,s))?(f||"function"!=typeof l.UNSAFE_componentWillMount&&"function"!=typeof l.componentWillMount||("function"==typeof l.componentWillMount&&l.componentWillMount(),"function"==typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount()),"function"==typeof l.componentDidMount&&(t.flags|=4)):("function"==typeof l.componentDidMount&&(t.flags|=4),t.memoizedProps=r,t.memoizedState=u),l.props=r,l.state=u,l.context=s,r=i):("function"==typeof l.componentDidMount&&(t.flags|=4),r=!1)}else{l=t.stateNode,oo(e,t),i=t.memoizedProps,s=t.type===t.elementType?i:Qa(t.type,i),l.props=s,f=t.pendingProps,d=l.context,u="object"==typeof(u=n.contextType)&&null!==u?no(u):da(t,u=pa(n)?fa:sa.current);var p=n.getDerivedStateFromProps;(c="function"==typeof p||"function"==typeof l.getSnapshotBeforeUpdate)||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(i!==f||d!==u)&&vo(t,l,r,u),ro=!1,d=t.memoizedState,l.state=d,so(t,r,l,a);var h=t.memoizedState;i!==f||d!==h||ca.current||ro?("function"==typeof p&&(po(t,n,p,r),h=t.memoizedState),(s=ro||mo(t,n,s,r,d,h,u))?(c||"function"!=typeof l.UNSAFE_componentWillUpdate&&"function"!=typeof l.componentWillUpdate||("function"==typeof l.componentWillUpdate&&l.componentWillUpdate(r,h,u),"function"==typeof l.UNSAFE_componentWillUpdate&&l.UNSAFE_componentWillUpdate(r,h,u)),"function"==typeof l.componentDidUpdate&&(t.flags|=4),"function"==typeof l.getSnapshotBeforeUpdate&&(t.flags|=256)):("function"!=typeof l.componentDidUpdate||i===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),"function"!=typeof l.getSnapshotBeforeUpdate||i===e.memoizedProps&&d===e.memoizedState||(t.flags|=256),t.memoizedProps=r,t.memoizedState=h),l.props=r,l.state=h,l.context=u,r=s):("function"!=typeof l.componentDidUpdate||i===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),"function"!=typeof l.getSnapshotBeforeUpdate||i===e.memoizedProps&&d===e.memoizedState||(t.flags|=256),r=!1)}return Wl(e,t,n,r,o,a)}function Wl(e,t,n,r,a,o){$l(e,t);var l=0!=(64&t.flags);if(!r&&!l)return a&&ya(t,n,!1),Jl(e,t,o);r=t.stateNode,Al.current=t;var i=l&&"function"!=typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&l?(t.child=xo(t,e.child,null,o),t.child=xo(t,null,i,o)):Ll(e,t,i,o),t.memoizedState=r.state,a&&ya(t,n,!0),t.child}function Hl(e){var t=e.stateNode;t.pendingContext?ma(0,t.pendingContext,t.pendingContext!==t.context):t.context&&ma(0,t.context,!1),Po(e,t.containerInfo)}var Bl,Vl,Gl,Ql={dehydrated:null,retryLane:0};function ql(e,t,n){var r,a=t.pendingProps,o=Lo.current,l=!1;return(r=0!=(64&t.flags))||(r=(null===e||null!==e.memoizedState)&&0!=(2&o)),r?(l=!0,t.flags&=-65):null!==e&&null===e.memoizedState||void 0===a.fallback||!0===a.unstable_avoidThisFallback||(o|=1),ia(Lo,1&o),null===e?(void 0!==a.fallback&&Fo(t),e=a.children,o=a.fallback,l?(e=Yl(t,e,o,n),t.child.memoizedState={baseLanes:n},t.memoizedState=Ql,e):"number"==typeof a.unstable_expectedLoadTime?(e=Yl(t,e,o,n),t.child.memoizedState={baseLanes:n},t.memoizedState=Ql,t.lanes=33554432,e):((n=Hu({mode:"visible",children:e},t.mode,n,null)).return=t,t.child=n)):(e.memoizedState,l?(a=function(e,t,n,r,a){var o=t.mode,l=e.child;e=l.sibling;var i={mode:"hidden",children:n};return 0==(2&o)&&t.child!==l?((n=t.child).childLanes=0,n.pendingProps=i,null!==(l=n.lastEffect)?(t.firstEffect=n.firstEffect,t.lastEffect=l,l.nextEffect=null):t.firstEffect=t.lastEffect=null):n=Uu(l,i),null!==e?r=Uu(e,r):(r=Wu(r,o,a,null)).flags|=2,r.return=t,n.return=t,n.sibling=r,t.child=n,r}(e,t,a.children,a.fallback,n),l=t.child,o=e.child.memoizedState,l.memoizedState=null===o?{baseLanes:n}:{baseLanes:o.baseLanes|n},l.childLanes=e.childLanes&~n,t.memoizedState=Ql,a):(n=function(e,t,n,r){var a=e.child;return e=a.sibling,n=Uu(a,{mode:"visible",children:n}),0==(2&t.mode)&&(n.lanes=r),n.return=t,n.sibling=null,null!==e&&(e.nextEffect=null,e.flags=8,t.firstEffect=t.lastEffect=e),t.child=n}(e,t,a.children,n),t.memoizedState=null,n))}function Yl(e,t,n,r){var a=e.mode,o=e.child;return t={mode:"hidden",children:t},0==(2&a)&&null!==o?(o.childLanes=0,o.pendingProps=t):o=Hu(t,a,0,null),n=Wu(n,a,r,null),o.return=e,n.return=e,o.sibling=n,e.child=o,n}function Kl(e,t){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),eo(e.return,t)}function Xl(e,t,n,r,a,o){var l=e.memoizedState;null===l?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a,lastEffect:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=a,l.lastEffect=o)}function Zl(e,t,n){var r=t.pendingProps,a=r.revealOrder,o=r.tail;if(Ll(e,t,r.children,n),0!=(2&(r=Lo.current)))r=1&r|2,t.flags|=64;else{if(null!==e&&0!=(64&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Kl(e,n);else if(19===e.tag)Kl(e,n);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ia(Lo,r),0==(2&t.mode))t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;null!==n;)null!==(e=n.alternate)&&null===zo(e)&&(a=n),n=n.sibling;null===(n=a)?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Xl(t,!1,a,n,o,t.lastEffect);break;case"backwards":for(n=null,a=t.child,t.child=null;null!==a;){if(null!==(e=a.alternate)&&null===zo(e)){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Xl(t,!0,n,null,o,t.lastEffect);break;case"together":Xl(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null}return t.child}function Jl(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),zi|=t.lanes,0!=(n&t.childLanes)){if(null!==e&&t.child!==e.child)throw Error(l(153));if(null!==t.child){for(n=Uu(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Uu(e,e.pendingProps)).return=t;n.sibling=null}return t.child}return null}function ei(e,t){if(!jo)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ti(e,t,n){var r=t.pendingProps;switch(t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return pa(t.type)&&ha(),null;case 3:return Ro(),la(ca),la(sa),Go(),(r=t.stateNode).pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(Ho(t)?t.flags|=4:r.hydrate||(t.flags|=256)),null;case 5:Io(t);var o=Oo(To.current);if(n=t.type,null!==e&&null!=t.stateNode)Vl(e,t,n,r),e.ref!==t.ref&&(t.flags|=128);else{if(!r){if(null===t.stateNode)throw Error(l(166));return null}if(e=Oo(No.current),Ho(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[qr]=t,r[Yr]=i,n){case"dialog":Nr("cancel",r),Nr("close",r);break;case"iframe":case"object":case"embed":Nr("load",r);break;case"video":case"audio":for(e=0;e<Er.length;e++)Nr(Er[e],r);break;case"source":Nr("error",r);break;case"img":case"image":case"link":Nr("error",r),Nr("load",r);break;case"details":Nr("toggle",r);break;case"input":ee(r,i),Nr("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},Nr("invalid",r);break;case"textarea":ue(r,i),Nr("invalid",r)}for(var s in xe(n,i),e=null,i)i.hasOwnProperty(s)&&(o=i[s],"children"===s?"string"==typeof o?r.textContent!==o&&(e=["children",o]):"number"==typeof o&&r.textContent!==""+o&&(e=["children",""+o]):u.hasOwnProperty(s)&&null!=o&&"onScroll"===s&&Nr("scroll",r));switch(n){case"input":K(r),re(r,i,!0);break;case"textarea":K(r),ce(r);break;case"select":case"option":break;default:"function"==typeof i.onClick&&(r.onclick=Mr)}r=e,t.updateQueue=r,null!==r&&(t.flags|=4)}else{switch(s=9===o.nodeType?o:o.ownerDocument,e===fe&&(e=de(n)),e===fe?"script"===n?((e=s.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"==typeof r.is?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),"select"===n&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[qr]=t,e[Yr]=r,Bl(e,t),t.stateNode=e,s=Se(n,r),n){case"dialog":Nr("cancel",e),Nr("close",e),o=r;break;case"iframe":case"object":case"embed":Nr("load",e),o=r;break;case"video":case"audio":for(o=0;o<Er.length;o++)Nr(Er[o],e);o=r;break;case"source":Nr("error",e),o=r;break;case"img":case"image":case"link":Nr("error",e),Nr("load",e),o=r;break;case"details":Nr("toggle",e),o=r;break;case"input":ee(e,r),o=J(e,r),Nr("invalid",e);break;case"option":o=oe(e,r);break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=a({},r,{value:void 0}),Nr("invalid",e);break;case"textarea":ue(e,r),o=ie(e,r),Nr("invalid",e);break;default:o=r}xe(n,o);var c=o;for(i in c)if(c.hasOwnProperty(i)){var f=c[i];"style"===i?ke(e,f):"dangerouslySetInnerHTML"===i?null!=(f=f?f.__html:void 0)&&ge(e,f):"children"===i?"string"==typeof f?("textarea"!==n||""!==f)&&ve(e,f):"number"==typeof f&&ve(e,""+f):"suppressContentEditableWarning"!==i&&"suppressHydrationWarning"!==i&&"autoFocus"!==i&&(u.hasOwnProperty(i)?null!=f&&"onScroll"===i&&Nr("scroll",e):null!=f&&w(e,i,f,s))}switch(n){case"input":K(e),re(e,r,!1);break;case"textarea":K(e),ce(e);break;case"option":null!=r.value&&e.setAttribute("value",""+q(r.value));break;case"select":e.multiple=!!r.multiple,null!=(i=r.value)?le(e,!!r.multiple,i,!1):null!=r.defaultValue&&le(e,!!r.multiple,r.defaultValue,!0);break;default:"function"==typeof o.onClick&&(e.onclick=Mr)}$r(n,r)&&(t.flags|=4)}null!==t.ref&&(t.flags|=128)}return null;case 6:if(e&&null!=t.stateNode)Gl(0,t,e.memoizedProps,r);else{if("string"!=typeof r&&null===t.stateNode)throw Error(l(166));n=Oo(To.current),Oo(No.current),Ho(t)?(r=t.stateNode,n=t.memoizedProps,r[qr]=t,r.nodeValue!==n&&(t.flags|=4)):((r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[qr]=t,t.stateNode=r)}return null;case 13:return la(Lo),r=t.memoizedState,0!=(64&t.flags)?(t.lanes=n,t):(r=null!==r,n=!1,null===e?void 0!==t.memoizedProps.fallback&&Ho(t):n=null!==e.memoizedState,r&&!n&&0!=(2&t.mode)&&(null===e&&!0!==t.memoizedProps.unstable_avoidThisFallback||0!=(1&Lo.current)?0===Ai&&(Ai=3):(0!==Ai&&3!==Ai||(Ai=4),null===_i||0==(134217727&zi)&&0==(134217727&Mi)||du(_i,Oi))),(r||n)&&(t.flags|=4),null);case 4:return Ro(),null===e&&Tr(t.stateNode.containerInfo),null;case 10:return Ja(t),null;case 17:return pa(t.type)&&ha(),null;case 19:if(la(Lo),null===(r=t.memoizedState))return null;if(i=0!=(64&t.flags),null===(s=r.rendering))if(i)ei(r,!1);else{if(0!==Ai||null!==e&&0!=(64&e.flags))for(e=t.child;null!==e;){if(null!==(s=zo(e))){for(t.flags|=64,ei(r,!1),null!==(i=s.updateQueue)&&(t.updateQueue=i,t.flags|=4),null===r.lastEffect&&(t.firstEffect=null),t.lastEffect=r.lastEffect,r=n,n=t.child;null!==n;)e=r,(i=n).flags&=2,i.nextEffect=null,i.firstEffect=null,i.lastEffect=null,null===(s=i.alternate)?(i.childLanes=0,i.lanes=e,i.child=null,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=s.childLanes,i.lanes=s.lanes,i.child=s.child,i.memoizedProps=s.memoizedProps,i.memoizedState=s.memoizedState,i.updateQueue=s.updateQueue,i.type=s.type,e=s.dependencies,i.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ia(Lo,1&Lo.current|2),t.child}e=e.sibling}null!==r.tail&&$a()>Ui&&(t.flags|=64,i=!0,ei(r,!1),t.lanes=33554432)}else{if(!i)if(null!==(e=zo(s))){if(t.flags|=64,i=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),ei(r,!0),null===r.tail&&"hidden"===r.tailMode&&!s.alternate&&!jo)return null!==(t=t.lastEffect=r.lastEffect)&&(t.nextEffect=null),null}else 2*$a()-r.renderingStartTime>Ui&&1073741824!==n&&(t.flags|=64,i=!0,ei(r,!1),t.lanes=33554432);r.isBackwards?(s.sibling=t.child,t.child=s):(null!==(n=r.last)?n.sibling=s:t.child=s,r.last=s)}return null!==r.tail?(n=r.tail,r.rendering=n,r.tail=n.sibling,r.lastEffect=t.lastEffect,r.renderingStartTime=$a(),n.sibling=null,t=Lo.current,ia(Lo,i?1&t|2:1&t),n):null;case 23:case 24:return vu(),null!==e&&null!==e.memoizedState!=(null!==t.memoizedState)&&"unstable-defer-without-hiding"!==r.mode&&(t.flags|=4),null}throw Error(l(156,t.tag))}function ni(e){switch(e.tag){case 1:pa(e.type)&&ha();var t=e.flags;return 4096&t?(e.flags=-4097&t|64,e):null;case 3:if(Ro(),la(ca),la(sa),Go(),0!=(64&(t=e.flags)))throw Error(l(285));return e.flags=-4097&t|64,e;case 5:return Io(e),null;case 13:return la(Lo),4096&(t=e.flags)?(e.flags=-4097&t|64,e):null;case 19:return la(Lo),null;case 4:return Ro(),null;case 10:return Ja(e),null;case 23:case 24:return vu(),null;default:return null}}function ri(e,t){try{var n="",r=t;do{n+=G(r),r=r.return}while(r);var a=n}catch(e){a="\nError generating stack: "+e.message+"\n"+e.stack}return{value:e,source:t,stack:a}}function ai(e,t){try{console.error(t.value)}catch(e){setTimeout((function(){throw e}))}}Bl=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Vl=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Oo(No.current);var l,i=null;switch(n){case"input":o=J(e,o),r=J(e,r),i=[];break;case"option":o=oe(e,o),r=oe(e,r),i=[];break;case"select":o=a({},o,{value:void 0}),r=a({},r,{value:void 0}),i=[];break;case"textarea":o=ie(e,o),r=ie(e,r),i=[];break;default:"function"!=typeof o.onClick&&"function"==typeof r.onClick&&(e.onclick=Mr)}for(f in xe(n,r),n=null,o)if(!r.hasOwnProperty(f)&&o.hasOwnProperty(f)&&null!=o[f])if("style"===f){var s=o[f];for(l in s)s.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else"dangerouslySetInnerHTML"!==f&&"children"!==f&&"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(u.hasOwnProperty(f)?i||(i=[]):(i=i||[]).push(f,null));for(f in r){var c=r[f];if(s=null!=o?o[f]:void 0,r.hasOwnProperty(f)&&c!==s&&(null!=c||null!=s))if("style"===f)if(s){for(l in s)!s.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in c)c.hasOwnProperty(l)&&s[l]!==c[l]&&(n||(n={}),n[l]=c[l])}else n||(i||(i=[]),i.push(f,n)),n=c;else"dangerouslySetInnerHTML"===f?(c=c?c.__html:void 0,s=s?s.__html:void 0,null!=c&&s!==c&&(i=i||[]).push(f,c)):"children"===f?"string"!=typeof c&&"number"!=typeof c||(i=i||[]).push(f,""+c):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&(u.hasOwnProperty(f)?(null!=c&&"onScroll"===f&&Nr("scroll",e),i||s===c||(i=[])):"object"==typeof c&&null!==c&&c.$$typeof===z?c.toString():(i=i||[]).push(f,c))}n&&(i=i||[]).push("style",n);var f=i;(t.updateQueue=f)&&(t.flags|=4)}},Gl=function(e,t,n,r){n!==r&&(t.flags|=4)};var oi="function"==typeof WeakMap?WeakMap:Map;function li(e,t,n){(n=lo(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Bi||(Bi=!0,Vi=r),ai(0,t)},n}function ii(e,t,n){(n=lo(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"==typeof r){var a=t.value;n.payload=function(){return ai(0,t),r(a)}}var o=e.stateNode;return null!==o&&"function"==typeof o.componentDidCatch&&(n.callback=function(){"function"!=typeof r&&(null===Gi?Gi=new Set([this]):Gi.add(this),ai(0,t));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}var ui="function"==typeof WeakSet?WeakSet:Set;function si(e){var t=e.ref;if(null!==t)if("function"==typeof t)try{t(null)}catch(t){Lu(e,t)}else t.current=null}function ci(e,t){switch(t.tag){case 0:case 11:case 15:case 22:return;case 1:if(256&t.flags&&null!==e){var n=e.memoizedProps,r=e.memoizedState;t=(e=t.stateNode).getSnapshotBeforeUpdate(t.elementType===t.type?n:Qa(t.type,n),r),e.__reactInternalSnapshotBeforeUpdate=t}return;case 3:return void(256&t.flags&&Hr(t.stateNode.containerInfo));case 5:case 6:case 4:case 17:return}throw Error(l(163))}function fi(e,t,n){switch(n.tag){case 0:case 11:case 15:case 22:if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{if(3==(3&e.tag)){var r=e.create;e.destroy=r()}e=e.next}while(e!==t)}if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{var a=e;r=a.next,0!=(4&(a=a.tag))&&0!=(1&a)&&(Ru(n,e),Pu(n,e)),e=r}while(e!==t)}return;case 1:return e=n.stateNode,4&n.flags&&(null===t?e.componentDidMount():(r=n.elementType===n.type?t.memoizedProps:Qa(n.type,t.memoizedProps),e.componentDidUpdate(r,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate))),void(null!==(t=n.updateQueue)&&co(n,t,e));case 3:if(null!==(t=n.updateQueue)){if(e=null,null!==n.child)switch(n.child.tag){case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}co(n,t,e)}return;case 5:return e=n.stateNode,void(null===t&&4&n.flags&&$r(n.type,n.memoizedProps)&&e.focus());case 6:case 4:case 12:return;case 13:return void(null===n.memoizedState&&(n=n.alternate,null!==n&&(n=n.memoizedState,null!==n&&(n=n.dehydrated,null!==n&&kt(n)))));case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(l(163))}function di(e,t){for(var n=e;;){if(5===n.tag){var r=n.stateNode;if(t)"function"==typeof(r=r.style).setProperty?r.setProperty("display","none","important"):r.display="none";else{r=n.stateNode;var a=n.memoizedProps.style;a=null!=a&&a.hasOwnProperty("display")?a.display:null,r.style.display=we("display",a)}}else if(6===n.tag)n.stateNode.nodeValue=t?"":n.memoizedProps;else if((23!==n.tag&&24!==n.tag||null===n.memoizedState||n===e)&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===e)break;for(;null===n.sibling;){if(null===n.return||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}}function pi(e,t){if(wa&&"function"==typeof wa.onCommitFiberUnmount)try{wa.onCommitFiberUnmount(ba,t)}catch(e){}switch(t.tag){case 0:case 11:case 14:case 15:case 22:if(null!==(e=t.updateQueue)&&null!==(e=e.lastEffect)){var n=e=e.next;do{var r=n,a=r.destroy;if(r=r.tag,void 0!==a)if(0!=(4&r))Ru(t,n);else{r=t;try{a()}catch(e){Lu(r,e)}}n=n.next}while(n!==e)}break;case 1:if(si(t),"function"==typeof(e=t.stateNode).componentWillUnmount)try{e.props=t.memoizedProps,e.state=t.memoizedState,e.componentWillUnmount()}catch(e){Lu(t,e)}break;case 5:si(t);break;case 4:bi(e,t)}}function hi(e){e.alternate=null,e.child=null,e.dependencies=null,e.firstEffect=null,e.lastEffect=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.return=null,e.updateQueue=null}function mi(e){return 5===e.tag||3===e.tag||4===e.tag}function gi(e){e:{for(var t=e.return;null!==t;){if(mi(t))break e;t=t.return}throw Error(l(160))}var n=t;switch(t=n.stateNode,n.tag){case 5:var r=!1;break;case 3:case 4:t=t.containerInfo,r=!0;break;default:throw Error(l(161))}16&n.flags&&(ve(t,""),n.flags&=-17);e:t:for(n=e;;){for(;null===n.sibling;){if(null===n.return||mi(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&18!==n.tag;){if(2&n.flags)continue t;if(null===n.child||4===n.tag)continue t;n.child.return=n,n=n.child}if(!(2&n.flags)){n=n.stateNode;break e}}r?vi(e,n,t):yi(e,n,t)}function vi(e,t,n){var r=e.tag,a=5===r||6===r;if(a)e=a?e.stateNode:e.stateNode.instance,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!=(n=n._reactRootContainer)||null!==t.onclick||(t.onclick=Mr));else if(4!==r&&null!==(e=e.child))for(vi(e,t,n),e=e.sibling;null!==e;)vi(e,t,n),e=e.sibling}function yi(e,t,n){var r=e.tag,a=5===r||6===r;if(a)e=a?e.stateNode:e.stateNode.instance,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(yi(e,t,n),e=e.sibling;null!==e;)yi(e,t,n),e=e.sibling}function bi(e,t){for(var n,r,a=t,o=!1;;){if(!o){o=a.return;e:for(;;){if(null===o)throw Error(l(160));switch(n=o.stateNode,o.tag){case 5:r=!1;break e;case 3:case 4:n=n.containerInfo,r=!0;break e}o=o.return}o=!0}if(5===a.tag||6===a.tag){e:for(var i=e,u=a,s=u;;)if(pi(i,s),null!==s.child&&4!==s.tag)s.child.return=s,s=s.child;else{if(s===u)break e;for(;null===s.sibling;){if(null===s.return||s.return===u)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}r?(i=n,u=a.stateNode,8===i.nodeType?i.parentNode.removeChild(u):i.removeChild(u)):n.removeChild(a.stateNode)}else if(4===a.tag){if(null!==a.child){n=a.stateNode.containerInfo,r=!0,a.child.return=a,a=a.child;continue}}else if(pi(e,a),null!==a.child){a.child.return=a,a=a.child;continue}if(a===t)break;for(;null===a.sibling;){if(null===a.return||a.return===t)return;4===(a=a.return).tag&&(o=!1)}a.sibling.return=a.return,a=a.sibling}}function wi(e,t){switch(t.tag){case 0:case 11:case 14:case 15:case 22:var n=t.updateQueue;if(null!==(n=null!==n?n.lastEffect:null)){var r=n=n.next;do{3==(3&r.tag)&&(e=r.destroy,r.destroy=void 0,void 0!==e&&e()),r=r.next}while(r!==n)}return;case 1:return;case 5:if(null!=(n=t.stateNode)){r=t.memoizedProps;var a=null!==e?e.memoizedProps:r;e=t.type;var o=t.updateQueue;if(t.updateQueue=null,null!==o){for(n[Yr]=r,"input"===e&&"radio"===r.type&&null!=r.name&&te(n,r),Se(e,a),t=Se(e,r),a=0;a<o.length;a+=2){var i=o[a],u=o[a+1];"style"===i?ke(n,u):"dangerouslySetInnerHTML"===i?ge(n,u):"children"===i?ve(n,u):w(n,i,u,t)}switch(e){case"input":ne(n,r);break;case"textarea":se(n,r);break;case"select":e=n._wrapperState.wasMultiple,n._wrapperState.wasMultiple=!!r.multiple,null!=(o=r.value)?le(n,!!r.multiple,o,!1):e!==!!r.multiple&&(null!=r.defaultValue?le(n,!!r.multiple,r.defaultValue,!0):le(n,!!r.multiple,r.multiple?[]:"",!1))}}}return;case 6:if(null===t.stateNode)throw Error(l(162));return void(t.stateNode.nodeValue=t.memoizedProps);case 3:return void((n=t.stateNode).hydrate&&(n.hydrate=!1,kt(n.containerInfo)));case 12:return;case 13:return null!==t.memoizedState&&($i=$a(),di(t.child,!0)),void ki(t);case 19:return void ki(t);case 17:return;case 23:case 24:return void di(t,null!==t.memoizedState)}throw Error(l(163))}function ki(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new ui),t.forEach((function(t){var r=Mu.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function Ei(e,t){return null!==e&&(null===(e=e.memoizedState)||null!==e.dehydrated)&&null!==(t=t.memoizedState)&&null===t.dehydrated}var xi=Math.ceil,Si=k.ReactCurrentDispatcher,Ci=k.ReactCurrentOwner,Ni=0,_i=null,Ti=null,Oi=0,Pi=0,Ri=oa(0),Ai=0,Ii=null,Li=0,zi=0,Mi=0,Di=0,ji=null,$i=0,Ui=1/0;function Fi(){Ui=$a()+500}var Wi,Hi=null,Bi=!1,Vi=null,Gi=null,Qi=!1,qi=null,Yi=90,Ki=[],Xi=[],Zi=null,Ji=0,eu=null,tu=-1,nu=0,ru=0,au=null,ou=!1;function lu(){return 0!=(48&Ni)?$a():-1!==tu?tu:tu=$a()}function iu(e){if(0==(2&(e=e.mode)))return 1;if(0==(4&e))return 99===Ua()?1:2;if(0===nu&&(nu=Li),0!==Ga.transition){0!==ru&&(ru=null!==ji?ji.pendingLanes:0),e=nu;var t=4186112&~ru;return 0==(t&=-t)&&0==(t=(e=4186112&~e)&-e)&&(t=8192),t}return e=Ua(),e=$t(0!=(4&Ni)&&98===e?12:e=function(e){switch(e){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}(e),nu)}function uu(e,t,n){if(50<Ji)throw Ji=0,eu=null,Error(l(185));if(null===(e=su(e,t)))return null;Wt(e,t,n),e===_i&&(Mi|=t,4===Ai&&du(e,Oi));var r=Ua();1===t?0!=(8&Ni)&&0==(48&Ni)?pu(e):(cu(e,n),0===Ni&&(Fi(),Ba())):(0==(4&Ni)||98!==r&&99!==r||(null===Zi?Zi=new Set([e]):Zi.add(e)),cu(e,n)),ji=e}function su(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}function cu(e,t){for(var n=e.callbackNode,r=e.suspendedLanes,a=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var u=31-Ht(i),s=1<<u,c=o[u];if(-1===c){if(0==(s&r)||0!=(s&a)){c=t,Mt(s);var f=zt;o[u]=10<=f?c+250:6<=f?c+5e3:-1}}else c<=t&&(e.expiredLanes|=s);i&=~s}if(r=Dt(e,e===_i?Oi:0),t=zt,0===r)null!==n&&(n!==Ia&&xa(n),e.callbackNode=null,e.callbackPriority=0);else{if(null!==n){if(e.callbackPriority===t)return;n!==Ia&&xa(n)}15===t?(n=pu.bind(null,e),null===za?(za=[n],Ma=Ea(Ta,Va)):za.push(n),n=Ia):n=14===t?Ha(99,pu.bind(null,e)):Ha(n=function(e){switch(e){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(l(358,e))}}(t),fu.bind(null,e)),e.callbackPriority=t,e.callbackNode=n}}function fu(e){if(tu=-1,ru=nu=0,0!=(48&Ni))throw Error(l(327));var t=e.callbackNode;if(Ou()&&e.callbackNode!==t)return null;var n=Dt(e,e===_i?Oi:0);if(0===n)return null;var r=n,a=Ni;Ni|=16;var o=wu();for(_i===e&&Oi===r||(Fi(),yu(e,r));;)try{xu();break}catch(t){bu(e,t)}if(Za(),Si.current=o,Ni=a,null!==Ti?r=0:(_i=null,Oi=0,r=Ai),0!=(Li&Mi))yu(e,0);else if(0!==r){if(2===r&&(Ni|=64,e.hydrate&&(e.hydrate=!1,Hr(e.containerInfo)),0!==(n=jt(e))&&(r=ku(e,n))),1===r)throw t=Ii,yu(e,0),du(e,n),cu(e,$a()),t;switch(e.finishedWork=e.current.alternate,e.finishedLanes=n,r){case 0:case 1:throw Error(l(345));case 2:Nu(e);break;case 3:if(du(e,n),(62914560&n)===n&&10<(r=$i+500-$a())){if(0!==Dt(e,0))break;if(((a=e.suspendedLanes)&n)!==n){lu(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Fr(Nu.bind(null,e),r);break}Nu(e);break;case 4:if(du(e,n),(4186112&n)===n)break;for(r=e.eventTimes,a=-1;0<n;){var i=31-Ht(n);o=1<<i,(i=r[i])>a&&(a=i),n&=~o}if(n=a,10<(n=(120>(n=$a()-n)?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*xi(n/1960))-n)){e.timeoutHandle=Fr(Nu.bind(null,e),n);break}Nu(e);break;case 5:Nu(e);break;default:throw Error(l(329))}}return cu(e,$a()),e.callbackNode===t?fu.bind(null,e):null}function du(e,t){for(t&=~Di,t&=~Mi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ht(t),r=1<<n;e[n]=-1,t&=~r}}function pu(e){if(0!=(48&Ni))throw Error(l(327));if(Ou(),e===_i&&0!=(e.expiredLanes&Oi)){var t=Oi,n=ku(e,t);0!=(Li&Mi)&&(n=ku(e,t=Dt(e,t)))}else n=ku(e,t=Dt(e,0));if(0!==e.tag&&2===n&&(Ni|=64,e.hydrate&&(e.hydrate=!1,Hr(e.containerInfo)),0!==(t=jt(e))&&(n=ku(e,t))),1===n)throw n=Ii,yu(e,0),du(e,t),cu(e,$a()),n;return e.finishedWork=e.current.alternate,e.finishedLanes=t,Nu(e),cu(e,$a()),null}function hu(e,t){var n=Ni;Ni|=1;try{return e(t)}finally{0===(Ni=n)&&(Fi(),Ba())}}function mu(e,t){var n=Ni;Ni&=-2,Ni|=8;try{return e(t)}finally{0===(Ni=n)&&(Fi(),Ba())}}function gu(e,t){ia(Ri,Pi),Pi|=t,Li|=t}function vu(){Pi=Ri.current,la(Ri)}function yu(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,Wr(n)),null!==Ti)for(n=Ti.return;null!==n;){var r=n;switch(r.tag){case 1:null!=(r=r.type.childContextTypes)&&ha();break;case 3:Ro(),la(ca),la(sa),Go();break;case 5:Io(r);break;case 4:Ro();break;case 13:case 19:la(Lo);break;case 10:Ja(r);break;case 23:case 24:vu()}n=n.return}_i=e,Ti=Uu(e.current,null),Oi=Pi=Li=t,Ai=0,Ii=null,Di=Mi=zi=0}function bu(e,t){for(;;){var n=Ti;try{if(Za(),Qo.current=Tl,Jo){for(var r=Ko.memoizedState;null!==r;){var a=r.queue;null!==a&&(a.pending=null),r=r.next}Jo=!1}if(Yo=0,Zo=Xo=Ko=null,el=!1,Ci.current=null,null===n||null===n.return){Ai=1,Ii=t,Ti=null;break}e:{var o=e,l=n.return,i=n,u=t;if(t=Oi,i.flags|=2048,i.firstEffect=i.lastEffect=null,null!==u&&"object"==typeof u&&"function"==typeof u.then){var s=u;if(0==(2&i.mode)){var c=i.alternate;c?(i.updateQueue=c.updateQueue,i.memoizedState=c.memoizedState,i.lanes=c.lanes):(i.updateQueue=null,i.memoizedState=null)}var f=0!=(1&Lo.current),d=l;do{var p;if(p=13===d.tag){var h=d.memoizedState;if(null!==h)p=null!==h.dehydrated;else{var m=d.memoizedProps;p=void 0!==m.fallback&&(!0!==m.unstable_avoidThisFallback||!f)}}if(p){var g=d.updateQueue;if(null===g){var v=new Set;v.add(s),d.updateQueue=v}else g.add(s);if(0==(2&d.mode)){if(d.flags|=64,i.flags|=16384,i.flags&=-2981,1===i.tag)if(null===i.alternate)i.tag=17;else{var y=lo(-1,1);y.tag=2,io(i,y)}i.lanes|=1;break e}u=void 0,i=t;var b=o.pingCache;if(null===b?(b=o.pingCache=new oi,u=new Set,b.set(s,u)):void 0===(u=b.get(s))&&(u=new Set,b.set(s,u)),!u.has(i)){u.add(i);var w=zu.bind(null,o,s,i);s.then(w,w)}d.flags|=4096,d.lanes=t;break e}d=d.return}while(null!==d);u=Error((Q(i.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==Ai&&(Ai=2),u=ri(u,i),d=l;do{switch(d.tag){case 3:o=u,d.flags|=4096,t&=-t,d.lanes|=t,uo(d,li(0,o,t));break e;case 1:o=u;var k=d.type,E=d.stateNode;if(0==(64&d.flags)&&("function"==typeof k.getDerivedStateFromError||null!==E&&"function"==typeof E.componentDidCatch&&(null===Gi||!Gi.has(E)))){d.flags|=4096,t&=-t,d.lanes|=t,uo(d,ii(d,o,t));break e}}d=d.return}while(null!==d)}Cu(n)}catch(e){t=e,Ti===n&&null!==n&&(Ti=n=n.return);continue}break}}function wu(){var e=Si.current;return Si.current=Tl,null===e?Tl:e}function ku(e,t){var n=Ni;Ni|=16;var r=wu();for(_i===e&&Oi===t||yu(e,t);;)try{Eu();break}catch(t){bu(e,t)}if(Za(),Ni=n,Si.current=r,null!==Ti)throw Error(l(261));return _i=null,Oi=0,Ai}function Eu(){for(;null!==Ti;)Su(Ti)}function xu(){for(;null!==Ti&&!Sa();)Su(Ti)}function Su(e){var t=Wi(e.alternate,e,Pi);e.memoizedProps=e.pendingProps,null===t?Cu(e):Ti=t,Ci.current=null}function Cu(e){var t=e;do{var n=t.alternate;if(e=t.return,0==(2048&t.flags)){if(null!==(n=ti(n,t,Pi)))return void(Ti=n);if(24!==(n=t).tag&&23!==n.tag||null===n.memoizedState||0!=(1073741824&Pi)||0==(4&n.mode)){for(var r=0,a=n.child;null!==a;)r|=a.lanes|a.childLanes,a=a.sibling;n.childLanes=r}null!==e&&0==(2048&e.flags)&&(null===e.firstEffect&&(e.firstEffect=t.firstEffect),null!==t.lastEffect&&(null!==e.lastEffect&&(e.lastEffect.nextEffect=t.firstEffect),e.lastEffect=t.lastEffect),1<t.flags&&(null!==e.lastEffect?e.lastEffect.nextEffect=t:e.firstEffect=t,e.lastEffect=t))}else{if(null!==(n=ni(t)))return n.flags&=2047,void(Ti=n);null!==e&&(e.firstEffect=e.lastEffect=null,e.flags|=2048)}if(null!==(t=t.sibling))return void(Ti=t);Ti=t=e}while(null!==t);0===Ai&&(Ai=5)}function Nu(e){var t=Ua();return Wa(99,_u.bind(null,e,t)),null}function _u(e,t){do{Ou()}while(null!==qi);if(0!=(48&Ni))throw Error(l(327));var n=e.finishedWork;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(l(177));e.callbackNode=null;var r=n.lanes|n.childLanes,a=r,o=e.pendingLanes&~a;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=a,e.mutableReadLanes&=a,e.entangledLanes&=a,a=e.entanglements;for(var i=e.eventTimes,u=e.expirationTimes;0<o;){var s=31-Ht(o),c=1<<s;a[s]=0,i[s]=-1,u[s]=-1,o&=~c}if(null!==Zi&&0==(24&r)&&Zi.has(e)&&Zi.delete(e),e===_i&&(Ti=_i=null,Oi=0),1<n.flags?null!==n.lastEffect?(n.lastEffect.nextEffect=n,r=n.firstEffect):r=n:r=n.firstEffect,null!==r){if(a=Ni,Ni|=32,Ci.current=null,Dr=qt,pr(i=dr())){if("selectionStart"in i)u={start:i.selectionStart,end:i.selectionEnd};else e:if(u=(u=i.ownerDocument)&&u.defaultView||window,(c=u.getSelection&&u.getSelection())&&0!==c.rangeCount){u=c.anchorNode,o=c.anchorOffset,s=c.focusNode,c=c.focusOffset;try{u.nodeType,s.nodeType}catch(e){u=null;break e}var f=0,d=-1,p=-1,h=0,m=0,g=i,v=null;t:for(;;){for(var y;g!==u||0!==o&&3!==g.nodeType||(d=f+o),g!==s||0!==c&&3!==g.nodeType||(p=f+c),3===g.nodeType&&(f+=g.nodeValue.length),null!==(y=g.firstChild);)v=g,g=y;for(;;){if(g===i)break t;if(v===u&&++h===o&&(d=f),v===s&&++m===c&&(p=f),null!==(y=g.nextSibling))break;v=(g=v).parentNode}g=y}u=-1===d||-1===p?null:{start:d,end:p}}else u=null;u=u||{start:0,end:0}}else u=null;jr={focusedElem:i,selectionRange:u},qt=!1,au=null,ou=!1,Hi=r;do{try{Tu()}catch(e){if(null===Hi)throw Error(l(330));Lu(Hi,e),Hi=Hi.nextEffect}}while(null!==Hi);au=null,Hi=r;do{try{for(i=e;null!==Hi;){var b=Hi.flags;if(16&b&&ve(Hi.stateNode,""),128&b){var w=Hi.alternate;if(null!==w){var k=w.ref;null!==k&&("function"==typeof k?k(null):k.current=null)}}switch(1038&b){case 2:gi(Hi),Hi.flags&=-3;break;case 6:gi(Hi),Hi.flags&=-3,wi(Hi.alternate,Hi);break;case 1024:Hi.flags&=-1025;break;case 1028:Hi.flags&=-1025,wi(Hi.alternate,Hi);break;case 4:wi(Hi.alternate,Hi);break;case 8:bi(i,u=Hi);var E=u.alternate;hi(u),null!==E&&hi(E)}Hi=Hi.nextEffect}}catch(e){if(null===Hi)throw Error(l(330));Lu(Hi,e),Hi=Hi.nextEffect}}while(null!==Hi);if(k=jr,w=dr(),b=k.focusedElem,i=k.selectionRange,w!==b&&b&&b.ownerDocument&&fr(b.ownerDocument.documentElement,b)){null!==i&&pr(b)&&(w=i.start,void 0===(k=i.end)&&(k=w),"selectionStart"in b?(b.selectionStart=w,b.selectionEnd=Math.min(k,b.value.length)):(k=(w=b.ownerDocument||document)&&w.defaultView||window).getSelection&&(k=k.getSelection(),u=b.textContent.length,E=Math.min(i.start,u),i=void 0===i.end?E:Math.min(i.end,u),!k.extend&&E>i&&(u=i,i=E,E=u),u=cr(b,E),o=cr(b,i),u&&o&&(1!==k.rangeCount||k.anchorNode!==u.node||k.anchorOffset!==u.offset||k.focusNode!==o.node||k.focusOffset!==o.offset)&&((w=w.createRange()).setStart(u.node,u.offset),k.removeAllRanges(),E>i?(k.addRange(w),k.extend(o.node,o.offset)):(w.setEnd(o.node,o.offset),k.addRange(w))))),w=[];for(k=b;k=k.parentNode;)1===k.nodeType&&w.push({element:k,left:k.scrollLeft,top:k.scrollTop});for("function"==typeof b.focus&&b.focus(),b=0;b<w.length;b++)(k=w[b]).element.scrollLeft=k.left,k.element.scrollTop=k.top}qt=!!Dr,jr=Dr=null,e.current=n,Hi=r;do{try{for(b=e;null!==Hi;){var x=Hi.flags;if(36&x&&fi(b,Hi.alternate,Hi),128&x){w=void 0;var S=Hi.ref;if(null!==S){var C=Hi.stateNode;switch(Hi.tag){case 5:w=C;break;default:w=C}"function"==typeof S?S(w):S.current=w}}Hi=Hi.nextEffect}}catch(e){if(null===Hi)throw Error(l(330));Lu(Hi,e),Hi=Hi.nextEffect}}while(null!==Hi);Hi=null,La(),Ni=a}else e.current=n;if(Qi)Qi=!1,qi=e,Yi=t;else for(Hi=r;null!==Hi;)t=Hi.nextEffect,Hi.nextEffect=null,8&Hi.flags&&((x=Hi).sibling=null,x.stateNode=null),Hi=t;if(0===(r=e.pendingLanes)&&(Gi=null),1===r?e===eu?Ji++:(Ji=0,eu=e):Ji=0,n=n.stateNode,wa&&"function"==typeof wa.onCommitFiberRoot)try{wa.onCommitFiberRoot(ba,n,void 0,64==(64&n.current.flags))}catch(e){}if(cu(e,$a()),Bi)throw Bi=!1,e=Vi,Vi=null,e;return 0!=(8&Ni)||Ba(),null}function Tu(){for(;null!==Hi;){var e=Hi.alternate;ou||null===au||(0!=(8&Hi.flags)?Je(Hi,au)&&(ou=!0):13===Hi.tag&&Ei(e,Hi)&&Je(Hi,au)&&(ou=!0));var t=Hi.flags;0!=(256&t)&&ci(e,Hi),0==(512&t)||Qi||(Qi=!0,Ha(97,(function(){return Ou(),null}))),Hi=Hi.nextEffect}}function Ou(){if(90!==Yi){var e=97<Yi?97:Yi;return Yi=90,Wa(e,Au)}return!1}function Pu(e,t){Ki.push(t,e),Qi||(Qi=!0,Ha(97,(function(){return Ou(),null})))}function Ru(e,t){Xi.push(t,e),Qi||(Qi=!0,Ha(97,(function(){return Ou(),null})))}function Au(){if(null===qi)return!1;var e=qi;if(qi=null,0!=(48&Ni))throw Error(l(331));var t=Ni;Ni|=32;var n=Xi;Xi=[];for(var r=0;r<n.length;r+=2){var a=n[r],o=n[r+1],i=a.destroy;if(a.destroy=void 0,"function"==typeof i)try{i()}catch(e){if(null===o)throw Error(l(330));Lu(o,e)}}for(n=Ki,Ki=[],r=0;r<n.length;r+=2){a=n[r],o=n[r+1];try{var u=a.create;a.destroy=u()}catch(e){if(null===o)throw Error(l(330));Lu(o,e)}}for(u=e.current.firstEffect;null!==u;)e=u.nextEffect,u.nextEffect=null,8&u.flags&&(u.sibling=null,u.stateNode=null),u=e;return Ni=t,Ba(),!0}function Iu(e,t,n){io(e,t=li(0,t=ri(n,t),1)),t=lu(),null!==(e=su(e,1))&&(Wt(e,1,t),cu(e,t))}function Lu(e,t){if(3===e.tag)Iu(e,e,t);else for(var n=e.return;null!==n;){if(3===n.tag){Iu(n,e,t);break}if(1===n.tag){var r=n.stateNode;if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===Gi||!Gi.has(r))){var a=ii(n,e=ri(t,e),1);if(io(n,a),a=lu(),null!==(n=su(n,1)))Wt(n,1,a),cu(n,a);else if("function"==typeof r.componentDidCatch&&(null===Gi||!Gi.has(r)))try{r.componentDidCatch(t,e)}catch(e){}break}}n=n.return}}function zu(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=lu(),e.pingedLanes|=e.suspendedLanes&n,_i===e&&(Oi&n)===n&&(4===Ai||3===Ai&&(62914560&Oi)===Oi&&500>$a()-$i?yu(e,0):Di|=n),cu(e,t)}function Mu(e,t){var n=e.stateNode;null!==n&&n.delete(t),0==(t=0)&&(0==(2&(t=e.mode))?t=1:0==(4&t)?t=99===Ua()?1:2:(0===nu&&(nu=Li),0===(t=Ut(62914560&~nu))&&(t=4194304))),n=lu(),null!==(e=su(e,t))&&(Wt(e,t,n),cu(e,n))}function Du(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.flags=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childLanes=this.lanes=0,this.alternate=null}function ju(e,t,n,r){return new Du(e,t,n,r)}function $u(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Uu(e,t){var n=e.alternate;return null===n?((n=ju(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.nextEffect=null,n.firstEffect=null,n.lastEffect=null),n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Fu(e,t,n,r,a,o){var i=2;if(r=e,"function"==typeof e)$u(e)&&(i=1);else if("string"==typeof e)i=5;else e:switch(e){case S:return Wu(n.children,a,o,t);case M:i=8,a|=16;break;case C:i=8,a|=1;break;case N:return(e=ju(12,n,t,8|a)).elementType=N,e.type=N,e.lanes=o,e;case P:return(e=ju(13,n,t,a)).type=P,e.elementType=P,e.lanes=o,e;case R:return(e=ju(19,n,t,a)).elementType=R,e.lanes=o,e;case D:return Hu(n,a,o,t);case j:return(e=ju(24,n,t,a)).elementType=j,e.lanes=o,e;default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case _:i=10;break e;case T:i=9;break e;case O:i=11;break e;case A:i=14;break e;case I:i=16,r=null;break e;case L:i=22;break e}throw Error(l(130,null==e?e:typeof e,""))}return(t=ju(i,n,t,a)).elementType=e,t.type=r,t.lanes=o,t}function Wu(e,t,n,r){return(e=ju(7,e,r,t)).lanes=n,e}function Hu(e,t,n,r){return(e=ju(23,e,r,t)).elementType=D,e.lanes=n,e}function Bu(e,t,n){return(e=ju(6,e,null,t)).lanes=n,e}function Vu(e,t,n){return(t=ju(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Gu(e,t,n){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.pendingContext=this.context=null,this.hydrate=n,this.callbackNode=null,this.callbackPriority=0,this.eventTimes=Ft(0),this.expirationTimes=Ft(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ft(0),this.mutableSourceEagerHydrationData=null}function Qu(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:x,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}function qu(e,t,n,r){var a=t.current,o=lu(),i=iu(a);e:if(n){t:{if(Ye(n=n._reactInternals)!==n||1!==n.tag)throw Error(l(170));var u=n;do{switch(u.tag){case 3:u=u.stateNode.context;break t;case 1:if(pa(u.type)){u=u.stateNode.__reactInternalMemoizedMergedChildContext;break t}}u=u.return}while(null!==u);throw Error(l(171))}if(1===n.tag){var s=n.type;if(pa(s)){n=ga(n,s,u);break e}}n=u}else n=ua;return null===t.context?t.context=n:t.pendingContext=n,(t=lo(o,i)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),io(a,t),uu(a,i,o),i}function Yu(e){if(!(e=e.current).child)return null;switch(e.child.tag){case 5:default:return e.child.stateNode}}function Ku(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function Xu(e,t){Ku(e,t),(e=e.alternate)&&Ku(e,t)}function Zu(e,t,n){var r=null!=n&&null!=n.hydrationOptions&&n.hydrationOptions.mutableSources||null;if(n=new Gu(e,t,null!=n&&!0===n.hydrate),t=ju(3,null,null,2===t?7:1===t?3:0),n.current=t,t.stateNode=n,ao(t),e[Kr]=n.current,Tr(8===e.nodeType?e.parentNode:e),r)for(e=0;e<r.length;e++){var a=(t=r[e])._getVersion;a=a(t._source),null==n.mutableSourceEagerHydrationData?n.mutableSourceEagerHydrationData=[t,a]:n.mutableSourceEagerHydrationData.push(t,a)}this._internalRoot=n}function Ju(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function es(e,t,n,r,a){var o=n._reactRootContainer;if(o){var l=o._internalRoot;if("function"==typeof a){var i=a;a=function(){var e=Yu(l);i.call(e)}}qu(t,l,e,a)}else{if(o=n._reactRootContainer=function(e,t){if(t||(t=!(!(t=e?9===e.nodeType?e.documentElement:e.firstChild:null)||1!==t.nodeType||!t.hasAttribute("data-reactroot"))),!t)for(var n;n=e.lastChild;)e.removeChild(n);return new Zu(e,0,t?{hydrate:!0}:void 0)}(n,r),l=o._internalRoot,"function"==typeof a){var u=a;a=function(){var e=Yu(l);u.call(e)}}mu((function(){qu(t,l,e,a)}))}return Yu(l)}function ts(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Ju(t))throw Error(l(200));return Qu(e,t,null,n)}Wi=function(e,t,n){var r=t.lanes;if(null!==e)if(e.memoizedProps!==t.pendingProps||ca.current)Il=!0;else{if(0==(n&r)){switch(Il=!1,t.tag){case 3:Hl(t),Bo();break;case 5:Ao(t);break;case 1:pa(t.type)&&va(t);break;case 4:Po(t,t.stateNode.containerInfo);break;case 10:r=t.memoizedProps.value;var a=t.type._context;ia(qa,a._currentValue),a._currentValue=r;break;case 13:if(null!==t.memoizedState)return 0!=(n&t.child.childLanes)?ql(e,t,n):(ia(Lo,1&Lo.current),null!==(t=Jl(e,t,n))?t.sibling:null);ia(Lo,1&Lo.current);break;case 19:if(r=0!=(n&t.childLanes),0!=(64&e.flags)){if(r)return Zl(e,t,n);t.flags|=64}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),ia(Lo,Lo.current),r)break;return null;case 23:case 24:return t.lanes=0,jl(e,t,n)}return Jl(e,t,n)}Il=0!=(16384&e.flags)}else Il=!1;switch(t.lanes=0,t.tag){case 2:if(r=t.type,null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,a=da(t,sa.current),to(t,n),a=rl(null,t,r,e,a,n),t.flags|=1,"object"==typeof a&&null!==a&&"function"==typeof a.render&&void 0===a.$$typeof){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,pa(r)){var o=!0;va(t)}else o=!1;t.memoizedState=null!==a.state&&void 0!==a.state?a.state:null,ao(t);var i=r.getDerivedStateFromProps;"function"==typeof i&&po(t,r,i,e),a.updater=ho,t.stateNode=a,a._reactInternals=t,yo(t,r,e,n),t=Wl(null,t,r,!0,o,n)}else t.tag=0,Ll(null,t,a,n),t=t.child;return t;case 16:a=t.elementType;e:{switch(null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,a=(o=a._init)(a._payload),t.type=a,o=t.tag=function(e){if("function"==typeof e)return $u(e)?1:0;if(null!=e){if((e=e.$$typeof)===O)return 11;if(e===A)return 14}return 2}(a),e=Qa(a,e),o){case 0:t=Ul(null,t,a,e,n);break e;case 1:t=Fl(null,t,a,e,n);break e;case 11:t=zl(null,t,a,e,n);break e;case 14:t=Ml(null,t,a,Qa(a.type,e),r,n);break e}throw Error(l(306,a,""))}return t;case 0:return r=t.type,a=t.pendingProps,Ul(e,t,r,a=t.elementType===r?a:Qa(r,a),n);case 1:return r=t.type,a=t.pendingProps,Fl(e,t,r,a=t.elementType===r?a:Qa(r,a),n);case 3:if(Hl(t),r=t.updateQueue,null===e||null===r)throw Error(l(282));if(r=t.pendingProps,a=null!==(a=t.memoizedState)?a.element:null,oo(e,t),so(t,r,null,n),(r=t.memoizedState.element)===a)Bo(),t=Jl(e,t,n);else{if((o=(a=t.stateNode).hydrate)&&(Do=Br(t.stateNode.containerInfo.firstChild),Mo=t,o=jo=!0),o){if(null!=(e=a.mutableSourceEagerHydrationData))for(a=0;a<e.length;a+=2)(o=e[a])._workInProgressVersionPrimary=e[a+1],Vo.push(o);for(n=So(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|1024,n=n.sibling}else Ll(e,t,r,n),Bo();t=t.child}return t;case 5:return Ao(t),null===e&&Fo(t),r=t.type,a=t.pendingProps,o=null!==e?e.memoizedProps:null,i=a.children,Ur(r,a)?i=null:null!==o&&Ur(r,o)&&(t.flags|=16),$l(e,t),Ll(e,t,i,n),t.child;case 6:return null===e&&Fo(t),null;case 13:return ql(e,t,n);case 4:return Po(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=xo(t,null,r,n):Ll(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,zl(e,t,r,a=t.elementType===r?a:Qa(r,a),n);case 7:return Ll(e,t,t.pendingProps,n),t.child;case 8:case 12:return Ll(e,t,t.pendingProps.children,n),t.child;case 10:e:{r=t.type._context,a=t.pendingProps,i=t.memoizedProps,o=a.value;var u=t.type._context;if(ia(qa,u._currentValue),u._currentValue=o,null!==i)if(u=i.value,0==(o=lr(u,o)?0:0|("function"==typeof r._calculateChangedBits?r._calculateChangedBits(u,o):1073741823))){if(i.children===a.children&&!ca.current){t=Jl(e,t,n);break e}}else for(null!==(u=t.child)&&(u.return=t);null!==u;){var s=u.dependencies;if(null!==s){i=u.child;for(var c=s.firstContext;null!==c;){if(c.context===r&&0!=(c.observedBits&o)){1===u.tag&&((c=lo(-1,n&-n)).tag=2,io(u,c)),u.lanes|=n,null!==(c=u.alternate)&&(c.lanes|=n),eo(u.return,n),s.lanes|=n;break}c=c.next}}else i=10===u.tag&&u.type===t.type?null:u.child;if(null!==i)i.return=u;else for(i=u;null!==i;){if(i===t){i=null;break}if(null!==(u=i.sibling)){u.return=i.return,i=u;break}i=i.return}u=i}Ll(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=(o=t.pendingProps).children,to(t,n),r=r(a=no(a,o.unstable_observedBits)),t.flags|=1,Ll(e,t,r,n),t.child;case 14:return o=Qa(a=t.type,t.pendingProps),Ml(e,t,a,o=Qa(a.type,o),r,n);case 15:return Dl(e,t,t.type,t.pendingProps,r,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Qa(r,a),null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),t.tag=1,pa(r)?(e=!0,va(t)):e=!1,to(t,n),go(t,r,a),yo(t,r,a,n),Wl(null,t,r,!0,e,n);case 19:return Zl(e,t,n);case 23:case 24:return jl(e,t,n)}throw Error(l(156,t.tag))},Zu.prototype.render=function(e){qu(e,this._internalRoot,null,null)},Zu.prototype.unmount=function(){var e=this._internalRoot,t=e.containerInfo;qu(null,e,null,(function(){t[Kr]=null}))},et=function(e){13===e.tag&&(uu(e,4,lu()),Xu(e,4))},tt=function(e){13===e.tag&&(uu(e,67108864,lu()),Xu(e,67108864))},nt=function(e){if(13===e.tag){var t=lu(),n=iu(e);uu(e,n,t),Xu(e,n)}},rt=function(e,t){return t()},Ne=function(e,t,n){switch(t){case"input":if(ne(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=ta(r);if(!a)throw Error(l(90));X(r),ne(r,a)}}}break;case"textarea":se(e,n);break;case"select":null!=(t=n.value)&&le(e,!!n.multiple,t,!1)}},Ae=hu,Ie=function(e,t,n,r,a){var o=Ni;Ni|=4;try{return Wa(98,e.bind(null,t,n,r,a))}finally{0===(Ni=o)&&(Fi(),Ba())}},Le=function(){0==(49&Ni)&&(function(){if(null!==Zi){var e=Zi;Zi=null,e.forEach((function(e){e.expiredLanes|=24&e.pendingLanes,cu(e,$a())}))}Ba()}(),Ou())},ze=function(e,t){var n=Ni;Ni|=2;try{return e(t)}finally{0===(Ni=n)&&(Fi(),Ba())}};var ns={Events:[Jr,ea,ta,Pe,Re,Ou,{current:!1}]},rs={findFiberByHostInstance:Zr,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"},as={bundleType:rs.bundleType,version:rs.version,rendererPackageName:rs.rendererPackageName,rendererConfig:rs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:k.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Ze(e))?null:e.stateNode},findFiberByHostInstance:rs.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var os=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!os.isDisabled&&os.supportsFiber)try{ba=os.inject(as),wa=os}catch(me){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ns,t.createPortal=ts,t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"==typeof e.render)throw Error(l(188));throw Error(l(268,Object.keys(e)))}return null===(e=Ze(t))?null:e.stateNode},t.flushSync=function(e,t){var n=Ni;if(0!=(48&n))return e(t);Ni|=1;try{if(e)return Wa(99,e.bind(null,t))}finally{Ni=n,Ba()}},t.hydrate=function(e,t,n){if(!Ju(t))throw Error(l(200));return es(null,e,t,!0,n)},t.render=function(e,t,n){if(!Ju(t))throw Error(l(200));return es(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!Ju(e))throw Error(l(40));return!!e._reactRootContainer&&(mu((function(){es(null,null,e,!1,(function(){e._reactRootContainer=null,e[Kr]=null}))})),!0)},t.unstable_batchedUpdates=hu,t.unstable_createPortal=function(e,t){return ts(e,t,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)},t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ju(n))throw Error(l(200));if(null==e||void 0===e._reactInternals)throw Error(l(38));return es(e,t,n,!1,r)},t.version="17.0.2"},995:(e,t,n)=>{"use strict";!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=n(439)},198:(e,t)=>{"use strict";var n="function"==typeof Symbol&&Symbol.for,r=n?Symbol.for("react.element"):60103,a=n?Symbol.for("react.portal"):60106,o=n?Symbol.for("react.fragment"):60107,l=n?Symbol.for("react.strict_mode"):60108,i=n?Symbol.for("react.profiler"):60114,u=n?Symbol.for("react.provider"):60109,s=n?Symbol.for("react.context"):60110,c=n?Symbol.for("react.async_mode"):60111,f=n?Symbol.for("react.concurrent_mode"):60111,d=n?Symbol.for("react.forward_ref"):60112,p=n?Symbol.for("react.suspense"):60113,h=n?Symbol.for("react.suspense_list"):60120,m=n?Symbol.for("react.memo"):60115,g=n?Symbol.for("react.lazy"):60116,v=n?Symbol.for("react.block"):60121,y=n?Symbol.for("react.fundamental"):60117,b=n?Symbol.for("react.responder"):60118,w=n?Symbol.for("react.scope"):60119;function k(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case c:case f:case o:case i:case l:case p:return e;default:switch(e=e&&e.$$typeof){case s:case d:case g:case m:case u:return e;default:return t}}case a:return t}}}function E(e){return k(e)===f}t.AsyncMode=c,t.ConcurrentMode=f,t.ContextConsumer=s,t.ContextProvider=u,t.Element=r,t.ForwardRef=d,t.Fragment=o,t.Lazy=g,t.Memo=m,t.Portal=a,t.Profiler=i,t.StrictMode=l,t.Suspense=p,t.isAsyncMode=function(e){return E(e)||k(e)===c},t.isConcurrentMode=E,t.isContextConsumer=function(e){return k(e)===s},t.isContextProvider=function(e){return k(e)===u},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r},t.isForwardRef=function(e){return k(e)===d},t.isFragment=function(e){return k(e)===o},t.isLazy=function(e){return k(e)===g},t.isMemo=function(e){return k(e)===m},t.isPortal=function(e){return k(e)===a},t.isProfiler=function(e){return k(e)===i},t.isStrictMode=function(e){return k(e)===l},t.isSuspense=function(e){return k(e)===p},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===o||e===f||e===i||e===l||e===p||e===h||"object"==typeof e&&null!==e&&(e.$$typeof===g||e.$$typeof===m||e.$$typeof===u||e.$$typeof===s||e.$$typeof===d||e.$$typeof===y||e.$$typeof===b||e.$$typeof===w||e.$$typeof===v)},t.typeOf=k},237:(e,t,n)=>{"use strict";e.exports=n(198)},841:(e,t)=>{"use strict";var n=60103,r=60106,a=60107,o=60108,l=60114,i=60109,u=60110,s=60112,c=60113,f=60120,d=60115,p=60116,h=60121,m=60122,g=60117,v=60129,y=60131;if("function"==typeof Symbol&&Symbol.for){var b=Symbol.for;n=b("react.element"),r=b("react.portal"),a=b("react.fragment"),o=b("react.strict_mode"),l=b("react.profiler"),i=b("react.provider"),u=b("react.context"),s=b("react.forward_ref"),c=b("react.suspense"),f=b("react.suspense_list"),d=b("react.memo"),p=b("react.lazy"),h=b("react.block"),m=b("react.server.block"),g=b("react.fundamental"),v=b("react.debug_trace_mode"),y=b("react.legacy_hidden")}t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===a||e===l||e===v||e===o||e===c||e===f||e===y||"object"==typeof e&&null!==e&&(e.$$typeof===p||e.$$typeof===d||e.$$typeof===i||e.$$typeof===u||e.$$typeof===s||e.$$typeof===g||e.$$typeof===h||e[0]===m)},t.typeOf=function(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case a:case l:case o:case c:case f:return e;default:switch(e=e&&e.$$typeof){case u:case s:case p:case d:case i:return e;default:return t}}case r:return t}}}},679:(e,t,n)=>{"use strict";e.exports=n(841)},288:(e,t,n)=>{"use strict";var r=n(767),a=60103,o=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var l=60109,i=60110,u=60112;t.Suspense=60113;var s=60115,c=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;a=f("react.element"),o=f("react.portal"),t.Fragment=f("react.fragment"),t.StrictMode=f("react.strict_mode"),t.Profiler=f("react.profiler"),l=f("react.provider"),i=f("react.context"),u=f("react.forward_ref"),t.Suspense=f("react.suspense"),s=f("react.memo"),c=f("react.lazy")}var d="function"==typeof Symbol&&Symbol.iterator;function p(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function g(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||h}function v(){}function y(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||h}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(p(85));this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=g.prototype;var b=y.prototype=new v;b.constructor=y,r(b,g.prototype),b.isPureReactComponent=!0;var w={current:null},k=Object.prototype.hasOwnProperty,E={key:!0,ref:!0,__self:!0,__source:!0};function x(e,t,n){var r,o={},l=null,i=null;if(null!=t)for(r in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(l=""+t.key),t)k.call(t,r)&&!E.hasOwnProperty(r)&&(o[r]=t[r]);var u=arguments.length-2;if(1===u)o.children=n;else if(1<u){for(var s=Array(u),c=0;c<u;c++)s[c]=arguments[c+2];o.children=s}if(e&&e.defaultProps)for(r in u=e.defaultProps)void 0===o[r]&&(o[r]=u[r]);return{$$typeof:a,type:e,key:l,ref:i,props:o,_owner:w.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var C=/\/+/g;function N(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function _(e,t,n,r,l){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var u=!1;if(null===e)u=!0;else switch(i){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case a:case o:u=!0}}if(u)return l=l(u=e),e=""===r?"."+N(u,0):r,Array.isArray(l)?(n="",null!=e&&(n=e.replace(C,"$&/")+"/"),_(l,t,n,"",(function(e){return e}))):null!=l&&(S(l)&&(l=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(l,n+(!l.key||u&&u.key===l.key?"":(""+l.key).replace(C,"$&/")+"/")+e)),t.push(l)),1;if(u=0,r=""===r?".":r+":",Array.isArray(e))for(var s=0;s<e.length;s++){var c=r+N(i=e[s],s);u+=_(i,t,n,c,l)}else if("function"==typeof(c=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e)))for(e=c.call(e),s=0;!(i=e.next()).done;)u+=_(i=i.value,t,n,c=r+N(i,s++),l);else if("object"===i)throw t=""+e,Error(p(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return u}function T(e,t,n){if(null==e)return e;var r=[],a=0;return _(e,r,"","",(function(e){return t.call(n,e,a++)})),r}function O(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var P={current:null};function R(){var e=P.current;if(null===e)throw Error(p(321));return e}var A={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:w,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:T,forEach:function(e,t,n){T(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return T(e,(function(){t++})),t},toArray:function(e){return T(e,(function(e){return e}))||[]},only:function(e){if(!S(e))throw Error(p(143));return e}},t.Component=g,t.PureComponent=y,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=A,t.cloneElement=function(e,t,n){if(null==e)throw Error(p(267,e));var o=r({},e.props),l=e.key,i=e.ref,u=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,u=w.current),void 0!==t.key&&(l=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(c in t)k.call(t,c)&&!E.hasOwnProperty(c)&&(o[c]=void 0===t[c]&&void 0!==s?s[c]:t[c])}var c=arguments.length-2;if(1===c)o.children=n;else if(1<c){s=Array(c);for(var f=0;f<c;f++)s[f]=arguments[f+2];o.children=s}return{$$typeof:a,type:e.type,key:l,ref:i,props:o,_owner:u}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:i,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:l,_context:e},e.Consumer=e},t.createElement=x,t.createFactory=function(e){var t=x.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:u,render:e}},t.isValidElement=S,t.lazy=function(e){return{$$typeof:c,_payload:{_status:-1,_result:e},_init:O}},t.memo=function(e,t){return{$$typeof:s,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return R().useCallback(e,t)},t.useContext=function(e,t){return R().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return R().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return R().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return R().useLayoutEffect(e,t)},t.useMemo=function(e,t){return R().useMemo(e,t)},t.useReducer=function(e,t,n){return R().useReducer(e,t,n)},t.useRef=function(e){return R().useRef(e)},t.useState=function(e){return R().useState(e)},t.version="17.0.2"},496:(e,t,n)=>{"use strict";e.exports=n(288)},787:(e,t)=>{"use strict";var n,r,a,o;if("object"==typeof performance&&"function"==typeof performance.now){var l=performance;t.unstable_now=function(){return l.now()}}else{var i=Date,u=i.now();t.unstable_now=function(){return i.now()-u}}if("undefined"==typeof window||"function"!=typeof MessageChannel){var s=null,c=null,f=function(){if(null!==s)try{var e=t.unstable_now();s(!0,e),s=null}catch(e){throw setTimeout(f,0),e}};n=function(e){null!==s?setTimeout(n,0,e):(s=e,setTimeout(f,0))},r=function(e,t){c=setTimeout(e,t)},a=function(){clearTimeout(c)},t.unstable_shouldYield=function(){return!1},o=t.unstable_forceFrameRate=function(){}}else{var d=window.setTimeout,p=window.clearTimeout;if("undefined"!=typeof console){var h=window.cancelAnimationFrame;"function"!=typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),"function"!=typeof h&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var m=!1,g=null,v=-1,y=5,b=0;t.unstable_shouldYield=function(){return t.unstable_now()>=b},o=function(){},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<e?Math.floor(1e3/e):5};var w=new MessageChannel,k=w.port2;w.port1.onmessage=function(){if(null!==g){var e=t.unstable_now();b=e+y;try{g(!0,e)?k.postMessage(null):(m=!1,g=null)}catch(e){throw k.postMessage(null),e}}else m=!1},n=function(e){g=e,m||(m=!0,k.postMessage(null))},r=function(e,n){v=d((function(){e(t.unstable_now())}),n)},a=function(){p(v),v=-1}}function E(e,t){var n=e.length;e.push(t);e:for(;;){var r=n-1>>>1,a=e[r];if(!(void 0!==a&&0<C(a,t)))break e;e[r]=t,e[n]=a,n=r}}function x(e){return void 0===(e=e[0])?null:e}function S(e){var t=e[0];if(void 0!==t){var n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length;r<a;){var o=2*(r+1)-1,l=e[o],i=o+1,u=e[i];if(void 0!==l&&0>C(l,n))void 0!==u&&0>C(u,l)?(e[r]=u,e[i]=n,r=i):(e[r]=l,e[o]=n,r=o);else{if(!(void 0!==u&&0>C(u,n)))break e;e[r]=u,e[i]=n,r=i}}}return t}return null}function C(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}var N=[],_=[],T=1,O=null,P=3,R=!1,A=!1,I=!1;function L(e){for(var t=x(_);null!==t;){if(null===t.callback)S(_);else{if(!(t.startTime<=e))break;S(_),t.sortIndex=t.expirationTime,E(N,t)}t=x(_)}}function z(e){if(I=!1,L(e),!A)if(null!==x(N))A=!0,n(M);else{var t=x(_);null!==t&&r(z,t.startTime-e)}}function M(e,n){A=!1,I&&(I=!1,a()),R=!0;var o=P;try{for(L(n),O=x(N);null!==O&&(!(O.expirationTime>n)||e&&!t.unstable_shouldYield());){var l=O.callback;if("function"==typeof l){O.callback=null,P=O.priorityLevel;var i=l(O.expirationTime<=n);n=t.unstable_now(),"function"==typeof i?O.callback=i:O===x(N)&&S(N),L(n)}else S(N);O=x(N)}if(null!==O)var u=!0;else{var s=x(_);null!==s&&r(z,s.startTime-n),u=!1}return u}finally{O=null,P=o,R=!1}}var D=o;t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){A||R||(A=!0,n(M))},t.unstable_getCurrentPriorityLevel=function(){return P},t.unstable_getFirstCallbackNode=function(){return x(N)},t.unstable_next=function(e){switch(P){case 1:case 2:case 3:var t=3;break;default:t=P}var n=P;P=t;try{return e()}finally{P=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=D,t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=P;P=e;try{return t()}finally{P=n}},t.unstable_scheduleCallback=function(e,o,l){var i=t.unstable_now();switch(l="object"==typeof l&&null!==l&&"number"==typeof(l=l.delay)&&0<l?i+l:i,e){case 1:var u=-1;break;case 2:u=250;break;case 5:u=1073741823;break;case 4:u=1e4;break;default:u=5e3}return e={id:T++,callback:o,priorityLevel:e,startTime:l,expirationTime:u=l+u,sortIndex:-1},l>i?(e.sortIndex=l,E(_,e),null===x(N)&&e===x(_)&&(I?a():I=!0,r(z,l-i))):(e.sortIndex=u,E(N,e),A||R||(A=!0,n(M))),e},t.unstable_wrapCallback=function(e){var t=P;return function(){var n=P;P=t;try{return e.apply(this,arguments)}finally{P=n}}}},51:(e,t,n)=>{"use strict";e.exports=n(787)},631:e=>{e.exports=function(e,t,n,r){var a=n?n.call(r,e,t):void 0;if(void 0!==a)return!!a;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var o=Object.keys(e),l=Object.keys(t);if(o.length!==l.length)return!1;for(var i=Object.prototype.hasOwnProperty.bind(t),u=0;u<o.length;u++){var s=o[u];if(!i(s))return!1;var c=e[s],f=t[s];if(!1===(a=n?n.call(r,c,f,s):void 0)||void 0===a&&c!==f)return!1}return!0}}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(496),t=n(995);function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,r(e,t)}var o=n(36),l=n.n(o);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e){return"/"===e.charAt(0)}function s(e,t){for(var n=t,r=n+1,a=e.length;r<a;n+=1,r+=1)e[n]=e[r];e.pop()}function c(e){return e.valueOf?e.valueOf():Object.prototype.valueOf.call(e)}const f=function e(t,n){if(t===n)return!0;if(null==t||null==n)return!1;if(Array.isArray(t))return Array.isArray(n)&&t.length===n.length&&t.every((function(t,r){return e(t,n[r])}));if("object"==typeof t||"object"==typeof n){var r=c(t),a=c(n);return r!==t||a!==n?e(r,a):Object.keys(Object.assign({},t,n)).every((function(r){return e(t[r],n[r])}))}return!1};const d=function(e,t){if(!e)throw new Error("Invariant failed")};function p(e){return"/"===e.charAt(0)?e:"/"+e}function h(e){return"/"===e.charAt(0)?e.substr(1):e}function m(e,t){return function(e,t){return 0===e.toLowerCase().indexOf(t.toLowerCase())&&-1!=="/?#".indexOf(e.charAt(t.length))}(e,t)?e.substr(t.length):e}function g(e){return"/"===e.charAt(e.length-1)?e.slice(0,-1):e}function v(e){var t=e.pathname,n=e.search,r=e.hash,a=t||"/";return n&&"?"!==n&&(a+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(a+="#"===r.charAt(0)?r:"#"+r),a}function y(e,t,n,r){var a;"string"==typeof e?(a=function(e){var t=e||"/",n="",r="",a=t.indexOf("#");-1!==a&&(r=t.substr(a),t=t.substr(0,a));var o=t.indexOf("?");return-1!==o&&(n=t.substr(o),t=t.substr(0,o)),{pathname:t,search:"?"===n?"":n,hash:"#"===r?"":r}}(e)).state=t:(void 0===(a=i({},e)).pathname&&(a.pathname=""),a.search?"?"!==a.search.charAt(0)&&(a.search="?"+a.search):a.search="",a.hash?"#"!==a.hash.charAt(0)&&(a.hash="#"+a.hash):a.hash="",void 0!==t&&void 0===a.state&&(a.state=t));try{a.pathname=decodeURI(a.pathname)}catch(e){throw e instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):e}return n&&(a.key=n),r?a.pathname?"/"!==a.pathname.charAt(0)&&(a.pathname=function(e,t){void 0===t&&(t="");var n,r=e&&e.split("/")||[],a=t&&t.split("/")||[],o=e&&u(e),l=t&&u(t),i=o||l;if(e&&u(e)?a=r:r.length&&(a.pop(),a=a.concat(r)),!a.length)return"/";if(a.length){var c=a[a.length-1];n="."===c||".."===c||""===c}else n=!1;for(var f=0,d=a.length;d>=0;d--){var p=a[d];"."===p?s(a,d):".."===p?(s(a,d),f++):f&&(s(a,d),f--)}if(!i)for(;f--;f)a.unshift("..");!i||""===a[0]||a[0]&&u(a[0])||a.unshift("");var h=a.join("/");return n&&"/"!==h.substr(-1)&&(h+="/"),h}(a.pathname,r.pathname)):a.pathname=r.pathname:a.pathname||(a.pathname="/"),a}function b(){var e=null,t=[];return{setPrompt:function(t){return e=t,function(){e===t&&(e=null)}},confirmTransitionTo:function(t,n,r,a){if(null!=e){var o="function"==typeof e?e(t,n):e;"string"==typeof o?"function"==typeof r?r(o,a):a(!0):a(!1!==o)}else a(!0)},appendListener:function(e){var n=!0;function r(){n&&e.apply(void 0,arguments)}return t.push(r),function(){n=!1,t=t.filter((function(e){return e!==r}))}},notifyListeners:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];t.forEach((function(e){return e.apply(void 0,n)}))}}}var w=!("undefined"==typeof window||!window.document||!window.document.createElement);function k(e,t){t(window.confirm(e))}var E="hashchange",x={hashbang:{encodePath:function(e){return"!"===e.charAt(0)?e:"!/"+h(e)},decodePath:function(e){return"!"===e.charAt(0)?e.substr(1):e}},noslash:{encodePath:h,decodePath:p},slash:{encodePath:p,decodePath:p}};function S(e){var t=e.indexOf("#");return-1===t?e:e.slice(0,t)}function C(){var e=window.location.href,t=e.indexOf("#");return-1===t?"":e.substring(t+1)}function N(e){window.location.replace(S(window.location.href)+"#"+e)}function _(e){void 0===e&&(e={}),w||d(!1);var t=window.history,n=(window.navigator.userAgent.indexOf("Firefox"),e),r=n.getUserConfirmation,a=void 0===r?k:r,o=n.hashType,l=void 0===o?"slash":o,u=e.basename?g(p(e.basename)):"",s=x[l],c=s.encodePath,f=s.decodePath;function h(){var e=f(C());return u&&(e=m(e,u)),y(e)}var _=b();function T(e){i(U,e),U.length=t.length,_.notifyListeners(U.location,U.action)}var O=!1,P=null;function R(){var e=C(),t=c(e);if(e!==t)N(t);else{var n=h(),r=U.location;if(!O&&function(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash}(r,n))return;if(P===v(n))return;P=null,function(e){if(O)O=!1,T();else{_.confirmTransitionTo(e,"POP",a,(function(t){t?T({action:"POP",location:e}):function(e){var t=U.location,n=z.lastIndexOf(v(t));-1===n&&(n=0);var r=z.lastIndexOf(v(e));-1===r&&(r=0);var a=n-r;a&&(O=!0,M(a))}(e)}))}}(n)}}var A=C(),I=c(A);A!==I&&N(I);var L=h(),z=[v(L)];function M(e){t.go(e)}var D=0;function j(e){1===(D+=e)&&1===e?window.addEventListener(E,R):0===D&&window.removeEventListener(E,R)}var $=!1,U={length:t.length,action:"POP",location:L,createHref:function(e){var t=document.querySelector("base"),n="";return t&&t.getAttribute("href")&&(n=S(window.location.href)),n+"#"+c(u+v(e))},push:function(e,t){var n="PUSH",r=y(e,void 0,void 0,U.location);_.confirmTransitionTo(r,n,a,(function(e){if(e){var t=v(r),a=c(u+t);if(C()!==a){P=t,function(e){window.location.hash=e}(a);var o=z.lastIndexOf(v(U.location)),l=z.slice(0,o+1);l.push(t),z=l,T({action:n,location:r})}else T()}}))},replace:function(e,t){var n="REPLACE",r=y(e,void 0,void 0,U.location);_.confirmTransitionTo(r,n,a,(function(e){if(e){var t=v(r),a=c(u+t);C()!==a&&(P=t,N(a));var o=z.indexOf(v(U.location));-1!==o&&(z[o]=t),T({action:n,location:r})}}))},go:M,goBack:function(){M(-1)},goForward:function(){M(1)},block:function(e){void 0===e&&(e=!1);var t=_.setPrompt(e);return $||(j(1),$=!0),function(){return $&&($=!1,j(-1)),t()}},listen:function(e){var t=_.appendListener(e);return j(1),function(){j(-1),t()}}};return U}var T=1073741823,O="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==n.g?n.g:{};function P(e){var t=[];return{on:function(e){t.push(e)},off:function(e){t=t.filter((function(t){return t!==e}))},get:function(){return e},set:function(n,r){e=n,t.forEach((function(t){return t(e,r)}))}}}const R=e.createContext||function(t,n){var r,o,i,u="__create-react-context-"+((O[i="__global_unique_id__"]=(O[i]||0)+1)+"__"),s=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).emitter=P(t.props.value),t}a(t,e);var r=t.prototype;return r.getChildContext=function(){var e;return(e={})[u]=this.emitter,e},r.componentWillReceiveProps=function(e){if(this.props.value!==e.value){var t,r=this.props.value,a=e.value;!function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}(r,a)?(t="function"==typeof n?n(r,a):T,0!=(t|=0)&&this.emitter.set(e.value,t)):t=0}},r.render=function(){return this.props.children},t}(e.Component);s.childContextTypes=((r={})[u]=l().object.isRequired,r);var c=function(e){function n(){var t;return(t=e.apply(this,arguments)||this).state={value:t.getValue()},t.onUpdate=function(e,n){0!=((0|t.observedBits)&n)&&t.setState({value:t.getValue()})},t}a(n,e);var r=n.prototype;return r.componentWillReceiveProps=function(e){var t=e.observedBits;this.observedBits=null==t?T:t},r.componentDidMount=function(){this.context[u]&&this.context[u].on(this.onUpdate);var e=this.props.observedBits;this.observedBits=null==e?T:e},r.componentWillUnmount=function(){this.context[u]&&this.context[u].off(this.onUpdate)},r.getValue=function(){return this.context[u]?this.context[u].get():t},r.render=function(){return(e=this.props.children,Array.isArray(e)?e[0]:e)(this.state.value);var e},n}(e.Component);return c.contextTypes=((o={})[u]=l().object,o),{Provider:s,Consumer:c}};var A=n(720),I=n.n(A);function L(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}n(237);var z=n(535),M=n.n(z),D=function(e){var t=R();return t.displayName="Router-History",t}(),j=function(e){var t=R();return t.displayName="Router",t}(),$=function(t){function n(e){var n;return(n=t.call(this,e)||this).state={location:e.history.location},n._isMounted=!1,n._pendingLocation=null,e.staticContext||(n.unlisten=e.history.listen((function(e){n._isMounted?n.setState({location:e}):n._pendingLocation=e}))),n}a(n,t),n.computeRootMatch=function(e){return{path:"/",url:"/",params:{},isExact:"/"===e}};var r=n.prototype;return r.componentDidMount=function(){this._isMounted=!0,this._pendingLocation&&this.setState({location:this._pendingLocation})},r.componentWillUnmount=function(){this.unlisten&&this.unlisten()},r.render=function(){return e.createElement(j.Provider,{value:{history:this.props.history,location:this.state.location,match:n.computeRootMatch(this.state.location.pathname),staticContext:this.props.staticContext}},e.createElement(D.Provider,{children:this.props.children||null,value:this.props.history}))},n}(e.Component);e.Component;var U=function(e){function t(){return e.apply(this,arguments)||this}a(t,e);var n=t.prototype;return n.componentDidMount=function(){this.props.onMount&&this.props.onMount.call(this,this)},n.componentDidUpdate=function(e){this.props.onUpdate&&this.props.onUpdate.call(this,this,e)},n.componentWillUnmount=function(){this.props.onUnmount&&this.props.onUnmount.call(this,this)},n.render=function(){return null},t}(e.Component),F={},W=0;function H(e,t){return void 0===e&&(e="/"),void 0===t&&(t={}),"/"===e?e:function(e){if(F[e])return F[e];var t=I().compile(e);return W<1e4&&(F[e]=t,W++),t}(e)(t,{pretty:!0})}function B(t){var n=t.computedMatch,r=t.to,a=t.push,o=void 0!==a&&a;return e.createElement(j.Consumer,null,(function(t){t||d(!1);var a=t.history,l=t.staticContext,u=o?a.push:a.replace,s=y(n?"string"==typeof r?H(r,n.params):i({},r,{pathname:H(r.pathname,n.params)}):r);return l?(u(s),null):e.createElement(U,{onMount:function(){u(s)},onUpdate:function(e,t){var n=y(t.to);(function(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&f(e.state,t.state)})(n,i({},s,{key:n.key}))||u(s)},to:r})}))}var V={},G=0;function Q(e,t){void 0===t&&(t={}),("string"==typeof t||Array.isArray(t))&&(t={path:t});var n=t,r=n.path,a=n.exact,o=void 0!==a&&a,l=n.strict,i=void 0!==l&&l,u=n.sensitive,s=void 0!==u&&u;return[].concat(r).reduce((function(t,n){if(!n&&""!==n)return null;if(t)return t;var r=function(e,t){var n=""+t.end+t.strict+t.sensitive,r=V[n]||(V[n]={});if(r[e])return r[e];var a=[],o={regexp:I()(e,a,t),keys:a};return G<1e4&&(r[e]=o,G++),o}(n,{end:o,strict:i,sensitive:s}),a=r.regexp,l=r.keys,u=a.exec(e);if(!u)return null;var c=u[0],f=u.slice(1),d=e===c;return o&&!d?null:{path:n,url:"/"===n&&""===c?"/":c,isExact:d,params:l.reduce((function(e,t,n){return e[t.name]=f[n],e}),{})}}),null)}var q=function(t){function n(){return t.apply(this,arguments)||this}return a(n,t),n.prototype.render=function(){var t=this;return e.createElement(j.Consumer,null,(function(n){n||d(!1);var r=t.props.location||n.location,a=i({},n,{location:r,match:t.props.computedMatch?t.props.computedMatch:t.props.path?Q(r.pathname,t.props):n.match}),o=t.props,l=o.children,u=o.component,s=o.render;return Array.isArray(l)&&0===l.length&&(l=null),e.createElement(j.Provider,{value:a},a.match?l?"function"==typeof l?l(a):l:u?e.createElement(u,a):s?s(a):null:"function"==typeof l?l(a):null)}))},n}(e.Component);e.Component;var Y=function(t){function n(){return t.apply(this,arguments)||this}return a(n,t),n.prototype.render=function(){var t=this;return e.createElement(j.Consumer,null,(function(n){n||d(!1);var r,a,o=t.props.location||n.location;return e.Children.forEach(t.props.children,(function(t){if(null==a&&e.isValidElement(t)){r=t;var l=t.props.path||t.props.from;a=l?Q(o.pathname,i({},t.props,{path:l})):n.match}})),a?e.cloneElement(r,{location:o,computedMatch:a}):null}))},n}(e.Component),K=e.useContext;function X(){return K(j).location}function Z(){var e=K(j).match;return e?e.params:{}}e.Component;var J=function(t){function n(){for(var e,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(e=t.call.apply(t,[this].concat(r))||this).history=_(e.props),e}return a(n,t),n.prototype.render=function(){return e.createElement($,{history:this.history,children:this.props.children})},n}(e.Component),ee=function(e,t){return"function"==typeof e?e(t):e},te=function(e,t){return"string"==typeof e?y(e,null,null,t):e},ne=function(e){return e},re=e.forwardRef;void 0===re&&(re=ne);var ae=re((function(t,n){var r=t.innerRef,a=t.navigate,o=t.onClick,l=L(t,["innerRef","navigate","onClick"]),u=l.target,s=i({},l,{onClick:function(e){try{o&&o(e)}catch(t){throw e.preventDefault(),t}e.defaultPrevented||0!==e.button||u&&"_self"!==u||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)||(e.preventDefault(),a())}});return s.ref=ne!==re&&n||r,e.createElement("a",s)})),oe=re((function(t,n){var r=t.component,a=void 0===r?ae:r,o=t.replace,l=t.to,u=t.innerRef,s=L(t,["component","replace","to","innerRef"]);return e.createElement(j.Consumer,null,(function(t){t||d(!1);var r=t.history,c=te(ee(l,t.location),t.location),f=c?r.createHref(c):"",p=i({},s,{href:f,navigate:function(){var e=ee(l,t.location);(o?r.replace:r.push)(e)}});return ne!==re?p.ref=n||u:p.innerRef=u,e.createElement(a,p)}))})),le=function(e){return e},ie=e.forwardRef;void 0===ie&&(ie=le);var ue=ie((function(t,n){var r=t["aria-current"],a=void 0===r?"page":r,o=t.activeClassName,l=void 0===o?"active":o,u=t.activeStyle,s=t.className,c=t.exact,f=t.isActive,p=t.location,h=t.sensitive,m=t.strict,g=t.style,v=t.to,y=t.innerRef,b=L(t,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return e.createElement(j.Consumer,null,(function(t){t||d(!1);var r=p||t.location,o=te(ee(v,r),r),w=o.pathname,k=w&&w.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),E=k?Q(r.pathname,{path:k,exact:c,sensitive:h,strict:m}):null,x=!!(f?f(E,r):E),S=x?function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}(s,l):s,C=x?i({},g,{},u):g,N=i({"aria-current":x&&a||null,className:S,style:C,to:o},b);return le!==ie?N.ref=n||y:N.innerRef=y,e.createElement(oe,N)}))})),se=n(679),ce=n(631),fe=n.n(ce);const de=function(e){function t(e,r,u,s,d){for(var p,h,m,g,w,E=0,x=0,S=0,C=0,N=0,A=0,L=m=p=0,M=0,D=0,j=0,$=0,U=u.length,F=U-1,W="",H="",B="",V="";M<U;){if(h=u.charCodeAt(M),M===F&&0!==x+C+S+E&&(0!==x&&(h=47===x?10:47),C=S=E=0,U++,F++),0===x+C+S+E){if(M===F&&(0<D&&(W=W.replace(f,"")),0<W.trim().length)){switch(h){case 32:case 9:case 59:case 13:case 10:break;default:W+=u.charAt(M)}h=59}switch(h){case 123:for(p=(W=W.trim()).charCodeAt(0),m=1,$=++M;M<U;){switch(h=u.charCodeAt(M)){case 123:m++;break;case 125:m--;break;case 47:switch(h=u.charCodeAt(M+1)){case 42:case 47:e:{for(L=M+1;L<F;++L)switch(u.charCodeAt(L)){case 47:if(42===h&&42===u.charCodeAt(L-1)&&M+2!==L){M=L+1;break e}break;case 10:if(47===h){M=L+1;break e}}M=L}}break;case 91:h++;case 40:h++;case 34:case 39:for(;M++<F&&u.charCodeAt(M)!==h;);}if(0===m)break;M++}switch(m=u.substring($,M),0===p&&(p=(W=W.replace(c,"").trim()).charCodeAt(0)),p){case 64:switch(0<D&&(W=W.replace(f,"")),h=W.charCodeAt(1)){case 100:case 109:case 115:case 45:D=r;break;default:D=R}if($=(m=t(r,D,m,h,d+1)).length,0<I&&(w=i(3,m,D=n(R,W,j),r,T,_,$,h,d,s),W=D.join(""),void 0!==w&&0===($=(m=w.trim()).length)&&(h=0,m="")),0<$)switch(h){case 115:W=W.replace(k,l);case 100:case 109:case 45:m=W+"{"+m+"}";break;case 107:m=(W=W.replace(v,"$1 $2"))+"{"+m+"}",m=1===P||2===P&&o("@"+m,3)?"@-webkit-"+m+"@"+m:"@"+m;break;default:m=W+m,112===s&&(H+=m,m="")}else m="";break;default:m=t(r,n(r,W,j),m,s,d+1)}B+=m,m=j=D=L=p=0,W="",h=u.charCodeAt(++M);break;case 125:case 59:if(1<($=(W=(0<D?W.replace(f,""):W).trim()).length))switch(0===L&&(p=W.charCodeAt(0),45===p||96<p&&123>p)&&($=(W=W.replace(" ",":")).length),0<I&&void 0!==(w=i(1,W,r,e,T,_,H.length,s,d,s))&&0===($=(W=w.trim()).length)&&(W="\0\0"),p=W.charCodeAt(0),h=W.charCodeAt(1),p){case 0:break;case 64:if(105===h||99===h){V+=W+u.charAt(M);break}default:58!==W.charCodeAt($-1)&&(H+=a(W,p,h,W.charCodeAt(2)))}j=D=L=p=0,W="",h=u.charCodeAt(++M)}}switch(h){case 13:case 10:47===x?x=0:0===1+p&&107!==s&&0<W.length&&(D=1,W+="\0"),0<I*z&&i(0,W,r,e,T,_,H.length,s,d,s),_=1,T++;break;case 59:case 125:if(0===x+C+S+E){_++;break}default:switch(_++,g=u.charAt(M),h){case 9:case 32:if(0===C+E+x)switch(N){case 44:case 58:case 9:case 32:g="";break;default:32!==h&&(g=" ")}break;case 0:g="\\0";break;case 12:g="\\f";break;case 11:g="\\v";break;case 38:0===C+x+E&&(D=j=1,g="\f"+g);break;case 108:if(0===C+x+E+O&&0<L)switch(M-L){case 2:112===N&&58===u.charCodeAt(M-3)&&(O=N);case 8:111===A&&(O=A)}break;case 58:0===C+x+E&&(L=M);break;case 44:0===x+S+C+E&&(D=1,g+="\r");break;case 34:case 39:0===x&&(C=C===h?0:0===C?h:C);break;case 91:0===C+x+S&&E++;break;case 93:0===C+x+S&&E--;break;case 41:0===C+x+E&&S--;break;case 40:if(0===C+x+E){if(0===p)switch(2*N+3*A){case 533:break;default:p=1}S++}break;case 64:0===x+S+C+E+L+m&&(m=1);break;case 42:case 47:if(!(0<C+E+S))switch(x){case 0:switch(2*h+3*u.charCodeAt(M+1)){case 235:x=47;break;case 220:$=M,x=42}break;case 42:47===h&&42===N&&$+2!==M&&(33===u.charCodeAt($+2)&&(H+=u.substring($,M+1)),g="",x=0)}}0===x&&(W+=g)}A=N,N=h,M++}if(0<($=H.length)){if(D=r,0<I&&void 0!==(w=i(2,H,D,e,T,_,$,s,d,s))&&0===(H=w).length)return V+H+B;if(H=D.join(",")+"{"+H+"}",0!=P*O){switch(2!==P||o(H,2)||(O=0),O){case 111:H=H.replace(b,":-moz-$1")+H;break;case 112:H=H.replace(y,"::-webkit-input-$1")+H.replace(y,"::-moz-$1")+H.replace(y,":-ms-input-$1")+H}O=0}}return V+H+B}function n(e,t,n){var a=t.trim().split(m);t=a;var o=a.length,l=e.length;switch(l){case 0:case 1:var i=0;for(e=0===l?"":e[0]+" ";i<o;++i)t[i]=r(e,t[i],n).trim();break;default:var u=i=0;for(t=[];i<o;++i)for(var s=0;s<l;++s)t[u++]=r(e[s]+" ",a[i],n).trim()}return t}function r(e,t,n){var r=t.charCodeAt(0);switch(33>r&&(r=(t=t.trim()).charCodeAt(0)),r){case 38:return t.replace(g,"$1"+e.trim());case 58:return e.trim()+t.replace(g,"$1"+e.trim());default:if(0<1*n&&0<t.indexOf("\f"))return t.replace(g,(58===e.charCodeAt(0)?"":"$1")+e.trim())}return e+t}function a(e,t,n,r){var l=e+";",i=2*t+3*n+4*r;if(944===i){e=l.indexOf(":",9)+1;var u=l.substring(e,l.length-1).trim();return u=l.substring(0,e).trim()+u+";",1===P||2===P&&o(u,1)?"-webkit-"+u+u:u}if(0===P||2===P&&!o(l,1))return l;switch(i){case 1015:return 97===l.charCodeAt(10)?"-webkit-"+l+l:l;case 951:return 116===l.charCodeAt(3)?"-webkit-"+l+l:l;case 963:return 110===l.charCodeAt(5)?"-webkit-"+l+l:l;case 1009:if(100!==l.charCodeAt(4))break;case 969:case 942:return"-webkit-"+l+l;case 978:return"-webkit-"+l+"-moz-"+l+l;case 1019:case 983:return"-webkit-"+l+"-moz-"+l+"-ms-"+l+l;case 883:if(45===l.charCodeAt(8))return"-webkit-"+l+l;if(0<l.indexOf("image-set(",11))return l.replace(N,"$1-webkit-$2")+l;break;case 932:if(45===l.charCodeAt(4))switch(l.charCodeAt(5)){case 103:return"-webkit-box-"+l.replace("-grow","")+"-webkit-"+l+"-ms-"+l.replace("grow","positive")+l;case 115:return"-webkit-"+l+"-ms-"+l.replace("shrink","negative")+l;case 98:return"-webkit-"+l+"-ms-"+l.replace("basis","preferred-size")+l}return"-webkit-"+l+"-ms-"+l+l;case 964:return"-webkit-"+l+"-ms-flex-"+l+l;case 1023:if(99!==l.charCodeAt(8))break;return"-webkit-box-pack"+(u=l.substring(l.indexOf(":",15)).replace("flex-","").replace("space-between","justify"))+"-webkit-"+l+"-ms-flex-pack"+u+l;case 1005:return p.test(l)?l.replace(d,":-webkit-")+l.replace(d,":-moz-")+l:l;case 1e3:switch(t=(u=l.substring(13).trim()).indexOf("-")+1,u.charCodeAt(0)+u.charCodeAt(t)){case 226:u=l.replace(w,"tb");break;case 232:u=l.replace(w,"tb-rl");break;case 220:u=l.replace(w,"lr");break;default:return l}return"-webkit-"+l+"-ms-"+u+l;case 1017:if(-1===l.indexOf("sticky",9))break;case 975:switch(t=(l=e).length-10,i=(u=(33===l.charCodeAt(t)?l.substring(0,t):l).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|u.charCodeAt(7))){case 203:if(111>u.charCodeAt(8))break;case 115:l=l.replace(u,"-webkit-"+u)+";"+l;break;case 207:case 102:l=l.replace(u,"-webkit-"+(102<i?"inline-":"")+"box")+";"+l.replace(u,"-webkit-"+u)+";"+l.replace(u,"-ms-"+u+"box")+";"+l}return l+";";case 938:if(45===l.charCodeAt(5))switch(l.charCodeAt(6)){case 105:return u=l.replace("-items",""),"-webkit-"+l+"-webkit-box-"+u+"-ms-flex-"+u+l;case 115:return"-webkit-"+l+"-ms-flex-item-"+l.replace(x,"")+l;default:return"-webkit-"+l+"-ms-flex-line-pack"+l.replace("align-content","").replace(x,"")+l}break;case 973:case 989:if(45!==l.charCodeAt(3)||122===l.charCodeAt(4))break;case 931:case 953:if(!0===C.test(e))return 115===(u=e.substring(e.indexOf(":")+1)).charCodeAt(0)?a(e.replace("stretch","fill-available"),t,n,r).replace(":fill-available",":stretch"):l.replace(u,"-webkit-"+u)+l.replace(u,"-moz-"+u.replace("fill-",""))+l;break;case 962:if(l="-webkit-"+l+(102===l.charCodeAt(5)?"-ms-"+l:"")+l,211===n+r&&105===l.charCodeAt(13)&&0<l.indexOf("transform",10))return l.substring(0,l.indexOf(";",27)+1).replace(h,"$1-webkit-$2")+l}return l}function o(e,t){var n=e.indexOf(1===t?":":"{"),r=e.substring(0,3!==t?n:10);return n=e.substring(n+1,e.length-1),L(2!==t?r:r.replace(S,"$1"),n,t)}function l(e,t){var n=a(t,t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2));return n!==t+";"?n.replace(E," or ($1)").substring(4):"("+t+")"}function i(e,t,n,r,a,o,l,i,u,c){for(var f,d=0,p=t;d<I;++d)switch(f=A[d].call(s,e,p,n,r,a,o,l,i,u,c)){case void 0:case!1:case!0:case null:break;default:p=f}if(p!==t)return p}function u(e){return void 0!==(e=e.prefix)&&(L=null,e?"function"!=typeof e?P=1:(P=2,L=e):P=0),u}function s(e,n){var r=e;if(33>r.charCodeAt(0)&&(r=r.trim()),r=[r],0<I){var a=i(-1,n,r,r,T,_,0,0,0,0);void 0!==a&&"string"==typeof a&&(n=a)}var o=t(R,r,n,0,0);return 0<I&&void 0!==(a=i(-2,o,r,r,T,_,o.length,0,0,0))&&(o=a),O=0,_=T=1,o}var c=/^\0+/g,f=/[\0\r\f]/g,d=/: */g,p=/zoo|gra/,h=/([,: ])(transform)/g,m=/,\r+?/g,g=/([\t\r\n ])*\f?&/g,v=/@(k\w+)\s*(\S*)\s*/,y=/::(place)/g,b=/:(read-only)/g,w=/[svh]\w+-[tblr]{2}/,k=/\(\s*(.*)\s*\)/g,E=/([\s\S]*?);/g,x=/-self|flex-/g,S=/[^]*?(:[rp][el]a[\w-]+)[^]*/,C=/stretch|:\s*\w+\-(?:conte|avail)/,N=/([^-])(image-set\()/,_=1,T=1,O=0,P=1,R=[],A=[],I=0,L=null,z=0;return s.use=function e(t){switch(t){case void 0:case null:I=A.length=0;break;default:if("function"==typeof t)A[I++]=t;else if("object"==typeof t)for(var n=0,r=t.length;n<r;++n)e(t[n]);else z=0|!!t}return e},s.set=u,void 0!==e&&u(e),s},pe={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var he=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;const me=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=(n=e,he.test(n)||111===n.charCodeAt(0)&&110===n.charCodeAt(1)&&n.charCodeAt(2)<91)),t[e];var n}}();function ge(){return(ge=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var ve=function(e,t){for(var n=[e[0]],r=0,a=t.length;r<a;r+=1)n.push(t[r],e[r+1]);return n},ye=function(e){return null!==e&&"object"==typeof e&&"[object Object]"===(e.toString?e.toString():Object.prototype.toString.call(e))&&!(0,se.typeOf)(e)},be=Object.freeze([]),we=Object.freeze({});function ke(e){return"function"==typeof e}function Ee(e){return e.displayName||e.name||"Component"}function xe(e){return e&&"string"==typeof e.styledComponentId}var Se="undefined"!=typeof process&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",Ce="undefined"!=typeof window&&"HTMLElement"in window,Ne=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY&&"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY);function _e(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):""))}var Te=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,a=r;e>=a;)(a<<=1)<0&&_e(16,""+e);this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var o=r;o<a;o++)this.groupSizes[o]=0}for(var l=this.indexOfGroup(e+1),i=0,u=t.length;i<u;i++)this.tag.insertRule(l,t[i])&&(this.groupSizes[e]++,l++)},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var a=n;a<r;a++)this.tag.deleteRule(n)}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),a=r+n,o=r;o<a;o++)t+=this.tag.getRule(o)+"/*!sc*/\n";return t},e}(),Oe=new Map,Pe=new Map,Re=1,Ae=function(e){if(Oe.has(e))return Oe.get(e);for(;Pe.has(Re);)Re++;var t=Re++;return Oe.set(e,t),Pe.set(t,e),t},Ie=function(e){return Pe.get(e)},Le=function(e,t){Oe.set(e,t),Pe.set(t,e)},ze="style["+Se+'][data-styled-version="5.3.0"]',Me=new RegExp("^"+Se+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),De=function(e,t,n){for(var r,a=n.split(","),o=0,l=a.length;o<l;o++)(r=a[o])&&e.registerName(t,r)},je=function(e,t){for(var n=t.innerHTML.split("/*!sc*/\n"),r=[],a=0,o=n.length;a<o;a++){var l=n[a].trim();if(l){var i=l.match(Me);if(i){var u=0|parseInt(i[1],10),s=i[2];0!==u&&(Le(s,u),De(e,s,i[3]),e.getTag().insertRules(u,r)),r.length=0}else r.push(l)}}},$e=function(){return"undefined"!=typeof window&&void 0!==window.__webpack_nonce__?window.__webpack_nonce__:null},Ue=function(e){var t=document.head,n=e||t,r=document.createElement("style"),a=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(Se))return r}}(n),o=void 0!==a?a.nextSibling:null;r.setAttribute(Se,"active"),r.setAttribute("data-styled-version","5.3.0");var l=$e();return l&&r.setAttribute("nonce",l),n.insertBefore(r,o),r},Fe=function(){function e(e){var t=this.element=Ue(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var a=t[n];if(a.ownerNode===e)return a}_e(17)}(t),this.length=0}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),We=function(){function e(e){var t=this.element=Ue(e);this.nodes=t.childNodes,this.length=0}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return!1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),He=function(){function e(e){this.rules=[],this.length=0}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Be=Ce,Ve={isServer:!Ce,useCSSOMInjection:!Ne},Ge=function(){function e(e,t,n){void 0===e&&(e=we),void 0===t&&(t={}),this.options=ge({},Ve,{},e),this.gs=t,this.names=new Map(n),!this.options.isServer&&Ce&&Be&&(Be=!1,function(e){for(var t=document.querySelectorAll(ze),n=0,r=t.length;n<r;n++){var a=t[n];a&&"active"!==a.getAttribute(Se)&&(je(e,a),a.parentNode&&a.parentNode.removeChild(a))}}(this))}e.registerId=function(e){return Ae(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(ge({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,a=t.target,e=n?new He(a):r?new Fe(a):new We(a),new Te(e)));var e,t,n,r,a},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(Ae(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Ae(e),n)},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},t.clearRules=function(e){this.getTag().clearGroup(Ae(e)),this.clearNames(e)},t.clearTag=function(){this.tag=void 0},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",a=0;a<n;a++){var o=Ie(a);if(void 0!==o){var l=e.names.get(o),i=t.getGroup(a);if(void 0!==l&&0!==i.length){var u=Se+".g"+a+'[id="'+o+'"]',s="";void 0!==l&&l.forEach((function(e){e.length>0&&(s+=e+",")})),r+=""+i+u+'{content:"'+s+'"}/*!sc*/\n'}}}return r}(this)},e}(),Qe=/(a)(d)/gi,qe=function(e){return String.fromCharCode(e+(e>25?39:97))};function Ye(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=qe(t%52)+n;return(qe(t%52)+n).replace(Qe,"$1-$2")}var Ke=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Xe=function(e){return Ke(5381,e)};function Ze(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(ke(n)&&!xe(n))return!1}return!0}var Je=Xe("5.3.0"),et=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&Ze(e),this.componentId=t,this.baseHash=Ke(Je,t),this.baseStyle=n,Ge.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,a=[];if(this.baseStyle&&a.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))a.push(this.staticRulesId);else{var o=vt(this.rules,e,t,n).join(""),l=Ye(Ke(this.baseHash,o.length)>>>0);if(!t.hasNameForId(r,l)){var i=n(o,"."+l,void 0,r);t.insertRules(r,l,i)}a.push(l),this.staticRulesId=l}else{for(var u=this.rules.length,s=Ke(this.baseHash,n.hash),c="",f=0;f<u;f++){var d=this.rules[f];if("string"==typeof d)c+=d;else if(d){var p=vt(d,e,t,n),h=Array.isArray(p)?p.join(""):p;s=Ke(s,h+f),c+=h}}if(c){var m=Ye(s>>>0);if(!t.hasNameForId(r,m)){var g=n(c,"."+m,void 0,r);t.insertRules(r,m,g)}a.push(m)}}return a.join(" ")},e}(),tt=/^\s*\/\/.*$/gm,nt=[":","[",".","#"];function rt(e){var t,n,r,a,o=void 0===e?we:e,l=o.options,i=void 0===l?we:l,u=o.plugins,s=void 0===u?be:u,c=new de(i),f=[],d=function(e){function t(t){if(t)try{e(t+"}")}catch(e){}}return function(n,r,a,o,l,i,u,s,c,f){switch(n){case 1:if(0===c&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===s)return r+"/*|*/";break;case 3:switch(s){case 102:case 112:return e(a[0]+r),"";default:return r+(0===f?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(t)}}}((function(e){f.push(e)})),p=function(e,r,o){return 0===r&&-1!==nt.indexOf(o[n.length])||o.match(a)?e:"."+t};function h(e,o,l,i){void 0===i&&(i="&");var u=e.replace(tt,""),s=o&&l?l+" "+o+" { "+u+" }":u;return t=i,n=o,r=new RegExp("\\"+n+"\\b","g"),a=new RegExp("(\\"+n+"\\b){2,}"),c(l||!o?"":o,s)}return c.use([].concat(s,[function(e,t,a){2===e&&a.length&&a[0].lastIndexOf(n)>0&&(a[0]=a[0].replace(r,p))},d,function(e){if(-2===e){var t=f;return f=[],t}}])),h.hash=s.length?s.reduce((function(e,t){return t.name||_e(15),Ke(e,t.name)}),5381).toString():"",h}var at=e.createContext(),ot=(at.Consumer,e.createContext()),lt=(ot.Consumer,new Ge),it=rt();function ut(){return(0,e.useContext)(at)||lt}function st(t){var n=(0,e.useState)(t.stylisPlugins),r=n[0],a=n[1],o=ut(),l=(0,e.useMemo)((function(){var e=o;return t.sheet?e=t.sheet:t.target&&(e=e.reconstructWithOptions({target:t.target},!1)),t.disableCSSOMInjection&&(e=e.reconstructWithOptions({useCSSOMInjection:!1})),e}),[t.disableCSSOMInjection,t.sheet,t.target]),i=(0,e.useMemo)((function(){return rt({options:{prefix:!t.disableVendorPrefixes},plugins:r})}),[t.disableVendorPrefixes,r]);return(0,e.useEffect)((function(){fe()(r,t.stylisPlugins)||a(t.stylisPlugins)}),[t.stylisPlugins]),e.createElement(at.Provider,{value:l},e.createElement(ot.Provider,{value:i},t.children))}var ct=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=it);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.toString=function(){return _e(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return e.prototype.getName=function(e){return void 0===e&&(e=it),this.name+e.hash},e}(),ft=/([A-Z])/,dt=/([A-Z])/g,pt=/^ms-/,ht=function(e){return"-"+e.toLowerCase()};function mt(e){return ft.test(e)?e.replace(dt,ht).replace(pt,"-ms-"):e}var gt=function(e){return null==e||!1===e||""===e};function vt(e,t,n,r){if(Array.isArray(e)){for(var a,o=[],l=0,i=e.length;l<i;l+=1)""!==(a=vt(e[l],t,n,r))&&(Array.isArray(a)?o.push.apply(o,a):o.push(a));return o}return gt(e)?"":xe(e)?"."+e.styledComponentId:ke(e)?"function"!=typeof(u=e)||u.prototype&&u.prototype.isReactComponent||!t?e:vt(e(t),t,n,r):e instanceof ct?n?(e.inject(n,r),e.getName(r)):e:ye(e)?function e(t,n){var r,a,o=[];for(var l in t)t.hasOwnProperty(l)&&!gt(t[l])&&(ye(t[l])?o.push.apply(o,e(t[l],l)):ke(t[l])?o.push(mt(l)+":",t[l],";"):o.push(mt(l)+": "+(r=l,(null==(a=t[l])||"boolean"==typeof a||""===a?"":"number"!=typeof a||0===a||r in pe?String(a).trim():a+"px")+";")));return n?[n+" {"].concat(o,["}"]):o}(e):e.toString();var u}function yt(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return ke(e)||ye(e)?vt(ve(be,[e].concat(n))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:vt(ve(e,n))}new Set;var bt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,wt=/(^-|-$)/g;function kt(e){return e.replace(bt,"-").replace(wt,"")}var Et=function(e){return Ye(Xe(e)>>>0)};function xt(e){return"string"==typeof e&&!0}var St=function(e){return"function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},Ct=function(e){return"__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function Nt(e,t,n){var r=e[n];St(t)&&St(r)?_t(r,t):e[n]=t}function _t(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var a=0,o=n;a<o.length;a++){var l=o[a];if(St(l))for(var i in l)Ct(i)&&Nt(e,l[i],i)}return e}var Tt=e.createContext();Tt.Consumer;var Ot={};function Pt(t,n,r){var a=xe(t),o=!xt(t),l=n.attrs,i=void 0===l?be:l,u=n.componentId,s=void 0===u?function(e,t){var n="string"!=typeof e?"sc":kt(e);Ot[n]=(Ot[n]||0)+1;var r=n+"-"+Et("5.3.0"+n+Ot[n]);return t?t+"-"+r:r}(n.displayName,n.parentComponentId):u,c=n.displayName,f=void 0===c?function(e){return xt(e)?"styled."+e:"Styled("+Ee(e)+")"}(t):c,d=n.displayName&&n.componentId?kt(n.displayName)+"-"+n.componentId:n.componentId||s,p=a&&t.attrs?Array.prototype.concat(t.attrs,i).filter(Boolean):i,h=n.shouldForwardProp;a&&t.shouldForwardProp&&(h=n.shouldForwardProp?function(e,r,a){return t.shouldForwardProp(e,r,a)&&n.shouldForwardProp(e,r,a)}:t.shouldForwardProp);var m,g=new et(r,d,a?t.componentStyle:void 0),v=g.isStatic&&0===i.length,y=function(t,n){return function(t,n,r,a){var o=t.attrs,l=t.componentStyle,i=t.defaultProps,u=t.foldedComponentIds,s=t.shouldForwardProp,c=t.styledComponentId,f=t.target,d=function(e,t,n){void 0===e&&(e=we);var r=ge({},t,{theme:e}),a={};return n.forEach((function(e){var t,n,o,l=e;for(t in ke(l)&&(l=l(r)),l)r[t]=a[t]="className"===t?(n=a[t],o=l[t],n&&o?n+" "+o:n||o):l[t]})),[r,a]}(function(e,t,n){return void 0===n&&(n=we),e.theme!==n.theme&&e.theme||t||n.theme}(n,(0,e.useContext)(Tt),i)||we,n,o),p=d[0],h=d[1],m=function(t,n,r,a){var o=ut(),l=(0,e.useContext)(ot)||it;return n?t.generateAndInjectStyles(we,o,l):t.generateAndInjectStyles(r,o,l)}(l,a,p),g=r,v=h.$as||n.$as||h.as||n.as||f,y=xt(v),b=h!==n?ge({},n,{},h):n,w={};for(var k in b)"$"!==k[0]&&"as"!==k&&("forwardedAs"===k?w.as=b[k]:(s?s(k,me,v):!y||me(k))&&(w[k]=b[k]));return n.style&&h.style!==n.style&&(w.style=ge({},n.style,{},h.style)),w.className=Array.prototype.concat(u,c,m!==c?m:null,n.className,h.className).filter(Boolean).join(" "),w.ref=g,(0,e.createElement)(v,w)}(m,t,n,v)};return y.displayName=f,(m=e.forwardRef(y)).attrs=p,m.componentStyle=g,m.displayName=f,m.shouldForwardProp=h,m.foldedComponentIds=a?Array.prototype.concat(t.foldedComponentIds,t.styledComponentId):be,m.styledComponentId=d,m.target=a?t.target:t,m.withComponent=function(e){var t=n.componentId,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(n,["componentId"]),o=t&&t+"-"+(xt(e)?e:kt(Ee(e)));return Pt(e,ge({},a,{attrs:p,componentId:o}),r)},Object.defineProperty(m,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?_t({},t.defaultProps,e):e}}),m.toString=function(){return"."+m.styledComponentId},o&&M()(m,t,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),m}var Rt,At=function(e){return function e(t,n,r){if(void 0===r&&(r=we),!(0,se.isValidElementType)(n))return _e(1,String(n));var a=function(){return t(n,r,yt.apply(void 0,arguments))};return a.withConfig=function(a){return e(t,n,ge({},r,{},a))},a.attrs=function(a){return e(t,n,ge({},r,{attrs:Array.prototype.concat(r.attrs,a).filter(Boolean)}))},a}(Pt,e)};function It(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=yt.apply(void 0,[e].concat(n)).join(""),o=Et(a);return new ct(o,a)}["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(e){At[e]=At(e)})),(Rt=function(e,t){this.rules=e,this.componentId=t,this.isStatic=Ze(e),Ge.registerId(this.componentId+1)}.prototype).createStyles=function(e,t,n,r){var a=r(vt(this.rules,t,n,r).join(""),""),o=this.componentId+e;n.insertRules(o,o,a)},Rt.removeStyles=function(e,t){t.clearRules(this.componentId+e)},Rt.renderStyles=function(e,t,n,r){e>2&&Ge.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},function(){var t=function(){var t=this;this._emitSheetCSS=function(){var e=t.instance.toString(),n=$e();return"<style "+[n&&'nonce="'+n+'"',Se+'="true"','data-styled-version="5.3.0"'].filter(Boolean).join(" ")+">"+e+"</style>"},this.getStyleTags=function(){return t.sealed?_e(2):t._emitSheetCSS()},this.getStyleElement=function(){var n;if(t.sealed)return _e(2);var r=((n={})[Se]="",n["data-styled-version"]="5.3.0",n.dangerouslySetInnerHTML={__html:t.instance.toString()},n),a=$e();return a&&(r.nonce=a),[e.createElement("style",ge({},r,{key:"sc-0-0"}))]},this.seal=function(){t.sealed=!0},this.instance=new Ge({isServer:!0}),this.sealed=!1}.prototype;t.collectStyles=function(t){return this.sealed?_e(2):e.createElement(st,{sheet:this.instance},t)},t.interleaveWithNodeStream=function(e){return _e(3)}}();const Lt=At,zt=Lt.footer`
  --c1: hsl(30deg, 100%, 50%);
  --c2: hsl(240deg, 100%, 75%);
  --c3: #111;
  --text-color: var(--c1);
  --icon-color: var(--c2);
  --time: 300ms;

  background-image: repeating-linear-gradient(180deg, var(--c3) 0px 3px, #fff0 3px 10px);
  background-size: 10px 10px;
  background-position: center;
`,Mt=Lt.div`
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
`,Dt=Lt.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
`,jt=Lt.a`
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
`,$t=Lt.svg`
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
`,Ut=Lt.div`
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
`,Ft="./svg/sprite.svg#icon-github",Wt=({className:t})=>e.createElement(zt,{className:t},e.createElement(Mt,null,e.createElement(jt,{className:"rss",href:"https://rs.school/js/"},e.createElement($t,{className:"rss"},e.createElement("use",{href:"./svg/sprite.svg#icon-rs-school-js"})),e.createElement(Ut,{className:"rss"},"'21")),e.createElement(Dt,null,e.createElement(jt,{className:"github",href:"https://github.com/dimonwhite"},e.createElement($t,{className:"github"},e.createElement("use",{href:Ft})),e.createElement(Ut,{className:"github"},"mentor",e.createElement("span",{className:"spoiler"},": ","dimonwhite"))),e.createElement(jt,{className:"github",href:"https://github.com/fronte-finem"},e.createElement($t,{className:"github"},e.createElement("use",{href:Ft})),e.createElement(Ut,{className:"github"},"student",e.createElement("span",{className:"spoiler"},": ","fronte-finem")))))),Ht=Lt.button`
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
`,Bt=Lt.div`
  position: absolute;
  top: calc(50% - var(--size) / 2);
  left: var(--pos);
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: #222;
  transition: 300ms;
`,Vt=Lt.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 24px;
  transition: 300ms;
`,Gt=Lt(Vt)`
  right: var(--right);
`,Qt=Lt(Vt)`
  left: var(--left);
`,qt=({className:t,firstName:n,secondName:r,changeMode:a})=>{const[o,l]=e.useState(!1),i=`${t||""} ${o?"second":""}`;return e.createElement(Ht,{className:i,onClick:()=>{l(!o),a(o)}},e.createElement(Gt,null,n),e.createElement(Qt,null,r),e.createElement(Bt,null))},Yt=e=>Array.isArray(e)?e.some((e=>null===(e=>{if(!(e instanceof Object))return null;const t=e;return"number"!=typeof t.id||"string"!=typeof t.category||"string"!=typeof t.image?null:t})(e)))?null:e:null,Kt=e=>Array.isArray(e)?e.some((e=>null===(e=>{if(!(e instanceof Object))return null;const t=e;return"number"!=typeof t.id||"number"!=typeof t.categoryId||"string"!=typeof t.word||"string"!=typeof t.translation||"string"!=typeof t.image||"string"!=typeof t.audio?null:t})(e)))?null:e:null;let Xt;function Zt(){return{status:Xt.INIT,error:"",data:null}}var Jt;function en(e,t){switch(t.type){case Jt.REQUEST:return{...Zt(),status:Xt.LOADING};case Jt.SUCCESS:return{...Zt(),status:Xt.SUCCESS,data:t.payload};case Jt.FAILURE:return{...Zt(),status:Xt.ERROR,error:t.payload};default:return e}}function tn(t,n){const[r,a]=e.useReducer(en,Zt());return e.useEffect((()=>{(async()=>{a({type:Jt.REQUEST});try{const e=await fetch(t);if(!e.ok)throw new Error(`${e.status}: ${e.statusText}`);const r=n(await e.json());if(null===r)throw new Error("Data not valid");a({type:Jt.SUCCESS,payload:r})}catch(e){a({type:Jt.FAILURE,payload:e instanceof Error?e.message:String(e)})}})()}),[]),r}function nn(e){return e.status!==Xt.SUCCESS?[]:e.data||[]}!function(e){e.INIT="init",e.LOADING="loading",e.ERROR="error",e.SUCCESS="success"}(Xt||(Xt={})),function(e){e.REQUEST="request",e.FAILURE="failure",e.SUCCESS="success"}(Jt||(Jt={}));const rn=e.createContext(void 0),an=({children:t})=>{const n=tn("./data/categories.json",Yt),r=tn("./data/words.json",Kt);return e.createElement(rn.Provider,{value:{categoriesState:n,wordsState:r}},t)},on=()=>{const t=e.useContext(rn);if(void 0===t)throw Error("DataContext must be used inside of a DataContextProvider");return t};function ln(){const{categoriesState:e}=on();return function(e,t){switch(e.status){case Xt.INIT:return"Init Loading Categories";case Xt.LOADING:return"Loading Categories...";case Xt.ERROR:return`{dataName} Load Error: ${e.error}`;default:return null}}(e)||e.data||[]}function un(e,t,n){const r=t.find((t=>t.category===e));return r?n.filter((e=>e.categoryId===(null==r?void 0:r.id))):[]}function sn(e){return e[Math.floor(Math.random()*e.length)]}let cn;!function(e){e.INITIAL="initial",e.READY="ready",e.START="start",e.VOCALIZE="vocalize",e.MATCHING="matching",e.HIT="hit",e.MISS="miss",e.SHOW_RESULT="show result",e.END="end"}(cn||(cn={}));const fn=()=>({status:cn.INITIAL,activeRoutePath:"",activeWord:null,words:[],mistakes:0,asyncOperation:null,cancelAsyncOperation:null}),dn=({status:e})=>e!==cn.INITIAL,pn=({status:e})=>e===cn.READY,hn=({status:e})=>e===cn.MATCHING,mn=e=>dn(e)&&!pn(e),gn=e=>mn(e)&&0===e.words.length,vn=e=>gn(e)&&0===e.mistakes,yn=(e,t)=>mn(e)&&e.words.every((e=>e.id!==t));let bn;!function(e){e.ENABLE="enable",e.DISABLE="disable",e.START="start",e.TO_NEXT_WORD="to next word",e.VOCALIZE="vocalize",e.TO_MATCHING="to matching",e.MATCH_WORD="match word",e.TO_RESULT_PAGE="to result page",e.TO_MAIN_PAGE="to main page",e.RESET="reset"}(bn||(bn={}));const wn=(e,t)=>{switch(t.type){case bn.ENABLE:return{...fn(),status:cn.READY};case bn.DISABLE:return function(e){var t;return null===(t=e.cancelAsyncOperation)||void 0===t||t.call(e),fn()}(e);case bn.START:return function({words:e,routePath:t}){return{...fn(),status:cn.START,activeRoutePath:t,words:[...e]}}(t.payload);case bn.TO_NEXT_WORD:return{...e,status:cn.VOCALIZE,activeWord:sn(e.words)};case bn.VOCALIZE:return{...e,status:cn.VOCALIZE};case bn.TO_MATCHING:return function(e){return dn(e)?{...e,status:cn.MATCHING}:e}(e);case bn.MATCH_WORD:return function(e,{word:t}){const{activeWord:n,mistakes:r}=e,a=t.id===(null==n?void 0:n.id),o=a?e.words.filter((e=>e.id!==t.id)):e.words;return{...e,status:a?cn.HIT:cn.MISS,mistakes:a?r:r+1,words:o}}(e,t.payload);case bn.TO_RESULT_PAGE:return function(e,{promise:t,cancel:n}){return{...e,status:cn.SHOW_RESULT,asyncOperation:t,cancelAsyncOperation:n}}(e,t.payload);case bn.TO_MAIN_PAGE:return function(e){return dn(e)?{...e,status:cn.END}:e}(e);case bn.RESET:return{...e,status:cn.READY};default:return e}};function kn(e){if(!e)return;const t=new Audio;t.src=e,t.play()}let En;!function(e){e.NONE="none",e.ASC="asc",e.DESC="desc"}(En||(En={}));const xn=new Map([[En.NONE,En.ASC],[En.ASC,En.DESC],[En.DESC,En.NONE]]),Sn=(e=0)=>[e,0,0,0,0],Cn=([e,t,n,r,a])=>[e,t+1,n,r,a],Nn=([e,t,n,r,a])=>[e,t,n+1,r,a],_n=([e,t,n,r,a])=>[e,t,n,r+1,a],Tn=([e,t,n,r,a])=>[e,t,n,r+1,a+1],On=(e,t,n)=>{const r=t.find((([t])=>t===e))||Sn(e),a=t.filter((([t])=>t!==e));return a.push(n(r)),a},Pn=(e,t)=>On(e,t,Cn),Rn=(e,t)=>On(e,t,Nn),An=(e,t)=>On(e,t,_n),In=(e,t)=>On(e,t,Tn);let Ln;!function(e){e[e.CATEGORY=0]="CATEGORY",e[e.WORD=1]="WORD",e[e.TRANSLATION=2]="TRANSLATION",e[e.TRAIN=3]="TRAIN",e[e.ASK_COUNT=4]="ASK_COUNT",e[e.ASK_PERCENT=5]="ASK_PERCENT",e[e.FLIP_COUNT=6]="FLIP_COUNT",e[e.FLIP_PERCENT=7]="FLIP_PERCENT",e[e.GAME=8]="GAME",e[e.MATCH_COUNT=9]="MATCH_COUNT",e[e.MATCH_PERCENT=10]="MATCH_PERCENT",e[e.ERROR_COUNT=11]="ERROR_COUNT",e[e.ERROR_PERCENT=12]="ERROR_PERCENT"}(Ln||(Ln={}));const zn=(e,t)=>Math.round(t/e*100)||0,Mn=(e,t,n)=>e.map((e=>{var r;const a=null===(r=t.find((({id:t})=>t===e.categoryId)))||void 0===r?void 0:r.category;if(!a)return null;const o=n.find((([t])=>t===e.id));return o?function(e,t,n){const[,r,a,o,l]=n,i=r+a,u=o-l;return{id:t.id,data:{[Ln.CATEGORY]:e,[Ln.WORD]:t.word,[Ln.TRANSLATION]:t.translation,[Ln.TRAIN]:i,[Ln.ASK_COUNT]:r,[Ln.ASK_PERCENT]:zn(i,r),[Ln.FLIP_COUNT]:a,[Ln.FLIP_PERCENT]:zn(i,a),[Ln.GAME]:o,[Ln.MATCH_COUNT]:l,[Ln.MATCH_PERCENT]:zn(o,l),[Ln.ERROR_COUNT]:u,[Ln.ERROR_PERCENT]:zn(o,u)}}}(a,e,o):null})).filter((e=>null!==e)),Dn=(e,t,n)=>n===En.NONE?[...e].sort(((e,t)=>e.id-t.id)):[...e].sort(function(e,t){return function(n,r){if(e===En.NONE)return 0;const[a,o]=[n.data[t],r.data[t]];return"string"==typeof a&&"string"==typeof o?e===En.ASC?a.localeCompare(o):o.localeCompare(a):"number"==typeof a&&"number"==typeof o?e===En.ASC?a-o:o-a:0}}(n,t)),jn=(e,t,n)=>r=>{const a=t(r,e);n(a)},$n=e.createContext(void 0),Un=({children:t})=>{const[n,r]=(()=>{const{categoriesState:e,wordsState:t}=on();return[nn(e),nn(t)]})(),a=r.map((e=>Sn(e.id))),[o,l]=function(t,n){const[r,a]=e.useState((()=>{try{const e=window.localStorage.getItem(t);return e?JSON.parse(e):n}catch(e){return console.log(`LocalStorage: Error getting key “${t}”:`,e),n}}));return[r,e=>{try{const n=e instanceof Function?e(r):e;window.localStorage.setItem(t,JSON.stringify(n)),a(n)}catch(e){console.log(`LocalStorage: Error setting key “${t}”:`,e)}}]}("fronte-finem--efk--words-stats",a),[i,u]=e.useState(Mn(r,n,o));let s=Wn(i,r);e.useEffect((()=>{const e=Mn(r,n,o);u(e),s=Wn(e,r)}),[r,n,o]),0===o.length&&a.length>0&&l(a);const c={categoriesData:n,wordsData:r,wordsStats:o,extendedWordsStats:i,setExtendedWordsStats:u,askClick:jn(o,Pn,l),flipClick:jn(o,Rn,l),gameClick:jn(o,An,l),matchClick:jn(o,In,l),resetStats:()=>l(o.map((([e])=>Sn(e)))),getDifficultWords:s};return e.createElement($n.Provider,{value:c},t)},Fn=()=>{const t=e.useContext($n);if(void 0===t)throw Error("ExtendedWordsStatsContext must be used inside of a ExtendedWordsStatsContextProvider");return t};function Wn(e,t){return(n=8)=>Dn(e,Ln.ERROR_PERCENT,En.DESC).slice(0,n).filter((e=>e.data[Ln.ERROR_PERCENT]>0)).map((({id:e})=>t.find((t=>t.id===e))))}function Hn(){const{gameClick:t,matchClick:n}=Fn(),[r,a]=e.useReducer(wn,fn());return e.useEffect((()=>{(async()=>{switch(r.status){case cn.START:a({type:bn.TO_NEXT_WORD});break;case cn.VOCALIZE:!function(e,t){var n;kn((null===(n=e.activeWord)||void 0===n?void 0:n.audio)||null),t({type:bn.TO_MATCHING})}(r,a);break;case cn.HIT:r.activeWord&&n(r.activeWord.id),function(e,t){if(gn(e)){const n=vn(e)?"./sfx/win.mp3":"./sfx/fail.mp3",[r,a]=function(e){let t=()=>{};if(!e)return[Promise.resolve(),t];let n=null;return[new Promise((r=>{t=(e=>()=>{var t;n&&(n.onended=null),null===(t=n)||void 0===t||t.pause(),n=null,e()})(r),n=new Audio,n.src=e,n.onended=()=>r(),n.play()})),t]}(n);t({type:bn.TO_RESULT_PAGE,payload:{promise:r,cancel:a}})}else kn("./sfx/yes.mp3"),t({type:bn.TO_NEXT_WORD})}(r,a);break;case cn.MISS:r.activeWord&&t(r.activeWord.id),function(e){kn("./sfx/no.mp3"),e({type:bn.TO_MATCHING})}(a);break;case cn.SHOW_RESULT:await async function({asyncOperation:e},t){await e,t({type:bn.TO_MAIN_PAGE})}(r,a)}})()}),[r]),[r,a]}const Bn=e.createContext(void 0),Vn=({children:t})=>{const[n,r]=Hn();return e.createElement(Bn.Provider,{value:{gameState:n,dispatch:r}},t)},Gn=()=>{const t=e.useContext(Bn);if(void 0===t)throw Error("GameContext must be used inside of a GameContextProvider");return t},Qn=Lt.button`
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
`,qn=Lt.div`
  width: var(--btn-width);
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
  grid-template-rows: 30px;
  align-items: center;
  column-gap: 5px;
  color: var(--color-foreground);
  transition: all var(--time);
`,Yn=Lt.div`
  display: block;
  &:first-child {
    justify-self: flex-end;
  }
  &:last-child {
    justify-self: flex-start;
    transform: scale(-1, 1);
  }
`,Kn=Lt.div`
  position: relative;
  display: block;
  width: 50px;
  height: 50px;
  overflow: hidden;
`,Xn=Lt.svg`
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
`,Zn=({onClick:t,isStart:n=!1})=>{const r=n?"START":"REPEAT",a=n?"./svg/sprite.svg#icon-start":"./svg/sprite.svg#icon-repeat";return e.createElement(Qn,{onClick:t,isPrimary:n},e.createElement(qn,null,e.createElement(Yn,null,r),e.createElement(Kn,null,e.createElement(Xn,null,e.createElement("use",{href:a}))),e.createElement(Yn,null,r)))},Jn=Lt.header`
  height: 100px;
  border-bottom: 3px solid #111;
  background: #fff8;
  backdrop-filter: invert(1);
`,er=Lt.div`
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
`,tr=Lt(oe)`
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
`,nr=Lt.h1`
  flex: 1 0 100%;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 800px) {
    display: none;
  }
`,rr=Lt.div`
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
`,ar=Lt.div`
  position: absolute;
  right: 20px;
  top: 20px;
`,or=e=>e.startsWith("/category"),lr=({className:t})=>{const{wordsData:n,categoriesData:r,getDifficultWords:a}=Fn(),{pathname:o}=X(),{gameState:l,dispatch:i}=Gn(),[u,s]=e.useState(!0),c=or(o),f=o.startsWith("/difficult"),d=or(p=o)?p.replace(/^\/category\//,""):"";var p;return e.useEffect((()=>{f&&0===a().length?s(!0):s(!(c||f)||!dn(l))}),[c,f,l]),e.createElement(Jn,{className:t},e.createElement(er,null,e.createElement(nr,null,e.createElement(tr,{to:"/"},"English for kids")),e.createElement(rr,{isHidden:u},e.createElement(Zn,{onClick:()=>{if(c||f)if(pn(l)){const e=f?a():un(d,r,n);i({type:bn.START,payload:{routePath:o,words:e}})}else i({type:bn.VOCALIZE})},isStart:!mn(l)})),e.createElement(ar,null,e.createElement(qt,{firstName:"train",secondName:"play",changeMode:e=>{i({type:e?bn.DISABLE:bn.ENABLE})}}))))},ir=({name:t,className:n,onClick:r,children:a})=>e.createElement(ue,{className:n,to:`/category/${t}`,onClick:r,draggable:!1},a),ur=It`
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
`,sr=Lt.div.attrs((e=>({delay:e.delay||Math.random()})))`
  --delay: ${e=>e.delay}s;
  position: relative;
  width: 100%;
  height: 100%;
`,cr=Lt(ir)`
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
    animation: 2s ${ur} var(--delay) linear infinite;
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
`,fr=Lt.img.attrs({draggable:!1})`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: var(--path);
  transition: 300ms;
`,dr=Lt.div`
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
`,pr=Lt.div`
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
`,hr=({className:t,isGameMode:n,categoryDTO:r})=>{const{category:a,image:o}=r;return e.createElement(sr,{className:t},e.createElement(cr,{className:n?"game":"",name:a},e.createElement(fr,{src:o,alt:a}),e.createElement(dr,null,e.createElement(pr,null,a))))},mr=Lt.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 20px;
  padding: 50px 20px;
  overflow: hidden;
`,gr=Lt.li`
  display: block;
  flex: 0 0 ${300}px;
  perspective: ${900}px;
`,vr=({className:t})=>{const n=ln(),{gameState:r}=Gn();return"string"==typeof n?e.createElement("h2",null,n):e.createElement("nav",{className:t},e.createElement(mr,null,n.map((t=>e.createElement(gr,{key:t.category},e.createElement(hr,{categoryDTO:t,isGameMode:dn(r)}))))))},yr=yt`
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
`,br=yt`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  padding: 0;
  border: none;
  background: #0008;
  color: #fff;
  text-transform: capitalize;
  text-decoration: none;
  text-align: center;
  font-family: monospace;
  transition: all 200ms;

  &:hover {
    background: #000a;
  }
  &:active {
    background: #000d;
  }
`,wr=Lt.button`
  ${br};
`,kr=Lt(oe)`
  ${br};
`,Er=Lt.div`
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
`,xr=Lt.div`
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
`,Sr=Lt.div`
  overflow-x: auto;
  height: 70vh;
  ${yr};
`,Cr=yt`
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
`,Nr=Lt.td`
  ${Cr};

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
`,_r=Lt(Nr)`
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
`,Tr=Lt(Nr)`
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
`,Or=Lt(_r)`
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
`,Pr=({text:t,className:n,rowSpan:r,colSpan:a})=>e.createElement(_r,{className:n,rowSpan:r,colSpan:a},t),Rr=({order:t,onOrderChange:n,text:r,className:a,rowSpan:o,colSpan:l})=>{const i=`${a||""} ${t}`;return e.createElement(Or,{className:i,onClick:n,rowSpan:o,colSpan:l},r)},Ar=Lt.table`
  position: relative;
  width: 100%;
  min-width: 1200px;
  box-shadow: 0 0 20px #0004, 0 10px 20px #0002, 0 20px 20px #0002, 0 30px 20px #0002;
`,Ir=Lt.thead`
  position: sticky;
  top: 0;
  z-index: 2;
`,Lr=Lt.tbody`
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
`,zr=()=>({[Ln.CATEGORY]:En.NONE,[Ln.WORD]:En.NONE,[Ln.TRANSLATION]:En.NONE,[Ln.TRAIN]:En.NONE,[Ln.ASK_COUNT]:En.NONE,[Ln.ASK_PERCENT]:En.NONE,[Ln.FLIP_COUNT]:En.NONE,[Ln.FLIP_PERCENT]:En.NONE,[Ln.GAME]:En.NONE,[Ln.MATCH_COUNT]:En.NONE,[Ln.MATCH_PERCENT]:En.NONE,[Ln.ERROR_COUNT]:En.NONE,[Ln.ERROR_PERCENT]:En.NONE}),Mr=({onOrderChange:t})=>{const[n,r]=e.useState(zr()),a=e=>()=>{const a=n[e],o=xn.get(a)||En.NONE;r({...zr(),[e]:o}),t(e,o)},o=(e,t,r,o)=>({text:e,className:t,order:n[r],onOrderChange:a(r),rowSpan:o});return e.createElement(Ir,null,e.createElement("tr",null,e.createElement(Pr,{rowSpan:3,className:"num",text:"№"}),e.createElement(Rr,o("category","category",Ln.CATEGORY,3)),e.createElement(Rr,o("word","word",Ln.WORD,3)),e.createElement(Rr,o("translation","translation",Ln.TRANSLATION,3)),e.createElement(Pr,{colSpan:5,className:"train",text:"train"}),e.createElement(Pr,{colSpan:5,className:"game",text:"game"})),e.createElement("tr",null,e.createElement(Rr,o("all","train",Ln.TRAIN,2)),e.createElement(Pr,{colSpan:2,className:"train-ask-a",text:"ask"}),e.createElement(Pr,{colSpan:2,className:"train-flip-a",text:"flip"}),e.createElement(Rr,o("all","game",Ln.GAME,2)),e.createElement(Pr,{colSpan:2,className:"game-match-a",text:"match"}),e.createElement(Pr,{colSpan:2,className:"game-error-a",text:"error"})),e.createElement("tr",null,e.createElement(Rr,o("sum","train-ask-a",Ln.ASK_COUNT)),e.createElement(Rr,o("%","train-ask-b",Ln.ASK_PERCENT)),e.createElement(Rr,o("sum","train-flip-a",Ln.FLIP_COUNT)),e.createElement(Rr,o("%","train-flip-b",Ln.FLIP_PERCENT)),e.createElement(Rr,o("sum","game-match-a",Ln.MATCH_COUNT)),e.createElement(Rr,o("%","game-match-b",Ln.MATCH_PERCENT)),e.createElement(Rr,o("sum","game-error-a",Ln.ERROR_COUNT)),e.createElement(Rr,o("%","game-error-b",Ln.ERROR_PERCENT))))},Dr=({index:t,data:n})=>e.createElement("tr",null,e.createElement(Tr,{className:"num"},t),e.createElement(Tr,{className:"category"},n[Ln.CATEGORY]),e.createElement(Tr,{className:"word"},n[Ln.WORD]),e.createElement(Tr,{className:"translation"},n[Ln.TRANSLATION]),e.createElement(Tr,{className:"stats train all"},n[Ln.TRAIN]),e.createElement(Tr,{className:"stats train-ask-a"},n[Ln.ASK_COUNT]),e.createElement(Tr,{className:"stats train-ask-b"},n[Ln.ASK_PERCENT]),e.createElement(Tr,{className:"stats train-flip-a"},n[Ln.FLIP_COUNT]),e.createElement(Tr,{className:"stats train-flip-b"},n[Ln.FLIP_PERCENT]),e.createElement(Tr,{className:"stats game all"},n[Ln.GAME]),e.createElement(Tr,{className:"stats game-match-a"},n[Ln.MATCH_COUNT]),e.createElement(Tr,{className:"stats game-match-b"},n[Ln.MATCH_PERCENT]),e.createElement(Tr,{className:"stats game-error-a"},n[Ln.ERROR_COUNT]),e.createElement(Tr,{className:"stats game-error-b"},n[Ln.ERROR_PERCENT])),jr=()=>{const{extendedWordsStats:t}=Fn(),[n,r]=e.useState(t);return e.useEffect((()=>r(t)),[t]),e.createElement(Ar,null,e.createElement(Mr,{onOrderChange:(e,t)=>{r(Dn(n,e,t))}}),e.createElement(Lr,null,n.map((({id:t,data:n},r)=>e.createElement(Dr,{key:t,id:t,index:r+1,data:n})))))},$r=()=>{const{resetStats:t}=Fn();return e.createElement(xr,null,e.createElement(Er,null,e.createElement(wr,{onClick:t},"reset statistic data"),e.createElement(kr,{to:"/difficult"},"repeat difficult words")),e.createElement(Sr,null,e.createElement(jr,null)))},Ur=Lt.button`
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
`,Fr=Lt.span`
  position: absolute;
  top: 0;
  left: -50%;
  width: 100%;
  height: 100%;
  transition: all var(--time) ease-in-out;
  transform: translateX(50%) var(--scale-x);
`,Wr=Lt.span`
  display: block;
  position: absolute;
  width: var(--stripe-w);
  height: var(--stripe-h);
  background: var(--stripe-c);
  border-radius: var(--stripe-s);
  transition: all var(--time) ease-in-out;
`,Hr=Lt(Wr)`
  top: calc(50% - var(--stripe-s));
  width: 100%;
  transform-origin: center;
  transform: var(--middle);
`,Br=yt`
  left: 0;
  transform-origin: var(--stripe-s) var(--stripe-s);
`,Vr=yt`
  right: 0;
  transform-origin: calc(100% - var(--stripe-s)) var(--stripe-s);
`,Gr=yt`
  top: 0;
`,Qr=yt`
  bottom: 0;
`,qr=Lt(Wr)`
  ${Gr}
  ${Br}
  transform: var(--clockwise);
`,Yr=Lt(Wr)`
  ${Gr}
  ${Vr}
  transform: var(--counter-clockwise);
`,Kr=Lt(Wr)`
  ${Qr}
  ${Br}
  transform: var(--counter-clockwise);
`,Xr=Lt(Wr)`
  ${Qr}
  ${Vr}
  transform: var(--clockwise);
`,Zr=({className:t,isClosed:n,onToggle:r})=>{const a=`${t||""} ${n?"":"close"}`;return e.createElement(Ur,{className:a,onClick:r},e.createElement(Fr,null,e.createElement(qr,null),e.createElement(Yr,null),e.createElement(Hr,null),e.createElement(Kr,null),e.createElement(Xr,null)))},Jr=Lt.nav`
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
`,ea=Lt.div`
  position: absolute;
  right: var(--ofsset);
  top: 20px;
  transition: all 500ms;
`,ta=Lt.div`
  display: flex;
  flex-direction: column;
  padding: 100px 0 0;
  row-gap: 20px;
`,na=Lt.h3`
  color: #fff;
  text-align: center;
  text-transform: uppercase;
`,ra=Lt.ul`
  display: flex;
  flex-direction: column;
  padding: 0 0 20px;
  row-gap: 10px;
  overflow: auto;
  ${yr};
`,aa=Lt.li`
  position: relative;
  display: block;
  user-select: none;
`,oa=yt`
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
`,la=Lt(ue).attrs({draggable:!1})`
  ${oa};
`,ia=Lt(ir)`
  ${oa};
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
`,ua=Lt.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  pointer-events: none;
  mask-image: linear-gradient(90deg, #fff0, #000);
`,sa=({className:t})=>{const{ref:n,isClosed:r,setClose:a}=function(){const t=e.createRef(),[n,r]=(0,e.useState)(!0),a=e=>{var a;n||null!==(a=t.current)&&void 0!==a&&a.contains(e.target)||r(!0)},o=e=>{"Escape"===e.code&&r(!0)};return(0,e.useEffect)((()=>(document.documentElement.addEventListener("keydown",o),document.documentElement.addEventListener("click",a),()=>{document.documentElement.removeEventListener("keydown",o),document.documentElement.removeEventListener("click",a)})),[t]),{ref:t,isClosed:n,setClose:r}}(),o=ln(),l=`${t||""} ${r?"close":""}`,i=()=>a(!0);return e.createElement(Jr,{className:l,ref:n},e.createElement(ea,null,e.createElement(Zr,{isClosed:r,onToggle:()=>a(!r)})),e.createElement(ta,null,e.createElement(la,{exact:!0,to:"/",onClick:i},"Home"),e.createElement(la,{exact:!0,to:"/statistic",onClick:i},"Statistic")),e.createElement(na,null,"Categories:"),e.createElement(ra,null,Array.isArray(o)&&o.map((({category:t,image:n})=>e.createElement(aa,{key:t},e.createElement(ia,{name:t,onClick:i},t,e.createElement(ua,{src:n,alt:t})))))))},ca=It`
  0% {
    filter: hue-rotate(0);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`,fa=Lt.div`
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
`,da=Lt.div`
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
  animation: ${ca} 30s linear infinite;
`,pa=Lt.div`
  position: relative;
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
`,ha=Lt.main`
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
`,ma=Lt.ul`
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
`,ga=Lt.li`
  --size: 40px;
  flex: 0 0 var(--size);
  width: var(--size);
  height: var(--size);
`,va=Lt.svg`
  display: block;
  width: 100%;
  height: 100%;
`,ya=["happy-cute","happy","in-love","cute","happy-smile"],ba=["very-sad","confused","arrogant","sad","bored"],wa=({name:t,className:n})=>e.createElement(va,{className:n},e.createElement("use",{href:`./svg/emoji.svg#${t}`})),ka=({emojiName:t})=>e.createElement(ga,null,e.createElement(wa,{name:t})),Ea=({marks:t,show:n})=>e.createElement(ma,{show:n},t.map(((t,n)=>{const r=`${n} ${t}`;return e.createElement(ka,{key:r,emojiName:t})}))),xa=Lt.button`
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
`,Sa=Lt.svg`
  width: 100%;
  height: 100%;
  fill: #fff;
`,Ca=e.forwardRef((({className:t="",onFlip:n},r)=>e.createElement(xa,{className:t,onClick:n,ref:r},e.createElement(Sa,null,e.createElement("use",{href:"./svg/sprite.svg#icon-rotate"}))))),Na=Lt.div`
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
`,_a=Lt.ul`
  position: absolute;
  bottom: 10px;
  left: 5%;
  width: 90%;
  pointer-events: none;
`,Ta=Lt.div`
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
`,Oa=Lt(Ca)`
  position: absolute;
  right: 5%;
`,Pa=Lt.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  backface-visibility: hidden;
`,Ra=Lt(Pa)``,Aa=Lt(Pa)`
  --mirror: scaleX(-1);
  transform: rotateY(180deg) rotateZ(-90deg);
`,Ia=Lt.img.attrs({draggable:!1})`
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: var(--mirror);
`,La=Lt.div`
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
`,za=({image:t,word:n,children:r})=>e.createElement(e.Fragment,null,e.createElement(Ia,{src:t,alt:n}),e.createElement(La,null,n,r)),Ma=({image:t,word:n,children:r})=>e.createElement(Ra,null,e.createElement(za,{image:t,word:n},r)),Da=({image:t,word:n})=>e.createElement(Aa,null,e.createElement(za,{image:t,word:n})),ja=t=>{const{className:n,wordDTO:r,isGameMode:a,isGameReady:o,isGamePlay:l,isSolved:i,matchWord:u}=t,{id:s,word:c,translation:f,image:d,audio:p}=r,h=e.useRef(null),[m,g]=e.useState(!1),[v,y]=e.useState([]),{askClick:b,flipClick:w}=Fn(),k=((e,{isGameMode:t,isGameReady:n,isGamePlay:r,isSolved:a})=>{let o=t?"game":"train";return t||(o+=e?" flip":" flip-not"),n&&(o+=" game-ready"),r&&!a&&(o+=" game-play"),t&&a&&(o+=" solved"),o})(m,t);return e.createElement(Na,{className:n,onMouseLeave:()=>g((()=>!1))},e.createElement(Ta,{className:k,onClick:e=>{var t;if(!o&&!i)if(l){const e=sn(u(r)?ya:ba);y([...v.slice(-6),e])}else null!==(t=h.current)&&void 0!==t&&t.contains(e.target)||(kn(p),b(s))}},e.createElement(Ma,{word:c,image:d},e.createElement(Oa,{onFlip:()=>{g((()=>!0)),w(s)},ref:h})),e.createElement(Da,{word:f,image:d})),e.createElement(_a,null,e.createElement(Ea,{marks:v,show:a})))},$a=Lt.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 50px 20px;
  overflow: hidden;
`,Ua=Lt.li`
  flex: 0 0 ${300}px;
  perspective: ${900}px;
`,Fa=({className:t,isDifficultWords:n=!1})=>{const{category:r}=Z(),{wordsData:a,categoriesData:o,getDifficultWords:l}=Fn(),{gameState:i,dispatch:u}=Gn(),s=n?e.useRef(l()).current:un(r,o,a);if(0===s.length)return e.createElement("h2",null,n?"No difficult words":`Category "${r}" not found`);const c=e=>{return!!hn(i)&&(!!yn(i,e.id)||(u({type:bn.MATCH_WORD,payload:{word:e}}),t=i,n=e.id,mn(t)&&n===(null===(r=t.activeWord)||void 0===r?void 0:r.id)));var t,n,r},[f,d,p]=[dn,pn,hn].map((e=>e(i)));return e.createElement("div",{className:t},e.createElement($a,null,s.map((t=>e.createElement(Ua,{key:t.word},e.createElement(ja,{wordDTO:t,matchWord:c,isGameMode:f,isGameReady:d,isGamePlay:p,isSolved:yn(i,t.id)}))))))},Wa=It`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`,Ha=Lt.ul.attrs((e=>{var t;return{amount:e.amount||0,tangent:(null===(t=e.tangent)||void 0===t?void 0:t.toFixed(3))||0}}))`
  --amount: ${e=>e.amount};
  --tangent: ${e=>e.tangent};
  --emoji-size: min(20vh, 20vw);
  --space: 1;
  --radius: min(20vh, 20vw);
  --container-size: calc(2 * var(--radius) + var(--emoji-size));
  --animation: 12s ${Wa} linear infinite;

  position: relative;
  display: block;
  width: var(--container-size);
  height: var(--container-size);
  animation: var(--animation);

  .emoji-animate {
    animation: var(--animation) reverse;
  }
`,Ba=Lt.li.attrs((e=>({index:e.index||0})))`
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
`,Va=({className:t,emojiNames:n})=>{const r=n.length,a=Math.tan(Math.PI/r);return e.createElement(Ha,{className:t,amount:r,tangent:a},n.map(((t,n)=>e.createElement(Ba,{key:t,index:n+1},e.createElement(wa,{name:t,className:"emoji-animate"})))))},Ga=Lt.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  overflow: hidden;
`,Qa=Lt.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,qa=Lt.h2`
  padding: 20px 40px;
  text-align: center;
  font-size: 40px;
`,Ya=({className:t,children:n})=>e.createElement(Ga,{className:t},n),Ka=({className:t})=>e.createElement(Ya,{className:t},e.createElement(Va,{emojiNames:ya})),Xa=({className:t})=>{const{gameState:n}=Gn();return e.createElement(Ya,{className:t},e.createElement(Qa,null,e.createElement(qa,null,n.mistakes," mistakes"),e.createElement(Va,{emojiNames:ba})))},Za=({state:t,isDifficultWords:n})=>(({status:e})=>e===cn.END)(t)?e.createElement(B,{to:"/"}):vn(t)?e.createElement(Ka,null):(e=>gn(e)&&e.mistakes>0)(t)?e.createElement(Xa,null):e.createElement(Fa,{isDifficultWords:n}),Ja=()=>{const{route:t}=Z();return e.createElement("h2",null,'Not found: "',t,'"')},eo=()=>e.createElement("div",null,e.createElement(Zn,{onClick:()=>{},isStart:!0}),e.createElement(Zn,{onClick:()=>{}})),to=new Map([["about",e.createElement("h2",null,"ABOUT")],["win",e.createElement(Ka,null)],["fail",e.createElement(Xa,null)],["test",e.createElement(eo,null)]]),no=({component:t})=>e.createElement("h2",null,'No test for "',t,'"'),ro=()=>{const{component:t}=Z();return to.get(t)||e.createElement(no,{component:t})},ao=()=>{const{pathname:t}=X(),{gameState:n,dispatch:r}=Gn();return e.useEffect((()=>{var e,a;mn(n)&&(a=t,(e=n).activeRoutePath&&e.activeRoutePath!==a)&&r({type:bn.RESET})}),[t]),e.createElement(pa,null,e.createElement(fa,null,e.createElement(da,null)),e.createElement(sa,null),e.createElement(lr,null),e.createElement(ha,null,e.createElement(Y,null,e.createElement(q,{exact:!0,path:"/"},e.createElement(vr,null)),e.createElement(q,{path:"/category/:category"},e.createElement(Za,{state:n})),e.createElement(q,{path:"/difficult"},e.createElement(Za,{state:n,isDifficultWords:!0})),e.createElement(q,{path:"/statistic"},e.createElement($r,null)),e.createElement(q,{path:"/test/:component"},e.createElement(ro,null)),e.createElement(q,{path:"/:route"},e.createElement(Ja,null)))),e.createElement(Wt,null))};t.render(e.createElement(e.StrictMode,null,e.createElement(an,null,e.createElement(Un,null,e.createElement(Vn,null,e.createElement(J,null,e.createElement(ao,null)))))),document.getElementById("root"))})()})();