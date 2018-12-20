//  validate依赖layer.js插件
function validateName(conf) {
  var ele = document.querySelector(conf.ele);
  var val = ele.value.trim(); //添加.trim 去除前后空格
  var is_CN = /[\u0000-\u00FF]/.test(val);
  if (conf.require && val === "") {
    layer.open({
      content: conf.requireMessage,
      skin: 'msg',
      time: 2
    });
    return;
  }
  if (conf.isCN && is_CN && val !== "") {
    layer.open({
      content: "请输入汉字",
      skin: 'msg',
      time: 2
    });
    return;
  }
  if (val.length > conf.maxLength) {
    layer.open({
      content: conf.maxLengthMsg,
      skin: 'msg',
      time: 2
    });
    return;
  }
  if (val.length < conf.minLength) {
    layer.open({
      content: conf.minLengthMsg,
      skin: 'msg',
      time: 2
    });
    return;
  }
  return true;
}

function validateBirth(conf) {
  var ele = document.querySelector(conf.ele);
  var val = ele.value;
  if (conf.require && val === '') {
    layer.open({
      content: conf.requireMessage,
      skin: 'msg',
      time: 2
    });
    return;
  }
  return true;
}

function validateEmail(conf) {
  var ele = document.querySelector(conf.ele);
  var val = ele.value;
  var emailReg = /^([a-zA-Z0-9_-])+\.?([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z]{2,5})$/;
  var is_email = emailReg.test(val);
  if (conf.require && val === "") {
    layer.open({
      content: '邮箱地址不可为空',
      skin: 'msg',
      time: 2
    });
    return;
  }
  if (!is_email) {
    layer.open({
      content: "请输入正确的邮箱地址",
      skin: 'msg',
      time: 2
    });
    return;
  }
  return true;
}

function validateMobPhone(conf) {
  var ele = document.querySelector(conf.ele);
  var val = ele.value;
  var mobReg = /^1[0-9]{10}$/;
  var is_mob = mobReg.test(val);
  if (conf.require && val === "") {
    layer.open({
      content: '手机号不可为空',
      skin: 'msg',
      time: 2
    });
    return;
  }
  if (!is_mob) {
    layer.open({
      content: "请输入正确的手机号",
      skin: 'msg',
      time: 2
    });
    return;
  }
  return true;
}

function validateRadio(conf) {
  var ele = document.querySelectorAll('[name='+ conf.name +']:checked');
  if(conf.require && ele.length === 0) {
    layer.open({
      content: "请选择您的性别",
      skin: 'msg',
      time: 2
    });
    return;
  }
  return true;
}

function validate(form) {
  return function (opt) {
    var step_result = true;
    for (var i = 0; i < opt.length; i++) {
      if (step_result) {
        switch (opt[i].type) {
          case 'stringCN':
            step_result = step_result && validateName(opt[i]);
            break;
          case 'string':
            step_result = step_result && validateBirth(opt[i]);
            break;
          case 'email':
            step_result = step_result && validateEmail(opt[i]);
            break;
          case 'mobPhone':
            step_result = step_result && validateMobPhone(opt[i]);
            break;
          case 'radio':
            step_result = step_result && validateRadio(opt[i]);
        }
      } else {
        break;
      }
    }
    return step_result;
  }
}