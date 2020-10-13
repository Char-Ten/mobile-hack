import {
	bindEvent,
	checkIsEditableElement,
	getGlobalScrollHeight,
	getGlobalScrollTop,
	isiOS,
} from "./utils";

export default function registeriOSKeyboardBugHack(): () => any {
	if (!isiOS) {
		return () => null;
	}
	let timeout = null;
	let unbindFocusin = bindEvent(window, "focusin", () => {
		clearTimeout(timeout);
	});
	let unbindFocusout = bindEvent(window, "focusout", (e) => {
		if (!checkIsEditableElement(<HTMLElement>e.target)) {
			return;
		}

		let top = getGlobalScrollTop();
		let height = getGlobalScrollHeight();

		if (top + window.innerHeight >= height - 20) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				window.scrollTo(0, height);
			}, 200);
		}
	});

	return () => {
		unbindFocusin();
		unbindFocusout();
	};
}
