
app.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", 
	function ($urlRouterProvider, $stateProvider, $locationProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state("list", {
		url: "/",
		templateUrl: "templates/list/list.html",
		controller: "list"
	})
	$locationProvider.html5Mode({ enabled: true, requireBase: true });
}]);