!(function (__global__) {
  function modal(text) {
    var oModal = document.createElement('div');
    var oContent = document.createElement('div');

    // 蒙版层
    oModal.style = "position: fixed;left: 0;top: 0;width:100%;height:100%;z-index;999;background: rgba(0,0,0,.4)";
    // 内容层
    oContent.style = "position:absolute;left:50%;top:50%;with:40%;transform:translate(-50%,-50%);z-index:100;background: #fff;text-align:center;padding:1em 2em;";

    oContent.innerHTML = text;

    document.body.appendChild(oModal);
    document.body.appendChild(oContent);

    oModal.onclick = function () {
      document.body.removeChild(oModal);
      document.body.removeChild(oContent);
    };
  }

  modal.show = function () {
    if (arguments.length == 1) {
      if (arguments instanceof Object) {
        var modalObj = arguments[0];
        for (var key in modalObj) {
          if (key == 'text') {
            modal(modalObj[key]);
          }
        }
      } else {
        throw new Error(`${argument}is not a Object`);
      }
    } else {
      throw new Error('modal.show的参数个数为1');
    }
  };
  __global__.modal = modal;

}(this));

function log(mes) {
  console.log(mes);
}