angular.module('dataService', [])

.factory('allData', function($http) {
	allDataFactory = {};

	allDataFactory.getAllData = function() {
		return $http.get('./data.json');
	};

	return allDataFactory;
});