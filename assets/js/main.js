angular.module('myApp',[])
	.controller('calcController', function($scope){
		$scope.mealData = {}



		// validate data
		$scope.mealDetailSubmit = function() {
			if($scope.waitStaffForm.$valid){
				// do calculation
				calculate();
			}
		}

		// calculate
		var calculate = function(){

			// chargedata
			//subtotal = base meal price + basemeal price x tax
			//tip = subtotal * tip rate
			//
			//total = subtotal + tip





			//earnings info
			//
			//tip total = tip
			//meal count = number of meal
			//average tip = tip total / meal count

		}


	})