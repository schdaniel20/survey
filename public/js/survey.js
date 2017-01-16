(function (angular) {
    'use strict';
    angular.module('surveyBuilder', [])
            .controller('Controller', ['$scope', '$compile', function ($scope, $compile) {

                    $scope.json = {
                        'questions' : [{
                                "id": 1,
                                "question": "1",
                                "answers": {}
                                },
                                {
                                "id": 2,
                                "question": "2",
                                "answers": {}
                                }],
                        'lastQId' : 2
                    };
                    $scope.lastQId = 0;
                    $scope.answerContainerTag = null;
                    $scope.answerContainer = null;
                    $scope.deleteClass = null;
                    $scope.addClass = null;

                    $scope.showdiv = function (json = null) {
                        if (json === null) {
                            $scope.json.lastQId++;
                            
                            $scope.json.questions[$scope.json.lastQId] = {
                                "id": $scope.json.lastQId,
                                "question": "",
                                "answers": {}
                            };
                            json = $scope.json.questions[$scope.json.lastQId];
                        }                        
                        var compiledHTML = $compile("<div base=" + JSON.stringify(json) + " id='question-" + json.id + "' data-question  my-Question=" + json.id + "></div>")($scope);
                        angular.element(document.getElementById($scope.elementContainer)).append(compiledHTML);
                    };

                    $scope.save = function () {
                        console.log($scope.json);
                    };

                    $scope.init = function (elementContainer, answerContainerTag, deleteClass, addClass) {
                        $scope.elementContainer = elementContainer;
                        $scope.answerContainerTag = answerContainerTag;
                        $scope.deleteClass = deleteClass;
                        $scope.addClass = addClass;

                        for (var i in $scope.json.questions) {
                            $scope.showdiv($scope.json.questions[i]);
                        }
                    };

                    $scope.createElement = function (element, key) {
                        var parent = angular.element(element).find('ol');
                        var compiledHtml = $compile('<li><input nr="' + key + '" type="text" value="" name="answer" class="answer"><button class="remove" data-remove="' + key + '">X</button></li>')($scope);
                        angular.element(parent).append(compiledHtml);
                    };
                }])
            .directive('myQuestion', function () {
                return {
                    templateUrl: 'surveyTemplate/template.php',
                    scope: {
                        "base": "="
                    }
                };
            })
            .directive("question", function () {
                return function (scope, element, attrs, compile) {

                    element.bind("click", function (event) {
                        var id = attrs.myQuestion;
                        ;
                        if (event.target.className === scope.deleteClass) {
                            angular.element(element).remove();
                            delete scope.json[id];
                        }

                        if (event.target.className === scope.addClass) {
                            var answerNr = ++scope.json[id].lastAId;
                            
                            scope.json[id].answers[answerNr] = "";
                            
                            scope.createElement(element, answerNr);
                        }

                        if (event.target.className === "remove") {
                            var currentElement = event.target;
                            var answerNr = currentElement.getAttribute('data-remove');
                            delete scope.json[id].answers[answerNr];
                            
                            angular.element(currentElement.parentNode).remove();
                        }

                    });

                    element.bind("input", function (event) {
                        var id = attrs.myQuestion;
                        var element = event.target;

                        if (element.className === "question") {
                            scope.json[id].question = element.value;
                        }
                        if (element.className === "answer") {
                           
                            var answerNr = element.getAttribute('nr');
                            scope.json[id].answers[answerNr] = element.value;
                        }
                    });

                };
            });
})(window.angular);