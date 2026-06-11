var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=`modulepreload`,r=function(e){return`/`+e},i={},a=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(t.map(t=>{if(t=r(t,a),t in i)return;i[t]=!0;let o=t.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``;if(a)for(let n=e.length-1;n>=0;n--){let r=e[n];if(r.href===t&&(!o||r.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${s}`))return;let l=document.createElement(`link`);if(l.rel=o?`stylesheet`:n,o||(l.as=`script`),l.crossOrigin=``,l.href=t,c&&l.setAttribute(`nonce`,c),document.head.appendChild(l),o)return new Promise((e,n)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(let e of t||[])e.status===`rejected`&&s(e.reason);return e().catch(s)})},o=`tolongin_state`;function s(){try{let e=localStorage.getItem(o);if(e)return JSON.parse(e)}catch{}return{}}function c(e){let t=e.user,n={user:t?{id:t.id,name:t.name,email:t.email,phone:t.phone,role:t.role,avatar:typeof t.avatar==`string`&&!t.avatar.startsWith(`data:`)?t.avatar:null,verified:t.verified,emailVerified:t.emailVerified,phoneVerified:t.phoneVerified,ktpVerified:t.ktpVerified,bio:t.bio,city:t.city,rating:t.rating,reviewCount:t.reviewCount,completedOrders:t.completedOrders}:null,lang:e.lang,theme:e.theme};try{localStorage.setItem(o,JSON.stringify(n))}catch{try{localStorage.removeItem(o)}catch{}}}var l=s(),u={token:null,refreshToken:null,user:l.user||null,lang:l.lang||`id`,theme:l.theme||`light`},d=new Set,f={state:u,getState(){return this.state},setState(e){this.state={...this.state,...e},c(this.state),d.forEach(e=>e(this.state))},subscribe(e){return d.add(e),()=>d.delete(e)},async logout(){try{let{API:e}=await a(async()=>{let{API:e}=await Promise.resolve().then(()=>wt);return{API:e}},void 0);await fetch(`${e}/auth/logout`,{method:`POST`,credentials:`include`,headers:this.state.token?{Authorization:`Bearer ${this.state.token}`}:{}})}catch{}this.setState({token:null,refreshToken:null,user:null})}};function p(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function m(e){if(Array.isArray(e))return e}function h(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t!==0)for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function g(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _(e,t){return m(e)||h(e,t)||ee(e,t)||g()}function ee(e,t){if(e){if(typeof e==`string`)return p(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}var te=Object.entries,v=Object.setPrototypeOf,y=Object.isFrozen,b=Object.getPrototypeOf,ne=Object.getOwnPropertyDescriptor,x=Object.freeze,S=Object.seal,re=Object.create,ie=typeof Reflect<`u`&&Reflect,ae=ie.apply,oe=ie.construct;x||=function(e){return e},S||=function(e){return e},ae||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},oe||=function(e){return new e(...[...arguments].slice(1))};var se=D(Array.prototype.forEach),ce=D(Array.prototype.lastIndexOf),le=D(Array.prototype.pop),ue=D(Array.prototype.push),de=D(Array.prototype.splice),C=Array.isArray,fe=D(String.prototype.toLowerCase),pe=D(String.prototype.toString),me=D(String.prototype.match),he=D(String.prototype.replace),ge=D(String.prototype.indexOf),_e=D(String.prototype.trim),ve=D(Number.prototype.toString),ye=D(Boolean.prototype.toString),be=typeof BigInt>`u`?null:D(BigInt.prototype.toString),xe=typeof Symbol>`u`?null:D(Symbol.prototype.toString),w=D(Object.prototype.hasOwnProperty),T=D(Object.prototype.toString),E=D(RegExp.prototype.test),Se=Ce(TypeError);function D(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return ae(e,t,n)}}function Ce(e){return function(){return oe(e,[...arguments])}}function O(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:fe;if(v&&v(e,null),!C(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(y(t)||(t[r]=e),i=e)}e[i]=!0}return e}function we(e){for(let t=0;t<e.length;t++)w(e,t)||(e[t]=null);return e}function k(e){let t=re(null);for(let r of te(e)){var n=_(r,2);let i=n[0],a=n[1];w(e,i)&&(C(a)?t[i]=we(a):a&&typeof a==`object`&&a.constructor===Object?t[i]=k(a):t[i]=a)}return t}function Te(e){switch(typeof e){case`string`:return e;case`number`:return ve(e);case`boolean`:return ye(e);case`bigint`:return be?be(e):`0`;case`symbol`:return xe?xe(e):`Symbol()`;case`undefined`:return T(e);case`function`:case`object`:{if(e===null)return T(e);let t=e,n=A(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:T(e)}return T(e)}default:return T(e)}}function A(e,t){for(;e!==null;){let n=ne(e,t);if(n){if(n.get)return D(n.get);if(typeof n.value==`function`)return D(n.value)}e=b(e)}function n(){return null}return n}function Ee(e){try{return E(e,``),!0}catch{return!1}}var De=x(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),Oe=x(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),ke=x([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),Ae=x([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),je=x(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),Me=x([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),Ne=x([`#text`]),Pe=x(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),Fe=x(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-rendering.textlength.type.u1.u2.unicode.values.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),Ie=x(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),Le=x([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),Re=S(/{{[\w\W]*|^[\w\W]*}}/g),ze=S(/<%[\w\W]*|^[\w\W]*%>/g),Be=S(/\${[\w\W]*/g),Ve=S(/^data-[\-\w.\u00B7-\uFFFF]+$/),He=S(/^aria-[\-\w]+$/),Ue=S(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),We=S(/^(?:\w+script|data):/i),Ge=S(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ke=S(/^html$/i),qe=S(/^[a-z][.\w]*(-[.\w]+)+$/i),j={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Je=function(){return typeof window>`u`?null:window},Ye=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},Xe=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ze(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Je(),t=e=>Ze(e);if(t.version=`3.4.8`,t.removed=[],!e||!e.document||e.document.nodeType!==j.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=A(d,`cloneNode`),p=A(d,`remove`),m=A(d,`nextSibling`),h=A(d,`childNodes`),g=A(d,`parentNode`),_=A(d,`shadowRoot`),ee=A(d,`attributes`),v=o&&o.prototype?A(o.prototype,`nodeType`):null,y=o&&o.prototype?A(o.prototype,`nodeName`):null;if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let b,ne=``,S=0,ie=function(e){if(S>0)throw Se(`The configured TRUSTED_TYPES_POLICY.createHTML must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose createHTML wraps DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`);S++;try{return b.createHTML(e)}finally{S--}},ae=n,oe=ae.implementation,ve=ae.createNodeIterator,ye=ae.createDocumentFragment,be=ae.getElementsByTagName,xe=r.importNode,T=Xe();t.isSupported=typeof te==`function`&&typeof g==`function`&&oe&&oe.createHTMLDocument!==void 0;let D=Re,Ce=ze,we=Be,Qe=Ve,$e=He,M=We,et=Ge,N=qe,tt=Ue,P=null,F=O({},[...De,...Oe,...ke,...je,...Ne]),I=null,L=O({},[...Pe,...Fe,...Ie,...Le]),R=Object.seal(re(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),nt=null,rt=null,z=Object.seal(re(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),it=!0,at=!0,ot=!1,st=!0,B=!1,ct=!0,lt=!1,ut=!1,dt=!1,ft=!1,pt=!1,mt=!1,ht=!0,gt=!1,_t=`user-content-`,V=!0,H=!1,U={},W=null,vt=O({},[`annotation-xml`,`audio`,`colgroup`,`desc`,`foreignobject`,`head`,`iframe`,`math`,`mi`,`mn`,`mo`,`ms`,`mtext`,`noembed`,`noframes`,`noscript`,`plaintext`,`script`,`style`,`svg`,`template`,`thead`,`title`,`video`,`xmp`]),yt=null,bt=O({},[`audio`,`video`,`img`,`source`,`image`,`track`]),xt=null,St=O({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),Ct=`http://www.w3.org/1998/Math/MathML`,wt=`http://www.w3.org/2000/svg`,G=`http://www.w3.org/1999/xhtml`,Tt=G,Et=!1,Dt=null,Ot=O({},[Ct,wt,G],pe),K=O({},[`mi`,`mo`,`mn`,`ms`,`mtext`]),kt=O({},[`annotation-xml`]),At=O({},[`title`,`style`,`font`,`a`,`script`]),jt=null,Mt=[`application/xhtml+xml`,`text/html`],q=null,Nt=null,Pt=n.createElement(`form`),Ft=function(e){return e instanceof RegExp||e instanceof Function},It=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Nt&&Nt===e)return;(!e||typeof e!=`object`)&&(e={}),e=k(e),jt=Mt.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,q=jt===`application/xhtml+xml`?pe:fe,P=w(e,`ALLOWED_TAGS`)&&C(e.ALLOWED_TAGS)?O({},e.ALLOWED_TAGS,q):F,I=w(e,`ALLOWED_ATTR`)&&C(e.ALLOWED_ATTR)?O({},e.ALLOWED_ATTR,q):L,Dt=w(e,`ALLOWED_NAMESPACES`)&&C(e.ALLOWED_NAMESPACES)?O({},e.ALLOWED_NAMESPACES,pe):Ot,xt=w(e,`ADD_URI_SAFE_ATTR`)&&C(e.ADD_URI_SAFE_ATTR)?O(k(St),e.ADD_URI_SAFE_ATTR,q):St,yt=w(e,`ADD_DATA_URI_TAGS`)&&C(e.ADD_DATA_URI_TAGS)?O(k(bt),e.ADD_DATA_URI_TAGS,q):bt,W=w(e,`FORBID_CONTENTS`)&&C(e.FORBID_CONTENTS)?O({},e.FORBID_CONTENTS,q):vt,nt=w(e,`FORBID_TAGS`)&&C(e.FORBID_TAGS)?O({},e.FORBID_TAGS,q):k({}),rt=w(e,`FORBID_ATTR`)&&C(e.FORBID_ATTR)?O({},e.FORBID_ATTR,q):k({}),U=w(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?k(e.USE_PROFILES):e.USE_PROFILES:!1,it=e.ALLOW_ARIA_ATTR!==!1,at=e.ALLOW_DATA_ATTR!==!1,ot=e.ALLOW_UNKNOWN_PROTOCOLS||!1,st=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,B=e.SAFE_FOR_TEMPLATES||!1,ct=e.SAFE_FOR_XML!==!1,lt=e.WHOLE_DOCUMENT||!1,ft=e.RETURN_DOM||!1,pt=e.RETURN_DOM_FRAGMENT||!1,mt=e.RETURN_TRUSTED_TYPE||!1,dt=e.FORCE_BODY||!1,ht=e.SANITIZE_DOM!==!1,gt=e.SANITIZE_NAMED_PROPS||!1,V=e.KEEP_CONTENT!==!1,H=e.IN_PLACE||!1,tt=Ee(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Ue,Tt=typeof e.NAMESPACE==`string`?e.NAMESPACE:G,K=w(e,`MATHML_TEXT_INTEGRATION_POINTS`)&&e.MATHML_TEXT_INTEGRATION_POINTS&&typeof e.MATHML_TEXT_INTEGRATION_POINTS==`object`?k(e.MATHML_TEXT_INTEGRATION_POINTS):O({},[`mi`,`mo`,`mn`,`ms`,`mtext`]),kt=w(e,`HTML_INTEGRATION_POINTS`)&&e.HTML_INTEGRATION_POINTS&&typeof e.HTML_INTEGRATION_POINTS==`object`?k(e.HTML_INTEGRATION_POINTS):O({},[`annotation-xml`]);let t=w(e,`CUSTOM_ELEMENT_HANDLING`)&&e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING==`object`?k(e.CUSTOM_ELEMENT_HANDLING):re(null);if(R=re(null),w(t,`tagNameCheck`)&&Ft(t.tagNameCheck)&&(R.tagNameCheck=t.tagNameCheck),w(t,`attributeNameCheck`)&&Ft(t.attributeNameCheck)&&(R.attributeNameCheck=t.attributeNameCheck),w(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(R.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),B&&(at=!1),pt&&(ft=!0),U&&(P=O({},Ne),I=re(null),U.html===!0&&(O(P,De),O(I,Pe)),U.svg===!0&&(O(P,Oe),O(I,Fe),O(I,Le)),U.svgFilters===!0&&(O(P,ke),O(I,Fe),O(I,Le)),U.mathMl===!0&&(O(P,je),O(I,Ie),O(I,Le))),z.tagCheck=null,z.attributeCheck=null,w(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?z.tagCheck=e.ADD_TAGS:C(e.ADD_TAGS)&&(P===F&&(P=k(P)),O(P,e.ADD_TAGS,q))),w(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?z.attributeCheck=e.ADD_ATTR:C(e.ADD_ATTR)&&(I===L&&(I=k(I)),O(I,e.ADD_ATTR,q))),w(e,`ADD_URI_SAFE_ATTR`)&&C(e.ADD_URI_SAFE_ATTR)&&O(xt,e.ADD_URI_SAFE_ATTR,q),w(e,`FORBID_CONTENTS`)&&C(e.FORBID_CONTENTS)&&(W===vt&&(W=k(W)),O(W,e.FORBID_CONTENTS,q)),w(e,`ADD_FORBID_CONTENTS`)&&C(e.ADD_FORBID_CONTENTS)&&(W===vt&&(W=k(W)),O(W,e.ADD_FORBID_CONTENTS,q)),V&&(P[`#text`]=!0),lt&&O(P,[`html`,`head`,`body`]),P.table&&(O(P,[`tbody`]),delete nt.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw Se(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw Se(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=b;b=e.TRUSTED_TYPES_POLICY;try{ne=ie(``)}catch(e){throw b=t,e}}else b===void 0&&e.TRUSTED_TYPES_POLICY!==null&&(b=Ye(u,i)),b&&typeof ne==`string`&&(ne=ie(``));(T.uponSanitizeElement.length>0||T.uponSanitizeAttribute.length>0)&&P===F&&(P=k(P)),T.uponSanitizeAttribute.length>0&&I===L&&(I=k(I)),x&&x(e),Nt=e},Lt=O({},[...Oe,...ke,...Ae]),Rt=O({},[...je,...Me]),zt=function(e){let t=g(e);(!t||!t.tagName)&&(t={namespaceURI:Tt,tagName:`template`});let n=fe(e.tagName),r=fe(t.tagName);return Dt[e.namespaceURI]?e.namespaceURI===wt?t.namespaceURI===G?n===`svg`:t.namespaceURI===Ct?n===`svg`&&(r===`annotation-xml`||K[r]):!!Lt[n]:e.namespaceURI===Ct?t.namespaceURI===G?n===`math`:t.namespaceURI===wt?n===`math`&&kt[r]:!!Rt[n]:e.namespaceURI===G?t.namespaceURI===wt&&!kt[r]||t.namespaceURI===Ct&&!K[r]?!1:!Rt[n]&&(At[n]||!Lt[n]):!!(jt===`application/xhtml+xml`&&Dt[e.namespaceURI]):!1},Bt=function(e){ue(t.removed,{element:e});try{g(e).removeChild(e)}catch{p(e)}},Vt=function(e,n){try{ue(t.removed,{attribute:n.getAttributeNode(e),from:n})}catch{ue(t.removed,{attribute:null,from:n})}if(n.removeAttribute(e),e===`is`)if(ft||pt)try{Bt(n)}catch{}else try{n.setAttribute(e,``)}catch{}},Ht=function(e){let t=null,r=null;if(dt)e=`<remove></remove>`+e;else{let t=me(e,/^[\r\n\t ]+/);r=t&&t[0]}jt===`application/xhtml+xml`&&Tt===G&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=b?ie(e):e;if(Tt===G)try{t=new l().parseFromString(i,jt)}catch{}if(!t||!t.documentElement){t=oe.createDocument(Tt,`template`,null);try{t.documentElement.innerHTML=Et?ne:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),Tt===G?be.call(t,lt?`html`:`body`)[0]:lt?t.documentElement:a},Ut=function(e){return ve.call(e.ownerDocument||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Wt=function(e){e.normalize();let t=ve.call(e.ownerDocument||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),n=t.nextNode();for(;n;){let e=n.data;se([D,Ce,we],t=>{e=he(e,t,` `)}),n.data=e,n=t.nextNode()}let r=e.querySelectorAll?.call(e,`template`)??[];se(Array.from(r),e=>{Kt(e.content)&&Wt(e.content)})},Gt=function(e){let t=y?y(e):null;return typeof t!=`string`||q(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==ee(e)||typeof e.removeAttribute!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==v(e)||e.childNodes!==h(e)},Kt=function(e){if(!v||typeof e!=`object`||!e)return!1;try{return v(e)===j.documentFragment}catch{return!1}},J=function(e){if(!v||typeof e!=`object`||!e)return!1;try{return typeof v(e)==`number`}catch{return!1}};function Y(e,n,r){se(e,e=>{e.call(t,n,r,Nt)})}let qt=function(e){let n=null;if(Y(T.beforeSanitizeElements,e,null),Gt(e))return Bt(e),!0;let r=q(y?y(e):e.nodeName);if(Y(T.uponSanitizeElement,e,{tagName:r,allowedTags:P}),ct&&e.hasChildNodes()&&!J(e.firstElementChild)&&E(/<[/\w!]/g,e.innerHTML)&&E(/<[/\w!]/g,e.textContent)||ct&&e.namespaceURI===G&&r===`style`&&J(e.firstElementChild)||e.nodeType===j.progressingInstruction||ct&&e.nodeType===j.comment&&E(/<[/\w]/g,e.data))return Bt(e),!0;if(nt[r]||!(z.tagCheck instanceof Function&&z.tagCheck(r))&&!P[r]){if(!nt[r]&&Xt(r)&&(R.tagNameCheck instanceof RegExp&&E(R.tagNameCheck,r)||R.tagNameCheck instanceof Function&&R.tagNameCheck(r)))return!1;if(V&&!W[r]){let t=g(e),n=h(e);if(n&&t){let r=n.length;for(let i=r-1;i>=0;--i){let r=f(n[i],!0);t.insertBefore(r,m(e))}}}return Bt(e),!0}return(v?v(e):e.nodeType)===j.element&&!zt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&E(/<\/no(script|embed|frames)/i,e.innerHTML)?(Bt(e),!0):(B&&e.nodeType===j.text&&(n=e.textContent,se([D,Ce,we],e=>{n=he(n,e,` `)}),e.textContent!==n&&(ue(t.removed,{element:e.cloneNode()}),e.textContent=n)),Y(T.afterSanitizeElements,e,null),!1)},Jt=function(e,t,r){if(rt[t]||ht&&(t===`id`||t===`name`)&&(r in n||r in Pt))return!1;let i=I[t]||z.attributeCheck instanceof Function&&z.attributeCheck(t,e);if(!(at&&!rt[t]&&E(Qe,t))&&!(it&&E($e,t))){if(!i||rt[t]){if(!(Xt(e)&&(R.tagNameCheck instanceof RegExp&&E(R.tagNameCheck,e)||R.tagNameCheck instanceof Function&&R.tagNameCheck(e))&&(R.attributeNameCheck instanceof RegExp&&E(R.attributeNameCheck,t)||R.attributeNameCheck instanceof Function&&R.attributeNameCheck(t,e))||t===`is`&&R.allowCustomizedBuiltInElements&&(R.tagNameCheck instanceof RegExp&&E(R.tagNameCheck,r)||R.tagNameCheck instanceof Function&&R.tagNameCheck(r))))return!1}else if(!xt[t]&&!E(tt,he(r,et,``))&&!((t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&ge(r,`data:`)===0&&yt[e])&&!(ot&&!E(M,he(r,et,``)))&&r)return!1}return!0},Yt=O({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),Xt=function(e){return!Yt[fe(e)]&&E(N,e)},Zt=function(e){Y(T.beforeSanitizeAttributes,e,null);let n=e.attributes;if(!n||Gt(e))return;let r={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:I,forceKeepAttr:void 0},i=n.length;for(;i--;){let a=n[i],o=a.name,s=a.namespaceURI,c=a.value,l=q(o),d=c,f=o===`value`?d:_e(d);if(r.attrName=l,r.attrValue=f,r.keepAttr=!0,r.forceKeepAttr=void 0,Y(T.uponSanitizeAttribute,e,r),f=r.attrValue,gt&&(l===`id`||l===`name`)&&ge(f,_t)!==0&&(Vt(o,e),f=_t+f),ct&&E(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,f)){Vt(o,e);continue}if(l===`attributename`&&me(f,`href`)){Vt(o,e);continue}if(r.forceKeepAttr)continue;if(!r.keepAttr){Vt(o,e);continue}if(!st&&E(/\/>/i,f)){Vt(o,e);continue}B&&se([D,Ce,we],e=>{f=he(f,e,` `)});let p=q(e.nodeName);if(!Jt(p,l,f)){Vt(o,e);continue}if(b&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!s)switch(u.getAttributeType(p,l)){case`TrustedHTML`:f=ie(f);break;case`TrustedScriptURL`:f=b.createScriptURL(f);break}if(f!==d)try{s?e.setAttributeNS(s,o,f):e.setAttribute(o,f),Gt(e)?Bt(e):le(t.removed)}catch{Vt(o,e)}}Y(T.afterSanitizeAttributes,e,null)},Qt=function(e){let t=null,n=Ut(e);for(Y(T.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(Y(T.uponSanitizeShadowNode,t,null),qt(t),Zt(t),Kt(t.content)&&Qt(t.content),(v?v(t):t.nodeType)===j.element){let e=_?_(t):t.shadowRoot;Kt(e)&&($t(e),Qt(e))}Y(T.afterSanitizeShadowDOM,e,null)},$t=function(e){let t=v?v(e):e.nodeType;if(t===j.element){let t=_?_(e):e.shadowRoot;Kt(t)&&($t(t),Qt(t))}let n=h?h(e):e.childNodes;if(!n)return;let r=[];se(n,e=>{ue(r,e)});for(let e of r)$t(e);if(t===j.element){let t=y?y(e):null;if(typeof t==`string`&&q(t)===`template`){let t=e.content;Kt(t)&&$t(t)}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(Et=!e,Et&&(e=`<!-->`),typeof e!=`string`&&!J(e)&&(e=Te(e),typeof e!=`string`))throw Se(`dirty is not a string, aborting`);if(!t.isSupported)return e;if(ut||It(n),t.removed=[],typeof e==`string`&&(H=!1),H){let t=y?y(e):e.nodeName;if(typeof t==`string`){let e=q(t);if(!P[e]||nt[e])throw Se(`root node is forbidden and cannot be sanitized in-place`)}if(Gt(e))throw Se(`root node is clobbered and cannot be sanitized in-place`);$t(e)}else if(J(e))i=Ht(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===j.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),$t(a);else{if(!ft&&!B&&!lt&&e.indexOf(`<`)===-1)return b&&mt?ie(e):e;if(i=Ht(e),!i)return ft?null:mt?ne:``}i&&dt&&Bt(i.firstChild);let c=Ut(H?e:i);for(;o=c.nextNode();)qt(o),Zt(o),Kt(o.content)&&Qt(o.content);if(H)return B&&Wt(e),e;if(ft){if(B&&Wt(i),pt)for(s=ye.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(I.shadowroot||I.shadowrootmode)&&(s=xe.call(r,s,!0)),s}let l=lt?i.outerHTML:i.innerHTML;return lt&&P[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&E(Ke,i.ownerDocument.doctype.name)&&(l=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+l),B&&se([D,Ce,we],e=>{l=he(l,e,` `)}),b&&mt?ie(l):l},t.setConfig=function(){It(arguments.length>0&&arguments[0]!==void 0?arguments[0]:{}),ut=!0},t.clearConfig=function(){Nt=null,ut=!1},t.isValidAttribute=function(e,t,n){return Nt||It({}),Jt(q(e),q(t),n)},t.addHook=function(e,t){typeof t==`function`&&ue(T[e],t)},t.removeHook=function(e,t){if(t!==void 0){let n=ce(T[e],t);return n===-1?void 0:de(T[e],n,1)[0]}return le(T[e])},t.removeHooks=function(e){T[e]=[]},t.removeAllHooks=function(){T=Xe()},t}var Qe=Ze();function $e(e){return Qe.sanitize(String(e??``),{ADD_ATTR:[`target`]})}function M(e){return`Rp `+(Number(e)||0).toLocaleString(`id-ID`)}function et(e,t=!1){if(!e)return`-`;let n=new Date(e),r={year:`numeric`,month:`short`,day:`numeric`};return t&&(r.hour=`2-digit`,r.minute=`2-digit`),n.toLocaleDateString(`id-ID`,r)}function N(e){if(!e)return``;let t=new Date(e),n=Math.floor((Date.now()-t.getTime())/1e3);return n<60?`baru saja`:n<3600?`${Math.floor(n/60)} mnt lalu`:n<86400?`${Math.floor(n/3600)} jam lalu`:n<604800?`${Math.floor(n/86400)} hari lalu`:et(e)}function tt(e){return e?new Date(e).toLocaleTimeString(`id-ID`,{hour:`2-digit`,minute:`2-digit`}):``}function P(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e||``)}function F(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function I(e,t=`info`,n=3e3){let r=document.getElementById(`toast-host`);if(!r)return;let i=document.createElement(`div`);i.className=`toast ${t}`;let a={success:`fa-circle-check`,error:`fa-circle-exclamation`,warning:`fa-triangle-exclamation`,info:`fa-circle-info`}[t]||`fa-circle-info`;typeof e==`object`&&e&&e.html?i.innerHTML=`<i class="fa-solid ${a}"></i><span>${$e(e.html)}</span>`:i.innerHTML=`<i class="fa-solid ${a}"></i><span>${F(e)}</span>`,r.appendChild(i),setTimeout(()=>{i.style.transition=`all .3s`,i.style.opacity=`0`,i.style.transform=`translateX(120%)`,setTimeout(()=>i.remove(),300)},n)}window.addEventListener(`toast`,e=>{let t=e.detail||{};I(t.html?{html:t.html}:t.text,t.type,t.timeout||3e3)});function L({title:e,body:t,footer:n,onClose:r,size:i}){let a=document.getElementById(`modal-host`),o=document.createElement(`div`);o.className=`modal-backdrop`,o.innerHTML=`
    <div class="modal" style="${i===`lg`?`max-width:680px`:``}" role="dialog" data-testid="modal">
      <div class="modal-head"><h3>${F(e||``)}</h3><button class="btn btn-ghost btn-sm" data-close data-testid="modal-close-btn"><i class="fa-solid fa-xmark"></i></button></div>
      <div class="modal-body"></div>
      ${n?`<div class="modal-foot"></div>`:``}
    </div>`;let s=()=>{o.remove(),r&&r()};o.addEventListener(`click`,e=>{(e.target===o||e.target.closest(`[data-close]`))&&s()});let c=o.querySelector(`.modal-body`);if(typeof t==`string`?c.innerHTML=$e(t):t instanceof Node&&c.appendChild(t),n){let e=o.querySelector(`.modal-foot`);typeof n==`string`?e.innerHTML=$e(n):n instanceof Node&&e.appendChild(n)}return a.appendChild(o),{close:s,el:o}}function R(e,t){let n=L({title:`Konfirmasi`,body:`<p>${F(e)}</p>`,footer:`<button class="btn btn-secondary" data-close data-testid="confirm-cancel-btn">Batal</button><button class="btn btn-danger" data-testid="confirm-yes-btn" id="cf-yes">Ya, lanjutkan</button>`});n.el.querySelector(`#cf-yes`).addEventListener(`click`,()=>{n.close(),t&&t()})}function nt(e,t=300){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}var rt=null;async function z(){if(!rt)try{rt=(await a(()=>import(`./ServiceDetailPage-_mL6yIpM.js`),[])).ServiceDetailPage}catch(e){console.error(`Failed to load ServiceDetailPage:`,e),rt=async({mount:e})=>{e.innerHTML=`<div class="container page">
          <div class="empty">
            <i class="fa-solid fa-circle-exclamation"></i>
            <h3>Halaman tidak tersedia</h3>
            <p>Service detail page sedang dalam pengembangan</p>
            <a href="#/marketplace" class="btn btn-primary mt-2">Kembali ke Marketplace</a>
          </div>
        </div>`}}return rt}var it=[],at=null,ot=null,st=null,B={add(e,t,n={}){return it.push({path:e,handler:t,opts:n,regex:mt(e),keys:ht(e)}),this},setNotFound(e){return at=e,this},mount(e){ot=e,window.addEventListener(`hashchange`,()=>this.render()),this.render()},navigate(e){if(location.hash===`#${e}`){this.render();return}location.hash=`#${e}`},current(){return location.hash.replace(/^#/,``)||`/`},async render(){let[e,t=``]=this.current().split(`?`),n=Object.fromEntries(new URLSearchParams(t)),r=ct(e);if(lt(),!r)return ut();if(!ft(r.r))return;let i=r.r.handler;r.r.path===`/service/:id`&&(i=await z()),await pt(r.r,i,r.params,n,e)}};function ct(e){for(let t of it){let n=e.match(t.regex);if(n)return{r:t,params:gt(n,t.keys)}}return null}function lt(){if(st){try{st()}catch{}st=null}}function ut(){ot.innerHTML=``,at&&at(ot),window.scrollTo(0,0)}function dt(e,t){window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:e,text:t}}))}function ft(e){if(e.opts.auth&&!f.getState().token)return dt(`warning`,`Silakan login terlebih dahulu`),B.navigate(`/login`),!1;if(e.opts.role){let t=f.getState().user,n=Array.isArray(e.opts.role)?e.opts.role:[e.opts.role];if(!t||!n.includes(t.role))return dt(`error`,`Anda tidak memiliki akses ke halaman ini`),B.navigate(`/`),!1}return!0}async function pt(e,t,n,r,i){ot.innerHTML=`<div class="container app-fade-in"><div class="spinner"></div></div>`;try{let e=await t({params:n,query:r,mount:ot});typeof e==`function`&&(st=e)}catch(e){console.error(`Handler error:`,e),ot.innerHTML=`<div class="container"><div class="empty"><i class="fa-solid fa-triangle-exclamation"></i><h3>Gagal memuat halaman</h3><p>${F(e.message)}</p><a href="#/" class="btn btn-primary mt-2">Kembali ke Beranda</a></div></div>`}window.scrollTo(0,0),window.dispatchEvent(new CustomEvent(`route-change`,{detail:{path:i}}))}function mt(e){return RegExp(`^`+e.replace(/:[^/]+/g,`([^/]+)`)+`$`)}function ht(e){return[...e.matchAll(/:([^/]+)/g)].map(e=>e[1])}function gt(e,t){let n={};return t.forEach((t,r)=>n[t]=decodeURIComponent(e[r+1])),n}var _t={id:{"nav.home":`Beranda`,"nav.marketplace":`Cari Jasa`,"nav.jobs":`Cari Kerja`,"nav.orders":`Pesanan`,"nav.chat":`Chat`,"nav.dashboard":`Dashboard`,"nav.login":`Masuk`,"nav.register":`Daftar`,"nav.logout":`Keluar`,"nav.profile":`Profil`,"nav.settings":`Pengaturan`,"nav.admin":`Admin`,"common.save":`Simpan`,"common.cancel":`Batal`,"common.submit":`Kirim`,"common.search":`Cari`,"common.loading":`Memuat...`,"common.empty":`Belum ada data`,"common.back":`Kembali`,"common.edit":`Edit`,"common.delete":`Hapus`,"common.view":`Lihat`,"hero.tag":`Marketplace Jasa #1 di Indonesia`,"hero.title":`Cari jasa atau pekerjaan, semua bisa di`,"hero.lead":`Platform terpercaya yang menghubungkan freelancer profesional dengan klien di seluruh Indonesia. Mulai dari desain, web, les privat hingga marketing.`,"hero.cta1":`Cari Jasa`,"hero.cta2":`Daftar Jadi Penjual`,"sec.cats":`Jelajahi Kategori`,"sec.cats.sub":`Temukan jasa terbaik dari ribuan freelancer terverifikasi`,"sec.how":`Cara Kerja`,"sec.how.sub":`Hanya 4 langkah mudah untuk mulai`,"sec.featured":`Jasa Pilihan`,"sec.featured.sub":`Layanan terlaris yang dipercaya banyak klien`,"sec.testi":`Apa Kata Mereka`,"sec.testi.sub":`Cerita sukses dari pengguna Tolongin`,"sdg.title":`Mendukung SDGs Indonesia`,"sdg.sub":`Tolongin berkomitmen mendukung tujuan pembangunan berkelanjutan dengan menciptakan lapangan kerja digital yang inklusif untuk semua.`,"footer.tag":`Marketplace jasa & pekerjaan terpercaya untuk semua kebutuhan Anda.`},en:{"nav.home":`Home`,"nav.marketplace":`Cari Jasa`,"nav.jobs":`Find Work`,"nav.orders":`Orders`,"nav.chat":`Chat`,"nav.dashboard":`Dashboard`,"nav.login":`Sign In`,"nav.register":`Sign Up`,"nav.logout":`Logout`,"nav.profile":`Profile`,"nav.settings":`Settings`,"nav.admin":`Admin`,"common.save":`Save`,"common.cancel":`Cancel`,"common.submit":`Submit`,"common.search":`Search`,"common.loading":`Loading...`,"common.empty":`No data yet`,"common.back":`Back`,"common.edit":`Edit`,"common.delete":`Delete`,"common.view":`View`,"hero.tag":`#1 Services Marketplace in Indonesia`,"hero.title":`Find services or jobs, all on`,"hero.lead":`Trusted platform connecting professional freelancers with clients across Indonesia. From design, web, tutoring to marketing.`,"hero.cta1":`Browse Services`,"hero.cta2":`Become a Seller`,"sec.cats":`Explore Categories`,"sec.cats.sub":`Find the best services from thousands of verified freelancers`,"sec.how":`How it Works`,"sec.how.sub":`Just 4 easy steps to get started`,"sec.featured":`Featured Services`,"sec.featured.sub":`Bestsellers trusted by many clients`,"sec.testi":`Testimonials`,"sec.testi.sub":`Success stories from Tolongin users`,"sdg.title":`Supporting Indonesia SDGs`,"sdg.sub":`Tolongin is committed to supporting sustainable development goals by creating inclusive digital jobs for all.`,"footer.tag":`Trusted services & jobs marketplace for all your needs.`}};function V(e){let t=f.getState().lang||`id`;return _t[t]&&_t[t][e]||_t.id[e]||e}function H(e,t,n=`fa-folder-open`,r){return`<div class="empty" data-testid="empty-state">
    <i class="fa-solid ${n}"></i>
    <h3>${F(e)}</h3>
    <p>${F(t||``)}</p>
    ${r||``}
  </div>`}function U(e,t=``){e||={name:`User`,id:`default`};let n=t===`sm`?`avatar avatar-sm`:t===`lg`?`avatar avatar-lg`:t===`xl`?`avatar avatar-xl`:`avatar`,r=`https://i.pravatar.cc/150?u=default`;e.avatar&&e.avatar!==`null`&&e.avatar!==`undefined`&&e.avatar!==``?r=e.avatar:e.id?r=`https://i.pravatar.cc/150?u=${e.id}`:e.email&&(r=`https://i.pravatar.cc/150?u=${e.email}`);let i=e.name?e.name:`User`;return`<img class="${n}" src="${r}" alt="${F(i)}" onerror="this.onerror=null;this.src='https://i.pravatar.cc/150?u=fallback'" />`}function W(e){return e||=`unknown`,`<span class="status-pill ${{OPEN:`status-open`,IN_PROGRESS:`status-in_progress`,COMPLETED:`status-completed`,CANCELLED:`status-cancelled`,PENDING:`status-pending`,ACCEPTED:`status-accepted`,REJECTED:`status-rejected`,RESOLVED:`status-resolved`}[e]||`status-pending`}" data-testid="status-pill">${F(e.replace(/_/g,` `).toLowerCase())}</span>`}function vt(e){let t=Math.round(Number(e)||0),n=`<span class="stars">`;for(let e=1;e<=5;e++)n+=`<i class="fa-${e<=t?`solid`:`regular`} fa-star"></i>`;return n+=`</span>`,n}function yt(e,t={}){if(!e)return``;let n=e.seller||{},r=``;if(e.images)try{let t=typeof e.images==`string`?JSON.parse(e.images):e.images;r=Array.isArray(t)&&t.length>0?t[0]:``}catch{r=``}if(!r||r===`null`||r===`undefined`){let t=(e.title||`Service`).slice(0,20);r=`https://placehold.co/600x400/0a66c2/ffffff?text=${encodeURIComponent(t)}`}let i=n.name||`Penjual`,a=n.verified===!0,o=n.id||e.sellerId||null,s=typeof e.rating==`number`&&!isNaN(e.rating)?e.rating:0,c=typeof e.reviewCount==`number`&&!isNaN(e.reviewCount)?e.reviewCount:0,l=typeof e.price==`number`&&!isNaN(e.price)?e.price:0,u=e.title||`Untitled`,d=e.id||`unknown`;return`<a class="service-card" href="#/service/${d}" data-testid="service-card-${d}">
    <div class="thumb">
      <img src="${r}" alt="${F(u)}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x400/0a66c2/ffffff?text=No+Image'" />
      <button class="fav-btn ${t.favorited?`active`:``}" data-fav="${d}" data-testid="fav-btn-${d}" aria-label="favorite">
        <i class="fa-${t.favorited?`solid`:`regular`} fa-heart"></i>
      </button>
    </div>
    <div class="body">
      <div class="seller">
        ${U(n,`sm`)}
        ${o?`<span class="seller-link" data-user-id="${o}" data-testid="seller-link-${o}" style="cursor:pointer;color:var(--text-2)">${F(i)}</span>`:`<span>${F(i)}</span>`}
        ${a?`<i class="fa-solid fa-circle-check" style="color:var(--primary)" title="Verified"></i>`:``}
      </div>
      <div class="title">${F(u)}</div>
      <div class="meta">
        <div class="rating"><i class="fa-solid fa-star" style="color:var(--warning)"></i> ${s.toFixed(1)} <span class="text-muted">(${c})</span></div>
        <div class="price">${M(l)}</div>
      </div>
    </div>
  </a>`}function bt(e){e.innerHTML=`
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
  `,St(),xt(),Ct(),f.subscribe(()=>{St(),xt()}),window.addEventListener(`route-change`,()=>St());let t=document.getElementById(`menu-toggle`),n=document.getElementById(`nav-links`);return t&&n&&(t.addEventListener(`click`,e=>{e.stopPropagation(),n.classList.toggle(`open`)}),document.addEventListener(`click`,e=>{n.classList.contains(`open`)&&!n.contains(e.target)&&!t.contains(e.target)&&n.classList.remove(`open`)}),window.addEventListener(`resize`,()=>{window.innerWidth>768&&n.classList.contains(`open`)&&n.classList.remove(`open`)})),document.getElementById(`page-mount`)}function xt(){let e=document.getElementById(`verify-banner`);if(!e)return;let{user:t}=f.getState();if(!t||t.emailVerified||t.role===`ADMIN`){e.innerHTML=``;return}e.innerHTML=`
    <div class="verify-banner" data-testid="verify-banner">
      <div class="container flex-between" style="gap:.75rem;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:.5rem"><i class="fa-solid fa-envelope-circle-check"></i><span>Email Anda belum terverifikasi. Verifikasi sekarang untuk membuka semua fitur.</span></div>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-secondary btn-sm" id="vb-send" data-testid="verify-banner-send">Kirim Ulang</button>
          <button class="btn btn-ghost btn-sm" id="vb-close" data-testid="verify-banner-close" aria-label="tutup"><i class="fa-solid fa-xmark"></i></button>
          <a class="btn btn-primary btn-sm" href="#/verification" data-testid="verify-banner-cta">Verifikasi Sekarang</a>
        </div>
      </div>
    </div>`;let n=e.querySelector(`#vb-send`);n&&n.addEventListener(`click`,async()=>{try{let{api:e}=await a(async()=>{let{api:e}=await Promise.resolve().then(()=>wt);return{api:e}},void 0),t=await e.post(`/verification/email/request`,{});if(t.demoOtp){console.log(`🔗 Kode OTP: ${t.demoOtp}`);let e={type:`info`,html:`<span>Demo mode — Kode OTP: <strong>${t.demoOtp}</strong>. Masukkan di halaman verifikasi.</span>`,timeout:1e4};window.dispatchEvent(new CustomEvent(`toast`,{detail:e})),window.location.hash=`#/verification`}else window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`success`,text:`OTP terkirim! Cek console untuk demo.`}}))}catch(e){window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`error`,text:e.message}}))}});let r=e.querySelector(`#vb-close`);r&&r.addEventListener(`click`,()=>{e.innerHTML=``})}function St(){let{user:e,lang:t}=f.getState(),n=location.hash.replace(/^#/,``).split(`?`)[0]||`/`,r=e=>n===e||e!==`/`&&n.startsWith(e)?`active`:``,i=document.getElementById(`nav-links`),a=document.getElementById(`nav-right`);if(!i||!a)return;let o=e&&e.role===`ADMIN`;i.innerHTML=(o?`<a class="nav-link ${r(`/`)}" href="#/" data-testid="nav-home">${V(`nav.home`)}</a>`:`
    <a class="nav-link ${r(`/`)}" href="#/" data-testid="nav-home">${V(`nav.home`)}</a>
    <a class="nav-link ${r(`/marketplace`)}" href="#/marketplace" data-testid="nav-marketplace"><i class="fa-solid fa-magnifying-glass"></i> Cari Jasa</a>
    <a class="nav-link ${r(`/jobs`)}" href="#/jobs" data-testid="nav-jobs"><i class="fa-solid fa-briefcase"></i> Cari Kerja</a>
  `)+(e?o?`<a class="nav-link ${r(`/admin`)}" href="#/admin" data-testid="nav-admin"><i class="fa-solid fa-shield-halved"></i> Admin Dashboard</a>`:`
    <a class="nav-link ${r(`/orders`)}" href="#/orders" data-testid="nav-orders">${V(`nav.orders`)}</a>
    <a class="nav-link ${r(`/chat`)}" href="#/chat" data-testid="nav-chat">${V(`nav.chat`)}</a>
    <a class="nav-link ${r(`/dashboard`)}" href="#/dashboard" data-testid="nav-dashboard">${V(`nav.dashboard`)}</a>
  `:``);let s=`
    <div class="lang-toggle" data-testid="lang-toggle">
      <button class="${t===`id`?`active`:``}" data-lang="id" data-testid="lang-id">ID</button>
      <button class="${t===`en`?`active`:``}" data-lang="en" data-testid="lang-en">EN</button>
    </div>`;e?(a.innerHTML=`
      ${s}
      <button class="btn btn-ghost btn-sm" id="notif-btn" data-testid="notif-bell" title="Notifikasi" style="position:relative">
        <i class="fa-regular fa-bell"></i>
      </button>
      <a class="nav-link" href="#/users/${e.id}" data-testid="nav-profile" style="display:flex;align-items:center;gap:.5rem;padding:.3rem .6rem">
        ${U(e,`sm`)}
        <span style="font-size:.85rem;font-weight:600">${F(e.name.split(` `)[0])}</span>
      </a>
      <button class="btn btn-secondary btn-sm" id="logout-btn" data-testid="logout-btn"><i class="fa-solid fa-right-from-bracket"></i></button>
    `,a.querySelector(`#logout-btn`).addEventListener(`click`,()=>{f.logout(),window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`success`,text:`Berhasil keluar`}})),B.navigate(`/`)}),a.querySelector(`#notif-btn`).addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`info`,text:`Fitur notifikasi sedang dalam pengembangan`}}))})):a.innerHTML=`
      ${s}
      <a class="btn btn-ghost btn-sm" href="#/login" data-testid="login-link">${V(`nav.login`)}</a>
      <a class="btn btn-primary btn-sm" href="#/register" data-testid="register-link">${V(`nav.register`)}</a>
    `,a.querySelectorAll(`[data-lang]`).forEach(e=>{e.addEventListener(`click`,()=>{f.setState({lang:e.getAttribute(`data-lang`)}),B.render()})})}function Ct(){let e=document.getElementById(`site-footer`);e&&(e.innerHTML=`
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="color:#fff;margin-bottom:1rem">
            <img src="/logotolongin.png" alt="Tolongin" class="brand-logo-img" height="38" style="filter:brightness(0) invert(1)">
          </div>
          <p style="color:rgba(255,255,255,.7);font-size:.9rem">${V(`footer.tag`)}</p>
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
  `)}var wt=t({API:()=>G,api:()=>K}),G=`http://localhost:8001/api`,Tt=null;async function Et(){return Tt||=fetch(`${G}/auth/refresh`,{method:`POST`,credentials:`include`,headers:{"Content-Type":`application/json`},body:JSON.stringify({})}).then(async e=>{if(!e.ok)throw Error(`Refresh failed`);let t=await e.json();return f.setState({token:t.token,user:t.user||f.getState().user}),t.token}).finally(()=>{Tt=null}),Tt}async function Dt(e,{method:t=`GET`,body:n,auth:r=!0,token:i}={}){let a={},o=typeof FormData<`u`&&n instanceof FormData;if(!o&&n!==void 0&&(a[`Content-Type`]=`application/json`),r){let e=i||f.getState().token;e&&(a.Authorization=`Bearer ${e}`)}let s=`${G}${e}`;console.log(`📡 API Request:`,t,s);let c=await fetch(s,{method:t,headers:a,credentials:`include`,body:o?n:n===void 0?void 0:JSON.stringify(n)}),l;return l=(c.headers.get(`content-type`)||``).includes(`application/json`)?await c.json():await c.text(),{ok:c.ok,status:c.status,data:l}}async function Ot(e,t={}){let n=await Dt(e,t),r=e.startsWith(`/auth/login`)||e.startsWith(`/auth/register`)||e.startsWith(`/auth/refresh`)||e.startsWith(`/auth/logout`);if(n.status===401&&t.auth!==!1&&!r&&f.getState().user)try{let r=await Et();n=await Dt(e,{...t,token:r})}catch{f.setState({token:null,refreshToken:null,user:null})}if(!n.ok){let e=n.data,t=`Terjadi kesalahan`;e&&(typeof e==`string`?t=e:Array.isArray(e.message)?t=e.message.join(`, `):e.message?t=e.message:Array.isArray(e.errors)?t=e.errors.map(e=>e?.message||e).filter(Boolean).join(`, `):e.detail?t=e.detail:e.error&&(t=e.error));let r=Error(typeof t==`string`?t:JSON.stringify(t));throw r.status=n.status,r.data=e,r}return n.data}var K={get:e=>Ot(e),post:(e,t,n)=>Ot(e,{method:`POST`,body:t}),put:(e,t,n)=>Ot(e,{method:`PUT`,body:t}),del:e=>Ot(e,{method:`DELETE`})};async function kt({mount:e}){e.innerHTML=`
    <section class="hero">
      <div class="container hero-inner">
        <div>
          <span class="hero-eyebrow"><i class="fa-solid fa-star"></i> ${V(`hero.tag`)}</span>
          <h1>${V(`hero.title`)} <span class="accent">tolong<span class="brand-accent">in</span><span class="brand-dot" aria-hidden="true"></span></span></h1>
          <p class="lead">${V(`hero.lead`)}</p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-lg" href="#/marketplace" data-testid="hero-cta-marketplace"><i class="fa-solid fa-magnifying-glass"></i> ${V(`hero.cta1`)}</a>
            <a class="btn btn-secondary btn-lg" href="#/register" data-testid="hero-cta-seller"><i class="fa-solid fa-rocket"></i> ${V(`hero.cta2`)}</a>
          </div>
          <div class="flex gap-md mt-3" style="align-items:center">
            <div style="display:flex">
              ${[1,2,3,4].map(e=>`<img src="https://i.pravatar.cc/40?img=${e+10}" class="avatar avatar-sm" style="margin-left:-10px;border:2px solid white"/>`).join(``)}
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
          <h2>${V(`sec.cats`)}</h2>
          <p>${V(`sec.cats.sub`)}</p>
        </div>
        <div class="cat-grid" id="cat-grid"></div>
      </div>
    </section>

    <section class="section" style="background:#fff">
      <div class="container">
        <div class="section-head">
          <span class="section-eyebrow">Mudah</span>
          <h2>${V(`sec.how`)}</h2>
          <p>${V(`sec.how.sub`)}</p>
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
          <h2>${V(`sec.featured`)}</h2>
          <p>${V(`sec.featured.sub`)}</p>
        </div>
        <div class="grid grid-3" id="feat-services"></div>
        <div class="text-center mt-3"><a class="btn btn-outline" href="#/marketplace" data-testid="see-all-services">Lihat Semua Jasa <i class="fa-solid fa-arrow-right"></i></a></div>
      </div>
    </section>

    <section class="section" style="background:#fff">
      <div class="container">
        <div class="section-head">
          <span class="section-eyebrow">Testimoni</span>
          <h2>${V(`sec.testi`)}</h2>
          <p>${V(`sec.testi.sub`)}</p>
        </div>
        <div class="grid grid-3">
          ${[{name:`Rina Pratiwi`,role:`Owner Brand Fashion`,q:`Saya dapat designer logo yang amazing hanya dalam 3 hari. Tolongin benar-benar membantu bisnis saya naik level!`},{name:`Aditya Wirawan`,role:`Mahasiswa`,q:`Sebagai freelancer pemula, Tolongin memberikan saya kesempatan menambah penghasilan dengan klien-klien serius.`},{name:`Maya Sari`,role:`Founder Startup`,q:`Platformnya sangat user-friendly, pembayaran aman, dan kualitas freelancer di atas rata-rata. Sangat direkomendasikan!`}].map((e,t)=>`
            <div class="testimonial">
              <div class="stars">${`<i class="fa-solid fa-star"></i>`.repeat(5)}</div>
              <p class="quote">"${F(e.q)}"</p>
              <div class="who">
                <img src="https://i.pravatar.cc/100?img=${t+20}" class="avatar"/>
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
            <h2>${V(`sdg.title`)}</h2>
            <p>${V(`sdg.sub`)}</p>
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
  `;try{let[e,t]=await Promise.all([K.get(`/categories`),K.get(`/services/featured`)]),n=Array.isArray(t)?t:t.data||[],r=document.getElementById(`cat-grid`);r&&(r.innerHTML=e.map(e=>`
        <a class="cat-card" href="#/marketplace?category=${encodeURIComponent(e.slug)}" data-testid="cat-${e.slug}">
          <div class="cat-icon"><i class="fa-solid fa-${e.icon||`folder`}"></i></div>
          <div class="cat-name">${e.name}</div>
        </a>`).join(``));let i=document.getElementById(`feat-services`);i&&(i.innerHTML=n.slice(0,6).map(e=>yt(e)).join(``))}catch{}}function At({mount:e}){e.innerHTML=`
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
            <img src="https://i.pravatar.cc/60?img=12" class="avatar"/>
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
    </div>`,document.querySelectorAll(`.toggle-password`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-target`),n=document.getElementById(t);n.type===`password`?(n.type=`text`,e.textContent=`🙈`):(n.type=`password`,e.textContent=`👁️`)})}),document.getElementById(`login-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`email`).value.trim(),n=document.getElementById(`password`).value;if(!P(t))return I(`Email tidak valid`,`error`);if(n.length<6)return I(`Password minimal 6 karakter`,`error`);let r=e.target.querySelector(`button[type=submit]`);r.disabled=!0,r.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Memproses...`;try{let{token:e,user:r}=await K.post(`/auth/login`,{email:t,password:n});f.setState({token:e,user:r}),I(`Halo, ${r.name}! 👋`,`success`),B.navigate(r.role===`ADMIN`?`/admin`:`/dashboard`)}catch(e){I(e.message,`error`),r.disabled=!1,r.innerHTML=`Masuk`}})}function jt({mount:e}){e.innerHTML=`
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
    </div>`,document.querySelectorAll(`.toggle-password`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-target`),n=document.getElementById(t);n.type===`password`?(n.type=`text`,e.textContent=`🙈`):(n.type=`password`,e.textContent=`👁️`)})}),document.getElementById(`reg-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`name`).value.trim(),n=document.getElementById(`email`).value.trim(),r=document.getElementById(`phone`).value.trim().replace(/[\s.-]/g,``),i=document.getElementById(`password`).value,a=document.getElementById(`confirm`).value;if(t.length<3)return I(`Nama minimal 3 karakter`,`error`);if(!P(n))return I(`Email tidak valid`,`error`);if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(i))return I(`Password harus min 8 karakter dengan huruf besar, kecil, angka & simbol`,`error`);if(i!==a)return I(`Konfirmasi password tidak cocok`,`error`);let o=e.target.querySelector(`button[type=submit]`);o.disabled=!0,o.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Memproses...`;try{let e={name:t,email:n,password:i};r&&(e.phone=r);let{token:a,user:o}=await K.post(`/auth/register`,e);f.setState({token:a,user:o}),I(`Akun berhasil dibuat! Selamat datang 🎉`,`success`),B.navigate(`/dashboard`)}catch(e){I(e.message,`error`),o.disabled=!1,o.innerHTML=`Daftar Sekarang`}})}function Mt({mount:e,query:t}){e.innerHTML=`
    <div class="container-sm" style="padding:4rem 1rem">
      <div class="card card-pad-lg text-center" id="ve-card">
        <div class="spinner"></div>
        <p>Memverifikasi email...</p>
      </div>
    </div>`;let n=document.getElementById(`ve-card`);(async()=>{if(!t.token){n.innerHTML=`<i class="fa-solid fa-circle-xmark" style="font-size:3rem;color:var(--danger)"></i><h2>Token tidak ditemukan</h2><a class="btn btn-primary mt-2" href="#/">Beranda</a>`;return}try{await K.get(`/auth/verify-email?token=`+encodeURIComponent(t.token));let e=f.getState().user;e&&f.setState({user:{...e,emailVerified:!0}}),n.innerHTML=`<i class="fa-solid fa-circle-check" style="font-size:3rem;color:var(--success)"></i><h2>Email Terverifikasi!</h2><p class="text-muted">Akun Anda sekarang sudah aktif sepenuhnya.</p><a class="btn btn-primary mt-2" href="#/dashboard" data-testid="ve-go-dashboard">Ke Dashboard</a>`}catch(e){n.innerHTML=`<i class="fa-solid fa-circle-xmark" style="font-size:3rem;color:var(--danger)"></i><h2>Verifikasi Gagal</h2><p class="text-muted">${escape(e.message)}</p><a class="btn btn-secondary mt-2" href="#/">Beranda</a>`}})()}function q({mount:e}){e.innerHTML=`
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
    </div>`,document.getElementById(`forgot-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`email`).value.trim();try{let e=await K.post(`/auth/forgot-password`,{email:t});e.resetToken?(I(`Token reset dibuat. Mengarahkan...`,`success`),setTimeout(()=>B.navigate(`/reset-password?token=${e.resetToken}`),800)):I(`Jika email terdaftar, link reset akan dikirim`,`info`)}catch(e){I(e.message,`error`)}})}function Nt({mount:e,query:t}){e.innerHTML=`
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
    </div>`,document.querySelectorAll(`.toggle-password`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-target`),n=document.getElementById(t);n.type===`password`?(n.type=`text`,e.textContent=`🙈`):(n.type=`password`,e.textContent=`👁️`)})}),document.getElementById(`reset-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`token`).value,n=document.getElementById(`password`).value;if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(n)){I(`Password harus min 8 karakter dengan huruf besar, kecil, angka & simbol`,`error`);return}try{await K.post(`/auth/reset-password`,{token:t,password:n}),I(`Password berhasil direset, silakan login`,`success`),B.navigate(`/login`)}catch(e){I(e.message,`error`)}})}async function Pt({mount:e,query:t}){e.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Cari Jasa</h1>
          <p class="page-subtitle">Temukan jasa terbaik dari freelancer profesional</p>
        </div>
      </div>
      <div class="filters" data-testid="filters-bar" style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between;">
        <div class="input-icon" style="flex: 1; min-width: 200px; max-width: 300px;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input class="input" id="q" placeholder="Cari jasa..." value="${F(t.q||``)}" data-testid="search-input" style="padding-left: 2.5rem; width: 100%;">
        </div>
        <select class="select" id="cat" data-testid="filter-category" style="width: 150px;">
          <option value="all">Semua Kategori</option>
        </select>
        <div class="price-filter" style="display: flex; align-items: center; gap: 8px;">
          <input class="input" id="min" type="number" placeholder="Min Rp" style="width: 100px;">
          <span class="text-muted">—</span>
          <input class="input" id="max" type="number" placeholder="Max Rp" style="width: 100px;">
        </div>
        <button class="btn btn-secondary btn-sm" id="reset-filters" style="white-space: nowrap; padding: 8px 16px;">
          <i class="fa-solid fa-rotate-left"></i> Reset
        </button>
        <div id="results-count" class="text-sm text-muted" style="margin-left: auto; white-space: nowrap;"></div>
      </div>
      <div id="results" class="services-grid" data-testid="services-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 24px;"></div>
    </div>`;let n=await K.get(`/categories`),r=document.getElementById(`cat`);r.innerHTML=`<option value="all">Semua Kategori</option>`+n.map(e=>`<option value="${e.slug}" ${t.category===e.slug?`selected`:``}>${e.name}</option>`).join(``);let i=[];try{f.getState().token&&(i=(await K.get(`/favorites`)).map(e=>e.id),console.log(`Loaded favorites:`,i))}catch{}let a=async()=>{let e=new URLSearchParams;e.set(`limit`,`100`);let t=document.getElementById(`q`)?.value.trim()||``,r=document.getElementById(`cat`)?.value||`all`,a=document.getElementById(`min`)?.value||``,o=document.getElementById(`max`)?.value||``;if(t&&e.set(`q`,t),r&&r!==`all`){let t=n.find(e=>e.slug===r);t&&e.set(`categoryId`,t.id)}a&&e.set(`minPrice`,a),o&&e.set(`maxPrice`,o);let s=document.getElementById(`results`);if(s){s.innerHTML=`<div class="spinner" style="grid-column:1/-1; text-align:center; padding:40px;"></div>`;try{let t=await K.get(`/services?`+e.toString()),n=Array.isArray(t)?t:t.data||[];if(!n.length){s.innerHTML=`<div class="empty" style="grid-column:1/-1; text-align:center; padding:40px;">
          <i class="fa-solid fa-search"></i>
          <h3>Tidak ada hasil</h3>
          <p>Coba kata kunci lain atau ubah filter</p>
        </div>`;let e=document.getElementById(`results-count`);e&&(e.textContent=`0 jasa ditemukan`);return}s.innerHTML=n.map(e=>{let t=e.rating||0,n=e.reviewCount||0,r=e.image||e.images&&e.images[0]||`https://placehold.co/400x300/0a66c2/ffffff?text=No+Image`,a=i.includes(e.id);return`
            <div class="service-card" data-service-id="${e.id}" style="background:var(--surface);border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);transition:transform .2s,box-shadow .2s;cursor:pointer;display:flex;flex-direction:column;">
              <div class="service-image" style="height:200px;overflow:hidden;background:#f0f0f0;">
                <img src="${r}" 
                     alt="${F(e.title)}" 
                     style="width:100%;height:100%;object-fit:cover;"
                     onerror="this.src='https://placehold.co/400x300/0a66c2/ffffff?text=No+Image'">
              </div>
              <div class="service-content" style="padding:1rem; flex:1; display:flex; flex-direction:column; position:relative;">
                <div class="seller-link" data-user-id="${e.sellerId}" style="cursor:pointer; display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                  <img src="${e.seller?.avatar||`https://i.pravatar.cc/50`}" class="avatar avatar-sm" style="width:32px;height:32px;border-radius:50%;object-fit:cover;">
                  <span style="font-weight:500; color:var(--primary);">${F(e.seller?.name||`Seller`)}</span>
                  ${e.seller?.verified?`<i class="fa-solid fa-circle-check" style="color:var(--primary); font-size:12px;"></i>`:``}
                </div>
                <h3 style="font-size:1rem;margin:0 0 8px 0;line-height:1.4; min-height:44px;">${F(e.title)}</h3>
                <div class="flex gap-sm mb-2" style="align-items:center; gap:12px; margin-bottom:12px;">
                  <span style="display:flex;align-items:center;gap:4px;">
                    <i class="fa-solid fa-star" style="color:var(--warning);font-size:12px;"></i>
                    <strong>${t.toFixed(1)}</strong>
                    <span class="text-muted" style="font-size:12px;">(${n})</span>
                  </span>
                  <span class="text-muted" style="font-size:12px;">
                    <i class="fa-regular fa-clock"></i> ${e.deliveryTime||`Fleksibel`}
                  </span>
                </div>
                <div style="font-family:var(--font-head);font-weight:700;color:var(--primary-dark);font-size:1.25rem; margin-top:auto;">
                  ${M(e.price||0)}
                </div>
                <button class="btn-fav" data-fav="${e.id}" style="position:absolute;top:12px;right:12px;background:white;border:none;border-radius:50%;width:32px;height:32px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                  <i class="fa-${a?`solid`:`regular`} fa-heart" style="color:${a?`#dc3545`:`#999`};"></i>
                </button>
              </div>
            </div>
          `}).join(``);let r=document.getElementById(`results-count`);r&&(r.textContent=`${n.length} jasa ditemukan`),s.querySelectorAll(`.service-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.seller-link`)||t.target.closest(`.btn-fav`))return;let n=e.dataset.serviceId;n&&B.navigate(`/services/`+n)})}),s.querySelectorAll(`.seller-link`).forEach(e=>e.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation();let n=e.dataset.userId;n&&B.navigate(`/users/`+n)})),s.querySelectorAll(`.btn-fav`).forEach(e=>e.addEventListener(`click`,async t=>{if(t.preventDefault(),t.stopPropagation(),!f.getState().token){I(`Login dulu untuk menyimpan favorit`,`warning`);return}let n=e.dataset.fav,r=e.querySelector(`i`),a=r.classList.contains(`fa-solid`);console.log(`=== FAVORITE CLICK ===`),console.log(`Service ID:`,n),console.log(`Currently favorited (by icon):`,a),e.disabled=!0,e.style.opacity=`0.6`;try{let e=await K.post(`/favorites/`+n);console.log(`API Response:`,e);let t;if(e.favorited!==void 0)t=e.favorited===!0;else if(e.message){let n=e.message.toLowerCase();t=n.includes(`added`)?!0:n.includes(`removed`)?!1:!a}else t=!a;if(console.log(`New status:`,t),t)r.classList.remove(`fa-regular`),r.classList.add(`fa-solid`),r.style.color=`#dc3545`,i.includes(n)||i.push(n),I(`❤️ Ditambahkan ke favorit`,`success`);else{r.classList.remove(`fa-solid`),r.classList.add(`fa-regular`),r.style.color=`#999`;let e=i.indexOf(n);e>-1&&i.splice(e,1),I(`💔 Dihapus dari favorit`,`success`)}}catch(e){console.error(`Favorite error:`,e),I(e.message||`Gagal mengubah favorit`,`error`)}finally{e.disabled=!1,e.style.opacity=``}}))}catch(e){console.error(`Load error:`,e),s.innerHTML=`<div class="empty" style="grid-column:1/-1; text-align:center; padding:40px;">
        <i class="fa-solid fa-circle-exclamation"></i>
        <h3>Gagal memuat</h3>
        <p>${F(e.message)}</p>
        <button class="btn btn-primary mt-2" onclick="location.reload()">Coba Lagi</button>
      </div>`}}},o=nt(a,300);[`q`,`min`,`max`].forEach(e=>{let t=document.getElementById(e);t&&t.addEventListener(`input`,o)}),document.getElementById(`cat`)?.addEventListener(`change`,a),document.getElementById(`reset-filters`)?.addEventListener(`click`,()=>{document.getElementById(`q`).value=``,document.getElementById(`cat`).value=`all`,document.getElementById(`min`).value=``,document.getElementById(`max`).value=``,a()}),a()}async function Ft({mount:e,params:t}){e.innerHTML=`<div class="container page"><div class="spinner" style="text-align:center; padding:40px;"></div></div>`;try{let n=await K.get(`/services/`+t.id),r=f.getState().user,i=r&&n.sellerId===r.id,a=n.deliveryTime?`${n.deliveryTime} hari pengerjaan`:`Fleksibel`,o=n.rating||0,s=n.reviewCount||0;e.innerHTML=`
      <div class="container page" style="max-width:1200px; margin:0 auto; padding:20px;">
        <a href="#/marketplace" class="text-sm" data-testid="back-marketplace" style="display:inline-block; margin-bottom:20px; text-decoration:none; color:#0a66c2;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Cari Jasa
        </a>
        
        <div style="display:flex; gap:24px; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          
          <!-- KOLOM KIRI: GAMBAR VERTIKAL -->
          <div style="flex: 0.8; min-width:0; background:#f5f5f5;">
            <img src="${n.image||n.images&&n.images[0]||`https://placehold.co/600x800/0a66c2/ffffff?text=No+Image`}" 
                 alt="${F(n.title)}" 
                 style="width:100%; height:100%; min-height:500px; object-fit:cover; display:block;"
                 onerror="this.src='https://placehold.co/600x800/0a66c2/ffffff?text=No+Image'" />
          </div>
          
          <!-- KOLOM KANAN: KONTEN -->
          <div style="flex: 1.2; padding:24px; display:flex; flex-direction:column;">
            
            <span class="badge" style="display:inline-block; background:#e8f0fe; color:#0a66c2; padding:4px 12px; border-radius:20px; font-size:12px; width:fit-content; margin-bottom:16px;">
              ${F(n.category?.name||n.category||`Umum`)}
            </span>
            
            <h1 style="margin:0 0 12px 0; font-size:1.8rem; line-height:1.3;">${F(n.title)}</h1>
            
            <div style="display:flex; flex-wrap:wrap; gap:20px; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #eee;">
              <span style="display:flex; align-items:center; gap:6px; font-size:14px;">
                <i class="fa-solid fa-star" style="color:#f5b042;"></i>
                <strong>${o.toFixed(1)}</strong>
                <span style="color:#666;">(${s} ulasan)</span>
              </span>
              <span style="display:flex; align-items:center; gap:6px; font-size:14px; color:#666;">
                <i class="fa-solid fa-location-dot"></i> ${F(n.city||`Remote`)}
              </span>
              <span style="display:flex; align-items:center; gap:6px; font-size:14px; color:#666;">
                <i class="fa-solid fa-clock"></i> ${F(a)}
              </span>
            </div>
            
            <div style="margin-bottom:24px;">
              <h3 style="font-size:1rem; margin:0 0 12px 0; color:#333;">Deskripsi</h3>
              <p style="font-size:0.95rem; line-height:1.6; color:#555; margin:0;">${F(n.description||`Tidak ada deskripsi`)}</p>
            </div>
            
            <div style="background:#f8f9fa; border-radius:12px; padding:16px; margin-bottom:24px;">
              <h3 style="font-size:0.8rem; margin:0 0 12px 0; color:#666;">TENTANG PENJUAL</h3>
              <div class="seller-link" data-user-id="${n.sellerId}" style="cursor:pointer; display:flex; align-items:center; gap:12px;">
                <img src="${n.seller?.avatar||`https://i.pravatar.cc/48`}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;">
                <div>
                  <div style="font-weight:700; display:flex; align-items:center; gap:6px;">
                    ${F(n.seller?.name||`Penjual`)}
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
                  <div style="font-size:2rem; font-weight:700;">${M(n.price||0)}</div>
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
      
      <style>
        .order-btn:hover { background:#f0f0f0 !important; transform:translateY(-1px); transition:all 0.2s; }
        .chat-btn:hover { background:rgba(255,255,255,0.2) !important; transform:translateY(-1px); transition:all 0.2s; }
        .seller-link:hover { opacity:0.8; }
      </style>
    `;try{let e=await K.get(`/reviews/service/${n.id}`),t=Array.isArray(e)?e:e?.data||[],r=document.getElementById(`reviews-list`);t&&t.length>0?r.innerHTML=t.map(e=>`
          <div style="padding:12px 0; border-bottom:1px solid #eee;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              <img src="${e.reviewer?.avatar||e.buyerAvatar||`https://i.pravatar.cc/32`}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;">
              <div>
                <div style="font-weight:600; font-size:0.85rem;">${F(e.reviewer?.name||e.buyerName||`User`)}</div>
                <div style="font-size:0.7rem; color:#f5b042;">${`★`.repeat(e.rating)}${`☆`.repeat(5-e.rating)}</div>
              </div>
              <div style="font-size:0.7rem; color:#999; margin-left:auto;">${N(e.createdAt)}</div>
            </div>
            <p style="font-size:0.85rem; color:#555; margin:0;">${F(e.comment||``)}</p>
          </div>
        `).join(``):r.innerHTML=`<div style="text-align:center; padding:30px; color:#999;">Belum ada ulasan</div>`}catch{let e=document.getElementById(`reviews-list`);e&&(e.innerHTML=`<div style="text-align:center; padding:30px; color:#999;">Belum ada ulasan</div>`)}let c=document.querySelector(`.seller-link`);c&&c.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),B.navigate(`/users/`+n.sellerId)});let l=document.getElementById(`order-btn`);l&&l.addEventListener(`click`,async()=>{if(!r)return I(`Silakan login dulu`,`warning`),B.navigate(`/login`);try{let e=await K.get(`/auth/me`);if(!e.emailVerified||!e.phoneVerified)return I(`Verifikasi email & nomor telepon dulu sebelum memesan`,`warning`,6e3),B.navigate(`/verification`)}catch{}let e=Math.round((n.price||0)*.05),t=(n.price||0)+e,i=document.createElement(`div`);i.className=`modal-backdrop`,i.style.cssText=`position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;`,i.innerHTML=`
          <div style="background:white;border-radius:12px;max-width:500px;width:90%;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid #eee;">
              <h3 style="margin:0;">Konfirmasi Pesanan</h3>
              <button id="mc-close" style="background:none;border:none;font-size:24px;cursor:pointer;">✕</button>
            </div>
            <div style="padding:16px;">
              <div style="background:#f5f5f5;border-radius:10px;padding:1rem;margin-bottom:1rem">
                <strong>${F(n.title)}</strong>
                <div class="text-muted text-sm">oleh ${F(n.seller?.name||`Penjual`)}</div>
              </div>
              <textarea id="order-notes" rows="3" placeholder="Catatan untuk penjual (opsional)" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:8px;"></textarea>
              <div style="margin-top:16px;background:#f5f5f5;border-radius:10px;padding:1rem">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                  <span>Harga Jasa</span>
                  <span>${M(n.price)}</span>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                  <span>Biaya Layanan (5%)</span>
                  <span>${M(e)}</span>
                </div>
                <div style="border-top:1px solid #ddd;margin:8px 0;"></div>
                <div style="display:flex;justify-content:space-between;">
                  <strong>Total</strong>
                  <strong style="color:#0a66c2;">${M(t)}</strong>
                </div>
              </div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:12px;padding:16px;border-top:1px solid #eee;">
              <button id="mc-cancel" style="padding:8px 16px;background:#f0f0f0;border:none;border-radius:8px;cursor:pointer;">Batal</button>
              <button id="mc-confirm" style="padding:8px 16px;background:#0a66c2;color:#fff;border:none;border-radius:8px;cursor:pointer;">
                <i class="fa-solid fa-credit-card"></i> Lanjutkan
              </button>
            </div>
          </div>`,document.body.appendChild(i);let a=()=>i.remove();i.querySelector(`#mc-close`).addEventListener(`click`,a),i.querySelector(`#mc-cancel`).addEventListener(`click`,a),i.addEventListener(`click`,e=>{e.target===i&&a()}),i.querySelector(`#mc-confirm`).addEventListener(`click`,async()=>{let e=document.getElementById(`order-notes`)?.value||``,t=i.querySelector(`#mc-confirm`);t.disabled=!0,t.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Memproses...`;try{let t=await K.post(`/orders`,{serviceId:n.id,note:e});a(),I(`Pesanan dibuat! Silakan bayar.`,`success`),B.navigate(`/orders/`+t.id)}catch(e){I(e.message,`error`),t.disabled=!1,t.innerHTML=`<i class="fa-solid fa-credit-card"></i> Lanjutkan`}})});let u=document.getElementById(`chat-btn`);u&&u.addEventListener(`click`,async()=>{if(!r)return I(`Silakan login dulu`,`warning`),B.navigate(`/login`);if(r.id===n.sellerId){I(`Anda tidak bisa chat dengan diri sendiri`,`warning`);return}console.log(`=== CHAT BUTTON CLICKED ===`),console.log(`Current user ID:`,r.id),console.log(`Current user name:`,r.name),console.log(`Seller ID:`,n.sellerId),console.log(`Seller name:`,n.seller?.name),u.disabled=!0,u.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Memuat...`;try{let e=await K.post(`/chat/conversations`,{recipientId:n.sellerId});console.log(`Conversation API Response:`,e);let t=null;e&&e.id?t=e.id:e&&e.conversation&&e.conversation.id&&(t=e.conversation.id),console.log(`Conversation ID:`,t),t?(I(`Membuka chat...`,`info`,1e3),B.navigate(`/chat/`+t)):(console.error(`No conversation ID in response:`,e),I(`Gagal memulai chat: response tidak valid`,`error`))}catch(e){console.error(`Chat error:`,e),console.error(`Error details:`,{message:e.message,status:e.status,data:e.data}),I(e.message||`Gagal memulai chat. Silakan coba lagi.`,`error`)}finally{u.disabled=!1,u.innerHTML=`<i class="fa-solid fa-comment"></i> Chat Penjual`}})}catch(t){console.error(`Detail error:`,t),e.innerHTML=`<div class="container"><div class="empty" style="text-align:center; padding:40px;">
      <i class="fa-solid fa-circle-exclamation"></i>
      <h3>Jasa tidak ditemukan</h3>
      <p>${F(t.message)}</p>
      <a href="#/marketplace" class="btn btn-primary mt-2">Kembali ke Cari Jasa</a>
    </div></div>`}}function It(e){if(!e)return;let t=Math.round((e.budget||0)*.5),n=Math.round((e.budget||0)*1.5),r=Math.round(e.budget||0),i=e.deadline?new Date(e.deadline).toLocaleDateString(`id-ID`,{day:`numeric`,month:`long`,year:`numeric`}):`—`,a=L({title:`Lamar Pekerjaan`,body:`
    <div class="bid-dialog">
      <div class="bid-info">
        <div class="bid-info-row">
          <span><i class="fa-solid fa-money-bill-wave"></i> Budget</span>
          <strong>${M(e.budget)} <span class="text-xs text-muted">(${F(e.budgetType||`FIXED`)})</span></strong>
        </div>
        <div class="bid-info-row"><span><i class="fa-solid fa-calendar-day"></i> Deadline</span><strong>${F(i)}</strong></div>
        <div class="bid-info-row"><span><i class="fa-solid fa-location-dot"></i> Lokasi</span><strong>${e.isOnline?`Remote (Online)`:F(e.location||`—`)}</strong></div>
        <div class="alert alert-info mt-2"><i class="fa-solid fa-circle-info"></i> Tawaran harus antara <strong>${M(t)}</strong> – <strong>${M(n)}</strong></div>
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
          <div class="flex-between text-xs text-muted"><span>Min: ${M(t)}</span><span id="bid-price-label">${M(r)}</span><span>Max: ${M(n)}</span></div>
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
    </div>`}),o=e=>a.el.querySelector(e),s=(e,t)=>{t.value=e.value,o(`#bid-price-label`).textContent=new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,maximumFractionDigits:0}).format(parseFloat(e.value||0))},c=o(`#bid-price`),l=o(`#bid-range`);c&&l&&(c.addEventListener(`input`,e=>s(e.target,l)),l.addEventListener(`input`,e=>s(e.target,c)));let u=o(`#bid-cover`);u&&u.addEventListener(`input`,e=>{let t=e.target.value.length,n=o(`#bid-cover-count`);n&&(n.textContent=`${t} / min 20`)});let d=o(`#bid-preview`);d&&d.addEventListener(`click`,()=>{let e=o(`#bid-cover`)?.value.trim()||``,r=parseFloat(o(`#bid-price`)?.value)||0,i=parseInt(o(`#bid-duration`)?.value||`0`,10);if(e.length<20)return I(`Surat lamaran minimal 20 karakter`,`error`);if(r<t||r>n)return I(`Harga harus ${M(t)} – ${M(n)}`,`error`);if(i<1||i>30)return I(`Durasi harus 1–30 hari`,`error`);I(`Preview: ${M(r)} dalam ${i} hari. Klik "Kirim" untuk submit.`,`info`,6e3)});let f=o(`#bid-form`);f&&f.addEventListener(`submit`,async r=>{r.preventDefault();let i=o(`#bid-cover`)?.value.trim()||``,s=parseFloat(o(`#bid-price`)?.value)||0,c=parseInt(o(`#bid-duration`)?.value||`0`,10);if(i.length<20)return I(`Surat lamaran minimal 20 karakter`,`error`);if(s<t||s>n)return I(`Harga harus antara ${M(t)} – ${M(n)}`,`error`);if(c<1||c>30)return I(`Durasi harus 1–30 hari`,`error`);let l=o(`[type=submit]`);l&&(l.disabled=!0,l.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...`);try{await K.post(`/applications`,{jobId:e.id,coverLetter:i,proposedPrice:s,proposedDuration:c}),a.close(),I(`Lamaran berhasil dikirim 🎉`,`success`),B.render()}catch(e){if(l&&(l.disabled=!1,l.innerHTML=`<i class="fa-solid fa-paper-plane"></i> Kirim Lamaran`),e.status===403&&e.data?.code===`VERIFICATION_REQUIRED`){a.close(),I(`Verifikasi email & nomor telepon dulu di Profil → Verifikasi`,`warning`,7e3),B.navigate(`/verification`);return}I(e.message,`error`)}})}async function Lt({mount:e,query:t}){let n=f.getState().user;e.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <div><h1 class="page-title">Pekerjaan</h1><p class="page-subtitle">Telusuri lowongan dari klien</p></div>
        ${n&&n.role!==`ADMIN`?`<a class="btn btn-primary" href="#/post-job" data-testid="post-job-btn"><i class="fa-solid fa-plus"></i> Posting Pekerjaan</a>`:``}
      </div>
      <div class="filters">
        <div class="input-icon" style="flex:1;min-width:240px"><i class="fa-solid fa-magnifying-glass"></i><input id="q" class="input" placeholder="Cari pekerjaan..." data-testid="jobs-search"></div>
        <select id="cat" class="select" data-testid="jobs-cat" style="max-width:200px"></select>
      </div>
      <div id="jobs-list" class="flex-col" data-testid="jobs-list"></div>
    </div>`;let r=await K.get(`/categories`),i=document.getElementById(`cat`);i&&(i.innerHTML=`<option value="all">Semua Kategori</option>`+r.map(e=>`<option value="${e.slug}">${e.name}</option>`).join(``));let a=async()=>{let e=new URLSearchParams,t=document.getElementById(`q`)?.value.trim()||``,i=document.getElementById(`cat`)?.value||`all`;if(t&&e.set(`q`,t),i&&i!==`all`){let t=r.find(e=>e.slug===i);t&&e.set(`categoryId`,t.id)}e.set(`status`,`OPEN`);let a=document.getElementById(`jobs-list`);a&&(a.innerHTML=`<div class="spinner"></div>`);try{let[t,r]=await Promise.all([K.get(`/jobs?`+e.toString()),n?K.get(`/applications/seller`).catch(()=>[]):Promise.resolve([])]),i=Array.isArray(t)?t:t.data||[],o=new Set((r||[]).map(e=>e.jobId));if(!i.length){a&&(a.innerHTML=`<div class="empty"><i class="fa-solid fa-briefcase"></i><h3>Belum ada job terbuka</h3></div>`);return}if(a){let e=Date.now();a.innerHTML=i.map(t=>{let r=n&&t.buyerId===n.id,i=o.has(t.id),a=t.deadline?new Date(t.deadline):null,s=a?Math.ceil((a.getTime()-e)/(24*3600*1e3)):null,c=s!==null&&s>=0&&s<3,l=String(t.title||``).replace(/^\s*\[URGENT\]\s*/i,``),u=(t.category&&typeof t.category==`object`?t.category.name:t.category)||`Umum`,d=c?`<span class="badge badge-danger"><i class="fa-solid fa-fire"></i> URGENT</span>`:``,f=r?`<span class="badge badge-info"><i class="fa-solid fa-user-tie"></i> Job Anda</span>`:i?`<span class="badge badge-success"><i class="fa-solid fa-check"></i> Sudah Melamar</span>`:``;return`
          <a href="#/jobs/${t.id}" class="card card-pad card-hover" data-testid="job-card-${t.id}" data-buyer-id="${t.buyerId}">
            <div class="flex-between" style="align-items:flex-start">
              <div>
                <div class="flex gap-sm mb-1">
                  <span class="badge">${F(u)}</span>
                  ${W(t.status)}
                  ${d}
                  ${f}
                </div>
                <div class="buyer-info flex gap-sm mb-1" style="align-items:center">
                  ${U(t.buyer,`sm`)}
                  <span class="buyer-name" data-profile-id="${t.buyerId}" style="cursor:pointer;color:var(--primary);font-weight:500">
                    ${F(t.buyer?.name||`Pengguna`)}
                  </span>
                </div>
                <h3 style="margin:.25rem 0">${F(l)}</h3>
                <p class="text-muted text-sm" style="max-width:680px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${F(t.description||``)}</p>
                <div class="flex gap-md mt-2 text-sm text-muted">
                  <span><i class="fa-solid fa-location-dot"></i> ${F(t.location||t.city||`Remote`)}</span>
                  <span><i class="fa-solid fa-clock"></i> ${N(t.createdAt)}</span>
                  <span><i class="fa-solid fa-users"></i> ${t.applicationsCount||t.applicationCount||0} pelamar</span>
                  ${s!==null&&s>=0?`<span><i class="fa-solid fa-hourglass-half"></i> ${s} hari lagi</span>`:``}
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-muted">Budget</div>
                <div style="font-family:var(--font-head);font-weight:700;color:var(--primary-dark);font-size:1.15rem">${M(t.budget)}</div>
              </div>
            </div>
          </a>`}).join(``)}}catch{a&&(a.innerHTML=`<div class="empty"><h3>Gagal memuat</h3></div>`)}},o=document.getElementById(`q`);o&&o.addEventListener(`input`,()=>clearTimeout(window._jt)||(window._jt=setTimeout(a,300)));let s=document.getElementById(`cat`);s&&s.addEventListener(`change`,a),a()}async function Rt({mount:e}){e.innerHTML=`
    <div class="container-sm page">
      <a href="#/jobs"><i class="fa-solid fa-arrow-left"></i> Kembali</a>
      <div class="card card-pad-lg mt-2">
        <h1>Posting Pekerjaan Baru</h1>
        <p class="text-muted">Jelaskan kebutuhan Anda agar freelancer terbaik melamar.</p>
        <form id="job-form" data-testid="post-job-form">
          <div class="form-group"><label class="label">Judul *</label><input class="input" id="title" required data-testid="job-title" placeholder="Minimal 5 karakter"></div>
          <div class="form-group"><label class="label">Kategori *</label>
            <select class="select" id="category" data-testid="job-category" required>
              <option value="">Pilih Kategori</option>
              ${(await K.get(`/categories`)).map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
            </select>
          </div>
          <div class="form-group"><label class="label">Deskripsi *</label><textarea class="textarea" id="description" rows="5" required data-testid="job-desc" placeholder="Minimal 20 karakter"></textarea></div>
          <div class="grid grid-2">
            <div class="form-group"><label class="label">Budget (Rp) *</label><input class="input" id="budget" type="number" required data-testid="job-budget" min="10000" placeholder="Minimal Rp 10.000"></div>
            <div class="form-group"><label class="label">Kota</label><input class="input" id="city" placeholder="Remote / Jakarta..." data-testid="job-city"></div>
          </div>
          <div class="form-group">
            <label class="label">Deadline Pengerjaan</label>
            <input type="date" id="deadline" class="input" min="">
            <div class="text-xs text-muted">Opsional — kapan pekerjaan harus selesai? (Jika tidak diisi, dianggap fleksibel)</div>
          </div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="job-submit">Posting Sekarang</button>
        </form>
      </div>
    </div>`;let t=new Date().toISOString().split(`T`)[0],n=document.getElementById(`deadline`);n&&n.setAttribute(`min`,t);let r=document.getElementById(`job-form`);r&&r.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`title`)?.value.trim(),n=document.getElementById(`category`)?.value,i=document.getElementById(`description`)?.value.trim(),a=parseFloat(document.getElementById(`budget`)?.value),o=document.getElementById(`city`)?.value.trim(),s=document.getElementById(`deadline`)?.value||null;if(!t||t.length<5){I(`Judul minimal 5 karakter`,`error`);return}if(!n){I(`Pilih kategori`,`error`);return}if(!i||i.length<20){I(`Deskripsi minimal 20 karakter`,`error`);return}if(!a||isNaN(a)||a<1e4){I(`Budget minimal Rp 10.000`,`error`);return}let c=r.querySelector(`[type=submit]`);c.disabled=!0,c.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Memproses...`;try{let e={title:t,categoryId:n,description:i,budget:a,location:o||`Remote`,isOnline:o===`Remote`||!o,deadline:s||null};console.log(`Submitting job:`,e);let r=await K.post(`/jobs`,e);I(`Pekerjaan diposting! 🎉`,`success`),B.navigate(`/jobs/`+r.id)}catch(e){console.error(`Post job error:`,e),I(e.message||`Gagal memposting pekerjaan`,`error`),c.disabled=!1,c.innerHTML=`Posting Sekarang`}})}async function zt({mount:e,params:t}){let n=f.getState().user;e.innerHTML=`<div class="container page"><div class="spinner"></div></div>`;try{let r=await K.get(`/jobs/`+t.id),i=n&&r.buyerId===n.id,a=n&&(r.applications||[]).find(e=>e.sellerId===n.id),o=!!a,s=String(r.status||``).toUpperCase()===`OPEN`,c=n&&!i&&!o&&s,l=r.description||`Tidak ada deskripsi`,u=r.city||r.location||`Remote`,d=(r.category&&typeof r.category==`object`?r.category.name:r.category)||`Umum`,f=String(r.title||`Untitled`).replace(/^\s*\[URGENT\]\s*/i,``),p=r.buyer?.name||`Pengguna`,m=r.buyer?.city||``,h=r.applications?.length||0;e.innerHTML=`
      <div class="container page">
        <a href="#/jobs"><i class="fa-solid fa-arrow-left"></i> Kembali</a>
        <div class="card card-pad-lg mt-2">
          <div class="flex-between mb-2" style="align-items:flex-start">
            <div>
              <div class="flex gap-sm mb-1"><span class="badge">${F(d)}</span>${W(r.status)}</div>
              <h1 style="margin:.25rem 0">${F(f)}</h1>
              <div class="flex gap-md text-sm text-muted">
                <span><i class="fa-solid fa-location-dot"></i> ${F(u)}</span>
                <span><i class="fa-solid fa-clock"></i> ${N(r.createdAt)}</span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs text-muted">Budget</div>
              <div style="font-family:var(--font-head);font-weight:700;color:var(--primary-dark);font-size:1.5rem">${M(r.budget)}</div>
            </div>
          </div>
          <p>${F(l)}</p>
          ${r.deadline?`<p><strong>Deadline:</strong> ${new Date(r.deadline).toLocaleDateString(`id-ID`)}</p>`:``}
          <div class="divider"></div>
          <h3>Diposting oleh</h3>
          <div class="flex gap-md" style="align-items:center">
            <div class="buyer-avatar" data-profile-id="${r.buyerId}" style="cursor:pointer">
              ${U(r.buyer)}
            </div>
            <div>
              <strong class="buyer-name" data-profile-id="${r.buyerId}" style="cursor:pointer;color:var(--primary)">${F(p)}</strong>
              <div class="text-xs text-muted">${F(m)}</div>
            </div>
          </div>
          ${c?`<button class="btn btn-primary mt-3" id="apply-btn" data-testid="apply-job-btn"><i class="fa-solid fa-paper-plane"></i> Lamar Pekerjaan Ini</button>`:``}
          ${o&&!i?`<button class="btn btn-secondary mt-3" disabled data-testid="already-applied-btn"><i class="fa-solid fa-check"></i> Sudah Melamar (status: ${F(a?.status||`unknown`)})</button>`:``}
          ${i?`<div class="badge badge-info mt-3"><i class="fa-solid fa-user-tie"></i> Ini job Anda — tidak bisa melamar</div>`:``}
          ${i?`<button class="btn btn-danger mt-3" id="del-job" data-testid="delete-job-btn"><i class="fa-solid fa-trash"></i> Hapus Job</button>`:``}
        </div>
        ${i?`
        <div class="card card-pad-lg mt-3">
          <h3>${h} Pelamar</h3>
          ${r.applications?.length?r.applications.map(e=>{let t=e.proposedDuration?`${e.proposedDuration} hari`:``,n=e.proposedPrice?M(e.proposedPrice):``,r=e.coverLetter||e.message||`Tidak ada surat lamaran`,i=e.seller?.name||`Pengguna`,a=String(e.status||`PENDING`).toUpperCase();return`
            <div class="flex-between" style="padding:1rem 0;border-bottom:1px dashed var(--border);align-items:flex-start">
              <div style="flex:1">
                <div class="flex gap-md" style="align-items:center">
                  <div class="seller-avatar" data-profile-id="${e.sellerId}" style="cursor:pointer">
                    ${U(e.seller,`sm`)}
                  </div>
                  <strong class="seller-name" data-profile-id="${e.sellerId}" style="cursor:pointer;color:var(--primary)">${F(i)}</strong>
                  ${W(a)}
                </div>
                <p class="mt-1">${F(r)}</p>
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
      </div>`;let g=document.getElementById(`apply-btn`);g&&g.addEventListener(`click`,()=>It(r)),document.querySelectorAll(`[data-decide]`).forEach(e=>e.addEventListener(`click`,async()=>{try{String(e.dataset.decide||``).toLowerCase()===`accepted`?await K.post(`/applications/${e.dataset.app}/accept`,{}):await K.post(`/applications/${e.dataset.app}/reject`,{reason:`Ditolak oleh pemilik pekerjaan`}),I(`Berhasil`,`success`),B.render()}catch(e){I(e.message,`error`)}}));let _=document.getElementById(`del-job`);_&&_.addEventListener(`click`,()=>R(`Hapus job ini?`,async()=>{try{await K.del(`/jobs/`+r.id),I(`Job dihapus`,`success`),B.navigate(`/jobs`)}catch(e){I(e.message,`error`)}}))}catch(t){e.innerHTML=`<div class="container"><div class="empty"><h3>Job tidak ditemukan</h3><p>${F(t.message)}</p></div></div>`}}typeof document<`u`&&document.body.addEventListener(`click`,e=>{let t=e.target.closest(`[data-profile-id]`);if(t&&t.dataset.profileId){e.preventDefault(),e.stopPropagation();let n=t.dataset.profileId;B.navigate(`/users/${n}`)}});function Bt(e){return{ACCEPTED:`✓ Terima Pesanan`,IN_PROGRESS:`🔧 Mulai Pengerjaan`,IN_REVIEW:`👀 Submit untuk Review`,COMPLETED:`✅ Selesaikan Pesanan`,CANCELLED:`✕ Batalkan Pesanan`}[e]||`Update ke ${String(e).replace(`_`,` `)}`}function Vt(e){let t=String(e||``).toUpperCase(),n=[[`WAITING_CONFIRMATION`,`Pembayaran`],[`ACCEPTED`,`Escrow aktif`],[`IN_PROGRESS`,`Pengerjaan`],[`IN_REVIEW`,`Review bukti`],[`COMPLETED`,`Dana dirilis`]],r=Math.max(0,n.findIndex(([e])=>e===t));return`<div class="escrow-steps">${n.map(([e,n],i)=>`<div class="escrow-step ${i<=r?`done`:``} ${e===t?`current`:``}">
          <span>${i+1}</span><small>${n}</small>
        </div>`).join(``)}</div>`}function Ht(e,t,n){let r=e.workSubmission,i=r?.attachments||[];return!r&&!n?`<div class="alert alert-info mt-3"><i class="fa-solid fa-shield-halved"></i> Menunggu pekerja mengirim bukti pengerjaan. Dana tetap ditahan di escrow sampai Anda approve.</div>`:`
    <div class="card card-pad-lg mt-3">
      <div class="flex-between" style="align-items:flex-start;gap:1rem;flex-wrap:wrap">
        <div>
          <h3 style="margin:0"><i class="fa-solid fa-file-circle-check"></i> Bukti Pengerjaan</h3>
          <p class="text-muted text-sm" style="margin:.35rem 0 0">Upload catatan, link file, foto hasil kerja, atau bukti lapangan. Dana seller hanya cair setelah approve.</p>
        </div>
        ${e.workSubmittedAt?`<span class="badge badge-warning">Menunggu approval</span>`:`<span class="badge">Belum dikirim</span>`}
      </div>
      ${r?`<div class="work-proof mt-2">
              <p>${F(r.note||``)}</p>
              ${i.length?`<div class="proof-links">${i.map((e,t)=>`<a class="btn btn-secondary btn-sm" href="${F(e)}" target="_blank" rel="noopener"><i class="fa-solid fa-paperclip"></i> Bukti ${t+1}</a>`).join(``)}</div>`:`<div class="text-sm text-muted">Tidak ada lampiran, hanya catatan.</div>`}
            </div>`:``}
      ${n&&[`IN_PROGRESS`,`REVISION_REQUESTED`].includes(String(e.status).toUpperCase())?`<form id="work-form" class="mt-3">
              <div class="form-group">
                <label class="label">Catatan hasil kerja *</label>
                <textarea class="textarea" id="work-note" required minlength="10" placeholder="Jelaskan pekerjaan yang sudah selesai, lokasi file, atau bukti lapangan..."></textarea>
              </div>
              <div class="form-group">
                <label class="label">Link bukti/file/foto (opsional, satu per baris)</label>
                <textarea class="textarea" id="work-files" placeholder="https://drive.google.com/...
https://..."></textarea>
              </div>
              <button class="btn btn-primary" type="submit"><i class="fa-solid fa-upload"></i> Kirim Bukti untuk Approval</button>
            </form>`:``}
      ${t&&String(e.status).toUpperCase()===`IN_REVIEW`?`<div class="flex gap-sm mt-3 flex-wrap">
              <button class="btn btn-success" id="approve-work"><i class="fa-solid fa-circle-check"></i> Approve & Rilis Dana</button>
              <button class="btn btn-secondary" id="reject-work"><i class="fa-solid fa-rotate-left"></i> Minta Revisi</button>
              <button class="btn btn-danger" id="dispute-work"><i class="fa-solid fa-scale-balanced"></i> Sengketa</button>
            </div>`:``}
    </div>`}var Ut=null;function Wt(e,t){return window.snap?Promise.resolve():Ut||(Ut=new Promise((n,r)=>{let i=document.createElement(`script`);i.src=t?`https://app.midtrans.com/snap/snap.js`:`https://app.sandbox.midtrans.com/snap/snap.js`,i.setAttribute(`data-client-key`,e),i.onload=()=>n(),i.onerror=()=>{Ut=null,r(Error(`Gagal load Midtrans Snap`))},document.body.appendChild(i)}),Ut)}async function Gt({mount:e}){f.getState().user,e.innerHTML=`
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
    </div>`;let t=async e=>{let t=document.getElementById(`orders`);t.innerHTML=`<div class="spinner"></div>`;try{let n=await K.get(`/orders`+(e&&e!==`all`?`?role=${e}`:``));if(!n.length){t.innerHTML=H(`Belum ada pesanan`,`Mulai pesan jasa dari marketplace`,`fa-receipt`);return}t.innerHTML=n.map(e=>`
        <a href="#/orders/${e.id}" class="card card-pad card-hover" data-testid="order-${e.id}">
          <div class="flex-between" style="align-items:flex-start">
            <div style="flex:1">
              <div class="flex gap-sm mb-1">${W(e.status)}<span class="text-xs text-muted">#${e.id.slice(0,8)}</span></div>
              <h3 style="margin:.25rem 0">${F(e.title)}</h3>
              <div class="flex gap-md text-sm text-muted">
                <span>Pembeli: ${F(e.buyer?.name)}</span>
                <span>Penjual: ${F(e.seller?.name)}</span>
                <span><i class="fa-solid fa-clock"></i> ${et(e.createdAt)}</span>
              </div>
            </div>
            <div class="text-right"><div class="text-xs text-muted">Total</div><div style="font-family:var(--font-head);font-weight:700;color:var(--primary-dark);font-size:1.15rem">${M(e.amount)}</div></div>
          </div>
        </a>`).join(``)}catch(e){t.innerHTML=H(`Gagal memuat`,e.message,`fa-triangle-exclamation`)}};document.querySelectorAll(`#role-tabs .chip`).forEach(e=>e.addEventListener(`click`,()=>{document.querySelectorAll(`#role-tabs .chip`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),t(e.dataset.role)})),t(`all`)}async function Kt({mount:e,params:t}){let n=f.getState().user;e.innerHTML=`<div class="container page"><div class="spinner"></div></div>`;try{let r=await K.get(`/orders/`+t.id),i=n.id===r.buyerId,a=n.id===r.sellerId,o=String(r.status||``).toLowerCase(),s={pending:a?`ACCEPTED`:null,waiting_confirmation:a?`ACCEPTED`:null,accepted:a?`IN_PROGRESS`:null,in_progress:null,revision_requested:null,in_review:i?`COMPLETED`:null}[o];e.innerHTML=`
      <div class="container page">
        <a href="#/orders"><i class="fa-solid fa-arrow-left"></i> Kembali</a>
        <div class="grid" style="grid-template-columns: 1fr 320px;gap:1.5rem;margin-top:1rem">
          <div>
            <div class="card card-pad-lg">
              <div class="flex-between mb-2"><h1 style="margin:0">${F(r.title)}</h1>${W(r.status)}</div>
              <div class="text-sm text-muted">Order #${r.id.slice(0,12)} · ${et(r.createdAt,!0)}</div>
              ${Vt(r.status)}
              <div class="divider"></div>
              <div class="grid grid-2">
                <div>
                  <div class="text-xs text-muted">Pembeli</div>
                  <div class="flex gap-md" style="align-items:center;margin-top:.25rem">${U(r.buyer,`sm`)}<strong>${F(r.buyer?.name)}</strong></div>
                </div>
                <div>
                  <div class="text-xs text-muted">Penjual</div>
                  <div class="flex gap-md" style="align-items:center;margin-top:.25rem">${U(r.seller,`sm`)}<strong>${F(r.seller?.name)}</strong></div>
                </div>
              </div>
              ${r.note?`<div class="mt-2"><div class="text-xs text-muted">Catatan</div><p>${F(r.note)}</p></div>`:``}
              <div class="flex gap-sm mt-3 flex-wrap">
                ${s?`<button class="btn btn-primary" id="advance-btn" data-testid="advance-order-btn"><i class="fa-solid fa-arrow-right"></i> ${Bt(s)}</button>`:``}
                ${(i||a)&&![`COMPLETED`,`CANCELLED`,`completed`,`cancelled`].includes(r.status)?`<button class="btn btn-danger" id="cancel-btn" data-testid="cancel-order-btn">Batalkan</button>`:``}
                ${i&&(r.status===`COMPLETED`||r.status===`completed`)?`<button class="btn btn-success" id="review-btn" data-testid="review-order-btn"><i class="fa-solid fa-star"></i> Beri Review</button>`:``}
                <button class="btn btn-secondary" id="chat-btn" data-testid="chat-order-btn">
                  <i class="fa-solid fa-comment"></i> Chat dengan ${i?`Penjual`:`Pembeli`}
                </button>
                <button class="btn btn-secondary" id="dispute-btn" data-testid="dispute-btn"><i class="fa-solid fa-flag"></i> Laporkan</button>
              </div>
            </div>
            ${Ht(r,i,a)}
            <div class="card card-pad-lg mt-3">
              <h3>Timeline</h3>
              <div class="timeline">
                ${(r.timeline||[]).map(e=>`<div class="tl-step done"><strong>${F(e.status.replace(`_`,` `))}</strong><div class="tl-time">${et(e.at,!0)}</div></div>`).join(``)}
              </div>
            </div>
          </div>
          <aside class="card card-pad-lg" style="position:sticky;top:calc(var(--header-h) + 1rem);align-self:flex-start">
            <div class="text-center">
              <div class="text-xs text-muted">Total Pembayaran</div>
              <div style="font-family:var(--font-head);font-size:2rem;font-weight:700;color:var(--primary-dark)">${M(r.amount)}</div>
            </div>
            <div class="divider"></div>
            <div class="text-sm">
              <div class="flex-between"><span class="text-muted">Subtotal</span><span>${M(r.amount*.95)}</span></div>
              <div class="flex-between"><span class="text-muted">Platform fee</span><span>${M(r.amount*.05)}</span></div>
              <div class="divider"></div>
              <div class="flex-between"><strong>Total</strong><strong>${M(r.amount)}</strong></div>
            </div>
            <button class="btn btn-primary btn-block mt-2" id="pay-btn" data-testid="pay-now-btn"${r.status===`WAITING_CONFIRMATION`||r.status===`pending`?``:` disabled`}><i class="fa-solid fa-credit-card"></i> Bayar Sekarang</button>
            <div class="text-xs text-muted text-center mt-1"><i class="fa-solid fa-shield-halved"></i> Pembayaran aman dengan escrow</div>
          </aside>
        </div>
      </div>`;let c=document.getElementById(`advance-btn`);c&&c.addEventListener(`click`,async()=>{try{await K.post(`/orders/${r.id}/status`,{status:s}),I(`Status diperbarui`,`success`),B.render()}catch(e){I(e.message,`error`)}});let l=document.getElementById(`cancel-btn`);l&&l.addEventListener(`click`,()=>R(`Yakin batalkan pesanan?`,async()=>{try{await K.post(`/orders/${r.id}/status`,{status:`CANCELLED`}),I(`Dibatalkan`,`success`),B.render()}catch(e){I(e.message,`error`)}}));let u=document.getElementById(`review-btn`);u&&u.addEventListener(`click`,()=>{let e=5,t=L({title:`Beri Ulasan`,body:`
        <form id="rev-form">
          <div class="form-group"><label class="label">Rating</label>
            <div id="stars-pick" style="font-size:2rem;cursor:pointer;color:var(--warning)" data-testid="review-stars">${[1,2,3,4,5].map(e=>`<i class="fa-solid fa-star" data-r="${e}"></i>`).join(` `)}</div>
          </div>
          <div class="form-group"><label class="label">Komentar</label><textarea id="rev-cm" class="textarea" required data-testid="review-comment"></textarea></div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="review-submit-btn">Kirim Review</button>
        </form>`});t.el.querySelectorAll(`[data-r]`).forEach(n=>n.addEventListener(`click`,()=>{e=parseInt(n.dataset.r),t.el.querySelectorAll(`[data-r]`).forEach((t,n)=>t.style.opacity=n<e?`1`:`.3`)})),t.el.querySelector(`#rev-form`).addEventListener(`submit`,async n=>{n.preventDefault();try{await K.post(`/reviews`,{orderId:r.id,rating:e,comment:t.el.querySelector(`#rev-cm`).value}),t.close(),I(`Review terkirim`,`success`),B.render()}catch(e){I(e.message,`error`)}})});let d=document.getElementById(`work-form`);d&&d.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`work-note`)?.value.trim()||``,n=(document.getElementById(`work-files`)?.value||``).split(`
`).map(e=>e.trim()).filter(Boolean);if(t.length<10)return I(`Catatan bukti minimal 10 karakter`,`error`);try{await K.post(`/orders/${r.id}/work-submission`,{note:t,attachments:n}),I(`Bukti pengerjaan dikirim. Menunggu approval client.`,`success`),B.render()}catch(e){I(e.message,`error`)}}),document.getElementById(`approve-work`)?.addEventListener(`click`,()=>R(`Approve pekerjaan ini dan rilis dana escrow ke pekerja?`,async()=>{try{await K.post(`/orders/${r.id}/status`,{status:`COMPLETED`}),I(`Pekerjaan disetujui. Dana dirilis ke pekerja.`,`success`),B.render()}catch(e){I(e.message,`error`)}})),document.getElementById(`reject-work`)?.addEventListener(`click`,()=>{let e=L({title:`Minta Revisi`,body:`<form id="revision-form"><div class="form-group"><label class="label">Alasan revisi yang jelas</label><textarea class="textarea" id="revision-reason" required minlength="5" placeholder="Contoh: bagian X belum sesuai brief, mohon perbaiki..."></textarea></div><button class="btn btn-primary btn-block" type="submit">Kirim Revisi</button></form>`});e.el.querySelector(`#revision-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=e.el.querySelector(`#revision-reason`).value.trim();try{await K.post(`/orders/${r.id}/work-revision`,{reason:n}),e.close(),I(`Revisi dikirim ke pekerja.`,`success`),B.render()}catch(e){I(e.message,`error`)}})}),document.getElementById(`dispute-work`)?.addEventListener(`click`,()=>{I(`Gunakan tombol Laporkan untuk membuka sengketa dengan bukti lengkap.`,`info`),document.getElementById(`dispute-btn`)?.click()});let f=document.getElementById(`dispute-btn`);f&&f.addEventListener(`click`,()=>{let e=L({title:`Laporkan Masalah`,body:`
        <form id="d-form">
          <div class="form-group"><label class="label">Alasan</label><textarea class="textarea" id="d-reason" required data-testid="dispute-reason"></textarea></div>
          <button class="btn btn-danger btn-block" type="submit" data-testid="dispute-submit-btn">Kirim Laporan</button>
        </form>`});e.el.querySelector(`#d-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=e.el.querySelector(`#d-reason`).value.trim();if(n.length<20){I(`Jelaskan masalah minimal 20 karakter`,`error`);return}try{await K.post(`/disputes`,{orderId:r.id,reason:n.slice(0,120),description:n}),e.close(),I(`Laporan terkirim ke admin`,`success`)}catch(e){I(e.message,`error`)}})});let p=document.getElementById(`pay-btn`);p&&p.addEventListener(`click`,async()=>{try{if(!(await K.get(`/payments/midtrans/config`)).configured){let e=L({title:`Pembayaran (Demo)`,body:`
            <div class="pay-demo">
              <div class="escrow-summary">
                <i class="fa-solid fa-shield-halved"></i>
                <div><strong>Escrow Tolongin</strong><span>Dana ditahan sampai bukti kerja Anda approve.</span></div>
              </div>
              <h3 class="mt-2">Total: ${M(r.totalAmount||r.amount)}</h3>
              <div class="pay-methods">
                ${[`Virtual Account BCA`,`QRIS`,`GoPay`,`OVO`,`DANA`,`Kartu Kredit`].map((e,t)=>`<label class="pay-method ${t===0?`active`:``}"><input type="radio" name="pay-method" ${t===0?`checked`:``}><span><i class="fa-solid ${t===1?`fa-qrcode`:t===5?`fa-credit-card`:`fa-building-columns`}"></i>${e}</span><small>Konfirmasi instan demo</small></label>`).join(``)}
              </div>
              <div class="alert alert-info mt-2"><i class="fa-solid fa-circle-info"></i> Demo payment ini mencatat pembayaran sebagai COMPLETED dan mengaktifkan escrow.</div>
              <button class="btn btn-primary btn-block" id="pay-ok" data-testid="confirm-pay-btn">Bayar & Aktifkan Escrow</button>
            </div>`});e.el.querySelector(`#pay-ok`).addEventListener(`click`,async()=>{try{await K.post(`/payments/demo/confirm/${r.id}`),e.close(),I(`Pembayaran berhasil!`,`success`),B.render()}catch(e){I(e.message,`error`)}});return}I(`Membuka Midtrans...`,`info`);let e=await K.post(`/payments/midtrans/token?orderId=${r.id}`);await Wt(e.clientKey,e.isProduction),window.snap.pay(e.token,{onSuccess:e=>{I(`Pembayaran berhasil!`,`success`),setTimeout(()=>B.render(),1200)},onPending:e=>I(`Pembayaran pending - selesaikan di Midtrans`,`warning`),onError:e=>I(`Pembayaran gagal: `+(e?.status_message||``),`error`),onClose:()=>I(`Anda menutup halaman pembayaran`,`info`)})}catch(e){I(e.message,`error`)}});let m=document.getElementById(`chat-btn`);m&&m.addEventListener(`click`,async()=>{let e=i?r.sellerId:r.buyerId;try{let t=await K.post(`/chat/conversations`,{recipientId:e,orderId:r.id});I(`Membuka chat...`,`info`),B.navigate(`/chat/${t.id}`)}catch(e){I(e.message,`error`)}})}catch(t){e.innerHTML=H(`Tidak ditemukan`,t.message)}}var J=Object.create(null);J.open=`0`,J.close=`1`,J.ping=`2`,J.pong=`3`,J.message=`4`,J.upgrade=`5`,J.noop=`6`;var Y=Object.create(null);Object.keys(J).forEach(e=>{Y[J[e]]=e});var qt={type:`error`,data:`parser error`},Jt=typeof Blob==`function`||typeof Blob<`u`&&Object.prototype.toString.call(Blob)===`[object BlobConstructor]`,Yt=typeof ArrayBuffer==`function`,Xt=e=>typeof ArrayBuffer.isView==`function`?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer,Zt=({type:e,data:t},n,r)=>Jt&&t instanceof Blob?n?r(t):Qt(t,r):Yt&&(t instanceof ArrayBuffer||Xt(t))?n?r(t):Qt(new Blob([t]),r):r(J[e]+(t||``)),Qt=(e,t)=>{let n=new FileReader;return n.onload=function(){let e=n.result.split(`,`)[1];t(`b`+(e||``))},n.readAsDataURL(e)};function $t(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}var en;function tn(e,t){if(Jt&&e.data instanceof Blob)return e.data.arrayBuffer().then($t).then(t);if(Yt&&(e.data instanceof ArrayBuffer||Xt(e.data)))return t($t(e.data));Zt(e,!1,e=>{en||=new TextEncoder,t(en.encode(e))})}var nn=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,rn=typeof Uint8Array>`u`?[]:new Uint8Array(256);for(let e=0;e<64;e++)rn[nn.charCodeAt(e)]=e;var an=e=>{let t=e.length*.75,n=e.length,r,i=0,a,o,s,c;e[e.length-1]===`=`&&(t--,e[e.length-2]===`=`&&t--);let l=new ArrayBuffer(t),u=new Uint8Array(l);for(r=0;r<n;r+=4)a=rn[e.charCodeAt(r)],o=rn[e.charCodeAt(r+1)],s=rn[e.charCodeAt(r+2)],c=rn[e.charCodeAt(r+3)],u[i++]=a<<2|o>>4,u[i++]=(o&15)<<4|s>>2,u[i++]=(s&3)<<6|c&63;return l},on=typeof ArrayBuffer==`function`,sn=(e,t)=>{if(typeof e!=`string`)return{type:`message`,data:ln(e,t)};let n=e.charAt(0);return n===`b`?{type:`message`,data:cn(e.substring(1),t)}:Y[n]?e.length>1?{type:Y[n],data:e.substring(1)}:{type:Y[n]}:qt},cn=(e,t)=>on?ln(an(e),t):{base64:!0,data:e},ln=(e,t)=>{switch(t){case`blob`:return e instanceof Blob?e:new Blob([e]);default:return e instanceof ArrayBuffer?e:e.buffer}},un=``,dn=(e,t)=>{let n=e.length,r=Array(n),i=0;e.forEach((e,a)=>{Zt(e,!1,e=>{r[a]=e,++i===n&&t(r.join(un))})})},fn=(e,t)=>{let n=e.split(un),r=[];for(let e=0;e<n.length;e++){let i=sn(n[e],t);if(r.push(i),i.type===`error`)break}return r};function pn(){return new TransformStream({transform(e,t){tn(e,n=>{let r=n.length,i;if(r<126)i=new Uint8Array(1),new DataView(i.buffer).setUint8(0,r);else if(r<65536){i=new Uint8Array(3);let e=new DataView(i.buffer);e.setUint8(0,126),e.setUint16(1,r)}else{i=new Uint8Array(9);let e=new DataView(i.buffer);e.setUint8(0,127),e.setBigUint64(1,BigInt(r))}e.data&&typeof e.data!=`string`&&(i[0]|=128),t.enqueue(i),t.enqueue(n)})}})}var mn;function hn(e){return e.reduce((e,t)=>e+t.length,0)}function gn(e,t){if(e[0].length===t)return e.shift();let n=new Uint8Array(t),r=0;for(let i=0;i<t;i++)n[i]=e[0][r++],r===e[0].length&&(e.shift(),r=0);return e.length&&r<e[0].length&&(e[0]=e[0].slice(r)),n}function _n(e,t){mn||=new TextDecoder;let n=[],r=0,i=-1,a=!1;return new TransformStream({transform(o,s){for(n.push(o);;){if(r===0){if(hn(n)<1)break;let e=gn(n,1);a=(e[0]&128)==128,i=e[0]&127,r=i<126?3:i===126?1:2}else if(r===1){if(hn(n)<2)break;let e=gn(n,2);i=new DataView(e.buffer,e.byteOffset,e.length).getUint16(0),r=3}else if(r===2){if(hn(n)<8)break;let e=gn(n,8),t=new DataView(e.buffer,e.byteOffset,e.length),a=t.getUint32(0);if(a>2**21-1){s.enqueue(qt);break}i=a*2**32+t.getUint32(4),r=3}else{if(hn(n)<i)break;let e=gn(n,i);s.enqueue(sn(a?e:mn.decode(e),t)),r=0}if(i===0||i>e){s.enqueue(qt);break}}}})}function X(e){if(e)return vn(e)}function vn(e){for(var t in X.prototype)e[t]=X.prototype[t];return e}X.prototype.on=X.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks[`$`+e]=this._callbacks[`$`+e]||[]).push(t),this},X.prototype.once=function(e,t){function n(){this.off(e,n),t.apply(this,arguments)}return n.fn=t,this.on(e,n),this},X.prototype.off=X.prototype.removeListener=X.prototype.removeAllListeners=X.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var n=this._callbacks[`$`+e];if(!n)return this;if(arguments.length==1)return delete this._callbacks[`$`+e],this;for(var r,i=0;i<n.length;i++)if(r=n[i],r===t||r.fn===t){n.splice(i,1);break}return n.length===0&&delete this._callbacks[`$`+e],this},X.prototype.emit=function(e){this._callbacks=this._callbacks||{};for(var t=Array(arguments.length-1),n=this._callbacks[`$`+e],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(n){n=n.slice(0);for(var r=0,i=n.length;r<i;++r)n[r].apply(this,t)}return this},X.prototype.emitReserved=X.prototype.emit,X.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks[`$`+e]||[]},X.prototype.hasListeners=function(e){return!!this.listeners(e).length};var yn=typeof Promise==`function`&&typeof Promise.resolve==`function`?e=>Promise.resolve().then(e):(e,t)=>t(e,0),Z=typeof self<`u`?self:typeof window<`u`?window:Function(`return this`)(),bn=`arraybuffer`;function xn(e,...t){return t.reduce((t,n)=>(e.hasOwnProperty(n)&&(t[n]=e[n]),t),{})}var Sn=Z.setTimeout,Cn=Z.clearTimeout;function wn(e,t){t.useNativeTimers?(e.setTimeoutFn=Sn.bind(Z),e.clearTimeoutFn=Cn.bind(Z)):(e.setTimeoutFn=Z.setTimeout.bind(Z),e.clearTimeoutFn=Z.clearTimeout.bind(Z))}var Tn=1.33;function En(e){return typeof e==`string`?Dn(e):Math.ceil((e.byteLength||e.size)*Tn)}function Dn(e){let t=0,n=0;for(let r=0,i=e.length;r<i;r++)t=e.charCodeAt(r),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n}function On(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function kn(e){let t=``;for(let n in e)e.hasOwnProperty(n)&&(t.length&&(t+=`&`),t+=encodeURIComponent(n)+`=`+encodeURIComponent(e[n]));return t}function An(e){let t={},n=e.split(`&`);for(let e=0,r=n.length;e<r;e++){let r=n[e].split(`=`);t[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return t}var jn=class extends Error{constructor(e,t,n){super(e),this.description=t,this.context=n,this.type=`TransportError`}},Mn=class extends X{constructor(e){super(),this.writable=!1,wn(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,n){return super.emitReserved(`error`,new jn(e,t,n)),this}open(){return this.readyState=`opening`,this.doOpen(),this}close(){return(this.readyState===`opening`||this.readyState===`open`)&&(this.doClose(),this.onClose()),this}send(e){this.readyState===`open`&&this.write(e)}onOpen(){this.readyState=`open`,this.writable=!0,super.emitReserved(`open`)}onData(e){let t=sn(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved(`packet`,e)}onClose(e){this.readyState=`closed`,super.emitReserved(`close`,e)}pause(e){}createUri(e,t={}){return e+`://`+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){let e=this.opts.hostname;return e.indexOf(`:`)===-1?e:`[`+e+`]`}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?`:`+this.opts.port:``}_query(e){let t=kn(e);return t.length?`?`+t:``}},Nn=class extends Mn{constructor(){super(...arguments),this._polling=!1}get name(){return`polling`}doOpen(){this._poll()}pause(e){this.readyState=`pausing`;let t=()=>{this.readyState=`paused`,e()};if(this._polling||!this.writable){let e=0;this._polling&&(e++,this.once(`pollComplete`,function(){--e||t()})),this.writable||(e++,this.once(`drain`,function(){--e||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved(`poll`)}onData(e){fn(e,this.socket.binaryType).forEach(e=>{if(this.readyState===`opening`&&e.type===`open`&&this.onOpen(),e.type===`close`)return this.onClose({description:`transport closed by the server`}),!1;this.onPacket(e)}),this.readyState!==`closed`&&(this._polling=!1,this.emitReserved(`pollComplete`),this.readyState===`open`&&this._poll())}doClose(){let e=()=>{this.write([{type:`close`}])};this.readyState===`open`?e():this.once(`open`,e)}write(e){this.writable=!1,dn(e,e=>{this.doWrite(e,()=>{this.writable=!0,this.emitReserved(`drain`)})})}uri(){let e=this.opts.secure?`https`:`http`,t=this.query||{};return!1!==this.opts.timestampRequests&&(t[this.opts.timestampParam]=On()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}},Pn=!1;try{Pn=typeof XMLHttpRequest<`u`&&`withCredentials`in new XMLHttpRequest}catch{}var Fn=Pn;function In(){}var Ln=class extends Nn{constructor(e){if(super(e),typeof location<`u`){let t=location.protocol===`https:`,n=location.port;n||=t?`443`:`80`,this.xd=typeof location<`u`&&e.hostname!==location.hostname||n!==e.port}}doWrite(e,t){let n=this.request({method:`POST`,data:e});n.on(`success`,t),n.on(`error`,(e,t)=>{this.onError(`xhr post error`,e,t)})}doPoll(){let e=this.request();e.on(`data`,this.onData.bind(this)),e.on(`error`,(e,t)=>{this.onError(`xhr poll error`,e,t)}),this.pollXhr=e}},Rn=class e extends X{constructor(e,t,n){super(),this.createRequest=e,wn(this,n),this._opts=n,this._method=n.method||`GET`,this._uri=t,this._data=n.data===void 0?null:n.data,this._create()}_create(){var t;let n=xn(this._opts,`agent`,`pfx`,`key`,`passphrase`,`cert`,`ca`,`ciphers`,`rejectUnauthorized`,`autoUnref`);n.xdomain=!!this._opts.xd;let r=this._xhr=this.createRequest(n);try{r.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(let e in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(e)&&r.setRequestHeader(e,this._opts.extraHeaders[e])}}catch{}if(this._method===`POST`)try{r.setRequestHeader(`Content-type`,`text/plain;charset=UTF-8`)}catch{}try{r.setRequestHeader(`Accept`,`*/*`)}catch{}(t=this._opts.cookieJar)==null||t.addCookies(r),`withCredentials`in r&&(r.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(r.timeout=this._opts.requestTimeout),r.onreadystatechange=()=>{var e;r.readyState===3&&((e=this._opts.cookieJar)==null||e.parseCookies(r.getResponseHeader(`set-cookie`))),r.readyState===4&&(r.status===200||r.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof r.status==`number`?r.status:0)},0))},r.send(this._data)}catch(e){this.setTimeoutFn(()=>{this._onError(e)},0);return}typeof document<`u`&&(this._index=e.requestsCount++,e.requests[this._index]=this)}_onError(e){this.emitReserved(`error`,e,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(this._xhr===void 0||this._xhr===null)){if(this._xhr.onreadystatechange=In,t)try{this._xhr.abort()}catch{}typeof document<`u`&&delete e.requests[this._index],this._xhr=null}}_onLoad(){let e=this._xhr.responseText;e!==null&&(this.emitReserved(`data`,e),this.emitReserved(`success`),this._cleanup())}abort(){this._cleanup()}};if(Rn.requestsCount=0,Rn.requests={},typeof document<`u`){if(typeof attachEvent==`function`)attachEvent(`onunload`,zn);else if(typeof addEventListener==`function`){let e=`onpagehide`in Z?`pagehide`:`unload`;addEventListener(e,zn,!1)}}function zn(){for(let e in Rn.requests)Rn.requests.hasOwnProperty(e)&&Rn.requests[e].abort()}var Bn=(function(){let e=Hn({xdomain:!1});return e&&e.responseType!==null})(),Vn=class extends Ln{constructor(e){super(e);let t=e&&e.forceBase64;this.supportsBinary=Bn&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new Rn(Hn,this.uri(),e)}};function Hn(e){let t=e.xdomain;try{if(typeof XMLHttpRequest<`u`&&(!t||Fn))return new XMLHttpRequest}catch{}if(!t)try{return new Z[[`Active`,`Object`].join(`X`)](`Microsoft.XMLHTTP`)}catch{}}var Un=typeof navigator<`u`&&typeof navigator.product==`string`&&navigator.product.toLowerCase()===`reactnative`,Wn=class extends Mn{get name(){return`websocket`}doOpen(){let e=this.uri(),t=this.opts.protocols,n=Un?{}:xn(this.opts,`agent`,`perMessageDeflate`,`pfx`,`key`,`passphrase`,`cert`,`ca`,`ciphers`,`rejectUnauthorized`,`localAddress`,`protocolVersion`,`origin`,`maxPayload`,`family`,`checkServerIdentity`);this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,n)}catch(e){return this.emitReserved(`error`,e)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:`websocket connection closed`,context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError(`websocket error`,e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){let n=e[t],r=t===e.length-1;Zt(n,this.supportsBinary,e=>{try{this.doWrite(n,e)}catch{}r&&yn(()=>{this.writable=!0,this.emitReserved(`drain`)},this.setTimeoutFn)})}}doClose(){this.ws!==void 0&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){let e=this.opts.secure?`wss`:`ws`,t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=On()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}},Gn=Z.WebSocket||Z.MozWebSocket,Kn={websocket:class extends Wn{createSocket(e,t,n){return Un?new Gn(e,t,n):t?new Gn(e,t):new Gn(e)}doWrite(e,t){this.ws.send(t)}},webtransport:class extends Mn{get name(){return`webtransport`}doOpen(){try{this._transport=new WebTransport(this.createUri(`https`),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved(`error`,e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError(`webtransport error`,e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{let t=_n(2**53-1,this.socket.binaryType),n=e.readable.pipeThrough(t).getReader(),r=pn();r.readable.pipeTo(e.writable),this._writer=r.writable.getWriter();let i=()=>{n.read().then(({done:e,value:t})=>{e||(this.onPacket(t),i())}).catch(e=>{})};i();let a={type:`open`};this.query.sid&&(a.data=`{"sid":"${this.query.sid}"}`),this._writer.write(a).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){let n=e[t],r=t===e.length-1;this._writer.write(n).then(()=>{r&&yn(()=>{this.writable=!0,this.emitReserved(`drain`)},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)==null||e.close()}},polling:Vn},qn=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Jn=[`source`,`protocol`,`authority`,`userInfo`,`user`,`password`,`host`,`port`,`relative`,`path`,`directory`,`file`,`query`,`anchor`];function Yn(e){if(e.length>8e3)throw`URI too long`;let t=e,n=e.indexOf(`[`),r=e.indexOf(`]`);n!=-1&&r!=-1&&(e=e.substring(0,n)+e.substring(n,r).replace(/:/g,`;`)+e.substring(r,e.length));let i=qn.exec(e||``),a={},o=14;for(;o--;)a[Jn[o]]=i[o]||``;return n!=-1&&r!=-1&&(a.source=t,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,`:`),a.authority=a.authority.replace(`[`,``).replace(`]`,``).replace(/;/g,`:`),a.ipv6uri=!0),a.pathNames=Xn(a,a.path),a.queryKey=Zn(a,a.query),a}function Xn(e,t){let n=t.replace(/\/{2,9}/g,`/`).split(`/`);return(t.slice(0,1)==`/`||t.length===0)&&n.splice(0,1),t.slice(-1)==`/`&&n.splice(n.length-1,1),n}function Zn(e,t){let n={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(e,t,r){t&&(n[t]=r)}),n}var Qn=typeof addEventListener==`function`&&typeof removeEventListener==`function`,$n=[];Qn&&addEventListener(`offline`,()=>{$n.forEach(e=>e())},!1);var er=class e extends X{constructor(e,t){if(super(),this.binaryType=bn,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e==`object`&&(t=e,e=null),e){let n=Yn(e);t.hostname=n.host,t.secure=n.protocol===`https`||n.protocol===`wss`,t.port=n.port,n.query&&(t.query=n.query)}else t.host&&(t.hostname=Yn(t.host).host);wn(this,t),this.secure=t.secure==null?typeof location<`u`&&location.protocol===`https:`:t.secure,t.hostname&&!t.port&&(t.port=this.secure?`443`:`80`),this.hostname=t.hostname||(typeof location<`u`?location.hostname:`localhost`),this.port=t.port||(typeof location<`u`&&location.port?location.port:this.secure?`443`:`80`),this.transports=[],this._transportsByName={},t.transports.forEach(e=>{let t=e.prototype.name;this.transports.push(t),this._transportsByName[t]=e}),this.opts=Object.assign({path:`/engine.io`,agent:!1,withCredentials:!1,upgrade:!0,timestampParam:`t`,rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,``)+(this.opts.addTrailingSlash?`/`:``),typeof this.opts.query==`string`&&(this.opts.query=An(this.opts.query)),Qn&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener(`beforeunload`,this._beforeunloadEventListener,!1)),this.hostname!==`localhost`&&(this._offlineEventListener=()=>{this._onClose(`transport close`,{description:`network connection lost`})},$n.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){let t=Object.assign({},this.opts.query);t.EIO=4,t.transport=e,this.id&&(t.sid=this.id);let n=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](n)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved(`error`,`No transports available`)},0);return}let t=this.opts.rememberUpgrade&&e.priorWebsocketSuccess&&this.transports.indexOf(`websocket`)!==-1?`websocket`:this.transports[0];this.readyState=`opening`;let n=this.createTransport(t);n.open(),this.setTransport(n)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on(`drain`,this._onDrain.bind(this)).on(`packet`,this._onPacket.bind(this)).on(`error`,this._onError.bind(this)).on(`close`,e=>this._onClose(`transport close`,e))}onOpen(){this.readyState=`open`,e.priorWebsocketSuccess=this.transport.name===`websocket`,this.emitReserved(`open`),this.flush()}_onPacket(e){if(this.readyState===`opening`||this.readyState===`open`||this.readyState===`closing`)switch(this.emitReserved(`packet`,e),this.emitReserved(`heartbeat`),e.type){case`open`:this.onHandshake(JSON.parse(e.data));break;case`ping`:this._sendPacket(`pong`),this.emitReserved(`ping`),this.emitReserved(`pong`),this._resetPingTimeout();break;case`error`:let t=Error(`server error`);t.code=e.data,this._onError(t);break;case`message`:this.emitReserved(`data`,e.data),this.emitReserved(`message`,e.data);break}}onHandshake(e){this.emitReserved(`handshake`,e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!==`closed`&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);let e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose(`ping timeout`)},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved(`drain`):this.flush()}flush(){if(this.readyState!==`closed`&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){let e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved(`flush`)}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name===`polling`&&this.writeBuffer.length>1))return this.writeBuffer;let e=1;for(let t=0;t<this.writeBuffer.length;t++){let n=this.writeBuffer[t].data;if(n&&(e+=En(n)),t>0&&e>this._maxPayload)return this.writeBuffer.slice(0,t);e+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;let e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,yn(()=>{this._onClose(`ping timeout`)},this.setTimeoutFn)),e}write(e,t,n){return this._sendPacket(`message`,e,t,n),this}send(e,t,n){return this._sendPacket(`message`,e,t,n),this}_sendPacket(e,t,n,r){if(typeof t==`function`&&(r=t,t=void 0),typeof n==`function`&&(r=n,n=null),this.readyState===`closing`||this.readyState===`closed`)return;n||={},n.compress=!1!==n.compress;let i={type:e,data:t,options:n};this.emitReserved(`packetCreate`,i),this.writeBuffer.push(i),r&&this.once(`flush`,r),this.flush()}close(){let e=()=>{this._onClose(`forced close`),this.transport.close()},t=()=>{this.off(`upgrade`,t),this.off(`upgradeError`,t),e()},n=()=>{this.once(`upgrade`,t),this.once(`upgradeError`,t)};return(this.readyState===`opening`||this.readyState===`open`)&&(this.readyState=`closing`,this.writeBuffer.length?this.once(`drain`,()=>{this.upgrading?n():e()}):this.upgrading?n():e()),this}_onError(t){if(e.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState===`opening`)return this.transports.shift(),this._open();this.emitReserved(`error`,t),this._onClose(`transport error`,t)}_onClose(e,t){if(this.readyState===`opening`||this.readyState===`open`||this.readyState===`closing`){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners(`close`),this.transport.close(),this.transport.removeAllListeners(),Qn&&(this._beforeunloadEventListener&&removeEventListener(`beforeunload`,this._beforeunloadEventListener,!1),this._offlineEventListener)){let e=$n.indexOf(this._offlineEventListener);e!==-1&&$n.splice(e,1)}this.readyState=`closed`,this.id=null,this.emitReserved(`close`,e,t),this.writeBuffer=[],this._prevBufferLen=0}}};er.protocol=4;var tr=class extends er{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState===`open`&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),n=!1;er.priorWebsocketSuccess=!1;let r=()=>{n||(t.send([{type:`ping`,data:`probe`}]),t.once(`packet`,e=>{if(!n)if(e.type===`pong`&&e.data===`probe`){if(this.upgrading=!0,this.emitReserved(`upgrading`,t),!t)return;er.priorWebsocketSuccess=t.name===`websocket`,this.transport.pause(()=>{n||this.readyState!==`closed`&&(l(),this.setTransport(t),t.send([{type:`upgrade`}]),this.emitReserved(`upgrade`,t),t=null,this.upgrading=!1,this.flush())})}else{let e=Error(`probe error`);e.transport=t.name,this.emitReserved(`upgradeError`,e)}}))};function i(){n||(n=!0,l(),t.close(),t=null)}let a=e=>{let n=Error(`probe error: `+e);n.transport=t.name,i(),this.emitReserved(`upgradeError`,n)};function o(){a(`transport closed`)}function s(){a(`socket closed`)}function c(e){t&&e.name!==t.name&&i()}let l=()=>{t.removeListener(`open`,r),t.removeListener(`error`,a),t.removeListener(`close`,o),this.off(`close`,s),this.off(`upgrading`,c)};t.once(`open`,r),t.once(`error`,a),t.once(`close`,o),this.once(`close`,s),this.once(`upgrading`,c),this._upgrades.indexOf(`webtransport`)!==-1&&e!==`webtransport`?this.setTimeoutFn(()=>{n||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){let t=[];for(let n=0;n<e.length;n++)~this.transports.indexOf(e[n])&&t.push(e[n]);return t}},nr=class extends tr{constructor(e,t={}){let n=typeof e==`object`?e:t;(!n.transports||n.transports&&typeof n.transports[0]==`string`)&&(n.transports=(n.transports||[`polling`,`websocket`,`webtransport`]).map(e=>Kn[e]).filter(e=>!!e)),super(e,n)}};nr.protocol;function rr(e,t=``,n){let r=e;n||=typeof location<`u`&&location,e??=n.protocol+`//`+n.host,typeof e==`string`&&(e.charAt(0)===`/`&&(e=e.charAt(1)===`/`?n.protocol+e:n.host+e),/^(https?|wss?):\/\//.test(e)||(e=n===void 0?`https://`+e:n.protocol+`//`+e),r=Yn(e)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port=`80`:/^(http|ws)s$/.test(r.protocol)&&(r.port=`443`)),r.path=r.path||`/`;let i=r.host.indexOf(`:`)===-1?r.host:`[`+r.host+`]`;return r.id=r.protocol+`://`+i+`:`+r.port+t,r.href=r.protocol+`://`+i+(n&&n.port===r.port?``:`:`+r.port),r}var ir=typeof ArrayBuffer==`function`,ar=e=>typeof ArrayBuffer.isView==`function`?ArrayBuffer.isView(e):e.buffer instanceof ArrayBuffer,or=Object.prototype.toString,sr=typeof Blob==`function`||typeof Blob<`u`&&or.call(Blob)===`[object BlobConstructor]`,cr=typeof File==`function`||typeof File<`u`&&or.call(File)===`[object FileConstructor]`;function lr(e){return ir&&(e instanceof ArrayBuffer||ar(e))||sr&&e instanceof Blob||cr&&e instanceof File}function ur(e,t){if(!e||typeof e!=`object`)return!1;if(Array.isArray(e)){for(let t=0,n=e.length;t<n;t++)if(ur(e[t]))return!0;return!1}if(lr(e))return!0;if(e.toJSON&&typeof e.toJSON==`function`&&arguments.length===1)return ur(e.toJSON(),!0);for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&ur(e[t]))return!0;return!1}function dr(e){let t=[],n=e.data,r=e;return r.data=fr(n,t),r.attachments=t.length,{packet:r,buffers:t}}function fr(e,t){if(!e)return e;if(lr(e)){let n={_placeholder:!0,num:t.length};return t.push(e),n}else if(Array.isArray(e)){let n=Array(e.length);for(let r=0;r<e.length;r++)n[r]=fr(e[r],t);return n}else if(typeof e==`object`&&!(e instanceof Date)){let n={};for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=fr(e[r],t));return n}return e}function pr(e,t){return e.data=mr(e.data,t),delete e.attachments,e}function mr(e,t){if(!e)return e;if(e&&e._placeholder===!0){if(typeof e.num==`number`&&e.num>=0&&e.num<t.length)return t[e.num];throw Error(`illegal attachments`)}else if(Array.isArray(e))for(let n=0;n<e.length;n++)e[n]=mr(e[n],t);else if(typeof e==`object`)for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&(e[n]=mr(e[n],t));return e}var hr=t({Decoder:()=>vr,Encoder:()=>_r,PacketType:()=>Q,isPacketValid:()=>Tr,protocol:()=>5}),gr=[`connect`,`connect_error`,`disconnect`,`disconnecting`,`newListener`,`removeListener`],Q;(function(e){e[e.CONNECT=0]=`CONNECT`,e[e.DISCONNECT=1]=`DISCONNECT`,e[e.EVENT=2]=`EVENT`,e[e.ACK=3]=`ACK`,e[e.CONNECT_ERROR=4]=`CONNECT_ERROR`,e[e.BINARY_EVENT=5]=`BINARY_EVENT`,e[e.BINARY_ACK=6]=`BINARY_ACK`})(Q||={});var _r=class{constructor(e){this.replacer=e}encode(e){return(e.type===Q.EVENT||e.type===Q.ACK)&&ur(e)?this.encodeAsBinary({type:e.type===Q.EVENT?Q.BINARY_EVENT:Q.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=``+e.type;return(e.type===Q.BINARY_EVENT||e.type===Q.BINARY_ACK)&&(t+=e.attachments+`-`),e.nsp&&e.nsp!==`/`&&(t+=e.nsp+`,`),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){let t=dr(e),n=this.encodeAsString(t.packet),r=t.buffers;return r.unshift(n),r}},vr=class e extends X{constructor(e){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof e==`function`?{reviver:e}:e)}add(e){let t;if(typeof e==`string`){if(this.reconstructor)throw Error(`got plaintext data when reconstructing a packet`);t=this.decodeString(e);let n=t.type===Q.BINARY_EVENT;n||t.type===Q.BINARY_ACK?(t.type=n?Q.EVENT:Q.ACK,this.reconstructor=new yr(t),t.attachments===0&&super.emitReserved(`decoded`,t)):super.emitReserved(`decoded`,t)}else if(lr(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved(`decoded`,t));else throw Error(`got binary data when not reconstructing a packet`);else throw Error(`Unknown type: `+e)}decodeString(t){let n=0,r={type:Number(t.charAt(0))};if(Q[r.type]===void 0)throw Error(`unknown packet type `+r.type);if(r.type===Q.BINARY_EVENT||r.type===Q.BINARY_ACK){let e=n+1;for(;t.charAt(++n)!==`-`&&n!=t.length;);let i=t.substring(e,n);if(i!=Number(i)||t.charAt(n)!==`-`)throw Error(`Illegal attachments`);let a=Number(i);if(!xr(a)||a<0)throw Error(`Illegal attachments`);if(a>this.opts.maxAttachments)throw Error(`too many attachments`);r.attachments=a}if(t.charAt(n+1)===`/`){let e=n+1;for(;++n&&!(t.charAt(n)===`,`||n===t.length););r.nsp=t.substring(e,n)}else r.nsp=`/`;let i=t.charAt(n+1);if(i!==``&&Number(i)==i){let e=n+1;for(;++n;){let e=t.charAt(n);if(e==null||Number(e)!=e){--n;break}if(n===t.length)break}r.id=Number(t.substring(e,n+1))}if(t.charAt(++n)){let i=this.tryParse(t.substr(n));if(e.isPayloadValid(r.type,i))r.data=i;else throw Error(`invalid payload`)}return r}tryParse(e){try{return JSON.parse(e,this.opts.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case Q.CONNECT:return Cr(t);case Q.DISCONNECT:return t===void 0;case Q.CONNECT_ERROR:return typeof t==`string`||Cr(t);case Q.EVENT:case Q.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]==`number`||typeof t[0]==`string`&&gr.indexOf(t[0])===-1);case Q.ACK:case Q.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&=(this.reconstructor.finishedReconstruction(),null)}},yr=class{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){let e=pr(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}};function br(e){return typeof e==`string`}var xr=Number.isInteger||function(e){return typeof e==`number`&&isFinite(e)&&Math.floor(e)===e};function Sr(e){return e===void 0||xr(e)}function Cr(e){return Object.prototype.toString.call(e)===`[object Object]`}function wr(e,t){switch(e){case Q.CONNECT:return t===void 0||Cr(t);case Q.DISCONNECT:return t===void 0;case Q.EVENT:return Array.isArray(t)&&(typeof t[0]==`number`||typeof t[0]==`string`&&gr.indexOf(t[0])===-1);case Q.ACK:return Array.isArray(t);case Q.CONNECT_ERROR:return typeof t==`string`||Cr(t);default:return!1}}function Tr(e){return br(e.nsp)&&Sr(e.id)&&wr(e.type,e.data)}function $(e,t,n){return e.on(t,n),function(){e.off(t,n)}}var Er=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),Dr=class extends X{constructor(e,t,n){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,n&&n.auth&&(this.auth=n.auth),this._opts=Object.assign({},n),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;let e=this.io;this.subs=[$(e,`open`,this.onopen.bind(this)),$(e,`packet`,this.onpacket.bind(this)),$(e,`error`,this.onerror.bind(this)),$(e,`close`,this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState===`open`&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift(`message`),this.emit.apply(this,e),this}emit(e,...t){if(Er.hasOwnProperty(e))throw Error(`"`+e.toString()+`" is a reserved event name`);if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;let n={type:Q.EVENT,data:t};if(n.options={},n.options.compress=this.flags.compress!==!1,typeof t[t.length-1]==`function`){let e=this.ids++,r=t.pop();this._registerAckCallback(e,r),n.id=e}let r=this.io.engine?.transport?.writable,i=this.connected&&!this.io.engine?._hasPingExpired();return this.flags.volatile&&!r||(i?(this.notifyOutgoingListeners(n),this.packet(n)):this.sendBuffer.push(n)),this.flags={},this}_registerAckCallback(e,t){let n=this.flags.timeout??this._opts.ackTimeout;if(n===void 0){this.acks[e]=t;return}let r=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let t=0;t<this.sendBuffer.length;t++)this.sendBuffer[t].id===e&&this.sendBuffer.splice(t,1);t.call(this,Error(`operation has timed out`))},n),i=(...e)=>{this.io.clearTimeoutFn(r),t.apply(this,e)};i.withError=!0,this.acks[e]=i}emitWithAck(e,...t){return new Promise((n,r)=>{let i=(e,t)=>e?r(e):n(t);i.withError=!0,t.push(i),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]==`function`&&(t=e.pop());let n={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((e,...r)=>(this._queue[0],e===null?(this._queue.shift(),t&&t(null,...r)):n.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(e)),n.pending=!1,this._drainQueue())),this._queue.push(n),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;let t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth==`function`?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:Q.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved(`connect_error`,e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved(`disconnect`,e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(t=>String(t.id)===e)){let t=this.acks[e];delete this.acks[e],t.withError&&t.call(this,Error(`socket has been disconnected`))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case Q.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved(`connect_error`,Error(`It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)`));break;case Q.EVENT:case Q.BINARY_EVENT:this.onevent(e);break;case Q.ACK:case Q.BINARY_ACK:this.onack(e);break;case Q.DISCONNECT:this.ondisconnect();break;case Q.CONNECT_ERROR:this.destroy();let t=Error(e.data.message);t.data=e.data.data,this.emitReserved(`connect_error`,t);break}}onevent(e){let t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){let t=this._anyListeners.slice();for(let n of t)n.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]==`string`&&(this._lastOffset=e[e.length-1])}ack(e){let t=this,n=!1;return function(...r){n||(n=!0,t.packet({type:Q.ACK,id:e,data:r}))}}onack(e){let t=this.acks[e.id];typeof t==`function`&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved(`connect`)}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose(`io server disconnect`)}destroy(){this.subs&&=(this.subs.forEach(e=>e()),void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Q.DISCONNECT}),this.destroy(),this.connected&&this.onclose(`io client disconnect`),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){let t=this._anyListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){let t=this._anyOutgoingListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){let t=this._anyOutgoingListeners.slice();for(let n of t)n.apply(this,e.data)}}};function Or(e){e||={},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0}Or.prototype.duration=function(){var e=this.ms*this.factor**+ this.attempts++;if(this.jitter){var t=Math.random(),n=Math.floor(t*this.jitter*e);e=Math.floor(t*10)&1?e+n:e-n}return Math.min(e,this.max)|0},Or.prototype.reset=function(){this.attempts=0},Or.prototype.setMin=function(e){this.ms=e},Or.prototype.setMax=function(e){this.max=e},Or.prototype.setJitter=function(e){this.jitter=e};var kr=class extends X{constructor(e,t){super(),this.nsps={},this.subs=[],e&&typeof e==`object`&&(t=e,e=void 0),t||={},t.path=t.path||`/socket.io`,this.opts=t,wn(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor(t.randomizationFactor??.5),this.backoff=new Or({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState=`closed`,this.uri=e;let n=t.parser||hr;this.encoder=new n.Encoder,this.decoder=new n.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)==null||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)==null||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)==null||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf(`open`))return this;this.engine=new nr(this.uri,this.opts);let t=this.engine,n=this;this._readyState=`opening`,this.skipReconnect=!1;let r=$(t,`open`,function(){n.onopen(),e&&e()}),i=t=>{this.cleanup(),this._readyState=`closed`,this.emitReserved(`error`,t),e?e(t):this.maybeReconnectOnOpen()},a=$(t,`error`,i);if(!1!==this._timeout){let e=this._timeout,n=this.setTimeoutFn(()=>{r(),i(Error(`timeout`)),t.close()},e);this.opts.autoUnref&&n.unref(),this.subs.push(()=>{this.clearTimeoutFn(n)})}return this.subs.push(r),this.subs.push(a),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState=`open`,this.emitReserved(`open`);let e=this.engine;this.subs.push($(e,`ping`,this.onping.bind(this)),$(e,`data`,this.ondata.bind(this)),$(e,`error`,this.onerror.bind(this)),$(e,`close`,this.onclose.bind(this)),$(this.decoder,`decoded`,this.ondecoded.bind(this)))}onping(){this.emitReserved(`ping`)}ondata(e){try{this.decoder.add(e)}catch(e){this.onclose(`parse error`,e)}}ondecoded(e){yn(()=>{this.emitReserved(`packet`,e)},this.setTimeoutFn)}onerror(e){this.emitReserved(`error`,e)}socket(e,t){let n=this.nsps[e];return n?this._autoConnect&&!n.active&&n.connect():(n=new Dr(this,e,t),this.nsps[e]=n),n}_destroy(e){let t=Object.keys(this.nsps);for(let e of t)if(this.nsps[e].active)return;this._close()}_packet(e){let t=this.encoder.encode(e);for(let n=0;n<t.length;n++)this.engine.write(t[n],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose(`forced close`)}disconnect(){return this._close()}onclose(e,t){var n;this.cleanup(),(n=this.engine)==null||n.close(),this.backoff.reset(),this._readyState=`closed`,this.emitReserved(`close`,e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;let e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved(`reconnect_failed`),this._reconnecting=!1;else{let t=this.backoff.duration();this._reconnecting=!0;let n=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved(`reconnect_attempt`,e.backoff.attempts),!e.skipReconnect&&e.open(t=>{t?(e._reconnecting=!1,e.reconnect(),this.emitReserved(`reconnect_error`,t)):e.onreconnect()}))},t);this.opts.autoUnref&&n.unref(),this.subs.push(()=>{this.clearTimeoutFn(n)})}}onreconnect(){let e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved(`reconnect`,e)}},Ar={};function jr(e,t){typeof e==`object`&&(t=e,e=void 0),t||={};let n=rr(e,t.path||`/socket.io`),r=n.source,i=n.id,a=n.path,o=Ar[i]&&a in Ar[i].nsps,s=t.forceNew||t[`force new connection`]||!1===t.multiplex||o,c;return s?c=new kr(r,t):(Ar[i]||(Ar[i]=new kr(r,t)),c=Ar[i]),n.query&&!t.query&&(t.query=n.queryKey),c.socket(n.path,t)}Object.assign(jr,{Manager:kr,Socket:Dr,io:jr,connect:jr});var Mr=`http://localhost:8001`,Nr=new class{constructor(){this.socket=null,this.listeners=new Set,this.activeConversationId=null}connect(){let e=f.getState().token;if(!e||this.socket&&this.socket.connected)return;try{this.socket=jr(`${Mr}/chat`,{path:`/api/socket.io`,transports:[`websocket`,`polling`],auth:{token:e},query:{token:e},reconnection:!0,reconnectionDelay:2e3})}catch{return}this.socket.on(`connect`,()=>{this.activeConversationId&&this.socket.emit(`join`,{conversationId:this.activeConversationId})}),this.socket.on(`disconnect`,()=>{});let t=e=>t=>{let n={type:e===`typing`?`typing`:`message`,conversationId:t?.conversationId||t?.conversationId,data:t};(e===`new-message`||e===`new-message-notify`)&&(n.conversationId=t?.conversationId),this.listeners.forEach(e=>e(n))};this.socket.on(`new-message`,t(`new-message`)),this.socket.on(`new-message-notify`,t(`new-message-notify`)),this.socket.on(`typing`,t(`typing`))}join(e){this.activeConversationId=e,this.socket&&this.socket.connected&&e&&this.socket.emit(`join`,{conversationId:e})}send(e){!this.socket||!this.socket.connected||(e?.type===`typing`&&e.conversationId?this.socket.emit(`typing`,{conversationId:e.conversationId}):e?.type===`send-message`&&this.socket.emit(`send-message`,{conversationId:e.conversationId,content:e.content,attachment:e.attachment}))}on(e){return this.listeners.add(e),()=>this.listeners.delete(e)}close(){if(this.socket)try{this.socket.disconnect()}catch{}this.socket=null,this.activeConversationId=null}};f.subscribe(e=>{e.token?Nr.connect():Nr.close()}),f.getState().token&&setTimeout(()=>Nr.connect(),100);async function Pr(e,t=`chat`){if(!e)throw Error(`No file`);if(e.size>10*1024*1024)throw Error(`Max 10MB`);let n=e.type.startsWith(`image/`),r=e.type.startsWith(`video/`),i=n?`image`:r?`video`:`raw`,a=await K.get(`/uploads/signature?resource_type=${i}&folder=${t}`),o=new FormData;o.append(`file`,e),o.append(`api_key`,a.api_key),o.append(`timestamp`,a.timestamp),o.append(`signature`,a.signature),o.append(`folder`,a.folder);let s=`https://api.cloudinary.com/v1_1/${a.cloud_name}/${i}/upload`,c=await fetch(s,{method:`POST`,body:o});if(!c.ok){let e=await c.text();throw Error(`Cloudinary upload gagal: `+e.slice(0,100))}let l=await c.json();return{url:l.secure_url,publicId:l.public_id,type:l.resource_type,format:l.format,name:e.name,size:e.size,bytes:l.bytes}}function Fr(e){if(!e)return``;let t=F(e.url),n=F(e.name||`file`);return e.type===`image`?`<a href="${t}" target="_blank" rel="noopener"><img src="${t}" alt="${n}" style="max-width:240px;max-height:200px;border-radius:10px;display:block;margin-top:4px"/></a>`:`<a href="${t}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.5rem;padding:.5rem .75rem;background:rgba(255,255,255,.15);border-radius:10px;color:inherit;margin-top:4px"><i class="fa-solid ${e.type===`video`?`fa-film`:`fa-paperclip`}"></i><span style="text-decoration:underline">${n}</span><span style="opacity:.7;font-size:.8rem">${e.size?Math.round(e.size/1024)+` KB`:``}</span></a>`}async function Ir({mount:e,params:t}){let n=f.getState().user,r=t.id||null;e.innerHTML=`
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
    </div>`,Nr.connect(),r&&Nr.join(r);let i=[];try{i=await K.get(`/conversations`)}catch(e){I(e.message,`error`);return}let a=(e=``)=>{let t=document.getElementById(`conv-items`);if(!t)return;let n=i.filter(t=>!e||(t.other?.name||``).toLowerCase().includes(e.toLowerCase()));if(!n.length){t.innerHTML=H(`Belum ada percakapan`,`Mulai chat dari halaman jasa`,`fa-comment`);return}t.innerHTML=n.map(e=>`
      <a class="conv-item ${r===e.id?`active`:``}" href="#/chat/${e.id}" data-testid="conv-${e.id}">
        ${U(e.other,`sm`)}
        <div class="body">
          <div class="name"><span>${F(e.other?.name||``)}</span>${e.unread?`<span class="unread">${e.unread}</span>`:`<span class="text-xs text-muted">${N(e.updatedAt)}</span>`}</div>
          <div class="last">${F(e.lastMessage||`Belum ada pesan`)}</div>
        </div>
      </a>`).join(``)};if(a(),document.getElementById(`conv-search`).addEventListener(`input`,e=>a(e.target.value)),!r){let e=Nr.on(async e=>{if(e.type===`message`)try{i=await K.get(`/conversations`),a(document.getElementById(`conv-search`).value)}catch{}});return()=>e()}let o=i.find(e=>e.id===r);if(!o){document.getElementById(`chat-room`).innerHTML=H(`Percakapan tidak ditemukan`);return}let s=[];try{s=await K.get(`/conversations/${r}/messages`)}catch(e){document.getElementById(`chat-room`).innerHTML=H(`Gagal memuat`,e.message);return}let c=document.getElementById(`chat-room`);c.innerHTML=`
    <div class="chat-header">
      ${U(o.other)}
      <div style="flex:1"><strong>${F(o.other?.name||``)}</strong><div class="text-xs text-muted" id="typing-ind">${F(o.other?.bio||``)}</div></div>
    </div>
    <div class="chat-messages" id="msgs" data-testid="msgs"></div>
    <form class="chat-input" id="msg-form">
      <input type="file" id="file-input" style="display:none" accept="image/*,video/*,application/pdf" data-testid="file-input">
      <button type="button" class="btn btn-ghost btn-sm" id="attach-btn" data-testid="attach-btn" title="Lampirkan file"><i class="fa-solid fa-paperclip"></i></button>
      <input class="input" id="msg-text" placeholder="Tulis pesan..." data-testid="msg-input" autocomplete="off">
      <button class="btn btn-primary" type="submit" data-testid="msg-send-btn"><i class="fa-solid fa-paper-plane"></i></button>
    </form>
    <div id="upload-preview" style="display:none;padding:.5rem 1rem;border-top:1px solid var(--border);font-size:.85rem"></div>`;let l=()=>{let e=document.getElementById(`msgs`);e&&(e.innerHTML=s.map(e=>{let t=e.senderId||e.fromUserId,r=e.content||e.text||``,i=e.attachment?Fr(e.attachment):``,a=r?`<div>${F(r)}</div>`:``;return`<div class="msg ${t===n.id?`msg-mine`:`msg-other`}" data-testid="msg-bubble">${a}${i}<span class="time">${tt(e.createdAt)}</span></div>`}).join(``),e.scrollTop=e.scrollHeight)};l();let u=null,d=document.getElementById(`file-input`),p=document.getElementById(`attach-btn`),m=document.getElementById(`upload-preview`);p.addEventListener(`click`,()=>d.click()),d.addEventListener(`change`,async e=>{let t=e.target.files[0];if(t){m.style.display=`block`,m.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Mengupload ${F(t.name)}...`;try{u=await Pr(t,`chat`),m.innerHTML=`<i class="fa-solid fa-paperclip"></i> Siap dikirim: <strong>${F(u.name)}</strong> <button type="button" class="btn btn-ghost btn-sm" id="att-clear">✕</button>`,document.getElementById(`att-clear`).addEventListener(`click`,()=>{u=null,m.style.display=`none`,d.value=``})}catch(e){I(e.message,`error`),m.style.display=`none`,u=null}}});let h=document.getElementById(`msg-text`),g;h.addEventListener(`input`,()=>{clearTimeout(g),Nr.send({type:`typing`,conversationId:r}),g=setTimeout(()=>{},1500)}),document.getElementById(`msg-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=h.value.trim();if(!t&&!u){I(`Pesan tidak boleh kosong`,`warning`);return}h.value=``;try{let e=await K.post(`/chat/conversations/${r}/messages`,{content:t,attachment:u});s.push(e.message||e),l(),u=null,m.style.display=`none`,d.value=``}catch(e){I(e.message,`error`),h.value=t}});let _,ee=Nr.on(e=>{if(e.type===`message`&&e.conversationId===r)s.push(e.data),l();else if(e.type===`typing`&&e.conversationId===r){let e=document.getElementById(`typing-ind`);e&&(e.innerHTML=`<i class="fa-solid fa-pencil"></i> sedang mengetik...`,clearTimeout(_),_=setTimeout(()=>{e.innerHTML=F(o.other?.bio||``)},2500))}});return console.log(`Conversations with others:`,i.map(e=>({id:e.id,otherName:e.other?.name,otherId:e.other?.id}))),()=>ee()}async function Lr({mount:e}){e.innerHTML=`<div class="container page"><div class="spinner"></div></div>`;try{let t=await K.get(`/auth/me`),n=await K.get(`/services?sellerId=`+t.id).catch(()=>[]),r=Array.isArray(n)?n:n.data||[];e.innerHTML=`
      <div class="container page">
        <div class="card card-pad-lg" data-testid="profile-card">
          <div class="flex gap-md" style="align-items:center;flex-wrap:wrap">
            ${U(t,`xl`)}
            <div style="flex:1;min-width:200px">
              <div class="flex gap-sm" style="align-items:center"><h1 style="margin:0">${F(t.name)}</h1>${t.verified?`<i class="fa-solid fa-circle-check" style="color:var(--primary)" title="Verified"></i>`:``}</div>
              <p class="text-muted" style="margin:.25rem 0">${F(t.bio||`Belum ada bio`)}</p>
              <div class="flex gap-md text-sm text-muted" style="flex-wrap:wrap">
                <span><i class="fa-solid fa-envelope"></i> ${F(t.email)}</span>
                <span><i class="fa-solid fa-location-dot"></i> ${F(t.city||`-`)}</span>
                <span class="badge">${t.role===`ADMIN`?`Administrator`:`Pengguna`}</span>
                <span><i class="fa-solid fa-star" style="color:var(--warning)"></i> ${(t.rating||0).toFixed(1)} (${t.reviewCount||0} ulasan)</span>
              </div>
            </div>
            <div class="flex gap-sm" style="flex-wrap:wrap">
              <a class="btn btn-secondary" href="#/users/${t.id}" data-testid="view-public-profile-btn"><i class="fa-solid fa-eye"></i> Lihat Profil Publik</a>
              <a class="btn btn-primary" href="#/settings" data-testid="edit-profile-btn"><i class="fa-solid fa-pen"></i> Edit Profil</a>
            </div>
          </div>
        </div>
        ${r.length?`
          <h2 class="mt-4">Jasa Saya</h2>
          <div class="services-grid">${r.map(e=>yt(e)).join(``)}</div>`:``}
      </div>`}catch(t){e.innerHTML=H(`Gagal memuat profil`,t.message)}}function Rr(e){return new Promise((t,n)=>{let r=new FileReader;r.readAsDataURL(e),r.onload=()=>t(r.result),r.onerror=n})}async function zr({mount:e}){let t=f.getState().user;e.innerHTML=`
    <div class="container-sm page">
      <h1 class="page-title">Pengaturan Profil</h1>
      <div class="card card-pad-lg">
        <form id="s-form" data-testid="settings-form">
          <div class="form-group text-center">
            <label class="label" style="display:block">Foto Profil</label>
            <div style="position:relative;display:inline-block">
              <img id="avatar-preview" src="${t.avatar&&t.avatar!==`null`?F(t.avatar):`https://i.pravatar.cc/150?u=${t.id}`}"
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
          </div>
          <div class="form-group"><label class="label">Nama</label><input class="input" id="name" value="${F(t.name)}" data-testid="set-name"></div>
          <div class="form-group"><label class="label">Bio</label><textarea class="textarea" id="bio" rows="3" maxlength="500" data-testid="set-bio" placeholder="Ceritakan tentang Anda...">${F(t.bio||``)}</textarea></div>
          <div class="form-group"><label class="label">Kota</label><input class="input" id="city" value="${F(t.city||``)}" placeholder="Contoh: Jakarta Selatan" data-testid="set-city"></div>
          <div class="form-group"><label class="label">Nomor Telepon</label><input class="input" id="phone" value="${F(t.phone||``)}" placeholder="0812xxxxxxxx" data-testid="set-phone"></div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="settings-save-btn">
            <i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan
          </button>
        </form>
      </div>
    </div>`;let n=null;document.getElementById(`avatar-file`).addEventListener(`change`,async e=>{let t=e.target.files?.[0];if(t){if(!t.type.startsWith(`image/`))return I(`File harus berupa gambar`,`error`);if(t.size>2*1024*1024)return I(`Ukuran maksimal 2MB`,`error`);try{n=await Rr(t);let e=document.getElementById(`avatar-preview`);e&&(e.src=n),I(`Foto dipilih. Klik Simpan untuk mengupload.`,`info`)}catch{I(`Gagal memproses file`,`error`)}}}),document.getElementById(`s-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=e.target.querySelector(`button[type=submit]`);t.disabled=!0,t.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...`;try{let e={name:document.getElementById(`name`).value.trim(),bio:document.getElementById(`bio`).value.trim(),city:document.getElementById(`city`).value.trim(),phone:document.getElementById(`phone`).value.trim()};n&&(e.avatar=n);let t=await K.put(`/users/me`,e);f.setState({user:t}),I(`Profil berhasil diperbarui`,`success`),n=null}catch(e){I(e.message||`Gagal menyimpan`,`error`)}finally{t.disabled=!1,t.innerHTML=`<i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan`}})}async function Br({mount:e,params:t}){e.innerHTML=`<div class="container page"><div class="spinner"></div></div>`;let n=t.id;try{let[t,r,i,a,o]=await Promise.all([K.get(`/users/`+n),K.get(`/users/${n}/services`).catch(()=>[]),K.get(`/users/${n}/reviews`).catch(()=>({reviews:[],rating:0,reviewCount:0})),K.get(`/users/${n}/jobs`).catch(()=>[]),K.get(`/users/${n}/work-history`).catch(()=>[])]),s=f.getState().user,c=s&&s.id===t.id,l=Array.isArray(i)?i:i.reviews||[],u=t.rating||i.rating||0,d=t.reviewCount||i.reviewCount||l.length,p=r.length,m=a.length,h=a.filter(e=>e.status===`OPEN`||e.status===`open`).length,g=o.filter(e=>String(e.status).toUpperCase()===`COMPLETED`).length;e.innerHTML=`
      <div class="container page" style="max-width:1200px; margin:0 auto; padding:20px;">
        <a href="#/marketplace" class="text-sm" data-testid="public-profile-back" style="display:inline-block; margin-bottom:20px; text-decoration:none; color:#0a66c2;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Marketplace
        </a>

        <!-- Profile Header Card -->
        <div class="card card-pad-lg" style="background:#fff; border-radius:16px; padding:24px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
            ${U(t,`xl`)}
            <div style="flex:1; min-width:240px;">
              <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                <h1 style="margin:0; font-size:1.8rem;" data-testid="public-profile-name">${F(t.name||`User`)}</h1>
                ${t.verified?`<i class="fa-solid fa-circle-check" style="color:#0a66c2; font-size:20px;" title="Terverifikasi"></i>`:``}
                ${t.role===`ADMIN`?`<span class="badge" style="background:#f5b042; color:#fff;">Admin</span>`:``}
              </div>
              <p class="text-muted" style="margin:8px 0 12px 0; color:#666;" data-testid="public-profile-bio">
                ${F(t.bio||`Belum ada bio`)}
              </p>
              <div style="display:flex; gap:20px; flex-wrap:wrap; font-size:14px; color:#666;">
                <span><i class="fa-solid fa-star" style="color:#f5b042;"></i> <strong>${u.toFixed(1)}</strong> (${d} ulasan)</span>
                <span><i class="fa-solid fa-bag-shopping"></i> ${t.completedOrders||0} pesanan selesai</span>
                ${t.city?`<span><i class="fa-solid fa-location-dot"></i> ${F(t.city)}</span>`:``}
                <span><i class="fa-solid fa-calendar"></i> Bergabung ${N(t.createdAt)}</span>
              </div>
            </div>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              ${c?`<a class="btn btn-secondary" href="#/settings" data-testid="public-profile-edit-btn" style="background:#f0f0f0; text-decoration:none; padding:10px 20px; border-radius:8px;"><i class="fa-solid fa-pen"></i> Edit Profil</a>`:`
                <button class="btn btn-primary" id="chat-user-btn" data-testid="public-profile-chat-btn" style="background:#0a66c2; color:#fff; border:none; padding:10px 20px; border-radius:8px; cursor:pointer;">
                  <i class="fa-solid fa-message"></i> Chat
                </button>
                <button class="btn btn-secondary" id="report-user-btn" data-testid="public-profile-report-btn" style="background:#f0f0f0; border:none; padding:10px 20px; border-radius:8px; cursor:pointer;">
                  <i class="fa-solid fa-flag"></i> Laporkan
                </button>
              `}
            </div>
          </div>
        </div>

        <!-- Statistik Ringkasan -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:16px; margin-bottom:24px;">
          <div class="stat-card" style="background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${p}</div>
            <div style="font-size:13px; color:#666;">Jasa Ditawarkan</div>
          </div>
          <div class="stat-card" style="background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${m}</div>
            <div style="font-size:13px; color:#666;">Pekerjaan Diposting</div>
          </div>
          <div class="stat-card" style="background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${h}</div>
            <div style="font-size:13px; color:#666;">Pekerjaan Aktif</div>
          </div>
          <div class="stat-card" style="background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${g}</div>
            <div style="font-size:13px; color:#666;">CV Pekerjaan</div>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div style="display:flex; gap:8px; border-bottom:1px solid #e0e0e0; margin-bottom:24px;">
          <button class="tab-btn active" data-tab="services" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#0a66c2; border-bottom:2px solid #0a66c2;">Jasa Ditawarkan (${p})</button>
          <button class="tab-btn" data-tab="work" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#666;">CV / Riwayat (${o.length})</button>
          <button class="tab-btn" data-tab="jobs" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#666;">Pekerjaan Diposting (${m})</button>
          <button class="tab-btn" data-tab="reviews" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#666;">Ulasan (${l.length})</button>
        </div>

        <!-- Tab Content: Services -->
        <div id="tab-services" class="tab-content active">
          <div id="services-list" data-testid="public-profile-services">
            ${r.length?`<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px,1fr)); gap:20px;">
                    ${r.map(e=>yt(e)).join(``)}
                  </div>`:`<div style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:12px;">
                    <i class="fa-solid fa-box-open" style="font-size:3rem; color:#ccc;"></i>
                    <h3 style="margin:12px 0 8px;">Belum ada jasa</h3>
                    <p style="color:#999;">User ini belum memposting jasa.</p>
                  </div>`}
          </div>
        </div>

        <!-- Tab Content: Work CV -->
        <div id="tab-work" class="tab-content" style="display:none;">
          ${o.length?`<div style="display:flex; flex-direction:column; gap:14px;">
                  ${o.map(e=>`
                    <div class="job-card" style="background:#fff;border-radius:12px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.1)">
                      <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap">
                        <div>
                          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
                            <span class="badge">${F(e.label)}</span>
                            <span class="badge ${String(e.status).toUpperCase()===`COMPLETED`?`badge-success`:`badge-warning`}">${F(e.status)}</span>
                          </div>
                          <h3 style="margin:.25rem 0">${F(e.title)}</h3>
                          <div class="text-sm text-muted">Client: ${F(e.client?.name||`-`)} · ${N(e.createdAt)}</div>
                        </div>
                        <strong style="color:#0a66c2">${M(e.amount||0)}</strong>
                      </div>
                      ${e.review?`<div style="margin-top:12px;padding:12px;border-radius:8px;background:#f8f9fa"><span style="color:#f5b042">${`★`.repeat(e.review.rating)}${`☆`.repeat(5-e.review.rating)}</span><p style="margin:.35rem 0 0">${F(e.review.comment||``)}</p></div>`:``}
                    </div>
                  `).join(``)}
                </div>`:`<div style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:12px;"><i class="fa-solid fa-clipboard-check" style="font-size:3rem; color:#ccc;"></i><h3>Belum ada riwayat kerja</h3><p style="color:#999;">Riwayat akan muncul setelah user mengerjakan pesanan atau job.</p></div>`}
        </div>

        <!-- Tab Content: Jobs -->
        <div id="tab-jobs" class="tab-content" style="display:none;">
          <div id="jobs-list" data-testid="public-profile-jobs">
            ${a.length?`<div style="display:flex; flex-direction:column; gap:16px;">
                    ${a.map(e=>`
                      <div class="job-card" data-job-id="${e.id}" style="background:#fff; border-radius:12px; padding:20px; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.1); transition:box-shadow 0.2s;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap;">
                          <div style="flex:1;">
                            <div style="display:flex; gap:8px; margin-bottom:8px; flex-wrap:wrap;">
                              <span class="badge" style="background:${e.status===`OPEN`||e.status===`open`?`#4caf50`:`#999`}; color:#fff; padding:4px 12px; border-radius:20px; font-size:12px;">
                                ${e.status===`OPEN`||e.status===`open`?`Aktif`:`Ditutup`}
                              </span>
                              <span style="font-size:12px; color:#999;">${N(e.createdAt)}</span>
                            </div>
                            <h3 style="margin:8px 0; font-size:1.1rem;">${F(e.title)}</h3>
                            <p style="color:#666; font-size:14px; line-height:1.5; margin:8px 0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                              ${F(e.description?.substring(0,120)||``)}${(e.description?.length||0)>120?`...`:``}
                            </p>
                            <div style="display:flex; gap:16px; margin-top:12px; font-size:13px; color:#666; flex-wrap:wrap;">
                              <span><i class="fa-solid fa-money-bill-wave"></i> ${M(e.budget)}</span>
                              <span><i class="fa-solid fa-location-dot"></i> ${F(e.city||`Remote`)}</span>
                              ${e.deadline?`<span><i class="fa-solid fa-calendar"></i> Deadline: ${new Date(e.deadline).toLocaleDateString()}</span>`:``}
                            </div>
                          </div>
                          <div style="text-align:right; margin-top:8px;">
                            <span style="background:#f0f0f0; padding:4px 12px; border-radius:20px; font-size:12px;">${e.applicationsCount||e.applicationCount||0} pelamar</span>
                          </div>
                        </div>
                      </div>
                    `).join(``)}
                  </div>`:`<div style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:12px;">
                    <i class="fa-solid fa-briefcase" style="font-size:3rem; color:#ccc;"></i>
                    <h3 style="margin:12px 0 8px;">Belum ada pekerjaan</h3>
                    <p style="color:#999;">User ini belum memposting pekerjaan.</p>
                  </div>`}
          </div>
        </div>

        <!-- Tab Content: Reviews -->
        <div id="tab-reviews" class="tab-content" style="display:none;">
          <div style="background:#fff; border-radius:12px; padding:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            ${l.length?l.map(e=>`
                  <div class="review-item" style="padding:16px 0; border-bottom:1px solid #eee;">
                    <div style="display:flex; gap:12px; align-items:center;">
                      ${U(e.reviewer||{name:`User`,id:e.reviewerId},`sm`)}
                      <div style="flex:1;">
                        <strong>${F(e.reviewer?.name||`User`)}</strong>
                        <div style="font-size:11px; color:#999; margin-top:2px;">${N(e.createdAt)}</div>
                      </div>
                      <div style="color:#f5b042; font-size:14px;">${`★`.repeat(e.rating||5)}${`☆`.repeat(5-(e.rating||5))}</div>
                    </div>
                    <p style="margin:12px 0 0 52px; color:#555; font-size:14px; line-height:1.5;">${F(e.comment||``)}</p>
                    ${e.serviceTitle?`<p style="margin:8px 0 0 52px; font-size:12px; color:#999;"><i class="fa-solid fa-briefcase"></i> Jasa: ${F(e.serviceTitle)}</p>`:``}
                  </div>
                `).join(``):`<p style="text-align:center; padding:40px; color:#999;">Belum ada ulasan</p>`}
          </div>
        </div>
      </div>
      
      <style>
        .job-card:hover { box-shadow:0 4px 12px rgba(0,0,0,0.15); transform:translateY(-2px); transition:all 0.2s; }
        .tab-btn:hover { color:#0a66c2; }
        .service-card { transition:transform 0.2s, box-shadow 0.2s; }
        .service-card:hover { transform:translateY(-4px); box-shadow:0 4px 12px rgba(0,0,0,0.15); }
      </style>
    `;let _=e.querySelectorAll(`.tab-btn`),ee={services:e.querySelector(`#tab-services`),work:e.querySelector(`#tab-work`),jobs:e.querySelector(`#tab-jobs`),reviews:e.querySelector(`#tab-reviews`)};_.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tab;_.forEach(e=>{e.classList.remove(`active`),e.style.color=`#666`,e.style.borderBottom=`none`}),e.classList.add(`active`),e.style.color=`#0a66c2`,e.style.borderBottom=`2px solid #0a66c2`,Object.values(ee).forEach(e=>{e&&(e.style.display=`none`)}),ee[t]&&(ee[t].style.display=`block`)})}),document.getElementById(`chat-user-btn`)?.addEventListener(`click`,async()=>{if(!s)return I(`Silakan login dulu`,`warning`),B.navigate(`/login`);try{let e=await K.post(`/chat/conversations`,{recipientId:t.id});B.navigate(`/chat/`+e.id)}catch(e){I(e.message,`error`)}}),document.getElementById(`report-user-btn`)?.addEventListener(`click`,()=>{if(!s){I(`Silakan login dulu untuk melaporkan`,`warning`);return}I(`Laporan terkirim. Tim Tolongin akan meninjau.`,`success`)}),document.querySelectorAll(`.job-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.job-card`)){let t=e.dataset.jobId;B.navigate(`/jobs/${t}`)}})}),document.querySelectorAll(`.seller-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation();let n=e.dataset.userId;n&&B.navigate(`/users/`+n)})}),document.querySelectorAll(`.service-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.seller-link`)||t.target.closest(`.btn-fav`))return;let n=e.getAttribute(`href`)?.split(`/`).pop();n&&B.navigate(`/services/${n}`)})})}catch(t){console.error(`PublicProfilePage error:`,t),e.innerHTML=`<div class="container page">
      <div style="text-align:center; padding:60px 20px;">
        <i class="fa-solid fa-user-slash" style="font-size:3rem; color:#ccc;"></i>
        <h3>User tidak ditemukan</h3>
        <p style="color:#999;">${F(t.message)}</p>
        <a href="#/marketplace" class="btn btn-primary" style="display:inline-block; margin-top:16px; padding:10px 20px; background:#0a66c2; color:#fff; text-decoration:none; border-radius:8px;">Kembali ke Marketplace</a>
      </div>
    </div>`}}var Vr=t({mountImageUpload:()=>qr}),Hr=5*1024*1024,Ur=[`image/jpeg`,`image/png`,`image/webp`,`image/gif`],Wr=null;async function Gr(){if(Wr!==null)return Wr;try{Wr=!!(await K.get(`/integrations/status`)).cloudinary}catch{Wr=!1}return Wr}function Kr(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=n,r.readAsDataURL(e)})}function qr(e,t={}){let n=t.folder||`images`,r=t.testid||`image-upload`,i=t.name||`image`,a=t.initial||``,o=()=>{e.innerHTML=`
      <div class="upload-zone ${a?`has-image`:``}" data-testid="${F(r)}-zone">
        ${a?`<img src="${F(a)}" class="upload-preview" alt="preview"/>`:`
          <div class="upload-placeholder">
            <i class="fa-solid fa-cloud-arrow-up"></i>
            <div><strong>Klik atau seret gambar ke sini</strong></div>
            <div class="text-xs text-muted">JPG, PNG, WEBP — max 5MB</div>
          </div>`}
        <input type="file" id="${i}-file" accept="image/*" hidden data-testid="${F(r)}-input">
        <div class="upload-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-pick data-testid="${F(r)}-pick"><i class="fa-solid fa-image"></i> Pilih File</button>
          ${a?`<button type="button" class="btn btn-ghost btn-sm" data-clear data-testid="${F(r)}-clear"><i class="fa-solid fa-xmark"></i> Hapus</button>`:``}
        </div>
        <div class="upload-progress" hidden><div class="bar"></div></div>
      </div>
      <details class="mt-1">
        <summary class="text-xs text-muted" style="cursor:pointer">Atau gunakan URL gambar</summary>
        <input type="url" class="input mt-1" placeholder="https://..." value="${F(a)}" data-url-input data-testid="${F(r)}-url">
      </details>
    `;let s=e.querySelector(`.upload-zone`),c=e.querySelector(`input[type=file]`),l=e.querySelector(`[data-url-input]`),u=e.querySelector(`.upload-progress`),d=e=>{a=e||``,t.onChange&&t.onChange(a),o()},f=async e=>{if(e){if(!Ur.includes(e.type)){window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`error`,text:`Format tidak didukung — gunakan JPG/PNG/WEBP/GIF`}}));return}if(e.size>Hr){window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`error`,text:`File terlalu besar (max 5MB)`}}));return}u.hidden=!1,u.querySelector(`.bar`).style.width=`40%`;try{let t;t=await Gr()?(await Pr(e,n)).url:await Kr(e),u.querySelector(`.bar`).style.width=`100%`,setTimeout(()=>d(t),200)}catch(e){window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`error`,text:`Upload gagal: `+e.message}})),u.hidden=!0}}};e.querySelector(`[data-pick]`).addEventListener(`click`,()=>c.click()),c.addEventListener(`change`,e=>f(e.target.files[0]));let p=e.querySelector(`[data-clear]`);p&&p.addEventListener(`click`,()=>d(``)),l&&l.addEventListener(`change`,e=>d(e.target.value.trim())),s.addEventListener(`dragover`,e=>{e.preventDefault(),s.classList.add(`drag-over`)}),s.addEventListener(`dragleave`,()=>s.classList.remove(`drag-over`)),s.addEventListener(`drop`,e=>{e.preventDefault(),s.classList.remove(`drag-over`);let t=e.dataTransfer.files[0];t&&f(t)});let m=e.querySelector(`.upload-placeholder`);m&&m.addEventListener(`click`,()=>c.click())};return o(),{getValue:()=>a,setValue:e=>{a=e||``,o()},destroy:()=>{e.innerHTML=``}}}var Jr={not_submitted:{label:`Belum Dikirim`,icon:`fa-circle-question`},pending:{label:`Menunggu Review`,icon:`fa-hourglass-half`},approved:{label:`Terverifikasi`,icon:`fa-circle-check`},rejected:{label:`Ditolak`,icon:`fa-circle-xmark`}};async function Yr({mount:e}){let t=f.getState().user;if(!t||t.role!==`SELLER`){e.innerHTML=H(`Hanya seller yang perlu KYC`,`Buyer tidak perlu melakukan verifikasi identitas.`);return}e.innerHTML=`<div class="container-sm page"><div class="spinner"></div></div>`;let n;try{n=await K.get(`/kyc/me`)}catch{n={status:`not_submitted`,data:{}}}let r=n.status||`not_submitted`,i=n.data||{},a=Jr[r]||Jr.not_submitted,o=r===`pending`||r===`approved`;e.innerHTML=`
    <div class="container-sm page">
      <h1 class="page-title">Verifikasi Identitas (KYC)</h1>
      <p class="page-subtitle">Verifikasi diperlukan untuk menerima pembayaran dan membangun kepercayaan pembeli.</p>
      <div class="card card-pad-lg">
        <div class="flex-between mb-2">
          <strong>Status</strong>
          <span class="kyc-status ${r}" data-testid="kyc-status"><i class="fa-solid ${a.icon}"></i> ${a.label}</span>
        </div>
        ${r===`rejected`&&i.rejectReason?`<div class="card card-pad" style="background:#fef2f2;border:1px solid #fecaca;margin-bottom:1rem"><strong>Alasan ditolak:</strong> ${F(i.rejectReason)}</div>`:``}
        <form id="kyc-form" data-testid="kyc-form">
          <div class="form-group"><label class="label">Nama Lengkap (sesuai KTP)</label><input class="input" id="fullName" required ${o?`disabled`:``} value="${F(i.fullName||t.name)}" data-testid="kyc-fullname"></div>
          <div class="form-group"><label class="label">Nomor KTP (16 digit)</label><input class="input" id="ktpNumber" required ${o?`disabled`:``} minlength="10" maxlength="20" value="${F(i.ktpNumber||``)}" placeholder="3201..." data-testid="kyc-ktp-number"></div>
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
            <div class="form-group"><label class="label">Nama Bank</label><input class="input" id="bankName" required ${o?`disabled`:``} value="${F(i.bankName||``)}" placeholder="BCA, Mandiri..." data-testid="kyc-bank"></div>
            <div class="form-group"><label class="label">Nomor Rekening</label><input class="input" id="bankAccountNumber" required ${o?`disabled`:``} minlength="5" value="${F(i.bankAccountNumber||``)}" data-testid="kyc-bank-number"></div>
          </div>
          <div class="form-group"><label class="label">Nama Pemilik Rekening</label><input class="input" id="bankAccountName" required ${o?`disabled`:``} value="${F(i.bankAccountName||``)}" data-testid="kyc-bank-name"></div>
          ${o?``:`<button class="btn btn-primary btn-lg btn-block" type="submit" data-testid="kyc-submit-btn">${r===`rejected`?`Kirim Ulang`:`Kirim untuk Verifikasi`}</button>`}
        </form>
      </div>
    </div>`;let s=i.ktpPhoto||``,c=i.ktpSelfie||``;o?(document.getElementById(`ktp-upload`).innerHTML=s?`<img src="${F(s)}" class="upload-preview" alt="KTP"/>`:`<div class="text-muted">Belum diunggah</div>`,document.getElementById(`selfie-upload`).innerHTML=c?`<img src="${F(c)}" class="upload-preview" alt="Selfie"/>`:`<div class="text-muted">Belum diunggah</div>`):(qr(document.getElementById(`ktp-upload`),{folder:`kyc`,initial:s,name:`ktp-img`,testid:`kyc-ktp-upload`,onChange:e=>{s=e}}),qr(document.getElementById(`selfie-upload`),{folder:`kyc`,initial:c,name:`selfie-img`,testid:`kyc-selfie-upload`,onChange:e=>{c=e}}));let l=document.getElementById(`kyc-form`);l&&!o&&l.addEventListener(`submit`,async t=>{if(t.preventDefault(),!s)return I(`Foto KTP wajib diunggah`,`error`);if(!c)return I(`Selfie wajib diunggah`,`error`);let n={fullName:document.getElementById(`fullName`).value.trim(),ktpNumber:document.getElementById(`ktpNumber`).value.trim(),bankName:document.getElementById(`bankName`).value.trim(),bankAccountNumber:document.getElementById(`bankAccountNumber`).value.trim(),bankAccountName:document.getElementById(`bankAccountName`).value.trim(),ktpPhoto:s,ktpSelfie:c};try{await K.post(`/kyc/submit`,n),I(`KYC berhasil dikirim untuk review`,`success`),f.setState({user:{...f.getState().user,kycStatus:`pending`}}),setTimeout(()=>Yr({mount:e}),500)}catch(e){I(e.message,`error`)}})}function Xr(e){return{VERIFIED:`<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Terverifikasi</span>`,PENDING:`<span class="badge badge-warning"><i class="fa-solid fa-clock"></i> Menunggu Review</span>`,REJECTED:`<span class="badge badge-danger"><i class="fa-solid fa-xmark"></i> Ditolak</span>`,NOT_SUBMITTED:`<span class="badge"><i class="fa-solid fa-upload"></i> Belum Disubmit</span>`}[e]||`<span class="badge">${e}</span>`}function Zr(e){return e?`<i class="fa-solid fa-circle-check" style="color:var(--success);font-size:1.5rem"></i>`:`<i class="fa-regular fa-circle" style="color:var(--text-2);font-size:1.5rem"></i>`}async function Qr({mount:e}){let{user:t}=f.getState();if(!t){B.navigate(`/login`);return}let n={};try{n=await K.get(`/verification/status`)}catch{}let r=n.emailVerified??t.emailVerified??!1,i=n.phoneVerified??t.phoneVerified??!1,a=n.ktp?.status||t.ktpStatus||`NOT_SUBMITTED`,o=n.bank?.status||t.bankStatus||`NOT_SUBMITTED`;if(e.innerHTML=`
    <div class="container page">
      <h1 class="page-title">Verifikasi Identitas</h1>
      <p class="page-subtitle">Selesaikan verifikasi bertahap untuk membuka semua fitur Tolongin</p>

      <!-- Progress Bar -->
      <div class="card card-pad-lg mb-4">
        <div class="flex gap-md" style="align-items:flex-start;flex-wrap:wrap">
          <div style="flex:1;text-align:center;min-width:100px">
            ${Zr(r)}
            <div class="text-sm mt-1" style="font-weight:600">Email</div>
            <div class="text-xs text-muted">Level 1</div>
          </div>
          <div style="flex:none;padding-top:.7rem;color:var(--border)">→</div>
          <div style="flex:1;text-align:center;min-width:100px">
            ${Zr(i)}
            <div class="text-sm mt-1" style="font-weight:600">Telepon</div>
            <div class="text-xs text-muted">Level 1</div>
          </div>
          <div style="flex:none;padding-top:.7rem;color:var(--border)">→</div>
          <div style="flex:1;text-align:center;min-width:100px">
            ${Zr(a===`VERIFIED`)}
            <div class="text-sm mt-1" style="font-weight:600">KTP</div>
            <div class="text-xs text-muted">Level 2</div>
          </div>
          <div style="flex:none;padding-top:.7rem;color:var(--border)">→</div>
          <div style="flex:1;text-align:center;min-width:100px">
            ${Zr(o===`VERIFIED`)}
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
            <p class="text-muted" style="margin:.25rem 0 0">Masukkan kode OTP yang dikirim ke ${F(t.email)}</p>
          </div>
          ${Xr(r?`VERIFIED`:`NOT_SUBMITTED`)}
        </div>
        ${r?`<div class="alert alert-success mt-3"><i class="fa-solid fa-circle-check"></i> Email <strong>${F(t.email)}</strong> sudah terverifikasi.</div>`:`<div class="mt-3" id="email-form-wrap">
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
          ${Xr(i?`VERIFIED`:`NOT_SUBMITTED`)}
        </div>
        ${i?`<div class="alert alert-success mt-3"><i class="fa-solid fa-circle-check"></i> Nomor telepon sudah terverifikasi.</div>`:`<div class="mt-3">
              <div class="form-group">
                <label class="label">Nomor Telepon</label>
                <div style="display:flex;gap:.5rem;max-width:360px">
                  <div class="input-icon" style="flex:1">
                    <i class="fa-solid fa-phone"></i>
                    <input class="input" id="phone-input" type="tel" placeholder="0812xxxxxxxx"
                      value="${F(t.phone||``)}" data-testid="phone-input">
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
          ${Xr(a)}
        </div>
        ${a===`VERIFIED`?`<div class="alert alert-success mt-3"><i class="fa-solid fa-circle-check"></i> KTP Anda sudah terverifikasi!</div>`:a===`REJECTED`?`<div class="alert alert-danger mt-3">
              <i class="fa-solid fa-circle-exclamation"></i> KTP ditolak: ${F(n.ktp?.rejectionReason||`Data tidak jelas`)}
            </div>`:a===`PENDING`?`<div class="alert alert-warning mt-3">
              <i class="fa-solid fa-clock"></i> KTP sedang diproses oleh admin
            </div>`:`<form id="ktp-form" class="mt-3">
              <div class="alert alert-info mb-3">
                <i class="fa-solid fa-flask"></i> <strong>Mode Demo:</strong> Klik "Demo Instan" untuk verifikasi otomatis tanpa upload file.
              </div>
              <div class="form-group">
                <label class="label">Foto KTP (depan, maks 5MB)</label>
                <input type="file" id="ktp-file" accept="image/jpeg,image/png,image/jpg" class="input" data-testid="ktp-input">
                <div class="text-xs text-muted mt-1">Format JPG/PNG, pastikan foto jelas dan terbaca</div>
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
          ${Xr(o)}
        </div>
        ${o===`VERIFIED`?`<div class="alert alert-success mt-3">
              <i class="fa-solid fa-circle-check"></i> Rekening bank sudah terverifikasi!
              <div class="mt-2">
                <strong>Bank:</strong> ${F(n.bank?.bankName||t.bankName||`-`)}<br>
                <strong>No. Rekening:</strong> ${F(n.bank?.accountNumber||t.accountNumber||`-`)}<br>
                <strong>Atas Nama:</strong> ${F(n.bank?.accountName||t.accountName||`-`)}
              </div>
            </div>`:o===`REJECTED`?`<div class="alert alert-danger mt-3">
              <i class="fa-solid fa-circle-exclamation"></i> Rekening ditolak: ${F(n.bank?.rejectionReason||`Data tidak valid`)}
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
    </div>`,!r){let e=document.getElementById(`send-email-otp`),t=document.getElementById(`resend-email-otp`),n=document.getElementById(`email-otp-row`),r=async()=>{try{let e=await K.post(`/verification/email/request`,{});e.demoOtp?(I(`Demo OTP: ${e.demoOtp} (berlaku 10 menit)`,`info`,12e3),console.log(`[DEMO] Email OTP: ${e.demoOtp}`)):I(`OTP dikirim ke email Anda`,`success`),n&&(n.style.display=``)}catch(e){I(e.message,`error`)}};e?.addEventListener(`click`,r),t?.addEventListener(`click`,r),document.getElementById(`verify-email-otp`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`email-otp-input`)?.value.trim();if(!e||e.length<6)return I(`Masukkan kode OTP 6 digit`,`error`);try{await K.post(`/verification/email/verify`,{otp:e});let t=f.getState().user;t&&f.setState({user:{...t,emailVerified:!0}}),I(`Email berhasil diverifikasi!`,`success`),setTimeout(()=>B.render(),1e3)}catch(e){I(e.message,`error`)}})}i||(document.getElementById(`send-phone-otp`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`phone-input`)?.value.trim();if(!e||e.length<9)return I(`Masukkan nomor telepon yang valid`,`error`);try{let t=await K.post(`/verification/phone/request`,{phone:e});t.demoOtp?(I(`Demo OTP: ${t.demoOtp} (berlaku 10 menit)`,`info`,12e3),console.log(`[DEMO] Phone OTP: ${t.demoOtp}`)):I(`OTP dikirim via SMS`,`success`);let n=document.getElementById(`phone-otp-row`);n&&(n.style.display=``)}catch(e){I(e.message,`error`)}}),document.getElementById(`verify-phone-otp`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`phone-otp-input`)?.value.trim();if(!e||e.length<6)return I(`Masukkan kode OTP 6 digit`,`error`);let t=document.getElementById(`phone-input`)?.value.trim();try{await K.post(`/verification/phone/verify`,{otp:e,phone:t});let n=f.getState().user;n&&f.setState({user:{...n,phoneVerified:!0,phone:t}}),I(`Nomor telepon berhasil diverifikasi!`,`success`),setTimeout(()=>B.render(),1e3)}catch(e){I(e.message,`error`)}})),document.getElementById(`demo-ktp-btn`)?.addEventListener(`click`,async()=>{try{await K.post(`/verification/demo/ktp`,{}),I(`✅ KTP berhasil diverifikasi (mode demo)!`,`success`),setTimeout(()=>B.render(),1200)}catch(e){I(e.message,`error`)}}),document.getElementById(`demo-bank-btn`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`bank-name`)?.value,t=document.getElementById(`account-number`)?.value,n=document.getElementById(`account-name`)?.value;if(!e)return I(`Pilih nama bank dulu`,`error`);if(!t||t.length<5)return I(`Nomor rekening minimal 5 digit`,`error`);if(!n||n.length<3)return I(`Nama pemilik minimal 3 karakter`,`error`);try{await K.post(`/verification/demo/bank`,{bankName:e,accountNumber:t,accountName:n}),I(`✅ Rekening bank berhasil diverifikasi (mode demo)!`,`success`),setTimeout(()=>B.render(),1200)}catch(e){I(e.message,`error`)}}),document.getElementById(`ktp-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`ktp-file`)?.files[0];if(!t)return I(`Pilih file KTP terlebih dahulu`,`error`);if(t.size>5*1024*1024)return I(`Ukuran file maksimal 5MB`,`error`);let n=e.target.querySelector(`button[type=submit]`);n.disabled=!0,n.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Uploading...`;let r=new FormData;r.append(`ktpImage`,t);try{await K.post(`/verification/ktp`,r,{headers:{"Content-Type":`multipart/form-data`}}),I(`KTP diupload, menunggu verifikasi admin`,`success`),setTimeout(()=>B.render(),1500)}catch(e){I(e.message,`error`),n.disabled=!1,n.innerHTML=`<i class="fa-solid fa-upload"></i> Upload KTP`}}),document.getElementById(`bank-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`bank-name`)?.value,n=document.getElementById(`account-number`)?.value,r=document.getElementById(`account-name`)?.value;if(!t)return I(`Pilih nama bank`,`error`);if(!n||n.length<5)return I(`Nomor rekening minimal 5 digit`,`error`);if(!r||r.length<3)return I(`Nama pemilik minimal 3 karakter`,`error`);let i=e.target.querySelector(`button[type=submit]`);i.disabled=!0,i.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Submitting...`;try{await K.post(`/verification/bank`,{bankName:t,accountNumber:n,accountName:r}),I(`Verifikasi bank submitted, menunggu admin`,`success`),setTimeout(()=>B.render(),1500)}catch(e){I(e.message,`error`),i.disabled=!1,i.innerHTML=`<i class="fa-solid fa-upload"></i> Submit Verifikasi Bank`}})}function $r(e){let t=f.getState().user;return`<aside class="dash-side">
    <div class="who">
      <img src="${t.avatar||`https://i.pravatar.cc/100?u=`+t.id}" class="avatar"/>
      <div><div class="name">${F(t.name)}</div><div class="role">${t.role===`ADMIN`?`Admin`:`Pengguna`}</div></div>
    </div>
    <a href="#/dashboard" class="side-link ${e===`overview`?`active`:``}" data-testid="side-overview"><i class="fa-solid fa-gauge"></i> Overview</a>
    <a href="#/dashboard/buyer/orders" class="side-link ${e===`b-orders`?`active`:``}" data-testid="side-b-orders"><i class="fa-solid fa-receipt"></i> Pesanan Saya</a>
    <a href="#/dashboard/buyer/jobs" class="side-link ${e===`b-jobs`?`active`:``}" data-testid="side-b-jobs"><i class="fa-solid fa-folder-open"></i> Proyek Saya</a>
    <a href="#/dashboard/buyer/favorites" class="side-link ${e===`b-fav`?`active`:``}" data-testid="side-fav"><i class="fa-solid fa-heart"></i> Freelancer Favorit</a>
    <a href="#/dashboard/seller/services" class="side-link ${e===`s-services`?`active`:``}" data-testid="side-s-services"><i class="fa-solid fa-box"></i> Layanan Saya</a>
    <a href="#/dashboard/seller/orders" class="side-link ${e===`s-orders`?`active`:``}" data-testid="side-s-orders"><i class="fa-solid fa-inbox"></i> Pesanan Masuk</a>
    <a href="#/dashboard/seller/earnings" class="side-link ${e===`s-earn`?`active`:``}" data-testid="side-s-earn"><i class="fa-solid fa-coins"></i> Penghasilan</a>
    <a href="#/verification" class="side-link" data-testid="side-verif"><i class="fa-solid fa-id-card"></i> Verifikasi</a>
    <a href="#/profile" class="side-link"><i class="fa-solid fa-user"></i> Profil</a>
    <a href="#/settings" class="side-link"><i class="fa-solid fa-gear"></i> Pengaturan</a>
  </aside>`}async function ei({mount:e}){let t=f.getState().user;e.innerHTML=`<div class="container page"><div class="dash-wrap">${$r(`overview`)}<section><div class="spinner"></div></section></div></div>`;let n=e.querySelector(`section`);try{let e=await K.get(`/orders`),r=e.filter(e=>e.buyerId===t.id),i=e.filter(e=>e.sellerId===t.id),a=i.filter(e=>e.status===`completed`).reduce((e,t)=>e+t.amount,0);n.innerHTML=`
      <div class="page-header"><div><h1 class="page-title">Halo, ${F(t.name.split(` `)[0])}! 👋</h1><p class="page-subtitle">Berikut ringkasan aktivitas Anda</p></div></div>
      <div class="kpis">
        ${`
        <div class="kpi"><div class="ic"><i class="fa-solid fa-receipt"></i></div><div class="v">${r.length}</div><div class="l">Pesanan Saya</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-heart"></i></div><div class="v">${r.filter(e=>[`pending`,`accepted`,`in_progress`].includes(e.status)).length}</div><div class="l">Pesanan Aktif</div></div>`}
        ${`
        <div class="kpi"><div class="ic"><i class="fa-solid fa-briefcase"></i></div><div class="v">${i.length}</div><div class="l">Pesanan Diterima</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-coins"></i></div><div class="v">${M(a)}</div><div class="l">Total Penghasilan</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-star"></i></div><div class="v">${(t.rating||0).toFixed(1)}</div><div class="l">Rating Anda</div></div>`}
      </div>
      <div class="card card-pad-lg mt-3">
        <h3>Pesanan Terbaru</h3>
        ${e.slice(0,5).length?`
        <div class="scroll-x"><table class="tbl">
          <thead><tr><th>Order</th><th>Status</th><th>Total</th><th></th></tr></thead>
          <tbody>${e.slice(0,5).map(e=>`<tr><td>${F(e.title)}</td><td>${W(e.status)}</td><td>${M(e.amount)}</td><td><a class="btn btn-secondary btn-sm" href="#/orders/${e.id}">Lihat</a></td></tr>`).join(``)}</tbody>
        </table></div>`:H(`Belum ada pesanan`,``,`fa-receipt`)}
      </div>`}catch(e){n.innerHTML=H(`Gagal memuat`,e.message)}}async function ti({mount:e}){f.getState().user,e.innerHTML=`<div class="container page"><div class="dash-wrap">${$r(`b-orders`)}<section><h1>Pesanan Saya</h1><div id="list"></div></section></div></div>`;try{let e=await K.get(`/orders?role=buyer`);document.getElementById(`list`).innerHTML=e.length?`
      <div class="scroll-x"><table class="tbl"><thead><tr><th>Order</th><th>Status</th><th>Total</th><th></th></tr></thead><tbody>
        ${e.map(e=>`<tr><td>${F(e.title)}</td><td>${W(e.status)}</td><td>${M(e.amount)}</td><td><a class="btn btn-secondary btn-sm" href="#/orders/${e.id}">Detail</a></td></tr>`).join(``)}
      </tbody></table></div>`:H(`Belum ada pesanan`)}catch{document.getElementById(`list`).innerHTML=H(`Gagal`)}}async function ni({mount:e}){let t=f.getState().user;e.innerHTML=`<div class="container page"><div class="dash-wrap">${$r(`b-jobs`)}<section><div class="flex-between mb-2"><h1>Job Saya</h1><a href="#/post-job" class="btn btn-primary" data-testid="dash-post-job"><i class="fa-solid fa-plus"></i> Posting Job</a></div><div id="list"></div></section></div></div>`;try{let e=await K.get(`/jobs?buyerId=`+t.id),n=Array.isArray(e)?e:e.data||[];document.getElementById(`list`).innerHTML=n.length?`<div class="flex-col">${n.map(e=>`
      <div class="card card-pad">
        <div class="flex-between"><div><h3 style="margin:0">${F(e.title)}</h3><div class="text-sm text-muted">${F(e.category)} · ${M(e.budget)}</div></div>${W(e.status)}</div>
        <div class="flex gap-sm mt-2"><a class="btn btn-secondary btn-sm" href="#/jobs/${e.id}" data-testid="view-job-${e.id}">Lihat (${e.applicationsCount||e.applicationCount||0} pelamar)</a></div>
      </div>`).join(``)}</div>`:H(`Belum ada job`)}catch{document.getElementById(`list`).innerHTML=H(`Gagal`)}}async function ri({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${$r(`b-fav`)}<section><h1>Favorit</h1><div id="list" class="grid grid-3"></div></section></div></div>`;try{let e=await K.get(`/favorites`);document.getElementById(`list`).innerHTML=e.length?e.map(e=>yt(e,{favorited:!0})).join(``):H(`Belum ada favorit`,`Tambahkan jasa ke favorit dari marketplace`)}catch{document.getElementById(`list`).innerHTML=H(`Gagal`)}}async function ii({mount:e}){let t=f.getState().user;e.innerHTML=`<div class="container page"><div class="dash-wrap">${$r(`s-services`)}<section><div class="flex-between mb-2"><h1>Jasa Saya</h1><button class="btn btn-primary" id="add-svc" data-testid="add-service-btn"><i class="fa-solid fa-plus"></i> Tambah Jasa</button></div><div id="svc-list" class="grid grid-3"></div></section></div></div>`;let n=async()=>{try{let e=await K.get(`/services?sellerId=`+t.id),n=Array.isArray(e)?e:e.data||[];document.getElementById(`svc-list`).innerHTML=n.length?n.map(e=>`
        <div class="service-card ${e.active===!1?`inactive`:``}" style="${e.active===!1?`opacity:.6`:``}">
          <div class="thumb"><img src="${e.image}" loading="lazy"/></div>
          <div class="body">
            <div class="title">${F(e.title)} ${e.active===!1?`<span class="badge">Nonaktif</span>`:``}</div>
            <div class="meta"><span class="price">${M(e.price)}</span></div>
            <div class="flex gap-sm" style="flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" data-edit="${e.id}" data-testid="edit-svc-${e.id}"><i class="fa-solid fa-pen"></i> Edit</button>
              <button class="btn btn-ghost btn-sm" data-toggle="${e.id}" data-testid="toggle-svc-${e.id}"><i class="fa-solid ${e.active===!1?`fa-eye`:`fa-eye-slash`}"></i> ${e.active===!1?`Aktifkan`:`Nonaktifkan`}</button>
              <button class="btn btn-danger btn-sm" data-del="${e.id}" data-testid="del-svc-${e.id}"><i class="fa-solid fa-trash"></i> Hapus</button>
            </div>
          </div>
        </div>`).join(``):H(`Belum ada jasa`,`Tambahkan jasa pertama Anda`),r(n)}catch(e){I(e.message,`error`)}},r=e=>{document.querySelectorAll(`[data-del]`).forEach(e=>e.addEventListener(`click`,()=>R(`Hapus jasa?`,async()=>{try{await K.del(`/services/`+e.dataset.del),I(`Dihapus`,`success`),n()}catch(e){I(e.message,`error`)}}))),document.querySelectorAll(`[data-toggle]`).forEach(e=>e.addEventListener(`click`,async()=>{try{I((await K.post(`/services/`+e.dataset.toggle+`/toggle-active`)).active?`Jasa diaktifkan`:`Jasa dinonaktifkan`,`success`),n()}catch(e){I(e.message,`error`)}})),document.querySelectorAll(`[data-edit]`).forEach(t=>t.addEventListener(`click`,()=>i(e.find(e=>e.id===t.dataset.edit))))},i=async e=>{let r=await K.get(`/categories`),{mountImageUpload:i}=await a(async()=>{let{mountImageUpload:e}=await Promise.resolve().then(()=>Vr);return{mountImageUpload:e}},void 0),o=L({title:e?`Edit Jasa`:`Tambah Jasa`,size:`lg`,body:`<form id="sf">
        <div class="form-group"><label class="label">Judul</label><input class="input" id="title" required value="${F(e?.title||``)}" data-testid="svc-title"></div>
        <div class="form-group"><label class="label">Kategori</label><select class="select" id="category" data-testid="svc-cat">${r.map(t=>`<option value="${t.slug}" ${e?.category===t.slug?`selected`:``}>${t.name}</option>`).join(``)}</select></div>
        <div class="form-group"><label class="label">Deskripsi</label><textarea class="textarea" id="description" required data-testid="svc-desc">${F(e?.description||``)}</textarea></div>
        <div class="grid grid-2">
          <div class="form-group"><label class="label">Harga (Rp)</label><input class="input" type="number" id="price" required min="50000" step="1000" value="${e?.price||``}" placeholder="Min Rp 50.000" data-testid="svc-price"></div>
          <div class="form-group"><label class="label">Hari Pengerjaan</label><input class="input" type="number" id="dd" value="${e?.deliveryDays||3}" data-testid="svc-days"></div>
        </div>
        <div class="form-group"><label class="label">Gambar Cover</label><div id="svc-img-upload"></div></div>
        <button class="btn btn-primary btn-block" type="submit" data-testid="svc-save-btn">${e?`Update`:`Simpan`}</button>
      </form>`}),s=e?.image||``;i(o.el.querySelector(`#svc-img-upload`),{folder:`services`,initial:s,name:`svc-image`,testid:`svc-image-upload`,onChange:e=>{s=e}}),o.el.querySelector(`#sf`).addEventListener(`submit`,async r=>{r.preventDefault();let i=parseFloat(o.el.querySelector(`#price`).value);if(i<5e4)return I(`Harga minimum jasa Rp 50.000`,`error`);let a={title:o.el.querySelector(`#title`).value,category:o.el.querySelector(`#category`).value,description:o.el.querySelector(`#description`).value,price:i,deliveryDays:parseInt(o.el.querySelector(`#dd`).value)||3,image:s||null,city:t.city||``};try{e?await K.put(`/services/`+e.id,a):await K.post(`/services`,a),o.close(),I(`Tersimpan`,`success`),n()}catch(e){I(e.message,`error`)}})};document.getElementById(`add-svc`).addEventListener(`click`,()=>i(null)),n()}async function ai({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${$r(`s-orders`)}<section><h1>Pesanan Diterima</h1><div id="list"></div></section></div></div>`;try{let e=await K.get(`/orders?role=seller`);document.getElementById(`list`).innerHTML=e.length?`
      <div class="scroll-x"><table class="tbl"><thead><tr><th>Order</th><th>Pembeli</th><th>Status</th><th>Total</th><th></th></tr></thead><tbody>
        ${e.map(e=>`<tr><td>${F(e.title)}</td><td>${F(e.buyer?.name)}</td><td>${W(e.status)}</td><td>${M(e.amount)}</td><td><a class="btn btn-secondary btn-sm" href="#/orders/${e.id}">Kelola</a></td></tr>`).join(``)}
      </tbody></table></div>`:H(`Belum ada pesanan`)}catch{document.getElementById(`list`).innerHTML=H(`Gagal`)}}async function oi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${$r(`s-earn`)}<section><h1>Penghasilan</h1><div id="content"></div></section></div></div>`;try{let e=await K.get(`/orders?role=seller`),t=e.filter(e=>e.status===`completed`),n=e.filter(e=>[`accepted`,`in_progress`].includes(e.status)),r=t.reduce((e,t)=>e+t.amount*.95,0);document.getElementById(`content`).innerHTML=`
      <div class="kpis">
        <div class="kpi"><div class="ic"><i class="fa-solid fa-wallet"></i></div><div class="v">${M(r)}</div><div class="l">Saldo Tersedia</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-hourglass"></i></div><div class="v">${M(n.reduce((e,t)=>e+t.amount*.95,0))}</div><div class="l">Pending</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-trophy"></i></div><div class="v">${t.length}</div><div class="l">Pesanan Selesai</div></div>
      </div>
      <div class="card card-pad-lg mt-3 flex-between">
        <div><h3 style="margin:0">Tarik Penghasilan</h3><p class="text-muted" style="margin:0">Withdraw ke rekening bank Anda</p></div>
        <button class="btn btn-primary" data-testid="withdraw-btn" onclick="(${()=>{window.dispatchEvent(new CustomEvent(`toast`,{detail:{type:`info`,text:`Fitur withdraw demo - hubungi support`}}))}})()"><i class="fa-solid fa-money-bill-transfer"></i> Tarik Sekarang</button>
      </div>`}catch{document.getElementById(`content`).innerHTML=H(`Gagal`)}}function si(e){return`<aside class="dash-side">
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
  </aside>`}async function ci({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`home`)}<section><div class="spinner"></div></section></div></div>`;let t=e.querySelector(`section`);try{let e=await K.get(`/admin/stats`);t.innerHTML=`
      <h1 class="page-title">Admin Dashboard</h1>
      <p class="page-subtitle">Ringkasan platform Tolongin</p>
      <div class="kpis">
        <div class="kpi"><div class="ic"><i class="fa-solid fa-users"></i></div><div class="v">${e.users}</div><div class="l">Total User</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-box"></i></div><div class="v">${e.services}</div><div class="l">Total Jasa</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-briefcase"></i></div><div class="v">${e.jobs}</div><div class="l">Total Job</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-receipt"></i></div><div class="v">${e.orders}</div><div class="l">Total Order</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-user-clock"></i></div><div class="v">${e.pendingSellers}</div><div class="l">Penjual Menunggu</div></div>
        <div class="kpi"><div class="ic"><i class="fa-solid fa-flag"></i></div><div class="v">${e.disputes}</div><div class="l">Sengketa Aktif</div></div>
        <div class="kpi" style="grid-column:span 2"><div class="ic"><i class="fa-solid fa-coins"></i></div><div class="v">${M(e.revenue||0)}</div><div class="l">Total Revenue</div></div>
      </div>`}catch(e){t.innerHTML=H(`Gagal memuat`,e.message)}}async function li({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`sellers`)}<section><h1>Verifikasi Penjual</h1><div id="list"></div></section></div></div>`;let t=async()=>{let e=(await K.get(`/admin/users`)).filter(e=>[`SELLER`].includes(e.role)&&!e.verified);document.getElementById(`list`).innerHTML=e.length?`
      <div class="card scroll-x"><table class="tbl">
        <thead><tr><th>Nama</th><th>Email</th><th>Kota</th><th>Daftar</th><th></th></tr></thead>
        <tbody>${e.map(e=>`<tr>
          <td><div class="flex gap-sm" style="align-items:center">${U(e,`sm`)}<strong>${F(e.name)}</strong></div></td>
          <td>${F(e.email)}</td><td>${F(e.city||`-`)}</td><td>${et(e.createdAt)}</td>
          <td><button class="btn btn-success btn-sm" data-verify="${e.id}" data-testid="verify-${e.id}"><i class="fa-solid fa-check"></i> Verifikasi</button></td>
        </tr>`).join(``)}</tbody>
      </table></div>`:H(`Tidak ada penjual menunggu`,``,`fa-circle-check`),document.querySelectorAll(`[data-verify]`).forEach(e=>e.addEventListener(`click`,async()=>{try{await K.post(`/admin/users/${e.dataset.verify}/verify`),I(`Penjual diverifikasi`,`success`),t()}catch(e){I(e.message,`error`)}}))};t()}async function ui({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`users`)}<section><h1>Kelola User</h1><div id="list"></div></section></div></div>`;let t=async()=>{let e=await K.get(`/admin/users`);document.getElementById(`list`).innerHTML=`
      <div class="card scroll-x"><table class="tbl">
        <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
        <tbody>${e.map(e=>`<tr>
          <td><div class="flex gap-sm" style="align-items:center">${U(e,`sm`)}<strong>${F(e.name)}</strong>${e.verified?`<i class="fa-solid fa-circle-check" style="color:var(--primary)"></i>`:``}</div></td>
          <td>${F(e.email)}</td><td><span class="badge">${e.role}</span></td>
          <td>${e.suspended?`<span class="badge badge-danger">Suspended</span>`:`<span class="badge badge-success">Active</span>`}</td>
          <td>${e.role===`ADMIN`?`-`:`<button class="btn ${e.suspended?`btn-success`:`btn-danger`} btn-sm" data-suspend="${e.id}" data-testid="suspend-${e.id}">${e.suspended?`Aktifkan`:`Suspend`}</button>`}</td>
        </tr>`).join(``)}</tbody>
      </table></div>`,document.querySelectorAll(`[data-suspend]`).forEach(e=>e.addEventListener(`click`,()=>R(`Ubah status user?`,async()=>{try{await K.post(`/admin/users/${e.dataset.suspend}/suspend`),I(`Berhasil`,`success`),t()}catch(e){I(e.message,`error`)}})))};t()}async function di({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`svc`)}<section><h1>Kelola Jasa</h1><div id="list"></div></section></div></div>`;let t=async()=>{let e=await K.get(`/admin/services`);document.getElementById(`list`).innerHTML=`<div class="card scroll-x"><table class="tbl"><thead><tr><th>Jasa</th><th>Kategori</th><th>Harga</th><th></th></tr></thead><tbody>
      ${e.map(e=>`<tr><td>${F(e.title)}</td><td><span class="badge">${F(e.category)}</span></td><td>${M(e.price)}</td><td><a class="btn btn-secondary btn-sm" href="#/service/${e.id}">Lihat</a> <button class="btn btn-danger btn-sm" data-del-svc="${e.id}" data-testid="adm-del-svc-${e.id}">Hapus</button></td></tr>`).join(``)}
    </tbody></table></div>`,document.querySelectorAll(`[data-del-svc]`).forEach(e=>e.addEventListener(`click`,()=>R(`Hapus jasa?`,async()=>{try{await K.del(`/services/`+e.dataset.delSvc),I(`Dihapus`,`success`),t()}catch(e){I(e.message,`error`)}})))};t()}async function fi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`jobs`)}<section><h1>Kelola Job</h1><div id="list"></div></section></div></div>`;let t=async()=>{let e=await K.get(`/admin/jobs`);document.getElementById(`list`).innerHTML=`<div class="card scroll-x"><table class="tbl"><thead><tr><th>Judul</th><th>Kategori</th><th>Budget</th><th>Status</th><th></th></tr></thead><tbody>
      ${e.map(e=>`<tr><td>${F(e.title)}</td><td>${F(e.category)}</td><td>${M(e.budget)}</td><td>${W(e.status)}</td><td><a class="btn btn-secondary btn-sm" href="#/jobs/${e.id}">Lihat</a> <button class="btn btn-danger btn-sm" data-del-job="${e.id}" data-testid="adm-del-job-${e.id}">Hapus</button></td></tr>`).join(``)}
    </tbody></table></div>`,document.querySelectorAll(`[data-del-job]`).forEach(e=>e.addEventListener(`click`,()=>R(`Hapus job?`,async()=>{try{await K.del(`/jobs/`+e.dataset.delJob),I(`Dihapus`,`success`),t()}catch(e){I(e.message,`error`)}})))};t()}async function pi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`disp`)}<section><h1>Sengketa</h1><div id="list"></div></section></div></div>`;let t=async()=>{let e=await K.get(`/admin/disputes`);document.getElementById(`list`).innerHTML=e.length?`<div class="card scroll-x"><table class="tbl"><thead><tr><th>Order</th><th>Alasan</th><th>Status</th><th>Waktu</th><th></th></tr></thead><tbody>
      ${e.map(e=>`<tr><td>#${e.orderId.slice(0,8)}</td><td>${F(e.reason)}</td><td>${W(e.status)}</td><td>${N(e.createdAt)}</td><td>${e.status===`open`?`<button class="btn btn-success btn-sm" data-resolve="${e.id}" data-testid="resolve-${e.id}">Selesaikan</button>`:``}</td></tr>`).join(``)}
    </tbody></table></div>`:H(`Tidak ada sengketa`,``,`fa-circle-check`),document.querySelectorAll(`[data-resolve]`).forEach(e=>e.addEventListener(`click`,async()=>{try{await K.post(`/admin/disputes/${e.dataset.resolve}/resolve`),I(`Diselesaikan`,`success`),t()}catch(e){I(e.message,`error`)}}))};t()}async function mi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`set`)}<section>
    <h1>Pengaturan Platform</h1>
    <div class="card card-pad-lg">
      <div class="form-group"><label class="label">Nama Platform</label><input class="input" value="Tolongin" data-testid="setting-name"></div>
      <div class="form-group"><label class="label">Platform Fee (%)</label><input class="input" type="number" value="5" data-testid="setting-fee"></div>
      <div class="form-group"><label class="label">Min Withdraw (Rp)</label><input class="input" type="number" value="100000" data-testid="setting-min-wd"></div>
      <div class="form-group"><label class="label">Email Support</label><input class="input" value="support@tolongin.id" data-testid="setting-email"></div>
      <button class="btn btn-primary" data-testid="settings-save" id="ss-save">Simpan</button>
    </div>
  </section></div></div>`,document.getElementById(`ss-save`).addEventListener(`click`,()=>I(`Pengaturan disimpan (demo)`,`success`))}async function hi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`act`)}<section><h1>Activity Log</h1><div id="list"></div></section></div></div>`;try{let e=await K.get(`/admin/activity-log`);document.getElementById(`list`).innerHTML=e.length?`<div class="card card-pad-lg"><div class="timeline">
      ${e.map(e=>`<div class="tl-step done"><strong>${F(e.type||e.action||`Activity`)}</strong> - ${F(e.message||[e.entity,e.entityId].filter(Boolean).join(` `)||``)}<div class="tl-time">${N(e.createdAt)}</div></div>`).join(``)}
    </div></div>`:H(`Belum ada aktivitas`)}catch{document.getElementById(`list`).innerHTML=H(`Gagal`)}}async function gi({mount:e}){e.innerHTML=`<div class="container page"><div class="dash-wrap">${si(`kyc`)}<section>
    <div class="flex-between mb-2"><h1>Review KYC</h1>
      <div class="flex gap-sm">
        <button class="btn btn-secondary btn-sm" data-tab="pending" data-testid="kyc-tab-pending">Pending</button>
        <button class="btn btn-ghost btn-sm" data-tab="approved" data-testid="kyc-tab-approved">Approved</button>
        <button class="btn btn-ghost btn-sm" data-tab="rejected" data-testid="kyc-tab-rejected">Rejected</button>
      </div>
    </div>
    <div id="list"></div>
  </section></div></div>`;let t=`pending`,n=async()=>{e.querySelectorAll(`[data-tab]`).forEach(e=>e.classList.toggle(`btn-secondary`,e.dataset.tab===t)),e.querySelectorAll(`[data-tab]`).forEach(e=>e.classList.toggle(`btn-ghost`,e.dataset.tab!==t));try{let e=await K.get(`/admin/kyc?status=`+t);document.getElementById(`list`).innerHTML=e.length?e.map(e=>{let n=e.kyc||{};return`<div class="card card-pad-lg mb-2" data-testid="kyc-row-${e.id}">
          <div class="flex gap-md" style="align-items:flex-start;flex-wrap:wrap">
            <div style="flex:1;min-width:240px">
              <div class="flex gap-sm" style="align-items:center"><img src="${e.avatar}" class="avatar"/><div><strong>${F(e.name)}</strong><div class="text-sm text-muted">${F(e.email)}</div></div></div>
              <table class="tbl" style="margin-top:.75rem">
                <tr><td>Nama Lengkap</td><td><strong>${F(n.fullName||`-`)}</strong></td></tr>
                <tr><td>No. KTP</td><td>${F(n.ktpNumber||`-`)}</td></tr>
                <tr><td>Bank</td><td>${F(n.bankName||`-`)} — ${F(n.bankAccountNumber||`-`)}</td></tr>
                <tr><td>Atas Nama</td><td>${F(n.bankAccountName||`-`)}</td></tr>
                <tr><td>Dikirim</td><td>${N(n.submittedAt)}</td></tr>
                ${n.rejectReason?`<tr><td>Alasan Tolak</td><td style="color:#dc2626">${F(n.rejectReason)}</td></tr>`:``}
              </table>
            </div>
            <div style="display:flex;gap:.5rem;flex-wrap:wrap">
             // KODE BARU (BENAR)
