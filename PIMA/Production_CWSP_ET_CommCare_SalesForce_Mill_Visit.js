//JOB: Mill Visit - ET2 (Updated)

each(
"$.data",
  upsert("Observation__c", "Submission_ID__c",
    fields(
      field("Submission_ID__c", dataValue("id")),
      field("Observer__c", dataValue("form.observer")),
      field("Training_Group__c", dataValue("form.wet_mill")),
      field("RecordTypeId", "01224000000oSGCAA2"),
      field("Date__c", dataValue("form.date")),
      field("Shared_Action_Plan_Comments__c", function(state){
        if(dataValue("form.wet_mill_action_plan")(state) !== undefined) {
          return dataValue("form.wet_mill_action_plan")(state);
        } else {
          return '';
        }
      }),
      field("Observer_Signature__c", function(state) {
        var observerSignatureUrl = '';
        if(dataValue("form.Observer_Signature_Section.Observer_Signature")(state) !== undefined && dataValue("form.Observer_Signature_Section.Observer_Signature")(state) !== '') {
          observerSignatureUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.Observer_Signature_Section.Observer_Signature")(state);
        }
        return observerSignatureUrl;
      }),
      field("Observation_Location__Latitude__s", function(state) {
	        if(dataValue("form.gps_information.gps_coordinates")(state) !== undefined && dataValue("form.gps_information.gps_coordinates")(state) !== '' && dataValue("form.gps_information.gps_coordinates")(state) !== null) {
	            var coordinates = dataValue("form.gps_information.gps_coordinates")(state).split(' ');
	            return coordinates[0];

          	} if(dataValue("form.gps_information_retry.gps_coordinates")(state) !== undefined && dataValue("form.gps_information_retry.gps_coordinates")(state) !== '' && dataValue("form.gps_information_retry.gps_coordinates")(state) !== null){
	            var coordinates = dataValue("form.gps_information_retry.gps_coordinates")(state).split(' ');
	            return coordinates[0];
	        }
      }),
      field("Observation_Location__Longitude__s", function(state) {
	        if(dataValue("form.gps_information.gps_coordinates")(state) !== undefined && dataValue("form.gps_information.gps_coordinates")(state) !== '' && dataValue("form.gps_information.gps_coordinates")(state) !== null) {
	            var coordinates = dataValue("form.gps_information.gps_coordinates")(state).split(' ');
	            return coordinates[1];

          	} if(dataValue("form.gps_information_retry.gps_coordinates")(state) !== undefined && dataValue("form.gps_information_retry.gps_coordinates")(state) !== '' && dataValue("form.gps_information_retry.gps_coordinates")(state) !== null){
	            var coordinates = dataValue("form.gps_information_retry.gps_coordinates")(state).split(' ');
	            return coordinates[1];
	        }
      }),
      field("Altitude__c", function(state) {
	        if(dataValue("form.gps_information.gps_coordinates")(state) !== undefined && dataValue("form.gps_information.gps_coordinates")(state) !== '' && dataValue("form.gps_information.gps_coordinates")(state) !== null) {
	            var coordinates = dataValue("form.gps_information.gps_coordinates")(state).split(' ');
	            return coordinates[2];

          	} if(dataValue("form.gps_information_retry.gps_coordinates")(state) !== undefined && dataValue("form.gps_information_retry.gps_coordinates")(state) !== '' && dataValue("form.gps_information_retry.gps_coordinates")(state) !== null){
	            var coordinates = dataValue("form.gps_information_retry.gps_coordinates")(state).split(' ');
	            return coordinates[2];
	        }
      })

    )
  )
),


//HERE WE CAPTURE ALL THE MANDATORY CHECKS RESPONSES

// Create results for Child Labour {Pass || Fail}
each(
  "$.data",
  upsertIf(
    state.data.form.mandatory_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_child_labour";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG9AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_child_labour"),
      field("Result__c", dataValue("form.mandatory_checks.child_labour_screen.child_labour")),
      field("Comments__c", function(state){
        if(dataValue("form.mandatory_checks.child_labour_screen.child_labour_comments")(state) !== undefined) {
          	return dataValue("form.mandatory_checks.child_labour_screen.child_labour_comments")(state);
        } else {
          return '';
        }
      })
    )
  )
),

