(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist.plugins.ctCrosshair'] = factory();
  }
}(this, function () {

  /**
   * Chartist.js plugin to display crosshair  in a line chart.
   * Created by Aleksey Bazhenov todhruva@mail.ru
   */
  /* global Chartist */
  function myFun(lb) {
       return lb.toString().replace(/[^-.0-9]/g,'');
    };
  

  (function(window, document, Chartist) {
    'use strict';
    

    var defaultOptions = {
      axisSolid:true,
      showLegend:true,
      crossLine:'ct-cross-line',
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctCrosshair = function(options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function ctCrosshair(chart) {
        if(chart instanceof Chartist.Line) {
        var $chart = $(chart.container);
        var lgd,xtoolTip,ytoolTip;
        
          var x,y,zl,ofx,ofy;
          var cxp,ctx,hl,vl,low,lft,yy,nule;
          var dlt=5,snm=" ",isZero=false,lastAxe,axeSet=false;
          ofx=$chart.position().left;
          ofy=$chart.position().top;
          var str='';
          chart.on('draw', function(data) {
            if(data.type === 'grid') {
                   zl=[];
                   zl[data.index]=data.element;
                  if (x===undefined && data.index==0){
                      x=data.element.attr('x1');
                      y=data.element.attr('y1');
                      if (options.axisSolid){
                          data.element.addClass("axis");
                      };
                  } else if (data.index==0 && data.element.attr('class')==='ct-grid ct-vertical'){
                    if (options.axisSolid){

                        lastAxe=data.element;
                    };  
                  };     
                  // var x=data.element.attr('class');
             } else if(data.type === 'label') {
                 var nstr= data.text;
                 // str=myFun(nstr)+ '  '+str;
                 // $lgd.html('<span class="ct-label-val">'+str+'<span class="ct-label-val"> : '+ zl.length+' </span></span>');
                   
                    var z=nstr.toString().replace(/[^-.0-9]/g,'');
                    if (z==0){
                      if (options.axisSolid){
                          zl[data.index].addClass("axis");
                          isZero=true;
                      };
                    };

                    
              
            } else if(data.type === 'line') {
              var sn=data.element.parent(); 
              if(sn.attr('class')==='ct-series ct-series-a') {
                 snm= sn.attr('ct:series-name');
                
              };
              if ( options.axisSolid && !isZero) {
                  if ( typeof lastAxe!==undefined && !axeSet){
                      lastAxe.addClass("axis");;
                      axeSet=true;
                  } ;
              };
            };
            
          }).on('created',function(context){
                
                ctx=context;
                low=ctx.chartRect.y1;
                lft=ctx.chartRect.x1;
                vl=x=nule;
                axeSet=false;
                var htm='<div class="ct-legend"><span class="ct-label-snm">'+ snm+'</span> <span class="ct-label-lbl"> </span><span class="ct-label-val"></span></div>';
                lgd= ctx.svg.foreignObject(htm ,{
                       y:5,x:ofx*1.31,height:50,width:150 ,style:"overflow: visible;"
                    });

                var htm1='<div class="arrow_box">00</div>';
                xtoolTip= ctx.svg.foreignObject(htm1 ,{
                       y:low,x:lft,height:30,width:110 ,style:"overflow: visible;"
                    },false);
                $chart.find('.arrow_box').hide(); 

                var htm2='<div class="arrow_rbox">00</div>';
                ytoolTip= ctx.svg.foreignObject(htm2 ,{
                       y:low,x:lft,height:30,width:110 ,style:"overflow: visible;"
                    },false);
                $chart.find('.arrow_rbox').hide(); 

                if (!options.showLegend) lgd.hide();

          }); 
           
          $chart.on('mousemove', function(e) {
              var x=e.clientX-ofx,y=e.clientY;
              var kids = $(this).find('.ct-series-a');
              var pt2=0,pt1=0,p;
              kids.children().each(function( index ){
                var cp=$(this);
                if(cp.attr('class')==='ct-point'){
                    if (pt1===0){ pt1=cp}
                    else if(pt1!==0 && pt2===0)  {
                         pt2=cp;
                         dlt=Math.abs(pt1.attr('x1')-pt2.attr('x1'));
                    };
                    
                    if ( Math.abs(cp.attr('x1')-x)<dlt){
                        p=cp;
                        if (typeof cxp === "undefined"){
                            cxp=p; 
                        } else { 
                            cxp.attr({ style: 'stroke-width: 1px;'});
                            cxp=p;
                        };
                    };
                };    
              });
              if (typeof p !== "undefined"){
                snm = p.parent().attr('ct:series-name');
                yy=cxp.attr('y1');
                cxp.attr({style: 'stroke-width: 8px;'});
                var v=cxp.attr('y1'), h=cxp.attr('x1');
                if (typeof vl === "undefined"){
                     hl= ctx.svg.elem('line', {
                            x1: ctx.chartRect.x1,
                            x2: ctx.chartRect.x2,
                            y1: v,
                            y2: v
                        }, options.crossLine); 
                        vl= ctx.svg.elem('line',{x1: h,x2: h,y1: ctx.chartRect.y1,y2: ctx.chartRect.y2
                                                },options.crossLine);
                    
                } else {
                  vl.attr({x1:h,x2:h});
                  hl.attr({y1:v,y2:v});
                  var $xTp=$chart.find('.arrow_box');
                  xtoolTip.attr({y:low-$xTp.height()+25,x:(h-$xTp.width()*0.5-5)});
                  
                  var $yTp=$chart.find('.arrow_rbox');
                  ytoolTip.attr({y:yy-$yTp.height()+5,x:(lft-$yTp.width()/2-32)});
                  

                  var lb=cxp.attr('ct:meta');
                  var val=cxp.attr('ct:value');
                  $chart.find('.ct-label-val').text(val);
                  $chart.find('.ct-label-lbl').text(lb+": ");
                  $xTp.text(lb);
                  $yTp.text(val);
                  $xTp.show();
                  $yTp.show();
                 
                };
              };

          }); 

        };
      };
    };

  }(window, document, Chartist));

  return Chartist.plugins.ctCrosshair;

}));
