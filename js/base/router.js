var app = angular.module('traveApp', ['routers', 'Ctrl', 'directive', 'service']);

var router = angular.module('routers', ['ui.router']);
router.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
            url: '/index',
            templateUrl: 'template/index.html',
            controller: 'indexCtrl'
        })
        .state('index.home', {
            url: '/home',
            templateUrl: 'template/home.html',
            controller: 'homeCtrl'

        }).state('index.message', {
            url: '/message',
            templateUrl: 'template/message.html',
            controller: 'messageCtrl'
        }).state('index.comment', {
            url: '/comment',
            templateUrl: 'template/comment.html',
            controller: 'commentCtrl'
        }).state('index.page', {
            url: '/page',
            templateUrl: 'template/page.html'
        }).state('detail', {
            url: '/detail/:id',
            templateUrl: 'template/detail.html',
            controller: 'detailCtrl'
        }).state('register', {
            url: '/register',
            templateUrl: 'template/register.html'
            // controller: 'registerCtrl'
        })

    $urlRouterProvider.otherwise('/index/home')
}])

//控制器
var controller = angular.module('Ctrl', []);
controller.controller('indexCtrl', ['$scope', function($scope) {
    $scope.items = [{
        title: '首页',
        url: '/home',
        src: 'images/首页-发现.png'
    }, {
        title: '消息',
        url: '/message',
        src: 'images/message.png'
    }, {
        title: '言职',
        url: '/comment',
        src: 'images/文件1.png'

    }, {
        title: '我',
        url: '/page',
        src: 'images/首页-我的.png'

    }]
}]).controller('homeCtrl', ['$scope', '$http', 'xcarousel', function($scope, $http, xcarousel) {
    $scope.searchname = ''
    $scope.search = false;
    // $scope.carous=;
    // console.log($scope.carous)
    $scope.searchtext = function() {
        $scope.search = true;
    }
    $scope.cancle = function() {
        $scope.search = false;
    }

    $scope.arrs = [];
    // $scope.show=function(){
    //      xcarousel.carousel()
    // }
    $scope.loadmore = function() {

        $http.get('js/list.json', {
            params: {
                id: $scope.id,
                title: $scope.title,
                company: $scope.conpany,
                money: $scope.money,
                respon: $scope.respon,
                weal: $scope.weal,
                size: $scope.size
                    // detail:$scope.detail


            }
        }).success(function(data) {
            xcarousel.carousel()


            $scope.arrs = $scope.arrs.concat(data);

            console.log($scope.arrs)
            console.log(data)

        })

    }
    $scope.loadmore();

}]).controller('detailCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

    console.log($state.params.id)
    $http.get('js/detail' + $state.params.id + '.json', {
        params: {
            id: $state.params.id,
            // detail:$scope.params.detail

        }
    }).success(function(data) {

        $scope.arr = data[0];
        console.log($scope.arr)


    })
}]).controller('messageCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.login = function() {
        console.log($scope.username)
        $http.get('js/register.php', {
            params: {
                account: $scope.username,
                logPass: $scope.password
            }
        }).success(function(data) {
            console.log(data)
            console.log(1)
        })
    }

}]).controller('commentCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.arrs = [];

    $scope.loadmore = function() {

        $http.get('js/comment.json', {
            params: {
                title: $scope.content,
                text: $scope.text
            }
        }).success(function(data) {
            console.log($scope.arrs)
            $scope.arrs = $scope.arrs.concat(data)

            console.log(data)
        })
    }
    $scope.items = [{
        image: 'images/运维管理.png',
        url:'/home'

    },{
        image:'images/首页-发现.png',
        url:'/comment'
    }, {
        image: 'images/用户.png',
        url:'/message'
    }]
    $scope.loadmore();

}])

//directive
var direc = angular.module('directive', []);
direc.directive('xfooter', function() {
    return {
        templateUrl: 'directive/xfooter.html'
    }
}).directive('xsearch', function() {
    return {
        templateUrl: 'directive/xsearch.html'
    }
}).directive('xcarousel', function() {
    return {
        // templateUrl: 'directive/xcarousel.html',
        link: function() {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                effect: 'cube',
                grabCursor: true,
                cube: {
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94
                }
            });
        }
    }
}).directive('xitem', function() {
    return {
        templateUrl: 'directive/xitem.html'
    }
}).directive('ngScroll', function() {

    return {
        link: function(scope, ele, attr) {
            console.log(ele);
            ele.bind('scroll', function(e) {
                // console.log(e.target.scrollTop)
                //     console.log(e.target.scrollHeight)
                //     console.log(e.target.offsetTop)
                if ((e.target.scrollTop + e.target.offsetHeight) >= e.target.scrollHeight) {

                    scope.$apply(attr.ngScroll);

                }


            })
        }
    }
})

var app = angular.module('service', []);
app.service('xcarousel', function() {
    return {
        carousel: function() {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                effect: 'cube',
                grabCursor: true,
                cube: {
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94
                }
            })
        }
    }
})
