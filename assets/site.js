/* Sapar Staffing - employer request form and copy buttons (index.html). */
(function(){
  var form=document.getElementById('apply-form');
  if(!form)return;
  var status=document.getElementById('form-status'), btn=document.getElementById('submit-btn');
  // The form is only delivered on the real site (Netlify Forms); anywhere else it shows a preview note.
  var live=/(^|\.)saparstaffing\.com$|netlify\.app$/.test(location.hostname);

  var other=document.getElementById('role-other'), otherWrap=document.getElementById('other-wrap'), otherInput=document.getElementById('other-roles');
  other.addEventListener('change',function(){
    otherWrap.hidden=!other.checked;
    otherInput.required=other.checked;
    if(other.checked)otherInput.focus();
  });

  var housing=document.getElementById('housing'), hf=document.querySelectorAll('.hfield');
  housing.addEventListener('change',function(){
    var on=housing.value.indexOf('Yes')===0;
    hf.forEach(function(d){
      d.hidden=!on;
      d.querySelectorAll('input,select').forEach(function(i){i.required=on;});
    });
  });

  function show(msg,ok){
    status.textContent=msg;
    status.className='status '+(ok?'ok':'err');
    status.hidden=false;
    status.scrollIntoView({block:'nearest',behavior:'smooth'});
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    var bad=form.querySelector('input:invalid,select:invalid,textarea:invalid');
    if(bad){
      var lb=bad.id?form.querySelector('label[for="'+bad.id+'"]'):null;
      var nm=lb?lb.textContent:(bad.name==='tipped'?'Tipped position?':bad.name==='overtime'?'Overtime available?':'a required field');
      show('Please fill in: '+nm.trim(),false);
      bad.focus();
      return;
    }
    if(!live){
      show('Preview only: on saparstaffing.com this request is sent to saparali@saparstaffing.com, then the visitor sees the thank-you page.',true);
      return;
    }
    btn.disabled=true;btn.textContent='Sending…';
    var data=new URLSearchParams(new FormData(form)).toString();
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:data})
      .then(function(r){if(!r.ok)throw 0;location.href='thank-you.html';})
      .catch(function(){show('The request did not go through. Please email saparali@saparstaffing.com instead.',false);})
      .then(function(){btn.disabled=false;btn.textContent='Send request';});
  });
})();

document.querySelectorAll('.copy').forEach(function(b){
  b.addEventListener('click',function(){
    var el=document.getElementById(b.dataset.copy), t=el.textContent.trim();
    var flash=function(msg){b.textContent=msg;clearTimeout(b._t);b._t=setTimeout(function(){b.textContent='Copy'},1600)};
    var done=function(){flash('Copied')};
    // If the clipboard is blocked, select the text so the visitor can copy it by hand.
    var sel=function(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);flash('Selected')};
    try{navigator.clipboard.writeText(t).then(done,sel)}catch(e){sel()}
  });
});
