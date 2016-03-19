var app = angular.module('app');

app.controller('showroomCtrl', function($scope, $rootScope, $state, $localStorage, Autofeature) {

	$rootScope.user = $localStorage.token; 

	$scope.displayModal = function(car) {
		$scope.displayCar = car; 
	} 

	$scope.goToAutofeatureDetails = function(detail) {
		$state.go('autofeaturedetail({autofeatureId:detail._id})');
	}
	
	$scope.showroomCars = [
	{
		imgSrc: 'http://www.m5board.com/vbulletin/attachment.php?attachmentid=96957&stc=1&thumb=1&d=1262574914',
		paragraph: {
			model: 'Model: BMW',
			make: 'Make: m5',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://images.cdn.stuff.tv/sites/stuff.tv/files/Mercedes-AMG-GT-front.JPG',
		paragraph: {
			model: 'Model: Mercedes',
			make: 'Make: AMG GT',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://media.caranddriver.com/images/media/51/2013-maserati-granturismo-sport-inline-2-photo-482273-s-original.jpg',
		paragraph: {
			model: 'Model: Maserati',
			make: 'Make: GranTurismo Sport',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://ndl.mgccw.com/mu3/000/077/206/sss/716bdb257e8f407aac3e92b97ac144a9_small.png',
		paragraph: {
			model: 'Model: Nissan',
			make: 'Make: Skyline',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://www.mrwallpaper.com/wallpapers/toyota-supra-twin-turbo.jpg',
		paragraph: {
			model: 'Model: Toyota',
			make: 'Make: Supra',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://farm8.staticflickr.com/7083/7185053970_bc652a611c_o.jpg',
		paragraph: {
			model: 'Model: BMW',
			make: 'Make: M3',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://bestcarmag.com/sites/default/files/16997027038975-yellow-maserati-granturismo.jpg',
		paragraph: {
			model: 'Model: Maserati',
			make: 'Make: GranTurismo',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://s1.cdn.autoevolution.com/images/news/brabus-b63-620-widestar-g-class-spotted-in-dubai-video-68273_1.png',
		paragraph: {
			model: 'Model: Mercedes',
			make: 'Make: G Class',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://www.thesupercars.org/wp-content/uploads/2010/01/2010-speedART-PS9-650-Porsche-Panamera-Turbo-Side-.jpg',
		paragraph: {
			model: 'Model: Porsche',
			make: 'Make: Panamera',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://i553.photobucket.com/albums/jj386/Jags86/ratrod.jpg',
		paragraph: {
			model: 'Model: Ford',
			make: 'Make: Model A',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://k-break.com/platinum/30CELSIOR_S/image.jpg',
		paragraph: {
			model: 'Model: Lexus',
			make: 'Make: LS400',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://g02.a.alicdn.com/kf/HTB1OIMIHVXXXXbVXFXXq6xXFXXXG/Vintage-Rerto-font-b-Car-b-font-Cadillac-De-Ville-font-b-Lowrider-b-font-42.jpg',
		paragraph: {
			model: 'Model: Cadillac',
			make: 'Make: De Ville',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://www.addictivedesertdesigns.com/images/products/secondary/f012892450103/f012892450103--4/ford-raptor-bumpers.jpg',
		paragraph: {
			model: 'Model: Ford',
			make: 'Make: Raptor',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://fullhdpictures.com/wp-content/uploads/2016/02/Amazing-Porsche-Cayenne-Turbo-Wallpaper.jpeg',
		paragraph: {
			model: 'Model: Porsche',
			make: 'Make: Cayenne Turbo',
			user: 'UserName: AutoVision'
		}
	},
	{
		imgSrc: 'http://www.wallpaperup.com/uploads/wallpapers/2013/07/01/112231/big_thumb_1d6e26be14c772f5e53a189f6708c59e.jpg',
		paragraph: {
			model: 'Model: Jeep',
			make: 'Make: Wrangler',
			user: 'UserName: AutoVision'
		}
	}	
	];

	$scope.showBool = false; 
	$scope.showButton = "Users Showroom";
	$scope.showroomArray = $scope.showroomCars; 

	if ($rootScope.user) {
		Autofeature.getAllAutofeatures()
		.then(function(res){
			var arrOfAutofeatures = res.data; 
			$scope.showroomUsersCars = res.data.map(function(car){
				var imageurl = '';
				if (car.image && car.image.url) {
					imageurl = car.image.url; 
				};

				var displayFeature = {
					_id: car._id, 
					imgSrc: imageurl,
					paragraph: {
						model: car.model,
						make: car.make,
						user: car.ownerObj.email
					}
				};
				return displayFeature; 
			});
		});
	}

	$scope.toggleArray = function(){
		if (!$rootScope.user) {
			$state.go('register');
		}
		else {
			$scope.showBool = !$scope.showBool; 
			$scope.showButton = $scope.showBool ? "AutoVision Showroom" : "Users Showroom"; 
			$scope.showroomArray = $scope.showBool ? $scope.showroomUsersCars : $scope.showroomCars; 
		}
	};
});