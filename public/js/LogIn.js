window.onload = function () {
    var btnlog = document.getElementById('btnlog');
    var inputs = document.getElementsByTagName('input');

    btnlog.addEventListener('click', function () {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/login');
        var userData = {
            username: inputs[0].value,
            password: inputs[1].value
        };

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(userData));
        xhr.onload = function () {
            alert(this.responseText);
        }
        xhr.onerror = function () {
            alert('server error!')
        }
    });

    var btnlogout = document.getElementById('btnlogout'); 
    btnlogout.onclick = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/logout');
        xhr.send();
        xhr.onload = function () {
            alert(this.responseText)
        };
    };
 
    var btns = document.querySelector('.btns');
    btns.onclick = function (e) {
        if (!e.target.dataset.page) return false;
        var target = e.target.dataset.page;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/' + target);
        xhr.send();
        xhr.onload = function () {
            window.location.href = "/" + target;
        };
    };
}

