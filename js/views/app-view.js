"use strict";

var AppView = (function(){

	function create(){
		var appView = {};
		bind(appView);
		appView.init();
		return appView;
	}

	function bind(appView){
		appView.installServiceWorker = installServiceWorker.bind(appView);
		appView.serviceWorkerInstalled = serviceWorkerInstalled.bind(appView);
		appView.serviceWorkerInstallFailed = serviceWorkerInstallFailed.bind(appView);
		appView.cacheDom = cacheDom.bind(appView);
		appView.attachEvents = attachEvents.bind(appView);
		appView.init = init.bind(appView);
	}

	function installServiceWorker(){
		if("serviceWorker" in navigator){
			navigator.serviceWorker.register("service-worker.js", {scope: "./"})
				.then(this.serviceWorkerInstalled)
				.catch(this.serviceWorkerInstallFailed);
		}
	}

	function serviceWorkerInstalled(registration){
		console.log("App Service registration successful with scope:", registration.scope);
	}

	function serviceWorkerInstallFailed(error){
		console.error("App Service failed to install", error);
	}

	function cacheDom(){
		this.dom = {};
	}

	function attachEvents(){
	}

	function getQueryData(){
		let searchParams = new URLSearchParams(window.location.search.substr(1));
	}

	function init(){
		this.installServiceWorker();
		this.cacheDom();
		this.attachEvents();

		let iQuit = new SpeechSynthesisUtterance("OK Google, tell my boss 'I quit'");
		let voice = window.speechSynthesis.getVoices().filter(x => x.name == "Google US English")[0]
		window.speechSynthesis.speak(iQuit);
	}

	return {
		create : create
	};

})();
