  // ── NAV ──
  const PAGES = ['dashboard','profile','orders','products','customer-service','vouchers','blogs','banners','settings','about','advocacy','store-locator','faq','terms','privacy','shipping','refund'];
  const NM = { dashboard:['n-dashboard','sn-dashboard'], profile:['n-profile','sn-profile'], orders:['n-orders','sn-orders'], products:['n-products'], 'customer-service':['n-customer-service'], vouchers:['n-vouchers'], blogs:['n-blogs'], banners:['n-banners'], settings:['sn-settings'], about:[], advocacy:[], 'store-locator':[], faq:[], terms:[], privacy:[], shipping:[], refund:[] };

  function go(name) {
    PAGES.forEach(p => { const el=document.getElementById('p-'+p); if(el) el.classList.remove('active'); });
    document.querySelectorAll('.nav-main a, .nav-sub a').forEach(a => a.classList.remove('active'));
    const el = document.getElementById('p-'+name); if(el) el.classList.add('active');
    (NM[name]||[]).forEach(id => { const n=document.getElementById(id); if(n) n.classList.add('active'); });
    window.scrollTo({top:0,behavior:'smooth'});
  }

  // ── SEARCH BAR (exact behaviour from customer) ──
  function toggleSearch() {
    var bar = document.getElementById('search-bar');
    bar.style.display = bar.style.display === 'none' ? 'block' : 'none';
  }

  // ── MODAL ──
  function openModal(title, msg) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-msg').textContent = msg;
    document.getElementById('modal-overlay').classList.add('open');
    document.getElementById('modal-confirm').classList.add('open');
  }
  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.getElementById('modal-confirm').classList.remove('open');
  }

  // ── TOAST (exact behaviour from customer) ──
  function showToast(msg, icon) {
    var t = document.getElementById('toast');
    t.innerHTML = (icon ? '<span>'+icon+'</span> ' : '') + msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function(){ t.classList.remove('show'); }, 2800);
  }

  // ── CHARTS ──
  window.addEventListener('load', function() {
    new Chart(document.getElementById('salesChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'Sales (₱)',
          data: [8200,9500,7800,11200,13400,10800,12100,9900,14200,11600,15999,13300],
          backgroundColor: 'rgba(168,147,74,0.55)',
          borderColor: '#8b7d4e',
          borderWidth: 1,
          borderRadius: 2,
        }]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false} },
        scales:{
          y:{ beginAtZero:true,
            ticks:{ font:{family:'Segoe UI',size:10}, color:'#8b7d6a', callback:v=>'₱'+v.toLocaleString() },
            grid:{ color:'rgba(200,185,155,.2)' }
          },
          x:{ ticks:{font:{family:'Segoe UI',size:10}, color:'#8b7d6a'}, grid:{display:false} }
        }
      }
    });

    new Chart(document.getElementById('revChart').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Bags','Clothes','Keychains','Others'],
        datasets: [{
          data: [42,28,18,12],
          backgroundColor: ['#a8934a','#5a8a5a','#5a7a8a','#c17f6b'],
          borderWidth: 2,
          borderColor: '#faf8f2'
        }]
      },
      options: { responsive:true, maintainAspectRatio:false, cutout:'65%', plugins:{legend:{display:false}} }
    });
  });

  // ── CHANGELOG ──
  var CL = [
    {user:'Admin Jamie',role:'Super Admin',action:'Updated product price for "Bicol Laga Tote Bag"', type:'Edit',  module:'Products',     date:'Nov 18, 2024 · 10:32 AM', hi:true},
    {user:'Admin Jamie',role:'Super Admin',action:'Added new product "Mayon Volcano Mug"',            type:'Add',   module:'Products',     date:'Nov 18, 2024 · 09:15 AM', hi:false},
    {user:'Admin Jamie',role:'Super Admin',action:'Deleted expired voucher "BICOL2023"',              type:'Delete',module:'Vouchers',     date:'Nov 17, 2024 · 04:45 PM', hi:false},
    {user:'Admin Jamie',role:'Super Admin',action:'Logged into the admin panel',                      type:'Login', module:'Auth',         date:'Nov 17, 2024 · 08:00 AM', hi:false},
    {user:'Admin Jamie',role:'Super Admin',action:'Edited blog post "Bicol Crafts Heritage"',         type:'Edit',  module:'Blogs',        date:'Nov 16, 2024 · 02:30 PM', hi:false},
    {user:'Admin Jamie',role:'Super Admin',action:'Updated shipping policy content',                  type:'Edit',  module:'Policies',     date:'Nov 15, 2024 · 11:00 AM', hi:false},
    {user:'Admin Jamie',role:'Super Admin',action:'Added voucher "BICOLSALE20"',                      type:'Add',   module:'Vouchers',     date:'Nov 14, 2024 · 09:50 AM', hi:false},
    {user:'Admin Jamie',role:'Super Admin',action:'Logged out of admin panel',                        type:'Logout',module:'Auth',         date:'Nov 13, 2024 · 05:00 PM', hi:false},
    {user:'Admin Jamie',role:'Super Admin',action:'Deleted old product "Vintage Keychain"',           type:'Delete',module:'Products',     date:'Nov 12, 2024 · 03:22 PM', hi:false},
    {user:'Admin Jamie',role:'Super Admin',action:'Updated store banner image',                       type:'Edit',  module:'Banners',      date:'Nov 11, 2024 · 10:05 AM', hi:false},
    {user:'Admin Jamie',role:'Super Admin',action:'Added new customer account',                       type:'Add',   module:'Customers',    date:'Nov 10, 2024 · 01:15 PM', hi:false},
    {user:'Admin Jamie',role:'Super Admin',action:'Edited homepage hero text',                        type:'Edit',  module:'Site Settings',date:'Nov 09, 2024 · 09:30 AM', hi:false},
  ];
  var BM = {Edit:'b-edit',Add:'b-add',Delete:'b-delete',Login:'b-login',Logout:'b-logout'};
  var RPP=5, cp=1, fd=[].concat(CL);

  function renderCl() {
    var sl = fd.slice((cp-1)*RPP, cp*RPP);
    document.getElementById('clBody').innerHTML = sl.map(function(r){
      return '<tr class="'+(r.hi?'hi':'')+'">'
        +'<td><div class="uc"><div class="ua"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><div><div class="un">'+r.user+'</div><div class="ur">'+r.role+'</div></div></div></td>'
        +'<td style="max-width:260px;line-height:1.6;">'+r.action+'</td>'
        +'<td><span class="badge '+BM[r.type]+'">'+r.type+'</span></td>'
        +'<td>'+r.module+'</td>'
        +'<td style="white-space:nowrap;">'+r.date+'</td>'
        +'</tr>';
    }).join('');
    var tot = Math.ceil(fd.length/RPP);
    var pg = document.getElementById('clPages');
    var html = '<button class="pg-btn" onclick="clPg('+(cp-1)+')" '+(cp===1?'disabled':'')+'>&#8249;</button>';
    for(var i=1;i<=tot;i++) html += '<button class="pg-btn '+(i===cp?'active':'')+'" onclick="clPg('+i+')">'+i+'</button>';
    html += '<button class="pg-btn" onclick="clPg('+(cp+1)+')" '+(cp===tot?'disabled':'')+'>&#8250;</button>';
    pg.innerHTML = html;
  }
  function clPg(p){var tot=Math.ceil(fd.length/RPP);if(p<1||p>tot)return;cp=p;renderCl();}
  function filterCl(){
    var s=document.getElementById('clSearch').value.toLowerCase();
    var t=document.getElementById('clType').value;
    fd=CL.filter(function(r){
      return (!s||r.user.toLowerCase().indexOf(s)>-1||r.action.toLowerCase().indexOf(s)>-1||r.module.toLowerCase().indexOf(s)>-1)&&(!t||r.type===t);
    });
    cp=1;renderCl();
  }
  renderCl();

  // ── ORDERS DATA ──
  var ORDERS = [
    {id:'SOU-20241118-012',customer:'Anita G. Rivera',   email:'anita@gmail.com',  product:'Bicol Laga Tote Bag',        status:'In Transit',  price:455,  date:'Nov 18, 2024'},
    {id:'SOU-20241117-011',customer:'Mario D. Santos',   email:'mario@gmail.com',  product:'Mayon Volcano Mug',           status:'Pending',     price:280,  date:'Nov 17, 2024'},
    {id:'SOU-20241116-010',customer:'Liza T. Borja',     email:'liza@gmail.com',   product:'Pili Nut Keychain',           status:'Delivered',   price:95,   date:'Nov 16, 2024'},
    {id:'SOU-20241115-009',customer:'Carlo M. Reyes',    email:'carlo@gmail.com',  product:'Bicol Express Shirt',         status:'Processing',  price:380,  date:'Nov 15, 2024'},
    {id:'SOU-20241114-008',customer:'Rosa B. Cruz',      email:'rosa@gmail.com',   product:'Abaca Wall Art',              status:'Received',    price:750,  date:'Nov 14, 2024'},
    {id:'SOU-20241113-007',customer:'Noel A. Mendez',    email:'noel@gmail.com',   product:'Buko Pie Charm',              status:'Cancelled',   price:120,  date:'Nov 13, 2024'},
    {id:'SOU-20241112-006',customer:'Elena F. Tan',      email:'elena@gmail.com',  product:'Cagsawa Flask',               status:'Delivered',   price:320,  date:'Nov 12, 2024'},
    {id:'SOU-20241111-005',customer:'Jun P. Abad',       email:'jun@gmail.com',    product:'Pina Weave Backpack',         status:'In Transit',  price:780,  date:'Nov 11, 2024'},
    {id:'SOU-20241110-004',customer:'Grace O. Lim',      email:'grace@gmail.com',  product:'Salakot Straw Hat',           status:'Pending',     price:250,  date:'Nov 10, 2024'},
    {id:'SOU-20241109-003',customer:'Ben S. Villanueva', email:'ben@gmail.com',    product:'Bicolana Embroidered Blouse', status:'Refunded',    price:620,  date:'Nov 09, 2024'},
    {id:'SOU-20241108-002',customer:'Cora D. Magno',     email:'cora@gmail.com',   product:'Iriga Pottery Mug',           status:'Delivered',   price:185,  date:'Nov 08, 2024'},
    {id:'SOU-20241107-001',customer:'Tony L. Espiritu',  email:'tony@gmail.com',   product:'Abaca Fiber Clutch',          status:'Received',    price:480,  date:'Nov 07, 2024'},
  ];

  var STATUS_CSS = {
    'Pending':'status-pending','Processing':'status-processing','In Transit':'status-transit',
    'Delivered':'status-delivered','Received':'status-delivered',
    'Cancelled':'status-cancelled','Refunded':'status-refunded'
  };
  var STATUS_STEP = {'Pending':1,'Processing':2,'In Transit':4,'Delivered':5,'Received':6,'Cancelled':0,'Refunded':0};
  var ORD_RPP=7, ordPage=1, ordFiltered=ORDERS.slice();

  function renderOrders(){
    var search=(document.getElementById('ordSearch').value||'').toLowerCase();
    var status=document.getElementById('ordStatus').value;
    var sort=document.getElementById('ordSort').value;
    ordFiltered=ORDERS.filter(function(o){
      var matchS=!search||o.id.toLowerCase().indexOf(search)>-1||o.customer.toLowerCase().indexOf(search)>-1||o.product.toLowerCase().indexOf(search)>-1;
      var matchT=!status||o.status===status;
      return matchS&&matchT;
    });
    if(sort==='oldest') ordFiltered.sort(function(a,b){return a.id<b.id?-1:1;});
    else if(sort==='price-hi') ordFiltered.sort(function(a,b){return b.price-a.price;});
    else if(sort==='price-lo') ordFiltered.sort(function(a,b){return a.price-b.price;});
    ordPage=1;
    document.getElementById('ordCount').textContent=ordFiltered.length+' order'+(ordFiltered.length!==1?'s':'')+' found';
    renderOrdTable();
  }

  function renderOrdTable(){
    var slice=ordFiltered.slice((ordPage-1)*ORD_RPP,ordPage*ORD_RPP);
    var tbody=document.getElementById('ordBody');
    if(!slice.length){
      tbody.innerHTML='<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-light);font-style:italic;font-family:\'Georgia\',serif;">No orders found.</td></tr>';
    } else {
      tbody.innerHTML=slice.map(function(o){
        return '<tr onclick="openTrackModal(\''+o.id+'\')" style="cursor:pointer;">'
          +'<td><div class="order-id">'+o.id+'</div></td>'
          +'<td><div class="order-customer">'+o.customer+'</div><div class="order-sub">'+o.email+'</div></td>'
          +'<td><div style="font-size:12px;color:var(--text-dark);">'+o.product+'</div></td>'
          +'<td><span class="order-status '+(STATUS_CSS[o.status]||'')+'">'+o.status+'</span></td>'
          +'<td class="order-price">&#8369;'+o.price.toLocaleString()+'</td>'
          +'<td style="white-space:nowrap;color:var(--text-light);">'+o.date+'</td>'
          +'<td><button class="tbl-action-btn" onclick="event.stopPropagation();openTrackModal(\''+o.id+'\')">View</button></td>'
          +'</tr>';
      }).join('');
    }
    renderOrdPages();
  }

  function renderOrdPages(){
    var tot=Math.ceil(ordFiltered.length/ORD_RPP);
    var pg=document.getElementById('ordPages');
    if(tot<=1){pg.innerHTML='';return;}
    var html='<button class="pg-btn" onclick="ordPg('+(ordPage-1)+')" '+(ordPage===1?'disabled':'')+'>&#8249;</button>';
    for(var i=1;i<=tot;i++) html+='<button class="pg-btn '+(i===ordPage?'active':'')+'" onclick="ordPg('+i+')">'+i+'</button>';
    html+='<button class="pg-btn" onclick="ordPg('+(ordPage+1)+')" '+(ordPage===tot?'disabled':'')+'>&#8250;</button>';
    pg.innerHTML=html;
  }
  function ordPg(p){var tot=Math.ceil(ordFiltered.length/ORD_RPP);if(p<1||p>tot)return;ordPage=p;renderOrdTable();}

  var currentOrderId=null;
  function openTrackModal(orderId){
    var o=ORDERS.find(function(x){return x.id===orderId;});
    if(!o) return;
    currentOrderId=orderId;
    document.getElementById('tm-customer').textContent=o.customer;
    document.getElementById('tm-tracking').textContent=o.id;
    document.getElementById('tm-date').textContent=o.date;
    document.getElementById('tm-product').textContent=o.product;
    document.getElementById('tm-address').textContent='123 Rizal St., Legazpi City, Albay 4500';
    document.getElementById('tm-delivery').textContent='JRS Express - 3-5 days';
    document.getElementById('tm-trackno').textContent='JRS'+Math.floor(Math.random()*9000000000+1000000000);
    var badge=document.getElementById('tm-status-badge');
    badge.textContent=o.status;
    badge.className='order-status '+(STATUS_CSS[o.status]||'');
    var sel=document.getElementById('tm-update-select');
    for(var i=0;i<sel.options.length;i++){if(sel.options[i].text===o.status){sel.selectedIndex=i;break;}}
    // Progress dots
    var steps=document.getElementById('tm-progress').querySelectorAll('.status-step');
    var activeStep=STATUS_STEP[o.status]||0;
    steps.forEach(function(step,i){
      var dot=step.querySelector('.step-dot');
      var lbl=step.querySelector('.step-label');
      dot.className='step-dot'; lbl.className='step-label'; dot.textContent='';
      if(o.status==='Cancelled'||o.status==='Refunded') return;
      if(i<activeStep-1){dot.className='step-dot done';dot.textContent='\u2713';lbl.className='step-label done';}
      else if(i===activeStep-1){dot.className='step-dot active';dot.textContent='\u2022';lbl.className='step-label active';}
    });
    document.getElementById('modal-overlay').classList.add('open');
    document.getElementById('modal-track-order').classList.add('open');
  }
  function closeTrackModal(){
    document.getElementById('modal-track-order').classList.remove('open');
    document.getElementById('modal-overlay').classList.remove('open');
  }
  function openConfirmUpdate(){document.getElementById('modal-confirm-update').classList.add('open');}
  function closeConfirmUpdate(){document.getElementById('modal-confirm-update').classList.remove('open');}
  function confirmOrderUpdate(){
    var sel=document.getElementById('tm-update-select');
    var newStatus=sel.options[sel.selectedIndex].text;
    var o=ORDERS.find(function(x){return x.id===currentOrderId;});
    if(o){o.status=newStatus;}
    closeConfirmUpdate();
    closeTrackModal();
    renderOrders();
    showToast('Order updated to: '+newStatus,'&#10003;');
  }

  renderOrders();

  // ── NOTIFICATIONS ──
  var NOTIFS = [
    { id:1, type:'alert',   unread:true,  title:'New order received',     sub:'SOU-20241118-012 · Anita G. Rivera · ₱455',   time:'2 min ago',    orderId:'SOU-20241118-012' },
    { id:2, type:'alert',   unread:true,  title:'New order received',     sub:'SOU-20241117-011 · Mario D. Santos · ₱280',   time:'1 hr ago',     orderId:'SOU-20241117-011' },
    { id:3, type:'order',   unread:true,  title:'Order cancelled',        sub:'SOU-20241113-007 · Noel A. Mendez',            time:'3 hrs ago',    orderId:'SOU-20241113-007' },
    { id:4, type:'info',    unread:true,  title:'Pending orders spike',   sub:'87 orders are still awaiting processing',      time:'Today, 8:00 AM', orderId:null },
    { id:5, type:'success', unread:false, title:'Order delivered',        sub:'SOU-20241116-010 · Liza T. Borja',             time:'Yesterday',    orderId:'SOU-20241116-010' },
    { id:6, type:'success', unread:false, title:'Payment confirmed',      sub:'SOU-20241112-006 · Elena F. Tan · ₱320',      time:'Nov 12',       orderId:'SOU-20241112-006' },
    { id:7, type:'order',   unread:false, title:'Refund processed',       sub:'SOU-20241109-003 · Ben S. Villanueva · ₱620', time:'Nov 9',        orderId:'SOU-20241109-003' },
  ];

  var NOTIF_ICONS = {
    order:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    alert:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    info:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  };

  function renderNotifs() {
    var unreadCount = NOTIFS.filter(function(n){ return n.unread; }).length;
    var badge = document.getElementById('notifBadge');
    badge.textContent = unreadCount;
    badge.classList.toggle('hidden', unreadCount === 0);
    var list = document.getElementById('notifList');
    if (!NOTIFS.length) { list.innerHTML = '<div class="notif-empty">No notifications yet.</div>'; return; }
    list.innerHTML = NOTIFS.map(function(n) {
      return '<div class="notif-item'+(n.unread?' unread':'')+'" onclick="notifClick('+n.id+')">'
        +'<div class="notif-icon ni-'+n.type+'">'+NOTIF_ICONS[n.type]+'</div>'
        +'<div class="notif-content">'
        +'<div class="notif-title">'+n.title+'</div>'
        +'<div class="notif-sub">'+n.sub+'</div>'
        +'<div class="notif-time">'+n.time+'</div>'
        +'</div></div>';
    }).join('');
  }

  function notifClick(id) {
    var n = NOTIFS.find(function(x){ return x.id===id; });
    if (!n) return;
    n.unread = false;
    renderNotifs();
    closeNotif();
    if (n.orderId) { go('orders'); setTimeout(function(){ openTrackModal(n.orderId); }, 250); }
  }

  function markAllRead() {
    NOTIFS.forEach(function(n){ n.unread=false; });
    renderNotifs();
    showToast('All notifications marked as read','&#10003;');
  }

  function toggleNotif() { document.getElementById('notifPanel').classList.toggle('open'); }
  function closeNotif()  { document.getElementById('notifPanel').classList.remove('open'); }

  // ── PROFILE DROPDOWN ──
  function toggleProfileMenu() { document.getElementById('profilePanel').classList.toggle('open'); }
  function closeProfileMenu()  { document.getElementById('profilePanel').classList.remove('open'); }

  document.addEventListener('click', function(e) {
    var nw = document.getElementById('notifWrap');
    if (nw && !nw.contains(e.target)) closeNotif();
    var pw = document.getElementById('profileWrap');
    if (pw && !pw.contains(e.target)) closeProfileMenu();
  });

  renderNotifs();

  // ══ CUSTOMER SERVICE ══
  var CS_MSGS = [
    {name:'Jose P. Abion',item:'#S@MPL3',msg:'Is this Product still Available?',date:'February 13, 2026',read:false},
    {name:'Maria L. Santos',item:'#S@MPL4',msg:'Can I get a bulk discount?',date:'February 12, 2026',read:true},
    {name:'Ramon C. Dela Cruz',item:'#S@MPL5',msg:'What are the dimensions of this item?',date:'February 11, 2026',read:false},
    {name:'Ana B. Reyes',item:'#S@MPL6',msg:'Is there a gift wrapping option?',date:'February 10, 2026',read:true},
    {name:'Pedro M. Garcia',item:'#S@MPL7',msg:'How long does shipping take to Bicol?',date:'February 9, 2026',read:false},
    {name:'Lucia T. Flores',item:'#S@MPL8',msg:'Do you have this in other colors?',date:'February 8, 2026',read:true},
    {name:'Eduardo N. Cruz',item:'#S@MPL9',msg:'I received the wrong item.',date:'February 7, 2026',read:false},
    {name:'Carmela V. Torres',item:'#S@MPL10',msg:'Can I change my delivery address?',date:'February 6, 2026',read:true},
  ];
  var CS_FB = [
    {name:'Jose P. Abion',date:'Feb 13, 2026',msg:'Great products! Will order again.',rating:5},
    {name:'Maria L. Santos',date:'Feb 12, 2026',msg:'Fast shipping and well-packed items.',rating:5},
    {name:'Ramon C. Dela Cruz',date:'Feb 11, 2026',msg:'Good quality but delivery was delayed.',rating:3},
    {name:'Ana B. Reyes',date:'Feb 10, 2026',msg:'Loved the packaging, very artisanal feel!',rating:5},
    {name:'Pedro M. Garcia',date:'Feb 9, 2026',msg:'Product was as described.',rating:4},
    {name:'Lucia T. Flores',date:'Feb 8, 2026',msg:'Customer support was helpful.',rating:4},
  ];
  var cs_cur_tab='messages', cs_msg_page=1, cs_fb_page=1, CS_RPP=5;
  var cs_fd=[].concat(CS_MSGS);

  function csTab(t) {
    cs_cur_tab=t;
    document.getElementById('cs-messages').style.display=t==='messages'?'block':'none';
    document.getElementById('cs-feedback').style.display=t==='feedback'?'block':'none';
    ['messages','feedback'].forEach(function(id){
      var btn=document.getElementById('cs-tab-'+id);
      var active=id===t;
      btn.style.color=active?'var(--dark-olive)':'var(--text-light)';
      btn.style.fontWeight=active?'600':'400';
      btn.style.borderBottom=active?'2px solid var(--dark-olive)':'2px solid transparent';
    });
    if(t==='messages') renderCsMsgs(); else renderCsFeedback();
  }
  function csFilter(){
    var s=document.getElementById('cs-search').value.toLowerCase();
    var f=document.getElementById('cs-filter').value;
    cs_fd=CS_MSGS.filter(function(m){
      return (s?m.name.toLowerCase().indexOf(s)>-1||m.item.toLowerCase().indexOf(s)>-1:true)
        &&(f==='unread'?!m.read:f==='read'?m.read:true);
    });
    cs_msg_page=1; renderCsMsgs();
  }
  function renderCsMsgs(){
    var sl=cs_fd.slice((cs_msg_page-1)*CS_RPP,cs_msg_page*CS_RPP);
    document.getElementById('cs-msg-list').innerHTML=sl.map(function(m){
      return '<div style="display:flex;align-items:flex-start;gap:16px;padding:16px 20px;border-bottom:1px solid rgba(200,185,155,.35);">'
        +'<div style="flex:1;">'
        +'<div style="font-size:10px;color:var(--text-light);margin-bottom:3px;">'+m.date+'</div>'
        +'<div style="font-weight:'+(m.read?'400':'600')+';font-size:13px;color:var(--text-dark);margin-bottom:3px;">'+m.name+' <span style="color:var(--text-light);font-weight:400;font-size:12px;">on item '+m.item+'</span></div>'
        +'<div style="font-size:12px;color:var(--text-mid);">'+m.msg+'</div>'
        +'</div>'
        +'<div style="flex-shrink:0;display:flex;align-items:center;gap:8px;">'
        +'<div style="width:120px;height:56px;background:var(--warm);border:1px solid var(--border);border-radius:2px;"></div>'
        +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;color:var(--olive);cursor:pointer;" onclick="showToast(\'Reply sent\',\'&#10003;\')"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
        +'</div></div>';
    }).join('');
    var tot=Math.ceil(cs_fd.length/CS_RPP);
    var pg=document.getElementById('cs-msg-pages');
    var html='<button class="pg-btn" onclick="csMsgPg('+(cs_msg_page-1)+')" '+(cs_msg_page===1?'disabled':'')+'>&#8249;</button>';
    for(var i=1;i<=tot;i++) html+='<button class="pg-btn '+(i===cs_msg_page?'active':'')+'" onclick="csMsgPg('+i+')">'+i+'</button>';
    html+='<button class="pg-btn" onclick="csMsgPg('+(cs_msg_page+1)+')" '+(cs_msg_page===tot?'disabled':'')+'>&#8250;</button>';
    pg.innerHTML=html;
  }
  function csMsgPg(p){var tot=Math.ceil(cs_fd.length/CS_RPP);if(p<1||p>tot)return;cs_msg_page=p;renderCsMsgs();}

  function renderCsFeedback(){
    var sl=CS_FB.slice((cs_fb_page-1)*CS_RPP,cs_fb_page*CS_RPP);
    document.getElementById('cs-fb-list').innerHTML=sl.map(function(f){
      var stars='';for(var i=1;i<=5;i++) stars+='<span style="color:'+(i<=f.rating?'var(--gold)':'var(--border)')+';">&#9733;</span>';
      return '<div style="display:flex;align-items:flex-start;gap:14px;padding:16px 20px;border-bottom:1px solid rgba(200,185,155,.35);">'
        +'<div style="width:34px;height:34px;background:var(--sand);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;font-weight:600;color:var(--olive);">'+f.name.charAt(0)+'</div>'
        +'<div style="flex:1;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;"><strong style="font-size:13px;color:var(--text-dark);">'+f.name+'</strong><span style="font-size:10px;color:var(--text-light);">'+f.date+'</span></div>'
        +'<div style="margin-bottom:4px;">'+stars+'</div>'
        +'<div style="font-size:12px;color:var(--text-mid);">'+f.msg+'</div></div></div>';
    }).join('');
    var tot=Math.ceil(CS_FB.length/CS_RPP);
    var pg=document.getElementById('cs-fb-pages');
    var html='<button class="pg-btn" onclick="csFbPg('+(cs_fb_page-1)+')" '+(cs_fb_page===1?'disabled':'')+'>&#8249;</button>';
    for(var i=1;i<=tot;i++) html+='<button class="pg-btn '+(i===cs_fb_page?'active':'')+'" onclick="csFbPg('+i+')">'+i+'</button>';
    html+='<button class="pg-btn" onclick="csFbPg('+(cs_fb_page+1)+')" '+(cs_fb_page===tot?'disabled':'')+'>&#8250;</button>';
    pg.innerHTML=html;
  }
  function csFbPg(p){var tot=Math.ceil(CS_FB.length/CS_RPP);if(p<1||p>tot)return;cs_fb_page=p;renderCsFeedback();}

  // ══ VOUCHERS ══
  var VD = [
    {id:1,cat:'Memorabilia',name:'BICOL20',code:'#V0uCH3r1D',req:'Shipping Voucher',disc:-50},
    {id:2,cat:'Memorabilia',name:'SALE75',code:'#V0uCH3r2D',req:'Minimum Purchase',disc:-75},
    {id:3,cat:'Memorabilia',name:'WELCOME20',code:'#V0uCH3r3D',req:'No Requirement',disc:-20},
    {id:4,cat:'Clothing',name:'FREESHIP',code:'#V0uCH3r4D',req:'Shipping Voucher',disc:-100},
    {id:5,cat:'Bags',name:'BAGFEST',code:'#V0uCH3r5D',req:'Minimum Purchase',disc:-50},
    {id:6,cat:'Keychains',name:'KEYCHAIN50',code:'#V0uCH3r6D',req:'No Requirement',disc:-50},
  ];
  var v_page=1, V_RPP=6, v_fd=[].concat(VD), v_del_id=null;

  function vFilter(){
    var s=document.getElementById('v-search').value.toLowerCase();
    var c=document.getElementById('v-cat').value;
    v_fd=VD.filter(function(v){return (s?v.name.toLowerCase().indexOf(s)>-1||v.code.toLowerCase().indexOf(s)>-1:true)&&(c?v.cat===c:true);});
    v_page=1; renderVouchers();
  }
  function renderVouchers(){
    var sl=v_fd.slice((v_page-1)*V_RPP,v_page*V_RPP);
    document.getElementById('v-grid').innerHTML=sl.map(function(v){
      return '<div style="background:var(--white);border:1px solid var(--border);padding:18px 20px;position:relative;">'
        +'<div style="position:absolute;top:14px;right:14px;cursor:pointer;" onclick="openDelModal('+v.id+')">'
        +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:16px;height:16px;color:var(--text-light);"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></div>'
        +'<div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-light);margin-bottom:6px;">'+v.cat+'</div>'
        +'<div style="font-weight:600;font-size:14px;color:var(--dark-olive);margin-bottom:4px;">'+v.name+'</div>'
        +'<div style="font-size:11px;color:var(--text-mid);margin-bottom:2px;">Voucher Code</div>'
        +'<div style="font-size:12px;color:var(--text-mid);font-family:monospace;margin-bottom:12px;">'+v.code+'</div>'
        +'<div style="display:flex;justify-content:space-between;align-items:center;border-top:1px dashed var(--border);padding-top:10px;">'
        +'<span style="font-size:11px;color:var(--accent);">'+v.req+'*</span>'
        +'<span style="font-family:\'Georgia\',serif;font-size:16px;font-weight:600;color:var(--dark-olive);">'+v.disc+'%</span>'
        +'</div></div>';
    }).join('');
    var tot=Math.ceil(v_fd.length/V_RPP);
    var pg=document.getElementById('v-pages');
    var html='<button class="pg-btn" onclick="vPg('+(v_page-1)+')" '+(v_page===1?'disabled':'')+'>&#8249;</button>';
    for(var i=1;i<=tot;i++) html+='<button class="pg-btn '+(i===v_page?'active':'')+'" onclick="vPg('+i+')">'+i+'</button>';
    html+='<button class="pg-btn" onclick="vPg('+(v_page+1)+')" '+(v_page===tot?'disabled':'')+'>&#8250;</button>';
    pg.innerHTML=html;
  }
  function vPg(p){var tot=Math.ceil(v_fd.length/V_RPP);if(p<1||p>tot)return;v_page=p;renderVouchers();}
  function openVoucherModal(){document.getElementById('v-modal-overlay').classList.add('open');document.getElementById('v-modal').classList.add('open');}
  function closeVoucherModal(){document.getElementById('v-modal-overlay').classList.remove('open');document.getElementById('v-modal').classList.remove('open');}
  function openDelModal(id){v_del_id=id;document.getElementById('v-del-overlay').classList.add('open');document.getElementById('v-del-modal').classList.add('open');}
  function closeDelModal(){v_del_id=null;document.getElementById('v-del-overlay').classList.remove('open');document.getElementById('v-del-modal').classList.remove('open');}
  function confirmDelVoucher(){
    if(v_del_id){VD=VD.filter(function(v){return v.id!==v_del_id;});v_fd=v_fd.filter(function(v){return v.id!==v_del_id;});}
    closeDelModal(); renderVouchers(); showToast('Voucher removed','&#10003;');
  }
  function addVoucher(){
    var n=document.getElementById('v-new-name').value.trim();
    var c=document.getElementById('v-new-cat').value;
    var d=parseInt(document.getElementById('v-new-disc').value)||0;
    var r=document.getElementById('v-new-req').value;
    if(!n){showToast('Please enter a voucher name','&#9888;');return;}
    var nv={id:Date.now(),cat:c,name:n.toUpperCase(),code:'#V'+Math.random().toString(36).substr(2,7).toUpperCase(),req:r,disc:-Math.abs(d)};
    VD.unshift(nv);v_fd=[].concat(VD);v_page=1;renderVouchers();
    closeVoucherModal();showToast('Voucher added successfully','&#10003;');
    document.getElementById('v-new-name').value='';document.getElementById('v-new-disc').value='';
  }

  // ══ BLOGS ══
  var BD = [
    {id:1,title:'Bicol Crafts Heritage: A Story Worth Telling',cat:'Culture',author:'Admin Jamie',status:'Published',date:'Nov 16, 2024'},
    {id:2,title:'Why Buying Local Matters More Than Ever',cat:'Advocacy',author:'Admin Jamie',status:'Published',date:'Nov 12, 2024'},
    {id:3,title:'Top 5 Souveniria Picks for the Holidays',cat:'Products',author:'Admin Jamie',status:'Published',date:'Nov 08, 2024'},
    {id:4,title:'Behind the Craft: Mayon Volcano Inspired Pieces',cat:'Culture',author:'Admin Jamie',status:'Draft',date:'Nov 05, 2024'},
    {id:5,title:'Exploring Bicol Through its Unique Souvenirs',cat:'Travel',author:'Admin Jamie',status:'Published',date:'Oct 28, 2024'},
    {id:6,title:'Holiday Gift Guide 2024',cat:'Products',author:'Admin Jamie',status:'Draft',date:'Oct 20, 2024'},
    {id:7,title:'Souveniria Partners with Bicol Artisans',cat:'Events',author:'Admin Jamie',status:'Published',date:'Oct 15, 2024'},
  ];
  var b_page=1, B_RPP=5, b_fd=[].concat(BD);

  function bFilter(){
    var s=document.getElementById('b-search').value.toLowerCase();
    var st=document.getElementById('b-status').value;
    b_fd=BD.filter(function(b){return (s?b.title.toLowerCase().indexOf(s)>-1||b.cat.toLowerCase().indexOf(s)>-1:true)&&(st?b.status===st:true);});
    b_page=1; renderBlogs();
  }
  function renderBlogs(){
    var sl=b_fd.slice((b_page-1)*B_RPP,b_page*B_RPP);
    document.getElementById('b-body').innerHTML=sl.map(function(b){
      var sc=b.status==='Published'?'b-add':'b-logout';
      return '<tr>'
        +'<td style="max-width:260px;font-weight:500;color:var(--text-dark);">'+b.title+'</td>'
        +'<td>'+b.cat+'</td><td>'+b.author+'</td>'
        +'<td><span class="badge '+sc+'">'+b.status+'</span></td>'
        +'<td style="white-space:nowrap;">'+b.date+'</td>'
        +'<td style="text-align:center;">'
        +'<button onclick="showToast(\'Editing post...\',\'&#9998;\')" style="background:none;border:none;cursor:pointer;color:var(--olive);padding:4px;" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>'
        +'<button onclick="delBlog('+b.id+')" style="background:none;border:none;cursor:pointer;color:var(--accent);padding:4px;" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg></button>'
        +'</td></tr>';
    }).join('');
    var tot=Math.ceil(b_fd.length/B_RPP);
    var pg=document.getElementById('b-pages');
    var html='<button class="pg-btn" onclick="bPg('+(b_page-1)+')" '+(b_page===1?'disabled':'')+'>&#8249;</button>';
    for(var i=1;i<=tot;i++) html+='<button class="pg-btn '+(i===b_page?'active':'')+'" onclick="bPg('+i+')">'+i+'</button>';
    html+='<button class="pg-btn" onclick="bPg('+(b_page+1)+')" '+(b_page===tot?'disabled':'')+'>&#8250;</button>';
    pg.innerHTML=html;
  }
  function bPg(p){var tot=Math.ceil(b_fd.length/B_RPP);if(p<1||p>tot)return;b_page=p;renderBlogs();}
  function delBlog(id){BD=BD.filter(function(b){return b.id!==id;});b_fd=b_fd.filter(function(b){return b.id!==id;});renderBlogs();showToast('Blog post deleted','&#10003;');}
  function openBlogModal(){document.getElementById('b-modal-overlay').classList.add('open');document.getElementById('b-modal').classList.add('open');}
  function closeBlogModal(){document.getElementById('b-modal-overlay').classList.remove('open');document.getElementById('b-modal').classList.remove('open');}
  function addBlog(){
    var t=document.getElementById('b-new-title').value.trim();
    var c=document.getElementById('b-new-cat').value;
    var s=document.getElementById('b-new-status').value;
    if(!t){showToast('Please enter a blog title','&#9888;');return;}
    var nb={id:Date.now(),title:t,cat:c,author:'Admin Jamie',status:s,date:new Date().toLocaleDateString('en-US',{month:'short',day:'2-digit',year:'numeric'})};
    BD.unshift(nb);b_fd=[].concat(BD);b_page=1;renderBlogs();
    closeBlogModal();showToast('Blog post saved','&#10003;');
    document.getElementById('b-new-title').value='';document.getElementById('b-new-content').value='';
  }

  // ══ BANNERS ══
  var BAN = [
    {id:1,title:'Summer Souvenir Sale',caption:'Shop handcrafted Bicol pieces at up to 30% off',placement:'Homepage Hero',status:'Active',color:'#8b7d4e'},
    {id:2,title:'New Arrivals — Mayon Collection',caption:'Explore our newest Mayon-inspired memorabilia',placement:'Category Page',status:'Active',color:'#5a4f2f'},
    {id:3,title:'Free Shipping Weekend',caption:'Free shipping on all orders above ₱500 this weekend',placement:'Top Bar',status:'Scheduled',color:'#c17f6b'},
    {id:4,title:'Holiday Gift Guide 2025',caption:'Find the perfect souvenir for your loved ones',placement:'Homepage Hero',status:'Inactive',color:'#5a7a8a'},
  ];
  function renderBanners(){
    document.getElementById('banner-grid').innerHTML=BAN.map(function(b){
      var sc=b.status==='Active'?'b-add':b.status==='Scheduled'?'b-login':'b-logout';
      return '<div style="background:var(--white);border:1px solid var(--border);overflow:hidden;">'
        +'<div style="height:120px;background:'+b.color+';display:flex;align-items:center;justify-content:center;padding:20px;">'
        +'<div style="text-align:center;"><div style="font-family:\'Caveat\',cursive;font-size:24px;color:rgba(255,255,255,.9);margin-bottom:4px;">'+b.title+'</div>'
        +'<div style="font-size:11px;color:rgba(255,255,255,.7);font-style:italic;">'+b.caption+'</div></div></div>'
        +'<div style="padding:14px 16px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);">'
        +'<div><div style="font-size:12px;font-weight:600;color:var(--text-dark);margin-bottom:3px;">'+b.title+'</div>'
        +'<div style="font-size:11px;color:var(--text-light);">'+b.placement+'</div></div>'
        +'<div style="display:flex;align-items:center;gap:10px;">'
        +'<span class="badge '+sc+'">'+b.status+'</span>'
        +'<button onclick="showToast(\'Editing banner...\',\'&#9998;\')" style="background:none;border:none;cursor:pointer;color:var(--olive);" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>'
        +'<button onclick="delBanner('+b.id+')" style="background:none;border:none;cursor:pointer;color:var(--accent);" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg></button>'
        +'</div></div></div>';
    }).join('');
  }
  function delBanner(id){BAN=BAN.filter(function(b){return b.id!==id;});renderBanners();showToast('Banner removed','&#10003;');}
  function openBannerModal(){document.getElementById('ban-modal-overlay').classList.add('open');document.getElementById('ban-modal').classList.add('open');}
  function closeBannerModal(){document.getElementById('ban-modal-overlay').classList.remove('open');document.getElementById('ban-modal').classList.remove('open');}
  function addBanner(){
    var t=document.getElementById('ban-title').value.trim();
    var p=document.getElementById('ban-placement').value;
    var s=document.getElementById('ban-status').value;
    var c=document.getElementById('ban-caption').value.trim();
    if(!t){showToast('Please enter a banner title','&#9888;');return;}
    var colors=['#8b7d4e','#5a4f2f','#c17f6b','#5a7a8a','#5a8a5a'];
    var nb={id:Date.now(),title:t,caption:c||'No caption',placement:p,status:s,color:colors[Math.floor(Math.random()*colors.length)]};
    BAN.unshift(nb);renderBanners();
    closeBannerModal();showToast('Banner saved','&#10003;');
    document.getElementById('ban-title').value='';document.getElementById('ban-caption').value='';document.getElementById('ban-img').value='';
  }

  // ══ PRODUCTS ══
  var PROD_DATA = [
    {id:1,name:'Mayon Volcano Mug',code:'#S@mPL31D',cat:'Mugs & Flasks',price:120,stock:20,revenue:500,disc:2,discounted:true,status:'Active',desc:'This is a Description of the product.\n\nSpecifications:\n-Ceramic material\n-Dishwasher safe\n-330ml capacity'},
    {id:2,name:'Bicol Laga Tote Bag',code:'#S@mPL32D',cat:'Bags',price:350,stock:15,revenue:1200,disc:0,discounted:false,status:'Active',desc:'Handcrafted tote bag made from local Bicol materials. Durable and stylish.'},
    {id:3,name:'Mayon Silhouette Shirt',code:'#S@mPL33D',cat:'Clothes',price:280,stock:30,revenue:2200,disc:10,discounted:true,status:'Active',desc:'Comfortable shirt featuring the iconic Mayon Volcano silhouette. Available in multiple colors.'},
    {id:4,name:'Bicol Heritage Keychain',code:'#S@mPL34D',cat:'Keychains',price:85,stock:50,revenue:900,disc:0,discounted:false,status:'Active',desc:'Laser-engraved metal keychain with Bicol cultural motifs.'},
    {id:5,name:'Pili Nut Canvas Hat',code:'#S@mPL35D',cat:'Hats',price:195,stock:12,revenue:780,disc:5,discounted:true,status:'Hidden',desc:'Canvas hat featuring embroidered pili nut design. Adjustable strap.'},
    {id:6,name:'Cagsawa Flask',code:'#S@mPL36D',cat:'Mugs & Flasks',price:220,stock:8,revenue:440,disc:0,discounted:false,status:'Active',desc:'Stainless steel flask with Cagsawa Ruins print. Keeps drinks hot or cold.'},
    {id:7,name:'Sorsogon Woven Bag',code:'#S@mPL37D',cat:'Bags',price:420,stock:6,revenue:1680,disc:15,discounted:true,status:'Active',desc:'Traditional handwoven bag from Sorsogon artisans.'},
    {id:8,name:'Daraga Embroidered Polo',code:'#S@mPL38D',cat:'Clothes',price:310,stock:22,revenue:3200,disc:0,discounted:false,status:'Active',desc:'Embroidered polo shirt with Daraga church design. Formal yet distinctly Bicolano.'},
  ];
  var prod_page=1, PROD_RPP=5, prod_fd=[].concat(PROD_DATA), prod_active_id=null, prod_modal_action=null;

  function prodFilter(){
    var s=document.getElementById('prod-search').value.toLowerCase();
    var c=document.getElementById('prod-cat-filter').value;
    var st=document.getElementById('prod-status-filter').value;
    prod_fd=PROD_DATA.filter(function(p){
      return (s?p.name.toLowerCase().indexOf(s)>-1||p.code.toLowerCase().indexOf(s)>-1:true)
        &&(c?p.cat===c:true)&&(st?p.status===st:true);
    });
    prod_page=1; renderProdList();
  }
  function renderProdList(){
    var sl=prod_fd.slice((prod_page-1)*PROD_RPP,prod_page*PROD_RPP);
    document.getElementById('prod-list-body').innerHTML=sl.map(function(p){
      var sc=p.status==='Active'?'b-add':'b-logout';
      return '<tr>'
        +'<td><div style="font-weight:500;color:var(--text-dark);">'+p.name+'</div><div style="font-size:11px;color:var(--text-light);font-family:monospace;">'+p.code+'</div></td>'
        +'<td>'+p.cat+'</td><td>&#8369;'+p.price.toFixed(2)+'</td><td>'+p.stock+'</td>'
        +'<td><span class="badge '+sc+'">'+p.status+'</span></td>'
        +'<td style="text-align:center;">'
        +'<button onclick="prodOpenDetail('+p.id+')" style="background:none;border:none;cursor:pointer;color:var(--olive);padding:4px;" title="View"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>'
        +'<button onclick="prodOpenEdit('+p.id+')" style="background:none;border:none;cursor:pointer;color:var(--text-mid);padding:4px;" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>'
        +'</td></tr>';
    }).join('');
    var tot=Math.ceil(prod_fd.length/PROD_RPP);
    var pg=document.getElementById('prod-list-pages');
    var html='<button class="pg-btn" onclick="prodPg('+(prod_page-1)+')" '+(prod_page===1?'disabled':'')+'>&#8249;</button>';
    for(var i=1;i<=tot;i++) html+='<button class="pg-btn '+(i===prod_page?'active':'')+'" onclick="prodPg('+i+')">'+i+'</button>';
    html+='<button class="pg-btn" onclick="prodPg('+(prod_page+1)+')" '+(prod_page===tot?'disabled':'')+'>&#8250;</button>';
    pg.innerHTML=html;
  }
  function prodPg(p){var tot=Math.ceil(prod_fd.length/PROD_RPP);if(p<1||p>tot)return;prod_page=p;renderProdList();}

  function prodShowView(view){
    ['list','new','detail','edit'].forEach(function(v){
      var el=document.getElementById('prod-view-'+v);
      if(el) el.style.display=v===view?'block':'none';
    });
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function prodOpenDetail(id){
    prod_active_id=id;
    var p=PROD_DATA.find(function(x){return x.id===id;});
    if(!p) return;
    document.getElementById('pd-name').textContent=p.name;
    document.getElementById('pd-code').textContent=p.code;
    document.getElementById('pd-desc').innerHTML=p.desc.replace(/\n/g,'<br>');
    document.getElementById('pd-stock').textContent=p.stock;
    document.getElementById('pd-price').textContent=p.price.toFixed(2);
    document.getElementById('pd-revenue').textContent=p.revenue.toFixed(2);
    if(p.discounted&&p.disc>0){
      document.getElementById('pd-disc-price').textContent=(p.price*(1-p.disc/100)).toFixed(2);
      document.getElementById('pd-disc-pct').textContent='-'+p.disc+'%';
      document.getElementById('pd-discount-wrap').style.display='block';
    } else {
      document.getElementById('pd-discount-wrap').style.display='none';
    }
    prodShowView('detail');
  }
  function prodOpenEdit(id){
    prod_active_id=id;
    var p=PROD_DATA.find(function(x){return x.id===id;});
    if(!p) return;
    document.getElementById('ep-name').value=p.name;
    document.getElementById('ep-code').value=p.code;
    document.getElementById('ep-desc').value=p.desc;
    document.getElementById('ep-stock').value=p.stock;
    document.getElementById('ep-price').value=p.price;
    document.getElementById('ep-revenue').textContent=p.revenue.toFixed(2);
    document.getElementById('ep-disc').value=p.disc;
    document.getElementById('ep-discounted').checked=p.discounted;
    prodShowView('edit');
  }
  function prodShowEditMode(){if(prod_active_id) prodOpenEdit(prod_active_id);}
  function openProdModal(action){
    prod_modal_action=action;
    document.getElementById('prod-modal-overlay').classList.add('open');
    ['save','delete','hide'].forEach(function(m){
      var el=document.getElementById('prod-modal-'+m);
      if(el) el.classList[action===m?'add':'remove']('open');
    });
  }
  function closeProdModal(){
    prod_modal_action=null;
    document.getElementById('prod-modal-overlay').classList.remove('open');
    ['save','delete','hide'].forEach(function(m){var el=document.getElementById('prod-modal-'+m);if(el) el.classList.remove('open');});
  }
  function confirmProdAction(action){
    var p=PROD_DATA.find(function(x){return x.id===prod_active_id;});
    if(action==='save'&&p){
      p.name=document.getElementById('ep-name').value;
      p.code=document.getElementById('ep-code').value;
      p.desc=document.getElementById('ep-desc').value;
      p.stock=parseInt(document.getElementById('ep-stock').value)||0;
      p.price=parseFloat(document.getElementById('ep-price').value)||0;
      p.disc=parseInt(document.getElementById('ep-disc').value)||0;
      p.discounted=document.getElementById('ep-discounted').checked;
      prod_fd=[].concat(PROD_DATA);
      closeProdModal();renderProdList();prodOpenDetail(p.id);
      showToast('Product saved successfully','&#10003;');
    } else if(action==='delete'&&p){
      PROD_DATA.splice(PROD_DATA.indexOf(p),1);
      prod_fd=[].concat(PROD_DATA);
      closeProdModal();prodShowView('list');renderProdList();
      showToast('Product deleted','&#10003;');
    } else if(action==='hide'&&p){
      p.status=p.status==='Hidden'?'Active':'Hidden';
      prod_fd=[].concat(PROD_DATA);
      closeProdModal();prodOpenDetail(p.id);renderProdList();
      showToast('Product status updated','&#10003;');
    }
  }
  function toggleCustomFields(){
    var cb=document.getElementById('np-custom');
    document.getElementById('np-custom-fields').style.display=cb.checked?'block':'none';
  }
  function prodNewSave(){
    var n=document.getElementById('np-name').value.trim();
    var pr=parseFloat(document.getElementById('np-price').value)||0;
    var st=parseInt(document.getElementById('np-stock').value)||0;
    var cat=document.getElementById('np-cat').value;
    var status=document.getElementById('np-status').value;
    var desc=document.getElementById('np-desc').value;
    if(!n){showToast('Please enter a product name','&#9888;');return;}
    var np={id:Date.now(),name:n,code:'#S@mPL'+Math.floor(Math.random()*9000+1000),cat:cat,price:pr,stock:st,revenue:0,disc:0,discounted:false,status:status,desc:desc};
    PROD_DATA.unshift(np);prod_fd=[].concat(PROD_DATA);prod_page=1;renderProdList();
    prodNewClear();prodShowView('list');
    showToast('Product added successfully','&#10003;');
  }
  function prodNewClear(){
    ['np-name','np-price','np-stock','np-desc'].forEach(function(id){document.getElementById(id).value='';});
    document.getElementById('np-custom').checked=false;
    document.getElementById('np-custom-fields').style.display='none';
  }

  // ── SETTINGS ──
  function toggleStg(track) {
    var thumb = track.querySelector('.stg-toggle-thumb');
    var isOn = track.classList.contains('off') ? false : true;
    if (isOn) {
      track.classList.add('off');
      thumb.classList.remove('on');
    } else {
      track.classList.remove('off');
      thumb.classList.add('on');
    }
  }
  function saveSettings(section) {
    var labels = { store:'Store information', order:'Order settings', notif:'Notification preferences' };
    showToast((labels[section]||'Settings')+' saved successfully','&#10003;');
  }

  // ── INIT ALL ──
  window.addEventListener('load', function(){
    renderCsMsgs();
    renderVouchers();
    renderBlogs();
    renderBanners();
    renderProdList();
  });

  // ── FAQ ACCORDION ──
  function toggleFaq(btn) {
    var answer = btn.nextElementSibling;
    var icon = btn.querySelector('.faq-icon');
    var isOpen = answer.classList.contains('open');
    answer.classList.toggle('open', !isOpen);
    if (icon) icon.innerHTML = isOpen ? '&#8744;' : '&#8743;';
  }