// Create results for Forced Labour {Pass || Fail}
each(
  "$.data",
  upsertIf(
    state.data.form.mandatory_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_forced_labour";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG9AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_forced_labour"),
      field("Result__c", dataValue("form.mandatory_checks.forced_labour_screen.forced_labour")),
      field("Comments__c", function(state){
        if(dataValue("form.mandatory_checks.forced_labour_screen.forced_labour_comments")(state) !== undefined) {
          	return dataValue("form.mandatory_checks.forced_labour_screen.forced_labour_comments")(state);
        } else {
          return '';
        }
      })
    )
  )
),


// Create results for Minimum Wage {Pass || Fail}
each(
  "$.data",
  upsertIf(
    //state.data.form.mandatory_checks != undefined,
    state.data.form.mandatory_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_minimum_wage";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG9AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_minimum_wage"),
      field("Result__c", dataValue("form.mandatory_checks.minimum_wage_screen.minimum_wage")),
      field("Comments__c", function(state){
        if(dataValue("form.mandatory_checks.minimum_wage_screen.minimum_wage_comments")(state) !== undefined) {
            return dataValue("form.mandatory_checks.minimum_wage_screen.minimum_wage_comments")(state);
        } else {
          return '';
        }
      })
    )
  )
),


// Create results for Restricted Pesticides {Pass || Fail}
each(
  "$.data",
  upsertIf(
    //state.data.form.mandatory_checks != undefined,
    state.data.form.mandatory_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_restricted_pesticides";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG9AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_restricted_pesticides"),
      field("Result__c", dataValue("form.mandatory_checks.restricted_pesticides_screen.restricted_pesticides")),
      field("Comments__c", function(state){
        if(dataValue("form.mandatory_checks.restricted_pesticides_screen.restricted_pesticides_comments")(state) !== undefined) {
            return dataValue("form.mandatory_checks.restricted_pesticides_screen.restricted_pesticides_comments")(state);
        } else {
          return '';
        }
      }),
      field("Photo_URL__c", function(state) {
        var photoUrl = '';
        if(dataValue("form.mandatory_checks.restricted_pesticides_screen.restricted_pesticides_photo")(state) !== undefined && dataValue("form.mandatory_checks.restricted_pesticides_screen.restricted_pesticides_photo")(state) !== '') {
          photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.mandatory_checks.restricted_pesticides_screen.restricted_pesticides_photo")(state);
        }
        return photoUrl;
      })
    )
  )
),


// Create results for Accident Prevention {Pass || Fail}
each(
  "$.data",
  upsertIf(
    //state.data.form.mandatory_checks != undefined,
    state.data.form.mandatory_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_accident_prevention";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG9AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_accident_prevention"),
      field("Result__c", dataValue("form.mandatory_checks.accident_prevention_screen.accident_prevention")),
      field("Comments__c", function(state){
        if(dataValue("form.mandatory_checks.accident_prevention_screen.accident_prevention_comments")(state) !== undefined) {
            return dataValue("form.mandatory_checks.accident_prevention_screen.accident_prevention_comments")(state);
        } else {
          return '';
        }
      }),
      field("Photo_URL__c", function(state) {
        var photoUrl = '';
        if(dataValue("form.mandatory_checks.accident_prevention_screen.accident_prevention_photo")(state) !== undefined && dataValue("form.mandatory_checks.accident_prevention_screen.accident_prevention_photo")(state) !== '') {
          photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.mandatory_checks.accident_prevention_screen.accident_prevention_photo")(state);
        }
        return photoUrl;
      })
    )
  )
),


// Create results for Safe Storage {Pass || Fail}
each(
  "$.data",
  upsertIf(
    //state.data.form.mandatory_checks != undefined,
    state.data.form.mandatory_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_safe_storage";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG9AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_safe_storage"),
      field("Result__c", dataValue("form.mandatory_checks.safe_storage_screen.safe_storage")),
      field("Comments__c", function(state){
        if(dataValue("form.mandatory_checks.safe_storage_screen.safe_storage_comments")(state) !== undefined) {
            return dataValue("form.mandatory_checks.safe_storage_screen.safe_storage_comments")(state);
        } else {
          return '';
        }
      }),
      field("Photo_URL__c", function(state) {
        var photoUrl = '';
        if(dataValue("form.mandatory_checks.safe_storage_screen.safe_storage_photo")(state) !== undefined && dataValue("form.mandatory_checks.safe_storage_screen.safe_storage_photo")(state) !== '') {
          photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.mandatory_checks.safe_storage_screen.safe_storage_photo")(state);
        }
        return photoUrl;
      })
    )
  )
),


