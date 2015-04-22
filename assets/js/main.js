angular.module( 'myApp', ['ngRoute'] )
	.value( 'earnings', [] )
	.config( function ($routeProvider) {
		$routeProvider.when( '/', {
			templateUrl: './home.html'
		} ).when( '/meal', {
			templateUrl: './meal.html',
			controller : 'calcController'
		} ).when( '/result', {
			templateUrl: './result.html',
			controller : 'resultCtrl'
		} ).otherwise( {redirectTo: '/'} );
	} )
	.controller( 'calcController', function ($scope, earnings) {
		$scope.mealData = {};
		$scope.subTotal = $scope.tip = $scope.total = null;

		// set initial value
		var init = function () {

			$scope.mealData.mealPrice = null;
			$scope.mealData.tipPercentage = null;
			$scope.mealData.taxRate = 7;

			$scope.formSubmitted = false;

		}
		//init();

		// validate data
		$scope.mealDetailSubmit = function () {

			if ($scope.waitStaffForm.$valid) {
				// do calculation
				calculate( $scope.mealData );
				calculateEarning( $scope.mealData );
			}

		}

		// calculate
		var calculate = function (mealData) {
			//Customer charges info
			$scope.subTotal = mealData.mealPrice + (mealData.mealPrice * mealData.taxRate / 100 );
			$scope.tip = $scope.subTotal * mealData.tipPercentage / 100;
			$scope.total = $scope.tip + $scope.subTotal;
		}

		var calculateEarning = function (mealData) {
			//My Earnings info
			earnings.push( {
				'mealPrice'    : mealData.mealPrice,
				'taxRate'      : mealData.taxRate,
				'tipPercentage': mealData.tipPercentage
			} )

		}
		// reset all values
		$scope.resetForm = function () {
			init();
		}

		// reset meal deatils and customer charges
		$scope.cancelForm = function () {
			$scope.earningData.subTotal = 0;
			$scope.earningData.tip = 0;
			$scope.earningData.total = 0;
			$scope.mealData = {};
			$scope.formSubmitted = false;
		}

		init();
	} )

	.controller( 'resultCtrl', function ($scope, earnings) {
		$scope.tipTotal = $scope.mealCount = $scope.tipMean = 0;

		for (var meal in earnings) {
			$scope.tipTotal += earnings[meal].mealPrice * earnings[meal].tipPercentage / 100;
			$scope.mealCount += 1;
			$scope.tipMean = $scope.tipTotal / $scope.mealCount;
		}

		$scope.resetForm = function () {
			earnings.length = 0;
			$scope.tipTotal = $scope.mealCount = $scope.tipMean = 0;

		}


	} )
