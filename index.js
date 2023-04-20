
var statelamp =false;
var statefan =false;
var statepump =false;
var stateauto =false;
var statemanual =false;
var valueLamp ="OFF";
var valueFan ="OFF";
var valuePump ="OFF";
var valueAuto1 ="OFF";
var valueAuto2 ="OFF";
var valueManual ="OFF";
var manual_val = "OFF";
var auto_val1 = "OFF";
var auto_val2 = "OFF";
var t_check = 0; 
var h_check = 0;
var l_check = 0; // khởi tạo giá trị ban đầu của biến check
var f_check = 0;
var p_check = 0;

var l_s_hour = 0;
var l_s_minute = 0;
var l_s_day = 0;
var l_e_hour = 0;
var l_e_minute = 0;
var l_e_day = 0;

var f_s_hour = 0;
var f_s_minute = 0;
var f_s_day = 0;
var f_e_hour = 0;
var f_e_minute = 0;
var f_e_day = 0;

var p_s_hour = 0;
var p_s_minute = 0;
var p_s_day = 0;
var p_e_hour = 0;
var p_e_minute = 0;
var p_e_day = 0;



var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");

var tempp_min = document.getElementById("temp_min").value;
var tempp_max = document.getElementById("temp_max").value;
      var humm_min = document.getElementById("hum_min").value;
      var humm_max = document.getElementById("hum_max").value;
function LoadForm()
{
 document.getElementById("dangnhap").style.display = "block";
 document.getElementById("dieukhien").style.display = "none";
 //document.getElementById("chart_rt").style.display = "none";

}

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA5R3tSn0rVajaU30eF3fgkhfRGZqvmaGA",
    authDomain: "tt-iot-eeb9d.firebaseapp.com",
    databaseURL: "https://tt-iot-eeb9d-default-rtdb.firebaseio.com",
    projectId: "tt-iot-eeb9d",
    storageBucket: "tt-iot-eeb9d.appspot.com",
    messagingSenderId: "610709263766",
    appId: "1:610709263766:web:d674ce2b9525e9bbcfb9b7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  //functions
  // make sure that the name in ' ' match with name of your database child
  var nhietDo = document.getElementById('nhietdo');
  var dbRef = firebase.database().ref().child('Nhiet do');
  var doAm = document.getElementById('doam');
  var dbRef2 = firebase.database().ref().child('Do am');
  dbRef.on('value', snap => nhietDo.innerText = snap.val());
  dbRef2.on('value', snap => doAm.innerText = snap.val());

  var doAmdat = document.getElementById('doamdat');
  var dbRefd = firebase.database().ref().child('Do am dat');

  dbRefd.on('value', snap => doAmdat.innerText = snap.val());



//-------------------------------------------------------
  //var userName = document.getElementById('username');
  //var passWord = document.getElementById('password');
  var username =firebase.database().ref('users').child('username');
  var password =firebase.database().ref('users').child('password');
  //username.on('value', snap => userName.innerText = snap.val());
  //password.on('value', snap => passWord.innerText = snap.val());

  var usernameValue, passwordValue;
  username.on('value', snap => usernameValue = snap.val());
  password.on('value', snap => passwordValue = snap.val());
//-------------------------------------------------------
// // Get the references to the HTML input fields
// var userName = document.getElementById('username');
// var passWord = document.getElementById('password');

// // Get the references to the Firebase Realtime Database nodes
// var usersRef = firebase.database().ref('users');
// var usernameRef = usersRef.child('username');
// var passwordRef = usersRef.child('password');

