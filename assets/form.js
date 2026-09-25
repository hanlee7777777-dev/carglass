
var __inqNoMsgTexts = {ko:"추가로 전달할 사항 없어요", en:"Nothing else to add", "zh-CN":"没有其他需要补充的内容", "zh-TW":"沒有其他需要補充的內容"};
var jhQuickMsgs = {
  ko: "[카글라스 문의]\n문의 양식 작성 없이 빠른 상담을 요청합니다. 사진과 함께 연락 부탁드립니다.",
  en: "[Carglass Inquiry]\nRequesting a quick consultation without filling out the form. I'll send a photo — please get in touch.",
  "zh-CN": "[Carglass咨询]\n未填写咨询表单,请求快速咨询。我会附上照片,请与我联系。",
  "zh-TW": "[Carglass諮詢]\n未填寫諮詢表單,請求快速諮詢。我會附上照片,請與我聯絡。"
};
function jhQuickConsultMsg(){
  // 문자·카톡으로 보내는 문의 내용은 화면 언어와 관계없이 항상 한국어
  return jhQuickMsgs.ko;
}
function __inqMsgToKo(msg){
  for(var k in __inqNoMsgTexts){ if(msg === __inqNoMsgTexts[k]) return __inqNoMsgTexts.ko; }
  return msg;
}
function jhIsQuickChecked(suffix){
  var cb = document.getElementById('inqQuick'+suffix);
  return !!(cb && cb.checked);
}
var __jhQuickSuffixes = ['Main', '', '_1','_2','_3','_4','_5','_6','_7','_8','_9','_10','_11','_13','_14','_16'];
function jhSyncQuick(checked){
  __jhQuickSuffixes.forEach(function(suf){
    var cb = document.getElementById('inqQuick'+suf);
    var wrap = document.getElementById('inqFieldsWrap'+suf);
    if(cb) cb.checked = checked;
    if(wrap) wrap.style.display = checked ? 'none' : 'block';
  });
}
function jhToggleQuick(suffix){
  jhSyncQuick(jhIsQuickChecked(suffix));
}
function jhOpenFormAt(suffix){
  var boxId, btnId;
  if(suffix === 'Main'){ boxId='inqCollapseMain'; btnId='inqToggleBtnMain'; }
  else if(suffix === ''){ boxId='inqCollapseSub'; btnId='inqToggleBtnSub'; }
  else { boxId='inqCollapseSub'+suffix; btnId='inqToggleBtnSub'+suffix; }
  var box = document.getElementById(boxId);
  var btn = document.getElementById(btnId);
  if(box && box.style.display !== 'block' && btn){ btn.click(); }
  setTimeout(function(){
    var target = document.getElementById(btnId) || document.getElementById(boxId);
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  }, 50);
}
var __jhPageSuffixMap = {
  'subPage': '_1', 'subPage2': '_2', 'subPage3': '_3', 'subPage4': '_4', 'subPage5': '_5',
  'subPage6': '_6', 'subPage7': '_7', 'subPage8': '_8', 'subPage9': '_9', 'subPage10': '_10',
  'subPage11': '_11', 'subPage12': '', 'subPage13': '_13', 'subPage14': '_14', 'subPage16': '_16'
};
function jhOpenFormAtCurrent(fallbackHref){
  var ids = ['subPage','subPage2','subPage3','subPage4','subPage5','subPage6','subPage7','subPage8','subPage9','subPage10','subPage11','subPage12','subPage13','subPage14','subPage15','subPage16'];
  var openId = null;
  for(var i=0;i<ids.length;i++){
    var el = document.getElementById(ids[i]);
    if(el && getComputedStyle(el).display !== 'none'){ openId = ids[i]; break; }
  }
  if(!openId){
    jhOpenFormAt('Main');
    return;
  }
  if(!(openId in __jhPageSuffixMap)){
    window.location.href = fallbackHref;
    return;
  }
  jhOpenFormAt(__jhPageSuffixMap[openId]);
}
function __inqNoMsgText(){
  var lang = window.__inqLang || 'ko';
  return __inqNoMsgTexts[lang] || __inqNoMsgTexts.ko;
}
var __inqAlertMsgs = {
  fillAll: {ko:'모든 항목을 입력해주세요.', en:'Please fill in all fields.', "zh-CN":'请填写所有项目。', "zh-TW":'請填寫所有項目。'},
  copied: {ko:'문의 내용이 복사되었습니다.', en:'Inquiry content copied.', "zh-CN":'咨询内容已复制。', "zh-TW":'諮詢內容已複製。'}
};
var __inqAlertOkText = {ko:'확인', en:'OK', "zh-CN":'确定', "zh-TW":'確定'};
function __inqShowAlert(text){
  var lang = window.__inqLang || 'ko';
  var existing = document.getElementById('__inqAlertOverlay');
  if(existing) existing.remove();
  var overlay = document.createElement('div');
  overlay.id = '__inqAlertOverlay';
  overlay.style.cssText = 'display:flex;position:fixed;inset:0;z-index:30000;background:rgba(10,20,35,.55);align-items:center;justify-content:center;padding:20px;';
  var box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:16px;padding:24px 20px;max-width:320px;width:100%;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.2);';
  var p = document.createElement('div');
  p.style.cssText = 'font-size:15px;color:#222;margin-bottom:18px;line-height:1.5;white-space:pre-line;';
  p.textContent = text;
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = __inqAlertOkText[lang] || __inqAlertOkText.ko;
  btn.style.cssText = 'background:#2f6fed;color:#fff;border:none;border-radius:10px;padding:10px 24px;font-size:15px;font-weight:600;cursor:pointer;';
  btn.addEventListener('click', function(){ overlay.remove(); });
  box.appendChild(p); box.appendChild(btn);
  overlay.appendChild(box);
  overlay.addEventListener('click', function(e){ if(e.target===overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}
function __inqAlert(key){
  var lang = window.__inqLang || 'ko';
  var entry = __inqAlertMsgs[key];
  var msg = entry ? (entry[lang] || entry.ko) : key;
  __inqShowAlert(msg);
}
function inqBuildText(){
  if(jhIsQuickChecked('')) return jhQuickConsultMsg();
  var g=function(id){var el=document.getElementById(id);return el?el.value.trim():'';};
  var part=g('inqPart'), area=g('inqArea'), carType=g('inqCarType'), msg=g('inqMsg');
  msg = __inqMsgToKo(msg);
  var lines=['[카글라스 문의]'];
  if(part) lines.push('파손부위: '+part);
  if(area) lines.push('지역: '+area);
  if(carType) lines.push('차종: '+carType);
  if(msg) lines.push('문의내용: '+msg);
  return lines.join('\n');
}
var inqPendingAction = null;
function inqTrySend(action){
  if(!jhIsQuickChecked('')){
    var g=function(id){var el=document.getElementById(id);return el?el.value.trim():'';};
    var part=g('inqPart'), area=g('inqArea'), msg=g('inqMsg');
    if(!part || !area || !msg){
      __inqAlert('fillAll');
      return;
    }
  }
  inqPendingAction = action;
  var overlay = document.getElementById('inqGuideOverlay');
  if(overlay) overlay.style.display='flex';
}
function inqCloseGuide(){
  var overlay = document.getElementById('inqGuideOverlay');
  if(overlay) overlay.style.display='none';
  inqPendingAction = null;
}
function inqConfirmSend(){
  var action = inqPendingAction;
  var overlay = document.getElementById('inqGuideOverlay');
  if(overlay) overlay.style.display='none';
  if(action==='sms') inqSendSMS();
  else if(action==='kakao') inqSendKakao();
  else if(action==='share') inqShare();
  inqPendingAction = null;
}
function inqSendSMS(){
  location.href='sms:01050687232?body='+encodeURIComponent(inqBuildText());
}
function inqSendKakao(){
  var t=inqBuildText();
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).catch(function(){});}
  window.open('https://open.kakao.com/o/sv9FlUDi','_blank');
}
function inqShare(){
  var t=inqBuildText();
  if(navigator.share){navigator.share({text:t}).catch(function(){});}
  else if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t);__inqAlert('copied');}
  else{__inqShowAlert(t);}
}
function inqResetForm(){ inqShowResetConfirm(); }
function inqShowResetConfirm(){
  var overlay = document.getElementById('inqResetConfirmOverlay');
  if(overlay) overlay.style.display = 'flex';
}
function inqCancelResetConfirm(){
  var overlay = document.getElementById('inqResetConfirmOverlay');
  if(overlay) overlay.style.display = 'none';
}
function inqResetAllForms(){
  var overlay = document.getElementById('inqResetConfirmOverlay');
  if(overlay) overlay.style.display = 'none';
  var isEn = window.__inqLang === 'en';
  var suffixes = ['', 'Main', '_1','_2','_3','_4','_5','_6','_7','_8','_9','_10','_11','_13','_14','_16'];
  var phMap = {
    inqArea:{ko:'예: 영등포, 논현동, 마곡동 등 동네명 기입', en:'e.g. Yeongdeungpo, Nonhyeon-dong, Magok-dong, etc.', "zh-CN":'例如:永登浦、论岘洞、麻谷洞等地区名称', "zh-TW":'例如:永登浦、論峴洞、麻谷洞等地區名稱'},
    inqMsg:{ko:'궁금한 점을 자유롭게 남겨주세요', en:'Feel free to leave any questions', "zh-CN":'请随意留下您想了解的问题', "zh-TW":'請隨意留下您想了解的問題'}
  };
  suffixes.forEach(function(suf){
    ['inqPart','inqArea','inqCarType','inqMsg','inqNoMsg','inqQuick'].forEach(function(base){
      var el = document.getElementById(base+suf);
      if(!el) return;
      if(el.type === 'checkbox'){ el.checked = false; }
      else { el.value = ''; }
      if(phMap[base]) el.setAttribute('placeholder', phMap[base][window.__inqLang || 'ko'] || phMap[base].ko);
    });
  });
  jhSyncQuick(false);
  ['inqSaved_phone','inqSaved_part','inqSaved_area','inqSaved_msg'].forEach(function(k){
    try{ localStorage.removeItem(k); }catch(e){}
  });
}
var __inqGenericSuffixes = ['_1','_2','_3','_4','_5','_6','_7','_8','_9','_10','_11','_13','_14','_16'];
function inqStableScrollTo(btn){
  if(!btn) return;
  btn.scrollIntoView({behavior:'auto', block:'start'});
  var cancelled = false;
  var settleTimer = null;
  var hardTimer = null;
  function cancel(){
    cancelled = true;
    ro.disconnect();
    if(settleTimer) clearTimeout(settleTimer);
    if(hardTimer) clearTimeout(hardTimer);
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
    window.removeEventListener('pointerdown', cancel);
  }
  var ro = new ResizeObserver(function(){
    if(cancelled) return;
    if(settleTimer) clearTimeout(settleTimer);
    settleTimer = setTimeout(function(){
      if(cancelled) return;
      ro.disconnect();
      btn.scrollIntoView({behavior:'smooth', block:'start'});
    }, 220);
  });
  ro.observe(document.body);
  hardTimer = setTimeout(function(){
    if(cancelled) return;
    ro.disconnect();
    btn.scrollIntoView({behavior:'smooth', block:'start'});
  }, 2500);
  window.addEventListener('wheel', cancel, {passive:true, once:true});
  window.addEventListener('touchstart', cancel, {passive:true, once:true});
  window.addEventListener('pointerdown', cancel, {passive:true, once:true});
}

