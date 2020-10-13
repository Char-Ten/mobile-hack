import { checkIsEditableElement, isAndroid, bindEvent } from "./utils";
const E_KEYBOARDHIDDEN = "keyboardhidden";
const E_KEYBOARDVISIBLE = "keyboardvisible";
export default function registerAndroidKeyboardEvent(): () => any {
	if (!isAndroid) {
		return () => null;
	}
	let isFocus = false;
	let isOrientationChange = false;
	let isResizeAfterOrientationChange = false;
	let isVisible = false;
	let timeout = null;
	let h = window.innerHeight;
	let o = window.orientation;
	let unbindFocusin = bindEvent(window, "focusin", (e) => {
		if (!checkIsEditableElement(<HTMLElement>e.target)) {
			return;
		}
		if (!isFocus) {
			h = window.innerHeight;
			o = window.orientation;
		}
		clearTimeout(timeout);
		isFocus = true;
	});
	let unbindFocusout = bindEvent(window, "focusout", (e) => {
		if (!checkIsEditableElement(<HTMLElement>e.target)) {
			return;
		}
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			isFocus = false;
		}, 200);
	});

	let unbindResize = bindEvent(window, "resize", () => {
		if (!isFocus) {
			return;
		}

		if (isOrientationChange) {
			isOrientationChange = false;
			isResizeAfterOrientationChange = true;
			isVisible = false;
			window.dispatchEvent(new CustomEvent(E_KEYBOARDHIDDEN));

			return;
		}
		if (isResizeAfterOrientationChange) {
			isResizeAfterOrientationChange = false;
			h = window.innerHeight;
			o = window.orientation;
			return;
		}

		if (window.innerHeight < h) {
			isVisible = true;
			window.dispatchEvent(new CustomEvent(E_KEYBOARDVISIBLE));
		} else {
			isVisible = false;
			window.dispatchEvent(new CustomEvent(E_KEYBOARDHIDDEN));
		}
	});

	let unbindOrientationchange = bindEvent(window, "orientationchange", () => {
		if (isVisible) {
			isOrientationChange = true;
		}
	});

	return () => {
		unbindFocusin();
		unbindFocusout();
		unbindResize();
		unbindOrientationchange();
	};
}

// 键盘+旋转 事件链条
// keyboardvisible -> orientationchange -> keyboardhidden -> resize -> resize