$(function(){
	$('body').addClass("js-enabled");
	$('#wrapper').tabs();
	
	/* step link prompts */

	/* get all the sections */
	var sections = $(".tabs-panel"),
		i = sections.length,
		last = $(".tabs-panel:last").attr("id").split("-enhanced")[0],
		j, 
		id,
		ul,
		navid,
		sectionTitle,
		nav;
		
		last = "<li><a href='#"+last+"'>No thanks, just tell me how to claim</a></li>"
		
	while(i--){
		j = i+1;
		id = $(sections[j]).attr("id");
		navid = id+"-nav";
		nav = $("<div class='part-pagination group' role='navigation' id="+navid+"></div>");
		ul = $("<ul></ul>");
		
		sectionTitle = $("#"+id+" h1").html();

		if(sectionTitle != undefined){
			sectionTitle = sectionTitle.toLowerCase();
			id = id.split("-enhanced")[0];
			var next = ("<li><a href='#"+id+"'>Read about "+sectionTitle+"<span class='progressor'></span></a></li>");
			if(i == 2){
				$(ul).append(next)
			}
			else{
				$(ul).append(next+last)
			}

			$(sections[i]).find(".inner").append(nav);
			$("#"+navid).append(ul);
			
			$(".part-pagination a").live("click", function(){
			  if($(window.location.hash+"-enhanced").length != 0){
			   // $(window).scrollTop( $(window.location.hash+"-enhanced").offset().top );
			   $("html, body").animate({scrollTop: $(window.location.hash+"-enhanced").offset().top - 85},10);
		    }
			});
		}
	}
	
});