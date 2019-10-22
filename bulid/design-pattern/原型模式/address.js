
// created by zhouatie

(function(){

  var util = {
      extend: function(target) {
          for (var i = 1, len = arguments.length; i < len; i++) {
              for (var prop in arguments[i]) {
                  if (arguments[i].hasOwnProperty(prop)) {
                      target[prop] = arguments[i][prop];
                  }
              }
          }

          return target;
      },
      indexOf: function(array, item) {
          var result = -1;
          for (var i = 0, len = array.length; i < len; i++) {
              if (array[i] === item) {
                  result = i;
                  break;
              }
          }
          return result;
      },
      addClass: function(element, className) {
          var classNames = element.className.split(/\s+/);
          if (util.indexOf(classNames, className) == -1) {
              classNames.push(className);
          }
          element.className = classNames.join(' ');
      },
      removeClass: function(element, className) {
          var classNames = element.className.split(/\s+/);
          var index = util.indexOf(classNames, className);
          if (index !== -1) {
              classNames.splice(index, 1);
          }
          element.className = classNames.join(' ');
      },
      hasClass: function(element, className){
          if(!element || !element.className) return false;
          var classNames = element.className.split(/\s+/);
          return util.indexOf(classNames, className) != -1;
      },
      parents: function(elem,pClass){ // 递归函数通过父亲的classname获取元素
          if( !elem ) return null;
          var parent = elem.parentNode;
          if(parent===document) return null;
          if( !this.hasClass(parent,pClass)) parent = this.parents(parent,pClass);
          return parent;
      },
      isObj:function(o) {
          return Object.prototype.toString.call(o)=="[object Object]";
      },
      isArray: function(o){
          return Object.prototype.toString.call(o)=="[object Array]";
      },
      css: function(elem,obj){
          for(var i in obj){
              elem.style[i] = obj[i];
          }
      },
      slide: function( elem, type ,time) {
          clearInterval(elem.timer);
        var HEIGHT = elem.offsetHeight;
          var END_HEIGHT = Address.init_uls.init_height;
          if(!time) time = 200; // 设置默认动画时长
          var speed = Address.init_uls.init_height/(time/10);

          if(type=="down") {
              this.addClass(elem.parentNode,'isDown');
              util.css(elem,{visibility:"none",height:"",display:"block",overflow:"auto"});
              if(elem.offsetHeight<Address.init_uls.init_height){
                  END_HEIGHT = elem.offsetHeight;
                  util.css(elem,{overflow:"hidden"});
              }
              util.css(elem,{
                  height: 0+"px",
                  display: 'block',
                  visibility: ''
              });
          }else {
              this.removeClass(elem.parentNode,'isDown');
          }

          elem.timer = setInterval(function(){

              type=='up'? HEIGHT-=speed : HEIGHT+=speed;
              console.log('slide is going');
              if( (type=="up" && HEIGHT <= 0) || (type=="down" && HEIGHT >= END_HEIGHT) ){
                  clearInterval(elem.timer);
                  if(type=='up') util.css(elem,{display: 'none'});
                  return;
              }
              util.css(elem,{height:HEIGHT+"px"})
          },10);
      }

  };

  function Address(opt){
      var _this = this;
      if(!opt.wrapId || opt.wrapId==""){
          alert("请填写容器id");
          return;
      }else if(!opt.showArr || !util.isArray(opt.showArr)){
          alert("请输入正确的地区选项");
          return;
      }

      this.Opt = {
          wrapId: '',
          showArr: ['provinces','citys','areas'], // 默认显示省市区
          beforeCreat: function(){},
          afterCreat: function(){}
      };
      // 同步参数
      for(var i in this.Opt){
          if(opt[i]) this.Opt[i] = opt[i];
      }

      // 初始化私有参数
      this.elem_contain = document.getElementById(this.Opt.wrapId);

      this.init();


  }
  Address.VERSION = '1.0.0';
  Address.init_uls = {
      init_height:140, //下拉列表初始化高度为140px；
      li_active_class:'active' // 选中的li标签默认className为active
  };


  Address.prototype = {
      constructor: Address,
      init: function(){
          this.Opt.beforeCreat();

          var _this = this;
          var html = "";

          for(var i=0;i<this.Opt.showArr.length;i++){
                  var classN = i==0? '':'address-disabled';
                  html += '<div class="address-position '+classN+'" id="'+this.Opt.showArr[i]+'"><p class="address-btn">请选择</p><ul class="address-lists">';
                  if(i===0) html += this.getTpl(citys);
                  html += '</div>';
          }

          this.elem_contain.innerHTML = html;
          util.addClass(this.elem_contain,"address-contain");
          this.elem_contain.onclick = function(e){
              e = e || window.event;

              var target = e.target;
              if(target === this) return;
              var parent = util.parents(target,"address-position"),
                  parent_id = parent.getAttribute("id"),
                  ul = parent.children[1],
                  tag = target.tagName.toLowerCase();

              switch(tag){
                  case 'p':
                      if( util.hasClass(parent,'address-disabled') ) return;
                      _this.closeUl(parent_id);
                      util.hasClass(parent,'isDown')? util.slide(ul,"up"):util.slide(ul,"down");
                      break;
                  case "li":
                      if(util.hasClass(target,Address.init_uls.li_active_class)) break;
                      _this.renderList(ul,target,parent_id);
                      break;
                  default:

              }
          };

          document.addEventListener("click",function(e){
              e = e || window.event;
              var target = e.target;

              if(util.hasClass(target,"address-position")>0 || util.parents(target,"address-position")) return;
              _this.closeUl();
          },false);

          this.Opt.afterCreat();
      },
      closeUl: function(id){
          var ul_arr = this.elem_contain.querySelectorAll(".address-lists"),
              arr = this.Opt.showArr,
              index = util.indexOf(arr,id);

          for(var i=0;i<arr.length;i++){
              if(i==index) continue;
              util.slide(ul_arr[i],'up');
          }

      },
      renderList: function(ul,li,id){
          var _this = this,
              index = util.indexOf(this.Opt.showArr,id),
              next_ul = null;

          for(var i=0;i<this.Opt.showArr.length;i++){
              if(i>index) this.elem_contain.children[i].children[0].innerText = "请选择";
          }
          ul.parentNode.children[0].innerText = li.innerText;

          for(var j=0;j<ul.children.length;j++){
              util.removeClass(ul.children[j],Address.init_uls.li_active_class);
          }
          // 添加选中类名
          util.addClass(li,Address.init_uls.li_active_class);


          if(index<this.Opt.showArr.length-1){
              index++;
              next_ul = document.getElementById(this.Opt.showArr[index]).getElementsByTagName("ul")[0];
              var obj = citys[li.innerText];
              if(index==2) obj = citys[this.elem_contain.children[0].children[0].innerText][li.innerText];

              next_ul.innerHTML = this.getTpl(obj);
              util.removeClass(next_ul.parentNode,"address-disabled");
          }

          util.slide(ul,'up');

      },
      getTpl: function(o){
          li_html = '';
          if( util.isArray(o) ){
              for(var i=0;i<o.length;i++){
                  li_html += '<li data-value="'+o[i]+'" class="address-list">'+o[i]+'</li>';
              }
          }else {
              for(var prop in o){
                  li_html += '<li data-value="'+prop+'" class="address-list">'+prop+'</li>';
              }
          }

          return li_html;
      }
  };


  var citys= {
          "北京": {
              "北京": [
                  "东城区",
                  "西城区",
                  "崇文区",
                  "宣武区",
                  "朝阳区",
                  "丰台区",
                  "石景山区",
                  "海淀区",
                  "门头沟区",
                  "房山区",
                  "通州区",
                  "顺义区",
                  "昌平区",
                  "大兴区",
                  "平谷区",
                  "怀柔区",
                  "密云县",
                  "延庆县",
                  "其他"
              ]
          },
          "天津": {
              "天津": [
                  "和平区",
                  "河东区",
                  "河西区",
                  "南开区",
                  "河北区",
                  "红挢区",
                  "滨海新区",
                  "东丽区",
                  "西青区",
                  "津南区",
                  "北辰区",
                  "宁河区",
                  "武清区",
                  "静海县",
                  "宝坻区",
                  "蓟县",
                  "塘沽区",
                  "汉沽区",
                  "大港区",
                  "宝坻区",
                  "其他"
              ]
          }
      };


  window.Address = Address;
})();
