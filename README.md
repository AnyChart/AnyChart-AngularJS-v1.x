[<img src="https://cdn.anychart.com/images/logo-transparent-segoe.png?2" width="234px" alt="AnyChart - Robust JavaScript/HTML5 Chart library for any project">](https://www.anychart.com)

# AngularJS v1.x directives for AnyChart

AngularJS v1.x directives for AnyChart provide an easy way to use [AnyChart JavaScript Charts](https://www.anychart.com)
with [AngularJS Framework](https://angularjs.org/). 

## Table of Contents

* [Download and install](#download-and-install)
* [Quick start](#quick-start)
* [AnychartService](#anychartservice)
* [Available Directives](#available-directives)
* [Demos Overview](#demos-overview)
* [Contacts](#contacts)
* [Links](#links)
* [License](#license)

## Download and install

#### Package managers

You can install AngularJS-plugin using **npm**, **bower** or **yarn**:

* `npm install anychart-angularjs`
* `bower install anychart-angularjs`
* `yarn add anychart-angularjs`

#### Direct download

You can download AngularJS plugin directly from the [dist](https://github.com/AnyChart/AnyChart-AngularJS/tree/master/dist) folder.

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
* `AnychartService.chart` - current chart. Auto or manually created.
 It is useful for any deferred actions like async data loading.
 
```javascript
angular
       .module('MyApp', ['anychart-angularjs'])
       .controller('MyCtrl', ['$scope', '$http', 'AnychartService', function($scope, $http, AnychartService) {
           var service = AnychartService;
           $http.get('sample1.json').then(function(response) {
               if (service.chart) // If a chart is successfully instantiated.
                   service.chart.data(response.data);
           });
       }]);
```


## Available Directives

Directive | Code sample | Description
--- | --- | ---
anychart | `<div anychart></div>` | Supports attributes specific to this directive and generates a chart from anychart module (not gantt, map or stock chart types)
anygantt | `<div anygantt></div>` | Supports attributes specific to this directive and generates a chart from anygantt module (`ganttResource` and `ganttProject`)
anymap | `<div anymap></div>` |Supports attributes specific to this directive and generates a chart from anymap module (`choropleth`, `bubbleMap`, etc.).
anystock | `<div anystock></div>` | Supports attributes specific to this directive and generates a chart from anystock module (`anychart.stock`).
anychart-stage | `<div anychart-stage></div>` | Generates anychart [stage](https://docs.anychart.com/Dashboards/Stage-Based_Layout) to deal with complex charts and any kind of custom drawing.


#### `anychart` directive attributes
This directive is used to work with charts from anychart module.
 
Attribute | View Sample | Controller Sample | Description
--- | --- | --- | --- 
ac-type | `<div anychart ac-type="line"></div>` | - | Kind of chart to create. In a sample, `anychart.line()` constructor is called.
ac-data | `<div anychart ac-data="myData"></div>` | `$scope.myData = [ ... ];`| Data to be put into a `$scope` of your controller in a field named `myData`. This value is a data source for a chart. Please note that for `anychart` directive we set the data with `chart.data()`-method. If chart doesn't have this method, use `ac-instance` directive instead (described below).   
ac-title | `<div anychart ac-title="My Custom Title"></div>` | - | Sets a string value to a chart title.
ac-legend | `<div anychart ac-legend="true"></div>` | - | A string representation of a boolean flag. Enables/disables a legend. 
ac-instance | `<div anychart ac-instance="myChart"></div>` | `$scope.myChart = chart;` | Chart instance is created in a controller manually and it is used instead of auto-created. In this case a chart can be configired using [Anychart API](https://api.anychart.com/) and access to the settings is not available via these `ac`-attributes. To make it work, create an instance manually, configure it and put into a `$scope` in specified field.
ac-chart-draw | `<div anychart ac-chart-draw="afterDrawHandler"></div>` | `$scope.afterDrawHandler = function(chart) { ... };` | Function called after the chart is drawn. Takes a chart itself as and argument.

**Please note:** No need to set a container of a chart and call `chart.draw()`. The plugin does it automatically.

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


#### `anychart-stage` directive attributes
This directive is used to draw anychart stage for custom drawing and complex charts.

Attribute | View Sample | Controller Sample | Description
--- | --- | --- | --- 
ac-instance | `<div anychart-stage ac-instance="myStage"></div>` | `$scope.myStage = stage;` | A stage instances is created in a controller manually and it is used instead of auto-created. In this case a stage is configured using [Anychart API](https://api.anychart.com/) and access to the settings is not available via these `ac`-attributes. To make it work, create an instance manually, configure it and put into a `$scope` into a specified field.

[AnychartService](#anychartservice)  can be used it to deal with  anychart stage. Take a look at this sample:

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

This is what happens in the sample above:
* Instances of `anychart.pie` and `anychart.line` are created.
* Data, bounds, title and so one are configured.
* Charts art put into `AnychartService.charts`. Note that we wrap `pie`-chart
 into an object with one additional field:: `chartDraw`. `chartDraw` is
  a function that is called after `pie` chart is drawn with a single argument
 that is `pie` chart itself.
* Controller of `anychart-stage` directive processes the `AnychartService.charts` array. 
 

#### `anygantt` directive attributes
This directive is used to deal with charts from anygantt module (`ganttResource`, `ganttProject`).

Attribute | View Sample | Controller Sample | Description
--- | --- | --- | --- 
ac-type | `<div anygantt ac-type="ganttProject"></div>` | - | Kind of gantt chart to be created. In a sample, `anychart.ganttProject()`-constructor will be called.
ac-data | `<div anygantt ac-data="myData"></div>` | `$scope.myData = tree;` | Just as the corresponding directive of `anychart`-directive, data tree is put into a `$scope` in a specified field.   
ac-title | `<div anygantt ac-title="My Custom Title"></div>` | - | Sets a string value to a chart title.
ac-instance | `<div anygantt ac-instance="myChart"></div>` | `$scope.myChart = chart;` | Works with a predefined chart instance (see `anychart` directive). 
ac-chart-draw | `<div anygantt ac-chart-draw="afterDrawHandler"></div>` | `$scope.afterDrawHandler = function(chart) { ... };` | Works the same way as described in `anychart` directive.
ac-splitter-position | `<div anygantt ac-splitter-position="300"></div>` | - | Sets gantt chart splitter position.

#### `anymap` directive attributes
This directive is used to deal with charts from anymap module (`choropleth`, `bubbleMap`, etc).

Attribute | View Sample | Controller Sample | Description
--- | --- | --- | --- 
ac-type | `<div anymap ac-type="map"></div>` | - | See `anychart` directive corresponding attribute.
ac-data | `<div anymap ac-data="myData"></div>` | `$scope.myData = data;` | See `anychart` directive corresponding attribute.   
ac-title | `<div anymap ac-title="My Custom Title"></div>` | - | See `anychart` directive corresponding attribute.
ac-legend | `<div anymap ac-legend="true"></div>` | - | See `anychart` directive corresponding attribute.
ac-instance | `<div anymap ac-instance="myChart"></div>` | `$scope.myChart = chart;` | See `anychart` directive corresponding attribute. 
ac-chart-draw | `<div anymap ac-chart-draw="afterDrawHandler"></div>` | `$scope.afterDrawHandler = function(chart) { ... };` | See `anychart` directive corresponding attribute.
ac-geo-data  | `<div anymap ac-geo-data="anychart.maps.australia"></div>` | - | Required attribute. Differs from `ac-data`: `ac-geo-data` sets geo data source, `ac-data` is a data for the default map series.


#### `anystock` directive attributes
Works only with `ac-instance` and `ac-chart-draw` attributes because of the specifics of Stock Chart setup.

## Demos overview
See these samples to learn how things work:
* **[Anychart_Load_Data_From_Json.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Anychart_Load_Data_From_Json.html)**: Demo of async data loading. Also
shows how AnychartService can be used. **Please, note:** This demo can launched only from a web-server, in browser window,  because of cross origin requests security issues. 
* **[Custom_Stage.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Full_Custom_Stage.html)**: Demonstrates how to create and use a custom stage.
* **[Gantt_Project_After_Draw.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Gantt_Project_After_Draw.html)**: Shows how to create Gantt Project
Chart and add the after-draw handler.
* **[Gantt_Resource_Instance_Usage.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Gantt_Resource_Instance_Usage.html)**: Shows how to use manually created 
instance of a Gantt Resource chart and how to add the after-draw handler.
* **[Line_Chart_After_Draw.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Line_Chart_After_Draw.html)**: Demonstrates how to create and use instance
of a chart and add the after-draw handler.
* **[Line_Chart_Data_Streaming.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Line_Chart_Data_Streaming.html)**: Simple data-streaming demo.
* **[Simple_Charts_On_Stage.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Simple_Charts_On_Stage.html)**: Demonstrates how to create and add simple 
charts on the anychart stage and how to add the after-draw handler.
* **[Simple_Gantt_Project.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Simple_Gantt_Project.html)**: Simple Gantt Project Chart demo.
* **[Simple_Map.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Simple_Map.html)**: Simple Anymap demo.
* **[Simple_Pie.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Simple_Pie.html)**: Simple Pie chart demo.
* **[Simple_Stock_Area.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Simple_Stock_Area.html)**: Simple AnyStock demo.
* **[Software_Sales_Dashboard.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/Software_Sales_Dashboard.html)**: Demonstrates how to use `anychart-stage`
 directive to build the interactive dashboard.
* **[World_Map_Instance_After_Draw.html](https://github.com/AnyChart/AnyChart-AngularJS/blob/master/demos/World_Map_Instance_After_Draw.html)**: World map demo. Shows how to
 use map chart instance and how to add the after-draw handler.


## Contacts

* Web: [www.anychart.com](https://www.anychart.com)
* Email: [contact@anychart.com](mailto:contact@anychart.com)
* Twitter: [anychart](https://twitter.com/anychart)
* Facebook: [AnyCharts](https://www.facebook.com/AnyCharts)
* LinkedIn: [anychart](https://www.linkedin.com/company/anychart)

## Links

* [AnyChart Website](https://www.anychart.com)
* [Download AnyChart](https://www.anychart.com/download/)
* [AnyChart Licensing](https://www.anychart.com/buy/)
* [AnyChart Support](https://www.anychart.com/support/)
* [Report Issues](https://github.com/AnyChart/anychart/issues)
* [AnyChart Playground](https://playground.anychart.com)
* [AnyChart Documentation](https://docs.anychart.com)
* [AnyChart API Reference](https://api.anychart.com)
* [AnyChart Sample Solutions](https://www.anychart.com/solutions/)
* [AnyChart Integrations](https://www.anychart.com/integrations/)

## License


AngularJS v1.x directives for AnyChart include two parts:
- code of the plugin that allows to use Javascript library (in this case, AnyChart) with AngularJS 1.x.
You can use, edit, modify it, use it with other Javascript libraries without any restrictions.
It is released under [Apache 2.0 License](LICENSE).
- AnyChart JavaScript library. It is released under Commercial license.
You can test this plugin with the trial version of AnyChart.
Our trial version is not limited by time and doesn't contain any feature 
limitations. Check details [here](https://www.anychart.com/buy/).

If you have any questions regarding licensing - please contact us. <sales@anychart.com>
[![Analytics](https://ga-beacon.appspot.com/UA-228820-4/Plugins/AngularJS-v1x?pixel&useReferer)](https://github.com/igrigorik/ga-beacon)








    
