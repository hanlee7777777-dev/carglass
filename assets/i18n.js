
(function(){
  var koTitle = document.title;

  var nodes = null;
  function collect(){
    nodes = [];
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        if(!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        while(p){
          var t = p.nodeName;
          if(t === "SCRIPT" || t === "STYLE") return NodeFilter.FILTER_REJECT;
          if(p.id === "langMenu" || p.id === "langBtn") return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while((n = w.nextNode())) nodes.push({node:n, ko:n.nodeValue});
  }
  var __LANG_DICTS = {};
  var __LANG_LOADING = {};
  var __LANG_SEQ = 0;
  function __loadDict(lang, cb){
    if(__LANG_DICTS[lang]){ cb(__LANG_DICTS[lang]); return; }
    if(!__LANG_LOADING[lang]){
      __LANG_LOADING[lang] = fetch("/i18n/" + lang + ".json?v=20260925").then(function(r){ return r.json(); })
        .then(function(d){ __LANG_DICTS[lang] = d; return d; })
        .catch(function(){ __LANG_LOADING[lang] = null; return null; });
    }
    __LANG_LOADING[lang].then(function(d){ cb(d); });
  }
  var __LANG_TITLES = window.__PAGE_TITLES || { "en": "Carglass Windshield Repair", "zh-CN": "Carglass汽车玻璃修复", "zh-TW": "Carglass汽車玻璃修復" };
  var __LANG_HTMLLANG = { "ko": "ko", "en": "en", "zh-CN": "zh-CN", "zh-TW": "zh-TW" };
  function __applyWith(lang, activeDict){
    for(var i=0;i<nodes.length;i++){
      var item = nodes[i];
      if(lang === "ko" || !activeDict){ item.node.nodeValue = item.ko; continue; }
      var key = item.ko.trim();
      if(activeDict[key]){
        item.node.nodeValue = item.ko.replace(key, activeDict[key]);
      } else {
        item.node.nodeValue = item.ko;
      }
    }
    document.documentElement.lang = __LANG_HTMLLANG[lang] || "ko";
    document.title = (lang === "ko") ? koTitle : (__LANG_TITLES[lang] || koTitle);
  }
  window.__applyLang = function(lang){
    if(!nodes) collect();
    var seq = ++__LANG_SEQ;
    if(lang === "ko"){ __applyWith("ko", null); return; }
    __loadDict(lang, function(d){ if(seq !== __LANG_SEQ) return; __applyWith(d ? lang : "ko", d); });
  };
  var __inqPHTexts = {
    area: {ko:"예: 영등포, 논현동, 마곡동 등 동네명 기입", en:"e.g. Yeongdeungpo, Nonhyeon-dong, Magok-dong, etc.", "zh-CN":"例如:永登浦、论岘洞、麻谷洞等地区名称", "zh-TW":"例如:永登浦、論峴洞、麻谷洞等地區名稱"},
    msg: {ko:"궁금한 점을 자유롭게 남겨주세요", en:"Feel free to leave any questions", "zh-CN":"请随意留下您想了解的问题", "zh-TW":"請隨意留下您想了解的問題"}
  };
  var __inqPH = { inqArea: __inqPHTexts.area, inqMsg: __inqPHTexts.msg, inqAreaMain: __inqPHTexts.area, inqMsgMain: __inqPHTexts.msg };
  ['_1','_2','_3','_4','_5','_6','_7','_8','_9','_10','_11','_13','_14','_16'].forEach(function(suf){
    __inqPH['inqArea'+suf] = __inqPHTexts.area;
    __inqPH['inqMsg'+suf] = __inqPHTexts.msg;
  });
  var __inqToggleTexts = {
    ko: { closed: "간편 문의 바로가기", open: "간편 문의 바로가기 - 닫기" },
    en: { closed: "Quick Inquiry", open: "Quick Inquiry - Close" },
    "zh-CN": { closed: "直达简便咨询", open: "直达简便咨询 - 关闭" },
    "zh-TW": { closed: "直達簡便諮詢", open: "直達簡便諮詢 - 關閉" }
  };
  var __inqBaseApplyLang = window.__applyLang;
  window.__applyLang = function(lang){
    __inqBaseApplyLang(lang);
    window.__inqLang = (lang === "zh-CN" || lang === "zh-TW") ? lang : ((lang === "ko") ? "ko" : "en");
    for(var k in __inqPH){
      var el = document.getElementById(k);
      if(el) el.setAttribute("placeholder", __inqPH[k][window.__inqLang] || __inqPH[k].en);
    }
    var toggleTexts = __inqToggleTexts[window.__inqLang] || __inqToggleTexts.en;
    var closedText = toggleTexts.closed;
    var openText = toggleTexts.open;
    document.querySelectorAll('[id^="inqToggleBtnSub"], #inqToggleBtnMain').forEach(function(btn){
      var idBase = btn.id.replace('inqToggleBtnSub','inqCollapseSub').replace('inqToggleBtnMain','inqCollapseMain');
      var collapse = document.getElementById(idBase);
      var span = btn.querySelector('span');
      if(!span || !collapse) return;
      span.textContent = (collapse.style.display === 'block') ? openText : closedText;
    });
  };
  function __restoreSavedLang(){
    try{
      var savedLang = localStorage.getItem("siteLang");
      if(savedLang && savedLang !== "ko"){
        window.__applyLang(savedLang);
        var curFlag = document.getElementById("langCurrentFlag");
        var savedOpt = document.querySelector('.langOpt[data-lang="'+savedLang+'"]');
        if(curFlag && savedOpt){
          var savedImg = savedOpt.querySelector('img');
          var savedEmoji = savedOpt.querySelector('.flag-emoji');
          if(savedImg){
            curFlag.style.display = '';
            curFlag.src = savedImg.src;
            curFlag.style.border = "none";
          } else if(savedEmoji){
            curFlag.style.display = 'none';
            curFlag.insertAdjacentElement('afterend', (function(){
              var span = document.createElement('span');
              span.textContent = savedEmoji.textContent;
              span.style.fontSize = '20px';
              span.className = 'langBtnFlagText';
              return span;
            })());
          }
        }
      }
    }catch(e){}
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', __restoreSavedLang);
  } else {
    __restoreSavedLang();
  }
})();
