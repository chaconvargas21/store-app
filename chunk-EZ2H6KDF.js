import{A as Le,D as Ue,F as He,G as R,a as B,c as J,d as ht,f as zt,i as Re,j as Gt,k as Oe,l as Te,m as Lt,q as Ne,t as Pe,u as Be,w as je,x as ze,y as bt,z as Ge}from"./chunk-OIEIGDGK.js";import{C as he,Ca as ke,E as ct,Ea as A,F as k,Fa as Rt,G as w,Ga as Ot,H,Ha as Q,I as h,Ia as Fe,Ja as Tt,K as s,Ka as Nt,N as be,Na as x,O as ge,Oa as Ie,P as C,Pa as Pt,Q as dt,R as ve,Ra as Bt,S as $,T as F,Ta as S,U as W,V as ut,W as T,X as _,Za as M,_a as K,a as c,ab as ft,b as g,ba as q,bb as P,ca as Z,cb as Se,da as _e,ea as ye,eb as jt,fa as I,g as D,ga as u,j as ue,ja as y,k as me,ka as Y,l as pe,la as d,ma as m,na as xe,oa as De,p as fe,pa as Ce,qa as N,ra as we,sa as Ae,ua as mt,va as X,wa as Me,xa as Ee,ya as Ve,za as pt}from"./chunk-PSBQOBLX.js";var en=(()=>{class n{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,a){this._renderer=t,this._elementRef=a}setProperty(t,a){this._renderer.setProperty(this._elementRef.nativeElement,t,a)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}static \u0275fac=function(a){return new(a||n)(u(I),u(_))};static \u0275dir=d({type:n})}return n})(),qt=(()=>{class n extends en{static \u0275fac=(()=>{let t;return function(i){return(t||(t=T(n)))(i||n)}})();static \u0275dir=d({type:n,features:[m]})}return n})(),Et=new h("");var jn={provide:Et,useExisting:k(()=>nn),multi:!0};function zn(){let n=jt()?jt().getUserAgent():"";return/android (\d+)/.test(n.toLowerCase())}var Gn=new h(""),nn=(()=>{class n extends en{_compositionMode;_composing=!1;constructor(t,a,i){super(t,a),this._compositionMode=i,this._compositionMode==null&&(this._compositionMode=!zn())}writeValue(t){let a=t??"";this.setProperty("value",a)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static \u0275fac=function(a){return new(a||n)(u(I),u(_),u(Gn,8))};static \u0275dir=d({type:n,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(a,i){a&1&&A("input",function(r){return i._handleInput(r.target.value)})("blur",function(){return i.onTouched()})("compositionstart",function(){return i._compositionStart()})("compositionend",function(r){return i._compositionEnd(r.target.value)})},standalone:!1,features:[S([jn]),m]})}return n})();function Zt(n){return n==null||Yt(n)===0}function Yt(n){return n==null?null:Array.isArray(n)||typeof n=="string"?n.length:n instanceof Set?n.size:null}var Xt=new h(""),an=new h(""),Ln=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,$e=class{static min(e){return Un(e)}static max(e){return Hn(e)}static required(e){return $n(e)}static requiredTrue(e){return Wn(e)}static email(e){return qn(e)}static minLength(e){return Zn(e)}static maxLength(e){return on(e)}static pattern(e){return Yn(e)}static nullValidator(e){return _t()}static compose(e){return un(e)}static composeAsync(e){return pn(e)}};function Un(n){return e=>{if(e.value==null||n==null)return null;let t=parseFloat(e.value);return!isNaN(t)&&t<n?{min:{min:n,actual:e.value}}:null}}function Hn(n){return e=>{if(e.value==null||n==null)return null;let t=parseFloat(e.value);return!isNaN(t)&&t>n?{max:{max:n,actual:e.value}}:null}}function $n(n){return Zt(n.value)?{required:!0}:null}function Wn(n){return n.value===!0?null:{required:!0}}function qn(n){return Zt(n.value)||Ln.test(n.value)?null:{email:!0}}function Zn(n){return e=>{let t=e.value?.length??Yt(e.value);return t===null||t===0?null:t<n?{minlength:{requiredLength:n,actualLength:t}}:null}}function on(n){return e=>{let t=e.value?.length??Yt(e.value);return t!==null&&t>n?{maxlength:{requiredLength:n,actualLength:t}}:null}}function Yn(n){if(!n)return _t;let e,t;return typeof n=="string"?(t="",n.charAt(0)!=="^"&&(t+="^"),t+=n,n.charAt(n.length-1)!=="$"&&(t+="$"),e=new RegExp(t)):(t=n.toString(),e=n),a=>{if(Zt(a.value))return null;let i=a.value;return e.test(i)?null:{pattern:{requiredPattern:t,actualValue:i}}}}function _t(n){return null}function rn(n){return n!=null}function sn(n){return De(n)?ue(n):n}function ln(n){let e={};return n.forEach(t=>{e=t!=null?c(c({},e),t):e}),Object.keys(e).length===0?null:e}function cn(n,e){return e.map(t=>t(n))}function Xn(n){return!n.validate}function dn(n){return n.map(e=>Xn(e)?e:t=>e.validate(t))}function un(n){if(!n)return null;let e=n.filter(rn);return e.length==0?null:function(t){return ln(cn(t,e))}}function mn(n){return n!=null?un(dn(n)):null}function pn(n){if(!n)return null;let e=n.filter(rn);return e.length==0?null:function(t){let a=cn(t,e).map(sn);return fe(a).pipe(pe(ln))}}function fn(n){return n!=null?pn(dn(n)):null}function We(n,e){return n===null?[e]:Array.isArray(n)?[...n,e]:[n,e]}function hn(n){return n._rawValidators}function bn(n){return n._rawAsyncValidators}function Ut(n){return n?Array.isArray(n)?n:[n]:[]}function yt(n,e){return Array.isArray(n)?n.includes(e):n===e}function qe(n,e){let t=Ut(e);return Ut(n).forEach(i=>{yt(t,i)||t.push(i)}),t}function Ze(n,e){return Ut(e).filter(t=>!yt(n,t))}var xt=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=mn(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=fn(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control?.reset(e)}hasError(e,t){return this.control?this.control.hasError(e,t):!1}getError(e,t){return this.control?this.control.getError(e,t):null}},G=class extends xt{name;get formDirective(){return null}get path(){return null}},it=class extends xt{_parent=null;name=null;valueAccessor=null},Dt=class{_cd;constructor(e){this._cd=e}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var li=(()=>{class n extends Dt{constructor(t){super(t)}static \u0275fac=function(a){return new(a||n)(u(it,2))};static \u0275dir=d({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(a,i){a&2&&x("ng-untouched",i.isUntouched)("ng-touched",i.isTouched)("ng-pristine",i.isPristine)("ng-dirty",i.isDirty)("ng-valid",i.isValid)("ng-invalid",i.isInvalid)("ng-pending",i.isPending)},standalone:!1,features:[m]})}return n})(),ci=(()=>{class n extends Dt{constructor(t){super(t)}static \u0275fac=function(a){return new(a||n)(u(G,10))};static \u0275dir=d({type:n,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(a,i){a&2&&x("ng-untouched",i.isUntouched)("ng-touched",i.isTouched)("ng-pristine",i.isPristine)("ng-dirty",i.isDirty)("ng-valid",i.isValid)("ng-invalid",i.isInvalid)("ng-pending",i.isPending)("ng-submitted",i.isSubmitted)},standalone:!1,features:[m]})}return n})();var tt="VALID",gt="INVALID",j="PENDING",et="DISABLED",E=class{},Ct=class extends E{value;source;constructor(e,t){super(),this.value=e,this.source=t}},nt=class extends E{pristine;source;constructor(e,t){super(),this.pristine=e,this.source=t}},at=class extends E{touched;source;constructor(e,t){super(),this.touched=e,this.source=t}},z=class extends E{status;source;constructor(e,t){super(),this.status=e,this.source=t}},Ht=class extends E{source;constructor(e){super(),this.source=e}},ot=class extends E{source;constructor(e){super(),this.source=e}};function Qt(n){return(Vt(n)?n.validators:n)||null}function Qn(n){return Array.isArray(n)?mn(n):n||null}function Kt(n,e){return(Vt(e)?e.asyncValidators:n)||null}function Kn(n){return Array.isArray(n)?fn(n):n||null}function Vt(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}function gn(n,e,t){let a=n.controls;if(!(e?Object.keys(a):a).length)throw new ct(1e3,"");if(!a[t])throw new ct(1001,"")}function vn(n,e,t){n._forEachChild((a,i)=>{if(t[i]===void 0)throw new ct(-1002,"")})}var L=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(e,t){this._assignValidators(e),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get status(){return M(this.statusReactive)}set status(e){M(()=>this.statusReactive.set(e))}_status=K(()=>this.statusReactive());statusReactive=W(void 0);get valid(){return this.status===tt}get invalid(){return this.status===gt}get pending(){return this.status===j}get disabled(){return this.status===et}get enabled(){return this.status!==et}errors;get pristine(){return M(this.pristineReactive)}set pristine(e){M(()=>this.pristineReactive.set(e))}_pristine=K(()=>this.pristineReactive());pristineReactive=W(!0);get dirty(){return!this.pristine}get touched(){return M(this.touchedReactive)}set touched(e){M(()=>this.touchedReactive.set(e))}_touched=K(()=>this.touchedReactive());touchedReactive=W(!1);get untouched(){return!this.touched}_events=new D;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(qe(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(qe(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(Ze(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(Ze(e,this._rawAsyncValidators))}hasValidator(e){return yt(this._rawValidators,e)}hasAsyncValidator(e){return yt(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){let t=this.touched===!1;this.touched=!0;let a=e.sourceControl??this;e.onlySelf||this._parent?.markAsTouched(g(c({},e),{sourceControl:a})),t&&e.emitEvent!==!1&&this._events.next(new at(!0,a))}markAllAsDirty(e={}){this.markAsDirty({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(e))}markAllAsTouched(e={}){this.markAsTouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(e))}markAsUntouched(e={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let a=e.sourceControl??this;this._forEachChild(i=>{i.markAsUntouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:a})}),e.onlySelf||this._parent?._updateTouched(e,a),t&&e.emitEvent!==!1&&this._events.next(new at(!1,a))}markAsDirty(e={}){let t=this.pristine===!0;this.pristine=!1;let a=e.sourceControl??this;e.onlySelf||this._parent?.markAsDirty(g(c({},e),{sourceControl:a})),t&&e.emitEvent!==!1&&this._events.next(new nt(!1,a))}markAsPristine(e={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let a=e.sourceControl??this;this._forEachChild(i=>{i.markAsPristine({onlySelf:!0,emitEvent:e.emitEvent})}),e.onlySelf||this._parent?._updatePristine(e,a),t&&e.emitEvent!==!1&&this._events.next(new nt(!0,a))}markAsPending(e={}){this.status=j;let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new z(this.status,t)),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.markAsPending(g(c({},e),{sourceControl:t}))}disable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=et,this.errors=null,this._forEachChild(i=>{i.disable(g(c({},e),{onlySelf:!0}))}),this._updateValue();let a=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Ct(this.value,a)),this._events.next(new z(this.status,a)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(g(c({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(!0))}enable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=tt,this._forEachChild(a=>{a.enable(g(c({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(g(c({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(a=>a(!1))}_updateAncestors(e,t){e.onlySelf||(this._parent?.updateValueAndValidity(e),e.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t))}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let a=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===tt||this.status===j)&&this._runAsyncValidator(a,e.emitEvent)}let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Ct(this.value,t)),this._events.next(new z(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.updateValueAndValidity(g(c({},e),{sourceControl:t}))}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?et:tt}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,t){if(this.asyncValidator){this.status=j,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:e!==!1};let a=sn(this.asyncValidator(this));this._asyncValidationSubscription=a.subscribe(i=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(i,{emitEvent:t,shouldHaveEmitted:e})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,e}return!1}setErrors(e,t={}){this.errors=e,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(e){let t=e;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((a,i)=>a&&a._find(i),this)}getError(e,t){let a=t?this.get(t):this;return a?.errors?a.errors[e]:null}hasError(e,t){return!!this.getError(e,t)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,t,a){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||a)&&this._events.next(new z(this.status,t)),this._parent&&this._parent._updateControlsErrors(e,t,a)}_initObservables(){this.valueChanges=new $,this.statusChanges=new $}_calculateStatus(){return this._allControlsDisabled()?et:this.errors?gt:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(j)?j:this._anyControlsHaveStatus(gt)?gt:tt}_anyControlsHaveStatus(e){return this._anyControls(t=>t.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,t){let a=!this._anyControlsDirty(),i=this.pristine!==a;this.pristine=a,e.onlySelf||this._parent?._updatePristine(e,t),i&&this._events.next(new nt(this.pristine,t))}_updateTouched(e={},t){this.touched=this._anyControlsTouched(),this._events.next(new at(this.touched,t)),e.onlySelf||this._parent?._updateTouched(e,t)}_onDisabledChange=[];_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){Vt(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){return!e&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=Qn(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=Kn(this._rawAsyncValidators)}},wt=class extends L{constructor(e,t,a){super(Qt(t),Kt(a,t)),this.controls=e,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(e,t){return this.controls[e]?this.controls[e]:(this.controls[e]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(e,t,a={}){this.registerControl(e,t),this.updateValueAndValidity({emitEvent:a.emitEvent}),this._onCollectionChange()}removeControl(e,t={}){this.controls[e]&&this.controls[e]._registerOnCollectionChange(()=>{}),delete this.controls[e],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}setControl(e,t,a={}){this.controls[e]&&this.controls[e]._registerOnCollectionChange(()=>{}),delete this.controls[e],t&&this.registerControl(e,t),this.updateValueAndValidity({emitEvent:a.emitEvent}),this._onCollectionChange()}contains(e){return this.controls.hasOwnProperty(e)&&this.controls[e].enabled}setValue(e,t={}){vn(this,!0,e),Object.keys(e).forEach(a=>{gn(this,!0,a),this.controls[a].setValue(e[a],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)}patchValue(e,t={}){e!=null&&(Object.keys(e).forEach(a=>{let i=this.controls[a];i&&i.patchValue(e[a],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(e={},t={}){this._forEachChild((a,i)=>{a.reset(e?e[i]:null,g(c({},t),{onlySelf:!0}))}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new ot(this))}getRawValue(){return this._reduceChildren({},(e,t,a)=>(e[a]=t.getRawValue(),e))}_syncPendingControls(){let e=this._reduceChildren(!1,(t,a)=>a._syncPendingControls()?!0:t);return e&&this.updateValueAndValidity({onlySelf:!0}),e}_forEachChild(e){Object.keys(this.controls).forEach(t=>{let a=this.controls[t];a&&e(a,t)})}_setUpControls(){this._forEachChild(e=>{e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(e){for(let[t,a]of Object.entries(this.controls))if(this.contains(t)&&e(a))return!0;return!1}_reduceValue(){let e={};return this._reduceChildren(e,(t,a,i)=>((a.enabled||this.disabled)&&(t[i]=a.value),t))}_reduceChildren(e,t){let a=e;return this._forEachChild((i,o)=>{a=t(a,i,o)}),a}_allControlsDisabled(){for(let e of Object.keys(this.controls))if(this.controls[e].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(e){return this.controls.hasOwnProperty(e)?this.controls[e]:null}};var $t=class extends wt{};var _n=new h("",{factory:()=>Jt}),Jt="always";function Jn(n,e){return[...e.path,n]}function Ye(n,e,t=Jt){te(n,e),e.valueAccessor.writeValue(n.value),(n.disabled||t==="always")&&e.valueAccessor.setDisabledState?.(n.disabled),ea(n,e),aa(n,e),na(n,e),ta(n,e)}function Xe(n,e,t=!0){let a=()=>{};e?.valueAccessor?.registerOnChange(a),e?.valueAccessor?.registerOnTouched(a),Mt(n,e),n&&(e._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}))}function At(n,e){n.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e)})}function ta(n,e){if(e.valueAccessor.setDisabledState){let t=a=>{e.valueAccessor.setDisabledState(a)};n.registerOnDisabledChange(t),e._registerOnDestroy(()=>{n._unregisterOnDisabledChange(t)})}}function te(n,e){let t=hn(n);e.validator!==null?n.setValidators(We(t,e.validator)):typeof t=="function"&&n.setValidators([t]);let a=bn(n);e.asyncValidator!==null?n.setAsyncValidators(We(a,e.asyncValidator)):typeof a=="function"&&n.setAsyncValidators([a]);let i=()=>n.updateValueAndValidity();At(e._rawValidators,i),At(e._rawAsyncValidators,i)}function Mt(n,e){let t=!1;if(n!==null){if(e.validator!==null){let i=hn(n);if(Array.isArray(i)&&i.length>0){let o=i.filter(r=>r!==e.validator);o.length!==i.length&&(t=!0,n.setValidators(o))}}if(e.asyncValidator!==null){let i=bn(n);if(Array.isArray(i)&&i.length>0){let o=i.filter(r=>r!==e.asyncValidator);o.length!==i.length&&(t=!0,n.setAsyncValidators(o))}}}let a=()=>{};return At(e._rawValidators,a),At(e._rawAsyncValidators,a),t}function ea(n,e){e.valueAccessor.registerOnChange(t=>{n._pendingValue=t,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn==="change"&&yn(n,e)})}function na(n,e){e.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn==="blur"&&n._pendingChange&&yn(n,e),n.updateOn!=="submit"&&n.markAsTouched()})}function yn(n,e){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function aa(n,e){let t=(a,i)=>{e.valueAccessor.writeValue(a),i&&e.viewToModelUpdate(a)};n.registerOnChange(t),e._registerOnDestroy(()=>{n._unregisterOnChange(t)})}function ia(n,e){n==null,te(n,e)}function oa(n,e){return Mt(n,e)}function ra(n,e){if(!n.hasOwnProperty("model"))return!1;let t=n.model;return t.isFirstChange()?!0:!Object.is(e,t.currentValue)}function sa(n){return Object.getPrototypeOf(n.constructor)===qt}function la(n,e){n._syncPendingControls(),e.forEach(t=>{let a=t.control;a.updateOn==="submit"&&a._pendingChange&&(t.viewToModelUpdate(a._pendingValue),a._pendingChange=!1)})}function ca(n,e){if(!e)return null;Array.isArray(e);let t,a,i;return e.forEach(o=>{o.constructor===nn?t=o:sa(o)?a=o:i=o}),i||a||t||null}function da(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function Qe(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function Ke(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var vt=class extends L{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(e=null,t,a){super(Qt(t),Kt(a,t)),this._applyFormState(e),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Vt(t)&&(t.nonNullable||t.initialValueIsDefault)&&(Ke(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,t={}){this.value=this._pendingValue=e,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(a=>a(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)}patchValue(e,t={}){this.setValue(e,t)}reset(e=this.defaultValue,t={}){this._applyFormState(e),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new ot(this))}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){Qe(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){Qe(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){Ke(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var ua=n=>n instanceof vt;var ui=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275dir=d({type:n,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return n})();var Wt=class extends L{constructor(e,t,a){super(Qt(t),Kt(a,t)),this.controls=e,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(e){return this.controls[this._adjustIndex(e)]}push(e,t={}){Array.isArray(e)?e.forEach(a=>{this.controls.push(a),this._registerControl(a)}):(this.controls.push(e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}insert(e,t,a={}){this.controls.splice(e,0,t),this._registerControl(t),this.updateValueAndValidity({emitEvent:a.emitEvent})}removeAt(e,t={}){let a=this._adjustIndex(e);a<0&&(a=0),this.controls[a]&&this.controls[a]._registerOnCollectionChange(()=>{}),this.controls.splice(a,1),this.updateValueAndValidity({emitEvent:t.emitEvent})}setControl(e,t,a={}){let i=this._adjustIndex(e);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),t&&(this.controls.splice(i,0,t),this._registerControl(t)),this.updateValueAndValidity({emitEvent:a.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(e,t={}){vn(this,!1,e),e.forEach((a,i)=>{gn(this,!1,i),this.at(i).setValue(a,{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)}patchValue(e,t={}){e!=null&&(e.forEach((a,i)=>{this.at(i)&&this.at(i).patchValue(a,{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(e=[],t={}){this._forEachChild((a,i)=>{a.reset(e[i],g(c({},t),{onlySelf:!0}))}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new ot(this))}getRawValue(){return this.controls.map(e=>e.getRawValue())}clear(e={}){this.controls.length<1||(this._forEachChild(t=>t._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:e.emitEvent}))}_adjustIndex(e){return e<0?e+this.length:e}_syncPendingControls(){let e=this.controls.reduce((t,a)=>a._syncPendingControls()?!0:t,!1);return e&&this.updateValueAndValidity({onlySelf:!0}),e}_forEachChild(e){this.controls.forEach((t,a)=>{e(t,a)})}_updateValue(){this.value=this.controls.filter(e=>e.enabled||this.disabled).map(e=>e.value)}_anyControls(e){return this.controls.some(t=>t.enabled&&e(t))}_setUpControls(){this._forEachChild(e=>this._registerControl(e))}_allControlsDisabled(){for(let e of this.controls)if(e.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(e){e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange)}_find(e){return this.at(e)??null}};var ma=(()=>{class n extends G{callSetDisabledState;get submitted(){return M(this._submittedReactive)}set submitted(t){this._submittedReactive.set(t)}_submitted=K(()=>this._submittedReactive());_submittedReactive=W(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(t,a,i){super(),this.callSetDisabledState=i,this._setValidators(t),this._setAsyncValidators(a)}ngOnChanges(t){this.onChanges(t)}ngOnDestroy(){this.onDestroy()}onChanges(t){this._checkFormPresent(),t.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Mt(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(t){let a=this.form.get(t.path);return Ye(a,t,this.callSetDisabledState),a.updateValueAndValidity({emitEvent:!1}),this.directives.push(t),a}getControl(t){return this.form.get(t.path)}removeControl(t){Xe(t.control||null,t,!1),da(this.directives,t)}addFormGroup(t){this._setUpFormContainer(t)}removeFormGroup(t){this._cleanUpFormContainer(t)}getFormGroup(t){return this.form.get(t.path)}getFormArray(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t)}removeFormArray(t){this._cleanUpFormContainer(t)}updateModel(t,a){this.form.get(t.path).setValue(a)}onReset(){this.resetForm()}resetForm(t=void 0,a={}){this.form.reset(t,a),this._submittedReactive.set(!1)}onSubmit(t){return this.submitted=!0,la(this.form,this.directives),this.ngSubmit.emit(t),this.form._events.next(new Ht(this.control)),t?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(t=>{let a=t.control,i=this.form.get(t.path);a!==i&&(Xe(a||null,t),ua(i)&&(Ye(i,t,this.callSetDisabledState),t.control=i))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(t){let a=this.form.get(t.path);ia(a,t),a.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(t){let a=this.form?.get(t.path);a&&oa(a,t)&&a.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){te(this.form,this),this._oldForm&&Mt(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(a){return new(a||n)(u(Xt,10),u(an,10),u(_n,8))};static \u0275dir=d({type:n,features:[m,ut]})}return n})();var xn=new h("");var pa={provide:it,useExisting:k(()=>fa)},fa=(()=>{class n extends it{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(t){}model;update=new $;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(t,a,i,o,r){super(),this._ngModelWarningConfig=r,this._parent=t,this._setValidators(a),this._setAsyncValidators(i),this.valueAccessor=ca(this,o)}ngOnChanges(t){this._added||this._setUpControl(),ra(t,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}get path(){return Jn(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}static \u0275fac=function(a){return new(a||n)(u(G,13),u(Xt,10),u(an,10),u(Et,10),u(xn,8))};static \u0275dir=d({type:n,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[S([pa]),m,ut]})}return n})();var ha={provide:G,useExisting:k(()=>ba)},ba=(()=>{class n extends ma{form=null;ngSubmit=new $;get control(){return this.form}static \u0275fac=(()=>{let t;return function(i){return(t||(t=T(n)))(i||n)}})();static \u0275dir=d({type:n,selectors:[["","formGroup",""]],hostBindings:function(a,i){a&1&&A("submit",function(r){return i.onSubmit(r)})("reset",function(){return i.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[S([ha]),m]})}return n})(),ga={provide:Et,useExisting:k(()=>Cn),multi:!0};function Dn(n,e){return n==null?`${e}`:(e&&typeof e=="object"&&(e="Object"),`${n}: ${e}`.slice(0,50))}function va(n){return n.split(":")[0]}var Cn=(()=>{class n extends qt{value;_optionMap=new Map;_idCounter=0;set compareWith(t){this._compareWith=t}_compareWith=Object.is;appRefInjector=s(Ce).injector;destroyRef=s(ve);cdr=s(ft);_queuedWrite=!1;_writeValueAfterRender(){this._queuedWrite||this.appRefInjector.destroyed||(this._queuedWrite=!0,Z({write:()=>{this.destroyRef.destroyed||(this._queuedWrite=!1,this.writeValue(this.value))}},{injector:this.appRefInjector}))}writeValue(t){this.cdr.markForCheck(),this.value=t;let a=this._getOptionId(t),i=Dn(a,t);this.setProperty("value",i)}registerOnChange(t){this.onChange=a=>{this.value=this._getOptionValue(a),t(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(t){for(let a of this._optionMap.keys())if(this._compareWith(this._optionMap.get(a),t))return a;return null}_getOptionValue(t){let a=va(t);return this._optionMap.has(a)?this._optionMap.get(a):t}static \u0275fac=(()=>{let t;return function(i){return(t||(t=T(n)))(i||n)}})();static \u0275dir=d({type:n,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(a,i){a&1&&A("change",function(r){return i.onChange(r.target.value)})("blur",function(){return i.onTouched()})},inputs:{compareWith:"compareWith"},standalone:!1,features:[S([ga]),m]})}return n})(),mi=(()=>{class n{_element;_renderer;_select;id;constructor(t,a,i){this._element=t,this._renderer=a,this._select=i,this._select&&(this.id=this._select._registerOption())}set ngValue(t){this._select!=null&&(this._select._optionMap.set(this.id,t),this._setElementValue(Dn(this.id,t)),this._select._writeValueAfterRender())}set value(t){this._setElementValue(t),this._select?._writeValueAfterRender()}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}ngOnDestroy(){this._select?._optionMap.delete(this.id),this._select?._writeValueAfterRender()}static \u0275fac=function(a){return new(a||n)(u(_),u(I),u(Cn,9))};static \u0275dir=d({type:n,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"},standalone:!1})}return n})(),_a={provide:Et,useExisting:k(()=>wn),multi:!0};function Je(n,e){return n==null?`${e}`:(typeof e=="string"&&(e=`'${e}'`),e&&typeof e=="object"&&(e="Object"),`${n}: ${e}`.slice(0,50))}function ya(n){return n.split(":")[0]}var wn=(()=>{class n extends qt{value;_optionMap=new Map;_idCounter=0;set compareWith(t){this._compareWith=t}_compareWith=Object.is;writeValue(t){this.value=t;let a;if(Array.isArray(t)){let i=t.map(o=>this._getOptionId(o));a=(o,r)=>{o._setSelected(i.indexOf(r)>-1)}}else a=i=>{i._setSelected(!1)};this._optionMap.forEach(a)}registerOnChange(t){this.onChange=a=>{let i=[],o=a.selectedOptions;if(o!==void 0){let r=o;for(let l=0;l<r.length;l++){let p=r[l],b=this._getOptionValue(p.value);i.push(b)}}else{let r=a.options;for(let l=0;l<r.length;l++){let p=r[l];if(p.selected){let b=this._getOptionValue(p.value);i.push(b)}}}this.value=i,t(i)}}_registerOption(t){let a=(this._idCounter++).toString();return this._optionMap.set(a,t),a}_getOptionId(t){for(let a of this._optionMap.keys())if(this._compareWith(this._optionMap.get(a)._value,t))return a;return null}_getOptionValue(t){let a=ya(t);return this._optionMap.has(a)?this._optionMap.get(a)._value:t}static \u0275fac=(()=>{let t;return function(i){return(t||(t=T(n)))(i||n)}})();static \u0275dir=d({type:n,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(a,i){a&1&&A("change",function(r){return i.onChange(r.target)})("blur",function(){return i.onTouched()})},inputs:{compareWith:"compareWith"},standalone:!1,features:[S([_a]),m]})}return n})(),pi=(()=>{class n{_element;_renderer;_select;id;_value;constructor(t,a,i){this._element=t,this._renderer=a,this._select=i,this._select&&(this.id=this._select._registerOption(this))}set ngValue(t){this._select!=null&&(this._value=t,this._setElementValue(Je(this.id,t)),this._select.writeValue(this._select.value))}set value(t){this._select?(this._value=t,this._setElementValue(Je(this.id,t)),this._select.writeValue(this._select.value)):this._setElementValue(t)}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}_setSelected(t){this._renderer.setProperty(this._element.nativeElement,"selected",t)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}static \u0275fac=function(a){return new(a||n)(u(_),u(I),u(wn,9))};static \u0275dir=d({type:n,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"},standalone:!1})}return n})();function xa(n){return typeof n=="number"?n:parseInt(n,10)}var Da=(()=>{class n{_validator=_t;_onChange;_enabled;ngOnChanges(t){if(this.inputName in t){let a=this.normalizeInput(t[this.inputName].currentValue);this._enabled=this.enabled(a),this._validator=this._enabled?this.createValidator(a):_t,this._onChange?.()}}validate(t){return this._validator(t)}registerOnValidatorChange(t){this._onChange=t}enabled(t){return t!=null}static \u0275fac=function(a){return new(a||n)};static \u0275dir=d({type:n,features:[ut]})}return n})();var Ca={provide:Xt,useExisting:k(()=>wa),multi:!0},wa=(()=>{class n extends Da{maxlength;inputName="maxlength";normalizeInput=t=>xa(t);createValidator=t=>on(t);static \u0275fac=(()=>{let t;return function(i){return(t||(t=T(n)))(i||n)}})();static \u0275dir=d({type:n,selectors:[["","maxlength","","formControlName",""],["","maxlength","","formControl",""],["","maxlength","","ngModel",""]],hostVars:1,hostBindings:function(a,i){a&2&&N("maxlength",i._enabled?i.maxlength:null)},inputs:{maxlength:"maxlength"},standalone:!1,features:[S([Ca]),m]})}return n})();var Aa=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275mod=Y({type:n});static \u0275inj=H({})}return n})();function tn(n){return!!n&&(n.asyncValidators!==void 0||n.validators!==void 0||n.updateOn!==void 0)}var fi=(()=>{class n{useNonNullable=!1;get nonNullable(){let t=new n;return t.useNonNullable=!0,t}group(t,a=null){let i=this._reduceControls(t),o={};return tn(a)?o=a:a!==null&&(o.validators=a.validator,o.asyncValidators=a.asyncValidator),new wt(i,o)}record(t,a=null){let i=this._reduceControls(t);return new $t(i,a)}control(t,a,i){let o={};return this.useNonNullable?(tn(a)?o=a:(o.validators=a,o.asyncValidators=i),new vt(t,g(c({},o),{nonNullable:!0}))):new vt(t,a,i)}array(t,a,i){let o=t.map(r=>this._createControl(r));return new Wt(o,a,i)}_reduceControls(t){let a={};return Object.keys(t).forEach(i=>{a[i]=this._createControl(t[i])}),a}_createControl(t){if(t instanceof vt)return t;if(t instanceof L)return t;if(Array.isArray(t)){let a=t[0],i=t.length>1?t[1]:null,o=t.length>2?t[2]:null;return this.control(a,i,o)}else return this.control(t)}static \u0275fac=function(a){return new(a||n)};static \u0275prov=w({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var hi=(()=>{class n{static withConfig(t){return{ngModule:n,providers:[{provide:xn,useValue:t.warnOnNgModelWithFormControl??"always"},{provide:_n,useValue:t.callSetDisabledState??Jt}]}}static \u0275fac=function(a){return new(a||n)};static \u0275mod=Y({type:n});static \u0275inj=H({imports:[Aa]})}return n})();var vi=(()=>{class n{emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";namePattern="^[A-Za-z\xC1\xC9\xCD\xD3\xDA\xDC\xD1\xE1\xE9\xED\xF3\xFA\xFC\xF1' -]+$";constructor(){}equalsFields(t,a){return i=>i.get(t)?.value!==i.get(a)?.value?{notEquals:!0}:null}static \u0275fac=function(a){return new(a||n)};static \u0275prov=w({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var v=(function(n){return n[n.FADING_IN=0]="FADING_IN",n[n.VISIBLE=1]="VISIBLE",n[n.FADING_OUT=2]="FADING_OUT",n[n.HIDDEN=3]="HIDDEN",n})(v||{}),ee=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=v.HIDDEN;constructor(e,t,a,i=!1){this._renderer=e,this.element=t,this.config=a,this._animationForciblyDisabledThroughCss=i}fadeOut(){this._renderer.fadeOutRipple(this)}},An=bt({passive:!0,capture:!0}),ne=class{_events=new Map;addHandler(e,t,a,i){let o=this._events.get(t);if(o){let r=o.get(a);r?r.add(i):o.set(a,new Set([i]))}else this._events.set(t,new Map([[a,new Set([i])]])),e.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,An)})}removeHandler(e,t,a){let i=this._events.get(e);if(!i)return;let o=i.get(t);o&&(o.delete(a),o.size===0&&i.delete(t),i.size===0&&(this._events.delete(e),document.removeEventListener(e,this._delegateEventHandler,An)))}_delegateEventHandler=e=>{let t=J(e);t&&this._events.get(e.type)?.forEach((a,i)=>{(i===t||i.contains(t))&&a.forEach(o=>o.handleEvent(e))})}},rt={enterDuration:225,exitDuration:150},Ma=800,Mn=bt({passive:!0,capture:!0}),En=["mousedown","touchstart"],Vn=["mouseup","mouseleave","touchend","touchcancel"],Ea=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275cmp=y({type:n,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(a,i){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2,changeDetection:0})}return n})(),kt=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new ne;constructor(e,t,a,i,o){this._target=e,this._ngZone=t,this._platform=i,i.isBrowser&&(this._containerElement=zt(a)),o&&o.get(ht).load(Ea)}fadeInRipple(e,t,a={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=c(c({},rt),a.animation);a.centered&&(e=i.left+i.width/2,t=i.top+i.height/2);let r=a.radius||Va(e,t,i),l=e-i.left,p=t-i.top,b=o.enterDuration,f=document.createElement("div");f.classList.add("mat-ripple-element"),f.style.left=`${l-r}px`,f.style.top=`${p-r}px`,f.style.height=`${r*2}px`,f.style.width=`${r*2}px`,a.color!=null&&(f.style.backgroundColor=a.color),f.style.transitionDuration=`${b}ms`,this._containerElement.appendChild(f);let se=window.getComputedStyle(f),Bn=se.transitionProperty,le=se.transitionDuration,It=Bn==="none"||le==="0s"||le==="0s, 0s"||i.width===0&&i.height===0,V=new ee(this,f,a,It);f.style.transform="scale3d(1, 1, 1)",V.state=v.FADING_IN,a.persistent||(this._mostRecentTransientRipple=V);let lt=null;return!It&&(b||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let ce=()=>{lt&&(lt.fallbackTimer=null),clearTimeout(de),this._finishRippleTransition(V)},St=()=>this._destroyRipple(V),de=setTimeout(St,b+100);f.addEventListener("transitionend",ce),f.addEventListener("transitioncancel",St),lt={onTransitionEnd:ce,onTransitionCancel:St,fallbackTimer:de}}),this._activeRipples.set(V,lt),(It||!b)&&this._finishRippleTransition(V),V}fadeOutRipple(e){if(e.state===v.FADING_OUT||e.state===v.HIDDEN)return;let t=e.element,a=c(c({},rt),e.config.animation);t.style.transitionDuration=`${a.exitDuration}ms`,t.style.opacity="0",e.state=v.FADING_OUT,(e._animationForciblyDisabledThroughCss||!a.exitDuration)&&this._finishRippleTransition(e)}fadeOutAll(){this._getActiveRipples().forEach(e=>e.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(e=>{e.config.persistent||e.fadeOut()})}setupTriggerEvents(e){let t=zt(e);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,En.forEach(a=>{n._eventManager.addHandler(this._ngZone,a,t,this)}))}handleEvent(e){e.type==="mousedown"?this._onMousedown(e):e.type==="touchstart"?this._onTouchStart(e):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{Vn.forEach(t=>{this._triggerElement.addEventListener(t,this,Mn)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(e){e.state===v.FADING_IN?this._startFadeOutTransition(e):e.state===v.FADING_OUT&&this._destroyRipple(e)}_startFadeOutTransition(e){let t=e===this._mostRecentTransientRipple,{persistent:a}=e.config;e.state=v.VISIBLE,!a&&(!t||!this._isPointerDown)&&e.fadeOut()}_destroyRipple(e){let t=this._activeRipples.get(e)??null;this._activeRipples.delete(e),this._activeRipples.size||(this._containerRect=null),e===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),e.state=v.HIDDEN,t!==null&&(e.element.removeEventListener("transitionend",t.onTransitionEnd),e.element.removeEventListener("transitioncancel",t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),e.element.remove()}_onMousedown(e){let t=je(e),a=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+Ma;!this._target.rippleDisabled&&!t&&!a&&(this._isPointerDown=!0,this.fadeInRipple(e.clientX,e.clientY,this._target.rippleConfig))}_onTouchStart(e){if(!this._target.rippleDisabled&&!ze(e)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let t=e.changedTouches;if(t)for(let a=0;a<t.length;a++)this.fadeInRipple(t[a].clientX,t[a].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(e=>{let t=e.state===v.VISIBLE||e.config.terminateOnPointerUp&&e.state===v.FADING_IN;!e.config.persistent&&t&&e.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let e=this._triggerElement;e&&(En.forEach(t=>n._eventManager.removeHandler(t,e,this)),this._pointerUpEventsRegistered&&(Vn.forEach(t=>e.removeEventListener(t,this,Mn)),this._pointerUpEventsRegistered=!1))}};function Va(n,e,t){let a=Math.max(Math.abs(n-t.left),Math.abs(n-t.right)),i=Math.max(Math.abs(e-t.top),Math.abs(e-t.bottom));return Math.sqrt(a*a+i*i)}var kn=new h("mat-ripple-global-options");var ka={capture:!0},Fa=["focus","mousedown","mouseenter","touchstart"],ae="mat-ripple-loader-uninitialized",ie="mat-ripple-loader-class-name",Fn="mat-ripple-loader-centered",Ft="mat-ripple-loader-disabled",In=(()=>{class n{_document=s(dt);_animationsDisabled=R();_globalRippleOptions=s(kn,{optional:!0});_platform=s(B);_ngZone=s(F);_injector=s(C);_eventCleanups;_hosts=new Map;constructor(){let t=s(ye).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>Fa.map(a=>t.listen(this._document,a,this._onInteraction,ka)))}ngOnDestroy(){let t=this._hosts.keys();for(let a of t)this.destroyRipple(a);this._eventCleanups.forEach(a=>a())}configureRipple(t,a){t.setAttribute(ae,this._globalRippleOptions?.namespace??""),(a.className||!t.hasAttribute(ie))&&t.setAttribute(ie,a.className||""),a.centered&&t.setAttribute(Fn,""),a.disabled&&t.setAttribute(Ft,"")}setDisabled(t,a){let i=this._hosts.get(t);i?(i.target.rippleDisabled=a,!a&&!i.hasSetUpEvents&&(i.hasSetUpEvents=!0,i.renderer.setupTriggerEvents(t))):a?t.setAttribute(Ft,""):t.removeAttribute(Ft)}_onInteraction=t=>{let a=J(t);if(a instanceof HTMLElement){let i=a.closest(`[${ae}="${this._globalRippleOptions?.namespace??""}"]`);i&&this._createRipple(i)}};_createRipple(t){if(!this._document||this._hosts.has(t))return;t.querySelector(".mat-ripple")?.remove();let a=this._document.createElement("span");a.classList.add("mat-ripple",t.getAttribute(ie)),t.append(a);let i=this._globalRippleOptions,o=this._animationsDisabled?0:i?.animation?.enterDuration??rt.enterDuration,r=this._animationsDisabled?0:i?.animation?.exitDuration??rt.exitDuration,l={rippleDisabled:this._animationsDisabled||i?.disabled||t.hasAttribute(Ft),rippleConfig:{centered:t.hasAttribute(Fn),terminateOnPointerUp:i?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:r}}},p=new kt(l,this._ngZone,a,this._platform,this._injector),b=!l.rippleDisabled;b&&p.setupTriggerEvents(t),this._hosts.set(t,{target:l,renderer:p,hasSetUpEvents:b}),t.removeAttribute(ae)}destroyRipple(t){let a=this._hosts.get(t);a&&(a.renderer._removeTriggerEvents(),this._hosts.delete(t))}static \u0275fac=function(a){return new(a||n)};static \u0275prov=w({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Sn=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275cmp=y({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(a,i){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2,changeDetection:0})}return n})();var Ia=new h("MAT_BUTTON_CONFIG");function Rn(n){return n==null?void 0:Se(n)}var On=(()=>{class n{_elementRef=s(_);_ngZone=s(F);_animationsDisabled=R();_config=s(Ia,{optional:!0});_focusMonitor=s(Ge);_cleanupClick;_renderer=s(I);_rippleLoader=s(In);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t}constructor(){s(ht).load(Sn);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(t="program",a){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,a):this._elementRef.nativeElement.focus(a)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}))}static \u0275fac=function(a){return new(a||n)};static \u0275dir=d({type:n,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(a,i){a&2&&(N("disabled",i._getDisabledAttribute())("aria-disabled",i._getAriaDisabled())("tabindex",i._getTabIndex()),Ie(i.color?"mat-"+i.color:""),x("mat-mdc-button-disabled",i.disabled)("mat-mdc-button-disabled-interactive",i.disabledInteractive)("mat-unthemed",!i.color)("_mat-animation-noopable",i._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",P],disabled:[2,"disabled","disabled",P],ariaDisabled:[2,"aria-disabled","ariaDisabled",P],disabledInteractive:[2,"disabledInteractive","disabledInteractive",P],tabIndex:[2,"tabIndex","tabIndex",Rn],_tabindex:[2,"tabindex","_tabindex",Rn]}})}return n})();var Sa=["matButton",""],Ra=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],Oa=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"];var Tn=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),Nn=(()=>{class n extends On{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let t=Ta(this._elementRef.nativeElement);t&&this.setAppearance(t)}setAppearance(t){if(t===this._appearance)return;let a=this._elementRef.nativeElement.classList,i=this._appearance?Tn.get(this._appearance):null,o=Tn.get(t);i&&a.remove(...i),a.add(...o),this._appearance=t}static \u0275fac=function(a){return new(a||n)};static \u0275cmp=y({type:n,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[m],attrs:Sa,ngContentSelectors:Oa,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(a,i){a&1&&(Ot(Ra),pt(0,"span",0),Q(1),Ee(2,"span",1),Q(3,1),Ve(),Q(4,2),pt(5,"span",2)(6,"span",3)),a&2&&x("mdc-button__ripple",!i._isFab)("mdc-fab__ripple",i._isFab)},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return n})();function Ta(n){return n.hasAttribute("mat-raised-button")?"elevated":n.hasAttribute("mat-stroked-button")?"outlined":n.hasAttribute("mat-flat-button")?"filled":n.hasAttribute("mat-button")?"text":null}function Na(n,e){if(n&1){let t=ke();mt(0,"div",1)(1,"button",2),A("click",function(){be(t);let i=Rt();return ge(i.action())}),Pt(2),X()()}if(n&2){let t=Rt();q(2),Bt(" ",t.data.action," ")}}var Pa=["label"];function Ba(n,e){}var ja=Math.pow(2,31)-1,st=class{_overlayRef;instance;containerInstance;_afterDismissed=new D;_afterOpened=new D;_onAction=new D;_durationTimeoutId;_dismissedByAction=!1;constructor(e,t){this._overlayRef=t,this.containerInstance=e,e._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(e){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(e,ja))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},Pn=new h("MatSnackBarData"),U=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},za=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275dir=d({type:n,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return n})(),Ga=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275dir=d({type:n,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return n})(),La=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275dir=d({type:n,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return n})(),Ua=(()=>{class n{snackBarRef=s(st);data=s(Pn);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(a){return new(a||n)};static \u0275cmp=y({type:n,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(a,i){a&1&&(mt(0,"div",0),Pt(1),X(),we(2,Na,3,1,"div",1)),a&2&&(q(),Bt(" ",i.data.message,`
`),q(),Ae(i.hasAction?2:-1))},dependencies:[Nn,za,Ga,La],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return n})(),oe="_mat-snack-bar-enter",re="_mat-snack-bar-exit",Ha=(()=>{class n extends Te{_ngZone=s(F);_elementRef=s(_);_changeDetectorRef=s(ft);_platform=s(B);_animationsDisabled=R();snackBarConfig=s(U);_document=s(dt);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=s(C);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new D;_onExit=new D;_onEnter=new D;_animationState="void";_live;_label;_role;_liveElementId=s(Re).getId("mat-snack-bar-container-live-");constructor(){super();let t=this.snackBarConfig;t.politeness==="assertive"&&!t.announcementMessage?this._live="assertive":t.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(t){this._assertNotAttached();let a=this._portalOutlet.attachComponentPortal(t);return this._afterPortalAttached(),a}attachTemplatePortal(t){this._assertNotAttached();let a=this._portalOutlet.attachTemplatePortal(t);return this._afterPortalAttached(),a}attachDomPortal=t=>{this._assertNotAttached();let a=this._portalOutlet.attachDomPortal(t);return this._afterPortalAttached(),a};onAnimationEnd(t){t===re?this._completeExit():t===oe&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?Z(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(oe)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(oe)},200)))}exit(){return this._destroyed?me(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?Z(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(re)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(re),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let t=this._elementRef.nativeElement,a=this.snackBarConfig.panelClass;a&&(Array.isArray(a)?a.forEach(r=>t.classList.add(r)):t.classList.add(a)),this._exposeToModals();let i=this._label.nativeElement,o="mdc-snackbar__label";i.classList.toggle(o,!i.querySelector(`.${o}`))}_exposeToModals(){let t=this._liveElementId,a=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let i=0;i<a.length;i++){let o=a[i],r=o.getAttribute("aria-owns");this._trackedModals.add(o),r?r.indexOf(t)===-1&&o.setAttribute("aria-owns",r+" "+t):o.setAttribute("aria-owns",t)}}_clearFromModals(){this._trackedModals.forEach(t=>{let a=t.getAttribute("aria-owns");if(a){let i=a.replace(this._liveElementId,"").trim();i.length>0?t.setAttribute("aria-owns",i):t.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let t=this._elementRef.nativeElement,a=t.querySelector("[aria-hidden]"),i=t.querySelector("[aria-live]");if(a&&i){let o=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&a.contains(document.activeElement)&&(o=document.activeElement),a.removeAttribute("aria-hidden"),i.appendChild(a),o?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(a){return new(a||n)};static \u0275cmp=y({type:n,selectors:[["mat-snack-bar-container"]],viewQuery:function(a,i){if(a&1&&Fe(Lt,7)(Pa,7),a&2){let o;Tt(o=Nt())&&(i._portalOutlet=o.first),Tt(o=Nt())&&(i._label=o.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(a,i){a&1&&A("animationend",function(r){return i.onAnimationEnd(r.animationName)})("animationcancel",function(r){return i.onAnimationEnd(r.animationName)}),a&2&&x("mat-snack-bar-container-enter",i._animationState==="visible")("mat-snack-bar-container-exit",i._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!i._animationsDisabled)},features:[m],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(a,i){a&1&&(mt(0,"div",1)(1,"div",2,0)(3,"div",3),xe(4,Ba,0,0,"ng-template",4),X(),Me(5,"div"),X()()),a&2&&(q(5),N("aria-live",i._live)("role",i._role)("id",i._liveElementId))},dependencies:[Lt],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));
  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --mat-button-text-state-layer-color: currentColor;
  --mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2})}return n})(),$a=new h("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new U}),ko=(()=>{class n{_live=s(Ue);_injector=s(C);_breakpointObserver=s(Le);_parentSnackBar=s(n,{optional:!0,skipSelf:!0});_defaultConfig=s($a);_animationsDisabled=R();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=Ua;snackBarContainerComponent=Ha;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let t=this._parentSnackBar;return t?t._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(t){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=t:this._snackBarRefAtThisLevel=t}constructor(){}openFromComponent(t,a){return this._attach(t,a)}openFromTemplate(t,a){return this._attach(t,a)}open(t,a="",i){let o=c(c({},this._defaultConfig),i);return o.data={message:t,action:a},o.announcementMessage===t&&(o.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,o)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(t,a){let i=a&&a.viewContainerRef&&a.viewContainerRef.injector,o=C.create({parent:i||this._injector,providers:[{provide:U,useValue:a}]}),r=new Gt(this.snackBarContainerComponent,a.viewContainerRef,o),l=t.attach(r);return l.instance.snackBarConfig=a,l.instance}_attach(t,a){let i=c(c(c({},new U),this._defaultConfig),a),o=this._createOverlay(i),r=this._attachSnackBarContainer(o,i),l=new st(r,o);if(t instanceof _e){let p=new Oe(t,null,{$implicit:i.data,snackBarRef:l});l.instance=r.attachTemplatePortal(p)}else{let p=this._createInjector(i,l),b=new Gt(t,void 0,p),f=r.attachComponentPortal(b);l.instance=f.instance}return this._breakpointObserver.observe(He.HandsetPortrait).pipe(he(o.detachments())).subscribe(p=>{o.overlayElement.classList.toggle(this.handsetCssClass,p.matches)}),i.announcementMessage&&r._onAnnounce.subscribe(()=>{this._live.announce(i.announcementMessage,i.politeness)}),this._animateSnackBar(l,i),this._openedSnackBarRef=l,this._openedSnackBarRef}_animateSnackBar(t,a){t.afterDismissed().subscribe(()=>{this._openedSnackBarRef==t&&(this._openedSnackBarRef=null),a.announcementMessage&&this._live.clear()}),a.duration&&a.duration>0&&t.afterOpened().subscribe(()=>t._dismissAfter(a.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{t.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):t.containerInstance.enter()}_createOverlay(t){let a=new Ne;a.direction=t.direction;let i=Pe(this._injector),o=t.direction==="rtl",r=t.horizontalPosition==="left"||t.horizontalPosition==="start"&&!o||t.horizontalPosition==="end"&&o,l=!r&&t.horizontalPosition!=="center";return r?i.left("0"):l?i.right("0"):i.centerHorizontally(),t.verticalPosition==="top"?i.top("0"):i.bottom("0"),a.positionStrategy=i,a.disableAnimations=this._animationsDisabled,Be(this._injector,a)}_createInjector(t,a){let i=t&&t.viewContainerRef&&t.viewContainerRef.injector;return C.create({parent:i||this._injector,providers:[{provide:st,useValue:a},{provide:Pn,useValue:t.data}]})}static \u0275fac=function(a){return new(a||n)};static \u0275prov=w({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();export{nn as a,$e as b,li as c,ci as d,ui as e,fa as f,ba as g,Cn as h,mi as i,pi as j,wa as k,fi as l,hi as m,vi as n,ko as o};
