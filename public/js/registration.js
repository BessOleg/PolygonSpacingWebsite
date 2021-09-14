window.onload = function () {
    var btnlog = document.getElementById('btnreg');
    var inputs = document.getElementsByTagName('input');

    btnlog.addEventListener('click', function () {
        if (inputs[0].value.length > 0 && inputs[1].value.length > 0) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/reg');
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
        }
        else { alert("Заполните поля ввода")}
        
    });

    
}

