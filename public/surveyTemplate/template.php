<div class="panel panel-default"> 
    <div class="panel-heading">
        <button class="delete-button" data-delete="">Delete</button>
        <button class="add-button">Add new answer</button> 
    </div> 
    <div class="panel-body"> 
        <div>             
            <input type="text" value="{{ base.question }}" name="question" class="question">
        </div>
        <div>
            Answers:
            <ol class="answer-container">
                <li ng-repeat="(key, value) in base.answers">
                    <input nr="{{ key }}" type="text" value="{{ value }}" name="answer" class="answer"><button class="remove" data-remove="{{ key }}">X</button>
                </li>
            </ol> 
        </div>            
    </div>    
</div>
