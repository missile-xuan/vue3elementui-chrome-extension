
console.log('这是content script!');

// 注意，必须设置了run_at=document_start 此段代码才会生效
// 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
document.addEventListener('DOMContentLoaded', function() {
	console.log('这是DOMContentLoaded');
});

/**
 * 构建vue窗口框架div 
 * 此处与业务逻辑无关 
 * 主要做插件弹窗控制
 */
const minimizeDiv = document.createElement('div');
minimizeDiv.className = 'plug-thumbnail'
minimizeDiv.style.right = '0px'
minimizeDiv.style.top = '140px'
minimizeDiv.style.display = "none"

const vue3mainDiv = document.createElement('div');
vue3mainDiv.style.zIndex = 2000
vue3mainDiv.style.right = '120px'
vue3mainDiv.style.top = '226px'
vue3mainDiv.id = 'vue3mainDiv'
vue3mainDiv.className = 'plug-vue3-main-div'
vue3mainDiv.innerHTML =`
<div ref="dragBarRef" @mousedown="dragSetSizePosition($event, false, false, true)" class="plug-drag-bar">
	<div>vue3+element-ui 的chrome插件模板</div>
	<div class="plug-close-win" @click.stop="minimize">
		<svg t="1637110923259" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1297" width="18" height="18"><path d="M512 456.310154L94.247385 38.557538a39.542154 39.542154 0 0 0-55.689847 0 39.266462 39.266462 0 0 0 0 55.689847L456.310154 512 38.557538 929.752615a39.542154 39.542154 0 0 0 0 55.689847 39.266462 39.266462 0 0 0 55.689847 0L512 567.689846l417.752615 417.752616c15.163077 15.163077 40.290462 15.36 55.689847 0a39.266462 39.266462 0 0 0 0-55.689847L567.689846 512 985.442462 94.247385a39.542154 39.542154 0 0 0 0-55.689847 39.266462 39.266462 0 0 0-55.689847 0L512 456.310154z" p-id="1298"></path></svg>
	</div>
</div>
<div class="plug-frame-middle">
	<div class="plug-drag-width" @mousedown="dragSetSizePosition($event, true, false, true)"></div>
	<div class="plug-body">
		<test-component></test-component>
	</div>
	<div class="plug-drag-width" @mousedown="dragSetSizePosition($event, true, false, false)"></div>
</div>
<div class="plug-frame-bottom">
	<div class="plug-drag-width-height" style="cursor: ne-resize;" @mousedown="dragSetSizePosition($event, true, true, true)"></div>
	<div class="plug-drag-height" @mousedown="dragSetSizePosition($event, false, true, false)"></div>
	<div class="plug-drag-width-height" style="cursor: nw-resize;" @mousedown="dragSetSizePosition($event, true, true, false)"></div>
</div>
`

minimizeDiv.onclick = function(){
	minimizeDiv.style.display = "none"
	vue3mainDiv.style.display = ""
}

document.body.append(vue3mainDiv);
document.body.append(minimizeDiv);

const mainVue = Vue.createApp({
	data() {
		return{
			
		}
	},
	mounted(){
		
	},
	methods:{
		// 拖拽设置宽度及位置
		dragSetSizePosition(e, widthType, heightType, positionType){
			let isMouseDown = true
			const startPageX = e.pageX
    	const startPageY = e.pageY
			document.querySelector('html').style['user-select'] = 'none'
			// 原始窗体位置
			const elOriginLeft = vue3mainDiv.offsetLeft
    	const elOriginTop = vue3mainDiv.offsetTop
			// 原始窗体宽高
			const elOriginWidth = vue3mainDiv.scrollWidth
    	const elOriginHeight = vue3mainDiv.scrollHeight
			// 开始移动
			document.onmousemove = e => {
				if(!isMouseDown) return
				const currentPageX = e.pageX
				const currentPageY = e.pageY
				const moveX = currentPageX - startPageX
      	const moveY = currentPageY - startPageY
				// 基础目标位置
				let targetLeft = elOriginLeft + moveX
				let targetTop = elOriginTop + moveY
				// 基础目标宽高
				let targetWidth = positionType?elOriginWidth - moveX:elOriginWidth + moveX
				let targetHeight = elOriginHeight + moveY
				if(positionType && (targetWidth>50 || !(widthType || heightType))){vue3mainDiv.style.left = targetLeft+'px'}
				if(positionType && !widthType && !heightType){vue3mainDiv.style.top = targetTop+'px'}
				if(widthType && targetWidth>50){vue3mainDiv.style.width = targetWidth+'px'}
				if(heightType && targetHeight>50){vue3mainDiv.style.height = targetHeight+'px'}
			}
			document.onmouseup = e => {
				isMouseDown = false
				document.onmouseup = null
				document.querySelector('html').style['user-select'] = ''
			}
		},
		// 最小化
		minimize(){
			vue3mainDiv.style.display = "none"
			minimizeDiv.style.display = ""
		},
	}
}).use(ElementPlus)
.component("test-component", testComponent)

mainVue.mount('#vue3mainDiv')