// // Retrieve the data from Firebase Realtime Database and update the input fields
// usernameRef.on('value', function(snapshot) {
//   userName.value = snapshot.val();
// });
// passwordRef.on('value', function(snapshot) {
//   passWord.value = snapshot.val();
// });
//-------------------------------------------------------
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChartDoAm() {
  var data = new google.visualization.DataTable();
  data.addColumn('datetime', 'Thời gian');
  data.addColumn('number', 'Độ ẩm');

  var options = {
    title: 'Biểu đồ độ ẩm',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));


  dbRef2.on('value', function(snapshot) {
    var values = snapshot.val();
    var dataChart = [];

    for (var key in values) {
      if (values.hasOwnProperty(key)) {
        var value = values[key];
        dataChart.push([new Date(key), value]);
      }
    }

    data.addRows(dataChart);
    chart.draw(data, options);
  });
}


  var lampp = document.getElementById('den');
  var dbRef3 = firebase.database().ref('DK').child('den');
  dbRef3.on('value', snap => lampp.innerText = snap.val());

  var fann = document.getElementById('quat');
  var dbRef4 = firebase.database().ref('DK').child('quat');
  dbRef4.on('value', snap => fann.innerText = snap.val());

  var pumpp = document.getElementById('maybom');
  var dbRef5 = firebase.database().ref('DK').child('maybom');
  dbRef5.on('value', snap => pumpp.innerText = snap.val());



      // Đăng ký sự kiện on thay đổi dữ liệu trên Firebase
      firebase.database().ref('temp_setup').on('value', function(snapshot) {
        var data = snapshot.val();
        document.getElementById("temp_min").value = data.temp_min;
        document.getElementById("temp_max").value = data.temp_max;
      });
      firebase.database().ref('hum_setup').on('value', function(snapshot) {
        var data = snapshot.val();
        document.getElementById("hum_min").value = data.hum_min;
        document.getElementById("hum_max").value = data.hum_max;
      });
      firebase.database().ref('moist_setup').on('value', function(snapshot) {
        var data = snapshot.val();
        document.getElementById("moist_min").value = data.moist_min;
        document.getElementById("moist_max").value = data.moist_max;
      });
    // Đăng ký sự kiện on thay đổi dữ liệu trên Firebase
    firebase.database().ref('lamp_timer').on('value', function(snapshot) {
      var data = snapshot.val();
      document.getElementById("l_s_hour").value = data.l_s_hour;
      document.getElementById("l_s_minute").value = data.l_s_minute;
      document.getElementById("l_s_day").value = data.l_s_day;
      document.getElementById("l_e_hour").value = data.l_e_hour;
      document.getElementById("l_e_minute").value = data.l_e_minute;
      document.getElementById("l_e_day").value = data.l_e_day;
    });

        // Đăng ký sự kiện on thay đổi dữ liệu trên Firebase
        firebase.database().ref('fan_timer').on('value', function(snapshot) {
          var data = snapshot.val();
          document.getElementById("f_s_hour").value = data.f_s_hour;
          document.getElementById("f_s_minute").value = data.f_s_minute;
          document.getElementById("f_s_day").value = data.f_s_day;
          document.getElementById("f_e_hour").value = data.f_e_hour;
          document.getElementById("f_e_minute").value = data.f_e_minute;
          document.getElementById("f_e_day").value = data.f_e_day;
        });
            // Đăng ký sự kiện on thay đổi dữ liệu trên Firebase
            firebase.database().ref('pump_timer').on('value', function(snapshot) {
              var data = snapshot.val();
              document.getElementById("p_s_hour").value = data.p_s_hour;
              document.getElementById("p_s_minute").value = data.p_s_minute;
              document.getElementById("p_s_day").value = data.p_s_day;
              document.getElementById("p_e_hour").value = data.p_e_hour;
              document.getElementById("p_e_minute").value = data.p_e_minute;
              document.getElementById("p_e_day").value = data.p_e_day;
            });


  function WriteDataTofb(lamp,fan,pump,auto1,auto2,manual)
{
    firebase.database().ref("DK").set({
        den:lamp,
        quat:fan,
        maybom:pump,
        auto1:auto1,
        auto2:auto2,
        manual:manual
    });

}
function clicklamp(){
  statelamp=!statelamp;
  if(statelamp){
      valueLamp="ON";
  }else{
      valueLamp="OFF"
  }
  WriteDataTofb(valueLamp,valueFan,valuePump,valueAuto1,valueAuto2,valueManual);
}

function clickfan(){
  statefan=!statefan;
  if(statefan){
      valueFan="ON";
  }else{
      valueFan="OFF"
  }
  WriteDataTofb(valueLamp,valueFan,valuePump,valueAuto1,valueAuto2,valueManual);
}

function clickpump(){
  statepump=!statepump;
  if(statepump){
      valuePump="ON";
  }else{
      valuePump="OFF"
  }
  WriteDataTofb(valueLamp,valueFan,valuePump,valueAuto1,valueAuto2,valueManual);
}
function temp_save()
{
    // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
    var tempp_min = document.getElementById("temp_min").value;
    var tempp_max = document.getElementById("temp_max").value;

    // Ghi thông tin lên Firebase
  
  
      firebase.database().ref("temp_setup").set({
        temp_min: tempp_min,
        temp_max: tempp_max,
        t_check: ++t_check
      });
}
function hum_save()
{
      // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
      var humm_min = document.getElementById("hum_min").value;
      var humm_max = document.getElementById("hum_max").value;
  
      // Ghi thông tin lên Firebase
    
    
        firebase.database().ref("hum_setup").set({
          hum_min: humm_min,
          hum_max: humm_max,
          h_check: ++h_check
        });
}

