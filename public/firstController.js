angular.module('MyApp',['ngMaterial'])

.controller('AppCtrl', function($scope) {
	$scope.messages = [];
	$scope.name="AMINE";
	var socket = io.connect('http://localhost:3700');
	socket.on('message', function (data) {
        if(data.message) {
            $scope.messages.push(data);
        } else {
            console.log("There is a problem:", data);
        }
    });

    $scope.send=function(){
    	socket.emit('send', { message: $scope.message, username: $scope.name });
    }
});
