/**
 * Created by Rajesh G on 29-01-2017.
 */

var ellipsesModule = angular.module('ellipsesModule',['rgModule']);


ellipsesModule.controller('mainController',['$scope','$compile',function($scope,$compile){

    var text = '<p class="well text-danger" rg-clamp="4"  style="">' +
        'Technology is the collection of tools, including machinery, modifications, arrangements and procedures used by humans. Engineering' +
        ' is the discipline that seeks to study and design new technologies. Technologies significantly affect human as well as other ' +
        'animal species ability to control and adapt to their natural environments. The term can either be applied generally or to specific' +
        ' areas: examples include construction technology, medical technology and information technology'+
        '</p>';

    $scope.addElement = function(){

        var e1 = $compile(text)($scope);
        angular.element(document.getElementById('dynamicele')).html(e1);
    }

}]);
