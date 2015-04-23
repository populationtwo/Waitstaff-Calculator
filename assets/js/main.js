angular.module( 'myApp', ['ngRoute'] )

	// Use value service to share data between controllers;
	.value( 'earningData', [] )

	// Define routes
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
	.controller('navController', function($scope, $location) {
		$scope.isActive = function(route) {
			return route === $location.path();
		}
	})
	.controller( 'calcController', function ($scope, earningData) {

		$scope.mealData = {};
		$scope.subTotal = null;
		$scope.tip = null;
		$scope.total = null;

		// set initial value
		var init = function () {
			$scope.mealData.mealPrice = null;
			$scope.mealData.tipPercentage = null;
			$scope.mealData.taxRate = 10;
			$scope.formSubmitted = false;
		};
		init();

		// validate data
		$scope.mealDetailSubmit = function () {
			if ($scope.waitStaffForm.$valid) {
				// do calculation
				calculateMeal( $scope.mealData );
				calculateEarning( $scope.mealData );
				//$scope.cancelForm();
			}
		}

		// calculate
		var calculateMeal = function (mealData) {
			//Customer charges info
			$scope.subTotal = mealData.mealPrice + (mealData.mealPrice * mealData.taxRate / 100 );
			$scope.tip = $scope.subTotal * mealData.tipPercentage / 100;
			$scope.total = $scope.tip + $scope.subTotal;
		}

		var calculateEarning = function (mealData) {
			//My Earnings info
			earningData.push( {
				'mealPrice'    : mealData.mealPrice,
				'taxRate'      : mealData.taxRate,
				'tipPercentage': mealData.tipPercentage
			} )
		}

		// reset meal details and customer charges
		$scope.cancelForm = function () {
			$scope.waitStaffForm.$setPristine();
			init();
		}

	} )

	.controller( 'resultCtrl', function ($scope, earningData) {
		$scope.tipTotal = 0;
		$scope.mealCount = 0;
		$scope.tipMean = 0;

		for (var meal in earningData) {
			$scope.tipTotal += earningData[meal].mealPrice * earningData[meal].tipPercentage / 100;
			$scope.mealCount += 1;
			$scope.tipMean = $scope.tipTotal / $scope.mealCount;
		}

		$scope.resetForm = function () {
			earningData.length = 0;
			$scope.tipTotal = $scope.mealCount = $scope.tipMean = 0;
		}
	} )