function moist_save()
{
    // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
    var moist_min = document.getElementById("moist_min").value;
    var moist_max = document.getElementById("moist_max").value;

    // Ghi thông tin lên Firebase
  
  
      firebase.database().ref("moist_setup").set({
        moist_min: moist_min,
        moist_max: moist_max,
 //       t_check: ++t_check
      });
}

function lamp_saveTimer() {
  // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
  var l_s_hour = document.getElementById("l_s_hour").value;
  var l_s_minute = document.getElementById("l_s_minute").value;
  var l_s_day = document.getElementById("l_s_day").value;
  var l_e_hour = document.getElementById("l_e_hour").value;
  var l_e_minute = document.getElementById("l_e_minute").value;
  var l_e_day = document.getElementById("l_e_day").value;
  // Ghi thông tin lên Firebase


    firebase.database().ref("lamp_timer").set({
      l_s_hour: l_s_hour,
      l_s_minute: l_s_minute,
      l_s_day: l_s_day,
      l_e_hour: l_e_hour,
      l_e_minute: l_e_minute,
      l_e_day: l_e_day,
      l_check: ++l_check
    });
    // database.ref('hengio/check').set(++check);
}
function fan_saveTimer() {
  // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
  var f_s_hour = document.getElementById("f_s_hour").value;
  var f_s_minute = document.getElementById("f_s_minute").value;
  var f_s_day = document.getElementById("f_s_day").value;
  var f_e_hour = document.getElementById("f_e_hour").value;
  var f_e_minute = document.getElementById("f_e_minute").value;
  var f_e_day = document.getElementById("f_e_day").value;
  
  // Ghi thông tin lên Firebase


    firebase.database().ref("fan_timer").set({
      f_s_hour: f_s_hour,
      f_s_minute: f_s_minute,
      f_s_day: f_s_day,
      f_e_hour: f_e_hour,
      f_e_minute: f_e_minute,
      f_e_day: f_e_day,
      f_check: ++f_check
    });
    // database.ref('hengio/check').set(++check);
}

function pump_saveTimer() {
  // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
  var p_s_hour = document.getElementById("p_s_hour").value;
  var p_s_minute = document.getElementById("p_s_minute").value;
  var p_s_day = document.getElementById("p_s_day").value;
  var p_e_hour = document.getElementById("p_e_hour").value;
  var p_e_minute = document.getElementById("p_e_minute").value;
  var p_e_day = document.getElementById("p_e_day").value;
  // Ghi thông tin lên Firebase


    firebase.database().ref("pump_timer").set({
      p_s_hour: p_s_hour,
      p_s_minute: p_s_minute,
      p_s_day: p_s_day,
      p_e_hour: p_e_hour,
      p_e_minute: p_e_minute,
      p_e_day: p_e_day,
      p_check: ++p_check
    });
    // database.ref('hengio/check').set(++check);
}

function backHOME(){
 //window.onload();
   if (window.confirm('Bạn muốn quay lại???'))
   {
       document.getElementById("dangnhap").style.display = "block";
       document.getElementById("dieukhien").style.display = "none";
    //   document.getElementById("chart_rt").style.display = "none";	
   }
   else
   {
       document.getElementById("dangnhap").style.display = "none";
       document.getElementById("dieukhien").style.display = "block";	
    //   document.getElementById("chart_rt").style.display = "none";	
   }
}

 function toggleButton(buttonId) {
  if (buttonId === 1) {
    stateauto=!stateauto;
    if(stateauto){

        valueAuto1="OFF";
        valueAuto2="OFF";
        valueManual="ON";

    }else{

        valueAuto1="OFF"
        valueAuto2="OFF";
        valueManual="OFF";

    }
    WriteDataTofb(valueLamp,valueFan,valuePump,valueAuto1,valueAuto2,valueManual);
  } 
  else if (buttonId === 2) {
    statemanual=!statemanual;
    if(statemanual){

        valueAuto1="ON";
        valueAuto2="OFF";
        valueManual="OFF";
    }else{

        valueAuto1="OFF"
        valueAuto2="ON";
        valueManual="OFF";
    }
    WriteDataTofb(valueLamp,valueFan,valuePump,valueAuto1,valueAuto2,valueManual);
  }
  else if (buttonId === 3) {
    statemanual=!statemanual;
    if(statemanual){

        valueAuto1="OFF";
        valueAuto2="ON";
        valueManual="OFF";
    }else{

        valueAuto1="ON"
        valueAuto2="OFF";
        valueManual="OFF";
    }
    WriteDataTofb(valueLamp,valueFan,valuePump,valueAuto1,valueAuto2,valueManual);
  }
}
//-----------------------------------------------------------------
var currentDate = new Date();
var currentDay = currentDate.getDate();
var currentHour = currentDate.getHours();
var currentMinute = currentDate.getMinutes();
var currentSecond = currentDate.getSeconds();
var tempp = document.getElementById("nhietdo").value;
var humm = document.getElementById("doam").value;

