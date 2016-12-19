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
    if ($scope.acTitle)
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