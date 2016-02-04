window.onload = function(){
	main();
}
var resultArr = []
var resultArr1 = []

function main (){

	var dataset = [
		'hotels%las%vegas',
		'hotels%germany',
		'hotels%paris',
		'hotels%australia',
		'hotels%india',
		'hotels%dubai',
		'hotels%los%angeles',
		'flights%las%vegas',
		'flights%germany',
		'flights%paris',
		'flights%australia',
		'flights%india',
		'flights%dubai',
		'flights%los%angeles',
		'package%las%vegas',
		'package%germany',
		'package%paris',
		'package%australia',
		'package%india',
		'package%dubai',
		'package%los%angeles'
	]
	var dataset1 = [
		'vegas',
		'germany',
		'paris',
		'australia',
		'india',
		'dubai',
		'angeles',
		'vegas',
		'germany',
		'paris',
		'australia',
		'india',
		'dubai',
		'angeles',
		'vegas',
		'germany',
		'paris',
		'australia',
		'india',
		'dubai',
		'angeles'
	]

	for (var i = 0; i < dataset.length; i++){
		chrome.history.search({"text": dataset[i]}, function (data){
			console.log(data);
			for (var j = 0; j < dataset1.length; j++){
				if (data.length > 0){
					var string = data[0]['url']
				    substring = dataset1[j];
					if (string.indexOf(substring) > -1){
						resultArr1.push(dataset1[j]);
					}
				}
			}
			resultArr.push(dataset[i]);
		});
		if (i == dataset.length - 1){
			setTimeout(explode, 10000);
		}
	}

	$('tbody').on("click","a.modal-trigger",function(e){

		var id=$(this).attr("id");

		$.ajax({
			type: 'GET',
			url: 'http://127.0.0.1:8000/viewAgentPackage1',
			data: {
				id:id
			},
			success: function(data){

				$('#modal1').openModal();
				$('.viewName').html('');
				$('.viewPackageName').html('');
				$('.viewPrice').html('');
				$('.viewBid').html('');
				$('.viewRemarks').html('');
				$('.airportForm').html('');
				$('.customFormHotel').html('');
				$('.tourGuide').html('');

				if((data['Airports'].length) >0){
					
					$('.airportForm').html('<label class="travellabel">Travel Details</label>');
				}
				if((data['Hotels'].length) >0){

					$('.customFormHotel').html('<label class="travellabel">Hotel Details</label>');
				}
				if((data['Days'].length)){

					$('.tourGuide').html('<label class="travellabel">Tour-Guide Details</label>	');
				}

				$('.viewName').html(data['Name']);
				$('.viewPackageName').html(data['PackageName']);
				$('.viewPrice').html(data['Price']);
				$('.viewBid').html(data['Bid']);
				$('.viewRemarks').html(data['Remarks']);


				for (var i=0;i<(data['Airports'].length);i++){

					var html="<div class='row flightRow'><div class='input-field col s4'><i class='fa fa-plane prefix'></i><label for='airports'>Departure Airport</label><input id='airports' type='text' disabled style='border-bottom:none' class='validate air departure' placeholder='Departure Airport' value='"+data['Airports'][i]["DepartureAirport"]+"'></div><div class='input-field col s4'><i class='fa fa-plane prefix'></i><label for='airports'>Arrival Airport</label><input disabled style='border-bottom:none' id='airports' type='text' class='validate air arrival' placeholder='Arrival Airport' value='"+data['Airports'][i]["ArrivalAirport"]+"'></div><div class='input-field col s4'><label>Seat Type</label><input disabled style='border-bottom:none' id='seatType' type='text' class='validate air seat-type' placeholder='Arrival Airport' value='"+data['Airports'][i]["SeatType"]+"'></div></div>";
					$('.airportForm').append(html);
				}

				for (var i=0;i<(data['Hotels'].length);i++){

					var html="<div class='row hotel-details' id='hotel-row'><div class='input-field col s4'><i class='fa fa-bed prefix'></i><label for='hotel-name'>Hotel Name</label><input disabled style='border-bottom:none' id='hotel-name' type='text' class='validate air' placeholder='Hotel Name' value='"+data['Hotels'][i]["HotelName"]+"'></div><div class='input-field col s3'><i class='fa fa-building prefix'></i><label for='hotel-city'>City</label><input disabled style='border-bottom:none' id='hotel-city' type='text' class='validate air' placeholder='City' value='"+data['Hotels'][i]["HotelCity"]+"'></div><div class='input-field col s2'><label for='room-type'>Room Type</label><input disabled style='border-bottom:none' id='room-type' type='text' class='validate air' placeholder='Room Type' value='"+data['Hotels'][i]["HotelRoomType"]+"'></div><div class='input-field col s3'><label for='num-of-days-nights'>Number of Days and Nights</label><input disabled style='border-bottom:none' id='num-of-days-nights' type='text' class='validate air' placeholder='Number of Days and Nights' value='"+data['Hotels'][i]["HotelNoDays"]+"'></div></div>";
					$('.customFormHotel').append(html);
				}
				
				for (var i=0;i<(data['Days'].length);i++){

					var html="<div class='row tour-guide' id='tour-guide'><div class='input-field col s12'><input disabled style='border-bottom:none;border-bottom: none;padding-left: 2%;font-size: 18px;color: inherit;margin-bottom: 0px;background-color: #FAFAFA;border: 0px;width: inherit' id='day' class='materialize-textarea' value='"+data['Days'][i]["Details"]+"'><label for='day' style='margin-left: 0px !important'>Details For Day '"+data['Days'][i]["index"]+"'</label></div></div>";
					$('.tourGuide').append(html);
				}	
			}
		});		
	});

}

	function explode (){
		console.log (resultArr1);
		var aa = []
		for (var k = 0; k < resultArr1.length; k++){
			var flag = false;
			for (var l = 0; l < aa.length; l++){
				if (aa[l] === resultArr1[k]){
					flag = true;
					break;
				}
			}
			if (flag == false){
				aa.push(resultArr1[k]);
				$.ajax({
					type: "GET",
					async: false,
					url: "http://127.0.0.1:8000/chromeExtGetPackage/?q=" + resultArr1[k],
					success: function (data){
						console.log(data);
						for (var i = 0; i < data['packages'].length; i++){
							var div =  "<tr class='requirementRow col s6 offset-s3'><td>" + data['packages'][i]['name'] + "</td><td>" + data['packages'][i]['price'] + "</td><td class='additional'><a class='waves-effect waves-light btn modal-trigger' href='#modal1' id='" + data['packages'][i]['id'] + "'>Entire Package</a></td></tr>"
						
							$('tbody').append(div)
						}
						$('.loader').css("display","none");
					}
				});
			}
		}
	}