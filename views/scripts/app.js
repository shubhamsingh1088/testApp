
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

app.controller("list", ["$scope", "allData", function($scope, allData) {

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

    $scope.selectedCheckbox = [];

    $scope.getChecked = function(userId){
      if ($scope.selectedCheckbox.indexOf(userId) == -1) {
        $scope.selectedCheckbox.push(userId);
      }
      console.log($scope.selectedCheckbox);
    };

    $scope.deleteUser = function() {
      if ($scope.selectedCheckbox.length === 0) {
        alert("Please select a column to delete");
      }
      angular.forEach($scope.selectedCheckbox, function(n) {
        $scope.indexLength = $scope.selectedCheckbox.length;
        $scope.indexValue = n;
        $scope.index = $scope.selectedCheckbox.indexOf($scope.indexValue);
        console.log($scope.index);
        console.log($scope.indexValue);
        $scope.myJsonDatas.splice($scope.index, $scope.indexLength);
        $scope.selectedCheckbox = [];
      });
    }

  });

}]);
