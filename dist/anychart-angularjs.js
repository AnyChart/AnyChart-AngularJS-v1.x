angular
    .module('anychart-angularjs', [])
    .factory('AnychartService', function() {
      return {
        chart: null,
        charts: []
      };
    })
    .directive('anychartStage', [function() {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          acInstance: '=?'
        },
        controller: ['$scope', '$element', 'AnychartService', StageController]
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
          acInstance: '=?',
          acChartDraw: '=?'
        },
        controller: ['$scope', '$element', 'AnychartService', AnychartController],
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
          acInstance: '=?',
          acChartDraw: '=?',
          acSplitterPosition: '@'
        },
        controller: ['$scope', '$element', 'AnychartService', AnyganttController],
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
          acInstance: '=?',
          acChartDraw: '=?'
        },
        controller: ['$scope', '$element', 'AnychartService', AnymapController],
        link: AnychartLink
      }
    }])
    .directive('anystock', [function() {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          acInstance: '=?',
          acChartDraw: '=?'
        },
        controller: ['$scope', '$element', 'AnychartService', AnystockController],
        link: AnychartLink
      }
    }]);


function StageController($scope, $element, AnychartService) {
  var service = AnychartService;
  this.$onInit = function() {
    var stage = $scope.acInstance || anychart.graphics.create($element[0]);
    stage.suspend();
    angular.forEach(service.charts, function(chartData) {
      var ch = chartData.chart ? chartData.chart : chartData;
      ch.container(stage);
      ch.draw();
    });

    stage.resume();

    //After draw
    stage.suspend();
    angular.forEach(service.charts, function(chartData) {
      if (chartData.chartDraw) {
        chartData.chartDraw.call(chartData.chart, chartData.chart);
      }
    });
    stage.resume();
  }
}


function AnychartController($scope, $element, AnychartService) {
  this.$onInit = function() {
    $scope.chart = $scope.acInstance || anychart[$scope.acType || 'line']();
    AnychartService.chart = $scope.chart;
    AnychartService.charts.push($scope.chart);

    if ($scope.chart.data && $scope.acData)
      $scope.chart.data($scope.acData);

    $scope.chart.title($scope.acTitle);

    if ($scope.acLegend)
      $scope.chart.legend($scope.acLegend !== 'false');
  }
}


function AnychartLink($scope, $element, AnychartService) {
  $element.ready(function() {
    $scope.chart.container($element[0]);
    $scope.chart.draw();
    if ($scope.acChartDraw)
      $scope.acChartDraw.call($scope.chart, $scope.chart)
  });
}


function AnyganttController($scope, $element, AnychartService) {
  this.$onInit = function() {
    $scope.chart = $scope.acInstance || anychart[$scope.acType]();
    AnychartService.chart = $scope.chart;
    AnychartService.charts.push($scope.chart);

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


function AnymapController($scope, $element, AnychartService) {
  this.$onInit = function() {
    $scope.chart = $scope.acInstance || anychart[$scope.acType || 'map']($scope.acData);
    AnychartService.chart = $scope.chart;
    AnychartService.charts.push($scope.chart);

    $scope.chart.geoData($scope.acGeoData);
    $scope.chart.title($scope.acTitle);

    if ($scope.acLegend)
      $scope.chart.legend($scope.acLegend !== 'false');

  }
}


function AnystockController($scope, $element, AnychartService) {
  this.$onInit = function() {
    $scope.chart = $scope.acInstance;
    AnychartService.chart = $scope.chart;
    AnychartService.charts.push($scope.chart);
  }
}
