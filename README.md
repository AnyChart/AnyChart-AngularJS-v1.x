# AngularJS-plugin. Базовое описание для документеров/переводчиков.


##Оглавление
Сюда добавить оглавление по аналогии с [документацией](http://docs.anychart.com/)

##Overview
Что это за плагин и зачем он нужен. Думаю, здесь нужно отметить,что
плагин в первую очередь является примером интеграции эничиарт-компонента
в ангуляр-фрэймворк. 

_Переводчикам подумать:_ нужно ли оставить ссылки на документацию
ангуляра (я их тут привожу для понимания)? С одной стороны,
они не нужны тем, кто и так шарит в ангуляре, с другой стороны,
значительно облегчают понимание того, о чем вообще идет речь.

_Еще:_ пожалуйста, подумайте, нужно ли добавить ссылки на примеры 
(папка demos)?

Также можно смотреть в [README зингчартов](https://github.com/zingchart/ZingChart-AngularJS)

#### Что оно вообще умеет?
1. Работа в angular-like стиле с anychart-компонентом (примеры будут ниже).
1. Некоторое облегчение создания типичных графиков, потому что в простейшем
случае создание чарта подразумеват:
    1. создание инстанса чарта
    1. задание ему данных
    1. задание базовых дополнительных настроек (title, legend)
    1. задание конейнера
    1. вызов метода draw()
1. В это время, для плагина в простейшем случае нужно просто иметь
 div-элемент со специфичными тегами и задать данные в собственном 
 контроллере (примеры будут ниже)
1. С использованием [директив](https://docs.angularjs.org/guide/directive)
мы покрываем работоспособность четырех наших компонентов + работу стэйджа
для кастомного рисования и дашбордов. Примеры и описание директив - ниже.

## Quick start 
1. подключаем либы, включая наш плагин
```html
    <script src="angular.min.js"></script>
    <script src="anychart-bundle.min.js"></script>
    <script src="anychart-angularjs.js"></script>
```
2. Создаем собственный модуль и инджектим в него наш модуль-плагин,чтобы его
можно было использовать. Подробности об инджекте читать вот
[тут](https://docs.angularjs.org/guide/concepts) в разделе 
_View-independent business logic: Services_. Эта ссылка для переводчиков
к прочтению,чтобы понимать, какими терминами оперировать. Вставлять
в документацию ее не надо.
```javascript
angular.module('MyApp', ['anychart-angularjs'])
```
3. Создаем собственный контроллер, который будет работать в приложении.
Про контроллеры читать вот [тут](https://docs.angularjs.org/guide/controller)
для терминологии.
```html
<head>
   <!-- подключаем либы -->

    <script>
        (function() {
            'use strict';
            angular
                    .module('MyApp', ['anychart-angularjs'])
                    .controller('MyCtrl', ['$scope', function($scope) {
                        //make some noise.
                    }]);
        })();
    </script>
</head>
```
4. С помощью ангуляровских директив объявляем приложение и контроллер
(подробности читать [тут](https://docs.angularjs.org/tutorial/step_00) 
в ознакомительных целях и для выбора формулировок)
```html
    <html lang="en" ng-app="MyApp">
    ...
    <body ng-controller="MyCtrl">
```
5. Добавляем директиву для начала работы (помним, где читать про
[директивы](https://docs.angularjs.org/guide/directive)?) 
Про доступные директивы будет сказано ниже. Есть 2 способа подключить 
директивы:

Первый способ:
```html
<!-- Available way -->
<anychart></anychart>
```

Второй способ:
```html
<!-- Preferred way -->
<div anychart></div>
```
Второй способ предпочтительнее, потому что для HTML это простая полноценная
дивка и не будет лишних проблем с заданием CSS для корректного оформления и
отображения. Надо понимать, что в данном случае помеченная директивой 
дивка становится [контейнером](https://api.anychart.com/7.12.0/anychart.core.Chart#container)
 для чарта.

6. Добавляем обычное стилевое оформление для дива и специфичные 
anychart-атрибуты для работы (про них будет рассказано ниже)
```html
<div anychart ac-type="pie" ac-data="myData" style="..."></div>
```

7. Делаем что угодно в функции-обработчике нашего контроллера `MyCtrl`. Для 
этого quick start, просто задаем данные для нашего чарта. Обращаем внимание,
что в пункте выше мы указали `ac-data="myData"`, значит, что даныне для
чарта будут исаться в поле myData объекта `$scope` и значит, их надо туда
положить.
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
        }]);
```

**Рабочий пример:** Simple_Pie.html

## Директивы
Всего их доступно 5:
#### 1. anychart
Используется для инстанциирования всех диаграмм, доступных
в модуле anychart (т.е. не стоки, не ганты и не мапы)
```html
<div anychart></div>
```
работает со следующими кастомными директивами (атрибутами)
1. ac-type
```html
<div anychart ac-type="line"></div>
```
буквально означает, какого типа чарт будет создан. В данном случае будет
вызван конструктор `anychart.line()`.
2. ac-data
```html
<div anychart ac-data="myData"></div>
```

Означает, что ссылку на данные нужно положить в `$scope` в поле с
указанным именем, это и будет являться источником данных для чарта. Там 
чуть выше есть пример кода, где мы кладем данные в `$scope.myData`.
 
Еще здесь надо понимать вот какой момент: данные в этом случае
устанавливаются через метод `chart.data()`. Если у чарта этот
метод отсутствует, то через `ac-data` установить данные не получится,
придется использовать `ac-instance`, об этом ниже. 

3. ac-title
```html
<div anychart ac-title="My Custom Title"></div>
```
Просто устанавливает тайтл чарту.

3. ac-legend
```html
<div anychart ac-legend="true"></div>
```
Принимает строковое значение булевого флага, буквально означает, включить
 легенду или отключить.

4. ac-instance
```html
<div anychart ac-instance="myChart"></div>
```
Означает, что в своем контроллере можно создать произвольный инстанс чарта
и настроить его через Anychart API, как мы это делаем вне ангуляра. 
 
В этом случае мы получаем полную настраиваемость чарта, в том числе то, 
чего не получится сделать директивами, описанными выше. Для
 того, чтобы этот путь заработал, нужно созданный инстанс положить в
 указанное поле в `$scope`: 
```javascript
angular
        .module('MyApp', ['anychart-angularjs'])
        .controller('MyCtrl', ['$scope', function($scope) {
            var chart = anychart.line();
            
            //custom chart setup here.
            
            $scope.myChart = chart;
        }]);
```   
Здесь нужно отметить, что не нужно в этом месте вызывать установку контейнера
и рисование, плагин сделает это сам. Кроме всего прочего, подобный 
 подход работает с остальными директивами:
 ```html
 <div anychart ac-data="myData" ac-instance="myChart"></div>
 ```
```javascript
angular
        .module('MyApp', ['anychart-angularjs'])
        .controller('MyCtrl', ['$scope', function($scope) {
            var chart = anychart.line();
            
            //custom chart setup here.
            
            $scope.myChart = chart;
            
            $scope.myData = [
                ["Chocolate", 5],
                ["Rhubarb compote", 2],
                ["Crêpe Suzette", 2],
                ["American blueberry", 2],
                ["Buttermilk", 1]
            ];
        }]);
```  
5. ac-chart-draw
```html
<div anychart ac-data="myData" ac-type="pie" ac-chart-draw="afterDrawHandler"></div>
```
Устанавливает обработчик, который будет вызван после отрисовки чарта.
Должен быть задан как функция, принимающая параметром отрисовываемый чарт.
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
**Пример:** Line_Chart_After_Draw.html


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









    