console.log(`Bây giờ là ${currentHour}:${currentMinute}:${currentSecond}`);

  // Lấy trạng thái ON/OFF của button từ Firebase
  var buttonRef1 = firebase.database().ref('DK').child('manual');
  buttonRef1.on("value", function(snapshot) {
    var isOn1 = snapshot.val();
    if (isOn1 == "ON" ) {
      // Nếu trạng thái là ON thì sáng button
      document.getElementById("button1").classList.add("on");
      document.getElementById('button_den').disabled = false;
      document.getElementById('button_quat').disabled = false;
      document.getElementById('button_bom').disabled = false;
      document.getElementById('button_temp').disabled = true;
      document.getElementById('button_hum').disabled = true;
      document.getElementById('button_den_save').disabled = true;
      document.getElementById('button_quat_save').disabled = true;
      document.getElementById('button_bom_save').disabled = true;  
    } else if (isOn1 == "OFF" )  {
      // Nếu trạng thái là OFF thì tắt button
      document.getElementById("button1").classList.remove("on");
      document.getElementById('button_den').disabled = true;
      document.getElementById('button_quat').disabled = true;
      document.getElementById('button_bom').disabled = true;
      document.getElementById('button_temp').disabled = false;
      document.getElementById('button_hum').disabled = false;
      document.getElementById('button_den_save').disabled = false;
      document.getElementById('button_quat_save').disabled = false;
      document.getElementById('button_bom_save').disabled = false; 
      
    }
  });

    // Lấy trạng thái ON/OFF của button từ Firebase
    var buttonRef2 = firebase.database().ref('DK').child('auto1');
    buttonRef2.on("value", function(snapshot) {
      var isOn2 = snapshot.val();
      if (isOn2 == "ON" ) {
        // Nếu trạng thái là ON thì sáng button
        document.getElementById("button2").classList.add("on");

      } else if (isOn2 == "OFF" ){
        // Nếu trạng thái là OFF thì tắt button
        document.getElementById("button2").classList.remove("on");
      }
    });

    var buttonRef3 = firebase.database().ref('DK').child('auto2');
    buttonRef3.on("value", function(snapshot) {
      var isOn7 = snapshot.val();
      if (isOn7 == "ON" ) {
        // Nếu trạng thái là ON thì sáng button
        document.getElementById("button3").classList.add("on");

      } else if (isOn7 == "OFF" ){
        // Nếu trạng thái là OFF thì tắt button
        document.getElementById("button3").classList.remove("on");
      }
    });
