var commonHeader = angular.module('commonHeader', []);

commonHeader.directive('commonHeader',[function(){
	return {
		restrict: 'E',
		templateUrl: 'commonHeader.html',
		replace: true,
		link: function(){
			console.log('link header')
		}
	}
}]);