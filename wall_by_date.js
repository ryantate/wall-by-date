/*

WALL BY DATE
Bookmarklet to jump to a particular date on a Facebook Wall.

by Ryan Tate http://ryantate.com/facebook

MIT license http://creativecommons.org/licenses/MIT/

*/

function FBMOD_updateMaxTime(){ 
   var date = new Date(); 
   date.setFullYear(
      parseInt(document.getElementById('FBMOD_year').value, 10), 
      parseInt(document.getElementById('FBMOD_month').value, 10), 
      parseInt(document.getElementById('FBMOD_day').value, 10)
   ); 
   ProfileStream.instance.max_time = parseInt(date.getTime()/1000, 10); 
   return true;
}
(function (){
    var il8ns = {
       en: {
	  months:  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	  intro: 'from before'
       },
       fr: {
	  months: ['janvier', 'f&#233;vrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'ao&#251;t', 'septembre', 'octobre', 'novembre', 'd&#233;cembre'],
	  intro: '&#224; partir du'
       }
    };
    function il8n(){
       var bodyClass = document.getElementsByTagName('body')[0].getAttribute('class');
       if (/\bLocale_fr_/.test(bodyClass)){
	  return il8ns.fr;
       }
       else {
	  return il8ns.en;
       }
    }
    var form = document.getElementById('FBMOD_form');
    if (! form){
       var element = document.getElementById('profile_pager_container');
       var a = element.getElementsByTagName('a')[0];
       var a2 = a.cloneNode(true);
       a.removeChild(a.childNodes[1]);
       a.removeChild(a.childNodes[1]);
       a2.removeChild(a2.firstChild);
       var span = document.createElement('span');
       span.style.float = 'left';
       var html = '<span>&nbsp;&nbsp;' + il8n().intro + '</span>'; 
       html += '<form action="#" style="display: inline-block; vertical-align: text-top; margin-top: -6px; " id="FBMOD_form" onsubmit="' + a.getAttribute('onclick') + '">';
       html += '<input id="FBMOD_day" name="FBMOD_day" size="2" value="1" onchange="FBMOD_updateMaxTime()" />';
       html += '<select id="FBMOD_month" name="FBMOD_month" onchange="FBMOD_updateMaxTime()">';
       for (var i = 0; i < il8n().months.length; i++){
	  html += '<option value="' + i + '">' + il8n().months[i] + '</option>';
       }
       html += '</select> ';
       html += '<input id="FBMOD_year" name="FBMOD_year" value="2010" size="4" onchange="FBMOD_updateMaxTime()" />';
       html += '</form>';
       span.innerHTML = html;
       element.firstChild.appendChild(span);
       form = span.getElementsByTagName('form')[0];
       var oldDate = new Date();
       oldDate.setTime(ProfileStream.instance.max_time * 1000);
       form.FBMOD_year.value = oldDate.getFullYear();
       form.FBMOD_month.value = oldDate.getMonth();
       form.FBMOD_day.value = oldDate.getDate();
       element.firstChild.appendChild(a2);
    }
    form.scrollIntoView();
 })();
