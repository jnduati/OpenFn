//Coffee - DRC SVC Nespresso (Ag) - c2 | SalesForce --> CommCare | Training Groups
//coffee_drc_svc_c2_agronomy
//{"uniqueProjectKey":"coffee_drc_svc_c2_agronomy","source":"SF","jobType":"Training Group"}


each(
  "$.data.trainingGroups[*]",
  submit(
    fields(
      field("@", function(state) {
        return {
          "name": "New Training Group",
          "uiVersion": "1",
          "version": "1",
          "xmlns": "http://openrosa.org/formdesigner/B9AE4CBF-B571-4038-9C90-3D5D47DFDB90",
          "xmlns:jrm": "http://dev.commcarehq.org/jr/xforms"
        };
      }),
      field("Name", dataValue("trainingGroupName")),
      field("FFG_Number", dataValue("tnsId")),
      field("Location", dataValue("locationName")),
      field("Measurement_Group", dataValue("measurementGroup")),
      field("Cooperative_ID", dataValue("cooperative")),
      field("Household_Counter", dataValue("householdCounter")),
      field("Name_Id_Concat", function(state) {
        return (
          //dataValue("trainingGroupName")(state)+' '+dataValue("tnsId")(state)
          dataValue("trainingGroupName")(state)
        );
      }),
      field("Parent_Id", dataValue("staffId")),
      field("n0:case", function(state) {
        return {
          "@": {
            "case_id": dataValue("trainingGroupId")(state),
            "date_modified": new Date().toISOString(),
            "user_id": "e926526fc13b126fffdb6d001f25b269",
            "xmlns:n0": "http://commcarehq.org/case/transaction/v2"
          },
          "n0:create": {
            "n0:case_name": dataValue("trainingGroupName")(state),
            "n0:owner_id": dataValue("ccMobileWorkerGroupId")(state),
            "n0:case_type": "coffee_drc_c2_ag_training_group"
          },
          "n0:update": {
            "n0:Location": dataValue("locationName")(state),
            "n0:Market": dataValue("market")(state),
            "n0:Household_Counter": dataValue("householdCounter")(state),
            "n0:Name_Id_Concat": function(){
              //var name = dataValue("trainingGroupName")(state)+' '+dataValue("tnsId")(state);
              var name = dataValue("trainingGroupName")(state);
              return name;
            },
            "n0:Parent_Id": dataValue("staffId")(state),
            "n0:FFG_Number": dataValue("tnsId")(state),
            "n0:Measurement_Group": dataValue("measurementGroup")(state),
            "n0:Cooperative_ID": dataValue("cooperative")(state)
          },
          "n0:index": {
            "n0:parent" : {
              "@": {
                "case_type": "coffee_drc_c2_ag_staff"
              },
              "#": dataValue("staffId")(state)
            }
          }
        };
      }),
      field("n1:case", function(state) {
        return {
          "@": {
            "case_id": dataValue("trainingGroupId")(state),
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
          "n2:deviceID": "PIMA API",
          "n2:timeStart": new Date().toISOString(),
          "n2:timeEnd": new Date().toISOString(),
          "n2:username": "api",
          "n2:userID": "e926526fc13b126fffdb6d001f25b269"
        };
      })
    )
  )
);