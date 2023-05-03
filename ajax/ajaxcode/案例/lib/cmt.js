//从服务器获取评论,渲染到页面
function getmsg() {
    $.ajax({
        type: 'get',
        url: 'http://www.liulongbin.top:3006/api/cmtlist',
        data: {},
        success: function (res) {
            if (res.status !== 200) return alert('获取评论失败')
            let str = []
            // console.log('huoquocgon');
            $.each(res.data, function (i, item) {
                str.push(`<li class="list-group-item">${item.content}
                <span class="badge" style="background-color: #F0AD4E;">评论时间：${item.time}</span>
                <span class="badge" style="background-color: #5BC0DE;">评论人：${item.username}</span>
                
              </li>`)
            })
            $('#cmt-list').empty().append(str.join(''))
        }


    })
}
getmsg()

$(function () {
    //发表评论，把评论的内容发给服务器，然后重新渲染
    $('#formAddCmt').submit(function (e) {
        //阻止默认行为
        e.preventDefault()
        // console.log('ok');
        //获取表单的内容
        let data = $(this).serialize()
        //获取之后发送给服务器，然后重新渲染页面
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
            if (res.status !== 201) alert('评论失败')
            getmsg()
            $('#formAddCmt')[0].reset()
        })
    })


})