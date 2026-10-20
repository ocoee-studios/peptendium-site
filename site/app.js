(() => {
  function initialize() {
    const tours = [
      {name:'Library',screen:2,index:'01 / EXPLORE',title:'A library that brings\nthe details into focus.',description:'Search peptide profiles by name, aliases, category, evidence, or sequence. Find molecular details and research context in a clear, structured reference.',items:['Sequence information and molecular details','Evidence signals with meaningful context','Side-by-side profile comparisons']},
      {name:'Pulse',screen:3,index:'02 / UNDERSTAND',title:'A fresh perspective\non the research.',description:'Explore rotating research highlights, evidence context, and source-quality information. Follow topics with watchlists and examine signals across research layers.',items:['Educational research highlights','Evidence filters and signal matrices','PubMed links for further reading']},
      {name:'Notebook',screen:6,index:'03 / CONNECT',title:'Your curiosity.\nYour own collection.',description:'Bring your learning together in a personal research workspace. Keep saved profiles, study notes, topics, and collections close to hand.',items:['Save profiles and organize collections','Capture notes and research questions','Keep your workspace on your device']}
    ];
    const tabs = [...document.querySelectorAll('[data-tour]')];
    const setTour = (index,focus=false) => {
      const data=tours[index];
      tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
      document.getElementById('tour-panel').setAttribute('aria-labelledby',tabs[index].id);
      document.getElementById('tour-index').textContent=data.index;
      document.getElementById('tour-title').textContent=data.title;
      document.getElementById('tour-title').style.whiteSpace='pre-line';
      document.getElementById('tour-description').textContent=data.description;
      document.getElementById('tour-list').replaceChildren(...data.items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
      const img=document.getElementById('tour-image');img.src=`assets/screen-${data.screen}.webp`;img.alt=`Peptendium ${data.name} screenshot`;img.closest('button').dataset.screen=data.screen;img.closest('button').setAttribute('aria-label',`Enlarge ${data.name} screenshot`);
      if(focus)tabs[index].focus();
    };
    tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>setTour(index));tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();setTour(next,true);});});
    document.querySelector('[data-notebook-link]').addEventListener('click',()=>setTour(2));
    document.querySelectorAll('[data-tour-link]').forEach(link=>{link.addEventListener('click',()=>setTour(Number(link.dataset.tourLink)));});
    const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('navigation');
    const closeMenu=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');};
    menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
    const names=['Home','Library','Pulse','Evidence filters','Academy','Notebook','Settings','Privacy and learning settings'];
    const dialog=document.getElementById('screen-dialog'),image=document.getElementById('dialog-image'),imageWrap=document.querySelector('.dialog-image-wrap'),zoom=document.getElementById('zoom-toggle');
    let current=1,opener=null;
    const updateScreen=()=>{image.src=`assets/screen-${current}.webp`;image.alt=`Peptendium ${names[current-1]} screenshot`;document.getElementById('screen-title').textContent=names[current-1];document.getElementById('screen-count').textContent=`${current} / ${names.length}`;imageWrap.classList.remove('zoomed');zoom.textContent='Enlarge';imageWrap.scrollTop=0;};
    document.querySelectorAll('[data-screen]').forEach(button=>button.addEventListener('click',()=>{opener=button;current=Number(button.dataset.screen);updateScreen();dialog.showModal();document.body.classList.add('modal-open');}));
    document.getElementById('dialog-close').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(opener)opener.focus();});
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    zoom.addEventListener('click',()=>{const enlarged=imageWrap.classList.toggle('zoomed');zoom.textContent=enlarged?'Fit to screen':'Enlarge';});
    const changeScreen=delta=>{current=(current-1+delta+names.length)%names.length+1;updateScreen();};
    document.getElementById('screen-prev').addEventListener('click',()=>changeScreen(-1));document.getElementById('screen-next').addEventListener('click',()=>changeScreen(1));
    dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();changeScreen(1);}if(event.key==='ArrowLeft'){event.preventDefault();changeScreen(-1);}});
    document.getElementById('year').textContent=String(new Date().getFullYear());
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
})();