//-----------------------------------------------------------------
setInterval(function() {
  //code kiểm tra tại đây

  console.log(auto_val1);
  var currentDate = new Date();
  var currentHour = currentDate.getHours();
  var currentDay = currentDate.getDate();
  var currentMinute = currentDate.getMinutes();
  var currentSecond = currentDate.getSeconds();

        autoref1 = firebase.database().ref('DK').child('auto1');
        autoref1.on("value", function(snapshot) {
        var  isOn3 = snapshot.val();
        auto_val1 = isOn3;
        if ((auto_val1 == "ON" )&& (auto_val1 != "OFF")) {

        var tempMaxRef = firebase.database().ref('temp_setup').child('temp_max');
				var tempMinRef = firebase.database().ref('temp_setup').child('temp_min');
				var tempRef = firebase.database().ref('Nhiet do');
				
				tempMaxRef.once('value').then(function(snapshot) {
					var tempMax = snapshot.val();
					
					tempMinRef.once('value').then(function(snapshot) {
						var tempMin = snapshot.val();
						
						tempRef.on('value', function(snapshot) {
							var temp = snapshot.val();
							
							if ((temp < tempMin)&& (auto_val1 != "OFF")) {
								// perform action 1
                valueLamp="ON"
								console.log(`${currentHour}:${currentMinute}:${currentSecond} Temperature is below minimum`);
                console.log(`${l_s_day}:${l_s_hour}:${l_s_minute}`);
							} else if ((temp > tempMax)&& (auto_val1 != "OFF")) {
								// perform action 2
                valueLamp="OFF"
								console.log(`${currentHour}:${currentMinute}:${currentSecond} Temperature is above maximum`);
                console.log(`${l_s_day}:${l_s_hour}:${l_s_minute}`);
							}
						});
					});
				});

           

      

        var humMaxRef = firebase.database().ref('hum_setup').child('hum_max');
				var humMinRef = firebase.database().ref('hum_setup').child('hum_min');
				var humRef = firebase.database().ref('Do am');
				
				humMaxRef.once('value').then(function(snapshot) {
					var humMax = snapshot.val();
					
					humMinRef.once('value').then(function(snapshot) {
						var humMin = snapshot.val();
						
						humRef.on('value', function(snapshot) {
							var hum = snapshot.val();
							
							if ((hum < humMin)&& (auto_val1 != "OFF")) {
								// perform action 1
                valueFan="ON"
								console.log(`${currentHour}:${currentMinute}:${currentSecond} humid is below minimum`);
                console.log(`${l_s_day}:${l_s_hour}:${l_s_minute}`);
							} else if ((hum> humMax)&& (auto_val1 != "OFF")) {
								// perform action 2
                valueFan="OFF"
								console.log(`${currentHour}:${currentMinute}:${currentSecond} humid is above maximum`);
                console.log(`${l_s_day}:${l_s_hour}:${l_s_minute}`);
							}
						});
					});
				});
//      }} );


      var moistMaxRef = firebase.database().ref('moist_setup').child('moist_max');
      var moistMinRef = firebase.database().ref('moist_setup').child('moist_min');
      var moistRef = firebase.database().ref('Do am dat');
      
      moistMaxRef.once('value').then(function(snapshot) {
        var moistMax = snapshot.val();
        
        moistMinRef.once('value').then(function(snapshot) {
          var moistMin = snapshot.val();
          
          moistRef.on('value', function(snapshot) {
            var moist = snapshot.val();
            
            if ((moist < moistMin)&& (auto_val1 != "OFF")) {
              // perform action 1
              valuePump="ON"
              console.log(`${currentHour}:${currentMinute}:${currentSecond} moist is below minimum`);
              console.log(`${l_s_day}:${l_s_hour}:${l_s_minute}`);
            } else if ((moist> moistMax)&& (auto_val1 != "OFF")) {
              // perform action 2
              valuePump="OFF"
              console.log(`${currentHour}:${currentMinute}:${currentSecond} moist is above maximum`);
              console.log(`${l_s_day}:${l_s_hour}:${l_s_minute}`);
            }
          });
        });
      });

    }} );

      var manualref = firebase.database().ref('DK').child('manual');
      manualref.on("value", function(snapshot) {
      var isOn4 = snapshot.val();
     manual_val = isOn4;
      });

      var autoref2 = firebase.database().ref('DK').child('auto2');
      autoref2.on("value", function(snapshot) {
     var  isOn5 = snapshot.val();
      auto_val2 = isOn5;
      if (auto_val2 == "ON" ) {

        var l_s_day_ref = firebase.database().ref('lamp_timer').child('l_s_day');
        l_s_day_ref.on("value", function(snapshot) {
        var ran11 = snapshot.val();
        l_s_day = ran11;
        });

        var l_e_day_ref = firebase.database().ref('lamp_timer').child('l_e_day');
        l_e_day_ref.on("value", function(snapshot) {
        var ran12 = snapshot.val();
        l_e_day = ran12;
        });

        var l_s_hour_ref = firebase.database().ref('lamp_timer').child('l_s_hour');
        l_s_hour_ref.on("value", function(snapshot) {
        var ran13 = snapshot.val();
        l_s_hour = ran13;
        });

        var l_e_hour_ref = firebase.database().ref('lamp_timer').child('l_e_hour');
        l_e_hour_ref.on("value", function(snapshot) {
        var ran14 = snapshot.val();
        l_e_hour = ran14;
        });

        var l_s_minute_ref = firebase.database().ref('lamp_timer').child('l_s_minute');
        l_s_minute_ref.on("value", function(snapshot) {
        var ran15 = snapshot.val();
        l_s_minute = ran15;
        });

        var l_e_minute_ref = firebase.database().ref('lamp_timer').child('l_e_minute');
        l_e_minute_ref.on("value", function(snapshot) {
        var ran16 = snapshot.val();
        l_e_minute = ran16;
        });

        var p_s_day_ref = firebase.database().ref('pump_timer').child('p_s_day');
        p_s_day_ref.on("value", function(snapshot) {
        var ran21 = snapshot.val();
        p_s_day = ran21;
        });

        var p_e_day_ref = firebase.database().ref('pump_timer').child('p_e_day');
        p_e_day_ref.on("value", function(snapshot) {
        var ran22 = snapshot.val();
        p_e_day = ran22;
        });

        var p_s_hour_ref = firebase.database().ref('pump_timer').child('p_s_hour');
        p_s_hour_ref.on("value", function(snapshot) {
        var ran23 = snapshot.val();
        p_s_hour = ran23;
        });

        var p_e_hour_ref = firebase.database().ref('pump_timer').child('p_e_hour');
        p_e_hour_ref.on("value", function(snapshot) {
        var ran24 = snapshot.val();
        p_e_hour = ran24;
        });

        var p_s_minute_ref = firebase.database().ref('pump_timer').child('p_s_minute');
        p_s_minute_ref.on("value", function(snapshot) {
        var ran25 = snapshot.val();
        p_s_minute = ran25;
        });

        var p_e_minute_ref = firebase.database().ref('pump_timer').child('p_e_minute');
        p_e_minute_ref.on("value", function(snapshot) {
        var ran26 = snapshot.val();
        p_e_minute = ran26;
        });

        var f_s_day_ref = firebase.database().ref('fan_timer').child('f_s_day');
        f_s_day_ref.on("value", function(snapshot) {
        var ran31 = snapshot.val();
        f_s_day = ran31;
        });

        var f_e_day_ref = firebase.database().ref('fan_timer').child('f_e_day');
        f_e_day_ref.on("value", function(snapshot) {
        var ran32 = snapshot.val();
        f_e_day = ran32;
        });

        var f_s_hour_ref = firebase.database().ref('fan_timer').child('f_s_hour');
        f_s_hour_ref.on("value", function(snapshot) {
        var ran33 = snapshot.val();
        f_s_hour = ran33;
        });

        var f_e_hour_ref = firebase.database().ref('fan_timer').child('f_e_hour');
        f_e_hour_ref.on("value", function(snapshot) {
        var ran34 = snapshot.val();
        f_e_hour = ran34;
        });

        var f_s_minute_ref = firebase.database().ref('fan_timer').child('f_s_minute');
        f_s_minute_ref.on("value", function(snapshot) {
        var ran35 = snapshot.val();
        f_s_minute = ran35;
        });

        var f_e_minute_ref = firebase.database().ref('fan_timer').child('f_e_minute');
        f_e_minute_ref.on("value", function(snapshot) {
        var ran36 = snapshot.val();
        f_e_minute = ran36;
        });

        var now = new Date();

// Get the start and end times as Date objects
var start_lamp = new Date(now.getFullYear(), now.getMonth(), l_s_day,l_s_hour,l_s_minute, 0, 0);
// var start_lamp = new Date(l_s_day);
// start_lamp.setHours(l_s_hour);
// start_lamp.setMinutes(l_s_minute);

var end_lamp = new Date(now.getFullYear(), now.getMonth(), l_e_day,l_e_hour,l_e_minute, 0, 0);
// var end_lamp = new Date(l_e_day);
// end_lamp.setHours(l_e_hour);
// end_lamp.setMinutes(l_e_minute);

var start_fan = new Date(now.getFullYear(), now.getMonth(), f_s_day,f_s_hour,f_s_minute, 0, 0);
// var start_fan = new Date(f_s_day);
// start_fan.setHours(f_s_hour);
// start_fan.setMinutes(f_s_minute);

var end_fan = new Date(now.getFullYear(), now.getMonth(), f_e_day,f_e_hour,f_e_minute, 0, 0);
// var end_fan = new Date(f_e_day);
// end_fan.setHours(f_e_hour);
// end_fan.setMinutes(f_e_minute);

var start_pump = new Date(now.getFullYear(), now.getMonth(), p_s_day,p_s_hour,p_s_minute, 0, 0);
// var start_pump = new Date(p_s_day);
// start_pump.setHours(p_s_hour);
// start_pump.setMinutes(p_s_minute);

var end_pump = new Date(now.getFullYear(), now.getMonth(), p_e_day,p_e_hour,p_e_minute, 0, 0);
// var end_pump = new Date(p_e_day);
// end_pump.setHours(p_e_hour);
// end_pump.setMinutes(p_e_minute);

// Check if the current time is within the start and end times
if (now >= start_lamp && now <= end_lamp) {
  // Send "ON" signal to Firebase
  valueLamp="ON";
  console.log(now);
  console.log(start_lamp);
  console.log(end_lamp);
} else {
  // Send "OFF" signal to Firebase
  valueLamp="OFF";
  console.log(now);
  console.log(start_lamp);
  console.log(end_lamp);
}

if (now >= start_fan && now <= end_fan) {
  // Send "ON" signal to Firebase
  valueFan="ON";

} else {
  // Send "OFF" signal to Firebase
  valueFan="OFF";
}

if (now >= start_pump && now <= end_pump) {
  // Send "ON" signal to Firebase
  valuePump="ON";

} else {
  // Send "OFF" signal to Firebase
  valuePump="OFF";
}

  //       if (((currentDay < l_s_day) ||(currentDay > l_e_day) )&& ((currentHour < l_s_hour) || (currentHour > l_e_hour))&& ((currentMinute < l_s_minute) ||(currentMinute > l_e_minute)))
  //       {
  //        valueLamp="OFF"

  //      }
  //      if ((currentDay >= l_s_day) && (currentDay <= l_e_day) &&  (currentHour >= l_s_hour) && (currentHour <= l_e_hour) && (currentMinute >= l_s_minute) && (currentMinute <= l_e_minute)) 
  //      {
  //       valueLamp="ON"

  //     }
 
  //     if (((currentDay < f_s_day) ||(currentDay > f_e_day) )&& ((currentHour < f_s_hour) || (currentHour > f_e_hour))&& ((currentMinute < f_s_minute) ||(currentMinute > f_e_minute)))
  //     {
  //      valueFan="OFF"

  //    }
  //    if ((currentDay >= f_s_day) && (currentDay <= f_e_day) &&  (currentHour >= f_s_hour) && (currentHour <= f_e_hour) && (currentMinute >= f_s_minute) && (currentMinute <= f_e_minute)) 
  //    {
  //     valueFan="ON"

  //   }
  //   if (((currentDay < p_s_day) ||(currentDay > p_e_day) )&& ((currentHour < p_s_hour) || (currentHour > p_e_hour))&& ((currentMinute < p_s_minute) ||(currentMinute > p_e_minute)))
  //   {
  //    valuePump="OFF"

  //  }
  //  if ((currentDay >= p_s_day) && (currentDay <= p_e_day) &&  (currentHour >= p_s_hour) && (currentHour <= p_e_hour) && (currentMinute >= p_s_minute) && (currentMinute <= p_e_minute)) 
  //  {
  //   valuePump="ON"

  // }



      }});
  
  WriteDataTofb(valueLamp,valueFan,valuePump,auto_val1,auto_val2,manual_val);

}, 1000); //1000 là thời gian tính bằng ms, tức là 1 giây




