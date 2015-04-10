# chartist-plugin-crosshair
Simple crosshair like yahoo charts or google for [Chartist.js](https://github.com/gionkunz/chartist-js) charting library. Just add 

 -   chartist-plugin-crosshair.css
 -   chartist-plugin-crosshair.js

to your project, in option section add this:

   var option={   your options ...  ,
           **plugins:[Chartist.plugins.ctCrosshair()]**
    }
and  see it 
 
![Pic](https://raw.githubusercontent.com/Dhruuva/chartist-plugin-crosshair/master/images/crossPic.jpg "CrossHair Pugin") 

> **Note!** For proper plugin work You need:
> 

> - Your chart data JSON object must have seria name and meta,  looks like `var data = {
                    labels: ['W1','W2' ],
                    series: [{name:"test",data: [ {value: 1, meta: 'W1'},{value: 1, meta: 'W2'},]]
                 };` 

 

----------
## Plugin has options ##

- 1. Plugin can make main axis solid (dhashed): 

`plugins:Chartist.plugins.ctCrosshair({axisSolid:true})]`

 implement you custom style in css selector it is
>`.ct-chart .ct-grid.ct-horizontal.axis{stroke:dimgray; stroke-dasharray: none;}
.ct-chart .ct-grid.ct-vertical.axis{stroke:dimgray; stroke-dasharray: none;}`

-   Plugin show (hide) a legend 
>`plugins:[Chartist.plugins.ctCrosshair({showLegend:true,})]`

 in css selector  
 > it is main legend container`.ct-legend{...` 
 , seria name  `.ct-label-snm {..`
, Y label `.ct-label-lbl{...`
, X label `.ct-label-val {...`.

-  Also you  can implement you custom style for the **crosshair lines** in css `.ct-cross-line {
  stroke: blue;
  stroke-width: 1px;
  stroke-dasharray: 2px;
}` 
and for the crosshair arrow boxes: 
Y axe `.arrow_rbox {...` 
and X `.arrow_box{ . . .`

So, in order to put all together you can see this sample on [jsFiddle](http://jsfiddle.net/dhruuva/pmdsmqbm/).
Sample above has loading  the data  from Yahoo finance and build multi series chart. **Also** keep in mind that crosshair worked only on first line-seria, to change it place, on multy-line chart, You need implement some code reodering series array like in this sample. 

> **Note!** Plugin work only on Line-chart yet.. I'm planning add it in bar-chart also and I've idea to implement ability scroll the chart.







