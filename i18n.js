(function(){
	var lang = "en";
	try { lang = localStorage.getItem("d4-lang") || "en"; }catch(e){}
	function getTrans(key){
		if (lang == "en") return;
		var translations = window["__i18n_" + lang];
		if (!translations) return;
		return translations[key];
	}
	function t(key){
		var tr = getTrans(key);
		return tr !== undefined ? tr : key;
	}
	function apply(scope){
		if (lang == "en") return;
		var tr = window["__i18n_" + lang];
		if (!tr) return;
		var root = scope || document;
		root.querySelectorAll("[data-i18n]").forEach(function(el){
			var key = el.getAttribute("data-i18n");
			var text = tr[key];
			if (text === undefined) text = key;
			if (el.tagName == "INPUT" || el.tagName == "TEXTAREA"){
				el.placeholder = text;
			}else if (el.tagName == "OPTION"){
				el.textContent = text;
			}else{
				el.innerHTML = text;
			}
		});
		root.querySelectorAll("[data-i18n-title]").forEach(function(el){
			var key = el.getAttribute("data-i18n-title");
			var text = tr[key];
			if (text !== undefined) el.title = text;
		});
		//update language dropdown to show current lang
		if (!scope){
			var sel = root.querySelector("select[onchange*='setLanguage']");
			if (sel){
				var opt = sel.querySelector("option[value='" + lang + "']");
				if (opt) opt.selected = true;
			}
		}
	}
	window.d4 = window.d4 || {};
	window.d4.i18n = { t: t, apply: apply, getLang: function(){ return lang; } };
})();
