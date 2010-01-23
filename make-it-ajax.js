// Need to include jquery before calling this script
/*


$(document).ready(function(){	
	API.init();
});


*/

API = {
	
	idsToCheck: new Array('header', 'content'),
	idToUpdate: 'content',
	isHidden: false,
	
	init: function(){
		this.ajax.parent = this;
		this.ajax.init();
	},
	
	view: function(name){
		updateBox = this.updateBox;
		parent = this;
		$.get(name, function(data) {
			$('#'+parent.idToUpdate).html(data);
			if(parent.isHidden)
			{
				parent.show();
			}
			parent.ajax.init();
		});
	},
	
	show: function()
	{
		if(this.isHidden)
		{
			this.isHidden = true;
			$("#"+this.idToUpdate).addClass('hidden');
		}
	},
	
	hide: function(){
		if(!this.isHidden)
		{
			this.isHidden = false;
			$("#"+this.idToUpdate).removeClass('hidden');
		}
	},
	
	ajax: {
		init: function(){
			this.links();
			this.forms();
		},
		
		links: function(div){
			for(h=0; h < this.parent.idsToCheck.length; h++)
			{
				overlaylinks = $('#'+this.parent.idsToCheck[h]+' a');
				for(i=0; i<overlaylinks.length; i++)
				{
					$(overlaylinks[i]).click(function(){
						API.view(this.href);
						return false;
					});
				}
			}
		},
		
		post: function(url, data){
			parent = this.parent;
			$.post(url, data, function(output) {
				$('#'+parent.idToUpdate).html(output);
				if(parent.isHidden)
				{
					parent.show();
				}
				parent.init();
			});
			
		},
		
		get: function(url, data){
			if(url.match(/\?/g))
			{
				url = url + '&' + data;
			}
			else
			{
				url = url + '?' + data;
			}
			
			this.parent.view(url);
		},
		
		forms: function(){
			ajax = this;
			parent = this.parent;
			for(h=0; h < parent.idsToCheck.length; h++)
			{
				overlaylinks = $('#'+parent.idsToCheck[h]+' form');
				for(i=0; i<overlaylinks.length; i++)
				{
					$(overlaylinks[i]).submit(function(){
						data = $(this).serialize();
						
						if(this.method && this.method.toLowerCase()=='post')
						{
							ajax.post(this.action, data);
						}else{
							ajax.get(this.action, data);
						}
						
						return false;
					});
				}
			}
		}
	}

};