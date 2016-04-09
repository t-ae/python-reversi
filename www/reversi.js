"use strict";var url="ws://127.0.0.1:8888/ws",cells=[],playerCell=null,webSocket=null,initView=function(){var e=document.getElementById("board"),n=document.getElementById("cell"),o=document.getElementById("indicator"),t=document.getElementById("row");for(var l in[0,1,2,3,4,5,6,7,8]){var c=t.cloneNode(!0);for(var a in[0,1,2,3,4,5,6,7,8]){var r=null;0==a&&0==l?(r=n.cloneNode(!0),playerCell=r):0==a||0==l?(r=o.cloneNode(!0),0==a?r.textContent="ABCDEFGH".charAt(l-1):r.textContent="12345678".charAt(a-1)):!function(){r=n.cloneNode(!0);var e=a-1,o=l-1;r.onclick=function(){handleClick(e,o)},cells.push(r)}(),c.appendChild(r)}e.appendChild(c)}},updateView=function(e,n){updateCell(playerCell,e),n.forEach(function(e,n){updateCell(cells[n],e)})},updateCell=function(e,n){0==n?e.className="cell":-1==n?e.className="cell white":e.className="cell black"},handle=function(e){if(e&&e.data){var n=JSON.parse(e.data),o=n.command;switch(console.log(n),o){case"update":updateView(n.player,n.board);break;case"judge":-1==n.winner?alert("White won."):1==n.winner?alert("Black won."):alert("Draw.");break;case"error":console.log("error:",n.message);break;default:console.log("invalid command:",o)}}},handleClick=function(e,n){var o={command:"put",position:[e,n]};webSocket.send(JSON.stringify(o))};onload=function(){initView(),webSocket=new WebSocket(url),webSocket.onopen=function(){console.log("WebSocket Opened.")},webSocket.onmessage=handle,webSocket.onclose=function(){alert("WebSocket Closed."),console.log("WebSocket Closed.")},webSocket.onerror=function(e){console.log("error:"+e)},document.getElementById("ai").onchange=function(){var e=document.getElementById("ai").value,n={command:"ai",ai:e};webSocket.send(JSON.stringify(n))};var e=function(e){return function(){var n={command:"restart",side:e};webSocket.send(JSON.stringify(n))}};document.getElementById("restart_black").onclick=e(1),document.getElementById("restart_white").onclick=e(-1)};