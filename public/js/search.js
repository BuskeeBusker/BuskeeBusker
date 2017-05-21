$(document).ready(function() {
	$(".ui.dropdown").dropdown({
          allowCategorySelection: true
	  });
    $(".ui.dropdown").dropdown('set selected', 'All')
	$("#search-button").on("click", function() {
        $("#search-result").text("1 result is found for the keyword");
		this.html("");
		this.append(`
            <div id="busker0" class="ui message search">
                <div class="row">
                    <div class="ui sixteen wide column grid">
                        <div class="six wide column">
                            <a href = "busker_info.html">
                                <img class="ui image centered" id="search_example1" src="img/BuskerHu.png" style="height: 250px;" />
                            </a>
                        </div>
                        <div class="ten wide column">
                            <div class="row">
                                Name: Seong Jung Hu
                            </div>
                            <div class="row">
                                Genre: R&B
                            </div>
                            <div class="row">
                                Location: Hongdea, Sinchon, Gangnam
                            </div>
                            <div class="row">
                                Hashtags: #subway #guitar
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			`)
        $("#busker0").css("cursor", "pointer");
        $("#busker0").on("click", function() {
            console.log("hi");
            window.location.href = "./busker_info.html";
            });


        this.append(`
            <div id="busker0" class="ui message search">
                <div class="row">
                    <div class="ui sixteen wide column grid">
                        <div class="six wide column">
                            <a href = "busker_info.html">
                                <img class="ui image centered" id="search_example1" src="img/BuskerHu.png" style="height: 250px;" />
                            </a>
                        </div>
                        <div class="ten wide column">
                            <div class="row">
                                Name: Seong Jung Hu
                            </div>
                            <div class="row">
                                Genre: R&B
                            </div>
                            <div class="row">
                                Location: Hongdea, Sinchon, Gangnam
                            </div>
                            <div class="row">
                                Hashtags: #subway #guitar
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			`)
        $("#busker0").css("cursor", "pointer");
        $("#busker0").on("click", function() {
            console.log("hi");
            window.location.href = "./busker_info.html";
        });

    }.bind($("#search-content")));

});