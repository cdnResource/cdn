$(document).ready(function() {
    function getWebNamePath() {
        var pathName = window.location.pathname.substring(1);
        var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
        return  webName;
    }

    var clipboard = new ClipboardJS('#copy', {
        text: function () {
            var url = $("#wx").text();
            return url;
        }
    });

    clipboard.on('success', function (e) {
        layer.open({
            content: '复制成功！'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
    });

    clipboard.on('error', function (e) {
        layer.open({
            content: '复制失败，请手动复制！'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
    });
    $("#onlinec").click(function(){
        layer.open({
            content: '很抱歉！当前socket忙,请添加微信联系!'
            ,skin: 'msg'
            ,anim: 'false'
            ,time: 3 //2秒后自动关闭
        });
    });

    //阻止默认事件函数
    function stopDefault(e) {
        if (e && e.preventDefault)
            e.preventDefault();
            return  false; //兼容IE
    }
    //声明并获取element
    var objs=$("#header .actions li a");
    $.each(objs,function (index,obj) {
        obj.onclick =  function(e){
            stopHref(e);
        }
    });
    //阻止默认事件函数
    function stopHref(e) {
        e.preventDefault();
    }


    $("#header .actions li a").click(function (){
        let path= getWebNamePath();
        if(path.length>1){
            path="/"+path;
        }
        let sign=$(this).attr("sign");
        let href=$(this).attr("href");
        if(sign!=null&&sign!=undefined){
            $.ajax({ url: path+"/getMsg", method: "get",data:{"flagStr":sign}}).done(function (data){
                if(data!=null&&data["msg"].length>3) {
                    layer.open({
                        title: ["温馨提示",
                            'border-radius:4px;background-color: #008ed6; color:#fff;'
                        ],
                        style: 'padding:0;border:none; color:black;',
                        content: data["msg"],
                        btn: ['已知晓','离开'],
                        no:function (){
                            layer.closeAll();
                        },
                        yes: function () {
                            window.location.href = href;
                            layer.closeAll();
                        }
                    });
                }else{
                    window.location.href = href;
                }
            });
        }else{
            window.location.href = href;
        }
    });
});
