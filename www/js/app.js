  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  var app = angular.module('boston-bites', ['ionic', 'LocalStorageModule','ngRoute']);
  // var app = angular.module('scotch-todo', ['ionic']);
  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });


  app.config(function (localStorageServiceProvider, $routeProvider) {
      localStorageServiceProvider
        .setPrefix('boston-bites');

     $routeProvider.caseInsensitiveMatch = true;
     $routeProvider
           .when('/', {
            templateUrl : 'js/home.html',
            controller : 'homeController'
           })
            .when('/menu', {
            templateUrl : 'js/menu.html',
            controller : 'menuController'
           })
            .when('/contact', {
            templateUrl : 'js/contact.html',
            controller : 'contactController'
           })
            .when('/feedback', {
            templateUrl : 'js/feedback.html',
            controller : 'feedbackController'
           })
  });

  app.controller('homeController', function ($scope, $ionicModal, localStorageService) { 

        $scope.links = [
                          {
                            'name' : 'MENU',
                            'path' : 'menu'
                          },
                          {
                            'name' : 'Feedback',
                            'path' : 'feedback'
                          },
                          {
                            'name' : 'Contact',
                            'path' : 'contact'
                          }
        ];

  });
   

   app.controller('menuController', function ($scope, $ionicModal, localStorageService) { 
   //store the entities name in a variable var taskData = 'task';

   var taskData = 'task'
  //initialize the tasks scope with empty array
  $scope.tasks = [];

  //initialize the task scope with empty object
  $scope.task = {};

  //configure the ionic modal before use
  $ionicModal.fromTemplateUrl('new-task-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
      $scope.newTaskModal = modal;
  });

  $scope.getTasks = function () {
      //fetches task from local storage
      if (localStorageService.get(taskData)) {
            $scope.tasks = localStorageService.get(taskData);
      } 
      else 
      {
            $scope.tasks = [
              {
                  'category' : 'Pizza',
                  'visible'  : false,
                  'types' : [ 
                              {'title' : 'Tandoori Margherita' , 'content' : 'Tandoori pizza sauce & melted mozzarella cheese', 'price' : '169.00 Medium'}, 
                              {'title' : 'Funghi Pizza' , 'content' : 'White sauce & fresh mushrooms', 'price' : '189.00 Medium'}, 
                              {'title' : 'White House' , 'content' : 'White sauce, red onion & cheese patty', 'price' : '209.00 Medium'}, 
                              {'title' : 'BB Veggie' , 'content' : 'Chipotle sauce, fresh mushroom, tomatoes, onions, black olives, sweet corns & green capsicum', 'price' : '229.00 Medium'} 
                    ]
              },

              {
                  'category' : 'Burgers',
                  'visible'  : false,
                  'types' : [ 
                              {'title' : 'Aloo Cheese' , 'price' : '59.00'}, 
                              {'title' : 'Masala Paneer' , 'price' : '89.00'}, 
                              {'title' : 'Pepper Chicken' ,  'price' : '99.00'}, 
                              {'title' : 'Chicken Masala' ,  'price' : '99.00'} 
                    ]
              },

              {
                  'category' : 'Seekh Kebabs',
                  'visible'  : false,
                  'types' : [ 
                              {'title' : 'Punjabi Chicken Seekh' ,  'price' : '99.00'}, 
                              {'title' : 'Angara Chicken Seekh' ,  'price' : '99.00'}, 
                              {'title' : 'Lemon Chicken Seekh' ,  'price' : '99.00'}, 
                              {'title' : 'Spicy Mutton Seekh' ,  'price' : '99.00'}
                    ]
              }
            
            ];
      } // end Of else statement
      
  }; // End of getTasks

  $scope.getTasks();

  $scope.toggle = function (task){
      if(task.visible)
        task.visible = false;
      else
        task.visible = true;
  };

  $scope.createTask = function () {
      //creates a new task
          $scope.tasks.push($scope.task);
          localStorageService.set(taskData, $scope.tasks);
          $scope.task = {};
          //close new task modal
          $scope.newTaskModal.hide();
      
  }
  $scope.removeTask = function () {
      //removes a task
          $scope.tasks.splice(index, 1);
          localStorageService.set(taskData, $scope.tasks);
      
  }
  $scope.completeTask = function () {
       //updates a task as completed 
       if (index !== -1) {
          $scope.tasks[index].completed = true; 
        } 

        localStorageService.set(taskData, $scope.tasks); 
      
   }
  

  }); // End of controller