// Create results for Water Contamination {Pass || Fail}
each(
  "$.data",
  upsertIf(
    //state.data.form.mandatory_checks != undefined,
    state.data.form.mandatory_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_water_contamination";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG9AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_water_contamination"),
      field("Result__c", dataValue("form.mandatory_checks.water_contamination_screen.water_contamination")),
      field("Comments__c", function(state){
        if(dataValue("form.mandatory_checks.water_contamination_screen.water_contamination_comments")(state) !== undefined) {
            return dataValue("form.mandatory_checks.water_contamination_screen.water_contamination_comments")(state);
        } else {
          return '';
        }
      }),
      field("Photo_URL__c", function(state) {
        var photoUrl = '';
        if(dataValue("form.mandatory_checks.water_contamination_screen.water_contamination_photo")(state) !== undefined && dataValue("form.mandatory_checks.water_contamination_screen.water_contamination_photo")(state) !== '') {
          photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.mandatory_checks.water_contamination_screen.water_contamination_photo")(state);
        }
        return photoUrl;
      })
    )
  )
),


// Create results for Water Consumption {Pass || Fail}
each(
  "$.data",
  upsertIf(
    //state.data.form.mandatory_checks != undefined,
    state.data.form.mandatory_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_water_consumption";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG9AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_water_consumption"),
      field("Result__c", dataValue("form.mandatory_checks.water_consumption_screen.water_consumption")),
      field("Comments__c", function(state){
        if(dataValue("form.mandatory_checks.water_consumption_screen.water_consumption_comments")(state) !== undefined) {
            return dataValue("form.mandatory_checks.water_consumption_screen.water_consumption_comments")(state);
        } else {
          return '';
        }
      }),
      field("Photo_URL__c", function(state) {
        var photoUrl = '';
        if(dataValue("form.mandatory_checks.water_consumption_screen.water_consumption_photo")(state) !== undefined && dataValue("form.mandatory_checks.water_consumption_screen.water_consumption_photo")(state) !== '') {
          photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.mandatory_checks.water_consumption_screen.water_consumption_photo")(state);
        }
        return photoUrl;
      })
    )
  )
),


// Create results for Ecosystem Protection {Pass || Fail}
each(
  "$.data",
  upsertIf(
    //state.data.form.mandatory_checks != undefined,
    state.data.form.mandatory_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_ecosystem_protection";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG9AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_ecosystem_protection"),
      field("Result__c", dataValue("form.mandatory_checks.ecosystem_protection_screen.environmental_conservation")),
      field("Comments__c", function(state){
        if(dataValue("form.mandatory_checks.ecosystem_protection_screen.environmental_conservation_comments")(state) !== undefined) {
            return dataValue("form.mandatory_checks.ecosystem_protection_screen.environmental_conservation_comments")(state);
        } else {
          return '';
        }
      }),
      field("Photo_URL__c", function(state) {
        var photoUrl = '';
        if(dataValue("form.mandatory_checks.ecosystem_protection_screen.environmental_conservation_photo")(state) !== undefined && dataValue("form.mandatory_checks.ecosystem_protection_screen.environmental_conservation_photo")(state) !== '') {
          photoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.mandatory_checks.ecosystem_protection_screen.environmental_conservation_photo")(state);
        }
        return photoUrl;
      })
    )
  )
),


//HERE WE CAPTURE ALL PULP MANAGEMENT CHECK RESPONSES

// Create results for Pulp being separated from waste water {Yes || No}
each(
  "$.data",
  upsertIf(
    //state.data.form.pulp_husk_management_check.pulp_check != undefined,
    state.data.form.pulp_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_pulp_separated_from_waste_water";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG8AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_pulp_separated_from_waste_water"),
      field("Result__c", function(state){
        if(dataValue("form.pulp_husk_management_check.pulp_check.is_pulp_being_separated_from_the_waste_water")(state) !== undefined) {
            return dataValue("form.pulp_husk_management_check.pulp_check.is_pulp_being_separated_from_the_waste_water")(state);
        } else {
          return '';
        }
      })
    )
  )
),


