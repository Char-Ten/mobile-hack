const userAgent = navigator.userAgent.toLowerCase();

export const isMobile = /mobile/i.test(userAgent);
export const isAndroid = /android/i.test(userAgent);
export const isiOS = /iphone|ipad|ipod/i.test(userAgent);
export const isWX = /micromessenger/i.test(userAgent);

export function checkIsEditableElement(el: HTMLElement): boolean {
	if (el.isContentEditable) {
		return true;
	}
	if (el instanceof HTMLTextAreaElement) {
		return true;
	}
	if (el instanceof HTMLInputElement) {
		if (/text|number|password|search|tel|url|email/.test(el.type)) {
			return true;
		}
	}

	return false;
}

export function bindEvent(
	et: EventTarget,
	type: string,
	listener: EventListenerOrEventListenerObject,
	options?: boolean | AddEventListenerOptions
) {
    et.addEventListener(type, listener, options);
    return ()=>et.removeEventListener(type,listener,options)
}

export function getGlobalScrollTop():number{
    return Math.max(
        window.pageYOffset || 0,
        window.scrollY || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0
    );
}

export function getGlobalScrollHeight():number{
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    );
}

export function setCss(el:HTMLElement,style:{}|CSSStyleDeclaration){
    for (let attr in style) {
		el.style[attr] = style[attr];
	}
}