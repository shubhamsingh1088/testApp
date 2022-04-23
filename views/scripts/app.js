
var app = angular.module("testingApp", ["ui.router", "dataService"])
.run(function($anchorScroll, $window) {
  // hack to scroll to top when navigating to new URLS but not back/forward
  var wrap = function(method) {
    var orig = $window.window.history[method];
    $window.window.history[method] = function() {
      var retval = orig.apply(this, Array.prototype.slice.call(arguments));
      $anchorScroll();
      return retval;
    };
  };
  wrap('pushState');
  wrap('replaceState');
})

app.config(function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
});

app.controller("list", ["$scope", "allData", "$window", function($scope, allData, $window) {

  // Angular service to call json data

  allData.getAllData().then(function(response) {
    $scope.myJsonDatas = response.data.data;

    // Function to add new Data
    $scope.addNewData = function(formData) {
      $scope.newObj = {
        id: $scope.myJsonDatas.length + 1,
        name: formData.name,
        description: formData.description,
        webReference: formData.webRef,
      }
      $scope.myJsonDatas.push($scope.newObj);
      $scope.formData = {};
    }

    // Collecting all Checked Columns in table
    $scope.selectedCheckbox = [];

    $scope.getChecked = function(userId){
      $scope.selectedCheckbox.push(userId);
    };


    // Function to delete a User column from table
    $scope.deleteUser = function(values) {
      angular.forEach($scope.selectedCheckbox, function(n) {
        $scope.indexLength = $scope.selectedCheckbox.length;
        $scope.indexValue = n;
        $scope.index = $scope.myJsonDatas.findIndex(x=> x.id === $scope.indexValue);
        $scope.myJsonDatas.splice($scope.index, $scope.indexLength);
      });
    }

  });

}]);