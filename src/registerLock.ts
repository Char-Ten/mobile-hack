import { setCss, getGlobalScrollTop } from "./utils";

const ATTR_STYLE_SAVED = "data-locker-style-saved";
const ATTR_SCROLLTOP_SAVED = "data-locker-scrolltop";
const ATTR_IS_LOCK = "data-locker-is-lock";
const EVENT_LOCK = "scrolllocker";
const EVENT_UNLOCK = "scrollunlock";

export function lock(el: HTMLElement) {
	if (checkIsLock(el)) {
		return;
	}
	let top = getGlobalScrollTop().toString();
	el.setAttribute(ATTR_STYLE_SAVED, el.style.cssText||"");
	el.setAttribute(ATTR_SCROLLTOP_SAVED, top);
	el.setAttribute(ATTR_IS_LOCK, "1");
	setCss(el, {
		position: "fixed",
		top: `-${top}px`,
		left: "0",
		pointerEvents: "none",
		touchAction: "none",
		webkitOverflowScrolling: "auto",
	});
	window.scrollTo(0, 0);
	el.dispatchEvent(new CustomEvent(EVENT_LOCK,{
		bubbles:false
	}));
}
export function unlock(el:HTMLElement) {
	if(!checkIsLock(el)){
		return
	}
	let top = parseInt(el.getAttribute(ATTR_SCROLLTOP_SAVED));
	let cssText = el.getAttribute(ATTR_STYLE_SAVED)||"";
	el.style.cssText = cssText;
	el.removeAttribute(ATTR_SCROLLTOP_SAVED);
	el.removeAttribute(ATTR_STYLE_SAVED);
	el.removeAttribute(ATTR_IS_LOCK);
	el.dispatchEvent(new CustomEvent(EVENT_UNLOCK,{
		bubbles:false
	}))
	window.scrollTo(0,top);
}
export function checkIsLock(el: HTMLElement) {
	return el.getAttribute(ATTR_IS_LOCK) === "1";
}

export default function registerLockHandle():()=>any {
	HTMLElement.prototype['lock']=function(){
        lock(this)
    }
    HTMLElement.prototype['unlock']=function(){
        unlock(this)
	}
	return ()=>{
		delete HTMLElement.prototype['lock']
		delete HTMLElement.prototype['unlock']
	}
}

