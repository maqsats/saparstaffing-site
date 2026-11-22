/* Sapar Staffing - employer request form and copy buttons (index.html). */
(function(){
  var form=document.getElementById('apply-form');
  if(!form)return;
  var status=document.getElementById('form-status'), btn=document.getElementById('submit-btn');
  // Requests go through FormSubmit (formsubmit.co), which emails each one to the inbox below.
  // The inbox owner confirms it once, from the first email FormSubmit sends there.
  var INBOX='saparali@saparstaffing.com';
  var ENDPOINT='https://formsubmit.co/ajax/'+INBOX;
  // Only the published site sends; local previews show a note instead, so testing never emails anyone.
  var live=/(^|\.)saparstaffing\.com$|^maqsats\.github\.io$|\.netlify\.app$/.test(location.hostname);

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

  // One row per field in the email. Several ticked positions become one comma-separated line;
  // empty optional fields, the Netlify form name and the honeypot are left out.
  function payload(){
    var out={};
    new FormData(form).forEach(function(v,k){
      if(k==='form-name'||k==='company_website')return;
      v=String(v).trim();
      if(!v)return;
      out[k]=out[k]?out[k]+', '+v:v;
    });
    var body=new URLSearchParams(out);
    body.set('_subject','Staffing request: '+(out.business||'new employer'));
    body.set('_template','table');
    body.set('_captcha','false');
    return body;
  }

  function failed(){
    show('The request did not go through. Please email '+INBOX+' instead.',false);
    btn.disabled=false;btn.textContent='Send request';
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
      show('Preview only: on the live site this request is emailed to '+INBOX+', then the visitor sees the thank-you page.',true);
      return;
    }
    // A filled honeypot means a bot: send nothing, but behave as if it worked.
    if(form.elements.company_website.value){location.href='thank-you.html';return;}
    btn.disabled=true;btn.textContent='Sending…';
    fetch(ENDPOINT,{method:'POST',headers:{'Accept':'application/json'},body:payload()})
      .then(function(r){return r.json().catch(function(){return {};}).then(function(j){
        if(!r.ok||String(j.success)!=='true')throw new Error(j.message||('HTTP '+r.status));
        location.href='thank-you.html';
      });})
      .catch(failed);
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
