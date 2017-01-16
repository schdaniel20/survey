@extends('layouts.app')

@section('content')
<script src = "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<script src="/js/survey.js"></script>
<div class="container">
    <div ng-app="surveyBuilder">
        <div ng-controller="Controller" ng-init="init('d', 'ol', 'delete-button', 'add-button')">
            <button style="width:100%" ng-click="save()">Save</button>    
            <div id="d">                
            </div>            
            <button style="width:100%" ng-click="showdiv()">Add</button>
        </div>
    </div>
</div>
@endsection