// firebase.database().ref("Nhiet do").on("value", function(snapshot) {
//   var temp_val = snapshot.val();
//   if (stateauto) {
//     // Nếu chế độ Auto được kích hoạt
//     if (temp_val < tempp_min) {
//       // Nhiệt độ thấp hơn giá trị tối thiểu
//       // Thực hiện khối lệnh 1
//       console.log("Temperature is too low!");
//     } else if (temp_val > tempp_max) {
//       // Nhiệt độ cao hơn giá
//       console.log("Temperature is too high!");
//     }}
//   });
//-----------------------------------------------------------------
//check login form
function login()
{
   var ssid = document.getElementById("ssid").value;
   var pass = document.getElementById("pass").value;

   if(ssid == usernameValue && pass == passwordValue)
   {
       console.log("OK");
       document.getElementById("ssid").value = "";	
       document.getElementById("pass").value = "";
       document.getElementById("dangnhap").style.display = "none";
       document.getElementById("dieukhien").style.display = "block";	
    //   document.getElementById("chart_rt").style.display = "none";	
       
   }
   else 
   {
       console.log("Error!!!");
       document.getElementById("ssid").value = "";	
       document.getElementById("pass").value = "";
       alert("Tên đăng nhập hoặc mật khẩu không đúng vui lòng kiểm tra lại!!!");
   }
}

