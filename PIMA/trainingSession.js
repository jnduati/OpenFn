//Coffee - DRC SVC Nespresso (Ag) - c2| SalesForce --> CommCare | Training Sessions
//coffee_drc_svc_c2_agronomy
//{"uniqueProjectKey":"coffee_drc_svc_c2_agronomy","source":"SF","jobType":"Training Session"}

each(
  "$.data.trainingSessions[*]",
  submit(
    fields(
      field("@", function(state) {
        return {
          "name": "New Training Session",
          "uiVersion": "1",
          "version": "148",
          "xmlns": "http://openrosa.org/formdesigner/1a91006be1e0b81d4cc2ceaf84188e3db80bd955",
          "xmlns:jrm": "http://dev.commcarehq.org/jr/xforms"
        };
      }),
      field("Module_Name", dataValue("trainingModuleName")),
      field("Module_Number", dataValue("trainingModuleNumber")),
      field("Current_Previous_Name", function(state){
        return '('+dataValue("currentPrevious")(state)+') '+dataValue("trainingModuleName")(state);
      }),
      field("Training_Session_Name", function(state) {
        return (
          dataValue("trainingModuleNumber")(state)+' '+dataValue("trainingModuleName")(state)
        );
      }),
      field("Current_Previous", dataValue("currentPrevious")),
      field("Case_Id", dataValue("sessionId")),
      field("Parent_Id", dataValue("trainingGroupCommCareId")),
      field("subcase_0", function(state) {
        return {
          "n0:case": {
            "@": {
              "case_id": dataValue("sessionId")(state),
              "date_modified": new Date().toISOString(),
              "user_id": "e926526fc13b126fffdb6d001f25b269",
              "xmlns:n0": "http://commcarehq.org/case/transaction/v2"
            },
            "n0:create": {
              "n0:case_name": dataValue("trainingModuleNumber")(state)+' '+dataValue("trainingModuleName")(state),
              "n0:owner_id": dataValue("ccMobileWorkerGroupId")(state),
              "n0:case_type": "coffee_drc_c2_ag_training_session"
            },
            "n0:update": {
              "n0:Case_Id": dataValue("sessionId")(state),
              "n0:Date": new Date().toISOString(),
              "n0:Module_Name": dataValue("trainingModuleName")(state),
              "n0:Module_Number": dataValue("trainingModuleNumber")(state),
              "n0:Current_Previous": dataValue("currentPrevious")(state),
              "n0:Current_Previous_Name": function(){
                return '('+dataValue("currentPrevious")(state)+') '+dataValue("trainingModuleName")(state);
              },
              "n0:Parent_Id": dataValue("trainingGroupCommCareId")(state)
            },
            "n0:index":  {
              "n0:parent" : {
                "@": {
                  "case_type": "coffee_drc_c2_ag_training_group"
                },
                "#": dataValue("trainingGroupCommCareId")(state)
              }
            }
          }
        };
      }),
      field("n1:case", function(state) {
        return {
          "@": {
            "case_id": dataValue("sessionId")(state),
            "date_modified": new Date().toISOString(),
            "user_id": "e926526fc13b126fffdb6d001f25b269",
            "xmlns:n1": "http://commcarehq.org/case/transaction/v2"
          }
        };
      }),
      field("n2:meta", function(state) {
        return {
          "@": {
            "xmlns:n2": "http://openrosa.org/jr/xforms"
          },
          "n2:deviceID": "867066029216796",
          "n2:timeStart": new Date().toISOString(),
          "n2:timeEnd": new Date().toISOString(),
          "n2:username": "api",
          "n2:userID": "e926526fc13b126fffdb6d001f25b269"
        };
      })
    )
  )
);