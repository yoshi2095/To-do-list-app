$(document).ready(function(e) {
	
	$('#add-todo').button({
		icons: {
			primary: "ui-icon-circle-plus"
		}

	}).click(function(){
		$('#new-todo').dialog('open');
	});

	$('#new-todo').dialog({
		modal: true,
		autoOpen: false,
		buttons: {
			"Add task" : function(){
				var taskName = $('#task').val();
				if(taskName===''){
					return false;
				}
				var taskHTML = '<li><span class="done">%</span>';
				taskHTML+='<span class="delete">x</span>';
				taskHTML+='<span class="task"></span></li>';
				var $newTask = $(taskHTML); //You do this because each time you run the jQuery function—$( )—
											//you’re making the browser do work. You must perform several tasks on this list
											//item, so instead of unnecessarily calling the jQuery function over and over, you
											//can just run it once and keep the results in a variable.
				$newTask.find('.task').text(taskName);
				$newTask.hide();
				$('#todo-list').prepend($newTask);
				$newTask.show('clip',600).effect('highlight', 2000);
				$(this).dialog('close');
			},
			"Cancel" : function(){
				$(this).dialog('close');
			}
		},

		close : function(){
				$('#new-todo input').val(''); //You could also have erased the input field as part of the “Add task”
											  //function, but this example was intended to demonstrate the close option.
			}
	});

	$('#todo-list').on('click', '.done', function(){
		var $taskItem = $(this).parent('li');
		$taskItem.slideUp(200, function(){
			var $this = $(this);
			$this.detach();
			$('#completed-list').prepend($this);
			$this.slideDown(500);
		});
	});

	$('.sortlist').sortable({
		connectWith: '.sortlist',
		cursor: 'pointer',
		placeholder: 'ui-state-highlight',
		cancel: '.delete, .done'
	});

	$('.sortlist').on('click', '.delete', function(){
		$(this).parent('li').effect('puff', function(){
			$(this).remove();
		});
	});

}); // end ready