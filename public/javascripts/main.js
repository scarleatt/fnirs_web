;(function () {
    function $ (selector) {
        if (document.querySelectorAll(selector).length === 1) {
            return document.querySelector(selector);
        } else {
            return document.querySelectorAll(selector);
        }
    }

    var result = document.getElementById('result'),
        file,
        currentPosition = 0,
        pause = false,
        partSize = 1024 * 2;

    $('#file').addEventListener('change', function () {
        file = this.files[0];       
        $('.help-block').innerHTML = '文件 ' + file.name + ' 的长度: ' + file.size + ' 字节';
    });

    $('#start').addEventListener('click', function () {
         upload(file);
    });

    $('#pause').addEventListener('click', function () {
         var self = $('#pause');
         if (pause) {
            self.innerHTML = '暂停';
         } else {
            self.innerHTML = '继续';
         }
         pause = !pause;
    })

    function upload (file) {
        var formData = new FormData();

        formData.append("fileName", encodeURIComponent(file.name));
        formData.append('filePart', file.slice(currentPosition, currentPosition + partSize));

        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', function (e) {
            $('.current').style.width = (currentPosition + e.loaded) / file.size * 100 + '%';
        }, false);

        xhr.open("POST", "/upload", true);

        xhr.onreadystatechange=function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                currentPosition += partSize;
                if (currentPosition < file.size) {
                    if (!pause) {
                        setTimeout(function () {
                            var percent = currentPosition / file.size;
                            $('.current').style.width = percent;
                            upload(file);
                        }, 300);
                    }
                } else {
                    $('.progress-bar, .pause').style.display = 'none';
                    alert('上传成功!');
                }
            }
        }

        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

        var  a = formData.getAll('fileName')[0];
        var  b = formData.getAll('filePart')[0];
        xhr.send('a='+a+'&b='+b);
    }

    if (typeof FileReader == 'undefined') {
        alert('err');
        file.setAttribute('disabled', 'disabled');
    }

    function readAsDataURL () {
        var file = document.getElementById('file').files[0];

        if(!/image\/\w+/.test(file.type)){  
            alert("只加载图片");  
            return false;  
        }  

        var reader = new FileReader();
        //将图片以data url形式读入页面
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var resultURL = e.target.result;

            var image = new Image();
            image.src = resultURL;
            image.onload  = function () {
                 var canvas = document.createElement('canvas');
                 var scale = 0.5;
                 
                 canvas.width = this.width*scale;
                 canvas.height = this.height*scale;

                 var ctx = canvas.getContext('2d');
                 ctx.drawImage(this, 0, 0, this.width, this.height);

                 var newImageData = canvas.toDataURL(file.type, 0.5);  
                 result.innerHTML = '<img src="' + newImageData + '" />';

            }
        }
    }

})();