${n.ktpPhoto?`<div><div class="text-xs text-muted">KTP</div><img src="${F(n.ktpPhoto)}" style="width:160px;height:100px;object-fit:cover;border-radius:8px;border:1px solid var(--border)"/></div>`:``}
${n.ktpSelfie?`<div><div class="text-xs text-muted">Selfie</div><img src="${F(n.ktpSelfie)}" style="width:160px;height:100px;object-fit:cover;border-radius:8px;border:1px solid var(--border)"/></div>`:``}
            </div>
          </div>
          ${t===`pending`?`<div class="flex gap-sm" style="justify-content:flex-end;margin-top:1rem">
            <button class="btn btn-danger btn-sm" data-reject="${e.id}" data-testid="kyc-reject-${e.id}"><i class="fa-solid fa-xmark"></i> Tolak</button>
            <button class="btn btn-success btn-sm" data-approve="${e.id}" data-testid="kyc-approve-${e.id}"><i class="fa-solid fa-check"></i> Setujui</button>
          </div>`:``}
        </div>`}).join(``):H(`Tidak ada submission `+t,``,`fa-circle-check`),document.querySelectorAll(`[data-reject]`).forEach(e=>e.addEventListener(`click`,()=>{let t=document.createElement(`div`);t.className=`modal-overlay`,t.innerHTML=`
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
    `,document.body.appendChild(t);let r=()=>t.remove();t.querySelector(`.modal-close`).addEventListener(`click`,r),t.querySelector(`.cancel-btn`).addEventListener(`click`,r),t.addEventListener(`click`,e=>{e.target===t&&r()});let i=t.querySelector(`.confirm-reject-btn`);i.addEventListener(`click`,async()=>{let a=t.querySelector(`#reject-reason`).value.trim();if(!a){t.querySelector(`#reason-error`).textContent=`Alasan penolakan wajib diisi`;return}if(a.length<3){t.querySelector(`#reason-error`).textContent=`Alasan minimal 3 karakter`;return}i.disabled=!0,i.textContent=`Memproses...`;try{await K.post(`/admin/kyc/${e.dataset.reject}/reject`,{reason:a}),r(),I(`KYC ditolak`,`success`),n()}catch(e){t.querySelector(`#reason-error`).textContent=e.message,i.disabled=!1,i.textContent=`Tolak`}})}))}catch(e){document.getElementById(`list`).innerHTML=H(`Gagal memuat`,e.message)}};e.querySelectorAll(`[data-tab]`).forEach(e=>e.addEventListener(`click`,()=>{t=e.dataset.tab,n()})),n()}async function _i(){let e=f.getState();if(!(!e.user||e.token))try{let t=await K.post(`/auth/refresh`,{});t?.token&&f.setState({token:t.token,user:t.user||e.user})}catch{f.setState({token:null,refreshToken:null,user:null})}}async function vi(){let e=bt(document.getElementById(`app`));await _i(),B.add(`/`,kt).add(`/login`,At).add(`/register`,jt).add(`/forgot-password`,q).add(`/reset-password`,Nt).add(`/verify-email`,Mt).add(`/marketplace`,Pt).add(`/services/:id`,Ft).add(`/jobs`,Lt).add(`/jobs/:id`,zt).add(`/post-job`,Rt,{auth:!0}).add(`/orders`,Gt,{auth:!0}).add(`/orders/:id`,Kt,{auth:!0}).add(`/chat`,Ir,{auth:!0}).add(`/chat/:id`,Ir,{auth:!0}).add(`/profile`,Lr,{auth:!0}).add(`/users/:id`,Br).add(`/settings`,zr,{auth:!0}).add(`/kyc`,Yr,{auth:!0}).add(`/verification`,Qr,{auth:!0}).add(`/dashboard`,ei,{auth:!0}).add(`/dashboard/buyer/orders`,ti,{auth:!0}).add(`/dashboard/buyer/jobs`,ni,{auth:!0}).add(`/dashboard/buyer/favorites`,ri,{auth:!0}).add(`/dashboard/seller/services`,ii,{auth:!0}).add(`/dashboard/seller/orders`,ai,{auth:!0}).add(`/dashboard/seller/earnings`,oi,{auth:!0}).add(`/admin`,ci,{auth:!0,role:`ADMIN`}).add(`/admin/sellers`,li,{auth:!0,role:`ADMIN`}).add(`/admin/kyc`,gi,{auth:!0,role:`ADMIN`}).add(`/admin/users`,ui,{auth:!0,role:`ADMIN`}).add(`/admin/services`,di,{auth:!0,role:`ADMIN`}).add(`/admin/jobs`,fi,{auth:!0,role:`ADMIN`}).add(`/admin/disputes`,pi,{auth:!0,role:`ADMIN`}).add(`/admin/settings`,mi,{auth:!0,role:`ADMIN`}).add(`/admin/activity`,hi,{auth:!0,role:`ADMIN`}).setNotFound(e=>{e.innerHTML=`<div class="container page"><div class="empty"><i class="fa-solid fa-compass"></i><h3>404 — Halaman tidak ditemukan</h3><p>URL yang Anda buka tidak tersedia.</p><a class="btn btn-primary mt-2" href="#/">Kembali ke Beranda</a></div></div>`}).mount(e)}document.addEventListener(`DOMContentLoaded`,vi),document.readyState!==`loading`&&vi();export{F as a,I as c,B as i,f as l,U as n,M as o,vt as r,N as s,K as t};