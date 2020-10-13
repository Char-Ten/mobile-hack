import { lock, unlock, checkIsLock } from "./registerLock";
import { getGlobalScrollHeight, getGlobalScrollTop } from "./utils";
export { default as registerAndroidKeyboardEvent } from "./registerAndroidKeyboardEvent";
export { default as registeriOSKeyboardBugHack } from "./registeriOSKeyboardBugHack";
export { default as registerLock } from "./registerLock";
export {
	isiOS,
	isAndroid,
	isMobile,
	isWX,
    checkIsEditableElement,
    bindEvent,
    setCss
} from "./utils";

export const scroll = {
	lock,
	unlock,
	checkIsLock,
	get globalHeight() {
		return getGlobalScrollHeight();
	},
	get globalTop() {
		return getGlobalScrollTop();
	},
};
