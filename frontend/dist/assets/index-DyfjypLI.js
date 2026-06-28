var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=`modulepreload`,r=function(e){return`/`+e},i={},a=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(t.map(t=>{if(t=r(t,a),t in i)return;i[t]=!0;let o=t.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``;if(a)for(let n=e.length-1;n>=0;n--){let r=e[n];if(r.href===t&&(!o||r.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${s}`))return;let l=document.createElement(`link`);if(l.rel=o?`stylesheet`:n,o||(l.as=`script`),l.crossOrigin=``,l.href=t,c&&l.setAttribute(`nonce`,c),document.head.appendChild(l),o)return new Promise((e,n)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(let e of t||[])e.status===`rejected`&&s(e.reason);return e().catch(s)})},o=`tolongin_state`;function s(){try{let e=localStorage.getItem(o);if(e)return JSON.parse(e)}catch{}return{}}function c(e){let t=e.user,n={user:t?{id:t.id,name:t.name,email:t.email,phone:t.phone,role:t.role,avatar:typeof t.avatar==`string`&&!t.avatar.startsWith(`data:`)?t.avatar:null,verified:t.verified,emailVerified:t.emailVerified,phoneVerified:t.phoneVerified,ktpVerified:t.ktpVerified,bio:t.bio,city:t.city,rating:t.rating,reviewCount:t.reviewCount,completedOrders:t.completedOrders}:null,lang:e.lang,theme:e.theme};try{localStorage.setItem(o,JSON.stringify(n))}catch{try{localStorage.removeItem(o)}catch{}}}var l=s(),u={token:null,refreshToken:null,user:l.user||null,lang:l.lang||`id`,theme:l.theme||`light`},d=new Set,f={state:u,getState(){return this.state},setState(e){this.state={...this.state,...e},c(this.state),d.forEach(e=>e(this.state))},subscribe(e){return d.add(e),()=>d.delete(e)},async logout(){try{let{API:e}=await a(async()=>{let{API:e}=await Promise.resolve().then(()=>at);return{API:e}},void 0);await fetch(`${e}/auth/logout`,{method:`POST`,credentials:`include`,headers:this.state.token?{Authorization:`Bearer ${this.state.token}`}:{}})}catch{}this.setState({token:null,refreshToken:null,user:null})}};function p(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function m(e){if(Array.isArray(e))return e}function h(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t!==0)for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function g(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _(e,t){return m(e)||h(e,t)||ee(e,t)||g()}function ee(e,t){if(e){if(typeof e==`string`)return p(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}var te=Object.entries,v=Object.setPrototypeOf,y=Object.isFrozen,b=Object.getPrototypeOf,ne=Object.getOwnPropertyDescriptor,x=Object.freeze,S=Object.seal,re=Object.create,C=typeof Reflect<`u`&&Reflect,ie=C.apply,ae=C.construct;x||=function(e){return e},S||=function(e){return e},ie||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},ae||=function(e){return new e(...[...arguments].slice(1))};var oe=O(Array.prototype.forEach),se=O(Array.prototype.lastIndexOf),ce=O(Array.prototype.pop),le=O(Array.prototype.push),ue=O(Array.prototype.splice),w=Array.isArray,de=O(String.prototype.toLowerCase),fe=O(String.prototype.toString),pe=O(String.prototype.match),me=O(String.prototype.replace),he=O(String.prototype.indexOf),ge=O(String.prototype.trim),_e=O(Number.prototype.toString),ve=O(Boolean.prototype.toString),ye=typeof BigInt>`u`?null:O(BigInt.prototype.toString),be=typeof Symbol>`u`?null:O(Symbol.prototype.toString),T=O(Object.prototype.hasOwnProperty),E=O(Object.prototype.toString),D=O(RegExp.prototype.test),xe=Se(TypeError);function O(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return ie(e,t,n)}}function Se(e){return function(){return ae(e,[...arguments])}}function k(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:de;if(v&&v(e,null),!w(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(y(t)||(t[r]=e),i=e)}e[i]=!0}return e}function Ce(e){for(let t=0;t<e.length;t++)T(e,t)||(e[t]=null);return e}function A(e){let t=re(null);for(let r of te(e)){var n=_(r,2);let i=n[0],a=n[1];T(e,i)&&(w(a)?t[i]=Ce(a):a&&typeof a==`object`&&a.constructor===Object?t[i]=A(a):t[i]=a)}return t}function we(e){switch(typeof e){case`string`:return e;case`number`:return _e(e);case`boolean`:return ve(e);case`bigint`:return ye?ye(e):`0`;case`symbol`:return be?be(e):`Symbol()`;case`undefined`:return E(e);case`function`:case`object`:{if(e===null)return E(e);let t=e,n=Te(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:E(e)}return E(e)}default:return E(e)}}function Te(e,t){for(;e!==null;){let n=ne(e,t);if(n){if(n.get)return O(n.get);if(typeof n.value==`function`)return O(n.value)}e=b(e)}function n(){return null}return n}function Ee(e){try{return D(e,``),!0}catch{return!1}}var De=x(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),Oe=x(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),ke=x([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),Ae=x([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),je=x(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),Me=x([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),Ne=x([`#text`]),Pe=x(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),Fe=x(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-rendering.textlength.type.u1.u2.unicode.values.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),Ie=x(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),Le=x([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),Re=S(/{{[\w\W]*|^[\w\W]*}}/g),ze=S(/<%[\w\W]*|^[\w\W]*%>/g),Be=S(/\${[\w\W]*/g),Ve=S(/^data-[\-\w.\u00B7-\uFFFF]+$/),He=S(/^aria-[\-\w]+$/),Ue=S(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),We=S(/^(?:\w+script|data):/i),Ge=S(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ke=S(/^html$/i),qe=S(/^[a-z][.\w]*(-[.\w]+)+$/i),Je={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ye=function(){return typeof window>`u`?null:window},Xe=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},Ze=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Qe(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ye(),t=e=>Qe(e);if(t.version=`3.4.8`,t.removed=[],!e||!e.document||e.document.nodeType!==Je.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=Te(d,`cloneNode`),p=Te(d,`remove`),m=Te(d,`nextSibling`),h=Te(d,`childNodes`),g=Te(d,`parentNode`),_=Te(d,`shadowRoot`),ee=Te(d,`attributes`),v=o&&o.prototype?Te(o.prototype,`nodeType`):null,y=o&&o.prototype?Te(o.prototype,`nodeName`):null;if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let b,ne=``,S=0,C=function(e){if(S>0)throw xe(`The configured TRUSTED_TYPES_POLICY.createHTML must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose createHTML wraps DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`);S++;try{return b.createHTML(e)}finally{S--}},ie=n,ae=ie.implementation,_e=ie.createNodeIterator,ve=ie.createDocumentFragment,ye=ie.getElementsByTagName,be=r.importNode,E=Ze();t.isSupported=typeof te==`function`&&typeof g==`function`&&ae&&ae.createHTMLDocument!==void 0;let O=Re,Se=ze,Ce=Be,$e=Ve,et=He,j=We,tt=Ge,M=qe,nt=Ue,N=null,P=k({},[...De,...Oe,...ke,...je,...Ne]),F=null,rt=k({},[...Pe,...Fe,...Ie,...Le]),I=Object.seal(re(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),it=null,at=null,ot=Object.seal(re(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),st=!0,ct=!0,lt=!1,ut=!0,dt=!1,ft=!0,pt=!1,mt=!1,ht=!1,L=!1,R=!1,gt=!1,z=!0,B=!1,V=`user-content-`,H=!0,_t=!1,vt={},U=null,yt=k({},[`annotation-xml`,`audio`,`colgroup`,`desc`,`foreignobject`,`head`,`iframe`,`math`,`mi`,`mn`,`mo`,`ms`,`mtext`,`noembed`,`noframes`,`noscript`,`plaintext`,`script`,`style`,`svg`,`template`,`thead`,`title`,`video`,`xmp`]),bt=null,xt=k({},[`audio`,`video`,`img`,`source`,`image`,`track`]),St=null,Ct=k({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),wt=`http://www.w3.org/1998/Math/MathML`,Tt=`http://www.w3.org/2000/svg`,W=`http://www.w3.org/1999/xhtml`,Et=W,Dt=!1,Ot=null,kt=k({},[wt,Tt,W],fe),At=k({},[`mi`,`mo`,`mn`,`ms`,`mtext`]),jt=k({},[`annotation-xml`]),Mt=k({},[`title`,`style`,`font`,`a`,`script`]),Nt=null,Pt=[`application/xhtml+xml`,`text/html`],G=null,Ft=null,It=n.createElement(`form`),Lt=function(e){return e instanceof RegExp||e instanceof Function},Rt=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Ft&&Ft===e)return;(!e||typeof e!=`object`)&&(e={}),e=A(e),Nt=Pt.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,G=Nt===`application/xhtml+xml`?fe:de,N=T(e,`ALLOWED_TAGS`)&&w(e.ALLOWED_TAGS)?k({},e.ALLOWED_TAGS,G):P,F=T(e,`ALLOWED_ATTR`)&&w(e.ALLOWED_ATTR)?k({},e.ALLOWED_ATTR,G):rt,Ot=T(e,`ALLOWED_NAMESPACES`)&&w(e.ALLOWED_NAMESPACES)?k({},e.ALLOWED_NAMESPACES,fe):kt,St=T(e,`ADD_URI_SAFE_ATTR`)&&w(e.ADD_URI_SAFE_ATTR)?k(A(Ct),e.ADD_URI_SAFE_ATTR,G):Ct,bt=T(e,`ADD_DATA_URI_TAGS`)&&w(e.ADD_DATA_URI_TAGS)?k(A(xt),e.ADD_DATA_URI_TAGS,G):xt,U=T(e,`FORBID_CONTENTS`)&&w(e.FORBID_CONTENTS)?k({},e.FORBID_CONTENTS,G):yt,it=T(e,`FORBID_TAGS`)&&w(e.FORBID_TAGS)?k({},e.FORBID_TAGS,G):A({}),at=T(e,`FORBID_ATTR`)&&w(e.FORBID_ATTR)?k({},e.FORBID_ATTR,G):A({}),vt=T(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?A(e.USE_PROFILES):e.USE_PROFILES:!1,st=e.ALLOW_ARIA_ATTR!==!1,ct=e.ALLOW_DATA_ATTR!==!1,lt=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ut=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,dt=e.SAFE_FOR_TEMPLATES||!1,ft=e.SAFE_FOR_XML!==!1,pt=e.WHOLE_DOCUMENT||!1,L=e.RETURN_DOM||!1,R=e.RETURN_DOM_FRAGMENT||!1,gt=e.RETURN_TRUSTED_TYPE||!1,ht=e.FORCE_BODY||!1,z=e.SANITIZE_DOM!==!1,B=e.SANITIZE_NAMED_PROPS||!1,H=e.KEEP_CONTENT!==!1,_t=e.IN_PLACE||!1,nt=Ee(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Ue,Et=typeof e.NAMESPACE==`string`?e.NAMESPACE:W,At=T(e,`MATHML_TEXT_INTEGRATION_POINTS`)&&e.MATHML_TEXT_INTEGRATION_POINTS&&typeof e.MATHML_TEXT_INTEGRATION_POINTS==`object`?A(e.MATHML_TEXT_INTEGRATION_POINTS):k({},[`mi`,`mo`,`mn`,`ms`,`mtext`]),jt=T(e,`HTML_INTEGRATION_POINTS`)&&e.HTML_INTEGRATION_POINTS&&typeof e.HTML_INTEGRATION_POINTS==`object`?A(e.HTML_INTEGRATION_POINTS):k({},[`annotation-xml`]);let t=T(e,`CUSTOM_ELEMENT_HANDLING`)&&e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING==`object`?A(e.CUSTOM_ELEMENT_HANDLING):re(null);if(I=re(null),T(t,`tagNameCheck`)&&Lt(t.tagNameCheck)&&(I.tagNameCheck=t.tagNameCheck),T(t,`attributeNameCheck`)&&Lt(t.attributeNameCheck)&&(I.attributeNameCheck=t.attributeNameCheck),T(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(I.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),dt&&(ct=!1),R&&(L=!0),vt&&(N=k({},Ne),F=re(null),vt.html===!0&&(k(N,De),k(F,Pe)),vt.svg===!0&&(k(N,Oe),k(F,Fe),k(F,Le)),vt.svgFilters===!0&&(k(N,ke),k(F,Fe),k(F,Le)),vt.mathMl===!0&&(k(N,je),k(F,Ie),k(F,Le))),ot.tagCheck=null,ot.attributeCheck=null,T(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?ot.tagCheck=e.ADD_TAGS:w(e.ADD_TAGS)&&(N===P&&(N=A(N)),k(N,e.ADD_TAGS,G))),T(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?ot.attributeCheck=e.ADD_ATTR:w(e.ADD_ATTR)&&(F===rt&&(F=A(F)),k(F,e.ADD_ATTR,G))),T(e,`ADD_URI_SAFE_ATTR`)&&w(e.ADD_URI_SAFE_ATTR)&&k(St,e.ADD_URI_SAFE_ATTR,G),T(e,`FORBID_CONTENTS`)&&w(e.FORBID_CONTENTS)&&(U===yt&&(U=A(U)),k(U,e.FORBID_CONTENTS,G)),T(e,`ADD_FORBID_CONTENTS`)&&w(e.ADD_FORBID_CONTENTS)&&(U===yt&&(U=A(U)),k(U,e.ADD_FORBID_CONTENTS,G)),H&&(N[`#text`]=!0),pt&&k(N,[`html`,`head`,`body`]),N.table&&(k(N,[`tbody`]),delete it.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw xe(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw xe(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=b;b=e.TRUSTED_TYPES_POLICY;try{ne=C(``)}catch(e){throw b=t,e}}else b===void 0&&e.TRUSTED_TYPES_POLICY!==null&&(b=Xe(u,i)),b&&typeof ne==`string`&&(ne=C(``));(E.uponSanitizeElement.length>0||E.uponSanitizeAttribute.length>0)&&N===P&&(N=A(N)),E.uponSanitizeAttribute.length>0&&F===rt&&(F=A(F)),x&&x(e),Ft=e},zt=k({},[...Oe,...ke,...Ae]),Bt=k({},[...je,...Me]),Vt=function(e){let t=g(e);(!t||!t.tagName)&&(t={namespaceURI:Et,tagName:`template`});let n=de(e.tagName),r=de(t.tagName);return Ot[e.namespaceURI]?e.namespaceURI===Tt?t.namespaceURI===W?n===`svg`:t.namespaceURI===wt?n===`svg`&&(r===`annotation-xml`||At[r]):!!zt[n]:e.namespaceURI===wt?t.namespaceURI===W?n===`math`:t.namespaceURI===Tt?n===`math`&&jt[r]:!!Bt[n]:e.namespaceURI===W?t.namespaceURI===Tt&&!jt[r]||t.namespaceURI===wt&&!At[r]?!1:!Bt[n]&&(Mt[n]||!zt[n]):!!(Nt===`application/xhtml+xml`&&Ot[e.namespaceURI]):!1},Ht=function(e){le(t.removed,{element:e});try{g(e).removeChild(e)}catch{p(e)}},Ut=function(e,n){try{le(t.removed,{attribute:n.getAttributeNode(e),from:n})}catch{le(t.removed,{attribute:null,from:n})}if(n.removeAttribute(e),e===`is`)if(L||R)try{Ht(n)}catch{}else try{n.setAttribute(e,``)}catch{}},Wt=function(e){let t=null,r=null;if(ht)e=`<remove></remove>`+e;else{let t=pe(e,/^[\r\n\t ]+/);r=t&&t[0]}Nt===`application/xhtml+xml`&&Et===W&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=b?C(e):e;if(Et===W)try{t=new l().parseFromString(i,Nt)}catch{}if(!t||!t.documentElement){t=ae.createDocument(Et,`template`,null);try{t.documentElement.innerHTML=Dt?ne:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),Et===W?ye.call(t,pt?`html`:`body`)[0]:pt?t.documentElement:a},Gt=function(e){return _e.call(e.ownerDocument||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Kt=function(e){e.normalize();let t=_e.call(e.ownerDocument||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),n=t.nextNode();for(;n;){let e=n.data;oe([O,Se,Ce],t=>{e=me(e,t,` `)}),n.data=e,n=t.nextNode()}let r=e.querySelectorAll?.call(e,`template`)??[];oe(Array.from(r),e=>{Jt(e.content)&&Kt(e.content)})},qt=function(e){let t=y?y(e):null;return typeof t!=`string`||G(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==ee(e)||typeof e.removeAttribute!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==v(e)||e.childNodes!==h(e)},Jt=function(e){if(!v||typeof e!=`object`||!e)return!1;try{return v(e)===Je.documentFragment}catch{return!1}},Yt=function(e){if(!v||typeof e!=`object`||!e)return!1;try{return typeof v(e)==`number`}catch{return!1}};function K(e,n,r){oe(e,e=>{e.call(t,n,r,Ft)})}let Xt=function(e){let n=null;if(K(E.beforeSanitizeElements,e,null),qt(e))return Ht(e),!0;let r=G(y?y(e):e.nodeName);if(K(E.uponSanitizeElement,e,{tagName:r,allowedTags:N}),ft&&e.hasChildNodes()&&!Yt(e.firstElementChild)&&D(/<[/\w!]/g,e.innerHTML)&&D(/<[/\w!]/g,e.textContent)||ft&&e.namespaceURI===W&&r===`style`&&Yt(e.firstElementChild)||e.nodeType===Je.progressingInstruction||ft&&e.nodeType===Je.comment&&D(/<[/\w]/g,e.data))return Ht(e),!0;if(it[r]||!(ot.tagCheck instanceof Function&&ot.tagCheck(r))&&!N[r]){if(!it[r]&&$t(r)&&(I.tagNameCheck instanceof RegExp&&D(I.tagNameCheck,r)||I.tagNameCheck instanceof Function&&I.tagNameCheck(r)))return!1;if(H&&!U[r]){let t=g(e),n=h(e);if(n&&t){let r=n.length;for(let i=r-1;i>=0;--i){let r=f(n[i],!0);t.insertBefore(r,m(e))}}}return Ht(e),!0}return(v?v(e):e.nodeType)===Je.element&&!Vt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&D(/<\/no(script|embed|frames)/i,e.innerHTML)?(Ht(e),!0):(dt&&e.nodeType===Je.text&&(n=e.textContent,oe([O,Se,Ce],e=>{n=me(n,e,` `)}),e.textContent!==n&&(le(t.removed,{element:e.cloneNode()}),e.textContent=n)),K(E.afterSanitizeElements,e,null),!1)},Zt=function(e,t,r){if(at[t]||z&&(t===`id`||t===`name`)&&(r in n||r in It))return!1;let i=F[t]||ot.attributeCheck instanceof Function&&ot.attributeCheck(t,e);if(!(ct&&!at[t]&&D($e,t))&&!(st&&D(et,t))){if(!i||at[t]){if(!($t(e)&&(I.tagNameCheck instanceof RegExp&&D(I.tagNameCheck,e)||I.tagNameCheck instanceof Function&&I.tagNameCheck(e))&&(I.attributeNameCheck instanceof RegExp&&D(I.attributeNameCheck,t)||I.attributeNameCheck instanceof Function&&I.attributeNameCheck(t,e))||t===`is`&&I.allowCustomizedBuiltInElements&&(I.tagNameCheck instanceof RegExp&&D(I.tagNameCheck,r)||I.tagNameCheck instanceof Function&&I.tagNameCheck(r))))return!1}else if(!St[t]&&!D(nt,me(r,tt,``))&&!((t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&he(r,`data:`)===0&&bt[e])&&!(lt&&!D(j,me(r,tt,``)))&&r)return!1}return!0},Qt=k({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),$t=function(e){return!Qt[de(e)]&&D(M,e)},en=function(e){K(E.beforeSanitizeAttributes,e,null);let n=e.attributes;if(!n||qt(e))return;let r={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:F,forceKeepAttr:void 0},i=n.length;for(;i--;){let a=n[i],o=a.name,s=a.namespaceURI,c=a.value,l=G(o),d=c,f=o===`value`?d:ge(d);if(r.attrName=l,r.attrValue=f,r.keepAttr=!0,r.forceKeepAttr=void 0,K(E.uponSanitizeAttribute,e,r),f=r.attrValue,B&&(l===`id`||l===`name`)&&he(f,V)!==0&&(Ut(o,e),f=V+f),ft&&D(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,f)){Ut(o,e);continue}if(l===`attributename`&&pe(f,`href`)){Ut(o,e);continue}if(r.forceKeepAttr)continue;if(!r.keepAttr){Ut(o,e);continue}if(!ut&&D(/\/>/i,f)){Ut(o,e);continue}dt&&oe([O,Se,Ce],e=>{f=me(f,e,` `)});let p=G(e.nodeName);if(!Zt(p,l,f)){Ut(o,e);continue}if(b&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!s)switch(u.getAttributeType(p,l)){case`TrustedHTML`:f=C(f);break;case`TrustedScriptURL`:f=b.createScriptURL(f);break}if(f!==d)try{s?e.setAttributeNS(s,o,f):e.setAttribute(o,f),qt(e)?Ht(e):ce(t.removed)}catch{Ut(o,e)}}K(E.afterSanitizeAttributes,e,null)},tn=function(e){let t=null,n=Gt(e);for(K(E.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(K(E.uponSanitizeShadowNode,t,null),Xt(t),en(t),Jt(t.content)&&tn(t.content),(v?v(t):t.nodeType)===Je.element){let e=_?_(t):t.shadowRoot;Jt(e)&&(nn(e),tn(e))}K(E.afterSanitizeShadowDOM,e,null)},nn=function(e){let t=v?v(e):e.nodeType;if(t===Je.element){let t=_?_(e):e.shadowRoot;Jt(t)&&(nn(t),tn(t))}let n=h?h(e):e.childNodes;if(!n)return;let r=[];oe(n,e=>{le(r,e)});for(let e of r)nn(e);if(t===Je.element){let t=y?y(e):null;if(typeof t==`string`&&G(t)===`template`){let t=e.content;Jt(t)&&nn(t)}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(Dt=!e,Dt&&(e=`<!-->`),typeof e!=`string`&&!Yt(e)&&(e=we(e),typeof e!=`string`))throw xe(`dirty is not a string, aborting`);if(!t.isSupported)return e;if(mt||Rt(n),t.removed=[],typeof e==`string`&&(_t=!1),_t){let t=y?y(e):e.nodeName;if(typeof t==`string`){let e=G(t);if(!N[e]||it[e])throw xe(`root node is forbidden and cannot be sanitized in-place`)}if(qt(e))throw xe(`root node is clobbered and cannot be sanitized in-place`);nn(e)}else if(Yt(e))i=Wt(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===Je.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),nn(a);else{if(!L&&!dt&&!pt&&e.indexOf(`<`)===-1)return b&&gt?C(e):e;if(i=Wt(e),!i)return L?null:gt?ne:``}i&&ht&&Ht(i.firstChild);let c=Gt(_t?e:i);for(;o=c.nextNode();)Xt(o),en(o),Jt(o.content)&&tn(o.content);if(_t)return dt&&Kt(e),e;if(L){if(dt&&Kt(i),R)for(s=ve.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(F.shadowroot||F.shadowrootmode)&&(s=be.call(r,s,!0)),s}let l=pt?i.outerHTML:i.innerHTML;return pt&&N[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&D(Ke,i.ownerDocument.doctype.name)&&(l=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+l),dt&&oe([O,Se,Ce],e=>{l=me(l,e,` `)}),b&&gt?C(l):l},t.setConfig=function(){Rt(arguments.length>0&&arguments[0]!==void 0?arguments[0]:{}),mt=!0},t.clearConfig=function(){Ft=null,mt=!1},t.isValidAttribute=function(e,t,n){return Ft||Rt({}),Zt(G(e),G(t),n)},t.addHook=function(e,t){typeof t==`function`&&le(E[e],t)},t.removeHook=function(e,t){if(t!==void 0){let n=se(E[e],t);return n===-1?void 0:ue(E[e],n,1)[0]}return ce(E[e])},t.removeHooks=function(e){E[e]=[]},t.removeAllHooks=function(){E=Ze()},t}var $e=Qe();function et(e){return $e.sanitize(String(e??``),{ADD_ATTR:[`target`]})}function j(e){return`Rp `+(Number(e)||0).toLocaleString(`id-ID`)}function tt(e,t=!1){if(!e)return`-`;let n=new Date(e),r={year:`numeric`,month:`short`,day:`numeric`};return t&&(r.hour=`2-digit`,r.minute=`2-digit`),n.toLocaleDateString(`id-ID`,r)}function M(e){if(!e)return``;let t=new Date(e),n=Math.floor((Date.now()-t.getTime())/1e3);return n<60?`baru saja`:n<3600?`${Math.floor(n/60)} mnt lalu`:n<86400?`${Math.floor(n/3600)} jam lalu`:n<604800?`${Math.floor(n/86400)} hari lalu`:tt(e)}function nt(e){return e?new Date(e).toLocaleTimeString(`id-ID`,{hour:`2-digit`,minute:`2-digit`}):``}function N(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e||``)}function P(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function F(e,t=`info`,n=3e3){let r=document.getElementById(`toast-host`);if(!r)return;let i=document.createElement(`div`);i.className=`toast ${t}`;let a={success:`fa-circle-check`,error:`fa-circle-exclamation`,warning:`fa-triangle-exclamation`,info:`fa-circle-info`}[t]||`fa-circle-info`;typeof e==`object`&&e&&e.html?i.innerHTML=`<i class="fa-solid ${a}"></i><span>${et(e.html)}</span>`:i.innerHTML=`<i class="fa-solid ${a}"></i><span>${P(e)}</span>`,r.appendChild(i),setTimeout(()=>{i.style.transition=`all .3s`,i.style.opacity=`0`,i.style.transform=`translateX(120%)`,setTimeout(()=>i.remove(),300)},n)}window.addEventListener(`toast`,e=>{let t=e.detail||{};F(t.html?{html:t.html}:t.text,t.type,t.timeout||3e3)});function rt({title:e,body:t,footer:n,onClose:r,size:i}){let a=document.getElementById(`modal-host`),o=document.createElement(`div`);o.className=`modal-backdrop`,o.innerHTML=`
    <div class="modal" style="${i===`lg`?`max-width:680px`:``}" role="dialog" data-testid="modal">
      <div class="modal-head"><h3>${P(e||``)}</h3><button class="btn btn-ghost btn-sm" data-close data-testid="modal-close-btn"><i class="fa-solid fa-xmark"></i></button></div>
      <div class="modal-body"></div>
      ${n?`<div class="modal-foot"></div>`:``}
    </div>`;let s=()=>{o.remove(),r&&r()};o.addEventListener(`click`,e=>{(e.target===o||e.target.closest(`[data-close]`))&&s()});let c=o.querySelector(`.modal-body`);if(typeof t==`string`?c.innerHTML=et(t):t instanceof Node&&c.appendChild(t),n){let e=o.querySelector(`.modal-foot`);typeof n==`string`?e.innerHTML=et(n):n instanceof Node&&e.appendChild(n)}return a.appendChild(o),{close:s,el:o}}function I(e,t){let n=rt({title:`Konfirmasi`,body:`<p>${P(e)}</p>`,footer:`<button class="btn btn-secondary" data-close data-testid="confirm-cancel-btn">Batal</button><button class="btn btn-danger" data-testid="confirm-yes-btn" id="cf-yes">Ya, lanjutkan</button>`});n.el.querySelector(`#cf-yes`).addEventListener(`click`,()=>{n.close(),t&&t()})}function it(e,t=300){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}var at=t({API:()=>ct,api:()=>R,resolveAssetUrl:()=>lt});function ot(e){return!e||typeof e!=`string`?``:e.replace(/\/api\/?$/i,``).replace(/\/+$/,``)}var st=ot(`http://localhost:8001`),ct=st?`${st}/api`:`/api`;function lt(e){return!e||typeof e!=`string`?``:/^(https?:|data:|blob:)/i.test(e)?e:e.startsWith(`/api/`)||e.startsWith(`/uploads/`)?st+e:e}var ut=null;async function dt(){return ut||=fetch(`${ct}/auth/refresh`,{method:`POST`,credentials:`include`,headers:{"Content-Type":`application/json`},body:JSON.stringify({})}).then(async e=>{if(!e.ok)throw Error(`Refresh failed`);let t=await e.json();return f.setState({token:t.token,user:t.user||f.getState().user}),t.token}).finally(()=>{ut=null}),ut}var ft=e=>new Promise(t=>setTimeout(t,e)),pt=3,mt=[502,503,504];async function ht(e,{method:t=`GET`,body:n,auth:r=!0,token:i}={}){let a={},o=typeof FormData<`u`&&n instanceof FormData;if(!o&&n!==void 0&&(a[`Content-Type`]=`application/json`),r){let e=i||f.getState().token;e&&(a.Authorization=`Bearer ${e}`)}let s=`${ct}${e}`,c=t===`GET`,l=null;for(let e=0;e<=(c?pt:0);e++)try{let r=await fetch(s,{method:t,headers:a,credentials:`include`,body:o?n:n===void 0?void 0:JSON.stringify(n)});if(c&&mt.includes(r.status)&&e<pt){await ft(300*(e+1));continue}let i;return i=(r.headers.get(`content-type`)||``).includes(`application/json`)?await r.json():await r.text(),{ok:r.ok,status:r.status,data:i}}catch(t){if(l=t,c&&e<pt){await ft(300*(e+1));continue}throw t}throw l||Error(`Request gagal`)}async function L(e,t={}){let n=await ht(e,t),r=e.startsWith(`/auth/login`)||e.startsWith(`/auth/register`)||e.startsWith(`/auth/refresh`)||e.startsWith(`/auth/logout`);if(n.status===401&&t.auth!==!1&&!r&&f.getState().user)try{let r=await dt();n=await ht(e,{...t,token:r})}catch{f.setState({token:null,refreshToken:null,user:null})}if(!n.ok){let e=n.data,t=`Terjadi kesalahan`;e&&(typeof e==`string`?t=e:Array.isArray(e.message)?t=e.message.join(`, `):e.message?t=e.message:e.detail?t=e.detail:e.error&&(t=e.error));let r=Error(typeof t==`string`?t:JSON.stringify(t));throw r.status=n.status,r.data=e,r}return n.data}var R={get:e=>L(e),post:(e,t,n={})=>L(e,{...n,method:`POST`,body:t}),put:(e,t,n={})=>L(e,{...n,method:`PUT`,body:t}),patch:(e,t,n={})=>L(e,{...n,method:`PATCH`,body:t}),del:(e,t={})=>L(e,{...t,method:`DELETE`}),upload:(e,t,n={})=>L(e,{...n,method:`POST`,body:t})},gt={id:{"nav.home":`Beranda`,"nav.marketplace":`Cari Jasa`,"nav.jobs":`Cari Kerja`,"nav.orders":`Pesanan`,"nav.chat":`Chat`,"nav.dashboard":`Dashboard`,"nav.login":`Masuk`,"nav.register":`Daftar`,"nav.logout":`Keluar`,"nav.profile":`Profil`,"nav.settings":`Pengaturan`,"nav.admin":`Admin`,"common.save":`Simpan`,"common.cancel":`Batal`,"common.submit":`Kirim`,"common.search":`Cari`,"common.loading":`Memuat...`,"common.empty":`Belum ada data`,"common.back":`Kembali`,"common.edit":`Edit`,"common.delete":`Hapus`,"common.view":`Lihat`,"hero.tag":`Marketplace Jasa #1 di Indonesia`,"hero.title":`Cari jasa atau pekerjaan, semua bisa di`,"hero.lead":`Platform terpercaya yang menghubungkan freelancer profesional dengan klien di seluruh Indonesia. Mulai dari desain, web, les privat hingga marketing.`,"hero.cta1":`Cari Jasa`,"hero.cta2":`Daftar Jadi Penjual`,"sec.cats":`Jelajahi Kategori`,"sec.cats.sub":`Temukan jasa terbaik dari ribuan freelancer terverifikasi`,"sec.how":`Cara Kerja`,"sec.how.sub":`Hanya 4 langkah mudah untuk mulai`,"sec.featured":`Jasa Pilihan`,"sec.featured.sub":`Layanan terlaris yang dipercaya banyak klien`,"sec.testi":`Apa Kata Mereka`,"sec.testi.sub":`Cerita sukses dari pengguna Tolongin`,"sdg.title":`Mendukung SDGs Indonesia`,"sdg.sub":`Tolongin berkomitmen mendukung tujuan pembangunan berkelanjutan dengan menciptakan lapangan kerja digital yang inklusif untuk semua.`,"footer.tag":`Marketplace jasa & pekerjaan terpercaya untuk semua kebutuhan Anda.`},en:{"nav.home":`Home`,"nav.marketplace":`Cari Jasa`,"nav.jobs":`Find Work`,"nav.orders":`Orders`,"nav.chat":`Chat`,"nav.dashboard":`Dashboard`,"nav.login":`Sign In`,"nav.register":`Sign Up`,"nav.logout":`Logout`,"nav.profile":`Profile`,"nav.settings":`Settings`,"nav.admin":`Admin`,"common.save":`Save`,"common.cancel":`Cancel`,"common.submit":`Submit`,"common.search":`Search`,"common.loading":`Loading...`,"common.empty":`No data yet`,"common.back":`Back`,"common.edit":`Edit`,"common.delete":`Delete`,"common.view":`View`,"hero.tag":`#1 Services Marketplace in Indonesia`,"hero.title":`Find services or jobs, all on`,"hero.lead":`Trusted platform connecting professional freelancers with clients across Indonesia. From design, web, tutoring to marketing.`,"hero.cta1":`Browse Services`,"hero.cta2":`Become a Seller`,"sec.cats":`Explore Categories`,"sec.cats.sub":`Find the best services from thousands of verified freelancers`,"sec.how":`How it Works`,"sec.how.sub":`Just 4 easy steps to get started`,"sec.featured":`Featured Services`,"sec.featured.sub":`Bestsellers trusted by many clients`,"sec.testi":`Testimonials`,"sec.testi.sub":`Success stories from Tolongin users`,"sdg.title":`Supporting Indonesia SDGs`,"sdg.sub":`Tolongin is committed to supporting sustainable development goals by creating inclusive digital jobs for all.`,"footer.tag":`Trusted services & jobs marketplace for all your needs.`}};function z(e){let t=f.getState().lang||`id`;return gt[t]&&gt[t][e]||gt.id[e]||e}function B(e,t,n=`fa-folder-open`,r){return`<div class="empty" data-testid="empty-state">
    <i class="fa-solid ${n}"></i>
    <h3>${P(e)}</h3>
    <p>${P(t||``)}</p>
    ${r||``}
  </div>`}function V(e,t=``){let n=e||{name:`User`},r=t===`sm`?`avatar avatar-sm`:t===`lg`?`avatar avatar-lg`:t===`xl`?`avatar avatar-xl`:`avatar`,i=n.name||`User`;if(!(typeof n.avatar==`string`&&n.avatar.trim()&&![`null`,`undefined`].includes(n.avatar.trim()))){let e=i.split(/\s+/).slice(0,2).map(e=>e[0]||``).join(``).toUpperCase();return`<span class="`+r+` avatar-placeholder" role="img" aria-label="`+P(i)+`">`+P(e||`U`)+`</span>`}return`<img class="`+r+`" src="`+P(lt(n.avatar.trim()))+`" alt="`+P(i)+`" loading="lazy" />`}function H(e){e||=`unknown`;let t={OPEN:`status-open`,IN_PROGRESS:`status-in_progress`,COMPLETED:`status-completed`,CANCELLED:`status-cancelled`,PENDING:`status-pending`,ACCEPTED:`status-accepted`,REJECTED:`status-rejected`,RESOLVED:`status-resolved`,WAITING_CONFIRMATION:`status-pending`,PAID:`status-accepted`,WAITING_REVIEW:`status-in_progress`,IN_REVIEW:`status-in_progress`,REVISION_REQUESTED:`status-pending`,DISPUTED:`status-rejected`},n={OPEN:`Dibuka`,IN_PROGRESS:`Dikerjakan`,COMPLETED:`Selesai`,CANCELLED:`Dibatalkan`,PENDING:`Menunggu`,ACCEPTED:`Diterima`,REJECTED:`Ditolak`,RESOLVED:`Selesai`,WAITING_CONFIRMATION:`Menunggu Pembayaran`,PAID:`Dibayar · Escrow Aktif`,WAITING_REVIEW:`Menunggu Review`,IN_REVIEW:`Ditinjau`,REVISION_REQUESTED:`Minta Revisi`,DISPUTED:`Sengketa`,CLOSED:`Ditutup`},r=String(e).toUpperCase();return`<span class="status-pill ${t[r]||`status-pending`}" data-testid="status-pill">${P(n[r]||String(e).replace(/_/g,` `).toLowerCase())}</span>`}function _t(e,t={}){if(!e)return``;let n=e.seller||{},r=``;if(e.images)try{let t=typeof e.images==`string`?JSON.parse(e.images):e.images;r=Array.isArray(t)&&t.length>0?t[0]:``}catch{r=``}if(!r||r===`null`||r===`undefined`){let t=(e.title||`Service`).slice(0,20);r=`https://placehold.co/600x400/0a66c2/ffffff?text=${encodeURIComponent(t)}`}let i=n.name||`Penjual`,a=n.verified===!0,o=n.id||e.sellerId||null,s=typeof e.rating==`number`&&!isNaN(e.rating)?e.rating:0,c=typeof e.reviewCount==`number`&&!isNaN(e.reviewCount)?e.reviewCount:0,l=typeof e.price==`number`&&!isNaN(e.price)?e.price:0,u=e.title||`Untitled`,d=e.id||`unknown`;return`<a class="service-card" href="#/services/${d}" data-testid="service-card-${d}">
    <div class="thumb">
      <img src="${r}" alt="${P(u)}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x400/0a66c2/ffffff?text=No+Image'" />
      <button class="fav-btn ${t.favorited?`active`:``}" data-fav="${d}" data-testid="fav-btn-${d}" aria-label="favorite">
        <i class="fa-${t.favorited?`solid`:`regular`} fa-heart"></i>
      </button>
    </div>
    <div class="body">
      <div class="seller">
        ${V(n,`sm`)}
        ${o?`<span class="seller-link" data-user-id="${o}" data-testid="seller-link-${o}" style="cursor:pointer;color:var(--text-2)">${P(i)}</span>`:`<span>${P(i)}</span>`}
        ${a?`<i class="fa-solid fa-circle-check" style="color:var(--primary)" title="Verified"></i>`:``}
      </div>
      <div class="title">${P(u)}</div>
      <div class="meta">
        <div class="rating"><i class="fa-solid fa-star" style="color:var(--warning)"></i> ${s.toFixed(1)} <span class="text-muted">(${c})</span></div>
        <div class="price">${j(l)}</div>
      </div>
    </div>
  </a>`}async function vt({mount:e}){e.innerHTML=`
    <section class="hero">
      <div class="container hero-inner">
        <div>
          <span class="hero-eyebrow"><i class="fa-solid fa-star"></i> Marketplace Jasa &amp; Lowongan #1 di Indonesia</span>
          <h1>Cari bantuan, tawarkan kemampuan — semua di <span class="accent">tolong<span class="brand-accent">in</span><span class="brand-dot" aria-hidden="true"></span></span></h1>
          <p class="lead">Satu akun, banyak kemungkinan. Temukan jasa terbaik, pasang lowongan, atau jual keahlian Anda dengan aman lewat sistem escrow.</p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-lg" href="#/marketplace" data-testid="hero-cta-marketplace"><i class="fa-solid fa-magnifying-glass"></i> Cari Jasa</a>
            <a class="btn btn-outline btn-lg" href="#/jobs" data-testid="hero-cta-jobs"><i class="fa-solid fa-briefcase"></i> Cari Kerja</a>
            <a class="btn btn-secondary btn-lg" href="#/dashboard/manage-services/new" data-testid="hero-cta-seller"><i class="fa-solid fa-rocket"></i> Tawarkan Jasa</a>
          </div>
          <div class="flex gap-md mt-3" style="align-items:center">
            <div style="display:flex">
              <span class="avatar avatar-sm avatar-placeholder" style="margin-left:-10px">AP</span>
              <span class="avatar avatar-sm avatar-placeholder" style="margin-left:-10px">CK</span>
              <span class="avatar avatar-sm avatar-placeholder" style="margin-left:-10px">MS</span>
            </div>
            <div class="text-sm"><strong>10,000+</strong> freelancer terpercaya</div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-img-wrap"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80" alt="hero" /></div>
          <div class="hero-card-float c1"><div class="ic"><i class="fa-solid fa-circle-check"></i></div><div><div style="font-weight:700;font-size:.85rem">Verified Sellers</div><div class="text-xs text-muted">100% terpercaya</div></div></div>
          <div class="hero-card-float c2"><div class="ic"><i class="fa-solid fa-shield-halved"></i></div><div><div style="font-weight:700;font-size:.85rem">Pembayaran Aman</div><div class="text-xs text-muted">Escrow protection</div></div></div>
          <div class="hero-card-float c3"><div class="ic"><i class="fa-solid fa-bolt"></i></div><div><div style="font-weight:700;font-size:.85rem">Cepat &amp; Mudah</div><div class="text-xs text-muted">24/7 support</div></div></div>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="stats-bar" data-testid="stats-bar">
        <div class="stat"><div class="stat-num">10K+</div><div class="stat-label">Freelancer Aktif</div></div>
        <div class="stat"><div class="stat-num">50K+</div><div class="stat-label">Pesanan Selesai</div></div>
        <div class="stat"><div class="stat-num">4.9★</div><div class="stat-label">Rating Rata-rata</div></div>
        <div class="stat"><div class="stat-num">34</div><div class="stat-label">Provinsi</div></div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="section-eyebrow">Kategori</span>
          <h2>${z(`sec.cats`)}</h2>
          <p>${z(`sec.cats.sub`)}</p>
        </div>
        <div class="cat-grid" id="cat-grid"></div>
      </div>
    </section>

    <section class="section" style="background:#fff">
      <div class="container">
        <div class="section-head">
          <span class="section-eyebrow">Mudah</span>
          <h2>${z(`sec.how`)}</h2>
          <p>${z(`sec.how.sub`)}</p>
        </div>
        <div class="steps">
          <div class="step"><h3>Satu Akun untuk Semua</h3><p>Daftar gratis, satu akun bisa cari jasa, cari kerja, dan menjual layanan.</p></div>
          <div class="step"><h3>Cari atau Posting</h3><p>Temukan jasa yang sesuai atau posting pekerjaan yang Anda butuhkan.</p></div>
          <div class="step"><h3>Berkolaborasi</h3><p>Chat langsung, sepakati detail, dan mulai kerjakan proyek.</p></div>
          <div class="step"><h3>Selesai &amp; Review</h3><p>Bayar setelah puas, beri rating dan review untuk freelancer.</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="section-eyebrow">Featured</span>
          <h2>${z(`sec.featured`)}</h2>
          <p>${z(`sec.featured.sub`)}</p>
        </div>
        <div class="grid grid-3" id="feat-services"></div>
        <div class="text-center mt-3"><a class="btn btn-outline" href="#/marketplace" data-testid="see-all-services">Lihat Semua Jasa <i class="fa-solid fa-arrow-right"></i></a></div>
      </div>
    </section>

    <section class="section" style="background:#fff">
      <div class="container">
        <div class="section-head">
          <span class="section-eyebrow">Testimoni</span>
          <h2>${z(`sec.testi`)}</h2>
          <p>${z(`sec.testi.sub`)}</p>
        </div>
        <div class="grid grid-3">
          ${[{name:`Rina Pratiwi`,role:`Owner Brand Fashion`,q:`Saya dapat designer logo yang amazing hanya dalam 3 hari. Tolongin benar-benar membantu bisnis saya naik level!`},{name:`Aditya Wirawan`,role:`Mahasiswa`,q:`Sebagai freelancer pemula, Tolongin memberikan saya kesempatan menambah penghasilan dengan klien-klien serius.`},{name:`Maya Sari`,role:`Founder Startup`,q:`Platformnya sangat user-friendly, pembayaran aman, dan kualitas freelancer di atas rata-rata. Sangat direkomendasikan!`}].map((e,t)=>`
            <div class="testimonial">
              <div class="stars">${`<i class="fa-solid fa-star"></i>`.repeat(5)}</div>
              <p class="quote">"${P(e.q)}"</p>
              <div class="who">
                ${V({name:e.name})}
                <div><div class="name">${e.name}</div><div class="role">${e.role}</div></div>
              </div>
            </div>`).join(``)}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="sdg">
          <div>
            <span class="section-eyebrow" style="color:#fff;opacity:.85">SDGs</span>
            <h2>${z(`sdg.title`)}</h2>
            <p>${z(`sdg.sub`)}</p>
            <div class="sdg-badges">
              <span class="sdg-badge">SDG 1 — No Poverty</span>
              <span class="sdg-badge">SDG 8 — Decent Work</span>
              <span class="sdg-badge">SDG 9 — Innovation</span>
              <span class="sdg-badge">SDG 10 — Reduced Inequalities</span>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600" style="border-radius:18px" alt="sdg"/>
        </div>
      </div>
    </section>
  `;try{let[e,t]=await Promise.all([R.get(`/categories`),R.get(`/services/featured`)]),n=Array.isArray(t)?t:t.data||[],r=document.getElementById(`cat-grid`);r&&(r.innerHTML=e.map(e=>`
        <a class="cat-card" href="#/marketplace?category=${encodeURIComponent(e.slug)}" data-testid="cat-${e.slug}">
          <div class="cat-icon"><i class="fa-solid ${(e.icon||`fa-folder`).startsWith(`fa-`)?e.icon:`fa-`+e.icon}"></i></div>
          <div class="cat-name">${e.name}</div>
        </a>`).join(``));let i=document.getElementById(`feat-services`);i&&(i.innerHTML=n.slice(0,6).map(e=>_t(e)).join(``))}catch{}}async function U({mount:e,query:t}){let n=f.getState().user;e.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Cari Jasa</h1>
          <p class="page-subtitle">Temukan jasa terbaik dari freelancer profesional</p>
        </div>
        ${n&&n.role!==`ADMIN`?`
          <a href="#/post-service" class="btn btn-primary" id="post-service-btn" data-testid="post-service-btn" style="display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-plus"></i> Posting Jasa
          </a>
        `:``}
      </div>
      <div class="filters" data-testid="filters-bar" style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between;">
        <div class="input-icon" style="flex: 1; min-width: 200px; max-width: 300px;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input class="input" id="q" placeholder="Cari jasa..." value="${P(t.q||``)}" data-testid="search-input" style="padding-left: 2.5rem; width: 100%;">
        </div>
        <select class="select" id="cat" data-testid="filter-category" style="width: 150px;">
          <option value="all">Semua Kategori</option>
        </select>
        <div class="price-filter" style="display: flex; align-items: center; gap: 8px;">
          <input class="input" id="min" type="number" placeholder="Min Rp" style="width: 100px;">
          <span class="text-muted">—</span>
          <input class="input" id="max" type="number" placeholder="Max Rp" style="width: 100px;">
        </div>
        <select class="select" id="min-rating" data-testid="filter-rating" style="width: 140px;">
          <option value="">Semua Rating</option>
          <option value="4.5">4.5★ ke atas</option>
          <option value="4">4★ ke atas</option>
          <option value="3">3★ ke atas</option>
        </select>
        <select class="select" id="delivery" data-testid="filter-delivery" style="width: 150px;">
          <option value="">Semua Pengerjaan</option>
          <option value="1">≤ 1 hari</option>
          <option value="3">≤ 3 hari</option>
          <option value="7">≤ 7 hari</option>
          <option value="14">≤ 14 hari</option>
        </select>
        <select class="select" id="sort-by" data-testid="filter-sort" style="width: 160px;">
          <option value="newest">Terbaru</option>
          <option value="rating_desc">Rating Tertinggi</option>
          <option value="price_asc">Harga Terendah</option>
          <option value="price_desc">Harga Tertinggi</option>
        </select>
        <button class="btn btn-secondary btn-sm" id="reset-filters" style="white-space: nowrap; padding: 8px 16px;">
          <i class="fa-solid fa-rotate-left"></i> Reset
        </button>
        <div id="results-count" class="text-sm text-muted" style="margin-left: auto; white-space: nowrap;"></div>
      </div>
      <div id="results" class="services-grid" data-testid="services-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 24px;"></div>
    </div>`;let r=document.getElementById(`post-service-btn`);r&&r.addEventListener(`click`,e=>{if(e.preventDefault(),!f.getState().user)return F(`Silakan login dulu`,`warning`),Q.navigate(`/login`);Q.navigate(`/post-service`)});let i=await R.get(`/categories`),a=document.getElementById(`cat`);a&&(a.innerHTML=`<option value="all">Semua Kategori</option>`+i.map(e=>`<option value="${e.slug}">${e.name}</option>`).join(``));let o=[];try{f.getState().token&&(o=(await R.get(`/favorites`)).map(e=>e.id))}catch(e){console.warn(`[marketplace] favorites load failed`,e)}let s=async()=>{let e=new URLSearchParams;e.set(`limit`,`100`);let t=document.getElementById(`q`)?.value.trim()||``,n=document.getElementById(`cat`)?.value||`all`,r=document.getElementById(`min`)?.value||``,a=document.getElementById(`max`)?.value||``;if(t&&e.set(`q`,t),n&&n!==`all`){let t=i.find(e=>e.slug===n);t&&e.set(`categoryId`,t.id)}r&&e.set(`minPrice`,r),a&&e.set(`maxPrice`,a);let s=document.getElementById(`min-rating`)?.value||``,c=document.getElementById(`delivery`)?.value||``,l=document.getElementById(`sort-by`)?.value||``;s&&e.set(`minRating`,s),c&&e.set(`maxDeliveryDays`,c),l&&e.set(`sortBy`,l);let u=document.getElementById(`results`);if(u){u.innerHTML=`<div class="spinner" style="grid-column:1/-1; text-align:center; padding:40px;"></div>`;try{let t=await R.get(`/services?`+e.toString()),n=Array.isArray(t)?t:t.data||[];if(!n.length){u.innerHTML=`<div class="empty" style="grid-column:1/-1; text-align:center; padding:40px;">
          <i class="fa-solid fa-search"></i>
          <h3>Tidak ada hasil</h3>
          <p>Coba kata kunci lain atau ubah filter</p>
        </div>`;let e=document.getElementById(`results-count`);e&&(e.textContent=`0 jasa ditemukan`);return}u.innerHTML=n.map(e=>{let t=e.rating||0,n=e.reviewCount||0,r=e.image||e.images&&e.images[0]||`https://placehold.co/400x300/0a66c2/ffffff?text=No+Image`,i=o.includes(e.id);return`
          <div class="service-card" data-service-id="${e.id}" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">
            <div class="service-image" style="height:160px; overflow:hidden;">
              <img src="${r}" alt="${P(e.title)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://placehold.co/400x300/0a66c2/ffffff?text=No+Image'">
            </div>
            <div class="service-content" style="padding:12px; position:relative;">
              <div class="seller-link" data-user-id="${e.sellerId}" style="cursor:pointer; font-size:12px; color:#0a66c2; margin-bottom:4px;">
                ${P(e.seller?.name||`Freelancer`)}
                ${e.seller?.verified?`<i class="fa-solid fa-circle-check" style="color:#0a66c2; font-size:10px;"></i>`:``}
              </div>
              <div class="title" style="font-weight:600; margin-bottom:8px;">${P(e.title)}</div>
              <div class="rating" style="font-size:12px; color:#f5b042; margin-bottom:8px;">
                ${`★`.repeat(Math.floor(t))}${`☆`.repeat(5-Math.floor(t))} (${n})
              </div>
              <div class="delivery" style="font-size:11px; color:#999; margin-bottom:8px;">
                <i class="fa-regular fa-clock"></i> ${e.deliveryTime||`Fleksibel`} hari
              </div>
              <div class="price" style="font-weight:700; color:#0a66c2; font-size:1.1rem;">${j(e.price)}</div>
              <button class="btn-fav" data-fav="${e.id}" style="position:absolute; top:8px; right:8px; background:white; border:none; border-radius:50%; width:32px; height:32px; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                <i class="fa-${i?`solid`:`regular`} fa-heart" style="color:${i?`#dc3545`:`#999`};"></i>
              </button>
            </div>
          </div>
        `}).join(``);let r=document.getElementById(`results-count`);r&&(r.textContent=`${n.length} jasa ditemukan`),u.querySelectorAll(`.service-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.seller-link`)||t.target.closest(`.btn-fav`))return;let n=e.dataset.serviceId;n&&Q.navigate(`/services/`+n)})}),u.querySelectorAll(`.seller-link`).forEach(e=>e.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation();let n=e.dataset.userId;n&&Q.navigate(`/users/`+n)})),u.querySelectorAll(`.btn-fav`).forEach(e=>e.addEventListener(`click`,async t=>{if(t.preventDefault(),t.stopPropagation(),!f.getState().token){F(`Login dulu untuk menyimpan favorit`,`warning`);return}let n=e.dataset.fav,r=e.querySelector(`i`),i=r.classList.contains(`fa-solid`);e.disabled=!0,e.style.opacity=`0.6`;try{let e=await R.post(`/favorites/`+n),t=!i;if(e.favorited===void 0?e.message?.toLowerCase().includes(`added`)?t=!0:e.message?.toLowerCase().includes(`removed`)&&(t=!1):t=e.favorited,t)r.classList.remove(`fa-regular`),r.classList.add(`fa-solid`),r.style.color=`#dc3545`,o.includes(n)||o.push(n),F(`❤️ Ditambahkan ke favorit`,`success`);else{r.classList.remove(`fa-solid`),r.classList.add(`fa-regular`),r.style.color=`#999`;let e=o.indexOf(n);e>-1&&o.splice(e,1),F(`💔 Dihapus dari favorit`,`success`)}}catch(e){F(e.message||`Gagal mengubah favorit`,`error`)}finally{e.disabled=!1,e.style.opacity=``}}))}catch(e){console.error(`Load error:`,e),u.innerHTML=`<div class="empty" style="grid-column:1/-1; text-align:center; padding:40px;">
        <i class="fa-solid fa-circle-exclamation"></i>
        <h3>Gagal memuat</h3>
        <p>${P(e.message)}</p>
        <button class="btn btn-primary mt-2" onclick="location.reload()">Coba Lagi</button>
      </div>`}}},c=it(s,300);[`q`,`min`,`max`].forEach(e=>{let t=document.getElementById(e);t&&t.addEventListener(`input`,c)}),[`cat`,`min-rating`,`delivery`,`sort-by`].forEach(e=>{document.getElementById(e)?.addEventListener(`change`,s)}),document.getElementById(`reset-filters`)?.addEventListener(`click`,()=>{let e=document.getElementById(`q`);e&&(e.value=``);let t=document.getElementById(`cat`);t&&(t.value=`all`),[`min`,`max`].forEach(e=>{let t=document.getElementById(e);t&&(t.value=``)});let n=document.getElementById(`min-rating`);n&&(n.value=``);let r=document.getElementById(`delivery`);r&&(r.value=``);let i=document.getElementById(`sort-by`);i&&(i.value=`newest`),s()}),s()}async function yt({mount:e,params:t}){e.innerHTML=`<div class="container page"><div class="spinner" style="text-align:center; padding:40px;"></div></div>`;try{let n=await R.get(`/services/`+t.id),r=f.getState().user,i=r&&n.sellerId===r.id,a=n.deliveryTime?`${n.deliveryTime} hari pengerjaan`:`Fleksibel`,o=n.rating||0,s=n.reviewCount||0;e.innerHTML=`
      <div class="container page" style="max-width:1200px; margin:0 auto; padding:20px;">
        <a href="#/marketplace" class="text-sm" data-testid="back-marketplace" style="display:inline-block; margin-bottom:20px; text-decoration:none; color:#0a66c2;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Cari Jasa
        </a>
        
        <div class="service-detail-shell">
          
          <!-- KOLOM KIRI: GAMBAR VERTIKAL -->
          <div class="service-detail-media">
            <img src="${n.image||n.images&&n.images[0]||`https://placehold.co/600x800/0a66c2/ffffff?text=No+Image`}" 
                 alt="${P(n.title)}" 
                 style="width:100%; height:100%; object-fit:cover; display:block;"
                 onerror="this.src='https://placehold.co/600x800/0a66c2/ffffff?text=No+Image'" />
          </div>
          
          <!-- KOLOM KANAN: KONTEN -->
          <div class="service-detail-content">
            
            <span class="badge" style="display:inline-block; background:#e8f0fe; color:#0a66c2; padding:4px 12px; border-radius:20px; font-size:12px; width:fit-content; margin-bottom:16px;">
              ${P(n.category?.name||n.category||`Umum`)}
            </span>
            
            <h1 style="margin:0 0 12px 0; font-size:1.8rem; line-height:1.3;">${P(n.title)}</h1>
            
            <div style="display:flex; flex-wrap:wrap; gap:20px; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #eee;">
              <span style="display:flex; align-items:center; gap:6px; font-size:14px;">
                <i class="fa-solid fa-star" style="color:#f5b042;"></i>
                <strong>${o.toFixed(1)}</strong>
                <span style="color:#666;">(${s} ulasan)</span>
              </span>
              <span style="display:flex; align-items:center; gap:6px; font-size:14px; color:#666;">
                <i class="fa-solid fa-location-dot"></i> ${P(n.city||`Remote`)}
              </span>
              <span style="display:flex; align-items:center; gap:6px; font-size:14px; color:#666;">
                <i class="fa-solid fa-clock"></i> ${P(a)}
              </span>
            </div>
            
            <div style="margin-bottom:24px;">
              <h3 style="font-size:1rem; margin:0 0 12px 0; color:#333;">Deskripsi</h3>
              <p style="font-size:0.95rem; line-height:1.6; color:#555; margin:0;">${P(n.description||`Tidak ada deskripsi`)}</p>
            </div>
            
            <div style="background:#f8f9fa; border-radius:12px; padding:16px; margin-bottom:24px;">
              <h3 style="font-size:0.8rem; margin:0 0 12px 0; color:#666;">TENTANG PENJUAL</h3>
              <div class="seller-link" data-user-id="${n.sellerId}" style="cursor:pointer; display:flex; align-items:center; gap:12px;">
                ${V(n.seller,``)}
                <div>
                  <div style="font-weight:700; display:flex; align-items:center; gap:6px;">
                    ${P(n.seller?.name||`Penjual`)}
                    ${n.seller?.verified?`<i class="fa-solid fa-circle-check" style="color:#0a66c2; font-size:14px;"></i>`:``}
                  </div>
                  <div style="font-size:0.8rem; color:#666;">⭐ ${(n.seller?.rating||0).toFixed(1)} (${n.seller?.reviewCount||0} ulasan)</div>
                </div>
              </div>
            </div>
            
            <div style="background:linear-gradient(135deg, #0a66c2 0%, #004182 100%); border-radius:12px; padding:20px; margin-bottom:16px; color:#fff;">
              <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
                <div>
                  <div style="font-size:12px; opacity:0.8;">Mulai dari harga ini</div>
                  <div style="font-size:2rem; font-weight:700;">${j(n.price||0)}</div>
                </div>
                ${!i&&r?`
                  <div style="display:flex; gap:12px;">
                    <button class="order-btn" id="order-btn" style="background:#fff; color:#0a66c2; border:none; padding:10px 20px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer;">
                      <i class="fa-solid fa-bag-shopping"></i> Pesan
                    </button>
                    <button class="chat-btn" id="chat-btn" style="background:transparent; color:#fff; border:1px solid #fff; padding:10px 20px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer;">
                      <i class="fa-solid fa-comment"></i> Chat
                    </button>
                  </div>
                `:i?`
                  <div style="background:rgba(255,255,255,0.2); padding:10px 20px; border-radius:8px;">Jasa Anda</div>
                `:`
                  <a href="#/login" style="background:#fff; color:#0a66c2; text-decoration:none; padding:10px 20px; border-radius:8px; font-size:14px; font-weight:600;">
                    Login
                  </a>
                `}
              </div>
            </div>
            
            <div style="text-align:center; font-size:11px; color:#999;">
              <i class="fa-solid fa-shield-halved"></i> Pembayaran aman dengan escrow protection
            </div>
            
            <div style="margin-top:24px;">
              <h3 style="font-size:1rem; margin:0 0 16px 0;">Ulasan (${s})</h3>
              <div id="reviews-list" style="max-height:300px; overflow-y:auto;"></div>
            </div>
          </div>
        </div>
      </div>
    `;try{let e=await R.get(`/reviews/service/${n.id}`),t=Array.isArray(e)?e:e?.data||[],r=document.getElementById(`reviews-list`);t&&t.length>0?r.innerHTML=t.map(e=>`
          <div style="padding:12px 0; border-bottom:1px solid #eee;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              ${V(e.reviewer||{name:`Pengguna`,avatar:e.buyerAvatar},`sm`)}
              <div>
                <div style="font-weight:600; font-size:0.85rem;">${P(e.reviewer?.name||e.buyerName||`User`)}</div>
                <div style="font-size:0.7rem; color:#f5b042;">${`★`.repeat(e.rating)}${`☆`.repeat(5-e.rating)}</div>
              </div>
              <div style="font-size:0.7rem; color:#999; margin-left:auto;">${M(e.createdAt)}</div>
            </div>
            <p style="font-size:0.85rem; color:#555; margin:0;">${P(e.comment||``)}</p>
          </div>
        `).join(``):r.innerHTML=`<div style="text-align:center; padding:30px; color:#999;">Belum ada ulasan</div>`}catch{let e=document.getElementById(`reviews-list`);e&&(e.innerHTML=`<div style="text-align:center; padding:30px; color:#999;">Belum ada ulasan</div>`)}let c=document.querySelector(`.seller-link`);c&&c.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),Q.navigate(`/users/`+n.sellerId)});let l=document.getElementById(`order-btn`);l&&l.addEventListener(`click`,async()=>{if(!r)return F(`Silakan login dulu`,`warning`),Q.navigate(`/login`);try{let e=await R.get(`/auth/me`);if(!e.emailVerified||!e.phoneVerified)return F(`Verifikasi email & nomor telepon dulu sebelum memesan`,`warning`,6e3),Q.navigate(`/verification`)}catch{}let e=Math.round((n.price||0)*.05),t=(n.price||0)+e,i=document.createElement(`div`);i.className=`modal-backdrop`,i.style.cssText=`position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;`,i.innerHTML=`
          <div style="background:white;border-radius:12px;max-width:500px;width:90%;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid #eee;">
              <h3 style="margin:0;">Konfirmasi Pesanan</h3>
              <button id="mc-close" style="background:none;border:none;font-size:24px;cursor:pointer;">✕</button>
            </div>
            <div style="padding:16px;">
              <div style="background:#f5f5f5;border-radius:10px;padding:1rem;margin-bottom:1rem">
                <strong>${P(n.title)}</strong>
                <div class="text-muted text-sm">oleh ${P(n.seller?.name||`Penjual`)}</div>
              </div>
              <textarea id="order-notes" rows="3" placeholder="Catatan untuk penjual (opsional)" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:8px;"></textarea>
              <div style="margin-top:16px;background:#f5f5f5;border-radius:10px;padding:1rem">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                  <span>Harga Jasa</span>
                  <span>${j(n.price)}</span>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                  <span>Biaya Layanan (5%)</span>
                  <span>${j(e)}</span>
                </div>
                <div style="border-top:1px solid #ddd;margin:8px 0;"></div>
                <div style="display:flex;justify-content:space-between;">
                  <strong>Total</strong>
                  <strong style="color:#0a66c2;">${j(t)}</strong>
                </div>
              </div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:12px;padding:16px;border-top:1px solid #eee;">
              <button id="mc-cancel" style="padding:8px 16px;background:#f0f0f0;border:none;border-radius:8px;cursor:pointer;">Batal</button>
              <button id="mc-confirm" style="padding:8px 16px;background:#0a66c2;color:#fff;border:none;border-radius:8px;cursor:pointer;">
                <i class="fa-solid fa-credit-card"></i> Lanjutkan
              </button>
            </div>
          </div>`,document.body.appendChild(i);let a=()=>i.remove();i.querySelector(`#mc-close`).addEventListener(`click`,a),i.querySelector(`#mc-cancel`).addEventListener(`click`,a),i.addEventListener(`click`,e=>{e.target===i&&a()}),i.querySelector(`#mc-confirm`).addEventListener(`click`,async()=>{let e=document.getElementById(`order-notes`)?.value||``,t=i.querySelector(`#mc-confirm`);t.disabled=!0,t.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Memproses...`;try{let t=await R.post(`/orders`,{serviceId:n.id,note:e});a(),F(`Pesanan dibuat! Silakan bayar.`,`success`),Q.navigate(`/orders/`+t.id)}catch(e){F(e.message,`error`),t.disabled=!1,t.innerHTML=`<i class="fa-solid fa-credit-card"></i> Lanjutkan`}})});let u=document.getElementById(`chat-btn`);u&&u.addEventListener(`click`,async()=>{if(!r)return F(`Silakan login dulu`,`warning`),Q.navigate(`/login`);if(r.id===n.sellerId){F(`Anda tidak bisa chat dengan diri sendiri`,`warning`);return}u.disabled=!0,u.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Memuat...`;try{let e=await R.post(`/chat/conversations`,{recipientId:n.sellerId}),t=null;e&&e.id?t=e.id:e&&e.conversation&&e.conversation.id&&(t=e.conversation.id),t?(F(`Membuka chat...`,`info`,1e3),Q.navigate(`/chat/`+t)):F(`Gagal memulai chat`,`error`)}catch(e){console.error(`Chat error:`,e),F(e.message||`Gagal memulai chat`,`error`)}finally{u.disabled=!1,u.innerHTML=`<i class="fa-solid fa-comment"></i> Chat Penjual`}})}catch(t){console.error(`Detail error:`,t),e.innerHTML=`<div class="container"><div class="empty" style="text-align:center; padding:40px;">
      <i class="fa-solid fa-circle-exclamation"></i>
      <h3>Jasa tidak ditemukan</h3>
      <p>${P(t.message)}</p>
      <a href="#/marketplace" class="btn btn-primary mt-2">Kembali ke Cari Jasa</a>
    </div></div>`}}function bt(e){if(!e)return;let t=Math.round((e.budget||0)*.5),n=Math.round((e.budget||0)*1.5),r=Math.round(e.budget||0),i=e.deadline?new Date(e.deadline).toLocaleDateString(`id-ID`,{day:`numeric`,month:`long`,year:`numeric`}):`—`,a=rt({title:`Lamar Pekerjaan`,body:`
    <div class="bid-dialog">
      <div class="bid-info">
        <div class="bid-info-row">
          <span><i class="fa-solid fa-money-bill-wave"></i> Budget</span>
          <strong>${j(e.budget)} <span class="text-xs text-muted">(${P(e.budgetType||`FIXED`)})</span></strong>
        </div>
        <div class="bid-info-row"><span><i class="fa-solid fa-calendar-day"></i> Deadline</span><strong>${P(i)}</strong></div>
        <div class="bid-info-row"><span><i class="fa-solid fa-location-dot"></i> Lokasi</span><strong>${e.isOnline?`Remote (Online)`:P(e.location||`—`)}</strong></div>
        <div class="alert alert-info mt-2"><i class="fa-solid fa-circle-info"></i> Tawaran harus antara <strong>${j(t)}</strong> – <strong>${j(n)}</strong></div>
      </div>
      <form id="bid-form" data-testid="bid-form">
        <div class="form-group">
          <label class="label">Surat Lamaran *</label>
          <textarea class="textarea" id="bid-cover" required minlength="20" placeholder="Min 20 karakter — pengalaman & kenapa Anda cocok" data-testid="bid-cover"></textarea>
          <div class="text-xs text-muted" id="bid-cover-count">0 / min 20</div>
        </div>
        <div class="form-group">
          <label class="label">Harga Tawaran (Rp) *</label>
          <input class="input" type="number" id="bid-price" value="${r}" min="${t}" max="${n}" step="1000" required data-testid="bid-price">
          <input type="range" id="bid-range" min="${t}" max="${n}" step="1000" value="${r}" style="width:100%;margin-top:.5rem;accent-color:var(--primary)">
          <div class="flex-between text-xs text-muted"><span>Min: ${j(t)}</span><span id="bid-price-label">${j(r)}</span><span>Max: ${j(n)}</span></div>
        </div>
        <div class="form-group">
          <label class="label">Durasi Pengerjaan (hari) *</label>
          <input class="input" type="number" id="bid-duration" min="1" max="30" value="7" required data-testid="bid-duration">
          <div class="text-xs text-muted">Min 1 hari, max 30 hari</div>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-secondary btn-block" type="button" id="bid-preview" data-testid="bid-preview-btn"><i class="fa-solid fa-eye"></i> Preview</button>
          <button class="btn btn-primary btn-block" type="submit" data-testid="bid-submit-btn"><i class="fa-solid fa-paper-plane"></i> Kirim Lamaran</button>
        </div>
      </form>
    </div>`}),o=e=>a.el.querySelector(e),s=(e,t)=>{t.value=e.value,o(`#bid-price-label`).textContent=new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,maximumFractionDigits:0}).format(parseFloat(e.value||0))},c=o(`#bid-price`),l=o(`#bid-range`);c&&l&&(c.addEventListener(`input`,e=>s(e.target,l)),l.addEventListener(`input`,e=>s(e.target,c)));let u=o(`#bid-cover`);u&&u.addEventListener(`input`,e=>{let t=e.target.value.length,n=o(`#bid-cover-count`);n&&(n.textContent=`${t} / min 20`)});let d=o(`#bid-preview`);d&&d.addEventListener(`click`,()=>{let e=o(`#bid-cover`)?.value.trim()||``,r=parseFloat(o(`#bid-price`)?.value)||0,i=parseInt(o(`#bid-duration`)?.value||`0`,10);if(e.length<20)return F(`Surat lamaran minimal 20 karakter`,`error`);if(r<t||r>n)return F(`Harga harus ${j(t)} – ${j(n)}`,`error`);if(i<1||i>30)return F(`Durasi harus 1–30 hari`,`error`);F(`Preview: ${j(r)} dalam ${i} hari. Klik "Kirim" untuk submit.`,`info`,6e3)});let f=o(`#bid-form`);f&&f.addEventListener(`submit`,async r=>{r.preventDefault();let i=o(`#bid-cover`)?.value.trim()||``,s=parseFloat(o(`#bid-price`)?.value)||0,c=parseInt(o(`#bid-duration`)?.value||`0`,10);if(i.length<20)return F(`Surat lamaran minimal 20 karakter`,`error`);if(s<t||s>n)return F(`Harga harus antara ${j(t)} – ${j(n)}`,`error`);if(c<1||c>30)return F(`Durasi harus 1–30 hari`,`error`);let l=o(`[type=submit]`);l&&(l.disabled=!0,l.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...`);try{await R.post(`/applications`,{jobId:e.id,coverLetter:i,proposedPrice:s,proposedDuration:c}),a.close(),F(`Lamaran berhasil dikirim 🎉`,`success`),Q.render()}catch(e){if(l&&(l.disabled=!1,l.innerHTML=`<i class="fa-solid fa-paper-plane"></i> Kirim Lamaran`),e.status===403&&e.data?.code===`VERIFICATION_REQUIRED`){a.close(),F(`Verifikasi email & nomor telepon dulu di Profil → Verifikasi`,`warning`,7e3),Q.navigate(`/verification`);return}F(e.message,`error`)}})}async function xt({mount:e,query:t}){let n=f.getState().user;e.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <div><h1 class="page-title">Pekerjaan</h1><p class="page-subtitle">Telusuri lowongan dari klien</p></div>
        ${n&&n.role!==`ADMIN`?`<a class="btn btn-primary" href="#/post-job" data-testid="post-job-btn"><i class="fa-solid fa-plus"></i> Posting Pekerjaan</a>`:``}
      </div>
      <div class="filters" style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <div class="input-icon" style="flex:1;min-width:240px"><i class="fa-solid fa-magnifying-glass"></i><input id="q" class="input" placeholder="Cari pekerjaan..." data-testid="jobs-search"></div>
        <select id="cat" class="select" data-testid="jobs-cat" style="max-width:200px"></select>
        <div style="display:flex;align-items:center;gap:6px">
          <input id="min-budget" class="input" type="number" placeholder="Budget min" data-testid="jobs-min-budget" style="width:120px">
          <span class="text-muted">—</span>
          <input id="max-budget" class="input" type="number" placeholder="Budget max" data-testid="jobs-max-budget" style="width:120px">
        </div>
        <select id="loc" class="select" data-testid="jobs-location" style="max-width:170px">
          <option value="">Semua Lokasi</option>
          <option value="Remote">Remote</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Bandung">Bandung</option>
          <option value="Surabaya">Surabaya</option>
          <option value="Yogyakarta">Yogyakarta</option>
          <option value="Medan">Medan</option>
          <option value="Bali">Bali</option>
        </select>
        <select id="sort-by" class="select" data-testid="jobs-sort" style="max-width:160px">
          <option value="newest">Terbaru</option>
          <option value="budget_desc">Budget Tertinggi</option>
          <option value="budget_asc">Budget Terendah</option>
        </select>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;white-space:nowrap;font-size:.9rem">
          <input id="urgent-only" type="checkbox" data-testid="jobs-urgent"> <i class="fa-solid fa-fire" style="color:var(--danger)"></i> Mendesak
        </label>
        <button class="btn btn-secondary btn-sm" id="reset-jobs" style="white-space:nowrap"><i class="fa-solid fa-rotate-left"></i> Reset</button>
      </div>
      <div id="jobs-list" class="flex-col" data-testid="jobs-list"></div>
    </div>`;let r=await R.get(`/categories`),i=document.getElementById(`cat`);i&&(i.innerHTML=`<option value="all">Semua Kategori</option>`+r.map(e=>`<option value="${e.slug}">${e.name}</option>`).join(``));let a=async()=>{let e=new URLSearchParams,t=document.getElementById(`q`)?.value.trim()||``,i=document.getElementById(`cat`)?.value||`all`;if(t&&e.set(`q`,t),i&&i!==`all`){let t=r.find(e=>e.slug===i);t&&e.set(`categoryId`,t.id)}let a=document.getElementById(`min-budget`)?.value||``,o=document.getElementById(`max-budget`)?.value||``,s=document.getElementById(`loc`)?.value||``,c=document.getElementById(`sort-by`)?.value||``,l=document.getElementById(`urgent-only`)?.checked;a&&e.set(`minBudget`,a),o&&e.set(`maxBudget`,o),s&&e.set(`location`,s),c&&e.set(`sortBy`,c),l&&e.set(`urgency`,`URGENT`),e.set(`status`,`OPEN`);let u=document.getElementById(`jobs-list`);u&&(u.innerHTML=`<div class="spinner"></div>`);try{let[t,r]=await Promise.all([R.get(`/jobs?`+e.toString()),n?R.get(`/applications/seller`).catch(()=>[]):Promise.resolve([])]),i=Array.isArray(t)?t:t.data||[],a=new Set((r||[]).map(e=>e.jobId));if(!i.length){u&&(u.innerHTML=`<div class="empty"><i class="fa-solid fa-briefcase"></i><h3>Belum ada job terbuka</h3></div>`);return}if(u){let e=Date.now();u.innerHTML=i.map(t=>{let r=n&&t.buyerId===n.id,i=a.has(t.id),o=t.deadline?new Date(t.deadline):null,s=o?Math.ceil((o.getTime()-e)/(24*3600*1e3)):null,c=s!==null&&s>=0&&s<3,l=String(t.title||``).replace(/^\s*\[URGENT\]\s*/i,``),u=(t.category&&typeof t.category==`object`?t.category.name:t.category)||`Umum`,d=c?`<span class="badge badge-danger"><i class="fa-solid fa-fire"></i> URGENT</span>`:``,f=r?`<span class="badge badge-info"><i class="fa-solid fa-user-tie"></i> Job Anda</span>`:i?`<span class="badge badge-success"><i class="fa-solid fa-check"></i> Sudah Melamar</span>`:``;return`
            <a href="#/jobs/${t.id}" class="card card-pad card-hover" data-testid="job-card-${t.id}" data-buyer-id="${t.buyerId}">
              <div class="flex-between" style="align-items:flex-start">
                <div>
                  <div class="flex gap-sm mb-1">
                    <span class="badge">${P(u)}</span>
                    ${H(t.status)}
                    ${d}
                    ${f}
                  </div>
                  <div class="buyer-info flex gap-sm mb-1" style="align-items:center">
                    ${V(t.buyer,`sm`)}
                    <span class="buyer-name" data-profile-id="${t.buyerId}" style="cursor:pointer;color:var(--primary);font-weight:500">
                      ${P(t.buyer?.name||`Pengguna`)}
                    </span>
                  </div>
                  <h3 style="margin:.25rem 0">${P(l)}</h3>
                  <p class="text-muted text-sm" style="max-width:680px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${P(t.description||``)}</p>
                  <div class="flex gap-md mt-2 text-sm text-muted">
                    <span><i class="fa-solid fa-location-dot"></i> ${P(t.location||t.city||`Remote`)}</span>
                    <span><i class="fa-solid fa-clock"></i> ${M(t.createdAt)}</span>
                    <span><i class="fa-solid fa-users"></i> ${t.applicationsCount||t.applicationCount||0} pelamar</span>
                    ${s!==null&&s>=0?`<span><i class="fa-solid fa-hourglass-half"></i> ${s} hari lagi</span>`:``}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-muted">Budget</div>
                  <div style="font-family:var(--font-head);font-weight:700;color:var(--primary-dark);font-size:1.15rem">${j(t.budget)}</div>
                </div>
              </div>
            </a>`}).join(``)}}catch{u&&(u.innerHTML=`<div class="empty"><h3>Gagal memuat</h3></div>`)}},o=document.getElementById(`q`);o&&o.addEventListener(`input`,()=>clearTimeout(window._jt)||(window._jt=setTimeout(a,300))),[`min-budget`,`max-budget`].forEach(e=>{document.getElementById(e)?.addEventListener(`input`,()=>clearTimeout(window._jt)||(window._jt=setTimeout(a,400)))}),[`cat`,`loc`,`sort-by`,`urgent-only`].forEach(e=>{document.getElementById(e)?.addEventListener(`change`,a)}),document.getElementById(`reset-jobs`)?.addEventListener(`click`,()=>{let e=document.getElementById(`q`);e&&(e.value=``);let t=document.getElementById(`cat`);t&&(t.value=`all`),[`min-budget`,`max-budget`].forEach(e=>{let t=document.getElementById(e);t&&(t.value=``)});let n=document.getElementById(`loc`);n&&(n.value=``);let r=document.getElementById(`sort-by`);r&&(r.value=`newest`);let i=document.getElementById(`urgent-only`);i&&(i.checked=!1),a()}),a()}async function St({mount:e,params:t}){let n=f.getState().user;e.innerHTML=`<div class="container page"><div class="spinner"></div></div>`;try{let r=await R.get(`/jobs/`+t.id),i=n&&r.buyerId===n.id,a=n&&(r.applications||[]).find(e=>e.sellerId===n.id),o=!!a,s=String(r.status||``).toUpperCase()===`OPEN`,c=n&&!i&&!o&&s,l=r.description||`Tidak ada deskripsi`,u=r.city||r.location||`Remote`,d=(r.category&&typeof r.category==`object`?r.category.name:r.category)||`Umum`,f=String(r.title||`Untitled`).replace(/^\s*\[URGENT\]\s*/i,``),p=r.buyer?.name||`Pengguna`,m=r.buyer?.city||``,h=r.applications?.length||0;e.innerHTML=`
      <div class="container page job-detail-page">
        <a href="#/jobs" class="back-link"><i class="fa-solid fa-arrow-left"></i> Kembali ke Cari Kerja</a>

        <div class="grid mt-2 job-detail-grid">

          <div class="card card-pad-lg" style="background:#fff">
            <div class="flex gap-sm mb-2">
              <span class="badge">${P(d)}</span>
              ${H(r.status)}
              ${r.isOnline?`<span class="badge badge-info"><i class="fa-solid fa-globe"></i> Remote</span>`:``}
            </div>

            <h1 class="job-detail-title">${P(f)}</h1>

            <div class="flex gap-md text-sm text-muted mb-3">
              <span><i class="fa-solid fa-location-dot"></i> ${P(u)}</span>
              <span><i class="fa-solid fa-clock"></i> ${M(r.createdAt)}</span>
              <span><i class="fa-solid fa-users"></i> ${h} pelamar</span>
              ${r.deadline?`<span><i class="fa-solid fa-hourglass-half"></i> Deadline: ${new Date(r.deadline).toLocaleDateString(`id-ID`)}</span>`:``}
            </div>

            <h3 style="margin-top:1.5rem"><i class="fa-solid fa-circle-info"></i> Deskripsi Pekerjaan</h3>
            <p style="white-space:pre-wrap; line-height:1.6">${P(l)}</p>

            ${(()=>{let e=[];try{e=typeof r.skills==`string`?JSON.parse(r.skills):r.skills||[]}catch{e=[]}return!Array.isArray(e)||e.length===0?``:`
              <h3 style="margin-top:1.5rem"><i class="fa-solid fa-tags"></i> Skill yang Dibutuhkan</h3>
              <div class="flex gap-sm" style="flex-wrap:wrap">
                ${e.map(e=>`<span class="badge">${P(String(e))}</span>`).join(``)}
              </div>`})()}

            <h3 style="margin-top:1.5rem"><i class="fa-solid fa-user-pen"></i> Diposting oleh</h3>
            <div class="flex gap-md" style="align-items:center; padding:12px; border:1px solid var(--border); border-radius:12px; background:var(--surface-2)">
              <div class="buyer-avatar" data-profile-id="${r.buyerId}" style="cursor:pointer">
                ${V(r.buyer,`lg`)}
              </div>
              <div style="flex:1">
                <div class="buyer-name" data-profile-id="${r.buyerId}" style="cursor:pointer;color:var(--primary);font-weight:700;font-size:1.05rem">${P(p)}</div>
                <div class="text-sm text-muted">${P(m||`TOLONGIN Member`)} · Bergabung ${r.buyer?.createdAt?M(r.buyer.createdAt):`—`}</div>
                ${typeof r.buyer?.rating==`number`&&r.buyer.rating>0?`<div class="text-sm" style="color:#f5b042"><i class="fa-solid fa-star"></i> ${r.buyer.rating.toFixed(1)} dari ulasan</div>`:``}
              </div>
              <a class="btn btn-ghost btn-sm" href="#/profile/${r.buyerId}" data-testid="view-poster-profile"><i class="fa-solid fa-arrow-up-right-from-square"></i> Lihat Profil</a>
            </div>

            ${c?`
              <div class="flex gap-sm mt-3" style="flex-wrap:wrap">
                <button class="btn btn-primary btn-lg" id="apply-btn" data-testid="apply-job-btn">
                  <i class="fa-solid fa-paper-plane"></i> Lamar Pekerjaan Ini
                </button>
                <button class="btn btn-secondary" id="chat-before-apply-btn" data-testid="chat-before-apply-btn">
                  <i class="fa-solid fa-comment"></i> Chat dengan Pemilik Lowongan
                </button>
              </div>`:``}
            ${o&&!i?(()=>{let e=String(a?.status||`PENDING`).toUpperCase();return e===`ACCEPTED`?`
                  <div class="alert alert-success mt-3" data-testid="application-accepted-alert" style="margin-bottom:0">
                    <strong><i class="fa-solid fa-circle-check"></i> Lamaran Anda diterima!</strong>
                    <div class="text-sm mt-1">Silakan koordinasikan progress pekerjaan dengan pemilik lowongan.</div>
                  </div>
                  <div class="flex gap-sm mt-3" style="flex-wrap:wrap">
                    <button class="btn btn-primary" id="chat-after-apply-btn" data-testid="chat-after-apply-btn"><i class="fa-solid fa-comment"></i> Chat Pemilik Lowongan</button>
                    <a class="btn btn-secondary" href="#/dashboard/my-applications" data-testid="goto-applications-btn"><i class="fa-solid fa-list-check"></i> Buka Lamaran Saya</a>
                  </div>`:e===`REJECTED`?`<div class="alert alert-danger mt-3" style="margin-bottom:0"><i class="fa-solid fa-circle-xmark"></i> Lamaran Anda ditolak oleh pemilik lowongan.</div>`:`
                  <div class="alert alert-info mt-3" style="margin-bottom:0"><i class="fa-solid fa-hourglass-half"></i> Lamaran Anda sedang menunggu keputusan pemilik lowongan.</div>
                  <div class="flex gap-sm mt-3">
                    <a class="btn btn-secondary" href="#/dashboard/my-applications"><i class="fa-solid fa-list-check"></i> Buka Lamaran Saya</a>
                  </div>`})():``}
            ${i?`<div class="alert alert-info mt-3" style="margin-bottom:0"><i class="fa-solid fa-user-tie"></i> Ini lowongan Anda — tidak bisa melamar pekerjaan sendiri.</div>`:``}
            ${i?`<div class="flex gap-sm mt-3"><a class="btn btn-secondary" href="#/dashboard/manage-jobs/edit/${r.id}" data-testid="edit-job-btn"><i class="fa-solid fa-pen"></i> Edit Lowongan</a><button class="btn btn-danger" id="del-job" data-testid="delete-job-btn"><i class="fa-solid fa-trash"></i> Hapus Lowongan</button></div>`:``}
          </div>

          <!-- Right side: summary panel -->
          <aside class="card card-pad" style="background:#fff; position:sticky; top:90px">
            <div class="text-xs text-muted">Budget Proyek</div>
            <div style="font-family:var(--font-head);font-weight:700;color:var(--primary-dark);font-size:2rem;line-height:1.1;margin-bottom:.75rem">${j(r.budget)}</div>

            <div class="divider"></div>

            <div class="flex-col" style="gap:8px; font-size:0.9rem">
              <div class="flex-between"><span class="text-muted"><i class="fa-solid fa-tag"></i> Kategori</span><span style="font-weight:600">${P(d)}</span></div>
              <div class="flex-between"><span class="text-muted"><i class="fa-solid fa-location-dot"></i> Lokasi</span><span style="font-weight:600">${P(u)}</span></div>
              <div class="flex-between"><span class="text-muted"><i class="fa-solid fa-globe"></i> Tipe</span><span style="font-weight:600">${r.isOnline?`Remote`:`Onsite`}</span></div>
              <div class="flex-between"><span class="text-muted"><i class="fa-solid fa-hourglass-half"></i> Deadline</span><span style="font-weight:600">${r.deadline?new Date(r.deadline).toLocaleDateString(`id-ID`):`Fleksibel`}</span></div>
              <div class="flex-between"><span class="text-muted"><i class="fa-solid fa-users"></i> Pelamar</span><span style="font-weight:600">${h} orang</span></div>
              <div class="flex-between"><span class="text-muted"><i class="fa-solid fa-calendar-plus"></i> Diposting</span><span style="font-weight:600">${M(r.createdAt)}</span></div>
            </div>

            <div class="divider"></div>
            <div class="text-xs text-muted text-center"><i class="fa-solid fa-shield-halved"></i> Lamaran aman & terverifikasi</div>
          </aside>
        </div>
        ${i?`
        <div class="card card-pad-lg mt-3">
          <h3>${h} Pelamar</h3>
          ${r.applications?.length?r.applications.map(e=>{let t=e.proposedDuration?`${e.proposedDuration} hari`:``,n=e.proposedPrice?j(e.proposedPrice):``,r=e.coverLetter||e.message||`Tidak ada surat lamaran`,i=e.seller?.name||`Pengguna`,a=String(e.status||`PENDING`).toUpperCase();return`
            <div class="flex-between" style="padding:1rem 0;border-bottom:1px dashed var(--border);align-items:flex-start">
              <div style="flex:1">
                <div class="flex gap-md" style="align-items:center">
                  <div class="seller-avatar" data-profile-id="${e.sellerId}" style="cursor:pointer">
                    ${V(e.seller,`sm`)}
                  </div>
                  <strong class="seller-name" data-profile-id="${e.sellerId}" style="cursor:pointer;color:var(--primary)">${P(i)}</strong>
                  ${H(a)}
                </div>
                <p class="mt-1">${P(r)}</p>
                ${n?`<div class="text-sm">Tawaran: <strong>${n}</strong></div>`:``}
                ${t?`<div class="text-sm">Durasi: <strong>${t}</strong></div>`:``}
              </div>
              ${a===`PENDING`?`
                <div class="flex gap-sm">
                  <button class="btn btn-success btn-sm" data-decide="accepted" data-app="${e.id}" data-testid="accept-app-${e.id}">Terima</button>
                  <button class="btn btn-secondary btn-sm" data-decide="rejected" data-app="${e.id}" data-testid="reject-app-${e.id}">Tolak</button>
                </div>`:``}
            </div>`}).join(``):`<p class="text-muted">Belum ada pelamar</p>`}
        </div>`:``}
      </div>`;let g=document.getElementById(`apply-btn`);g&&g.addEventListener(`click`,()=>bt(r));let _=document.getElementById(`chat-after-apply-btn`);_&&_.addEventListener(`click`,async()=>{try{let e=await R.post(`/chat/conversations`,{recipientId:r.buyerId});Q.navigate(`/chat/`+e.id)}catch(e){F(e.message||`Gagal membuka chat`,`error`)}});let ee=document.getElementById(`chat-before-apply-btn`);ee&&ee.addEventListener(`click`,async()=>{if(!n)return F(`Silakan login dulu`,`warning`),Q.navigate(`/login`);if(n.id===r.buyerId){F(`Anda tidak bisa chat dengan diri sendiri`,`warning`);return}try{let e=await R.post(`/chat/conversations`,{recipientId:r.buyerId});F(`Membuka chat...`,`info`),Q.navigate(`/chat/`+e.id)}catch(e){console.error(`Chat error:`,e),F(e.message||`Gagal membuka chat`,`error`)}}),document.querySelectorAll(`[data-decide]`).forEach(e=>e.addEventListener(`click`,async()=>{try{String(e.dataset.decide||``).toLowerCase()===`accepted`?await R.post(`/applications/${e.dataset.app}/accept`,{}):await R.post(`/applications/${e.dataset.app}/reject`,{reason:`Ditolak oleh pemilik pekerjaan`}),F(`Berhasil`,`success`),Q.render()}catch(e){F(e.message,`error`)}}));let te=document.getElementById(`del-job`);te&&te.addEventListener(`click`,()=>I(`Hapus job ini?`,async()=>{try{await R.del(`/jobs/`+r.id),F(`Job dihapus`,`success`),Q.navigate(`/jobs`)}catch(e){F(e.message,`error`)}}))}catch(t){e.innerHTML=`<div class="container"><div class="empty"><h3>Job tidak ditemukan</h3><p>${P(t.message)}</p></div></div>`}}typeof document<`u`&&document.body.addEventListener(`click`,e=>{let t=e.target.closest(`[data-profile-id]`);if(t&&t.dataset.profileId){e.preventDefault(),e.stopPropagation();let n=t.dataset.profileId;Q.navigate(`/users/${n}`)}});var Ct=new Set([`image/jpeg`,`image/png`,`image/webp`,`application/pdf`]);function wt(e,t=`general`,n){if(!e)return Promise.reject(Error(`File wajib dipilih`));if(!Ct.has(e.type))return Promise.reject(Error(`Format harus JPG, PNG, WebP, atau PDF`));if(e.size>10*1024*1024)return Promise.reject(Error(`Ukuran file maksimal 10 MB`));let r=new FormData;return r.append(`file`,e),new Promise((e,i)=>{let a=new XMLHttpRequest;a.open(`POST`,ct+`/uploads?folder=`+encodeURIComponent(t)),a.withCredentials=!0;let o=f.getState().token;o&&a.setRequestHeader(`Authorization`,`Bearer `+o),a.upload.onprogress=e=>{e.lengthComputable&&n&&n(Math.round(e.loaded/e.total*100))},a.onerror=()=>i(Error(`Koneksi upload terputus`)),a.onload=()=>{let t;try{t=JSON.parse(a.responseText||`{}`)}catch{t={}}if(a.status<200||a.status>=300){let e=Array.isArray(t.message)?t.message.join(`, `):t.message||`Upload gagal`;i(Error(e));return}e({...t,url:lt(t.url)})},a.send(r)})}function Tt(e){return{ACCEPTED:`✓ Terima Pesanan`,IN_PROGRESS:`🔧 Mulai Pengerjaan`,WAITING_REVIEW:`👀 Submit untuk Review`,COMPLETED:`✅ Selesaikan Pesanan`,CANCELLED:`✕ Batalkan Pesanan`}[e]||`Update ke ${String(e).replace(`_`,` `)}`}function W(e){let t=String(e||``).toUpperCase(),n=[[`WAITING_CONFIRMATION`,`Menunggu pembayaran`],[`PAID`,`Dana di escrow`],[`WAITING_REVIEW`,`Review bukti`],[`COMPLETED`,`Dana dirilis`]],r=t===`REJECTED`?`WAITING_REVIEW`:t,i=Math.max(0,n.findIndex(([e])=>e===r));return`<div class="escrow-steps">${n.map(([e,t],n)=>`<div class="escrow-step ${n<=i?`done`:``} ${e===r?`current`:``}">
          <span>${n+1}</span><small>${t}</small>
        </div>`).join(``)}</div>`}function Et(e,t,n){let r=e.workSubmission,i=r?.attachments||[];return!r&&!n?`<div class="alert alert-info mt-3"><i class="fa-solid fa-shield-halved"></i> Menunggu pekerja mengirim bukti pengerjaan. Dana tetap ditahan di escrow sampai Anda approve.</div>`:`
    <div class="card card-pad-lg mt-3">
      <div class="flex-between" style="align-items:flex-start;gap:1rem;flex-wrap:wrap">
        <div>
          <h3 style="margin:0"><i class="fa-solid fa-file-circle-check"></i> Bukti Pengerjaan</h3>
          <p class="text-muted text-sm" style="margin:.35rem 0 0">Upload catatan, link file, foto hasil kerja, atau bukti lapangan. Dana seller hanya cair setelah approve.</p>
        </div>
        ${(()=>{let t=String(e.status).toUpperCase();return t===`COMPLETED`?`<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Disetujui</span>`:t===`CANCELLED`?`<span class="badge badge-danger"><i class="fa-solid fa-ban"></i> Dibatalkan</span>`:e.workSubmittedAt?`<span class="badge badge-warning">Menunggu approval</span>`:`<span class="badge">Belum dikirim</span>`})()}
      </div>
      ${r?`<div class="work-proof mt-2">
              <p>${P(r.note||``)}</p>
              ${i.length?`<div class="proof-links">${i.map((e,t)=>`<a class="btn btn-secondary btn-sm" href="${P(lt(e))}" target="_blank" rel="noopener"><i class="fa-solid fa-paperclip"></i> Bukti ${t+1}</a>`).join(``)}</div>`:`<div class="text-sm text-muted">Tidak ada lampiran, hanya catatan.</div>`}
            </div>`:``}
      ${n&&[`PAID`,`REJECTED`].includes(String(e.status).toUpperCase())?`<form id="work-form" class="mt-3">
              <div class="form-group">
                <label class="label">Catatan hasil kerja *</label>
                <textarea class="textarea" id="work-note" required minlength="10" placeholder="Jelaskan pekerjaan yang sudah selesai, lokasi file, atau bukti lapangan..."></textarea>
              </div>
              <div class="form-group">
                <label class="label">Bukti kerja * (JPG, PNG, WebP, atau PDF)</label>
                <input class="input" type="file" id="work-files" accept="image/jpeg,image/png,image/webp,application/pdf" multiple required>
                <div id="work-upload-progress" class="text-sm text-muted mt-1">Maksimal 10 file, masing-masing 10 MB.</div>
              </div>
              <button class="btn btn-primary" type="submit"><i class="fa-solid fa-upload"></i> Kirim Bukti untuk Approval</button>
            </form>`:``}
      ${t&&String(e.status).toUpperCase()===`WAITING_REVIEW`?`<div class="flex gap-sm mt-3 flex-wrap">
              <button class="btn btn-success" id="approve-work"><i class="fa-solid fa-circle-check"></i> Approve & Rilis Dana</button>
              <button class="btn btn-secondary" id="reject-work"><i class="fa-solid fa-rotate-left"></i> Minta Revisi</button>
              <button class="btn btn-danger" id="dispute-work"><i class="fa-solid fa-scale-balanced"></i> Sengketa</button>
            </div>`:``}
    </div>`}var Dt=null;function Ot(e,t){return window.snap?Promise.resolve():Dt||(Dt=new Promise((n,r)=>{let i=document.createElement(`script`);i.src=t?`https://app.midtrans.com/snap/snap.js`:`https://app.sandbox.midtrans.com/snap/snap.js`,i.setAttribute(`data-client-key`,e),i.onload=()=>n(),i.onerror=()=>{Dt=null,r(Error(`Gagal load Midtrans Snap`))},document.body.appendChild(i)}),Dt)}async function kt({mount:e}){f.getState().user,e.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <div><h1 class="page-title">Pesanan Saya</h1><p class="page-subtitle">Kelola semua pesanan Anda</p></div>
        <div class="chips" id="role-tabs">
          <span class="chip active" data-role="all">Semua</span>
          <span class="chip" data-role="BUYER">Sebagai Pembeli</span>
          <span class="chip" data-role="SELLER">Sebagai Penjual</span>
        </div>
      </div>
      <div id="orders" class="flex-col"></div>
    </div>`;let t=async e=>{let t=document.getElementById(`orders`);t.innerHTML=`<div class="spinner"></div>`;try{let n=await R.get(`/orders`+(e&&e!==`all`?`?role=${e}`:``));if(!n.length){t.innerHTML=B(`Belum ada pesanan`,`Mulai pesan jasa dari marketplace`,`fa-receipt`);return}t.innerHTML=n.map(e=>`
        <a href="#/orders/${e.id}" class="card card-pad card-hover" data-testid="order-${e.id}">
          <div class="flex-between" style="align-items:flex-start">
            <div style="flex:1">
              <div class="flex gap-sm mb-1">${H(e.status)}<span class="text-xs text-muted">#${e.id.slice(0,8)}</span></div>
              <h3 style="margin:.25rem 0">${P(e.title)}</h3>
              <div class="flex gap-md text-sm text-muted">
                <span>Pembeli: ${P(e.buyer?.name)}</span>
                <span>Penjual: ${P(e.seller?.name)}</span>
                <span><i class="fa-solid fa-clock"></i> ${tt(e.createdAt)}</span>
              </div>
            </div>
            <div class="text-right"><div class="text-xs text-muted">Total</div><div style="font-family:var(--font-head);font-weight:700;color:var(--primary-dark);font-size:1.15rem">${j(e.amount)}</div></div>
          </div>
        </a>`).join(``)}catch(e){t.innerHTML=B(`Gagal memuat`,e.message,`fa-triangle-exclamation`)}};document.querySelectorAll(`#role-tabs .chip`).forEach(e=>e.addEventListener(`click`,()=>{document.querySelectorAll(`#role-tabs .chip`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),t(e.dataset.role)})),t(`all`)}function At(e){if(String(e.status).toUpperCase()!==`REJECTED`)return``;let t=e.workRejectionReason||e.revisionReason||``;return`
    <div class="alert alert-warning mt-3">
      <i class="fa-solid fa-rotate-left"></i>
      <div>
        <strong>Revisi diminta oleh pembeli</strong>
        ${t?`<p style="margin:.35rem 0 0">${P(t)}</p>`:`<p style="margin:.35rem 0 0">Silakan perbaiki pekerjaan lalu kirim ulang bukti.</p>`}
      </div>
    </div>`}function jt(){return``}function Mt(e){if(!e.workSubmittedAt||!document.getElementById(`auto-complete-timer`))return;let t=new Date(e.workSubmittedAt).getTime()+10080*60*1e3,n=()=>{let e=document.getElementById(`auto-complete-timer`);if(!e){clearInterval(r);return}let n=t-Date.now();if(n<=0){e.textContent=`segera`,clearInterval(r);return}e.textContent=`${Math.floor(n/(1440*60*1e3))}h ${Math.floor(n%(1440*60*1e3)/(3600*1e3))}j ${Math.floor(n%(3600*1e3)/(60*1e3))}m ${Math.floor(n%(60*1e3)/1e3)}d`};n();let r=setInterval(n,1e3)}function Nt(e,t){if(!t||!t.length)return``;let n=e=>e.reviewType===`SELLER_TO_BUYER`?`Penjual menilai Pembeli`:`Pembeli menilai Penjual`;return`
    <div class="card card-pad-lg mt-3">
      <h3 style="margin:0 0 .75rem"><i class="fa-solid fa-star"></i> Ulasan (${t.length})</h3>
      <div class="flex-col gap-md">
        ${t.map(e=>`
          <div class="review-item" style="border:1px solid var(--border);border-radius:12px;padding:1rem">
            <div class="flex-between" style="align-items:flex-start;gap:.75rem;flex-wrap:wrap">
              <div class="flex gap-sm" style="align-items:center">
                ${V(e.isAnonymous?{name:`Anonim`}:e.reviewer,`sm`)}
                <div>
                  <strong>${P(e.isAnonymous?`Anonim`:e.reviewer?.name||`Pengguna`)}</strong>
                  <div class="text-xs text-muted">${n(e)}</div>
                </div>
              </div>
              <div style="color:var(--warning);white-space:nowrap">
                ${[1,2,3,4,5].map(t=>`<i class="fa-${t<=e.rating?`solid`:`regular`} fa-star"></i>`).join(``)}
              </div>
            </div>
            ${e.comment?`<p style="margin:.6rem 0 0">${P(e.comment)}</p>`:``}
            <div class="text-xs text-muted mt-1">${tt(e.createdAt,!0)}</div>
          </div>`).join(``)}
      </div>
    </div>`}async function Pt({mount:e,params:t}){let n=f.getState().user;e.innerHTML=`<div class="container page"><div class="spinner"></div></div>`;try{let r=await R.get(`/orders/`+t.id),i=[];try{i=await R.get(`/reviews/order/${r.id}`),Array.isArray(i)||(i=[])}catch{i=[]}let a=n.id===r.buyerId,o=n.id===r.sellerId,s=i.find(e=>e.reviewerId===n.id),c=(a||o)&&String(r.status).toUpperCase()===`COMPLETED`&&!s,l=String(r.status||``).toUpperCase(),u=l===`COMPLETED`,d=l===`CANCELLED`,f=l===`WAITING_REVIEW`,p=l===`IN_PROGRESS`,m=l===`ACCEPTED`,h=l===`WAITING_CONFIRMATION`,g=null;!u&&!d&&!f&&(h&&o?g=`ACCEPTED`:m&&o?g=`IN_PROGRESS`:p&&o&&(g=`WAITING_REVIEW`));let _=g!==null&&!u&&!d&&!f;e.innerHTML=`
      <div class="container page">
        <a href="#/orders"><i class="fa-solid fa-arrow-left"></i> Kembali</a>
        <div class="grid" style="grid-template-columns: 1fr 320px;gap:1.5rem;margin-top:1rem">
          <div>
            <div class="card card-pad-lg">
              <div class="flex-between mb-2"><h1 style="margin:0">${P(r.title)}</h1>${H(r.status)}</div>
              <div class="text-sm text-muted">Order #${r.id.slice(0,12)} · ${tt(r.createdAt,!0)}</div>
              ${W(r.status)}
              <div class="divider"></div>
              <div class="grid grid-2">
                <div>
                  <div class="text-xs text-muted">Pembeli</div>
                  <div class="flex gap-md" style="align-items:center;margin-top:.25rem">${V(r.buyer,`sm`)}<strong>${P(r.buyer?.name)}</strong></div>
                </div>
                <div>
                  <div class="text-xs text-muted">Penjual</div>
                  <div class="flex gap-md" style="align-items:center;margin-top:.25rem">${V(r.seller,`sm`)}<strong>${P(r.seller?.name)}</strong></div>
                </div>
              </div>
              ${r.note?`<div class="mt-2"><div class="text-xs text-muted">Catatan</div><p>${P(r.note)}</p></div>`:``}
              
              <div class="flex gap-sm mt-3 flex-wrap">
                ${_?`<button class="btn btn-primary" id="advance-btn"><i class="fa-solid fa-arrow-right"></i> ${Tt(g)}</button>`:``}
                ${a&&h?`<button class="btn btn-danger" id="cancel-btn">Batalkan</button>`:``}
                ${c?`<button class="btn btn-success" id="review-btn"><i class="fa-solid fa-star"></i> Beri Review ${o?`untuk Pembeli`:`untuk Penjual`}</button>`:``}
                ${s?`<span class="badge badge-success" style="align-self:center"><i class="fa-solid fa-circle-check"></i> Anda sudah memberi ulasan</span>`:``}
                
                ${!u&&!d?`<button class="btn btn-success" id="demo-auto-btn"><i class="fa-solid fa-wand-magic-sparkles"></i> Demo Auto</button>`:``}
                <button class="btn btn-secondary" id="chat-btn">
                  <i class="fa-solid fa-comment"></i> Chat dengan ${a?`Penjual`:`Pembeli`}
                </button>
                <button class="btn btn-secondary" id="dispute-btn"><i class="fa-solid fa-flag"></i> Laporkan</button>
              </div>
            </div>
            
            ${At(r)}
            ${jt(r)}
            ${Et(r,a,o)}
            ${Nt(r,i)}
            
            <div class="card card-pad-lg mt-3">
              <h3>Timeline</h3>
              <div class="timeline">
                ${(r.timeline||[]).map(e=>`<div class="tl-step done"><strong>${P(e.status.replace(`_`,` `))}</strong><div class="tl-time">${tt(e.at,!0)}</div></div>`).join(``)}
              </div>
            </div>
          </div>
          <aside class="card card-pad-lg" style="position:sticky;top:calc(var(--header-h) + 1rem);align-self:flex-start">
            <div class="text-center">
              <div class="text-xs text-muted">Total Pembayaran</div>
              <div style="font-family:var(--font-head);font-size:2rem;font-weight:700;color:var(--primary-dark)">${j(r.totalAmount||r.amount)}</div>
            </div>
            <div class="divider"></div>
            <div class="text-sm">
              <div class="flex-between"><span class="text-muted">Subtotal</span><span>${j(r.amount)}</span></div>
              <div class="flex-between"><span class="text-muted">Platform fee</span><span>${j(r.fee||0)}</span></div>
              <div class="divider"></div>
              <div class="flex-between"><strong>Total</strong><strong>${j(r.totalAmount||r.amount)}</strong></div>
            </div>
            ${r.status===`WAITING_CONFIRMATION`&&a?`<button class="btn btn-primary btn-block mt-2" id="pay-btn"><i class="fa-solid fa-credit-card"></i> Bayar Sekarang</button>`:``}
            ${r.status===`COMPLETED`?`<div class="alert alert-success mt-2" style="margin:0"><i class="fa-solid fa-circle-check"></i> Pembayaran selesai, dana telah dirilis.</div>`:``}
            ${r.status===`CANCELLED`?`<div class="alert alert-danger mt-2" style="margin:0"><i class="fa-solid fa-ban"></i> Pesanan dibatalkan${r.cancellationReason?`: `+P(r.cancellationReason):`.`}</div>`:``}
            <div class="text-xs text-muted text-center mt-1"><i class="fa-solid fa-shield-halved"></i> Pembayaran aman dengan escrow</div>
          </aside>
        </div>
      </div>`,Mt(r);let ee=document.getElementById(`advance-btn`);ee&&g&&ee.addEventListener(`click`,async()=>{if(u){F(`Pesanan sudah selesai`,`warning`);return}if(d){F(`Pesanan sudah dibatalkan`,`warning`);return}if(f){F(`Pesanan sedang dalam review, tidak bisa mengubah status`,`warning`);return}if(g===`ACCEPTED`&&l!==`WAITING_CONFIRMATION`){F(`Pesanan tidak dalam status menunggu konfirmasi`,`error`);return}try{await R.post(`/orders/${r.id}/status`,{status:g}),F(`Status diperbarui`,`success`),Q.render()}catch(e){F(e.message,`error`)}});let te=document.getElementById(`cancel-btn`);te&&te.addEventListener(`click`,()=>I(`Yakin batalkan pesanan?`,async()=>{try{await R.post(`/orders/${r.id}/status`,{status:`CANCELLED`}),F(`Dibatalkan`,`success`),Q.render()}catch(e){F(e.message,`error`)}}));let v=document.getElementById(`review-btn`);v&&v.addEventListener(`click`,()=>{let e=5,t=rt({title:`Beri Ulasan`,body:`
        <form id="rev-form">
          <div class="form-group"><label class="label">Rating</label>
            <div id="stars-pick" style="font-size:2rem;cursor:pointer;color:var(--warning)">${[1,2,3,4,5].map(e=>`<i class="fa-solid fa-star" data-r="${e}"></i>`).join(` `)}</div>
          </div>
          <div class="form-group"><label class="label">Komentar</label><textarea id="rev-cm" class="textarea" required></textarea></div>
          <button class="btn btn-primary btn-block" type="submit">Kirim Review</button>
        </form>`});t.el.querySelectorAll(`[data-r]`).forEach(n=>n.addEventListener(`click`,()=>{e=parseInt(n.dataset.r),t.el.querySelectorAll(`[data-r]`).forEach((t,n)=>t.style.opacity=n<e?`1`:`.3`)})),t.el.querySelector(`#rev-form`).addEventListener(`submit`,async n=>{n.preventDefault();try{await R.post(`/reviews`,{orderId:r.id,rating:e,comment:t.el.querySelector(`#rev-cm`).value}),t.close(),F(`Review terkirim`,`success`),Q.render()}catch(e){F(e.message,`error`)}})});let y=document.getElementById(`work-form`);y&&y.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`work-note`)?.value.trim()||``,n=Array.from(document.getElementById(`work-files`)?.files||[]);if(!n.length)return F(`Upload minimal satu bukti kerja`,`error`);if(n.length>10)return F(`Maksimal 10 lampiran`,`error`);if(t.length<10)return F(`Catatan bukti minimal 10 karakter`,`error`);try{let e=[],i=document.getElementById(`work-upload-progress`);for(let t=0;t<n.length;t+=1){let r=await wt(n[t],`work-proofs`,e=>{i&&(i.textContent=`Mengunggah `+(t+1)+`/`+n.length+` · `+e+`%`)});e.push(r.url)}await R.post(`/orders/${r.id}/work-submission`,{note:t,attachments:e}),F(`Bukti pengerjaan dikirim. Menunggu approval client.`,`success`),Q.render()}catch(e){F(e.message,`error`)}});let b=document.getElementById(`approve-work`);b&&b.addEventListener(`click`,()=>I(`Approve pekerjaan ini dan rilis dana escrow ke pekerja?`,async()=>{try{await R.post(`/orders/${r.id}/status`,{status:`COMPLETED`}),F(`Pekerjaan disetujui. Dana dirilis ke pekerja.`,`success`),Q.render()}catch(e){F(e.message,`error`)}}));let ne=document.getElementById(`reject-work`);ne&&ne.addEventListener(`click`,()=>{let e=rt({title:`Minta Revisi`,body:`<form id="revision-form"><div class="form-group"><label class="label">Alasan revisi yang jelas</label><textarea class="textarea" id="revision-reason" required minlength="5" placeholder="Contoh: bagian X belum sesuai brief, mohon perbaiki..."></textarea></div><button class="btn btn-primary btn-block" type="submit">Kirim Revisi</button></form>`});e.el.querySelector(`#revision-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=e.el.querySelector(`#revision-reason`).value.trim();try{await R.post(`/orders/${r.id}/work-revision`,{reason:n}),e.close(),F(`Revisi dikirim ke pekerja.`,`success`),Q.render()}catch(e){F(e.message,`error`)}})});let x=document.getElementById(`dispute-work`);x&&x.addEventListener(`click`,()=>{F(`Gunakan tombol Laporkan untuk membuka sengketa dengan bukti lengkap.`,`info`),document.getElementById(`dispute-btn`)?.click()});let S=document.getElementById(`dispute-btn`);S&&S.addEventListener(`click`,()=>{let e=rt({title:`Laporkan Masalah`,body:`
        <form id="d-form">
          <div class="form-group"><label class="label">Alasan</label><textarea class="textarea" id="d-reason" required minlength="20"></textarea></div>
          <button class="btn btn-danger btn-block" type="submit">Kirim Laporan</button>
        </form>`});e.el.querySelector(`#d-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=e.el.querySelector(`#d-reason`).value.trim();if(n.length<20){F(`Jelaskan masalah minimal 20 karakter`,`error`);return}try{await R.post(`/disputes`,{orderId:r.id,reason:n.slice(0,120),description:n}),e.close(),F(`Laporan terkirim ke admin`,`success`)}catch(e){F(e.message,`error`)}})});let re=document.getElementById(`pay-btn`);re&&re.addEventListener(`click`,async()=>{try{if(!(await R.get(`/payments/midtrans/config`)).configured){let e=rt({title:`Pembayaran (Demo)`,body:`
            <div class="pay-demo">
              <div class="escrow-summary">
                <i class="fa-solid fa-shield-halved"></i>
                <div><strong>Escrow Tolongin</strong><span>Dana ditahan sampai bukti kerja Anda approve.</span></div>
              </div>
              <h3 class="mt-2">Total: ${j(r.totalAmount||r.amount)}</h3>
              <div class="pay-methods">
                ${[`Virtual Account BCA`,`QRIS`,`GoPay`,`OVO`,`DANA`,`Kartu Kredit`].map((e,t)=>`<label class="pay-method ${t===0?`active`:``}"><input type="radio" name="pay-method" ${t===0?`checked`:``}><span><i class="fa-solid ${t===1?`fa-qrcode`:t===5?`fa-credit-card`:`fa-building-columns`}"></i>${e}</span><small>Konfirmasi instan demo</small></label>`).join(``)}
              </div>
              <div class="alert alert-info mt-2"><i class="fa-solid fa-circle-info"></i> Demo payment ini mencatat pembayaran sebagai COMPLETED dan mengaktifkan escrow.</div>
              <button class="btn btn-primary btn-block" id="pay-ok">Bayar & Aktifkan Escrow</button>
            </div>`});e.el.querySelector(`#pay-ok`).addEventListener(`click`,async()=>{try{await R.post(`/payments/demo/confirm/${r.id}`),e.close(),F(`Pembayaran berhasil!`,`success`),Q.render()}catch(e){F(e.message,`error`)}});return}F(`Membuka Midtrans...`,`info`);let e=await R.post(`/payments/midtrans/token?orderId=${r.id}`);await Ot(e.clientKey,e.isProduction),window.snap.pay(e.token,{onSuccess:()=>{F(`Pembayaran berhasil!`,`success`),setTimeout(()=>Q.render(),1200)},onPending:()=>F(`Pembayaran pending - selesaikan di Midtrans`,`warning`),onError:e=>F(`Pembayaran gagal: `+(e?.status_message||``),`error`),onClose:()=>F(`Anda menutup halaman pembayaran`,`info`)})}catch(e){F(e.message,`error`)}});let C=document.getElementById(`demo-auto-btn`);C&&C.addEventListener(`click`,async()=>{C.disabled=!0,C.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Menjalankan flow...`;try{await R.post(`/orders/`+r.id+`/demo-auto`,{}),F(`Demo selesai: bayar, kirim bukti, approve, dana cair.`,`success`),Q.render()}catch(e){C.disabled=!1,C.innerHTML=`<i class="fa-solid fa-wand-magic-sparkles"></i> Demo Auto`,F(e.message,`error`)}});let ie=document.getElementById(`chat-btn`);ie&&ie.addEventListener(`click`,async()=>{let e=a?r.sellerId:r.buyerId;try{let t=await R.post(`/chat/conversations`,{recipientId:e,orderId:r.id});F(`Membuka chat...`,`info`),Q.navigate(`/chat/${t.id}`)}catch(e){F(e.message,`error`)}});let ae=document.getElementById(`demo-accept-btn`);ae&&ae.addEventListener(`click`,async()=>{try{await R.post(`/orders/${r.id}/demo-accept`),F(`✅ [DEMO] Pesanan diterima! Silakan lanjut ke pengerjaan.`,`success`),Q.render()}catch(e){F(e.message,`error`)}});let oe=document.getElementById(`demo-submit-btn`);oe&&oe.addEventListener(`click`,async()=>{try{await R.post(`/orders/${r.id}/demo-submit-work`),F(`✅ [DEMO] Bukti kerja dikirim! Menunggu approval client.`,`success`),Q.render()}catch(e){F(e.message,`error`)}});let se=document.getElementById(`demo-approve-btn`);se&&se.addEventListener(`click`,async()=>{try{await R.post(`/orders/${r.id}/demo-approve`),F(`✅ [DEMO] Pekerjaan disetujui! Dana dirilis ke pekerja.`,`success`),Q.render()}catch(e){F(e.message,`error`)}})}catch(t){console.error(`OrderDetailPage error:`,t),e.innerHTML=B(`Tidak ditemukan`,t.message)}}var G=Object.create(null);G.open=`0`,G.close=`1`,G.ping=`2`,G.pong=`3`,G.message=`4`,G.upgrade=`5`,G.noop=`6`;var Ft=Object.create(null);Object.keys(G).forEach(e=>{Ft[G[e]]=e});var It={type:`error`,data:`parser error`},Lt=typeof Blob==`function`||typeof Blob<`u`&&Object.prototype.toString.call(Blob)===`[object BlobConstructor]`,Rt=typeof ArrayBuffer==`function`,zt=e=>typeof ArrayBuffer.isView==`function`?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer,Bt=({type:e,data:t},n,r)=>Lt&&t instanceof Blob?n?r(t):Vt(t,r):Rt&&(t instanceof ArrayBuffer||zt(t))?n?r(t):Vt(new Blob([t]),r):r(G[e]+(t||``)),Vt=(e,t)=>{let n=new FileReader;return n.onload=function(){let e=n.result.split(`,`)[1];t(`b`+(e||``))},n.readAsDataURL(e)};function Ht(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}var Ut;function Wt(e,t){if(Lt&&e.data instanceof Blob)return e.data.arrayBuffer().then(Ht).then(t);if(Rt&&(e.data instanceof ArrayBuffer||zt(e.data)))return t(Ht(e.data));Bt(e,!1,e=>{Ut||=new TextEncoder,t(Ut.encode(e))})}var Gt=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,Kt=typeof Uint8Array>`u`?[]:new Uint8Array(256);for(let e=0;e<64;e++)Kt[Gt.charCodeAt(e)]=e;var qt=e=>{let t=e.length*.75,n=e.length,r,i=0,a,o,s,c;e[e.length-1]===`=`&&(t--,e[e.length-2]===`=`&&t--);let l=new ArrayBuffer(t),u=new Uint8Array(l);for(r=0;r<n;r+=4)a=Kt[e.charCodeAt(r)],o=Kt[e.charCodeAt(r+1)],s=Kt[e.charCodeAt(r+2)],c=Kt[e.charCodeAt(r+3)],u[i++]=a<<2|o>>4,u[i++]=(o&15)<<4|s>>2,u[i++]=(s&3)<<6|c&63;return l},Jt=typeof ArrayBuffer==`function`,Yt=(e,t)=>{if(typeof e!=`string`)return{type:`message`,data:Xt(e,t)};let n=e.charAt(0);return n===`b`?{type:`message`,data:K(e.substring(1),t)}:Ft[n]?e.length>1?{type:Ft[n],data:e.substring(1)}:{type:Ft[n]}:It},K=(e,t)=>Jt?Xt(qt(e),t):{base64:!0,data:e},Xt=(e,t)=>{switch(t){case`blob`:return e instanceof Blob?e:new Blob([e]);default:return e instanceof ArrayBuffer?e:e.buffer}},Zt=``,Qt=(e,t)=>{let n=e.length,r=Array(n),i=0;e.forEach((e,a)=>{Bt(e,!1,e=>{r[a]=e,++i===n&&t(r.join(Zt))})})},$t=(e,t)=>{let n=e.split(Zt),r=[];for(let e=0;e<n.length;e++){let i=Yt(n[e],t);if(r.push(i),i.type===`error`)break}return r};function en(){return new TransformStream({transform(e,t){Wt(e,n=>{let r=n.length,i;if(r<126)i=new Uint8Array(1),new DataView(i.buffer).setUint8(0,r);else if(r<65536){i=new Uint8Array(3);let e=new DataView(i.buffer);e.setUint8(0,126),e.setUint16(1,r)}else{i=new Uint8Array(9);let e=new DataView(i.buffer);e.setUint8(0,127),e.setBigUint64(1,BigInt(r))}e.data&&typeof e.data!=`string`&&(i[0]|=128),t.enqueue(i),t.enqueue(n)})}})}var tn;function nn(e){return e.reduce((e,t)=>e+t.length,0)}function rn(e,t){if(e[0].length===t)return e.shift();let n=new Uint8Array(t),r=0;for(let i=0;i<t;i++)n[i]=e[0][r++],r===e[0].length&&(e.shift(),r=0);return e.length&&r<e[0].length&&(e[0]=e[0].slice(r)),n}function an(e,t){tn||=new TextDecoder;let n=[],r=0,i=-1,a=!1;return new TransformStream({transform(o,s){for(n.push(o);;){if(r===0){if(nn(n)<1)break;let e=rn(n,1);a=(e[0]&128)==128,i=e[0]&127,r=i<126?3:i===126?1:2}else if(r===1){if(nn(n)<2)break;let e=rn(n,2);i=new DataView(e.buffer,e.byteOffset,e.length).getUint16(0),r=3}else if(r===2){if(nn(n)<8)break;let e=rn(n,8),t=new DataView(e.buffer,e.byteOffset,e.length),a=t.getUint32(0);if(a>2**21-1){s.enqueue(It);break}i=a*2**32+t.getUint32(4),r=3}else{if(nn(n)<i)break;let e=rn(n,i);s.enqueue(Yt(a?e:tn.decode(e),t)),r=0}if(i===0||i>e){s.enqueue(It);break}}}})}function q(e){if(e)return on(e)}function on(e){for(var t in q.prototype)e[t]=q.prototype[t];return e}q.prototype.on=q.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks[`$`+e]=this._callbacks[`$`+e]||[]).push(t),this},q.prototype.once=function(e,t){function n(){this.off(e,n),t.apply(this,arguments)}return n.fn=t,this.on(e,n),this},q.prototype.off=q.prototype.removeListener=q.prototype.removeAllListeners=q.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var n=this._callbacks[`$`+e];if(!n)return this;if(arguments.length==1)return delete this._callbacks[`$`+e],this;for(var r,i=0;i<n.length;i++)if(r=n[i],r===t||r.fn===t){n.splice(i,1);break}return n.length===0&&delete this._callbacks[`$`+e],this},q.prototype.emit=function(e){this._callbacks=this._callbacks||{};for(var t=Array(arguments.length-1),n=this._callbacks[`$`+e],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(n){n=n.slice(0);for(var r=0,i=n.length;r<i;++r)n[r].apply(this,t)}return this},q.prototype.emitReserved=q.prototype.emit,q.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks[`$`+e]||[]},q.prototype.hasListeners=function(e){return!!this.listeners(e).length};var sn=typeof Promise==`function`&&typeof Promise.resolve==`function`?e=>Promise.resolve().then(e):(e,t)=>t(e,0),J=typeof self<`u`?self:typeof window<`u`?window:Function(`return this`)(),cn=`arraybuffer`;function ln(e,...t){return t.reduce((t,n)=>(e.hasOwnProperty(n)&&(t[n]=e[n]),t),{})}var un=J.setTimeout,dn=J.clearTimeout;function fn(e,t){t.useNativeTimers?(e.setTimeoutFn=un.bind(J),e.clearTimeoutFn=dn.bind(J)):(e.setTimeoutFn=J.setTimeout.bind(J),e.clearTimeoutFn=J.clearTimeout.bind(J))}var pn=1.33;function mn(e){return typeof e==`string`?hn(e):Math.ceil((e.byteLength||e.size)*pn)}function hn(e){let t=0,n=0;for(let r=0,i=e.length;r<i;r++)t=e.charCodeAt(r),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n}function gn(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function _n(e){let t=``;for(let n in e)e.hasOwnProperty(n)&&(t.length&&(t+=`&`),t+=encodeURIComponent(n)+`=`+encodeURIComponent(e[n]));return t}function vn(e){let t={},n=e.split(`&`);for(let e=0,r=n.length;e<r;e++){let r=n[e].split(`=`);t[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return t}var yn=class extends Error{constructor(e,t,n){super(e),this.description=t,this.context=n,this.type=`TransportError`}},bn=class extends q{constructor(e){super(),this.writable=!1,fn(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,n){return super.emitReserved(`error`,new yn(e,t,n)),this}open(){return this.readyState=`opening`,this.doOpen(),this}close(){return(this.readyState===`opening`||this.readyState===`open`)&&(this.doClose(),this.onClose()),this}send(e){this.readyState===`open`&&this.write(e)}onOpen(){this.readyState=`open`,this.writable=!0,super.emitReserved(`open`)}onData(e){let t=Yt(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved(`packet`,e)}onClose(e){this.readyState=`closed`,super.emitReserved(`close`,e)}pause(e){}createUri(e,t={}){return e+`://`+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){let e=this.opts.hostname;return e.indexOf(`:`)===-1?e:`[`+e+`]`}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?`:`+this.opts.port:``}_query(e){let t=_n(e);return t.length?`?`+t:``}},xn=class extends bn{constructor(){super(...arguments),this._polling=!1}get name(){return`polling`}doOpen(){this._poll()}pause(e){this.readyState=`pausing`;let t=()=>{this.readyState=`paused`,e()};if(this._polling||!this.writable){let e=0;this._polling&&(e++,this.once(`pollComplete`,function(){--e||t()})),this.writable||(e++,this.once(`drain`,function(){--e||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved(`poll`)}onData(e){$t(e,this.socket.binaryType).forEach(e=>{if(this.readyState===`opening`&&e.type===`open`&&this.onOpen(),e.type===`close`)return this.onClose({description:`transport closed by the server`}),!1;this.onPacket(e)}),this.readyState!==`closed`&&(this._polling=!1,this.emitReserved(`pollComplete`),this.readyState===`open`&&this._poll())}doClose(){let e=()=>{this.write([{type:`close`}])};this.readyState===`open`?e():this.once(`open`,e)}write(e){this.writable=!1,Qt(e,e=>{this.doWrite(e,()=>{this.writable=!0,this.emitReserved(`drain`)})})}uri(){let e=this.opts.secure?`https`:`http`,t=this.query||{};return!1!==this.opts.timestampRequests&&(t[this.opts.timestampParam]=gn()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}},Sn=!1;try{Sn=typeof XMLHttpRequest<`u`&&`withCredentials`in new XMLHttpRequest}catch{}var Cn=Sn;function wn(){}var Tn=class extends xn{constructor(e){if(super(e),typeof location<`u`){let t=location.protocol===`https:`,n=location.port;n||=t?`443`:`80`,this.xd=typeof location<`u`&&e.hostname!==location.hostname||n!==e.port}}doWrite(e,t){let n=this.request({method:`POST`,data:e});n.on(`success`,t),n.on(`error`,(e,t)=>{this.onError(`xhr post error`,e,t)})}doPoll(){let e=this.request();e.on(`data`,this.onData.bind(this)),e.on(`error`,(e,t)=>{this.onError(`xhr poll error`,e,t)}),this.pollXhr=e}},En=class e extends q{constructor(e,t,n){super(),this.createRequest=e,fn(this,n),this._opts=n,this._method=n.method||`GET`,this._uri=t,this._data=n.data===void 0?null:n.data,this._create()}_create(){var t;let n=ln(this._opts,`agent`,`pfx`,`key`,`passphrase`,`cert`,`ca`,`ciphers`,`rejectUnauthorized`,`autoUnref`);n.xdomain=!!this._opts.xd;let r=this._xhr=this.createRequest(n);try{r.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(let e in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(e)&&r.setRequestHeader(e,this._opts.extraHeaders[e])}}catch{}if(this._method===`POST`)try{r.setRequestHeader(`Content-type`,`text/plain;charset=UTF-8`)}catch{}try{r.setRequestHeader(`Accept`,`*/*`)}catch{}(t=this._opts.cookieJar)==null||t.addCookies(r),`withCredentials`in r&&(r.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(r.timeout=this._opts.requestTimeout),r.onreadystatechange=()=>{var e;r.readyState===3&&((e=this._opts.cookieJar)==null||e.parseCookies(r.getResponseHeader(`set-cookie`))),r.readyState===4&&(r.status===200||r.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof r.status==`number`?r.status:0)},0))},r.send(this._data)}catch(e){this.setTimeoutFn(()=>{this._onError(e)},0);return}typeof document<`u`&&(this._index=e.requestsCount++,e.requests[this._index]=this)}_onError(e){this.emitReserved(`error`,e,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(this._xhr===void 0||this._xhr===null)){if(this._xhr.onreadystatechange=wn,t)try{this._xhr.abort()}catch{}typeof document<`u`&&delete e.requests[this._index],this._xhr=null}}_onLoad(){let e=this._xhr.responseText;e!==null&&(this.emitReserved(`data`,e),this.emitReserved(`success`),this._cleanup())}abort(){this._cleanup()}};if(En.requestsCount=0,En.requests={},typeof document<`u`){if(typeof attachEvent==`function`)attachEvent(`onunload`,Dn);else if(typeof addEventListener==`function`){let e=`onpagehide`in J?`pagehide`:`unload`;addEventListener(e,Dn,!1)}}function Dn(){for(let e in En.requests)En.requests.hasOwnProperty(e)&&En.requests[e].abort()}var On=(function(){let e=An({xdomain:!1});return e&&e.responseType!==null})(),kn=class extends Tn{constructor(e){super(e);let t=e&&e.forceBase64;this.supportsBinary=On&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new En(An,this.uri(),e)}};function An(e){let t=e.xdomain;try{if(typeof XMLHttpRequest<`u`&&(!t||Cn))return new XMLHttpRequest}catch{}if(!t)try{return new J[[`Active`,`Object`].join(`X`)](`Microsoft.XMLHTTP`)}catch{}}var jn=typeof navigator<`u`&&typeof navigator.product==`string`&&navigator.product.toLowerCase()===`reactnative`,Mn=class extends bn{get name(){return`websocket`}doOpen(){let e=this.uri(),t=this.opts.protocols,n=jn?{}:ln(this.opts,`agent`,`perMessageDeflate`,`pfx`,`key`,`passphrase`,`cert`,`ca`,`ciphers`,`rejectUnauthorized`,`localAddress`,`protocolVersion`,`origin`,`maxPayload`,`family`,`checkServerIdentity`);this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,n)}catch(e){return this.emitReserved(`error`,e)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:`websocket connection closed`,context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError(`websocket error`,e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){let n=e[t],r=t===e.length-1;Bt(n,this.supportsBinary,e=>{try{this.doWrite(n,e)}catch{}r&&sn(()=>{this.writable=!0,this.emitReserved(`drain`)},this.setTimeoutFn)})}}doClose(){this.ws!==void 0&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){let e=this.opts.secure?`wss`:`ws`,t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=gn()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}},Nn=J.WebSocket||J.MozWebSocket,Pn={websocket:class extends Mn{createSocket(e,t,n){return jn?new Nn(e,t,n):t?new Nn(e,t):new Nn(e)}doWrite(e,t){this.ws.send(t)}},webtransport:class extends bn{get name(){return`webtransport`}doOpen(){try{this._transport=new WebTransport(this.createUri(`https`),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved(`error`,e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError(`webtransport error`,e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{let t=an(2**53-1,this.socket.binaryType),n=e.readable.pipeThrough(t).getReader(),r=en();r.readable.pipeTo(e.writable),this._writer=r.writable.getWriter();let i=()=>{n.read().then(({done:e,value:t})=>{e||(this.onPacket(t),i())}).catch(e=>{})};i();let a={type:`open`};this.query.sid&&(a.data=`{"sid":"${this.query.sid}"}`),this._writer.write(a).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){let n=e[t],r=t===e.length-1;this._writer.write(n).then(()=>{r&&sn(()=>{this.writable=!0,this.emitReserved(`drain`)},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)==null||e.close()}},polling:kn},Fn=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,In=[`source`,`protocol`,`authority`,`userInfo`,`user`,`password`,`host`,`port`,`relative`,`path`,`directory`,`file`,`query`,`anchor`];function Ln(e){if(e.length>8e3)throw`URI too long`;let t=e,n=e.indexOf(`[`),r=e.indexOf(`]`);n!=-1&&r!=-1&&(e=e.substring(0,n)+e.substring(n,r).replace(/:/g,`;`)+e.substring(r,e.length));let i=Fn.exec(e||``),a={},o=14;for(;o--;)a[In[o]]=i[o]||``;return n!=-1&&r!=-1&&(a.source=t,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,`:`),a.authority=a.authority.replace(`[`,``).replace(`]`,``).replace(/;/g,`:`),a.ipv6uri=!0),a.pathNames=Rn(a,a.path),a.queryKey=zn(a,a.query),a}function Rn(e,t){let n=t.replace(/\/{2,9}/g,`/`).split(`/`);return(t.slice(0,1)==`/`||t.length===0)&&n.splice(0,1),t.slice(-1)==`/`&&n.splice(n.length-1,1),n}function zn(e,t){let n={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(e,t,r){t&&(n[t]=r)}),n}var Bn=typeof addEventListener==`function`&&typeof removeEventListener==`function`,Vn=[];Bn&&addEventListener(`offline`,()=>{Vn.forEach(e=>e())},!1);var Hn=class e extends q{constructor(e,t){if(super(),this.binaryType=cn,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e==`object`&&(t=e,e=null),e){let n=Ln(e);t.hostname=n.host,t.secure=n.protocol===`https`||n.protocol===`wss`,t.port=n.port,n.query&&(t.query=n.query)}else t.host&&(t.hostname=Ln(t.host).host);fn(this,t),this.secure=t.secure==null?typeof location<`u`&&location.protocol===`https:`:t.secure,t.hostname&&!t.port&&(t.port=this.secure?`443`:`80`),this.hostname=t.hostname||(typeof location<`u`?location.hostname:`localhost`),this.port=t.port||(typeof location<`u`&&location.port?location.port:this.secure?`443`:`80`),this.transports=[],this._transportsByName={},t.transports.forEach(e=>{let t=e.prototype.name;this.transports.push(t),this._transportsByName[t]=e}),this.opts=Object.assign({path:`/engine.io`,agent:!1,withCredentials:!1,upgrade:!0,timestampParam:`t`,rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,``)+(this.opts.addTrailingSlash?`/`:``),typeof this.opts.query==`string`&&(this.opts.query=vn(this.opts.query)),Bn&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener(`beforeunload`,this._beforeunloadEventListener,!1)),this.hostname!==`localhost`&&(this._offlineEventListener=()=>{this._onClose(`transport close`,{description:`network connection lost`})},Vn.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){let t=Object.assign({},this.opts.query);t.EIO=4,t.transport=e,this.id&&(t.sid=this.id);let n=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](n)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved(`error`,`No transports available`)},0);return}let t=this.opts.rememberUpgrade&&e.priorWebsocketSuccess&&this.transports.indexOf(`websocket`)!==-1?`websocket`:this.transports[0];this.readyState=`opening`;let n=this.createTransport(t);n.open(),this.setTransport(n)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on(`drain`,this._onDrain.bind(this)).on(`packet`,this._onPacket.bind(this)).on(`error`,this._onError.bind(this)).on(`close`,e=>this._onClose(`transport close`,e))}onOpen(){this.readyState=`open`,e.priorWebsocketSuccess=this.transport.name===`websocket`,this.emitReserved(`open`),this.flush()}_onPacket(e){if(this.readyState===`opening`||this.readyState===`open`||this.readyState===`closing`)switch(this.emitReserved(`packet`,e),this.emitReserved(`heartbeat`),e.type){case`open`:this.onHandshake(JSON.parse(e.data));break;case`ping`:this._sendPacket(`pong`),this.emitReserved(`ping`),this.emitReserved(`pong`),this._resetPingTimeout();break;case`error`:let t=Error(`server error`);t.code=e.data,this._onError(t);break;case`message`:this.emitReserved(`data`,e.data),this.emitReserved(`message`,e.data);break}}onHandshake(e){this.emitReserved(`handshake`,e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!==`closed`&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);let e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose(`ping timeout`)},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved(`drain`):this.flush()}flush(){if(this.readyState!==`closed`&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){let e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved(`flush`)}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name===`polling`&&this.writeBuffer.length>1))return this.writeBuffer;let e=1;for(let t=0;t<this.writeBuffer.length;t++){let n=this.writeBuffer[t].data;if(n&&(e+=mn(n)),t>0&&e>this._maxPayload)return this.writeBuffer.slice(0,t);e+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;let e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,sn(()=>{this._onClose(`ping timeout`)},this.setTimeoutFn)),e}write(e,t,n){return this._sendPacket(`message`,e,t,n),this}send(e,t,n){return this._sendPacket(`message`,e,t,n),this}_sendPacket(e,t,n,r){if(typeof t==`function`&&(r=t,t=void 0),typeof n==`function`&&(r=n,n=null),this.readyState===`closing`||this.readyState===`closed`)return;n||={},n.compress=!1!==n.compress;let i={type:e,data:t,options:n};this.emitReserved(`packetCreate`,i),this.writeBuffer.push(i),r&&this.once(`flush`,r),this.flush()}close(){let e=()=>{this._onClose(`forced close`),this.transport.close()},t=()=>{this.off(`upgrade`,t),this.off(`upgradeError`,t),e()},n=()=>{this.once(`upgrade`,t),this.once(`upgradeError`,t)};return(this.readyState===`opening`||this.readyState===`open`)&&(this.readyState=`closing`,this.writeBuffer.length?this.once(`drain`,()=>{this.upgrading?n():e()}):this.upgrading?n():e()),this}_onError(t){if(e.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState===`opening`)return this.transports.shift(),this._open();this.emitReserved(`error`,t),this._onClose(`transport error`,t)}_onClose(e,t){if(this.readyState===`opening`||this.readyState===`open`||this.readyState===`closing`){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners(`close`),this.transport.close(),this.transport.removeAllListeners(),Bn&&(this._beforeunloadEventListener&&removeEventListener(`beforeunload`,this._beforeunloadEventListener,!1),this._offlineEventListener)){let e=Vn.indexOf(this._offlineEventListener);e!==-1&&Vn.splice(e,1)}this.readyState=`closed`,this.id=null,this.emitReserved(`close`,e,t),this.writeBuffer=[],this._prevBufferLen=0}}};Hn.protocol=4;var Un=class extends Hn{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState===`open`&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),n=!1;Hn.priorWebsocketSuccess=!1;let r=()=>{n||(t.send([{type:`ping`,data:`probe`}]),t.once(`packet`,e=>{if(!n)if(e.type===`pong`&&e.data===`probe`){if(this.upgrading=!0,this.emitReserved(`upgrading`,t),!t)return;Hn.priorWebsocketSuccess=t.name===`websocket`,this.transport.pause(()=>{n||this.readyState!==`closed`&&(l(),this.setTransport(t),t.send([{type:`upgrade`}]),this.emitReserved(`upgrade`,t),t=null,this.upgrading=!1,this.flush())})}else{let e=Error(`probe error`);e.transport=t.name,this.emitReserved(`upgradeError`,e)}}))};function i(){n||(n=!0,l(),t.close(),t=null)}let a=e=>{let n=Error(`probe error: `+e);n.transport=t.name,i(),this.emitReserved(`upgradeError`,n)};function o(){a(`transport closed`)}function s(){a(`socket closed`)}function c(e){t&&e.name!==t.name&&i()}let l=()=>{t.removeListener(`open`,r),t.removeListener(`error`,a),t.removeListener(`close`,o),this.off(`close`,s),this.off(`upgrading`,c)};t.once(`open`,r),t.once(`error`,a),t.once(`close`,o),this.once(`close`,s),this.once(`upgrading`,c),this._upgrades.indexOf(`webtransport`)!==-1&&e!==`webtransport`?this.setTimeoutFn(()=>{n||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){let t=[];for(let n=0;n<e.length;n++)~this.transports.indexOf(e[n])&&t.push(e[n]);return t}},Wn=class extends Un{constructor(e,t={}){let n=typeof e==`object`?e:t;(!n.transports||n.transports&&typeof n.transports[0]==`string`)&&(n.transports=(n.transports||[`polling`,`websocket`,`webtransport`]).map(e=>Pn[e]).filter(e=>!!e)),super(e,n)}};Wn.protocol;function Gn(e,t=``,n){let r=e;n||=typeof location<`u`&&location,e??=n.protocol+`//`+n.host,typeof e==`string`&&(e.charAt(0)===`/`&&(e=e.charAt(1)===`/`?n.protocol+e:n.host+e),/^(https?|wss?):\/\//.test(e)||(e=n===void 0?`https://`+e:n.protocol+`//`+e),r=Ln(e)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port=`80`:/^(http|ws)s$/.test(r.protocol)&&(r.port=`443`)),r.path=r.path||`/`;let i=r.host.indexOf(`:`)===-1?r.host:`[`+r.host+`]`;return r.id=r.protocol+`://`+i+`:`+r.port+t,r.href=r.protocol+`://`+i+(n&&n.port===r.port?``:`:`+r.port),r}var Kn=typeof ArrayBuffer==`function`,qn=e=>typeof ArrayBuffer.isView==`function`?ArrayBuffer.isView(e):e.buffer instanceof ArrayBuffer,Jn=Object.prototype.toString,Yn=typeof Blob==`function`||typeof Blob<`u`&&Jn.call(Blob)===`[object BlobConstructor]`,Xn=typeof File==`function`||typeof File<`u`&&Jn.call(File)===`[object FileConstructor]`;function Zn(e){return Kn&&(e instanceof ArrayBuffer||qn(e))||Yn&&e instanceof Blob||Xn&&e instanceof File}function Qn(e,t){if(!e||typeof e!=`object`)return!1;if(Array.isArray(e)){for(let t=0,n=e.length;t<n;t++)if(Qn(e[t]))return!0;return!1}if(Zn(e))return!0;if(e.toJSON&&typeof e.toJSON==`function`&&arguments.length===1)return Qn(e.toJSON(),!0);for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&Qn(e[t]))return!0;return!1}function $n(e){let t=[],n=e.data,r=e;return r.data=er(n,t),r.attachments=t.length,{packet:r,buffers:t}}function er(e,t){if(!e)return e;if(Zn(e)){let n={_placeholder:!0,num:t.length};return t.push(e),n}else if(Array.isArray(e)){let n=Array(e.length);for(let r=0;r<e.length;r++)n[r]=er(e[r],t);return n}else if(typeof e==`object`&&!(e instanceof Date)){let n={};for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=er(e[r],t));return n}return e}function tr(e,t){return e.data=nr(e.data,t),delete e.attachments,e}function nr(e,t){if(!e)return e;if(e&&e._placeholder===!0){if(typeof e.num==`number`&&e.num>=0&&e.num<t.length)return t[e.num];throw Error(`illegal attachments`)}else if(Array.isArray(e))for(let n=0;n<e.length;n++)e[n]=nr(e[n],t);else if(typeof e==`object`)for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&(e[n]=nr(e[n],t));return e}var rr=t({Decoder:()=>or,Encoder:()=>ar,PacketType:()=>Y,isPacketValid:()=>pr,protocol:()=>5}),ir=[`connect`,`connect_error`,`disconnect`,`disconnecting`,`newListener`,`removeListener`],Y;(function(e){e[e.CONNECT=0]=`CONNECT`,e[e.DISCONNECT=1]=`DISCONNECT`,e[e.EVENT=2]=`EVENT`,e[e.ACK=3]=`ACK`,e[e.CONNECT_ERROR=4]=`CONNECT_ERROR`,e[e.BINARY_EVENT=5]=`BINARY_EVENT`,e[e.BINARY_ACK=6]=`BINARY_ACK`})(Y||={});var ar=class{constructor(e){this.replacer=e}encode(e){return(e.type===Y.EVENT||e.type===Y.ACK)&&Qn(e)?this.encodeAsBinary({type:e.type===Y.EVENT?Y.BINARY_EVENT:Y.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=``+e.type;return(e.type===Y.BINARY_EVENT||e.type===Y.BINARY_ACK)&&(t+=e.attachments+`-`),e.nsp&&e.nsp!==`/`&&(t+=e.nsp+`,`),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){let t=$n(e),n=this.encodeAsString(t.packet),r=t.buffers;return r.unshift(n),r}},or=class e extends q{constructor(e){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof e==`function`?{reviver:e}:e)}add(e){let t;if(typeof e==`string`){if(this.reconstructor)throw Error(`got plaintext data when reconstructing a packet`);t=this.decodeString(e);let n=t.type===Y.BINARY_EVENT;n||t.type===Y.BINARY_ACK?(t.type=n?Y.EVENT:Y.ACK,this.reconstructor=new sr(t),t.attachments===0&&super.emitReserved(`decoded`,t)):super.emitReserved(`decoded`,t)}else if(Zn(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved(`decoded`,t));else throw Error(`got binary data when not reconstructing a packet`);else throw Error(`Unknown type: `+e)}decodeString(t){let n=0,r={type:Number(t.charAt(0))};if(Y[r.type]===void 0)throw Error(`unknown packet type `+r.type);if(r.type===Y.BINARY_EVENT||r.type===Y.BINARY_ACK){let e=n+1;for(;t.charAt(++n)!==`-`&&n!=t.length;);let i=t.substring(e,n);if(i!=Number(i)||t.charAt(n)!==`-`)throw Error(`Illegal attachments`);let a=Number(i);if(!lr(a)||a<0)throw Error(`Illegal attachments`);if(a>this.opts.maxAttachments)throw Error(`too many attachments`);r.attachments=a}if(t.charAt(n+1)===`/`){let e=n+1;for(;++n&&!(t.charAt(n)===`,`||n===t.length););r.nsp=t.substring(e,n)}else r.nsp=`/`;let i=t.charAt(n+1);if(i!==``&&Number(i)==i){let e=n+1;for(;++n;){let e=t.charAt(n);if(e==null||Number(e)!=e){--n;break}if(n===t.length)break}r.id=Number(t.substring(e,n+1))}if(t.charAt(++n)){let i=this.tryParse(t.substr(n));if(e.isPayloadValid(r.type,i))r.data=i;else throw Error(`invalid payload`)}return r}tryParse(e){try{return JSON.parse(e,this.opts.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case Y.CONNECT:return dr(t);case Y.DISCONNECT:return t===void 0;case Y.CONNECT_ERROR:return typeof t==`string`||dr(t);case Y.EVENT:case Y.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]==`number`||typeof t[0]==`string`&&ir.indexOf(t[0])===-1);case Y.ACK:case Y.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&=(this.reconstructor.finishedReconstruction(),null)}},sr=class{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){let e=tr(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}};function cr(e){return typeof e==`string`}var lr=Number.isInteger||function(e){return typeof e==`number`&&isFinite(e)&&Math.floor(e)===e};function ur(e){return e===void 0||lr(e)}function dr(e){return Object.prototype.toString.call(e)===`[object Object]`}function fr(e,t){switch(e){case Y.CONNECT:return t===void 0||dr(t);case Y.DISCONNECT:return t===void 0;case Y.EVENT:return Array.isArray(t)&&(typeof t[0]==`number`||typeof t[0]==`string`&&ir.indexOf(t[0])===-1);case Y.ACK:return Array.isArray(t);case Y.CONNECT_ERROR:return typeof t==`string`||dr(t);default:return!1}}function pr(e){return cr(e.nsp)&&ur(e.id)&&fr(e.type,e.data)}function X(e,t,n){return e.on(t,n),function(){e.off(t,n)}}var mr=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),hr=class extends q{constructor(e,t,n){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,n&&n.auth&&(this.auth=n.auth),this._opts=Object.assign({},n),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;let e=this.io;this.subs=[X(e,`open`,this.onopen.bind(this)),X(e,`packet`,this.onpacket.bind(this)),X(e,`error`,this.onerror.bind(this)),X(e,`close`,this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState===`open`&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift(`message`),this.emit.apply(this,e),this}emit(e,...t){if(mr.hasOwnProperty(e))throw Error(`"`+e.toString()+`" is a reserved event name`);if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;let n={type:Y.EVENT,data:t};if(n.options={},n.options.compress=this.flags.compress!==!1,typeof t[t.length-1]==`function`){let e=this.ids++,r=t.pop();this._registerAckCallback(e,r),n.id=e}let r=this.io.engine?.transport?.writable,i=this.connected&&!this.io.engine?._hasPingExpired();return this.flags.volatile&&!r||(i?(this.notifyOutgoingListeners(n),this.packet(n)):this.sendBuffer.push(n)),this.flags={},this}_registerAckCallback(e,t){let n=this.flags.timeout??this._opts.ackTimeout;if(n===void 0){this.acks[e]=t;return}let r=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let t=0;t<this.sendBuffer.length;t++)this.sendBuffer[t].id===e&&this.sendBuffer.splice(t,1);t.call(this,Error(`operation has timed out`))},n),i=(...e)=>{this.io.clearTimeoutFn(r),t.apply(this,e)};i.withError=!0,this.acks[e]=i}emitWithAck(e,...t){return new Promise((n,r)=>{let i=(e,t)=>e?r(e):n(t);i.withError=!0,t.push(i),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]==`function`&&(t=e.pop());let n={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((e,...r)=>(this._queue[0],e===null?(this._queue.shift(),t&&t(null,...r)):n.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(e)),n.pending=!1,this._drainQueue())),this._queue.push(n),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;let t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth==`function`?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:Y.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved(`connect_error`,e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved(`disconnect`,e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(t=>String(t.id)===e)){let t=this.acks[e];delete this.acks[e],t.withError&&t.call(this,Error(`socket has been disconnected`))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case Y.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved(`connect_error`,Error(`It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)`));break;case Y.EVENT:case Y.BINARY_EVENT:this.onevent(e);break;case Y.ACK:case Y.BINARY_ACK:this.onack(e);break;case Y.DISCONNECT:this.ondisconnect();break;case Y.CONNECT_ERROR:this.destroy();let t=Error(e.data.message);t.data=e.data.data,this.emitReserved(`connect_error`,t);break}}onevent(e){let t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){let t=this._anyListeners.slice();for(let n of t)n.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]==`string`&&(this._lastOffset=e[e.length-1])}ack(e){let t=this,n=!1;return function(...r){n||(n=!0,t.packet({type:Y.ACK,id:e,data:r}))}}onack(e){let t=this.acks[e.id];typeof t==`function`&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved(`connect`)}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose(`io server disconnect`)}destroy(){this.subs&&=(this.subs.forEach(e=>e()),void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Y.DISCONNECT}),this.destroy(),this.connected&&this.onclose(`io client disconnect`),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){let t=this._anyListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){let t=this._anyOutgoingListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){let t=this._anyOutgoingListeners.slice();for(let n of t)n.apply(this,e.data)}}};function gr(e){e||={},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0}gr.prototype.duration=function(){var e=this.ms*this.factor**+ this.attempts++;if(this.jitter){var t=Math.random(),n=Math.floor(t*this.jitter*e);e=Math.floor(t*10)&1?e+n:e-n}return Math.min(e,this.max)|0},gr.prototype.reset=function(){this.attempts=0},gr.prototype.setMin=function(e){this.ms=e},gr.prototype.setMax=function(e){this.max=e},gr.prototype.setJitter=function(e){this.jitter=e};var _r=class extends q{constructor(e,t){super(),this.nsps={},this.subs=[],e&&typeof e==`object`&&(t=e,e=void 0),t||={},t.path=t.path||`/socket.io`,this.opts=t,fn(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor(t.randomizationFactor??.5),this.backoff=new gr({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState=`closed`,this.uri=e;let n=t.parser||rr;this.encoder=new n.Encoder,this.decoder=new n.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)==null||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)==null||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)==null||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf(`open`))return this;this.engine=new Wn(this.uri,this.opts);let t=this.engine,n=this;this._readyState=`opening`,this.skipReconnect=!1;let r=X(t,`open`,function(){n.onopen(),e&&e()}),i=t=>{this.cleanup(),this._readyState=`closed`,this.emitReserved(`error`,t),e?e(t):this.maybeReconnectOnOpen()},a=X(t,`error`,i);if(!1!==this._timeout){let e=this._timeout,n=this.setTimeoutFn(()=>{r(),i(Error(`timeout`)),t.close()},e);this.opts.autoUnref&&n.unref(),this.subs.push(()=>{this.clearTimeoutFn(n)})}return this.subs.push(r),this.subs.push(a),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState=`open`,this.emitReserved(`open`);let e=this.engine;this.subs.push(X(e,`ping`,this.onping.bind(this)),X(e,`data`,this.ondata.bind(this)),X(e,`error`,this.onerror.bind(this)),X(e,`close`,this.onclose.bind(this)),X(this.decoder,`decoded`,this.ondecoded.bind(this)))}onping(){this.emitReserved(`ping`)}ondata(e){try{this.decoder.add(e)}catch(e){this.onclose(`parse error`,e)}}ondecoded(e){sn(()=>{this.emitReserved(`packet`,e)},this.setTimeoutFn)}onerror(e){this.emitReserved(`error`,e)}socket(e,t){let n=this.nsps[e];return n?this._autoConnect&&!n.active&&n.connect():(n=new hr(this,e,t),this.nsps[e]=n),n}_destroy(e){let t=Object.keys(this.nsps);for(let e of t)if(this.nsps[e].active)return;this._close()}_packet(e){let t=this.encoder.encode(e);for(let n=0;n<t.length;n++)this.engine.write(t[n],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose(`forced close`)}disconnect(){return this._close()}onclose(e,t){var n;this.cleanup(),(n=this.engine)==null||n.close(),this.backoff.reset(),this._readyState=`closed`,this.emitReserved(`close`,e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;let e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved(`reconnect_failed`),this._reconnecting=!1;else{let t=this.backoff.duration();this._reconnecting=!0;let n=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved(`reconnect_attempt`,e.backoff.attempts),!e.skipReconnect&&e.open(t=>{t?(e._reconnecting=!1,e.reconnect(),this.emitReserved(`reconnect_error`,t)):e.onreconnect()}))},t);this.opts.autoUnref&&n.unref(),this.subs.push(()=>{this.clearTimeoutFn(n)})}}onreconnect(){let e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved(`reconnect`,e)}},vr={};function yr(e,t){typeof e==`object`&&(t=e,e=void 0),t||={};let n=Gn(e,t.path||`/socket.io`),r=n.source,i=n.id,a=n.path,o=vr[i]&&a in vr[i].nsps,s=t.forceNew||t[`force new connection`]||!1===t.multiplex||o,c;return s?c=new _r(r,t):(vr[i]||(vr[i]=new _r(r,t)),c=vr[i]),n.query&&!t.query&&(t.query=n.queryKey),c.socket(n.path,t)}Object.assign(yr,{Manager:_r,Socket:hr,io:yr,connect:yr});function br(e){return!e||typeof e!=`string`?``:e.replace(/\/api\/?$/i,``).replace(/\/+$/,``)}var xr=br(`http://localhost:8001`),Sr=new class{constructor(){this.socket=null,this.listeners=new Set,this.activeConversationId=null}connect(){let e=f.getState().token;if(!e||this.socket&&this.socket.connected)return;try{this.socket=yr(`${xr}/chat`,{path:`/api/socket.io`,transports:[`websocket`,`polling`],auth:{token:e},query:{token:e},reconnection:!0,reconnectionDelay:2e3})}catch{return}this.socket.on(`connect`,()=>{this.activeConversationId&&this.socket.emit(`join`,{conversationId:this.activeConversationId})}),this.socket.on(`disconnect`,()=>{});let t=e=>t=>{let n={type:e===`typing`?`typing`:`message`,conversationId:t?.conversationId||t?.conversationId,data:t};(e===`new-message`||e===`new-message-notify`)&&(n.conversationId=t?.conversationId),this.listeners.forEach(e=>e(n))};this.socket.on(`new-message`,t(`new-message`)),this.socket.on(`new-message-notify`,t(`new-message-notify`)),this.socket.on(`typing`,t(`typing`))}join(e){this.activeConversationId=e,this.socket&&this.socket.connected&&e&&this.socket.emit(`join`,{conversationId:e})}send(e){!this.socket||!this.socket.connected||(e?.type===`typing`&&e.conversationId?this.socket.emit(`typing`,{conversationId:e.conversationId}):e?.type===`send-message`&&this.socket.emit(`send-message`,{conversationId:e.conversationId,content:e.content,attachment:e.attachment}))}on(e){return this.listeners.add(e),()=>this.listeners.delete(e)}close(){if(this.socket)try{this.socket.disconnect()}catch{}this.socket=null,this.activeConversationId=null}};f.subscribe(e=>{e.token?Sr.connect():Sr.close()}),f.getState().token&&setTimeout(()=>Sr.connect(),100);function Cr(e){if(!e)return``;let t=P(e.url),n=P(e.name||`file`);return e.type===`image`?`<a href="${t}" target="_blank" rel="noopener"><img src="${t}" alt="${n}" style="max-width:240px;max-height:200px;border-radius:10px;display:block;margin-top:4px"/></a>`:`<a href="${t}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.5rem;padding:.5rem .75rem;background:rgba(255,255,255,.15);border-radius:10px;color:inherit;margin-top:4px"><i class="fa-solid ${e.type===`video`?`fa-film`:`fa-paperclip`}"></i><span style="text-decoration:underline">${n}</span><span style="opacity:.7;font-size:.8rem">${e.size?Math.round(e.size/1024)+` KB`:``}</span></a>`}async function wr({mount:e,params:t}){let n=f.getState().user,r=t.id||null;e.innerHTML=`
    <div class="container page">
      <h1 class="page-title">Chat <span class="badge badge-success" id="ws-status" style="vertical-align:middle;font-size:.7rem"><i class="fa-solid fa-circle" style="font-size:.5em"></i> Real-time</span></h1>
      <div class="chat-wrap mt-2">
        <aside class="conv-list">
          <div class="conv-search"><input class="input" id="conv-search" placeholder="Cari percakapan..." data-testid="conv-search"></div>
          <div class="conv-items" id="conv-items" data-testid="conv-items"></div>
        </aside>
        <section class="chat-room" id="chat-room">
          ${r?`<div class="spinner"></div>`:`<div class="empty"><i class="fa-solid fa-comments"></i><h3>Pilih percakapan</h3><p>Pilih dari daftar untuk mulai chat</p></div>`}
        </section>
      </div>
    </div>`,Sr.connect(),r&&Sr.join(r);let i=[];try{i=await R.get(`/conversations`)}catch(e){F(e.message,`error`);return}let a=(e=``)=>{let t=document.getElementById(`conv-items`);if(!t)return;let n=i.filter(t=>!e||(t.other?.name||``).toLowerCase().includes(e.toLowerCase()));if(!n.length){t.innerHTML=B(`Belum ada percakapan`,`Mulai chat dari halaman jasa`,`fa-comment`);return}t.innerHTML=n.map(e=>`
      <a class="conv-item ${r===e.id?`active`:``}" href="#/chat/${e.id}" data-testid="conv-${e.id}">
        ${V(e.other,`sm`)}
        <div class="body">
          <div class="name"><span>${P(e.other?.name||``)}</span>${e.unread?`<span class="unread">${e.unread}</span>`:`<span class="text-xs text-muted">${M(e.updatedAt)}</span>`}</div>
          <div class="last">${P(e.lastMessage||`Belum ada pesan`)}</div>
        </div>
      </a>`).join(``)};if(a(),document.getElementById(`conv-search`).addEventListener(`input`,e=>a(e.target.value)),!r){let e=Sr.on(async e=>{if(e.type===`message`)try{i=await R.get(`/conversations`),a(document.getElementById(`conv-search`).value)}catch{}});return()=>e()}let o=i.find(e=>e.id===r);if(!o){document.getElementById(`chat-room`).innerHTML=B(`Percakapan tidak ditemukan`);return}let s=[];try{s=await R.get(`/conversations/${r}/messages`)}catch(e){document.getElementById(`chat-room`).innerHTML=B(`Gagal memuat`,e.message);return}let c=document.getElementById(`chat-room`);c.innerHTML=`
    <div class="chat-header">
      ${V(o.other)}
      <div style="flex:1"><strong>${P(o.other?.name||``)}</strong><div class="text-xs text-muted" id="typing-ind">${P(o.other?.bio||``)}</div></div>
    </div>
    <div class="chat-messages" id="msgs" data-testid="msgs"></div>
    <form class="chat-input" id="msg-form">
      <input type="file" id="file-input" style="display:none" accept="image/*,video/*,application/pdf" data-testid="file-input">
      <button type="button" class="btn btn-ghost btn-sm" id="attach-btn" data-testid="attach-btn" title="Lampirkan file"><i class="fa-solid fa-paperclip"></i></button>
      <input class="input" id="msg-text" placeholder="Tulis pesan..." data-testid="msg-input" autocomplete="off">
      <button class="btn btn-primary" type="submit" data-testid="msg-send-btn"><i class="fa-solid fa-paper-plane"></i></button>
    </form>
    <div id="upload-preview" style="display:none;padding:.5rem 1rem;border-top:1px solid var(--border);font-size:.85rem"></div>`;let l=()=>{let e=document.getElementById(`msgs`);e&&(e.innerHTML=s.map(e=>{let t=e.senderId||e.fromUserId,r=e.content||e.text||``,i=e.attachment?Cr(e.attachment):``,a=r?`<div>${P(r)}</div>`:``;return`<div class="msg ${t===n.id?`msg-mine`:`msg-other`}" data-testid="msg-bubble">${a}${i}<span class="time">${nt(e.createdAt)}</span></div>`}).join(``),e.scrollTop=e.scrollHeight)};l();let u=null,d=document.getElementById(`file-input`),p=document.getElementById(`attach-btn`),m=document.getElementById(`upload-preview`);p.addEventListener(`click`,()=>d.click()),d.addEventListener(`change`,async e=>{let t=e.target.files[0];if(t){m.style.display=`block`,m.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Mengupload ${P(t.name)}...`;try{u=await wt(t,`chat`),m.innerHTML=`<i class="fa-solid fa-paperclip"></i> Siap dikirim: <strong>${P(u.name)}</strong> <button type="button" class="btn btn-ghost btn-sm" id="att-clear">✕</button>`,document.getElementById(`att-clear`).addEventListener(`click`,()=>{u=null,m.style.display=`none`,d.value=``})}catch(e){F(e.message,`error`),m.style.display=`none`,u=null}}});let h=document.getElementById(`msg-text`),g;h.addEventListener(`input`,()=>{clearTimeout(g),Sr.send({type:`typing`,conversationId:r}),g=setTimeout(()=>{},1500)}),document.getElementById(`msg-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=h.value.trim();if(!t&&!u){F(`Pesan tidak boleh kosong`,`warning`);return}h.value=``;try{let e=await R.post(`/chat/conversations/${r}/messages`,{content:t,attachment:u});s.push(e.message||e),l(),u=null,m.style.display=`none`,d.value=``}catch(e){F(e.message,`error`),h.value=t}});let _,ee=Sr.on(e=>{if(e.type===`message`&&e.conversationId===r)s.push(e.data),l();else if(e.type===`typing`&&e.conversationId===r){let e=document.getElementById(`typing-ind`);e&&(e.innerHTML=`<i class="fa-solid fa-pencil"></i> sedang mengetik...`,clearTimeout(_),_=setTimeout(()=>{e.innerHTML=P(o.other?.bio||``)},2500))}});return console.log(`Conversations with others:`,i.map(e=>({id:e.id,otherName:e.other?.name,otherId:e.other?.id}))),()=>ee()}var Tr=[`WAITING_CONFIRMATION`,`PAID`,`WAITING_REVIEW`,`REJECTED`,`ACCEPTED`,`IN_PROGRESS`,`IN_REVIEW`,`REVISION_REQUESTED`],Er=null;function Dr(e,t={}){let{width:n=520,height:r=200,barColor:i=`#0a66c2`,valueFormatter:a=e=>e}=t;if(!e||!e.length)return`<p class="text-muted" style="text-align:center;padding:24px">Belum ada data untuk ditampilkan.</p>`;let o={top:16,right:12,bottom:32,left:12},s=n-o.left-o.right,c=r-o.top-o.bottom,l=Math.max(...e.map(e=>e.value),1),u=s/e.length,d=Math.min(u*.6,48),f=e.map((e,t)=>{let n=Math.round(e.value/l*c),s=o.left+t*u+(u-d)/2,f=o.top+(c-n),p=r-o.bottom+18,m=f-6;return`
        <g>
          <rect x="${s}" y="${f}" width="${d}" height="${n}" rx="4" fill="${i}">
            <title>${P(String(e.label))}: ${P(String(a(e.value)))}</title>
          </rect>
          ${e.value>0?`<text x="${s+d/2}" y="${m}" text-anchor="middle" font-size="10" fill="#666">${P(String(a(e.value)))}</text>`:``}
          <text x="${s+d/2}" y="${p}" text-anchor="middle" font-size="11" fill="#888">${P(String(e.label))}</text>
        </g>`}).join(``);return`
    <svg viewBox="0 0 ${n} ${r}" width="100%" height="${r}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Grafik batang">
      <line x1="${o.left}" y1="${o.top+c}" x2="${n-o.right}" y2="${o.top+c}" stroke="#e0e0e0" stroke-width="1"/>
      ${f}
    </svg>`}function Or(e,t){let n=new Date,r=[];for(let e=5;e>=0;e--){let t=new Date(n.getFullYear(),n.getMonth()-e,1);r.push({key:`${t.getFullYear()}-${t.getMonth()}`,label:t.toLocaleDateString(`id-ID`,{month:`short`}),value:0})}let i={};return r.forEach(e=>i[e.key]=e),e.forEach(e=>{let n=e.completedAt||e.createdAt;if(!n)return;let r=new Date(n),a=`${r.getFullYear()}-${r.getMonth()}`;i[a]&&(i[a].value+=t===`earnings`?e.amount||0:1)}),r}function kr(e){let t=f.getState().user,n=(t,n,r,i)=>`<a class="side-link ${e===t?`active`:``}" href="#/dashboard/${t}" data-nav="${t}" data-testid="${i}">
       <i class="fa-solid ${n}"></i> ${r}
     </a>`;return`<aside class="dash-side">
    <div class="who">
      ${V(t,`lg`)}
      <div><div class="name">${P(t.name)}</div><div class="role">${t.role===`ADMIN`?`Admin`:`Anggota TOLONGIN`}</div></div>
    </div>
    <div class="side-group">
      ${n(`overview`,`fa-gauge`,`Overview`,`side-overview`)}
    </div>
    <div class="side-group">
      <div class="side-label">Aktivitas Saya</div>
      ${n(`transactions`,`fa-receipt`,`Transaksi`,`side-transactions`)}
      ${n(`my-applications`,`fa-file-circle-check`,`Lamaran Saya`,`side-applications`)}
      ${n(`favorites`,`fa-heart`,`Favorit`,`side-favorites`)}
    </div>
    <div class="side-group">
      <div class="side-label">Saya Menawarkan</div>
      ${n(`manage-services`,`fa-box`,`Kelola Jasa`,`side-manage-services`)}
      ${n(`manage-jobs`,`fa-folder-open`,`Kelola Lowongan`,`side-manage-jobs`)}
    </div>
    <div class="side-group">
      <div class="side-label">Keuangan</div>
      ${n(`earnings`,`fa-coins`,`Keuangan`,`side-earnings`)}
    </div>
    <div class="side-group">
      <div class="side-label">Akun Saya</div>
      ${n(`account`,`fa-user-circle`,`Profil & Pengaturan`,`side-account`)}
    </div>
  </aside>`}function Ar(){let e=document.getElementById(`upload-zone`),t=document.getElementById(`imageFile`);document.getElementById(`imageUrl`),document.getElementById(`image-preview`),document.getElementById(`preview-img`);let n=document.getElementById(`remove-image`),r=document.getElementById(`upload-status`);if(!r&&e&&(r=document.createElement(`div`),r.id=`upload-status`,r.style.cssText=`margin-top:8px; font-size:12px; color:#666; display:none;`,e.parentNode.appendChild(r)),e){let t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),t.addEventListener(`click`,()=>{let e=document.getElementById(`imageFile`);e&&e.click()})}if(t){let e=t.cloneNode(!0);t.parentNode.replaceChild(e,t),e.addEventListener(`change`,async e=>{let t=e.target.files[0];if(!t)return;if(!t.type.startsWith(`image/`)){F(`File harus berupa gambar`,`error`);return}if(t.size>2*1024*1024){F(`Ukuran file maksimal 2MB`,`error`);return}let n=document.getElementById(`preview-img`),r=document.getElementById(`image-preview`),i=document.getElementById(`upload-zone`),a=document.getElementById(`imageUrl`),o=document.getElementById(`upload-status`),s=new FileReader;s.onload=e=>{n&&(n.src=e.target.result),r&&(r.style.display=`block`),i&&(i.style.display=`none`)},s.readAsDataURL(t),o&&(o.style.display=`block`,o.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Mengupload gambar...`);try{let e=new FormData;e.append(`file`,t);let n=await R.post(`/uploads?folder=services`,e),r=n.url||n.secure_url||n.fileUrl;a&&(a.value=r),o&&(o.innerHTML=`<i class="fa-solid fa-check-circle" style="color:#10b981;"></i> Gambar berhasil diupload!`,setTimeout(()=>{o&&(o.style.display=`none`)},2e3))}catch(e){console.error(`Upload error:`,e),o&&(o.innerHTML=`<i class="fa-solid fa-exclamation-circle" style="color:#ef4444;"></i> Gagal upload gambar`),F(`Gagal upload gambar: `+(e.message||`Coba lagi`),`error`);let t=document.getElementById(`image-preview`),n=document.getElementById(`upload-zone`);t&&(t.style.display=`none`),n&&(n.style.display=`block`)}})}if(n){let e=n.cloneNode(!0);n.parentNode.replaceChild(e,n),e.addEventListener(`click`,()=>{let e=document.getElementById(`image-preview`),t=document.getElementById(`upload-zone`),n=document.getElementById(`imageUrl`),r=document.getElementById(`imageFile`),i=document.getElementById(`upload-status`);e&&(e.style.display=`none`),t&&(t.style.display=`block`),n&&(n.value=``),r&&(r.value=``),i&&(i.style.display=`none`)})}}async function jr(e,t){Er||=t.querySelector(`section`);let n=Er;if(n){n.innerHTML=`<div class="spinner"></div>`;try{let t=location.hash.replace(/^#?\/dashboard\/?/,``).split(`/`).filter(Boolean),r=t[1],i=t[2];switch(e){case`overview`:await Nr(n);break;case`transactions`:await Pr(n);break;case`manage-services`:r===`new`?await Fr(n,{openForm:`create`}):r===`edit`&&i?await Fr(n,{openForm:`edit`,id:i}):await Fr(n);break;case`manage-jobs`:r===`new`?await Ir(n,{openForm:`create`}):r===`edit`&&i?await Ir(n,{openForm:`edit`,id:i}):await Ir(n);break;case`my-applications`:await Mr(n);break;case`favorites`:await Lr(n);break;case`earnings`:await Rr(n);break;case`account`:await zr(n);break;default:await Nr(n)}}catch(e){console.error(`Load dashboard content error:`,e),n.innerHTML=B(`Gagal memuat`,e.message)}}}async function Mr(e){try{let t=await R.get(`/applications/seller`),n=Array.isArray(t)?t:t?.data||[];e.innerHTML=`
      <div class="page-header"><h1 class="page-title">Lamaran Saya</h1>
        <p class="page-subtitle">Lacak status semua lamaran kerja yang Anda kirim</p>
      </div>
      ${n.length===0?B(`Belum ada lamaran`,`Mulai lamar pekerjaan di halaman Cari Kerja.`,`fa-file-circle-check`):``}
      <div class="grid" style="grid-template-columns:1fr; gap:12px;">
        ${n.map(e=>`
          <div class="card card-pad" data-testid="application-${e.id}">
            <div class="flex-between" style="align-items:flex-start; gap:1rem;">
              <div style="flex:1; min-width:0;">
                <div class="flex gap-sm mb-1">${H(e.status)}<span class="text-xs text-muted">${e.createdAt?new Date(e.createdAt).toLocaleDateString(`id-ID`):``}</span></div>
                <h3 style="margin:.2rem 0;"><a href="#/jobs/${e.jobId}" style="color:inherit; text-decoration:none;">${P(e.job?.title||`Pekerjaan`)}</a></h3>
                <div class="text-sm text-muted" style="margin-bottom:.5rem;">${P((e.coverLetter||``).slice(0,160))}${(e.coverLetter||``).length>160?`…`:``}</div>
                <div class="flex gap-md text-sm">
                  <span><i class="fa-solid fa-money-bill-wave"></i> ${j(e.proposedPrice)}</span>
                  <span><i class="fa-solid fa-clock"></i> ${e.proposedDuration} hari</span>
                </div>
              </div>
              <div class="flex gap-sm" style="flex-direction:column; align-items:stretch;">
                <a class="btn btn-secondary btn-sm" href="#/jobs/${e.jobId}">Lihat Pekerjaan</a>
                ${e.status===`ACCEPTED`?`<a class="btn btn-primary btn-sm" href="#/chat/${e.job?.buyerId||e.buyerId||``}">Chat Pemilik</a>`:``}
              </div>
            </div>
          </div>`).join(``)}
      </div>`}catch(t){e.innerHTML=B(`Gagal memuat lamaran`,t.message)}}async function Nr(e){let t=f.getState().user;try{let n=await R.get(`/orders`),r=n.filter(e=>e.buyerId===t.id),i=n.filter(e=>e.sellerId===t.id),a=r.filter(e=>e.status===`COMPLETED`),o=i.filter(e=>e.status===`COMPLETED`),s=a.reduce((e,t)=>e+(t.amount||0),0),c=o.reduce((e,t)=>e+(t.amount||0)*.95,0),l=r.filter(e=>Tr.includes(String(e.status).toUpperCase())).length,u=i.filter(e=>Tr.includes(String(e.status).toUpperCase())).length,d=(t.rating||0).toFixed(1),f=Or(o,`earnings`),p=Or(r,`count`),m=f.some(e=>e.value>0),h=p.some(e=>e.value>0);e.innerHTML=`
      <div class="page-header">
        <div>
          <h1 class="page-title">Halo, ${P(t.name.split(` `)[0])}! <span aria-hidden="true">👋</span></h1>
          <p class="page-subtitle">Berikut ringkasan aktivitas Anda</p>
        </div>
      </div>
      <div class="kpis" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:1rem; margin-bottom:1.5rem;">
        <div class="kpi" data-testid="kpi-completed-buyer" style="background:#fff; border-radius:16px; padding:1.25rem; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <div class="ic" style="font-size:2rem; color:#0a66c2;"><i class="fa-solid fa-bag-shopping"></i></div>
          <div class="v" style="font-size:1.8rem; font-weight:700;">${a.length}</div>
          <div class="l" style="color:#666; font-size:0.85rem;">Pesanan Selesai (Pembeli)</div>
        </div>
        <div class="kpi" data-testid="kpi-spent" style="background:#fff; border-radius:16px; padding:1.25rem; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <div class="ic" style="font-size:2rem; color:#2e7d32;"><i class="fa-solid fa-money-bill-wave"></i></div>
          <div class="v" style="font-size:1.4rem; font-weight:700;">${j(s)}</div>
          <div class="l" style="color:#666; font-size:0.85rem;">Total Belanja</div>
        </div>
        <div class="kpi" data-testid="kpi-earned" style="background:#fff; border-radius:16px; padding:1.25rem; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <div class="ic" style="font-size:2rem; color:#7c3aed;"><i class="fa-solid fa-coins"></i></div>
          <div class="v" style="font-size:1.4rem; font-weight:700;">${j(c)}</div>
          <div class="l" style="color:#666; font-size:0.85rem;">Penghasilan (Penjual)</div>
        </div>
        <div class="kpi" data-testid="kpi-rating" style="background:#fff; border-radius:16px; padding:1.25rem; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <div class="ic" style="font-size:2rem; color:#f5b042;"><i class="fa-solid fa-star"></i></div>
          <div class="v" style="font-size:1.8rem; font-weight:700;">${d}</div>
          <div class="l" style="color:#666; font-size:0.85rem;">Rating Anda</div>
        </div>
        <div class="kpi" data-testid="kpi-pending" style="background:#fff; border-radius:16px; padding:1.25rem; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <div class="ic" style="font-size:2rem; color:#f59e0b;"><i class="fa-solid fa-hourglass-half"></i></div>
          <div class="v" style="font-size:1.8rem; font-weight:700;">${l+u}</div>
          <div class="l" style="color:#666; font-size:0.85rem;">Pesanan Aktif</div>
        </div>
      </div>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1rem;margin-top:1rem">
        <div class="card card-pad-lg">
          <h3 style="margin:0 0 .25rem"><i class="fa-solid fa-chart-column"></i> Pendapatan 6 Bulan Terakhir</h3>
          <p class="text-muted text-sm" style="margin:0 0 .5rem">Dari pesanan yang selesai sebagai penjual</p>
          ${m?Dr(f,{barColor:`#2e7d32`,valueFormatter:e=>e>=1e3?Math.round(e/1e3)+`k`:e}):`<p class="text-muted" style="text-align:center;padding:24px">Belum ada pendapatan.</p>`}
        </div>
        <div class="card card-pad-lg">
          <h3 style="margin:0 0 .25rem"><i class="fa-solid fa-chart-simple"></i> Pesanan 6 Bulan Terakhir</h3>
          <p class="text-muted text-sm" style="margin:0 0 .5rem">Jumlah pesanan Anda sebagai pembeli</p>
          ${h?Dr(p,{barColor:`#0a66c2`}):`<p class="text-muted" style="text-align:center;padding:24px">Belum ada pesanan.</p>`}
        </div>
      </div>
      <div class="card card-pad-lg mt-3">
        <h3>Pesanan Terbaru</h3>
        ${n.slice(0,5).length?`
        <div class="scroll-x"><table class="tbl">
          <thead><tr><th>Order</th><th>Peran</th><th>Status</th><th>Total</th><th></th></tr></thead>
          <tbody>${n.slice(0,5).map(e=>`
            <tr data-testid="recent-order-${e.id}">
              <td><a href="#/orders/${e.id}" style="text-decoration:none;">${P(e.title)}</a></td>
              <td><span class="badge ${e.buyerId===t.id?`badge-info`:`badge-success`}">${e.buyerId===t.id?`Pembeli`:`Penjual`}</span></td>
              <td>${H(e.status)}</td>
              <td>${j(e.amount)}</td>
              <td><a class="btn btn-secondary btn-sm" href="#/orders/${e.id}">Lihat</a></td>
            </tr>
          `).join(``)}</tbody>
        </table></div>`:B(`Belum ada pesanan`,`Mulai dari Marketplace atau Cari Kerja`,`fa-receipt`)}
      </div>
    `}catch(t){e.innerHTML=B(`Gagal memuat`,t.message)}}async function Pr(e){f.getState().user;try{let[t,n]=await Promise.all([R.get(`/orders?role=buyer`),R.get(`/orders?role=seller`)]);e.innerHTML=`
      <div class="page-header">
        <h1 class="page-title">Transaksi</h1>
        <p class="page-subtitle">Semua pesanan Anda sebagai pembeli dan penjual</p>
      </div>
      <div style="margin-bottom:1.5rem;">
        <div style="display:flex; gap:8px; border-bottom:1px solid #e0e0e0;">
          <button class="trans-tab-btn active" data-tab="buyer" style="padding:10px 16px; background:none; border:none; cursor:pointer; font-weight:600; color:#0a66c2; border-bottom:2px solid #0a66c2;">
            <i class="fa-solid fa-shopping-cart"></i> Sebagai Pembeli (${t.length})
          </button>
          <button class="trans-tab-btn" data-tab="seller" style="padding:10px 16px; background:none; border:none; cursor:pointer; font-weight:600; color:#666;">
            <i class="fa-solid fa-store"></i> Sebagai Penjual (${n.length})
          </button>
        </div>
        <div id="buyer-orders" class="trans-content" style="margin-top:1rem;">
          ${t.length?`
            <div class="scroll-x"><table class="tbl">
              <thead><tr><th>Order</th><th>Status</th><th>Total</th><th></th></tr></thead>
              <tbody>${t.map(e=>`
                <tr>
                  <td>${P(e.title)}</td>
                  <td>${H(e.status)}</td>
                  <td>${j(e.amount)}</td>
                  <td><a class="btn btn-secondary btn-sm" href="#/orders/${e.id}">Detail</a></td>
                </tr>
              `).join(``)}</tbody>
            </table></div>
          `:B(`Belum ada pesanan sebagai pembeli`)}
        </div>
        <div id="seller-orders" class="trans-content" style="display:none; margin-top:1rem;">
          ${n.length?`
            <div class="scroll-x"><table class="tbl">
              <thead><tr><th>Order</th><th>Pembeli</th><th>Status</th><th>Total</th><th></th></tr></thead>
              <tbody>${n.map(e=>`
                <tr>
                  <td>${P(e.title)}</td>
                  <td>${P(e.buyer?.name)}</td>
                  <td>${H(e.status)}</td>
                  <td>${j(e.amount)}</td>
                  <td><a class="btn btn-secondary btn-sm" href="#/orders/${e.id}">Kelola</a></td>
                </tr>
              `).join(``)}</tbody>
            </table></div>
          `:B(`Belum ada pesanan sebagai penjual`)}
        </div>
      </div>
    `;let r=e.querySelectorAll(`.trans-tab-btn`);r.forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.tab;r.forEach(e=>{e.classList.remove(`active`),e.style.color=`#666`,e.style.borderBottom=`none`}),t.classList.add(`active`),t.style.color=`#0a66c2`,t.style.borderBottom=`2px solid #0a66c2`;let i=e.querySelector(`#buyer-orders`),a=e.querySelector(`#seller-orders`);i&&(i.style.display=n===`buyer`?`block`:`none`),a&&(a.style.display=n===`seller`?`block`:`none`)})})}catch(t){e.innerHTML=B(`Gagal`,t.message)}}async function Fr(e,t={}){await Vr(e,t)}async function Ir(e,t={}){await Br(e,t)}async function Lr(e){try{let t=await R.get(`/favorites`);e.innerHTML=`
      <div class="page-header"><h1 class="page-title">Freelancer Favorit</h1></div>
      ${t.length?`<div class="grid grid-3">${t.map(e=>_t(e,{favorited:!0})).join(``)}</div>`:B(`Belum ada favorit`,`Tambahkan jasa ke favorit dari marketplace`)}
    `}catch(t){e.innerHTML=B(`Gagal`,t.message)}}async function Rr(e){try{let t=await R.get(`/orders?role=seller`),n=t.filter(e=>e.status===`COMPLETED`),r=t.filter(e=>Tr.includes(String(e.status).toUpperCase()));e.innerHTML=`
      <div class="page-header"><h1 class="page-title">Keuangan</h1></div>
      <div class="kpis" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:1rem;">
        <div class="kpi" style="background:#fff; border-radius:16px; padding:1.25rem; text-align:center;">
          <div class="ic"><i class="fa-solid fa-wallet" style="font-size:2rem; color:#2e7d32;"></i></div>
          <div class="v" style="font-size:1.8rem; font-weight:700;">${j(n.reduce((e,t)=>e+(t.amount||0)*.95,0))}</div>
          <div class="l">Saldo Tersedia</div>
        </div>
        <div class="kpi" style="background:#fff; border-radius:16px; padding:1.25rem; text-align:center;">
          <div class="ic"><i class="fa-solid fa-hourglass" style="font-size:2rem; color:#f59e0b;"></i></div>
          <div class="v" style="font-size:1.8rem; font-weight:700;">${j(r.reduce((e,t)=>e+(t.amount||0)*.95,0))}</div>
          <div class="l">Pending</div>
        </div>
        <div class="kpi" style="background:#fff; border-radius:16px; padding:1.25rem; text-align:center;">
          <div class="ic"><i class="fa-solid fa-trophy" style="font-size:2rem; color:#0a66c2;"></i></div>
          <div class="v" style="font-size:1.8rem; font-weight:700;">${n.length}</div>
          <div class="l">Pesanan Selesai</div>
        </div>
      </div>
      <div class="card card-pad-lg mt-3 flex-between">
        <div><h3>Tarik Penghasilan</h3><p class="text-muted">Withdraw ke rekening bank Anda</p></div>
        <button class="btn btn-primary" onclick="window.dispatchEvent(new CustomEvent('toast', {detail: {type: 'info', text: 'Fitur withdraw demo - hubungi support'}}))">
          <i class="fa-solid fa-money-bill-transfer"></i> Tarik Sekarang
        </button>
      </div>
    `}catch(t){e.innerHTML=B(`Gagal`,t.message)}}async function zr(e){let t=f.getState().user;e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Akun Saya</h1>
      <p class="page-subtitle">Profil publik, verifikasi, dan pengaturan akun</p>
    </div>

    <div class="card card-pad-lg" style="margin-bottom:1rem">
      <div class="flex gap-md" style="align-items:center">
        ${V(t,`xl`)}
        <div style="flex:1">
          <div style="font-size:1.25rem; font-weight:700">${P(t.name)}</div>
          <div class="text-sm text-muted">${P(t.email)}</div>
          <div class="text-sm text-muted">${P(t.city||`Lokasi belum diisi`)}</div>
        </div>
        <div class="flex gap-sm">
          <a class="btn btn-secondary btn-sm" href="#/profile/${t.id}" data-testid="view-public-profile"><i class="fa-solid fa-arrow-up-right-from-square"></i> Lihat Profil Publik</a>
        </div>
      </div>
    </div>

    <div class="grid grid-3" style="gap:1rem">
      <a href="#/profile" class="card card-pad card-hover" data-testid="account-edit-profile" style="text-decoration:none; color:inherit">
        <div style="font-size:1.5rem; color:var(--primary)"><i class="fa-solid fa-user-pen"></i></div>
        <h3 style="margin:.5rem 0 .25rem">Edit Profil</h3>
        <div class="text-sm text-muted">Perbarui nama, bio, foto, kota & skill</div>
      </a>
      <a href="#/verification" class="card card-pad card-hover" data-testid="account-verification" style="text-decoration:none; color:inherit">
        <div style="font-size:1.5rem; color:var(--primary)"><i class="fa-solid fa-id-card"></i></div>
        <h3 style="margin:.5rem 0 .25rem">Verifikasi Akun</h3>
        <div class="text-sm text-muted">Verifikasi email, telepon & KTP untuk meningkatkan kepercayaan</div>
      </a>
      <a href="#/settings" class="card card-pad card-hover" data-testid="account-settings" style="text-decoration:none; color:inherit">
        <div style="font-size:1.5rem; color:var(--primary)"><i class="fa-solid fa-gear"></i></div>
        <h3 style="margin:.5rem 0 .25rem">Pengaturan</h3>
        <div class="text-sm text-muted">Password, keamanan, dan preferensi notifikasi</div>
      </a>
    </div>
  `}async function Br(e,t={}){let n=f.getState().user;e.innerHTML=`
    <div class="page-header"><div class="flex-between"><h1 class="page-title">Kelola Lowongan</h1>
      <button class="btn btn-primary" id="dash-post-job-btn" data-testid="dash-post-job"><i class="fa-solid fa-plus"></i> Pasang Lowongan</button>
    </div></div>
    <div id="jobs-list" class="flex-col"></div>
    <div id="job-form-container" style="display:none; margin-top:24px;"></div>
  `;let r=e.querySelector(`#jobs-list`),i=e.querySelector(`#job-form-container`),a=e.querySelector(`#dash-post-job-btn`),o=!1,s=()=>{i&&(i.style.display=`none`,i.innerHTML=``),r&&(r.style.display=``),a&&(a.style.display=``),o=!1,location.hash.includes(`/dashboard/manage-jobs/`)&&history.replaceState(null,``,`#/dashboard/manage-jobs`)},c=async(e=`create`,t=null)=>{if(o)return;let n=await R.get(`/categories`),c=null;if(e===`edit`&&t)try{c=await R.get(`/jobs/${t}`)}catch{F(`Lowongan tidak ditemukan`,`error`);return}let u=new Date().toISOString().split(`T`)[0],d=c?.deadline?new Date(c.deadline).toISOString().split(`T`)[0]:``;i.innerHTML=`
      <div class="card card-pad-lg" style="background:#fff;">
        <div class="flex-between" style="margin-bottom:20px;">
          <h3 style="margin:0;"><i class="fa-solid ${e===`edit`?`fa-pen`:`fa-plus-circle`}"></i> ${e===`edit`?`Edit Lowongan`:`Pasang Lowongan Baru`}</h3>
          <button class="btn btn-ghost btn-sm" id="close-job-form" data-testid="close-job-form"><i class="fa-solid fa-xmark"></i> Batal</button>
        </div>
        <form id="job-form" data-testid="dash-job-form">
          <div class="form-group"><label class="label">Judul Lowongan *</label><input class="input" id="j-title" required minlength="5" value="${P(c?.title||``)}" placeholder="Contoh: Desainer Grafis untuk Brosur" data-testid="dash-job-title"></div>
          <div class="form-group"><label class="label">Kategori *</label>
            <select class="select" id="j-category" required data-testid="dash-job-category">
              <option value="">Pilih Kategori</option>
              ${n.map(e=>`<option value="${e.id}" ${c?.categoryId===e.id?`selected`:``}>${P(e.name)}</option>`).join(``)}
            </select>
          </div>
          <div class="form-group"><label class="label">Deskripsi Lengkap *</label><textarea class="textarea" id="j-desc" rows="5" required minlength="20" placeholder="Jelaskan kebutuhan, deliverable, dan ekspektasi…" data-testid="dash-job-desc">${P(c?.description||``)}</textarea></div>
          <div class="grid grid-2">
            <div class="form-group"><label class="label">Budget (Rp) *</label><input class="input" id="j-budget" type="number" required min="10000" step="1000" value="${c?.budget||``}" placeholder="500000" data-testid="dash-job-budget"></div>
            <div class="form-group"><label class="label">Deadline</label><input class="input" id="j-deadline" type="date" min="${u}" value="${d}" data-testid="dash-job-deadline"></div>
          </div>
          <div class="form-group"><label class="label">Lokasi</label><input class="input" id="j-loc" value="${P(c?.location||`Remote`)}" placeholder="Remote / Jakarta / Surabaya" data-testid="dash-job-loc"></div>
          <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:24px;">
            <button type="button" class="btn btn-secondary" id="cancel-job-form">Batal</button>
            <button class="btn btn-primary" type="submit" data-testid="dash-job-submit"><i class="fa-solid fa-paper-plane"></i> ${e===`edit`?`Update Lowongan`:`Pasang Sekarang`}</button>
          </div>
        </form>
      </div>
    `,i.style.display=`block`,r&&(r.style.display=`none`),a&&(a.style.display=`none`),o=!0,i.querySelector(`#close-job-form`)?.addEventListener(`click`,s),i.querySelector(`#cancel-job-form`)?.addEventListener(`click`,s),i.querySelector(`#job-form`).addEventListener(`submit`,async n=>{n.preventDefault();let r=i.querySelector(`#j-title`).value.trim(),a=i.querySelector(`#j-category`).value,o=i.querySelector(`#j-desc`).value.trim(),c=parseFloat(i.querySelector(`#j-budget`).value),u=i.querySelector(`#j-deadline`).value||null,d=i.querySelector(`#j-loc`).value.trim()||`Remote`;if(r.length<5)return F(`Judul minimal 5 karakter`,`error`);if(!a)return F(`Pilih kategori`,`error`);if(o.length<20)return F(`Deskripsi minimal 20 karakter`,`error`);if(!c||c<1e4)return F(`Budget minimal Rp 10.000`,`error`);let f=i.querySelector(`[type=submit]`);f.disabled=!0,f.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan…`;try{let n={title:r,categoryId:a,description:o,budget:c,location:d,isOnline:d.toLowerCase()===`remote`,deadline:u};e===`edit`&&t?(await R.put(`/jobs/${t}`,n),F(`Lowongan diperbarui`,`success`)):(await R.post(`/jobs`,n),F(`Lowongan terpasang`,`success`)),s(),await l()}catch(t){F(t.message||`Gagal menyimpan lowongan`,`error`),f.disabled=!1,f.innerHTML=e===`edit`?`Update Lowongan`:`Pasang Sekarang`}})},l=async()=>{try{let e=await R.get(`/jobs?buyerId=`+n.id),t=Array.isArray(e)?e:e.data||[];r.innerHTML=t.length?t.map(e=>`
          <div class="card card-pad" data-testid="job-${e.id}">
            <div class="flex-between">
              <div style="flex:1; min-width:0;">
                <div class="flex gap-sm mb-1">${H(e.status)}<span class="text-xs text-muted">${e.createdAt?new Date(e.createdAt).toLocaleDateString(`id-ID`):``}</span></div>
                <h3 style="margin:0">${P(e.title)}</h3>
                <div class="text-sm text-muted">${P(typeof e.category==`object`?e.category?.name:e.category||``)} · ${j(e.budget)}</div>
              </div>
            </div>
            <div class="flex gap-sm mt-2">
              <a class="btn btn-secondary btn-sm" href="#/jobs/${e.id}" data-testid="view-job-${e.id}"><i class="fa-solid fa-eye"></i> Lihat (${e.applicationsCount||e.applicationCount||0} pelamar)</a>
              <a class="btn btn-ghost btn-sm" href="#/dashboard/manage-jobs/edit/${e.id}" data-testid="edit-job-${e.id}"><i class="fa-solid fa-pen"></i> Edit</a>
              <button class="btn btn-danger btn-sm" data-del-job="${e.id}" data-testid="del-job-${e.id}"><i class="fa-solid fa-trash"></i> Hapus</button>
            </div>
          </div>`).join(``):B(`Belum ada lowongan`,`Buat lowongan baru dan tunggu lamaran dari freelancer.`,`fa-folder-open`),r.querySelectorAll(`[data-del-job]`).forEach(e=>e.addEventListener(`click`,()=>I(`Hapus lowongan ini? Lamaran terkait akan ikut hilang.`,async()=>{try{await R.del(`/jobs/`+e.dataset.delJob),F(`Lowongan dihapus`,`success`),await l()}catch(e){F(e.message,`error`)}})))}catch(e){r.innerHTML=B(`Gagal memuat`,e.message)}};a&&a.addEventListener(`click`,e=>{e.preventDefault(),history.pushState(null,``,`#/dashboard/manage-jobs/new`),c(`create`)}),await l(),t.openForm===`create`?await c(`create`):t.openForm===`edit`&&t.id&&await c(`edit`,t.id)}async function Vr(e,t={}){let n=f.getState().user;e.innerHTML=`
    <div class="page-header"><div class="flex-between"><h1 class="page-title">Kelola Jasa</h1><button class="btn btn-primary" id="add-svc" data-testid="add-service-btn"><i class="fa-solid fa-plus"></i> Tambah Jasa</button></div></div>
    <div id="svc-list" class="grid grid-3"></div>
    <div id="service-form-container" style="display:none; margin-top:24px;"></div>
  `;let r=e.querySelector(`#svc-list`),i=e.querySelector(`#service-form-container`),a=e.querySelector(`#add-svc`),o=!1,s=()=>{i&&(i.style.display=`none`,i.innerHTML=``),r&&(r.style.display=`grid`),a&&(a.style.display=``),o=!1,location.hash.includes(`/dashboard/manage-services/`)&&history.replaceState(null,``,`#/dashboard/manage-services`)},c=async(e,t)=>{let n=await R.get(`/categories`);i.innerHTML=`
      <div class="card card-pad-lg" style="background:#fff; border-radius:20px; padding:24px;">
        <div class="flex-between" style="margin-bottom:20px;">
          <h3 style="margin:0"><i class="fa-solid fa-pen"></i> Edit Jasa</h3>
          <button class="btn btn-ghost btn-sm" id="close-service-form" data-testid="close-edit-service"><i class="fa-solid fa-xmark"></i> Batal</button>
        </div>
        <form id="service-form">
          <div class="form-group"><label class="label">Judul Jasa *</label><input class="input" id="title" required value="${P(t.title||``)}" data-testid="edit-svc-title"></div>
          <div class="form-group"><label class="label">Kategori *</label>
            <select class="select" id="categoryId" required data-testid="edit-svc-category">
              <option value="">Pilih Kategori</option>
              ${n.map(e=>`<option value="${e.id}" ${t.categoryId===e.id?`selected`:``}>${P(e.name)}</option>`).join(``)}
            </select>
          </div>
          <div class="form-group"><label class="label">Deskripsi *</label><textarea class="textarea" id="description" rows="5" required data-testid="edit-svc-desc">${P(t.description||``)}</textarea></div>
          <div class="grid grid-2">
            <div class="form-group"><label class="label">Harga (Rp) *</label><input class="input" id="price" type="number" required min="10000" value="${t.price||``}" data-testid="edit-svc-price"></div>
            <div class="form-group"><label class="label">Hari Pengerjaan *</label><input class="input" id="deliveryTime" type="number" required min="1" max="30" value="${t.deliveryTime||``}" data-testid="edit-svc-days"></div>
          </div>
          <div class="form-group">
            <label class="label">Gambar Cover</label>
            <div style="border:2px dashed #ddd; border-radius:16px; padding:20px; text-align:center; cursor:pointer;" id="upload-zone">
              <i class="fa-solid fa-cloud-upload-alt" style="font-size:2rem;"></i>
              <p>Klik untuk upload gambar baru</p>
              <input type="file" id="imageFile" accept="image/*" style="display:none;">
              <input type="hidden" id="imageUrl" value="${t.image||``}">
            </div>
            <div id="image-preview" style="margin-top:12px;${t.image?``:`display:none`}">
              <img id="preview-img" src="${t.image||``}" style="max-width:100%; max-height:150px; border-radius:12px;">
              <button type="button" id="remove-image" class="btn btn-sm btn-ghost" style="margin-top:8px;"><i class="fa-solid fa-trash"></i> Hapus gambar</button>
            </div>
          </div>
          <div style="display:flex; gap:12px; justify-content:flex-end;">
            <button type="button" class="btn btn-secondary" id="cancel-service-form">Batal</button>
            <button class="btn btn-primary" type="submit" data-testid="submit-edit-service">Update Jasa</button>
          </div>
        </form>
      </div>
    `,i.style.display=`block`,r.style.display=`none`,a&&(a.style.display=`none`),o=!0,Ar();let c=i.querySelector(`#service-form`);i.querySelector(`#cancel-service-form`)?.addEventListener(`click`,s),i.querySelector(`#close-service-form`)?.addEventListener(`click`,s),c?.addEventListener(`submit`,async n=>{n.preventDefault();let r=i.querySelector(`#title`)?.value.trim(),a=i.querySelector(`#categoryId`)?.value,o=i.querySelector(`#description`)?.value.trim(),l=parseFloat(i.querySelector(`#price`)?.value),d=parseInt(i.querySelector(`#deliveryTime`)?.value),f=i.querySelector(`#imageUrl`)?.value.trim()||t.image||`https://placehold.co/600x400/0a66c2/ffffff?text=No+Image`;if(!r||r.length<5)return F(`Judul minimal 5 karakter`,`error`);if(!a)return F(`Pilih kategori`,`error`);if(!o||o.length<20)return F(`Deskripsi minimal 20 karakter`,`error`);if(!l||isNaN(l)||l<1e4)return F(`Harga minimal Rp 10.000`,`error`);if(!d||isNaN(d)||d<1||d>30)return F(`Hari pengerjaan harus 1-30 hari`,`error`);let p=c.querySelector(`[type=submit]`);p&&(p.disabled=!0,p.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Mengupdate...`);try{await R.put(`/services/${e}`,{title:r,categoryId:a,description:o,price:l,deliveryTime:d,images:[f]}),F(`Jasa berhasil diupdate`,`success`),s(),await u()}catch(e){F(e.message||`Gagal mengupdate jasa`,`error`),p&&(p.disabled=!1,p.innerHTML=`Update Jasa`)}})},l=async()=>{if(o){s();return}i.innerHTML=`
      <div class="card card-pad-lg" style="background:#fff; border-radius:20px; padding:24px;">
        <div class="flex-between" style="margin-bottom:20px;">
          <h3 style="margin:0"><i class="fa-solid fa-plus-circle"></i> Buat Jasa Baru</h3>
          <button class="btn btn-ghost btn-sm" id="close-service-form" data-testid="close-create-service"><i class="fa-solid fa-xmark"></i> Batal</button>
        </div>
        <form id="service-form">
          <div class="form-group"><label class="label">Judul Jasa *</label><input class="input" id="title" required placeholder="Contoh: Desain Logo Profesional" data-testid="create-svc-title"></div>
          <div class="form-group"><label class="label">Kategori *</label>
            <select class="select" id="categoryId" required data-testid="create-svc-category">
              <option value="">Pilih Kategori</option>
              ${(await R.get(`/categories`)).map(e=>`<option value="${e.id}">${P(e.name)}</option>`).join(``)}
            </select>
          </div>
          <div class="form-group"><label class="label">Deskripsi Jasa *</label><textarea class="textarea" id="description" rows="5" required placeholder="Jelaskan detail jasa yang Anda tawarkan..." data-testid="create-svc-desc"></textarea></div>
          <div class="grid grid-2">
            <div class="form-group"><label class="label">Harga (Rp) *</label><input class="input" id="price" type="number" required min="10000" placeholder="150000" data-testid="create-svc-price"></div>
            <div class="form-group"><label class="label">Hari Pengerjaan *</label><input class="input" id="deliveryTime" type="number" required min="1" max="30" placeholder="3" data-testid="create-svc-days"></div>
          </div>
          <div class="form-group">
            <label class="label">Gambar Cover</label>
            <div style="border:2px dashed #ddd; border-radius:16px; padding:20px; text-align:center; cursor:pointer;" id="upload-zone">
              <i class="fa-solid fa-cloud-upload-alt" style="font-size:2rem;"></i>
              <p>Klik untuk upload gambar</p>
              <input type="file" id="imageFile" accept="image/*" style="display:none;">
              <input type="hidden" id="imageUrl">
            </div>
            <div id="image-preview" style="display:none; margin-top:12px;">
              <img id="preview-img" src="" style="max-width:100%; max-height:150px; border-radius:12px;">
              <button type="button" id="remove-image" class="btn btn-sm btn-ghost" style="margin-top:8px;"><i class="fa-solid fa-trash"></i> Hapus</button>
            </div>
          </div>
          <div style="display:flex; gap:12px; justify-content:flex-end;">
            <button type="button" class="btn btn-secondary" id="cancel-service-form">Batal</button>
            <button class="btn btn-primary" type="submit" data-testid="submit-create-service">Simpan Jasa</button>
          </div>
        </form>
      </div>
    `,i.style.display=`block`,r.style.display=`none`,a&&(a.style.display=`none`),o=!0,Ar();let e=i.querySelector(`#service-form`);i.querySelector(`#cancel-service-form`)?.addEventListener(`click`,s),i.querySelector(`#close-service-form`)?.addEventListener(`click`,s),e?.addEventListener(`submit`,async t=>{t.preventDefault();let n=i.querySelector(`#title`)?.value.trim(),r=i.querySelector(`#categoryId`)?.value,a=i.querySelector(`#description`)?.value.trim(),o=parseFloat(i.querySelector(`#price`)?.value),c=parseInt(i.querySelector(`#deliveryTime`)?.value),l=i.querySelector(`#imageUrl`)?.value.trim()||`https://placehold.co/600x400/0a66c2/ffffff?text=No+Image`;if(!n||n.length<5)return F(`Judul minimal 5 karakter`,`error`);if(!r)return F(`Pilih kategori`,`error`);if(!a||a.length<20)return F(`Deskripsi minimal 20 karakter`,`error`);if(!o||isNaN(o)||o<1e4)return F(`Harga minimal Rp 10.000`,`error`);if(!c||isNaN(c)||c<1||c>30)return F(`Hari pengerjaan harus 1-30 hari`,`error`);let d=e.querySelector(`[type=submit]`);d&&(d.disabled=!0,d.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...`);try{await R.post(`/services`,{title:n,categoryId:r,description:a,price:o,deliveryTime:c,images:[l]}),F(`Jasa berhasil dibuat`,`success`),s(),await u()}catch(e){F(e.message||`Gagal membuat jasa`,`error`),d&&(d.disabled=!1,d.innerHTML=`Simpan Jasa`)}})},u=async()=>{try{let e=await R.get(`/services?sellerId=`+n.id),t=Array.isArray(e)?e:e.data||[];r.innerHTML=t.length?t.map(e=>`
          <div class="service-card" data-testid="service-card-${e.id}" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div class="thumb" style="height:160px;"><img src="${e.image||e.images?.[0]||`https://placehold.co/400x200/0a66c2/fff?text=No+Image`}" style="width:100%; height:100%; object-fit:cover;"></div>
            <div class="body" style="padding:12px;">
              <div class="title" style="font-weight:600;">${P(e.title)}</div>
              <div class="meta" style="display:flex; justify-content:space-between; margin:8px 0;">
                <span class="price" style="font-weight:700; color:#0a66c2;">${j(e.price)}</span>
                <span>${e.isActive===!1?`<span class="badge">Nonaktif</span>`:`<span class="badge badge-success">Aktif</span>`}</span>
              </div>
              <div class="flex gap-sm">
                <button class="btn btn-secondary btn-sm" data-edit="${e.id}" data-testid="edit-svc-${e.id}">Edit</button>
                <button class="btn btn-ghost btn-sm" data-toggle="${e.id}" data-testid="toggle-svc-${e.id}">${e.isActive===!1?`Aktifkan`:`Nonaktifkan`}</button>
                <button class="btn btn-danger btn-sm" data-del="${e.id}" data-testid="delete-svc-${e.id}">Hapus</button>
              </div>
            </div>
          </div>
        `).join(``):B(`Belum ada jasa`,`Klik 'Tambah Jasa' untuk memulai`,`fa-box`),r.querySelectorAll(`[data-del]`).forEach(e=>e.addEventListener(`click`,()=>I(`Hapus jasa ini?`,async()=>{try{await R.del(`/services/`+e.dataset.del),F(`Jasa dihapus`,`success`),await u()}catch(e){F(e.message,`error`)}}))),r.querySelectorAll(`[data-toggle]`).forEach(e=>e.addEventListener(`click`,async()=>{try{await R.post(`/services/`+e.dataset.toggle+`/toggle-active`),F(`Status jasa berubah`,`success`),await u()}catch(e){F(e.message,`error`)}})),r.querySelectorAll(`[data-edit]`).forEach(e=>e.addEventListener(`click`,async()=>{try{let t=await R.get(`/services/`+e.dataset.edit);history.pushState(null,``,`#/dashboard/manage-services/edit/`+e.dataset.edit),await c(e.dataset.edit,t)}catch{F(`Gagal memuat data jasa`,`error`)}}))}catch(e){r.innerHTML=B(`Gagal memuat`,e.message)}};if(a&&a.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),history.pushState(null,``,`#/dashboard/manage-services/new`),l()}),await u(),t.openForm===`create`)await l();else if(t.openForm===`edit`&&t.id)try{let e=await R.get(`/services/`+t.id);await c(t.id,e)}catch{F(`Gagal memuat data jasa`,`error`)}}async function Z({mount:e}){let t=`overview`,n=location.hash.match(/\/dashboard(?:\/([^/?]+))?(?:\/([^?]+))?/);n&&n[1]&&(t=n[1]),e.innerHTML=`<div class="container page"><div class="dash-wrap">${kr(t)}<section class="dash-main"><div class="spinner"></div></section></div></div>`,Er=e.querySelector(`section`),await jr(t,e)}function Hr(e,t,n=!1){return!e||!e.length?`<div style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:12px;">
      <i class="fa-solid fa-comment-slash" style="font-size:3rem; color:#ccc;"></i>
      <h3 style="margin:14px 0 8px;">Belum ada ulasan</h3>
      <p style="color:#888; max-width:420px; margin:0 auto;">
        ${n?`Anda belum menerima ulasan. Selesaikan pesanan untuk mendapatkan ulasan dari klien.`:`Pengguna ini belum memiliki ulasan.`}
      </p>
    </div>`:`<div style="display:flex; flex-direction:column; gap:16px;">${e.map(e=>`
    <div class="review-item" style="padding:16px; background:#fff; border-radius:12px; transition:background .15s ease;">
      <div style="display:flex; gap:12px; align-items:center;">
        ${V(e.isAnonymous?{name:`Anonim`}:e.reviewer||{name:`User`,id:e.reviewerId},`sm`)}
        <div style="flex:1;">
          <strong>${P(e.isAnonymous?`Anonim`:e.reviewer?.name||`User`)}</strong>
          <div style="font-size:11px; color:#999; margin-top:2px;">${M(e.createdAt)}</div>
        </div>
        <div style="color:#f5b042; font-size:14px;">${`★`.repeat(e.rating||5)}${`☆`.repeat(5-(e.rating||5))}</div>
      </div>
      <p style="margin:12px 0 0 52px; color:#555; font-size:14px; line-height:1.5;">${P(e.comment||``)}</p>
    </div>`).join(``)}</div>`}async function Ur({mount:e,params:t}){e.innerHTML=`<div class="container page"><div class="spinner"></div></div>`;let n=t.id;try{let[t,r,i,a,o,s]=await Promise.all([R.get(`/users/`+n),R.get(`/users/${n}/services`).catch(()=>[]),R.get(`/reviews/user/${n}`).catch(()=>({all:[],asSeller:[],asBuyer:[]})),R.get(`/users/${n}/jobs`).catch(()=>[]),R.get(`/users/${n}/stats`).catch(()=>({totalEarnings:0,completedOrders:0,totalOrders:0,averageRating:0,reviewCount:0})),R.get(`/users/${n}/work-history`).catch(()=>[])]),c=f.getState().user,l=c&&c.id===t.id,u=Array.isArray(i?.asSeller)?i.asSeller:[],d=Array.isArray(i?.asBuyer)?i.asBuyer:[],p=Array.isArray(i?.all)?i.all:[],m=Number(o?.averageRating)||Number(t.rating)||0,h=Number(o?.reviewCount)||p.length||0,g=Array.isArray(s)?s:[],_=r.length,ee=a.length,te=Number(o?.completedOrders)||t.completedOrders||0;Number(o?.totalEarnings),e.innerHTML=`
      <div class="container page" style="max-width:1200px; margin:0 auto; padding:20px;">
        <a href="#/marketplace" class="text-sm" data-testid="public-profile-back" style="display:inline-block; margin-bottom:20px; text-decoration:none; color:#0a66c2;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Marketplace
        </a>

        <!-- Profile Header Card -->
        <div class="card card-pad-lg" style="background:#fff; border-radius:16px; padding:24px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <div style="display:flex; justify-content:space-between; gap:32px; align-items:flex-start; flex-wrap:wrap;">
            
            <div style="display:flex; gap:24px; align-items:flex-start; flex:1;">
              <div style="position: relative;">
                ${V(t,`xl`)}
                ${l?`
                  <label for="avatar-upload" class="btn btn-secondary" style="margin-top:10px; display:block; text-align:center; cursor:pointer; font-size:12px; padding:6px 12px;">
                    <i class="fa-solid fa-camera"></i> Ubah Foto
                  </label>
                  <input id="avatar-upload" type="file" accept="image/*" hidden>
                `:``}
              </div>

              <div style="flex:1;">
                <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                  <h1 style="margin:0;font-size:2.2rem;font-weight:800;">
                    ${P(t.name||`User`)}
                  </h1>
                  ${t.verified?`<i class="fa-solid fa-circle-check"
                           style="color:#2563eb;font-size:20px;"
                           title="Akun Terverifikasi"></i>`:``}
                </div>

                <p style="margin:8px 0 14px;color:#666;font-size:15px;line-height:1.6;">
                  ${P(t.bio||(l?`Tambahkan bio untuk meningkatkan kepercayaan calon klien.`:`Pengguna ini belum menambahkan deskripsi profil.`))}
                </p>

                <div style="display:flex;gap:18px;flex-wrap:wrap;color:#666;font-size:14px;">
                  <span><i class="fa-solid fa-star" style="color:#f5b042"></i> ${m.toFixed(1)} (${h} ulasan)</span>
                  <span><i class="fa-solid fa-bag-shopping"></i> ${te} pesanan selesai</span>
                  ${t.city?`<span><i class="fa-solid fa-location-dot"></i> ${P(t.city)}</span>`:``}
                  <span><i class="fa-solid fa-calendar"></i> Aktif sejak ${new Date(t.createdAt).toLocaleDateString(`id-ID`,{month:`long`,year:`numeric`})}</span>
                </div>
              </div>
            </div>

            <div style="display:flex;gap:12px;align-self:center;flex-wrap:wrap;">
              ${l?`
                <a class="btn btn-secondary" href="#/dashboard" style="background:#f0f0f0; text-decoration:none; padding:10px 20px; border-radius:8px;">
                  <i class="fa-solid fa-gauge-high"></i> Dashboard
                </a>
                <a class="btn btn-primary" href="#/settings" style="background:#0a66c2; color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px;">
                  <i class="fa-solid fa-pen"></i> Edit Profil
                </a>
              `:`
                <button class="btn btn-primary" id="chat-user-btn" style="background:#0a66c2; color:#fff; border:none; padding:10px 20px; border-radius:8px; cursor:pointer;">
                  <i class="fa-solid fa-message"></i> Chat
                </button>
                <button class="btn btn-secondary" id="report-user-btn" style="background:#f0f0f0; border:none; padding:10px 20px; border-radius:8px; cursor:pointer;">
                  <i class="fa-solid fa-flag"></i> Laporkan
                </button>
              `}
            </div>

          </div>
        </div>

        <!-- Activity Feed -->
        <div style="background:#fafafa; border:1px solid #ececec; border-radius:14px; padding:18px; margin-bottom:22px;">
          <div style="font-weight:700;margin-bottom:12px;">
            <i class="fa-solid fa-clock-rotate-left"></i> Aktivitas Terbaru
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;color:#555;font-size:14px;">
            <div>✓ Profil diperbarui</div>
            ${te>0?`<div>✓ Menyelesaikan ${te} pesanan</div>`:``}
            ${_>0?`<div>✓ Memiliki ${_} jasa aktif</div>`:``}
            ${h>0?`<div>⭐ Menerima ${h} ulasan</div>`:``}
          </div>
        </div>

        <!-- Statistik Ringkasan -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px,1fr)); gap:16px; margin-bottom:24px;">
          <div class="stat-card clickable-stat" data-target-tab="reviews" style="cursor:pointer; background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1); transition:all .18s ease;">
            <div style="font-size:2rem; font-weight:700; color:#f5b042;"><i class="fa-solid fa-star" style="font-size:1.3rem;"></i> ${m.toFixed(1)}</div>
            <div style="font-size:13px; color:#666;">Rating (${h} ulasan)</div>
          </div>
          <div class="stat-card clickable-stat" data-target-tab="history" style="cursor:pointer; background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1); transition:all .18s ease;">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${te}</div>
            <div style="font-size:13px; color:#666;">Pesanan Selesai</div>
          </div>
          <div class="stat-card clickable-stat" data-target-tab="services" style="cursor:pointer; background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1); transition:all .18s ease;">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${_}</div>
            <div style="font-size:13px; color:#666;">Jasa Ditawarkan</div>
          </div>
          <div class="stat-card clickable-stat" data-target-tab="jobs" style="cursor:pointer; background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1); transition:all .18s ease;">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${ee}</div>
            <div style="font-size:13px; color:#666;">Pekerjaan Diposting</div>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div style="display:flex; gap:8px; border-bottom:1px solid #e0e0e0; margin-bottom:24px; overflow-x:auto; flex-wrap:wrap;">
          <button class="tab-btn active" data-tab="services" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#0a66c2; border-bottom:2px solid #0a66c2; white-space:nowrap; transition:all .15s ease;">
            🛠 Jasa Saya (${_})
          </button>
          <button class="tab-btn" data-tab="history" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#666; white-space:nowrap; transition:all .15s ease;">
            💼 Riwayat Pekerjaan (${g.length})
          </button>
          <button class="tab-btn" data-tab="jobs" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#666; white-space:nowrap; transition:all .15s ease;">
            📋 Lowongan Saya (${ee})
          </button>
          <button class="tab-btn" data-tab="reviews" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#666; white-space:nowrap; transition:all .15s ease;">
            ⭐ Ulasan (${p.length})
          </button>
        </div>

        <!-- Tab Content: Services -->
        <div id="tab-services" class="tab-content active">
          <div id="services-list" data-testid="public-profile-services">
            ${r.length?`<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px,1fr)); gap:20px;">
                    ${r.map(e=>_t(e)).join(``)}
                  </div>`:`<div style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:12px;">
                    <i class="fa-solid fa-box-open" style="font-size:3rem; color:#ccc;"></i>
                    <h3 style="margin:14px 0 8px;">Belum ada jasa</h3>
                    <p style="color:#888;max-width:420px;margin:0 auto;">
                    ${l?`Anda belum menawarkan jasa apa pun. Mulai tawarkan kemampuan Anda dan biarkan orang lain menemukan Anda.`:`Pengguna ini belum menawarkan jasa apa pun saat ini.`}
                    </p>
                    ${l?`<div style="margin-top:20px;">
                             <a href="#/dashboard/manage-services"
                                class="btn btn-primary" style="background:#0a66c2; color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; display:inline-block;">
                                <i class="fa-solid fa-plus"></i> Tambah Jasa
                             </a>
                           </div>`:``}
                  </div>`}
          </div>
        </div>

        <!-- Tab Content: Work History -->
        <div id="tab-history" class="tab-content" style="display:none;">
          ${g.length?`<div style="display:flex; flex-direction:column; gap:12px;">
                  ${g.map(e=>{let t=String(e.status).toUpperCase()===`COMPLETED`;return`
                    <div class="history-card" style="background:#fff; border-radius:12px; padding:16px; box-shadow:0 1px 3px rgba(0,0,0,0.1); display:flex; gap:14px; align-items:flex-start; flex-wrap:wrap;">
                      <div style="flex:1; min-width:200px;">
                        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:6px;">
                          <span class="badge" style="background:${t?`#4caf50`:`#f5b042`}; color:#fff; padding:3px 10px; border-radius:20px; font-size:11px;">${t?`Selesai`:P(String(e.status).replace(/_/g,` `))}</span>
                          <span style="font-size:11px; color:#999;">${P(e.label||``)}</span>
                        </div>
                        <h4 style="margin:4px 0; font-size:1rem;">${P(e.title||`Pekerjaan`)}</h4>
                        <div style="display:flex; gap:16px; flex-wrap:wrap; font-size:13px; color:#666;">
                          ${e.client?.name?`<span><i class="fa-solid fa-user"></i> ${P(e.client.name)}</span>`:``}
                          ${e.completedAt?`<span><i class="fa-solid fa-calendar-check"></i> ${new Date(e.completedAt).toLocaleDateString(`id-ID`)}</span>`:``}
                          ${e.review?`<span style="color:#f5b042;"><i class="fa-solid fa-star"></i> ${e.review.rating}</span>`:``}
                        </div>
                      </div>
                      <div style="text-align:right; font-weight:700; color:#2e7d32; white-space:nowrap;">${j(e.amount||0)}</div>
                    </div>`}).join(``)}
                </div>`:`<div style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:12px;">
                  <i class="fa-solid fa-clock-rotate-left" style="font-size:3rem; color:#ccc;"></i>
                  <h3 style="margin:14px 0 8px;">Belum ada riwayat kerja</h3>
                  <p style="color:#888;max-width:420px;margin:0 auto;">
                  ${l?`Anda belum memiliki riwayat pekerjaan. Mulai terima pesanan untuk membangun portofolio Anda.`:`Pengguna ini belum memiliki riwayat pekerjaan.`}
                  </p>
                </div>`}
        </div>

        <!-- Tab Content: Jobs -->
        <div id="tab-jobs" class="tab-content" style="display:none;">
          <div id="jobs-list" data-testid="public-profile-jobs">
            ${a.length?`<div style="display:flex; flex-direction:column; gap:16px;">
                    ${a.map(e=>`
                      <div class="job-card" data-job-id="${e.id}" style="background:#fff; border-radius:12px; padding:20px; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.1); transition:box-shadow 0.2s, transform 0.2s;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap;">
                          <div style="flex:1;">
                            <div style="display:flex; gap:8px; margin-bottom:8px; flex-wrap:wrap;">
                              <span class="badge" style="background:${e.status===`OPEN`||e.status===`open`?`#4caf50`:`#999`}; color:#fff; padding:4px 12px; border-radius:20px; font-size:12px;">
                                ${e.status===`OPEN`||e.status===`open`?`Aktif`:`Ditutup`}
                              </span>
                              <span style="font-size:12px; color:#999;">${M(e.createdAt)}</span>
                            </div>
                            <h3 style="margin:8px 0; font-size:1.1rem;">${P(e.title)}</h3>
                            <p style="color:#666; font-size:14px; line-height:1.5; margin:8px 0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                              ${P(e.description?.substring(0,120)||``)}${(e.description?.length||0)>120?`...`:``}
                            </p>
                            <div style="display:flex; gap:16px; margin-top:12px; font-size:13px; color:#666; flex-wrap:wrap;">
                              <span><i class="fa-solid fa-money-bill-wave"></i> ${j(e.budget)}</span>
                              <span><i class="fa-solid fa-location-dot"></i> ${P(e.city||`Remote`)}</span>
                              ${e.deadline?`<span><i class="fa-solid fa-calendar"></i> Deadline: ${new Date(e.deadline).toLocaleDateString()}</span>`:``}
                            </div>
                          </div>
                          <div style="text-align:right; margin-top:8px;">
                            <span style="background:#f0f0f0; padding:4px 12px; border-radius:20px; font-size:12px;">${e.applicationCount||0} pelamar</span>
                          </div>
                        </div>
                      </div>
                    `).join(``)}
                  </div>`:`<div style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:12px;">
                    <i class="fa-solid fa-briefcase" style="font-size:3rem; color:#ccc;"></i>
                    <h3 style="margin:14px 0 8px;">Belum ada pekerjaan</h3>
                    <p style="color:#888;max-width:420px;margin:0 auto;">
                    ${l?`Anda belum memposting pekerjaan. Buat lowongan sekarang untuk menemukan freelancer terbaik.`:`Pengguna ini belum memposting pekerjaan.`}
                    </p>
                    ${l?`<div style="margin-top:20px;">
                             <a href="#/jobs/create"
                                class="btn btn-primary" style="background:#0a66c2; color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; display:inline-block;">
                                <i class="fa-solid fa-plus"></i> Buat Lowongan
                             </a>
                           </div>`:``}
                  </div>`}
          </div>
        </div>

        <!-- Tab Content: Reviews (dua arah) -->
        <div id="tab-reviews" class="tab-content" style="display:none;">
          <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap;">
            <button class="rev-sub-btn active" data-rev="seller" style="padding:8px 16px; border:1px solid #0a66c2; background:#0a66c2; color:#fff; border-radius:20px; cursor:pointer; font-size:13px; transition:all 0.2s;">Sebagai Penjual (${u.length})</button>
            <button class="rev-sub-btn" data-rev="buyer" style="padding:8px 16px; border:1px solid #ccc; background:#fff; color:#666; border-radius:20px; cursor:pointer; font-size:13px; transition:all 0.2s;">Sebagai Klien (${d.length})</button>
          </div>
          <div id="rev-seller" class="rev-sub-content" style="background:#fff; border-radius:12px; padding:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            ${Hr(u,`Belum ada ulasan dari klien`,l)}
          </div>
          <div id="rev-buyer" class="rev-sub-content" style="display:none; background:#fff; border-radius:12px; padding:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            ${Hr(d,`Belum ada ulasan sebagai klien`,l)}
          </div>
        </div>
      </div>
      
      <style>
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
        
        .tab-btn:hover {
          background: #f5f8ff;
          border-radius: 8px 8px 0 0;
          color: #0a66c2 !important;
        }
        
        .review-item {
          transition: background .15s ease;
        }
        
        .review-item:hover {
          background: #fafafa;
        }
        
        .card {
          transition: box-shadow .18s ease;
        }
        
        .card:hover {
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }
        
        .job-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .job-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .service-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      </style>
    `;let v=e.querySelectorAll(`.tab-btn`),y={services:e.querySelector(`#tab-services`),history:e.querySelector(`#tab-history`),jobs:e.querySelector(`#tab-jobs`),reviews:e.querySelector(`#tab-reviews`)};v.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tab;v.forEach(e=>{e.classList.remove(`active`),e.style.color=`#666`,e.style.borderBottom=`none`}),e.classList.add(`active`),e.style.color=`#0a66c2`,e.style.borderBottom=`2px solid #0a66c2`,Object.values(y).forEach(e=>{e&&(e.style.display=`none`)}),y[t]&&(y[t].style.display=`block`)})}),e.querySelectorAll(`.clickable-stat`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.targetTab,r=e.querySelector(`.tab-btn[data-tab="${n}"]`);r&&r.click()})});let b=e.querySelectorAll(`.rev-sub-btn`);b.forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.rev;b.forEach(e=>{let n=e===t;e.classList.toggle(`active`,n),e.style.background=n?`#0a66c2`:`#fff`,e.style.color=n?`#fff`:`#666`,e.style.borderColor=n?`#0a66c2`:`#ccc`});let r=e.querySelector(`#rev-seller`),i=e.querySelector(`#rev-buyer`);r&&(r.style.display=n===`seller`?`block`:`none`),i&&(i.style.display=n===`buyer`?`block`:`none`)})});let ne=e.querySelector(`#avatar-upload`);ne&&ne.addEventListener(`change`,async e=>{let t=e.target.files[0];if(!t)return;let n=new FormData;n.append(`avatar`,t);try{await R.upload(`/users/avatar`,n),F(`Foto profil berhasil diupdate!`,`success`),setTimeout(()=>window.location.reload(),1e3)}catch(e){F(e.message||`Gagal upload foto`,`error`)}}),document.getElementById(`chat-user-btn`)?.addEventListener(`click`,async()=>{if(!c)return F(`Silakan login dulu`,`warning`),Q.navigate(`/login`);try{let e=await R.post(`/chat/conversations`,{recipientId:t.id});Q.navigate(`/chat/`+e.id)}catch(e){F(e.message,`error`)}}),document.getElementById(`report-user-btn`)?.addEventListener(`click`,()=>{if(!c){F(`Silakan login dulu untuk melaporkan`,`warning`);return}F(`Laporan terkirim. Tim Tolongin akan meninjau.`,`success`)}),document.querySelectorAll(`.job-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.job-card`)){let t=e.dataset.jobId;Q.navigate(`/jobs/${t}`)}})})}catch(t){console.error(`PublicProfilePage error:`,t),e.innerHTML=`<div class="container page">
      <div style="text-align:center; padding:60px 20px;">
        <i class="fa-solid fa-user-slash" style="font-size:3rem; color:#ccc;"></i>
        <h3>User tidak ditemukan</h3>
        <p style="color:#999;">${P(t.message)}</p>
        <a href="#/marketplace" class="btn btn-primary" style="display:inline-block; margin-top:16px; padding:10px 20px; background:#0a66c2; color:#fff; text-decoration:none; border-radius:8px;">Kembali ke Marketplace</a>
      </div>
    </div>`}}async function Wr({mount:e}){e.innerHTML=`<div class="container page"><div class="spinner"></div></div>`;try{let t=await R.get(`/auth/me`),n=await R.get(`/services?sellerId=`+t.id).catch(()=>[]),r=Array.isArray(n)?n:n.data||[];e.innerHTML=`
      <div class="container page">
        <div class="card card-pad-lg" data-testid="profile-card">
          <div class="flex gap-md" style="align-items:center;flex-wrap:wrap">
            ${V(t,`xl`)}
            <div style="flex:1;min-width:200px">
              <div class="flex gap-sm" style="align-items:center">
                <h1 style="margin:0">${P(t.name)}</h1>
                ${t.verified?`<i class="fa-solid fa-circle-check" style="color:var(--primary)" title="Verified"></i>`:``}
              </div>
              <p class="text-muted" style="margin:.25rem 0">${P(t.bio||`Belum ada bio`)}</p>
              <div class="flex gap-md text-sm text-muted" style="flex-wrap:wrap">
                <span><i class="fa-solid fa-envelope"></i> ${P(t.email)}</span>
                <span><i class="fa-solid fa-location-dot"></i> ${P(t.city||`-`)}</span>
                <span class="badge">${t.role===`ADMIN`?`Administrator`:`Pengguna`}</span>
                <span><i class="fa-solid fa-star" style="color:var(--warning)"></i> ${(t.rating||0).toFixed(1)} (${t.reviewCount||0} ulasan)</span>
              </div>
            </div>
            <div class="flex gap-sm" style="flex-wrap:wrap">
              <a class="btn btn-secondary" href="#/users/${t.id}" data-testid="view-public-profile-btn">
                <i class="fa-solid fa-eye"></i> Lihat Profil Publik
              </a>
              <a class="btn btn-primary" href="#/settings" data-testid="edit-profile-btn">
                <i class="fa-solid fa-pen"></i> Edit Profil
              </a>
            </div>
          </div>
        </div>
        ${r.length?`
          <h2 class="mt-4">Jasa Saya</h2>
          <div class="services-grid">${r.map(e=>_t(e)).join(``)}</div>
        `:``}
      </div>
    `}catch(t){e.innerHTML=B(`Gagal memuat profil`,t.message)}}async function Gr({mount:e}){let t=f.getState().user;e.innerHTML=`
    <div class="container-sm page">
      <h1 class="page-title">Pengaturan Profil</h1>
      <div class="alert alert-info"><i class="fa-solid fa-camera"></i><div><strong>Gunakan foto profil Anda</strong><p style="margin:.25rem 0 0">Foto yang jelas membantu pengguna lain mengenali dan mempercayai Anda.</p></div></div>
      <div class="card card-pad-lg">
        <form id="s-form" data-testid="settings-form">
          <div class="form-group text-center">
            <label class="label" style="display:block">Foto Profil</label>
            <div style="position:relative;display:inline-block">
              <img id="avatar-preview" 
                   src="${t.avatar&&t.avatar!==`null`?P(t.avatar):`/logotolongin.svg`}"
                   alt="avatar"
                   style="width:120px;height:120px;border-radius:50%;object-fit:cover;border:3px solid var(--border);display:block;margin:0 auto"
                   data-testid="avatar-preview" />
              <label for="avatar-file" class="btn btn-primary btn-sm"
                     style="position:absolute;bottom:0;right:0;border-radius:50%;width:36px;height:36px;padding:0;cursor:pointer;display:grid;place-items:center"
                     data-testid="avatar-upload-btn">
                <i class="fa-solid fa-camera"></i>
              </label>
              <input type="file" id="avatar-file" accept="image/jpeg,image/png,image/webp" style="display:none" data-testid="avatar-file-input" />
            </div>
            <div class="text-xs text-muted mt-1">JPG, PNG atau WebP. Maks 2MB.</div>
            <div id="avatar-upload-status" style="font-size:12px; color:#666; margin-top:8px; display:none;"></div>
          </div>
          <div class="form-group">
            <label class="label">Nama</label>
            <input class="input" id="name" value="${P(t.name)}" data-testid="set-name">
          </div>
          <div class="form-group">
            <label class="label">Bio</label>
            <textarea class="textarea" id="bio" rows="3" maxlength="500" data-testid="set-bio" placeholder="Ceritakan tentang Anda...">${P(t.bio||``)}</textarea>
          </div>
          <div class="form-group">
            <label class="label">Kota</label>
            <input class="input" id="city" value="${P(t.city||``)}" placeholder="Contoh: Jakarta Selatan" data-testid="set-city">
          </div>
          <div class="form-group">
            <label class="label">Nomor Telepon</label>
            <input class="input" id="phone" value="${P(t.phone||``)}" placeholder="0812xxxxxxxx" data-testid="set-phone">
          </div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="settings-save-btn">
            <i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan
          </button>
        </form>
      </div>
    </div>`;let n=null,r=document.getElementById(`avatar-upload-status`),i=document.getElementById(`avatar-file`);i&&i.addEventListener(`change`,async e=>{let t=e.target.files?.[0];if(!t)return;if(!t.type.startsWith(`image/`))return F(`File harus berupa gambar`,`error`);if(t.size>2*1024*1024)return F(`Ukuran maksimal 2MB`,`error`);let i=new FileReader;i.onload=e=>{let t=document.getElementById(`avatar-preview`);t&&(t.src=e.target.result)},i.readAsDataURL(t),r&&(r.style.display=`block`,r.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Mengupload foto...`);try{let e=new FormData;e.append(`file`,t);let i=await R.post(`/uploads?folder=avatars`,e),a=lt(i.url||i.secure_url||i.fileUrl);r&&(r.innerHTML=`<i class="fa-solid fa-check-circle" style="color:#10b981;"></i> Foto berhasil diupload!`,setTimeout(()=>{r&&(r.style.display=`none`)},2e3)),n=a;let o=document.getElementById(`avatar-preview`);o&&(o.src=a),F(`Foto berhasil diupload. Klik Simpan untuk menyimpan perubahan.`,`success`)}catch(e){console.error(`Upload avatar error:`,e),r&&(r.innerHTML=`<i class="fa-solid fa-exclamation-circle" style="color:#ef4444;"></i> Gagal upload foto`,setTimeout(()=>{r&&(r.style.display=`none`)},3e3)),F(`Gagal upload foto: `+(e.message||`Coba lagi`),`error`)}});let a=document.getElementById(`s-form`);a&&a.addEventListener(`submit`,async e=>{e.preventDefault();let t=a.querySelector(`button[type=submit]`);t&&(t.disabled=!0,t.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...`);try{let e={name:document.getElementById(`name`)?.value.trim()||``,bio:document.getElementById(`bio`)?.value.trim()||``,city:document.getElementById(`city`)?.value.trim()||``,phone:document.getElementById(`phone`)?.value.trim()||``};n&&(e.avatar=n);let t=await R.put(`/users/me`,e);f.setState({user:t}),F(`Profil berhasil diperbarui`,`success`),n=null,setTimeout(()=>{window.location.hash=`#/profile`},1200)}catch(e){F(e.message||`Gagal menyimpan`,`error`)}finally{t&&(t.disabled=!1,t.innerHTML=`<i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan`)}})}function Kr(e){return{VERIFIED:`<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Terverifikasi</span>`,PENDING:`<span class="badge badge-warning"><i class="fa-solid fa-clock"></i> Menunggu Review</span>`,REJECTED:`<span class="badge badge-danger"><i class="fa-solid fa-xmark"></i> Ditolak</span>`,NOT_SUBMITTED:`<span class="badge"><i class="fa-solid fa-upload"></i> Belum Disubmit</span>`}[e]||`<span class="badge">${e}</span>`}function qr(e){return e?`<i class="fa-solid fa-circle-check" style="color:var(--success);font-size:1.5rem"></i>`:`<i class="fa-regular fa-circle" style="color:var(--text-2);font-size:1.5rem"></i>`}async function Jr({mount:e}){let{user:t}=f.getState();if(!t){Q.navigate(`/login`);return}let n={};try{n=await R.get(`/verification/status`)}catch{}let r=n.emailVerified??t.emailVerified??!1,i=n.phoneVerified??t.phoneVerified??!1,a=n.ktp?.status||t.ktpStatus||`NOT_SUBMITTED`,o=n.bank?.status||t.bankStatus||`NOT_SUBMITTED`;if(e.innerHTML=`
    <div class="container page">
      <h1 class="page-title">Verifikasi Identitas</h1>
      <p class="page-subtitle">Selesaikan verifikasi bertahap untuk membuka semua fitur Tolongin</p>

      <!-- Progress Bar -->
      <div class="card card-pad-lg mb-4">
        <div class="flex gap-md" style="align-items:flex-start;flex-wrap:wrap">
          <div style="flex:1;text-align:center;min-width:100px">
            ${qr(r)}
            <div class="text-sm mt-1" style="font-weight:600">Email</div>
            <div class="text-xs text-muted">Level 1</div>
          </div>
          <div style="flex:none;padding-top:.7rem;color:var(--border)">→</div>
          <div style="flex:1;text-align:center;min-width:100px">
            ${qr(i)}
            <div class="text-sm mt-1" style="font-weight:600">Telepon</div>
            <div class="text-xs text-muted">Level 1</div>
          </div>
          <div style="flex:none;padding-top:.7rem;color:var(--border)">→</div>
          <div style="flex:1;text-align:center;min-width:100px">
            ${qr(a===`VERIFIED`)}
            <div class="text-sm mt-1" style="font-weight:600">KTP</div>
            <div class="text-xs text-muted">Level 2</div>
          </div>
          <div style="flex:none;padding-top:.7rem;color:var(--border)">→</div>
          <div style="flex:1;text-align:center;min-width:100px">
            ${qr(o===`VERIFIED`)}
            <div class="text-sm mt-1" style="font-weight:600">Rekening Bank</div>
            <div class="text-xs text-muted">Level 3</div>
          </div>
        </div>
      </div>

      <!-- STEP 1: EMAIL VERIFICATION -->
      <div class="card card-pad-lg mb-4" id="email-step">
        <div class="flex-between" style="align-items:center;flex-wrap:wrap;gap:1rem">
          <div>
            <h2 style="margin:0"><i class="fa-solid fa-envelope"></i> Verifikasi Email</h2>
            <p class="text-muted" style="margin:.25rem 0 0">Masukkan kode OTP yang dikirim ke ${P(t.email)}</p>
          </div>
          ${Kr(r?`VERIFIED`:`NOT_SUBMITTED`)}
        </div>
        ${r?`<div class="alert alert-success mt-3"><i class="fa-solid fa-circle-check"></i> Email <strong>${P(t.email)}</strong> sudah terverifikasi.</div>`:`<div class="mt-3" id="email-form-wrap">
              <div class="flex gap-sm" style="flex-wrap:wrap">
                <button class="btn btn-primary" id="send-email-otp" data-testid="send-email-otp-btn">
                  <i class="fa-solid fa-paper-plane"></i> Kirim Kode OTP ke Email
                </button>
              </div>
              <div id="email-otp-row" style="display:none;margin-top:1rem">
                <div class="form-group">
                  <label class="label">Kode OTP (6 digit)</label>
                  <div style="display:flex;gap:.5rem;max-width:320px">
                    <input class="input" id="email-otp-input" maxlength="6" placeholder="123456" data-testid="email-otp-input" style="letter-spacing:4px;font-size:1.2rem;text-align:center">
                    <button class="btn btn-primary" id="verify-email-otp" data-testid="verify-email-otp-btn">Verifikasi</button>
                  </div>
                </div>
                <button class="btn btn-ghost btn-sm" id="resend-email-otp" data-testid="resend-email-otp-btn">
                  <i class="fa-solid fa-rotate-right"></i> Kirim Ulang
                </button>
              </div>
            </div>`}
      </div>

      <!-- STEP 2: PHONE VERIFICATION -->
      <div class="card card-pad-lg mb-4" id="phone-step">
        <div class="flex-between" style="align-items:center;flex-wrap:wrap;gap:1rem">
          <div>
            <h2 style="margin:0"><i class="fa-solid fa-mobile-screen"></i> Verifikasi Nomor Telepon</h2>
            <p class="text-muted" style="margin:.25rem 0 0">Verifikasi nomor HP untuk melamar pekerjaan</p>
          </div>
          ${Kr(i?`VERIFIED`:`NOT_SUBMITTED`)}
        </div>
        ${i?`<div class="alert alert-success mt-3"><i class="fa-solid fa-circle-check"></i> Nomor telepon sudah terverifikasi.</div>`:`<div class="mt-3">
              <div class="form-group">
                <label class="label">Nomor Telepon</label>
                <div style="display:flex;gap:.5rem;max-width:360px">
                  <div class="input-icon" style="flex:1">
                    <i class="fa-solid fa-phone"></i>
                    <input class="input" id="phone-input" type="tel" placeholder="0812xxxxxxxx"
                      value="${P(t.phone||``)}" data-testid="phone-input">
                  </div>
                  <button class="btn btn-primary" id="send-phone-otp" data-testid="send-phone-otp-btn">Kirim OTP</button>
                </div>
              </div>
              <div id="phone-otp-row" style="display:none;margin-top:.75rem">
                <div class="form-group">
                  <label class="label">Kode OTP SMS</label>
                  <div style="display:flex;gap:.5rem;max-width:320px">
                    <input class="input" id="phone-otp-input" maxlength="6" placeholder="123456" data-testid="phone-otp-input" style="letter-spacing:4px;font-size:1.2rem;text-align:center">
                    <button class="btn btn-primary" id="verify-phone-otp" data-testid="verify-phone-otp-btn">Verifikasi</button>
                  </div>
                </div>
              </div>
            </div>`}
      </div>

      <!-- STEP 3: KTP VERIFICATION -->
      <div class="card card-pad-lg mb-4">
        <div class="flex-between" style="align-items:center;flex-wrap:wrap;gap:1rem">
          <div>
            <h2 style="margin:0"><i class="fa-solid fa-id-card"></i> Verifikasi KTP</h2>
            <p class="text-muted" style="margin:.25rem 0 0">Diperlukan untuk menjual jasa (Level 2)</p>
          </div>
          ${Kr(a)}
        </div>
        ${a===`VERIFIED`?`<div class="alert alert-success mt-3"><i class="fa-solid fa-circle-check"></i> KTP Anda sudah terverifikasi!</div>`:a===`REJECTED`?`<div class="alert alert-danger mt-3">
              <i class="fa-solid fa-circle-exclamation"></i> KTP ditolak: ${P(n.ktp?.rejectionReason||`Data tidak jelas`)}
            </div>`:a===`PENDING`?`<div class="alert alert-warning mt-3">
              <i class="fa-solid fa-clock"></i> KTP sedang diproses oleh admin
            </div>`:`<form id="ktp-form" class="mt-3">
              <div class="alert alert-info mb-3">
                <i class="fa-solid fa-flask"></i> <strong>Mode Demo:</strong> Klik "Demo Instan" untuk verifikasi otomatis tanpa upload file.
              </div>
              <div class="form-group">
                <label class="label">Nomor KTP (16 digit)</label>
                <input class="input" id="ktp-number" inputmode="numeric" maxlength="16" placeholder="3273xxxxxxxxxxxx" required>
              </div>
              <div class="grid grid-2 verification-upload-grid">
              <div class="form-group">
                <label class="label">Foto KTP (depan, maks 5MB)</label>
                <input type="file" id="ktp-file" accept="image/jpeg,image/png,image/jpg" class="input" data-testid="ktp-input">
                <img id="ktp-preview" class="verification-file-preview" alt="Preview foto KTP" hidden>
                <div class="text-xs text-muted mt-1">Format JPG/PNG, pastikan foto jelas dan terbaca</div>
              </div>
              <div class="form-group">
                <label class="label">Selfie sambil memegang KTP</label>
                <input type="file" id="ktp-selfie-file" accept="image/jpeg,image/png,image/jpg" class="input" data-testid="ktp-selfie-input">
                <img id="ktp-selfie-preview" class="verification-file-preview" alt="Preview selfie dengan KTP" hidden>
                <div class="text-xs text-muted mt-1">Pastikan wajah dan informasi KTP terlihat jelas</div>
              </div>
              </div>
              <div class="flex gap-sm mt-2" style="flex-wrap:wrap">
                <button type="submit" class="btn btn-primary" data-testid="ktp-submit-btn">
                  <i class="fa-solid fa-upload"></i> Upload KTP
                </button>
                <button type="button" class="btn btn-success" id="demo-ktp-btn" data-testid="demo-ktp-btn">
                  <i class="fa-solid fa-bolt"></i> Demo Instan
                </button>
              </div>
            </form>`}
      </div>

      <!-- STEP 4: BANK VERIFICATION -->
      <div class="card card-pad-lg mb-4">
        <div class="flex-between" style="align-items:center;flex-wrap:wrap;gap:1rem">
          <div>
            <h2 style="margin:0"><i class="fa-solid fa-building-columns"></i> Verifikasi Rekening Bank</h2>
            <p class="text-muted" style="margin:.25rem 0 0">Diperlukan untuk menarik saldo (Level 3)</p>
          </div>
          ${Kr(o)}
        </div>
        ${o===`VERIFIED`?`<div class="alert alert-success mt-3">
              <i class="fa-solid fa-circle-check"></i> Rekening bank sudah terverifikasi!
              <div class="mt-2">
                <strong>Bank:</strong> ${P(n.bank?.bankName||t.bankName||`-`)}<br>
                <strong>No. Rekening:</strong> ${P(n.bank?.accountNumber||t.accountNumber||`-`)}<br>
                <strong>Atas Nama:</strong> ${P(n.bank?.accountName||t.accountName||`-`)}
              </div>
            </div>`:o===`REJECTED`?`<div class="alert alert-danger mt-3">
              <i class="fa-solid fa-circle-exclamation"></i> Rekening ditolak: ${P(n.bank?.rejectionReason||`Data tidak valid`)}
            </div>`:o===`PENDING`?`<div class="alert alert-warning mt-3">
              <i class="fa-solid fa-clock"></i> Rekening bank sedang diproses oleh admin
            </div>`:`<form id="bank-form" class="mt-3">
              <div class="alert alert-info mb-3">
                <i class="fa-solid fa-flask"></i> <strong>Mode Demo:</strong> Isi form lalu klik "Demo Instan".
              </div>
              <div class="grid grid-2">
                <div class="form-group">
                  <label class="label">Nama Bank</label>
                  <select id="bank-name" class="select" required data-testid="bank-name">
                    <option value="">Pilih Bank</option>
                    <option value="BCA">BCA</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                    <option value="CIMB Niaga">CIMB Niaga</option>
                    <option value="Danamon">Danamon</option>
                    <option value="Permata">Permata</option>
                    <option value="Maybank">Maybank</option>
                    <option value="Other">Lainnya</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="label">Nomor Rekening</label>
                  <input type="text" id="account-number" class="input" placeholder="1234567890" required data-testid="account-number">
                </div>
              </div>
              <div class="form-group">
                <label class="label">Nama Pemilik Rekening</label>
                <input type="text" id="account-name" class="input" placeholder="Sesuai KTP" required data-testid="account-name">
              </div>
              <div class="form-group">
                <label class="label">Foto Buku Tabungan / Kartu ATM (opsional)</label>
                <input type="file" id="bank-file" accept="image/jpeg,image/png,image/jpg" class="input" data-testid="bank-file-input">
                <img id="bank-preview" class="verification-file-preview" alt="Preview bukti rekening" hidden>
                <div class="text-xs text-muted mt-1">Bukti kepemilikan rekening (opsional di mode demo)</div>
              </div>
              <div class="flex gap-sm mt-2" style="flex-wrap:wrap">
                <button type="submit" class="btn btn-primary" data-testid="bank-submit-btn">
                  <i class="fa-solid fa-upload"></i> Submit Verifikasi Bank
                </button>
                <button type="button" class="btn btn-success" id="demo-bank-btn" data-testid="demo-bank-btn">
                  <i class="fa-solid fa-bolt"></i> Demo Instan
                </button>
              </div>
            </form>`}
      </div>
    </div>`,!r){let e=document.getElementById(`send-email-otp`),t=document.getElementById(`resend-email-otp`),n=document.getElementById(`email-otp-row`),r=async()=>{try{let e=await R.post(`/verification/email/request`,{});e.demoOtp?(F(`Demo OTP: ${e.demoOtp} (berlaku 10 menit)`,`info`,12e3),console.log(`[DEMO] Email OTP: ${e.demoOtp}`)):F(`OTP dikirim ke email Anda`,`success`),n&&(n.style.display=``)}catch(e){F(e.message,`error`)}};e?.addEventListener(`click`,r),t?.addEventListener(`click`,r),document.getElementById(`verify-email-otp`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`email-otp-input`)?.value.trim();if(!e||e.length<6)return F(`Masukkan kode OTP 6 digit`,`error`);try{await R.post(`/verification/email/verify`,{otp:e});let t=f.getState().user;t&&f.setState({user:{...t,emailVerified:!0}}),F(`Email berhasil diverifikasi!`,`success`),setTimeout(()=>Q.render(),1e3)}catch(e){F(e.message,`error`)}})}i||(document.getElementById(`send-phone-otp`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`phone-input`)?.value.trim();if(!e||e.length<9)return F(`Masukkan nomor telepon yang valid`,`error`);try{let t=await R.post(`/verification/phone/request`,{phone:e});t.demoOtp?(F(`Demo OTP: ${t.demoOtp} (berlaku 10 menit)`,`info`,12e3),console.log(`[DEMO] Phone OTP: ${t.demoOtp}`)):F(`OTP dikirim via SMS`,`success`);let n=document.getElementById(`phone-otp-row`);n&&(n.style.display=``)}catch(e){F(e.message,`error`)}}),document.getElementById(`verify-phone-otp`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`phone-otp-input`)?.value.trim();if(!e||e.length<6)return F(`Masukkan kode OTP 6 digit`,`error`);let t=document.getElementById(`phone-input`)?.value.trim();try{await R.post(`/verification/phone/verify`,{otp:e,phone:t});let n=f.getState().user;n&&f.setState({user:{...n,phoneVerified:!0,phone:t}}),F(`Nomor telepon berhasil diverifikasi!`,`success`),setTimeout(()=>Q.render(),1e3)}catch(e){F(e.message,`error`)}})),document.getElementById(`demo-ktp-btn`)?.addEventListener(`click`,async()=>{try{await R.post(`/verification/demo/ktp`,{}),F(`✅ KTP berhasil diverifikasi (mode demo)!`,`success`),setTimeout(()=>Q.render(),1200)}catch(e){F(e.message,`error`)}}),document.getElementById(`demo-bank-btn`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`bank-name`)?.value,t=document.getElementById(`account-number`)?.value,n=document.getElementById(`account-name`)?.value;if(!e)return F(`Pilih nama bank dulu`,`error`);if(!t||t.length<5)return F(`Nomor rekening minimal 5 digit`,`error`);if(!n||n.length<3)return F(`Nama pemilik minimal 3 karakter`,`error`);try{await R.post(`/verification/demo/bank`,{bankName:e,accountNumber:t,accountName:n}),F(`✅ Rekening bank berhasil diverifikasi (mode demo)!`,`success`),setTimeout(()=>Q.render(),1200)}catch(e){F(e.message,`error`)}});let s=(e,t)=>{let n=document.getElementById(e),r=document.getElementById(t);n?.addEventListener(`change`,()=>{let e=n.files?.[0];if(!(!e||!r)){if(!e.type.startsWith(`image/`)||e.size>5*1024*1024)return n.value=``,F(`Gunakan gambar JPG/PNG maksimal 5MB`,`error`);r.src=URL.createObjectURL(e),r.hidden=!1}})};s(`ktp-file`,`ktp-preview`),s(`ktp-selfie-file`,`ktp-selfie-preview`),s(`bank-file`,`bank-preview`);let c=document.getElementById(`ktp-form`);c&&c.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`ktp-file`)?.files[0],n=document.getElementById(`ktp-selfie-file`)?.files[0],r=document.getElementById(`ktp-number`)?.value.trim();if(!/^\d{16}$/.test(r||``))return F(`Nomor KTP harus 16 digit`,`error`);if(!t||!n)return F(`Foto KTP dan selfie dengan KTP wajib dipilih`,`error`);let i=e.target.querySelector(`button[type=submit]`);i.disabled=!0,i.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Uploading...`;try{let[e,a]=await Promise.all([wt(t,`kyc`,e=>{i.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> KTP ${e}%`}),wt(n,`kyc`)]);await R.post(`/verification/ktp/submit`,{ktpNumber:r,ktpPhoto:e.url,ktpSelfie:a.url}),F(`📤 Dokumen KTP berhasil dikirim! Menunggu verifikasi admin.`,`success`),setTimeout(()=>Q.render(),1500)}catch(e){F(e.message,`error`),i.disabled=!1,i.innerHTML=`<i class="fa-solid fa-upload"></i> Upload KTP`}});let l=document.getElementById(`bank-form`);l&&l.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`bank-name`)?.value,n=document.getElementById(`account-number`)?.value,r=document.getElementById(`account-name`)?.value,i=document.getElementById(`bank-file`)?.files[0];if(!t)return F(`Pilih nama bank`,`error`);if(!n||n.length<5)return F(`Nomor rekening minimal 5 digit`,`error`);if(!r||r.length<3)return F(`Nama pemilik minimal 3 karakter`,`error`);let a=e.target.querySelector(`button[type=submit]`);a.disabled=!0,a.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Submitting...`;try{let e=i?(await wt(i,`kyc`)).url:void 0;await R.post(`/verification/bank`,{bankName:t,accountNumber:n,accountName:r,bankProof:e}),F(`Verifikasi bank submitted, menunggu admin`,`success`),setTimeout(()=>Q.render(),1500)}catch(e){F(e.message,`error`),a.disabled=!1,a.innerHTML=`<i class="fa-solid fa-upload"></i> Submit Verifikasi Bank`}})}function Yr(e){return{ORDER:`fa-receipt`,PAYMENT:`fa-credit-card`,MESSAGE:`fa-comment-dots`,REVIEW:`fa-star`,SYSTEM:`fa-circle-info`,DISPUTE:`fa-scale-balanced`,APPLICATION:`fa-paper-plane`,WITHDRAWAL:`fa-money-bill-transfer`,KYC:`fa-id-card`}[String(e||``).toUpperCase()]||`fa-bell`}async function Xr({mount:e}){if(!f.getState().user){Q.navigate(`/login`);return}e.innerHTML=`
    <div class="container page" style="max-width:1000px; margin:0 auto; padding:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:24px;">
        <div>
          <h1 class="page-title" style="margin:0; font-size:1.8rem;"><i class="fa-regular fa-bell" style="margin-right:12px;"></i> Notifikasi</h1>
          <p class="page-subtitle" style="margin:4px 0 0; color:#666;">Semua aktivitas dan update terbaru Anda</p>
        </div>
        <button class="btn btn-secondary btn-sm" id="page-read-all" style="padding:10px 20px; border-radius:30px; background:#f0f0f0; border:none; cursor:pointer;">
          <i class="fa-solid fa-check-double"></i> Tandai semua dibaca
        </button>
      </div>
      
      <div id="notif-list" class="flex-col" style="display:flex; flex-direction:column; gap:12px;">
        <div class="spinner" style="text-align:center; padding:40px;"></div>
      </div>
    </div>
  `;let t=e.querySelector(`#notif-list`),n=async()=>{try{let e=await R.get(`/notifications`),r=Array.isArray(e)?e:e?.data||[];if(!r.length){t.innerHTML=`
          <div class="empty" style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:20px;">
            <i class="fa-regular fa-bell-slash" style="font-size:3rem; color:#ccc;"></i>
            <h3 style="margin:12px 0 8px;">Belum ada notifikasi</h3>
            <p style="color:#999;">Notifikasi akan muncul di sini saat ada aktivitas</p>
            <a href="#/marketplace" class="btn btn-primary" style="display:inline-block; margin-top:16px; padding:10px 24px; background:#0a66c2; color:#fff; border-radius:30px; text-decoration:none;">Jelajahi Marketplace</a>
          </div>
        `;return}t.innerHTML=r.map(e=>`
        <div class="notif-card" data-id="${e.id}" data-url="${P(e.actionUrl||``)}" style="display:flex; gap:16px; padding:16px 20px; background:${e.isRead?`#fff`:`#f0f7ff`}; border-radius:16px; cursor:pointer; transition:all 0.2s; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="flex:none; width:48px; height:48px; border-radius:50%; background:${e.isRead?`#eef2f7`:`#0a66c2`}; display:flex; align-items:center; justify-content:center; color:${e.isRead?`#0a66c2`:`#fff`};">
            <i class="fa-solid ${Yr(e.type)}" style="font-size:1.2rem;"></i>
          </div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
              <div style="font-weight:600; font-size:1rem;">${P(e.title||``)}</div>
              <div style="font-size:0.7rem; color:#999; white-space:nowrap;">${M(e.createdAt)}</div>
            </div>
            <div style="font-size:0.85rem; color:#555; margin-top:4px; line-height:1.5;">${P(e.body||``)}</div>
            ${e.isRead?``:`<span class="badge badge-info" style="display:inline-block; margin-top:8px; background:#0a66c2; color:#fff; padding:2px 10px; border-radius:20px; font-size:0.7rem;">Baru</span>`}
          </div>
          <div style="flex:none;">
            <i class="fa-solid fa-chevron-right" style="color:#ccc;"></i>
          </div>
        </div>
      `).join(``),document.querySelectorAll(`.notif-card`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{e.style.transform=`translateX(4px)`,e.style.boxShadow=`0 4px 12px rgba(0,0,0,0.1)`}),e.addEventListener(`mouseleave`,()=>{e.style.transform=`translateX(0)`,e.style.boxShadow=`0 1px 3px rgba(0,0,0,0.05)`})}),t.querySelectorAll(`.notif-card`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.id,r=e.dataset.url;try{await R.patch(`/notifications/${t}/read`)}catch{}r?Q.navigate(r.startsWith(`/`)?r:`/${r}`):n()})})}catch(e){t.innerHTML=`<div class="empty"><h3>Gagal memuat notifikasi</h3><p>${P(e.message||``)}</p></div>`}};e.querySelector(`#page-read-all`)?.addEventListener(`click`,async()=>{try{await R.patch(`/notifications/read-all`),F(`✅ Semua notifikasi ditandai dibaca`,`success`),n()}catch(e){F(e.message||`Gagal menandai`,`error`)}}),n()}function Zr({mount:e}){e.innerHTML=`
    <div class="auth-wrap">
      <aside class="auth-side">
        <div>
          <div class="brand" style="color:#fff;font-size:1.5rem">
            <span class="brand-logo"><i class="fa-solid fa-handshake-angle"></i></span>
            <span class="brand-name" style="color:#fff">tolong<span style="color:var(--primary-light)">in</span><span class="brand-dot" aria-hidden="true"></span></span>
          </div>
          <h2 style="margin-top:3rem">Selamat datang kembali!</h2>
          <p>Masuk untuk melanjutkan ke marketplace jasa &amp; pekerjaan terbaik di Indonesia.</p>
        </div>
        <div>
          <div class="flex gap-md mb-2">
            <i class="fa-solid fa-quote-left" style="font-size:2rem;opacity:.6"></i>
          </div>
          <p style="font-size:1.1rem;color:#fff">"Tolongin membuat saya bisa menemukan freelancer berkualitas dengan harga yang fair. Sangat membantu!"</p>
          <div class="flex gap-md" style="align-items:center;margin-top:1rem">
            ${V({name:`Rina Pratiwi`})}
            <div><strong>Rina Pratiwi</strong><div style="font-size:.85rem;opacity:.8">Owner Brand Fashion</div></div>
          </div>
        </div>
      </aside>
      <div class="auth-form-wrap">
        <form class="auth-form" id="login-form" data-testid="login-form">
          <h1>Masuk</h1>
          <p class="sub">Belum punya akun? <a href="#/register" data-testid="goto-register">Daftar sekarang</a></p>
          <div class="form-group">
            <label class="label">Email</label>
            <div class="input-icon">
              <i class="fa-solid fa-envelope"></i>
              <input class="input" type="email" id="email" placeholder="email@anda.com" data-testid="login-email" required>
            </div>
          </div>
          <div class="form-group">
            <label class="label">Password</label>
            <div style="position: relative;">
              <div class="input-icon">
                <i class="fa-solid fa-lock"></i>
                <input class="input" type="password" id="password" placeholder="••••••" data-testid="login-password" required style="padding-right: 40px;">
              </div>
              <button type="button" class="toggle-password" data-target="password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; z-index: 10; font-size: 1rem;">
                👁️
              </button>
            </div>
          </div>
          <div class="flex-between mb-2">
            <div class="text-xs text-muted">
              🔒 Sesi Anda aman dengan cookie httpOnly
            </div>
            <a href="#/forgot-password" data-testid="forgot-link" style="font-size:.85rem">Lupa password?</a>
          </div>
          <button class="btn btn-primary btn-block btn-lg" type="submit" data-testid="login-submit-btn">Masuk</button>
          <div class="auth-divider">atau</div>
          <p class="text-center text-sm text-muted">Demo: <strong>admin@tolongin.com</strong> / <strong>Admin@123</strong></p>
        </form>
      </div>
    </div>`,document.querySelectorAll(`.toggle-password`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-target`),n=document.getElementById(t);n.type===`password`?(n.type=`text`,e.textContent=`🙈`):(n.type=`password`,e.textContent=`👁️`)})}),document.getElementById(`login-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`email`).value.trim(),n=document.getElementById(`password`).value;if(!N(t))return F(`Email tidak valid`,`error`);if(n.length<6)return F(`Password minimal 6 karakter`,`error`);let r=e.target.querySelector(`button[type=submit]`);r.disabled=!0,r.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Memproses...`;try{let{token:e,user:r}=await R.post(`/auth/login`,{email:t,password:n});f.setState({token:e,user:r}),F(`Halo, ${r.name}! 👋`,`success`),Q.navigate(r.role===`ADMIN`?`/admin`:`/dashboard`)}catch(e){F(e.message,`error`),r.disabled=!1,r.innerHTML=`Masuk`}})}function Qr({mount:e}){e.innerHTML=`
    <div class="auth-wrap">
      <aside class="auth-side">
        <div>
          <div class="brand" style="color:#fff;font-size:1.5rem">
            <span class="brand-logo"><i class="fa-solid fa-handshake-angle"></i></span>
            <span class="brand-name" style="color:#fff">tolong<span style="color:var(--primary-light)">in</span><span class="brand-dot" aria-hidden="true"></span></span>
          </div>
          <h2 style="margin-top:3rem">Satu akun untuk semua</h2>
          <p>Satu akun bisa cari jasa, cari kerja, dan menjual layanan. Tidak perlu pilih peran.</p>
        </div>
        <div>
          <ul style="list-style:none;padding:0;margin:0;color:#fff">
            <li style="margin-bottom:.75rem"><i class="fa-solid fa-circle-check" style="margin-right:.5rem"></i> Daftar gratis selamanya</li>
            <li style="margin-bottom:.75rem"><i class="fa-solid fa-circle-check" style="margin-right:.5rem"></i> Pembayaran aman dengan escrow</li>
            <li style="margin-bottom:.75rem"><i class="fa-solid fa-circle-check" style="margin-right:.5rem"></i> Verifikasi bertahap — verifikasi saat butuh</li>
            <li><i class="fa-solid fa-circle-check" style="margin-right:.5rem"></i> Komunitas freelancer terbesar</li>
          </ul>
        </div>
      </aside>
      <div class="auth-form-wrap">
        <form class="auth-form" id="reg-form" data-testid="register-form">
          <h1>Daftar Akun</h1>
          <p class="sub">Sudah punya akun? <a href="#/login" data-testid="goto-login">Masuk di sini</a></p>
          <div class="form-group">
            <label class="label">Nama Lengkap</label>
            <div class="input-icon"><i class="fa-solid fa-user"></i><input class="input" id="name" placeholder="Nama Anda" data-testid="reg-name" required minlength="3"></div>
          </div>
          <div class="form-group">
            <label class="label">Email</label>
            <div class="input-icon"><i class="fa-solid fa-envelope"></i><input class="input" type="email" id="email" placeholder="email@anda.com" data-testid="reg-email" required></div>
          </div>
          <div class="form-group">
            <label class="label">No. Telepon</label>
            <div class="input-icon"><i class="fa-solid fa-phone"></i><input class="input" type="tel" id="phone" placeholder="0812xxxxxxxx" data-testid="reg-phone"></div>
          </div>
          <div class="form-group">
            <label class="label">Password</label>
            <div style="position: relative;">
              <div class="input-icon"><i class="fa-solid fa-lock"></i><input class="input" type="password" id="password" placeholder="Min 8 karakter" data-testid="reg-password" required minlength="8" style="padding-right: 40px;"></div>
              <button type="button" class="toggle-password" data-target="password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; z-index: 10; font-size: 1rem;">
                👁️
              </button>
            </div>
            <div class="text-xs text-muted" id="pw-hint" style="margin-top:.35rem">Min 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka &amp; 1 simbol</div>
          </div>
          <div class="form-group">
            <label class="label">Konfirmasi Password</label>
            <div style="position: relative;">
              <div class="input-icon"><i class="fa-solid fa-lock"></i><input class="input" type="password" id="confirm" placeholder="Ketik ulang password" data-testid="reg-confirm" required minlength="8" style="padding-right: 40px;"></div>
              <button type="button" class="toggle-password" data-target="confirm" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; z-index: 10; font-size: 1rem;">
                👁️
              </button>
            </div>
          </div>
          <label class="checkbox mb-2"><input type="checkbox" required data-testid="register-tnc"> Saya setuju dengan <a href="#/">Syarat &amp; Ketentuan</a></label>
          <button class="btn btn-primary btn-block btn-lg" type="submit" data-testid="register-submit-btn">Daftar Sekarang</button>
        </form>
      </div>
    </div>`,document.querySelectorAll(`.toggle-password`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-target`),n=document.getElementById(t);n.type===`password`?(n.type=`text`,e.textContent=`🙈`):(n.type=`password`,e.textContent=`👁️`)})}),document.getElementById(`reg-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`name`).value.trim(),n=document.getElementById(`email`).value.trim(),r=document.getElementById(`phone`).value.trim(),i=document.getElementById(`password`).value,a=document.getElementById(`confirm`).value;if(t.length<3)return F(`Nama minimal 3 karakter`,`error`);if(!N(n))return F(`Email tidak valid`,`error`);if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(i))return F(`Password harus min 8 karakter dengan huruf besar, kecil, angka & simbol`,`error`);if(i!==a)return F(`Konfirmasi password tidak cocok`,`error`);let o=e.target.querySelector(`button[type=submit]`);o.disabled=!0,o.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Memproses...`;try{let e={name:t,email:n,password:i};r&&(e.phone=r);let{token:a,user:o}=await R.post(`/auth/register`,e);f.setState({token:a,user:o}),F(`📩 Selamat datang! Silakan verifikasi email Anda.`,`success`),Q.navigate(`/verification`)}catch(e){F(e.message,`error`),o.disabled=!1,o.innerHTML=`Daftar Sekarang`}})}function $r({mount:e,query:t}){e.innerHTML=`
    <div class="container-sm" style="padding:4rem 1rem">
      <div class="card card-pad-lg text-center" id="ve-card">
        <div class="spinner"></div>
        <p>Memverifikasi email...</p>
      </div>
    </div>`;let n=document.getElementById(`ve-card`);(async()=>{if(!t.token){n.innerHTML=`<i class="fa-solid fa-circle-xmark" style="font-size:3rem;color:var(--danger)"></i><h2>Token tidak ditemukan</h2><a class="btn btn-primary mt-2" href="#/">Beranda</a>`;return}try{await R.get(`/auth/verify-email?token=`+encodeURIComponent(t.token));let e=f.getState().user;e&&f.setState({user:{...e,emailVerified:!0}}),n.innerHTML=`<i class="fa-solid fa-circle-check" style="font-size:3rem;color:var(--success)"></i><h2>Email Terverifikasi!</h2><p class="text-muted">Akun Anda sekarang sudah aktif sepenuhnya.</p><a class="btn btn-primary mt-2" href="#/dashboard" data-testid="ve-go-dashboard">Ke Dashboard</a>`}catch(e){n.innerHTML=`<i class="fa-solid fa-circle-xmark" style="font-size:3rem;color:var(--danger)"></i><h2>Verifikasi Gagal</h2><p class="text-muted">${escape(e.message)}</p><a class="btn btn-secondary mt-2" href="#/">Beranda</a>`}})()}function ei({mount:e}){e.innerHTML=`
    <div class="container-sm" style="padding:4rem 1rem">
      <div class="card card-pad-lg">
        <h1>Lupa Password</h1>
        <p class="text-muted">Masukkan email Anda, kami akan kirim token reset (demo akan tampil langsung).</p>
        <form id="forgot-form">
          <div class="form-group">
            <label class="label">Email</label>
            <input class="input" type="email" id="email" placeholder="email@anda.com" data-testid="forgot-email" required>
          </div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="forgot-submit-btn">Kirim Link Reset</button>
        </form>
        <p class="text-center mt-2"><a href="#/login">Kembali ke Login</a></p>
      </div>
    </div>`,document.getElementById(`forgot-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`email`).value.trim();try{let e=await R.post(`/auth/forgot-password`,{email:t});e.resetToken?(F(`Token reset dibuat. Mengarahkan...`,`success`),setTimeout(()=>Q.navigate(`/reset-password?token=${e.resetToken}`),800)):F(`Jika email terdaftar, link reset akan dikirim`,`info`)}catch(e){F(e.message,`error`)}})}function ti({mount:e,query:t}){e.innerHTML=`
    <div class="container-sm" style="padding:4rem 1rem">
      <div class="card card-pad-lg">
        <h1>Reset Password</h1>
        <p class="text-muted">Masukkan password baru Anda.</p>
        <form id="reset-form">
          <input type="hidden" id="token" value="${t.token||``}">
          <div class="form-group">
            <label class="label">Password Baru</label>
            <div style="position: relative;">
              <input class="input" type="password" id="password" placeholder="Min 8 karakter, 1 angka, 1 simbol" data-testid="reset-password" required minlength="8" style="padding-right: 40px;">
              <button type="button" class="toggle-password" data-target="password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; z-index: 10; font-size: 1rem;">
                👁️
              </button>
            </div>
            <div class="text-xs text-muted">Minimal 8 karakter, mengandung 1 angka dan 1 simbol (!@#$%^&*)</div>
          </div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="reset-submit-btn">Reset Password</button>
        </form>
      </div>
    </div>`,document.querySelectorAll(`.toggle-password`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-target`),n=document.getElementById(t);n.type===`password`?(n.type=`text`,e.textContent=`🙈`):(n.type=`password`,e.textContent=`👁️`)})}),document.getElementById(`reset-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`token`).value,n=document.getElementById(`password`).value;if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(n)){F(`Password harus min 8 karakter dengan huruf besar, kecil, angka & simbol`,`error`);return}try{await R.post(`/auth/reset-password`,{token:t,password:n}),F(`Password berhasil direset, silakan login`,`success`),Q.navigate(`/login`)}catch(e){F(e.message,`error`)}})}var ni=5*1024*1024,ri=[`image/jpeg`,`image/png`,`image/webp`,`image/gif`];function ii(e,t={}){let n=t.folder||`images`,r=t.testid||`image-upload`,i=t.name||`image`,a=t.initial||``,o=()=>{e.innerHTML=`
      <div class="upload-zone ${a?`has-image`:``}" data-testid="${P(r)}-zone">
        ${a?`<img src="${P(a)}" class="upload-preview" alt="preview"/>`:`
          <div class="upload-placeholder">
            <i class="fa-solid fa-cloud-arrow-up"></i>
            <div><strong>Klik atau seret gambar ke sini</strong></div>
            <div class="text-xs text-muted">JPG, PNG, WEBP — max 5MB</div>
          </div>`}
        <input type="file" id="${i}-file" accept="image/*" hidden data-testid="${P(r)}-input">
        <div class="upload-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-pick data-testid="${P(r)}-pick"><i class="fa-solid fa-image"></i> Pilih File</button>
          ${a?`<button type="button" class="btn btn-ghost btn-sm" data-clear data-testid="${P(r)}-clear"><i class="fa-solid fa-xmark"></i> Hapus</button>`:``}
        </div>
        <div class="upload-progress" hidden><div class="bar"></div></div>
      </div>
      <details class="mt-1">
        <summary class="text-xs text-muted" style="cursor:pointer">Atau gunakan URL gambar</summary>
        <input type="url" class="input mt-1" placeholder="https://..." value="${P(a)}" data-url-input data-testid="${P(r)}-url">
      </details>
    `;let s=e.querySelector(`.upload-zone`),c=e.querySelector(`input[type=file]`),l=e.querySelector(`[data-url-input]`),u=e.querySelector(`.upload-progress`),d=e=>{a=e||``,t.onChange&&t.onChange(a),o()},f=async e=>{if(e){if(!ri.includes(e.type)){window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`error`,text:`Format tidak didukung — gunakan JPG/PNG/WEBP/GIF`}}));return}if(e.size>ni){window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`error`,text:`File terlalu besar (max 5MB)`}}));return}u.hidden=!1,u.querySelector(`.bar`).style.width=`40%`;try{let t=(await wt(e,n,e=>{u.querySelector(`.bar`).style.width=e+`%`})).url;u.querySelector(`.bar`).style.width=`100%`,setTimeout(()=>d(t),200)}catch(e){window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`error`,text:`Upload gagal: `+e.message}})),u.hidden=!0}}};e.querySelector(`[data-pick]`).addEventListener(`click`,()=>c.click()),c.addEventListener(`change`,e=>f(e.target.files[0]));let p=e.querySelector(`[data-clear]`);p&&p.addEventListener(`click`,()=>d(``)),l&&l.addEventListener(`change`,e=>d(e.target.value.trim())),s.addEventListener(`dragover`,e=>{e.preventDefault(),s.classList.add(`drag-over`)}),s.addEventListener(`dragleave`,()=>s.classList.remove(`drag-over`)),s.addEventListener(`drop`,e=>{e.preventDefault(),s.classList.remove(`drag-over`);let t=e.dataTransfer.files[0];t&&f(t)});let m=e.querySelector(`.upload-placeholder`);m&&m.addEventListener(`click`,()=>c.click())};return o(),{getValue:()=>a,setValue:e=>{a=e||``,o()},destroy:()=>{e.innerHTML=``}}}var ai={not_submitted:{label:`Belum Dikirim`,icon:`fa-circle-question`},pending:{label:`Menunggu Review`,icon:`fa-hourglass-half`},approved:{label:`Terverifikasi`,icon:`fa-circle-check`},verified:{label:`Terverifikasi`,icon:`fa-circle-check`},rejected:{label:`Ditolak`,icon:`fa-circle-xmark`}};async function oi({mount:e}){let t=f.getState().user;if(!t||t.role!==`SELLER`){e.innerHTML=B(`Hanya seller yang perlu KYC`,`Buyer tidak perlu melakukan verifikasi identitas.`);return}e.innerHTML=`<div class="container-sm page"><div class="spinner"></div></div>`;let n;try{n=await R.get(`/kyc/me`)}catch{n={status:`not_submitted`,data:{}}}let r=String(n.status||`not_submitted`).toLowerCase(),i=n.data||{},a=ai[r]||ai.not_submitted,o=r===`pending`||r===`approved`||r===`verified`;e.innerHTML=`
    <div class="container-sm page">
      <h1 class="page-title">Verifikasi Identitas (KYC)</h1>
      <p class="page-subtitle">Verifikasi diperlukan untuk menerima pembayaran dan membangun kepercayaan pembeli.</p>
      <div class="card card-pad-lg">
        <div class="flex-between mb-2">
          <strong>Status</strong>
          <span class="kyc-status ${r}" data-testid="kyc-status"><i class="fa-solid ${a.icon}"></i> ${a.label}</span>
        </div>
        ${r===`rejected`&&i.rejectReason?`<div class="card card-pad" style="background:#fef2f2;border:1px solid #fecaca;margin-bottom:1rem"><strong>Alasan ditolak:</strong> ${P(i.rejectReason)}</div>`:``}
        <form id="kyc-form" data-testid="kyc-form">
          <div class="form-group"><label class="label">Nama Lengkap (sesuai KTP)</label><input class="input" id="fullName" required ${o?`disabled`:``} value="${P(i.fullName||t.name)}" data-testid="kyc-fullname"></div>
          <div class="form-group"><label class="label">Nomor KTP (16 digit)</label><input class="input" id="ktpNumber" required ${o?`disabled`:``} minlength="10" maxlength="20" value="${P(i.ktpNumber||``)}" placeholder="3201..." data-testid="kyc-ktp-number"></div>
          <div class="form-group">
            <label class="label">Foto KTP</label>
            <div id="ktp-upload"></div>
          </div>
          <div class="form-group">
            <label class="label">Selfie dengan KTP</label>
            <div id="selfie-upload"></div>
          </div>
          <h3 style="margin-top:2rem">Rekening Bank (untuk pencairan)</h3>
          <div class="grid grid-2">
            <div class="form-group"><label class="label">Nama Bank</label><input class="input" id="bankName" required ${o?`disabled`:``} value="${P(i.bankName||``)}" placeholder="BCA, Mandiri..." data-testid="kyc-bank"></div>
            <div class="form-group"><label class="label">Nomor Rekening</label><input class="input" id="bankAccountNumber" required ${o?`disabled`:``} minlength="5" value="${P(i.bankAccountNumber||``)}" data-testid="kyc-bank-number"></div>
          </div>
          <div class="form-group"><label class="label">Nama Pemilik Rekening</label><input class="input" id="bankAccountName" required ${o?`disabled`:``} value="${P(i.bankAccountName||``)}" data-testid="kyc-bank-name"></div>
          ${o?``:`<button class="btn btn-primary btn-lg btn-block" type="submit" data-testid="kyc-submit-btn">${r===`rejected`?`Kirim Ulang`:`Kirim untuk Verifikasi`}</button>`}
        </form>
      </div>
    </div>`;let s=i.ktpPhoto||``,c=i.ktpSelfie||``;o?(document.getElementById(`ktp-upload`).innerHTML=s?`<img src="${P(s)}" class="upload-preview" alt="KTP"/>`:`<div class="text-muted">Belum diunggah</div>`,document.getElementById(`selfie-upload`).innerHTML=c?`<img src="${P(c)}" class="upload-preview" alt="Selfie"/>`:`<div class="text-muted">Belum diunggah</div>`):(ii(document.getElementById(`ktp-upload`),{folder:`kyc`,initial:s,name:`ktp-img`,testid:`kyc-ktp-upload`,onChange:e=>{s=e}}),ii(document.getElementById(`selfie-upload`),{folder:`kyc`,initial:c,name:`selfie-img`,testid:`kyc-selfie-upload`,onChange:e=>{c=e}}));let l=document.getElementById(`kyc-form`);l&&!o&&l.addEventListener(`submit`,async t=>{if(t.preventDefault(),!s)return F(`Foto KTP wajib diunggah`,`error`);if(!c)return F(`Selfie wajib diunggah`,`error`);let n={fullName:document.getElementById(`fullName`).value.trim(),ktpNumber:document.getElementById(`ktpNumber`).value.trim(),bankName:document.getElementById(`bankName`).value.trim(),bankAccountNumber:document.getElementById(`bankAccountNumber`).value.trim(),bankAccountName:document.getElementById(`bankAccountName`).value.trim(),ktpPhoto:s,ktpSelfie:c};try{await R.post(`/kyc/submit`,n),F(`KYC berhasil dikirim untuk review`,`success`),f.setState({user:{...f.getState().user,kycStatus:`pending`}}),setTimeout(()=>oi({mount:e}),500)}catch(e){F(e.message,`error`)}})}function si(e){return`<aside class="dash-side">
    <div class="who"><i class="fa-solid fa-shield-halved" style="font-size:1.5rem;color:var(--primary)"></i><div><div class="name">Admin Panel</div><div class="role">Tolongin</div></div></div>
    <a href="#/admin" class="side-link ${e===`home`?`active`:``}" data-testid="admin-side-home"><i class="fa-solid fa-gauge"></i> Dashboard</a>
    <a href="#/admin/sellers" class="side-link ${e===`sellers`?`active`:``}" data-testid="admin-side-sellers"><i class="fa-solid fa-user-check"></i> Verifikasi Penjual</a>
    <a href="#/admin/kyc" class="side-link ${e===`kyc`?`active`:``}" data-testid="admin-side-kyc"><i class="fa-solid fa-id-card"></i> Review KYC</a>
    <a href="#/admin/users" class="side-link ${e===`users`?`active`:``}" data-testid="admin-side-users"><i class="fa-solid fa-users"></i> Kelola User</a>
    <a href="#/admin/services" class="side-link ${e===`svc`?`active`:``}" data-testid="admin-side-svc"><i class="fa-solid fa-box"></i> Kelola Jasa</a>
    <a href="#/admin/jobs" class="side-link ${e===`jobs`?`active`:``}" data-testid="admin-side-jobs"><i class="fa-solid fa-briefcase"></i> Kelola Job</a>
    <a href="#/admin/disputes" class="side-link ${e===`disp`?`active`:``}" data-testid="admin-side-disp"><i class="fa-solid fa-flag"></i> Sengketa</a>
    <a href="#/admin/settings" class="side-link ${e===`set`?`active`:``}" data-testid="admin-side-set"><i class="fa-solid fa-gear"></i> Pengaturan</a>
    <a href="#/admin/activity" class="side-link ${e===`act`?`active`:``}" data-testid="admin-side-act"><i class="fa-solid fa-clock-rotate-left"></i> Activity Log</a>
  </aside>`}async function ci({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`home`)}<section><div class="spinner"></div></section></div></div>`;let t=e.querySelector(`section`);try{let e=await R.get(`/admin/stats`);t.innerHTML=`
      <h1 class="page-title">Admin Dashboard</h1>
      <p class="page-subtitle">Ringkasan platform Tolongin</p>
      <div class="kpis">
        <div class="kpi"><div class="ic"><i class="fa-solid fa-users"></i></div><div class="v">${e.users}</div><div class="l">Total User</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-box"></i></div><div class="v">${e.services}</div><div class="l">Total Jasa</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-briefcase"></i></div><div class="v">${e.jobs}</div><div class="l">Total Job</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-receipt"></i></div><div class="v">${e.orders}</div><div class="l">Total Order</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-user-clock"></i></div><div class="v">${e.pendingSellers}</div><div class="l">Penjual Menunggu</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-flag"></i></div><div class="v">${e.disputes}</div><div class="l">Sengketa Aktif</div></div>
        <div class="kpi" style="grid-column:span 2"><div class="ic"><i class="fa-solid fa-coins"></i></div><div class="v">${j(e.revenue||0)}</div><div class="l">Total Revenue</div></div>
      </div>`}catch(e){t.innerHTML=B(`Gagal memuat`,e.message)}}async function li({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`sellers`)}<section><h1>Verifikasi Penjual</h1><div id="list"></div></section></div></div>`;let t=async()=>{let e=(await R.get(`/admin/users`)).filter(e=>[`SELLER`].includes(e.role)&&!e.verified);document.getElementById(`list`).innerHTML=e.length?`
      <div class="card scroll-x"><table class="tbl">
        <thead><tr><th>Nama</th><th>Email</th><th>Kota</th><th>Daftar</th><th></th></tr></thead>
        <tbody>${e.map(e=>`<tr>
          <td><div class="flex gap-sm" style="align-items:center">${V(e,`sm`)}<strong>${P(e.name)}</strong></div></td>
          <td>${P(e.email)}</td><td>${P(e.city||`-`)}</td><td>${tt(e.createdAt)}</td>
          <td><button class="btn btn-success btn-sm" data-verify="${e.id}" data-testid="verify-${e.id}"><i class="fa-solid fa-check"></i> Verifikasi</button></td>
        </tr>`).join(``)}</tbody>
      </table></div>`:B(`Tidak ada penjual menunggu`,``,`fa-circle-check`),document.querySelectorAll(`[data-verify]`).forEach(e=>e.addEventListener(`click`,async()=>{try{await R.post(`/admin/users/${e.dataset.verify}/verify`),F(`Penjual diverifikasi`,`success`),t()}catch(e){F(e.message,`error`)}}))};t()}async function ui({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`users`)}<section><h1>Kelola User</h1><div id="list"></div></section></div></div>`;let t=async()=>{let e=await R.get(`/admin/users`);document.getElementById(`list`).innerHTML=`
      <div class="card scroll-x"><table class="tbl">
        <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
        <tbody>${e.map(e=>`<tr>
          <td><div class="flex gap-sm" style="align-items:center">${V(e,`sm`)}<strong>${P(e.name)}</strong>${e.verified?`<i class="fa-solid fa-circle-check" style="color:var(--primary)"></i>`:``}</div></td>
          <td>${P(e.email)}</td><td><span class="badge">${e.role}</span></td>
          <td>${e.suspended?`<span class="badge badge-danger">Suspended</span>`:`<span class="badge badge-success">Active</span>`}</td>
          <td>${e.role===`ADMIN`?`-`:`<button class="btn ${e.suspended?`btn-success`:`btn-danger`} btn-sm" data-suspend="${e.id}" data-testid="suspend-${e.id}">${e.suspended?`Aktifkan`:`Suspend`}</button>`}</td>
        </tr>`).join(``)}</tbody>
      </table></div>`,document.querySelectorAll(`[data-suspend]`).forEach(e=>e.addEventListener(`click`,()=>I(`Ubah status user?`,async()=>{try{await R.post(`/admin/users/${e.dataset.suspend}/suspend`),F(`Berhasil`,`success`),t()}catch(e){F(e.message,`error`)}})))};t()}async function di({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`svc`)}<section><h1>Kelola Jasa</h1><div id="list"></div></section></div></div>`;let t=async()=>{let e=await R.get(`/admin/services`);document.getElementById(`list`).innerHTML=`<div class="card scroll-x"><table class="tbl"><thead><tr><th>Jasa</th><th>Kategori</th><th>Harga</th><th></th></tr></thead><tbody>
      ${e.map(e=>`<tr><td>${P(e.title)}</td><td><span class="badge">${P(e.category)}</span></td><td>${j(e.price)}</td><td><a class="btn btn-secondary btn-sm" href="#/service/${e.id}">Lihat</a> <button class="btn btn-danger btn-sm" data-del-svc="${e.id}" data-testid="adm-del-svc-${e.id}">Hapus</button></td>`).join(``)}
    </tbody></table></div>`,document.querySelectorAll(`[data-del-svc]`).forEach(e=>e.addEventListener(`click`,()=>I(`Hapus jasa?`,async()=>{try{await R.del(`/services/`+e.dataset.delSvc),F(`Dihapus`,`success`),t()}catch(e){F(e.message,`error`)}})))};t()}async function fi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`jobs`)}<section><h1>Kelola Job</h1><div id="list"></div></section></div></div>`;let t=async()=>{let e=await R.get(`/admin/jobs`);document.getElementById(`list`).innerHTML=`<div class="card scroll-x"><table class="tbl"><thead><tr><th>Judul</th><th>Kategori</th><th>Budget</th><th>Status</th><th></th></tr></thead><tbody>
      ${e.map(e=>`<tr><td>${P(e.title)}</td><td>${P(e.category)}</td><td>${j(e.budget)}</td><td>${H(e.status)}</td><td><a class="btn btn-secondary btn-sm" href="#/jobs/${e.id}">Lihat</a> <button class="btn btn-danger btn-sm" data-del-job="${e.id}" data-testid="adm-del-job-${e.id}">Hapus</button></td>`).join(``)}
    </tbody></table></div>`,document.querySelectorAll(`[data-del-job]`).forEach(e=>e.addEventListener(`click`,()=>I(`Hapus job?`,async()=>{try{await R.del(`/jobs/`+e.dataset.delJob),F(`Dihapus`,`success`),t()}catch(e){F(e.message,`error`)}})))};t()}async function pi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`disp`)}<section><h1>Sengketa</h1><div id="list"></div></section></div></div>`;let t=async()=>{let e=await R.get(`/admin/disputes`);document.getElementById(`list`).innerHTML=e.length?`<div class="card scroll-x"><table class="tbl"><thead><tr><th>Order</th><th>Alasan</th><th>Status</th><th>Waktu</th><th></th></tr></thead><tbody>
      ${e.map(e=>`<tr><td>#${e.orderId.slice(0,8)}</td><td>${P(e.reason)}</td><td>${H(e.status)}</td><td>${M(e.createdAt)}</td><td>${e.status===`open`?`<button class="btn btn-success btn-sm" data-resolve="${e.id}" data-testid="resolve-${e.id}">Selesaikan</button>`:``}</td>`).join(``)}
    </tbody></table></div>`:B(`Tidak ada sengketa`,``,`fa-circle-check`),document.querySelectorAll(`[data-resolve]`).forEach(e=>e.addEventListener(`click`,async()=>{try{await R.post(`/admin/disputes/${e.dataset.resolve}/resolve`),F(`Diselesaikan`,`success`),t()}catch(e){F(e.message,`error`)}}))};t()}async function mi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`set`)}<section>
    <h1>Pengaturan Platform</h1>
    <div class="card card-pad-lg">
      <div class="form-group"><label class="label">Nama Platform</label><input class="input" value="Tolongin" data-testid="setting-name"></div>
      <div class="form-group"><label class="label">Platform Fee (%)</label><input class="input" type="number" value="5" data-testid="setting-fee"></div>
      <div class="form-group"><label class="label">Min Withdraw (Rp)</label><input class="input" type="number" value="100000" data-testid="setting-min-wd"></div>
      <div class="form-group"><label class="label">Email Support</label><input class="input" value="support@tolongin.id" data-testid="setting-email"></div>
      <button class="btn btn-primary" data-testid="settings-save" id="ss-save">Simpan</button>
    </div>
  </section></div></div>`,document.getElementById(`ss-save`).addEventListener(`click`,()=>F(`Pengaturan disimpan (demo)`,`success`))}async function hi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`act`)}<section><h1>Activity Log</h1><div id="list"></div></section></div></div>`;try{let e=await R.get(`/admin/activity`);document.getElementById(`list`).innerHTML=e.length?`<div class="card card-pad-lg"><div class="timeline">
      ${e.map(e=>`<div class="tl-step done"><strong>${P(e.type)}</strong> — ${P(e.message)}<div class="tl-time">${M(e.createdAt)}</div></div>`).join(``)}
    </div></div>`:B(`Belum ada aktivitas`)}catch(e){document.getElementById(`list`).innerHTML=B(`Gagal memuat`,e.message)}}async function gi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`kyc`)}<section>
    <div class="flex-between mb-2"><h1>Review KYC</h1>
      <div class="flex gap-sm">
        <button class="btn btn-secondary btn-sm" data-tab="pending" data-testid="kyc-tab-pending">Pending</button>
        <button class="btn btn-ghost btn-sm" data-tab="approved" data-testid="kyc-tab-approved">Approved</button>
        <button class="btn btn-ghost btn-sm" data-tab="rejected" data-testid="kyc-tab-rejected">Rejected</button>
      </div>
    </div>
    <div id="list"></div>
  </section></div></div>`;let t=`pending`,n=async()=>{e.querySelectorAll(`[data-tab]`).forEach(e=>e.classList.toggle(`btn-secondary`,e.dataset.tab===t)),e.querySelectorAll(`[data-tab]`).forEach(e=>e.classList.toggle(`btn-ghost`,e.dataset.tab!==t));try{let e=await R.get(`/admin/kyc?status=`+t);document.getElementById(`list`).innerHTML=e.length?e.map(e=>{let n=e.kyc||{};return`<div class="card card-pad-lg mb-2" data-testid="kyc-row-${e.id}">
          <div class="flex gap-md" style="align-items:flex-start;flex-wrap:wrap">
            <div style="flex:1;min-width:240px">
              <div class="flex gap-sm" style="align-items:center"><img src="${e.avatar}" class="avatar"/><div><strong>${P(e.name)}</strong><div class="text-sm text-muted">${P(e.email)}</div></div></div>
              <table class="tbl" style="margin-top:.75rem">
                <tr><td>Nama Lengkap</td><td><strong>${P(n.fullName||`-`)}</strong></td></tr>
                <tr><td>No. KTP</td><td>${P(n.ktpNumber||`-`)}</td></tr>
                <tr><td>Bank</td><td>${P(n.bankName||`-`)} — ${P(n.bankAccountNumber||`-`)}</td></tr>
                <tr><td>Atas Nama</td><td>${P(n.bankAccountName||`-`)}</td></tr>
                <tr><td>Dikirim</td><td>${M(n.submittedAt)}</td></tr>
                ${n.rejectReason?`<tr><td>Alasan Tolak</td><td style="color:#dc2626">${P(n.rejectReason)}</td></tr>`:``}
              </table>
            </div>
            <div style="display:flex;gap:.5rem;flex-wrap:wrap">
              ${n.ktpPhoto?`<div><div class="text-xs text-muted">KTP</div><img src="${P(n.ktpPhoto)}" style="width:160px;height:100px;object-fit:cover;border-radius:8px;border:1px solid var(--border)"/></div>`:``}
              ${n.ktpSelfie?`<div><div class="text-xs text-muted">Selfie</div><img src="${P(n.ktpSelfie)}" style="width:160px;height:100px;object-fit:cover;border-radius:8px;border:1px solid var(--border)"/></div>`:``}
            </div>
          </div>
          ${t===`pending`?`<div class="flex gap-sm" style="justify-content:flex-end;margin-top:1rem">
            <button class="btn btn-danger btn-sm" data-reject="${e.id}" data-testid="kyc-reject-${e.id}"><i class="fa-solid fa-xmark"></i> Tolak</button>
            <button class="btn btn-success btn-sm" data-approve="${e.id}" data-testid="kyc-approve-${e.id}"><i class="fa-solid fa-check"></i> Setujui</button>
          </div>`:``}
        </div>`}).join(``):B(`Tidak ada submission `+t,``,`fa-circle-check`),document.querySelectorAll(`[data-reject]`).forEach(e=>e.addEventListener(`click`,()=>{let t=document.createElement(`div`);t.className=`modal-overlay`,t.innerHTML=`
      <div class="modal modal-sm">
        <div class="modal-header">
          <h3 class="modal-title">Tolak Verifikasi KTP</h3>
          <button class="modal-close">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Alasan Penolakan</label>
            <textarea id="reject-reason" class="form-textarea" rows="4" placeholder="Berikan alasan penolakan KTP ini..."></textarea>
            <div class="form-error" id="reason-error"></div>
            <div class="form-hint">Alasan akan ditampilkan ke user</div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline cancel-btn">Batal</button>
          <button class="btn btn-danger confirm-reject-btn">Tolak</button>
        </div>
      </div>
    `,document.body.appendChild(t);let r=()=>t.remove();t.querySelector(`.modal-close`).addEventListener(`click`,r),t.querySelector(`.cancel-btn`).addEventListener(`click`,r),t.addEventListener(`click`,e=>{e.target===t&&r()});let i=t.querySelector(`.confirm-reject-btn`);i.addEventListener(`click`,async()=>{let a=t.querySelector(`#reject-reason`).value.trim();if(!a){t.querySelector(`#reason-error`).textContent=`Alasan penolakan wajib diisi`;return}if(a.length<3){t.querySelector(`#reason-error`).textContent=`Alasan minimal 3 karakter`;return}i.disabled=!0,i.textContent=`Memproses...`;try{await R.post(`/admin/kyc/${e.dataset.reject}/reject`,{reason:a}),r(),F(`KYC ditolak`,`success`),n()}catch(e){t.querySelector(`#reason-error`).textContent=e.message,i.disabled=!1,i.textContent=`Tolak`}})}))}catch(e){document.getElementById(`list`).innerHTML=B(`Gagal memuat`,e.message)}};e.querySelectorAll(`[data-tab]`).forEach(e=>e.addEventListener(`click`,()=>{t=e.dataset.tab,n()})),n()}var _i=[],vi=null,yi=null,bi=null;function xi(e){return RegExp(`^`+e.replace(/:[^/]+/g,`([^/]+)`)+`$`)}function Si(e){return[...e.matchAll(/:([^/]+)/g)].map(e=>e[1])}function Ci(e,t){let n={};return t.forEach((t,r)=>n[t]=decodeURIComponent(e[r+1])),n}function wi(e){for(let t of _i){let n=e.match(t.regex);if(n)return{r:t,params:Ci(n,t.keys)}}return null}function Ti(){if(bi){try{bi()}catch{}bi=null}}function Ei(){yi.innerHTML=``,vi&&vi(yi),window.scrollTo(0,0)}function Di(e,t){window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:e,text:t}}))}function Oi(e,t){if(e.opts.auth&&!f.getState().token)return Di(`warning`,`Silakan login terlebih dahulu`),Q.navigate(`/login`),!1;let n=f.getState().user;if(e.opts.auth&&n&&n.role!==`ADMIN`&&!n.avatar&&t!==`/settings`)return Di(`warning`,`Upload foto profil untuk melanjutkan`),Q.navigate(`/settings`),!1;if(e.opts.role){let t=f.getState().user,n=Array.isArray(e.opts.role)?e.opts.role:[e.opts.role];if(!t||!n.includes(t.role))return Di(`error`,`Anda tidak memiliki akses ke halaman ini`),Q.navigate(`/`),!1}return!0}async function ki(e,t,n,r,i){yi.innerHTML=`<div class="container app-fade-in"><div class="spinner"></div></div>`;try{let e=await t({params:n,query:r,mount:yi});typeof e==`function`&&(bi=e)}catch(e){console.error(`Handler error:`,e),yi.innerHTML=`<div class="container"><div class="empty"><i class="fa-solid fa-triangle-exclamation"></i><h3>Gagal memuat halaman</h3><p>${P(e.message)}</p><a href="#/" class="btn btn-primary mt-2">Kembali ke Beranda</a></div></div>`}window.scrollTo(0,0),window.dispatchEvent(new CustomEvent(`route-change`,{detail:{path:i}}))}var Q={add(e,t,n={}){return _i.push({path:e,handler:t,opts:n,regex:xi(e),keys:Si(e)}),this},setNotFound(e){return vi=e,this},mount(e){yi=e,window.addEventListener(`hashchange`,()=>this.render()),this.render()},navigate(e){let t=e;if(t!==`/`&&t.endsWith(`/`)&&(t=t.slice(0,-1)),location.hash===`#${t}`){this.render();return}location.hash=`#${t}`},current(){let e=location.hash.replace(/^#/,``)||`/`;return e!==`/`&&e.endsWith(`/`)&&(e=e.slice(0,-1)),e},async render(){let[e,t=``]=this.current().split(`?`),n=Object.fromEntries(new URLSearchParams(t)),r=wi(e);if(Ti(),!r)return Ei();Oi(r.r,e)&&await ki(r.r,r.r.handler,r.params,n,e)}};_i.length=0,Q.add(`/`,vt),Q.add(`/marketplace`,U),Q.add(`/services/:id`,yt),Q.add(`/jobs`,xt),Q.add(`/jobs/:id`,St),Q.add(`/users/:id`,Ur),Q.add(`/login`,Zr),Q.add(`/register`,Qr),Q.add(`/forgot-password`,ei),Q.add(`/reset-password`,ti),Q.add(`/orders`,kt,{auth:!0}),Q.add(`/orders/:id`,Pt,{auth:!0}),Q.add(`/chat`,wr,{auth:!0}),Q.add(`/chat/:id`,wr,{auth:!0}),Q.add(`/dashboard`,Z,{auth:!0}),Q.add(`/dashboard/overview`,Z,{auth:!0}),Q.add(`/dashboard/transactions`,Z,{auth:!0}),Q.add(`/dashboard/manage-services`,Z,{auth:!0}),Q.add(`/dashboard/manage-services/new`,Z,{auth:!0}),Q.add(`/dashboard/manage-services/edit/:id`,Z,{auth:!0}),Q.add(`/dashboard/manage-jobs`,Z,{auth:!0}),Q.add(`/dashboard/manage-jobs/new`,Z,{auth:!0}),Q.add(`/dashboard/manage-jobs/edit/:id`,Z,{auth:!0}),Q.add(`/dashboard/my-applications`,Z,{auth:!0}),Q.add(`/dashboard/favorites`,Z,{auth:!0}),Q.add(`/dashboard/earnings`,Z,{auth:!0}),Q.add(`/dashboard/account`,Z,{auth:!0}),Q.add(`/post-job`,()=>{location.hash=`#/dashboard/manage-jobs/new`},{auth:!0}),Q.add(`/post-service`,()=>{location.hash=`#/dashboard/manage-services/new`},{auth:!0}),Q.add(`/dashboard/buyer/orders`,Z,{auth:!0}),Q.add(`/dashboard/buyer/jobs`,Z,{auth:!0}),Q.add(`/dashboard/buyer/favorites`,Z,{auth:!0}),Q.add(`/dashboard/seller/services`,Z,{auth:!0}),Q.add(`/dashboard/seller/orders`,Z,{auth:!0}),Q.add(`/dashboard/seller/earnings`,Z,{auth:!0}),Q.add(`/profile`,Wr,{auth:!0}),Q.add(`/profile/:id`,Ur),Q.add(`/settings`,Gr,{auth:!0}),Q.add(`/verification`,Jr,{auth:!0}),Q.add(`/kyc`,oi,{auth:!0}),Q.add(`/notifications`,Xr,{auth:!0}),Q.add(`/verify-email`,$r),Q.add(`/admin`,ci,{auth:!0,role:`ADMIN`}),Q.add(`/admin/sellers`,li,{auth:!0,role:`ADMIN`}),Q.add(`/admin/kyc`,gi,{auth:!0,role:`ADMIN`}),Q.add(`/admin/users`,ui,{auth:!0,role:`ADMIN`}),Q.add(`/admin/services`,di,{auth:!0,role:`ADMIN`}),Q.add(`/admin/jobs`,fi,{auth:!0,role:`ADMIN`}),Q.add(`/admin/disputes`,pi,{auth:!0,role:`ADMIN`}),Q.add(`/admin/settings`,mi,{auth:!0,role:`ADMIN`}),Q.add(`/admin/activity`,hi,{auth:!0,role:`ADMIN`}),Q.setNotFound(Qi);var Ai=ct.endsWith(`/api`)?ct.slice(0,-4):ct,ji=null,Mi=new Set,Ni={connect(){let e=f.getState().token;!e||ji?.connected||(ji=yr(Ai+`/notifications`,{path:`/api/socket.io`,transports:[`websocket`,`polling`],auth:{token:e},withCredentials:!0}),ji.on(`notification`,e=>{Mi.forEach(t=>t(e))}),ji.on(`unread-count`,({count:e})=>{window.dispatchEvent(new CustomEvent(`notification-count`,{detail:Number(e)||0}))}))},onNotification(e){return Mi.add(e),()=>Mi.delete(e)},disconnect(){ji?.disconnect(),ji=null}},Pi=3e4,Fi=null,$=null,Ii=null,Li=null,Ri=e=>Hi(e.detail);function zi(e){return{ORDER:`fa-receipt`,PAYMENT:`fa-credit-card`,MESSAGE:`fa-comment-dots`,REVIEW:`fa-star`,SYSTEM:`fa-circle-info`,DISPUTE:`fa-scale-balanced`,APPLICATION:`fa-paper-plane`,WITHDRAWAL:`fa-money-bill-transfer`,KYC:`fa-id-card`}[String(e||``).toUpperCase()]||`fa-bell`}async function Bi(e){if(!e||!f.getState().user)return;Ki();let t=e.querySelector(`#notif-btn`);if(!t)return;t.querySelector(`.notif-badge`)||t.insertAdjacentHTML(`beforeend`,`<span class="notif-badge" style="display:none;position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;padding:0 4px;background:var(--danger,#ef4444);color:#fff;border-radius:9px;font-size:.65rem;font-weight:700;align-items:center;justify-content:center;line-height:1">0</span>`);let n=t.cloneNode(!0);t.parentNode.replaceChild(n,t),n.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),Wi(n)}),await Vi(),Ni.connect(),Li=Ni.onNotification(e=>{Vi(),$&&Gi(),F(e.title||`Notifikasi baru`,`info`)}),window.addEventListener(`notification-count`,Ri),Fi=setInterval(Vi,Pi)}async function Vi(){try{let e=await R.get(`/notifications?unreadOnly=true`);Hi((Array.isArray(e)?e:e?.data||[]).length)}catch{}}function Hi(e){let t=document.querySelector(`#notif-btn .notif-badge`);t&&(e>0?(t.textContent=e>99?`99+`:String(e),t.style.display=`flex`):t.style.display=`none`)}function Ui(){$&&=($.remove(),null),Ii&&=(document.removeEventListener(`click`,Ii),null)}async function Wi(e){if($){Ui();return}let t=e.parentElement;getComputedStyle(t).position===`static`&&(t.style.position=`relative`),$=document.createElement(`div`),$.className=`notif-panel`,$.style.cssText=`position:absolute;top:calc(100% + 8px);right:0;width:360px;max-width:92vw;background:var(--surface,#fff);border:1px solid var(--border,#e5e7eb);border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.18);z-index:1200;overflow:hidden`,$.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border,#e5e7eb)">
      <strong>Notifikasi</strong>
      <button class="btn btn-ghost btn-sm" id="notif-read-all" style="font-size:.75rem"><i class="fa-solid fa-check-double"></i> Tandai semua dibaca</button>
    </div>
    <div id="notif-list" style="max-height:60vh;overflow-y:auto">
      <div class="spinner" style="margin:24px auto"></div>
    </div>
    <div style="padding:10px 16px;border-top:1px solid var(--border,#e5e7eb);text-align:center">
      <a href="#/notifications" id="notif-see-all" style="font-size:.8rem;color:var(--primary,#0a66c2);text-decoration:none;font-weight:600">Lihat semua notifikasi</a>
    </div>`,e.parentElement.appendChild($),Ii=t=>{$&&!$.contains(t.target)&&!e.contains(t.target)&&Ui()},setTimeout(()=>document.addEventListener(`click`,Ii),0);let n=$.querySelector(`#notif-read-all`);n&&n.addEventListener(`click`,async e=>{e.stopPropagation();try{await R.patch(`/notifications/read-all`),F(`Semua notifikasi ditandai dibaca`,`success`),Hi(0),await Gi()}catch(e){F(e.message||`Gagal menandai`,`error`)}});let r=$.querySelector(`#notif-see-all`);r&&r.addEventListener(`click`,e=>{e.preventDefault(),Ui(),Q.navigate(`/notifications`)}),await Gi()}async function Gi(){let e=$?.querySelector(`#notif-list`);if(e)try{let t=await R.get(`/notifications`),n=Array.isArray(t)?t:t?.data||[];if(!n.length){e.innerHTML=`<div style="padding:32px 16px;text-align:center;color:var(--text-muted,#888)"><i class="fa-regular fa-bell-slash" style="font-size:1.5rem"></i><p style="margin:.5rem 0 0">Belum ada notifikasi</p></div>`;return}e.innerHTML=n.map(e=>`
        <div class="notif-item" data-id="${e.id}" data-url="${P(e.actionUrl||``)}" style="display:flex;gap:12px;padding:12px 16px;border-bottom:1px solid var(--border-light,#f1f1f1);cursor:pointer;transition:background 0.2s;${e.isRead?``:`background:var(--bg-light,#f5f8ff)`}">
          <div style="flex:none;width:34px;height:34px;border-radius:50%;background:var(--bg-light,#eef2f7);display:flex;align-items:center;justify-content:center;color:var(--primary,#0a66c2)">
            <i class="fa-solid ${zi(e.type)}"></i>
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;font-size:.88rem">${P(e.title||``)}</div>
            <div style="font-size:.8rem;color:var(--text-secondary,#555);margin-top:2px;word-break:break-word">${P(e.body||``)}</div>
            <div style="font-size:.72rem;color:var(--text-muted,#999);margin-top:4px">${M(e.createdAt)}</div>
          </div>
          ${e.isRead?``:`<div style="flex:none;width:8px;height:8px;border-radius:50%;background:var(--primary,#0a66c2);margin-top:6px"></div>`}
        </div>`).join(``),e.querySelectorAll(`.notif-item`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.id,r=e.dataset.url;if(n){try{await R.patch(`/notifications/${n}/read`)}catch{}if(await Vi(),Ui(),r&&r.trim()){let e=r.trim();e.startsWith(`/`)||(e=`/${e}`),e.startsWith(`#`)&&(e=e.substring(1)),Q.navigate(e)}}}),e.style.transition=`background 0.2s`,e.addEventListener(`mouseenter`,()=>{e.style.background=`var(--bg-hover, #f9fafb)`}),e.addEventListener(`mouseleave`,()=>{!e.dataset.read&&e.style.background&&(e.style.background=``)})})}catch(t){console.error(`[notif] Gagal memuat notifikasi:`,t),e.innerHTML=`<div style="padding:24px 16px;text-align:center;color:var(--text-muted,#888)"><i class="fa-solid fa-circle-exclamation"></i><p style="margin:.5rem 0 0">Gagal memuat notifikasi</p><button id="notif-retry" class="btn btn-sm btn-primary" style="margin-top:12px">Coba lagi</button></div>`;let n=e.querySelector(`#notif-retry`);n&&n.addEventListener(`click`,()=>{Gi()})}}function Ki(){Fi&&=(clearInterval(Fi),null),Li?.(),Li=null,window.removeEventListener(`notification-count`,Ri),Ni.disconnect(),Ui()}function qi(e){e.innerHTML=`
    <header class="navbar" data-testid="navbar">
      <div class="container navbar-inner">
        <a class="brand" href="#/" data-testid="brand-logo">
          <img src="/logotolongin.png" alt="Tolongin" class="brand-logo-img" height="36">
        </a>
        <button class="menu-toggle" id="menu-toggle" data-testid="mobile-menu-btn" aria-label="menu"><i class="fa-solid fa-bars"></i></button>
        <nav class="nav-links" id="nav-links"></nav>
        <div class="nav-right" id="nav-right"></div>
      </div>
    </header>
    <div id="verify-banner"></div>
    <main id="page-mount" class="app-fade-in"></main>
    <footer class="footer" id="site-footer"></footer>
  `,Yi(),Ji(),Xi(),f.subscribe(()=>{Yi(),Ji()}),window.addEventListener(`route-change`,()=>Yi());let t=document.getElementById(`menu-toggle`),n=document.getElementById(`nav-links`),r=document.querySelector(`.nav-overlay`);return r||(r=document.createElement(`div`),r.className=`nav-overlay`,document.body.appendChild(r)),t&&n&&(t.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),n.classList.toggle(`open`),r.classList.toggle(`active`)}),n.querySelectorAll(`a`).forEach(e=>{e.addEventListener(`click`,()=>{n.classList.remove(`open`),r.classList.remove(`active`)})}),r.addEventListener(`click`,()=>{n.classList.remove(`open`),r.classList.remove(`active`)}),window.addEventListener(`resize`,()=>{window.innerWidth>768&&n.classList.contains(`open`)&&(n.classList.remove(`open`),r.classList.remove(`active`))})),document.getElementById(`page-mount`)}function Ji(){let e=document.getElementById(`verify-banner`);if(!e)return;let{user:t}=f.getState();if(!t||t.emailVerified||t.role===`ADMIN`){e.innerHTML=``;return}e.innerHTML=`
    <div class="verify-banner" data-testid="verify-banner">
      <div class="container flex-between" style="gap:.75rem;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:.5rem"><i class="fa-solid fa-envelope-circle-check"></i><span>Email Anda belum terverifikasi. Verifikasi sekarang untuk membuka semua fitur.</span></div>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-secondary btn-sm" id="vb-send" data-testid="verify-banner-send">Kirim Ulang</button>
          <button class="btn btn-ghost btn-sm" id="vb-close" data-testid="verify-banner-close" aria-label="tutup"><i class="fa-solid fa-xmark"></i></button>
          <a class="btn btn-primary btn-sm" href="#/verification" data-testid="verify-banner-cta">Verifikasi Sekarang</a>
        </div>
      </div>
    </div>`;let n=e.querySelector(`#vb-send`);n&&n.addEventListener(`click`,async()=>{try{let{api:e}=await a(async()=>{let{api:e}=await Promise.resolve().then(()=>at);return{api:e}},void 0),t=await e.post(`/verification/email/request`,{});if(t.demoOtp){console.log(`🔗 Kode OTP: ${t.demoOtp}`);let e={type:`info`,html:`<span>Demo mode — Kode OTP: <strong>${t.demoOtp}</strong>. Masukkan di halaman verifikasi.</span>`,timeout:1e4};window.dispatchEvent(new CustomEvent(`toast`,{detail:e})),window.location.hash=`#/verification`}else window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`success`,text:`OTP terkirim! Cek console untuk demo.`}}))}catch(e){window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`error`,text:e.message}}))}});let r=e.querySelector(`#vb-close`);r&&r.addEventListener(`click`,()=>{e.innerHTML=``})}function Yi(){let{user:e,lang:t}=f.getState(),n=location.hash.replace(/^#/,``).split(`?`)[0]||`/`,r=e=>n===e||e!==`/`&&n.startsWith(e)?`active`:``,i=document.getElementById(`nav-links`),a=document.getElementById(`nav-right`);if(!(!i||!a))if(i.innerHTML=e&&e.role===`ADMIN`?`<a class="nav-link ${r(`/`)}" href="#/" data-testid="nav-home">${z(`nav.home`)}</a>
       <a class="nav-link ${r(`/admin`)}" href="#/admin" data-testid="nav-admin"><i class="fa-solid fa-shield-halved"></i> Admin</a>`:`
    <a class="nav-link ${r(`/marketplace`)}" href="#/marketplace" data-testid="nav-marketplace">
      <i class="fa-solid fa-magnifying-glass"></i> Cari Jasa
    </a>
    <a class="nav-link ${r(`/jobs`)}" href="#/jobs" data-testid="nav-jobs">
      <i class="fa-solid fa-briefcase"></i> Cari Kerja
    </a>
    <a class="nav-link ${r(`/chat`)}" href="#/chat" data-testid="nav-chat">
      <i class="fa-solid fa-comment"></i> Chat
    </a>
    ${e?`<a class="nav-link ${r(`/dashboard`)}" href="#/dashboard" data-testid="nav-dashboard">
      <i class="fa-solid fa-gauge"></i> Dashboard
    </a>`:``}
  `,e){a.innerHTML=`
      <button class="btn btn-ghost btn-sm" id="notif-btn" data-testid="notif-bell" title="Notifikasi" style="position:relative">
        <i class="fa-regular fa-bell"></i>
      </button>
      <div class="profile-dropdown" id="profile-dropdown" style="position:relative">
        <button class="profile-dropdown-trigger" id="profile-dropdown-trigger" data-testid="nav-profile" style="display:flex;align-items:center;gap:.5rem;padding:.3rem .6rem;background:none;border:none;cursor:pointer;border-radius:20px;">
          ${V(e,`sm`)}
          <span style="font-size:.85rem;font-weight:600">${P(e.name.split(` `)[0])}</span>
          <i class="fa-solid fa-chevron-down" style="font-size:10px;color:#666;"></i>
        </button>
        <div class="profile-dropdown-menu" id="profile-dropdown-menu" style="display:none;position:absolute;top:100%;right:0;min-width:220px;background:#fff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:1000;margin-top:8px;overflow:hidden;">
          <div style="padding:12px 16px;border-bottom:1px solid #eee;">
            <div style="font-weight:600">${P(e.name)}</div>
            <div style="font-size:12px;color:#666;">${P(e.email)}</div>
          </div>
          <a href="#/dashboard" class="dropdown-item" style="display:flex;align-items:center;gap:10px;padding:10px 16px;text-decoration:none;color:#333;transition:background 0.2s;">
            <i class="fa-solid fa-tachometer-alt" style="width:20px;"></i> Dashboard
          </a>
          <a href="#/profile" class="dropdown-item" style="display:flex;align-items:center;gap:10px;padding:10px 16px;text-decoration:none;color:#333;transition:background 0.2s;">
            <i class="fa-solid fa-user" style="width:20px;"></i> Profil Saya
          </a>
          <a href="#/orders" class="dropdown-item" style="display:flex;align-items:center;gap:10px;padding:10px 16px;text-decoration:none;color:#333;transition:background 0.2s;">
            <i class="fa-solid fa-receipt" style="width:20px;"></i> Transaksi
          </a>
          <a href="#/settings" class="dropdown-item" style="display:flex;align-items:center;gap:10px;padding:10px 16px;text-decoration:none;color:#333;transition:background 0.2s;">
            <i class="fa-solid fa-user-cog" style="width:20px;"></i> Pengaturan
          </a>
          <div style="border-top:1px solid #eee;margin-top:4px;">
            <button id="logout-btn-dropdown" class="dropdown-item" style="display:flex;align-items:center;gap:10px;padding:10px 16px;width:100%;text-align:left;background:none;border:none;cursor:pointer;color:#dc2626;">
              <i class="fa-solid fa-right-from-bracket" style="width:20px;"></i> Keluar
            </button>
          </div>
        </div>
      </div>
    `;let t=document.getElementById(`profile-dropdown-trigger`),n=document.getElementById(`profile-dropdown-menu`);t&&n&&(t.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation();let t=n.style.display===`block`;n.style.display=t?`none`:`block`}),document.addEventListener(`click`,e=>{!t.contains(e.target)&&!n.contains(e.target)&&(n.style.display=`none`)}),n.querySelectorAll(`.dropdown-item`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{e.style.background=`#f5f5f5`}),e.addEventListener(`mouseleave`,()=>{e.style.background=``})}));let r=a.querySelector(`#logout-btn-dropdown`);r&&r.addEventListener(`click`,()=>{f.logout(),window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`success`,text:`Berhasil keluar`}})),Q.navigate(`/`)}),Bi(a)}else Ki(),a.innerHTML=`
      <a class="btn btn-ghost btn-sm" href="#/login" data-testid="login-link">${z(`nav.login`)}</a>
      <a class="btn btn-primary btn-sm" href="#/register" data-testid="register-link">${z(`nav.register`)}</a>
    `}function Xi(){let e=document.getElementById(`site-footer`);e&&(e.innerHTML=`
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="color:#fff;margin-bottom:1rem">
            <img src="/logotolongin.png" alt="Tolongin" class="brand-logo-img" height="38" style="filter:brightness(0) invert(1)">
          </div>
          <p style="color:rgba(255,255,255,.7);font-size:.9rem">${z(`footer.tag`)}</p>
          <div class="flex gap-sm" style="margin-top:1rem">
            <a href="#" aria-label="instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="twitter"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="#" aria-label="linkedin"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
        <div><h4>Marketplace</h4>
          <a href="#/marketplace">Cari Jasa</a>
          <a href="#/jobs">Cari Kerja</a>
          <a href="#/register">Mulai Jual Jasa</a>
        </div>
        <div><h4>Perusahaan</h4>
          <a href="#/">Tentang Kami</a>
          <a href="#/">Karir</a>
          <a href="#/">Blog</a>
        </div>
        <div><h4>Bantuan</h4>
          <a href="#/">FAQ</a>
          <a href="#/">Pusat Bantuan</a>
          <a href="#/">Syarat &amp; Ketentuan</a>
        </div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} Tolongin Indonesia. Made with <i class="fa-solid fa-heart" style="color:#ef4444"></i> for sustainable growth.</div>
    </div>
  `)}async function Zi(){let e=f.getState();if(!(!e.user||e.token))try{let t=await R.post(`/auth/refresh`,{});t?.token&&f.setState({token:t.token,user:t.user||e.user})}catch{f.setState({token:null,refreshToken:null,user:null})}}function Qi(e){e.innerHTML=`
    <div class="container page" style="text-align:center; padding:60px 20px;" data-testid="not-found-page">
      <i class="fa-solid fa-circle-exclamation" style="font-size:4rem; color:#ccc;"></i>
      <h1 style="margin:16px 0 8px;">404 — Halaman Tidak Ditemukan</h1>
      <p style="color:#666;">Maaf, halaman yang Anda cari tidak tersedia.</p>
      <a href="#/" class="btn btn-primary" style="display:inline-block; margin-top:20px;" data-testid="back-home-btn">Kembali ke Beranda</a>
    </div>
  `}async function $i(){let e=qi(document.getElementById(`app`));await Zi(),Q.setNotFound(Qi).mount(e)}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,$i):$i();