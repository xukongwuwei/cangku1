function myajax(data) {
    //创建一个xhr对象
    let xhr = new XMLHttpRequest()
    //处理数据
    let datas = resolveData(data.data)

    //判断是哪种请求
    if (data.method.toUpperCase() === 'GET') {
        //创建请求
        xhr.open(data.method, data.url + '?' + datas)
        //发送请求
        xhr.send()
    } else if (data.method.toUpperCase() === 'POST') {
        //创建请求
        xhr.open(data.method, data.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(datas)
    }

    //监听请求状态
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText)
            data.success(result)
        }
    }


}
//处理数据，因为发给服务器的数据需要转换成查询字符串的形式
function resolveData(data) {
    //把数据拼接成查询字符串的格式  key=value &key=value
    //处理对象要先转换成数组，因为数组可以每个循环追加(拼接数组)，然后转换成字符串
    let arr = []
    for (let k in data) {
        arr.push(k + '=' + data[k])
    }
    //把数组转换成字符串,以查询字符串的格式
    return arr.join('&')
}