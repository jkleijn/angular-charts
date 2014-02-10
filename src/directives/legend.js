/**
 * Main directive handling drawing of all charts
 */
angular.module('angularCharts').directive('acLegend', function($templateCache, $compile, $window) {

    /**
     * Main link function
     * @param  {[type]} $scope   [description]
     * @param  {[type]} element [description]
     * @param  {[type]} attrs   [description]
     * @return {[type]}         [description]
     */
    function link($scope, $element, attrs) {
        var container = $templateCache.get('legend');
        $element.html($compile(container)($scope));
    }

    return {
        restrict: 'EA',
        link: link,
        controller: function($scope) {
            function draw() {
                $scope.legends = [];
                if ($scope.acLegend == 'pie') {
                    angular.forEach($scope.acPoints, function(value, i) {
                        $scope.legends.push({
                            color: angularCharts.utils.colorPicker.getColor(i, $scope.acConfig.colors || []), 
                            title: value.x,
                            data: value
                        });
                    });
                }
                else {
                    angular.forEach($scope.acSeries, function(value, i) {
                        $scope.legends.push({color: angularCharts.utils.colorPicker.getColor(i, $scope.acConfig.colors || []), title: value});
                    });
                }
            }
            
            $scope.legendClick = function(data){
                $scope.onClick(data);
            };
            //add some watchers
            $scope.$watch('acLegend', draw, true);
            $scope.$watch('acSeries', draw, true);
            $scope.$watch('acPoints', draw, true);
        },
        scope: {
            onClick: '=',
            acConfig: '=',
            acPoints: '=',
            acColors: '=',
            acLegend: '=',
            acSeries: '='
        }
    }
});
