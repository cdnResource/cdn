$(document).ready(function(){
    if (is_weixn_qq()) {
        window.location.href = 'https://c.pc.qq.com/middle.html?pfurl='+window.location.href;
    }
});

// 判断QQUA的代码无需修改
function is_weixn_qq(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else if (ua.match(/QQ/i) == "qq") {
        alert("qq")
        if(navigator.userAgent.indexOf("MQQBrowser") > -1){
            return false;
        }else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
            return false;
        }
        return true;
    }
    return false;
}