// Create results for Pulp being properly managed {Yes || No}
each(
  "$.data",
  upsertIf(
    //state.data.form.pulp_husk_management_check.pulp_check != undefined,
    state.data.form.pulp_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_pulp_being_properly_managed";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG8AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_pulp_being_properly_managed"),
      field("Result__c", function(state){
        if(dataValue("form.pulp_husk_management_check.pulp_check.pulp_being_properly_managed_select")(state) !== undefined) {
            return dataValue("form.pulp_husk_management_check.pulp_check.pulp_being_properly_managed_select")(state);
        } else {
          return '';
        }
      })
    )
  )
),


// Create results for coffee pulp management
each(
  "$.data",
  upsertIf(
    //state.data.form.pulp_husk_management_check.pulp_check != undefined,
    state.data.form.pulp_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_pulp_being_properly_managed";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG8AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_pulp_being_properly_managed"),
      field("Comments__c", function(state) {
        var pulp_management = '';
        if(dataValue("form.pulp_husk_management_check.pulp_check.is_the_pulp_being_properly_managed")(state) !== undefined) {
          return dataValue("form.pulp_husk_management_check.pulp_check.is_the_pulp_being_properly_managed")(state).toString().replace(/_/g," ");
        } else {
          return pulp_management;
        }
      })
    )
  )
),


// Create results for Pulp is 30 meters from water source {Yes || No}
each(
  "$.data",
  upsertIf(
    //state.data.form.pulp_husk_management_check.pulp_check != undefined,
    state.data.form.pulp_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_pulp_30_meters_from_water";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG8AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_pulp_30_meters_from_water"),
      field("Result__c", function(state){
        if(dataValue("form.pulp_husk_management_check.pulp_check.is_the_pulp_30_meters_from_the_nearest_water_source")(state) !== undefined) {
            return dataValue("form.pulp_husk_management_check.pulp_check.is_the_pulp_30_meters_from_the_nearest_water_source")(state);
        } else {
          return '';
        }
      })
    )
  )
),


// Create results for Pulp is protected by grass {Yes || No}
each(
  "$.data",
  upsertIf(
    //state.data.form.pulp_husk_management_check.pulp_check != undefined,
    state.data.form.pulp_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_pulp_protected_by_grass";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG8AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_pulp_protected_by_grass"),
      field("Result__c", function(state){
        if(dataValue("form.pulp_husk_management_check.pulp_check.is_the_pulp_protected_by_runoff_by_grasses_or_a_low_bank")(state) !== undefined) {
            return dataValue("form.pulp_husk_management_check.pulp_check.is_the_pulp_protected_by_runoff_by_grasses_or_a_low_bank")(state);
        } else {
          return '';
        }
      })
    )
  )
),


//HERE WE CAPTURE ALL HUSK MANAGEMENT CHECK RESPONSES

// Create results for Has enterprise diposed husks from last season {Yes || No}
each(
  "$.data",
  upsertIf(
    //state.data.form.pulp_husk_management_check.husk_check != undefined,
    state.data.form.husk_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_disposed_last_season_husks";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG7AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_disposed_last_season_husks"),
      field("Result__c", function(state){
        if(dataValue("form.pulp_husk_management_check.husk_check.has_the_enterprise_disposed_of_the_coffee_husks_from_last_season")(state) !== undefined) {
            return dataValue("form.pulp_husk_management_check.husk_check.has_the_enterprise_disposed_of_the_coffee_husks_from_last_season")(state);
        } else {
          return '';
        }
      })
    )
  )
),


// Create results for Plans used to dispose coffee husks {Yes || No}
each(
  "$.data",
  upsertIf(
    //state.data.form.pulp_husk_management_check.husk_check != undefined,
    state.data.form.husk_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_plan_to_dispose_this_season_husks";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG7AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_plan_to_dispose_this_season_husks"),
      field("Result__c", function(state){
        if(dataValue("form.pulp_husk_management_check.husk_check.plans_to_dispose_coffee_husks")(state) !== undefined) {
            return dataValue("form.pulp_husk_management_check.husk_check.plans_to_dispose_coffee_husks")(state);
        } else {
          return '';
        }
      })
    )
  )
),


