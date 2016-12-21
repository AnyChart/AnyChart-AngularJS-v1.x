angular
    .module('anychart-angularjs', [])
    .value('charts', [])
    .directive('anychartStage', [function() {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          instance: '=?'
        },
        controller: ['$scope', '$element', 'charts', StageController]
      };
    }])
    .directive('anychart', [function() {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          acType: '@',
          acData: '=?',
          acTitle: '@',
          acLegend: '@',
          instance: '=?',
          afterDraw: '=?'
        },
        controller: ['$scope', '$element', AnychartController],
        link: AnychartLink
      };
    }])
    .directive('anygantt', [function() {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          acType: '@',
          acData: '=?',
          acTitle: '@',
          instance: '=?',
          afterDraw: '=?',
          acSplitterPosition: '@'
        },
        controller: ['$scope', '$element', AnyganttController],
        link: AnychartLink
      }
    }])
    .directive('anymap', [function() {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          acType: '@',
          acData: '=?',
          acGeoData: '@',
          acTitle: '@',
          acLegend: '@',
          instance: '=?',
          afterDraw: '=?'
        },
        controller: ['$scope', '$element', AnymapController],
        link: AnychartLink
      }
    }])
    .directive('anystock', [function() {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          instance: '=?',
          afterDraw: '=?'
        },
        controller: ['$scope', '$element', AnystockController],
        link: AnychartLink
      }
    }]);


function StageController($scope, $element, charts) {
  this.$onInit = function() {
    var stage = $scope.instance || anychart.graphics.create($element[0]);
    stage.suspend();
    angular.forEach(charts, function(chartData) {
      var ch = chartData.chart ? chartData.chart : chartData;
      ch.container(stage);
      ch.draw();
    });

    stage.resume();

    //After draw
    stage.suspend();
    angular.forEach(charts, function(chartData) {
      if (chartData.afterDraw) {
        chartData.afterDraw.call(chartData.chart, chartData.chart);
      }
    });
    stage.resume();
  }
}


function AnychartController($scope, $element) {
  this.$onInit = function() {
    $scope.chart = $scope.instance || anychart[$scope.acType || 'line']();

    if ($scope.chart.data && $scope.acData)
      $scope.chart.data($scope.acData);

    $scope.chart.title($scope.acTitle);

    if ($scope.acLegend)
      $scope.chart.legend($scope.acLegend !== 'false');
  }
}


function AnychartLink($scope, $element) {
  $element.ready(function() {
    $scope.chart.container($element[0]);
    $scope.chart.draw();
    if ($scope.afterDraw)
      $scope.afterDraw.call($scope.chart, $scope.chart)
  });
}


function AnyganttController($scope, $element) {
  this.$onInit = function() {
    $scope.chart = $scope.instance || anychart[$scope.acType]();

    if ($scope.chart.data && $scope.acData)
      $scope.chart.data($scope.acData);

    $scope.chart.title($scope.acTitle);

    if ($scope.acSplitterPosition) {
      if ($scope.acSplitterPosition.match(/^\d+%$/)) {
        $scope.chart.splitterPosition($scope.acSplitterPosition)
      } else if ($scope.acSplitterPosition.match(/^\d+$/)) {
        $scope.chart.splitterPosition(+$scope.acSplitterPosition);
      }
    }
  }
}


function AnymapController($scope, $element) {
  this.$onInit = function() {
    $scope.chart = $scope.instance || anychart[$scope.acType || 'map']($scope.acData);

    $scope.chart.geoData($scope.acGeoData);
    $scope.chart.title($scope.acTitle);

    if ($scope.acLegend)
      $scope.chart.legend($scope.acLegend !== 'false');

  }
}


function AnystockController($scope, $element) {
  this.$onInit = function() {
    $scope.chart = $scope.instance;
  }
}
