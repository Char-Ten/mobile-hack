
const STYLE_SAVED='data-pagelocker-style-saved'
const IS_LOCK = 'data-pagelocker-is-lock'
const IS_DISABLED_UNLOCK = 'data-pagelocker-is-disabled-unlock'
const EVENT_LOCK = 'pagelocker_lock';
const EVENT_UNLOCK = 'pagelocker_unlock';
export function lock(dom:HTMLElement){
    if(checkIsLock(dom)){
        return
    }
    let top = getGlobalScrollTop();
    setCss(dom);
    dom.scrollTop=top;
    window.scrollTo(0,0);
    dom.setAttribute(IS_LOCK,'1');
    dom.dispatchEvent(new CustomEvent(EVENT_LOCK,{
        bubbles:false
    }));
}

export function unlock(dom:HTMLElement){
    if(!checkIsLock(dom)){
        return
    }
    if(checkIsDisabledUnlock(dom)){
        dom.removeAttribute(IS_DISABLED_UNLOCK)
        return 
    }

    let top = dom.scrollTop;
    resetCss(dom);
    dom.scrollTop=0;
    window.scrollTo(0,top);
    dom.removeAttribute(IS_LOCK);
    dom.dispatchEvent(new CustomEvent(EVENT_UNLOCK,{
        bubbles:false
    }))
}

export function disableUnlock(dom:HTMLElement){
    dom.setAttribute(IS_DISABLED_UNLOCK,'1');
}

export function checkIsLock(dom:HTMLElement):boolean{
    return dom.getAttribute(IS_LOCK)==='1'
}

export function checkIsDisabledUnlock(dom:HTMLElement):boolean{
    return dom.getAttribute(IS_DISABLED_UNLOCK)==='1'
}

export function getGlobalScrollTop():number{
    return Math.max(
        window.pageYOffset||0,
        window.scrollY||0,
        document.body.scrollTop||0,
        document.documentElement.scrollTop||0,
    )
}

export function getGlobalScrollHeight():number{
    return Math.max(
        document.documentElement.scrollHeight||0,
        document.body.scrollHeight||0
    )
}

export function registerLockHandleOnHTMLElement(){
    HTMLElement.prototype['lock']=function(){
        lock(this)
    }
    HTMLElement.prototype['unlock']=function(){
        unlock(this)
    }
    HTMLElement.prototype['disableUnlock']=function(){
        disableUnlock(this)
    }
}

export function hackIosKeyboardBlurBug(){
    var time = null;
    document.body.addEventListener("focusout",function(){
        clearTimeout(time)
        time = setTimeout(() => {
            let top = getGlobalScrollTop();
            let height = getGlobalScrollHeight();
            if(top+window.innerHeight>=height){
                window.scrollTo(0,height);
            }
        }, 300);
    });
    document.body.addEventListener("focusin",function(e){
        clearTimeout(time)
    })
}



function setCss(dom:HTMLElement){
    dom.setAttribute(STYLE_SAVED,dom.style.cssText);
    dom.style.position="fixed";
    dom.style.top="0";
    dom.style.left="0";
    dom.style.width="100%";
    dom.style.height="100%";
    dom.style.overflow="hidden";
    dom.style.pointerEvents="none";
    dom.style.touchAction="none";
    dom.style['webkitOverflowScrolling']="auto";
}

function resetCss(dom:HTMLElement){
    let styleSaved = dom.getAttribute(STYLE_SAVED);
    dom.removeAttribute(STYLE_SAVED)
    dom.style.cssText = styleSaved||"";
}
