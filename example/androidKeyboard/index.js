var close = function () {};
var opened = false;
var msg = document.querySelector("#msg");
var frgment = document.createDocumentFragment();
new Array(20).fill(1).forEach(function (item) {
	frgment.appendChild(createItem());
});
document.querySelector("#list").appendChild(frgment);
function createItem() {
	var li = document.createElement("li");
	var input = document.createElement("input");
	li.appendChild(input);
	return li;
}

document.querySelector("#btn").addEventListener("click", function () {
	if (!opened) {
		close = mbh.registerAndroidKeyboardEvent();
		msg.innerText = "已经开启";
		this.innerText = "关闭";
		opened = true;
		return;
	}
	close();
	this.innerText = "开启";
	msg.innerText = "";
	opened = false;
});

window.addEventListener("keyboardhidden", function () {
	document.querySelector("#footer").style.display = "block";
});
window.addEventListener("keyboardvisible", function () {
	document.querySelector("#footer").style.display = "none";
});
