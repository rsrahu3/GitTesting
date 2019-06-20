angular.module("myapp", [])
.controller("MainController", ($scope,$http)=> {

   $scope.tempArray = [];
   $scope.temperature;
   $http.get("http://localhost:3000/getData")
   .then((response)=>{ 
      $scope.tempArray = response.data.result;
      $scope.aggregatedData = response.data.aggregatedData;
   });

   $scope.submitTempForm = function () {
      
    $http.post("http://localhost:3000/save",{"temp": $scope.temperature,"date":new Date()})
    .then((response)=>{ 
      $scope.aggregatedData = response.data.aggregatedData;
      $scope.tempArray = response.data.result;
      $scope.temperature = "";
   }).catch((e)=>{
      console.log(e.data.errors.temp.message);
   });
}

$scope.deleteRecord = function(id){
$http.delete("http://localhost:3000/deleteRecord/"+id)
   .then(function(response){ 
      $scope.tempArray = response.data.result;
      $scope.aggregatedData = response.data.aggregatedData;
      $scope.temperature = "";
   });
}
  
});