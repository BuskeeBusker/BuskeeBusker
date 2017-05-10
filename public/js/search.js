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

			<div id="busker0" class="row">
				<div class="ui sixteen wide column grid">
					<div class="eight wide column">
						<a href = "busker_info.html">
							<img class="ui image" id="search_example1" src="img/BuskerHu.png" style="width: 600px; height: 400px;" />
						</a>
					</div>
					<div class="eight wide column">
						<div class="row">
							Name: Seong Jung Hu
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

	console.log("hi");
	$("#busker0").on("click", function() {
		console.log("hi");
		window.location.href = "/busker_info.html";
	});


});