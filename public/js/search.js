$(document).ready(function() {
	$(".ui.dropdown")
	  .dropdown({
	  	allowCategorySelection: true
	  });
	$("#search-button").on("click", function() {
		this.html("");
		this.html(`
			<div class="row">
				<div class="ui center aligned grid">
					<div class="sixteen wide column">
						<h3>1 buskers found</h3>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="ui sixteen wide column grid">
					<div class="eight wide column">
						<img class="ui image" id="search_example1" src="img/search_example1.jpg"/>
					</div>
					<div class="eight wide column">
						<div class="row">
							Name: Aaancod
						</div>
						<div class="row">
							Genre: R&B
						</div>
						<div class="row">
							Location: Hongdea, Shinchon, Gangnam
						</div>
						<div class="row">
							Hashtags: #subway #guitar
						</div>
					</div>
				</div>
			</div>
			`)
	}.bind($("#search-result")));


});