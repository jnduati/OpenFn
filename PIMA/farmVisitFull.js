//FARM VISIT JOB FOR ALL PROJECT USING FARM VISIT FULL SURVEY
//UG C1 || UG C2
if (state.data.app_id == "bca69b9caad5441bb9c782e91d829e4b" || 
    state.data.app_id == "03a969f33e9648cb88c36114896f3cbe" ||
    state.data.app_id == "008bbe948ae14357baa799b8b4b7a262") {

    //loop through participants and insert in database
    beta.each(

        function(state) {
            if (state.data.form.present_participants) {
                return state.data.form.present_participants.split(" ").map(
                    function(pId) {
                        return {
                            participant: pId,
                            session: dataValue("form.training_session")(state),
                            att_submission: dataValue("form.training_session")(state) + pId,
                            fv_submission: "FV-" + dataValue("id")(state),
                            sessionPhoto: dataValue("form.photo")(state)
                        };
                    }
                );
            }
        },
        upsert("FV_Attendance__c", "Submission_ID__c",
            fields(
                field("Submission_ID__c", dataValue("att_submission")), //attendance submission_id
                field("FV_Submission_ID__c", dataValue("fv_submission")), //farm visit submission_id
                field("Status__c", "Present"),
                relationship("Training_Session__r", "CommCare_Case_Id__c", dataValue("session")),
                relationship("Participant__r", "CommCare_Case_Id__c", dataValue("participant"))
            )
        )

    );
    
    
    //loop through erosion control and insert into database
    beta.each(

        function(state) {

            //incoming erosion data
            var best_practice_results_data = dataValue("form.best_practice_questions.erosion_control.methods_of_erosion_control")(state);

            if (best_practice_results_data !== undefined) {

                return best_practice_results_data.split(" ").map(
                  
                    function(resultId) {
                        return {
                            result_data: resultId,
                            best_result_submission:  "FVBPN-" + dataValue("id")(state) + "_erosion_" + resultId,
                            farm_visit_submission: "FV-" + dataValue("id")(state)
                        };
                    }
                    
                );

            }
        },
        upsert("FV_Best_Practice_Results__c", "Best_Practice_Result_Submission_ID__c",
            fields(
                field("Best_Practice_Result_Submission_ID__c", dataValue("best_result_submission")), //best result submission ID
                field("FV_Submission_ID__c", dataValue("farm_visit_submission")), //farm visit submission_id
                field("Best_Practice_Result_Type__c", "Erosion Control"),//this is the actual result type
                field("Best_Practice_Result_Description__c", function(state){
                  
                    var returnResults = "";
                  
                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "1"){

                        returnResults = "Stabilizing grasses";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "2"){

                        returnResults = "Mulch";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "3"){

                        returnResults = "Water traps or trenches";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "4"){

                        returnResults = "Physical barriers. (e.g. rocks)";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "5"){

                        returnResults = "Terraces";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "0"){

                        returnResults = "No erosion control method seen";

                    }

                    return returnResults;
                  
                })
            )
        )

    );
    
    //loop through prunning data control and insert into database
    beta.each(

        function(state) {

            //incoming prunning data
            var best_practice_results_data = dataValue("form.best_practice_questions.prunning.pruning_methods_used_on_majority_of_trees")(state);

            if (best_practice_results_data !== undefined) {

                return best_practice_results_data.split(" ").map(
                  
                    function(resultId) {
                        return {
                            result_data: resultId,
                            best_result_submission:  "FVBPN-" + dataValue("id")(state) + "_prunning_" + resultId,
                            farm_visit_submission: "FV-" + dataValue("id")(state)
                        };
                    }
                    
                );

            }
        },
        upsert("FV_Best_Practice_Results__c", "Best_Practice_Result_Submission_ID__c",
            fields(
                field("Best_Practice_Result_Submission_ID__c", dataValue("best_result_submission")), //best result submission ID
                field("FV_Submission_ID__c", dataValue("farm_visit_submission")), //farm visit submission_id
                field("Best_Practice_Result_Type__c", "Prunning Methods"), //this is the actual result type
                field("Best_Practice_Result_Description__c", function(state){
                  
                    var returnResults = "";
                  
                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "1"){

                        returnResults = "Centres opened";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "2"){

                        returnResults = "Unwanted suckers removed";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "3"){

                        returnResults = "Dead branches removed";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "4"){

                        returnResults = "Branches touching the ground removed";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "5"){

                        returnResults = "Broken / unproductive stems and/or branches removed";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "0"){

                        returnResults = "No pruning methods used";

                    }

                    return returnResults;
                  
                })
            )
        )

    );


    //loop through chemical/fertlizier data control and insert into database
    beta.each(

        function(state) {

            //incoming nutrition data
            var best_practice_results_data = dataValue("form.best_practice_questions.nutrition.type_chemical_applied_on_coffee_last_12_months")(state);

            if (best_practice_results_data !== undefined) {

                return best_practice_results_data.split(" ").map(
                  
                    function(resultId) {
                        return {
                            result_data: resultId,
                            best_result_submission:  "FVBPN-" + dataValue("id")(state) + "_fertilizer_" + resultId,
                            farm_visit_submission: "FV-" + dataValue("id")(state)
                        };
                    }
                    
                );

            }
        },
        upsert("FV_Best_Practice_Results__c", "Best_Practice_Result_Submission_ID__c",
            fields(
                field("Best_Practice_Result_Submission_ID__c", dataValue("best_result_submission")), //best result submission ID
                field("FV_Submission_ID__c", dataValue("farm_visit_submission")), //farm visit submission_id
                field("Best_Practice_Result_Type__c", "Chemicals and Ferilizers Applied"), //this is the actual result type
                field("Best_Practice_Result_Description__c", function(state){
                  
                    var returnResults = "";
                  
                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "1"){

                        returnResults = "Compost or manure";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "2"){

                        returnResults = "Zinc or Boron Foliar Feed";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "3"){

                        returnResults = "Lime";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "4"){

                        returnResults = "DAP";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "5"){

                        returnResults = "NPK 22:6:12";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "6"){

                        returnResults = "NPK 25.05.05";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "7"){

                        returnResults = "Other NPK";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "0"){

                        returnResults = "Did NOT apply any fertilizer in past 12 months";

                    }

                    return returnResults;
                  
                })
            )
        )

    );


    //loop through pest and disease management :: Coffee Wilt Disease (CWD) and insert into database
    beta.each(

        function(state) {

            //incoming coffee wilt disease data
            var best_practice_results_data = dataValue("form.best_practice_questions.pest_disease_management.methods_of_controlling_coffee_wilt_disease")(state);

            if (best_practice_results_data !== undefined) {

                return best_practice_results_data.split(" ").map(
                  
                    function(resultId) {
                        return {
                            result_data: resultId,
                            best_result_submission:  "FVBPN-" + dataValue("id")(state) + "_cwd_" + resultId,
                            farm_visit_submission: "FV-" + dataValue("id")(state)
                        };
                    }
                    
                );

            }
        },
        upsert("FV_Best_Practice_Results__c", "Best_Practice_Result_Submission_ID__c",
            fields(
                field("Best_Practice_Result_Submission_ID__c", dataValue("best_result_submission")), //best result submission ID
                field("FV_Submission_ID__c", dataValue("farm_visit_submission")), //farm visit submission_id
                field("Best_Practice_Result_Type__c", "Management of Coffee Wilt Disease (CWD)"), //this is the actual result type
                field("Best_Practice_Result_Description__c", function(state){
                  
                    var returnResults = "";
                  
                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "1"){

                        returnResults = "Farmer mentions only incorrect methods";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "2"){

                        returnResults = "Use varieties resistant to coffee wilt disease (e.g. CWDR)";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "3"){

                        returnResults = "Uproot and burn infested trees";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "4"){

                        returnResults = "Do not replant at site of tree for 2 years";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "5"){

                        returnResults = "Disinfect tools used to remove infested trees";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "0"){

                        returnResults = "Does not know any methods";

                    }

                    return returnResults;
                  
                })
            )
        )

    );


    //loop through pest and disease management :: Coffee Twig Borer (CTB) and insert into database
    beta.each(

        function(state) {

            //incoming coffee twig borer disease data
            var best_practice_results_data = dataValue("form.best_practice_questions.pest_disease_management.methods_of_controlling_coffee_twig_bore")(state);

            if (best_practice_results_data !== undefined) {

                return best_practice_results_data.split(" ").map(
                  
                    function(resultId) {
                        return {
                            result_data: resultId,
                            best_result_submission:  "FVBPN-" + dataValue("id")(state) + "_ctb_" + resultId,
                            farm_visit_submission: "FV-" + dataValue("id")(state)
                        };
                    }
                    
                );

            }
        },
        upsert("FV_Best_Practice_Results__c", "Best_Practice_Result_Submission_ID__c",
            fields(
                field("Best_Practice_Result_Submission_ID__c", dataValue("best_result_submission")), //best result submission ID
                field("FV_Submission_ID__c", dataValue("farm_visit_submission")), //farm visit submission_id
                field("Best_Practice_Result_Type__c", "Management of Coffee Twig Borer (CTB)"), //this is the actual result type
                field("Best_Practice_Result_Description__c", function(state){
                  
                    var returnResults = "";
                  
                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "1"){

                        returnResults = "Farmer mentions only incorrect methods";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "2"){

                        returnResults = "Remove and burn infested twigs";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "3"){

                        returnResults = "Remove of unwanted suckers";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "4"){

                        returnResults = "Spray pesticides containing imidachloprid as an active ingredient (e.g. using bravo, imax, confidol)";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "5"){

                        returnResults = "Spray other pesticides";

                    }

                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "6"){

                        returnResults = "Reduce shade";

                    }
                    if(dataValue("result_data")(state) !== undefined && dataValue("result_data")(state) == "0"){

                        returnResults = "Does not know any methods";

                    }

                    return returnResults;
                  
                })
            )
        )

    );
    
    
    //Best Practices :: Main Stem Section && Weeding &&  Shade Control && Record Keeping && Compost
    each(
        "$.data",
        upsert("FV_Best_Practices__c", "FV_Submission_ID__c",
            fields(
                field("Name__c", "FV-" + dataValue("id")(state)),
                field("FV_Submission_ID__c", "FV-" + dataValue("id")(state)),
                field("main_stems_in_majority_coffee_trees__c", function(state){
                  
                  var mainStemTrees = dataValue("form.best_practice_questions.main_stems.main_stems_in_majority_coffee_trees")(state);
                  var returnMainStemTrees = "";
                  
                  if(mainStemTrees == 1){
                    
                    returnMainStemTrees = "Most trees have 1 or 2 main stems";
                    
                  }
                  
                  if(mainStemTrees == 2){
                    
                    returnMainStemTrees = "Most trees have 3 main stems";
                    
                  }
                  
                  if(mainStemTrees == 3){
                    
                    returnMainStemTrees = "Most trees have 4 main stems";
                    
                  }
                  
                  if(mainStemTrees == 4){
                    
                    returnMainStemTrees = "Most trees have 5 or more main stems";
                    
                  }
                  
                  return returnMainStemTrees;
                  
                }),
                field("photo_of_trees_and_average_main_stems__c", function(state){
                  
                  var mainStemPhotoUrl = dataValue("form.best_practice_questions.main_stems.photo_of_trees_and_average_main_stems")(state);
                  var returnStemPhotoUrl = "";
                  
                  if (mainStemPhotoUrl !== undefined && mainStemPhotoUrl !== '') {
                      returnStemPhotoUrl = "https://www.commcarehq.org/a/" + dataValue("domain")(state) + "/api/form/attachment/" + dataValue("form.meta.instanceID")(state) + "/" + mainStemPhotoUrl;
                  }
                  
                  return returnStemPhotoUrl;
                  
                }),
                field("how_many_weeds_under_canopy_and_how_big__c", function(state){
                  
                  var weedsUnderCanopy = dataValue("form.best_practice_questions.weeding.how_many_weeds_under_canopy_and_how_big_are_they")(state);
                  var returnWeedsUnderCanopy = "";
                  
                  if(weedsUnderCanopy == 1){
                    
                    returnWeedsUnderCanopy = "Few small weeds (less than 30cm) under the tree canopy";
                    
                  }

                  if(weedsUnderCanopy == 2){
                    
                    returnWeedsUnderCanopy = "Many small weeds under the tree canopy (ground is covered with weeds)";
                    
                  }

                  if(weedsUnderCanopy == 3){
                    
                    returnWeedsUnderCanopy = "Many large weeds under the tree canopy (ground is covered with weeds)";
                    
                  }

                  return returnWeedsUnderCanopy;

                }),
                field("photo_of_weeds_under_the_canopy__c", function(state){
                  
                  var weedsPhotoUrl = dataValue("form.best_practice_questions.weeding.photo_of_weeds_under_the_canopy")(state);
                  var returnWeedsPhotoUrl = "";
                  
                  if (weedsPhotoUrl !== undefined && weedsPhotoUrl !== '') {
                      returnWeedsPhotoUrl = "https://www.commcarehq.org/a/" + dataValue("domain")(state) + "/api/form/attachment/" + dataValue("form.meta.instanceID")(state) + "/" + weedsPhotoUrl;
                  }
                  
                  return returnWeedsPhotoUrl;
                  
                }),
                field("level_of_shade_present_on_the_farm__c", function(state){
                  
                  var levelOfShadeOnPlot = dataValue("form.best_practice_questions.shade_control.level_of_shade_present_on_the_farm")(state);
                  var returnLevelOfShadeOnPlot = "";
                  
                  if(levelOfShadeOnPlot == 0){
                    
                    returnLevelOfShadeOnPlot = "NO shade, less than 5%";
                    
                  }

                  if(levelOfShadeOnPlot == 1){
                    
                    returnLevelOfShadeOnPlot = "Light shade, 5 to 20%";
                    
                  }

                  if(levelOfShadeOnPlot == 2){
                    
                    returnLevelOfShadeOnPlot = "Medium shade, 20 to 40%";
                    
                  }

                  if(levelOfShadeOnPlot == 3){
                    
                    returnLevelOfShadeOnPlot = "Heavy shade, over 40%";
                    
                  }

                  return returnLevelOfShadeOnPlot;

                }),
                field("have_new_shade_been_planted_last_3_years__c", function(state){
                  
                  var newShadePlanted = dataValue("form.best_practice_questions.shade_control.have_new_shade_been_planted_last_3_years")(state);
                  var returnNewShadePlanted = "";
                  
                  if(newShadePlanted == 0){
                    
                    returnNewShadePlanted = "No";
                    
                  }

                  if(newShadePlanted == 1){
                    
                    returnNewShadePlanted = "Yes";
                    
                  }

                  return returnNewShadePlanted;

                }),
                field("photo_of_level_of_shade_on_the_plot__c", function(state){
                  
                  var shadePhotoUrl = dataValue("form.best_practice_questions.shade_control.photo_of_level_of_shade_on_the_plot")(state);
                  var returnShadePhotoUrl = "";
                  
                  if (shadePhotoUrl !== undefined && shadePhotoUrl !== '') {
                      returnShadePhotoUrl = "https://www.commcarehq.org/a/" + dataValue("domain")(state) + "/api/form/attachment/" + dataValue("form.meta.instanceID")(state) + "/" + shadePhotoUrl;
                  }
                  
                  return returnShadePhotoUrl;
                  
                }),
                field("do_you_have_a_record_book__c", function(state){
                  
                  var haveRecordBook = dataValue("form.best_practice_questions.record_keeping.do_you_have_a_record_book")(state);
                  var returnHaveRecordBook = "";
                  
                  if(haveRecordBook == 0){
                    
                    returnHaveRecordBook = "No";
                    
                  }

                  if(haveRecordBook == 1){
                    
                    returnHaveRecordBook = "Yes";
                    
                  }

                  return returnHaveRecordBook;

                }),
                field("are_there_records_on_the_record_book__c", function(state){
                  
                  var recordsOnRecordBook = dataValue("form.best_practice_questions.record_keeping.are_there_records_on_the_record_book")(state);
                  var returnRecordsOnRecordBook = "";
                  
                  if(recordsOnRecordBook !== undefined && recordsOnRecordBook !== '' && recordsOnRecordBook == 0){
                    
                    returnRecordsOnRecordBook = "No";
                    
                  }

                  if(recordsOnRecordBook !== undefined && recordsOnRecordBook !== '' && recordsOnRecordBook == 1){
                    
                    returnRecordsOnRecordBook = "Yes";
                    
                  }

                  return returnRecordsOnRecordBook;

                }),
                field("take_a_photo_of_the_record_book__c", function(state){
                  
                  var recordBookPhotoUrl = dataValue("form.best_practice_questions.record_keeping.take_a_photo_of_the_record_book")(state);
                  var returnRecordBookPhotoUrl = "";
                  
                  if (recordBookPhotoUrl !== undefined && recordBookPhotoUrl !== '') {
                      returnRecordBookPhotoUrl = "https://www.commcarehq.org/a/" + dataValue("domain")(state) + "/api/form/attachment/" + dataValue("form.meta.instanceID")(state) + "/" + recordBookPhotoUrl;
                  }
                  
                  return returnRecordBookPhotoUrl;
                  
                }),
                field("do_you_have_compost_manure__c", function(state){
                  
                  var haveCompostManure = dataValue("form.best_practice_questions.compost.do_you_have_compost_manure")(state);
                  var returnHaveCompostManure = "";
                  
                  if(haveCompostManure !== undefined && haveCompostManure !== '' && haveCompostManure == 0){
                    
                    returnHaveCompostManure = "No";
                    
                  }

                  if(haveCompostManure !== undefined && haveCompostManure !== '' && haveCompostManure == 1){
                    
                    returnHaveCompostManure = "Yes";
                    
                  }

                  return returnHaveCompostManure;

                }),
                field("photo_of_the_compost_manure__c", function(state){
                  
                  var compostManurePhotoUrl = dataValue("form.best_practice_questions.compost.photo_of_the_compost_manure")(state);
                  var returnCompostManurePhotoUrl = "";
                  
                  if (compostManurePhotoUrl !== undefined && compostManurePhotoUrl !== '') {
                      returnCompostManurePhotoUrl = "https://www.commcarehq.org/a/" + dataValue("domain")(state) + "/api/form/attachment/" + dataValue("form.meta.instanceID")(state) + "/" + compostManurePhotoUrl;
                  }
                  
                  return returnCompostManurePhotoUrl;
                  
                }),
                field("Color_of_coffee_tree_leaves__c", function(state){
                  
                  var colorOfCoffeeLeaves = dataValue("form.best_practice_questions.nutrition.are_the_leave_green_or_yellow_pale_green")(state);
                  var returnColorOfCoffeeLeaves = "";
                  
                  if(colorOfCoffeeLeaves !== undefined && colorOfCoffeeLeaves !== '' && colorOfCoffeeLeaves == 0){
                    
                    returnColorOfCoffeeLeaves = "5% or more (5 or more in 100) of the leaves are yellow, pale green or brown.";
                    
                  }

                  if(colorOfCoffeeLeaves !== undefined && colorOfCoffeeLeaves !== '' && colorOfCoffeeLeaves == 1){
                    
                    returnColorOfCoffeeLeaves = "Nearly all leaves are dark green and less than 5% (less than 5 in 100) are yellow, pale green, or brown.";
                    
                  }

                  return returnColorOfCoffeeLeaves;

                })
            )
        )
    );


    //insert the farm visit record
    each(
        "$.data",
        upsert("Farm_Visit__c", "FV_Submission_ID__c",
            fields(
                field("Name__c", "FV-" + dataValue("id")(state)),
                field("FV_Submission_ID__c", "FV-" + dataValue("id")(state)),
                field("Farm_Visit_Type__c", dataValue("form.survey_type")),
                field("Training_Group__c", dataValue("form.case.@case_id")),
                field("Farm_Visited__c", dataValue("form.farm_being_visted")),
                field("Visit_Has_Training__c", dataValue("form.is_this_a_farm_training_visit")),
                field("Training_Session__c", dataValue("form.training_session")),
                field("Other_Participants_Present__c", dataValue("form.any_other_participants_present")),
                field("Total_Farmers_Visited__c", dataValue("form.attendance_count")),
                field("Date_Visited__c", dataValue("form.date_of_visit")),
                field("visit_comments__c", dataValue("form.farm_visit_comments")),
                field("Farmer_Trainer__c", dataValue("form.trainer")),
                field("Farm_Visit_Photo_Url__c", function(state) {
                    var farmVisitPhotoUrl = '';
                    if (dataValue("form.farm_visit_photo")(state) !== undefined && dataValue("form.farm_visit_photo")(state) !== '') {
                        farmVisitPhotoUrl = "https://www.commcarehq.org/a/" + dataValue("domain")(state) + "/api/form/attachment/" + dataValue("form.meta.instanceID")(state) + "/" + dataValue("form.farm_visit_photo")(state);
                    }
                    return farmVisitPhotoUrl;
                }),
                field("Signature__c", function(state) {
                    var recorderSignatureUrl = '';
                    if (dataValue("form.signature_of_farmer_trainer")(state) !== undefined && dataValue("form.signature_of_farmer_trainer")(state) !== '') {
                        recorderSignatureUrl = "https://www.commcarehq.org/a/" + dataValue("domain")(state) + "/api/form/attachment/" + dataValue("form.meta.instanceID")(state) + "/" + dataValue("form.signature_of_farmer_trainer")(state);
                    }
                    return recorderSignatureUrl;
                })
            )
        )
    );


    //upsert training session
    each(
        "$.data",
        upsert("Training_Session__c", "CommCare_Case_Id__c",
            fields(
                field("CommCare_Case_Id__c", dataValue("form.training_session")),
                field("Updated_from_CommCare__c", true)
            )
        )
    );


}