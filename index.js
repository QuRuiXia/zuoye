/* 
* @Author: Busy
* @Date:   2017-11-15 08:33:50
* @Last Modified by:   Busy
* @Last Modified time: 2017-11-15 09:28:33
*/

function json2str(obj) {
    var str = '';

    for (var key in obj) {
        str += key + '=' + obj[key]+'&';
    }

    return str.substring(0, str.length-1);
}




function ajax(obj) {
    // type, url, async, responseType, params, success, error
    /*
    {
        type:请求方式
        url:请求地址
        [async]:是否异步
        [responseType]:数据类型
        [params]:参数对象
        success:成功的回调函数
        [error]:失败的回调函数
    }
    */ 

    var xhr = new XMLHttpRequest();

    if (!obj.url) {
        alert('没有指定服务器地址');
        return;
    }



    console.log(obj['type']);

    switch (obj['type'].toUpperCase()) {
        case 'GET':

            xhr.open('GET', obj.url+'?'+json2str(obj.params), true);
            if(obj.responseType){xhr.responseType=obj.responseType}
            xhr.send();
            break;
        case 'POST':
            xhr.open('POST', obj.url, true);
            if(obj.responseType){xhr.responseType=obj.responseType}
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  
            xhr.send(json2str(obj.params));
            break;  
        default:             
            alert('请求类型未指定或拼写有误');
            return;
            break;
    }


    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status<300 || xhr.status== 304) {
                switch (obj.responseType) {
                    case 'json':
                        console.log('json');
                        obj.success(xhr.response);
                        break;

                    case 'xml':
                        console.log('xml');
                        obj.success(xhr.responseXML);
                        break;  
                    default:
                        console.log('default');
                        obj.success(xhr.responseText);
                        break;
                }
            }else {
                console.log('错误');
            }
        }
    }
}

