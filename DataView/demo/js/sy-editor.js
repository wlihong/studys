var wsEditor=(function(){
	let tpl=`
<div id="editor-wrapper" contenteditable="false">
    <div id="control-area" >
        <div class="btn-group">
            <a href="#" class='btn' data-command='undo' title="撤销"></a>
            <a href="#" class='btn' data-command='redo' style="background-position:-100px 0px;" title="重做"></a>
        </div>
        <div class="btn-group">
            <a href="#" class='btn' data-command='bold'title="粗体" style="background-position:0px 0px;"></a>
            <a href="#" class='btn' data-command='italic'title="斜体" style="background-position:-60px 0px;"></a>
            <a href="#" class='btn' data-command='underline' title="下滑线" style="background-position:-140px 0px;"></a>
            <a href="#" class='btn' data-command='strikeThrough' title="删除线" style="background-position:-120px 0px;"></a>
            <a href="#" class='btn' data-command='superscript' title="上标" style="background-position:-620px 0px;"></a>
            <a href="#" class='btn' data-command='subscript' title="下标" style="background-position:-600px 0px;"></a>
            <a href="#" class='btn' data-command='removeFormat' title="清除格式" style="background-position:-580px 0px;"></a>
        </div>
        <div class="btn-group">
        	<a href="#" class='btn btn-color' data-command='foreColor' data-value="#000000" style="background-position:-720px 0px;" title="字体颜色"></a>
        	<a href="#" class='btn' data-command='backColor' data-value="#ffffff" style="background-position:-760px 0px;" title="背景色"></a>
            <a href="#" class='btn' data-command='insertOrderedList'  style="background-position:-80px 0px;" title="有序列表"></a>
            <a href="#" class='btn' data-command='insertUnorderedList'  style="background-position:-20px 0px;" title="无序列表"></a>
            <a href="#" class='btn' data-command='selectAll'  style="background-position:-400px -20px;" title="全选"></a>
        	<div id="select-color" style="display: none;">
        		<input type="text" readonly="true" id="backgroundShow">
    			<header>主体颜色</header>
    			<ul>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    			</ul>
    			<header>标准颜色</header>
    			<ul>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    				<li></li>
    			</ul>
        	</div>
        </div>
        <div class="btn-group">
            <a href="#" class='btn' data-command='justifyLeft' style="background-position:-460px -0px;" title="居左对齐"></a>
            <a href="#" class='btn' data-command='justifyCenter' style="background-position:-420px -0px;" title="居中对齐"></a>
            <a href="#" class='btn' data-command='justifyRight' style="background-position:-480px -0px;" title="居右对齐"></a>
            <a href="#" class='btn' data-command='justifyFull' style="background-position:-440px -0px;" title="两端对齐"></a>
        </div>
        <div class="btn-group">
            <a href="#" class='btn' data-command='indent' style="background-position:-400px 0px;" title="首行左缩进"></a>
            <a href="#" class='btn' data-command='outdent' style="background-position:-540px 0px;" title="首行右缩进"></a>
        </div>
        <div class="btn-group">
            <a href="#" class='btn' data-command='insertHorizontalRule' style="background-position:-360px 0px;" title="分隔线"></a>
            <!--ie与safari不支持-->
            <!--<a href="#" class='btn' data-command='heading' data-value="H2" onclick="changeStyle(this.dataset)" title="段落">段落</a>-->
            <a href="#" class='btn' data-command='insertImage' data-value="images/162367125726955568.jpg"  style="background-position:-380px 0px;" title="单图上传"></a>
        </div>
		<div class="btn-group">
            <a href="#" class='btn' data-command='copy' style="background-position:-700px 0px;" title="复制"></a>
            <a href="#" class='btn' data-command='cut' style="background-position:-680px 0px;" title="剪切"></a>
        </div>
        <div class="btn-group">
            <select class="btn-select" data-command='fontSize' data-value="1" title="字号">
            	<option value="1" style="font-size:12px">12px</option>
            	<option value="2" style="font-size:14px">14px</option>
            	<option value="3" style="font-size:16px">16px</option>
            	<option value="4" style="font-size:18px">18px</option>
            	<option value="5" style="font-size:20px">20px</option>
            	<option value="6" style="font-size:24px">24px</option>
            </select>
            <select class="btn-select" data-command='fontName' data-value="SimSun" title="字体" >
            	<option value="Simsun" style="font-family:Simsun">宋体</option>
            	<option value="FangSong" style="font-family:FangSong">仿宋</option>
            	<option value="Microsoft YaHei" style="font-family:Microsoft YaHei">微软雅黑</option>
            	<option value="KaiTi" style="font-family:KaiTi">楷体</option>
            	<option value="SimHei" style="font-family:SimHei">黑体</option>
            	<option value="SimLi" style="font-family:SimLi">隶书</option>
            </select>
        </div>
        <div class="btn-group">
            <a href="#" class='btn' data-command='createLink' data-value="http://www.baidu.com "  style="background-position:-500px 0px;" title="超链接"></a>
            <a href="#" class='btn' data-command='unlink' style="background-position:-640px 0px;" title="取消链接"></a>
        </div>
    </div>
</div>`;
//初始化颜色上面的样式布局
const init=function(){
	let selectColor=document.querySelectorAll("#editor-wrapper #select-color>ul");
	let Color=[['#ffffff','#000000','#eeece1',"#1f497d","#4f81bd","#c0504d",'#9bbb59',"#8064a2","#4bacc6","#f79646"
	,"#f2f2f2","#7f7f7f","#ddd9c3","#c6d9f0","#dbe5f1","#f2dcdb","#ebf1dd","#e5e0ec","#dbeef3","#fdeada","#d8d8d8"
	,"#595959","#c4bd97","#8db3e2","#b8cce4","#e5b9b7","#d7e3bc","#ccc1d9","#b7dde8","#fbd5b5","#bfbfbf","#3f3f3f"
	,"#938953","#548dd4","#95b3d7","#d99694","#c3d69b","#b2a2c7","#92cddc","#fac08f","#a5a5a5","#262626","#494429"
	,"#17365d","#366092","#953734","#76923c","#5f497a","#31859b","#e36c09","#7f7f7f","#0c0c0c","#1d1b10","#0f243e"
	,"#244061","#632423","#4f6128","#3f3151","#205867","#974806"],
	["#c00000","#ff0000","#ffc000","#ffff00","#92d050","#00b050","#00b0f0","#0070c0","#002060","#7030a0"]];
	for(let i=0;i<selectColor.length;i++){
		let li=selectColor[i].querySelectorAll("ul>li");
		for(let j=0;j<li.length;j++){
			li[j].style.background=Color[i][j];
			li[j].title=Color[i][j].slice(1);
		}
	}
	document.getElementById("control-area").onclick=function(e){
		let target=e.target;
		if(target.nodeName=="A"){
			if(target.dataset.command=="foreColor"||target.dataset.command=="backColor"){
				selectFontColor(target);
			}else{
			   changeStyle(target.dataset);
			}
		}else if(target.nodeName=="SELECT"){
			if(target.dataset.command=="fontSize"||target.dataset.command=="fontName"){
				target.onchange=selectFont(target);
			}
		}
	}
	let link=document.createElement("link");
	link.href="css/textEditor.css";
	link.type="text/css";
	link.rel="stylesheet";
	document.getElementsByTagName("head").item(0).appendChild(link);
}
//选择字体颜色及背景色
const selectFontColor=function(e){
	let th=e;
	let Color=document.getElementById("select-color");
	if(e.dataset.command=="backColor"){
		Color.style.left="310px";
	}else{
		Color.style.left="275px";
	}
	document.getElementById("backgroundShow").style.background="#ffffff";
	if(Color.style.display=="none"){
		Color.style.display="block";
		Color.onmousemove=function(e){
			if(e.target.nodeName=="LI"){
				th.dataset.value="#"+e.target.title;
				document.getElementById("backgroundShow").style.background="#"+e.target.title;
				changeStyle(th.dataset);
			}
		}
		Color.onclick=function(e){
			Color.style.display="none";
		}
	}else{
		Color.style.display="none";
	}
}
//改变样式
const changeStyle = (data) => {
    data.value? document.execCommand(data.command, false, data.value):document.execCommand(data.command, false, null)
}
//选择字体，大小的函数
const selectFont=function(e){
	e.dataset.value=e.value;
	changeStyle(e.dataset);
}
const create=function(e){
	e.contentEditable=true;
	let div=document.createElement("div");
	div.innerHTML=tpl;
//	e.parentNode.appendChild(div);
	$(e).after(div);
}
const remove=function(){
	let length=document.querySelectorAll("#editor-wrapper");
	if(length.length>0){
		length[0].parentNode.parentNode.removeChild(length[0].parentNode);
	}
}
const show=function(e){
	let boolean=false;
	let target=null;
	if($(e.target).data("type")=="editor"){
		target=e.target;
		boolean=true;
	}else{
		for(let i=0;i<$(e.target).parents().length-2;i++){
			console.log($(e.target).parents()[i]);
			if($(e.target).parents()[i].dataset.type=="editor"){
				boolean=true;
				target=$(e.target).parents()[i];
				break;
			}
		}
	}
	if(boolean){
		remove();
		create(target);
		init();
	}else{
		remove();
	}
}
return {
	show:show,
}
})();