// Create results for Enterprise plans to dispose coffee husks
each(
  "$.data",
  upsertIf(
    //state.data.form.pulp_husk_management_check.husk_check != undefined,
    state.data.form.husk_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_plans_of_disposing_coffee_husks";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "01224000000oSG7AAM"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_plans_of_disposing_coffee_husks"),
      field("Comments__c", function(state) {
        var disposal = '';
        if(dataValue("form.pulp_husk_management_check.husk_check.disposal_plan")(state) !== undefined) {
          return dataValue("form.pulp_husk_management_check.husk_check.disposal_plan")(state).toString().replace(/_/g," ");
        } else {
          return disposal;
        }
      })
    )
  )
),


// PULP/HUSK MANAGEMENT PICTURE
each(
  "$.data",
  upsertIf(
    //state.data.form.pulp_husk_management_check != undefined,
    state.data.form.pulp_husk_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_pulp_and_husk_picture";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", function(state){
        if(state.data.form.husk_check_empty != 0){
          return "01224000000oSG7AAM"
        } else {
          return "01224000000oSG8AAM"
        }
      }),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_pulp_and_husk_picture"),
      field("Photo_URL__c", function(state) {
          var pulpHuskPhotoUrl = '';
          if(dataValue("form.pulp_husk_management_check.take_a_picture")(state) !== undefined && dataValue("form.pulp_husk_management_check.take_a_picture")(state) !== '') {
            pulpHuskPhotoUrl = "https://www.commcarehq.org/a/"+dataValue("domain")(state)+"/api/form/attachment/"+dataValue("form.meta.instanceID")(state)+"/"+dataValue("form.pulp_husk_management_check.take_a_picture")(state);
          }
          return pulpHuskPhotoUrl;
      })
    )
  )
),

//HERE WE CAPTURE ALL THE COMMENTS FROM OTHER VISIT TYPES

// Create results collecting samples check
each(
  "$.data",
  upsertIf(
    state.data.form.collecting_samples_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_collecting_samples_check";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o000001149CAAQ"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_collecting_samples_check"),
      field("Comments__c", function(state){
        if(dataValue("form.collecting_samples_comment")(state) !== undefined) {
            return dataValue("form.collecting_samples_comment")(state);
        } else {
          return '';
        }
      })
    )
    
  )
),

// Create results attend general meeting check
each(
  "$.data",
  upsertIf(
    state.data.form.attend_general_meeting_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_attend_general_meeting_check";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o000001149HAAQ"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_attend_general_meeting_check"),
      field("Comments__c", function(state){
        if(dataValue("form.attend_general_meetings_comment")(state) !== undefined) {
            return dataValue("form.attend_general_meetings_comment")(state);
        } else {
          return '';
        }
      })
    )
    
  )
),

// Create results attend mill review check
each(
  "$.data",
  upsertIf(
    state.data.form.attend_mill_review_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_attend_mill_review_check";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o000001149MAAQ"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_attend_mill_review_check"),
      field("Comments__c", function(state){
        if(dataValue("form.attend_mill_review_comment")(state) !== undefined) {
            return dataValue("form.attend_mill_review_comment")(state);
        } else {
          return '';
        }
      })
    )
    
  )
),

// Create results machine audit check
each(
  "$.data",
  upsertIf(
    state.data.form.machine_audit_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_machine_audit_check";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o000001149RAAQ"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_machine_audit_check"),
      field("Comments__c", function(state){
        if(dataValue("form.machine_audit_comment")(state) !== undefined) {
            return dataValue("form.machine_audit_comment")(state);
        } else {
          return '';
        }
      })
    )
  )
),

// Create results coffee quality check
each(
  "$.data",
  upsertIf(
    state.data.form.coffee_quality_check_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_coffee_quality_check";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o000001149WAAQ"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_coffee_quality_check"),
      field("Comments__c", function(state){
        if(dataValue("form.coffee_quality_check_comment")(state) !== undefined) {
            return dataValue("form.coffee_quality_check_comment")(state);
        } else {
          return '';
        }
      })
    )
  )
),

// Create results stakeholder meeting
each(
  "$.data",
  upsertIf(
    state.data.form.stakeholder_meeting_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_stakeholder_meeting_check";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o00000114HzAAI"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_stakeholder_meeting_check"),
      field("Comments__c", function(state){
        if(dataValue("form.stake_holder_meeting_comment")(state) !== undefined) {
            return dataValue("form.stake_holder_meeting_comment")(state);
        } else {
          return '';
        }
      })
    )
  )
),

