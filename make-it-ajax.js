// Need to include jquery before calling this script
API = {
	
	divToUpdate: 'test',
	isHidden: false,
	
	init: function(){
		this.movie = getFlashMovieObject('JewelryDesigner');
		this.ajax.parent = this;
	},
	
	view: function(name){
		updateBox = this.updateBox;
		parent = this;
		$.get(name, function(data) {
			$('#'+parent.divToUpdate).html(data);
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
			$("#"+this.divToUpdate).addClass('hidden');
		}
	},
	
	hide: function(){
		if(!this.isHidden)
		{
			this.isHidden = false;
			$("#"+this.divToUpdate).removeClass('hidden');
		}
	},
	
	ajax: {
		init: function(){
			this.links();
			this.forms();
		},
		
		links: function(){
			overlaylinks = $('div#'+this.parent.divToUpdate+' a');
			for(i=0; i<overlaylinks.length; i++)
			{
				$(overlaylinks[i]).click(function(){
					API.view(this.href);
					return false;
				});
			}
		},
		
		post: function(url, data){
			parent = this.parent;
			$.post(url, data, function(output) {
				$('#'+parent.divToUpdate).html(output);
				if(parent.isHidden)
				{
					parent.show();
				}
				API.ajax.init();
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
			overlaylinks = $('div#'+parent.divToUpdate+' form');
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
	},
	
	showCheckout: function(){
		this.view('views/checkout.html');
	}
	

};

$(document).ready(function(){	
	API.init();
});