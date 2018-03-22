(function(jQuery) {
  'use strict';
  var jq = jQuery.noConflict();

   /**************************************************************************
   * Message Service
   * @type {Object}
   * @date 2015-06
   */
  var MessageService = {
      init: function() {
          if (jq('.ui-message').length == 0) {
              jq('body').append('<div class="ui-message"><p></p></div>');
          }
      },
      show: function(message) {
          if (typeof message == 'object') {
              for (var i in message) {
                  message = message[i];
                  break;
              }
          }
          var self = this;
          self.init();
          var messageBox = jq('.ui-message');
          messageBox.find('p').text(message);
          var pos = {
              w: messageBox.width() / 2,
              h: messageBox.height() / 2 + 150
          };
          messageBox.css({
              'margin-left': '-' + pos.w + 'px',
              'margin-top': '-' + pos.h + 'px'
          });
          messageBox.stop(true, false).fadeIn().delay(3000).fadeOut();
      }
  };

  /**************************************************************************
   * Cookie Service
   * @type {Object}
   * @date 2015-06
   */
  var CookieService = {
      setCookie: function(name, value) {
          var exp = new Date();
          exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
          document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      },
      getCookie: function(name) {
          var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
          if (arr !== null) return unescape(arr[2]);
          return null;
      },
      delCookie: function(name) {
          var self = this,
              exp = new Date();
          exp.setTime(exp.getTime() - 1);
          var cval = self.getCookie(name);
          if (cval !== null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
      }
  };

  /**************************************************************************
   * Account Service
   * @type {Object}
   * @date 2015-06
   */
  var AccountService = {
      // 激活弹窗
      showPopupDialog: function(target) {
          var dialog = jq(target),
              marginTop = '-' + (dialog.height() / 2) + 'px',
              marginLeft = '-' + dialog.width() / 2 + 'px';
          dialog.css({
              'margin-left': marginLeft,
              'margin-top': marginTop
          });
          jq('.ui-dialog-mask').show();
          dialog.show();
      },
      // 关闭遮障弹窗
      closePopupDialog: function() {
          jq('.ui-dialog-popup').hide();
          jq('.ui-dialog-mask').hide();
      },
      // 忘记密码/返回登陆面板切换
      forgetPassword: function(target, action) {
          // var target = jq(target);
          if (action) {
              jq('.content-discuz-login').addClass('content-discuz-forgetpwd');
              jq('.form-discuz-login').hide();
              jq('.form-discuz-forgetpwd').show();
          } else {
              jq('.form-discuz-login').show();
              jq('.form-discuz-forgetpwd').hide();
              jq('.content-discuz-login').removeClass('content-discuz-forgetpwd');
          }
      },
      // 绑定账户
      bindAccount: function(obj, type) {
          var self = this;

          jq.ajax({
              url: '/member.php?mod=bind&action=bindUserMap',
              dataType: 'json',
              type: 'post',
              data: obj,
              success: function(msg) {
                  if (msg.code == 0) {
                      if (window.location.href.indexOf('from=')) {
                          var url = window.location.href.match(/from\=(.*)$/i)[1];
                          window.location.href = decodeURIComponent(url);
                      } else {
                          self.redirectIndex();
                      }


                      // if (jq('.content-bbs-register').length > 0 && jq('.content-bbs-register').is('.active')) {
                      //     self.redirectIndex();
                      // } else {
                      //     self.showPopupDialog('.dialog-transfer-success');
                      // }
                  } else {
                      MessageService.show(msg.message);
                  }
              },
              error: function(error) {
                  console && console.log('error:', error);
              }
          });
      },
      // 前端对BBS用户名做一下简单的校验
      checkBBSNameFormat: function(name) {
          if (name.replace(/[\u4e00-\u9fa5]/g, '**').length > 30) {
              MessageService.show('用户名过长');
              return false
          } else if (name.replace(/[\u4e00-\u9fa5]/g, '**').length < 3) {
              MessageService.show('用户名过短');
              return false
          } else if (name.match(/((?=[\x21-\x7e]+)[^A-Za-z0-9])/g)) {
              // 包含特殊字符
              MessageService.show('用户名不能含有特殊字符');
              return false
          }
          return true
      },
      // 检查用户名是否已注册
      checkBBSName: function(name) {
          if (!this.checkBBSNameFormat(name)) {
              return
          }
          var self = this;
          var obj = {};
          obj.username = name;
          obj.flag = 1;
          jq.ajax({
              url: '/member.php?mod=bind&action=checkUsername',
              dataType: 'json',
              type: 'post',
              data: obj,
              success: function(msg) {
                  if (msg.code == 0) {
                      self.bindAccount(obj, 'cloud2bbs');
                  } else {
                      MessageService.show(msg.message);
                  }
              },
              error: function(error) {
                  console && console.log('error:', error);
              }
          });
      },
      redirect: function() {
          if (!window.location.origin) {
              window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
          }
          var refererUrl = window.location.origin;

          if (document.location.search.indexOf('referer') >= 0) {
              var params = document.location.search.substr(1).split('&') || [];
              for (var i = 0; i < params.length; i++) {
                  var kv = params[i].split('=');
                  if (kv[0] === 'referer') {
                      refererUrl = decodeURIComponent(kv[1]);
                  }
              }
          } else if (jq('input[name="referer"]').length > 0) {
              var tmpUrl = jq('input[name="referer"]').attr('value');
              refererUrl = (tmpUrl && tmpUrl.length > 0) ? tmpUrl : refererUrl;
          }

          location.href = refererUrl;
      },
      redirectIndex: function() {
          if (!window.location.origin) {
              window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
          }
          document.location.href = window.location.origin;
      },
      showError: function(target, msg) {
          jq(target).find('span.error').text(msg).show();
      },
      updateCaptcha: function(callback) {
          var timespam = +new Date();
          if (jq('.input-captcha-code').length > 0) {
              jq('.input-captcha-code').find('img').attr('src', 'bind.php?mod=verifyCode&' + timespam);
              jq('.input-captcha-code').show();
          }
      }
  };


  /**************************************************************************
   * login message handler
   * @type {function}
   * @date 2015-06
   */
  var messageHandler = function(event) {
      var originalEvent = event.originalEvent;
      // console.log('originalEvent: ', originalEvent); /////////////////
      if (originalEvent.data == 'isLoggedIn') {
          // 绑定欢喜云账户
          if (jq('.content-cloud-login').length > 0 || jq('.content-cloud-register').length > 0) {
              AccountService.bindAccount({}, 'bbs2cloud');
          } else {
              AccountService.redirect();
          }
      }

      // 注册欢喜云账号
      if (originalEvent.data == 'isRegistered') {
          if (jq('.content-cloud-register').length > 0) {
              AccountService.bindAccount({}, 'bbs2cloud');
          }
      }

      if (originalEvent.data == 'dialogClose') {
          // 关闭对话框
          // close();
      }

      // 登陆页滑出验证码栏
      if (originalEvent.data == 'showSlideDown') {
          if (jq('.content-login').length > 0) {
              jq('.content-login').addClass('authcode');
          }
          if (jq('.content-cloud-login').length > 0 && jq('.content-cloud-login').is('.active')) {
              jq('.content-cloud-login').addClass('authcode');
          }
          if (jq('.content-cloud-register').length > 0 && jq('.content-cloud-register').is('.active')) {
              jq('.content-cloud-register').addClass('authcode');
          }
      }
  };

  jq(window).on('message', messageHandler);

  /**************************************************************************
   * 迁移相关事件
   * @type {function}
   * @date 2015-06
   */
  // 忘记密码页
  jq(document).on('click', '.ui-form .btn-forgetPwd', function(event) {
      event.stopPropagation();
      event.preventDefault();
      AccountService.forgetPassword(event.target, true);
  });

  // 忘记密码页返回登录页
  jq(document).on('click', '.ui-form .btn-undo-forgetPwd', function(event) {
      event.stopPropagation();
      event.preventDefault();
      AccountService.forgetPassword(event.target, false);
  });

  // 关闭迁移通知弹窗
  jq(document).on('click', '.dialog-transfer-login', function(event) {
      event.stopPropagation();
      event.preventDefault();
      AccountService.closePopupDialog();
      AccountService.redirectIndex();
  });

  // 清除迁移页输入框 错误提示
  jq(document).on('keydown', '.content-bbs-login input, .content-bbs-register input', function(event) {
      if (jq('.ui-form-input-name').length > 0) {
          jq('.ui-form-input-name').find('.error').hide();
      }
      var error = jq(event.target).siblings('.error');
      if (error.length > 0 && error.is(':visible')) {
          error.hide();
      }
  });

  // 云登录后，绑定论坛账号
  jq(document).on('click', '.js-bind-bbs', function(event) {
      event.stopPropagation();
      event.preventDefault();
      var wrapper = jq(event.target).closest('.content-bbs-login');
      var obj = {};
      obj.username = wrapper.find('.input-username').val();
      obj.password = wrapper.find('.input-password').val();
      obj.verifycode = wrapper.find('.input-captcha').val();
      obj.questionid = wrapper.find('.input-question').val();
      if (obj.questionid != '0') {
          obj.answer = wrapper.find('.input-answer').val();
      }
      // 验证表单
      if (obj.username.length === 0 || obj.password.length === 0 || obj.verifycode.length === 0) {
          if (obj.username.length === 0) {
              MessageService.show('请输入用户名/邮箱');
              return false;
          }
          if (obj.password.length === 0) {
              MessageService.show('请输入密码');
              return false;
          }
          if (obj.verifycode.length === 0) {
              MessageService.show('请输入验证码');
              return false;
          }
      } else {
          if (obj.questionid != '0' && obj.answer.length === 0) {
              MessageService.show('请输入答案');
              return false;
          } else {
              obj.flag = 0;
              AccountService.bindAccount(obj, 'cloud2bbs');
          }
      }
  });

  // 检测用户名
  jq(document).on('click', '.js-check-username', function(event) {
      event.stopPropagation();
      event.preventDefault();
      var username = jq(event.target).closest('.content-bbs-register').find('.input-check-username').val();
      if (username && username.length > 0) {
          AccountService.checkBBSName(username);
      } else {
          MessageService.show('请输入用户名');
      }
  });

  jq(document).on('click', '.user-jump-index', function(event) {
      event.stopPropagation();
      event.preventDefault();
      CookieService.setCookie('JUMP_NO_BIND', 1);
      AccountService.redirectIndex();
  });

  /**************************************************************************
   * 显示/隐藏 用户信息弹窗
   * @type {function}
   * @date 2015-06
   */
  var userpanelTimeout;
  jq(document).on('click', '.ui-login-toggle', function(event) {
      clearTimeout(userpanelTimeout);
      jq('.ui-login-status').stop(true, true).show();
  });
  jq(document).on('userpanelTimeout', '.ui-login-toggle, .ui-login-status', function(event) {
      clearTimeout(userpanelTimeout);
      jq('.ui-login-status').stop(true, true).show();
  });
  jq(document).on('mouseover', '.ui-login-toggle, .ui-login-status', function(event) {
      clearTimeout(userpanelTimeout);
      jq('.ui-login-status').stop(true, true).show();
  });
  jq(document).on('mouseleave', '.ui-login-status', function(event) {

    userpanelTimeout =  setTimeout(function() {
          jq('.ui-login-status').stop(true, true).hide();
      }, 500);
  });

  /**************************************************************************
   * 登陆面板切换
   * @type {function}
   * @date 2015-06
   */
  jq(document).on('click', '.ui-dialog .tabs li', function(event) {
      event.stopPropagation();
      event.preventDefault();
      var target = jq(event.target),
          dialog = target.closest('.ui-dialog');
      var index = dialog.find('.tabs li').index(target);

      // 重置iframe
      var iframe = dialog.find('.content').eq(index).find('iframe');

      dialog.find('.tabs li').removeClass('active').eq(index).addClass('active');
      dialog.find('.content').removeClass('active').eq(index).addClass('active');

      // firefox 会跳过display:none中的元素，导致被隐藏的第二个面板空白
      if (iframe.length > 0 && iframe.attr('src').length === 0) {
          var newSrc = iframe.attr('target');
          iframe.attr('src', newSrc);
      }

      // 切换云登陆后绑定bbs的文案
      if (jq('.content-bbs-register').length > 0) {
          var wrapper = jq('.transfer-bbs-wrapper').find('.info-wrapper');
          jq('.content-bbs-register').is('.active') ? wrapper.addClass('info-bbs-wrapper') : wrapper.removeClass('info-bbs-wrapper');
      }

  });

  /**************************************************************************
   * captcha
   * @type {function}
   * @date 2015-06
   */
  jq(document).on('click', '.rfm-captcha', function(event) {
      event.stopPropagation();
      event.preventDefault();
      var target = jq(event.currentTarget);
      target.find('.input[type="text"]').focus();
      // target.find('.input-captcha-panel').show();
  });

  jq(document).on('click', '.input-captcha-code img', function(event) {
      AccountService.updateCaptcha();
  });
  // clear captcha
  // jq(document).mouseup(function(event) {
  //     var container = jq('.input-captcha-panel');
  //
  //     if (!container.is(event.target) // if the target of the click isn't the container...
  //         && container.has(event.target).length === 0) // ... nor a descendant of the container
  //     {
  //         container.hide();
  //     }
  // });

  /**************************************************************************
   * placeholder
   * @type {function}
   * @date 2015-06
   */
  jq(document).on('click', '.ui-form-control .input-tips', function(event) {
      if (jq(event.currentTarget).siblings('input').length > 0) {
          var target = jq(event.currentTarget);
          target.siblings('input').focus();
      }
  });

  jq(document).on('change', 'input', function(event) {
      var target = jq(event.currentTarget);
      if (target.val().length > 0 && target.siblings('.input-tips').length > 0) {
          target.siblings('.input-tips').hide();
      }
  });

  jq(document).on('keydown', 'input[type="text"], input[type="password"]', function(event) {
      var target = jq(event.currentTarget);
      if (target.siblings('.input-tips').length > 0) {
          target.siblings('.input-tips').hide();
      }
  });

  jq(document).on('focusin focusout', 'input[type="text"], input[type="password"]', function(event) {
      var target = jq(event.currentTarget);
      if (event.type === 'focusin') {
          // highlight
          target.closest('.rfm').addClass('on').siblings('.rfm').removeClass('on');
      } else if (event.type === 'focusout') {
          // undo highlight
          target.parents('.rfm').removeClass('on');
          if (target.siblings('.input-tips').length > 0) {
              if (target.val().length === 0) {
                  target.siblings('.input-tips').show();
              } else {
                  target.siblings('.input-tips').hide();
              }
          }

      }
  });


  // 初始化消息提示窗
  jq(document).ready(function() {
      MessageService.init();
  })

}(window.jQuery));
