window.onload = function() {
    if(Kernal.isLogin()) {
        initUserInfo();
    }

    // 设置监听器，点击搜索按钮后，执行对应函数
    document.getElementById('search-btn').addEventListener('click', function() {
        search();
    });

    document.getElementById('top-right').addEventListener('click', function () {
        clickLogin();
    })



    let hotList = document.getElementById("hot");
    let modelHTML = hotList.innerHTML;
    let str = '';
    let games = ['原神', '香肠派对', '王者荣耀','我的世界','和平精英','植物大战僵尸','迷你世界','光遇','泰拉瑞亚','绝地求生'];
    let hotValues = [324853, 168931, 161167, 127320, 123379, 88496, 79547, 76194, 54000, 49095];
    let hengIndices = [2, 4, 7];
    for(let i = 0; i < 10; i++) {
        let model = createElementFromHTML(modelHTML);
        let orderElem = model.getElementsByClassName('hot-order')[0];
        orderElem.innerHTML = (i+1).toString();
        orderElem.classList.remove('hot-order-1');
        if (i < 3) {
            orderElem.classList.add(`hot-order-${i+1}`);
        }

        model.getElementsByClassName('hot-content')[0].innerHTML = games[i];
        model.getElementsByClassName('hot-value')[0].innerHTML = hotValues[i].toString();

        let imgElem = model.getElementsByClassName('status-icon')[0];
        if (hengIndices.indexOf(i) >= 0){
            imgElem.setAttribute('src', 'img/heng.png');
        }

        str += model.outerHTML;
    }
    hotList.innerHTML = str;
    console.log(hotList);
}

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstElementChild;
}

function search() {
    let keyword = document.getElementById("keyword").value;
    alert(keyword.length === 0 ? "请输入搜索内容" : keyword);
}

function clickLogin() {
    if(!Kernal.isLogin()) {
        login();
    }
    else {
        logout();
    }
}

function initUserInfo() {
    // TODO: 修改页面显示错误的 bug，另外注意图片路径是否正确
    let username = Kernal.getUserName();
    let content = '<div id="user">\
                        <span id="user-img">\
                            <img src="img/user.jpg" />\
                        </span>\
                        <span id="name">' + '</span>\
                    </div>';
    document.getElementById('top-right').innerHTML = content;
    document.getElementById('name').textContent = username;
}

// ============================================================ 你不需要去关注的代码

function login() {
    Kernal.login();
    location.reload();
}

function logout() {
    Kernal.logout();
    location.reload();
}