var inqPendingActionMap = {};
function inqBuildTextGeneric(suffix){
  if(jhIsQuickChecked(suffix)) return jhQuickConsultMsg();
  var g=function(id){var el=document.getElementById(id+suffix);return el?el.value.trim():'';};
  var part=g('inqPart'), area=g('inqArea'), carType=g('inqCarType'), msg=g('inqMsg');
  msg = __inqMsgToKo(msg);
  var lines=['[카글라스 문의]'];
  if(part) lines.push('파손부위: '+part);
  if(area) lines.push('지역: '+area);
  if(carType) lines.push('차종: '+carType);
  if(msg) lines.push('문의내용: '+msg);
  return lines.join('\n');
}
function inqTryOpenGeneric(suffix, action){
  if(!jhIsQuickChecked(suffix)){
    var g=function(id){var el=document.getElementById(id+suffix);return el?el.value.trim():'';};
    var part=g('inqPart'), area=g('inqArea'), msg=g('inqMsg');
    if(!part || !area || !msg){
      __inqAlert('fillAll');
      return;
    }
  }
  inqPendingActionMap[suffix] = action;
  var overlay = document.getElementById('inqGuideOverlay'+suffix);
  if(overlay) overlay.style.display='flex';
}
function inqCloseGuideGeneric(suffix){
  var overlay = document.getElementById('inqGuideOverlay'+suffix);
  if(overlay) overlay.style.display='none';
  delete inqPendingActionMap[suffix];
}
function inqConfirmSendGeneric(suffix){
  var action = inqPendingActionMap[suffix];
  var overlay = document.getElementById('inqGuideOverlay'+suffix);
  if(overlay) overlay.style.display='none';
  var t = inqBuildTextGeneric(suffix);
  if(action==='sms'){
    location.href='sms:01050687232?body='+encodeURIComponent(t);
  } else if(action==='kakao'){
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).catch(function(){});}
    window.open('https://open.kakao.com/o/sv9FlUDi','_blank');
  } else if(action==='share'){
    if(navigator.share){navigator.share({text:t}).catch(function(){});}
    else if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t);__inqAlert('copied');}
    else{__inqShowAlert(t);}
  }
  delete inqPendingActionMap[suffix];
}
function inqToggleFormGeneric(suffix){
  var box = document.getElementById('inqCollapseSub'+suffix);
  var btn = document.getElementById('inqToggleBtnSub'+suffix);
  if(!box) return;
  var isOpen = box.style.display === 'block';
  box.style.display = isOpen ? 'none' : 'block';
  if(btn){
    var span = btn.querySelector('span');
    if(span){
      var __tt = {ko:['간편 문의 바로가기','간편 문의 바로가기 - 닫기'], en:['Quick Inquiry','Quick Inquiry - Close'], "zh-CN":['直达简便咨询','直达简便咨询 - 关闭'], "zh-TW":['直達簡便諮詢','直達簡便諮詢 - 關閉']}[window.__inqLang || 'ko'] || ['간편 문의 바로가기','간편 문의 바로가기 - 닫기'];
      span.textContent = isOpen ? __tt[0] : __tt[1];
    }
  }
}
function inqOpenFormFromFooter(e){
  if(e && e.preventDefault) e.preventDefault();
  var ids = ['subPage','subPage2','subPage3','subPage4','subPage5','subPage6','subPage7','subPage8','subPage9','subPage10','subPage11','subPage12','subPage13','subPage14','subPage16'];
  var openId = null;
  for(var i=0;i<ids.length;i++){
    var el = document.getElementById(ids[i]);
    if(el && (getComputedStyle(el).display !== 'none')){ openId = ids[i]; break; }
  }
  var tag, hash;
  if(!openId){
    tag = 'main'; hash = '';
  } else if(openId === 'subPage'){
    tag = 'sub1'; hash = '#sub1';
  } else {
    var n = openId.replace('subPage','');
    tag = 'sub' + n; hash = '#sub' + n;
  }
  var base = location.href.split('#')[0].split('?')[0];
  window.open(base + '?inqOpen=' + tag + hash, '_blank');
}
function inqAutoOpenFromHash(){
  var m = location.search.match(/[?&]inqOpen=([a-zA-Z0-9]+)/);
  if(!m) return;
  var tag = m[1];
  var btnId, collapseId;
  if(tag === 'main'){
    btnId = 'inqToggleBtnMain'; collapseId = 'inqCollapseMain';
  } else if(tag === 'sub12'){
    btnId = 'inqToggleBtnSub'; collapseId = 'inqCollapseSub';
  } else if(/^sub\d+$/.test(tag)){
    var n = tag.replace('sub','');
    btnId = 'inqToggleBtnSub_' + n; collapseId = 'inqCollapseSub_' + n;
  } else { return; }
  setTimeout(function(){
    var collapse = document.getElementById(collapseId);
    var btn = document.getElementById(btnId);
    if(collapse && collapse.style.display !== 'block' && btn){ btn.click(); }
    else if(collapse){ collapse.style.display='block'; }

  }, 600);
}
if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', inqAutoOpenFromHash); }
else { inqAutoOpenFromHash(); }
function inqResetFormGeneric(suffix){ inqShowResetConfirm(); }
function inqBuildTextMain(){
  if(jhIsQuickChecked('Main')) return jhQuickConsultMsg();
  var g=function(id){var el=document.getElementById(id);return el?el.value.trim():'';};
  var part=g('inqPartMain'), area=g('inqAreaMain'), carType=g('inqCarTypeMain'), msg=g('inqMsgMain');
  msg = __inqMsgToKo(msg);
  var lines=['[카글라스 문의]'];
  if(part) lines.push('파손부위: '+part);
  if(area) lines.push('지역: '+area);
  if(carType) lines.push('차종: '+carType);
  if(msg) lines.push('문의내용: '+msg);
  return lines.join('\n');
}
var inqPendingActionMain = null;
function inqTrySendMain(action){
  if(!jhIsQuickChecked('Main')){
    var g=function(id){var el=document.getElementById(id);return el?el.value.trim():'';};
    var part=g('inqPartMain'), area=g('inqAreaMain'), msg=g('inqMsgMain');
    if(!part || !area || !msg){
      __inqAlert('fillAll');
      return;
    }
  }
  inqPendingActionMain = action;
  var overlay = document.getElementById('inqGuideOverlayMain');
  if(overlay) overlay.style.display='flex';
}
function inqCloseGuideMain(){
  var overlay = document.getElementById('inqGuideOverlayMain');
  if(overlay) overlay.style.display='none';
  inqPendingActionMain = null;
}
function inqConfirmSendMain(){
  var action = inqPendingActionMain;
  var overlay = document.getElementById('inqGuideOverlayMain');
  if(overlay) overlay.style.display='none';
  if(action==='sms') inqSendSMSMain();
  else if(action==='kakao') inqSendKakaoMain();
  else if(action==='share') inqShareMain();
  inqPendingActionMain = null;
}
function inqSendSMSMain(){
  location.href='sms:01050687232?body='+encodeURIComponent(inqBuildTextMain());
}
function inqSendKakaoMain(){
  var t=inqBuildTextMain();
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).catch(function(){});}
  window.open('https://open.kakao.com/o/sv9FlUDi','_blank');
}
function inqShareMain(){
  var t=inqBuildTextMain();
  if(navigator.share){navigator.share({text:t}).catch(function(){});}
  else if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t);__inqAlert('copied');}
  else{__inqShowAlert(t);}
}
function inqToggleFormMain(){
  var box = document.getElementById('inqCollapseMain');
  var arrow = document.getElementById('inqToggleArrowMain');
  var btn = document.getElementById('inqToggleBtnMain');
  if(!box) return;
  var isOpen = box.style.display === 'block';
  box.style.display = isOpen ? 'none' : 'block';
  if(arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  if(btn){
    var span = btn.querySelector('span');
    if(span){
      var __tt = {ko:['간편 문의 바로가기','간편 문의 바로가기 - 닫기'], en:['Quick Inquiry','Quick Inquiry - Close'], "zh-CN":['直达简便咨询','直达简便咨询 - 关闭'], "zh-TW":['直達簡便諮詢','直達簡便諮詢 - 關閉']}[window.__inqLang || 'ko'] || ['간편 문의 바로가기','간편 문의 바로가기 - 닫기'];
      span.textContent = isOpen ? __tt[0] : __tt[1];
    }
  }
}
function inqToggleFormSub(){
  var box = document.getElementById('inqCollapseSub');
  var btn = document.getElementById('inqToggleBtnSub');
  if(!box) return;
  var isOpen = box.style.display === 'block';
  box.style.display = isOpen ? 'none' : 'block';
  if(btn){
    var span = btn.querySelector('span');
    if(span){
      var __tt = {ko:['간편 문의 바로가기','간편 문의 바로가기 - 닫기'], en:['Quick Inquiry','Quick Inquiry - Close'], "zh-CN":['直达简便咨询','直达简便咨询 - 关闭'], "zh-TW":['直達簡便諮詢','直達簡便諮詢 - 關閉']}[window.__inqLang || 'ko'] || ['간편 문의 바로가기','간편 문의 바로가기 - 닫기'];
      span.textContent = isOpen ? __tt[0] : __tt[1];
    }
  }
}
(function(){
  function initInqPlaceholders(){
    var ids = ['inqFormCard', 'inqFormCardMain'];
    ['_1','_2','_3','_4','_5','_6','_7','_8','_9','_10','_11','_13','_14','_16'].forEach(function(suf){ ids.push('inqFormCard'+suf); });
    var forms = ids.map(function(id){ return document.getElementById(id); });
    forms.forEach(function(form){
      if(!form) return;
      var fields = form.querySelectorAll('input,textarea');
      fields.forEach(function(el){
        var ph = el.getAttribute('placeholder');
        if(ph) el.setAttribute('data-ph', ph);
        el.addEventListener('focus', function(){ el.setAttribute('placeholder',''); });
        el.addEventListener('blur', function(){ if(!el.value){ el.setAttribute('placeholder', el.getAttribute('data-ph')||''); } });
      });
    });
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', initInqPlaceholders); }
  else { initInqPlaceholders(); }
})();
(function(){
  var STORAGE_PREFIX = 'inqSaved_';
  var fieldMap = {
            inqPart:'part', inqPartMain:'part',
    inqArea:'area', inqAreaMain:'area',
    inqMsg:'msg', inqMsgMain:'msg'
  };
  ['_1','_2','_3','_4','_5','_6','_7','_8','_9','_10','_11','_13','_14','_16'].forEach(function(suf){
    fieldMap['inqPart'+suf] = 'part';
    fieldMap['inqArea'+suf] = 'area';
    fieldMap['inqMsg'+suf] = 'msg';
  });
  function restoreInqFields(){
    Object.keys(fieldMap).forEach(function(id){
      var el = document.getElementById(id);
      if(!el) return;
      var saved = null;
      try{ saved = localStorage.getItem(STORAGE_PREFIX + fieldMap[id]); }catch(e){}
      if(saved){
        el.value = saved;
        if(el.tagName === 'TEXTAREA' || el.tagName === 'INPUT'){ el.setAttribute('placeholder',''); }
      }
    });
  }
  function syncAllForms(fieldKey, value){
    Object.keys(fieldMap).forEach(function(id){
      if(fieldMap[id] !== fieldKey) return;
      var el = document.getElementById(id);
      if(!el || document.activeElement === el) return;
      if(el.value !== value){
        el.value = value;
        if(value && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')){ el.setAttribute('placeholder',''); }
      }
    });
  }
  window.__inqSyncAllForms = syncAllForms;
  function bindInqSave(){
    Object.keys(fieldMap).forEach(function(id){
      var el = document.getElementById(id);
      if(!el) return;
      var save = function(){
        var key = fieldMap[id];
        try{ localStorage.setItem(STORAGE_PREFIX + key, el.value); }catch(e){}
        syncAllForms(key, el.value);
      };
      el.addEventListener('input', save);
      el.addEventListener('change', save);
    });
  }
  function initInqPersist(){ restoreInqFields(); bindInqSave(); }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', initInqPersist); }
  else { initInqPersist(); }
})();
