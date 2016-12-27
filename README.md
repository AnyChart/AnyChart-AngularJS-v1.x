[<img src="https://cdn.anychart.com/images/logo-transparent-segoe.png?2" width="234px" alt="AnyChart - Robust JavaScript/HTML5 Chart library for any project">](http://www.anychart.com)

AngularJS v1.0 directives for AnyChart
=========

The set of directives to provide an integration of [Anychart Framework](http://anychart.com)
and [AngularJS Framework](https://angularjs.org/). These directives simplify usage and
configuration of basic charts types, but also allows you to build complex dashboards. 


## Table of Contents
ADD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


## Quick start 
First off all, please look at the code snippet written below:
```html
<!DOCTYPE html>

<!-- Add a directive "ng-app" to activate MyApp module. -->
<html lang="en" ng-app="MyApp">
<head>
    <meta charset="UTF-8">
    <title>Anychart AngularJS plugin demo.</title>
    
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
            
            //Declare your own module and controller
            //and inject anychart-angularjs module to
            //start working.
            angular
                    .module('MyApp', ['anychart-angularjs'])
                    .controller('MyCtrl', ['$scope', function($scope) {
                    
                        //In this basic case you just need to
                        //provide a data to visualize.
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

    <!-- Finally, add Anychart directives. It’s as easy as pie (chart)! --> 
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

## Available directives

Directive | Code sample | Description
--- | --- | ---
anychart | `<div anychart></div>` | Supports attributes specific to this directive and generates a chart belonging to aychart module (not gantt, map or stock chart types)
anygantt | `<div anygantt></div>` | Supports specific attributes and generates a chart belonging to anygantt module (`ganttResource` and `ganttProject`)
anymap | `<div anymap></div>` | Supports specific attributes and generates a chart with map-specific series (`choropleth`, `bubbleMap`, etc.).
anystock | `<div anystock></div>` | Supports specific attributes and generates a Stock-Chart.
anychart-stage | `<div anychart-stage></div>` | Generates anychart [stage](http://docs.anychart.com/7.12.0/Dashboards/Stage-Based_Layout) to provide any kind of custom drawing (including dashboards)


#### `anychart`-directive attributes
Attribute | View Sample | Controller Sample | Description
--- | --- | --- | --- 
`ac-type` | `<div anychart ac-type="line"></div>` | - | Literally means what kind of simple chart will be created. In current sample, `anychart.line()`-constructor will be called.
`ac-data` | `<div anychart ac-data="myData"></div>` | `$scope.myData = [ ... ];`| This means that data must be put into a `$scope$` of your controller in a field named `myData`. This value becomes a data source for chart. Please not, that for `anychart` directive we set the data with `chart.data()`-method. If chart doesn't have this method, then just use `ac-instance` directive instead (described below).   
`ac-title` | `<div anychart ac-title="My Custom Title"></div>` | - | Sets a string value to a chart title.
`ac-legend` | `<div anychart ac-legend="true"></div>` | - | Takes a string representation of boolean flag. Literally means whether to enable or disable the legend. 
`ac-instance` | `<div anychart ac-instance="myChart"></div>` | `$scope.myChart = chart;` | It means that we create a chart instance in our controller manually and want to use it instead of auto-created. In this case we can configure a chart using [Anychart API](https://api.anychart.com/) and access the settings not available via these `ac`-attributes. To make it work, just create an instance manually, configure it and put into a `$scope` in specified field.
`ac-chart-draw` | `<div anychart ac-chart-draw="afterDrawHandler"></div>` | `$scope.afterDrawHandler = function(chart) { ... };` | Function called after the chart if drawn. Takes as argument that chart itself.

**Please note:** Here's no need to set a container of chart and call `chart.draw()`. This integration makes if automatically.

Sample:
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


!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

#### 2. anychart-stage
Используется для создания Anychart Stage для применения 
[Stage-Based Layout](http://docs.anychart.com/7.12.0/Dashboards/Stage-Based_Layout)
и размещения на нем нескольких графиков или просто кастомного рисования.
```html
<div anychart-stage></div>
```

Два слова об AnychartService:
Прежде всего, читаем вот [тут](https://docs.angularjs.org/guide/services)
 для понимания,что такое сервисы в ангуляре и для терминологии.
С помощью [Dependency Injection](https://docs.angularjs.org/guide/di) мы
 встраиваем в свой контроллер объект AnychartService (по сути - сервис)
 для шаринга данных между [Scopes](https://docs.angularjs.org/guide/scope)
Может быть использован для самых различных целей (это просто shared объект,
поэтому поля/методы в него можно пихать по желанию).

Но по умолчанию он содержит пустой массив `AnychartService.charts` как 
 раз для случая дашбординга:
```javascript
angular
        .module('MyApp', ['anychart-angularjs'])
        .controller('MyCtrl', ['$scope', 'AnychartService', function($scope, AnychartService) {
            var line = anychart.line();
            var area = anychart.area();
            var pie = anychart.pie();
            
            //setup charts here.
            
            var pieAfterDraw = function(chart) {
              chart.title('Pie after draw');
            };
            
            AnychartService.charts.push(
                line,
                area,
                {
                  chart: pie,
                  chartDraw: pieAfterDraw
                }
            );
        }]);
```
Что тут происходит? Первое - мы создали инстансы чартов. Второе - мы их 
 как-то настроили (баунды, данные, еще что-то). Третье - мы кладем их
 в чарты сервиса. Причем, в случае с паем мы дополнительно оборачиваем
 чарт в объект, где  добавлем поле `chartDraw` - это функция, принимающая
 аргументом сам чарт. Это функция, которая будет вызвана для чарта ПОСЛЕ
 его отрисовки.
 
**Пример работы с несколькими графиками на стэйдже и использованием 
AnychartService:** Simple_Charts_On_Stage.html

В общем случае, при любом инстанциировании чарта, инстанс также кладется
в сервис AnychartService и может быть использован, например, для
асинхронной подгрузки данных:
```javascript
angular
       .module('MyApp', ['anychart-angularjs'])
       .controller('MyCtrl', ['$scope', '$http', 'AnychartService', function($scope, $http, AnychartService) {
           var service = AnychartService;
           $http.get('../res/sample1.json').then(function(response) {
               if (service.chart) //If the chart has been successfully instantiated.
                   service.chart.data(response.data);
           });
       }]);
```
**Пример: ** Anychart_Load_Data_From_Json.html




Из директив поддерживает работу только с `ac-instance`, которая работает 
аналогично случаю, описанному выше для директивы anychart. Используется 
для инстанциирования стэйджа вручную, если есть такая необходимость:
```html
<div anychart-stage ac-instance="myStage" id="custom_stage_container"></div>
``` 
И в коде это выглядит так (не забыть положить созданный инстанс в 
соответствующее поле в $scope):
```javascript
angular
        .module('MyApp', ['anychart-angularjs'])
        .controller('MyCtrl', ['$scope', 'AnychartService', function($scope, AnychartService) {
            var stage = anychart.graphics.create('custom_stage_container');
            
            //do custom actions with stage
            
            $scope.myStage = stage;
        }]);
```

#### 3. anygantt
Директива anygantt нужна для инстанциирования и работы с чартами модуля 
anygantt (genttResource, ganttProject).
```html
<div anygantt></div>
``` 

Поддерживаются следующие директивы:
1. ac-type
```html
<div anygantt ac-type="ganttProject"></div>
``` 
Указывается тип гантт-диаргаммы (ganttResource или ganttProject), которая
будет инстанциирована. В этому случае будет вызван конструктор 
`anychart.ganttProject()`.

2. ac-data
```html
<div anygantt ac-data="myData"></div>
``` 
По аналогии с соответсвующей директивой anychart, в `$scope` кладется
сформированное дерево данных
```javascript
angular
        .module('MyApp', ['anychart-angularjs'])
        .controller('MyCtrl', ['$scope', function($scope) {
            $scope.myData = anychart.data.tree(getData(), anychart.enums.TreeFillingMethod.AS_TABLE)
        }]);
```
**Пример:** Simple_Gantt_Project.html

3. ac-title
```html
<div anygantt ac-title="Activity-Oriented Chart"></div>
```
Работает аналогично соотв. директиве anychart.

4. ac-instance
```html
<div anygantt ac-instance="ch"></div>
```
Работает аналогично соотв. директиве anychart.
**Пример:** Gantt_Resource_Instance_Usage.html

5. ac-chart-draw
```html
<div anygantt ac-chart-draw="fitAll"></div>
```
Работает аналогично соотв. директиве anychart.
**Пример:** Gantt_Project_After_Draw.html

6. ac-splitter-position
```html
<div anygantt ac-splitter-position="300"></div>
```
Устанавливает позицию сплиттера,аналог вызова метода `chart.splitterPosition(300)`

#### 3. anymap
```html
<div anymap></div>
```
Используется для создания чарта из модуля anymap.

ac-type должен принимать значения, соответствующие картам 
(типа anychart.choropleth(), anychart.bubbleMap()) и т.д.

Директивы ac-type, ac-data, ac-title, ac-legend, ac-instance, ac-chart-draw
работаю абсолютно аналогично уже описанным случаям.

1. ac-geo-data 
```html
<div anymap ac-geo-data="anychart.maps.australia"></div>
```
обязательный для карт атрибут, задает геоданные строкой. Отличается от
`ac-data` тем, что `ac-geo-data` - это данные для всего чарта, а `ac-data` - 
это данные, на которых будет создана дефолтная серия мап (см. пример)

**Пример:** Simple_Map.html

**Пример детальной настройки карты и работы с ее инстансом:** World_Map_Instance_After_Draw.html

#### 3. anystock
```html
<div anystock></div>
```

Работает только с директивами `ac-instance` и `ac-chart-draw` в связи 
со спецификой инстанциации стока.
**Пример:** Simple_Stock_Area.html









    
