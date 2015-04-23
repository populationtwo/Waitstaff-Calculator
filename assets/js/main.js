angular.module( 'myApp', ['ngRoute'] )
	.config( function ($routeProvider) {
		$routeProvider.when( '/', {
			templateUrl: './home.html'
		} ).when( '/meal', {
			templateUrl: './meal.html',
			controller : 'calcController'
		} ).when( '/result', {
			templateUrl: './result.html',
			controller : 'calcController'
		} ).otherwise( {redirectTo: '/'} );
	} )

	.controller( 'calcController', function ($scope) {

		// set initial value
		var init = function () {

			$scope.mealData = {};
			$scope.chargeData = {};
			$scope.earningData = {};

			$scope.earningData.tipTotal = 0;
			$scope.earningData.mealCount = 0;
			$scope.earningData.tipMean = 0;

			$scope.chargeData.subTotal = 0;
			$scope.chargeData.tip = 0;
			$scope.chargeData.total = 0;

			$scope.formSubmitted = false;

		}
		init();

		// validate data
		$scope.mealDetailSubmit = function () {
			if ($scope.waitStaffForm.$valid) {
				// do calculation
				calculate();
			}
		}

		// calculate
		var calculate = function () {
			//Customer charges info
			$scope.chargeData.subTotal = $scope.mealData.mealPrice + ($scope.mealData.mealPrice * $scope.mealData.taxRate / 100 );
			$scope.chargeData.tip = $scope.chargeData.subTotal * $scope.mealData.tipPercentage / 100;
			$scope.chargeData.total = $scope.chargeData.tip + $scope.chargeData.subTotal;

			//My Earnings info
			$scope.earningData.tipTotal += $scope.chargeData.tip;
			$scope.earningData.mealCount++
			$scope.earningData.tipMean = $scope.earningData.tipTotal / $scope.earningData.mealCount;
		}

		// reset all values
		$scope.resetForm = function () {
			init();
		}

		// reset meal deatils and customer charges
		$scope.cancelForm = function () {
			$scope.chargeData.subTotal = 0;
			$scope.chargeData.tip = 0;
			$scope.chargeData.total = 0;
			$scope.mealData = {};
			$scope.formSubmitted = false;
		}
	} )