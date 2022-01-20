//FARM VISIT JOB FOR ALL PROJECT USING FARM VISIT SURVEY

//JDE || Herz1 || Herz2 || Unido || DRC1 || DRC2 || UG1 || UG2
if (state.data.app_id == "30714a65ecab4d2da5aa78ca91cefcf5" || 
    state.data.app_id == "7f47bffde10d46598276b14748298190" || 
    state.data.app_id == "22d766b8c673413eab2d9042dfc904e0" || 
    state.data.app_id == "4fd02c3be0104da29cba1844053b9301" || 
    state.data.app_id == "bca69b9caad5441bb9c782e91d829e4b" || 
    state.data.app_id == "03a969f33e9648cb88c36114896f3cbe" || 
    state.data.app_id == "eeddc901b4aa4652b7252240152b20d5" || 
    state.data.app_id == "5372957f094346659170e319aa0ed456" ||
    state.data.app_id == "9859b71da086417284ced5c7be0670a8" ||
    state.data.app_id == "008bbe948ae14357baa799b8b4b7a262"
) {

    beta.each(
		"$.data",
	  	upsert("Farm_Visit__c", "Farm_Visit_Group_Date__c", 
	  		fields(
		     	field("Name__c", dataValue("id")),
		     	field("Farm_Visit_Group_Date__c", function(state){

		     		var farm_visit_group_date = "";

		     		if(dataValue("form.case.@case_id")(state) !== undefined && dataValue("form.farm_visit_details.date_of_visit")(state) !== undefined){

		     			farm_visit_group_date = dataValue("form.case.@case_id")(state)+dataValue("form.farm_visit_details.date_of_visit")(state)+dataValue("form.trainer")(state);

		     		}
		     		
		     		return farm_visit_group_date;

		     	}),
			    field("FV_Submission_ID__c", "FV-"+dataValue("id")(state)),
			    field("Farm_Visit_Type__c", dataValue("form.survey_type")),
			    field("Training_Group__c", dataValue("form.case.@case_id")),
			    field("Farmer_Trainer__c", dataValue("form.trainer")),
			    field("Total_Farmers_Visited__c", dataValue("form.farm_visit_details.total_farms_visited")),
			    field("Date_Visited__c", dataValue("form.farm_visit_details.date_of_visit")),
			    field("visit_comments__c", dataValue("form.farm_visit_details.farm_visit_comments")),
			    field("Signature__c", function(state) {
			        var recorderSignatureUrl = '';
			        if (dataValue("form.farm_visit_details.signature_of_business_advisor")(state) !== undefined && dataValue("form.farm_visit_details.signature_of_business_advisor")(state) !== '') {
			            recorderSignatureUrl = "https://www.commcarehq.org/a/" + dataValue("domain")(state) + "/api/form/attachment/" + dataValue("form.meta.instanceID")(state) + "/" + dataValue("form.farm_visit_details.signature_of_business_advisor")(state);
			        }
			        return recorderSignatureUrl;
			    })
	  		)
		)
	)

}


//OLD Farm Visit Light JOB
/*

if (state.data.app_id == "30714a65ecab4d2da5aa78ca91cefcf5" || state.data.app_id == "7f47bffde10d46598276b14748298190" || state.data.app_id == "22d766b8c673413eab2d9042dfc904e0" || state.data.app_id == "4fd02c3be0104da29cba1844053b9301" || state.data.app_id == "bca69b9caad5441bb9c782e91d829e4b" || state.data.app_id == "03a969f33e9648cb88c36114896f3cbe" || state.data.app_id == "eeddc901b4aa4652b7252240152b20d5" || state.data.app_id == "5372957f094346659170e319aa0ed456") {

    each(
        "$.data",
        create("Farm_Visit__c",
            fields(
                field("Name__c", dataValue("id")),
                field("FV_Submission_ID__c", "FV-"+dataValue("id")(state)),
                field("Farm_Visit_Type__c", dataValue("form.survey_type")),
                field("Training_Group__c", dataValue("form.case.@case_id")),
                field("Farmer_Trainer__c", dataValue("form.trainer")),
                field("Total_Farmers_Visited__c", dataValue("form.farm_visit_details.total_farms_visited")),
                field("Date_Visited__c", dataValue("form.farm_visit_details.date_of_visit")),
                field("visit_comments__c", dataValue("form.farm_visit_details.farm_visit_comments")),
                field("Signature__c", function(state) {
                    var recorderSignatureUrl = '';
                    if (dataValue("form.farm_visit_details.signature_of_business_advisor")(state) !== undefined && dataValue("form.farm_visit_details.signature_of_business_advisor")(state) !== '') {
                        recorderSignatureUrl = "https://www.commcarehq.org/a/" + dataValue("domain")(state) + "/api/form/attachment/" + dataValue("form.meta.instanceID")(state) + "/" + dataValue("form.farm_visit_details.signature_of_business_advisor")(state);
                    }
                    return recorderSignatureUrl;
                })
            )
        )
    );

}

*/