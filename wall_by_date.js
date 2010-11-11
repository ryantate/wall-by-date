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
       span.innerHTML = '<span>&nbsp;&nbsp;from before</span> <form action="#" style=\'display: inline-block; vertical-align: text-top; \' id=\'FBMOD_form\' onsubmit=\'' + a.getAttribute('onclick') + '\'><select id=\'FBMOD_month\' name=\'FBMOD_month\' onchange=\'FBMOD_updateMaxTime()\'><option value=\'0\'>January</option><option value=\'1\'>February</option><option value=\'2\'>March</option><option value=\'3\'>April</option><option value=\'4\'>May</option><option value=\'5\'>June</option><option value=\'6\'>July</option><option value=\'7\'>August</option><option value=\'8\'>September</option><option value=\'9\'>October</option><option value=\'10\'>November</option><option value=\'11\'>December</option></select> <input id=\'FBMOD_day\' name=\'FBMOD_day\' size=\'2\' value=\'1\' onchange=\'FBMOD_updateMaxTime()\' /> <input id=\'FBMOD_year\' name=\'FBMOD_year\' value=\'2010\' size=\'4\' onchange=\'FBMOD_updateMaxTime()\' /></form>';
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