// function chart_realtime()
// {
//   document.getElementById("dangnhap").style.display = "none";
//   document.getElementById("dieukhien").style.display = "none";	
//   document.getElementById("chart_rt").style.display = "block";	

// }
// function chart_back()
// {
//   document.getElementById("dangnhap").style.display = "none";
//   document.getElementById("dieukhien").style.display = "block";	
//   document.getElementById("chart_rt").style.display = "none";	

// }



//-----------------------------------------------------------------
// function login() {
//   const username = document.getElementById("ssid").value;
//   const password = document.getElementById("pass").value;

//   // Query data from Firebase Realtime Database
//   const usersRef = firebase.database().ref("users");
//   usersRef.orderByChild("username").equalTo(username).once("value")
//     .then((snapshot) => {
//       const user = snapshot.val();
//       if (user && user.password === password) {
//         // Login success, do something here
//       //  console.log(user.password);
//         console.log("Đăng nhập thành công!");
//       } else {
//       //  console.log(user.password);
//         alert(user.password);
//         alert("Tên đăng nhập hoặc mật khẩu không đúng!");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       alert("Đã xảy ra lỗi khi đăng nhập!");
//     });
// }
//-----------------------------------------------------------------

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() 
{
   var data = google.visualization.arrayToDataTable([
 ['Label', 'Value'],
 ['Nhiệt độ', 80],
]);

var data1 = google.visualization.arrayToDataTable([
 ['Label', 'Value'],
 ['Độ ẩm', 80],

]);

var data2 = google.visualization.arrayToDataTable([
  ['Label', 'Value'],
  ['Độ ẩm đất', 80],
 ]);

var optionsnhietdo = {
 min: 0, max: 150,
 width: 400, height: 120,
 redFrom: 130, redTo: 150,
 yellowFrom:100, yellowTo: 140,
 minorTicks: 5
};

var optionsdoam = {
 min: 0, max: 100,
 width: 400, height: 120,
 redFrom: 80, redTo: 100,
 yellowFrom:70, yellowTo:80,
 minorTicks: 5
};

var optionsdoamdat = {
  min: 0, max: 150,
  width: 400, height: 120,
  redFrom: 130, redTo: 150,
  yellowFrom:100, yellowTo: 140,
  minorTicks: 5
 };

var chart = new google.visualization.Gauge(document.getElementById('chart_nhietdo'));		
var chart1 = new google.visualization.Gauge(document.getElementById('chart_doam'));
var chart2 = new google.visualization.Gauge(document.getElementById('chart_doamdat'));   
chart.draw(data, optionsnhietdo);

chart1.draw(data1, optionsdoam);
chart2.draw(data2, optionsdoamdat);

setInterval(function() {
 
 var datanhietdo = nhietDo.innerText;
 data.setValue(0, 1, datanhietdo);
 chart.draw(data, optionsnhietdo);
}, 300);

setInterval(function() {
var datadoam = doAm.innerText;
 data1.setValue(0, 1, datadoam);
 chart1.draw(data1, optionsdoam);
}, 300);	

setInterval(function() {
  var datadoamdat = doAmdat.innerText;
   data2.setValue(0, 1, datadoamdat);
   chart2.draw(data2, optionsdoamdat);
  }, 300);	
}



function Start()
{
LoadForm();
myFunction();
//UpdateData();
}

function myFunction() {
 var x = document.getElementById("pass");
 if (x.type === "password") {
   x.type = "text";
 } else {
   x.type = "password";
 }
}

const apiKey = '2ea2cd000b72e7e30eb60d0ba194b960';
const lat = 40.712776;
const lon = -74.005974;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=21.053512&lon=105.784442&appid=2ea2cd000b72e7e30eb60d0ba194b960`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const temperature = Math.round(data.main.temp - 273.15);
    const humidity = data.main.humidity;
    const weatherDescription = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

    document.getElementById('temperature').innerText = temperature + '°C';
    document.getElementById('humidity').innerText = humidity + '%';
    document.getElementById('description').innerText = weatherDescription;
    document.getElementById('icon').src = iconUrl;
  })
  .catch(error => console.log(error));

//----------------------------------------------------

