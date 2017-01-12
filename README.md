[<img src="https://cdn.anychart.com/images/logo-transparent-segoe.png?2" width="234px" alt="AnyChart - Robust JavaScript/HTML5 Chart library for any project">](http://www.anychart.com)

AngularJS v1.x directives for AnyChart

=========

AngularJS v1.x directives for AnyChart provide and easy way to use [AnyChart JavaScript Charts](http://anychart.com)
with [AngularJS Framework](https://angularjs.org/). 

## Table of Contents

* [Download and install](#download-and-install)
* [Quick start](#quick-start)
* [AnychartService](#anychartservice)
* [Available directives](#available-directives)
* [Demos overview](#demos-overview)
* [Contacts](#contacts)
* [Links](#links)
* [License](#license)

## Download and install

#### Package managers

You can install AngularJS-plugin using **npm**, **bower** or **yarn**:

* `npm install anychart-angularjs`
* `bower install anychart-angularjs`
* `yarn install anychart-angularjs`

#### Direct download

You can download AngularJS-plugin directly from the [dist](https://github.com/AnyChart/AnyChart-AngularJS/tree/master/dist) folder.

## Quick start 

Here is a basic sample that shows how to add a chart:

```html
<!DOCTYPE html>

<!-- Add the "ng-app" directive to activate MyApp module. -->
<html lang="en" ng-app="MyApp">
<head>
    <meta charset="UTF-8">
    <title>Anychart AngularJS plugin demo</title>
    
    <!-- Add libraries to work with. -->
    <script src="angular.min.js"></script>
    <script src="anychart-bundle.min.js"></script>
    <script src="anychart-angularjs.js"></script>

    <style>
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>

    <script>
        (function() {
            'use strict';
            
            // Declare your own module and controller
            // and inject anychart-angularjs module to
            // start working.
            angular
                    .module('MyApp', ['anychart-angularjs'])
                    .controller('MyCtrl', ['$scope', function($scope) {
                    
                        // In this basic case you just need to
                        // provide the data set to visualize.
                        $scope.myData = [
                            ["Chocolate", 5],
                            ["Rhubarb compote", 2],
                            ["Crêpe Suzette", 2],
                            ["American blueberry", 2],
                            ["Buttermilk", 1]
                        ];
                    }]);
        })();
    </script>
</head>

<!-- Add your controller -->
<body ng-controller="MyCtrl">

    <!-- Add AnyChart directives. It’s as easy as pie (chart)! --> 
    <div
            anychart
            ac-type="pie"
            ac-data="myData"
            ac-title="Simple Pie Demo"
            ac-legend="true"
            style="width: 100%; height: 100%">
    
    </div>
</body>
</html>
```

## AnychartService

AnychartService is an [Angular Service](https://docs.angularjs.org/guide/services). It is used to share data between scopes and to provide more opportunities for developers. To use it in your  module use the standard Angular [DI](https://docs.angularjs.org/guide/di) mechanism.

By default, AnychartService, as a shareable object, contains two fields:
* `AnychartService.charts` -  an array that contains chart instances for
dashboarding purposes.
* `AnychartService.chart` - current chart. Auto- or manually- created.
 It is useful for any deferred actions like async data loading.
 
```javascript
angular
       .module('MyApp', ['anychart-angularjs'])
       .controller('MyCtrl', ['$scope', '$http', 'AnychartService', function($scope, $http, AnychartService) {
           var service = AnychartService;
           $http.get('sample1.json').then(function(response) {
               if (service.chart) // If a chart has been successfully instantiated.
                   service.chart.data(response.data);
           });
       }]);
```


## Available directives

Directive | Code sample | Description
--- | --- | ---
anychart | `<div anychart></div>` | Supports attributes specific to this directive and generates a chart belonging to anychart module (not gantt, map or stock chart types)
anygantt | `<div anygantt></div>` | Supports specific attributes and generates a chart belonging to anygantt module (`ganttResource` and `ganttProject`)
anymap | `<div anymap></div>` | Supports specific attributes and generates a chart with map-specific series (`choropleth`, `bubbleMap`, etc.).
anystock | `<div anystock></div>` | Supports specific attributes and generates a Stock-Chart.
anychart-stage | `<div anychart-stage></div>` | Generates anychart [stage](http://docs.anychart.com/7.12.0/Dashboards/Stage-Based_Layout) to provide any kind of custom drawing (including dashboards)


#### `anychart`-directive attributes
We use this directive to deal with charts included in anychart-module.
 
Attribute | View Sample | Controller Sample | Description
--- | --- | --- | --- 
ac-type | `<div anychart ac-type="line"></div>` | - | Literally means what kind of simple chart will be created. In current sample, `anychart.line()`-constructor will be called.
ac-data | `<div anychart ac-data="myData"></div>` | `$scope.myData = [ ... ];`| This means that data must be put into a `$scope` of your controller in a field named `myData`. This value becomes a data source for chart. Please note, that for `anychart` directive we set the data with `chart.data()`-method. If chart doesn't have this method, then just use `ac-instance` directive instead (described below).   
ac-title | `<div anychart ac-title="My Custom Title"></div>` | - | Sets a string value to a chart title.
ac-legend | `<div anychart ac-legend="true"></div>` | - | Takes a string representation of boolean flag. Literally means whether to enable or disable the legend. 
ac-instance | `<div anychart ac-instance="myChart"></div>` | `$scope.myChart = chart;` | It means that we create a chart instance in our controller manually and want to use it instead of auto-created. In this case we can configure a chart using [Anychart API](https://api.anychart.com/) and access the settings not available via these `ac`-attributes. To make it work, just create an instance manually, configure it and put into a `$scope` in specified field.
ac-chart-draw | `<div anychart ac-chart-draw="afterDrawHandler"></div>` | `$scope.afterDrawHandler = function(chart) { ... };` | Function called after the chart if drawn. Takes as argument that chart itself.

**Please note:** Here's no need to set a container of chart and call `chart.draw()`. This integration makes if automatically.

#### Sample:
```html
<div anychart ac-data="myData" ac-type="pie" ac-chart-draw="afterDrawHandler"></div>
```
```javascript
angular
        .module('MyApp', ['anychart-angularjs'])
        .controller('MyCtrl', ['$scope', function($scope) {
            $scope.myData = [
                ["Chocolate", 5],
                ["Rhubarb compote", 2],
                ["Crêpe Suzette", 2],
                ["American blueberry", 2],
                ["Buttermilk", 1]
            ];
            
            $scope.afterDrawHandler = function(chart) {
                chart.title('After draw title');
            }
        }]);
``` 


#### `anychart-stage`-directive attributes
We use this directive to deal with anychart stage for custom drawing
and dashboarding purposes.

Attribute | View Sample | Controller Sample | Description
--- | --- | --- | --- 
ac-instance | `<div anychart-stage ac-instance="myStage"></div>` | `$scope.myStage = stage;` | It means that we create a stage instance in our controller manually and want to use it instead of auto-created. In this case we can configure a stage using [Anychart API](https://api.anychart.com/) and access the settings not available via these `ac`-attributes. To make it work, just create an instance manually, configure it and put into a `$scope` in specified field.


We already know about AnychartService, well we can use it to deal with 
anychart-stage for dashboarding purposes. Take a look on this sample:

```javascript
angular
       .module('MyApp', ['anychart-angularjs'])
       .controller('MyCtrl', ['$scope', 'AnychartService', function($scope, AnychartService) {
           var data = [
               ["Chocolate", 5],
               ["Rhubarb compote", 2],
               ["Crêpe Suzette", 2],
               ["American blueberry", 2],
               ["Buttermilk", 1]
           ];
       
           var pie = anychart.pie(data);
           pie.title("Top 5 pancake fillings");
           pie.bounds(0, 0, '50%', '100%');
       
           var line = anychart.line(data);
           line.title("Top 5 pancake fillings");
           line.bounds('50%', 0, '50%', '100%');
       
           var afterDrawCallback = function(chart) {
               chart.title('After Draw Title');
           };
       
           AnychartService.charts.push(
                   {
                       chart: pie,
                       chartDraw: afterDrawCallback
                   },
                   line
           );
       
       }]);
```
What's going on here?
* We create instances of `anychart.pie` and `anychart.line`.
* We configure it (data, bounds, title).
* We put it in `AnychartService.charts`. Please, note that we wrap `pie`-chart
 with object with one more additional field `chartDraw`. Here `chartDraw` is
 just a function that will be called after `pie`-chart is drawn with a single argument
 that is `pie`-chart itself.
* Controller of `anychart-stage`-directive will process an `AnychartService.charts`-array
itself. 
 

#### `anygantt`-directive attributes
We use this directive to deal with charts included in anygantt-module 
(`ganttResource`, `ganttProject`).

Attribute | View Sample | Controller Sample | Description
--- | --- | --- | --- 
ac-type | `<div anygantt ac-type="ganttProject"></div>` | - | Literally means what kind of gantt chart will be created. In current sample, `anychart.ganttProject()`-constructor will be called.
ac-data | `<div anygantt ac-data="myData"></div>` | `$scope.myData = tree;` | By analogue with corresponding directive of `anychart`-directive, we have to put created data tree into `$scope` in specified field.   
ac-title | `<div anygantt ac-title="My Custom Title"></div>` | - | Sets a string value to a chart title.
ac-instance | `<div anygantt ac-instance="myChart"></div>` | `$scope.myChart = chart;` | Works with predefined chart instance (see `anychart`-directive). 
ac-chart-draw | `<div anygantt ac-chart-draw="afterDrawHandler"></div>` | `$scope.afterDrawHandler = function(chart) { ... };` | Works the same way as described in  `anychart`-directive.
ac-splitter-position | `<div anygantt ac-splitter-position="300"></div>` | - | Sets gantt chart splitter position. Does the same as `chart.splitterPosition(300)`.



#### `anymap`-directive attributes
We use this directive to deal with charts included in anymap-module 
(`choropleth`, `bubbleMap`, etc).


Attribute | View Sample | Controller Sample | Description
--- | --- | --- | --- 
ac-type | `<div anymap ac-type="ganttProject"></div>` | - | See `anychart`-directive corresponding attribute.
ac-data | `<div anymap ac-data="myData"></div>` | `$scope.myData = data;` | See `anychart`-directive corresponding attribute.   
ac-title | `<div anymap ac-title="My Custom Title"></div>` | - | See `anychart`-directive corresponding attribute.
ac-legend | `<div anymap ac-legend="true"></div>` | - | See `anychart`-directive corresponding attribute.
ac-instance | `<div anymap ac-instance="myChart"></div>` | `$scope.myChart = chart;` | See `anychart`-directive corresponding attribute. 
ac-chart-draw | `<div anymap ac-chart-draw="afterDrawHandler"></div>` | `$scope.afterDrawHandler = function(chart) { ... };` | See `anychart`-directive corresponding attribute.
ac-geo-data  | `<div anymap ac-geo-data="anychart.maps.australia"></div>` | - | Required attribute. Differs from `ac-data`: `ac-geo-data` sets the data all chart, while `ac-data` is a data for default map series.


#### `anystock`-directive attributes
Works only with `ac-instance` and `ac-chart-draw` attributes because of very specific
Stock Chart setup.


## Demos overview
Demos folder content overview.
* **[Anychart_Load_Data_From_Json.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Anychart_Load_Data_From_Json.html)**: Demo of async data loading. Also
shows how AnychartService can be used. **Please, note:** This demo can be run on a server only because of cross origin requests security issues. 
* **[Full_Custom_Stage.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Full_Custom_Stage.html)**: Demonstrates how to create and use full custom stage.
* **[Gantt_Project_After_Draw.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Gantt_Project_After_Draw.html)**: Shows how to simply create Gantt Project
Chart and setup after-draw handler.
* **[Gantt_Resource_Instance_Usage.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Gantt_Resource_Instance_Usage.html)**: Shows how to use manually created 
instance og Gantt Resource chart and how to add after draw handler.
* **[Line_Chart_After_Draw.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Line_Chart_After_Draw.html)**: Demonstrates how to create and use instance
of chart and add after draw handler.
* **[Line_Chart_Data_Streaming.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Line_Chart_Data_Streaming.html)**: Simple data streaming demo.
* **[Simple_Charts_On_Stage.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Simple_Charts_On_Stage.html)**: Demonstrates how to create and add simple 
charts on anychart stage and how to add after draw handler.
* **[Simple_Gantt_Project.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Simple_Gantt_Project.html)**: Simple Gantt Project Chart demo.
* **[Simple_Map.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Simple_Map.html)**: Simple Anymap demo.
* **[Simple_Pie.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Simple_Pie.html)**: Simple pie-chart demo.
* **[Simple_Stock_Area.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Simple_Stock_Area.html)**: Simple Anystock demo.
* **[Software_Sales_Dashboard.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Software_Sales_Dashboard.html)**: Demonstrates how to use `anychart-stage`
 directive to build interactive dashboard.
* **[World_Map_Instance_After_Draw.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/World_Map_Instance_After_Draw.html)**: World map demo. Shows how to
 use map chart instance and how to add after draw handler.


## Contacts

* Web: [www.anychart.com](www.anychart.com)
* Email: [contact@anychart.com](mailto:contact@anychart.com)
* Twitter: [anychart](https://twitter.com/anychart)
* Facebook: [AnyCharts](https://www.facebook.com/AnyCharts)
* LinkedIn: [anychart](https://www.linkedin.com/company/anychart)

## Links

* [AnyChart Website](http://www.anychart.com)
* [Download AnyChart](http://www.anychart.com/download/)
* [AnyChart Licensing](http://www.anychart.com/buy/)
* [AnyChart Support](http://www.anychart.com/support/)
* [Report Issues](http://github.com/AnyChart/anychart/issues)
* [AnyChart Playground](http://playground.anychart.com)
* [AnyChart Documentation](http://docs.anychart.com)
* [AnyChart API Reference](http://api.anychart.com)
* [AnyChart Sample Solutions](http://www.anychart.com/solutions/)
* [AnyChart Integrations](http://www.anychart.com/integrations/)

## License

[© AnyChart.com - JavaScript charts](http://www.anychart.com). All rights reserved.








    
