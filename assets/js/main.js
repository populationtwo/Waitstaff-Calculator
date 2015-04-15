angular.module( 'myApp', [] )
	.controller( 'calcController', function ($scope) {
		$scope.mealData = {};
		$scope.chargeData = {};
		$scope.earningData = {};

		// validate data
		$scope.mealDetailSubmit = function () {
			if ($scope.waitStaffForm.$valid) {
				// do calculation
				calculate();
			}
		}

		// calculate
		var calculate = function () {
			$scope.chargeData.subTotal = $scope.mealData.mealPrice + ($scope.mealData.mealPrice * $scope.mealData.taxRate / 100 );
			$scope.chargeData.tip = $scope.chargeData.subTotal * $scope.mealData.tipPercentage / 100;
			$scope.chargeData.total = $scope.chargeData.tip + $scope.chargeData.subTotal;



			//earnings info
			$scope.earningData.tipTotal += $scope.chargeData.tip;
			//tip total = tip
			//meal count = number of meal
			//average tip = tip total / meal count

		}


	} )