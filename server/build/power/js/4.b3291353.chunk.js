(this.webpackJsonpzlwj_sass_r=this.webpackJsonpzlwj_sass_r||[]).push([[4],{1608:function(e,t,n){"use strict";var r=n(1609),a={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var n,o,l,i,c,s,u=!1;t||(t={}),n=t.debug||!1;try{if(l=r(),i=document.createRange(),c=document.getSelection(),(s=document.createElement("span")).textContent=e,s.style.all="unset",s.style.position="fixed",s.style.top=0,s.style.clip="rect(0, 0, 0, 0)",s.style.whiteSpace="pre",s.style.webkitUserSelect="text",s.style.MozUserSelect="text",s.style.msUserSelect="text",s.style.userSelect="text",s.addEventListener("copy",(function(r){if(r.stopPropagation(),t.format)if(r.preventDefault(),"undefined"===typeof r.clipboardData){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var o=a[t.format]||a.default;window.clipboardData.setData(o,e)}else r.clipboardData.clearData(),r.clipboardData.setData(t.format,e);t.onCopy&&(r.preventDefault(),t.onCopy(r.clipboardData))})),document.body.appendChild(s),i.selectNodeContents(s),c.addRange(i),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");u=!0}catch(d){n&&console.error("unable to copy using execCommand: ",d),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),u=!0}catch(d){n&&console.error("unable to copy using clipboardData: ",d),n&&console.error("falling back to prompt"),o=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(o,e)}}finally{c&&("function"==typeof c.removeRange?c.removeRange(i):c.removeAllRanges()),s&&document.body.removeChild(s),l()}return u}},1609:function(e,t){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],r=0;r<e.rangeCount;r++)n.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach((function(t){e.addRange(t)})),t&&t.focus()}}},1610:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=(r=n(1611))&&r.__esModule?r:{default:r};t.default=a,e.exports=a},1611:function(e,t,n){"use strict";var r=n(47),a=n(55);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(1)),l=r(n(1612)),i=r(n(65)),c=function(e,t){return o.createElement(i.default,Object.assign({},e,{ref:t,icon:l.default}))};c.displayName="EditOutlined";var s=o.forwardRef(c);t.default=s},1612:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"}},1613:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=(r=n(1614))&&r.__esModule?r:{default:r};t.default=a,e.exports=a},1614:function(e,t,n){"use strict";var r=n(47),a=n(55);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(1)),l=r(n(1615)),i=r(n(65)),c=function(e,t){return o.createElement(i.default,Object.assign({},e,{ref:t,icon:l.default}))};c.displayName="CopyOutlined";var s=o.forwardRef(c);t.default=s},1615:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"}}]},name:"copy",theme:"outlined"}},1616:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=(r=n(1617))&&r.__esModule?r:{default:r};t.default=a,e.exports=a},1617:function(e,t,n){"use strict";var r=n(47),a=n(55);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(1)),l=r(n(1618)),i=r(n(65)),c=function(e,t){return o.createElement(i.default,Object.assign({},e,{ref:t,icon:l.default}))};c.displayName="EnterOutlined";var s=o.forwardRef(c);t.default=s},1618:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"}}]},name:"enter",theme:"outlined"}},1638:function(e,t,n){"use strict";var r=n(8),a=n.n(r),o=n(6),l=n.n(o),i=n(1),c=n(9),s=n.n(c),u=n(73),d=n(127),p=n(48),f=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},m=function(e,t){var n=e.prefixCls,r=e.component,o=void 0===r?"article":r,c=e.className,m=e["aria-label"],v=e.setContentRef,y=e.children,h=f(e,["prefixCls","component","className","aria-label","setContentRef","children"]),b=t;return v&&(Object(p.a)(!1,"Typography","`setContentRef` is deprecated. Please use `ref` instead."),b=Object(u.a)(t,v)),i.createElement(d.a,null,(function(e){var t=e.getPrefixCls,r=e.direction,u=o,d=t("typography",n),p=s()(d,l()({},"".concat(d,"-rtl"),"rtl"===r),c);return i.createElement(u,a()({className:p,"aria-label":m,ref:b},h),y)}))},v=i.forwardRef(m);v.displayName="Typography";var y,h=v,b=n(88),g=n.n(b),x=n(115),E=n.n(x),C=n(74),w=n.n(C),O=n(81),N=n.n(O),j=n(82),S=n.n(j),k=n(83),P=n.n(k),R=n(157),T=n(1608),z=n.n(T),M=n(49),_=n(1610),D=n.n(_),I=n(1559),A=n.n(I),L=n(1613),H=n.n(L),U=n(281),q=n(44),F=n(188),B=n(21),K=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},V={border:0,background:"transparent",padding:0,lineHeight:"inherit",display:"inline-block"},W=i.forwardRef((function(e,t){var n=e.style,r=e.noStyle,o=e.disabled,l=K(e,["style","noStyle","disabled"]),c={};return r||(c=a()({},V)),o&&(c.pointerEvents="none"),c=a()(a()({},c),n),i.createElement("div",a()({role:"button",tabIndex:0,ref:t},l,{onKeyDown:function(e){e.keyCode===B.a.ENTER&&e.preventDefault()},onKeyUp:function(t){var n=t.keyCode,r=e.onClick;n===B.a.ENTER&&r&&r()},style:c}))})),J=n(493),X=function(e){if("undefined"!==typeof window&&window.document&&window.document.documentElement){var t=Array.isArray(e)?e:[e],n=window.document.documentElement;return t.some((function(e){return e in n.style}))}return!1},G=(X(["flex","webkitFlex","Flex","msFlex"]),n(329)),Q=n(32),Y=n.n(Q),Z=n(1616),$=n.n(Z),ee=n(622),te=function(e){var t=e.prefixCls,n=e["aria-label"],r=e.className,a=e.style,o=e.direction,c=e.maxLength,u=e.autoSize,d=void 0===u||u,p=e.value,f=e.onSave,m=e.onCancel,v=i.useRef(),y=i.useRef(!1),h=i.useRef(),b=i.useState(p),g=Y()(b,2),x=g[0],E=g[1];i.useEffect((function(){E(p)}),[p]),i.useEffect((function(){if(v.current&&v.current.resizableTextArea){var e=v.current.resizableTextArea.textArea;e.focus();var t=e.value.length;e.setSelectionRange(t,t)}}),[v.current]);var C=function(){f(x.trim())},w=s()(t,"".concat(t,"-edit-content"),l()({},"".concat(t,"-rtl"),"rtl"===o),r);return i.createElement("div",{className:w,style:a},i.createElement(ee.a,{ref:v,maxLength:c,value:x,onChange:function(e){var t=e.target;E(t.value.replace(/[\n\r]/g,""))},onKeyDown:function(e){var t=e.keyCode;y.current||(h.current=t)},onKeyUp:function(e){var t=e.keyCode,n=e.ctrlKey,r=e.altKey,a=e.metaKey,o=e.shiftKey;h.current!==t||y.current||n||r||a||o||(t===B.a.ENTER?C():t===B.a.ESC&&m())},onCompositionStart:function(){y.current=!0},onCompositionEnd:function(){y.current=!1},onBlur:function(){C()},"aria-label":n,autoSize:d}),i.createElement($.a,{className:"".concat(t,"-edit-content-confirm")}))},ne=n(50),re={padding:0,margin:0,display:"inline",lineHeight:"inherit"};function ae(e){if(!e)return 0;var t=e.match(/^\d*(\.\d*)?/);return t?Number(t[0]):0}var oe=function(e,t,n,r,a){y||((y=document.createElement("div")).setAttribute("aria-hidden","true"),document.body.appendChild(y));var o,l=t.rows,c=t.suffix,s=void 0===c?"":c,u=window.getComputedStyle(e),d=(o=u,Array.prototype.slice.apply(o).map((function(e){return"".concat(e,": ").concat(o.getPropertyValue(e),";")})).join("")),p=ae(u.lineHeight),f=Math.round(p*(l+1)+ae(u.paddingTop)+ae(u.paddingBottom));y.setAttribute("style",d),y.style.position="fixed",y.style.left="0",y.style.height="auto",y.style.minHeight="auto",y.style.maxHeight="auto",y.style.top="-999999px",y.style.zIndex="-1000",y.style.textOverflow="clip",y.style.whiteSpace="normal",y.style.webkitLineClamp="none";var m=function(e){var t=[];return e.forEach((function(e){var n=t[t.length-1];"string"===typeof e&&"string"===typeof n?t[t.length-1]+=e:t.push(e)})),t}(Object(R.a)(n));function v(){return y.offsetHeight<f}if(Object(ne.render)(i.createElement("div",{style:re},i.createElement("span",{style:re},m,s),i.createElement("span",{style:re},r)),y),v())return Object(ne.unmountComponentAtNode)(y),{content:n,text:y.innerHTML,ellipsis:!1};var h=Array.prototype.slice.apply(y.childNodes[0].childNodes[0].cloneNode(!0).childNodes).filter((function(e){return 8!==e.nodeType})),b=Array.prototype.slice.apply(y.childNodes[0].childNodes[1].cloneNode(!0).childNodes);Object(ne.unmountComponentAtNode)(y);var g=[];y.innerHTML="";var x=document.createElement("span");y.appendChild(x);var E=document.createTextNode(a+s);function C(e){x.insertBefore(e,E)}function w(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t.length,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=Math.floor((n+r)/2),l=t.slice(0,o);if(e.textContent=l,n>=r-1)for(var i=r;i>=n;i-=1){var c=t.slice(0,i);if(e.textContent=c,v()||!c)return i===t.length?{finished:!1,reactNode:t}:{finished:!0,reactNode:c}}return v()?w(e,t,o,r,o):w(e,t,n,o,a)}function O(e,t){var n=e.nodeType;if(1===n)return C(e),v()?{finished:!1,reactNode:m[t]}:(x.removeChild(e),{finished:!0,reactNode:null});if(3===n){var r=e.textContent||"",a=document.createTextNode(r);return C(a),w(a,r)}return{finished:!1,reactNode:null}}return x.appendChild(E),b.forEach((function(e){y.appendChild(e)})),h.some((function(e,t){var n=O(e,t),r=n.finished,a=n.reactNode;return a&&g.push(a),r})),{content:g,text:y.innerHTML,ellipsis:!0}},le=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},ie=X("webkitLineClamp"),ce=X("textOverflow");var se=function(e){S()(n,e);var t=P()(n);function n(){var e;return w()(this,n),(e=t.apply(this,arguments)).contentRef=i.createRef(),e.state={edit:!1,copied:!1,ellipsisText:"",ellipsisContent:null,isEllipsis:!1,expanded:!1,clientRendered:!1},e.getPrefixCls=function(){var t=e.props.prefixCls;return(0,e.context.getPrefixCls)("typography",t)},e.onExpandClick=function(t){var n=e.getEllipsis().onExpand;e.setState({expanded:!0}),n&&n(t)},e.onEditClick=function(){e.triggerEdit(!0)},e.onEditChange=function(t){var n=e.getEditable().onChange;n&&n(t),e.triggerEdit(!1)},e.onEditCancel=function(){e.triggerEdit(!1)},e.onCopyClick=function(t){t.preventDefault();var n=e.props,r=n.children,o=n.copyable,l=a()({},"object"===g()(o)?o:null);void 0===l.text&&(l.text=String(r)),z()(l.text||""),e.setState({copied:!0},(function(){l.onCopy&&l.onCopy(),e.copyId=window.setTimeout((function(){e.setState({copied:!1})}),3e3)}))},e.setEditRef=function(t){e.editIcon=t},e.triggerEdit=function(t){var n=e.getEditable().onStart;t&&n&&n(),e.setState({edit:t},(function(){!t&&e.editIcon&&e.editIcon.focus()}))},e.resizeOnNextFrame=function(){J.a.cancel(e.rafId),e.rafId=Object(J.a)((function(){e.syncEllipsis()}))},e}return N()(n,[{key:"componentDidMount",value:function(){this.setState({clientRendered:!0}),this.resizeOnNextFrame()}},{key:"componentDidUpdate",value:function(e){var t=this.props.children,n=this.getEllipsis(),r=this.getEllipsis(e);t===e.children&&n.rows===r.rows||this.resizeOnNextFrame()}},{key:"componentWillUnmount",value:function(){window.clearTimeout(this.copyId),J.a.cancel(this.rafId)}},{key:"getEditable",value:function(e){var t=this.state.edit,n=(e||this.props).editable;return n?a()({editing:t},"object"===g()(n)?n:null):{editing:t}}},{key:"getEllipsis",value:function(e){var t=(e||this.props).ellipsis;return t?a()({rows:1,expandable:!1},"object"===g()(t)?t:null):{}}},{key:"canUseCSSEllipsis",value:function(){var e=this.state.clientRendered,t=this.props,n=t.editable,r=t.copyable,a=this.getEllipsis(),o=a.rows,l=a.expandable,i=a.suffix,c=a.onEllipsis;return!i&&(!(n||r||l||!e||c)&&(1===o?ce:ie))}},{key:"syncEllipsis",value:function(){var e=this.state,t=e.ellipsisText,n=e.isEllipsis,r=e.expanded,a=this.getEllipsis(),o=a.rows,l=a.suffix,i=a.onEllipsis,c=this.props.children;if(o&&!(o<0)&&this.contentRef.current&&!r&&!this.canUseCSSEllipsis()){Object(p.a)(Object(R.a)(c).every((function(e){return"string"===typeof e})),"Typography","`ellipsis` should use string as children only.");var s=oe(this.contentRef.current,{rows:o,suffix:l},c,this.renderOperations(!0),"..."),u=s.content,d=s.text,f=s.ellipsis;t===d&&n===f||(this.setState({ellipsisText:d,ellipsisContent:u,isEllipsis:f}),n!==f&&i&&i(f))}}},{key:"renderExpand",value:function(e){var t,n=this.getEllipsis(),r=n.expandable,a=n.symbol,o=this.state,l=o.expanded,c=o.isEllipsis;return r&&(e||!l&&c)?(t=a||this.expandStr,i.createElement("a",{key:"expand",className:"".concat(this.getPrefixCls(),"-expand"),onClick:this.onExpandClick,"aria-label":this.expandStr},t)):null}},{key:"renderEdit",value:function(){var e=this.props.editable;if(e){var t=e.icon,n=e.tooltip,r=Object(R.a)(n)[0]||this.editStr,a="string"===typeof r?r:"";return i.createElement(G.a,{key:"edit",title:!1===n?"":r},i.createElement(W,{ref:this.setEditRef,className:"".concat(this.getPrefixCls(),"-edit"),onClick:this.onEditClick,"aria-label":a},t||i.createElement(D.a,{role:"button"})))}}},{key:"renderCopy",value:function(){var e=this.state.copied,t=this.props.copyable;if(t){var n=this.getPrefixCls(),r=t.tooltips,a=Object(R.a)(r);0===a.length&&(a=[this.copyStr,this.copiedStr]);var o=e?a[1]:a[0],l="string"===typeof o?o:"",c=Object(R.a)(t.icon);return i.createElement(G.a,{key:"copy",title:!1===r?"":o},i.createElement(W,{className:s()("".concat(n,"-copy"),e&&"".concat(n,"-copy-success")),onClick:this.onCopyClick,"aria-label":l},e?c[1]||i.createElement(A.a,null):c[0]||i.createElement(H.a,null)))}}},{key:"renderEditInput",value:function(){var e=this.props,t=e.children,n=e.className,r=e.style,a=this.context.direction,o=this.getEditable(),l=o.maxLength,c=o.autoSize;return i.createElement(te,{value:"string"===typeof t?t:"",onSave:this.onEditChange,onCancel:this.onEditCancel,prefixCls:this.getPrefixCls(),className:n,style:r,direction:a,maxLength:l,autoSize:c})}},{key:"renderOperations",value:function(e){return[this.renderExpand(e),this.renderEdit(),this.renderCopy()].filter((function(e){return e}))}},{key:"renderContent",value:function(){var e=this,t=this.state,n=t.ellipsisContent,r=t.isEllipsis,o=t.expanded,c=this.props,u=c.component,d=c.children,p=c.className,f=c.type,m=c.disabled,v=c.style,y=le(c,["component","children","className","type","disabled","style"]),b=this.context.direction,g=this.getEllipsis(),x=g.rows,C=g.suffix,w=this.getPrefixCls(),O=Object(M.a)(y,["prefixCls","editable","copyable","ellipsis","mark","code","delete","underline","strong","keyboard"].concat(E()(q.a))),N=this.canUseCSSEllipsis(),j=1===x&&N,S=x&&x>1&&N,k=d;if(x&&r&&!o&&!N){var P=y.title,R=P||"";P||"string"!==typeof d&&"number"!==typeof d||(R=String(d)),R=null===R||void 0===R?void 0:R.slice(String(n||"").length),k=i.createElement(i.Fragment,null,n,i.createElement("span",{title:R,"aria-hidden":"true"},"..."),C)}else k=i.createElement(i.Fragment,null,d,C);return k=function(e,t){var n=e.mark,r=e.code,a=e.underline,o=e.delete,l=e.strong,c=e.keyboard,s=t;function u(e,t){e&&(s=i.createElement(t,{},s))}return u(l,"strong"),u(a,"u"),u(o,"del"),u(r,"code"),u(n,"mark"),u(c,"kbd"),s}(this.props,k),i.createElement(F.a,{componentName:"Text"},(function(t){var n,r=t.edit,o=t.copy,c=t.copied,d=t.expand;return e.editStr=r,e.copyStr=o,e.copiedStr=c,e.expandStr=d,i.createElement(U.a,{onResize:e.resizeOnNextFrame,disabled:!x},i.createElement(h,a()({className:s()((n={},l()(n,"".concat(w,"-").concat(f),f),l()(n,"".concat(w,"-disabled"),m),l()(n,"".concat(w,"-ellipsis"),x),l()(n,"".concat(w,"-ellipsis-single-line"),j),l()(n,"".concat(w,"-ellipsis-multiple-line"),S),n),p),style:a()(a()({},v),{WebkitLineClamp:S?x:null}),component:u,ref:e.contentRef,direction:b},O),k,e.renderOperations()))}))}},{key:"render",value:function(){return this.getEditable().editing?this.renderEditInput():this.renderContent()}}],[{key:"getDerivedStateFromProps",value:function(e){var t=e.children,n=e.editable;return Object(p.a)(!n||"string"===typeof t,"Typography","When `editable` is enabled, the `children` should use string."),{}}}]),n}(i.Component);se.contextType=d.b,se.defaultProps={children:""};var ue=se,de=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},pe=function(e){var t=e.ellipsis,n=de(e,["ellipsis"]);return Object(p.a)("object"!==g()(t),"Typography.Text","`ellipsis` only supports boolean value."),i.createElement(ue,a()({},n,{ellipsis:!!t,component:"span"}))},fe=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},me=function(e,t){var n=e.ellipsis,r=e.rel,o=fe(e,["ellipsis","rel"]);Object(p.a)("object"!==g()(n),"Typography.Link","`ellipsis` only supports boolean value.");var l=i.useRef(null);i.useImperativeHandle(t,(function(){var e;return null===(e=l.current)||void 0===e?void 0:e.contentRef.current}));var c=a()(a()({},o),{rel:void 0===r&&"_blank"===o.target?"noopener noreferrer":r});return delete c.navigate,i.createElement(ue,a()({},c,{ref:l,ellipsis:!!n,component:"a"}))},ve=i.forwardRef(me),ye=n(104),he=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},be=Object(ye.b)(1,2,3,4,5),ge=function(e){var t,n=e.level,r=void 0===n?1:n,o=he(e,["level"]);return-1!==be.indexOf(r)?t="h".concat(r):(Object(p.a)(!1,"Typography.Title","Title only accept `1 | 2 | 3 | 4 | 5` as `level` value. And `5` need 4.6.0+ version."),t="h1"),i.createElement(ue,a()({},o,{component:t}))},xe=function(e){return i.createElement(ue,a()({},e,{component:"div"}))},Ee=h;Ee.Text=pe,Ee.Link=ve,Ee.Title=ge,Ee.Paragraph=xe;t.a=Ee},1639:function(e,t,n){"use strict";var r=n(6),a=n.n(r),o=n(8),l=n.n(o),i=n(88),c=n.n(i),s=n(1),u=n(9),d=n.n(u),p=function(e){var t=e.prefixCls,n=e.className,r=e.width,a=e.style;return s.createElement("h3",{className:d()(t,n),style:l()({width:r},a)})},f=n(115),m=n.n(f),v=function(e){var t=function(t){var n=e.width,r=e.rows,a=void 0===r?2:r;return Array.isArray(n)?n[t]:a-1===t?n:void 0},n=e.prefixCls,r=e.className,a=e.style,o=e.rows,l=m()(Array(o)).map((function(e,n){return s.createElement("li",{key:n,style:{width:t(n)}})}));return s.createElement("ul",{className:d()(n,r),style:a},l)},y=n(127),h=function(e){var t,n,r=e.prefixCls,o=e.className,i=e.style,c=e.size,u=e.shape,p=d()((t={},a()(t,"".concat(r,"-lg"),"large"===c),a()(t,"".concat(r,"-sm"),"small"===c),t)),f=d()((n={},a()(n,"".concat(r,"-circle"),"circle"===u),a()(n,"".concat(r,"-square"),"square"===u),a()(n,"".concat(r,"-round"),"round"===u),n)),m="number"===typeof c?{width:c,height:c,lineHeight:"".concat(c,"px")}:{};return s.createElement("span",{className:d()(r,p,f,o),style:l()(l()({},m),i)})},b=n(49),g=function(e){var t=function(t){var n=t.getPrefixCls,r=e.prefixCls,o=e.className,i=e.active,c=n("skeleton",r),u=Object(b.a)(e,["prefixCls"]),p=d()(c,"".concat(c,"-element"),a()({},"".concat(c,"-active"),i),o);return s.createElement("div",{className:p},s.createElement(h,l()({prefixCls:"".concat(c,"-avatar")},u)))};return s.createElement(y.a,null,t)};g.defaultProps={size:"default",shape:"circle"};var x=g,E=function(e){var t=function(t){var n=t.getPrefixCls,r=e.prefixCls,o=e.className,i=e.active,c=n("skeleton",r),u=Object(b.a)(e,["prefixCls"]),p=d()(c,"".concat(c,"-element"),a()({},"".concat(c,"-active"),i),o);return s.createElement("div",{className:p},s.createElement(h,l()({prefixCls:"".concat(c,"-button")},u)))};return s.createElement(y.a,null,t)};E.defaultProps={size:"default"};var C=E,w=function(e){var t=function(t){var n=t.getPrefixCls,r=e.prefixCls,o=e.className,i=e.active,c=n("skeleton",r),u=Object(b.a)(e,["prefixCls"]),p=d()(c,"".concat(c,"-element"),a()({},"".concat(c,"-active"),i),o);return s.createElement("div",{className:p},s.createElement(h,l()({prefixCls:"".concat(c,"-input")},u)))};return s.createElement(y.a,null,t)};w.defaultProps={size:"default"};var O=w,N=function(e){var t=function(t){var n=t.getPrefixCls,r=e.prefixCls,a=e.className,o=e.style,l=n("skeleton",r),i=d()(l,"".concat(l,"-element"),a);return s.createElement("div",{className:i},s.createElement("div",{className:d()("".concat(l,"-image"),a),style:o},s.createElement("svg",{viewBox:"0 0 1098 1024",xmlns:"http://www.w3.org/2000/svg",className:"".concat(l,"-image-svg")},s.createElement("path",{d:"M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z",className:"".concat(l,"-image-path")}))))};return s.createElement(y.a,null,t)};function j(e){return e&&"object"===c()(e)?e:{}}var S=function(e){var t=function(t){var n=t.getPrefixCls,r=t.direction,o=e.prefixCls,i=e.loading,c=e.className,u=e.children,f=e.avatar,m=e.title,y=e.paragraph,b=e.active,g=e.round,x=n("skeleton",o);if(i||!("loading"in e)){var E,C,w,O=!!f,N=!!m,S=!!y;if(O){var k=l()(l()({prefixCls:"".concat(x,"-avatar")},function(e,t){return e&&!t?{size:"large",shape:"square"}:{size:"large",shape:"circle"}}(N,S)),j(f));C=s.createElement("div",{className:"".concat(x,"-header")},s.createElement(h,k))}if(N||S){var P,R;if(N){var T=l()(l()({prefixCls:"".concat(x,"-title")},function(e,t){return!e&&t?{width:"38%"}:e&&t?{width:"50%"}:{}}(O,S)),j(m));P=s.createElement(p,T)}if(S){var z=l()(l()({prefixCls:"".concat(x,"-paragraph")},function(e,t){var n={};return e&&t||(n.width="61%"),n.rows=!e&&t?3:2,n}(O,N)),j(y));R=s.createElement(v,z)}w=s.createElement("div",{className:"".concat(x,"-content")},P,R)}var M=d()(x,(E={},a()(E,"".concat(x,"-with-avatar"),O),a()(E,"".concat(x,"-active"),b),a()(E,"".concat(x,"-rtl"),"rtl"===r),a()(E,"".concat(x,"-round"),g),E),c);return s.createElement("div",{className:M},C,w)}return u};return s.createElement(y.a,null,t)};S.defaultProps={avatar:!1,title:!0,paragraph:!0},S.Button=C,S.Avatar=x,S.Input=O,S.Image=N;var k=S;t.a=k},1641:function(e,t,n){"use strict";var r=n(6),a=n.n(r),o=n(32),l=n.n(o),i=n(88),c=n.n(i),s=n(1),u=n(9),d=n.n(u),p=n(157),f=n(283),m=n(48),v=n(127),y=n(8),h=n.n(y);function b(e){return void 0!==e&&null!==e}var g=function(e){var t,n=e.itemPrefixCls,r=e.component,o=e.span,l=e.className,i=e.style,c=e.labelStyle,u=e.contentStyle,p=e.bordered,f=e.label,m=e.content,v=e.colon,y=r;return p?s.createElement(y,{className:d()((t={},a()(t,"".concat(n,"-item-label"),b(f)),a()(t,"".concat(n,"-item-content"),b(m)),t),l),style:i,colSpan:o},b(f)?f:m):s.createElement(y,{className:d()("".concat(n,"-item"),l),style:i,colSpan:o},s.createElement("div",{className:"".concat(n,"-item-container")},f&&s.createElement("span",{className:d()("".concat(n,"-item-label"),a()({},"".concat(n,"-item-no-colon"),!v)),style:c},f),m&&s.createElement("span",{className:d()("".concat(n,"-item-content")),style:u},m)))};function x(e,t,n){var r=t.colon,a=t.prefixCls,o=t.bordered,l=n.component,i=n.type,c=n.showLabel,u=n.showContent;return e.map((function(e,t){var n=e.props,d=n.label,p=n.children,f=n.prefixCls,m=void 0===f?a:f,v=n.className,y=n.style,b=n.labelStyle,x=n.contentStyle,E=n.span,C=void 0===E?1:E,w=e.key;return"string"===typeof l?s.createElement(g,{key:"".concat(i,"-").concat(w||t),className:v,style:y,labelStyle:b,contentStyle:x,span:C,colon:r,component:l,itemPrefixCls:m,bordered:o,label:c?d:null,content:u?p:null}):[s.createElement(g,{key:"label-".concat(w||t),className:v,style:h()(h()({},y),b),span:1,colon:r,component:l[0],itemPrefixCls:m,bordered:o,label:d}),s.createElement(g,{key:"content-".concat(w||t),className:v,style:h()(h()({},y),x),span:2*C-1,component:l[1],itemPrefixCls:m,bordered:o,content:p})]}))}var E=function(e){var t=e.prefixCls,n=e.vertical,r=e.row,a=e.index,o=e.bordered;return n?s.createElement(s.Fragment,null,s.createElement("tr",{key:"label-".concat(a),className:"".concat(t,"-row")},x(r,e,{component:"th",type:"label",showLabel:!0})),s.createElement("tr",{key:"content-".concat(a),className:"".concat(t,"-row")},x(r,e,{component:"td",type:"content",showContent:!0}))):s.createElement("tr",{key:a,className:"".concat(t,"-row")},x(r,e,{component:o?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0}))},C=function(e){return e.children},w=n(34),O={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function N(e,t,n){var r=e;return(void 0===t||t>n)&&(r=Object(w.a)(e,{span:n}),Object(m.a)(void 0===t,"Descriptions","Sum of column `span` in a line not match `column` of Descriptions.")),r}function j(e){var t,n=e.prefixCls,r=e.title,o=e.extra,i=e.column,u=void 0===i?O:i,m=e.colon,y=void 0===m||m,h=e.bordered,b=e.layout,g=e.children,x=e.className,C=e.style,w=e.size,j=s.useContext(v.b),S=j.getPrefixCls,k=j.direction,P=S("descriptions",n),R=s.useState({}),T=l()(R,2),z=T[0],M=T[1],_=function(e,t){if("number"===typeof e)return e;if("object"===c()(e))for(var n=0;n<f.b.length;n++){var r=f.b[n];if(t[r]&&void 0!==e[r])return e[r]||O[r]}return 3}(u,z);s.useEffect((function(){var e=f.a.subscribe((function(e){"object"===c()(u)&&M(e)}));return function(){f.a.unsubscribe(e)}}),[]);var D=function(e,t){var n=Object(p.a)(e).filter((function(e){return e})),r=[],a=[],o=t;return n.forEach((function(e,l){var i,c=null===(i=e.props)||void 0===i?void 0:i.span,s=c||1;if(l===n.length-1)return a.push(N(e,c,o)),void r.push(a);s<o?(o-=s,a.push(e)):(a.push(N(e,s,o)),r.push(a),o=t,a=[])})),r}(g,_);return s.createElement("div",{className:d()(P,(t={},a()(t,"".concat(P,"-").concat(w),w&&"default"!==w),a()(t,"".concat(P,"-bordered"),!!h),a()(t,"".concat(P,"-rtl"),"rtl"===k),t),x),style:C},(r||o)&&s.createElement("div",{className:"".concat(P,"-header")},r&&s.createElement("div",{className:"".concat(P,"-title")},r),o&&s.createElement("div",{className:"".concat(P,"-extra")},o)),s.createElement("div",{className:"".concat(P,"-view")},s.createElement("table",null,s.createElement("tbody",null,D.map((function(e,t){return s.createElement(E,{key:t,index:t,colon:y,prefixCls:P,vertical:"vertical"===b,bordered:h,row:e})}))))))}j.Item=C;t.a=j}}]);
//# sourceMappingURL=4.b3291353.chunk.js.map