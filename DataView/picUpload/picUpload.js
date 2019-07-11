var picUpload=(function(){
	let tpl=`
		<div id="pic-up">
			<header>
				<span class="btn-active" data-value="tab1">图片上传</span>
				<span data-value="tab2">已经上传图片</span>
				<i title="关闭" data-value="close"></i>
			</header>
			<form action="" id="pic-form1" method="post" enctype="multipart/form-data">
				<div class="pic-up-box" id="pic-up-box">
					<div class="pic-up-show">
						<span class="pic-up-click" data-value="upload">本地文件上传</span>
						<span>图片尺寸：1920*1080，不大于3M</span>
					</div>
				</div>
				<div id="editor_contentFooter">
						<span id="yes" data-value="yes">开始上传</span>
						<span id="no" data-value="no">继续添加</span>
				</div>
			</form>
			<div class="pic-history-box" id="pic-history-box" style="display: none;">
				<div class="pic-img-show">
					<p>
						<img src="images/162367125726955568.jpg" title="2017-08-09">
					</p>
					<p>名字</p>
				</div>
				<div class="pic-img-show">
					<p>
						<img src="images/162367125726955568.jpg" title="2017-08-09">
					</p>
					<p>名字</p>
				</div>
				<div class="pic-img-show">
					<p>
						<img src="images/162367125726955568.jpg" title="2017-08-09">
					</p>
					<p>名字</p>
				</div>
				<div class="pic-img-show">
					<p>
						<img src="images/162367125726955568.jpg" title="2017-08-09">
					</p>
					<p>名字</p>
				</div>
				<div class="pic-img-show">
					<p>
						<img src="images/162367125726955568.jpg" title="2017-08-09">
					</p>
					<p>名字</p>
				</div>
				<div class="pic-img-show">
					<p>
						<img src="images/162367125726955568.jpg" title="2017-08-09">
					</p>
					<p>名字</p>
				</div>
				<div class="pic-img-show">
					<p>
						<img src="images/162367125726955568.jpg" title="2017-08-09">
					</p>
					<p>名字</p>
				</div>
				<div class="pic-img-show">
					<p>
						<img src="images/162367125726955568.jpg" title="2017-08-09">
					</p>
					<p>名字</p>
				</div>
				<div class="pic-img-show">
					<p>
						<img src="images/162367125726955568.jpg" title="2017-08-09">
					</p>
					<p>名字</p>
				</div>
				<div class="pic-img-show">
					<p>
						<img src="images/162367125726955568.jpg" title="2017-08-09">
					</p>
					<p>名字</p>
				</div>
			</div>
			<div id="pic-hint-box">
				还有图片没有选择或者没有选择图片
			</div>
		</div>`,style=`<link href="css/picUp.css" type="text/css" rel="stylesheet" id="pic-up-css">`;
//初始化弹窗点击事件
const initClick=function(){
	//点击弹窗操作
	$("#pic-up header").click(function(e){
		console.log(1)
		let target=e.target;
		if($(target).data("value")=="close"){
			$("#pic-up").remove();
		}else if(target.nodeName=="SPAN"){
			$(target).addClass("btn-active").siblings().removeClass("btn-active");
			if($(target).data("value")=="tab1"){
				$("#pic-form1").show();
				$("#pic-history-box").hide();
			}else if($(target).data("value")=="tab2"){
				$("#pic-form1").hide();
				$("#pic-history-box").show();
				$.ajax({
					type:"post",
					url:"http://www.wanghonggui.com/BLog1/data/album_photo/getPhotoById.php?photo_id=6&pageSize=20&pno=0",
					async:true,
					success:function(e){
					
					},
					error:function(e){
						console.log(e);
					}
				});
			}
		}
	});
	$("#pic-up-box").click(function(e){
		if($(e.target).data("value")=="upload"){
			$("#editor_contentFooter").show();
			$("#pic-up-box").html("");
			createFiles($("#pic-up-box")[0]);
		}else if(e.target.nodeName=="INPUT"){
			e.target.onchange=function(){
				var pics=document.querySelectorAll(".upload_pictures input");
				if(pics.length>=1){
					var bool=[].some.call(pics,function(elem,i,arr){
						if(i!=arr.length-1){
							return arr[arr.length-1].value==arr[i].value;
						}
					});
					if(bool||pics[pics.length-1].files[0]==undefined){
						$("#pic-up-box")[0].removeChild(this.parentNode);
						createFiles($("#pic-up-box")[0])
					}else{
						$(this).prev()[0].title=this.files[0].name;
						this.previousElementSibling.src=window.URL.createObjectURL(this.files[0]);
					}
				}
			}
		}
	});
	$("#editor_contentFooter").click(function(e){
		if(e.target.nodeName=="SPAN"){
			var pics=document.querySelectorAll(".upload_pictures input");
			if($(e.target).data("value")=="yes"){
				//表单提交事件
				if(pics.length>=1){
					var bool=[].some.call(pics,function(elem,i,arr){
						return arr[i].files[0]==undefined;
					});
					if(bool){
						$("#pic-hint-box").fadeIn();
						setTimeout(function(){
							$("#pic-hint-box").fadeOut();
						},1200);
					}else{
						document.getElementById("pic-form1").submit();
					}
				}
			}else if($(e.target).data("value")=="no"){
				//继续点击事件
				if(!(pics[pics.length-1].files[0]==undefined)){
					pics[pics.length-1].style.visibility="hidden";
					createFiles($("#pic-up-box")[0]);
				}else{
					$("#pic-hint-box").fadeIn();
					setTimeout(function(){
						$("#pic-hint-box").fadeOut();
					},1200);
				}
			}
		}
	});
}
//生成美化的input框
const createFiles=function(str){
	var div=document.createElement("div");
	div.className="upload_pictures";
	var div1=document.createElement("div");
	div1.innerHTML="添加照片";
	div.appendChild(div1);
	var img=document.createElement("img");
	img.src="images/close.png" 
	img.className="close_img";
	img.onclick=function(){
		var count=$("#pic-up-box")[0].getElementsByClassName("upload_pictures").length;
		if(count<=1){
			$("#editor_contentFooter").hide();
			$("#pic-up-box")[0].innerHTML=`
			<div class="pic-up-show">
				<span class="pic-up-click" data-value="upload">本地文件上传</span>
				<span>图片尺寸：1920*1080，不大于3M</span>
			</div>`;
			return false;
		}
		$("#pic-up-box")[0].removeChild(this.parentNode);
		$("#pic-up-box")[0].getElementsByClassName("upload_pictures")[$("#pic-up-box")[0].getElementsByClassName("upload_pictures").length-1].getElementsByTagName("input")[0].style.visibility="visible";
	}
	div.appendChild(img);
	var img=document.createElement("img");
	div.appendChild(img);
	var input=document.createElement("input");
	input.type="file";
	input.name="mypic[]";
	div.appendChild(input);
	str.appendChild(div);
}
//初始化弹窗
const init=function(){
	$("body").append(tpl);
	$("head").append(style);
	initClick();
}
const show=function(){
	if(!$("#pic-up")[0]){
		init();
	}else{
		$("#pic-up").remove();
		$("head>link#pic-up-css").remove();
	}
};
return {
	show:show
}
})();
//export{
//	picUpload
//}
