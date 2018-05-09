/**
 * Created by Lenovo on 2017/3/31.
 */
//��װһ������,���ݹ�ȥ��������,Ԫ��/����/ֵ!
function animate(ele, json, fn) {
  //Ҫ�ö�ʱ��,���嶨ʱ��
  clearInterval(ele.timer);
  ele.timer = setInterval(function() {
    //һ����forѭ��֮��,�����ܳ�����ʱ��֮��
    var bool = true;
    for (var k in json) {
      //Ҫ���ݺܶ�����,��Ҫ�ж�����ֵ��ʲô,Ȼ������߼�;
      //�ж�:�������ʱz-index;
      if (k === "z-index") {
        //����ǲ㼶������ֱ����ߵ���ߡ���Ҫһ��һ�����ӣ�
        ele.style.zIndex = json[k];
        //�����ʱ���Ͳ㼶�޹أ�

        //�ж�:�������ʱopacity;(һ����С��)
      } else if (k === "opacity") {
        //opacity������Խ��ܵĶ���С����С���������׳��־��ȶ�ʧ��
        //�����ȷŴ�10����Ȼ�����,������ϸ�ֵ��ʱ������С10��;
        var leader = parseInt(getStyle(ele, k) * 10) || 10; //getStyle();�ķ���ֵ��һ�����д�Ϊ���ַ���
        var step = (parseInt(json[k] * 10) - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step; //��һ������Ҫ����λ��
        //��ֵ��ʱ��Ҫ��С10��,����Ҫ��λ;
        ele.style[k] = leader / 10;
        //����ie678:
        ele.style.filter = "alpha(opacity=" + leader * 10 + ")";
        //�����ʱ��;
        if (parseInt(json[k] * 10) !== leader) {
          bool = false;
        }
      } else {
        //��������,����һ���߼�
        var leader = parseInt(getStyle(ele, k)) || 0; //getStyle();�ķ���ֵ��һ�����д�Ϊ���ַ���
        var step = (json[k] - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step; //��һ������Ҫ����λ��
        ele.style[k] = leader + "px";
        //�����ʱ��;
        if (json[k] !== leader) {
          bool = false;
        }
      }
    }
    //���������ʱ��������forѭ��֮��,����Ҫ�ж�;
    console.log(1);
    if (bool) {
      clearInterval(ele.timer);
      //�����ʱ��֮��,������������ִ����ϵ�ʱ��,��ʱ���ҾͿ���ִ����һ��������
      if (fn) {
        fn();
      }
    }
  }, 30);
}

function getStyle(ele, attr) {
  //�ж�:������Ƿ�֧��ĳ������,֧�־͵���,��֧�־�������һ��
  if (ele.currentStyle !== undefined) {
    //��������Բ����ڷ���ֵ����undefined
    return ele.currentStyle[attr]; //�����Ż�ȡ����ֵ,�Ƚ����,����ʲô����ʲô
  } else {
    //����ȸ�ie9+֧�ֵķ���
    return window.getComputedStyle(ele, null)[attr];
  }
}

//jquery�ķ�װ;
function $(str) {
  //�������Ȼ�ȡ����ĸ;�ж�:
  var char = str.charAt(0);
  //if�ж�:
  if (char === "#") {
    return document.getElementById(str.slice(1)); //ȥ��i;
  } else if (char === ".") {
    return document.getElementsByClassName(str.slice(1)); //ȥ��c;
  } else {
    return document.getElementsByTagName(str); //ȥ��t;
  }
}
