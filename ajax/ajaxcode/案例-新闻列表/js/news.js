//获取数据
$.get("http://www.liulongbin.top:3006/api/news",
    function (res) {
        if (res.status !== 200) return alert('获取数据失败')
        //模板的时间过滤器
        template.defaults.imports.timetime = function (time) {
            let date = new Date(time)
            let y = timezero(date.getFullYear())
            let m = timezero(date.getMonth() + 1)
            let d = timezero(date.getDate())

            let hh = timezero(date.getHours())
            let mm = timezero(date.getMinutes())
            let ss = timezero(date.getSeconds())

            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        }

        //把字符串加工成数组
        for (let i = 0; i < res.data.length; i++) {
            res.data[i].tags = res.data[i].tags.split(',')
        }

        // console.log(res.data[0].tags);
        //获取数据之后要渲染到页面，渲染到页面需要模板引擎
        let htmls = template('muban1', res)
        $('#news-list').html(htmls)
    }

);

//时间补零函数
function timezero(n) {
    return n < 10 ? '0' + n : n
}
