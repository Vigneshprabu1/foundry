(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{"4KjW":function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),e=function(){return function(){}}(),o=u("pMnS"),a=u("FbN9"),i=u("8mMr"),s=u("dWZg"),c=u("Ip0R"),r=u("ZYCi"),b=function(){function l(){}return l.prototype.updateDuration=function(){this.duration&&(this.animationElem.style.animationDuration=this.duration+"s")},l.prototype.ngOnInit=function(){this.animationElem=document.querySelectorAll(".ng-marquee-wrapper > div")[0],this.updateDuration()},l}(),d=function(){return function(){}}(),p=t.qb({encapsulation:0,styles:[".ng-marquee-wrapper[_ngcontent-%COMP%]{overflow:hidden;position:relative}.ng-marquee-wrapper[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{height:100%;display:inline-block;margin:0;padding-left:100%;-webkit-animation:20s linear infinite marqueeAnimation;animation:20s linear infinite marqueeAnimation;white-space:nowrap}.ng-marquee-wrapper[_ngcontent-%COMP%]:hover > div[_ngcontent-%COMP%]{-webkit-animation-play-state:paused;animation-play-state:paused}@-webkit-keyframes marqueeAnimation{0%{-webkit-transform:translateX(0);transform:translateX(0)}100%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}}@keyframes marqueeAnimation{0%{-webkit-transform:translateX(0);transform:translateX(0)}100%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}}@media (max-width:500px){.ng-marquee-wrapper[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;height:100%;margin:0;-webkit-transform:translateX(100%);transform:translateX(100%);-webkit-animation:9s linear 1s infinite marqueeAnimation;animation:9s linear 1s infinite marqueeAnimation;white-space:nowrap}}"],data:{}});function g(l){return t.Mb(2,[(l()(),t.sb(0,0,null,null,2,"div",[["class","ng-marquee-wrapper"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,1,"div",[],null,null,null,null,null)),t.Bb(null,0)],null,null)}var m=u("6blF"),f=u("67Y/"),h=u("9Z1F"),x=u("sE5F"),C=function(){function l(l){this.http1=l,this.baseUrl="/api",this.headers=new x.d({"Content-type":"application/json"}),this.options=new x.g({headers:this.headers})}return l.prototype.about=function(){return this.http1.get(this.baseUrl+"/homePages").pipe(Object(f.a)(function(l){return l.json()}),Object(h.a)(function(l){return m.a.throw(l)}))},l.prototype.news=function(){return this.http1.get(this.baseUrl+"/homePages/news.txt").pipe(Object(f.a)(function(l){return l.json()}),Object(h.a)(function(l){return m.a.throw(l)}))},l.prototype.mark=function(){return this.http1.get(this.baseUrl+"/homePages/markque.txt").pipe(Object(f.a)(function(l){return l.json()}),Object(h.a)(function(l){return m.a.throw(l)}))},l.ngInjectableDef=t.V({factory:function(){return new l(t.Z(x.e))},token:l,providedIn:"root"}),l}(),O=function(){function l(l){this.uploadservice=l}return l.prototype.ngOnInit=function(){this.mark()},l.prototype.mark=function(){var l=this;this.uploadservice.about().subscribe(function(n){console.log(n.markque),l.text2=n.markque},function(l){console.log(l)})},l}(),M=t.qb({encapsulation:0,styles:[[".mark[_ngcontent-%COMP%]{width:100%;float:left;margin:2em 0}"]],data:{}});function P(l){return t.Mb(0,[(l()(),t.sb(0,0,null,null,4,"div",[["class","mark"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,3,"ng-marquee",[["duration","30"]],null,null,null,g,p)),t.rb(2,114688,null,0,b,[],{duration:[0,"duration"]},null),(l()(),t.sb(3,0,null,0,1,"mark",[],null,null,null,null,null)),(l()(),t.Kb(4,null,["",""]))],function(l,n){l(n,2,0,"30")},function(l,n){l(n,4,0,n.component.text2)})}var _=function(){function l(l){this.uploadservice=l}return l.prototype.ngOnInit=function(){this.about()},l.prototype.about=function(){var l=this;this.uploadservice.about().subscribe(function(n){console.log(l.text),l.text=n.about},function(l){console.log(l)})},l}(),y=t.qb({encapsulation:0,styles:[["h1[_ngcontent-%COMP%]{text-align:center;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#0091ea}p[_ngcontent-%COMP%]{padding:4em;background:linear-gradient(-45deg,#e8e8e8 5px,transparent 5px) 0 5px,linear-gradient(-45deg,#eee 5px,transparent 5px) 10px 0,linear-gradient(-45deg,#e8e8e8 5px,transparent 5px) 0 10px,linear-gradient(-45deg,#eee 5px,transparent 5px) 10px 5px,linear-gradient(-45deg,#eee 10px,transparent 10px),linear-gradient(#eee 25%,#e8e8e8 25%,#e8e8e8 50%,transparent 50%,transparent 75%,#eee 75%,#eee);background-color:#cacaca;background-size:10px 10px;margin-bottom:0;margin-top:0}"]],data:{}});function v(l){return t.Mb(0,[(l()(),t.sb(0,0,null,null,1,"h1",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["About"])),(l()(),t.sb(2,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Kb(3,null,["",""]))],null,function(l,n){l(n,3,0,n.component.text)})}var A=function(){function l(){}return l.prototype.ngOnInit=function(){},l}(),w=t.qb({encapsulation:0,styles:[["@import url(https://fonts.googleapis.com/css?family=Quicksand:400,300);body[_ngcontent-%COMP%]{font-family:Quicksand,sans-serif}.gal-container[_ngcontent-%COMP%]{padding:12px}.gal-item[_ngcontent-%COMP%]{overflow:hidden;padding:3px}.gal-item[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]{height:350px;overflow:hidden}.box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;width:100%;object-fit:cover;-o-object-fit:cover}.gal-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus{outline:0}.gal-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:after{content:\"\\e003\";font-family:'Glyphicons Halflings';opacity:0;background-color:rgba(0,0,0,.75);position:absolute;right:3px;left:3px;top:3px;bottom:3px;text-align:center;line-height:350px;font-size:30px;color:#fff;transition:all .5s ease-in-out 0s}.gal-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:after{opacity:1}.modal-open[_ngcontent-%COMP%]   .gal-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.4)}.modal-open[_ngcontent-%COMP%]   .gal-item[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]{padding:0}.modal-open[_ngcontent-%COMP%]   .gal-item[_ngcontent-%COMP%]   button.close[_ngcontent-%COMP%]{position:absolute;width:25px;height:25px;background-color:#000;opacity:1;color:#fff;z-index:999;right:-12px;top:-12px;border-radius:50%;font-size:15px;border:2px solid #fff;line-height:25px;box-shadow:0 0 1px 1px rgba(0,0,0,.35)}.modal-open[_ngcontent-%COMP%]   .gal-item[_ngcontent-%COMP%]   button.close[_ngcontent-%COMP%]:focus{outline:0}.modal-open[_ngcontent-%COMP%]   .gal-item[_ngcontent-%COMP%]   button.close[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:relative;top:-3px;font-weight:lighter;text-shadow:none}.gal-container[_ngcontent-%COMP%]   .modal-dialogue[_ngcontent-%COMP%]{width:80%}.gal-container[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{position:relative;height:40px;top:-40px;padding:10px 25px;background-color:rgba(0,0,0,.5);color:#fff;text-align:left}.gal-container[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:15px;font-weight:300;line-height:20px}.gal-container[_ngcontent-%COMP%]   .modal.fade[_ngcontent-%COMP%]   .modal-dialog[_ngcontent-%COMP%]{-webkit-transform:scale(.1);transform:scale(.1);top:100px;opacity:0;transition:all .3s}.gal-container[_ngcontent-%COMP%]   .modal.fade.in[_ngcontent-%COMP%]   .modal-dialog[_ngcontent-%COMP%]{-webkit-transform:scale(1);transform:scale(1);-webkit-transform:translate3d(0,-100px,0);transform:translate3d(0,-100px,0);opacity:1}@media (min-width:768px){.gal-container[_ngcontent-%COMP%]   .modal-dialog[_ngcontent-%COMP%]{width:55%;margin:50 auto}}@media (max-width:768px){.gal-container[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{height:250px}}i.red[_ngcontent-%COMP%]{color:#bc0213}.gal-container[_ngcontent-%COMP%]{padding-top:0;padding-bottom:35px}footer[_ngcontent-%COMP%]{font-family:Quicksand,sans-serif}footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#88c425}.hh[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center;color:#3f51b5}.hh[_ngcontent-%COMP%]{width:100%;float:left;margin:4em 0 2em}"]],data:{}});function k(l){return t.Mb(0,[(l()(),t.sb(0,0,null,null,83,"div",[["class","marginn"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,82,"section",[],null,null,null,null,null)),(l()(),t.sb(2,0,null,null,81,"div",[["class","container gal-container"]],null,null,null,null,null)),(l()(),t.sb(3,0,null,null,34,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.sb(4,0,null,null,3,"div",[["class","hh"]],null,null,null,null,null)),(l()(),t.sb(5,0,null,null,2,"h1",[],null,null,null,null,null)),(l()(),t.sb(6,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Gallery"])),(l()(),t.sb(8,0,null,null,14,"div",[["class","col-md-8 col-sm-12 co-xs-12 gal-item"]],null,null,null,null,null)),(l()(),t.sb(9,0,null,null,13,"div",[["class","box"]],null,null,null,null,null)),(l()(),t.sb(10,0,null,null,1,"a",[["data-target","#1"],["data-toggle","modal"],["href","#"]],null,null,null,null,null)),(l()(),t.sb(11,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/slide1.jpg"]],null,null,null,null,null)),(l()(),t.sb(12,0,null,null,10,"div",[["class","modal fade"],["id","1"],["role","dialog"],["tabindex","-1"]],null,null,null,null,null)),(l()(),t.sb(13,0,null,null,9,"div",[["class","modal-dialog"],["role","document"]],null,null,null,null,null)),(l()(),t.sb(14,0,null,null,8,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),t.sb(15,0,null,null,2,"button",[["aria-label","Close"],["class","close"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),t.sb(16,0,null,null,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["\xd7"])),(l()(),t.sb(18,0,null,null,1,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t.sb(19,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/slide1.jpg"]],null,null,null,null,null)),(l()(),t.sb(20,0,null,null,2,"div",[["class","col-md-12 description"]],null,null,null,null,null)),(l()(),t.sb(21,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["This is the first one on my Gallery"])),(l()(),t.sb(23,0,null,null,14,"div",[["class","col-md-4 col-sm-6 co-xs-12 gal-item"]],null,null,null,null,null)),(l()(),t.sb(24,0,null,null,13,"div",[["class","box"]],null,null,null,null,null)),(l()(),t.sb(25,0,null,null,1,"a",[["data-target","#2"],["data-toggle","modal"],["href","#"]],null,null,null,null,null)),(l()(),t.sb(26,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/slide2.jpg"]],null,null,null,null,null)),(l()(),t.sb(27,0,null,null,10,"div",[["class","modal fade"],["id","2"],["role","dialog"],["tabindex","-1"]],null,null,null,null,null)),(l()(),t.sb(28,0,null,null,9,"div",[["class","modal-dialog"],["role","document"]],null,null,null,null,null)),(l()(),t.sb(29,0,null,null,8,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),t.sb(30,0,null,null,2,"button",[["aria-label","Close"],["class","close"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),t.sb(31,0,null,null,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["\xd7"])),(l()(),t.sb(33,0,null,null,1,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t.sb(34,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/slide2.jpg"]],null,null,null,null,null)),(l()(),t.sb(35,0,null,null,2,"div",[["class","col-md-12 description"]],null,null,null,null,null)),(l()(),t.sb(36,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["This is the second one on my Gallery"])),(l()(),t.sb(38,0,null,null,45,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.sb(39,0,null,null,14,"div",[["class","col-md-4 col-sm-6 co-xs-12 gal-item"]],null,null,null,null,null)),(l()(),t.sb(40,0,null,null,13,"div",[["class","box"]],null,null,null,null,null)),(l()(),t.sb(41,0,null,null,1,"a",[["data-target","#3"],["data-toggle","modal"],["href","#"]],null,null,null,null,null)),(l()(),t.sb(42,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/slide3.jpg"]],null,null,null,null,null)),(l()(),t.sb(43,0,null,null,10,"div",[["class","modal fade"],["id","3"],["role","dialog"],["tabindex","-1"]],null,null,null,null,null)),(l()(),t.sb(44,0,null,null,9,"div",[["class","modal-dialog"],["role","document"]],null,null,null,null,null)),(l()(),t.sb(45,0,null,null,8,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),t.sb(46,0,null,null,2,"button",[["aria-label","Close"],["class","close"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),t.sb(47,0,null,null,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["\xd7"])),(l()(),t.sb(49,0,null,null,1,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t.sb(50,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/slide3.jpg"]],null,null,null,null,null)),(l()(),t.sb(51,0,null,null,2,"div",[["class","col-md-12 description"]],null,null,null,null,null)),(l()(),t.sb(52,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["This is the third one on my Gallery"])),(l()(),t.sb(54,0,null,null,14,"div",[["class","col-md-4 col-sm-6 co-xs-12 gal-item"]],null,null,null,null,null)),(l()(),t.sb(55,0,null,null,13,"div",[["class","box"]],null,null,null,null,null)),(l()(),t.sb(56,0,null,null,1,"a",[["data-target","#4"],["data-toggle","modal"],["href","#"]],null,null,null,null,null)),(l()(),t.sb(57,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/slide4.jpg"]],null,null,null,null,null)),(l()(),t.sb(58,0,null,null,10,"div",[["class","modal fade"],["id","4"],["role","dialog"],["tabindex","-1"]],null,null,null,null,null)),(l()(),t.sb(59,0,null,null,9,"div",[["class","modal-dialog"],["role","document"]],null,null,null,null,null)),(l()(),t.sb(60,0,null,null,8,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),t.sb(61,0,null,null,2,"button",[["aria-label","Close"],["class","close"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),t.sb(62,0,null,null,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["\xd7"])),(l()(),t.sb(64,0,null,null,1,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t.sb(65,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/slide4.jpg"]],null,null,null,null,null)),(l()(),t.sb(66,0,null,null,2,"div",[["class","col-md-12 description"]],null,null,null,null,null)),(l()(),t.sb(67,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["This is the fourth one on my Gallery"])),(l()(),t.sb(69,0,null,null,14,"div",[["class","col-md-4 col-sm-6 co-xs-12 gal-item"]],null,null,null,null,null)),(l()(),t.sb(70,0,null,null,13,"div",[["class","box"]],null,null,null,null,null)),(l()(),t.sb(71,0,null,null,1,"a",[["data-target","#5"],["data-toggle","modal"],["href","#"]],null,null,null,null,null)),(l()(),t.sb(72,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/slide5.jpg"]],null,null,null,null,null)),(l()(),t.sb(73,0,null,null,10,"div",[["class","modal fade"],["id","5"],["role","dialog"],["tabindex","-1"]],null,null,null,null,null)),(l()(),t.sb(74,0,null,null,9,"div",[["class","modal-dialog"],["role","document"]],null,null,null,null,null)),(l()(),t.sb(75,0,null,null,8,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),t.sb(76,0,null,null,2,"button",[["aria-label","Close"],["class","close"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),t.sb(77,0,null,null,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["\xd7"])),(l()(),t.sb(79,0,null,null,1,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t.sb(80,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/slide5.jpg"]],null,null,null,null,null)),(l()(),t.sb(81,0,null,null,2,"div",[["class","col-md-12 description"]],null,null,null,null,null)),(l()(),t.sb(82,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["This is the fifth one on my Gallery"]))],null,null)}var K=function(){function l(l){this.uploadservice=l}return l.prototype.ngOnInit=function(){this.news()},l.prototype.news=function(){var l=this;this.uploadservice.about().subscribe(function(n){l.text=n.news},function(l){console.log(l)})},l}(),j=t.qb({encapsulation:0,styles:[[".marginn[_ngcontent-%COMP%]{margin-top:5em}.abt_content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:27px;font-weight:600}.abt_content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:19px;line-height:1.5em}.headd[_ngcontent-%COMP%]{color:#1e3264;font-size:3em;margin-bottom:1.8em;margin-top:1.5em}.headdd[_ngcontent-%COMP%]{color:#00ced1}.abt_content[_ngcontent-%COMP%]{padding:4em;background:linear-gradient(-45deg,#e8e8e8 5px,transparent 5px) 0 5px,linear-gradient(-45deg,#eee 5px,transparent 5px) 10px 0,linear-gradient(-45deg,#e8e8e8 5px,transparent 5px) 0 10px,linear-gradient(-45deg,#eee 5px,transparent 5px) 10px 5px,linear-gradient(-45deg,#eee 10px,transparent 10px),linear-gradient(#eee 25%,#e8e8e8 25%,#e8e8e8 50%,transparent 50%,transparent 75%,#eee 75%,#eee);background-color:#cacaca;background-size:10px 10px;margin-bottom:3%;margin-top:0}.new[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center;color:#283593}.hh[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center;color:#3f51b5}angular-image-slider[_ngcontent-%COMP%]{z-index:1}.new[_ngcontent-%COMP%]{width:100%;float:left;margin:2em}"]],data:{}});function q(l){return t.Mb(0,[(l()(),t.sb(0,0,null,null,8,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,7,"div",[["class","col-sm-12"]],null,null,null,null,null)),(l()(),t.sb(2,0,null,null,3,"div",[["class","new"]],null,null,null,null,null)),(l()(),t.sb(3,0,null,null,2,"h1",[],null,null,null,null,null)),(l()(),t.sb(4,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["News"])),(l()(),t.sb(6,0,null,null,2,"div",[["class","abt_content"]],null,null,null,null,null)),(l()(),t.sb(7,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Kb(8,null,[" "," "]))],null,function(l,n){l(n,8,0,n.component.text)})}var I=function(){function l(){}return l.prototype.ngOnInit=function(){},l}(),z=t.qb({encapsulation:0,styles:[['.bg-gray-dark[_ngcontent-%COMP%], .bg-primary[_ngcontent-%COMP%], .context-dark[_ngcontent-%COMP%]{color:rgba(255,255,255,.8)}.footer-classic[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .footer-classic[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:active, .footer-classic[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus{color:#fff}.nav-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding-top:5px;padding-bottom:5px}.nav-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:before{margin-left:0;opacity:1;visibility:visible}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}.social-inner[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:100%;padding:23px;font:900 13px/1 Lato,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;text-transform:uppercase;color:rgba(255,255,255,.5)}.social-container[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%]{border:1px solid rgba(255,255,255,.1)}.nav-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{content:"\\f14f";color:#4d6de6;display:inline-block;vertical-align:baseline;margin-left:-28px;margin-right:7px;opacity:0;visibility:hidden;transition:.22s ease}#contact[_ngcontent-%COMP%]{margin-bottom:3em}']],data:{}});function S(l){return t.Mb(0,[(l()(),t.sb(0,0,null,null,40,"div",[["class","container-fluid bg-grey"],["id","contact"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,2,"h2",[["class","text-center"]],null,null,null,null,null)),(l()(),t.sb(2,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["CONTACT"])),(l()(),t.sb(4,0,null,null,36,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.sb(5,0,null,null,11,"div",[["class","col-sm-4"]],null,null,null,null,null)),(l()(),t.sb(6,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Contact us and we'll get back to you within 24 hours."])),(l()(),t.sb(8,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.sb(9,0,null,null,0,"span",[["class","glyphicon glyphicon-map-marker"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,[" SHINELOGICS IN INDIA "])),(l()(),t.sb(11,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.sb(12,0,null,null,0,"span",[["class","glyphicon glyphicon-phone"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,[" +91-9445033734 +91-4422431428"])),(l()(),t.sb(14,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.sb(15,0,null,null,0,"span",[["class","glyphicon glyphicon-envelope"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,[" info@shinelogics.com"])),(l()(),t.sb(17,0,null,null,11,"div",[["class","col-sm-4"]],null,null,null,null,null)),(l()(),t.sb(18,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Contact us and we'll get back to you within 24 hours."])),(l()(),t.sb(20,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.sb(21,0,null,null,0,"span",[["class","glyphicon glyphicon-map-marker"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["SHINELOGICS IN USA "])),(l()(),t.sb(23,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.sb(24,0,null,null,0,"span",[["class","glyphicon glyphicon-phone"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["+1-813-607-0664 "])),(l()(),t.sb(26,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.sb(27,0,null,null,0,"span",[["class","glyphicon glyphicon-envelope"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,[" info@shinelogics.com"])),(l()(),t.sb(29,0,null,null,11,"div",[["class","col-sm-4"]],null,null,null,null,null)),(l()(),t.sb(30,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Contact us and we'll get back to you within 24 hours."])),(l()(),t.sb(32,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.sb(33,0,null,null,0,"span",[["class","glyphicon glyphicon-map-marker"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["SHINELOGICS IN AUSTRALIA "])),(l()(),t.sb(35,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.sb(36,0,null,null,0,"span",[["class","glyphicon glyphicon-phone"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,[" +61 449937478"])),(l()(),t.sb(38,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),t.sb(39,0,null,null,0,"span",[["class","glyphicon glyphicon-envelope"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,[" info@shinelogics.com"]))],null,null)}var N=function(){function l(){}return l.prototype.ngOnInit=function(){},l}(),G=t.qb({encapsulation:0,styles:[["*[_ngcontent-%COMP%]{padding:0;margin:0}example-icon[_ngcontent-%COMP%]{padding:0 14px}.example-spacer[_ngcontent-%COMP%]{flex:1 1 auto}head[_ngcontent-%COMP%]{background-color:#2d2d30;font-size:100%}table[_ngcontent-%COMP%]{width:100%}.button[_ngcontent-%COMP%]{margin-left:30px;color:#fff}example-form[_ngcontent-%COMP%]{min-width:150px;max-width:500px;width:100%}.example-full-width[_ngcontent-%COMP%]{width:50%}.nav[_ngcontent-%COMP%]{color:fff;position:fixed;width:100%;z-index:1;font-family:Montserrat,sans-serif;margin-bottom:0;background-color:#2d2d30;border:0;font-size:14px!important;letter-spacing:4px;opacity:.9}img[_ngcontent-%COMP%]{max-height:880px}p[_ngcontent-%COMP%]{font-family:'Times New Roman',Times,serif;font-size:24px}"]],data:{}});function L(l){return t.Mb(0,[(l()(),t.sb(0,0,null,null,18,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,16,"mat-toolbar",[["class","nav mat-toolbar"],["color","primary"]],[[2,"mat-toolbar-multiple-rows",null],[2,"mat-toolbar-single-row",null]],null,null,a.b,a.a)),t.rb(2,4243456,null,1,i.a,[t.k,s.a,c.d],{color:[0,"color"]},null),t.Ib(603979776,1,{_toolbarRows:1}),(l()(),t.sb(4,0,null,1,13,"mat-toolbar-row",[["class","mat-toolbar-row"]],null,null,null,null,null)),t.rb(5,16384,[[1,4]],0,i.c,[],null,null),(l()(),t.sb(6,0,null,null,1,"P",[],null,null,null,null,null)),(l()(),t.Kb(-1,null,["FOUNDRY"])),(l()(),t.sb(8,0,null,null,0,"span",[["class","example-spacer"]],null,null,null,null,null)),(l()(),t.sb(9,0,null,null,1,"a",[["class","button"],["href","#about"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["About"])),(l()(),t.sb(11,0,null,null,1,"a",[["class","button"],["href","#gallery"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["Gallery"])),(l()(),t.sb(13,0,null,null,1,"a",[["class","button"],["href","#footer"]],null,null,null,null,null)),(l()(),t.Kb(-1,null,["News"])),(l()(),t.sb(15,0,null,null,2,"a",[["class","button"],["routerLink","login"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Cb(l,16).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.rb(16,671744,null,0,r.m,[r.l,r.a,c.j],{routerLink:[0,"routerLink"]},null),(l()(),t.Kb(-1,null,["Login"])),(l()(),t.sb(18,0,null,null,0,"img",[["src","http://52.26.246.107:3000/api/uploads/Home.jpg"],["width","100%"]],null,null,null,null,null)),(l()(),t.sb(19,0,null,null,1,"app-mark",[],null,null,null,P,M)),t.rb(20,114688,null,0,O,[C],null,null),(l()(),t.sb(21,0,null,null,2,"div",[["id","about"]],null,null,null,null,null)),(l()(),t.sb(22,0,null,null,1,"app-about",[],null,null,null,v,y)),t.rb(23,114688,null,0,_,[C],null,null),(l()(),t.sb(24,0,null,null,2,"div",[["id","gallery"]],null,null,null,null,null)),(l()(),t.sb(25,0,null,null,1,"app-gallery",[],null,null,null,k,w)),t.rb(26,114688,null,0,A,[],null,null),(l()(),t.sb(27,0,null,null,2,"div",[["id","news"]],null,null,null,null,null)),(l()(),t.sb(28,0,null,null,1,"app-news",[],null,null,null,q,j)),t.rb(29,114688,null,0,K,[C],null,null),(l()(),t.sb(30,0,null,null,2,"div",[["id","footer"]],null,null,null,null,null)),(l()(),t.sb(31,0,null,null,1,"app-footer",[],null,null,null,S,z)),t.rb(32,114688,null,0,I,[],null,null)],function(l,n){l(n,2,0,"primary"),l(n,16,0,"login"),l(n,20,0),l(n,23,0),l(n,26,0),l(n,29,0),l(n,32,0)},function(l,n){l(n,1,0,t.Cb(n,2)._toolbarRows.length>0,0===t.Cb(n,2)._toolbarRows.length),l(n,15,0,t.Cb(n,16).target,t.Cb(n,16).href)})}function T(l){return t.Mb(0,[(l()(),t.sb(0,0,null,null,1,"app-homepage",[],null,null,null,L,G)),t.rb(1,114688,null,0,N,[],null,null)],function(l,n){l(n,1,0)},null)}var X=t.ob("app-homepage",N,T,{},{},[]),U=u("t68o"),R=u("zbXB"),F=u("xYTU"),H=u("NcP4"),D=u("M2Lx"),E=u("eDkP"),Y=u("Fzqc"),Z=u("4tE/"),B=u("Wf4p"),Q=u("o3x0"),V=u("jQLj"),W=u("mVsa"),J=u("uGex"),$=u("ZYjt"),ll=u("OkvK"),nl=u("v9Dh"),ul=u("4epT"),tl=function(){return function(){}}(),el=u("lLAP"),ol=u("4c35"),al=u("qAlS"),il=u("Lwpp"),sl=u("y4qS"),cl=u("UodH"),rl=u("u7R8"),bl=u("6Wmm"),dl=u("FVSy"),pl=u("de3e"),gl=u("/dO6"),ml=u("LC5p"),fl=u("YhbO"),hl=u("jlZm"),xl=u("seP3"),Cl=u("r43C"),Ol=u("SMsm"),Ml=u("/VYK"),Pl=u("b716"),_l=u("0/Q6"),yl=u("Z+uX"),vl=u("Blfk"),Al=u("9It4"),wl=u("Nsh5"),kl=u("w+lc"),Kl=u("kWGw"),jl=u("vARd"),ql=u("La40"),Il=u("BHnd"),zl=u("ZAI4"),Sl=u("YSh2");u.d(n,"HomepageModuleNgFactory",function(){return Nl});var Nl=t.pb(e,[],function(l){return t.zb([t.Ab(512,t.j,t.eb,[[8,[o.a,X,U.a,R.b,R.a,F.a,F.b,H.a]],[3,t.j],t.z]),t.Ab(4608,c.o,c.n,[t.w,[2,c.E]]),t.Ab(4608,D.c,D.c,[]),t.Ab(4608,E.d,E.d,[E.j,E.f,t.j,E.i,E.g,t.s,t.B,c.d,Y.b,[2,c.i]]),t.Ab(5120,E.k,E.l,[E.d]),t.Ab(5120,Z.b,Z.c,[E.d]),t.Ab(4608,B.d,B.d,[]),t.Ab(5120,Q.c,Q.d,[E.d]),t.Ab(135680,Q.e,Q.e,[E.d,t.s,[2,c.i],[2,Q.b],Q.c,[3,Q.e],E.f]),t.Ab(4608,V.i,V.i,[]),t.Ab(5120,V.a,V.b,[E.d]),t.Ab(5120,W.a,W.c,[E.d]),t.Ab(4608,B.c,B.y,[[2,B.h],s.a]),t.Ab(5120,J.a,J.b,[E.d]),t.Ab(4608,$.f,B.e,[[2,B.i],[2,B.n]]),t.Ab(5120,ll.d,ll.a,[[3,ll.d]]),t.Ab(5120,nl.b,nl.c,[E.d]),t.Ab(5120,ul.c,ul.a,[[3,ul.c]]),t.Ab(1073742336,c.c,c.c,[]),t.Ab(1073742336,r.n,r.n,[[2,r.t],[2,r.l]]),t.Ab(1073742336,tl,tl,[]),t.Ab(1073742336,s.b,s.b,[]),t.Ab(1073742336,D.d,D.d,[]),t.Ab(1073742336,el.a,el.a,[]),t.Ab(1073742336,Y.a,Y.a,[]),t.Ab(1073742336,ol.g,ol.g,[]),t.Ab(1073742336,al.d,al.d,[]),t.Ab(1073742336,E.h,E.h,[]),t.Ab(1073742336,al.b,al.b,[]),t.Ab(1073742336,il.a,il.a,[]),t.Ab(1073742336,sl.p,sl.p,[]),t.Ab(1073742336,B.n,B.n,[[2,B.f],[2,$.g]]),t.Ab(1073742336,B.x,B.x,[]),t.Ab(1073742336,B.v,B.v,[]),t.Ab(1073742336,B.s,B.s,[]),t.Ab(1073742336,Z.e,Z.e,[]),t.Ab(1073742336,cl.c,cl.c,[]),t.Ab(1073742336,rl.a,rl.a,[]),t.Ab(1073742336,bl.a,bl.a,[]),t.Ab(1073742336,dl.e,dl.e,[]),t.Ab(1073742336,pl.c,pl.c,[]),t.Ab(1073742336,gl.d,gl.d,[]),t.Ab(1073742336,ml.b,ml.b,[]),t.Ab(1073742336,Q.k,Q.k,[]),t.Ab(1073742336,V.j,V.j,[]),t.Ab(1073742336,fl.c,fl.c,[]),t.Ab(1073742336,hl.a,hl.a,[]),t.Ab(1073742336,xl.e,xl.e,[]),t.Ab(1073742336,B.o,B.o,[]),t.Ab(1073742336,Cl.b,Cl.b,[]),t.Ab(1073742336,Ol.c,Ol.c,[]),t.Ab(1073742336,Ml.c,Ml.c,[]),t.Ab(1073742336,Pl.c,Pl.c,[]),t.Ab(1073742336,_l.c,_l.c,[]),t.Ab(1073742336,W.b,W.b,[]),t.Ab(1073742336,B.z,B.z,[]),t.Ab(1073742336,B.p,B.p,[]),t.Ab(1073742336,yl.a,yl.a,[]),t.Ab(1073742336,vl.a,vl.a,[]),t.Ab(1073742336,Al.a,Al.a,[]),t.Ab(1073742336,J.d,J.d,[]),t.Ab(1073742336,wl.h,wl.h,[]),t.Ab(1073742336,kl.a,kl.a,[]),t.Ab(1073742336,Kl.a,Kl.a,[]),t.Ab(1073742336,ll.e,ll.e,[]),t.Ab(1073742336,jl.d,jl.d,[]),t.Ab(1073742336,ql.j,ql.j,[]),t.Ab(1073742336,i.b,i.b,[]),t.Ab(1073742336,nl.e,nl.e,[]),t.Ab(1073742336,Il.m,Il.m,[]),t.Ab(1073742336,ul.d,ul.d,[]),t.Ab(1073742336,zl.c,zl.c,[]),t.Ab(1073742336,d,d,[]),t.Ab(1073742336,e,e,[]),t.Ab(1024,r.j,function(){return[[{path:"",component:N}]]},[]),t.Ab(256,gl.a,{separatorKeyCodes:[Sl.f]},[]),t.Ab(256,B.g,B.k,[])])})}}]);