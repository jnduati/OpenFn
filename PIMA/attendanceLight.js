//ATTENDANCE LIGHT JOB FOR ALL PROJECT USING ATTENDANCE LIGHT SURVEY

//Ethiopia Nespresso || Majang Forest || Uganda Agronomy || DRC Agronomy || Zim Agronomy Attendance Light || Herz || JDE || UNIDO
if(state.data.app_id == "ff36e62b9fcc46628ec1be58d50abb5f" || 
	state.data.app_id == "da5e5dd32b6a4a68b8c6e0f80fe42650" || 
	state.data.app_id == "bca69b9caad5441bb9c782e91d829e4b" || 
	state.data.app_id == "eeddc901b4aa4652b7252240152b20d5" || 
	state.data.app_id == "b75286e874c74eb09b8da436709d7f3c" ||
	state.data.app_id == "22d766b8c673413eab2d9042dfc904e0" ||
	state.data.app_id == "30714a65ecab4d2da5aa78ca91cefcf5" ||
	state.data.app_id == "4fd02c3be0104da29cba1844053b9301" ||
	state.data.app_id == "c14d231df6e142deb9bdd44319287437" ||
	state.data.app_id == "5372957f094346659170e319aa0ed456" ||
	state.data.app_id == "03a969f33e9648cb88c36114896f3cbe" ||
	state.data.app_id == "9859b71da086417284ced5c7be0670a8" ||
	state.data.app_id == "008bbe948ae14357baa799b8b4b7a262"
	){

	each(
	  "$.data",
	  upsert("Training_Session__c", "CommCare_Case_Id__c",
	    fields(
	      field("CommCare_Case_Id__c", dataValue("form.selected_training_module")),
	      field("Updated_from_CommCare__c", true),
	      field("Trainer__c", dataValue("form.trainer")),
	      field("Male_Attendance__c", dataValue("form.Current_session_participants.male_attendance")),
	      field("Female_Attendance__c", dataValue("form.Current_session_participants.female_attendance")),
	      field("Number_in_Attendance__c", dataValue("form.Current_session_participants.total_attendance")),

	      field("Date__c", dataValue("form.Current_session_participants.date")),
	      field("Location_GPS__Latitude__s", function(state) {
	          if(dataValue("form.meta.location.#text")(state) !== undefined) {
	            var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
	            return coordinates[0]; 
	          }
	      }),
	      field("Location_GPS__Longitude__s", function(state) {
	          if(dataValue("form.meta.location.#text")(state) !== undefined) {
	            var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
	            return coordinates[1]; 
	          }
	      }),
	      field("Altitude__c", function(state) {
	          if(dataValue("form.meta.location.#text")(state) !== undefined) {
	            var coordinates = dataValue("form.meta.location.#text")(state).split(' ');
	            return coordinates[2]; 
	          }
	      })
	      
	    )
	  )
	);

}