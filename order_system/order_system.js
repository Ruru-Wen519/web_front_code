angular.module('myApp', ['ngMaterial'])
    .controller('MyCtrl', ['$scope', '$http', '$mdDialog', function ($scope, $http, $mdDialog) {
        $scope.account_input = "";
        $scope.password_input = "";
        // document.getElementById('account').addEventListener('keyup', function () {
        //     $scope.filterInput(this);
        // });
        $scope.eye_show = false;
        $scope.login = function () {
            const account_input = $scope.account_input;
            const password_input = $scope.password_input;
            var entrance = "0";
            // fetch('https://my-web-page-code.onrender.com/api/data', {
            // fetch('http://localhost:7200/api/api/data', {
            if (account_input != "" && password_input != "") {
                fetch('http://localhost:5000/api/data/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ entrance, account_input, password_input })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.is_correct == '0') {
                            alert('登入成功!' + data.message);
                        } else {
                            alert('登入失敗!' + data.message);
                        }
                        //document.getElementById('result').textContent = JSON.stringify(data, null, 2);
                    })
                    .catch(err => {
                        //document.getElementById('result').textContent = '發生錯誤：' + err;
                        alert('發生錯誤：' + err);
                    });
            }

            // $http.get('http://192.168.0.143:5000/api/data')
            //     .then(function (response) {
            //         $scope.data = response.data;
            //         console.log('API 回傳的資料:', $scope.data);
            //     })
            //     .catch(function (error) {
            //         console.error('API 呼叫失敗:', error);
            //     });
        };

        $scope.register = function (ev) {
            // const account_input = $scope.account_input;
            // const password_input = $scope.password_input;
            // var entrance = "1";
            // // fetch('https://my-web-page-code.onrender.com/api/data', {
            // // fetch('http://localhost:7200/api/api/data', {
            // if (account_input != "" && password_input != "") {
            //     fetch('http://localhost:5000/api/data/register', {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({ entrance, account_input, password_input })
            //     })
            //         .then(response => response.json())
            //         .then(data => {
            //             if (data.is_correct == '0') {
            //                 alert('註冊成功!' + data.message);
            //             } else {
            //                 alert('註冊失敗!' + data.message);
            //             }
            //             //document.getElementById('result').textContent = JSON.stringify(data, null, 2);
            //         })
            //         .catch(err => {
            //             //document.getElementById('result').textContent = '發生錯誤：' + err;
            //             alert('發生錯誤：' + err);
            //         });
            // }
            //開窗
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'register.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: false
            })
                .then(function (answer) {
                    $scope.alert = '您選擇了: ' + answer;
                }, function () {
                    $scope.alert = '您取消了對話框。';
                });

            // 對話框控制器
            function DialogController($scope, $mdDialog) {
                $scope.closeDialog = function () {
                    $mdDialog.hide(); // 可選擇傳遞資料: $mdDialog.hide('你要帶回的資料');
                };
            }
        };
        $scope.eye_change = function (element, e) {
            var checkEye = document.getElementById("checkEye");
            var floatingPassword = document.getElementById("floatingPassword");

            if (e.target.classList.contains('fa-eye')) {
                //換class 換 type
                e.target.classList.remove('fa-eye');
                e.target.classList.add('fa-eye-slash');
                floatingPassword.setAttribute('type', 'password')
            } else if (e.target.classList.contains('fa-eye-slash')) {
                floatingPassword.setAttribute('type', 'text');
                e.target.classList.remove('fa-eye-slash');
                e.target.classList.add('fa-eye')
            }
        }
        $scope.filterInput = function (input_item, mode) {
            // 使用正則表達式過濾中文字符
            if (mode == "0") {
                $scope.account_input = input_item.replace(/[\u4e00-\u9fa5\s\u3105-\u312D\u31A0-\u31B7]/g, '');
            } else {
                $scope.password_input = input_item.replace(/[\u4e00-\u9fa5\s\u3105-\u312D\u31A0-\u31B7]/g, '');
            }

        }
    }]);