// Create results water consumption (separate) check
each(
  "$.data",
  upsertIf(
    state.data.form.water_consumption_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_water_consumption_check";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o00000114HpAAI"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_water_consumption_check"),
      field("Comments__c", function(state){
        if(dataValue("form.water_consumption_check.water_consumption_comment")(state) !== undefined) {
            return dataValue("form.water_consumption_check.water_consumption_comment")(state);
        } else {
          return '';
        }
      })
    )
    
  )
),

// Create results water consumption -- recirc pump
each(
  "$.data",
  upsertIf(
    state.data.form.water_consumption_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_mill_have_a_recirculation_pump";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o00000114HpAAI"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_mill_have_a_recirculation_pump"),
      field("Result__c", function(state){
        if(dataValue("form.water_consumption_check.mill_have_a_recirculation_pump")(state) !== undefined) {
            return dataValue("form.water_consumption_check.mill_have_a_recirculation_pump")(state);
        } else {
          return '';
        }
      })
    )
    
  )
),

// Create results water consumption -- recirc pump works
/**
each(
  "$.data",
  upsertIf(
    state.data.form.water_consumption_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_recirculation_pump_working";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o00000114HpAAI"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_recirculation_pump_working"),
      field("Result__c", function(state){
        if(dataValue("form.water_consumption_check.is_the_recirculation_pump_working")(state) !== undefined) {
            return dataValue("form.water_consumption_check.is_the_recirculation_pump_working")(state);
        } else {
          return '';
        }
      })
    )
    
  )
),
*/

// Create results water consumption -- water meter
each(
  "$.data",
  upsertIf(
    state.data.form.water_consumption_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_mill_have_a_water_meter";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o00000114HpAAI"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_mill_have_a_water_meter"),
      field("Result__c", function(state){
        if(dataValue("form.water_consumption_check.does_the_mill_have_a_water_meter")(state) !== undefined) {
            return dataValue("form.water_consumption_check.does_the_mill_have_a_water_meter")(state);
        } else {
          return '';
        }
      })
    )
    
  )
),

// Create results water consumption -- water meter works
/**
each(
  "$.data",
  upsertIf(
    state.data.form.water_consumption_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_water_meter_working";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o00000114HpAAI"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_water_meter_working"),
      field("Result__c", function(state){
        if(dataValue("form.water_consumption_check.is_the_water_meter_working")(state) !== undefined) {
            return dataValue("form.water_consumption_check.is_the_water_meter_working")(state);
        } else {
          return '';
        }
      })
    )
  )
),
*/

// Create results risk assessment check
each(
  "$.data",
  upsertIf(
    state.data.form.risk_assessment_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_risk_assessment_check";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o00000114I4AAI"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_risk_assessment_check"),
      field("Comments__c", function(state){
        if(dataValue("form.risk_assessment_comment")(state) !== undefined) {
            return dataValue("form.risk_assessment_comment")(state);
        } else {
          return '';
        }
      })
    )
    
  )
),

// Create results environmental audit check
each(
  "$.data",
  upsertIf(
    state.data.form.enviromental_audit_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_environmental_audit_check";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o00000114I9AAI"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_environmental_audit_check"),
      field("Comments__c", function(state){
        if(dataValue("form.environmental_audit_and_management_plan_comment")(state) !== undefined) {
            return dataValue("form.environmental_audit_and_management_plan_comment")(state);
        } else {
          return '';
        }
      })
    )
    
  )
),

// Create results other activity check
each(
  "$.data",
  upsertIf(
    state.data.form.other_activity_empty != 0,
    "Observation_Result__c",
    "Submission_ID__c",
    fields(
      field("Submission_ID__c", function(state){
        return dataValue("id")(state) + "cwsp_other_activity_check";
      }),
      relationship("Observation__r", "Submission_ID__c", dataValue("id")),
      field("RecordTypeId", "0121o000001149bAAA"),
      relationship("Observation_Criterion__r", "Unique_Name__c", "cwsp_other_activity_check"),
      field("Comments__c", function(state){
        if(dataValue("form.other_activity_comment")(state) !== undefined) {
            return dataValue("form.other_activity_comment")(state);
        } else {
          return '';
        }
      })
    )
  )
);

// Version control