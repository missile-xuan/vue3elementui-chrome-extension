// 后台
console.log('这里是后台');
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	if(request.method == "getTask") {
		sendResponse(window.localStorage['task']);
	} else {
		sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
	}
});



//page_action时 用来控制扩展程序图表是否显示
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab.url.indexOf ("fanyi.baidu.com") > 0){//localhost //ms.czce.com.cn
		chrome.pageAction.show(tabId);
	}else{
		chrome.pageAction.hide(tabId);
	}
});
