var app = angular.module('app');

app.controller('showroomCtrl', function($scope, $rootScope, $localStorage, Autofeature) {

  $rootScope.user = $localStorage.token; 

	Autofeature.getUserAutofeatures($rootScope.user.data)
  .then(function(res){
  	console.log('res.data is: ', res.data);
    //$scope.autofeatures = res.data; 
    //$scope.category = $state.params.type;

    var arrOfAutofeatures = res.data; 
    
    /*
    $scope.showroomUsersCars = arrOfAutofeatures.map(function(autofeature) {
    	var displayFeature = {
    		imgSrc: ''
				paragraph: {
					model: 'Model: Nissan',
					make: 'Make: Skyline',
					user: 'UserName: laugh_drive'
				}
    	};
    });
    */

    $scope.showBool = false; 
    $scope.showButton = "Show Features";
    $scope.showroomArray = $scope.showroomCars; 
    $scope.toggleArray = function(){
    	$scope.showBool = !$scope.showBool; 
    	// if ($scope.showButton === "Show Features") {
    	// 	$scope.showButton = "Hide Features"; 
    	// } else {
    	// 	$scope.showButton = "Show Features"
    	// }
    	$scope.showButton = $scope.showBool ? "Hide Features" : "Show Features"; 
    	$scope.showroomArray = $scope.showBool ? $scope.showroomUsersCars : $scope.showroomCars; 
    }

    $scope.showroomUsersCars = [
    	{
				imgSrc: 'http://www.m5board.com/vbulletin/attachment.php?attachmentid=96957&stc=1&thumb=1&d=1262574914',
				paragraph: {
					model: 'Model: Nissan',
					make: 'Make: Skyline',
					user: 'UserName: laugh_drive'
				}
			},
			{
		
				imgSrc: 'http://images.cdn.stuff.tv/sites/stuff.tv/files/Mercedes-AMG-GT-front.JPG',
				paragraph: {
					model: 'Model: Nissan',
					make: 'Make: Skyline',
					user: 'UserName: laugh_drive'
				}
			},
			{
				imgSrc: 'http://media.caranddriver.com/images/media/51/2013-maserati-granturismo-sport-inline-2-photo-482273-s-original.jpg',
				paragraph: {
					model: 'Model: Nissan',
					make: 'Make: Skyline',
					user: 'UserName: laugh_drive'
				}
			}
    ]
    
  });
  

	$scope.showroomCars = [
		{
			imgSrc: 'http://www.m5board.com/vbulletin/attachment.php?attachmentid=96957&stc=1&thumb=1&d=1262574914',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
	
			imgSrc: 'http://images.cdn.stuff.tv/sites/stuff.tv/files/Mercedes-AMG-GT-front.JPG',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://media.caranddriver.com/images/media/51/2013-maserati-granturismo-sport-inline-2-photo-482273-s-original.jpg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://ndl.mgccw.com/mu3/000/077/206/sss/716bdb257e8f407aac3e92b97ac144a9_small.png',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://www.mrwallpaper.com/wallpapers/toyota-supra-twin-turbo.jpg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://farm8.staticflickr.com/7083/7185053970_bc652a611c_o.jpg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://bestcarmag.com/sites/default/files/16997027038975-yellow-maserati-granturismo.jpg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://s1.cdn.autoevolution.com/images/news/brabus-b63-620-widestar-g-class-spotted-in-dubai-video-68273_1.png',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://www.thesupercars.org/wp-content/uploads/2010/01/2010-speedART-PS9-650-Porsche-Panamera-Turbo-Side-.jpg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://i553.photobucket.com/albums/jj386/Jags86/ratrod.jpg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://k-break.com/platinum/30CELSIOR_S/image.jpg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://g02.a.alicdn.com/kf/HTB1OIMIHVXXXXbVXFXXq6xXFXXXG/Vintage-Rerto-font-b-Car-b-font-Cadillac-De-Ville-font-b-Lowrider-b-font-42.jpg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://www.addictivedesertdesigns.com/images/products/secondary/f012892450103/f012892450103--4/ford-raptor-bumpers.jpg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://fullhdpictures.com/wp-content/uploads/2016/02/Amazing-Porsche-Cayenne-Turbo-Wallpaper.jpeg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		},
		{
			imgSrc: 'http://www.wallpaperup.com/uploads/wallpapers/2013/07/01/112231/big_thumb_1d6e26be14c772f5e53a189f6708c59e.jpg',
			paragraph: {
				model: 'Model: Nissan',
				make: 'Make: Skyline',
				user: 'UserName: laugh_drive'
			}
		}	
	]	
});

